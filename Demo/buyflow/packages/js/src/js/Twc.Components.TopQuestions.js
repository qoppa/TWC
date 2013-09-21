/**
	* Top Questions that appear in the page header
	* @author McGowan
	* @namespace
	*/
Twc.Components.TopQuestions = (function() {
	/** 
	  * marker to indicate container was initalized
	  * @author McGowan
	  */
	var initializedClass = 'js-top-questions-initialized'; 

	var activeClass='active';

	var $questionsWrapper = null;


	return {
		/** initializes a container that contains tab rows and tabbed contentPrevents double initalization.  Assumes
		  * this is a responsive design that also handles expand/collapse sections within.
		  * @author McGowan
		  */
		init : function() {
			try {

				// initialize top Questions clicking. return false for all clickable items to prevent URL anchor
				$questionsWrapper = $('.questions');

				if($questionsWrapper.length === 0) {
					return;
				}
				if ($questionsWrapper.hasClass(initializedClass)) {
					error('Already initialized: '+initializedClass);
					return;
				}

				var $questionsList = $questionsWrapper.find('.question-list');
				var $questions = $questionsList.find('.addflyout');
				var $answers = $questionsList.find('.flyout');
				var $answerCloseButtons = $questionsList.find('.flyout a.close');

				$questionsWrapper.click(function(e) {
					var $me = $(this);
					$me.toggleClass(activeClass);
					$answers.removeClass(activeClass).css({left: 'auto'});
					e.stopPropagation(); // prevent document.click() callback
				});
				$questions.each(function(i) {
					var $q = $(this);
					$q.click(function(e) {
						$answers.stop(true,true);
						var $answer = $(this).parent().children('.flyout').css({left: '100%'});
						$answer.addClass(activeClass);
						$answer.animate({left: '0'}, Twc.Settings.topQuestionsSlideDuration);
						e.stopPropagation(); // prevent questions wrapper callback
						Twc.Analytics.dispatch('topQuestionsClick', i, $q);
						return false;
					});
				});
				$answers.click(function(e) {
					e.stopPropagation(); // prevent click through callbacks					
				});
				$answerCloseButtons.click(function(e) {
					$answers.filter('.active').animate({left:'100%'}, Twc.Settings.topQuestionsSlideDuration, function() {
						$(this).removeClass(activeClass);
					});
					e.stopPropagation(); // prevent click through callbacks					
					return false;			
				});


				$questionsWrapper.addClass(initializedClass);
			} catch (e) {
				Twc.Util.catchError(e);
			}
		},

		/** Closes top questions.
		  * @author McGowan
		  */
		close : function() {
			try {
				if($questionsWrapper.length > 0) {
					$questionsWrapper.removeClass(activeClass);
				}
			} catch (e) {
				Twc.Util.catchError(e);
			}

		}
	}
})();