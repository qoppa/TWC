/*
tracking code for CV / TW with order ID, and orderType
*/

(function(){
	function gd(){
		var host = window.location.hostname.split(".");
		var tld = host.pop(), domain = host.pop();  // order is important
		return "." + domain + "." + tld;
	}
	function rc(v) {
		var n='aitrk=',ca=document.cookie.split(';');
		for(var i=0;i<ca.length;i++){
			var c=ca[i];
			while (c.charAt(0)==' ') c=c.substring(1,c.length);
			if(c.indexOf(n)==0) return c.substring(n.length,c.length);
		}
		return null;
	}
	function sc(v) {
		var d = new Date();
		d.setDate((d.getDate()+30));
		document.cookie="aitrk="+v+"; path=/; expires="+d.toGMTString()+"; domain="+ gd();
	}
	function qs(){
		var pairs=window.location.search.substr(1).split("&"), o={};
		for(var i=0, l=pairs.length; i<l; i++){
			var t=pairs[i].split("=");
			o[t[0]] = t[1];
		}
		return o;
	}

	_startTrack = function(td, pn){
		var o = qs(), cid, r = document.referrer;
		cid = o.aitrk && sc(o.aitrk) && o.aitrk || rc(cid);
		if(cid && cid != ""){
			var img = new Image();
			img.onload = function(e){ /* console.log("_startTrack image loaded.");*/ }
			img.src = "http://" + td + "/pushImage.asp?" + pn + '&r='+encodeURIComponent(r);		
		}
	};

	_startSecureTrack = function(a, ot, oid, psu){
		ot=(ot && ot!='undefined'&& ot!='null')?ot:'';
		oid=(oid && oid!='undefined'&& oid!='null')?oid:'';
/*add PSU FOR TW */		psu=(psu && psu!='undefined' && psu!='null')?psu:'';
		var o=qs(), cid, l=window.location, hp=l.protocol, hn=l.hostname, pn=l.pathname, pp=l.search, r = document.referrer;
		cid = o.aitrk && sc(o.aitrk) && o.aitrk || rc(cid);
		
		/*get rid or URL params, we dont need then for the TW order flow*/
		//if(pp.indexOf('requestid')>=0||pp.indexOf('?oid')>=0) 
		pp = '';
		
		if(ot) pp+=(pp.indexOf('?')>-1?'&':'?')+'orderType='+ot;
		

/*get rid of order ID's we dont need it for TWC */        //if(oid) pp+=(pp.indexOf('?')>-1?'&':'?')+'orderID='+oid;

		/*add PSU FOR TW ORDER IS IMPORTANT We want the psu as the last param */		
		if(psu) pp+=(pp.indexOf('?')>-1?'&':'?')+'psu='+psu;
		if(cid && cid != ""){
			var img = new Image();
			img.onload = function(e){ /* console.log("_startSecureTrack image loaded.");*/ }
			img.src = 'https://tracking.aimediagroup.com/trackingSSL.asp?a='+a+'&t='+hp+'&h='+hn+'&c='+cid+'&i='+oid+'&p='+encodeURIComponent(pn+pp)+'&r='+encodeURIComponent(r);			
		}
	};
	_startSale = function(td, sv, tv, sa, oi){
		var cid, o=qs(), r = document.referrer;
		if(o.saleValue){ sa=parseFloat(o.saleValue,10) || sa; }
		cid = o.aitrk && sc(o.aitrk) && o.aitrk || rc(cid);
		if(cid && cid != ""){
			var img = new Image();
			img.onload = function(e){ /* console.log("_startSale image loaded."); */}
			img.src = 'https://tracking.aimediagroup.com/pushSale.asp?bu='+td+'&sv='+sv+'&tv='+tv+'&sa='+sa+'&oi='+oi+'&r='+encodeURIComponent(r);			
		}
	};
})();
