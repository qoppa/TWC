var CaptchaCheck=new Ajax("../services/index.php","POST");
			CaptchaCheck.onError=function(code)
			{
				alert("Error: "+code);
			}			
			CaptchaCheck.onResponse=function(R)
			{
				if(R.State==4)
				{		
							
					//document.getElementById('dyncap').innerHTML ='<img src="'+R.Text+'"/>';
					
					document.getElementById('im1').getAttributeNode('src').value = R.Text;
					document.getElementById('reloadcpc').innerHTML ='Reload Image';
				}
			}
			
			function GetNextCaptcha()
			{		
				
				//alert(document.getElementById('reloadcpc').innerHTML);
				CaptchaCheck.Go("Action=GetCaptcha&next=true");
				document.getElementById('reloadcpc').innerHTML ='loading Please wait..';
				
			}