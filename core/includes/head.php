<!DOCTYPE html>
<!--[if IE 8 ]>
        <html class="twc-ie twc-ie8 no-js" lang="en"><![endif]-->
<!--[if IE 9 ]>
        <html class="twc-ie twc-ie9 no-js" lang="en"><![endif]-->
<!--[if gt IE 9]>
        <!-->

<html class="no-js">
<!--<![endif]-->

<head>
    <meta charset="utf-8">
    <!--[if IE]>
	    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<![endif]-->
	
<?
	// Load Variables
	include('variables/global_variables.php'); 
	include('includes/variables/page_variables.php');
	if ($body_ID = 'form') {
		include('includes/variables/form_variables.php');
	}
?>
	
    <title><?php if ($title !='') { echo($title); } else { echo ($banner_title); } ?> | Time Warner Cable</title>
    <meta name="description" content="<?=$description?>">
    <meta name="keywords" content="<?=$keywords?>">
    <meta name="viewport" content="width=device-width">
    <link rel="icon" href="/TWC/core/images/favicon.ico" type="image/x-icon">
    
	<!-- Global Element & Page CSS -->
    <link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">
    <link rel="stylesheet" href="/TWC/core/css/main.css">
    <link rel="stylesheet" href="../../css/page.css">
    <link rel="stylesheet" href="../css/page.css">
    <link rel="stylesheet" href="css/page.css">
    
    <script src="/TWC/core/js/modernizr-2.6.2.min.js"></script>
    
    <?
	// Load Page Module Specific CSS
		include('includes/css.php');
	?>
    
</head>

<body id="<?php if ($body_ID !='') { echo($body_ID);}?>">
	    <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->