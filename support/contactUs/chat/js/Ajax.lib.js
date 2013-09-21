/*
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
AjaxLib													|
--------------------------------------------------------------------------------------------------------|
Version	:	1.0											|
Copyright	:	© DeProxy Solutions 2007-2008							|
Author	:	Mathew Paret										|
Website	:	http://www.deproxysolutions.com/products/ajax-lib					|
Contact	:	mathewparet [ at] deproxysolutions [dot] com						|
--------------------------------------------------------------------------------------------------------|
This library is provided under the New BSD License.							|
You can get the latest license details at http://www.opensource.org/licenses/bsd-license.php		|
													|
Thew New BSD License											|
====================											|
													|
Copyright (c) 2007-2008, Mathew Paret									|
All rights reserved.											|
													|
Redistribution and use in source and binary forms, with or without modification, are permitted provided |
that the following conditions are met:									|
													|
      * Redistributions of source code must retain the above copyright notice, this list of conditions 	|
	and the following disclaimer.									|
      * Redistributions in binary form must reproduce the above copyright notice, this list of 		|
	conditions and the following disclaimer in the documentation and/or other materials provided 	|
	with the distribution.										|
      * Neither the name of the DeProxy Solutions nor the names of its contributors may be used to 	|
	endorse or promote products derived from this software without specific prior written 		|
	permission.											|
													|
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED 	|
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A 	|
PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR 	|
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT 	|
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS 	|
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, 	|
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF |
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.								|
													|
--------------------------------------------------------------------------------------------------------|
Those who wish to support us, please make a donation via paypal to mathewparet [at] gmail [dot] com	|
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/

var Response=new Object();
var RS_UNINITIALIZED=0;
var RS_LOADING=1;
var RS_FINISHED_LOADING=2;
var RS_INITIALIZING=3;
var RS_INITIALIZED=4

function Ajax(Page,Method)
{
	this.Page=Page;
	this.Method=Method;
}

Ajax.prototype.Go=function(Parameters)
{
	this.Params=Parameters;
	_DoAjax(this.Page,this.Method,this.Params,this.onResponse,this.onError);
}

function _DoAjax(_Page,_Method,_Params,_Response,_Error)
{
	var request=false;
	try
	{
		request = new XMLHttpRequest();
		if (request.overrideMimeType) {
            request.overrideMimeType('text/xml');
		}
	}
	catch (trymicrosoft)
	{
		try
		{
			request = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (othermicrosoft)
		{
			try
			{
				request = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (failed) 
			{
				request = false;
			}  
     	}
   	}
	if(!request)
		alert("Error: Couldn't initialize!!");
	if(_Method=='GET')
	{
		request.open(_Method,_Page+"?"+_Params,true);
		request.send(null);
	}
	else if(_Method=='POST')
	{
		request.open(_Method,_Page,true);
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		request.setRequestHeader("Content-length", _Params.length);
		request.setRequestHeader("Connection", "close");
		request.send(_Params);
	}
	else
		alert("Method '"+_Method+"' not recognized. Please use 'POST' or 'GET'");
	request.onreadystatechange=function()
	{
		if(request.readyState==4 && request.status!=200)
		{
			try
			{
				_Error(request.status);
			}
			catch(noerror)
			{
				// do nothing
			}
		}
		else
		{
			Response.State=request.readyState;
			Response.Text=request.responseText;
			Response.XML=request.responseXML;
			_Response(Response);
		}
	}
}