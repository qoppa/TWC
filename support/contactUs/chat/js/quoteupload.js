			var QuoteSubmit=new Ajax("../services/index.php","POST");
			QuoteSubmit.onError=function(code)
			{
				alert("Error: "+code);
			}			
			QuoteSubmit.onResponse=function(R)
			{
				if(R.State==4)
				{		
					 if(R.Text=="ok")
					{
					document.getElementById('ok').style.display="";
					document.getElementById('loading').style.visibility="hidden";
					document.getElementById('loading').style.display="none";
					document.getElementById('ok').style.visibility="visible";
					}
					else
					{
					document.getElementById('notok').style.display="";
					document.getElementById('loading').style.visibility="hidden";
					document.getElementById('loading').style.display="none";
					document.getElementById('notok').style.visibility="visible";

					}	
					GetNextCaptcha();
					
				}
			}
			
			function AddQuote()
			{		
				
				////////////////////////////////ERROR CHECKING..........
				if(document.getElementById('name').value!=""||document.getElementById('email').value!="")
				{
				QuoteSubmit.Go("Action=AddQuote&fullname="+document.getElementById('name').value+"&email="+document.getElementById('email').value+"&company="+document.getElementById('company').value+"&phone="+document.getElementById('phone').value+"&projectname="+document.getElementById('projectname').value+"&requirement="+document.getElementById('projectreq').value+"&comment="+document.getElementById('other_req').value+"&captcha="+document.getElementById('captcha').value);
				document.getElementById('ok').style.display="none";
				document.getElementById('notok').style.display="none";
				document.getElementById('ok').style.visibility="hidden";
				document.getElementById('notok').style.visibility="hidden";
				document.getElementById('loading').style.display="";
				document.getElementById('loading').style.visibility="visible";
				}
				else
				{
				
						document.getElementById('notok').style.display="";
						document.getElementById('loading').style.visibility="hidden";
						document.getElementById('loading').style.display="none";
						document.getElementById('notok').style.visibility="visible";
				
				}
				
			}