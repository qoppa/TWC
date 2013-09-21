<?
	header('Content-type: application/json');
	date_default_timezone_set('MST');
	$date = date('Y g:i:s T');
?>
{
	"currentMonthlyTotal": "<b>## </b></sup>$<? echo rand(1,99)?><sup><? echo rand(10,99)?></sup>",
	"current": [{
		"label": "<b>## </b>TV",
		"mainAsset": {
			"displayName": "<b>## </b>Plan label"
		},
		"options": [
            {"displayName": "<b># updated: </b><span style=\"color: green\"><? echo $date ?></span>"},
		    {"displayName": "<b># updated: </b><span style=\"color: green\"><? echo $date ?></span>"},
		    {"displayName": "<b># updated: </b><span style=\"color: green\"><? echo $date ?></span>"},
		    {"displayName": "<b># updated: </b><span style=\"color: green\"><? echo $date ?></span>"},
		    {"displayName": "<b># updated: </b><span style=\"color: green\"><? echo $date ?></span>"},
		    {"displayName": "<b># updated: </b><span style=\"color: green\"><? echo $date ?></span>"}
        ]
	},
	{
		"label": "<b>## </b>Internet",
		"mainAsset": {
			"displayName": "<b>## </b>Plan Label"
		},
		"options": [{
			"displayName": "<b>## </b>options label"
		}]
	}],
	"products": [{
		"disabled": false,
		"lineOfBusiness": "<b>## </b> TV",
		"LOBTotalMonthlyPrice": "<b>## </b> $<? echo rand(1000,9999)/100?>",
		"mainItem": {
			"name": "<b>## </b> Basic TV with International Package",
			"netPrice": "<b>## </b> Included"
		},
		"optionItems": [
		{
			"name": "<b>## </b> Premium Bundle",
			"netPrice": "<b>## </b> $<? echo rand(1000,9999)/100?>",
			"subOptions": [{
				"name": "<b>## </b> HBO®, America's #1 premium service"
			},
			{
				"name": "<b>## </b> Showtime"
			},
			{
				"name": "<b>## </b> Cinemax"
			}]
		},
		{
			"name": "<b>## </b> SportsPass",
			"netPrice": "<b>## </b> $<? echo rand(1000,9999)/100?>"
		}]
	},
	{
		"disabled": false,
		"lineOfBusiness": "<b>## </b> Internet",
		"LOBTotalMonthlyPrice": "<b>## </b> Included",
		"mainItem": {
			"name": "<b>## </b> Turbo",
			"netPrice": "<b>## </b> Included"
		},
		"optionItems": [{
			"name": "<b>## </b> TWC Modem",
			"netPrice": "<b>## </b> Included"
		}]
	},
	{
		"disabled": true,
		"lineOfBusiness": "<b>## </b> Phone"
	}],
	"bundle": {
		"price": "<b>## </b> $<? echo rand(1000,9999)/100?>",
		"discountTerm": "<b>## </b> For 12 Months"
	},
	"totalMonthlyPrice": "<b>## </b> $<? echo rand(1000,9999)/100?>",
	"totalMonthlySavings": "<b>## </b> $<? echo rand(1000,9999)/100?>",
	"totalOneTimePrice": "<b>## </b> $<? echo rand(1000,9999)/100?>",
	"oneTime": [{
		"id": "fee1",
		"name": "<b>## </b> Outlet",
		"netPrice": "<b>## </b> $<? echo rand(1000,9999)/100?>",
		"priceType": "One-Time",
		"description": "Outlet"
	},
	{
		"id": "fee2",
		"name": "<b>## </b> MLB Extra Innings",
		"netPrice": "<b>## </b> $<? echo rand(1000,9999)/100?> †",
		"priceType": "One-Time",
		"description": "MLB Extra Innings"
	}],
	"oneTimePayments": [{
			"displayName": "†4 Payments"
	}]
}