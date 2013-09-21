<?
	header('Content-type: application/json');
	date_default_timezone_set('MST');
	$today = date('Ymd');

	// randomize the time slot length
	function getRandomTimes(){
		$slotHrs = rand(1,4);
		$startHr = 8; // start at 8am

		$str = '[';

		// outpu hrs upt to 8pm
		for ($hr = $startHr; $hr+$slotHrs <= 20; $hr+=$slotHrs) {
			if ($hr > $startHr)
				$str .= ',';

			$slotStart = $hr < 10? "0$hr" : $hr;
			$slotEnd = $hr+$slotHrs;
			if ($slotEnd < 10)
				$slotEnd = "0" . $slotEnd;
			$str .= "[\"$slotStart:00\",\"$slotEnd:00\"]";
		}
		$str .= ']';
		return $str;
	}

	function writeAvailableDates() {
		global $today;
		echo '"' . date('Ymd', strtotime($today. ' + '+1+' days')) . '" : '. getRandomTimes();
		for ($i=2;$i<=59;$i++) {
			echo ',"' . date('Ymd', strtotime("+$i day",strtotime($today))) .'" :  '. getRandomTimes();
		}
		return;
	}
?>
{
	"installationDates" : {
		"dateToday" : <? echo $today ?>,
		"timesAvailable" : {<? writeAvailableDates()?>}
	}
}
