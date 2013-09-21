/**
  * Manages interactive for packages, package filter, etc.
  * @namespace
  * @author McGowan
  */
Twc.ServicePackages = (function() {

	var isInitialized = false;
	var showErrorDelay = Twc.Settings.packageFilterCheckboxErrorDelay;
	var packagesAjaxRequest = null; // toggles between null and jquery object while in progress
	var queuedAjaxPackagesDataLoaded = null; // this is returned by ajax requests
	var inErrorState = false;
	var loadedAjaxPackagesUrl = null;
	var currentPackagesParamsShown;
	var showErrorTimeoutId = null;
	var $navPrev = null;
	var $navNext = null;
	var $filterBoxes;
	var $filterError;
	var $carouselWrap;
	var $packagesList;
	var $packages;
	var $carousel;
	var filterBoxes = {};
	var currentPage = 0;

	// ajax responses dynamicaly inserted here
	var $packagesContentContainer;
	var $detailsContentContainer;

	var $packagesWrap;
	var $detailsWrap;
	var $detailsArrow;
	var $detailsToggles;
	var detailsToggleLabels;
	var $detailsContents; // array 1:1 size with packages
	var detailsArrowPos = ['15.8%', '50%', '84.2%']; // [left, right, center]
	var detailsToggleOn;
	var detailsToggleOff;

	// based on checkbox combination, determines if filter error should be shown
	function isFilterErrorNeeded() {
		if (filterBoxes.all.checked)
			return false;

		var unchecked = 0;
		if (!filterBoxes.tv.checked) unchecked++;
		if (!filterBoxes.internet.checked) unchecked++;
		if (!filterBoxes.phone.checked) unchecked++;

		return (unchecked >=2);
	}

	// dynamically fix heights based on largest height on each page group. should be called when moving in/out desktop breakpoint
	function setPackageHeights() {
		// each package should have these rows, which we must set to equal heights based on those shown within a carousel "page"
		var rows = [
			$carouselWrap.find('.package-header'),
			$carouselWrap.find('.package-services li:nth-child(1)'),
			$carouselWrap.find('.package-services li:nth-child(2)'),
			$carouselWrap.find('.package-services li:nth-child(3)'),
			$carouselWrap.find('.more-details ul')
		];

		var totalPages = getTotalPages();
		var totalPerSlide = getTotalPerSlide();
		if (totalPerSlide === 1) {
			for (var row=0; row<rows.length; row++) {
				rows[row].css({'height' : 'auto'});
			}
		} else {
			for (var page=0; page < totalPages; page++) {
				for (var row=0; row<rows.length; row++) {
					var $rowCells = rows[row].slice(page*totalPerSlide, (totalPerSlide*(page+1)));
					// dir($rowCells);
					var maxH = 0;
					$rowCells.each(function() {
						var $me = $(this);
						var h = $me.outerHeight(true);
						if (h > maxH)
							maxH = h;
					});
					$rowCells.css({'height' : maxH+'px'});
				}
			}
		}
	}

	function getTotalPerSlide() {
		return (Twc.Breakpoint.which() === 'desktop')? 3 : 1;
	}
	function getTotalPages() {
		return Math.ceil($packages.size() / getTotalPerSlide());;
	}
	function getPageOffsetPosition() {
		return (Twc.Breakpoint.which() === 'desktop')? (-($packages.eq(currentPage*getTotalPerSlide()).position().left)) + 'px' : (-currentPage*100)+'%';
	}

	function evalPagingButtons(disableFade) {
		if (!$packagesList.is(':animated')) {
			if (currentPage == getTotalPages() -1) {
				$navNext.clearQueue().fadeOut(disableFade? 0 : Twc.Settings.packageNavButtonFadeDuration);
			} else {
				$navNext.clearQueue().fadeIn(disableFade? 0 : Twc.Settings.packageNavButtonFadeDuration);
			}
			
			if (currentPage == 0) {
				$navPrev.clearQueue().fadeOut(disableFade? 0 : Twc.Settings.packageNavButtonFadeDuration);
			} else {
				$navPrev.clearQueue().fadeIn(disableFade? 0 : Twc.Settings.packageNavButtonFadeDuration);			
			}
		}
	}

	// sets the height of the packages based on the next page to be shown.
	function setPackageContainerHeight() {
		var perSlide = getTotalPerSlide();
		var $packagesShown = $packages.slice(currentPage*perSlide, currentPage*perSlide+perSlide);

		var maxH = 0;
		$packagesShown.each(function(i) {
			var $me = $(this);
			var h = $me.outerHeight(true);
			if (h > maxH)
				maxH = h;
		});
		// note - animation of height causes flash on ul.packages-list during paging, so don't animate for now
		$packagesList.css({'height' : maxH+'px'});
	}

	// only called when switching between desktop and tablet
	function onLayoutChange(breakpoint) {
		// ensure that package shown in mobile shows in correct page in desktop
		var totalPages = getTotalPages();
		var perDesktopPage = 3;
		if (breakpoint === 'desktop') { // moving from 1 slide to perDesktopPage. determing the page that shows this among three
			currentPage = Math.floor(currentPage/perDesktopPage);
		} else { // moving from 3 per slide to 1.  Show the first on the page of perDesktopPage
			currentPage = currentPage * perDesktopPage;
		}

		if ($packagesList.size() > 0) {
			$packagesList.stop(true,false).clearQueue().css({'margin-left' : getPageOffsetPosition()});
		}
		setPackageHeights();
		setPackageContainerHeight();
		evalPagingButtons(true);
		setPackageDetailsHeight();
	}

	function page(next) {
		var next = next || false;

		var totalPages = getTotalPages();

		var noAnimationNeeded;
		if (next) {
			currentPage++;
			if (currentPage >= totalPages) {
				currentPage = totalPages -1;
				noAnimationNeeded = true;
			}
		} else {
			currentPage--;
			if (currentPage < 0) {
				currentPage = 0;
				noAnimationNeeded = true;
			}			
		}

		evalPagingButtons();

		if (noAnimationNeeded)
			return;

		closePackageDetails();
		
		// left position is in pixels for desktop, percentage for non-desktop
		var left = getPageOffsetPosition();
		setPackageContainerHeight();
		$packagesList.clearQueue().animate({'margin-left' : left}, {
			'queue' : false,
			'duration' : Twc.Settings.packageSlideDuration,
			'complete' : function() {
				evalPagingButtons();
			}
		});
	}

	// evaluates the User Interface status and decides which action to take
	function evalUIStatus() {

		// determine if the UI should show an error
		if (isFilterErrorNeeded()) {
			if (!inErrorState) {
				startErrorState();
			}
		} else {
			stopErrorState();

			// show content loaded or fetch new content
			if (queuedAjaxPackagesDataLoaded != null) {
				showLoadedContent();
			} else if (packagesAjaxRequest == null) {
				var packagesAjaxUrl = Twc.Settings.ajaxUrls.GetPackages
					+'?show_tv='+filterBoxes.tv.checked
					+'&show_internet='+filterBoxes.internet.checked
					+'&show_phone='+filterBoxes.phone.checked
					+'&show_all='+filterBoxes.all.checked;

				if (packagesAjaxUrl !== loadedAjaxPackagesUrl) {
					cancelAjaxRequests();
					fadeOutPackages();
					fetchPackages(packagesAjaxUrl);
				}
			}
		}
	}

	function closePackageDetails() {
		$detailsWrap.stop(true,true).slideUp(function() {
			$detailsWrap.removeClass('active');
		});
		resetPackageDetailsToggles();
	}

	// set all columns equal for visible details
	function setPackageDetailsHeight() {
		var $thisDetails = $detailsContents.filter(':visible');
		var $thisDetailsCols = $thisDetails.find('.col');

		var h = 'auto';
		if (Twc.Breakpoint.which() === 'desktop') { // moving from 1 slide to perDesktopPage. determing the page that shows this among three
			var maxH = 0;
			$thisDetailsCols.each(function(i) {
				var $me = $(this);
				var h = $me.height();
				if (h > maxH)
					maxH = h;
			});
			h = maxH + 'px';
		}
		$thisDetailsCols.height(h);
	}

	function resetPackageDetailsToggles() {
		$detailsToggles.removeClass('active').each(function(i) {
			var $me = $(this);
			$me.html(detailsToggleLabels[i].viewMore);		
		});		
	}

	function togglePackageDetails(packageNum) {
		// get position of that clicked within slide page
		var $thisToggle = $detailsToggles.eq(packageNum);
		var $thisPackage = $packages.eq(packageNum);
		var $notThisToggle = $detailsToggles.not(':eq('+packageNum+')');
		var $thisDetails = $detailsContents.eq(packageNum);


		if ($thisToggle.is('.active')) { // close details
			closePackageDetails();
		} else { // open details
			resetPackageDetailsToggles();
			$thisToggle.addClass('active').html(detailsToggleLabels[packageNum].viewLess);
			var arrowPos = detailsArrowPos[packageNum % getTotalPerSlide()];

			$detailsArrow.stop().clearQueue();

			$detailsContents.hide().stop(true,true);
			if ($detailsWrap.hasClass('active')) { // already open. transition content
				$thisDetails.fadeIn(Twc.Settings.packageDetailsFadeInDuration,'swing');
				$detailsArrow.animate({'left' : arrowPos}, Twc.Settings.packageDetailsFadeInDuration/2, 'swing');
			} else { // not yet open
				$thisDetails.show();
				$detailsWrap.stop(true,true).slideDown(function() {
					$detailsWrap.addClass('active');
				});
				$detailsArrow.css({'left' : arrowPos});
			}
	
			setPackageDetailsHeight();
		}
	}

	function fadeOutPackages() {
		$carousel.stop().animate({'opacity' : '0'},{
			complete: evalUIStatus,
			duration: Twc.Settings.packageLoadFadeDuration
		});
	}

	function showLoadedContent() {
		if(!$carousel.is(':animated')) {
			currentPage = 0;

			var $newContent = $('<div>').html(queuedAjaxPackagesDataLoaded);
			var $newPackages = $newContent.find('.packages-list');
			var $newDetails = $newContent.find('.js-details');

			$packagesContentContainer.empty().html($newPackages);
			$detailsContentContainer.empty().html($newDetails);

			
			$packagesList = $carouselWrap.find('.packages-list');
			$packages = $carouselWrap.find('.package');

			if ($packagesList.size() === 0)
				error('Twc.ServicePackages.showLoadedContent(): $packagesList is empty');
			if ($packages.size() === 0)
				error('Twc.ServicePackages.showLoadedContent(): $packages is empty');
			
			setPackageHeights();
			setPackageContainerHeight(true);

			// Init view more/less labels if specified for individual packages or use global
			detailsToggleLabels = new Array($packages.size());
			$packages.each(function(i) {
				var $package = $packages.eq(i);
				var options = Twc.Util.safeParseJson($package.attr('data-options'));
				detailsToggleLabels[i] = {
					'viewMore' : options.viewMore || detailsToggleOff,
					'viewLess' : options.viewLess || detailsToggleOn
				};
				$package.find('.js-package-details-toggle').html(detailsToggleLabels[i].viewMore);
			});

			// init content
			Twc.Modal.initLinks($carouselWrap.find('a.modal'));
			Twc.Tooltip.init($carouselWrap.find('a.tooltip'));

			$detailsContents = $newDetails.hide();

			// show/hide details links
			$detailsToggles = $packages.find('.js-package-details-toggle').each(function(i) {
				var $me = $(this);
				$me.click(function() {
					togglePackageDetails(i);
					return false;
				});
			});

			var totalPackages = $packages.size();
			if (totalPackages < 1) {
				$carousel.removeClass('js-page-desktop');				
				$carousel.removeClass('js-page'); // tablet/mobile
			}

			if ($packages.size() > 1) {
				$carousel.addClass('js-page');
			}
			if ($packages.size() > 3) {
				$carousel.addClass('js-page-desktop');
			}


			queuedAjaxPackagesDataLoaded = null;
			evalPagingButtons(true);
			$carousel.stop().animate({'opacity' : '1'}, {
				complete: evalUIStatus,
				duration: Twc.Settings.packageLoadFadeDuration
			});
		}
	}

	function fetchPackages(url) {
		packagesAjaxRequest = $.ajax({
			'url': url,
			'cache' : false,
			success : function(data) {
				queuedAjaxPackagesDataLoaded = data;
				loadedAjaxPackagesUrl = url;
				evalUIStatus();
			},
			complete : function() {
				packagesAjaxRequest = null;						
			}
		});
	}

	function cancelAjaxRequests() {
		if (packagesAjaxRequest != null) {
			packagesAjaxRequest.abort();
		}
	}

	function startErrorState() {
		if($filterError.is(':not(:animated) :not(:visible)')) {
			inErrorState = true;
			cancelAjaxRequests();
			fadeOutPackages();
			loadedAjaxPackagesUrl = null;
			queuedAjaxPackagesDataLoaded = null;
			window.clearTimeout(showErrorTimeoutId);
			showErrorTimeoutId = window.setTimeout(function() {
				$filterError.slideDown(
					Twc.Settings.packageFilterErrorSlideDuration,
					Twc.Settings.packageFilterErrorSlideEasing,
					evalUIStatus
				);
			},showErrorDelay);
		}
	}

	function stopErrorState() {
		window.clearTimeout(showErrorTimeoutId);
		inErrorState = false;

		// close the error message
		if($filterError.is(':not(:animated) :visible')) {
			$filterError.slideUp(
				Twc.Settings.packageFilterErrorSlideDuration,
				Twc.Settings.packageFilterErrorSlideEasing,
				evalUIStatus
			);
		}
	}






	return {
		init : function() {
			if (isInitialized) {
				error('Twc.ServicePackages.init(): Already initialized.');
				return;
			}
			$carousel = $('.packages-slider').css({'opacity' : 0}).removeClass('hidden invisible');
			$carouselWrap = $('.packages-slider-wrap');
			$detailsWrap = $carousel.find('.whats-included-wrap').removeClass('active hidden').hide();
			$packagesContentContainer = $carousel.find('.js-packages-wrap');
			$detailsContentContainer = $carousel.find('.js-details-wrap');
			$detailsArrow = $carousel.find('.arrow-indicator');

			$filterError = $('.packages-error').hide().removeClass('hidden invisible');
			$filterBoxes = $('.filter-options input[type=checkbox]');
			$navPrev = $carousel.find('a.prev').hide().removeClass('hidden invisible').click(function() {page(false); return false;});
			$navNext = $carousel.find('a.next').hide().removeClass('hidden invisible').click(function() {page(true); return false;});

			if (	$carousel.size() !== 1 ||
					$carouselWrap.size() !== 1 ||
					$detailsWrap.size() !== 1 ||
					$packagesContentContainer.size() !== 1 ||
					$detailsContentContainer.size() !== 1 ||
					$detailsArrow.size() !== 1 ||
					$filterError.size() !== 1 ||
					$filterBoxes.size() !== 4 ||
					$navPrev.size() !== 1 ||
					$navNext.size() !== 1
				) {
				error('Twc.ServicePackages.init(): could not instantiate. Required DOM elements not found.');
			}

			// set global view more/less labels
			var options = Twc.Util.safeParseJson($carousel.attr('data-options'));
			detailsToggleOn = options.viewLess || Twc.Settings.packageDetailsLessHtml;
			detailsToggleOff = options.viewMore || Twc.Settings.packageDetailsMoreHtml;


			$carouselWrap.find('.close').click(function() {
				closePackageDetails();
				return false;
			});

			// manually set the values to ensure behavior we need
			filterBoxes.tv = $filterBoxes.filter('[name=tv-filter]').attr('value','tv')[0];
			filterBoxes.internet = $filterBoxes.filter('[name=internet-filter]').attr('value','internet')[0];
			filterBoxes.phone = $filterBoxes.filter('[name=phone-filter]').attr('value','phone')[0];
			filterBoxes.all = $filterBoxes.filter('[name=show-all-filter]').attr('value','all')[0];

			if (	'undefined' === typeof(filterBoxes.tv) ||
					'undefined' === typeof(filterBoxes.internet) ||
					'undefined' === typeof(filterBoxes.phone) ||
					'undefined' === typeof(filterBoxes.all) ||
					$navPrev.size() == 0 || $navNext.size() == 0
				) {
				error('Twc.ServicePackages.init(): could not instantiate. all checkboxes required.');
			}


			// deselect all other boxes if all is clicked
			$filterBoxes.filter('[name=show-all-filter]').click(function() {
				if (this.checked) {
					filterBoxes.tv.checked = false;
					filterBoxes.internet.checked = false;
					filterBoxes.phone.checked = false;
				}
				evalUIStatus();
			});

			// unselect all if one of these clicked
			$filterBoxes.filter(':not([name=show-all-filter])').click(function() {
				if (this.checked) {
					filterBoxes.all.checked = false;
				}
				evalUIStatus();
			});

			// bind left/right keys for carousel slider
			$(document).keyup(function(e) {
				var key = e.which;
				if (37 == key) { // left
					page(false);
				} else if (39 == key) { // right
					page(true);
				}
			});

			isInitialized = true;			
			Twc.Breakpoint.init();

			Twc.Breakpoint.onChange(setPackageContainerHeight);
			Twc.Breakpoint.onChangeFromDesktop(onLayoutChange);
			Twc.Breakpoint.onChangeToDesktop(onLayoutChange);

			evalUIStatus();
		}
	}

})();
