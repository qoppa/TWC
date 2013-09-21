// Place any jQuery/helper plugins in here.

// Add Checkmark to Selection when != '0'
$('select').change(function (event) {
    if ($(this).val() != '0') $(this).parent().prevAll('.checkcircle').addClass('active');
    else $(this).parent().prevAll('.checkcircle').removeClass('active');
});


// Initialize Guages
	var g1, g2, g3, g4;
	
	var g1 = new JustGage({
	  	id: "g1", 
	  	value: 0, 
	  	min: 0,
	  	max: 60,
	  	title: "Current Speed",
	  	label: "Mbps"
	});
	
	var g2 = new JustGage({
	  	id: "g2", 
	  	value: 0, 
	  	min: 0,
	  	max: 24,
	  	title: "Devices",
	  	label: ""
	});
	
	var g3 = new JustGage({
	  	id: "g3", 
	  	value: 0, 
	  	min: 0,
	  	max: 60,
	  	title: "You Need",
	  	label: "Mbps"
	});

// Toggle button to reveal Speedtest meters
$('.toggle').click(function(){
	document.getElementById("button-text").innerHTML= 'Test Again';
	$(this).addClass('again');
	$('button.reset').show().addClass('left');
	calcSpeed();
	calcTotal();
	test();
});

function calcSpeed(){
    var imageAddr = "http://www.maxquattromani.com/test/speedtest/images/puppy.jpg" + "?n=" + Math.random();
    var startTime, endTime;
    var downloadSize = 2725461;
    var download = new Image();
    download.onload = function () {
	    endTime = (new Date()).getTime();
	showResults();
	}
	startTime = (new Date()).getTime();
	download.src = imageAddr;

	function showResults() {
	    var duration = (endTime - startTime) / 1000; //Math.round()
	    var bitsLoaded = downloadSize * 8;
	    var speedBps = (bitsLoaded / duration).toFixed(2);
	    var speedKbps = (speedBps / 1024).toFixed(2);
	    var speedMbps = (speedKbps / 1024).toFixed(0);
	    $.cookie("mbps",speedMbps);
	}
}
calcSpeed();

// Add up selected devices
function calcTotal(oForm){
    var sum = 0;
    for(i=0; i < oSels.length; i++){
        sum += new Number(oSels[i].value);
    }
    document.getElementById('devices-result').innerHTML = sum;
    $('#numDevices').val(sum);
    return false;
}
window.onload=function(){
    oSels = document.getElementById('IST').getElementsByTagName('select');
    for(i=0; i < oSels.length; i++){
        oSels[i].onchange=function(){
            document.getElementById('devices-result').innerHTML = '';
        }
    }

}

// Run Gauges
function test(){
    
    // Get the value of Devices selected by the user
    var devicesSelected = $('#numDevices').val();
    
    // If User does not select any devices, default to '1'
    if (devicesSelected < 1) {
	    devicesSelected = 1;
    }
    
    // Start turning the guages in sequence
    setTimeout(function() {
      	var g1 = new JustGage({
		  	id: "g1", 
		  	value: 30, 
		  	min: 0,
		  	max: 1,
		  	title: "Current Speed",
		  	label: "Mbps"
	  	});
    }, 650);
        
	setTimeout(function() {
		var g2 = new JustGage({
		  	id: "g2", 
		  	value: (devicesSelected), 
		  	min: 0,
		  	max: 1,
		  	title: "Devices",
		  	label: ""
		});
	}, 1300);
	
	setTimeout(function() {
		var g3 = new JustGage({
		  	id: "g3", 
		  	value: 50,
		  	min: 0,
		  	max: 50,
		  	title: "You Need",
		  	label: "Mbps" 
		});
	}, 1950);
	
	setTimeout(function() {
		$('.shop-speeds').animate({ width: 'show' }, '350');
	}, 2600);

}


// Reset Select Form
$('#reset').click(function(){
    $(':input','#IST')
    .not(':button, :submit, :reset, :hidden')
    .val('')
    .removeAttr('checked')
    .removeAttr('selected');
    $('div.checkcircle').removeClass('active');
    $('.shop-speeds').animate({ width: 'hide' }, '350');
    
    var g1 = new JustGage({
	  	id: "g1", 
	  	value: 0, 
	  	min: 0,
	  	max: 1,
	  	title: "Current Speed",
	  	label: "Mbps"
	});
	
	var g2 = new JustGage({
	  	id: "g2", 
	  	value: 0, 
	  	min: 0,
	  	max: 1,
	  	title: "Devices",
	  	label: ""
	});
	
	var g3 = new JustGage({
	  	id: "g3", 
	  	value: 0, 
	  	min: 0,
	  	max: 50,
	  	title: "You Need",
	  	label: "Mbps"
	});
});