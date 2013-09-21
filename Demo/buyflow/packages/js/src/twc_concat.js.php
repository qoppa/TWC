<?
	// dynamically output one concatenated javascript file from multiple files
	header('Content-type: application/javascript');

	// $file_names = "Twc-start.js Twc.Settings.js Twc.Util.js Twc.PageInit.js Twc.Modal.js Twc.Calendar.js Twc-end.js";

	$fileList = fopen("_js_concat_list.txt", "r");
	while (!feof($fileList)) {
		$fileName = trim(fgets($fileList));
		if (strlen($fileName) >0 && !preg_match('/^#/', $fileName)) {
			echo "// ################         CONCAT_START $fileName\n\n";
			require($fileName);
			echo "\n// ################         CONCAT_END $fileName\n\n\n\n\n\n";
		}
	}
	fclose($fileList);
?>