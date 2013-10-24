/*   OnlineOpinion v5.7 Released: 3/6/2013. Compiled 03/06/2013 01:59:16 PM -0600 Branch: master 8d549bbb6d7ff935b4572cf4e62e305e6cd843d7 Components: Full The following code is Copyright 1998-2013 Opinionlab, Inc.  All rights reserved. Unauthorized use is prohibited. This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. http://www.opinionlab    */var OOo={__detectBrowser:function(a){var b=Object.prototype.toString.call(window.opera)==='[object Opera]',c={IE:!!window.attachEvent&&!b,Opera:b,WebKit:a.indexOf('AppleWebKit/')>-1,Chrome:a.indexOf('Chrome')>-1,Gecko:a.indexOf('Gecko')>-1&&a.indexOf('KHTML')===-1,MobileSafari:/Apple.*Mobile.*Safari/.test(a),PalmPre:a.indexOf('Pre/')>-1,BlackBerry:a.indexOf('BlackBerry')>-1,Fennec:a.indexOf('Fennec')>-1,IEMobile:a.indexOf('IEMobile')>-1,OperaMobile:a.search(/Opera (?:Mobi|Mini)/)>-1,Kindle:a.search(/[ ](Kindle|Silk)/)>-1,ua:a},d=false;c.isMobile=(c.MobileSafari||c.PalmPre||c.BlackBerry||c.Fennec||c.IEMobile||c.OperaMobile||c.Kindle);c.isMobileNonIOS=(c.isMobile&&(!c.MobileSafari||a.search('Android')!==-1));return c}};OOo.Browser=OOo.__detectBrowser(navigator.userAgent);OOo.Cache={};OOo.instanceCount=0;OOo.K=function(){};var OnlineOpinion=OnlineOpinion||OOo;(function(){function k(a){return document.getElementById(a)}function l(a,b){var c;for(c in b){if(b.hasOwnProperty(c)){a[c]=b[c]}}return a}function m(a,b,c,d){if(a.addEventListener){a.addEventListener(b,c,d)}else if(a.attachEvent){a.attachEvent('on'+b,c)}}function q(a,b,c,d){if(a.removeEventListener){a.removeEventListener(b,c,d)}else if(a.detachEvent){a.detachEvent('on'+b,c)}}function s(a){var b=[],c;for(c in a){if(a.hasOwnProperty(c)){b.push(c+'='+(encodeURIComponent(a[c])||''))}}return b.join('&')}function t(a){var b=s(a.metrics),c=a.tealeafId+'|'+a.clickTalePID+'/'+a.clickTaleUID+'/'+a.ClickTaleGetSID;b+='&custom_var='+OOo.createLegacyVars(a.legacyVariables,c);if(a.metrics.type==='OnPage'){b+='|iframe'}if(a.asm){b+='&asm=2'}b+="&_"+'rev=2';if(a.customVariables){b+='&customVars='+encodeURIComponent(OOo.serialize(a.customVariables))}return b}function n(a,b){var c=document,d=c.createElement('form'),e=c.createElement('input'),f=a.referrerRewrite;a.metrics.referer=location.href;if(f){a.metrics.referer=OOo.referrerRewrite(f)}d.style.display='none';d.method='post';d.target=b||'OnlineOpinion';d.action=a.onPageCard?'https://secure.opinionlab.com/ccc01/comment_card_json_4_0_b.asp?r='+location.href:'https://secure.opinionlab.com/ccc01/comment_card_d.asp';if(a.commentCardUrl){d.action=a.commentCardUrl;if(a.onPageCard){d.action+='?r='+location.href}}e.name='params';e.value=t(a);d.appendChild(e);c.body.appendChild(d);return d}function r(){return{width:screen.width,height:screen.height,referer:location.href,prev:document.referrer,time1:(new Date()).getTime(),time2:null,currentURL:location.href,ocodeVersion:'5.7'}}function u(a){var b='';if(a&&a.search('://')>-1){var c=a.split('/');for(i=3;i<c.length;i++){b+="/";b+=c[i]}}return b}function o(a,b){a=a||{};if(typeof a==='string'){return b+'|'+a}return a.override?a.vars:b+(a.vars?'|'+a.vars:'')}function p(a,b){if(!b){b=location}if(typeof a==="string")return a;return a.searchPattern?b.href.replace(a.searchPattern,a.replacePattern):a.replacePattern}var w=(function(){var a=document.body,b,c,d,e,f;if(document.createElement&&a&&a.appendChild&&a.removeChild){b=document.createElement('div');if(!b.getBoundingClientRect){return null}b.innerHTML='x';b.style.cssText='position:fixed;top:100px;';a.appendChild(b);c=a.style.height;d=a.scrollTop;a.style.height='3000px';a.scrollTop=500;e=b.getBoundingClientRect().top;a.style.height=c;f=(e===100);a.removeChild(b);a.scrollTop=d;return f}return null}()),x=(function(){if(navigator.appName==="Microsoft Internet Explorer"&&navigator.userAgent.search("MSIE 6")!==-1){return true}var a=document.body,b,c;if(document.createElement&&a&&a.appendChild&&a.removeChild){b=document.createElement('iframe');c=false;b.setAttribute('name','oo_test');b.style.display='none';a.appendChild(b);c=!!!document.getElementsByName('oo_test')[0];a.removeChild(b);return c}else{return null}}());function v(){OOo.$('oo_container').style.display='none'}function A(){var a=OOo.$('oo_invitation_prompt');if(a){var b=OOo.$('oo_container');this.showPrompt(b);return}var c=window.XMLHttpRequest?new XMLHttpRequest():new window.ActiveXObject("Microsoft.XMLHTTP"),d=this,e=document.createElement('link'),f;c.onreadystatechange=function(){if(c.readyState!==4){return}d.showPrompt(c.responseText)};c.open("GET",this.options.pathToAssets+this.options.promptMarkup,true);c.send(null)}function y(a,b){var c=document,d=typeof a==='string'?c.createElement('div'):a,e=c.createElement('div'),f,g,h=this.options,j;e.id='oo_invitation_overlay';d.id='oo_container';d.style.visibility='hidden';if(typeof a==='string'){d.innerHTML=a;c.body.appendChild(d)}d.appendChild(e);j=OOo.$('oo_launch_prompt');if(h.companyLogo){f=new Image();f.src=h.companyLogo;OOo.$('oo_company_logo').appendChild(f)}OOo.addEventListener(j,'click',b.bind(this),false);if(h.clickCallbacks){if(typeof h.clickCallbacks.yes==='function'){OOo.addEventListener(j,'click',function(){h.clickCallbacks.yes()},false)}if(typeof h.clickCallbacks.no==='function'){OOo.addEventListener(OOo.$('oo_no_thanks'),'click',function(){h.clickCallbacks.no()},false)}}if(h.neverShowAgainButton){g=OOo.$('oo_never_show');g.style.visibility='visible';OOo.addEventListener(g,'click',this.killPrompt.bind(this),false)}if(OOo.Browser.IE&&!window.XMLHttpRequest){e.style.position='absolute';e.style.width=Math.max(document.documentElement.clientWidth,document.body.offsetWidth)+'px';e.style.height=Math.max(document.documentElement.clientHeight,document.body.offsetHeight)+'px';d.style.position='absolute'}d.style.visibility='visible';d.style.display='block';e.className='no_loading'}l(OOo,{extend:l,toQueryString:s,addEventListener:m,$:k,appendOOForm:n,removeEventListener:q,createMetrics:r,truncateMetric:u,createLegacyVars:o,POSITION_FIXED_SUPPORTED:w,DYNAMIC_FRAME_NAME_IS_BUGGY:x,getFormParams:t,referrerRewrite:p,hidePrompt:v,getPrompt:A,showPrompt:y})}());(function(){function f(a){if(!a){return null}switch(typeof a){case'number':case'boolean':case'function':return a;case'string':return'\''+a+'\'';case'object':var b,c,d,e;if(a.constructor===Array||typeof a.callee!=='undefined'){b='[';d=a.length;for(c=0;c<d-1;c+=1){b+=f(a[c])+','}b+=f(a[c])+']'}else{b='{';for(e in a){if(a.hasOwnProperty(e)){b+=e+':'+f(a[e])+','}}b=b.replace(/\,$/,'')+'}'}return b;default:return null}}OOo.extend(OOo,{serialize:f})}());(function(){function e(a,b,c){var d;if(a.search(b[0])!==-1){OOo.createCookie(c,0);return false}else if(OOo.readCookie(c)){d=parseInt(OOo.readCookie(c),10);if((a.search(b[d+1])!==-1)&&(d+1!==b.length-1)){OOo.createCookie(c,d+1);return false}else if(a.search(b[d])!==-1){return false}else if(d+1===b.length-1&&a.search(b.pop())!==-1){OOo.eraseCookie(c);return true}else{OOo.eraseCookie(c);return false}}else{return false}}OOo.extend(OOo,{checkTunnel:e})}());(function(){function r(a){var b="",c;for(c=7;c>=0;c-=1){b+='0123456789abcdef'.charAt((a>>(c*4))&0x0F)}return b}function u(a){var b=((a.length+8)>>6)+1,c=new Array(b*16),d;for(d=0;d<b*16;d+=1){c[d]=0}for(d=0;d<a.length;d+=1){c[d>>2]|=a.charCodeAt(d)<<(24-(d%4)*8)}c[d>>2]|=0x80<<(24-(d%4)*8);c[b*16-1]=a.length*8;return c}function o(a,b){var c=(a&0xFFFF)+(b&0xFFFF),d=(a>>16)+(b>>16)+(c>>16);return(d<<16)|(c&0xFFFF)}function p(a,b){return(a<<b)|(a>>>(32-b))}function w(a,b,c,d){if(a<20){return(b&c)|((~b)&d)}if(a<40){return b^c^d}if(a<60){return(b&c)|(b&d)|(c&d)}return b^c^d}function x(a){return(a<20)?1518500249:(a<40)?1859775393:(a<60)?-1894007588:-899497514}function v(a){var b=u(a),c=new Array(80),d=1732584193,e=-271733879,f=-1732584194,g=271733878,h=-1009589776,j,k,l,m,q,s,t,n;for(t=0;t<b.length;t+=16){j=d;k=e;l=f;m=g;q=h;for(n=0;n<80;n+=1){if(n<16){c[n]=b[t+n]}else{c[n]=p(c[n-3]^c[n-8]^c[n-14]^c[n-16],1)}s=o(o(p(d,5),w(n,e,f,g)),o(o(h,c[n]),x(n)));h=g;g=f;f=p(e,30);e=d;d=s}d=o(d,j);e=o(e,k);f=o(f,l);g=o(g,m);h=o(h,q)}return r(d)+r(e)+r(f)+r(g)+r(h)}OOo.extend(OOo,{sha1:v})}());(function(){function h(a,b){if(!b){b=location}var c=a.cookieName||'oo_abandon',d=OOo.readCookie(c),e=a.startPage,f=a.endPage,g=a.middle;if(!d){if(b.pathname.indexOf(e)!==-1){OOo.createCookie(c)}return false}else if(b.pathname.indexOf(f)!==-1){OOo.eraseCookie(c);return false}else if(b.pathname.search(g)!==-1){return false}else{OOo.eraseCookie(c);return true}}OOo.extend(OOo,{checkAbandonment:h})}());(function(){function d(a){var b,c;for(b=a.length-1;b>=0;b-=1){if(a[b].read){c=OOo.readCookie(a[b].name);if(!!c&&c===a[b].value){return true}else if(typeof a[b].value==='undefined'&&!!OOo.readCookie(a[b].name)){return true}}}return false}function e(a){var b;for(b=a.length-1;b>=0;b-=1){if(a[b].set){OOo.createCookie(a[b].name,a[b].value,a[b].expiration)}}}OOo.extend(OOo,{checkThirdPartyCookies:d,setThirdPartyCookies:e})}());OOo.extend(Function.prototype,(function(){if(typeof Function.prototype.bind!=="undefined"){return}var e=Array.prototype.slice;function f(a,b){var c=a.length,d=b.length;while(d){d-=1;a[c+d]=b[d]}return a}function g(a,b){a=e.call(a,0);return f(a,b)}function h(b){if(arguments.length<2&&typeof b==="undefined"){return this}var c=this,d=e.call(arguments,1);return function(){var a=g(d,arguments);return c.apply(b,a)}}return{bind:h}}()));(function(){function f(a){if(!a){a=location}var b;if(a.host.search(/\.[a-z]+/)!==-1){b=a.host.split('.').reverse();if(b.length>3){return a.host}b='.'+b[1]+'.'+b[0]}else{b=a.host}return b}function g(a,b,c){var d='',e='';if(c){d=new Date();d.setTime(d.getTime()+(c*1000));e="; expires="+d.toGMTString()}if(location.host!==f()){document.cookie=a+"="+b+e+"; path=/; domain="+f()+";"}else{document.cookie=a+"="+b+e+"; path=/;"}}function h(a){var b=a+"=",c=document.cookie.split(';'),d,e;for(e=0;e<c.length;e+=1){d=c[e];while(d.charAt(0)===' '){d=d.substring(1,d.length)}if(d.indexOf(b)===0){return d.substring(b.length,d.length)}}return null}function j(a){g(a,"",-1)}OOo.extend(OOo,{getCookieDomain:f,createCookie:g,readCookie:h,eraseCookie:j})}());OOo.Ocode=function(a){var b=OOo.Browser,c,d;if(a.disableMobile&&b.isMobile){return}if(a.disableNoniOS&&b.isMobileNonIOS){return}OOo.instanceCount+=1;this.options={tealeafCookieName:'TLTSID'};OOo.extend(this.options,a);c=this.options;c.metrics=OOo.createMetrics();this.frameName=c.onPageCard?'OnlineOpinion'+OOo.instanceCount:'OnlineOpinion';if(c.cookie&&OOo.Ocode.matchUrl(c.cookie,location)){return}if(c.thirdPartyCookies&&OOo.checkThirdPartyCookies(c.thirdPartyCookies)){return}if(c.abandonment&&!OOo.checkAbandonment(c.abandonment)){return}if(c.tunnel&&!OOo.checkTunnel(location.pathname,c.tunnel.path,c.tunnel.cookieName)){return}if(c.events&&c.events.onSingleClick){this.singProbability=Math.random()<1-c.events.onSingleClick/100}c.tealeafId=OOo.readCookie(c.tealeafCookieName)||OOo.readCookie(c.sessionCookieName);if(c.events){this.setupEvents();if(c.events.disableLinks||c.events.disableFormElements){this.setupDisableElements()}}if(c.floating){this.floating()}else if(c.bar){this.bar()}else if(c.tab){this.tab()}};OOo.Ocode.prototype={show:function(a,b){if(a==='Tab'&&b&&b.preventDefault){b.preventDefault()}if(this.onPageCardVisible){return}var c=this.options,d;if(c.events&&c.events.prompt){if(c.cookie)OOo.eraseCookie(c.cookie.name||'oo_r');OOo.hidePrompt()}if(this.interruptShow){return}if(!this.floatingLogo&&c.cookie&&OOo.Ocode.matchUrl(c.cookie)){return}if(!c.floating&&c.events&&this.singProbability){return}if(c.events&&c.events.onSingleClick){this.singProbability=true}if(c.cookie){OOo.Ocode.tagUrl(c.cookie)}if(c.thirdPartyCookies){if(OOo.checkThirdPartyCookies(c.thirdPartyCookies)){return}OOo.setThirdPartyCookies(c.thirdPartyCookies)}if(this.floatingLogo){this.floatingLogo.children[0].blur()}if(this.floatingLogo&&c.disappearOnClick){this.floatingLogo.style.display='none'}if(a){c.metrics.trigger=a}if(c.clickTalePID&&typeof window.ClickTale==='function'){c.clickTaleUID=window.ClickTaleGetUID();c.clickTaleSID=window.ClickTaleGetSID()}if(c.onPageCard&&!OOo.Browser.isMobile){this.setupOnPageCC()}else{this.launchOOPopup()}d=c.floating||c.tab||c.bar;if(d&&typeof d.onClickCallback==='function'){d.onClickCallback()}if(OOo.Browser.IE){return false}}};OOo.extend(OOo.Ocode,{tagUrl:function(a,b){if(!b){b=location}var c=a.name||'oo_r',d=a.type==='page'?b.href:b.hostname,e=OOo.readCookie(c)||'';if(OOo.Ocode.matchUrl(a,b)){return}OOo.createCookie(c,e+OOo.sha1(d),a.expiration)},matchUrl:function(a,b){if(!b){b=location}var c=OOo.readCookie(a.name||'oo_r'),d;if(!c){return false}d=a.type==='page'?b.href:b.hostname;return c.search(OOo.sha1(d))!==-1}});(function(){var g=0;function h(){var a=this.options,b=a.newWindowSize||[545,325],c=[parseInt((a.metrics.height-b[1])/2,10),parseInt((a.metrics.width-b[0])/2,10)],d,e,f='location=no,status=no,scrollbars=1,width='+b[0]+',height='+b[1]+',top='+c[0]+',left='+c[1];ie7=OOo.Browser.IE&&navigator.userAgent.search('MSIE 7')!==-1,windowName='OnlineOpinion';if(a.newWindow)windowName=windowName+(g++);a.metrics.time2=(new Date()).getTime();a.metrics.type='Popup';d=OOo.appendOOForm(a,windowName);if(OOo.Browser.isMobile&&OOo.Browser.ua.search('Android')!==-1){d.submit()}else{e=window.open(ie7?a.commentCardUrl||'https://secure.opinionlab.com/ccc01/comment_card_d.asp?'+d.children[0].value:'',windowName,f);if(e&&!ie7){d.submit()}}}OOo.extend(OOo.Ocode.prototype,{launchOOPopup:h})}());(function(){function k(){var a=this.options.events,b=[false,false],c=['onExit','onEntry'],d=OOo.Browser.Opera?'unload':'beforeunload',e,f,g,h,j;if(a.prompt){OOo.extend(this.options,{promptMarkup:a.prompt.promptMarkup||'oo_event_prompt.html',neverShowAgainButton:false,pathToAssets:a.prompt.pathToAssets})}for(g=c.length-1;g>=0;g-=1){e=c[g];if(a[e]instanceof Array){h=a[e];j=h.length;while(j&&!b[g]){j-=1;if(window.location.href.search(h[j].url)!==-1&&Math.random()>=1-h[j].p/100){b[g]=true}}}else if(a[e]&&Math.random()>=1-a[e]/100){b[g]=true}}if(b[0]){OOo.addEventListener(window,d,this.show.bind(this,'onExit'),false)}if(b[1]){if(a.delayEntry){window.setTimeout(function(){if(a.prompt)this.getPrompt();else this.show()}.bind(this,'onEntry'),a.delayEntry*1000)}else{if(a.prompt)this.getPrompt();else this.show('onEntry')}}}function l(a){var b=a||window.event,c=a.target||a.srcElement,d=this.options.events,e=c.parentNode,f=5,g=0;while(e&&(c.nodeName!=='A'||c.nodeName!=='INPUT')&&g!==f){if(e.nodeName==='A'){c=e}e=e.parentNode;g+=1}if(d.disableFormElements&&(c.tagName==="INPUT"||c.tagName==="BUTTON")&&(c.type==='submit'||c.type==='image'||c.type==='reset'||c.type==='button')){this.interruptShow=true}if(d.disableLinks&&(c.nodeName==='A'||c.nodeName==='AREA')&&c.href.substr(0,4)==='http'&&c.href.search(d.disableLinks)!==-1){this.interruptShow=true}}function m(a){this.interruptShow=true}function q(){OOo.addEventListener(document.body,'mousedown',l.bind(this));if(!this.options.events.disableFormElements){return}var a=document.getElementsByTagName('form'),b;for(b=a.length-1;b>=0;b-=1){OOo.addEventListener(a[b],'submit',m.bind(this))}}OOo.extend(OOo.Ocode.prototype,{setupEvents:k,setupDisableElements:q,getPrompt:function(){OOo.getPrompt.call(this)},showPrompt:function(a){if(this.options.cookie){OOo.Ocode.tagUrl(this.options.cookie)}OOo.showPrompt.call(this,a,this.show)}})}());OOo.extend(OOo.Ocode.prototype,{floating:function(){var d=document,e=this.floatingLogo=document.createElement('div'),f=d.createElement('div'),g=d.createElement('div'),h=d.createElement('div'),j=d.createElement('span'),k=this.options.floating,l=OOo.$(k.contentId),m='10px',q=k.id,s=d.createElement('span'),t,n,r,u,o,p,w,x;function v(a){return a.offsetLeft+a.offsetWidth}function A(a){u.style.left=v(l)+'px'}s.innerHTML="Screen reader users: Please switch to forms mode for this link.";s.className="screen_reader";if(q){e.id=q}e.className='oo_feedback_float';g.className='oo_transparent';f.className='olUp';h.className='olOver';f.tabIndex=0;f.onkeyup=function(a){t=a||window.event;if(t.keyCode!==13){return}this.show()}.bind(this);f.innerHTML=k.caption||'Feedback';e.appendChild(s);e.appendChild(f);j.innerHTML=k.hoverCaption||'Click here to<br>rate this page';h.appendChild(j);e.appendChild(h);e.appendChild(g);function y(a){var b=d.documentElement.scrollTop||d.body.scrollTop,c=d.documentElement.clientHeight||document.body.clientHeight;e.style.top=(b+c-(w||0)-10)+'px'}if(OOo.Browser.MobileSafari){if(OOo.Browser.ua.search('OS 4')!==-1){n=window.innerHeight;e.style.bottom=null;e.style.top=(window.pageYOffset+window.innerHeight-60)+'px';x=function(a){r=window.pageYOffset-(n-window.innerHeight);e.style.webkitTransform='translateY('+r+'px)'};OOo.addEventListener(window,'scroll',x,false);setTimeout(x,100)}}else if(!OOo.POSITION_FIXED_SUPPORTED){e.style.position='absolute';e.style.bottom='';OOo.addEventListener(window,'scroll',y,false);OOo.addEventListener(window,'resize',y,false);if(d.compatMode==="BackCompat"){e.style.background="white"}}if(k.position&&k.position.search(/Content/)&&l){u=this.spacer=d.createElement('div');o=OOo.Browser.WebKit?d.body:d.documentElement;u.id='oo_feedback_fl_spacer';u.style.left=v(l)+'px';d.body.appendChild(u);switch(k.position){case'rightOfContent':p=function(a){e.style.left=(v(l)-o.scrollLeft)+'px';if(!OOo.POSITION_FIXED_SUPPORTED){p=null}};break;case'fixedPreserveContent':p=function(a){var b=OOo.Browser.IE?d.body.clientWidth:window.innerWidth,c=OOo.POSITION_FIXED_SUPPORTED?o.scrollLeft:0;if(b<=v(l)+e.offsetWidth+parseInt(m,10)){e.style.left=(v(l)-c)+'px'}else{e.style.left='';e.style.right=m}};break;case'fixedContentMax':p=function(a){var b=OOo.Browser.IE?d.body.clientWidth:window.innerWidth;if(b<=v(l)+e.offsetWidth+parseInt(m,10)){e.style.left='';e.style.right=m;if(!OOo.POSITION_FIXED_SUPPORTED&&a&&a.type==='scroll'){e.style.left=(d.body.clientWidth+d.body.scrollLeft-105)+'px'}}else{e.style.left=(v(l)-o.scrollLeft)+'px';e.style.right=''}};break}window.setTimeout(p,0);OOo.addEventListener(window,'scroll',p,false);OOo.addEventListener(window,'resize',p,false);OOo.addEventListener(window,'resize',A,false)}else{e.style.right=m}OOo.addEventListener(e,'click',this.show.bind(this,'Floating'),false);OOo.addEventListener(e,'touchend',this.show.bind(this,'Floating'),false);d.body.appendChild(e);if(!OOo.POSITION_FIXED_SUPPORTED&&!OOo.Browser.MobileSafari){g.style.height=e.clientHeight+'px';w=e.clientHeight;setTimeout(y,100)}},removeFloatingLogo:function(){document.body.removeChild(this.floatingLogo);if(this.spacer){document.body.removeChild(this.spacer)}}});OOo.extend(OOo.Ocode.prototype,{bar:function(){var d=document,e=this.floatingLogo=d.createElement('div'),f=d.createElement('span'),g,h,j,k=d.documentElement.scrollTop||d.body.scrollTop,l=d.createElement('div');function m(a){var b=curtop=0;if(a.offsetParent){do{b+=a.offsetLeft;curtop+=a.offsetTop}while(a=a.offsetParent);return[b,curtop]}}function q(a){var b=document.activeElement,c;if(!b)return;c=m(b);if(!c)return;if(c[1]+b.clientHeight>(window.innerHeight||document.body.clientHeight)+(window.pageYOffset||document.body.scrollTop)-e.clientHeight)window.scrollBy(0,b.clientHeight+20)}l.innerHTML='Link opens comment card';l.className='screen_reader';e.appendChild(l);this.reflowBar=OOo.K;e.id='oo_bar';f.innerHTML=this.options.bar.caption||'Feedback';e.appendChild(f);e.tabIndex=0;e.onkeyup=function(a){var b=a||window.event;if(b.keyCode!==13){return}this.show()}.bind(this);OOo.addEventListener(e,'click',this.show.bind(this,'Bar'));document.body.className+=document.body.className<1?'oo_bar':' oo_bar';document.body.appendChild(e);if(OOo.Browser.IE){if(d.compatMode==='CSS1Compat'){g=function(a){if(a&&a.type==='resize'){setTimeout(g,50)}e.style.top=(d.documentElement.scrollTop+document.documentElement.clientHeight-e.clientHeight-1)+'px';e.style.width=(Math.max(d.documentElement.clientWidth,d.body.offsetWidth))+'px'}}else{g=function(a){e.style.top=(d.body.scrollTop+document.body.clientHeight-e.clientHeight-1)+'px';e.style.width=(Math.max(d.documentElement.clientWidth,d.body.offsetWidth)-22)+'px'}}e.style.position='absolute';OOo.addEventListener(window,'scroll',g,false);OOo.addEventListener(window,'resize',g,false);this.reflowBar=function(){e.style.display='none';g();e.style.display='block'};g()}else if(OOo.Browser.MobileSafari&&OOo.Browser.ua.search('OS 4')!==-1){h=window.innerHeight;e.style.bottom=null;e.style.top=(window.pageYOffset+window.innerHeight-22)+'px';g=function(a){j=window.pageYOffset-(h-window.innerHeight);e.style.webkitTransform='translateY('+j+'px)'};OOo.addEventListener(window,'scroll',g,false);setTimeout(g,100)}OOo.addEventListener(document.body,'keyup',q,false)}});OOo.extend(OOo.Ocode.prototype,{tab:function(){var e=document,f=this.floatingLogo=e.createElement('div'),g=e.createElement('div'),h=e.createElement('div'),j=e.createElement('span'),k=this.options.tab;if(k.wcagBasePath){h=e.createElement('a');h.setAttribute('href','#');j=e.createElement('img');j.className='logo';j.setAttribute('alt',"Feedback");j.setAttribute('src',k.wcagBasePath+((OOo.Browser.ua.search('IE 6')!==-1)?"oo_tabie6.png":"oo_tab.png"))}function l(a){var b=e.documentElement.scrollTop||e.body.scrollTop,c=e.documentElement.scrollLeft||e.body.scrollLeft,d=e.documentElement.clientHeight||document.body.clientHeight;f.style.top=(b+(d/2-f.clientHeight/2))+'px';if((!k.position||k.position==='right'))f.style.right=(-1*c+2)+'px'}function m(a){f.style.top=pageYOffset+(innerHeight/2-f.clientHeight/2)+'px';f.style.right=document.documentElement.clientWidth-window.innerWidth-window.pageXOffset-15+'px'}f.id='oo_tab';f.className='oo_tab_'+(k.position||'right');if(k.wcagBasePath){f.className+=' wcag'}if(!OOo.POSITION_FIXED_SUPPORTED&&!OOo.Browser.MobileSafari){f.style.position='absolute';if((!k.position||k.position==='right')&&OOo.Browser.IE){f.className+=' oo_tab_ie_right';if(OOo.Browser.ua.search('IE 6')!==-1||OOo.Browser.ua.search('IE 7')!==-1){f.className+='  oo_tab_ie67_right'}if(OOo.Browser.ua.search('IE 6')===-1){OOo.addEventListener(window,'scroll',l,false);OOo.addEventListener(window,'resize',l,false)}}}if(typeof k.tabIndex==='number'){f.tabIndex=k.tabIndex}else if(typeof k.tabIndex==='undefined'){f.tabIndex=0}f.onkeyup=function(a){var b=a||window.event;if(b.keyCode!==13){return}this.show()}.bind(this);h.appendChild(j);f.appendChild(h);if(g){g.className='screen_reader';g.innerHTML='Activate to launch comment card';f.appendChild(g)}OOo.addEventListener(f,'click',this.show.bind(this,'Tab'),false);e.body.appendChild(f);if(OOo.Browser.MobileSafari&&OOo.Browser.ua.search('OS 4')!==-1){f.style.position='absolute';OOo.addEventListener(window,'scroll',m,false);setTimeout(m,100)}}});OOo.extend(OOo.Ocode.prototype,{setupOnPageCC:function(){var e=document,f=OOo.Cache.overlay||e.createElement('div'),g=this.wrapper=e.createElement('div'),h=e.createElement('div'),j=e.createElement('div'),k=e.createElement('span'),l=this.frameName,m=e.createElement(OOo.DYNAMIC_FRAME_NAME_IS_BUGGY?'<iframe name="'+l+'">':'iframe'),q=e.createDocumentFragment(),s=this.options,t=s.onPageCard,n='https://secure.opinionlab.com/ccc01/comment_card_json_4_0_b.asp',r,u,o,p=false,w=this,x,v,A,y,B,E,C,D=e.createElement('span');function z(a){if(a&&a.preventDefault){a.preventDefault()}document.body.focus();m.tabIndex=-1;m.title="empty";m['aria-hidden']='true';f.style.display='none';f.className='';e.body.removeChild(g);if(window.postMessage){OOo.removeEventListener(window,'message',B)}else{window.clearInterval(u)}p=false;w.onPageCardVisible=false;return false}B=OOo.Ocode.postMessageHandler(function(a){var b=parseInt(a,10),c,d;if(b>0){if(p){return}p=true;c=window.innerHeight||e.documentElement.clientHeight||e.body.clientHeight;d=b;C=g.offsetTop;if(d+C>c){d=c-40-C}m.style.width='555px';j.style.width='555px';m.style.height=d+'px';g.style.visibility='visible';if(k.clientHeight<20){k.style.height=g.offsetHeight+'px'}f.className="no_loading";w.onPageCardVisible=true;r&&e.body.removeChild(r)}else if(a==='submitted'){z()}if(OOo.Browser.IE&&e.compatMode==="BackCompat"){window.scrollTo(0,0)}},w.options.commentCardUrl);s.metrics.type='OnPage';OOo.Cache.overlay=f;f.id='oo_overlay';f.style.display='block';f.className='';j.className='iwrapper';g.className='oo_cc_wrapper';g.setAttribute('role','alert');g.setAttribute('aria-describedby','comment_card_description');D.className='screen_reader';D.id='comment_card_description';D.innerHTML='Please leave your feedback in the comment card you just activated';g.appendChild(D);h.className='oo_cc_close';h.innerHTML='<span class="screen_reader">Link closes comment card</span>X';h.title='Click to close comment card';g.style.visibility='hidden';h.tabIndex=0;h.onkeyup=function(a){var b=a||window.event;if(b.keyCode!==13){return}z()};if(OOo.Browser.IE){m.frameBorder='0';if(!window.XMLHttpRequest||e.compatMode==="BackCompat"){E=Math.max(e.documentElement.clientWidth,e.body.offsetWidth);f.style.position='absolute';f.style.width=e.compatMode==="BackCompat"?(E-21)+'px':E+'px';f.style.height=Math.max(e.documentElement.clientHeight,e.body.offsetHeight)+'px';g.style.position='absolute';OOo.addEventListener(window,'scroll',function(){f.style.top=(e.body.scrollTop+document.body.clientHeight-f.clientHeight)+'px';g.style.top=(e.body.scrollTop+C+25)+'px'})}}OOo.addEventListener(h,'click',z);if(t.closeWithOverlay&&!OOo.Browser.isMobile){g.appendChild(k);k.onclick=z;f.onclick=z}m.src=' ';m.name=l;m.title='Comment Card';j.appendChild(h);j.appendChild(m);g.appendChild(j);q.appendChild(g);q.appendChild(f);e.body.appendChild(q);if(window.postMessage){OOo.addEventListener(window,"message",B)}else{u=setInterval(B,500)}s.metrics.time2=(new Date()).getTime();r=OOo.appendOOForm(s,l);r.submit()}});OOo.extend(OOo.Ocode,{postMessageHandler:function(d,e,f){return function(a){var b='https://secure.opinionlab.com',c;if(!f){f=location}if((a&&!(a.origin===b||a.origin.indexOf(e)!==0))||(!a&&f.hash.search('OL=')===-1)){return false}c=a?a.data:f.hash.split('=').pop();if(!a&&location.hash){location.hash=''}d(c);return c}}});OOo.Invitation=function(a){if(OOo.Browser.isMobile){return}this.options={tunnelCookie:'oo_inv_tunnel',repromptTime:604800,responseRate:50,repromptCookie:'oo_inv_reprompt',promptMarkup:'oo_inv_prompt.html',promptStyles:'oo_inverstitial_style.css',percentageCookie:'oo_inv_percent',pagesHitCookie:'oo_inv_hit',popupType:'popunder',promptDelay:0,neverShowAgainButton:false,loadPopupInBackground:false,truncatePrevCurrentMetrics:false,disablePrevCurrentMetrics:false,tealeafCookieName:'TLTSID',monitorWindow:'oo_inv_monitor.html',beforePrompt:OOo.K};this.popupShown=false;OOo.extend(this.options,a);var b=this.options,c=parseInt(OOo.readCookie(b.pagesHitCookie),10)||0;OOo.Invitation.friendlyDomains=b.friendlyDomains||null;if(location.search.search('evs')!==-1||OOo.readCookie('oo_evs_friendly')==='yes'){OOo.eraseCookie('oo_evs_friendly');b.loadPopupInBackground=true;this.launchPopup();OOo.createCookie(b.repromptCookie,1,b.repromptTime===-1?0:b.repromptTime)}setTimeout(function(){if(!window.oo_inv_monitor){return}if(b.area&&location.href.search(b.area)===-1){this.options.popupType='popup';this.launchPopup()}else if(b.goal&&location.href.search(b.goal)!==-1){window.oo_inv_monitor.close()}}.bind(this),1600);if(OOo.readCookie(b.repromptCookie)){return}if(b.thirdPartyCookies&&OOo.checkThirdPartyCookies(b.thirdPartyCookies)){return}if(!OOo.readCookie(b.percentageCookie)){OOo.createCookie(b.percentageCookie,(Math.random()>1-(b.responseRate/100))?"1":"0")}if(typeof b.promptTrigger!=='undefined'){if(b.promptTrigger instanceof RegExp){if(!window.location.href.match(b.promptTrigger)){return}}else if(b.promptTrigger instanceof Array){if(!OOo.checkTunnel(location.pathname,b.promptTrigger,b.tunnelCookie)){return}}}c+=1;OOo.createCookie(b.pagesHitCookie,c);if(b.pagesHit&&c<b.pagesHit){return}OOo.eraseCookie(b.tunnelCookie);if(OOo.readCookie(b.percentageCookie)==='1'){window.setTimeout(function(){OOo.createCookie(b.repromptCookie,1,b.repromptTime);this.options.beforePrompt();this.getPrompt()}.bind(this),b.promptDelay*1000)}};OOo.Invitation.notifyFriendlyLocationChange=function(a){if(window.oo_inv_monitor){OOo.createCookie('oo_evs_friendly','yes')}};OOo.Invitation.prototype={getPrompt:function(){OOo.getPrompt.call(this)},showPrompt:function(a){OOo.showPrompt.call(this,a,this.launchPopup)},launchPopup:function(){if(this.popupShown){return}this.popupShown=true;var b=this.options,c=window.location.href,d=b.popupType==='popup'?'https://secure.opinionlab.com/ccc01/comment_card.asp?':b.pathToAssets+b.monitorWindow+'?'+(new Date()).getTime()+'&',e,f=[],g=b.asm?[555,500]:[400,335],h,j=OOo.createMetrics(),k=OOo.readCookie(b.tealeafCookieName),l;if(b.clickTalePID&&window.ClickTaleGetUID&&window.ClickTaleGetSID){k+='|'+[b.clickTalePID,window.ClickTaleGetUID(),window.ClickTaleGetSID()].join('/')}g=b.newWindowSize||g;l='location=no,status=no,width='+g[0]+',height='+g[1];if(b.referrerRewrite){j.referer=OOo.referrerRewrite(b.referrerRewrite)}if(b.truncatePrevCurrentMetrics){j.prev=OOo.truncateMetric(j.prev);j.currentURL=OOo.truncateMetric(j.currentURL)}if(b.disablePrevCurrentMetrics){j.prev='';j.currentURL=''}if(b.thirdPartyCookies){OOo.setThirdPartyCookies(b.thirdPartyCookies)}e=OOo.toQueryString(j)+'&type=Invitation';if(b.customVariables){e+='&customVars='+encodeURIComponent(OOo.serialize(b.customVariables))}e+='&custom_var='+OOo.createLegacyVars(b.legacyVariables,k);if(b.asm){e+='&asm=2';l+=',scrollbars=1'}d+=e;if(d.match(/\?/g).length===2)d=d.replace(/\?([^?]*)$/,'&$1');this.popup=h=window.open(d,'OnlineOpinionInvitation',l);if(!b.loadPopupInBackground&&OOo.$('oo_container')){OOo.hidePrompt()}if(b.popupType==='popunder'){if(!OOo.Browser.Chrome){h.blur();window.focus()}else{if(!b.loadPopupInBackground){window.alert(b.chromeMainWinPrompt||'Please fill out the form behind this window when you are finished.')}if(b.chromeSurveyPrompt){setTimeout(function(a){h.postMessage(b.chromeSurveyPrompt,"*")},500)}}}else if(window.oo_inv_monitor){if(!OOo.Browser.Chrome){window.blur();h.focus()}else{h.alert(b.chromeSurveyPrompt||'Please fill out the form');h.focused=true}}},killPrompt:function(){if(this.options.clickCallbacks&&typeof this.options.clickCallbacks.no==='function'){this.options.clickCallbacks.no()}OOo.createCookie(this.options.repromptCookie,1,157680000);OOo.hidePrompt()}};OOo.extend(OOo.Invitation,{navigateToFriendlyDomain:function(a){location.href=a}});

/*
OnlineOpinion v5.7
Released: 3/6/2013. Compiled 03/06/2013 01:59:16 PM -0600
Branch: master 8d549bbb6d7ff935b4572cf4e62e305e6cd843d7
Components: Full
The following code is Copyright 1998-2013 Opinionlab, Inc.  All rights reserved. Unauthorized use is prohibited. This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. http://www.opinionlab
*/
/* Inline configuration for residential pages*/
var oo_userProfileData = jQuery.parseJSON(decodeURIComponent(OOo.readCookie('twc-user-profile')));
oo_userProfileData = oo_userProfileData ? oo_userProfileData : {"city": "", "state":"", "postalCode":"", "soaID":"", "region":""};

var oo_feedback = new OOo.Ocode({
    floating : {
        contentId: "content",
        caption: "Site Feedback",
        hoverCaption: "Click here to rate this page"
    },
    disableMobile : "true",
    customVariables : oo_userProfileData
});
var analyticsClickEventSelectors = [];
analyticsClickEventSelectors.push(".prev", ".next", ".details-trigger", ".pager .left a", ".pager .right a");
var impressionTrackingSelectors = [];
impressionTrackingSelectors.push();
var CAROUSEL_TRANSITION = 600; //600ms is the "slow" transition speed used on the carousel
var CAROUSEL_TRANSITION_DELAY = CAROUSEL_TRANSITION + 10; //carousel-driven impressions: carousel animation time, plus 10ms more to let things resolve
var IMPRESSION_DELAY = 1500; //hover-driven impressions: must be visible for 1.5secs before sending an impression

function getModuleName(element){
    var module = $(element);
    if(!$(element).hasClass("parbase")){
        if($(element).parents(".parbase").length > 0){
            module = $(element).parents(".parbase");
        } else if($(element).parents(".wrap").length > 0) {
            module = $(element).parentsUntil(".wrap");
        }
    }
    var moduleName = $(module).attr("class");
    if(moduleName)
        return moduleName.replace(/\s*parbase\s*/i,"").replace("/^\s*/","").replace(" ",":");
    else
        return "";
}

function calculateAnalyticsName(element, analyticsBaseName) {
    var analyticsComponents = [ analyticsBaseName ];
    if ($(element).attr("analyticsName"))
        return $(element).attr("analyticsName");
    else if ($(element).parents(".pagination").length > 0) //pagination dots
        analyticsComponents.push($(element).parent().index(), "dot");
    else if ($(element).parents(".slide-item").length > 0) //carousel slider items
        analyticsComponents.push($(element).parents(".slide-item").index(), "slide-item");
    else if ($(element).hasClass("details-trigger")) //package carousel and other detail dropdowns
        analyticsComponents.push($(element).parents("tr").index()/2, "details-trigger");
    else if ($(element).parents(".tabs-nav").length > 0) //snapshot tabs "Shop snapshot:3:0:Internet"
        analyticsComponents = [$.trim($(element).parents(".tabs-nav").children("h2").text()) + " snapshot",$(element).parent().index()+1,"1",$.trim($(element).text())];
    else if ($(element).parent(".main-nav > li").length > 0) //main megamenu category tabs
        analyticsComponents.push($.trim($(element).children("a").text()));
    else if ($(element).hasClass("next") || $(element).hasClass("right") || $(element).parent().hasClass("right")) //all next buttons
        analyticsComponents.push("right");
    else if ($(element).hasClass("prev") || $(element).hasClass("left") || $(element).parent().hasClass("left")) //all prev buttons
        analyticsComponents.push("left");
    else if ($(element).hasClass("close")) //detail and other close buttons
        analyticsComponents.push("close");
    return analyticsComponents.join(":");
}

function bindUndelagatedAnalyticsTrackingClickEvents(){
    var megaMenuTimeout;
    var promostripTimeout;
    jQuery(analyticsClickEventSelectors.join(",")).filter(function() {
        return !$(this).data("analytics-trigger-bound");
    }).click(function(){ // URL fragment or javascript function
        //console.log("util.js track light on " + $(this).attr("class") + " .click() " + calculateAnalyticsName(this, getModuleName(this)));
        if (typeof s === "undefined") {
           console.log('the analytics object is not set');
        } else {
            if($(this).parents(".mega-menu-carousel").length > 0){ //prev and next buttons in megamenu carousel
                var $hovered = $(this).parents(".header-navigation ul.main-nav > li");
                clearInterval(megaMenuTimeout);
                megaMenuTimeout = setTimeout(function(){
                    fireImpressions($hovered,".megaMenuProductSlider .cta a",$hovered,"hover");
                },CAROUSEL_TRANSITION_DELAY) //carousel transition takes 600ms, must wait past that or more elements will be :visible
            }
            if($(this).parents(".promostrip").length > 0){ //prev and next buttons in promostrip
                $container = $(this).parents(".promostrip");
                clearInterval(promostripTimeout);
                promostripTimeout = setTimeout(function(){
                    fireImpressions($container,".slide-item a");
                },CAROUSEL_TRANSITION_DELAY) //carousel transition takes 600ms, must wait past that or more elements will be :visible
            }

            s.linkTrackVars = "eVar17,eVar57,eVar58,eVar59";  // changed to BC region eVar
            s.linkTrackEvents = "event86";
            s.events = "event86";
            s.eVar57 = calculateAnalyticsName(this, getModuleName(this));
            s.eVar58 = s_account;
            s.eVar59 = s.pageName;
            s.tl(this,'o',s.eVar57);
            s.linkTrackVars=s.linkTrackEvents=s.eVar57=s.eVar58=s.eVar59="";
        }
    }).data("analytics-trigger-bound", true);
}

function bindAnalyticsTrackingFormSubmit(){
    if (typeof s === "undefined") {
        console.log('the analytics object is not set');
    } else {
        jQuery(document).on("submit","form#chatForm",function(){
            var elementID = $(this).attr("id");
            s.linkTrackVars = "prop19,eVar67,eVar68";
            s.linkTrackEvents = "event77";
            var prevPage = s.getPreviousValue(s.pageName,'gpv_ev59','');
            if (prevPage.indexOf("chatpop") > -1 ) { //came here from PCP - would be "chatpop_idle"
                s.eVar67 = prevPage;
                s.eVar68 = prevPage;
            } else { // self navigated
                s.eVar67 = "chatself_nav";
                s.eVar68 = s.pageName;
            }
            s.prop19 = "Chat Submit";
            s.events = "event77";
            s.tl(this, 'o', 'Chat Submit');
            s.linkTrackEvents = "";
            s.events = "";
            s.eVar67 = "";
            s.eVar68 = "";
            s.prop19 = "";
            return false;
        });
    }
}

function fireImpression(analyticsName){
    //console.log("trackLight[imprsn]: " + analyticsName);
    s.linkTrackVars = "eVar17,eVar57,eVar58,eVar59";
    s.linkTrackEvents = "event84";
    s.events = "event84";
    s.eVar57 = analyticsName;
    s.eVar58 = s_account;
    s.eVar59 = s.pageName;
    s.tl(this,'o',s.eVar57);
    s.linkTrackVars=s.linkTrackEvents=s.eVar57=s.eVar58=s.eVar59="";
}
function fireImpressions(container, ctaClass, menuItem, activeMenuItemClass){
    var $container = $(container);
    var $hovered = $(menuItem);

    $container.find(ctaClass+":visible").each(function(){
        fireImpression(calculateAnalyticsName(this, getModuleName(this)));
    });

    if($hovered.hasClass(activeMenuItemClass) && !$hovered.data("sent-impressions")){
        if($hovered.children("a").length > 0)
            fireImpression(calculateAnalyticsName($hovered.children("a"), getModuleName($hovered.children("a"))));
        else
            fireImpression(calculateAnalyticsName($hovered, getModuleName($hovered)));
    };

    $hovered.data("sent-impressions",true).siblings("li").data("sent-impressions",false);
}

function bindAndInitImpressionTracking(){
    // Analytics for CTA impression tracking on snapshot
    var snapshotImpressionTimeout = setTimeout(function(){
        fireImpressions($(".snapshot"),".tab .cta a",$('.snapshot .tabs-nav li.active'),"active");
    },IMPRESSION_DELAY);

    jQuery(document).on('mouseenter','.snapshot .tabs-nav li', function(){
        var $hovered = $(this);
        if(!$hovered.data("sent-impressions")){
            clearInterval(snapshotImpressionTimeout);
            snapshotImpressionTimeout = setTimeout(function(){
                fireImpressions($hovered.parents(".snapshot"),".tab .cta a",$hovered,"active");
            },IMPRESSION_DELAY);
        }
    });
    // Analytics for CTA impression tracking on megamenu
    var megaMenuImpressionTimeout;
    jQuery(document).on('mouseenter','.header-navigation ul.main-nav > li', function(){
        var $hovered = $(this);
        if(!$hovered.data("sent-impressions")){
            clearInterval(megaMenuImpressionTimeout);
            megaMenuImpressionTimeout = setTimeout(function(){
                fireImpressions($hovered,".megaMenuProductSlider .cta a",$hovered,"hover");
            },IMPRESSION_DELAY); //wait for the menu to have been open 1.5sec
        }
    });

    //analytics for promostrip carousel
    var promostripTimeout;
    fireImpressions($(".promostrip .slides"),".slide-item a");
    jQuery(document).on("click",".promostrip .pagination a",function(){
        $container = $(this).parents(".promostrip");
        clearInterval(promostripTimeout);
        promostripTimeout = setTimeout(function(){
            fireImpressions($container,".slide-item a");
        },CAROUSEL_TRANSITION_DELAY) //carousel transition takes 600ms, must wait past that or more elements will be :visible
    });
}

// retrieve the id representing the user session for analytics
function getAnalyticsSessionID() {
    var sessionCookieVal = $.cookie('twc-analytics-session')
    if (sessionCookieVal) {
        return sessionCookieVal;
    }
    /* Given that we don't know exactly where this is being called from, make it synchronous to avoid timing issues.
     * the time the servlet takes to respond should also be minimal enough to not have the user notice it. */
    $.ajax({
        type: 'GET',
        async: false,
        url: '/bin/services/generate/id',
        cache: false,
        data: 'maxIDLength=16&baseEncoding=32'
    })
    .done(function(data, textStatus, jqXHR) {
        $.cookie('twc-analytics-session', data, { expires: null, path: '/'}); // create the cookie to expire at browser close
    })
    .fail(function(jqXHR, errorType, exception) {
        console.log(exception); // log the error
    });
    return $.cookie('twc-analytics-session');
}

//function to clear a form or form input
//does not clear hidden fields, but does clear fields that are not visible.
$.fn.clearForm = function() {
  return this.each(function() {
    var type = this.type, tag = this.tagName.toLowerCase();
    if (tag == 'form')
      return $(':input',this).clearForm();
    if (type == 'text' || type == 'password' || tag == 'textarea')
      this.value = '';
    else if (type == 'checkbox' || type == 'radio')
      this.checked = false;
    else if (tag == 'select')
      this.selectedIndex = -1;
  });
};

$.fn.addAnalyticsTooltips = function(){
    return this.each(function(){
        if($(this).attr("analyticsName")){
            var tooltipJSON = '{"heading":"Analytics Name","body":"' + $(this).attr("analyticsName") + '","position": "right"}';
            $(this).attr("data-tooltip",tooltipJSON);
            $(this).toolTipInit();
        }
    });
};

// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License

function parseUri (str) {
	var	o   = parseUri.options,
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;

	while (i--) uri[o.key[i]] = m[i] || "";

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});

	return uri;
};

parseUri.options = {
	strictMode: false,
	key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
	q:   {
		name:   "queryKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};
function startImpressionCall(){

jQuery(document).ready(function() {
    if (typeof s === "undefined") {
        console.log('the analytics object is not set');
    } else {
     jQuery(document).on("click","a",function(){
        var uri = parseUri($(this).attr("href"));
        if((uri["relative"].indexOf("#") === 0 || uri["protocol"].indexOf("javascript") === 0) // URL fragment or javascript function
                && $(this).parents("#myMove").length < 1) { //add exception for myMove form
            // console.log("track light .on() " + calculateAnalyticsName(this, getModuleName(this)));
            s.linkTrackVars = "eVar17,eVar57,eVar58,eVar59";  // changed to BC region eVar
            s.linkTrackEvents = "event86";
            s.events = "event86";
            s.eVar57 = calculateAnalyticsName(this, getModuleName(this));
            s.eVar58 = s_account;
            s.eVar59 = s.pageName;
            s.tl(this,'o',s.eVar57);
            s.linkTrackVars=s.linkTrackEvents=s.eVar57=s.eVar58=s.eVar59="";
        } else if (uri["host"] && uri["host"].indexOf("timewarnercable.com") === -1) { // External link
            var linkNameText = s.pageName + " - " + calculateAnalyticsName(this, getModuleName(this));
            //console.log("analytics record .on() " + linkNameText);
            CQ_Analytics.record({
                event: "linkClick",
                values: { linkID: linkNameText,
                    prop19: linkNameText ,
                    prop54: linkNameText },
                collect: false,
                options: { obj: this, defaultLinkType: "o" },
                componentPath: "<%=resource.getResourceType()%>"
            });
        } else { // Internal link
            //console.log("cookie link .on() " + calculateAnalyticsName(this, getModuleName(this)));
            s.cookieLink(calculateAnalyticsName(this, getModuleName(this)));
        }
      }); // on a click
      jQuery(document).on("click", "button, .helpfulLinks li a", function() {
          //console.log("cookie link .on() " + calculateAnalyticsName(this, getModuleName(this)));
          s.cookieLink(calculateAnalyticsName(this, getModuleName(this)));
      }); // on button click
      jQuery(document).on("change", "input", function() {
          if($(this).filter('.faq-navigator input:radio[name="resource-type"]').length > 0) {
            // Resource type analytics
            s.linkTrackVars = "eVar8";
            s.linkTrackEvents = "event21"
            s.eVar8 = "Support Navigator Resource Type: " + $(this).attr('title');  //  set resource type accordingly
            s.events = "event21";
            s.tl(this, 'o', s.eVar8);
            s.linkTrackVars = s.linkTrackEvents = s.events = s.eVar8 = "";
          }
      }); // on input change
      
      // .faq-navigator topic selected
      jQuery(document).on('click', '.twc-step1 h5', function() {
          var selected = $(this).text();
            
          if (typeof(s) !== 'undefined') { // analytics for category, if it exists
              s.linkTrackVars='prop19';
              s.prop19='contact category > '+ selected;
              s.tl(this,'o',s.prop19);
              s.prop19 = "";
          }
      });
        
      // .faq-navigator category selected
      jQuery(document).on('click', '.twc-step1 ul.content li a', function() {
          var topic = $(this);
          var catText = $(topic).text();
        
          if (typeof(s) !== 'undefined') { //analytics for topics
              s.linkTrackVars='prop19,prop37,eVar48';
              s.prop19='contact topic > '+catText;
              s.prop37 = s.eVar48 = catText;
              s.tl(this,'o',s.prop19);
              s.prop19 = "";
              s.prop37 = "";
              s.eVar48 = "";
          }
      });
         
      // .faq-navigator question clicked
      jQuery(document).on('click', '.step-container dl.questions dt a', function() {
          var category = $(this);
          var question = $(category).text();
        
          if (typeof(s) !== 'undefined') { //analytics for topics
              s.linkTrackVars = "prop63,eVar63";
              s.linkTrackEvents = "event92";
              s.prop63=s.eVar63 = 'Contact Us FAQ:'+question; // append question text
              s.events = "event92";
              s.tl(this,'o', s.prop63);
              s.linkTrackEvents = "";
              s.events = "";
              s.eVar63 = "";
              s.prop63 = "";
          }
      });

      // .faq-navigator call/chat button clicked
      jQuery(document).on('click', '#chatUs h5, #callUs h5', function() {
          var question = $(this);
          var chatButton = $(question).text();
          
          if (typeof(s) !== 'undefined') { //analytics for topics
              s.linkTrackVars = "prop63,eVar63";
              s.linkTrackEvents = "event92";
              s.eVar63 = calculateAnalyticsName(this, getModuleName(this));
              s.prop63 = calculateAnalyticsName(this, getModuleName(this));
              s.events = "event92";
              s.tl(this,'o', calculateAnalyticsName(this, getModuleName(this)));
              s.linkTrackEvents = "";
              s.events = "";
              s.eVar63 = "";
              s.prop63 = "";
          }
      });

      // .faq-survey-right submit clicked
      jQuery(document).on('click', '.faq-survey-right .btn', function() {
          var $survey = $(this).closest(".faq-survey");
          var $surveyRight = $(this).closest(".faq-survey-right");
          if($surveyRight.find("#yes").is(":checked")) {
              s.linkTrackVars = "prop9";
              s.linkTrackEvents = "event44";
              s.prop9 = $survey.data("faqTitle");
              s.events = "event44";
              s.tl(this,'o', s.prop9);
              s.linkTrackVars=s.linkTrackEvents=s.events="";
          }
      });

      // .faq-survey-no submit clicked
      jQuery(document).on('click', '.faq-survey-no .btn', function() {
          var $survey = $(this).closest(".faq-survey");
          var $surveyNo = $(this).closest(".faq-survey-no");
          if($surveyNo.find('textarea').val() != '') {
              s.linkTrackVars = "prop9";
              s.linkTrackEvents = "event45";
              s.prop9 = $survey.data("faqTitle");
              s.events = "event45";
              s.tl(this,'o', s.prop9);
              s.linkTrackVars=s.linkTrackEvents=s.events="";
          }
      });

      bindUndelagatedAnalyticsTrackingClickEvents();
      bindAnalyticsTrackingFormSubmit();
      bindAndInitImpressionTracking();
      if(window.location.href.indexOf("showAnalyticsTooltips=true") !== -1)
          setTimeout(function() { $("a").addAnalyticsTooltips();}, 1000);
    }
});
}

/* ----------------------------------
 *  Plugin: flashtile
 *
 * - Adds the fade in affect to the LOB icons and adds hover class
 *
 *  UsedBy: 
 *          
 *
 *  Uses:   jquery-1.7.1
 *
 * --------------------------------- */ 

;(function($) {    
    $.fn.flashtile= function(opts) {

        function log() {
            window.console && console.log && console.log('[flashtile] ' + Array.prototype.join.call(arguments,' '));
        }

        var $context = this;
        var $html = $context.parents('html');
        
        /*
         * Get context of breakpoints (this is only on load)
         */
        var isMobile = $html.hasClass('bp-mobile');
        var isTabletSmall = $html.hasClass('bp-tablet-small');      
        var isTablet = $html.hasClass('bp-tablet');     
        var isDesktop = $html.hasClass('bp-desktop');

        $(window).bind('viewPortChange.iconList', function(e) {
            $context.show();
        });

        /*
         * If in mobile or tablet small breakpoints, get out of the plugin
         */
        if (isMobile || isTabletSmall) {
            return false;
        }   
 
 
        /*
         * Add hover class on hover
         */ 
        $context.hover( 
            function(){
                $(this).addClass('hover');
            },
            function(){
                $(this).removeClass('hover');
            }
        );

    }; // $.fn.flashtile


})(jQuery);

/* ----------------------------------
 *  Plugin: flashtilewrapper
 *
 * - Adds the fade in affect to the LOB icons
 *
 *  UsedBy: 
 *          
 *
 *  Uses:   jquery-1.7.1
 *
 * --------------------------------- */ 

;(function($) {    
    $.fn.flashtilewrapper= function(opts) {

        function log() {
            window.console && console.log && console.log('[flashtilewrapper] ' + Array.prototype.join.call(arguments,' '));
        }

        var $context = this;
        var $html = $context.parents('html');
        
        /*
         * Get context of breakpoints (this is only on load)
         */
        var isMobile = $html.hasClass('bp-mobile');
        var isTabletSmall = $html.hasClass('bp-tablet-small');      
        var isTablet = $html.hasClass('bp-tablet');     
        var isDesktop = $html.hasClass('bp-desktop');
        /*
         * for each flashtile wrapper set the tile count and fade them in
         */
        $context.each( function( index ) {
            var $items = $(this).find('li');
            $(window).bind('viewPortChange.flashtilewrapper', function(e) {
                $items.show();
            });
    
            /*
             * If in mobile or tablet small breakpoints, get out of the plugin
             */
            if (isMobile || isTabletSmall) {
                return false;
            }   
    
    
            /*
             * Get icon-list items
             */
            $(this).find('ul').addClass('items-'+$items.length);   
            var duration = opts.pause || 200;
    
    
            /*
             * Call the fadeItem() function with the first item with the duration option
             */     
            fadeElem($items.first(), duration);
        });
    }; // $.fn.flashtilewrapper


    /*
     * Function fades element in, then moves to the next element
     */
    function fadeElem(elem,duration) {
        if( $(elem).find('.block').length>0){
            $(elem).find('.flashtile').fadeIn(duration, function() { 
                fadeElem($(elem).next(), duration); 
            });
        }
        else if($(elem).next().length!=0){
            fadeElem($(elem).next(), duration);
        } 
    }   

})(jQuery);


$(document).ready(function () {
    $('.flashtile').flashtile({'pause':210});
    $('.flash-tile-wrapper').flashtilewrapper({'pause':200});

});


// Place any jQuery/helper for global/common/shared elements here.

$(function() {
    //Geoloc
    $('li.twc-drop-nav').mouseenter(function() {
        $(this).addClass('persist');
    });
   
    $('a.twc-change').click(function () {
        $('li.twc-drop-nav').toggleClass('persist');
    });
    
    // Add classes to pirst and last of each list
    $('ul li:first-child').addClass('twc-first');
    $('ul li:last-child').addClass('twc-last');
    // this is a demo function only - remove and replace with real functionality
    $(".twc-alert").show();
    $(".twc-show_hide").show();
    $('.twc-show_hide').click(function(e) {
        $(".twc-alert").slideToggle();
        e.preventDefault();
    });
    
    // deselect mobile nav menu dropdowns when other is selected 
    $('input[name=navradio]').click(function(e) {
        var radChecked = $(this).data('checked') || false;
        $('input[name=navradio]').data('checked', false);
        if (radChecked) {
            this.checked = false;
        } else {
           this.checked = true;
           $(this).data('checked', true);
        }
    });

    // Select Boxes
    enableSelectBoxes();

    function enableSelectBoxes() {
        $('div.selectBox').each(function() {
            $(this).children('span.selected').html($(this).children('div.selectOptions').children('span.selectOption:first').html());
            $(this).attr('value', $(this).children('div.selectOptions').children('span.selectOption:first').attr('value'));
            $(this).children('span.selected,span.selectArrow').click(function() {
                if ($(this).parent().children('div.selectOptions').css('display') == 'none') {
                    $(this).parent().children('div.selectOptions').css('display', 'block');
                } else {
                    $(this).parent().children('div.selectOptions').css('display', 'none');
                }
            });
            $(this).find('span.selectOption').click(function() {
                $(this).parent().css('display', 'none');
                $(this).closest('div.selectBox').attr('value', $(this).attr('value'));
                $(this).parent().siblings('span.selected').html($(this).html());
            });
        });
    }
    
	// footer menu toggle
	$('div[class*="twc-col3_333333-c"]').each(function() {
		var $dropdown = $(this);
		$('h3.label', $dropdown).click(function() {
			var label = $(this);
			$(label).toggleClass('current');
			$('h3.label').not(label).removeClass('current');
			$menu = $('ul', $dropdown);
			$('ul').not($menu).removeClass('mobile');
			$menu.toggleClass('mobile');
		});
	});
    
    // Get current year
    var currentYear = (new Date).getFullYear();
    $('#year').text((new Date).getFullYear());
});

//Dust.js functionality
var compiledTemplates = {};

function getTemplate(id) {
    try {
        var returnData = null;
        $.ajax({
            async : false, // should be required to return data
            timeout : 3000,
            url : '/bin/twc/js-templates.txt/' + id,
            dataType : 'text',
            success : function(data, textStatus, jqXHR) {returnData = data;},
            error : function(jqXHR, textStatus, e) {}
        });
        return returnData;
    } catch (e) {}
}

function loadTemplate(id) {
    var template = getTemplate(id);
    var templateCompiled = dust.compile(template, id);
    dust.loadSource(templateCompiled);
    compiledTemplates[id] = 1;
}

// Close the dropdown when the user clicks anywhere else on the screen
$(document).click(function(e) {
    if (e.target.className != "selectArrow") {
        $('div.selectOptions').css('display', 'none');
    }
});

$(document).ready(function () {
    // Dialog popup box modal
    var id = '#dialog';

    //Get the screen height and width
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();

    //Set heigth and width to mask to fill up the whole screen
    $('#mask').css({ 'width': maskWidth, 'height': maskHeight });

    //transition effect
    $('#mask').fadeIn(500);
    $('#mask').fadeTo("slow", 0.8);

    //Get the window height and width
    var winH = $(window).height();
    var winW = $(window).width();

    //Set the popup window to center
    $(id).css('top', winH / 2 - $(id).height() / 2);
    $(id).css('left', winW / 2 - $(id).width() / 2);

    //transition effect
    $(id).delay(1000).fadeIn(1000);

    //if close button is clicked
    $('.window .popup-close').click(function (e) {
        //Cancel the link behavior
        e.preventDefault();

        $('#mask').hide();
        $('.window').hide();
    });

    //if mask is clicked
    $('#mask').click(function () {
        $(this).hide();
        $('.window').hide();
    });

    // The modal handling
    if($.fn.fancybox){
        $('a.modalGeneric').fancybox({
            type: 'ajax',
            fitToView: true,
            autoSize: true,
            openEffect:'fade',
            openSpeed:'slow'
        });
     }
});

//Init 3 up carousel
$('.3-up-carousel').show();
//Removes the random CQ "new * section" element which throws off slide index
$('.3-up-carousel .new').remove();

if (document.documentElement.clientWidth >= 1100) {
    $(function() {
        $('.promo-slides').slider({
            slideWidth: 310,
            minSlides: 2,
            maxSlides: 3,
            slideMargin: 25
        });
    });
}
if (document.documentElement.clientWidth <= 1099) {
    $(function() {
        $('.promo-slides').slider({
            slideWidth: 310,
            minSlides: 1,
            maxSlides: 2,
            slideMargin: 25
        });
    });
}

// Modal
$(".modal[data-modal]").each(function(){
    var id = $(this).data("modal");
    $(".smartLink a[data-modal="+id+"], .cta a[data-modal="+id+"]").click(function() {
        loadPopup(id);
        return false;
    });
});

$("a.modalGeneric").each(function(){
    $(this).click(function() {
        var url = $(this).attr("href");
        var height = $(this).data('iframe-height');
        var width = $(this).data('iframe-width');
        $('#modalGeneric iframe').remove();
        $('#modalGeneric').css('height',height).css('max-width',width);
        $('<iframe />').attr('src', url).appendTo('#modalGeneric .modal_content');
        $("#modalGeneric").fadeIn(0500);
        $("#backgroundPopup").fadeIn("normal");
        popupStatus = 1;
        return false;
    });
});

// event for close the popup
$("div.close").click(function() {
    disablePopup();
});

$(this).keyup(function(event) {
    if (event.which == 27) {
        disablePopup();
    }
});

$("div#backgroundPopup").click(function() {
    disablePopup();
});

// Functions
var popupStatus = 0;

function loadPopup(id) {
    if(popupStatus == 0) {
        $(".modal[data-modal="+id+"]").fadeIn(0500);
        $("#backgroundPopup").fadeIn("normal");
        popupStatus = 1;
    }
}

function disablePopup() {
    if(popupStatus == 1) {
        $(".modal").fadeOut("normal");
        $("#backgroundPopup").fadeOut("normal");
        popupStatus = 0;
    }
}
var Twc = Twc || {}
Twc.Localization = Twc.Localization || (function() {
    var REGION_ROOT = '/etc/tags/twc/location/region';

    var currentRegion = function() { return ClientContext.get('profile/region'); }

    var availableInCurrentRegion = function(page) { return availableInRegion(currentRegion(), page); }

    var availableInRegion = function(region, page) {
        var tags = page['tags'] || [];
        return tags.indexOf(REGION_ROOT) >= 0 || tags.indexOf(REGION_ROOT + "/" + region) >= 0;
    }

    return {
        availableInCurrentRegionFilter: availableInCurrentRegion
    };

}());
/**
  *  Contains code to return templates used with JSON for rendering HTML.  Current implementation is dust.js
  * @namespace
  */
var Twc = Twc || {}
Twc.Templates = (function() {
    // stores the template ID if compiled
    var compiledTemplates = {};
    var templateUrl = "/bin/twc/js-templates.txt/";

    /** Compiles a template and loads it into dust's cache
      * @param{String} id of template
      * @returns compiled template
      */
    function loadTemplate(id) {
        var template = Twc.Util.getUrl(templateUrl + id, 'text');
        var templateCompiled = dust.compile(template, id);
        dust.loadSource(templateCompiled);
        compiledTemplates[id] = 1;
    }

    return {
        /**
          * @returns rendered content string
          */
        getRenderedOutput : function(templateId, jsonData) {
            try {
                if (!compiledTemplates[templateId]) {
                    loadTemplate(templateId);
                }
                var rendered;
                dust.render(templateId, jsonData, function(err, out) {
                    rendered = out;                     
                });
                return rendered;
            } catch (e) { Twc.Util.catchError(e); }
        }
    };
})();

var Twc = Twc || {}
Twc.Util = Twc.Util || (function() {
    return {
        /** performs a synchronous URL fetch
          * @param {String} url url to fetch from
          * @param {String} [dataType] xml,json,script,html (values in compliance with jQuery $.ajax())
          * @returns contens of URL with data type inferred by MIME type response
          */
        getUrl : function(url, dataType) {
            try {
                var returnData = null;
                $.ajax({
                    async : false, // should be required to return data
                    url : url,
                    dataType : dataType, // use undefined if not provided in funciton

                    success : function(data, textStatus, jqXHR) {
                        returnData = data;
                    },
                    error : function(jqXHR, textStatus, e) {
                        Twc.Util.catchError(e);
                    }
                });
                return returnData;
            } catch (e) { Twc.Util.catchError(e); }
        },

        /** Used to catch errors and debug some useful info.  All try/catch blocks should utilize this feature
          * @param {Error} e 
          */
        catchError : function(e) {
            if (console) { // IE doesn't have console
                console.group(e.name+': '+e.message);
            }
            console.error(e);
            console.error(e.stack);
            if (console) {
                console.groupEnd();
            }
        }
    };
}());

CQ_Analytics.ClientContextUtils.onStoreRegistered('profile', function() {});

;(function($){
    "use strict";

    $.fn.geolocation = function(opts) {

        CQ_Analytics.ClientContextUtils.onStoreInitialized('profile', function() {
            if(typeof ClientContext.get('/profile/zip') === "undefined" &&
                typeof ClientContext.get('/profile/city') === "undefined" &&
                typeof ClientContext.get('/profile/state') === "undefined" &&
                typeof ClientContext.get('/profile/soaId') === "undefined" &&
                typeof ClientContext.get('/profile/region') === "undefined"){
                var geoLocation = getGeoLocationFromCookie();
                updateGeoLocationProfile(geoLocation);
            }
            
            updateClientContext(getNetworkDataFromCookie());
        }, true);

        var options = $.extend({
            cookieName: 'twc-user-profile',
            cookie: {
                path: '/',
                expires: 365
            },
            geoLocationServletURI: '/bin/services/geolocation.json',
            updateOnLoad: true,
            defaultGeoLocation: {
                city: 'New York',
                state: 'NY',
                postalCode: '10019',
                soaID: 'NYC.8150',
                region: 'NYC'
            }
        }, opts);
        
        /* Dyamically determine domain if not defined */
        if(! options.cookie.domain && location.hostname.match(/[\w\-]+\.[\w\-]+$/)) {
            options.cookie['domain'] = location.hostname.match(/[\w\-]+\.[\w\-]+$/)[0];
        }

        function setGeoLocation() {
            var geoLocation = getGeoLocationFromCookie();

            if(hasGeoLocationCookie()) {
                if(inFootprint(geoLocation)) {
                    updateLocationHeader(buildLocationString(geoLocation));
                }
                else {
                    $('.user-location input').val(geoLocation['postalCode']);
                    $('#twc-custLoc').html($('#oof-header-text').html());
                    $('#twc-custLocMobile').html($('#oof-header-text').html());
                    hideErrors();
                    if(! $.cookie('locerrorclosed')) {
                        showError("oof");
                        persistGeolocation();
                    }
                }
            }
            else {
                geoLocation = options.defaultGeoLocation;
                if(! $.cookie('locerrorclosed')) {
                    showError("noc");
                    persistGeolocation();
                }
            }

            CQ_Analytics.CCM.addListener('configloaded', function(){console.log('configloaded'); updateGeoLocationProfile(geoLocation)}, CQ_Analytics.ProfileDataMgr);
        }

        function inFootprint(geoLocation) {
            return(geoLocation && geoLocation.region && geoLocation.region.length > 0);
        }

        function hasGeoLocationCookie() {
            return(getGeoLocationFromCookie());
        }

        function handleChangeLocation(event) {
            var $target = $(this).closest(".user-location").find('input');

            if(! $target.val() ) {
                return;
            }
            eraseCookie();
            fetchGeoLocationData($target);
        }

        function getGeoLocationFromCookie() {
            var geoData = jQuery.parseJSON(getCookie());

            if(geoData && typeof(geoData['city']) === 'string') {
                geoData.city = geoData.city.replace(/\+/g, ' ');
            }

            return(geoData);
        }

        function getNetworkDataFromCookie() {
            var onNetwork = jQuery.parseJSON($.cookie("twc-geoip")) || { };
            return onNetwork["onNetwork"];
        }
        
        function fetchGeoLocationData($target) {
            $.getJSON(options.geoLocationServletURI + '?zip=' + $target.val(), function(geoLocation) {
                writeGeoLocationCookie(geoLocation);
                updateGeoLocationProfile(geoLocation);
                $.cookie('locerrorclosed', null, {path:'/'});
                location.reload(); // reload page so geo-aware components can initialize properly.
            }).error(function() {
                handleLocationChangeError();
            });
        }

        function handleLocationChangeError() {
            hideErrors();
            showError("geo");
            persistGeolocation();
        }

        function buildLocationString(geoLocation) {
            return(geoLocation ? geoLocation['city'] + ", " + geoLocation['state'] + " " + geoLocation['postalCode'] : "");
        }

        function updateLocationHeader(str) {
            if(str) {
                $('.user-location input').val('');
                $('input#custLoc').attr('checked', false);
                $('#twc-custLoc').html(str);
                var mobileString = "<span class=\"twc-mobile-city\">" + str.substr(0, str.length - 8) + " </span>" + str.substr(str.length - 8);
                $('#twc-custLocMobile').html(mobileString);
            }
        }

        function updateGeoLocationProfile(geoLocation) {
            if(geoLocation) {
                CQ_Analytics.ProfileDataMgr.setProperty('city', geoLocation['city']);
                CQ_Analytics.ProfileDataMgr.setProperty('state', geoLocation['state']);
                CQ_Analytics.ProfileDataMgr.setProperty('zip', geoLocation['postalCode']);
                CQ_Analytics.ProfileDataMgr.setProperty('soaId', geoLocation['soaID']);
                CQ_Analytics.ProfileDataMgr.setProperty('region', geoLocation['region']);
            }
        }

        function updateClientContext(onNetwork) {
            CQ_Analytics.ProfileDataMgr.setProperty('onNetwork', ((onNetwork) ? 'true' : 'false'));
            $.event.trigger({ type: "initGTM" });
        }
        
        function writeGeoLocationCookie(locationData) {
            setCookie(JSON.stringify(locationData));
        }

        function setCookie(data) {
            $.cookie(options.cookieName, data, options.cookie);
        }

        function getCookie() {
            return($.cookie(options.cookieName));
        }

        function eraseCookie() {
            $.cookie(options.cookieName, null, options.cookie);
        }

        function hideErrors() {
            $('.user-location-errors .message').addClass('hidden');
        }

        function showError(errorID) {
            $('.' + errorID + '-error').removeClass('hidden');
        }
        
        function persistGeolocation() {
            $('li.twc-drop-nav').addClass('persist');

            // set #custLoc checkbox :checked
            $('input#custLoc').prop('checked', true);
            
            // deselect mobile nav menu dropdowns when other is selected 
            $('input[name=navradio]').click(function(e) {  
                var radChecked = $(this).data('checked') || false;
                $('input[name=navradio]').data('checked', false);
                if (radChecked) {
                    this.checked = false;
                    $(this).data('checked', false);
                } else {
                   this.checked = true;
                   $(this).data('checked', true);
                }
            });
        }

        return this.each(function() {

            $(this).data('initialized', true);
            
            // Set the location text initially (on page reload)
            setGeoLocation();

            $(this).find('.user-location input:visible').on({
            
                focus: function() {
                    // Maintain the visible state of the drop-down while cursor focus is in the location input element
                    jQuery.noop();
                },
                blur: function() {
                    // Hide the change-location drop down when focus on input text element is lost
                    jQuery.noop();
                },
                keydown: function(e) {
                    // Listen for enter key...
                    e.which === 13 ? handleChangeLocation({target:this}) : false;
                },
                keyup: function(e) {
                    // Hide error message if input element is cleared out
                    if(!e.target.value) {
                        hideErrors();
                    }
                }
            });

            $(this).find('.btn.geoloc-btn > button').on('click', handleChangeLocation);
        });
    }
})(jQuery);

$(document).ready(function(){
    $('.user-location').filter(function() {
        return $(this).data('initialized') !== true;
    }).each(function() {
        $(this).geolocation();
    });
});


// Place page specific jQuery here

jQuery(document).ready(function(){
    jQuery('li.heading .categoryName').click(function() {
        jQuery(this).toggleClass('expanded');
        jQuery(this).parent().children('ul').slideToggle();
    });
});
;(function($) {
    "use strict";

    $.fn.paymentCentersResp = function(opts) {
        var paymentCenters = [];
        var counter = 0;

        // TODO: redundant code from user-location FIXME
        var options = $.extend({
            cookieName: 'twc-user-profile',
            cookie: {
                path: '/',
                expires: 365
            },
            geoLocationServletURI: '/bin/services/geolocation.json',
            updateOnLoad: true,
            defaultGeoLocation: {
                city:       'New York',
                state:      'NY',
                postalCode: '10019',
                soaID:      'NYC.8150',
                region:     'NYC'
            }
        }, opts);

        /* Dyamically determine domain if not defined */
        if(! options.cookie.domain && location.hostname.match(/[\w\-]+\.[\w\-]+$/)) {
            options.cookie['domain'] = location.hostname.match(/[\w\-]+\.[\w\-]+$/)[0];
        }


        // Default maximum search radius (miles). Results with distance greater than this are omitted.
        var MAX_DISTANCE = 100;
        var MAX_RESULTS  = 10;

        // For calculating great circle distance
        if(typeof(Number.prototype.toRad) === "undefined") {
            Number.prototype.toRad = function() {
                return this * Math.PI / 180;
            };
        }

        // Array Remove - By John Resig (MIT Licensed)
        if(typeof(Array.prototype.prune) === 'undefined') {
            Array.prototype.prune = function(from, to) {
                var rest = this.slice((to || from) + 1 || this.length);
                this.length = from < 0 ? this.length + from : from;
                return this.push.apply(this, rest);
            };
        }

        $('div#addressForm form').submit(function(e) {
            e.preventDefault();
            //console.log('submitted with', $('div#addressForm #address').val(), arguments);
            geoLocate($('div#addressForm #address').val(), function() {
                //console.log('Geolocate returned: ', arguments);
                $('#addressForm form')[0].reset();
                $.fancybox.close(true);

                doLocalization(ClientContext.get('/profile/zip'));
            });
        });

        // Fade out error msg on keydown in form input field
        $('div#addressForm input[type=text]').keydown(function(e){
            if($('div#addressForm div.notification').is(':visible')) {
                $('div#addressForm div.notification').fadeOut('slow');
            }
        });

        // TODO: This should rely on events fired from the parent container
        initialize();

        function initialize() {
            // SoCal work-around: If the expression provided to display alternative value evaluates to true,
            // the alternative SoCal message is displayed and we simply don't initialize
            //if(twc.paymentCenters.soCalExpression) {
            //    if(eval(twc.paymentCenters.soCalExpression) === true) {
            //        $("#paymentcenter-text-alternative").show();
            //        $("#paymentcenter-text-default").hide();
            //        $('.paymentcenterresults').empty();
            //        paymentCenters.length = 0;
            //        return;
            //    } else {
            //        $("#paymentcenter-text-alternative").hide();
            //        $("#paymentcenter-text-default").show();
            //    }
            //}

            $('.paymentcenterresults').empty();
            paymentCenters.length = 0;

            if(ClientContext.get('/profile/zip')) {
                //console.log('Geolocating using zip:', ClientContext.get('/profile/zip'));
                geoLocate(ClientContext.get('/profile/zip'), function() { getPaymentCenters(ClientContext.get('/profile/zip')); });
            }
            else {
                // No coordinates or address -- display modal prompting for address
                //$.fancybox({href: '#addressForm','width': 720, 'height': 130});
                $('.paymentcenterresults').append(
                    $('<li>').append(
                        $('.paymentcenterCookiesNotEnabled').val()
                ));
            }
        }

        /**
         * Perform geolocation on a given address and invoke callback upon success.
         * This stores the geographic coordinates in the profile store automatically.
         * @param address  Address on which geolocation is performed
         * @param callback Function to invoke upon successful geolocation
         */
        function geoLocate(address, callback) {
            // Call geocoder service to get lat/lon of current location
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                address: address
            }, function(locResult, status) {
                //console.log(arguments);
                if(status === 'OK') {
                    try {
                        var zipCode;
                        for(var i=0; i< locResult.length; i++) {
                            for(var j=0; j < locResult[i].address_components.length; j++) {
                                if(jQuery.inArray('postal_code', locResult[i].address_components[j].types) >= 0) {
                                    zipCode = locResult[i].address_components[j].short_name;
                                    //console.log('Got postal_code: ', zipCode);
                                    ClientContext.set('/profile/startlat1', locResult[i].geometry.location.lat());
                                    ClientContext.set('/profile/startlng1', locResult[i].geometry.location.lng());
                                    //console.log('Set lat/lng:', ClientContext.get('/profile/startlat1'), ClientContext.get('/profile/startlng1'));
                                    break;
                                }
                            }
                        }
                        if(zipCode) {
                            $.getJSON(options.geoLocationServletURI + '?zip=' + zipCode, function(geoLocation) {
                                // Since you changed your location, we need to get your new soaId/region
                                writeGeoLocationCookie(geoLocation);
                                updateGeoLocationProfile(geoLocation);
                                callback();
                            }).error(function() {
                                    // Bad zip or out of footprint
                                    notify('Error: Specified address is either not found or out of our service area. Please try a different address.');
                                    //TODO no payment centers returned, alert the user that no payment centers were found in their area
                                    //     using their local.
                                    $('.paymentcenterresults').append(
                                        $('<li>').append(
                                            $('.paymentcenterNoStoresFound').val()
                                    ));

                                });
                        }
                        else {
                            //console.log('No zip!');
                            notify('Error: Please enter a more specific address or include a zipcode');
                        }
                    } catch(e) {
                        console.log('Geocoding error:', e);
                    }
                } else {
                    // Not OK.
                    //console.log('Error geolocating address:', status);
                    notify('Error: Specified address is either not found or out of our service area. Please try a different address.');
                }
            });
        }


        function writeGeoLocationCookie(locationData) {
            setCookie(JSON.stringify(locationData));
        }

        function setCookie(data) {
            $.cookie(options.cookieName, data, options.cookie);
        }

        function updateGeoLocationProfile(geoLocation) {
            //console.log('Updating geolocation profile:', geoLocation);
            if(geoLocation) {
                ClientContext.set('/profile/city', geoLocation['city']);
                ClientContext.set('/profile/state', geoLocation['state']);
                ClientContext.set('/profile/zip', geoLocation['postalCode']);
                ClientContext.set('/profile/soaId', geoLocation['soaID']);
                ClientContext.set('/profile/region', geoLocation['region']);
            }
        }

        /**
         * Fetch payment centers with request to QueryBuilder, calculate a rough distance using haversine great circle
         * calculation, sort by rough distance, weed out centers further than MAX_DISTANCE, then calculate an accurate
         * distance with DistanceMatrix service, and, finally, append resulting centers to the DOM.
         */
        function getPaymentCenters(zip) {
            var queryURI = "/bin/services/paymentcenters." + zip + ".json";
            //console.log("Fetching locations from: ", queryURI);

            $.getJSON(queryURI, function(data) {
                $.each(data.locations, function(idx, pc) {
                    // Store unique identifier for this center
                    this['id'] = idx;

                    // Save lat/lon and build formatted address here for convenience
                    var lat = parseFloat(this.location.lat);
                    var lng = parseFloat(this.location.lng);
                    this.address = this.location.addressLine1 + '<br/>' + this.location.city + ', ' + this.location.state + ' ' + this.location.zip;
                    this.streetLoc = this.location.addressLine1;
                    this.city = this.location.city;
                    this.state = this.location.state;
                    this.zip = this.location.zip;
                    this.cityState = this.location.city + ', ' + this.location.state + ' ' + this.location.zip;
                    // Do an initial great circle distance estimate to filter out far away results within this region
                    var greatCircleDistance = distance({lat: ClientContext.get('/profile/startlat1'), lon: ClientContext.get('/profile/startlng1')}, {lat:lat, lon:lng}, 'm');
                    if(greatCircleDistance <= MAX_DISTANCE) {
                        paymentCenters.push({
                            gcDistance: greatCircleDistance,
                            paymentCenter: this
                        });
                    }
                });

                if(paymentCenters.length <= 0) {
                    $('#payment-center-notice').html('No locations found near address. Please try entering a different address.');
                    $('.paymentcenterresults').append(
                        $('<li>').append(
                            $('.paymentcenterNoStoresFound').val()
                    ));
                }

                if(paymentCenters.length > MAX_RESULTS) {
                    paymentCenters.prune(MAX_RESULTS, paymentCenters.length-1);
                }

                // Perform more granular distance calculation using DistanceMatrix service
                calcDistGoogle();
            });
        }

        /**
         * Calculates distance between origin and payment centers using DistanceMatrix API
         */
        function calcDistGoogle() {
            var startLat = ClientContext.get('/profile/startlat1');
            var startLon = ClientContext.get('/profile/startlng1');
            var startLocation = new google.maps.LatLng(startLat, startLon);

            $('.paymentcentermaps .loaderimage').html('Loading: ' + paymentCenters.length + ' payment center details');

            $.each(paymentCenters, function(idx, p) {
                var pc = p.paymentCenter;

                /*write div structure*/
                $('.paymentcentershidden').prepend('<li class="outputdiv outputDiv' + pc.id + '"></li>');

                paymentCenters[idx]['idx'] = idx;
                paymentCenters[idx]['divName'] = 'outputDiv' + pc.id;

                var paymentCenterLocation = new google.maps.LatLng(pc.location.lat, pc.location.lng);

                // TODO: This really needs to be outside the loop and batch up into a single request
                calculateDistances(startLocation, paymentCenterLocation, p);
            });
        }

        /**
         * Calculate distance to payment center using Google DistanceMatrix service
         * @param {Object} origin Decimal degree coordinates of origin location
         * @param {Object} destination Decimal degree coordinates of payment center
         * @param {Object} p Object containing paymentCenter
         */
        function calculateDistances(origin, destination, p) {
            var pc = p.paymentCenter;
//            console.log('calculateDistances(): ', pc);
            if(!pc.notes) { pc.notes = ""; }
            var service = new google.maps.DistanceMatrixService();
            service.getDistanceMatrix({
                origins: [origin],
                destinations: [destination],
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.IMPERIAL,
                avoidHighways: false,
                avoidTolls: false
            }, function(response, status) {
                if(status === google.maps.DistanceMatrixStatus.OK) {
                    var origins = response.originAddresses;
                    var outputDiv = $('.outputdiv.' + p.divName);
                    var newStoreText = $('.newStoreText');
                    var encodedAddress = encodeURI(pc.address.replace("<br/>"," "));
                    var mapUrl = "https://maps.google.com/maps?q="+pc.streetLoc.replace(' ','+') + "+"+ pc.city.replace(' ','+') + ",+"+ pc.state + "+"+ pc.zip;

                    outputDiv.html('<a href="'+ mapUrl +'" target="_blank">' + pc.displayName + '</a><address>' + pc.streetLoc + '<br/>' + pc.cityState + '</address>');
                    if (pc.isNewStore != null && pc.isNewStore === 'true') {
                        outputDiv.append('<div class="btn flag twc-right">' + newStoreText.val() + '</div>');
                    }
                    for(var i = 0; i < origins.length; i++) {
                        var results = response.rows[i].elements;
                        if(results !== undefined) {
                            for(var j = 0; j < results.length; j++) {
                                outputDiv.addClass(results[j].distance.value);
                            }
                        }
                    }
                } else {
                    console.log('Error occurred in DistanceMatrix calculation: ' + status);
                }

                counter++;
                if(counter === paymentCenters.length) {
                    finalSort();
                    counter = 0;
                }
            });
        }

        /**
         * Perform final-pass sort on payment center divs by distance
         */
        function finalSort() {
            var hiddenDiv = $('.paymentcentershidden');
            var myArray = $('.outputdiv');
            myArray.sort(function(a, b) {
                var d1 = parseInt($(a).attr("class").split(' ')[1], 10);
                var d2 = parseInt($(b).attr("class").split(' ')[1], 10);
                if(d1 > d2) {
                    return 1;
                } else if(d1 < d2) {
                    return -1;
                } else {
                    return 0;
                }
            });
            var topThree = new Array();
            for (var i = 0; i < myArray.length;i++) {
                topThree[i] = myArray[i];
                if (i >= 2) {
                    hiddenDiv.remove();
                    break;
                }
            }

            $('.paymentcenterresults').append(topThree);
        }

        /**
         * Calculate approximate distance between two points on the Earth using Great Circle
         * @param {Object} p1 First point in decimal degrees
         * @param {Object} p2 Second point in decimal degrees
         * @param {String} unit K (kilometers), M (statute miles), N (nautical miles)
         * @return {Number} Distance between the two points in the units specified.
         */
        function distance(p1, p2, unit) {
            var R = 6371; // Radius of the earth in km
            var dLat = (p2.lat - p1.lat).toRad();  // Javascript functions in radians
            var dLon = (p2.lon - p1.lon).toRad();
            var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(Number(p1.lat).toRad()) * Math.cos(Number(p2.lat).toRad()) * Math.sin(dLon/2) * Math.sin(dLon/2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            var d = R * c; // Distance in km
            if(unit.toLowerCase() === 'm') { d *= 0.621371; } // Convert to statute miles if needed.
            return(d);
        }

        /**
         * Trigger localization, reloads page for teasers, etc
         * @param {String} zip
         */
        function doLocalization(zip) {
            $('#twc-location-popup input').val(zip);
            $('#twc-location-popup button').trigger('click');
        }

        /**
         * Display a notification in the address form modal using a fast fade
         * @param {String} msg The message to display
         */
        function notify(msg) {
            $('div#addressForm div.notification').html("<div>"+msg+"</div>").fadeIn('fast');
        }
    };
})(jQuery);

// Place page specific jQuery here

jQuery(function() {
    $('#region').val(ClientContext.get('/profile/region'));
    $('#faq-question').val($('.faq-label').text());
    $('#faq-url').val(window.location.href);
    $('#category_hierarchy').val($('.faq-banner').text());

    // Uncheck radio buttons
    $('input:radio').attr('checked', false);

    $('#no').click(function() {
        $('div.faq-survey-no').show();
        $('#faq-survey-feedback-response').show();

        $('#faq-survey-feedback').hide();
        $('.faq-survey-right .btn').addClass('twc-left');
    });

    $('#yes').click(function() {
        $('div.faq-survey-no').hide();
        $('.faq-survey-no textarea').val('')
        $('#faq-survey-feedback').removeClass('twc-left');
        $('#faq-survey-feedback').show();
    });


    $('.faq-survey-right .btn').click(function(e) {
        e.preventDefault();
        if($('#honeypot').val() !== "") return false;

        if ($('#yes').is(':checked')) {
            $.get('/bin/twc/faqfeedback', $('#faq-survey').serialize()).done(function() {
                $('.faq-survey fieldset').hide();
                $('div.faq-survey-yes-response').show();
            });
        } else {
            $('div.faq-survey-no').show();
            $(this).addClass('twc-left');
            $('#faq-survey-feedback').hide();
            $('#faq-survey-feedback-response').show();
        }
        return true;
    });

    $('.faq-survey-no .btn').click(function (e) {
        e.preventDefault();
        if($('#honeypot').val() !== "") return false;

        if($('.faq-survey-no textarea').val() != '') {
            $.get('/bin/twc/faqfeedback', $('#faq-survey').serialize()).done(function() {
                $('.faq-survey fieldset').hide();
                $('.faq-survey-no').hide();
                $('.faq-survey-no-response').show();
            });
        }
        return true;
    });
});

;(function($){
    "use strict";

    $.fn.displayAll = function() {

        // Events
        var DID_RECEIVE_DATA = 'didReceiveData', DID_RECEIVE_DATA_EMPTY = 'didReceiveEmpty',
            FAILED_RECEIVE_DATA = 'failedReceiveData', SUBTOPICS_EXIST="foundSubtopics",
            DID_RECEIVE_SUBTOPICS = 'didRecieveSubtopics', CLICK = 'click',
            CHANGE = 'change';

        // Defaults for authorable parameters
        var DEFAULT_SUBTOPIC_LIMIT = -1;
        var DEFAULT_QUESTION_LIMIT = -1;

        var compiledTemplates = {};

        var isAnalyticsLOBClickAutomated = true;
        var isAnalyticsTopicClickAutomated = true;

        String.prototype.compareTo = function(str) { return this === str ? 0 : (this > str ? 1 : -1); }
        function byTitle(a, b) { return a.title.compareTo(b.title); }

        // User changed LOB
        function userChangedLOB(event) {
            var $target = $(event.target);
            var path = $target.attr("value");
            var title = $target.text();
            $.ajax({
                url: path + '.html',
                error: function() { $target.trigger(FAILED_RECEIVE_DATA); }
            });

            $.ajax({
                url: '/bin/twc/childpages.2.json' + path +"?properties=navTitle",
                success: function(data) {
                    var subtopicLimit = $target.closest('.faq-nav-display').data('subtopicLimit');
                    subtopicLimit || (subtopicLimit = DEFAULT_SUBTOPIC_LIMIT)
                    useNavTitle(data);
                    data = subtopicLimit >= 0 && data.length > subtopicLimit ? data.slice(0, subtopicLimit) : data;
                    data.length > 0 ? $target.trigger(DID_RECEIVE_DATA, [{title:title, path:path + '.html', items:data}]) : $target.trigger(DID_RECEIVE_DATA_EMPTY);
                }
            });

            // LOB change Analytics
            if (typeof(s) !== 'undefined' && isAnalyticsLOBClickAutomated === false) {
                s.linkTrackVars = "eVar6,prop19";
                s.prop19 = title; 
                s.tl(this,'o',s.prop19);

                // the next topic change will be automated, now we're marking it so analytics
                // do not record it.
                isAnalyticsTopicClickAutomated = true;
            } else {
            	// this LOB change was automated, now we're marking the rest as user
            	// initiated (and skipping the first auto selected Topic) so the analytics are recorded.
            	isAnalyticsLOBClickAutomated = false;
            	isAnalyticsTopicClickAutomated = true;
            }
        }

        function loadLOBTemplate(event, data) {
            var templateID = 'faq-topics-content';
            compiledTemplates[templateID] || loadTemplate(templateID);

            var $target = $(event.target);
            var $faqTopics=$target.parent().parent().parent().find('#twc-FAQTopicsContent');

            $target.closest(".faq-nav-display > section").data("sorttopics") && data.items.sort(byTitle)
            dust.render(templateID, data, function(err, out) { $faqTopics.html($(out)); });
            $('span.FAQLabel:last').addClass('twc-last');
            var topicsArr = $.find("span.FAQLabel");
            $.each(data.items,function(){
                $.each(this.children,function(){
                    if(this.type=="residential/components/page/faq-category"){
                    var pathValue=this.path;
                    $.each(topicsArr,function(){
                           if(pathValue.indexOf(this.attributes.value.value)==0){
                            $(this).addClass("arrow");
                           }
                        });
                    }
                });
            });
            $target.closest('.faq-nav-display').find('.twc-FAQs .twc-FAQTopics span.FAQLabel').first().trigger(CLICK);
        }

        function clearLOBTemplate(event, data) {
            var $target = $(event.target);
            var title = $target.text();
            $('.twc-FeaturedFAQsTitle').text(title + " FAQs");

            var $faqNavDiv =  $target.closest('.faq-nav-display');
            $faqNavDiv.find('.twc-FAQs .twc-FAQTopics #twc-FAQTopicsContent').html("");
            $faqNavDiv.find('.twc-FAQs .twc-topicFAQs .twc-FeaturedFAQs').html("");
            $faqNavDiv.find('.twc-FAQs .twc-topicFAQs .twc-FAQListings').html("No questions available for this topic.");
            $faqNavDiv.find('.twc-FAQs .twc-topicFAQs .twc-SubTopics').html("");
        }
        // User changed Topic
        function userChangedTopic(event) {
            event.stopPropagation();
            changedFeatured(event);
            var $target = $(event.target);
            if($target.hasClass('expanded')){
                $target.addClass('active');
                $target.next().next('.catSubtopic').find('ul').slideUp();
                $target.removeClass('expanded');
                //$target.removeClass('expanded');
            }
            else if($target.parent().parent().children().children('.expanded').length>0){  //if clicked on a topic at the top level
                $target.parent().parent().children().children('.expanded').next().next('.catSubtopic').children('ul').slideUp();//.delay(1000).remove();
                $target.parent().parent().children().children('.expanded').removeClass('expanded');
                changeTopic(event);
            }
            else{
                changeTopic(event);
            }
        }
        function changeTopic(event){
            var $target = $(event.target);
            var path = $target.attr("value");
            var title = $target.text();
            $('.twc-FeaturedFAQsTitle').text(title + " FAQs");
            $target.closest('#twc-FAQTopicsContent').find('span.FAQLabel').each(function(){
                $(this).removeClass('active');
            });
            $target.addClass('active');
            //this is chrome specific to force refresh of css
            $('body').addClass('refresh');
            //this is chrome specific to force refresh of css
            $('body').removeClass('refresh');
            $.ajax({
                url: '/bin/twc/childpages.2.json' + path + "?properties=navTitle",
                data: {properties: 'hideInChat'},
                success: function(data) {
                    var subTopics=[];
                    var allSubTopics=[];
                    var questionList=[];
                    var currSubTopicsCount = 0;
                    var currQuestionsCount = 0;
                    var childHasSubtopic = false;

                    $.each(data,function(){
                        if(this.type=='residential/components/page/faq-category'){
                        	if(maxSubTopics == 0 || currSubTopicsCount < maxSubTopics){
                        	    var currSub={subtopicTitle:this.title,items:this.children};
                                subTopics.push(currSub);
                                currSubTopicsCount += 1;
                            }
                            $.each(this.children,function(){
                                if(this.type=="residential/components/page/faq-category"){
                                    childHasSubtopic = true;
                                }
                            });
                            allSubTopics.push({title:this.title,path:this.path,downArrow:childHasSubtopic});
                            childHasSubtopic = false;
                        }
                        else{
                        	if(maxQuestions == 0 || currQuestionsCount < maxQuestions){
                                questionList.push(this);
                                currQuestionsCount += 1;
                        	}
                        }
                    });
                    var subtopicLimit = $target.closest('.faq-nav-display').data('subtopicLimit') || (subtopicLimit = DEFAULT_SUBTOPIC_LIMIT);
                    subTopics = (subtopicLimit >= 0 && data.length > subtopicLimit) ? subTopics.slice(0, subtopicLimit) : subTopics;

                    var $divSubTopics = $target.closest('.faq-nav-display').find('.twc-FAQs .twc-topicFAQs .twc-SubTopics');
                    (subTopics.length > 0) ? $divSubTopics.trigger(SUBTOPICS_EXIST, [{items:subTopics}]) : $divSubTopics.html("");

                    var questionLimit = $target.closest('.faq-nav-display').data('questionLimit') || (questionLimit = DEFAULT_QUESTION_LIMIT);
                    questionList = (questionLimit >= 0 && questionList.length > questionLimit) ? questionList.slice(0, questionLimit) : questionList;

                    // we want to use this logic later when we're displaying sub-topics, but not right now.
                    $target.trigger(DID_RECEIVE_DATA, [{items:questionList}]);

                    (allSubTopics.length > 0 && $($target,'#twc-FAQTopicsContent').parents('ul').length<4) ? $target.trigger(DID_RECEIVE_SUBTOPICS,[{items:allSubTopics}]) : $target.find('.catSubtopic').html("");

                    // add the twc-last class to ever last li in a ul
                    $target.closest('.faq-nav-display').find('.twc-FAQs .twc-topicFAQs ul').each(function(){
                    	$(this).find('li').last().addClass('twc-last');
                    });
                    // Hide this div if it was visible before
                    if ($target.next('.content.mobile').is(":visible")) {
                        $target.next('.content.mobile').removeClass('mobile');
                    } else {
                        // close other open mobile divs
                        $target.parent().find('.content').each(function(){
                        	$(this).removeClass('mobile');
                        });

                        //var mobileFeatured = $('<div>').append($('.twc-topicFAQs .twc-FeaturedFAQs').clone()).html();
                        var mobileListings = $('<div>').append($('.twc-topicFAQs .twc-FAQListings').clone()).html();
                        var mobileSubTopics = $('<div>').append($('.twc-topicFAQs .twc-SubTopics').clone()).html();
                        $target.next('.content').html(mobileListings + mobileSubTopics).toggleClass('mobile');
                    }
                }
            });

            // Topic change Analytics
            if (typeof(s) !== 'undefined' && isAnalyticsTopicClickAutomated === false) {
                s.linkTrackVars = "eVar6,prop19,prop37,eVar48";
                s.prop37=s.eVar48 = title;
                s.prop19 = "contact topic > " + s.prop37;
                s.tl(this,'o',s.prop19);
            } else {
                // this topic change was automated, now we're marking the rest as user
                // initiated so the analytics are recorded.
            	isAnalyticsTopicClickAutomated = false;
            }
        }


        function useNavTitle(data){
            $.each(data,function(){
                if(this.navTitle!=undefined){
                    this.title=this.navTitle;
                }
            });
        }
         //TODO:change this to work for new subtopic
        function loadTopicSubTopicTemplate(event, data) {
            var templateID = 'faq-topics-subtopic-content';
            compiledTemplates[templateID] || loadTemplate(templateID);
            var $target = $(event.target);
            var $faqSubTopics=$target.next().next('.catSubtopic');

            $target.closest(".faq-nav-display > section").data("sortsubtopics") && data.items.sort(byTitle)

            dust.render(templateID, data, function(err, out) { $faqSubTopics.html($(out)); });
            $faqSubTopics.find('ul').slideDown();
            $('span.FAQLabel:last').addClass('twc-last');
            $target.addClass('expanded');
            //this is chrome specific to force refresh of css
            $('body').addClass('refresh');
            //this is chrome specific to force refresh of css
            $('body').removeClass('refresh');
            $target.find('span.FAQLabel').first().trigger(CLICK);
        }
        function loadTopicTemplate(event, data) {
            event.stopPropagation();
            var $target = $(event.target);
            $target.data('questions', data.items);
            var templateID = 'faq-listings-content';
            compiledTemplates[templateID] || loadTemplate(templateID);
            var data = {items:$target.data('questions')};
            dust.render(templateID, data, function(err, out) { $target.closest('.twc-FAQs').find('.twc-topicFAQs .twc-FAQListings').html($(out)); });
            $('.twc-FAQListings li:last').addClass('twc-last');
        }

        function changedFeatured(event) {
            event.stopPropagation();
            var $target = $(event.target);
            var path = $target.attr("value");
            var url=$(location).attr('href');
            $.ajax({
                url: '/bin/twc/childpages.1.json' + path +'?properties=jcr:description,pageViews',
                success: function(data) {
                    var features=removeCategories(data);
                    features.sort(function(a,b){
                        return parseInt(b.pageViews) - parseInt(a.pageViews);
                    });
                    var questionLimit = 3;
                    features = features.length > questionLimit ? features.slice(0, questionLimit) : features;
                    features.length > 0 ? $target.closest('.twc-FAQs').find('.twc-topicFAQs .twc-FeaturedFAQs').trigger(DID_RECEIVE_DATA, [{items:features}]) : $target.closest('.twc-FAQs').find('.twc-topicFAQs .twc-FeaturedFAQs').html("");
                }
            });
        }

        function loadFeaturedTemplate(event, data) {
            event.stopPropagation();
            var $target = $(event.target);
            $target.data('questions', data.items);
            var templateID = 'faq-features-content';
            compiledTemplates[templateID] || loadTemplate(templateID);
            $.each($target.data('questions'), function() {
                this['description']=this['jcr:description'];
                this['contReading']=contReading;
            });
            var data = {items:$target.data('questions')};
            dust.render(templateID, data, function(err, out) { $target.closest('.twc-FAQs').find('.twc-topicFAQs .twc-FeaturedFAQs').html($(out)); });
        }

        function removeCategories(data){
            var features=[];
            $.each(data,function(){
                if(this.type!='residential/components/page/faq-category'){
                    features.push(this);
                }
            });
            return features;
        }

        function loadSubTopicTemplate(event,data){
            event.stopPropagation();
            var $target = $(event.target);
            $target.data('questions', data.items);

            var templateID = 'faq-subtopics-content';
            compiledTemplates[templateID] || loadTemplate(templateID);
            var data = {items:$target.data('questions')};
            dust.render(templateID, data, function(err, out) { $target.parent().parent().parent().find('.twc-topicFAQs .twc-SubTopics').html($(out)); });
            $('.twc-SubTopics li:last').addClass('twc-last');
        }

        return this.each(function() {
            var $displayAll = $(this);
            $displayAll.data('subtopicLimit', DEFAULT_SUBTOPIC_LIMIT);
            $displayAll.data('questionLimit', DEFAULT_QUESTION_LIMIT);

            $displayAll.on(CHANGE, '.twc-FAQs select', userChangedLOB)
                .on(DID_RECEIVE_DATA, '.twc-FAQs select', loadLOBTemplate)
                .on(DID_RECEIVE_DATA_EMPTY, '.twc-FAQs select', clearLOBTemplate)
                .on(CLICK, '.twc-FAQs .twc-FAQTopics span.FAQLabel', userChangedTopic)
                .on(DID_RECEIVE_DATA, '.twc-FAQs .twc-FAQTopics span.FAQLabel', loadTopicTemplate)
                .on(DID_RECEIVE_DATA, '.twc-FAQs .twc-topicFAQs .twc-FeaturedFAQs', loadFeaturedTemplate)
                .on(DID_RECEIVE_SUBTOPICS,'.twc-FAQs #twc-FAQTopicsContent span.FAQLabel.active',loadTopicSubTopicTemplate)
                .on(SUBTOPICS_EXIST,'.twc-FAQs .twc-topicFAQs .twc-SubTopics',loadSubTopicTemplate);

            var $category = null;
            var url = $(location).attr('href');
            if(url.indexOf('#')!=-1){
                var strAfterHashTag=url.substring(url.indexOf('#')+1);
                $category = $displayAll.find('.twc-FAQs select option').filter(function(index) {
                    return this.innerText==strAfterHashTag || this.innerText == decodeURI(strAfterHashTag);
                });
                $('.twc-FAQs select').val($category.val());
            }
            else{
                $category = $displayAll.find('.twc-FAQs select option').filter(function(index) {
                	return ($(this).attr("selected") == "selected");
                }).first();
            }
            if($category.length == 0){
                $category = $(".twc-FAQs select option:first")
            }
            $category.trigger(CHANGE);
        });
    };
})(jQuery);

$(document).ready(function () {
    $('.faq-nav-display').displayAll();
});

;(function($){
    "use strict";

    var SOAID = CQ_Analytics.ProfileDataMgr.getProperty('soaId');
    
    dust.filters["nodash"] = function(value) { return value.replace(/\-/g, "") };
    
    $.fn.contactUs = function() {
        
        // Events
        var WILL_EXPAND = 'willExpand', WILL_COLLAPSE = 'willCollapse',
            WILL_REFRESH = 'willRefresh', DID_RECEIVE_DATA = 'didReceiveData',
            DID_RECEIVE_DATA_EMPTY = 'didReceiveEmpty', FAILED_RECEIVE_DATA = 'failedReceiveData', 
            WILL_COMPLETE_EXPAND = 'willCompleteExpand', DID_EXPAND = 'didExpand',
            DID_COLLAPSE = 'didCollapse', CLICK = 'click', CHANGE_STEP = 'changeStep',
            DID_CHANGE_STEP = 'didChangeStep', DID_REFRESH = 'didRefresh';
        
        // Defaults for authorable parameters
        var DEFAULT_IVR_PATH = '/etc/tags/residential/ivr-keyword',
            DEFAULT_SUBTOPIC_LIMIT = -1,
            DEFAULT_QUESTION_LIMIT = -1;
        
        function didClickLOB(event) {
            var $heading = $(event.target).parent('li.heading');
            var eventName = {collapsed:WILL_EXPAND, expanded:WILL_COLLAPSE}[$heading.data('state')];
            $(event.target).closest('.twc-contactUs').find('.twc-step3 .step-container, .twc-step2 .step-container').hide(); 
            eventName && $heading.trigger(eventName);           
        }
        
        function willExpandLOB(event) {
            var $target = $(event.target);
            $target.siblings().trigger(WILL_COLLAPSE);
            $target.trigger($target.children('.content').length == 0 ? WILL_REFRESH : WILL_COMPLETE_EXPAND);
        }
        
        function willRefreshLOB(event) {
            var $target = $(event.target);
            var path = $target.children('h5').attr('path');
            var title = $target.children('h5').text();
            $.ajax({
                url: path + '.html',
                error: function() { $target.trigger(FAILED_RECEIVE_DATA); }
            });
            
            $.ajax({
                url: '/bin/twc/childpages.1.json' + path,
                success: function(data) { 
                    var subtopicLimit = $target.closest('.twc-contactUs').data('subtopicLimit');
                    subtopicLimit || (subtopicLimit = DEFAULT_SUBTOPIC_LIMIT)
                    data = subtopicLimit >= 0 && data.length > subtopicLimit ? data.slice(0, subtopicLimit) : data;
                    data.length > 0 ? $target.trigger(DID_RECEIVE_DATA, [{title:title, path:path + '.html', items:data}]) : $target.trigger(DID_RECEIVE_DATA_EMPTY);
                }
            });
        }
        
        function didReceiveLOBData(event, data) {
            var templateID = 'contact-us-lob-content';
            compiledTemplates[templateID] || loadTemplate(templateID);
            
            var $target = $(event.target);
            dust.render(templateID, data, function(err, out) { $target.append($(out)); });
            $target.trigger('didRefresh');
            $target.trigger(WILL_COMPLETE_EXPAND);
        }
        
        function didReceiveEmptyLOBData(event) {
            var $target = $(event.target);
            $target.data('state', 'empty');
            $target.children('h5').addClass('empty');
        }
        
        function failedReceiveLOBData(event, data) {            
            var $target = $(event.target);
            $target.data('state', 'error');
            $target.children('h5').addClass('error');
            $target.trigger('failedRefresh');
        }
        
        function willCompleteExpandLOB(event) {
            var $target = $(event.target)
            $target.children('.content').show().siblings('a.stepButton').addClass('inline-block');
            $target.trigger(DID_EXPAND);
        }
        
        function willCompleteExpandStep1(event) {
            $(event.currentTarget).find('.backTo').show();
        }
        
        function didExpandLOB(event) {
            var $target = $(event.target);
            $target.data('state', 'expanded');
            $target.children('h5').addClass('expanded');
            $target.siblings('li.heading').hide();
        }
                
        function willCollapseLOB(event) {
            var $target = $(event.target);
            $target.children('.content').hide().siblings('a.stepButton').removeClass('inline-block');
            $target.trigger(DID_COLLAPSE);
        }
        
        function willCollapseStep1(event) {
            $(event.currentTarget).find('.backTo').hide();
        }
        
        function didCollapseLOB(event) {
            var $target = $(event.target);
            $target.data('state', 'collapsed');
            $target.children('h5').removeClass('expanded');
            $target.siblings('li.heading').show();
        }
        
        function didClickTopic(event) {
            var $target = $(event.target);
            $target.closest('.twc-step1').find('li.heading .content li.active').removeClass('active');
            $target.parent('li').addClass('active');
            $target.closest('.twc-contactUs').find('.twc-step3 .step-container').hide();
            $target.parent('li').trigger(WILL_EXPAND);
        }
        
        function willExpandTopic(event) {
            event.stopPropagation();
            var $target = $(event.target);
            $target.trigger($target.data('questions') ? WILL_COMPLETE_EXPAND : WILL_REFRESH);
        }
        
        function willRefreshTopic(event) {
            event.stopPropagation();
            var $target = $(event.target);
            var path = $target.children('a').attr('path');
            
            $.ajax({
                url: '/bin/twc/childpages.1.json' + path,
                data: {properties: 'hideInChat'},
                success: function(data) { 
                    var questionLimit = $target.closest('.twc-contactUs').data('questionLimit');
                    questionLimit || (questionLimit = DEFAULT_QUESTION_LIMIT);
                    data = questionLimit >= 0 && data.length > questionLimit ? data.slice(0, questionLimit) : data;
                    data.length > 0 ? $target.trigger(DID_RECEIVE_DATA, [{items:data}]) : $target.trigger(DID_RECEIVE_DATA_EMPTY); 
                }
            });
        }
        
        function didReceiveTopicData(event, data) {
            event.stopPropagation();
                        
            var $target = $(event.target);
            $target.data('questions', data.items);
                        
            $target.trigger('didRefresh');
            $target.trigger(WILL_COMPLETE_EXPAND);
        }
        
        function willCompleteExpandTopic(event) {
            event.stopPropagation();
            
            var templateID = 'contact-us-topic-content';
            compiledTemplates[templateID] || loadTemplate(templateID);

            var $target = $(event.target);
            var data = {items:$target.data('questions')};          
            dust.render(templateID, data, function(err, out) { $target.closest('.twc-contactUs').find('.twc-step2 .step-container .questions').replaceWith($(out)); });
            
            $target.closest('.twc-contactUs').find('.twc-step2 .step-container .questions').show().next('.stepButton').addClass('inline-block');
            $target.trigger(DID_EXPAND);
        }
        
        function didExpandTopic(event) {
            var $contactUs = $(event.target).closest('.twc-contactUs');
            $contactUs.trigger(CHANGE_STEP, [2]);
            $contactUs.find('.twc-step2 .step-container .questions dd').hide();
            $contactUs.find('.twc-step2 .step-container .questionsContinue').hide();
            $contactUs.find('.twc-step2 .step-container .changeQuestions').hide();
        }
        
        function changeStep(event, stepNumber) {
            var $currentStep = $('.twc-step' + stepNumber);
            $currentStep.find('.step-container').show().find('*').show();
            $currentStep.find('h6.twc-backgroundGradient-4:first').addClass('active').next('.end-arrow').addClass('active');
            $currentStep.prevAll().find('h6.twc-backgroundGradient-4:first').addClass('step-completed').closest('div').addClass('active');
            
            if(stepNumber <= 2) {
                $('html, body').animate({
                    scrollTop: $currentStep.find('h6:first').offset().top
                }, 300);
            }

            $(event.target).closest('.twc-contactUs').trigger(DID_CHANGE_STEP, [stepNumber]);
        }

        function didChangeStep(event, stepNumber) {
            
            if(stepNumber == 3) {
                $('.twc-step3 .step-container #callUs').find('*:not(h5:first)').hide();
            }
            
            if(stepNumber == 3 && $('.twc-step2 .step-container .questions .displayQuestion a').attr('hideinchat') === 'true') {
                $('.twc-step3 .step-container .callMeMaybe:not(#callUs)').hide();
            }
        }

        function getQuestionData($question) {
            return $.grep($('.twc-step1 li.heading .content li.active').data('questions'), 
                function(question) { return question.title === $question.children('a').text(); })[0];
        }
        
        function didClickQuestion(event) {
            $(event.target).closest('dt').trigger(WILL_EXPAND); 
            $('.twc-contactUs').find('.twc-step2 .step-container .stepButton').hide();   
        }
        
        function willExpandQuestion(event) {
            var $target = $(event.target);
            var foundAnswer = $target.next('dd').html();
            
            var $activeTopic = $target.closest('.twc-contactUs').find('.twc-step1 li.heading .content li.active');
            if($activeTopic.data('questions')) {
                foundAnswer || (foundAnswer = getQuestionData($target).answer);
            }
                                
            $target.trigger(foundAnswer ? WILL_COMPLETE_EXPAND : WILL_REFRESH);
        }
        
        function willRefreshQuestion(event) {
            var $target = $(event.target);
            var path = $target.children('a').attr('path');
            
            $.ajax({
                dataType: 'text',
                url: '/bin/twc/faq-answer.txt' + path,
                success: function(data) { 
                    data && (getQuestionData($target).answer = data);
                    $target.trigger(WILL_COMPLETE_EXPAND);
                    $target.trigger('didRefresh');
                }
            });
        }
        
        function willCompleteExpandQuestion(event) {
            var $target = $(event.target).addClass('displayQuestion');
            $target.next('dd').html() || $target.next('dd').html(getQuestionData($target).answer);
            $target.next('dd').show();
            $target.trigger(DID_EXPAND);
        }
        
        function didExpandQuestion(event) {
            var $target = $(event.target);
            $target.siblings('dt').trigger(WILL_COLLAPSE);
            
            var $contactUs = $target.closest('.twc-contactUs');
            $contactUs.find('.twc-step2 .step-container .changeQuestions').show();
            $contactUs.find('.twc-step2 .step-container .questionsContinue').toggle().addClass('active');
            $contactUs.trigger(CHANGE_STEP, [3]);
            $contactUs.find('.twc-step3 .step-container #callUs .keywords').trigger(WILL_REFRESH);
            $(event.target).closest('.twc-contactUs').find('#openStep3').hide();
            
        }
        
        function willCollapseQuestion(event) {
            var $target = $(event.target);
            $target.siblings('dt.displayQuestion').length == 0 ? $target.show() : $target.hide();
            $target.next('dd').hide();
            $target.trigger(DID_COLLAPSE);
        }
        
        function didClickStep1Header(event) {
            $(event.target).closest('.twc-contactUs').trigger(CHANGE_STEP, [1]);
        }
        
        function didClickChat(event) {
            $(event.target).closest('.twc-contactUs').find('.chatUI').show();
            $(event.target).closest('.twc-contactUs').find('.chatUI-.transcript').hide();
        }
                
        function didClickBackTo(event) {
            $(event.target).closest('.twc-contactUs').find('.twc-step1 li.heading:has(h5.expanded)').trigger(WILL_COLLAPSE);
            $(event.target).closest('.twc-contactUs').find('.twc-step3 .step-container, .twc-step2 .step-container').hide();
            
        }
        
        function didClickChangeQuestion(event) {
            $(event.target).hide().closest('.twc-contactUs').find('.twc-step2 .step-container .questions dt').removeClass('displayQuestion').trigger(WILL_COLLAPSE);
            $(event.target).closest('.twc-contactUs').find('#openStep3').show();
            $(event.target).closest('.twc-contactUs').find('.questionsContinue').hide();
            $(event.target).closest('.twc-contactUs').find('.twc-step3 .step-container').hide();             
        }
        
        function willRefreshIVRKeywords(event) {
            var $target = $(event.target);
            var $contactUs = $target.closest('.twc-contactUs');
            var path = $contactUs.find('.twc-step2 .step-container .questions .displayQuestion a').attr('path');
            if(path) {
                $.ajax({
                    dataType: 'json',
                    url: path + '/jcr:content.tags.json',
                    success: function(data) {
                        var ivrPath = $contactUs.data('ivrPath');
                        ivrPath || (ivrPath = DEFAULT_IVR_PATH);
                        data.tags = $.grep(data.tags, function(tag){ return tag.path.substring(0,ivrPath.length) === ivrPath });
                        var tags = [];
                        $.each(data.tags, function(index, tag){ tags.push(tag.title) });
                        if(tags.length > 1) { tags[data.tags.length - 1] = 'and ' + tags[tags.length - 1]; }
                        if(tags.length > 0) { $target.removeClass('hidden').find('span em').text(tags.join(', ')).closest('.keywords').trigger(DID_REFRESH); }
                        else { $target.addClass('hidden'); }
                    }
                });
            }
            else{
             $target.addClass('hidden');
            }
        }
        
        function willToggleCallUsSection(event) {
            var $target = $(event.target);
            $target.trigger($target.hasClass('expanded') ? WILL_COLLAPSE : WILL_EXPAND);
            
        }
        
        function willExpandCallUsSection(event) {
            var $target = $(event.target);
            $target.closest('#callUs').find('*:not(h5:first,.keywords.hidden)').show();
            $target.trigger(DID_EXPAND);
        }
        
        function didExpandCallUsSection(event) {
            $(event.target).addClass('expanded');
        }
        
        function willCollapseCallUsSection(event) {
            var $target = $(event.target);
            $target.closest('#callUs').find('*:not(h5:first)').hide();
            $target.trigger(DID_COLLAPSE);
        }
        
        function didCollapseCallUsSection(event) {
            $(event.target).removeClass('expanded');
        }
        
        function didChangeToQuestion3(event) {
            var $target = $(event.target);
            $target.siblings('dt').trigger(WILL_COLLAPSE);
            var $contactUs = $target.closest('.twc-contactUs');
            $contactUs.trigger(CHANGE_STEP, [3]);
            $contactUs.find('.twc-step3 .step-container #callUs .keywords').trigger(WILL_REFRESH);
            $contactUs.find('#openStep3').hide();
            $('html, body').animate({ scrollTop: $contactUs.find('.twc-step3 h6').offset().top }, 300);                 
        }

        return this.each(function() {
            
            var $contactUs = $(this);
            $contactUs.data('ivrPath', DEFAULT_IVR_PATH);
            $contactUs.data('subtopicLimit', DEFAULT_SUBTOPIC_LIMIT);
            $contactUs.data('questionLimit', DEFAULT_QUESTION_LIMIT);
            
            $contactUs.on(CLICK, 'li.heading h5', didClickLOB)
                .on(WILL_EXPAND, 'li.heading', willExpandLOB)
                .on(WILL_REFRESH, 'li.heading', willRefreshLOB)
                .on(DID_RECEIVE_DATA, 'li.heading', didReceiveLOBData)
                .on(DID_RECEIVE_DATA_EMPTY, 'li.heading', didReceiveEmptyLOBData)
                .on(FAILED_RECEIVE_DATA, 'li.heading', failedReceiveLOBData)
                .on(WILL_COMPLETE_EXPAND, 'li.heading', willCompleteExpandLOB)
                .on(WILL_COMPLETE_EXPAND, '.twc-step1', willCompleteExpandStep1)
                .on(DID_EXPAND, 'li.heading', didExpandLOB)
                .on(WILL_COLLAPSE, 'li.heading', willCollapseLOB)
                .on(WILL_COLLAPSE, '.twc-step1', willCollapseStep1)
                .on(DID_COLLAPSE, 'li.heading', didCollapseLOB)
                .on(CLICK, '.twc-step1 li.heading .content li a', didClickTopic)
                .on(WILL_EXPAND, '.twc-step1 li.heading .content li', willExpandTopic)
                .on(WILL_REFRESH, '.twc-step1 li.heading .content li', willRefreshTopic)
                .on(DID_RECEIVE_DATA, '.twc-step1 li.heading .content li', didReceiveTopicData)
                .on(WILL_COMPLETE_EXPAND, '.twc-step1 li.heading .content li', willCompleteExpandTopic)
                .on(DID_EXPAND, '.twc-step1 li.heading .content li', didExpandTopic)
                .on(CLICK, '.twc-step2 .step-container .questions dt', didClickQuestion)
                .on(WILL_EXPAND, '.twc-step2 .step-container .questions dt', willExpandQuestion)
                .on(WILL_REFRESH, '.twc-step2 .step-container .questions dt', willRefreshQuestion)
                .on(WILL_COMPLETE_EXPAND, '.twc-step2 .step-container .questions dt', willCompleteExpandQuestion)
                .on(DID_EXPAND, '.twc-step2 .step-container .questions dt', didExpandQuestion)
                .on(WILL_COLLAPSE, '.twc-step2 .step-container .questions dt', willCollapseQuestion)
                .on(CLICK, '.callMeMaybe:not(#callUs) h5', didClickChat)
                .on(CLICK, '.twc-step1 h6', didClickStep1Header)
                .on(CLICK, '.twc-step1 .backTo', didClickBackTo)
                .on(CLICK, '.twc-step2 .changeQuestions', didClickChangeQuestion)
                .on(CHANGE_STEP, changeStep)
                .on(DID_CHANGE_STEP, didChangeStep)
                .on(WILL_REFRESH, '.twc-step3 .step-container #callUs .keywords', willRefreshIVRKeywords)
                .on(CLICK, '.twc-step3 .step-container #callUs h5:first', willToggleCallUsSection)
                .on(WILL_EXPAND, '.twc-step3 .step-container #callUs h5:first', willExpandCallUsSection)
                .on(DID_EXPAND, '.twc-step3 .step-container #callUs h5:first', didExpandCallUsSection)
                .on(WILL_COLLAPSE, '.twc-step3 .step-container #callUs h5:first', willCollapseCallUsSection)
                .on(CLICK,'#openStep3, .questionsContinue',didChangeToQuestion3)
                .on(DID_COLLAPSE, '.twc-step3 .step-container #callUs h5:first', didCollapseCallUsSection);
        
            $contactUs.find('li.heading').data('state', 'collapsed');
            if($('#displayThirdStepColumn').val() != "true"){
                $contactUs.find('*[class^="twc-step"]:not(:has(.twc-backgroundGradient-4.active)) .step-container *').hide();
            }

            
            // Load path for IVR Keywords and List Limits
            $.ajax({
                dataType: 'json',
                url: window.location.pathname.replace('.html', '/jcr:content/' + $contactUs.attr('name') + '.json'),
                success: function(data) {
                    if(data.ivrPath != undefined) { $contactUs.data('ivrPath', data.ivrPath); }
                    if(data.subtopicLimit != undefined && parseInt(data.subtopicLimit) != NaN) { $contactUs.data('subtopicLimit', data.subtopicLimit); }
                    if(data.questionLimit != undefined && parseInt(data.questionLimit) != NaN) { $contactUs.data('questionLimit', data.questionLimit); }
                }
            });
        });    
    };
})(jQuery);

$(document).ready(function () {
    $('.twc-contactUs').append($('.twc-contactUs .twc-step3 .chatUI')); // Chat UI needs to be a siblings of the Contact Us step DIVs
    $('.twc-contactUs').contactUs(); 
});

;(function($){
    "use strict";
    var SOAID = CQ_Analytics.ProfileDataMgr.getProperty('soaId');
    
    dust.filters["nodash"] = function(value) { return value.replace(/\-/g, ""); }
    
    $.fn.contactCall = function() {
    
        // Events
        var DID_RECEIVE_DATA = "didReceiveData", DID_RECEIVE_DATA_EMPTY = "didReceiveDataEmpty";
        
        // CSS Selectors
        var SUPPORT_NUMBER_LIST_SELECTOR = ".callMeMaybe .content";

        var testMode = false, forceQuery = '';
        
        function didReceiveConfigData(event) {
            if(testMode) return;
            
            // Load support numbers
            var $supportNumberList = $(event.target).find(SUPPORT_NUMBER_LIST_SELECTOR);
            $.ajax({
                dataType: 'json',
                url: '/bin/twc/supportNumbers.json/' + (forceQuery ? forceQuery : SOAID),
                success: function(data) { data.length > 0 ? $supportNumberList.trigger(DID_RECEIVE_DATA, [{items:data}]) : $supportNumberList.trigger(DID_RECEIVE_DATA_EMPTY); }
            });
        }
        
        function didReceiveSupportNumberData(event, data) {
            var templateID = 'support-numbers-content';
            compiledTemplates[templateID] || loadTemplate(templateID);
            
            var $target = $(event.target);
            $target.find(".contactInfo").remove();
            dust.render(templateID, data, function(err, out) { $target.append($(out)); });
            $target.trigger('didRefresh');
        }
                
        return this.each(function() {
            var $contactCall = $(this);
            
            $contactCall.on(DID_RECEIVE_DATA, didReceiveConfigData)
                .on(DID_RECEIVE_DATA, SUPPORT_NUMBER_LIST_SELECTOR, didReceiveSupportNumberData);
            
            // Check for contact-call test mode
            $.ajax({
                dataType: 'json',
                url: window.location.href.replace('.html', '/jcr:content.2.json'),
                success: function(data) {
                    var contactCall = data["contact-us"] ? data["contact-us"]["contact-call"] : null;

                    var tm = contactCall ? contactCall.testMode : null;
                    testMode = tm ? tm.toLowerCase() === 'true': testMode;

                    var fq = contactCall ? contactCall.forceQuery : "";
                    forceQuery = fq ? fq : forceQuery;
                },
                complete: function() {
                    $contactCall.trigger(DID_RECEIVE_DATA);
                }
            });

        });        
    };
})(jQuery);

$(document).ready(function () { $('.twc-contactUs .contact-call').contactCall(); });
var chatPrompt = chatPrompt || {};
chatPromptIdleTime = 0;
chatPrompt.presetTime = 1000; // setting time to go by milliseconds
var chatIdleInterval;
var chatModalLink = "";
var enabledVal = "";
chatTimerLength = 180;
$(document).ready(function () {
    if ($('#chat-prompt-module').length > 0) {
        var currentSoaId;

        //Zero the idle timer on mouse movement.
        $(this).mousemove(function (e) {
            chatPromptIdleTime = 0;
        });
        $(this).keypress(function (e) {
            chatPromptIdleTime = 0;
        });

        // get users soaid and if they have not entered one use default New York soaid
        var soaid = CQ_Analytics.ProfileDataMgr.getProperty('soaId');
        if (typeof(soaid)==='string' && soaid!=='') {
            currentSoaId = soaid;
        } else {
            currentSoaId = "NYC.8150";
        }

        $.getJSON('/content/bin/soaid/proactiveChatPrompt', function(data) {
            var soaObj = data[currentSoaId];
            var chatObj = soaObj["proactiveChatPrompt"];
            enabledVal = chatObj["enabled"].toString();
            if (enabledVal === 'true'){
                var disabled = $('#disabled').val();
                if (disabled !== 'true') {
                    if(! $.cookie('chatPromptCookie')) {
                        chatModalLink = $('#modalLink').val();
                        chatTimerLength = $('#timerlength').val();
                        if (chatModalLink !== '') {
                            //Increment the idle time counter
                            chatIdleInterval = setInterval("timerIncrement()", chatPrompt.presetTime);
                        }
                    }
                }
            }
        });
    }
})
function timerIncrement() {
    chatPromptIdleTime = chatPromptIdleTime + 1;
    if (chatPromptIdleTime > chatTimerLength) {
        clearInterval(chatIdleInterval);
        $.get(chatModalLink + '.html #chatPrompt', function(data) {
            $("#popupMessage").html($(data).find('#chatPromptModal').html());
            if (typeof(s) !== 'undefined') {
                // analytics code for when the modal appears
                var oldPageName = s.pageName;
                s.events="event97";
                s.pageName="chatpop_idle";
                s.channel="chatpop_idle";
                s.eVar50="chatpop_idle|"+oldPageName;
                s.eVar67="ChatPop_idle";
                s.eVar68=oldPageName;
                s.t();
            }

            var options = {
                path: '/'
            };
            // cookie to prevent multiple popups in single browser session
             $.cookie("chatPromptCookie","chatPrompt",options);
             loadPopup("chat-prompt");
        });
    }
}

;(function($){
    "use strict";
    var SOAID = CQ_Analytics.ProfileDataMgr.getProperty('soaId');

    $.fn.chat = function() {
        // Make Chat UI Draggable
        $( ".chatUI" ).draggable();

        // Events
        var SUBMIT = 'submit', DID_RECEIVE_DATA = 'didReceiveData', DID_RECEIVE_DATA_EMPTY = 'didReceiveEmpty',
            CLICK = 'click';

        var chatTopicsTestMode = true; // Assume chat topics are in test mode until the code tells otherwise

        function didReceiveConfigData(event) {
            if(chatTopicsTestMode) { return; }

            // Load chat topics
            var $select = $(event.target).find('.chatUI-.middle #chatForm #ccPreSurvey .selectBox');
            $.ajax({
                dataType: 'json',
                url: '/bin/twc/chatQueues.json/' + SOAID,
                success: function(data) { data.length > 0 ? $select.trigger(DID_RECEIVE_DATA, [{items:data}]) : $select.trigger(DID_RECEIVE_DATA_EMPTY); }
            });
        }

        function htmlspecialchars(str) {
            return str.replace(/(&|"|'|\\|\/|<|>|(|)|script|alert)/g,"");
        }

        function didSubmitForm(event) {
            var $chat = $(event.target).closest('.chatUI');
            var firstName = $chat.find("#ccChatFirstName").val();
            firstName=htmlspecialchars(firstName);
            var phone = $chat.find("#ccChatTelephone").val();
            phone=htmlspecialchars(phone);
            var chatTopic = $chat.find("#ccChatTopic").val();
            var problem = $chat.find("#ccChatProblem").val();
            problem=htmlspecialchars(problem);

            var $selectedOption = $chat.find("#ccChatTopic option:selected");
            var errorMessage = $selectedOption.attr('data-errormessage') ? $selectedOption.attr('data-errormessage') : null;
            if(errorMessage){
                alert(errorMessage);
                return false;
            }

            var dataString = 'ccChatFirstName='+ firstName + '&ccChatTelephone=' + phone + '&ccChatTopic=' + chatTopic + '&ccChatProblem=' + problem;
            $.ajax({
                type: "POST",
                url: "/bin/support/chat",
                data: dataString,
                success: function() {
                    $chat.find('#ccPreSurvey').hide();
                    $chat.find('.chatUI-.bottom').hide();
                    $chat.find('#transcript').show();
                    $chat.find('.chatUI-.footnote').hide();
                    $chat.find('.chatUI-.middle').show();
                }
            });
            return false;
        }

        function didReceiveTopicData(event, data) {
            var templateID = 'chat-topics-content';
            compiledTemplates[templateID] || loadTemplate(templateID);

            var $target = $(event.target);
            $target.find("#ccChatTopic option:not(:first)").remove();
            dust.render(templateID, data, function(err, out) { $target.find("#ccChatTopic").append($(out)); });
            $target.trigger('didRefresh');
        }

        function didClickPresurvey(event) {
            var $chat = $(event.target).closest('.chatUI');
            $chat.find('#ccStartChatButton').show();
            $chat.find('.chatUI-.bottom .language').hide();
            $chat.find('.chatUI-.bottom .show_transcript').show();

            $chat.find('#ccPreCheck').hide();
            $chat.find('#ccPreSurvey').show();
            if ($chat.find('#new').is(':checked')) {
                $chat.find('#ccChatTelephone').removeAttr('required');
            } else {
                $chat.find('.telephoneInput').show();
                $chat.find('.chatUI-.footnote').show();
            }
        }

        function willExpandChatTranscript(event)  {
            $('.chatUI-.bottom').addClass('active');
            $('.chatUI-.transcript').show();
            $('.chatUI-.footnote').show();
            return false;
        }

        function didCollapseChatTranscript(event)    {
            $('.chatUI-.transcript').hide();
            $('.chatUI-.bottom').removeClass('active');
            return false;
        }

        function didClickClose(event){
           var $chat = $(event.target).closest('.chatUI');

           if($.cookie('chatEnabled')) {
                $('.darkOverlay').show();
                $('#ccCloseConfirm').show();
                $.cookie('restartSession', null);
            } else {
                $('.chatUI').hide();
                $.cookie('restartSession', 'true');
            }
        }

        return this.each(function() {
            var $chat = $(this);

            $chat.on(SUBMIT, '#chatForm', didSubmitForm)
                .on(DID_RECEIVE_DATA, '.chatUI-.middle #chatForm #ccPreSurvey .selectBox', didReceiveTopicData)
                .on(CLICK, 'input[type=radio]', didClickPresurvey)
                .on(CLICK, '#hidewindow', didClickClose)
                .on(DID_RECEIVE_DATA, didReceiveConfigData)
                .on(CLICK,'#transcript',willExpandChatTranscript)
                .on(CLICK,'#hide_transcript',didCollapseChatTranscript);
            // Check for chat topics test mode
            $.ajax({
                dataType: 'json',
                url: window.location.href.replace('.html', '/jcr:content.2.json'),
                success: function(data) {
                    var chat = data["contact-us"] ? data["contact-us"]["chat"] : null;
                    var testMode = chat ? chat.testMode : null;
                    chatTopicsTestMode = testMode ? (chat.testMode.toLowerCase() === 'true') : false;
                },
                complete: function() { $chat.trigger(DID_RECEIVE_DATA); }
            });

        });

    };
})(jQuery);

$(document).ready(function () { $('.twc-contactUs .chatUI').chat(); });

var chatPanel;
var chatSpinner;
var Disconnected = false;
window.ChatInitialized = false;

jQuery(function() {
  $("#ccExitChat").click(function(){
    $("#ccContainer").unblock();
    ccPlugin.CloseSession();
    $("#ccCloseConfirm").hide();
    $("#ccChatOutput").hide();
    $(".darkOverlay").hide();
    $("#ccTypingStatus").hide();
    $("#ccChatInput").hide();
    $("#ccSendButton").hide();
  });
  $("#ccCancelExit").click(function(){
    $("#ccContainer").unblock();
    $("#ccCloseConfirm").hide();
    $(".darkOverlay").hide();
  });
  $("#ccRCDisable").click(function(){
    $("#ccRCDisable").hide();
    $("#ccRCEnable").show();
    raPlugin.RAStateControl.RemoteControlEnable(1);
  });
  $("#ccRCEnable").click(function(){
    if($.cookie("acceptedEULA") != "true") {
      $.blockUI({css: {"z-index": "50000", cursor: "default", left: "100px", top: "5px", width: "620px", height: "420px"}, message: $("#ccEULA") });
    } else {
      $("#ccRCEnable").hide();
      $("#ccRCDisable").show();
      raPlugin.RAStateControl.RemoteControlEnable(2);
    }
  });
  $("#ccAcceptEULA").click(function(){
    $.unblockUI();
    $.cookie("acceptedEULA", "true", {"path":"/"});
    $("#ccRCEnable").hide();
    $("#ccRCDisable").show();
    raPlugin.RAStateControl.RemoteControlEnable(2);
  });
  $("#ccDeclineEULA").click(function(){
    $.unblockUI();
  });
  $('#ccChatEmail').keyup(function() {
    $(this).attr('required', '');
    if($(this).val() === "") {
      $(this).removeAttr('required');
    }
  });
  $('#ccChatTelephone').focus(function(){
    $('#ccChatTelephone').attr('required', '');
  });
});

/* Add LENGTH property support for TEXTAREA form elements */
jQuery(function($) {
  var ignore = [8,9,13,33,34,35,36,37,38,39,40,46];
  var eventName = 'keypress';
  $('textarea[maxlength]').live(eventName, function(event) {
    var self = $(this),
    maxlength = self.attr('maxlength'),
    code = $.data(this, 'keycode');
    if (maxlength && maxlength > 0) {
      return ( self.val().length < maxlength || $.inArray(code, ignore) !== -1 );
    }
  }).live('keydown', function(event) {
    $.data(this, 'keycode', event.keyCode || event.which);
  });
});

jQuery(function($) {
  if(!window.chatLoaded) {
    window.chatLoaded = true;
    window.ccPlugin = $.ConsonaChat;
    window.csPlugin = $.ConsonaSurvey;
    window.raPlugin = $.ConsonaRemote;
    window.ccOptions = $.ConsonaChat.options;
    window.ccChatState = $.ConsonaChat.enumSessionState;
    window.ccMsgType = $.ConsonaChat.enumMessageType;
    if(ccPlugin.GetSessionState()=="waiting" || ccPlugin.GetSessionState()=="working" || ccPlugin.GetSessionState()=="escalate") {
      restartChat();
    } else {
      ccPlugin.ResetSession();
    }
  }
});

function EnableInputs() {
  $("#ccChatInput").removeAttr("disabled");
}

function DisableInputs() {
  $("#ccChatInput").attr("disabled",true);
}

function setChatEnvironment() {
  $('a').live('click',function(){if(String(this.href).indexOf("#")<0){ccOptions.inFormOrLink=true;}});
  ccOptions.hookUnload = true;

  $.cookie('chatEnabled', 'true');
  $("#ccContainer, #ccChatOutput").show();
  $("#ccWait").show();

  ccOptions.displayNode = "#ccChatOutput";
  ccOptions.inputNode   = "#ccChatInput";
  ccOptions.sendButton  = "#ccSendButton";

  ccPlugin.events.onError = function (Msg) {
    if(Msg.toLowerCase().indexOf("queue not available") > -1) {
      $("#ccWait").hide();

      $("#ccChatStatusImg").attr("src","https://supportcenter.timewarnercable.com/sdccommon/lachat/images/scic_chat_unavailable.gif");
      $("#ccChatStatusMsg").text($(".ccQueueNotAvailableMessage").val());
      $("#ccChatStatusBar").fadeIn(500);
      Disconnected = true;
      DisableInputs();
    }
  };

  ccPlugin.events.onPoll = function () {
    if(Disconnected) {
      if($.ConsonaChat.GetSessionState()=="waiting") {
        $("#ccChatStatusImg").attr("src","https://supportcenter.timewarnercable.com/sdccommon/lachat/images/scic_chat_connecting_flash.gif");
        $("#ccChatStatusMsg").text($(".ccWaitMessage").val());
        DisableInputs();
      } else {
        $("#ccChatStatusBar").fadeOut(500);
        EnableInputs();
      }
    }
    Disconnected = false;
  };

  ccPlugin.events.onStateChange = function (Status) {
    switch(Status) {
      case ccChatState.ready:
        break;
      case ccChatState.working:
    	if ($(".cc_msgtype_advlog_waiting_none").length > 0) {
          $("#ccChatOutput").bind("DOMSubtreeModified",function() {
            $(".cc_msgtype_advlog_waiting_none").remove();
            $("#ccChatOutput").unbind("DOMSubtreeModified");
          });
        }
    	$("#ccTypingStatus").show();
        $("#ccChatStatusBar").fadeOut(500);
        EnableInputs();
        break;
      case ccChatState.closed:
      	if ($(".cc_msgtype_advlog_waiting_none").length > 0) {
          $(".cc_msgtype_advlog_waiting_none").remove();
        }
      	// Make sure the chat window is completely "closed"
        $("#ccChatOutput, #ccTypingStatus, #ccChatInput, #ccSendButton").hide();
        $("#ccChatOutput").empty();
        $(".loading").not(".loading.second").html($(".ccClosingChatSessionMessage").val());
        $("#ccWait").show();
        chatSpinner = new Spinner({lines:12,length:7,width:4,radius:10,color:'#fff',speed:1,trail:50,shadow:false}).spin(document.getElementById('ccSpin'));
        break;
      case ccChatState.waiting:
      case ccChatState.escalate:
        $("#ccChatStatusBar").fadeIn(500);
        DisableInputs();
        break;
      case ccChatState.error:
        break;
      default:
    }
  };

  ccPlugin.events.onSessionComplete = function () {
    $("#chatwindow").fadeOut('fast');
    $("#ccContainer").hide();
    $("#ccRCDisable").hide();
    $("#ccRCEnable").hide();
    $("#ccRemoteControl").hide();
    $("#controlsdiv").html("");
    showSurvey();
  };

  ccPlugin.events.onTypingChange = function (User) {
    if(User.user_type == "analyst" && User.typing=="true") $("#ccTypingStatus").fadeIn(250);
    if(User.user_type == "analyst" && User.typing=="false") $("#ccTypingStatus").fadeOut(250);
  };
}

function RestartRemote() {
   $("#ccRCEnable").hide();
   $("#ccRCDisable").show();
   raPlugin.RAStateControl.RemoteControlEnable(0);
   setTimeout("raPlugin.RAStateControl.RemoteControlEnable(2)", 500);
}

function restartChat() {
  $("#ccPreSurvey").hide();
  $("#ccWait").hide();

  setChatEnvironment();

  $.ConsonaChat.RestartSession();
  try {
    if (window.raPlugin.ActiveXControl.MeetsControlsRequirements()) {
      window.raPlugin.Start(ccPlugin.sessionData.username,ccPlugin.sessionData.room,ccPlugin.sessionData.queue,true);
      if($.cookie("RemoteStatus") == "2") {
        setTimeout("RestartRemote()", 1000);
      } else {
        $("#ccRCDisable").hide();
        $("#ccRCEnable").show();
      }
    }
  } catch(e) {}

  if($.ConsonaChat.events.onStateChange) $.ConsonaChat.events.onStateChange($.ConsonaChat.sessionData.sessionstate);
  var pos = $("#chatinvite").offset();
  $("#chatwindow").css({"left":(pos.left-40)+"px","top":(pos.top+65)+"px"});
  $("#chatwindow").fadeIn('fast');
  setTimeout("SendURL()", 1000);
}

function htmlspecialchars(str) {
  return str.replace(/(&|"|'|\\|\/|<|>|(|)|script|alert)/g,"");
}

function SendURL() {
  ccPlugin.SendMessage({msgType: ccMsgType.internal, msgText: $("ccUserHasNavigatedToURLMessage").val() + ' ' + window.location});
}

function ccStartChat() {
  var selectedOption = $('#ccChatTopic option:selected');
  var errorMessage = selectedOption.attr('data-errormessage') ? selectedOption.attr('data-errormessage') : null;
  var SOAID = CQ_Analytics.ProfileDataMgr.getProperty('soaId');
  var ZIP = CQ_Analytics.ProfileDataMgr.getProperty('zip');

  if(errorMessage){ return false; }

  if(ValidatePreSurvey()) {
    $("#ccPreSurvey, .transcript").hide();
    $("#ccContainer").show();
    $('.chatUI-.bottom, .chatUI-.footnote').hide();
    $("#ccChatInput, #ccSendButton, #ccTypingStatus").hide();

    chatSpinner = new Spinner({lines:12,length:7,width:4,radius:10,color:'#fff',speed:1,trail:50,shadow:false}).spin(document.getElementById('ccSpin'));

    ccPlugin.ResetSession();

    setChatEnvironment();

    var userName = $("#ccChatFirstName").val();
    userName = htmlspecialchars(userName);

    var chatProblem = $("#ccChatProblem").val();
    chatProblem = htmlspecialchars(chatProblem );

    var chatPhone = $("#ccChatTelephone").val();
    chatPhone = htmlspecialchars(chatPhone);

    ccPlugin.sessionData.username = userName;
    ccPlugin.sessionData.firstname = userName.split(' ').slice(0,1).join(" ");
    ccPlugin.sessionData.lastname = userName.split(' ').slice(-1).join(' ');
    ccPlugin.sessionData.emailaddress = $("#ccChatEmail").val();
    ccPlugin.sessionData.street = "";
    ccPlugin.sessionData.aptnum = "";
    ccPlugin.sessionData.city = "";
    ccPlugin.sessionData.state = "";
    ccPlugin.sessionData.zipcode = ZIP;
    ccPlugin.sessionData.phone = chatPhone;
    ccPlugin.sessionData.accountnumber = "";
    ccPlugin.sessionData.pin = "";
    ccPlugin.sessionData.securitynumber = "";
    ccPlugin.sessionData.division = SOAID;
    ccPlugin.sessionData.chatreasons = $("#ccChatTopic option:selected").text();
    ccPlugin.sessionData.queue = $("#ccChatTopic").val();
    ccPlugin.sessionData.statementofproblem = chatProblem;
    ccPlugin.sessionData.language = "en";

    var MobileDevices = ["Netbook","Tablet","Mobile"];
    ccPlugin.sessionData.mobile = (jQuery.inArray(ccPlugin.sessionData.device, MobileDevices) >= 0) ? "True" : "False";

    ccPlugin.sessionData.sendtranscript = "yes";
    DisableInputs();

    ccPlugin.CreateSession(function() {
      $("#ccWait").hide();
      chatSpinner.stop();
      $("#ccChatInput, #ccSendButton").show();
      $("#ccChatOutput").empty().append(
        $("<p>").addClass("cc_msgtype_advlog_waiting_none").append(
          $(".ccWaitMessage").val())
      );

      try {
        if (window.raPlugin.ActiveXControl.MeetsControlsRequirements()) {
          window.raPlugin.Start(ccPlugin.sessionData.username,ccPlugin.sessionData.room,ccPlugin.sessionData.queue,false);
          $("#ccRCDisable").hide();
          $("#ccRCEnable").show();
        }
      } catch(e) {}
    });
  }
}

function ClearPreSurvey() {
  $("#ccChatFirstName").val("");
  $("#ccChatLastName").val("");
  $("#ccChatTelephone").val("");
  $("#ccChatEmail").val("");
  $("#ccChatProblem").val("");
  $("#ccDeviceDesktop").removeAttr("checked").removeAttr("selected");
  $("#ccDeviceLaptop").removeAttr("checked").removeAttr("selected");
  $("#ccDeviceNetbook").removeAttr("checked").removeAttr("selected");
  $("#ccDeviceTablet").removeAttr("checked").removeAttr("selected");
  $("#ccDeviceMobile").removeAttr("checked").removeAttr("selected");
  $("#ccPreSurvey").show();

  // Make sure the post-survey window is completely "closed"
  $("#ccPostSurvey").hide();
}

function ClearChatForm() {
  $("#ccChatInput").val("");
  $("#ccChatOutput").html("");
  $(".loading").html("Starting a new chat session");
}

function ValidatePreSurvey() {
  var WarningMessages = $("<ul></ul>");
  var WarningNumber = 0;
  var MissingReq = false;

  $("#ccPreSurveyWarningMsg").html("");
  if($("#ccChatFirstName").val()=="") {
    $("#ccChatFirstNameLabel").css("color","firebrick");
    $("#ccChatFirstNameLabel").css("font-weight","bold");
    if(!MissingReq) {
      MissingReq = true;
      WarningNumber++;
      WarningMessages.append("<li>"+(WarningNumber)+") " + $(".ccMissingRequiredFieldMessage").val() + "</li>");
    }
  } else {
    $("#ccChatFirstNameLabel").css("color","");
    $("#ccChatFirstNameLabel").css("font-weight","");
  }

  if($('#ccChatEmail').attr('required') && !isValidEmailAddress($("#ccChatEmail").val())){
      $('.chatUI-.transcript').show();
      if(!MissingReq) {
        MissingReq = true;
        WarningNumber++;
      }
  }

  if($("#ccChatProblem").val()=="") {
    $("#ccChatProblemLabel").css("color","firebrick");
    $("#ccChatProblemLabel").css("font-weight","bold");
    if(!MissingReq) {
      MissingReq = true;
      WarningNumber++;
      WarningMessages.append("<li>"+(WarningNumber)+") " + $(".ccMissingRequiredFieldMessage").val() + "</li>");
    }
  } else {
    $("#ccChatProblemLabel").css("color","");
    $("#ccChatProblemLabel").css("font-weight","");
  }

  if($("#ccChatTelephone").val().length < 9 && $('#ccChatTelephone').attr('required')) {
    if(!MissingReq) {
      MissingReq = true;
      WarningNumber++;
    }
  } else {
    $("#ccChatTelephoneLabel").css("color","");
    $("#ccChatTelephoneLabel").css("font-weight","");
  }

  $("#ccPreSurveyWarningMsg").append(WarningMessages);
  if(WarningNumber > 0) {
    $("#ccPreSurveyWarning").show();
    return false;
  } else {
    $("#ccPreSurveyWarning").hide();
  }
  return true;
}

function isValidPhoneNumber(phoneNumber){
  var pattern = new RegExp(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/);
  return pattern.test(phoneNumber);
}

function isValidEmailAddress(emailAddress) {
  var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  return pattern.test(emailAddress);
}

function showSurvey() {
  var pos = $("#chatinvite").offset();
  $("#ccSurveyQuestions").html("");
  $("#ccWait").hide();
  $("#ccContainer").show();
  $.cookie('chatEnabled', null);
  csPlugin.events.onDisabled = function () {
    $(".chatUI").hide();
    $("#ccPreSurvey").show();
    $('.chatUI-.bottom').show();
    $(".loading").html($(".ccWaitMessage").val());
  };
  csPlugin.events.onEnabled = function () {
    $.each($.ConsonaSurvey.questions, function(){
      if(this.title){
        $("#ccSurveyQuestions").append($.ConsonaSurvey.renderQuestion(this));
      }
    });
    $("#ccPostSurvey").show();
    $('.chatUI-.bottom').show();
    $('#ccStartChatButton, #transcript').hide();
    $('#ccSubmitSurveyButton, #ccCancelSurveyButton').show();
  };
  csPlugin.getSurveyData(ccPlugin.sessionData.queue,ccPlugin.sessionData.room,ccPlugin.sessionData.language);
  window.ChatInitialized = false;
  ccPlugin.ResetSession();
}

function cancelSurvey() {
  $(".chatUI").hide();
  $.unblockUI();
  $.ConsonaSurvey.events.onSubmit = function () {
  }
  $.ConsonaSurvey.submitSurvey();
  $("#ccPostSurvey").hide();
  ClearPreSurvey();
  ClearChatForm();
  window.ChatInitialized = true;
  $('#ccStartChatButton, #transcript').show();
  $('#ccSubmitSurveyButton, #ccCancelSurveyButton').hide();
}

function submitSurvey() {
  $.unblockUI();
  $.ConsonaSurvey.events.onSubmit = function () {
  }
  $.ConsonaSurvey.submitSurvey();
  $("#ccPostSurvey").hide();
  $.cookie('chatEnabled', null);
  $.cookie('sessionData', null);
  $(".chatUI, #ccWait").hide();
  ClearPreSurvey();
  ClearChatForm();
  window.ChatInitialized = true;
  $('#ccStartChatButton, #transcript').show();
  $('#ccSubmitSurveyButton, #ccCancelSurveyButton').hide();
}


// jQuery Consona Chat plugin
// Version 1.0 
// Requires jQuery v1.2.3 or later
// Copyright (c) Consona Corp - CRM Division 2010, All rights reserved.

;(function($) {

if($.ConsonaChat)
  return;

// Private Variables
var sessionURL      = "https://supportcenter.timewarnercable.com/sdcxuser/rrn/session.asp?callback=?";
var checkURL        = "https://supportcenter.timewarnercable.com/sdccommon/lachat/poll/check.asp?callback=?";
var sendURL         = "https://supportcenter.timewarnercable.com/sdccommon/lachat/poll/send_msg.asp?callback=?"; 
var sessionDefaults = {"accesskey":"40e6b65eea666d9bdc1665307d780545","sessionstate":"ready","chatid":null,"room":null,"lastid":0,"username":"Customer","firstname":"","emailaddress":"","street":"","aptnum":"","city":"","state":"","zipcode":"","phone":"","accountnumber":"","pin":"","securitynumber":"","statementofproblem":"","queue":"","sendtranscript":false,"division":"","chatreasons":"","language":"en"};
var intervalTimer   = null;
var timeoutTimer    = null;
var activeUsers     = {};
var userClosed      = false;
var lastPolled      = null;
var offline         = false;

// Private Method Implementation
function _CreateSession(Callback) {
  $.getJSON(sessionURL,$.extend($.ConsonaChat.sessionData,{"call_type":"create"}),function(data){
    if(data.errormsg) {
      if($.ConsonaChat.events.onError) $.ConsonaChat.events.onError(data.errormsg);  
    } else {
      $.extend($.ConsonaChat.sessionData,data);
      $.ConsonaChat.sessionData.typing = false;
      timeoutTimer = setTimeout(PollServer,100);
      if(Callback) setTimeout(Callback,500);
    }
  });
  AddEventHandlers();
};

function _RestartSession() {
  clearTimeout(timeoutTimer);
  activeUsers = $.extend({}, JSON.parse($.cookie("activeUsers")), {});
  $.ConsonaChat.sessionData = $.extend({}, JSON.parse($.cookie("sessionData")), {});
  AddEventHandlers();
  if((JSON.stringify(activeUsers).indexOf('"user_type":"analyst"')) > 0) $.ConsonaChat.agentInRoom = true;
  if($.ConsonaChat.events.onStateChange) $.ConsonaChat.events.onStateChange($.ConsonaChat.sessionData.sessionstate);
  SetUnloadHook($.ConsonaChat.sessionData.sessionstate);
  timeoutTimer = setTimeout(PollServer,100);
};

function _CloseSession() {
  CloseEvent();
};

function _ResetSession() {
  clearInterval(intervalTimer);  
  intervalTimer   = null;
  clearTimeout(timeoutTimer);
  timeoutTimer    = null;
  activeUsers     = {};
  userClosed      = false;
  $.ConsonaChat.sessionData = $.extend({}, sessionDefaults, {});
};

function _SendMessage(Message) {
  clearTimeout(timeoutTimer);
  $.getJSON(sendURL, {"key":sessionDefaults.accesskey,"fmt":"json","user":$.ConsonaChat.sessionData.username,"room":$.ConsonaChat.sessionData.room,"dtype":Message.msgType,"Msg":Message.msgText},null);
  timeoutTimer = setTimeout(PollServer,125);
};

function _GetQueueList(Callback) {
  setTimeout(Callback,1000);
};

function _GetQueueStatus(QueueName, Callback) {
  setTimeout(Callback,1000);
};

function _GetSessionState() {
  try {
    var _sessionData = JSON.parse($.cookie("sessionData"));
    if(_sessionData)
      return _sessionData.sessionstate;
    else
      return $.ConsonaChat.sessionData.sessionstate;
  } catch(e) {
    //Catch any error reading the cookie, most likely because it's not defined
    //and just return an unknown session state.
    return $.ConsonaChat.sessionData.sessionstate;
  }      
};

function PollServer() {
  //If the session is closed or there is an error flag, stop polling.
  if(($.ConsonaChat.sessionData.sessionstate == $.ConsonaChat.enumSessionState.closed) ||
     ($.ConsonaChat.sessionData.sessionstate == $.ConsonaChat.enumSessionState.error)) return;
  var pollParams = {"key":sessionDefaults.accesskey,"fmt":"json","lastid":$.ConsonaChat.sessionData.lastid,"user":$.ConsonaChat.sessionData.username,"room":$.ConsonaChat.sessionData.room,"queue":$.ConsonaChat.sessionData.queue,"user_type":"user","chat_type":$.ConsonaChat.sessionData.chat_type,"lcs_enabled":$.ConsonaChat.sessionData.lcs_enabled,"recon":"0","typing":$.ConsonaChat.sessionData.typing};
  if(userClosed) pollParams = $.extend(pollParams,{"status":"closed"});
  $.getJSON(checkURL,pollParams,function(data) {
    if($.ConsonaChat.events.onPoll) setTimeout($.ConsonaChat.events.onPoll,125);
    lastPolled = (new Date().getTime());
    offline = false;
    if(data.chatID > 0){
      if (data.usersList.length > 0) {
        var pollUserList = new Array();
        //Check for any new users or user status updates.
        jQuery.each(data.usersList, function () {
          //Saving array list of users in this poll cycle, used later to detect
          //users in the activeUsers map that have left.
          pollUserList.push(this.user_name);
          if(activeUsers[this.user_name]) {
            if(activeUsers[this.user_name].typing != this.typing) {
              //If typing status has changed, update current active and fire event.
              activeUsers[this.user_name].typing = this.typing;
              if(activeUsers[this.user_name].user_type == "analyst") $.ConsonaChat.agentTyping = this.typing;
              if($.ConsonaChat.events.onTypingChange) $.ConsonaChat.events.onTypingChange(this);
            }
          } else {
            //User not found in current active list, add user and fire event.
            activeUsers[this.user_name] = $.extend({}, this, {});
            $.cookie("activeUsers", JSON.stringify(activeUsers), {"path":"/"});
            //Forcing typing status to false.  If the user is still typing on next
            //poll we'll fire the event.
            activeUsers[this.user_name].typing = false;
            if(this.user_type == "analyst") $.ConsonaChat.agentInRoom = true;
            if($.ConsonaChat.events.onUserJoinedRoom) $.ConsonaChat.events.onUserJoinedRoom(this);
          }
          //Check the user's work status and update session state if status changes.
          if(this.user_type == "user") {
            if($.ConsonaChat.sessionData.sessionstate != this.status) {
              if(this.status == $.ConsonaChat.enumSessionState.closed) {
                $.cookie("sessionData", null, {"path":"/"});
                $.cookie("activeUsers", null, {"path":"/"});
                CloseSession();
              } else {
                SetUnloadHook(this.status);
                $.ConsonaChat.sessionData.sessionstate = this.status;
                $.cookie("sessionData", JSON.stringify($.ConsonaChat.sessionData), {"path":"/"});
                if($.ConsonaChat.events.onStateChange) $.ConsonaChat.events.onStateChange(this.status);
              }
            }
          }
        });
        //Check for activeUsers not currently in poll user list.  Fire the event
        //and remove the user from activeUsers if they're missing.
        jQuery.each(activeUsers, function() {
          if($.inArray(this.user_name,pollUserList)==(-1)) {
            WriteMessage($.ConsonaChat.enumMessageType.advlog_none, "analyst " + this.chat_name + " has left room");
            if($.ConsonaChat.events.onUserLeftRoom) $.ConsonaChat.events.onUserLeftRoom($.extend({}, activeUsers[this.user_name], {}));
            delete activeUsers[this.user_name];
            $.cookie("activeUsers", JSON.stringify(activeUsers), {"path":"/"});
            if(!(JSON.stringify(activeUsers).indexOf('"user_type":"analyst"') > 0)) $.ConsonaChat.agentInRoom = false;            
          }
        });
      }
      //For each message, fire the even and if the display node is set, write the
      //message to the display.
      if (data.msgList.length > 0) {
        var CurrentMsgID = 0;
        jQuery.each(data.msgList, function(){
          this.text = sdcMapURL(this.text);
          if(this.type=="msg")
            WriteMessage(this.type, this.text, this.fromusername, activeUsers[this.fromusername] ? activeUsers[this.fromusername].user_type : "analyst");
          else if ($.inArray(this.type,["notify","url","advlog_none","advlog_us"])>=0 && !(this.from == 'advanced_tool_log' && this.text == 'user '+$.ConsonaChat.sessionData.username+' has entered room') )
            WriteMessage(this.type, this.text);
          if($.ConsonaChat.events.onMessageReceived) {
            $.ConsonaChat.events.onMessageReceived(this);
            if (this.from == 'advanced_tool_log' && this.text == 'reconnect_enabled') $.ConsonaChat.options.reconnectEnabled = true;
          }
          if (this.from == 'advanced_tool_log' && this.text == 'Analyst has pushed controls' && $.ConsonaChat.sessionData.lastid > 0) {
            if ($.ConsonaChat.agentInRoom) {
              var MsgText = "Displayed control install request to user.";
              if($.ConsonaRemote){
                if($.ConsonaRemote.ActiveXControl.MeetsControlsRequirements()) {
                  $.ConsonaRemote.ShowDownload();
                } else {
                  MsgText = "Client does not meet the requirements for RemoteAssist.";
                }
              } else {
                MsgText = "RemoteAssist is not available on this page.";
              }
              $.getJSON(sendURL, {"key":sessionDefaults.accesskey,"fmt":"json","user":$.ConsonaChat.sessionData.username,"room":$.ConsonaChat.sessionData.room,"dtype":$.ConsonaChat.enumMessageType.advlog_an_us,"Msg":MsgText},null);
            }
          }
          CurrentMsgID = this.id;
        });
        $.ConsonaChat.sessionData.lastid = CurrentMsgID;
      } 
      //Session still active so setup the timer for the next poll cycle.
      timeoutTimer = setTimeout(PollServer,$.ConsonaChat.options.pollInterval);
    } else {
      CloseSession();
    }
  })
};

function CloseSession() {
  if ($.ConsonaChat.options.hookUnload) window.onbeforeunload = null; 
  $.ConsonaChat.sessionData.sessionstate = $.ConsonaChat.enumSessionState.closed; 
  WriteMessage($.ConsonaChat.enumMessageType.notify, "The chat session has been closed");
  if($.ConsonaChat.events.onStateChange) $.ConsonaChat.events.onStateChange($.ConsonaChat.enumSessionState.closed);
  $.cookie("sessionData", null, {"path":"/"});
  $.cookie("activeUsers", null, {"path":"/"});
  $.getJSON(sessionURL,$.extend($.ConsonaChat.sessionData,{"call_type":"end_session"}),function(){
    if($.ConsonaChat.events.onSessionComplete) setTimeout($.ConsonaChat.events.onSessionComplete,2500);
  });
}

function FilterText(sText, badWords) {
  var Result = "";
  Result = sText.replace(badWords, function (sMatch) {
    return sMatch.replace(/./g, "*");
  });
  Result = Result.replace(/(\r\n|\n|\r)/gm,"<br>");
  return Result;
}


function WriteMessage(MsgType, MsgText, MsgFrom, MsgUserType) {
  if($.ConsonaChat.options.displayNode) {
    MsgText = FilterText(MsgText,$.ConsonaChat.profanPat);
    $("<p class='ccMessage'>"+((MsgFrom)?("<span class='ccMessagFrom'>"+MsgFrom+":&nbsp;</span>"):"")+MsgText+"</p>").addClass("cc_msgtype_"+MsgType).addClass("cc_usertype_"+MsgUserType).appendTo($.ConsonaChat.options.displayNode);
    $($.ConsonaChat.options.displayNode).scrollTop($($.ConsonaChat.options.displayNode)[0].scrollHeight);
  }
}

function sdcMapURL(strInput)
{
  // if input matches '<a href="http://www.mysite.com">Friendly Text</a>'
  // then leave text as is.
  var HTTPLINK = /<a href="http:\/\/[^\s<]+"[^>]*>[^<]*<\/a>/ig;
  var HTTPSLINK = /<a href="https:\/\/[^\s<]+"[^>]*>[^<]*<\/a>/ig;
  var FTPLINK = /<a href="ftp:\/\/[^\s<]+"[^>]*>[^<]*<\/a>/ig;

  if (strInput.search(HTTPLINK) >= 0) return strInput;
  if (strInput.search(HTTPSLINK) >= 0) return strInput;
  if (strInput.search(FTPLINK) >= 0) return strInput;

  var HTTP  = /(http:\/\/[^\s<]+)/ig;
  var HTTPS = /(https:\/\/[^\s<]+)/ig;
  var FTP   = /(ftp:\/\/[^\s<]+)/ig;
  strInput = strInput.replace(HTTP,'<a href="$1" target=_blank>$1</a>');
  strInput = strInput.replace(HTTPS,'<a href="$1" target=_blank>$1</a>');
  strInput = strInput.replace(FTP,'<a href="$1" target=_blank>$1</a>');
  return strInput;
}

function SendEvent() {
  clearTimeout(timeoutTimer);
  var Message = $.ConsonaChat.ChatMessage($.ConsonaChat.enumMessageType.msg,$($.ConsonaChat.options.inputNode).val());
  if ($.ConsonaChat.agentInRoom) {
    if (Message.msgText) {
      $.getJSON(sendURL, {"key":sessionDefaults.accesskey,"fmt":"json","user":$.ConsonaChat.sessionData.username,"room":$.ConsonaChat.sessionData.room,"dtype":Message.msgType,"Msg":jQuery.trim(Message.msgText).substring(0,1000)},null);
      $($.ConsonaChat.options.inputNode).val("");
      setTimeout($($.ConsonaChat.options.inputNode).focus(),50);
    }
  } else {
    alert("You are not connected to an analyst");
  }
  timeoutTimer = setTimeout(PollServer,125);
};

function CloseEvent() {
  if (!($.ConsonaChat.options.reconnectEnabled)) {
    clearTimeout(timeoutTimer);
    userClosed = true;
    timeoutTimer = setTimeout(PollServer,100);
  }
};

function HeartBeat() {
  if($.ConsonaChat.sessionData.sessionstate != $.ConsonaChat.enumSessionState.closed) {
    if (lastPolled && ((new Date().getTime() - lastPolled) > $.ConsonaChat.options.requestTimeout)) {
      clearTimeout(timeoutTimer);
      if(!offline) {
        offline = true;
        if($.ConsonaChat.events.onError) $.ConsonaChat.events.onError("polling_stopped");
      } 
      timeoutTimer = setTimeout(PollServer,125);
    }
  }
};

function SetUnloadHook(CurrentState) {
  if ($.ConsonaChat.options.hookUnload) {
    if(($.inArray(CurrentState,["waiting","working","escalate"])>=0)) {
      window.onbeforeunload = function (){
        if (!($.ConsonaChat.options.inFormOrLink)) {
          return "Your current chat session will end if you do so.";
        }
      };
    } else {
      window.onbeforeunload = null;
    }
  }
}

//Adds the onClick and onEnter event handlers to the input field and buttons
//if they are set when the CreateIssue method is called. 
function AddEventHandlers() {
  intervalTimer = setInterval(HeartBeat, $.ConsonaChat.options.pollInterval);
  if($.ConsonaChat.options.inputNode) {
    $($.ConsonaChat.options.inputNode).addClass("ccInputBox");
    if($.ConsonaChat.options.sendButton) $($.ConsonaChat.options.sendButton).click(SendEvent);
    if($.ConsonaChat.options.sendOnEnter) {
      $($.ConsonaChat.options.inputNode).keydown(function(event) {
        if (event.which == $.ConsonaChat.keyCode.ENTER) {
          event.preventDefault();
          SendEvent();
        }
      });
    }
  }
  if($.ConsonaChat.options.closeButton) {
    $($.ConsonaChat.options.closeButton).click(CloseEvent);
  }
};

// Define namespace as an object
$.ConsonaChat = {};

$.ConsonaChat.enumSessionState = {"ready":"ready","waiting":"waiting","working":"working","closed":"closed","escalate":"escalate","error":"error"};
$.ConsonaChat.enumMessageType  = {"notset":"msg","notify":"notify","msg":"msg","url":"url","iframe":"iframe","internal":"internal","advlog_none":"advlog_none","advlog_an":"advlog_an","advlog_an_us":"advlog_an_us","advlog_us":"advlog_us","private":"private","control":"control"};

// Public Properties
$.ConsonaChat.version      = 1.0;
$.ConsonaChat.agentInRoom  = false;
$.ConsonaChat.agentTyping  = false;
$.ConsonaChat.sessionData  = $.extend({}, sessionDefaults, {});
$.ConsonaChat.profanPat = /(^|\b|<|>|\s)(WTF|whore|wetback|twat|tard|suck|spick|spic|sonofabitch|slut|slope|skeet|skank|shitting|shithead|shitface|shitbag|shit|sandnigger|retard|pussy|punta|porchmonkey|piss|pimp slap|pimp|phucktard|penis|nigger|niggaz|niggas|nigga|negro|muthafucker|motherfuckers|motherfucker|mother fucker|lesbo|jysm|honky|honkey|homo|hell|hardon|goddammit|gaytard|funckin|fudge packer|fuckwad|fucktard|fuckn|fucking moron|fuckhole|fuckers|fucker|fucked|fuckboy|fuck|faggot|faggit|fagget|fag|erection|ejaculation|dildo|dike|dickweed|dickhead|dick|damn it|dammit|cunt|cum|crotch|crack whore|crack slut|coon|cocksucker|cock|chink|chinc|camel fucker|buttshit|butt pirate|bustard|bullshit|bull shit|bitches|bitchass|bitch|bastards|bastard|assholes|asshole|asshat|ass|arse|ahole)($|\b|<|>|\s)/gi

// Public Methods
$.ConsonaChat.CreateSession   = _CreateSession;
$.ConsonaChat.RestartSession  = _RestartSession;
$.ConsonaChat.CloseSession    = _CloseSession;
$.ConsonaChat.ResetSession    = _ResetSession;
$.ConsonaChat.SendMessage     = _SendMessage;
$.ConsonaChat.GetQueueList    = _GetQueueList;
$.ConsonaChat.GetQueueStatus  = _GetQueueStatus;
$.ConsonaChat.GetSessionState = _GetSessionState;

// Public Templates
$.ConsonaChat.ChatMessage = function(Type, Text){return {"msgType":((Type)?Type:($.ConsonaChat.enumMessageType.notset)),"msgText":((Text)?Text:null)};};

// Public Options
$.ConsonaChat.options = {
    pollInterval:     5000,
    requestTimeout:   12500,
    sendButton:       null,
    closeButton:      null,
    displayNode:      null,
    inputNode:        null,
    sendOnEnter:      true,
    reconnectEnabled: false,
    hookUnload:       false,
    inFormOrLink:     false
};

// Public Events
$.ConsonaChat.events = {
    onStateChange:     null,
    onMessageReceived: null,
    onUserLeftRoom:    null,
    onUserJoinedRoom:  null,
    onTypingChange:    null,
    onPoll:            null,
    onError:           null,
    onSessionComplete: null
};

$.ConsonaChat.keyCode = {
    BACKSPACE: 8,
    CAPS_LOCK: 20,
    COMMA: 188,
    CONTROL: 17,
    DELETE: 46,
    DOWN: 40,
    END: 35,
    ENTER: 13,
    ESCAPE: 27,
    HOME: 36,
    INSERT: 45,
    LEFT: 37,
    NUMPAD_ADD: 107,
    NUMPAD_DECIMAL: 110,
    NUMPAD_DIVIDE: 111,
    NUMPAD_ENTER: 108,
    NUMPAD_MULTIPLY: 106,
    NUMPAD_SUBTRACT: 109,
    PAGE_DOWN: 34,
    PAGE_UP: 33,
    PERIOD: 190,
    RIGHT: 39,
    SHIFT: 16,
    SPACE: 32,
    TAB: 9,
    UP: 38
};

})(jQuery);

(function($) {
  var cache = [];
  // Arguments are image paths relative to the current page.
  $.preLoadImages = function() {
    var args_len = arguments.length;
    for (var i = args_len; i--;) {
      var cacheImage = document.createElement('img');
      cacheImage.src = arguments[i];
      cache.push(cacheImage);
    }
  }
})(jQuery);
/*
    http://www.JSON.org/json2.js
    2010-03-20

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, strict: false */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (!this.JSON) {
    this.JSON = {};
}

(function () {

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
                   this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z' : null;
        };

        String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                     typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/.
test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());

/*!
 * jQuery blockUI plugin
 * Version 2.33 (29-MAR-2010)
 * @requires jQuery v1.2.3 or later
 *
 * Examples at: http://malsup.com/jquery/block/
 * Copyright (c) 2007-2008 M. Alsup
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Thanks to Amir-Hossein Sobhi for some excellent contributions!
 */

;(function($) {

if (/1\.(0|1|2)\.(0|1|2)/.test($.fn.jquery) || /^1.1/.test($.fn.jquery)) {
    alert('blockUI requires jQuery v1.2.3 or later!  You are using v' + $.fn.jquery);
    return;
}

$.fn._fadeIn = $.fn.fadeIn;

var noOp = function() {};

// this bit is to ensure we don't call setExpression when we shouldn't (with extra muscle to handle
// retarded userAgent strings on Vista)
var mode = document.documentMode || 0;
var setExpr = $.browser.msie && (($.browser.version < 8 && !mode) || mode < 8);
var ie6 = $.browser.msie && /MSIE 6.0/.test(navigator.userAgent) && !mode;

// global $ methods for blocking/unblocking the entire page
$.blockUI   = function(opts) { install(window, opts); };
$.unblockUI = function(opts) { remove(window, opts); };

// convenience method for quick growl-like notifications  (http://www.google.com/search?q=growl)
$.growlUI = function(title, message, timeout, onClose) {
    var $m = $('<div class="growlUI"></div>');
    if (title) $m.append('<h1>'+title+'</h1>');
    if (message) $m.append('<h2>'+message+'</h2>');
    if (timeout == undefined) timeout = 3000;
    $.blockUI({
        message: $m, fadeIn: 700, fadeOut: 1000, centerY: false,
        timeout: timeout, showOverlay: false,
        onUnblock: onClose, 
        css: $.blockUI.defaults.growlCSS
    });
};

// plugin method for blocking element content
$.fn.block = function(opts) {
    return this.unblock({ fadeOut: 0 }).each(function() {
        if ($.css(this,'position') == 'static')
            this.style.position = 'relative';
        if ($.browser.msie)
            this.style.zoom = 1; // force 'hasLayout'
        install(this, opts);
    });
};

// plugin method for unblocking element content
$.fn.unblock = function(opts) {
    return this.each(function() {
        remove(this, opts);
    });
};

$.blockUI.version = 2.33; // 2nd generation blocking at no extra cost!

// override these in your code to change the default behavior and style
$.blockUI.defaults = {
    // message displayed when blocking (use null for no message)
    message:  '<h1>Please wait...</h1>',

    title: null,      // title string; only used when theme == true
    draggable: true,  // only used when theme == true (requires jquery-ui.js to be loaded)
    
    theme: false, // set to true to use with jQuery UI themes
    
    // styles for the message when blocking; if you wish to disable
    // these and use an external stylesheet then do this in your code:
    // $.blockUI.defaults.css = {};
    css: {
        padding:    0,
        margin:     0,
        width:      '30%',
        top:        '40%',
        left:       '35%',
        textAlign:  'center',
        color:      '#000',
        border:     '3px solid #aaa',
        backgroundColor:'#fff',
        cursor:     'wait'
    },
    
    // minimal style set used when themes are used
    themedCSS: {
        width:  '30%',
        top:    '40%',
        left:   '35%'
    },

    // styles for the overlay
    overlayCSS:  {
        backgroundColor: '#000',
        opacity:         0.6,
        cursor:          'wait'
    },

    // styles applied when using $.growlUI
    growlCSS: {
        width:      '350px',
        top:        '10px',
        left:       '',
        right:      '10px',
        border:     'none',
        padding:    '5px',
        opacity:    0.6,
        cursor:     'default',
        color:      '#fff',
        backgroundColor: '#000',
        '-webkit-border-radius': '10px',
        '-moz-border-radius':    '10px',
        'border-radius':         '10px'
    },
    
    // IE issues: 'about:blank' fails on HTTPS and javascript:false is s-l-o-w
    // (hat tip to Jorge H. N. de Vasconcelos)
    iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank',

    // force usage of iframe in non-IE browsers (handy for blocking applets)
    forceIframe: false,

    // z-index for the blocking overlay
    baseZ: 1000,

    // set these to true to have the message automatically centered
    centerX: true, // <-- only effects element blocking (page block controlled via css above)
    centerY: true,

    // allow body element to be stetched in ie6; this makes blocking look better
    // on "short" pages.  disable if you wish to prevent changes to the body height
    allowBodyStretch: true,

    // enable if you want key and mouse events to be disabled for content that is blocked
    bindEvents: true,

    // be default blockUI will supress tab navigation from leaving blocking content
    // (if bindEvents is true)
    constrainTabKey: true,

    // fadeIn time in millis; set to 0 to disable fadeIn on block
    fadeIn:  200,

    // fadeOut time in millis; set to 0 to disable fadeOut on unblock
    fadeOut:  400,

    // time in millis to wait before auto-unblocking; set to 0 to disable auto-unblock
    timeout: 0,

    // disable if you don't want to show the overlay
    showOverlay: true,

    // if true, focus will be placed in the first available input field when
    // page blocking
    focusInput: true,

    // suppresses the use of overlay styles on FF/Linux (due to performance issues with opacity)
    applyPlatformOpacityRules: true,
    
    // callback method invoked when fadeIn has completed and blocking message is visible
    onBlock: null,

    // callback method invoked when unblocking has completed; the callback is
    // passed the element that has been unblocked (which is the window object for page
    // blocks) and the options that were passed to the unblock call:
    //   onUnblock(element, options)
    onUnblock: null,

    // don't ask; if you really must know: http://groups.google.com/group/jquery-en/browse_thread/thread/36640a8730503595/2f6a79a77a78e493#2f6a79a77a78e493
    quirksmodeOffsetHack: 4
};

// private data and functions follow...

var pageBlock = null;
var pageBlockEls = [];

function install(el, opts) {
    var full = (el == window);
    var msg = opts && opts.message !== undefined ? opts.message : undefined;
    opts = $.extend({}, $.blockUI.defaults, opts || {});
    opts.overlayCSS = $.extend({}, $.blockUI.defaults.overlayCSS, opts.overlayCSS || {});
    var css = $.extend({}, $.blockUI.defaults.css, opts.css || {});
    var themedCSS = $.extend({}, $.blockUI.defaults.themedCSS, opts.themedCSS || {});
    msg = msg === undefined ? opts.message : msg;

    // remove the current block (if there is one)
    if (full && pageBlock)
        remove(window, {fadeOut:0});

    // if an existing element is being used as the blocking content then we capture
    // its current place in the DOM (and current display style) so we can restore
    // it when we unblock
    if (msg && typeof msg != 'string' && (msg.parentNode || msg.jquery)) {
        var node = msg.jquery ? msg[0] : msg;
        var data = {};
        $(el).data('blockUI.history', data);
        data.el = node;
        data.parent = node.parentNode;
        data.display = node.style.display;
        data.position = node.style.position;
        if (data.parent)
            data.parent.removeChild(node);
    }

    var z = opts.baseZ;

    // blockUI uses 3 layers for blocking, for simplicity they are all used on every platform;
    // layer1 is the iframe layer which is used to supress bleed through of underlying content
    // layer2 is the overlay layer which has opacity and a wait cursor (by default)
    // layer3 is the message content that is displayed while blocking

    var lyr1 = ($.browser.msie || opts.forceIframe) 
        ? $('<iframe class="blockUI" style="z-index:'+ (z++) +';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="'+opts.iframeSrc+'"></iframe>')
        : $('<div class="blockUI" style="display:none"></div>');
    var lyr2 = $('<div class="blockUI blockOverlay" style="z-index:'+ (z++) +';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');
    
    var lyr3, s;
    if (opts.theme && full) {
        s = '<div class="blockUI blockMsg blockPage ui-dialog ui-widget ui-corner-all" style="z-index:'+z+';display:none;position:fixed">' +
                '<div class="ui-widget-header ui-dialog-titlebar blockTitle">'+(opts.title || '&nbsp;')+'</div>' +
                '<div class="ui-widget-content ui-dialog-content"></div>' +
            '</div>';
    }
    else if (opts.theme) {
        s = '<div class="blockUI blockMsg blockElement ui-dialog ui-widget ui-corner-all" style="z-index:'+z+';display:none;position:absolute">' +
                '<div class="ui-widget-header ui-dialog-titlebar blockTitle">'+(opts.title || '&nbsp;')+'</div>' +
                '<div class="ui-widget-content ui-dialog-content"></div>' +
            '</div>';
    }
    else if (full) {
        s = '<div class="blockUI blockMsg blockPage" style="z-index:'+z+';display:none;position:fixed"></div>';
    }           
    else {
        s = '<div class="blockUI blockMsg blockElement" style="z-index:'+z+';display:none;position:absolute"></div>';
    }
    lyr3 = $(s);

    // if we have a message, style it
    if (msg) {
        if (opts.theme) {
            lyr3.css(themedCSS);
            lyr3.addClass('ui-widget-content');
        }
        else 
            lyr3.css(css);
    }

    // style the overlay
    if (!opts.applyPlatformOpacityRules || !($.browser.mozilla && /Linux/.test(navigator.platform)))
        lyr2.css(opts.overlayCSS);
    lyr2.css('position', full ? 'fixed' : 'absolute');

    // make iframe layer transparent in IE
    if ($.browser.msie || opts.forceIframe)
        lyr1.css('opacity',0.0);

    //$([lyr1[0],lyr2[0],lyr3[0]]).appendTo(full ? 'body' : el);
    var layers = [lyr1,lyr2,lyr3], $par = full ? $('body') : $(el);
    $.each(layers, function() {
        this.appendTo($par);
    });
    
    if (opts.theme && opts.draggable && $.fn.draggable) {
        lyr3.draggable({
            handle: '.ui-dialog-titlebar',
            cancel: 'li'
        });
    }

    // ie7 must use absolute positioning in quirks mode and to account for activex issues (when scrolling)
    var expr = setExpr && (!$.boxModel || $('object,embed', full ? null : el).length > 0);
    if (ie6 || expr) {
        // give body 100% height
        if (full && opts.allowBodyStretch && $.boxModel)
            $('html,body').css('height','100%');

        // fix ie6 issue when blocked element has a border width
        if ((ie6 || !$.boxModel) && !full) {
            var t = sz(el,'borderTopWidth'), l = sz(el,'borderLeftWidth');
            var fixT = t ? '(0 - '+t+')' : 0;
            var fixL = l ? '(0 - '+l+')' : 0;
        }

        // simulate fixed position
        $.each([lyr1,lyr2,lyr3], function(i,o) {
            var s = o[0].style;
            s.position = 'absolute';
            if (i < 2) {
                full ? s.setExpression('height','Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.boxModel?0:'+opts.quirksmodeOffsetHack+') + "px"')
                     : s.setExpression('height','this.parentNode.offsetHeight + "px"');
                full ? s.setExpression('width','jQuery.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"')
                     : s.setExpression('width','this.parentNode.offsetWidth + "px"');
                if (fixL) s.setExpression('left', fixL);
                if (fixT) s.setExpression('top', fixT);
            }
            else if (opts.centerY) {
                if (full) s.setExpression('top','(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"');
                s.marginTop = 0;
            }
            else if (!opts.centerY && full) {
                var top = (opts.css && opts.css.top) ? parseInt(opts.css.top) : 0;
                var expression = '((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + '+top+') + "px"';
                s.setExpression('top',expression);
            }
        });
    }

    // show the message
    if (msg) {
        if (opts.theme)
            lyr3.find('.ui-widget-content').append(msg);
        else
            lyr3.append(msg);
        if (msg.jquery || msg.nodeType)
            $(msg).show();
    }

    if (($.browser.msie || opts.forceIframe) && opts.showOverlay)
        lyr1.show(); // opacity is zero
    if (opts.fadeIn) {
        var cb = opts.onBlock ? opts.onBlock : noOp;
        var cb1 = (opts.showOverlay && !msg) ? cb : noOp;
        var cb2 = msg ? cb : noOp;
        if (opts.showOverlay)
            lyr2._fadeIn(opts.fadeIn, cb1);
        if (msg)
            lyr3._fadeIn(opts.fadeIn, cb2);
    }
    else {
        if (opts.showOverlay)
            lyr2.show();
        if (msg)
            lyr3.show();
        if (opts.onBlock)
            opts.onBlock();
    }

    // bind key and mouse events
    bind(1, el, opts);

    if (full) {
        pageBlock = lyr3[0];
        pageBlockEls = $(':input:enabled:visible',pageBlock);
        if (opts.focusInput)
            setTimeout(focus, 20);
    }
    else
        center(lyr3[0], opts.centerX, opts.centerY);

    if (opts.timeout) {
        // auto-unblock
        var to = setTimeout(function() {
            full ? $.unblockUI(opts) : $(el).unblock(opts);
        }, opts.timeout);
        $(el).data('blockUI.timeout', to);
    }
};

// remove the block
function remove(el, opts) {
    var full = (el == window);
    var $el = $(el);
    var data = $el.data('blockUI.history');
    var to = $el.data('blockUI.timeout');
    if (to) {
        clearTimeout(to);
        $el.removeData('blockUI.timeout');
    }
    opts = $.extend({}, $.blockUI.defaults, opts || {});
    bind(0, el, opts); // unbind events
    
    var els;
    if (full) // crazy selector to handle odd field errors in ie6/7
        els = $('body').children().filter('.blockUI').add('body > .blockUI');
    else
        els = $('.blockUI', el);

    if (full)
        pageBlock = pageBlockEls = null;

    if (opts.fadeOut) {
        els.fadeOut(opts.fadeOut);
        setTimeout(function() { reset(els,data,opts,el); }, opts.fadeOut);
    }
    else
        reset(els, data, opts, el);
};

// move blocking element back into the DOM where it started
function reset(els,data,opts,el) {
    els.each(function(i,o) {
        // remove via DOM calls so we don't lose event handlers
        if (this.parentNode)
            this.parentNode.removeChild(this);
    });

    if (data && data.el) {
        data.el.style.display = data.display;
        data.el.style.position = data.position;
        if (data.parent)
            data.parent.appendChild(data.el);
        $(el).removeData('blockUI.history');
    }

    if (typeof opts.onUnblock == 'function')
        opts.onUnblock(el,opts);
};

// bind/unbind the handler
function bind(b, el, opts) {
    var full = el == window, $el = $(el);

    // don't bother unbinding if there is nothing to unbind
    if (!b && (full && !pageBlock || !full && !$el.data('blockUI.isBlocked')))
        return;
    if (!full)
        $el.data('blockUI.isBlocked', b);

    // don't bind events when overlay is not in use or if bindEvents is false
    if (!opts.bindEvents || (b && !opts.showOverlay)) 
        return;

    // bind anchors and inputs for mouse and key events
    var events = 'mousedown mouseup keydown keypress';
    b ? $(document).bind(events, opts, handler) : $(document).unbind(events, handler);

// former impl...
//     var $e = $('a,:input');
//     b ? $e.bind(events, opts, handler) : $e.unbind(events, handler);
};

// event handler to suppress keyboard/mouse events when blocking
function handler(e) {
    // allow tab navigation (conditionally)
    if (e.keyCode && e.keyCode == 9) {
        if (pageBlock && e.data.constrainTabKey) {
            var els = pageBlockEls;
            var fwd = !e.shiftKey && e.target == els[els.length-1];
            var back = e.shiftKey && e.target == els[0];
            if (fwd || back) {
                setTimeout(function(){focus(back)},10);
                return false;
            }
        }
    }
    // allow events within the message content
    if ($(e.target).parents('div.blockMsg').length > 0)
        return true;

    // allow events for content that is not being blocked
    return $(e.target).parents().children().filter('div.blockUI').length == 0;
};

function focus(back) {
    if (!pageBlockEls)
        return;
    var e = pageBlockEls[back===true ? pageBlockEls.length-1 : 0];
    if (e)
        e.focus();
};

function center(el, x, y) {
    var p = el.parentNode, s = el.style;
    var l = ((p.offsetWidth - el.offsetWidth)/2) - sz(p,'borderLeftWidth');
    var t = ((p.offsetHeight - el.offsetHeight)/2) - sz(p,'borderTopWidth');
    if (x) s.left = l > 0 ? (l+'px') : '0';
    if (y) s.top  = t > 0 ? (t+'px') : '0';
};

function sz(el, p) {
    return parseInt($.css(el,p))||0;
};

})(jQuery);


// jQuery Consona Chat Survey plugin
// Version 1.0 
// Requires jQuery v1.2.3 or later
// Copyright (c) Consona Corp - CRM Division 2011, All rights reserved.

;(function($) {
  if($.ConsonaSurvey)
    return;

  $(".ConsonaFormTextArea").keyup(function(){  
    var limit = parseInt($(this).attr('maxlength'));  
    var text = $(this).val();  
    var chars = text.length;  
    if(chars > limit){  
      var new_text = text.substr(0, limit);  
      $(this).val(new_text);  
    }  
  });  

  // Private Variables
  var surveyDataURL = "https://supportcenter.timewarnercable.com/sdcxuser/lachat/user/gs_surveyoperations.asp?callback=?";
  
  // Private Methods
  function _GetSurveyData(Queue, Room, Language) {
    $.ajaxSetup({ cache: false }); 
    $.getJSON(surveyDataURL,{"cmd":"fetch","queue":Queue,"lang":Language,"room":Room},function(Survey){
      $.ajaxSetup({ cache: true }); 
      $.ConsonaSurvey.enabled  = (Survey.Enabled=="1")?true:false;
      $.ConsonaSurvey.language = Language;
      $.ConsonaSurvey.queue    = Queue;
      $.ConsonaSurvey.room     = Room;
      if($.ConsonaSurvey.enabled) {
        $.extend($.ConsonaSurvey.questions,Survey.Questions);
        if($.ConsonaSurvey.events.onEnabled) $.ConsonaSurvey.events.onEnabled();
      } else {
        if($.ConsonaSurvey.events.onDisabled) $.ConsonaSurvey.events.onDisabled();
      }
    });  
  };
  
  function _RenderQuestion(QuestionData) {
    var QuestionHTML;
    switch(QuestionData.type) {
      case "Radio": 
      case "CheckBox":
        QuestionHTML = renderRadioCheckType(QuestionData);
        break;
      case "Select": 
        QuestionHTML = renderSelectType(QuestionData);
        break;          
      case "Text":
        QuestionHTML = renderTextType(QuestionData);
        break;
      case "TextArea":
        QuestionHTML = renderTextBoxType(QuestionData);
        break;          
      default:
        //Unknown type, return empty string
        QuestionHTML = "";
    }
    return QuestionHTML;
  };
  
  function _SubmitSurvey() {
    var SurveyResponse = {};
    var ResultsCnt = 0;
    SurveyResponse.queue = $.ConsonaSurvey.queue;
    SurveyResponse.room  = $.ConsonaSurvey.room;
    SurveyResponse.cmd   = "log";
    SurveyResponse.lang  = $.ConsonaSurvey.language;          
    SurveyResponse.Results = [];
    $(".ConsonaFormInput").each(function(index, elm){
      switch(elm.type) {
        case "radio":
        case "checkbox":
          if(elm.checked) {
            SurveyResponse.Results[ResultsCnt++] = (elm.id + "::" + elm.name.replace(/resp_/i, "") + "::" + elm.value);     
          }            
          break;
        case "text":
        case "textarea":
          if(elm.value) {
            SurveyResponse.Results[ResultsCnt++] = (elm.id + "::" + elm.name.replace(/resp_/i, "") + "::" + elm.value);     
          }            
          break;
        default:
          //Assume we have a select box here so check for selected options
          $("#"+elm.id+" :selected").each(function(i,selected) {
            SurveyResponse.Results[ResultsCnt++] = (selected.id + "::" + elm.name.replace(/resp_/i, "") + "::" + $(selected).text());     
          });
      }
    });   
    $.ajaxSetup({ cache: false });
    $.getJSON(surveyDataURL,SurveyResponse,function(){
      $.ajaxSetup({ cache: true }); 
      if($.ConsonaSurvey.events.onSubmit) $.ConsonaSurvey.events.onSubmit();
    });   
  };  
  
  function renderRadioCheckType(QuestionData) {
    var questionDisplay = jQuery("<div class='ConsonaFormField' />").attr("id","Panel_"+QuestionData.id); 
    var responseList = jQuery("<fieldset class='ConsonaFieldSet'/>").html("<span class='ConsonaLegendText'>" + QuestionData.title + "</span><div class='clear'></div>");
    var responseNum = 0;
    var responseHTML = [];
    $.each(QuestionData.answers, function() {
      if(this.name){
        responseHTML[responseNum++] = 
          "<div class='" + ((QuestionData.type == "Radio") ? "ConsonaFormRadioLine" : "ConsonaFormCheckboxLine") + "' id='Line_" + QuestionData.id + "'><input question='" + QuestionData.id + "' type='" + this.type + "' class='ConsonaFormInput " + ((QuestionData.type == "Radio") ? "ConsonaFormRadioOption" : "ConsonaFormCheckboxOption") + "' name='Resp_" + QuestionData.id + "' id='" + this.id + "' value='" + ((this.value=="")?this.name:this.value) + "'>" + 
          "<label for='" + this.id + "' class='" + ((QuestionData.type == "Radio") ? "ConsonaFormRadioLabel" : "ConsonaFormCheckboxLabel") + "'>" + this.name + "</label></div>";    
      }     
    });
    return questionDisplay.append(responseList.append(responseHTML.join('')));
  };
  
  function renderSelectType(QuestionData) {
    var questionDisplay = jQuery("<div class='ConsonaFormField'/>").attr("id","Panel_"+QuestionData.id);
    var responseList = jQuery("<fieldset class='ConsonaFieldSet'/>").html("<span class='ConsonaLegendText'>" + QuestionData.title + "</span>");
    var responseNum = 0;
    var responseHTML = [];
    responseHTML[responseNum++] = "<select name='" + QuestionData.id + "' id='" + QuestionData.id + "' class='ConsonaFormInput ConsonaFormSelect'>";
    $.each(QuestionData.answers, function() {
      if(this.name){
        responseHTML[responseNum++] = "<option id='" + this.id + "' name='Resp_" + QuestionData.id + "' value='" + ((this.value=="")?this.name:this.value) + "'>" + this.name + "</option>"
      }
    });
    responseHTML[responseNum++] = "</select>";      
    return questionDisplay.append(responseList.append(responseHTML.join('')));
  };    

  function renderTextType(QuestionData) {
    var questionDisplay = jQuery("<div class='ConsonaFormField'/>").attr("id","Panel_"+QuestionData.id);
    var responseList = jQuery("<fieldset class='ConsonaFieldSet'/>").html("<span class='ConsonaLegendText'>" + QuestionData.title + "</span>");
    return questionDisplay.append(
      responseList.append(
        "<input maxlength=999 type='text' question='" + QuestionData.id + "' class='ConsonaFormInput ConsonaFormTextInput' name='Resp_" + QuestionData.id + "' id='" + QuestionData.answers[0].id + "' value='" + (QuestionData.answers[0].value) + "'>"
      )
    );
  };   
  
  function renderTextBoxType(QuestionData) {
    var questionDisplay = jQuery("<div class='ConsonaFormField'/>").attr("id","Panel_"+QuestionData.id);
    var responseList = jQuery("<fieldset class='ConsonaFieldSet'/>").html("<span class='ConsonaLegendText'>" + QuestionData.title + "</span>");
    return questionDisplay.append(
      responseList.append(
        "<textarea maxlength=999  name='Resp_" + QuestionData.id + "' question='" + QuestionData.id + "' class='ConsonaFormInput ConsonaFormTextArea' id='" + QuestionData.answers[0].id + "' value='" + (QuestionData.answers[0].value) + "'></textarea>"
      )
    );
  }; 
  
  // Define namespace as an object
  $.ConsonaSurvey = {};
  
  // Public Properties
  $.ConsonaSurvey.version   = 1.0; 
  $.ConsonaSurvey.enabled   = false;
  $.ConsonaSurvey.language  = "en";
  $.ConsonaSurvey.questions = {};
  $.ConsonaSurvey.queue     = "";
  $.ConsonaSurvey.room      = "";
  
  // Public Methods
  $.ConsonaSurvey.getSurveyData  = _GetSurveyData;
  $.ConsonaSurvey.renderQuestion = _RenderQuestion;
  $.ConsonaSurvey.submitSurvey  = _SubmitSurvey; 
  
  // Public Events
  $.ConsonaSurvey.events = {    
    onDisabled: null,
    onEnabled: null,
    onSubmit: null
  };
  
})(jQuery);


/*! jQuery UI - v1.10.3 - 2013-05-03
* http://jqueryui.com
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.draggable.js, jquery.ui.droppable.js, jquery.ui.resizable.js, jquery.ui.selectable.js, jquery.ui.sortable.js, jquery.ui.effect.js, jquery.ui.accordion.js, jquery.ui.autocomplete.js, jquery.ui.button.js, jquery.ui.datepicker.js, jquery.ui.dialog.js, jquery.ui.effect-blind.js, jquery.ui.effect-bounce.js, jquery.ui.effect-clip.js, jquery.ui.effect-drop.js, jquery.ui.effect-explode.js, jquery.ui.effect-fade.js, jquery.ui.effect-fold.js, jquery.ui.effect-highlight.js, jquery.ui.effect-pulsate.js, jquery.ui.effect-scale.js, jquery.ui.effect-shake.js, jquery.ui.effect-slide.js, jquery.ui.effect-transfer.js, jquery.ui.menu.js, jquery.ui.position.js, jquery.ui.progressbar.js, jquery.ui.slider.js, jquery.ui.spinner.js, jquery.ui.tabs.js, jquery.ui.tooltip.js
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(t,e){function i(e,i){var n,o,a,r=e.nodeName.toLowerCase();return"area"===r?(n=e.parentNode,o=n.name,e.href&&o&&"map"===n.nodeName.toLowerCase()?(a=t("img[usemap=#"+o+"]")[0],!!a&&s(a)):!1):(/input|select|textarea|button|object/.test(r)?!e.disabled:"a"===r?e.href||i:i)&&s(e)}function s(e){return t.expr.filters.visible(e)&&!t(e).parents().addBack().filter(function(){return"hidden"===t.css(this,"visibility")}).length}var n=0,o=/^ui-id-\d+$/;t.ui=t.ui||{},t.extend(t.ui,{version:"1.10.3",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),t.fn.extend({focus:function(e){return function(i,s){return"number"==typeof i?this.each(function(){var e=this;setTimeout(function(){t(e).focus(),s&&s.call(e)},i)}):e.apply(this,arguments)}}(t.fn.focus),scrollParent:function(){var e;return e=t.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(t.css(this,"position"))&&/(auto|scroll)/.test(t.css(this,"overflow")+t.css(this,"overflow-y")+t.css(this,"overflow-x"))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(t.css(this,"overflow")+t.css(this,"overflow-y")+t.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!e.length?t(document):e},zIndex:function(i){if(i!==e)return this.css("zIndex",i);if(this.length)for(var s,n,o=t(this[0]);o.length&&o[0]!==document;){if(s=o.css("position"),("absolute"===s||"relative"===s||"fixed"===s)&&(n=parseInt(o.css("zIndex"),10),!isNaN(n)&&0!==n))return n;o=o.parent()}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++n)})},removeUniqueId:function(){return this.each(function(){o.test(this.id)&&t(this).removeAttr("id")})}}),t.extend(t.expr[":"],{data:t.expr.createPseudo?t.expr.createPseudo(function(e){return function(i){return!!t.data(i,e)}}):function(e,i,s){return!!t.data(e,s[3])},focusable:function(e){return i(e,!isNaN(t.attr(e,"tabindex")))},tabbable:function(e){var s=t.attr(e,"tabindex"),n=isNaN(s);return(n||s>=0)&&i(e,!n)}}),t("<a>").outerWidth(1).jquery||t.each(["Width","Height"],function(i,s){function n(e,i,s,n){return t.each(o,function(){i-=parseFloat(t.css(e,"padding"+this))||0,s&&(i-=parseFloat(t.css(e,"border"+this+"Width"))||0),n&&(i-=parseFloat(t.css(e,"margin"+this))||0)}),i}var o="Width"===s?["Left","Right"]:["Top","Bottom"],a=s.toLowerCase(),r={innerWidth:t.fn.innerWidth,innerHeight:t.fn.innerHeight,outerWidth:t.fn.outerWidth,outerHeight:t.fn.outerHeight};t.fn["inner"+s]=function(i){return i===e?r["inner"+s].call(this):this.each(function(){t(this).css(a,n(this,i)+"px")})},t.fn["outer"+s]=function(e,i){return"number"!=typeof e?r["outer"+s].call(this,e):this.each(function(){t(this).css(a,n(this,e,!0,i)+"px")})}}),t.fn.addBack||(t.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),t("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(t.fn.removeData=function(e){return function(i){return arguments.length?e.call(this,t.camelCase(i)):e.call(this)}}(t.fn.removeData)),t.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),t.support.selectstart="onselectstart"in document.createElement("div"),t.fn.extend({disableSelection:function(){return this.bind((t.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(t){t.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),t.extend(t.ui,{plugin:{add:function(e,i,s){var n,o=t.ui[e].prototype;for(n in s)o.plugins[n]=o.plugins[n]||[],o.plugins[n].push([i,s[n]])},call:function(t,e,i){var s,n=t.plugins[e];if(n&&t.element[0].parentNode&&11!==t.element[0].parentNode.nodeType)for(s=0;n.length>s;s++)t.options[n[s][0]]&&n[s][1].apply(t.element,i)}},hasScroll:function(e,i){if("hidden"===t(e).css("overflow"))return!1;var s=i&&"left"===i?"scrollLeft":"scrollTop",n=!1;return e[s]>0?!0:(e[s]=1,n=e[s]>0,e[s]=0,n)}})})(jQuery),function(t,e){var i=0,s=Array.prototype.slice,n=t.cleanData;t.cleanData=function(e){for(var i,s=0;null!=(i=e[s]);s++)try{t(i).triggerHandler("remove")}catch(o){}n(e)},t.widget=function(i,s,n){var o,a,r,h,l={},c=i.split(".")[0];i=i.split(".")[1],o=c+"-"+i,n||(n=s,s=t.Widget),t.expr[":"][o.toLowerCase()]=function(e){return!!t.data(e,o)},t[c]=t[c]||{},a=t[c][i],r=t[c][i]=function(t,i){return this._createWidget?(arguments.length&&this._createWidget(t,i),e):new r(t,i)},t.extend(r,a,{version:n.version,_proto:t.extend({},n),_childConstructors:[]}),h=new s,h.options=t.widget.extend({},h.options),t.each(n,function(i,n){return t.isFunction(n)?(l[i]=function(){var t=function(){return s.prototype[i].apply(this,arguments)},e=function(t){return s.prototype[i].apply(this,t)};return function(){var i,s=this._super,o=this._superApply;return this._super=t,this._superApply=e,i=n.apply(this,arguments),this._super=s,this._superApply=o,i}}(),e):(l[i]=n,e)}),r.prototype=t.widget.extend(h,{widgetEventPrefix:a?h.widgetEventPrefix:i},l,{constructor:r,namespace:c,widgetName:i,widgetFullName:o}),a?(t.each(a._childConstructors,function(e,i){var s=i.prototype;t.widget(s.namespace+"."+s.widgetName,r,i._proto)}),delete a._childConstructors):s._childConstructors.push(r),t.widget.bridge(i,r)},t.widget.extend=function(i){for(var n,o,a=s.call(arguments,1),r=0,h=a.length;h>r;r++)for(n in a[r])o=a[r][n],a[r].hasOwnProperty(n)&&o!==e&&(i[n]=t.isPlainObject(o)?t.isPlainObject(i[n])?t.widget.extend({},i[n],o):t.widget.extend({},o):o);return i},t.widget.bridge=function(i,n){var o=n.prototype.widgetFullName||i;t.fn[i]=function(a){var r="string"==typeof a,h=s.call(arguments,1),l=this;return a=!r&&h.length?t.widget.extend.apply(null,[a].concat(h)):a,r?this.each(function(){var s,n=t.data(this,o);return n?t.isFunction(n[a])&&"_"!==a.charAt(0)?(s=n[a].apply(n,h),s!==n&&s!==e?(l=s&&s.jquery?l.pushStack(s.get()):s,!1):e):t.error("no such method '"+a+"' for "+i+" widget instance"):t.error("cannot call methods on "+i+" prior to initialization; "+"attempted to call method '"+a+"'")}):this.each(function(){var e=t.data(this,o);e?e.option(a||{})._init():t.data(this,o,new n(a,this))}),l}},t.Widget=function(){},t.Widget._childConstructors=[],t.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(e,s){s=t(s||this.defaultElement||this)[0],this.element=t(s),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=t.widget.extend({},this.options,this._getCreateOptions(),e),this.bindings=t(),this.hoverable=t(),this.focusable=t(),s!==this&&(t.data(s,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===s&&this.destroy()}}),this.document=t(s.style?s.ownerDocument:s.document||s),this.window=t(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:t.noop,_getCreateEventData:t.noop,_create:t.noop,_init:t.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:t.noop,widget:function(){return this.element},option:function(i,s){var n,o,a,r=i;if(0===arguments.length)return t.widget.extend({},this.options);if("string"==typeof i)if(r={},n=i.split("."),i=n.shift(),n.length){for(o=r[i]=t.widget.extend({},this.options[i]),a=0;n.length-1>a;a++)o[n[a]]=o[n[a]]||{},o=o[n[a]];if(i=n.pop(),s===e)return o[i]===e?null:o[i];o[i]=s}else{if(s===e)return this.options[i]===e?null:this.options[i];r[i]=s}return this._setOptions(r),this},_setOptions:function(t){var e;for(e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return this.options[t]=e,"disabled"===t&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!e).attr("aria-disabled",e),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(i,s,n){var o,a=this;"boolean"!=typeof i&&(n=s,s=i,i=!1),n?(s=o=t(s),this.bindings=this.bindings.add(s)):(n=s,s=this.element,o=this.widget()),t.each(n,function(n,r){function h(){return i||a.options.disabled!==!0&&!t(this).hasClass("ui-state-disabled")?("string"==typeof r?a[r]:r).apply(a,arguments):e}"string"!=typeof r&&(h.guid=r.guid=r.guid||h.guid||t.guid++);var l=n.match(/^(\w+)\s*(.*)$/),c=l[1]+a.eventNamespace,u=l[2];u?o.delegate(u,c,h):s.bind(c,h)})},_off:function(t,e){e=(e||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.unbind(e).undelegate(e)},_delay:function(t,e){function i(){return("string"==typeof t?s[t]:t).apply(s,arguments)}var s=this;return setTimeout(i,e||0)},_hoverable:function(e){this.hoverable=this.hoverable.add(e),this._on(e,{mouseenter:function(e){t(e.currentTarget).addClass("ui-state-hover")},mouseleave:function(e){t(e.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(e){this.focusable=this.focusable.add(e),this._on(e,{focusin:function(e){t(e.currentTarget).addClass("ui-state-focus")},focusout:function(e){t(e.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(e,i,s){var n,o,a=this.options[e];if(s=s||{},i=t.Event(i),i.type=(e===this.widgetEventPrefix?e:this.widgetEventPrefix+e).toLowerCase(),i.target=this.element[0],o=i.originalEvent)for(n in o)n in i||(i[n]=o[n]);return this.element.trigger(i,s),!(t.isFunction(a)&&a.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},t.each({show:"fadeIn",hide:"fadeOut"},function(e,i){t.Widget.prototype["_"+e]=function(s,n,o){"string"==typeof n&&(n={effect:n});var a,r=n?n===!0||"number"==typeof n?i:n.effect||i:e;n=n||{},"number"==typeof n&&(n={duration:n}),a=!t.isEmptyObject(n),n.complete=o,n.delay&&s.delay(n.delay),a&&t.effects&&t.effects.effect[r]?s[e](n):r!==e&&s[r]?s[r](n.duration,n.easing,o):s.queue(function(i){t(this)[e](),o&&o.call(s[0]),i()})}})}(jQuery),function(t){var e=!1;t(document).mouseup(function(){e=!1}),t.widget("ui.mouse",{version:"1.10.3",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var e=this;this.element.bind("mousedown."+this.widgetName,function(t){return e._mouseDown(t)}).bind("click."+this.widgetName,function(i){return!0===t.data(i.target,e.widgetName+".preventClickEvent")?(t.removeData(i.target,e.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):undefined}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&t(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(i){if(!e){this._mouseStarted&&this._mouseUp(i),this._mouseDownEvent=i;var s=this,n=1===i.which,o="string"==typeof this.options.cancel&&i.target.nodeName?t(i.target).closest(this.options.cancel).length:!1;return n&&!o&&this._mouseCapture(i)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){s.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(i)&&this._mouseDelayMet(i)&&(this._mouseStarted=this._mouseStart(i)!==!1,!this._mouseStarted)?(i.preventDefault(),!0):(!0===t.data(i.target,this.widgetName+".preventClickEvent")&&t.removeData(i.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(t){return s._mouseMove(t)},this._mouseUpDelegate=function(t){return s._mouseUp(t)},t(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),i.preventDefault(),e=!0,!0)):!0}},_mouseMove:function(e){return t.ui.ie&&(!document.documentMode||9>document.documentMode)&&!e.button?this._mouseUp(e):this._mouseStarted?(this._mouseDrag(e),e.preventDefault()):(this._mouseDistanceMet(e)&&this._mouseDelayMet(e)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,e)!==!1,this._mouseStarted?this._mouseDrag(e):this._mouseUp(e)),!this._mouseStarted)},_mouseUp:function(e){return t(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,e.target===this._mouseDownEvent.target&&t.data(e.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(e)),!1},_mouseDistanceMet:function(t){return Math.max(Math.abs(this._mouseDownEvent.pageX-t.pageX),Math.abs(this._mouseDownEvent.pageY-t.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}})}(jQuery),function(t){t.widget("ui.draggable",t.ui.mouse,{version:"1.10.3",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function(){"original"!==this.options.helper||/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative"),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._mouseInit()},_destroy:function(){this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._mouseDestroy()},_mouseCapture:function(e){var i=this.options;return this.helper||i.disabled||t(e.target).closest(".ui-resizable-handle").length>0?!1:(this.handle=this._getHandle(e),this.handle?(t(i.iframeFix===!0?"iframe":i.iframeFix).each(function(){t("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1e3}).css(t(this).offset()).appendTo("body")}),!0):!1)},_mouseStart:function(e){var i=this.options;return this.helper=this._createHelper(e),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),t.ui.ddmanager&&(t.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(),this.offsetParent=this.helper.offsetParent(),this.offsetParentCssPosition=this.offsetParent.css("position"),this.offset=this.positionAbs=this.element.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},this.offset.scroll=!1,t.extend(this.offset,{click:{left:e.pageX-this.offset.left,top:e.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.originalPosition=this.position=this._generatePosition(e),this.originalPageX=e.pageX,this.originalPageY=e.pageY,i.cursorAt&&this._adjustOffsetFromHelper(i.cursorAt),this._setContainment(),this._trigger("start",e)===!1?(this._clear(),!1):(this._cacheHelperProportions(),t.ui.ddmanager&&!i.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e),this._mouseDrag(e,!0),t.ui.ddmanager&&t.ui.ddmanager.dragStart(this,e),!0)},_mouseDrag:function(e,i){if("fixed"===this.offsetParentCssPosition&&(this.offset.parent=this._getParentOffset()),this.position=this._generatePosition(e),this.positionAbs=this._convertPositionTo("absolute"),!i){var s=this._uiHash();if(this._trigger("drag",e,s)===!1)return this._mouseUp({}),!1;this.position=s.position}return this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),t.ui.ddmanager&&t.ui.ddmanager.drag(this,e),!1},_mouseStop:function(e){var i=this,s=!1;return t.ui.ddmanager&&!this.options.dropBehaviour&&(s=t.ui.ddmanager.drop(this,e)),this.dropped&&(s=this.dropped,this.dropped=!1),"original"!==this.options.helper||t.contains(this.element[0].ownerDocument,this.element[0])?("invalid"===this.options.revert&&!s||"valid"===this.options.revert&&s||this.options.revert===!0||t.isFunction(this.options.revert)&&this.options.revert.call(this.element,s)?t(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){i._trigger("stop",e)!==!1&&i._clear()}):this._trigger("stop",e)!==!1&&this._clear(),!1):!1},_mouseUp:function(e){return t("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)}),t.ui.ddmanager&&t.ui.ddmanager.dragStop(this,e),t.ui.mouse.prototype._mouseUp.call(this,e)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(e){return this.options.handle?!!t(e.target).closest(this.element.find(this.options.handle)).length:!0},_createHelper:function(e){var i=this.options,s=t.isFunction(i.helper)?t(i.helper.apply(this.element[0],[e])):"clone"===i.helper?this.element.clone().removeAttr("id"):this.element;return s.parents("body").length||s.appendTo("parent"===i.appendTo?this.element[0].parentNode:i.appendTo),s[0]===this.element[0]||/(fixed|absolute)/.test(s.css("position"))||s.css("position","absolute"),s},_adjustOffsetFromHelper:function(e){"string"==typeof e&&(e=e.split(" ")),t.isArray(e)&&(e={left:+e[0],top:+e[1]||0}),"left"in e&&(this.offset.click.left=e.left+this.margins.left),"right"in e&&(this.offset.click.left=this.helperProportions.width-e.right+this.margins.left),"top"in e&&(this.offset.click.top=e.top+this.margins.top),"bottom"in e&&(this.offset.click.top=this.helperProportions.height-e.bottom+this.margins.top)},_getParentOffset:function(){var e=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])&&(e.left+=this.scrollParent.scrollLeft(),e.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===document.body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&t.ui.ie)&&(e={top:0,left:0}),{top:e.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:e.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var t=this.element.position();return{top:t.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:t.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var e,i,s,n=this.options;return n.containment?"window"===n.containment?(this.containment=[t(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,t(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,t(window).scrollLeft()+t(window).width()-this.helperProportions.width-this.margins.left,t(window).scrollTop()+(t(window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],undefined):"document"===n.containment?(this.containment=[0,0,t(document).width()-this.helperProportions.width-this.margins.left,(t(document).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],undefined):n.containment.constructor===Array?(this.containment=n.containment,undefined):("parent"===n.containment&&(n.containment=this.helper[0].parentNode),i=t(n.containment),s=i[0],s&&(e="hidden"!==i.css("overflow"),this.containment=[(parseInt(i.css("borderLeftWidth"),10)||0)+(parseInt(i.css("paddingLeft"),10)||0),(parseInt(i.css("borderTopWidth"),10)||0)+(parseInt(i.css("paddingTop"),10)||0),(e?Math.max(s.scrollWidth,s.offsetWidth):s.offsetWidth)-(parseInt(i.css("borderRightWidth"),10)||0)-(parseInt(i.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(e?Math.max(s.scrollHeight,s.offsetHeight):s.offsetHeight)-(parseInt(i.css("borderBottomWidth"),10)||0)-(parseInt(i.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relative_container=i),undefined):(this.containment=null,undefined)},_convertPositionTo:function(e,i){i||(i=this.position);var s="absolute"===e?1:-1,n="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent;return this.offset.scroll||(this.offset.scroll={top:n.scrollTop(),left:n.scrollLeft()}),{top:i.top+this.offset.relative.top*s+this.offset.parent.top*s-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():this.offset.scroll.top)*s,left:i.left+this.offset.relative.left*s+this.offset.parent.left*s-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():this.offset.scroll.left)*s}},_generatePosition:function(e){var i,s,n,o,a=this.options,r="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,h=e.pageX,l=e.pageY;return this.offset.scroll||(this.offset.scroll={top:r.scrollTop(),left:r.scrollLeft()}),this.originalPosition&&(this.containment&&(this.relative_container?(s=this.relative_container.offset(),i=[this.containment[0]+s.left,this.containment[1]+s.top,this.containment[2]+s.left,this.containment[3]+s.top]):i=this.containment,e.pageX-this.offset.click.left<i[0]&&(h=i[0]+this.offset.click.left),e.pageY-this.offset.click.top<i[1]&&(l=i[1]+this.offset.click.top),e.pageX-this.offset.click.left>i[2]&&(h=i[2]+this.offset.click.left),e.pageY-this.offset.click.top>i[3]&&(l=i[3]+this.offset.click.top)),a.grid&&(n=a.grid[1]?this.originalPageY+Math.round((l-this.originalPageY)/a.grid[1])*a.grid[1]:this.originalPageY,l=i?n-this.offset.click.top>=i[1]||n-this.offset.click.top>i[3]?n:n-this.offset.click.top>=i[1]?n-a.grid[1]:n+a.grid[1]:n,o=a.grid[0]?this.originalPageX+Math.round((h-this.originalPageX)/a.grid[0])*a.grid[0]:this.originalPageX,h=i?o-this.offset.click.left>=i[0]||o-this.offset.click.left>i[2]?o:o-this.offset.click.left>=i[0]?o-a.grid[0]:o+a.grid[0]:o)),{top:l-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():this.offset.scroll.top),left:h-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():this.offset.scroll.left)}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1},_trigger:function(e,i,s){return s=s||this._uiHash(),t.ui.plugin.call(this,e,[i,s]),"drag"===e&&(this.positionAbs=this._convertPositionTo("absolute")),t.Widget.prototype._trigger.call(this,e,i,s)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),t.ui.plugin.add("draggable","connectToSortable",{start:function(e,i){var s=t(this).data("ui-draggable"),n=s.options,o=t.extend({},i,{item:s.element});s.sortables=[],t(n.connectToSortable).each(function(){var i=t.data(this,"ui-sortable");i&&!i.options.disabled&&(s.sortables.push({instance:i,shouldRevert:i.options.revert}),i.refreshPositions(),i._trigger("activate",e,o))})},stop:function(e,i){var s=t(this).data("ui-draggable"),n=t.extend({},i,{item:s.element});t.each(s.sortables,function(){this.instance.isOver?(this.instance.isOver=0,s.cancelHelperRemoval=!0,this.instance.cancelHelperRemoval=!1,this.shouldRevert&&(this.instance.options.revert=this.shouldRevert),this.instance._mouseStop(e),this.instance.options.helper=this.instance.options._helper,"original"===s.options.helper&&this.instance.currentItem.css({top:"auto",left:"auto"})):(this.instance.cancelHelperRemoval=!1,this.instance._trigger("deactivate",e,n))})},drag:function(e,i){var s=t(this).data("ui-draggable"),n=this;t.each(s.sortables,function(){var o=!1,a=this;this.instance.positionAbs=s.positionAbs,this.instance.helperProportions=s.helperProportions,this.instance.offset.click=s.offset.click,this.instance._intersectsWith(this.instance.containerCache)&&(o=!0,t.each(s.sortables,function(){return this.instance.positionAbs=s.positionAbs,this.instance.helperProportions=s.helperProportions,this.instance.offset.click=s.offset.click,this!==a&&this.instance._intersectsWith(this.instance.containerCache)&&t.contains(a.instance.element[0],this.instance.element[0])&&(o=!1),o})),o?(this.instance.isOver||(this.instance.isOver=1,this.instance.currentItem=t(n).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item",!0),this.instance.options._helper=this.instance.options.helper,this.instance.options.helper=function(){return i.helper[0]},e.target=this.instance.currentItem[0],this.instance._mouseCapture(e,!0),this.instance._mouseStart(e,!0,!0),this.instance.offset.click.top=s.offset.click.top,this.instance.offset.click.left=s.offset.click.left,this.instance.offset.parent.left-=s.offset.parent.left-this.instance.offset.parent.left,this.instance.offset.parent.top-=s.offset.parent.top-this.instance.offset.parent.top,s._trigger("toSortable",e),s.dropped=this.instance.element,s.currentItem=s.element,this.instance.fromOutside=s),this.instance.currentItem&&this.instance._mouseDrag(e)):this.instance.isOver&&(this.instance.isOver=0,this.instance.cancelHelperRemoval=!0,this.instance.options.revert=!1,this.instance._trigger("out",e,this.instance._uiHash(this.instance)),this.instance._mouseStop(e,!0),this.instance.options.helper=this.instance.options._helper,this.instance.currentItem.remove(),this.instance.placeholder&&this.instance.placeholder.remove(),s._trigger("fromSortable",e),s.dropped=!1)})}}),t.ui.plugin.add("draggable","cursor",{start:function(){var e=t("body"),i=t(this).data("ui-draggable").options;e.css("cursor")&&(i._cursor=e.css("cursor")),e.css("cursor",i.cursor)},stop:function(){var e=t(this).data("ui-draggable").options;e._cursor&&t("body").css("cursor",e._cursor)}}),t.ui.plugin.add("draggable","opacity",{start:function(e,i){var s=t(i.helper),n=t(this).data("ui-draggable").options;s.css("opacity")&&(n._opacity=s.css("opacity")),s.css("opacity",n.opacity)},stop:function(e,i){var s=t(this).data("ui-draggable").options;s._opacity&&t(i.helper).css("opacity",s._opacity)}}),t.ui.plugin.add("draggable","scroll",{start:function(){var e=t(this).data("ui-draggable");e.scrollParent[0]!==document&&"HTML"!==e.scrollParent[0].tagName&&(e.overflowOffset=e.scrollParent.offset())},drag:function(e){var i=t(this).data("ui-draggable"),s=i.options,n=!1;i.scrollParent[0]!==document&&"HTML"!==i.scrollParent[0].tagName?(s.axis&&"x"===s.axis||(i.overflowOffset.top+i.scrollParent[0].offsetHeight-e.pageY<s.scrollSensitivity?i.scrollParent[0].scrollTop=n=i.scrollParent[0].scrollTop+s.scrollSpeed:e.pageY-i.overflowOffset.top<s.scrollSensitivity&&(i.scrollParent[0].scrollTop=n=i.scrollParent[0].scrollTop-s.scrollSpeed)),s.axis&&"y"===s.axis||(i.overflowOffset.left+i.scrollParent[0].offsetWidth-e.pageX<s.scrollSensitivity?i.scrollParent[0].scrollLeft=n=i.scrollParent[0].scrollLeft+s.scrollSpeed:e.pageX-i.overflowOffset.left<s.scrollSensitivity&&(i.scrollParent[0].scrollLeft=n=i.scrollParent[0].scrollLeft-s.scrollSpeed))):(s.axis&&"x"===s.axis||(e.pageY-t(document).scrollTop()<s.scrollSensitivity?n=t(document).scrollTop(t(document).scrollTop()-s.scrollSpeed):t(window).height()-(e.pageY-t(document).scrollTop())<s.scrollSensitivity&&(n=t(document).scrollTop(t(document).scrollTop()+s.scrollSpeed))),s.axis&&"y"===s.axis||(e.pageX-t(document).scrollLeft()<s.scrollSensitivity?n=t(document).scrollLeft(t(document).scrollLeft()-s.scrollSpeed):t(window).width()-(e.pageX-t(document).scrollLeft())<s.scrollSensitivity&&(n=t(document).scrollLeft(t(document).scrollLeft()+s.scrollSpeed)))),n!==!1&&t.ui.ddmanager&&!s.dropBehaviour&&t.ui.ddmanager.prepareOffsets(i,e)}}),t.ui.plugin.add("draggable","snap",{start:function(){var e=t(this).data("ui-draggable"),i=e.options;e.snapElements=[],t(i.snap.constructor!==String?i.snap.items||":data(ui-draggable)":i.snap).each(function(){var i=t(this),s=i.offset();this!==e.element[0]&&e.snapElements.push({item:this,width:i.outerWidth(),height:i.outerHeight(),top:s.top,left:s.left})})},drag:function(e,i){var s,n,o,a,r,h,l,c,u,d,p=t(this).data("ui-draggable"),f=p.options,g=f.snapTolerance,m=i.offset.left,v=m+p.helperProportions.width,_=i.offset.top,b=_+p.helperProportions.height;for(u=p.snapElements.length-1;u>=0;u--)r=p.snapElements[u].left,h=r+p.snapElements[u].width,l=p.snapElements[u].top,c=l+p.snapElements[u].height,r-g>v||m>h+g||l-g>b||_>c+g||!t.contains(p.snapElements[u].item.ownerDocument,p.snapElements[u].item)?(p.snapElements[u].snapping&&p.options.snap.release&&p.options.snap.release.call(p.element,e,t.extend(p._uiHash(),{snapItem:p.snapElements[u].item})),p.snapElements[u].snapping=!1):("inner"!==f.snapMode&&(s=g>=Math.abs(l-b),n=g>=Math.abs(c-_),o=g>=Math.abs(r-v),a=g>=Math.abs(h-m),s&&(i.position.top=p._convertPositionTo("relative",{top:l-p.helperProportions.height,left:0}).top-p.margins.top),n&&(i.position.top=p._convertPositionTo("relative",{top:c,left:0}).top-p.margins.top),o&&(i.position.left=p._convertPositionTo("relative",{top:0,left:r-p.helperProportions.width}).left-p.margins.left),a&&(i.position.left=p._convertPositionTo("relative",{top:0,left:h}).left-p.margins.left)),d=s||n||o||a,"outer"!==f.snapMode&&(s=g>=Math.abs(l-_),n=g>=Math.abs(c-b),o=g>=Math.abs(r-m),a=g>=Math.abs(h-v),s&&(i.position.top=p._convertPositionTo("relative",{top:l,left:0}).top-p.margins.top),n&&(i.position.top=p._convertPositionTo("relative",{top:c-p.helperProportions.height,left:0}).top-p.margins.top),o&&(i.position.left=p._convertPositionTo("relative",{top:0,left:r}).left-p.margins.left),a&&(i.position.left=p._convertPositionTo("relative",{top:0,left:h-p.helperProportions.width}).left-p.margins.left)),!p.snapElements[u].snapping&&(s||n||o||a||d)&&p.options.snap.snap&&p.options.snap.snap.call(p.element,e,t.extend(p._uiHash(),{snapItem:p.snapElements[u].item})),p.snapElements[u].snapping=s||n||o||a||d)}}),t.ui.plugin.add("draggable","stack",{start:function(){var e,i=this.data("ui-draggable").options,s=t.makeArray(t(i.stack)).sort(function(e,i){return(parseInt(t(e).css("zIndex"),10)||0)-(parseInt(t(i).css("zIndex"),10)||0)});s.length&&(e=parseInt(t(s[0]).css("zIndex"),10)||0,t(s).each(function(i){t(this).css("zIndex",e+i)}),this.css("zIndex",e+s.length))}}),t.ui.plugin.add("draggable","zIndex",{start:function(e,i){var s=t(i.helper),n=t(this).data("ui-draggable").options;s.css("zIndex")&&(n._zIndex=s.css("zIndex")),s.css("zIndex",n.zIndex)},stop:function(e,i){var s=t(this).data("ui-draggable").options;s._zIndex&&t(i.helper).css("zIndex",s._zIndex)}})}(jQuery),function(t){function e(t,e,i){return t>e&&e+i>t}t.widget("ui.droppable",{version:"1.10.3",widgetEventPrefix:"drop",options:{accept:"*",activeClass:!1,addClasses:!0,greedy:!1,hoverClass:!1,scope:"default",tolerance:"intersect",activate:null,deactivate:null,drop:null,out:null,over:null},_create:function(){var e=this.options,i=e.accept;this.isover=!1,this.isout=!0,this.accept=t.isFunction(i)?i:function(t){return t.is(i)
},this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight},t.ui.ddmanager.droppables[e.scope]=t.ui.ddmanager.droppables[e.scope]||[],t.ui.ddmanager.droppables[e.scope].push(this),e.addClasses&&this.element.addClass("ui-droppable")},_destroy:function(){for(var e=0,i=t.ui.ddmanager.droppables[this.options.scope];i.length>e;e++)i[e]===this&&i.splice(e,1);this.element.removeClass("ui-droppable ui-droppable-disabled")},_setOption:function(e,i){"accept"===e&&(this.accept=t.isFunction(i)?i:function(t){return t.is(i)}),t.Widget.prototype._setOption.apply(this,arguments)},_activate:function(e){var i=t.ui.ddmanager.current;this.options.activeClass&&this.element.addClass(this.options.activeClass),i&&this._trigger("activate",e,this.ui(i))},_deactivate:function(e){var i=t.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass),i&&this._trigger("deactivate",e,this.ui(i))},_over:function(e){var i=t.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this.options.hoverClass&&this.element.addClass(this.options.hoverClass),this._trigger("over",e,this.ui(i)))},_out:function(e){var i=t.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("out",e,this.ui(i)))},_drop:function(e,i){var s=i||t.ui.ddmanager.current,n=!1;return s&&(s.currentItem||s.element)[0]!==this.element[0]?(this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function(){var e=t.data(this,"ui-droppable");return e.options.greedy&&!e.options.disabled&&e.options.scope===s.options.scope&&e.accept.call(e.element[0],s.currentItem||s.element)&&t.ui.intersect(s,t.extend(e,{offset:e.element.offset()}),e.options.tolerance)?(n=!0,!1):undefined}),n?!1:this.accept.call(this.element[0],s.currentItem||s.element)?(this.options.activeClass&&this.element.removeClass(this.options.activeClass),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("drop",e,this.ui(s)),this.element):!1):!1},ui:function(t){return{draggable:t.currentItem||t.element,helper:t.helper,position:t.position,offset:t.positionAbs}}}),t.ui.intersect=function(t,i,s){if(!i.offset)return!1;var n,o,a=(t.positionAbs||t.position.absolute).left,r=a+t.helperProportions.width,h=(t.positionAbs||t.position.absolute).top,l=h+t.helperProportions.height,c=i.offset.left,u=c+i.proportions.width,d=i.offset.top,p=d+i.proportions.height;switch(s){case"fit":return a>=c&&u>=r&&h>=d&&p>=l;case"intersect":return a+t.helperProportions.width/2>c&&u>r-t.helperProportions.width/2&&h+t.helperProportions.height/2>d&&p>l-t.helperProportions.height/2;case"pointer":return n=(t.positionAbs||t.position.absolute).left+(t.clickOffset||t.offset.click).left,o=(t.positionAbs||t.position.absolute).top+(t.clickOffset||t.offset.click).top,e(o,d,i.proportions.height)&&e(n,c,i.proportions.width);case"touch":return(h>=d&&p>=h||l>=d&&p>=l||d>h&&l>p)&&(a>=c&&u>=a||r>=c&&u>=r||c>a&&r>u);default:return!1}},t.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(e,i){var s,n,o=t.ui.ddmanager.droppables[e.options.scope]||[],a=i?i.type:null,r=(e.currentItem||e.element).find(":data(ui-droppable)").addBack();t:for(s=0;o.length>s;s++)if(!(o[s].options.disabled||e&&!o[s].accept.call(o[s].element[0],e.currentItem||e.element))){for(n=0;r.length>n;n++)if(r[n]===o[s].element[0]){o[s].proportions.height=0;continue t}o[s].visible="none"!==o[s].element.css("display"),o[s].visible&&("mousedown"===a&&o[s]._activate.call(o[s],i),o[s].offset=o[s].element.offset(),o[s].proportions={width:o[s].element[0].offsetWidth,height:o[s].element[0].offsetHeight})}},drop:function(e,i){var s=!1;return t.each((t.ui.ddmanager.droppables[e.options.scope]||[]).slice(),function(){this.options&&(!this.options.disabled&&this.visible&&t.ui.intersect(e,this,this.options.tolerance)&&(s=this._drop.call(this,i)||s),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],e.currentItem||e.element)&&(this.isout=!0,this.isover=!1,this._deactivate.call(this,i)))}),s},dragStart:function(e,i){e.element.parentsUntil("body").bind("scroll.droppable",function(){e.options.refreshPositions||t.ui.ddmanager.prepareOffsets(e,i)})},drag:function(e,i){e.options.refreshPositions&&t.ui.ddmanager.prepareOffsets(e,i),t.each(t.ui.ddmanager.droppables[e.options.scope]||[],function(){if(!this.options.disabled&&!this.greedyChild&&this.visible){var s,n,o,a=t.ui.intersect(e,this,this.options.tolerance),r=!a&&this.isover?"isout":a&&!this.isover?"isover":null;r&&(this.options.greedy&&(n=this.options.scope,o=this.element.parents(":data(ui-droppable)").filter(function(){return t.data(this,"ui-droppable").options.scope===n}),o.length&&(s=t.data(o[0],"ui-droppable"),s.greedyChild="isover"===r)),s&&"isover"===r&&(s.isover=!1,s.isout=!0,s._out.call(s,i)),this[r]=!0,this["isout"===r?"isover":"isout"]=!1,this["isover"===r?"_over":"_out"].call(this,i),s&&"isout"===r&&(s.isout=!1,s.isover=!0,s._over.call(s,i)))}})},dragStop:function(e,i){e.element.parentsUntil("body").unbind("scroll.droppable"),e.options.refreshPositions||t.ui.ddmanager.prepareOffsets(e,i)}}}(jQuery),function(t){function e(t){return parseInt(t,10)||0}function i(t){return!isNaN(parseInt(t,10))}t.widget("ui.resizable",t.ui.mouse,{version:"1.10.3",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:90,resize:null,start:null,stop:null},_create:function(){var e,i,s,n,o,a=this,r=this.options;if(this.element.addClass("ui-resizable"),t.extend(this,{_aspectRatio:!!r.aspectRatio,aspectRatio:r.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:r.helper||r.ghost||r.animate?r.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)&&(this.element.wrap(t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("ui-resizable",this.element.data("ui-resizable")),this.elementIsWrapper=!0,this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")}),this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0}),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css({margin:this.originalElement.css("margin")}),this._proportionallyResize()),this.handles=r.handles||(t(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se"),this.handles.constructor===String)for("all"===this.handles&&(this.handles="n,e,s,w,se,sw,ne,nw"),e=this.handles.split(","),this.handles={},i=0;e.length>i;i++)s=t.trim(e[i]),o="ui-resizable-"+s,n=t("<div class='ui-resizable-handle "+o+"'></div>"),n.css({zIndex:r.zIndex}),"se"===s&&n.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),this.handles[s]=".ui-resizable-"+s,this.element.append(n);this._renderAxis=function(e){var i,s,n,o;e=e||this.element;for(i in this.handles)this.handles[i].constructor===String&&(this.handles[i]=t(this.handles[i],this.element).show()),this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)&&(s=t(this.handles[i],this.element),o=/sw|ne|nw|se|n|s/.test(i)?s.outerHeight():s.outerWidth(),n=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join(""),e.css(n,o),this._proportionallyResize()),t(this.handles[i]).length},this._renderAxis(this.element),this._handles=t(".ui-resizable-handle",this.element).disableSelection(),this._handles.mouseover(function(){a.resizing||(this.className&&(n=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),a.axis=n&&n[1]?n[1]:"se")}),r.autoHide&&(this._handles.hide(),t(this.element).addClass("ui-resizable-autohide").mouseenter(function(){r.disabled||(t(this).removeClass("ui-resizable-autohide"),a._handles.show())}).mouseleave(function(){r.disabled||a.resizing||(t(this).addClass("ui-resizable-autohide"),a._handles.hide())})),this._mouseInit()},_destroy:function(){this._mouseDestroy();var e,i=function(e){t(e).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};return this.elementIsWrapper&&(i(this.element),e=this.element,this.originalElement.css({position:e.css("position"),width:e.outerWidth(),height:e.outerHeight(),top:e.css("top"),left:e.css("left")}).insertAfter(e),e.remove()),this.originalElement.css("resize",this.originalResizeStyle),i(this.originalElement),this},_mouseCapture:function(e){var i,s,n=!1;for(i in this.handles)s=t(this.handles[i])[0],(s===e.target||t.contains(s,e.target))&&(n=!0);return!this.options.disabled&&n},_mouseStart:function(i){var s,n,o,a=this.options,r=this.element.position(),h=this.element;return this.resizing=!0,/absolute/.test(h.css("position"))?h.css({position:"absolute",top:h.css("top"),left:h.css("left")}):h.is(".ui-draggable")&&h.css({position:"absolute",top:r.top,left:r.left}),this._renderProxy(),s=e(this.helper.css("left")),n=e(this.helper.css("top")),a.containment&&(s+=t(a.containment).scrollLeft()||0,n+=t(a.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:s,top:n},this.size=this._helper?{width:h.outerWidth(),height:h.outerHeight()}:{width:h.width(),height:h.height()},this.originalSize=this._helper?{width:h.outerWidth(),height:h.outerHeight()}:{width:h.width(),height:h.height()},this.originalPosition={left:s,top:n},this.sizeDiff={width:h.outerWidth()-h.width(),height:h.outerHeight()-h.height()},this.originalMousePosition={left:i.pageX,top:i.pageY},this.aspectRatio="number"==typeof a.aspectRatio?a.aspectRatio:this.originalSize.width/this.originalSize.height||1,o=t(".ui-resizable-"+this.axis).css("cursor"),t("body").css("cursor","auto"===o?this.axis+"-resize":o),h.addClass("ui-resizable-resizing"),this._propagate("start",i),!0},_mouseDrag:function(e){var i,s=this.helper,n={},o=this.originalMousePosition,a=this.axis,r=this.position.top,h=this.position.left,l=this.size.width,c=this.size.height,u=e.pageX-o.left||0,d=e.pageY-o.top||0,p=this._change[a];return p?(i=p.apply(this,[e,u,d]),this._updateVirtualBoundaries(e.shiftKey),(this._aspectRatio||e.shiftKey)&&(i=this._updateRatio(i,e)),i=this._respectSize(i,e),this._updateCache(i),this._propagate("resize",e),this.position.top!==r&&(n.top=this.position.top+"px"),this.position.left!==h&&(n.left=this.position.left+"px"),this.size.width!==l&&(n.width=this.size.width+"px"),this.size.height!==c&&(n.height=this.size.height+"px"),s.css(n),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),t.isEmptyObject(n)||this._trigger("resize",e,this.ui()),!1):!1},_mouseStop:function(e){this.resizing=!1;var i,s,n,o,a,r,h,l=this.options,c=this;return this._helper&&(i=this._proportionallyResizeElements,s=i.length&&/textarea/i.test(i[0].nodeName),n=s&&t.ui.hasScroll(i[0],"left")?0:c.sizeDiff.height,o=s?0:c.sizeDiff.width,a={width:c.helper.width()-o,height:c.helper.height()-n},r=parseInt(c.element.css("left"),10)+(c.position.left-c.originalPosition.left)||null,h=parseInt(c.element.css("top"),10)+(c.position.top-c.originalPosition.top)||null,l.animate||this.element.css(t.extend(a,{top:h,left:r})),c.helper.height(c.size.height),c.helper.width(c.size.width),this._helper&&!l.animate&&this._proportionallyResize()),t("body").css("cursor","auto"),this.element.removeClass("ui-resizable-resizing"),this._propagate("stop",e),this._helper&&this.helper.remove(),!1},_updateVirtualBoundaries:function(t){var e,s,n,o,a,r=this.options;a={minWidth:i(r.minWidth)?r.minWidth:0,maxWidth:i(r.maxWidth)?r.maxWidth:1/0,minHeight:i(r.minHeight)?r.minHeight:0,maxHeight:i(r.maxHeight)?r.maxHeight:1/0},(this._aspectRatio||t)&&(e=a.minHeight*this.aspectRatio,n=a.minWidth/this.aspectRatio,s=a.maxHeight*this.aspectRatio,o=a.maxWidth/this.aspectRatio,e>a.minWidth&&(a.minWidth=e),n>a.minHeight&&(a.minHeight=n),a.maxWidth>s&&(a.maxWidth=s),a.maxHeight>o&&(a.maxHeight=o)),this._vBoundaries=a},_updateCache:function(t){this.offset=this.helper.offset(),i(t.left)&&(this.position.left=t.left),i(t.top)&&(this.position.top=t.top),i(t.height)&&(this.size.height=t.height),i(t.width)&&(this.size.width=t.width)},_updateRatio:function(t){var e=this.position,s=this.size,n=this.axis;return i(t.height)?t.width=t.height*this.aspectRatio:i(t.width)&&(t.height=t.width/this.aspectRatio),"sw"===n&&(t.left=e.left+(s.width-t.width),t.top=null),"nw"===n&&(t.top=e.top+(s.height-t.height),t.left=e.left+(s.width-t.width)),t},_respectSize:function(t){var e=this._vBoundaries,s=this.axis,n=i(t.width)&&e.maxWidth&&e.maxWidth<t.width,o=i(t.height)&&e.maxHeight&&e.maxHeight<t.height,a=i(t.width)&&e.minWidth&&e.minWidth>t.width,r=i(t.height)&&e.minHeight&&e.minHeight>t.height,h=this.originalPosition.left+this.originalSize.width,l=this.position.top+this.size.height,c=/sw|nw|w/.test(s),u=/nw|ne|n/.test(s);return a&&(t.width=e.minWidth),r&&(t.height=e.minHeight),n&&(t.width=e.maxWidth),o&&(t.height=e.maxHeight),a&&c&&(t.left=h-e.minWidth),n&&c&&(t.left=h-e.maxWidth),r&&u&&(t.top=l-e.minHeight),o&&u&&(t.top=l-e.maxHeight),t.width||t.height||t.left||!t.top?t.width||t.height||t.top||!t.left||(t.left=null):t.top=null,t},_proportionallyResize:function(){if(this._proportionallyResizeElements.length){var t,e,i,s,n,o=this.helper||this.element;for(t=0;this._proportionallyResizeElements.length>t;t++){if(n=this._proportionallyResizeElements[t],!this.borderDif)for(this.borderDif=[],i=[n.css("borderTopWidth"),n.css("borderRightWidth"),n.css("borderBottomWidth"),n.css("borderLeftWidth")],s=[n.css("paddingTop"),n.css("paddingRight"),n.css("paddingBottom"),n.css("paddingLeft")],e=0;i.length>e;e++)this.borderDif[e]=(parseInt(i[e],10)||0)+(parseInt(s[e],10)||0);n.css({height:o.height()-this.borderDif[0]-this.borderDif[2]||0,width:o.width()-this.borderDif[1]-this.borderDif[3]||0})}}},_renderProxy:function(){var e=this.element,i=this.options;this.elementOffset=e.offset(),this._helper?(this.helper=this.helper||t("<div style='overflow:hidden;'></div>"),this.helper.addClass(this._helper).css({width:this.element.outerWidth()-1,height:this.element.outerHeight()-1,position:"absolute",left:this.elementOffset.left+"px",top:this.elementOffset.top+"px",zIndex:++i.zIndex}),this.helper.appendTo("body").disableSelection()):this.helper=this.element},_change:{e:function(t,e){return{width:this.originalSize.width+e}},w:function(t,e){var i=this.originalSize,s=this.originalPosition;return{left:s.left+e,width:i.width-e}},n:function(t,e,i){var s=this.originalSize,n=this.originalPosition;return{top:n.top+i,height:s.height-i}},s:function(t,e,i){return{height:this.originalSize.height+i}},se:function(e,i,s){return t.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[e,i,s]))},sw:function(e,i,s){return t.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[e,i,s]))},ne:function(e,i,s){return t.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[e,i,s]))},nw:function(e,i,s){return t.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[e,i,s]))}},_propagate:function(e,i){t.ui.plugin.call(this,e,[i,this.ui()]),"resize"!==e&&this._trigger(e,i,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),t.ui.plugin.add("resizable","animate",{stop:function(e){var i=t(this).data("ui-resizable"),s=i.options,n=i._proportionallyResizeElements,o=n.length&&/textarea/i.test(n[0].nodeName),a=o&&t.ui.hasScroll(n[0],"left")?0:i.sizeDiff.height,r=o?0:i.sizeDiff.width,h={width:i.size.width-r,height:i.size.height-a},l=parseInt(i.element.css("left"),10)+(i.position.left-i.originalPosition.left)||null,c=parseInt(i.element.css("top"),10)+(i.position.top-i.originalPosition.top)||null;i.element.animate(t.extend(h,c&&l?{top:c,left:l}:{}),{duration:s.animateDuration,easing:s.animateEasing,step:function(){var s={width:parseInt(i.element.css("width"),10),height:parseInt(i.element.css("height"),10),top:parseInt(i.element.css("top"),10),left:parseInt(i.element.css("left"),10)};n&&n.length&&t(n[0]).css({width:s.width,height:s.height}),i._updateCache(s),i._propagate("resize",e)}})}}),t.ui.plugin.add("resizable","containment",{start:function(){var i,s,n,o,a,r,h,l=t(this).data("ui-resizable"),c=l.options,u=l.element,d=c.containment,p=d instanceof t?d.get(0):/parent/.test(d)?u.parent().get(0):d;p&&(l.containerElement=t(p),/document/.test(d)||d===document?(l.containerOffset={left:0,top:0},l.containerPosition={left:0,top:0},l.parentData={element:t(document),left:0,top:0,width:t(document).width(),height:t(document).height()||document.body.parentNode.scrollHeight}):(i=t(p),s=[],t(["Top","Right","Left","Bottom"]).each(function(t,n){s[t]=e(i.css("padding"+n))}),l.containerOffset=i.offset(),l.containerPosition=i.position(),l.containerSize={height:i.innerHeight()-s[3],width:i.innerWidth()-s[1]},n=l.containerOffset,o=l.containerSize.height,a=l.containerSize.width,r=t.ui.hasScroll(p,"left")?p.scrollWidth:a,h=t.ui.hasScroll(p)?p.scrollHeight:o,l.parentData={element:p,left:n.left,top:n.top,width:r,height:h}))},resize:function(e){var i,s,n,o,a=t(this).data("ui-resizable"),r=a.options,h=a.containerOffset,l=a.position,c=a._aspectRatio||e.shiftKey,u={top:0,left:0},d=a.containerElement;d[0]!==document&&/static/.test(d.css("position"))&&(u=h),l.left<(a._helper?h.left:0)&&(a.size.width=a.size.width+(a._helper?a.position.left-h.left:a.position.left-u.left),c&&(a.size.height=a.size.width/a.aspectRatio),a.position.left=r.helper?h.left:0),l.top<(a._helper?h.top:0)&&(a.size.height=a.size.height+(a._helper?a.position.top-h.top:a.position.top),c&&(a.size.width=a.size.height*a.aspectRatio),a.position.top=a._helper?h.top:0),a.offset.left=a.parentData.left+a.position.left,a.offset.top=a.parentData.top+a.position.top,i=Math.abs((a._helper?a.offset.left-u.left:a.offset.left-u.left)+a.sizeDiff.width),s=Math.abs((a._helper?a.offset.top-u.top:a.offset.top-h.top)+a.sizeDiff.height),n=a.containerElement.get(0)===a.element.parent().get(0),o=/relative|absolute/.test(a.containerElement.css("position")),n&&o&&(i-=a.parentData.left),i+a.size.width>=a.parentData.width&&(a.size.width=a.parentData.width-i,c&&(a.size.height=a.size.width/a.aspectRatio)),s+a.size.height>=a.parentData.height&&(a.size.height=a.parentData.height-s,c&&(a.size.width=a.size.height*a.aspectRatio))},stop:function(){var e=t(this).data("ui-resizable"),i=e.options,s=e.containerOffset,n=e.containerPosition,o=e.containerElement,a=t(e.helper),r=a.offset(),h=a.outerWidth()-e.sizeDiff.width,l=a.outerHeight()-e.sizeDiff.height;e._helper&&!i.animate&&/relative/.test(o.css("position"))&&t(this).css({left:r.left-n.left-s.left,width:h,height:l}),e._helper&&!i.animate&&/static/.test(o.css("position"))&&t(this).css({left:r.left-n.left-s.left,width:h,height:l})}}),t.ui.plugin.add("resizable","alsoResize",{start:function(){var e=t(this).data("ui-resizable"),i=e.options,s=function(e){t(e).each(function(){var e=t(this);e.data("ui-resizable-alsoresize",{width:parseInt(e.width(),10),height:parseInt(e.height(),10),left:parseInt(e.css("left"),10),top:parseInt(e.css("top"),10)})})};"object"!=typeof i.alsoResize||i.alsoResize.parentNode?s(i.alsoResize):i.alsoResize.length?(i.alsoResize=i.alsoResize[0],s(i.alsoResize)):t.each(i.alsoResize,function(t){s(t)})},resize:function(e,i){var s=t(this).data("ui-resizable"),n=s.options,o=s.originalSize,a=s.originalPosition,r={height:s.size.height-o.height||0,width:s.size.width-o.width||0,top:s.position.top-a.top||0,left:s.position.left-a.left||0},h=function(e,s){t(e).each(function(){var e=t(this),n=t(this).data("ui-resizable-alsoresize"),o={},a=s&&s.length?s:e.parents(i.originalElement[0]).length?["width","height"]:["width","height","top","left"];t.each(a,function(t,e){var i=(n[e]||0)+(r[e]||0);i&&i>=0&&(o[e]=i||null)}),e.css(o)})};"object"!=typeof n.alsoResize||n.alsoResize.nodeType?h(n.alsoResize):t.each(n.alsoResize,function(t,e){h(t,e)})},stop:function(){t(this).removeData("resizable-alsoresize")}}),t.ui.plugin.add("resizable","ghost",{start:function(){var e=t(this).data("ui-resizable"),i=e.options,s=e.size;e.ghost=e.originalElement.clone(),e.ghost.css({opacity:.25,display:"block",position:"relative",height:s.height,width:s.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass("string"==typeof i.ghost?i.ghost:""),e.ghost.appendTo(e.helper)},resize:function(){var e=t(this).data("ui-resizable");e.ghost&&e.ghost.css({position:"relative",height:e.size.height,width:e.size.width})},stop:function(){var e=t(this).data("ui-resizable");e.ghost&&e.helper&&e.helper.get(0).removeChild(e.ghost.get(0))}}),t.ui.plugin.add("resizable","grid",{resize:function(){var e=t(this).data("ui-resizable"),i=e.options,s=e.size,n=e.originalSize,o=e.originalPosition,a=e.axis,r="number"==typeof i.grid?[i.grid,i.grid]:i.grid,h=r[0]||1,l=r[1]||1,c=Math.round((s.width-n.width)/h)*h,u=Math.round((s.height-n.height)/l)*l,d=n.width+c,p=n.height+u,f=i.maxWidth&&d>i.maxWidth,g=i.maxHeight&&p>i.maxHeight,m=i.minWidth&&i.minWidth>d,v=i.minHeight&&i.minHeight>p;i.grid=r,m&&(d+=h),v&&(p+=l),f&&(d-=h),g&&(p-=l),/^(se|s|e)$/.test(a)?(e.size.width=d,e.size.height=p):/^(ne)$/.test(a)?(e.size.width=d,e.size.height=p,e.position.top=o.top-u):/^(sw)$/.test(a)?(e.size.width=d,e.size.height=p,e.position.left=o.left-c):(e.size.width=d,e.size.height=p,e.position.top=o.top-u,e.position.left=o.left-c)}})}(jQuery),function(t){t.widget("ui.selectable",t.ui.mouse,{version:"1.10.3",options:{appendTo:"body",autoRefresh:!0,distance:0,filter:"*",tolerance:"touch",selected:null,selecting:null,start:null,stop:null,unselected:null,unselecting:null},_create:function(){var e,i=this;this.element.addClass("ui-selectable"),this.dragged=!1,this.refresh=function(){e=t(i.options.filter,i.element[0]),e.addClass("ui-selectee"),e.each(function(){var e=t(this),i=e.offset();t.data(this,"selectable-item",{element:this,$element:e,left:i.left,top:i.top,right:i.left+e.outerWidth(),bottom:i.top+e.outerHeight(),startselected:!1,selected:e.hasClass("ui-selected"),selecting:e.hasClass("ui-selecting"),unselecting:e.hasClass("ui-unselecting")})})},this.refresh(),this.selectees=e.addClass("ui-selectee"),this._mouseInit(),this.helper=t("<div class='ui-selectable-helper'></div>")},_destroy:function(){this.selectees.removeClass("ui-selectee").removeData("selectable-item"),this.element.removeClass("ui-selectable ui-selectable-disabled"),this._mouseDestroy()},_mouseStart:function(e){var i=this,s=this.options;this.opos=[e.pageX,e.pageY],this.options.disabled||(this.selectees=t(s.filter,this.element[0]),this._trigger("start",e),t(s.appendTo).append(this.helper),this.helper.css({left:e.pageX,top:e.pageY,width:0,height:0}),s.autoRefresh&&this.refresh(),this.selectees.filter(".ui-selected").each(function(){var s=t.data(this,"selectable-item");s.startselected=!0,e.metaKey||e.ctrlKey||(s.$element.removeClass("ui-selected"),s.selected=!1,s.$element.addClass("ui-unselecting"),s.unselecting=!0,i._trigger("unselecting",e,{unselecting:s.element}))}),t(e.target).parents().addBack().each(function(){var s,n=t.data(this,"selectable-item");return n?(s=!e.metaKey&&!e.ctrlKey||!n.$element.hasClass("ui-selected"),n.$element.removeClass(s?"ui-unselecting":"ui-selected").addClass(s?"ui-selecting":"ui-unselecting"),n.unselecting=!s,n.selecting=s,n.selected=s,s?i._trigger("selecting",e,{selecting:n.element}):i._trigger("unselecting",e,{unselecting:n.element}),!1):undefined}))},_mouseDrag:function(e){if(this.dragged=!0,!this.options.disabled){var i,s=this,n=this.options,o=this.opos[0],a=this.opos[1],r=e.pageX,h=e.pageY;return o>r&&(i=r,r=o,o=i),a>h&&(i=h,h=a,a=i),this.helper.css({left:o,top:a,width:r-o,height:h-a}),this.selectees.each(function(){var i=t.data(this,"selectable-item"),l=!1;i&&i.element!==s.element[0]&&("touch"===n.tolerance?l=!(i.left>r||o>i.right||i.top>h||a>i.bottom):"fit"===n.tolerance&&(l=i.left>o&&r>i.right&&i.top>a&&h>i.bottom),l?(i.selected&&(i.$element.removeClass("ui-selected"),i.selected=!1),i.unselecting&&(i.$element.removeClass("ui-unselecting"),i.unselecting=!1),i.selecting||(i.$element.addClass("ui-selecting"),i.selecting=!0,s._trigger("selecting",e,{selecting:i.element}))):(i.selecting&&((e.metaKey||e.ctrlKey)&&i.startselected?(i.$element.removeClass("ui-selecting"),i.selecting=!1,i.$element.addClass("ui-selected"),i.selected=!0):(i.$element.removeClass("ui-selecting"),i.selecting=!1,i.startselected&&(i.$element.addClass("ui-unselecting"),i.unselecting=!0),s._trigger("unselecting",e,{unselecting:i.element}))),i.selected&&(e.metaKey||e.ctrlKey||i.startselected||(i.$element.removeClass("ui-selected"),i.selected=!1,i.$element.addClass("ui-unselecting"),i.unselecting=!0,s._trigger("unselecting",e,{unselecting:i.element})))))}),!1}},_mouseStop:function(e){var i=this;return this.dragged=!1,t(".ui-unselecting",this.element[0]).each(function(){var s=t.data(this,"selectable-item");s.$element.removeClass("ui-unselecting"),s.unselecting=!1,s.startselected=!1,i._trigger("unselected",e,{unselected:s.element})}),t(".ui-selecting",this.element[0]).each(function(){var s=t.data(this,"selectable-item");s.$element.removeClass("ui-selecting").addClass("ui-selected"),s.selecting=!1,s.selected=!0,s.startselected=!0,i._trigger("selected",e,{selected:s.element})}),this._trigger("stop",e),this.helper.remove(),!1}})}(jQuery),function(t){function e(t,e,i){return t>e&&e+i>t}function i(t){return/left|right/.test(t.css("float"))||/inline|table-cell/.test(t.css("display"))}t.widget("ui.sortable",t.ui.mouse,{version:"1.10.3",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3,activate:null,beforeStop:null,change:null,deactivate:null,out:null,over:null,receive:null,remove:null,sort:null,start:null,stop:null,update:null},_create:function(){var t=this.options;this.containerCache={},this.element.addClass("ui-sortable"),this.refresh(),this.floating=this.items.length?"x"===t.axis||i(this.items[0].item):!1,this.offset=this.element.offset(),this._mouseInit(),this.ready=!0},_destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled"),this._mouseDestroy();for(var t=this.items.length-1;t>=0;t--)this.items[t].item.removeData(this.widgetName+"-item");return this},_setOption:function(e,i){"disabled"===e?(this.options[e]=i,this.widget().toggleClass("ui-sortable-disabled",!!i)):t.Widget.prototype._setOption.apply(this,arguments)},_mouseCapture:function(e,i){var s=null,n=!1,o=this;return this.reverting?!1:this.options.disabled||"static"===this.options.type?!1:(this._refreshItems(e),t(e.target).parents().each(function(){return t.data(this,o.widgetName+"-item")===o?(s=t(this),!1):undefined}),t.data(e.target,o.widgetName+"-item")===o&&(s=t(e.target)),s?!this.options.handle||i||(t(this.options.handle,s).find("*").addBack().each(function(){this===e.target&&(n=!0)}),n)?(this.currentItem=s,this._removeCurrentsFromItems(),!0):!1:!1)},_mouseStart:function(e,i,s){var n,o,a=this.options;if(this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(e),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},t.extend(this.offset,{click:{left:e.pageX-this.offset.left,top:e.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(e),this.originalPageX=e.pageX,this.originalPageY=e.pageY,a.cursorAt&&this._adjustOffsetFromHelper(a.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!==this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),a.containment&&this._setContainment(),a.cursor&&"auto"!==a.cursor&&(o=this.document.find("body"),this.storedCursor=o.css("cursor"),o.css("cursor",a.cursor),this.storedStylesheet=t("<style>*{ cursor: "+a.cursor+" !important; }</style>").appendTo(o)),a.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",a.opacity)),a.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",a.zIndex)),this.scrollParent[0]!==document&&"HTML"!==this.scrollParent[0].tagName&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",e,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions(),!s)for(n=this.containers.length-1;n>=0;n--)this.containers[n]._trigger("activate",e,this._uiHash(this));return t.ui.ddmanager&&(t.ui.ddmanager.current=this),t.ui.ddmanager&&!a.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e),this.dragging=!0,this.helper.addClass("ui-sortable-helper"),this._mouseDrag(e),!0},_mouseDrag:function(e){var i,s,n,o,a=this.options,r=!1;for(this.position=this._generatePosition(e),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs),this.options.scroll&&(this.scrollParent[0]!==document&&"HTML"!==this.scrollParent[0].tagName?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-e.pageY<a.scrollSensitivity?this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop+a.scrollSpeed:e.pageY-this.overflowOffset.top<a.scrollSensitivity&&(this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop-a.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-e.pageX<a.scrollSensitivity?this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft+a.scrollSpeed:e.pageX-this.overflowOffset.left<a.scrollSensitivity&&(this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft-a.scrollSpeed)):(e.pageY-t(document).scrollTop()<a.scrollSensitivity?r=t(document).scrollTop(t(document).scrollTop()-a.scrollSpeed):t(window).height()-(e.pageY-t(document).scrollTop())<a.scrollSensitivity&&(r=t(document).scrollTop(t(document).scrollTop()+a.scrollSpeed)),e.pageX-t(document).scrollLeft()<a.scrollSensitivity?r=t(document).scrollLeft(t(document).scrollLeft()-a.scrollSpeed):t(window).width()-(e.pageX-t(document).scrollLeft())<a.scrollSensitivity&&(r=t(document).scrollLeft(t(document).scrollLeft()+a.scrollSpeed))),r!==!1&&t.ui.ddmanager&&!a.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e)),this.positionAbs=this._convertPositionTo("absolute"),this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),i=this.items.length-1;i>=0;i--)if(s=this.items[i],n=s.item[0],o=this._intersectsWithPointer(s),o&&s.instance===this.currentContainer&&n!==this.currentItem[0]&&this.placeholder[1===o?"next":"prev"]()[0]!==n&&!t.contains(this.placeholder[0],n)&&("semi-dynamic"===this.options.type?!t.contains(this.element[0],n):!0)){if(this.direction=1===o?"down":"up","pointer"!==this.options.tolerance&&!this._intersectsWithSides(s))break;
this._rearrange(e,s),this._trigger("change",e,this._uiHash());break}return this._contactContainers(e),t.ui.ddmanager&&t.ui.ddmanager.drag(this,e),this._trigger("sort",e,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(e,i){if(e){if(t.ui.ddmanager&&!this.options.dropBehaviour&&t.ui.ddmanager.drop(this,e),this.options.revert){var s=this,n=this.placeholder.offset(),o=this.options.axis,a={};o&&"x"!==o||(a.left=n.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]===document.body?0:this.offsetParent[0].scrollLeft)),o&&"y"!==o||(a.top=n.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]===document.body?0:this.offsetParent[0].scrollTop)),this.reverting=!0,t(this.helper).animate(a,parseInt(this.options.revert,10)||500,function(){s._clear(e)})}else this._clear(e,i);return!1}},cancel:function(){if(this.dragging){this._mouseUp({target:null}),"original"===this.options.helper?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var e=this.containers.length-1;e>=0;e--)this.containers[e]._trigger("deactivate",null,this._uiHash(this)),this.containers[e].containerCache.over&&(this.containers[e]._trigger("out",null,this._uiHash(this)),this.containers[e].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),"original"!==this.options.helper&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),t.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?t(this.domPosition.prev).after(this.currentItem):t(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(e){var i=this._getItemsAsjQuery(e&&e.connected),s=[];return e=e||{},t(i).each(function(){var i=(t(e.item||this).attr(e.attribute||"id")||"").match(e.expression||/(.+)[\-=_](.+)/);i&&s.push((e.key||i[1]+"[]")+"="+(e.key&&e.expression?i[1]:i[2]))}),!s.length&&e.key&&s.push(e.key+"="),s.join("&")},toArray:function(e){var i=this._getItemsAsjQuery(e&&e.connected),s=[];return e=e||{},i.each(function(){s.push(t(e.item||this).attr(e.attribute||"id")||"")}),s},_intersectsWith:function(t){var e=this.positionAbs.left,i=e+this.helperProportions.width,s=this.positionAbs.top,n=s+this.helperProportions.height,o=t.left,a=o+t.width,r=t.top,h=r+t.height,l=this.offset.click.top,c=this.offset.click.left,u="x"===this.options.axis||s+l>r&&h>s+l,d="y"===this.options.axis||e+c>o&&a>e+c,p=u&&d;return"pointer"===this.options.tolerance||this.options.forcePointerForContainers||"pointer"!==this.options.tolerance&&this.helperProportions[this.floating?"width":"height"]>t[this.floating?"width":"height"]?p:e+this.helperProportions.width/2>o&&a>i-this.helperProportions.width/2&&s+this.helperProportions.height/2>r&&h>n-this.helperProportions.height/2},_intersectsWithPointer:function(t){var i="x"===this.options.axis||e(this.positionAbs.top+this.offset.click.top,t.top,t.height),s="y"===this.options.axis||e(this.positionAbs.left+this.offset.click.left,t.left,t.width),n=i&&s,o=this._getDragVerticalDirection(),a=this._getDragHorizontalDirection();return n?this.floating?a&&"right"===a||"down"===o?2:1:o&&("down"===o?2:1):!1},_intersectsWithSides:function(t){var i=e(this.positionAbs.top+this.offset.click.top,t.top+t.height/2,t.height),s=e(this.positionAbs.left+this.offset.click.left,t.left+t.width/2,t.width),n=this._getDragVerticalDirection(),o=this._getDragHorizontalDirection();return this.floating&&o?"right"===o&&s||"left"===o&&!s:n&&("down"===n&&i||"up"===n&&!i)},_getDragVerticalDirection:function(){var t=this.positionAbs.top-this.lastPositionAbs.top;return 0!==t&&(t>0?"down":"up")},_getDragHorizontalDirection:function(){var t=this.positionAbs.left-this.lastPositionAbs.left;return 0!==t&&(t>0?"right":"left")},refresh:function(t){return this._refreshItems(t),this.refreshPositions(),this},_connectWith:function(){var t=this.options;return t.connectWith.constructor===String?[t.connectWith]:t.connectWith},_getItemsAsjQuery:function(e){var i,s,n,o,a=[],r=[],h=this._connectWith();if(h&&e)for(i=h.length-1;i>=0;i--)for(n=t(h[i]),s=n.length-1;s>=0;s--)o=t.data(n[s],this.widgetFullName),o&&o!==this&&!o.options.disabled&&r.push([t.isFunction(o.options.items)?o.options.items.call(o.element):t(o.options.items,o.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),o]);for(r.push([t.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):t(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]),i=r.length-1;i>=0;i--)r[i][0].each(function(){a.push(this)});return t(a)},_removeCurrentsFromItems:function(){var e=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=t.grep(this.items,function(t){for(var i=0;e.length>i;i++)if(e[i]===t.item[0])return!1;return!0})},_refreshItems:function(e){this.items=[],this.containers=[this];var i,s,n,o,a,r,h,l,c=this.items,u=[[t.isFunction(this.options.items)?this.options.items.call(this.element[0],e,{item:this.currentItem}):t(this.options.items,this.element),this]],d=this._connectWith();if(d&&this.ready)for(i=d.length-1;i>=0;i--)for(n=t(d[i]),s=n.length-1;s>=0;s--)o=t.data(n[s],this.widgetFullName),o&&o!==this&&!o.options.disabled&&(u.push([t.isFunction(o.options.items)?o.options.items.call(o.element[0],e,{item:this.currentItem}):t(o.options.items,o.element),o]),this.containers.push(o));for(i=u.length-1;i>=0;i--)for(a=u[i][1],r=u[i][0],s=0,l=r.length;l>s;s++)h=t(r[s]),h.data(this.widgetName+"-item",a),c.push({item:h,instance:a,width:0,height:0,left:0,top:0})},refreshPositions:function(e){this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());var i,s,n,o;for(i=this.items.length-1;i>=0;i--)s=this.items[i],s.instance!==this.currentContainer&&this.currentContainer&&s.item[0]!==this.currentItem[0]||(n=this.options.toleranceElement?t(this.options.toleranceElement,s.item):s.item,e||(s.width=n.outerWidth(),s.height=n.outerHeight()),o=n.offset(),s.left=o.left,s.top=o.top);if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(i=this.containers.length-1;i>=0;i--)o=this.containers[i].element.offset(),this.containers[i].containerCache.left=o.left,this.containers[i].containerCache.top=o.top,this.containers[i].containerCache.width=this.containers[i].element.outerWidth(),this.containers[i].containerCache.height=this.containers[i].element.outerHeight();return this},_createPlaceholder:function(e){e=e||this;var i,s=e.options;s.placeholder&&s.placeholder.constructor!==String||(i=s.placeholder,s.placeholder={element:function(){var s=e.currentItem[0].nodeName.toLowerCase(),n=t("<"+s+">",e.document[0]).addClass(i||e.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper");return"tr"===s?e.currentItem.children().each(function(){t("<td>&#160;</td>",e.document[0]).attr("colspan",t(this).attr("colspan")||1).appendTo(n)}):"img"===s&&n.attr("src",e.currentItem.attr("src")),i||n.css("visibility","hidden"),n},update:function(t,n){(!i||s.forcePlaceholderSize)&&(n.height()||n.height(e.currentItem.innerHeight()-parseInt(e.currentItem.css("paddingTop")||0,10)-parseInt(e.currentItem.css("paddingBottom")||0,10)),n.width()||n.width(e.currentItem.innerWidth()-parseInt(e.currentItem.css("paddingLeft")||0,10)-parseInt(e.currentItem.css("paddingRight")||0,10)))}}),e.placeholder=t(s.placeholder.element.call(e.element,e.currentItem)),e.currentItem.after(e.placeholder),s.placeholder.update(e,e.placeholder)},_contactContainers:function(s){var n,o,a,r,h,l,c,u,d,p,f=null,g=null;for(n=this.containers.length-1;n>=0;n--)if(!t.contains(this.currentItem[0],this.containers[n].element[0]))if(this._intersectsWith(this.containers[n].containerCache)){if(f&&t.contains(this.containers[n].element[0],f.element[0]))continue;f=this.containers[n],g=n}else this.containers[n].containerCache.over&&(this.containers[n]._trigger("out",s,this._uiHash(this)),this.containers[n].containerCache.over=0);if(f)if(1===this.containers.length)this.containers[g].containerCache.over||(this.containers[g]._trigger("over",s,this._uiHash(this)),this.containers[g].containerCache.over=1);else{for(a=1e4,r=null,p=f.floating||i(this.currentItem),h=p?"left":"top",l=p?"width":"height",c=this.positionAbs[h]+this.offset.click[h],o=this.items.length-1;o>=0;o--)t.contains(this.containers[g].element[0],this.items[o].item[0])&&this.items[o].item[0]!==this.currentItem[0]&&(!p||e(this.positionAbs.top+this.offset.click.top,this.items[o].top,this.items[o].height))&&(u=this.items[o].item.offset()[h],d=!1,Math.abs(u-c)>Math.abs(u+this.items[o][l]-c)&&(d=!0,u+=this.items[o][l]),a>Math.abs(u-c)&&(a=Math.abs(u-c),r=this.items[o],this.direction=d?"up":"down"));if(!r&&!this.options.dropOnEmpty)return;if(this.currentContainer===this.containers[g])return;r?this._rearrange(s,r,null,!0):this._rearrange(s,null,this.containers[g].element,!0),this._trigger("change",s,this._uiHash()),this.containers[g]._trigger("change",s,this._uiHash(this)),this.currentContainer=this.containers[g],this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[g]._trigger("over",s,this._uiHash(this)),this.containers[g].containerCache.over=1}},_createHelper:function(e){var i=this.options,s=t.isFunction(i.helper)?t(i.helper.apply(this.element[0],[e,this.currentItem])):"clone"===i.helper?this.currentItem.clone():this.currentItem;return s.parents("body").length||t("parent"!==i.appendTo?i.appendTo:this.currentItem[0].parentNode)[0].appendChild(s[0]),s[0]===this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(!s[0].style.width||i.forceHelperSize)&&s.width(this.currentItem.width()),(!s[0].style.height||i.forceHelperSize)&&s.height(this.currentItem.height()),s},_adjustOffsetFromHelper:function(e){"string"==typeof e&&(e=e.split(" ")),t.isArray(e)&&(e={left:+e[0],top:+e[1]||0}),"left"in e&&(this.offset.click.left=e.left+this.margins.left),"right"in e&&(this.offset.click.left=this.helperProportions.width-e.right+this.margins.left),"top"in e&&(this.offset.click.top=e.top+this.margins.top),"bottom"in e&&(this.offset.click.top=this.helperProportions.height-e.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var e=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])&&(e.left+=this.scrollParent.scrollLeft(),e.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===document.body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&t.ui.ie)&&(e={top:0,left:0}),{top:e.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:e.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var t=this.currentItem.position();return{top:t.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:t.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var e,i,s,n=this.options;"parent"===n.containment&&(n.containment=this.helper[0].parentNode),("document"===n.containment||"window"===n.containment)&&(this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,t("document"===n.containment?document:window).width()-this.helperProportions.width-this.margins.left,(t("document"===n.containment?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),/^(document|window|parent)$/.test(n.containment)||(e=t(n.containment)[0],i=t(n.containment).offset(),s="hidden"!==t(e).css("overflow"),this.containment=[i.left+(parseInt(t(e).css("borderLeftWidth"),10)||0)+(parseInt(t(e).css("paddingLeft"),10)||0)-this.margins.left,i.top+(parseInt(t(e).css("borderTopWidth"),10)||0)+(parseInt(t(e).css("paddingTop"),10)||0)-this.margins.top,i.left+(s?Math.max(e.scrollWidth,e.offsetWidth):e.offsetWidth)-(parseInt(t(e).css("borderLeftWidth"),10)||0)-(parseInt(t(e).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,i.top+(s?Math.max(e.scrollHeight,e.offsetHeight):e.offsetHeight)-(parseInt(t(e).css("borderTopWidth"),10)||0)-(parseInt(t(e).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top])},_convertPositionTo:function(e,i){i||(i=this.position);var s="absolute"===e?1:-1,n="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,o=/(html|body)/i.test(n[0].tagName);return{top:i.top+this.offset.relative.top*s+this.offset.parent.top*s-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():o?0:n.scrollTop())*s,left:i.left+this.offset.relative.left*s+this.offset.parent.left*s-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():o?0:n.scrollLeft())*s}},_generatePosition:function(e){var i,s,n=this.options,o=e.pageX,a=e.pageY,r="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,h=/(html|body)/i.test(r[0].tagName);return"relative"!==this.cssPosition||this.scrollParent[0]!==document&&this.scrollParent[0]!==this.offsetParent[0]||(this.offset.relative=this._getRelativeOffset()),this.originalPosition&&(this.containment&&(e.pageX-this.offset.click.left<this.containment[0]&&(o=this.containment[0]+this.offset.click.left),e.pageY-this.offset.click.top<this.containment[1]&&(a=this.containment[1]+this.offset.click.top),e.pageX-this.offset.click.left>this.containment[2]&&(o=this.containment[2]+this.offset.click.left),e.pageY-this.offset.click.top>this.containment[3]&&(a=this.containment[3]+this.offset.click.top)),n.grid&&(i=this.originalPageY+Math.round((a-this.originalPageY)/n.grid[1])*n.grid[1],a=this.containment?i-this.offset.click.top>=this.containment[1]&&i-this.offset.click.top<=this.containment[3]?i:i-this.offset.click.top>=this.containment[1]?i-n.grid[1]:i+n.grid[1]:i,s=this.originalPageX+Math.round((o-this.originalPageX)/n.grid[0])*n.grid[0],o=this.containment?s-this.offset.click.left>=this.containment[0]&&s-this.offset.click.left<=this.containment[2]?s:s-this.offset.click.left>=this.containment[0]?s-n.grid[0]:s+n.grid[0]:s)),{top:a-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():h?0:r.scrollTop()),left:o-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():h?0:r.scrollLeft())}},_rearrange:function(t,e,i,s){i?i[0].appendChild(this.placeholder[0]):e.item[0].parentNode.insertBefore(this.placeholder[0],"down"===this.direction?e.item[0]:e.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var n=this.counter;this._delay(function(){n===this.counter&&this.refreshPositions(!s)})},_clear:function(t,e){this.reverting=!1;var i,s=[];if(!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null,this.helper[0]===this.currentItem[0]){for(i in this._storedCSS)("auto"===this._storedCSS[i]||"static"===this._storedCSS[i])&&(this._storedCSS[i]="");this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();for(this.fromOutside&&!e&&s.push(function(t){this._trigger("receive",t,this._uiHash(this.fromOutside))}),!this.fromOutside&&this.domPosition.prev===this.currentItem.prev().not(".ui-sortable-helper")[0]&&this.domPosition.parent===this.currentItem.parent()[0]||e||s.push(function(t){this._trigger("update",t,this._uiHash())}),this!==this.currentContainer&&(e||(s.push(function(t){this._trigger("remove",t,this._uiHash())}),s.push(function(t){return function(e){t._trigger("receive",e,this._uiHash(this))}}.call(this,this.currentContainer)),s.push(function(t){return function(e){t._trigger("update",e,this._uiHash(this))}}.call(this,this.currentContainer)))),i=this.containers.length-1;i>=0;i--)e||s.push(function(t){return function(e){t._trigger("deactivate",e,this._uiHash(this))}}.call(this,this.containers[i])),this.containers[i].containerCache.over&&(s.push(function(t){return function(e){t._trigger("out",e,this._uiHash(this))}}.call(this,this.containers[i])),this.containers[i].containerCache.over=0);if(this.storedCursor&&(this.document.find("body").css("cursor",this.storedCursor),this.storedStylesheet.remove()),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex","auto"===this._storedZIndex?"":this._storedZIndex),this.dragging=!1,this.cancelHelperRemoval){if(!e){for(this._trigger("beforeStop",t,this._uiHash()),i=0;s.length>i;i++)s[i].call(this,t);this._trigger("stop",t,this._uiHash())}return this.fromOutside=!1,!1}if(e||this._trigger("beforeStop",t,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.helper[0]!==this.currentItem[0]&&this.helper.remove(),this.helper=null,!e){for(i=0;s.length>i;i++)s[i].call(this,t);this._trigger("stop",t,this._uiHash())}return this.fromOutside=!1,!0},_trigger:function(){t.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(e){var i=e||this;return{helper:i.helper,placeholder:i.placeholder||t([]),position:i.position,originalPosition:i.originalPosition,offset:i.positionAbs,item:i.currentItem,sender:e?e.element:null}}})}(jQuery),function(t,e){var i="ui-effects-";t.effects={effect:{}},function(t,e){function i(t,e,i){var s=u[e.type]||{};return null==t?i||!e.def?null:e.def:(t=s.floor?~~t:parseFloat(t),isNaN(t)?e.def:s.mod?(t+s.mod)%s.mod:0>t?0:t>s.max?s.max:t)}function s(i){var s=l(),n=s._rgba=[];return i=i.toLowerCase(),f(h,function(t,o){var a,r=o.re.exec(i),h=r&&o.parse(r),l=o.space||"rgba";return h?(a=s[l](h),s[c[l].cache]=a[c[l].cache],n=s._rgba=a._rgba,!1):e}),n.length?("0,0,0,0"===n.join()&&t.extend(n,o.transparent),s):o[i]}function n(t,e,i){return i=(i+1)%1,1>6*i?t+6*(e-t)*i:1>2*i?e:2>3*i?t+6*(e-t)*(2/3-i):t}var o,a="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",r=/^([\-+])=\s*(\d+\.?\d*)/,h=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[t[1],t[2],t[3],t[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[2.55*t[1],2.55*t[2],2.55*t[3],t[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(t){return[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(t){return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(t){return[t[1],t[2]/100,t[3]/100,t[4]]}}],l=t.Color=function(e,i,s,n){return new t.Color.fn.parse(e,i,s,n)},c={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},u={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},d=l.support={},p=t("<p>")[0],f=t.each;p.style.cssText="background-color:rgba(1,1,1,.5)",d.rgba=p.style.backgroundColor.indexOf("rgba")>-1,f(c,function(t,e){e.cache="_"+t,e.props.alpha={idx:3,type:"percent",def:1}}),l.fn=t.extend(l.prototype,{parse:function(n,a,r,h){if(n===e)return this._rgba=[null,null,null,null],this;(n.jquery||n.nodeType)&&(n=t(n).css(a),a=e);var u=this,d=t.type(n),p=this._rgba=[];return a!==e&&(n=[n,a,r,h],d="array"),"string"===d?this.parse(s(n)||o._default):"array"===d?(f(c.rgba.props,function(t,e){p[e.idx]=i(n[e.idx],e)}),this):"object"===d?(n instanceof l?f(c,function(t,e){n[e.cache]&&(u[e.cache]=n[e.cache].slice())}):f(c,function(e,s){var o=s.cache;f(s.props,function(t,e){if(!u[o]&&s.to){if("alpha"===t||null==n[t])return;u[o]=s.to(u._rgba)}u[o][e.idx]=i(n[t],e,!0)}),u[o]&&0>t.inArray(null,u[o].slice(0,3))&&(u[o][3]=1,s.from&&(u._rgba=s.from(u[o])))}),this):e},is:function(t){var i=l(t),s=!0,n=this;return f(c,function(t,o){var a,r=i[o.cache];return r&&(a=n[o.cache]||o.to&&o.to(n._rgba)||[],f(o.props,function(t,i){return null!=r[i.idx]?s=r[i.idx]===a[i.idx]:e})),s}),s},_space:function(){var t=[],e=this;return f(c,function(i,s){e[s.cache]&&t.push(i)}),t.pop()},transition:function(t,e){var s=l(t),n=s._space(),o=c[n],a=0===this.alpha()?l("transparent"):this,r=a[o.cache]||o.to(a._rgba),h=r.slice();return s=s[o.cache],f(o.props,function(t,n){var o=n.idx,a=r[o],l=s[o],c=u[n.type]||{};null!==l&&(null===a?h[o]=l:(c.mod&&(l-a>c.mod/2?a+=c.mod:a-l>c.mod/2&&(a-=c.mod)),h[o]=i((l-a)*e+a,n)))}),this[n](h)},blend:function(e){if(1===this._rgba[3])return this;var i=this._rgba.slice(),s=i.pop(),n=l(e)._rgba;return l(t.map(i,function(t,e){return(1-s)*n[e]+s*t}))},toRgbaString:function(){var e="rgba(",i=t.map(this._rgba,function(t,e){return null==t?e>2?1:0:t});return 1===i[3]&&(i.pop(),e="rgb("),e+i.join()+")"},toHslaString:function(){var e="hsla(",i=t.map(this.hsla(),function(t,e){return null==t&&(t=e>2?1:0),e&&3>e&&(t=Math.round(100*t)+"%"),t});return 1===i[3]&&(i.pop(),e="hsl("),e+i.join()+")"},toHexString:function(e){var i=this._rgba.slice(),s=i.pop();return e&&i.push(~~(255*s)),"#"+t.map(i,function(t){return t=(t||0).toString(16),1===t.length?"0"+t:t}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),l.fn.parse.prototype=l.fn,c.hsla.to=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e,i,s=t[0]/255,n=t[1]/255,o=t[2]/255,a=t[3],r=Math.max(s,n,o),h=Math.min(s,n,o),l=r-h,c=r+h,u=.5*c;return e=h===r?0:s===r?60*(n-o)/l+360:n===r?60*(o-s)/l+120:60*(s-n)/l+240,i=0===l?0:.5>=u?l/c:l/(2-c),[Math.round(e)%360,i,u,null==a?1:a]},c.hsla.from=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e=t[0]/360,i=t[1],s=t[2],o=t[3],a=.5>=s?s*(1+i):s+i-s*i,r=2*s-a;return[Math.round(255*n(r,a,e+1/3)),Math.round(255*n(r,a,e)),Math.round(255*n(r,a,e-1/3)),o]},f(c,function(s,n){var o=n.props,a=n.cache,h=n.to,c=n.from;l.fn[s]=function(s){if(h&&!this[a]&&(this[a]=h(this._rgba)),s===e)return this[a].slice();var n,r=t.type(s),u="array"===r||"object"===r?s:arguments,d=this[a].slice();return f(o,function(t,e){var s=u["object"===r?t:e.idx];null==s&&(s=d[e.idx]),d[e.idx]=i(s,e)}),c?(n=l(c(d)),n[a]=d,n):l(d)},f(o,function(e,i){l.fn[e]||(l.fn[e]=function(n){var o,a=t.type(n),h="alpha"===e?this._hsla?"hsla":"rgba":s,l=this[h](),c=l[i.idx];return"undefined"===a?c:("function"===a&&(n=n.call(this,c),a=t.type(n)),null==n&&i.empty?this:("string"===a&&(o=r.exec(n),o&&(n=c+parseFloat(o[2])*("+"===o[1]?1:-1))),l[i.idx]=n,this[h](l)))})})}),l.hook=function(e){var i=e.split(" ");f(i,function(e,i){t.cssHooks[i]={set:function(e,n){var o,a,r="";if("transparent"!==n&&("string"!==t.type(n)||(o=s(n)))){if(n=l(o||n),!d.rgba&&1!==n._rgba[3]){for(a="backgroundColor"===i?e.parentNode:e;(""===r||"transparent"===r)&&a&&a.style;)try{r=t.css(a,"backgroundColor"),a=a.parentNode}catch(h){}n=n.blend(r&&"transparent"!==r?r:"_default")}n=n.toRgbaString()}try{e.style[i]=n}catch(h){}}},t.fx.step[i]=function(e){e.colorInit||(e.start=l(e.elem,i),e.end=l(e.end),e.colorInit=!0),t.cssHooks[i].set(e.elem,e.start.transition(e.end,e.pos))}})},l.hook(a),t.cssHooks.borderColor={expand:function(t){var e={};return f(["Top","Right","Bottom","Left"],function(i,s){e["border"+s+"Color"]=t}),e}},o=t.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(jQuery),function(){function i(e){var i,s,n=e.ownerDocument.defaultView?e.ownerDocument.defaultView.getComputedStyle(e,null):e.currentStyle,o={};if(n&&n.length&&n[0]&&n[n[0]])for(s=n.length;s--;)i=n[s],"string"==typeof n[i]&&(o[t.camelCase(i)]=n[i]);else for(i in n)"string"==typeof n[i]&&(o[i]=n[i]);return o}function s(e,i){var s,n,a={};for(s in i)n=i[s],e[s]!==n&&(o[s]||(t.fx.step[s]||!isNaN(parseFloat(n)))&&(a[s]=n));return a}var n=["add","remove","toggle"],o={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};t.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(e,i){t.fx.step[i]=function(t){("none"!==t.end&&!t.setAttr||1===t.pos&&!t.setAttr)&&(jQuery.style(t.elem,i,t.end),t.setAttr=!0)}}),t.fn.addBack||(t.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),t.effects.animateClass=function(e,o,a,r){var h=t.speed(o,a,r);return this.queue(function(){var o,a=t(this),r=a.attr("class")||"",l=h.children?a.find("*").addBack():a;l=l.map(function(){var e=t(this);return{el:e,start:i(this)}}),o=function(){t.each(n,function(t,i){e[i]&&a[i+"Class"](e[i])})},o(),l=l.map(function(){return this.end=i(this.el[0]),this.diff=s(this.start,this.end),this}),a.attr("class",r),l=l.map(function(){var e=this,i=t.Deferred(),s=t.extend({},h,{queue:!1,complete:function(){i.resolve(e)}});return this.el.animate(this.diff,s),i.promise()}),t.when.apply(t,l.get()).done(function(){o(),t.each(arguments,function(){var e=this.el;t.each(this.diff,function(t){e.css(t,"")})}),h.complete.call(a[0])})})},t.fn.extend({addClass:function(e){return function(i,s,n,o){return s?t.effects.animateClass.call(this,{add:i},s,n,o):e.apply(this,arguments)}}(t.fn.addClass),removeClass:function(e){return function(i,s,n,o){return arguments.length>1?t.effects.animateClass.call(this,{remove:i},s,n,o):e.apply(this,arguments)}}(t.fn.removeClass),toggleClass:function(i){return function(s,n,o,a,r){return"boolean"==typeof n||n===e?o?t.effects.animateClass.call(this,n?{add:s}:{remove:s},o,a,r):i.apply(this,arguments):t.effects.animateClass.call(this,{toggle:s},n,o,a)}}(t.fn.toggleClass),switchClass:function(e,i,s,n,o){return t.effects.animateClass.call(this,{add:i,remove:e},s,n,o)}})}(),function(){function s(e,i,s,n){return t.isPlainObject(e)&&(i=e,e=e.effect),e={effect:e},null==i&&(i={}),t.isFunction(i)&&(n=i,s=null,i={}),("number"==typeof i||t.fx.speeds[i])&&(n=s,s=i,i={}),t.isFunction(s)&&(n=s,s=null),i&&t.extend(e,i),s=s||i.duration,e.duration=t.fx.off?0:"number"==typeof s?s:s in t.fx.speeds?t.fx.speeds[s]:t.fx.speeds._default,e.complete=n||i.complete,e}function n(e){return!e||"number"==typeof e||t.fx.speeds[e]?!0:"string"!=typeof e||t.effects.effect[e]?t.isFunction(e)?!0:"object"!=typeof e||e.effect?!1:!0:!0}t.extend(t.effects,{version:"1.10.3",save:function(t,e){for(var s=0;e.length>s;s++)null!==e[s]&&t.data(i+e[s],t[0].style[e[s]])},restore:function(t,s){var n,o;for(o=0;s.length>o;o++)null!==s[o]&&(n=t.data(i+s[o]),n===e&&(n=""),t.css(s[o],n))},setMode:function(t,e){return"toggle"===e&&(e=t.is(":hidden")?"show":"hide"),e},getBaseline:function(t,e){var i,s;switch(t[0]){case"top":i=0;break;case"middle":i=.5;break;case"bottom":i=1;break;default:i=t[0]/e.height}switch(t[1]){case"left":s=0;break;case"center":s=.5;break;case"right":s=1;break;default:s=t[1]/e.width}return{x:s,y:i}},createWrapper:function(e){if(e.parent().is(".ui-effects-wrapper"))return e.parent();var i={width:e.outerWidth(!0),height:e.outerHeight(!0),"float":e.css("float")},s=t("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),n={width:e.width(),height:e.height()},o=document.activeElement;try{o.id}catch(a){o=document.body}return e.wrap(s),(e[0]===o||t.contains(e[0],o))&&t(o).focus(),s=e.parent(),"static"===e.css("position")?(s.css({position:"relative"}),e.css({position:"relative"})):(t.extend(i,{position:e.css("position"),zIndex:e.css("z-index")}),t.each(["top","left","bottom","right"],function(t,s){i[s]=e.css(s),isNaN(parseInt(i[s],10))&&(i[s]="auto")}),e.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),e.css(n),s.css(i).show()},removeWrapper:function(e){var i=document.activeElement;return e.parent().is(".ui-effects-wrapper")&&(e.parent().replaceWith(e),(e[0]===i||t.contains(e[0],i))&&t(i).focus()),e},setTransition:function(e,i,s,n){return n=n||{},t.each(i,function(t,i){var o=e.cssUnit(i);o[0]>0&&(n[i]=o[0]*s+o[1])}),n}}),t.fn.extend({effect:function(){function e(e){function s(){t.isFunction(o)&&o.call(n[0]),t.isFunction(e)&&e()}var n=t(this),o=i.complete,r=i.mode;(n.is(":hidden")?"hide"===r:"show"===r)?(n[r](),s()):a.call(n[0],i,s)}var i=s.apply(this,arguments),n=i.mode,o=i.queue,a=t.effects.effect[i.effect];return t.fx.off||!a?n?this[n](i.duration,i.complete):this.each(function(){i.complete&&i.complete.call(this)}):o===!1?this.each(e):this.queue(o||"fx",e)},show:function(t){return function(e){if(n(e))return t.apply(this,arguments);var i=s.apply(this,arguments);return i.mode="show",this.effect.call(this,i)}}(t.fn.show),hide:function(t){return function(e){if(n(e))return t.apply(this,arguments);var i=s.apply(this,arguments);return i.mode="hide",this.effect.call(this,i)}}(t.fn.hide),toggle:function(t){return function(e){if(n(e)||"boolean"==typeof e)return t.apply(this,arguments);var i=s.apply(this,arguments);return i.mode="toggle",this.effect.call(this,i)}}(t.fn.toggle),cssUnit:function(e){var i=this.css(e),s=[];return t.each(["em","px","%","pt"],function(t,e){i.indexOf(e)>0&&(s=[parseFloat(i),e])}),s}})}(),function(){var e={};t.each(["Quad","Cubic","Quart","Quint","Expo"],function(t,i){e[i]=function(e){return Math.pow(e,t+2)}}),t.extend(e,{Sine:function(t){return 1-Math.cos(t*Math.PI/2)},Circ:function(t){return 1-Math.sqrt(1-t*t)},Elastic:function(t){return 0===t||1===t?t:-Math.pow(2,8*(t-1))*Math.sin((80*(t-1)-7.5)*Math.PI/15)},Back:function(t){return t*t*(3*t-2)},Bounce:function(t){for(var e,i=4;((e=Math.pow(2,--i))-1)/11>t;);return 1/Math.pow(4,3-i)-7.5625*Math.pow((3*e-2)/22-t,2)}}),t.each(e,function(e,i){t.easing["easeIn"+e]=i,t.easing["easeOut"+e]=function(t){return 1-i(1-t)},t.easing["easeInOut"+e]=function(t){return.5>t?i(2*t)/2:1-i(-2*t+2)/2}})}()}(jQuery),function(t){var e=0,i={},s={};i.height=i.paddingTop=i.paddingBottom=i.borderTopWidth=i.borderBottomWidth="hide",s.height=s.paddingTop=s.paddingBottom=s.borderTopWidth=s.borderBottomWidth="show",t.widget("ui.accordion",{version:"1.10.3",options:{active:0,animate:{},collapsible:!1,event:"click",header:"> li > :first-child,> :not(li):even",heightStyle:"auto",icons:{activeHeader:"ui-icon-triangle-1-s",header:"ui-icon-triangle-1-e"},activate:null,beforeActivate:null},_create:function(){var e=this.options;this.prevShow=this.prevHide=t(),this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role","tablist"),e.collapsible||e.active!==!1&&null!=e.active||(e.active=0),this._processPanels(),0>e.active&&(e.active+=this.headers.length),this._refresh()},_getCreateEventData:function(){return{header:this.active,panel:this.active.length?this.active.next():t(),content:this.active.length?this.active.next():t()}},_createIcons:function(){var e=this.options.icons;e&&(t("<span>").addClass("ui-accordion-header-icon ui-icon "+e.header).prependTo(this.headers),this.active.children(".ui-accordion-header-icon").removeClass(e.header).addClass(e.activeHeader),this.headers.addClass("ui-accordion-icons"))
},_destroyIcons:function(){this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()},_destroy:function(){var t;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"),this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").each(function(){/^ui-accordion/.test(this.id)&&this.removeAttribute("id")}),this._destroyIcons(),t=this.headers.next().css("display","").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").each(function(){/^ui-accordion/.test(this.id)&&this.removeAttribute("id")}),"content"!==this.options.heightStyle&&t.css("height","")},_setOption:function(t,e){return"active"===t?(this._activate(e),undefined):("event"===t&&(this.options.event&&this._off(this.headers,this.options.event),this._setupEvents(e)),this._super(t,e),"collapsible"!==t||e||this.options.active!==!1||this._activate(0),"icons"===t&&(this._destroyIcons(),e&&this._createIcons()),"disabled"===t&&this.headers.add(this.headers.next()).toggleClass("ui-state-disabled",!!e),undefined)},_keydown:function(e){if(!e.altKey&&!e.ctrlKey){var i=t.ui.keyCode,s=this.headers.length,n=this.headers.index(e.target),o=!1;switch(e.keyCode){case i.RIGHT:case i.DOWN:o=this.headers[(n+1)%s];break;case i.LEFT:case i.UP:o=this.headers[(n-1+s)%s];break;case i.SPACE:case i.ENTER:this._eventHandler(e);break;case i.HOME:o=this.headers[0];break;case i.END:o=this.headers[s-1]}o&&(t(e.target).attr("tabIndex",-1),t(o).attr("tabIndex",0),o.focus(),e.preventDefault())}},_panelKeyDown:function(e){e.keyCode===t.ui.keyCode.UP&&e.ctrlKey&&t(e.currentTarget).prev().focus()},refresh:function(){var e=this.options;this._processPanels(),e.active===!1&&e.collapsible===!0||!this.headers.length?(e.active=!1,this.active=t()):e.active===!1?this._activate(0):this.active.length&&!t.contains(this.element[0],this.active[0])?this.headers.length===this.headers.find(".ui-state-disabled").length?(e.active=!1,this.active=t()):this._activate(Math.max(0,e.active-1)):e.active=this.headers.index(this.active),this._destroyIcons(),this._refresh()},_processPanels:function(){this.headers=this.element.find(this.options.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all"),this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide()},_refresh:function(){var i,s=this.options,n=s.heightStyle,o=this.element.parent(),a=this.accordionId="ui-accordion-"+(this.element.attr("id")||++e);this.active=this._findActive(s.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"),this.active.next().addClass("ui-accordion-content-active").show(),this.headers.attr("role","tab").each(function(e){var i=t(this),s=i.attr("id"),n=i.next(),o=n.attr("id");s||(s=a+"-header-"+e,i.attr("id",s)),o||(o=a+"-panel-"+e,n.attr("id",o)),i.attr("aria-controls",o),n.attr("aria-labelledby",s)}).next().attr("role","tabpanel"),this.headers.not(this.active).attr({"aria-selected":"false",tabIndex:-1}).next().attr({"aria-expanded":"false","aria-hidden":"true"}).hide(),this.active.length?this.active.attr({"aria-selected":"true",tabIndex:0}).next().attr({"aria-expanded":"true","aria-hidden":"false"}):this.headers.eq(0).attr("tabIndex",0),this._createIcons(),this._setupEvents(s.event),"fill"===n?(i=o.height(),this.element.siblings(":visible").each(function(){var e=t(this),s=e.css("position");"absolute"!==s&&"fixed"!==s&&(i-=e.outerHeight(!0))}),this.headers.each(function(){i-=t(this).outerHeight(!0)}),this.headers.next().each(function(){t(this).height(Math.max(0,i-t(this).innerHeight()+t(this).height()))}).css("overflow","auto")):"auto"===n&&(i=0,this.headers.next().each(function(){i=Math.max(i,t(this).css("height","").height())}).height(i))},_activate:function(e){var i=this._findActive(e)[0];i!==this.active[0]&&(i=i||this.active[0],this._eventHandler({target:i,currentTarget:i,preventDefault:t.noop}))},_findActive:function(e){return"number"==typeof e?this.headers.eq(e):t()},_setupEvents:function(e){var i={keydown:"_keydown"};e&&t.each(e.split(" "),function(t,e){i[e]="_eventHandler"}),this._off(this.headers.add(this.headers.next())),this._on(this.headers,i),this._on(this.headers.next(),{keydown:"_panelKeyDown"}),this._hoverable(this.headers),this._focusable(this.headers)},_eventHandler:function(e){var i=this.options,s=this.active,n=t(e.currentTarget),o=n[0]===s[0],a=o&&i.collapsible,r=a?t():n.next(),h=s.next(),l={oldHeader:s,oldPanel:h,newHeader:a?t():n,newPanel:r};e.preventDefault(),o&&!i.collapsible||this._trigger("beforeActivate",e,l)===!1||(i.active=a?!1:this.headers.index(n),this.active=o?t():n,this._toggle(l),s.removeClass("ui-accordion-header-active ui-state-active"),i.icons&&s.children(".ui-accordion-header-icon").removeClass(i.icons.activeHeader).addClass(i.icons.header),o||(n.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"),i.icons&&n.children(".ui-accordion-header-icon").removeClass(i.icons.header).addClass(i.icons.activeHeader),n.next().addClass("ui-accordion-content-active")))},_toggle:function(e){var i=e.newPanel,s=this.prevShow.length?this.prevShow:e.oldPanel;this.prevShow.add(this.prevHide).stop(!0,!0),this.prevShow=i,this.prevHide=s,this.options.animate?this._animate(i,s,e):(s.hide(),i.show(),this._toggleComplete(e)),s.attr({"aria-expanded":"false","aria-hidden":"true"}),s.prev().attr("aria-selected","false"),i.length&&s.length?s.prev().attr("tabIndex",-1):i.length&&this.headers.filter(function(){return 0===t(this).attr("tabIndex")}).attr("tabIndex",-1),i.attr({"aria-expanded":"true","aria-hidden":"false"}).prev().attr({"aria-selected":"true",tabIndex:0})},_animate:function(t,e,n){var o,a,r,h=this,l=0,c=t.length&&(!e.length||t.index()<e.index()),u=this.options.animate||{},d=c&&u.down||u,p=function(){h._toggleComplete(n)};return"number"==typeof d&&(r=d),"string"==typeof d&&(a=d),a=a||d.easing||u.easing,r=r||d.duration||u.duration,e.length?t.length?(o=t.show().outerHeight(),e.animate(i,{duration:r,easing:a,step:function(t,e){e.now=Math.round(t)}}),t.hide().animate(s,{duration:r,easing:a,complete:p,step:function(t,i){i.now=Math.round(t),"height"!==i.prop?l+=i.now:"content"!==h.options.heightStyle&&(i.now=Math.round(o-e.outerHeight()-l),l=0)}}),undefined):e.animate(i,r,a,p):t.animate(s,r,a,p)},_toggleComplete:function(t){var e=t.oldPanel;e.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"),e.length&&(e.parent()[0].className=e.parent()[0].className),this._trigger("activate",null,t)}})}(jQuery),function(t){var e=0;t.widget("ui.autocomplete",{version:"1.10.3",defaultElement:"<input>",options:{appendTo:null,autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},pending:0,_create:function(){var e,i,s,n=this.element[0].nodeName.toLowerCase(),o="textarea"===n,a="input"===n;this.isMultiLine=o?!0:a?!1:this.element.prop("isContentEditable"),this.valueMethod=this.element[o||a?"val":"text"],this.isNewMenu=!0,this.element.addClass("ui-autocomplete-input").attr("autocomplete","off"),this._on(this.element,{keydown:function(n){if(this.element.prop("readOnly"))return e=!0,s=!0,i=!0,undefined;e=!1,s=!1,i=!1;var o=t.ui.keyCode;switch(n.keyCode){case o.PAGE_UP:e=!0,this._move("previousPage",n);break;case o.PAGE_DOWN:e=!0,this._move("nextPage",n);break;case o.UP:e=!0,this._keyEvent("previous",n);break;case o.DOWN:e=!0,this._keyEvent("next",n);break;case o.ENTER:case o.NUMPAD_ENTER:this.menu.active&&(e=!0,n.preventDefault(),this.menu.select(n));break;case o.TAB:this.menu.active&&this.menu.select(n);break;case o.ESCAPE:this.menu.element.is(":visible")&&(this._value(this.term),this.close(n),n.preventDefault());break;default:i=!0,this._searchTimeout(n)}},keypress:function(s){if(e)return e=!1,(!this.isMultiLine||this.menu.element.is(":visible"))&&s.preventDefault(),undefined;if(!i){var n=t.ui.keyCode;switch(s.keyCode){case n.PAGE_UP:this._move("previousPage",s);break;case n.PAGE_DOWN:this._move("nextPage",s);break;case n.UP:this._keyEvent("previous",s);break;case n.DOWN:this._keyEvent("next",s)}}},input:function(t){return s?(s=!1,t.preventDefault(),undefined):(this._searchTimeout(t),undefined)},focus:function(){this.selectedItem=null,this.previous=this._value()},blur:function(t){return this.cancelBlur?(delete this.cancelBlur,undefined):(clearTimeout(this.searching),this.close(t),this._change(t),undefined)}}),this._initSource(),this.menu=t("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({role:null}).hide().data("ui-menu"),this._on(this.menu.element,{mousedown:function(e){e.preventDefault(),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur});var i=this.menu.element[0];t(e.target).closest(".ui-menu-item").length||this._delay(function(){var e=this;this.document.one("mousedown",function(s){s.target===e.element[0]||s.target===i||t.contains(i,s.target)||e.close()})})},menufocus:function(e,i){if(this.isNewMenu&&(this.isNewMenu=!1,e.originalEvent&&/^mouse/.test(e.originalEvent.type)))return this.menu.blur(),this.document.one("mousemove",function(){t(e.target).trigger(e.originalEvent)}),undefined;var s=i.item.data("ui-autocomplete-item");!1!==this._trigger("focus",e,{item:s})?e.originalEvent&&/^key/.test(e.originalEvent.type)&&this._value(s.value):this.liveRegion.text(s.value)},menuselect:function(t,e){var i=e.item.data("ui-autocomplete-item"),s=this.previous;this.element[0]!==this.document[0].activeElement&&(this.element.focus(),this.previous=s,this._delay(function(){this.previous=s,this.selectedItem=i})),!1!==this._trigger("select",t,{item:i})&&this._value(i.value),this.term=this._value(),this.close(t),this.selectedItem=i}}),this.liveRegion=t("<span>",{role:"status","aria-live":"polite"}).addClass("ui-helper-hidden-accessible").insertBefore(this.element),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching),this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove()},_setOption:function(t,e){this._super(t,e),"source"===t&&this._initSource(),"appendTo"===t&&this.menu.element.appendTo(this._appendTo()),"disabled"===t&&e&&this.xhr&&this.xhr.abort()},_appendTo:function(){var e=this.options.appendTo;return e&&(e=e.jquery||e.nodeType?t(e):this.document.find(e).eq(0)),e||(e=this.element.closest(".ui-front")),e.length||(e=this.document[0].body),e},_initSource:function(){var e,i,s=this;t.isArray(this.options.source)?(e=this.options.source,this.source=function(i,s){s(t.ui.autocomplete.filter(e,i.term))}):"string"==typeof this.options.source?(i=this.options.source,this.source=function(e,n){s.xhr&&s.xhr.abort(),s.xhr=t.ajax({url:i,data:e,dataType:"json",success:function(t){n(t)},error:function(){n([])}})}):this.source=this.options.source},_searchTimeout:function(t){clearTimeout(this.searching),this.searching=this._delay(function(){this.term!==this._value()&&(this.selectedItem=null,this.search(null,t))},this.options.delay)},search:function(t,e){return t=null!=t?t:this._value(),this.term=this._value(),t.length<this.options.minLength?this.close(e):this._trigger("search",e)!==!1?this._search(t):undefined},_search:function(t){this.pending++,this.element.addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:t},this._response())},_response:function(){var t=this,i=++e;return function(s){i===e&&t.__response(s),t.pending--,t.pending||t.element.removeClass("ui-autocomplete-loading")}},__response:function(t){t&&(t=this._normalize(t)),this._trigger("response",null,{content:t}),!this.options.disabled&&t&&t.length&&!this.cancelSearch?(this._suggest(t),this._trigger("open")):this._close()},close:function(t){this.cancelSearch=!0,this._close(t)},_close:function(t){this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",t))},_change:function(t){this.previous!==this._value()&&this._trigger("change",t,{item:this.selectedItem})},_normalize:function(e){return e.length&&e[0].label&&e[0].value?e:t.map(e,function(e){return"string"==typeof e?{label:e,value:e}:t.extend({label:e.label||e.value,value:e.value||e.label},e)})},_suggest:function(e){var i=this.menu.element.empty();this._renderMenu(i,e),this.isNewMenu=!0,this.menu.refresh(),i.show(),this._resizeMenu(),i.position(t.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next()},_resizeMenu:function(){var t=this.menu.element;t.outerWidth(Math.max(t.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(e,i){var s=this;t.each(i,function(t,i){s._renderItemData(e,i)})},_renderItemData:function(t,e){return this._renderItem(t,e).data("ui-autocomplete-item",e)},_renderItem:function(e,i){return t("<li>").append(t("<a>").text(i.label)).appendTo(e)},_move:function(t,e){return this.menu.element.is(":visible")?this.menu.isFirstItem()&&/^previous/.test(t)||this.menu.isLastItem()&&/^next/.test(t)?(this._value(this.term),this.menu.blur(),undefined):(this.menu[t](e),undefined):(this.search(null,e),undefined)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(t,e){(!this.isMultiLine||this.menu.element.is(":visible"))&&(this._move(t,e),e.preventDefault())}}),t.extend(t.ui.autocomplete,{escapeRegex:function(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(e,i){var s=RegExp(t.ui.autocomplete.escapeRegex(i),"i");return t.grep(e,function(t){return s.test(t.label||t.value||t)})}}),t.widget("ui.autocomplete",t.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(t){return t+(t>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(t){var e;this._superApply(arguments),this.options.disabled||this.cancelSearch||(e=t&&t.length?this.options.messages.results(t.length):this.options.messages.noResults,this.liveRegion.text(e))}})}(jQuery),function(t){var e,i,s,n,o="ui-button ui-widget ui-state-default ui-corner-all",a="ui-state-hover ui-state-active ",r="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",h=function(){var e=t(this);setTimeout(function(){e.find(":ui-button").button("refresh")},1)},l=function(e){var i=e.name,s=e.form,n=t([]);return i&&(i=i.replace(/'/g,"\\'"),n=s?t(s).find("[name='"+i+"']"):t("[name='"+i+"']",e.ownerDocument).filter(function(){return!this.form})),n};t.widget("ui.button",{version:"1.10.3",defaultElement:"<button>",options:{disabled:null,text:!0,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset"+this.eventNamespace).bind("reset"+this.eventNamespace,h),"boolean"!=typeof this.options.disabled?this.options.disabled=!!this.element.prop("disabled"):this.element.prop("disabled",this.options.disabled),this._determineButtonType(),this.hasTitle=!!this.buttonElement.attr("title");var a=this,r=this.options,c="checkbox"===this.type||"radio"===this.type,u=c?"":"ui-state-active",d="ui-state-focus";null===r.label&&(r.label="input"===this.type?this.buttonElement.val():this.buttonElement.html()),this._hoverable(this.buttonElement),this.buttonElement.addClass(o).attr("role","button").bind("mouseenter"+this.eventNamespace,function(){r.disabled||this===e&&t(this).addClass("ui-state-active")}).bind("mouseleave"+this.eventNamespace,function(){r.disabled||t(this).removeClass(u)}).bind("click"+this.eventNamespace,function(t){r.disabled&&(t.preventDefault(),t.stopImmediatePropagation())}),this.element.bind("focus"+this.eventNamespace,function(){a.buttonElement.addClass(d)}).bind("blur"+this.eventNamespace,function(){a.buttonElement.removeClass(d)}),c&&(this.element.bind("change"+this.eventNamespace,function(){n||a.refresh()}),this.buttonElement.bind("mousedown"+this.eventNamespace,function(t){r.disabled||(n=!1,i=t.pageX,s=t.pageY)}).bind("mouseup"+this.eventNamespace,function(t){r.disabled||(i!==t.pageX||s!==t.pageY)&&(n=!0)})),"checkbox"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){return r.disabled||n?!1:undefined}):"radio"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){if(r.disabled||n)return!1;t(this).addClass("ui-state-active"),a.buttonElement.attr("aria-pressed","true");var e=a.element[0];l(e).not(e).map(function(){return t(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed","false")}):(this.buttonElement.bind("mousedown"+this.eventNamespace,function(){return r.disabled?!1:(t(this).addClass("ui-state-active"),e=this,a.document.one("mouseup",function(){e=null}),undefined)}).bind("mouseup"+this.eventNamespace,function(){return r.disabled?!1:(t(this).removeClass("ui-state-active"),undefined)}).bind("keydown"+this.eventNamespace,function(e){return r.disabled?!1:((e.keyCode===t.ui.keyCode.SPACE||e.keyCode===t.ui.keyCode.ENTER)&&t(this).addClass("ui-state-active"),undefined)}).bind("keyup"+this.eventNamespace+" blur"+this.eventNamespace,function(){t(this).removeClass("ui-state-active")}),this.buttonElement.is("a")&&this.buttonElement.keyup(function(e){e.keyCode===t.ui.keyCode.SPACE&&t(this).click()})),this._setOption("disabled",r.disabled),this._resetButton()},_determineButtonType:function(){var t,e,i;this.type=this.element.is("[type=checkbox]")?"checkbox":this.element.is("[type=radio]")?"radio":this.element.is("input")?"input":"button","checkbox"===this.type||"radio"===this.type?(t=this.element.parents().last(),e="label[for='"+this.element.attr("id")+"']",this.buttonElement=t.find(e),this.buttonElement.length||(t=t.length?t.siblings():this.element.siblings(),this.buttonElement=t.filter(e),this.buttonElement.length||(this.buttonElement=t.find(e))),this.element.addClass("ui-helper-hidden-accessible"),i=this.element.is(":checked"),i&&this.buttonElement.addClass("ui-state-active"),this.buttonElement.prop("aria-pressed",i)):this.buttonElement=this.element},widget:function(){return this.buttonElement},_destroy:function(){this.element.removeClass("ui-helper-hidden-accessible"),this.buttonElement.removeClass(o+" "+a+" "+r).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),this.hasTitle||this.buttonElement.removeAttr("title")},_setOption:function(t,e){return this._super(t,e),"disabled"===t?(e?this.element.prop("disabled",!0):this.element.prop("disabled",!1),undefined):(this._resetButton(),undefined)},refresh:function(){var e=this.element.is("input, button")?this.element.is(":disabled"):this.element.hasClass("ui-button-disabled");e!==this.options.disabled&&this._setOption("disabled",e),"radio"===this.type?l(this.element[0]).each(function(){t(this).is(":checked")?t(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true"):t(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")}):"checkbox"===this.type&&(this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true"):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false"))},_resetButton:function(){if("input"===this.type)return this.options.label&&this.element.val(this.options.label),undefined;var e=this.buttonElement.removeClass(r),i=t("<span></span>",this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(e.empty()).text(),s=this.options.icons,n=s.primary&&s.secondary,o=[];s.primary||s.secondary?(this.options.text&&o.push("ui-button-text-icon"+(n?"s":s.primary?"-primary":"-secondary")),s.primary&&e.prepend("<span class='ui-button-icon-primary ui-icon "+s.primary+"'></span>"),s.secondary&&e.append("<span class='ui-button-icon-secondary ui-icon "+s.secondary+"'></span>"),this.options.text||(o.push(n?"ui-button-icons-only":"ui-button-icon-only"),this.hasTitle||e.attr("title",t.trim(i)))):o.push("ui-button-text-only"),e.addClass(o.join(" "))}}),t.widget("ui.buttonset",{version:"1.10.3",options:{items:"button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(t,e){"disabled"===t&&this.buttons.button("option",t,e),this._super(t,e)},refresh:function(){var e="rtl"===this.element.css("direction");this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return t(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(e?"ui-corner-right":"ui-corner-left").end().filter(":last").addClass(e?"ui-corner-left":"ui-corner-right").end().end()},_destroy:function(){this.element.removeClass("ui-buttonset"),this.buttons.map(function(){return t(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy")}})}(jQuery),function(t,e){function i(){this._curInst=null,this._keyEvent=!1,this._disabledInputs=[],this._datepickerShowing=!1,this._inDialog=!1,this._mainDivId="ui-datepicker-div",this._inlineClass="ui-datepicker-inline",this._appendClass="ui-datepicker-append",this._triggerClass="ui-datepicker-trigger",this._dialogClass="ui-datepicker-dialog",this._disableClass="ui-datepicker-disabled",this._unselectableClass="ui-datepicker-unselectable",this._currentClass="ui-datepicker-current-day",this._dayOverClass="ui-datepicker-days-cell-over",this.regional=[],this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:!1,hideIfNoPrevNext:!1,navigationAsDateFormat:!1,gotoCurrent:!1,changeMonth:!1,changeYear:!1,yearRange:"c-10:c+10",showOtherMonths:!1,selectOtherMonths:!1,showWeek:!1,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:!0,showButtonPanel:!1,autoSize:!1,disabled:!1},t.extend(this._defaults,this.regional[""]),this.dpDiv=s(t("<div id='"+this._mainDivId+"' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))}function s(e){var i="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return e.delegate(i,"mouseout",function(){t(this).removeClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&t(this).removeClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&t(this).removeClass("ui-datepicker-next-hover")}).delegate(i,"mouseover",function(){t.datepicker._isDisabledDatepicker(o.inline?e.parent()[0]:o.input[0])||(t(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),t(this).addClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&t(this).addClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&t(this).addClass("ui-datepicker-next-hover"))})}function n(e,i){t.extend(e,i);for(var s in i)null==i[s]&&(e[s]=i[s]);return e}t.extend(t.ui,{datepicker:{version:"1.10.3"}});var o,a="datepicker";t.extend(i.prototype,{markerClassName:"hasDatepicker",maxRows:4,_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(t){return n(this._defaults,t||{}),this},_attachDatepicker:function(e,i){var s,n,o;s=e.nodeName.toLowerCase(),n="div"===s||"span"===s,e.id||(this.uuid+=1,e.id="dp"+this.uuid),o=this._newInst(t(e),n),o.settings=t.extend({},i||{}),"input"===s?this._connectDatepicker(e,o):n&&this._inlineDatepicker(e,o)},_newInst:function(e,i){var n=e[0].id.replace(/([^A-Za-z0-9_\-])/g,"\\\\$1");return{id:n,input:e,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:i,dpDiv:i?s(t("<div class='"+this._inlineClass+" ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")):this.dpDiv}},_connectDatepicker:function(e,i){var s=t(e);i.append=t([]),i.trigger=t([]),s.hasClass(this.markerClassName)||(this._attachments(s,i),s.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp),this._autoSize(i),t.data(e,a,i),i.settings.disabled&&this._disableDatepicker(e))},_attachments:function(e,i){var s,n,o,a=this._get(i,"appendText"),r=this._get(i,"isRTL");i.append&&i.append.remove(),a&&(i.append=t("<span class='"+this._appendClass+"'>"+a+"</span>"),e[r?"before":"after"](i.append)),e.unbind("focus",this._showDatepicker),i.trigger&&i.trigger.remove(),s=this._get(i,"showOn"),("focus"===s||"both"===s)&&e.focus(this._showDatepicker),("button"===s||"both"===s)&&(n=this._get(i,"buttonText"),o=this._get(i,"buttonImage"),i.trigger=t(this._get(i,"buttonImageOnly")?t("<img/>").addClass(this._triggerClass).attr({src:o,alt:n,title:n}):t("<button type='button'></button>").addClass(this._triggerClass).html(o?t("<img/>").attr({src:o,alt:n,title:n}):n)),e[r?"before":"after"](i.trigger),i.trigger.click(function(){return t.datepicker._datepickerShowing&&t.datepicker._lastInput===e[0]?t.datepicker._hideDatepicker():t.datepicker._datepickerShowing&&t.datepicker._lastInput!==e[0]?(t.datepicker._hideDatepicker(),t.datepicker._showDatepicker(e[0])):t.datepicker._showDatepicker(e[0]),!1}))},_autoSize:function(t){if(this._get(t,"autoSize")&&!t.inline){var e,i,s,n,o=new Date(2009,11,20),a=this._get(t,"dateFormat");a.match(/[DM]/)&&(e=function(t){for(i=0,s=0,n=0;t.length>n;n++)t[n].length>i&&(i=t[n].length,s=n);return s},o.setMonth(e(this._get(t,a.match(/MM/)?"monthNames":"monthNamesShort"))),o.setDate(e(this._get(t,a.match(/DD/)?"dayNames":"dayNamesShort"))+20-o.getDay())),t.input.attr("size",this._formatDate(t,o).length)}},_inlineDatepicker:function(e,i){var s=t(e);s.hasClass(this.markerClassName)||(s.addClass(this.markerClassName).append(i.dpDiv),t.data(e,a,i),this._setDate(i,this._getDefaultDate(i),!0),this._updateDatepicker(i),this._updateAlternate(i),i.settings.disabled&&this._disableDatepicker(e),i.dpDiv.css("display","block"))},_dialogDatepicker:function(e,i,s,o,r){var h,l,c,u,d,p=this._dialogInst;return p||(this.uuid+=1,h="dp"+this.uuid,this._dialogInput=t("<input type='text' id='"+h+"' style='position: absolute; top: -100px; width: 0px;'/>"),this._dialogInput.keydown(this._doKeyDown),t("body").append(this._dialogInput),p=this._dialogInst=this._newInst(this._dialogInput,!1),p.settings={},t.data(this._dialogInput[0],a,p)),n(p.settings,o||{}),i=i&&i.constructor===Date?this._formatDate(p,i):i,this._dialogInput.val(i),this._pos=r?r.length?r:[r.pageX,r.pageY]:null,this._pos||(l=document.documentElement.clientWidth,c=document.documentElement.clientHeight,u=document.documentElement.scrollLeft||document.body.scrollLeft,d=document.documentElement.scrollTop||document.body.scrollTop,this._pos=[l/2-100+u,c/2-150+d]),this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),p.settings.onSelect=s,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),t.blockUI&&t.blockUI(this.dpDiv),t.data(this._dialogInput[0],a,p),this},_destroyDatepicker:function(e){var i,s=t(e),n=t.data(e,a);s.hasClass(this.markerClassName)&&(i=e.nodeName.toLowerCase(),t.removeData(e,a),"input"===i?(n.append.remove(),n.trigger.remove(),s.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)):("div"===i||"span"===i)&&s.removeClass(this.markerClassName).empty())},_enableDatepicker:function(e){var i,s,n=t(e),o=t.data(e,a);n.hasClass(this.markerClassName)&&(i=e.nodeName.toLowerCase(),"input"===i?(e.disabled=!1,o.trigger.filter("button").each(function(){this.disabled=!1}).end().filter("img").css({opacity:"1.0",cursor:""})):("div"===i||"span"===i)&&(s=n.children("."+this._inlineClass),s.children().removeClass("ui-state-disabled"),s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!1)),this._disabledInputs=t.map(this._disabledInputs,function(t){return t===e?null:t}))},_disableDatepicker:function(e){var i,s,n=t(e),o=t.data(e,a);n.hasClass(this.markerClassName)&&(i=e.nodeName.toLowerCase(),"input"===i?(e.disabled=!0,o.trigger.filter("button").each(function(){this.disabled=!0}).end().filter("img").css({opacity:"0.5",cursor:"default"})):("div"===i||"span"===i)&&(s=n.children("."+this._inlineClass),s.children().addClass("ui-state-disabled"),s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!0)),this._disabledInputs=t.map(this._disabledInputs,function(t){return t===e?null:t}),this._disabledInputs[this._disabledInputs.length]=e)},_isDisabledDatepicker:function(t){if(!t)return!1;for(var e=0;this._disabledInputs.length>e;e++)if(this._disabledInputs[e]===t)return!0;return!1},_getInst:function(e){try{return t.data(e,a)}catch(i){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(i,s,o){var a,r,h,l,c=this._getInst(i);return 2===arguments.length&&"string"==typeof s?"defaults"===s?t.extend({},t.datepicker._defaults):c?"all"===s?t.extend({},c.settings):this._get(c,s):null:(a=s||{},"string"==typeof s&&(a={},a[s]=o),c&&(this._curInst===c&&this._hideDatepicker(),r=this._getDateDatepicker(i,!0),h=this._getMinMaxDate(c,"min"),l=this._getMinMaxDate(c,"max"),n(c.settings,a),null!==h&&a.dateFormat!==e&&a.minDate===e&&(c.settings.minDate=this._formatDate(c,h)),null!==l&&a.dateFormat!==e&&a.maxDate===e&&(c.settings.maxDate=this._formatDate(c,l)),"disabled"in a&&(a.disabled?this._disableDatepicker(i):this._enableDatepicker(i)),this._attachments(t(i),c),this._autoSize(c),this._setDate(c,r),this._updateAlternate(c),this._updateDatepicker(c)),e)},_changeDatepicker:function(t,e,i){this._optionDatepicker(t,e,i)},_refreshDatepicker:function(t){var e=this._getInst(t);e&&this._updateDatepicker(e)},_setDateDatepicker:function(t,e){var i=this._getInst(t);i&&(this._setDate(i,e),this._updateDatepicker(i),this._updateAlternate(i))},_getDateDatepicker:function(t,e){var i=this._getInst(t);return i&&!i.inline&&this._setDateFromField(i,e),i?this._getDate(i):null},_doKeyDown:function(e){var i,s,n,o=t.datepicker._getInst(e.target),a=!0,r=o.dpDiv.is(".ui-datepicker-rtl");if(o._keyEvent=!0,t.datepicker._datepickerShowing)switch(e.keyCode){case 9:t.datepicker._hideDatepicker(),a=!1;break;case 13:return n=t("td."+t.datepicker._dayOverClass+":not(."+t.datepicker._currentClass+")",o.dpDiv),n[0]&&t.datepicker._selectDay(e.target,o.selectedMonth,o.selectedYear,n[0]),i=t.datepicker._get(o,"onSelect"),i?(s=t.datepicker._formatDate(o),i.apply(o.input?o.input[0]:null,[s,o])):t.datepicker._hideDatepicker(),!1;
case 27:t.datepicker._hideDatepicker();break;case 33:t.datepicker._adjustDate(e.target,e.ctrlKey?-t.datepicker._get(o,"stepBigMonths"):-t.datepicker._get(o,"stepMonths"),"M");break;case 34:t.datepicker._adjustDate(e.target,e.ctrlKey?+t.datepicker._get(o,"stepBigMonths"):+t.datepicker._get(o,"stepMonths"),"M");break;case 35:(e.ctrlKey||e.metaKey)&&t.datepicker._clearDate(e.target),a=e.ctrlKey||e.metaKey;break;case 36:(e.ctrlKey||e.metaKey)&&t.datepicker._gotoToday(e.target),a=e.ctrlKey||e.metaKey;break;case 37:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,r?1:-1,"D"),a=e.ctrlKey||e.metaKey,e.originalEvent.altKey&&t.datepicker._adjustDate(e.target,e.ctrlKey?-t.datepicker._get(o,"stepBigMonths"):-t.datepicker._get(o,"stepMonths"),"M");break;case 38:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,-7,"D"),a=e.ctrlKey||e.metaKey;break;case 39:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,r?-1:1,"D"),a=e.ctrlKey||e.metaKey,e.originalEvent.altKey&&t.datepicker._adjustDate(e.target,e.ctrlKey?+t.datepicker._get(o,"stepBigMonths"):+t.datepicker._get(o,"stepMonths"),"M");break;case 40:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,7,"D"),a=e.ctrlKey||e.metaKey;break;default:a=!1}else 36===e.keyCode&&e.ctrlKey?t.datepicker._showDatepicker(this):a=!1;a&&(e.preventDefault(),e.stopPropagation())},_doKeyPress:function(i){var s,n,o=t.datepicker._getInst(i.target);return t.datepicker._get(o,"constrainInput")?(s=t.datepicker._possibleChars(t.datepicker._get(o,"dateFormat")),n=String.fromCharCode(null==i.charCode?i.keyCode:i.charCode),i.ctrlKey||i.metaKey||" ">n||!s||s.indexOf(n)>-1):e},_doKeyUp:function(e){var i,s=t.datepicker._getInst(e.target);if(s.input.val()!==s.lastVal)try{i=t.datepicker.parseDate(t.datepicker._get(s,"dateFormat"),s.input?s.input.val():null,t.datepicker._getFormatConfig(s)),i&&(t.datepicker._setDateFromField(s),t.datepicker._updateAlternate(s),t.datepicker._updateDatepicker(s))}catch(n){}return!0},_showDatepicker:function(e){if(e=e.target||e,"input"!==e.nodeName.toLowerCase()&&(e=t("input",e.parentNode)[0]),!t.datepicker._isDisabledDatepicker(e)&&t.datepicker._lastInput!==e){var i,s,o,a,r,h,l;i=t.datepicker._getInst(e),t.datepicker._curInst&&t.datepicker._curInst!==i&&(t.datepicker._curInst.dpDiv.stop(!0,!0),i&&t.datepicker._datepickerShowing&&t.datepicker._hideDatepicker(t.datepicker._curInst.input[0])),s=t.datepicker._get(i,"beforeShow"),o=s?s.apply(e,[e,i]):{},o!==!1&&(n(i.settings,o),i.lastVal=null,t.datepicker._lastInput=e,t.datepicker._setDateFromField(i),t.datepicker._inDialog&&(e.value=""),t.datepicker._pos||(t.datepicker._pos=t.datepicker._findPos(e),t.datepicker._pos[1]+=e.offsetHeight),a=!1,t(e).parents().each(function(){return a|="fixed"===t(this).css("position"),!a}),r={left:t.datepicker._pos[0],top:t.datepicker._pos[1]},t.datepicker._pos=null,i.dpDiv.empty(),i.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),t.datepicker._updateDatepicker(i),r=t.datepicker._checkOffset(i,r,a),i.dpDiv.css({position:t.datepicker._inDialog&&t.blockUI?"static":a?"fixed":"absolute",display:"none",left:r.left+"px",top:r.top+"px"}),i.inline||(h=t.datepicker._get(i,"showAnim"),l=t.datepicker._get(i,"duration"),i.dpDiv.zIndex(t(e).zIndex()+1),t.datepicker._datepickerShowing=!0,t.effects&&t.effects.effect[h]?i.dpDiv.show(h,t.datepicker._get(i,"showOptions"),l):i.dpDiv[h||"show"](h?l:null),t.datepicker._shouldFocusInput(i)&&i.input.focus(),t.datepicker._curInst=i))}},_updateDatepicker:function(e){this.maxRows=4,o=e,e.dpDiv.empty().append(this._generateHTML(e)),this._attachHandlers(e),e.dpDiv.find("."+this._dayOverClass+" a").mouseover();var i,s=this._getNumberOfMonths(e),n=s[1],a=17;e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),n>1&&e.dpDiv.addClass("ui-datepicker-multi-"+n).css("width",a*n+"em"),e.dpDiv[(1!==s[0]||1!==s[1]?"add":"remove")+"Class"]("ui-datepicker-multi"),e.dpDiv[(this._get(e,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),e===t.datepicker._curInst&&t.datepicker._datepickerShowing&&t.datepicker._shouldFocusInput(e)&&e.input.focus(),e.yearshtml&&(i=e.yearshtml,setTimeout(function(){i===e.yearshtml&&e.yearshtml&&e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml),i=e.yearshtml=null},0))},_shouldFocusInput:function(t){return t.input&&t.input.is(":visible")&&!t.input.is(":disabled")&&!t.input.is(":focus")},_checkOffset:function(e,i,s){var n=e.dpDiv.outerWidth(),o=e.dpDiv.outerHeight(),a=e.input?e.input.outerWidth():0,r=e.input?e.input.outerHeight():0,h=document.documentElement.clientWidth+(s?0:t(document).scrollLeft()),l=document.documentElement.clientHeight+(s?0:t(document).scrollTop());return i.left-=this._get(e,"isRTL")?n-a:0,i.left-=s&&i.left===e.input.offset().left?t(document).scrollLeft():0,i.top-=s&&i.top===e.input.offset().top+r?t(document).scrollTop():0,i.left-=Math.min(i.left,i.left+n>h&&h>n?Math.abs(i.left+n-h):0),i.top-=Math.min(i.top,i.top+o>l&&l>o?Math.abs(o+r):0),i},_findPos:function(e){for(var i,s=this._getInst(e),n=this._get(s,"isRTL");e&&("hidden"===e.type||1!==e.nodeType||t.expr.filters.hidden(e));)e=e[n?"previousSibling":"nextSibling"];return i=t(e).offset(),[i.left,i.top]},_hideDatepicker:function(e){var i,s,n,o,r=this._curInst;!r||e&&r!==t.data(e,a)||this._datepickerShowing&&(i=this._get(r,"showAnim"),s=this._get(r,"duration"),n=function(){t.datepicker._tidyDialog(r)},t.effects&&(t.effects.effect[i]||t.effects[i])?r.dpDiv.hide(i,t.datepicker._get(r,"showOptions"),s,n):r.dpDiv["slideDown"===i?"slideUp":"fadeIn"===i?"fadeOut":"hide"](i?s:null,n),i||n(),this._datepickerShowing=!1,o=this._get(r,"onClose"),o&&o.apply(r.input?r.input[0]:null,[r.input?r.input.val():"",r]),this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),t.blockUI&&(t.unblockUI(),t("body").append(this.dpDiv))),this._inDialog=!1)},_tidyDialog:function(t){t.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(e){if(t.datepicker._curInst){var i=t(e.target),s=t.datepicker._getInst(i[0]);(i[0].id!==t.datepicker._mainDivId&&0===i.parents("#"+t.datepicker._mainDivId).length&&!i.hasClass(t.datepicker.markerClassName)&&!i.closest("."+t.datepicker._triggerClass).length&&t.datepicker._datepickerShowing&&(!t.datepicker._inDialog||!t.blockUI)||i.hasClass(t.datepicker.markerClassName)&&t.datepicker._curInst!==s)&&t.datepicker._hideDatepicker()}},_adjustDate:function(e,i,s){var n=t(e),o=this._getInst(n[0]);this._isDisabledDatepicker(n[0])||(this._adjustInstDate(o,i+("M"===s?this._get(o,"showCurrentAtPos"):0),s),this._updateDatepicker(o))},_gotoToday:function(e){var i,s=t(e),n=this._getInst(s[0]);this._get(n,"gotoCurrent")&&n.currentDay?(n.selectedDay=n.currentDay,n.drawMonth=n.selectedMonth=n.currentMonth,n.drawYear=n.selectedYear=n.currentYear):(i=new Date,n.selectedDay=i.getDate(),n.drawMonth=n.selectedMonth=i.getMonth(),n.drawYear=n.selectedYear=i.getFullYear()),this._notifyChange(n),this._adjustDate(s)},_selectMonthYear:function(e,i,s){var n=t(e),o=this._getInst(n[0]);o["selected"+("M"===s?"Month":"Year")]=o["draw"+("M"===s?"Month":"Year")]=parseInt(i.options[i.selectedIndex].value,10),this._notifyChange(o),this._adjustDate(n)},_selectDay:function(e,i,s,n){var o,a=t(e);t(n).hasClass(this._unselectableClass)||this._isDisabledDatepicker(a[0])||(o=this._getInst(a[0]),o.selectedDay=o.currentDay=t("a",n).html(),o.selectedMonth=o.currentMonth=i,o.selectedYear=o.currentYear=s,this._selectDate(e,this._formatDate(o,o.currentDay,o.currentMonth,o.currentYear)))},_clearDate:function(e){var i=t(e);this._selectDate(i,"")},_selectDate:function(e,i){var s,n=t(e),o=this._getInst(n[0]);i=null!=i?i:this._formatDate(o),o.input&&o.input.val(i),this._updateAlternate(o),s=this._get(o,"onSelect"),s?s.apply(o.input?o.input[0]:null,[i,o]):o.input&&o.input.trigger("change"),o.inline?this._updateDatepicker(o):(this._hideDatepicker(),this._lastInput=o.input[0],"object"!=typeof o.input[0]&&o.input.focus(),this._lastInput=null)},_updateAlternate:function(e){var i,s,n,o=this._get(e,"altField");o&&(i=this._get(e,"altFormat")||this._get(e,"dateFormat"),s=this._getDate(e),n=this.formatDate(i,s,this._getFormatConfig(e)),t(o).each(function(){t(this).val(n)}))},noWeekends:function(t){var e=t.getDay();return[e>0&&6>e,""]},iso8601Week:function(t){var e,i=new Date(t.getTime());return i.setDate(i.getDate()+4-(i.getDay()||7)),e=i.getTime(),i.setMonth(0),i.setDate(1),Math.floor(Math.round((e-i)/864e5)/7)+1},parseDate:function(i,s,n){if(null==i||null==s)throw"Invalid arguments";if(s="object"==typeof s?""+s:s+"",""===s)return null;var o,a,r,h,l=0,c=(n?n.shortYearCutoff:null)||this._defaults.shortYearCutoff,u="string"!=typeof c?c:(new Date).getFullYear()%100+parseInt(c,10),d=(n?n.dayNamesShort:null)||this._defaults.dayNamesShort,p=(n?n.dayNames:null)||this._defaults.dayNames,f=(n?n.monthNamesShort:null)||this._defaults.monthNamesShort,g=(n?n.monthNames:null)||this._defaults.monthNames,m=-1,v=-1,_=-1,b=-1,y=!1,w=function(t){var e=i.length>o+1&&i.charAt(o+1)===t;return e&&o++,e},k=function(t){var e=w(t),i="@"===t?14:"!"===t?20:"y"===t&&e?4:"o"===t?3:2,n=RegExp("^\\d{1,"+i+"}"),o=s.substring(l).match(n);if(!o)throw"Missing number at position "+l;return l+=o[0].length,parseInt(o[0],10)},x=function(i,n,o){var a=-1,r=t.map(w(i)?o:n,function(t,e){return[[e,t]]}).sort(function(t,e){return-(t[1].length-e[1].length)});if(t.each(r,function(t,i){var n=i[1];return s.substr(l,n.length).toLowerCase()===n.toLowerCase()?(a=i[0],l+=n.length,!1):e}),-1!==a)return a+1;throw"Unknown name at position "+l},D=function(){if(s.charAt(l)!==i.charAt(o))throw"Unexpected literal at position "+l;l++};for(o=0;i.length>o;o++)if(y)"'"!==i.charAt(o)||w("'")?D():y=!1;else switch(i.charAt(o)){case"d":_=k("d");break;case"D":x("D",d,p);break;case"o":b=k("o");break;case"m":v=k("m");break;case"M":v=x("M",f,g);break;case"y":m=k("y");break;case"@":h=new Date(k("@")),m=h.getFullYear(),v=h.getMonth()+1,_=h.getDate();break;case"!":h=new Date((k("!")-this._ticksTo1970)/1e4),m=h.getFullYear(),v=h.getMonth()+1,_=h.getDate();break;case"'":w("'")?D():y=!0;break;default:D()}if(s.length>l&&(r=s.substr(l),!/^\s+/.test(r)))throw"Extra/unparsed characters found in date: "+r;if(-1===m?m=(new Date).getFullYear():100>m&&(m+=(new Date).getFullYear()-(new Date).getFullYear()%100+(u>=m?0:-100)),b>-1)for(v=1,_=b;;){if(a=this._getDaysInMonth(m,v-1),a>=_)break;v++,_-=a}if(h=this._daylightSavingAdjust(new Date(m,v-1,_)),h.getFullYear()!==m||h.getMonth()+1!==v||h.getDate()!==_)throw"Invalid date";return h},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:1e7*60*60*24*(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925)),formatDate:function(t,e,i){if(!e)return"";var s,n=(i?i.dayNamesShort:null)||this._defaults.dayNamesShort,o=(i?i.dayNames:null)||this._defaults.dayNames,a=(i?i.monthNamesShort:null)||this._defaults.monthNamesShort,r=(i?i.monthNames:null)||this._defaults.monthNames,h=function(e){var i=t.length>s+1&&t.charAt(s+1)===e;return i&&s++,i},l=function(t,e,i){var s=""+e;if(h(t))for(;i>s.length;)s="0"+s;return s},c=function(t,e,i,s){return h(t)?s[e]:i[e]},u="",d=!1;if(e)for(s=0;t.length>s;s++)if(d)"'"!==t.charAt(s)||h("'")?u+=t.charAt(s):d=!1;else switch(t.charAt(s)){case"d":u+=l("d",e.getDate(),2);break;case"D":u+=c("D",e.getDay(),n,o);break;case"o":u+=l("o",Math.round((new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime()-new Date(e.getFullYear(),0,0).getTime())/864e5),3);break;case"m":u+=l("m",e.getMonth()+1,2);break;case"M":u+=c("M",e.getMonth(),a,r);break;case"y":u+=h("y")?e.getFullYear():(10>e.getYear()%100?"0":"")+e.getYear()%100;break;case"@":u+=e.getTime();break;case"!":u+=1e4*e.getTime()+this._ticksTo1970;break;case"'":h("'")?u+="'":d=!0;break;default:u+=t.charAt(s)}return u},_possibleChars:function(t){var e,i="",s=!1,n=function(i){var s=t.length>e+1&&t.charAt(e+1)===i;return s&&e++,s};for(e=0;t.length>e;e++)if(s)"'"!==t.charAt(e)||n("'")?i+=t.charAt(e):s=!1;else switch(t.charAt(e)){case"d":case"m":case"y":case"@":i+="0123456789";break;case"D":case"M":return null;case"'":n("'")?i+="'":s=!0;break;default:i+=t.charAt(e)}return i},_get:function(t,i){return t.settings[i]!==e?t.settings[i]:this._defaults[i]},_setDateFromField:function(t,e){if(t.input.val()!==t.lastVal){var i=this._get(t,"dateFormat"),s=t.lastVal=t.input?t.input.val():null,n=this._getDefaultDate(t),o=n,a=this._getFormatConfig(t);try{o=this.parseDate(i,s,a)||n}catch(r){s=e?"":s}t.selectedDay=o.getDate(),t.drawMonth=t.selectedMonth=o.getMonth(),t.drawYear=t.selectedYear=o.getFullYear(),t.currentDay=s?o.getDate():0,t.currentMonth=s?o.getMonth():0,t.currentYear=s?o.getFullYear():0,this._adjustInstDate(t)}},_getDefaultDate:function(t){return this._restrictMinMax(t,this._determineDate(t,this._get(t,"defaultDate"),new Date))},_determineDate:function(e,i,s){var n=function(t){var e=new Date;return e.setDate(e.getDate()+t),e},o=function(i){try{return t.datepicker.parseDate(t.datepicker._get(e,"dateFormat"),i,t.datepicker._getFormatConfig(e))}catch(s){}for(var n=(i.toLowerCase().match(/^c/)?t.datepicker._getDate(e):null)||new Date,o=n.getFullYear(),a=n.getMonth(),r=n.getDate(),h=/([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,l=h.exec(i);l;){switch(l[2]||"d"){case"d":case"D":r+=parseInt(l[1],10);break;case"w":case"W":r+=7*parseInt(l[1],10);break;case"m":case"M":a+=parseInt(l[1],10),r=Math.min(r,t.datepicker._getDaysInMonth(o,a));break;case"y":case"Y":o+=parseInt(l[1],10),r=Math.min(r,t.datepicker._getDaysInMonth(o,a))}l=h.exec(i)}return new Date(o,a,r)},a=null==i||""===i?s:"string"==typeof i?o(i):"number"==typeof i?isNaN(i)?s:n(i):new Date(i.getTime());return a=a&&"Invalid Date"==""+a?s:a,a&&(a.setHours(0),a.setMinutes(0),a.setSeconds(0),a.setMilliseconds(0)),this._daylightSavingAdjust(a)},_daylightSavingAdjust:function(t){return t?(t.setHours(t.getHours()>12?t.getHours()+2:0),t):null},_setDate:function(t,e,i){var s=!e,n=t.selectedMonth,o=t.selectedYear,a=this._restrictMinMax(t,this._determineDate(t,e,new Date));t.selectedDay=t.currentDay=a.getDate(),t.drawMonth=t.selectedMonth=t.currentMonth=a.getMonth(),t.drawYear=t.selectedYear=t.currentYear=a.getFullYear(),n===t.selectedMonth&&o===t.selectedYear||i||this._notifyChange(t),this._adjustInstDate(t),t.input&&t.input.val(s?"":this._formatDate(t))},_getDate:function(t){var e=!t.currentYear||t.input&&""===t.input.val()?null:this._daylightSavingAdjust(new Date(t.currentYear,t.currentMonth,t.currentDay));return e},_attachHandlers:function(e){var i=this._get(e,"stepMonths"),s="#"+e.id.replace(/\\\\/g,"\\");e.dpDiv.find("[data-handler]").map(function(){var e={prev:function(){t.datepicker._adjustDate(s,-i,"M")},next:function(){t.datepicker._adjustDate(s,+i,"M")},hide:function(){t.datepicker._hideDatepicker()},today:function(){t.datepicker._gotoToday(s)},selectDay:function(){return t.datepicker._selectDay(s,+this.getAttribute("data-month"),+this.getAttribute("data-year"),this),!1},selectMonth:function(){return t.datepicker._selectMonthYear(s,this,"M"),!1},selectYear:function(){return t.datepicker._selectMonthYear(s,this,"Y"),!1}};t(this).bind(this.getAttribute("data-event"),e[this.getAttribute("data-handler")])})},_generateHTML:function(t){var e,i,s,n,o,a,r,h,l,c,u,d,p,f,g,m,v,_,b,y,w,k,x,D,C,I,P,T,M,S,z,A,H,E,N,W,O,F,R,L=new Date,j=this._daylightSavingAdjust(new Date(L.getFullYear(),L.getMonth(),L.getDate())),Y=this._get(t,"isRTL"),B=this._get(t,"showButtonPanel"),V=this._get(t,"hideIfNoPrevNext"),K=this._get(t,"navigationAsDateFormat"),U=this._getNumberOfMonths(t),q=this._get(t,"showCurrentAtPos"),Q=this._get(t,"stepMonths"),X=1!==U[0]||1!==U[1],$=this._daylightSavingAdjust(t.currentDay?new Date(t.currentYear,t.currentMonth,t.currentDay):new Date(9999,9,9)),G=this._getMinMaxDate(t,"min"),J=this._getMinMaxDate(t,"max"),Z=t.drawMonth-q,te=t.drawYear;if(0>Z&&(Z+=12,te--),J)for(e=this._daylightSavingAdjust(new Date(J.getFullYear(),J.getMonth()-U[0]*U[1]+1,J.getDate())),e=G&&G>e?G:e;this._daylightSavingAdjust(new Date(te,Z,1))>e;)Z--,0>Z&&(Z=11,te--);for(t.drawMonth=Z,t.drawYear=te,i=this._get(t,"prevText"),i=K?this.formatDate(i,this._daylightSavingAdjust(new Date(te,Z-Q,1)),this._getFormatConfig(t)):i,s=this._canAdjustMonth(t,-1,te,Z)?"<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"e":"w")+"'>"+i+"</span></a>":V?"":"<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"e":"w")+"'>"+i+"</span></a>",n=this._get(t,"nextText"),n=K?this.formatDate(n,this._daylightSavingAdjust(new Date(te,Z+Q,1)),this._getFormatConfig(t)):n,o=this._canAdjustMonth(t,1,te,Z)?"<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"w":"e")+"'>"+n+"</span></a>":V?"":"<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"w":"e")+"'>"+n+"</span></a>",a=this._get(t,"currentText"),r=this._get(t,"gotoCurrent")&&t.currentDay?$:j,a=K?this.formatDate(a,r,this._getFormatConfig(t)):a,h=t.inline?"":"<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>"+this._get(t,"closeText")+"</button>",l=B?"<div class='ui-datepicker-buttonpane ui-widget-content'>"+(Y?h:"")+(this._isInRange(t,r)?"<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>"+a+"</button>":"")+(Y?"":h)+"</div>":"",c=parseInt(this._get(t,"firstDay"),10),c=isNaN(c)?0:c,u=this._get(t,"showWeek"),d=this._get(t,"dayNames"),p=this._get(t,"dayNamesMin"),f=this._get(t,"monthNames"),g=this._get(t,"monthNamesShort"),m=this._get(t,"beforeShowDay"),v=this._get(t,"showOtherMonths"),_=this._get(t,"selectOtherMonths"),b=this._getDefaultDate(t),y="",k=0;U[0]>k;k++){for(x="",this.maxRows=4,D=0;U[1]>D;D++){if(C=this._daylightSavingAdjust(new Date(te,Z,t.selectedDay)),I=" ui-corner-all",P="",X){if(P+="<div class='ui-datepicker-group",U[1]>1)switch(D){case 0:P+=" ui-datepicker-group-first",I=" ui-corner-"+(Y?"right":"left");break;case U[1]-1:P+=" ui-datepicker-group-last",I=" ui-corner-"+(Y?"left":"right");break;default:P+=" ui-datepicker-group-middle",I=""}P+="'>"}for(P+="<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix"+I+"'>"+(/all|left/.test(I)&&0===k?Y?o:s:"")+(/all|right/.test(I)&&0===k?Y?s:o:"")+this._generateMonthYearHeader(t,Z,te,G,J,k>0||D>0,f,g)+"</div><table class='ui-datepicker-calendar'><thead>"+"<tr>",T=u?"<th class='ui-datepicker-week-col'>"+this._get(t,"weekHeader")+"</th>":"",w=0;7>w;w++)M=(w+c)%7,T+="<th"+((w+c+6)%7>=5?" class='ui-datepicker-week-end'":"")+">"+"<span title='"+d[M]+"'>"+p[M]+"</span></th>";for(P+=T+"</tr></thead><tbody>",S=this._getDaysInMonth(te,Z),te===t.selectedYear&&Z===t.selectedMonth&&(t.selectedDay=Math.min(t.selectedDay,S)),z=(this._getFirstDayOfMonth(te,Z)-c+7)%7,A=Math.ceil((z+S)/7),H=X?this.maxRows>A?this.maxRows:A:A,this.maxRows=H,E=this._daylightSavingAdjust(new Date(te,Z,1-z)),N=0;H>N;N++){for(P+="<tr>",W=u?"<td class='ui-datepicker-week-col'>"+this._get(t,"calculateWeek")(E)+"</td>":"",w=0;7>w;w++)O=m?m.apply(t.input?t.input[0]:null,[E]):[!0,""],F=E.getMonth()!==Z,R=F&&!_||!O[0]||G&&G>E||J&&E>J,W+="<td class='"+((w+c+6)%7>=5?" ui-datepicker-week-end":"")+(F?" ui-datepicker-other-month":"")+(E.getTime()===C.getTime()&&Z===t.selectedMonth&&t._keyEvent||b.getTime()===E.getTime()&&b.getTime()===C.getTime()?" "+this._dayOverClass:"")+(R?" "+this._unselectableClass+" ui-state-disabled":"")+(F&&!v?"":" "+O[1]+(E.getTime()===$.getTime()?" "+this._currentClass:"")+(E.getTime()===j.getTime()?" ui-datepicker-today":""))+"'"+(F&&!v||!O[2]?"":" title='"+O[2].replace(/'/g,"&#39;")+"'")+(R?"":" data-handler='selectDay' data-event='click' data-month='"+E.getMonth()+"' data-year='"+E.getFullYear()+"'")+">"+(F&&!v?"&#xa0;":R?"<span class='ui-state-default'>"+E.getDate()+"</span>":"<a class='ui-state-default"+(E.getTime()===j.getTime()?" ui-state-highlight":"")+(E.getTime()===$.getTime()?" ui-state-active":"")+(F?" ui-priority-secondary":"")+"' href='#'>"+E.getDate()+"</a>")+"</td>",E.setDate(E.getDate()+1),E=this._daylightSavingAdjust(E);P+=W+"</tr>"}Z++,Z>11&&(Z=0,te++),P+="</tbody></table>"+(X?"</div>"+(U[0]>0&&D===U[1]-1?"<div class='ui-datepicker-row-break'></div>":""):""),x+=P}y+=x}return y+=l,t._keyEvent=!1,y},_generateMonthYearHeader:function(t,e,i,s,n,o,a,r){var h,l,c,u,d,p,f,g,m=this._get(t,"changeMonth"),v=this._get(t,"changeYear"),_=this._get(t,"showMonthAfterYear"),b="<div class='ui-datepicker-title'>",y="";if(o||!m)y+="<span class='ui-datepicker-month'>"+a[e]+"</span>";else{for(h=s&&s.getFullYear()===i,l=n&&n.getFullYear()===i,y+="<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",c=0;12>c;c++)(!h||c>=s.getMonth())&&(!l||n.getMonth()>=c)&&(y+="<option value='"+c+"'"+(c===e?" selected='selected'":"")+">"+r[c]+"</option>");y+="</select>"}if(_||(b+=y+(!o&&m&&v?"":"&#xa0;")),!t.yearshtml)if(t.yearshtml="",o||!v)b+="<span class='ui-datepicker-year'>"+i+"</span>";else{for(u=this._get(t,"yearRange").split(":"),d=(new Date).getFullYear(),p=function(t){var e=t.match(/c[+\-].*/)?i+parseInt(t.substring(1),10):t.match(/[+\-].*/)?d+parseInt(t,10):parseInt(t,10);return isNaN(e)?d:e},f=p(u[0]),g=Math.max(f,p(u[1]||"")),f=s?Math.max(f,s.getFullYear()):f,g=n?Math.min(g,n.getFullYear()):g,t.yearshtml+="<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";g>=f;f++)t.yearshtml+="<option value='"+f+"'"+(f===i?" selected='selected'":"")+">"+f+"</option>";t.yearshtml+="</select>",b+=t.yearshtml,t.yearshtml=null}return b+=this._get(t,"yearSuffix"),_&&(b+=(!o&&m&&v?"":"&#xa0;")+y),b+="</div>"},_adjustInstDate:function(t,e,i){var s=t.drawYear+("Y"===i?e:0),n=t.drawMonth+("M"===i?e:0),o=Math.min(t.selectedDay,this._getDaysInMonth(s,n))+("D"===i?e:0),a=this._restrictMinMax(t,this._daylightSavingAdjust(new Date(s,n,o)));t.selectedDay=a.getDate(),t.drawMonth=t.selectedMonth=a.getMonth(),t.drawYear=t.selectedYear=a.getFullYear(),("M"===i||"Y"===i)&&this._notifyChange(t)},_restrictMinMax:function(t,e){var i=this._getMinMaxDate(t,"min"),s=this._getMinMaxDate(t,"max"),n=i&&i>e?i:e;return s&&n>s?s:n},_notifyChange:function(t){var e=this._get(t,"onChangeMonthYear");e&&e.apply(t.input?t.input[0]:null,[t.selectedYear,t.selectedMonth+1,t])},_getNumberOfMonths:function(t){var e=this._get(t,"numberOfMonths");return null==e?[1,1]:"number"==typeof e?[1,e]:e},_getMinMaxDate:function(t,e){return this._determineDate(t,this._get(t,e+"Date"),null)},_getDaysInMonth:function(t,e){return 32-this._daylightSavingAdjust(new Date(t,e,32)).getDate()},_getFirstDayOfMonth:function(t,e){return new Date(t,e,1).getDay()},_canAdjustMonth:function(t,e,i,s){var n=this._getNumberOfMonths(t),o=this._daylightSavingAdjust(new Date(i,s+(0>e?e:n[0]*n[1]),1));return 0>e&&o.setDate(this._getDaysInMonth(o.getFullYear(),o.getMonth())),this._isInRange(t,o)},_isInRange:function(t,e){var i,s,n=this._getMinMaxDate(t,"min"),o=this._getMinMaxDate(t,"max"),a=null,r=null,h=this._get(t,"yearRange");return h&&(i=h.split(":"),s=(new Date).getFullYear(),a=parseInt(i[0],10),r=parseInt(i[1],10),i[0].match(/[+\-].*/)&&(a+=s),i[1].match(/[+\-].*/)&&(r+=s)),(!n||e.getTime()>=n.getTime())&&(!o||e.getTime()<=o.getTime())&&(!a||e.getFullYear()>=a)&&(!r||r>=e.getFullYear())},_getFormatConfig:function(t){var e=this._get(t,"shortYearCutoff");return e="string"!=typeof e?e:(new Date).getFullYear()%100+parseInt(e,10),{shortYearCutoff:e,dayNamesShort:this._get(t,"dayNamesShort"),dayNames:this._get(t,"dayNames"),monthNamesShort:this._get(t,"monthNamesShort"),monthNames:this._get(t,"monthNames")}},_formatDate:function(t,e,i,s){e||(t.currentDay=t.selectedDay,t.currentMonth=t.selectedMonth,t.currentYear=t.selectedYear);var n=e?"object"==typeof e?e:this._daylightSavingAdjust(new Date(s,i,e)):this._daylightSavingAdjust(new Date(t.currentYear,t.currentMonth,t.currentDay));return this.formatDate(this._get(t,"dateFormat"),n,this._getFormatConfig(t))}}),t.fn.datepicker=function(e){if(!this.length)return this;t.datepicker.initialized||(t(document).mousedown(t.datepicker._checkExternalClick),t.datepicker.initialized=!0),0===t("#"+t.datepicker._mainDivId).length&&t("body").append(t.datepicker.dpDiv);var i=Array.prototype.slice.call(arguments,1);return"string"!=typeof e||"isDisabled"!==e&&"getDate"!==e&&"widget"!==e?"option"===e&&2===arguments.length&&"string"==typeof arguments[1]?t.datepicker["_"+e+"Datepicker"].apply(t.datepicker,[this[0]].concat(i)):this.each(function(){"string"==typeof e?t.datepicker["_"+e+"Datepicker"].apply(t.datepicker,[this].concat(i)):t.datepicker._attachDatepicker(this,e)}):t.datepicker["_"+e+"Datepicker"].apply(t.datepicker,[this[0]].concat(i))},t.datepicker=new i,t.datepicker.initialized=!1,t.datepicker.uuid=(new Date).getTime(),t.datepicker.version="1.10.3"}(jQuery),function(t){var e={buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},i={maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0};t.widget("ui.dialog",{version:"1.10.3",options:{appendTo:"body",autoOpen:!0,buttons:[],closeOnEscape:!0,closeText:"close",dialogClass:"",draggable:!0,hide:null,height:"auto",maxHeight:null,maxWidth:null,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",of:window,collision:"fit",using:function(e){var i=t(this).css(e).offset().top;0>i&&t(this).css("top",e.top-i)}},resizable:!0,show:null,title:null,width:300,beforeClose:null,close:null,drag:null,dragStart:null,dragStop:null,focus:null,open:null,resize:null,resizeStart:null,resizeStop:null},_create:function(){this.originalCss={display:this.element[0].style.display,width:this.element[0].style.width,minHeight:this.element[0].style.minHeight,maxHeight:this.element[0].style.maxHeight,height:this.element[0].style.height},this.originalPosition={parent:this.element.parent(),index:this.element.parent().children().index(this.element)},this.originalTitle=this.element.attr("title"),this.options.title=this.options.title||this.originalTitle,this._createWrapper(),this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog),this._createTitlebar(),this._createButtonPane(),this.options.draggable&&t.fn.draggable&&this._makeDraggable(),this.options.resizable&&t.fn.resizable&&this._makeResizable(),this._isOpen=!1},_init:function(){this.options.autoOpen&&this.open()},_appendTo:function(){var e=this.options.appendTo;return e&&(e.jquery||e.nodeType)?t(e):this.document.find(e||"body").eq(0)},_destroy:function(){var t,e=this.originalPosition;this._destroyOverlay(),this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(),this.uiDialog.stop(!0,!0).remove(),this.originalTitle&&this.element.attr("title",this.originalTitle),t=e.parent.children().eq(e.index),t.length&&t[0]!==this.element[0]?t.before(this.element):e.parent.append(this.element)},widget:function(){return this.uiDialog},disable:t.noop,enable:t.noop,close:function(e){var i=this;this._isOpen&&this._trigger("beforeClose",e)!==!1&&(this._isOpen=!1,this._destroyOverlay(),this.opener.filter(":focusable").focus().length||t(this.document[0].activeElement).blur(),this._hide(this.uiDialog,this.options.hide,function(){i._trigger("close",e)}))},isOpen:function(){return this._isOpen},moveToTop:function(){this._moveToTop()},_moveToTop:function(t,e){var i=!!this.uiDialog.nextAll(":visible").insertBefore(this.uiDialog).length;return i&&!e&&this._trigger("focus",t),i},open:function(){var e=this;return this._isOpen?(this._moveToTop()&&this._focusTabbable(),undefined):(this._isOpen=!0,this.opener=t(this.document[0].activeElement),this._size(),this._position(),this._createOverlay(),this._moveToTop(null,!0),this._show(this.uiDialog,this.options.show,function(){e._focusTabbable(),e._trigger("focus")}),this._trigger("open"),undefined)},_focusTabbable:function(){var t=this.element.find("[autofocus]");t.length||(t=this.element.find(":tabbable")),t.length||(t=this.uiDialogButtonPane.find(":tabbable")),t.length||(t=this.uiDialogTitlebarClose.filter(":tabbable")),t.length||(t=this.uiDialog),t.eq(0).focus()},_keepFocus:function(e){function i(){var e=this.document[0].activeElement,i=this.uiDialog[0]===e||t.contains(this.uiDialog[0],e);i||this._focusTabbable()}e.preventDefault(),i.call(this),this._delay(i)},_createWrapper:function(){this.uiDialog=t("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front "+this.options.dialogClass).hide().attr({tabIndex:-1,role:"dialog"}).appendTo(this._appendTo()),this._on(this.uiDialog,{keydown:function(e){if(this.options.closeOnEscape&&!e.isDefaultPrevented()&&e.keyCode&&e.keyCode===t.ui.keyCode.ESCAPE)return e.preventDefault(),this.close(e),undefined;if(e.keyCode===t.ui.keyCode.TAB){var i=this.uiDialog.find(":tabbable"),s=i.filter(":first"),n=i.filter(":last");e.target!==n[0]&&e.target!==this.uiDialog[0]||e.shiftKey?e.target!==s[0]&&e.target!==this.uiDialog[0]||!e.shiftKey||(n.focus(1),e.preventDefault()):(s.focus(1),e.preventDefault())}},mousedown:function(t){this._moveToTop(t)&&this._focusTabbable()}}),this.element.find("[aria-describedby]").length||this.uiDialog.attr({"aria-describedby":this.element.uniqueId().attr("id")})},_createTitlebar:function(){var e;this.uiDialogTitlebar=t("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog),this._on(this.uiDialogTitlebar,{mousedown:function(e){t(e.target).closest(".ui-dialog-titlebar-close")||this.uiDialog.focus()}}),this.uiDialogTitlebarClose=t("<button></button>").button({label:this.options.closeText,icons:{primary:"ui-icon-closethick"},text:!1}).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar),this._on(this.uiDialogTitlebarClose,{click:function(t){t.preventDefault(),this.close(t)}}),e=t("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar),this._title(e),this.uiDialog.attr({"aria-labelledby":e.attr("id")})},_title:function(t){this.options.title||t.html("&#160;"),t.text(this.options.title)},_createButtonPane:function(){this.uiDialogButtonPane=t("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),this.uiButtonSet=t("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane),this._createButtons()},_createButtons:function(){var e=this,i=this.options.buttons;return this.uiDialogButtonPane.remove(),this.uiButtonSet.empty(),t.isEmptyObject(i)||t.isArray(i)&&!i.length?(this.uiDialog.removeClass("ui-dialog-buttons"),undefined):(t.each(i,function(i,s){var n,o;s=t.isFunction(s)?{click:s,text:i}:s,s=t.extend({type:"button"},s),n=s.click,s.click=function(){n.apply(e.element[0],arguments)},o={icons:s.icons,text:s.showText},delete s.icons,delete s.showText,t("<button></button>",s).button(o).appendTo(e.uiButtonSet)}),this.uiDialog.addClass("ui-dialog-buttons"),this.uiDialogButtonPane.appendTo(this.uiDialog),undefined)},_makeDraggable:function(){function e(t){return{position:t.position,offset:t.offset}}var i=this,s=this.options;this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(s,n){t(this).addClass("ui-dialog-dragging"),i._blockFrames(),i._trigger("dragStart",s,e(n))},drag:function(t,s){i._trigger("drag",t,e(s))},stop:function(n,o){s.position=[o.position.left-i.document.scrollLeft(),o.position.top-i.document.scrollTop()],t(this).removeClass("ui-dialog-dragging"),i._unblockFrames(),i._trigger("dragStop",n,e(o))}})},_makeResizable:function(){function e(t){return{originalPosition:t.originalPosition,originalSize:t.originalSize,position:t.position,size:t.size}
}var i=this,s=this.options,n=s.resizable,o=this.uiDialog.css("position"),a="string"==typeof n?n:"n,e,s,w,se,sw,ne,nw";this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:s.maxWidth,maxHeight:s.maxHeight,minWidth:s.minWidth,minHeight:this._minHeight(),handles:a,start:function(s,n){t(this).addClass("ui-dialog-resizing"),i._blockFrames(),i._trigger("resizeStart",s,e(n))},resize:function(t,s){i._trigger("resize",t,e(s))},stop:function(n,o){s.height=t(this).height(),s.width=t(this).width(),t(this).removeClass("ui-dialog-resizing"),i._unblockFrames(),i._trigger("resizeStop",n,e(o))}}).css("position",o)},_minHeight:function(){var t=this.options;return"auto"===t.height?t.minHeight:Math.min(t.minHeight,t.height)},_position:function(){var t=this.uiDialog.is(":visible");t||this.uiDialog.show(),this.uiDialog.position(this.options.position),t||this.uiDialog.hide()},_setOptions:function(s){var n=this,o=!1,a={};t.each(s,function(t,s){n._setOption(t,s),t in e&&(o=!0),t in i&&(a[t]=s)}),o&&(this._size(),this._position()),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option",a)},_setOption:function(t,e){var i,s,n=this.uiDialog;"dialogClass"===t&&n.removeClass(this.options.dialogClass).addClass(e),"disabled"!==t&&(this._super(t,e),"appendTo"===t&&this.uiDialog.appendTo(this._appendTo()),"buttons"===t&&this._createButtons(),"closeText"===t&&this.uiDialogTitlebarClose.button({label:""+e}),"draggable"===t&&(i=n.is(":data(ui-draggable)"),i&&!e&&n.draggable("destroy"),!i&&e&&this._makeDraggable()),"position"===t&&this._position(),"resizable"===t&&(s=n.is(":data(ui-resizable)"),s&&!e&&n.resizable("destroy"),s&&"string"==typeof e&&n.resizable("option","handles",e),s||e===!1||this._makeResizable()),"title"===t&&this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))},_size:function(){var t,e,i,s=this.options;this.element.show().css({width:"auto",minHeight:0,maxHeight:"none",height:0}),s.minWidth>s.width&&(s.width=s.minWidth),t=this.uiDialog.css({height:"auto",width:s.width}).outerHeight(),e=Math.max(0,s.minHeight-t),i="number"==typeof s.maxHeight?Math.max(0,s.maxHeight-t):"none","auto"===s.height?this.element.css({minHeight:e,maxHeight:i,height:"auto"}):this.element.height(Math.max(0,s.height-t)),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())},_blockFrames:function(){this.iframeBlocks=this.document.find("iframe").map(function(){var e=t(this);return t("<div>").css({position:"absolute",width:e.outerWidth(),height:e.outerHeight()}).appendTo(e.parent()).offset(e.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_allowInteraction:function(e){return t(e.target).closest(".ui-dialog").length?!0:!!t(e.target).closest(".ui-datepicker").length},_createOverlay:function(){if(this.options.modal){var e=this,i=this.widgetFullName;t.ui.dialog.overlayInstances||this._delay(function(){t.ui.dialog.overlayInstances&&this.document.bind("focusin.dialog",function(s){e._allowInteraction(s)||(s.preventDefault(),t(".ui-dialog:visible:last .ui-dialog-content").data(i)._focusTabbable())})}),this.overlay=t("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()),this._on(this.overlay,{mousedown:"_keepFocus"}),t.ui.dialog.overlayInstances++}},_destroyOverlay:function(){this.options.modal&&this.overlay&&(t.ui.dialog.overlayInstances--,t.ui.dialog.overlayInstances||this.document.unbind("focusin.dialog"),this.overlay.remove(),this.overlay=null)}}),t.ui.dialog.overlayInstances=0,t.uiBackCompat!==!1&&t.widget("ui.dialog",t.ui.dialog,{_position:function(){var e,i=this.options.position,s=[],n=[0,0];i?(("string"==typeof i||"object"==typeof i&&"0"in i)&&(s=i.split?i.split(" "):[i[0],i[1]],1===s.length&&(s[1]=s[0]),t.each(["left","top"],function(t,e){+s[t]===s[t]&&(n[t]=s[t],s[t]=e)}),i={my:s[0]+(0>n[0]?n[0]:"+"+n[0])+" "+s[1]+(0>n[1]?n[1]:"+"+n[1]),at:s.join(" ")}),i=t.extend({},t.ui.dialog.prototype.options.position,i)):i=t.ui.dialog.prototype.options.position,e=this.uiDialog.is(":visible"),e||this.uiDialog.show(),this.uiDialog.position(i),e||this.uiDialog.hide()}})}(jQuery),function(t){var e=/up|down|vertical/,i=/up|left|vertical|horizontal/;t.effects.effect.blind=function(s,n){var o,a,r,h=t(this),l=["position","top","bottom","left","right","height","width"],c=t.effects.setMode(h,s.mode||"hide"),u=s.direction||"up",d=e.test(u),p=d?"height":"width",f=d?"top":"left",g=i.test(u),m={},v="show"===c;h.parent().is(".ui-effects-wrapper")?t.effects.save(h.parent(),l):t.effects.save(h,l),h.show(),o=t.effects.createWrapper(h).css({overflow:"hidden"}),a=o[p](),r=parseFloat(o.css(f))||0,m[p]=v?a:0,g||(h.css(d?"bottom":"right",0).css(d?"top":"left","auto").css({position:"absolute"}),m[f]=v?r:a+r),v&&(o.css(p,0),g||o.css(f,r+a)),o.animate(m,{duration:s.duration,easing:s.easing,queue:!1,complete:function(){"hide"===c&&h.hide(),t.effects.restore(h,l),t.effects.removeWrapper(h),n()}})}}(jQuery),function(t){t.effects.effect.bounce=function(e,i){var s,n,o,a=t(this),r=["position","top","bottom","left","right","height","width"],h=t.effects.setMode(a,e.mode||"effect"),l="hide"===h,c="show"===h,u=e.direction||"up",d=e.distance,p=e.times||5,f=2*p+(c||l?1:0),g=e.duration/f,m=e.easing,v="up"===u||"down"===u?"top":"left",_="up"===u||"left"===u,b=a.queue(),y=b.length;for((c||l)&&r.push("opacity"),t.effects.save(a,r),a.show(),t.effects.createWrapper(a),d||(d=a["top"===v?"outerHeight":"outerWidth"]()/3),c&&(o={opacity:1},o[v]=0,a.css("opacity",0).css(v,_?2*-d:2*d).animate(o,g,m)),l&&(d/=Math.pow(2,p-1)),o={},o[v]=0,s=0;p>s;s++)n={},n[v]=(_?"-=":"+=")+d,a.animate(n,g,m).animate(o,g,m),d=l?2*d:d/2;l&&(n={opacity:0},n[v]=(_?"-=":"+=")+d,a.animate(n,g,m)),a.queue(function(){l&&a.hide(),t.effects.restore(a,r),t.effects.removeWrapper(a),i()}),y>1&&b.splice.apply(b,[1,0].concat(b.splice(y,f+1))),a.dequeue()}}(jQuery),function(t){t.effects.effect.clip=function(e,i){var s,n,o,a=t(this),r=["position","top","bottom","left","right","height","width"],h=t.effects.setMode(a,e.mode||"hide"),l="show"===h,c=e.direction||"vertical",u="vertical"===c,d=u?"height":"width",p=u?"top":"left",f={};t.effects.save(a,r),a.show(),s=t.effects.createWrapper(a).css({overflow:"hidden"}),n="IMG"===a[0].tagName?s:a,o=n[d](),l&&(n.css(d,0),n.css(p,o/2)),f[d]=l?o:0,f[p]=l?0:o/2,n.animate(f,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){l||a.hide(),t.effects.restore(a,r),t.effects.removeWrapper(a),i()}})}}(jQuery),function(t){t.effects.effect.drop=function(e,i){var s,n=t(this),o=["position","top","bottom","left","right","opacity","height","width"],a=t.effects.setMode(n,e.mode||"hide"),r="show"===a,h=e.direction||"left",l="up"===h||"down"===h?"top":"left",c="up"===h||"left"===h?"pos":"neg",u={opacity:r?1:0};t.effects.save(n,o),n.show(),t.effects.createWrapper(n),s=e.distance||n["top"===l?"outerHeight":"outerWidth"](!0)/2,r&&n.css("opacity",0).css(l,"pos"===c?-s:s),u[l]=(r?"pos"===c?"+=":"-=":"pos"===c?"-=":"+=")+s,n.animate(u,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){"hide"===a&&n.hide(),t.effects.restore(n,o),t.effects.removeWrapper(n),i()}})}}(jQuery),function(t){t.effects.effect.explode=function(e,i){function s(){b.push(this),b.length===u*d&&n()}function n(){p.css({visibility:"visible"}),t(b).remove(),g||p.hide(),i()}var o,a,r,h,l,c,u=e.pieces?Math.round(Math.sqrt(e.pieces)):3,d=u,p=t(this),f=t.effects.setMode(p,e.mode||"hide"),g="show"===f,m=p.show().css("visibility","hidden").offset(),v=Math.ceil(p.outerWidth()/d),_=Math.ceil(p.outerHeight()/u),b=[];for(o=0;u>o;o++)for(h=m.top+o*_,c=o-(u-1)/2,a=0;d>a;a++)r=m.left+a*v,l=a-(d-1)/2,p.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-a*v,top:-o*_}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:v,height:_,left:r+(g?l*v:0),top:h+(g?c*_:0),opacity:g?0:1}).animate({left:r+(g?0:l*v),top:h+(g?0:c*_),opacity:g?1:0},e.duration||500,e.easing,s)}}(jQuery),function(t){t.effects.effect.fade=function(e,i){var s=t(this),n=t.effects.setMode(s,e.mode||"toggle");s.animate({opacity:n},{queue:!1,duration:e.duration,easing:e.easing,complete:i})}}(jQuery),function(t){t.effects.effect.fold=function(e,i){var s,n,o=t(this),a=["position","top","bottom","left","right","height","width"],r=t.effects.setMode(o,e.mode||"hide"),h="show"===r,l="hide"===r,c=e.size||15,u=/([0-9]+)%/.exec(c),d=!!e.horizFirst,p=h!==d,f=p?["width","height"]:["height","width"],g=e.duration/2,m={},v={};t.effects.save(o,a),o.show(),s=t.effects.createWrapper(o).css({overflow:"hidden"}),n=p?[s.width(),s.height()]:[s.height(),s.width()],u&&(c=parseInt(u[1],10)/100*n[l?0:1]),h&&s.css(d?{height:0,width:c}:{height:c,width:0}),m[f[0]]=h?n[0]:c,v[f[1]]=h?n[1]:0,s.animate(m,g,e.easing).animate(v,g,e.easing,function(){l&&o.hide(),t.effects.restore(o,a),t.effects.removeWrapper(o),i()})}}(jQuery),function(t){t.effects.effect.highlight=function(e,i){var s=t(this),n=["backgroundImage","backgroundColor","opacity"],o=t.effects.setMode(s,e.mode||"show"),a={backgroundColor:s.css("backgroundColor")};"hide"===o&&(a.opacity=0),t.effects.save(s,n),s.show().css({backgroundImage:"none",backgroundColor:e.color||"#ffff99"}).animate(a,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){"hide"===o&&s.hide(),t.effects.restore(s,n),i()}})}}(jQuery),function(t){t.effects.effect.pulsate=function(e,i){var s,n=t(this),o=t.effects.setMode(n,e.mode||"show"),a="show"===o,r="hide"===o,h=a||"hide"===o,l=2*(e.times||5)+(h?1:0),c=e.duration/l,u=0,d=n.queue(),p=d.length;for((a||!n.is(":visible"))&&(n.css("opacity",0).show(),u=1),s=1;l>s;s++)n.animate({opacity:u},c,e.easing),u=1-u;n.animate({opacity:u},c,e.easing),n.queue(function(){r&&n.hide(),i()}),p>1&&d.splice.apply(d,[1,0].concat(d.splice(p,l+1))),n.dequeue()}}(jQuery),function(t){t.effects.effect.puff=function(e,i){var s=t(this),n=t.effects.setMode(s,e.mode||"hide"),o="hide"===n,a=parseInt(e.percent,10)||150,r=a/100,h={height:s.height(),width:s.width(),outerHeight:s.outerHeight(),outerWidth:s.outerWidth()};t.extend(e,{effect:"scale",queue:!1,fade:!0,mode:n,complete:i,percent:o?a:100,from:o?h:{height:h.height*r,width:h.width*r,outerHeight:h.outerHeight*r,outerWidth:h.outerWidth*r}}),s.effect(e)},t.effects.effect.scale=function(e,i){var s=t(this),n=t.extend(!0,{},e),o=t.effects.setMode(s,e.mode||"effect"),a=parseInt(e.percent,10)||(0===parseInt(e.percent,10)?0:"hide"===o?0:100),r=e.direction||"both",h=e.origin,l={height:s.height(),width:s.width(),outerHeight:s.outerHeight(),outerWidth:s.outerWidth()},c={y:"horizontal"!==r?a/100:1,x:"vertical"!==r?a/100:1};n.effect="size",n.queue=!1,n.complete=i,"effect"!==o&&(n.origin=h||["middle","center"],n.restore=!0),n.from=e.from||("show"===o?{height:0,width:0,outerHeight:0,outerWidth:0}:l),n.to={height:l.height*c.y,width:l.width*c.x,outerHeight:l.outerHeight*c.y,outerWidth:l.outerWidth*c.x},n.fade&&("show"===o&&(n.from.opacity=0,n.to.opacity=1),"hide"===o&&(n.from.opacity=1,n.to.opacity=0)),s.effect(n)},t.effects.effect.size=function(e,i){var s,n,o,a=t(this),r=["position","top","bottom","left","right","width","height","overflow","opacity"],h=["position","top","bottom","left","right","overflow","opacity"],l=["width","height","overflow"],c=["fontSize"],u=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],d=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],p=t.effects.setMode(a,e.mode||"effect"),f=e.restore||"effect"!==p,g=e.scale||"both",m=e.origin||["middle","center"],v=a.css("position"),_=f?r:h,b={height:0,width:0,outerHeight:0,outerWidth:0};"show"===p&&a.show(),s={height:a.height(),width:a.width(),outerHeight:a.outerHeight(),outerWidth:a.outerWidth()},"toggle"===e.mode&&"show"===p?(a.from=e.to||b,a.to=e.from||s):(a.from=e.from||("show"===p?b:s),a.to=e.to||("hide"===p?b:s)),o={from:{y:a.from.height/s.height,x:a.from.width/s.width},to:{y:a.to.height/s.height,x:a.to.width/s.width}},("box"===g||"both"===g)&&(o.from.y!==o.to.y&&(_=_.concat(u),a.from=t.effects.setTransition(a,u,o.from.y,a.from),a.to=t.effects.setTransition(a,u,o.to.y,a.to)),o.from.x!==o.to.x&&(_=_.concat(d),a.from=t.effects.setTransition(a,d,o.from.x,a.from),a.to=t.effects.setTransition(a,d,o.to.x,a.to))),("content"===g||"both"===g)&&o.from.y!==o.to.y&&(_=_.concat(c).concat(l),a.from=t.effects.setTransition(a,c,o.from.y,a.from),a.to=t.effects.setTransition(a,c,o.to.y,a.to)),t.effects.save(a,_),a.show(),t.effects.createWrapper(a),a.css("overflow","hidden").css(a.from),m&&(n=t.effects.getBaseline(m,s),a.from.top=(s.outerHeight-a.outerHeight())*n.y,a.from.left=(s.outerWidth-a.outerWidth())*n.x,a.to.top=(s.outerHeight-a.to.outerHeight)*n.y,a.to.left=(s.outerWidth-a.to.outerWidth)*n.x),a.css(a.from),("content"===g||"both"===g)&&(u=u.concat(["marginTop","marginBottom"]).concat(c),d=d.concat(["marginLeft","marginRight"]),l=r.concat(u).concat(d),a.find("*[width]").each(function(){var i=t(this),s={height:i.height(),width:i.width(),outerHeight:i.outerHeight(),outerWidth:i.outerWidth()};f&&t.effects.save(i,l),i.from={height:s.height*o.from.y,width:s.width*o.from.x,outerHeight:s.outerHeight*o.from.y,outerWidth:s.outerWidth*o.from.x},i.to={height:s.height*o.to.y,width:s.width*o.to.x,outerHeight:s.height*o.to.y,outerWidth:s.width*o.to.x},o.from.y!==o.to.y&&(i.from=t.effects.setTransition(i,u,o.from.y,i.from),i.to=t.effects.setTransition(i,u,o.to.y,i.to)),o.from.x!==o.to.x&&(i.from=t.effects.setTransition(i,d,o.from.x,i.from),i.to=t.effects.setTransition(i,d,o.to.x,i.to)),i.css(i.from),i.animate(i.to,e.duration,e.easing,function(){f&&t.effects.restore(i,l)})})),a.animate(a.to,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){0===a.to.opacity&&a.css("opacity",a.from.opacity),"hide"===p&&a.hide(),t.effects.restore(a,_),f||("static"===v?a.css({position:"relative",top:a.to.top,left:a.to.left}):t.each(["top","left"],function(t,e){a.css(e,function(e,i){var s=parseInt(i,10),n=t?a.to.left:a.to.top;return"auto"===i?n+"px":s+n+"px"})})),t.effects.removeWrapper(a),i()}})}}(jQuery),function(t){t.effects.effect.shake=function(e,i){var s,n=t(this),o=["position","top","bottom","left","right","height","width"],a=t.effects.setMode(n,e.mode||"effect"),r=e.direction||"left",h=e.distance||20,l=e.times||3,c=2*l+1,u=Math.round(e.duration/c),d="up"===r||"down"===r?"top":"left",p="up"===r||"left"===r,f={},g={},m={},v=n.queue(),_=v.length;for(t.effects.save(n,o),n.show(),t.effects.createWrapper(n),f[d]=(p?"-=":"+=")+h,g[d]=(p?"+=":"-=")+2*h,m[d]=(p?"-=":"+=")+2*h,n.animate(f,u,e.easing),s=1;l>s;s++)n.animate(g,u,e.easing).animate(m,u,e.easing);n.animate(g,u,e.easing).animate(f,u/2,e.easing).queue(function(){"hide"===a&&n.hide(),t.effects.restore(n,o),t.effects.removeWrapper(n),i()}),_>1&&v.splice.apply(v,[1,0].concat(v.splice(_,c+1))),n.dequeue()}}(jQuery),function(t){t.effects.effect.slide=function(e,i){var s,n=t(this),o=["position","top","bottom","left","right","width","height"],a=t.effects.setMode(n,e.mode||"show"),r="show"===a,h=e.direction||"left",l="up"===h||"down"===h?"top":"left",c="up"===h||"left"===h,u={};t.effects.save(n,o),n.show(),s=e.distance||n["top"===l?"outerHeight":"outerWidth"](!0),t.effects.createWrapper(n).css({overflow:"hidden"}),r&&n.css(l,c?isNaN(s)?"-"+s:-s:s),u[l]=(r?c?"+=":"-=":c?"-=":"+=")+s,n.animate(u,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){"hide"===a&&n.hide(),t.effects.restore(n,o),t.effects.removeWrapper(n),i()}})}}(jQuery),function(t){t.effects.effect.transfer=function(e,i){var s=t(this),n=t(e.to),o="fixed"===n.css("position"),a=t("body"),r=o?a.scrollTop():0,h=o?a.scrollLeft():0,l=n.offset(),c={top:l.top-r,left:l.left-h,height:n.innerHeight(),width:n.innerWidth()},u=s.offset(),d=t("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(e.className).css({top:u.top-r,left:u.left-h,height:s.innerHeight(),width:s.innerWidth(),position:o?"fixed":"absolute"}).animate(c,e.duration,e.easing,function(){d.remove(),i()})}}(jQuery),function(t){t.widget("ui.menu",{version:"1.10.3",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-carat-1-e"},menus:"ul",position:{my:"left top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.mouseHandled=!1,this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length).attr({role:this.options.role,tabIndex:0}).bind("click"+this.eventNamespace,t.proxy(function(t){this.options.disabled&&t.preventDefault()},this)),this.options.disabled&&this.element.addClass("ui-state-disabled").attr("aria-disabled","true"),this._on({"mousedown .ui-menu-item > a":function(t){t.preventDefault()},"click .ui-state-disabled > a":function(t){t.preventDefault()},"click .ui-menu-item:has(a)":function(e){var i=t(e.target).closest(".ui-menu-item");!this.mouseHandled&&i.not(".ui-state-disabled").length&&(this.mouseHandled=!0,this.select(e),i.has(".ui-menu").length?this.expand(e):this.element.is(":focus")||(this.element.trigger("focus",[!0]),this.active&&1===this.active.parents(".ui-menu").length&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(e){var i=t(e.currentTarget);i.siblings().children(".ui-state-active").removeClass("ui-state-active"),this.focus(e,i)},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(t,e){var i=this.active||this.element.children(".ui-menu-item").eq(0);e||this.focus(t,i)},blur:function(e){this._delay(function(){t.contains(this.element[0],this.document[0].activeElement)||this.collapseAll(e)})},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(e){t(e.target).closest(".ui-menu").length||this.collapseAll(e),this.mouseHandled=!1}})},_destroy:function(){this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(),this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function(){var e=t(this);e.data("ui-menu-submenu-carat")&&e.remove()}),this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")},_keydown:function(e){function i(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}var s,n,o,a,r,h=!0;switch(e.keyCode){case t.ui.keyCode.PAGE_UP:this.previousPage(e);break;case t.ui.keyCode.PAGE_DOWN:this.nextPage(e);break;case t.ui.keyCode.HOME:this._move("first","first",e);break;case t.ui.keyCode.END:this._move("last","last",e);break;case t.ui.keyCode.UP:this.previous(e);break;case t.ui.keyCode.DOWN:this.next(e);break;case t.ui.keyCode.LEFT:this.collapse(e);break;case t.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(e);break;case t.ui.keyCode.ENTER:case t.ui.keyCode.SPACE:this._activate(e);break;case t.ui.keyCode.ESCAPE:this.collapse(e);break;default:h=!1,n=this.previousFilter||"",o=String.fromCharCode(e.keyCode),a=!1,clearTimeout(this.filterTimer),o===n?a=!0:o=n+o,r=RegExp("^"+i(o),"i"),s=this.activeMenu.children(".ui-menu-item").filter(function(){return r.test(t(this).children("a").text())}),s=a&&-1!==s.index(this.active.next())?this.active.nextAll(".ui-menu-item"):s,s.length||(o=String.fromCharCode(e.keyCode),r=RegExp("^"+i(o),"i"),s=this.activeMenu.children(".ui-menu-item").filter(function(){return r.test(t(this).children("a").text())})),s.length?(this.focus(e,s),s.length>1?(this.previousFilter=o,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter):delete this.previousFilter}h&&e.preventDefault()},_activate:function(t){this.active.is(".ui-state-disabled")||(this.active.children("a[aria-haspopup='true']").length?this.expand(t):this.select(t))},refresh:function(){var e,i=this.options.icons.submenu,s=this.element.find(this.options.menus);s.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var e=t(this),s=e.prev("a"),n=t("<span>").addClass("ui-menu-icon ui-icon "+i).data("ui-menu-submenu-carat",!0);s.attr("aria-haspopup","true").prepend(n),e.attr("aria-labelledby",s.attr("id"))}),e=s.add(this.element),e.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","presentation").children("a").uniqueId().addClass("ui-corner-all").attr({tabIndex:-1,role:this._itemRole()}),e.children(":not(.ui-menu-item)").each(function(){var e=t(this);/[^\-\u2014\u2013\s]/.test(e.text())||e.addClass("ui-widget-content ui-menu-divider")}),e.children(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!t.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},_setOption:function(t,e){"icons"===t&&this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(e.submenu),this._super(t,e)},focus:function(t,e){var i,s;this.blur(t,t&&"focus"===t.type),this._scrollIntoView(e),this.active=e.first(),s=this.active.children("a").addClass("ui-state-focus"),this.options.role&&this.element.attr("aria-activedescendant",s.attr("id")),this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"),t&&"keydown"===t.type?this._close():this.timer=this._delay(function(){this._close()},this.delay),i=e.children(".ui-menu"),i.length&&/^mouse/.test(t.type)&&this._startOpening(i),this.activeMenu=e.parent(),this._trigger("focus",t,{item:e})},_scrollIntoView:function(e){var i,s,n,o,a,r;this._hasScroll()&&(i=parseFloat(t.css(this.activeMenu[0],"borderTopWidth"))||0,s=parseFloat(t.css(this.activeMenu[0],"paddingTop"))||0,n=e.offset().top-this.activeMenu.offset().top-i-s,o=this.activeMenu.scrollTop(),a=this.activeMenu.height(),r=e.height(),0>n?this.activeMenu.scrollTop(o+n):n+r>a&&this.activeMenu.scrollTop(o+n-a+r))},blur:function(t,e){e||clearTimeout(this.timer),this.active&&(this.active.children("a").removeClass("ui-state-focus"),this.active=null,this._trigger("blur",t,{item:this.active}))},_startOpening:function(t){clearTimeout(this.timer),"true"===t.attr("aria-hidden")&&(this.timer=this._delay(function(){this._close(),this._open(t)},this.delay))},_open:function(e){var i=t.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden","true"),e.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(i)},collapseAll:function(e,i){clearTimeout(this.timer),this.timer=this._delay(function(){var s=i?this.element:t(e&&e.target).closest(this.element.find(".ui-menu"));s.length||(s=this.element),this._close(s),this.blur(e),this.activeMenu=s},this.delay)},_close:function(t){t||(t=this.active?this.active.parent():this.element),t.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false").end().find("a.ui-state-active").removeClass("ui-state-active")},collapse:function(t){var e=this.active&&this.active.parent().closest(".ui-menu-item",this.element);e&&e.length&&(this._close(),this.focus(t,e))},expand:function(t){var e=this.active&&this.active.children(".ui-menu ").children(".ui-menu-item").first();e&&e.length&&(this._open(e.parent()),this._delay(function(){this.focus(t,e)}))},next:function(t){this._move("next","first",t)},previous:function(t){this._move("prev","last",t)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(t,e,i){var s;this.active&&(s="first"===t||"last"===t?this.active["first"===t?"prevAll":"nextAll"](".ui-menu-item").eq(-1):this.active[t+"All"](".ui-menu-item").eq(0)),s&&s.length&&this.active||(s=this.activeMenu.children(".ui-menu-item")[e]()),this.focus(i,s)},nextPage:function(e){var i,s,n;return this.active?(this.isLastItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return i=t(this),0>i.offset().top-s-n}),this.focus(e,i)):this.focus(e,this.activeMenu.children(".ui-menu-item")[this.active?"last":"first"]())),undefined):(this.next(e),undefined)},previousPage:function(e){var i,s,n;return this.active?(this.isFirstItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return i=t(this),i.offset().top-s+n>0}),this.focus(e,i)):this.focus(e,this.activeMenu.children(".ui-menu-item").first())),undefined):(this.next(e),undefined)},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(e){this.active=this.active||t(e.target).closest(".ui-menu-item");var i={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(e,!0),this._trigger("select",e,i)}})}(jQuery),function(t,e){function i(t,e,i){return[parseFloat(t[0])*(p.test(t[0])?e/100:1),parseFloat(t[1])*(p.test(t[1])?i/100:1)]}function s(e,i){return parseInt(t.css(e,i),10)||0}function n(e){var i=e[0];return 9===i.nodeType?{width:e.width(),height:e.height(),offset:{top:0,left:0}}:t.isWindow(i)?{width:e.width(),height:e.height(),offset:{top:e.scrollTop(),left:e.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:e.outerWidth(),height:e.outerHeight(),offset:e.offset()}}t.ui=t.ui||{};var o,a=Math.max,r=Math.abs,h=Math.round,l=/left|center|right/,c=/top|center|bottom/,u=/[\+\-]\d+(\.[\d]+)?%?/,d=/^\w+/,p=/%$/,f=t.fn.position;t.position={scrollbarWidth:function(){if(o!==e)return o;var i,s,n=t("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),a=n.children()[0];return t("body").append(n),i=a.offsetWidth,n.css("overflow","scroll"),s=a.offsetWidth,i===s&&(s=n[0].clientWidth),n.remove(),o=i-s},getScrollInfo:function(e){var i=e.isWindow?"":e.element.css("overflow-x"),s=e.isWindow?"":e.element.css("overflow-y"),n="scroll"===i||"auto"===i&&e.width<e.element[0].scrollWidth,o="scroll"===s||"auto"===s&&e.height<e.element[0].scrollHeight;return{width:o?t.position.scrollbarWidth():0,height:n?t.position.scrollbarWidth():0}},getWithinInfo:function(e){var i=t(e||window),s=t.isWindow(i[0]);return{element:i,isWindow:s,offset:i.offset()||{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:s?i.width():i.outerWidth(),height:s?i.height():i.outerHeight()}}},t.fn.position=function(e){if(!e||!e.of)return f.apply(this,arguments);e=t.extend({},e);var o,p,g,m,v,_,b=t(e.of),y=t.position.getWithinInfo(e.within),w=t.position.getScrollInfo(y),k=(e.collision||"flip").split(" "),x={};return _=n(b),b[0].preventDefault&&(e.at="left top"),p=_.width,g=_.height,m=_.offset,v=t.extend({},m),t.each(["my","at"],function(){var t,i,s=(e[this]||"").split(" ");1===s.length&&(s=l.test(s[0])?s.concat(["center"]):c.test(s[0])?["center"].concat(s):["center","center"]),s[0]=l.test(s[0])?s[0]:"center",s[1]=c.test(s[1])?s[1]:"center",t=u.exec(s[0]),i=u.exec(s[1]),x[this]=[t?t[0]:0,i?i[0]:0],e[this]=[d.exec(s[0])[0],d.exec(s[1])[0]]}),1===k.length&&(k[1]=k[0]),"right"===e.at[0]?v.left+=p:"center"===e.at[0]&&(v.left+=p/2),"bottom"===e.at[1]?v.top+=g:"center"===e.at[1]&&(v.top+=g/2),o=i(x.at,p,g),v.left+=o[0],v.top+=o[1],this.each(function(){var n,l,c=t(this),u=c.outerWidth(),d=c.outerHeight(),f=s(this,"marginLeft"),_=s(this,"marginTop"),D=u+f+s(this,"marginRight")+w.width,C=d+_+s(this,"marginBottom")+w.height,I=t.extend({},v),P=i(x.my,c.outerWidth(),c.outerHeight());"right"===e.my[0]?I.left-=u:"center"===e.my[0]&&(I.left-=u/2),"bottom"===e.my[1]?I.top-=d:"center"===e.my[1]&&(I.top-=d/2),I.left+=P[0],I.top+=P[1],t.support.offsetFractions||(I.left=h(I.left),I.top=h(I.top)),n={marginLeft:f,marginTop:_},t.each(["left","top"],function(i,s){t.ui.position[k[i]]&&t.ui.position[k[i]][s](I,{targetWidth:p,targetHeight:g,elemWidth:u,elemHeight:d,collisionPosition:n,collisionWidth:D,collisionHeight:C,offset:[o[0]+P[0],o[1]+P[1]],my:e.my,at:e.at,within:y,elem:c})}),e.using&&(l=function(t){var i=m.left-I.left,s=i+p-u,n=m.top-I.top,o=n+g-d,h={target:{element:b,left:m.left,top:m.top,width:p,height:g},element:{element:c,left:I.left,top:I.top,width:u,height:d},horizontal:0>s?"left":i>0?"right":"center",vertical:0>o?"top":n>0?"bottom":"middle"};u>p&&p>r(i+s)&&(h.horizontal="center"),d>g&&g>r(n+o)&&(h.vertical="middle"),h.important=a(r(i),r(s))>a(r(n),r(o))?"horizontal":"vertical",e.using.call(this,t,h)}),c.offset(t.extend(I,{using:l}))})},t.ui.position={fit:{left:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollLeft:s.offset.left,o=s.width,r=t.left-e.collisionPosition.marginLeft,h=n-r,l=r+e.collisionWidth-o-n;e.collisionWidth>o?h>0&&0>=l?(i=t.left+h+e.collisionWidth-o-n,t.left+=h-i):t.left=l>0&&0>=h?n:h>l?n+o-e.collisionWidth:n:h>0?t.left+=h:l>0?t.left-=l:t.left=a(t.left-r,t.left)},top:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollTop:s.offset.top,o=e.within.height,r=t.top-e.collisionPosition.marginTop,h=n-r,l=r+e.collisionHeight-o-n;e.collisionHeight>o?h>0&&0>=l?(i=t.top+h+e.collisionHeight-o-n,t.top+=h-i):t.top=l>0&&0>=h?n:h>l?n+o-e.collisionHeight:n:h>0?t.top+=h:l>0?t.top-=l:t.top=a(t.top-r,t.top)}},flip:{left:function(t,e){var i,s,n=e.within,o=n.offset.left+n.scrollLeft,a=n.width,h=n.isWindow?n.scrollLeft:n.offset.left,l=t.left-e.collisionPosition.marginLeft,c=l-h,u=l+e.collisionWidth-a-h,d="left"===e.my[0]?-e.elemWidth:"right"===e.my[0]?e.elemWidth:0,p="left"===e.at[0]?e.targetWidth:"right"===e.at[0]?-e.targetWidth:0,f=-2*e.offset[0];0>c?(i=t.left+d+p+f+e.collisionWidth-a-o,(0>i||r(c)>i)&&(t.left+=d+p+f)):u>0&&(s=t.left-e.collisionPosition.marginLeft+d+p+f-h,(s>0||u>r(s))&&(t.left+=d+p+f))},top:function(t,e){var i,s,n=e.within,o=n.offset.top+n.scrollTop,a=n.height,h=n.isWindow?n.scrollTop:n.offset.top,l=t.top-e.collisionPosition.marginTop,c=l-h,u=l+e.collisionHeight-a-h,d="top"===e.my[1],p=d?-e.elemHeight:"bottom"===e.my[1]?e.elemHeight:0,f="top"===e.at[1]?e.targetHeight:"bottom"===e.at[1]?-e.targetHeight:0,g=-2*e.offset[1];0>c?(s=t.top+p+f+g+e.collisionHeight-a-o,t.top+p+f+g>c&&(0>s||r(c)>s)&&(t.top+=p+f+g)):u>0&&(i=t.top-e.collisionPosition.marginTop+p+f+g-h,t.top+p+f+g>u&&(i>0||u>r(i))&&(t.top+=p+f+g))}},flipfit:{left:function(){t.ui.position.flip.left.apply(this,arguments),t.ui.position.fit.left.apply(this,arguments)},top:function(){t.ui.position.flip.top.apply(this,arguments),t.ui.position.fit.top.apply(this,arguments)}}},function(){var e,i,s,n,o,a=document.getElementsByTagName("body")[0],r=document.createElement("div");e=document.createElement(a?"div":"body"),s={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},a&&t.extend(s,{position:"absolute",left:"-1000px",top:"-1000px"});for(o in s)e.style[o]=s[o];e.appendChild(r),i=a||document.documentElement,i.insertBefore(e,i.firstChild),r.style.cssText="position: absolute; left: 10.7432222px;",n=t(r).offset().left,t.support.offsetFractions=n>10&&11>n,e.innerHTML="",i.removeChild(e)}()}(jQuery),function(t,e){t.widget("ui.progressbar",{version:"1.10.3",options:{max:100,value:0,change:null,complete:null},min:0,_create:function(){this.oldValue=this.options.value=this._constrainedValue(),this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min}),this.valueDiv=t("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element),this._refreshValue()},_destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.valueDiv.remove()
},value:function(t){return t===e?this.options.value:(this.options.value=this._constrainedValue(t),this._refreshValue(),e)},_constrainedValue:function(t){return t===e&&(t=this.options.value),this.indeterminate=t===!1,"number"!=typeof t&&(t=0),this.indeterminate?!1:Math.min(this.options.max,Math.max(this.min,t))},_setOptions:function(t){var e=t.value;delete t.value,this._super(t),this.options.value=this._constrainedValue(e),this._refreshValue()},_setOption:function(t,e){"max"===t&&(e=Math.max(this.min,e)),this._super(t,e)},_percentage:function(){return this.indeterminate?100:100*(this.options.value-this.min)/(this.options.max-this.min)},_refreshValue:function(){var e=this.options.value,i=this._percentage();this.valueDiv.toggle(this.indeterminate||e>this.min).toggleClass("ui-corner-right",e===this.options.max).width(i.toFixed(0)+"%"),this.element.toggleClass("ui-progressbar-indeterminate",this.indeterminate),this.indeterminate?(this.element.removeAttr("aria-valuenow"),this.overlayDiv||(this.overlayDiv=t("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv))):(this.element.attr({"aria-valuemax":this.options.max,"aria-valuenow":e}),this.overlayDiv&&(this.overlayDiv.remove(),this.overlayDiv=null)),this.oldValue!==e&&(this.oldValue=e,this._trigger("change")),e===this.options.max&&this._trigger("complete")}})}(jQuery),function(t){var e=5;t.widget("ui.slider",t.ui.mouse,{version:"1.10.3",widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null,change:null,slide:null,start:null,stop:null},_create:function(){this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget"+" ui-widget-content"+" ui-corner-all"),this._refresh(),this._setOption("disabled",this.options.disabled),this._animateOff=!1},_refresh:function(){this._createRange(),this._createHandles(),this._setupEvents(),this._refreshValue()},_createHandles:function(){var e,i,s=this.options,n=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),o="<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",a=[];for(i=s.values&&s.values.length||1,n.length>i&&(n.slice(i).remove(),n=n.slice(0,i)),e=n.length;i>e;e++)a.push(o);this.handles=n.add(t(a.join("")).appendTo(this.element)),this.handle=this.handles.eq(0),this.handles.each(function(e){t(this).data("ui-slider-handle-index",e)})},_createRange:function(){var e=this.options,i="";e.range?(e.range===!0&&(e.values?e.values.length&&2!==e.values.length?e.values=[e.values[0],e.values[0]]:t.isArray(e.values)&&(e.values=e.values.slice(0)):e.values=[this._valueMin(),this._valueMin()]),this.range&&this.range.length?this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({left:"",bottom:""}):(this.range=t("<div></div>").appendTo(this.element),i="ui-slider-range ui-widget-header ui-corner-all"),this.range.addClass(i+("min"===e.range||"max"===e.range?" ui-slider-range-"+e.range:""))):this.range=t([])},_setupEvents:function(){var t=this.handles.add(this.range).filter("a");this._off(t),this._on(t,this._handleEvents),this._hoverable(t),this._focusable(t)},_destroy:function(){this.handles.remove(),this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"),this._mouseDestroy()},_mouseCapture:function(e){var i,s,n,o,a,r,h,l,c=this,u=this.options;return u.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),i={x:e.pageX,y:e.pageY},s=this._normValueFromMouse(i),n=this._valueMax()-this._valueMin()+1,this.handles.each(function(e){var i=Math.abs(s-c.values(e));(n>i||n===i&&(e===c._lastChangedValue||c.values(e)===u.min))&&(n=i,o=t(this),a=e)}),r=this._start(e,a),r===!1?!1:(this._mouseSliding=!0,this._handleIndex=a,o.addClass("ui-state-active").focus(),h=o.offset(),l=!t(e.target).parents().addBack().is(".ui-slider-handle"),this._clickOffset=l?{left:0,top:0}:{left:e.pageX-h.left-o.width()/2,top:e.pageY-h.top-o.height()/2-(parseInt(o.css("borderTopWidth"),10)||0)-(parseInt(o.css("borderBottomWidth"),10)||0)+(parseInt(o.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(e,a,s),this._animateOff=!0,!0))},_mouseStart:function(){return!0},_mouseDrag:function(t){var e={x:t.pageX,y:t.pageY},i=this._normValueFromMouse(e);return this._slide(t,this._handleIndex,i),!1},_mouseStop:function(t){return this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(t,this._handleIndex),this._change(t,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation="vertical"===this.options.orientation?"vertical":"horizontal"},_normValueFromMouse:function(t){var e,i,s,n,o;return"horizontal"===this.orientation?(e=this.elementSize.width,i=t.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(e=this.elementSize.height,i=t.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),s=i/e,s>1&&(s=1),0>s&&(s=0),"vertical"===this.orientation&&(s=1-s),n=this._valueMax()-this._valueMin(),o=this._valueMin()+s*n,this._trimAlignValue(o)},_start:function(t,e){var i={handle:this.handles[e],value:this.value()};return this.options.values&&this.options.values.length&&(i.value=this.values(e),i.values=this.values()),this._trigger("start",t,i)},_slide:function(t,e,i){var s,n,o;this.options.values&&this.options.values.length?(s=this.values(e?0:1),2===this.options.values.length&&this.options.range===!0&&(0===e&&i>s||1===e&&s>i)&&(i=s),i!==this.values(e)&&(n=this.values(),n[e]=i,o=this._trigger("slide",t,{handle:this.handles[e],value:i,values:n}),s=this.values(e?0:1),o!==!1&&this.values(e,i,!0))):i!==this.value()&&(o=this._trigger("slide",t,{handle:this.handles[e],value:i}),o!==!1&&this.value(i))},_stop:function(t,e){var i={handle:this.handles[e],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(e),i.values=this.values()),this._trigger("stop",t,i)},_change:function(t,e){if(!this._keySliding&&!this._mouseSliding){var i={handle:this.handles[e],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(e),i.values=this.values()),this._lastChangedValue=e,this._trigger("change",t,i)}},value:function(t){return arguments.length?(this.options.value=this._trimAlignValue(t),this._refreshValue(),this._change(null,0),undefined):this._value()},values:function(e,i){var s,n,o;if(arguments.length>1)return this.options.values[e]=this._trimAlignValue(i),this._refreshValue(),this._change(null,e),undefined;if(!arguments.length)return this._values();if(!t.isArray(arguments[0]))return this.options.values&&this.options.values.length?this._values(e):this.value();for(s=this.options.values,n=arguments[0],o=0;s.length>o;o+=1)s[o]=this._trimAlignValue(n[o]),this._change(null,o);this._refreshValue()},_setOption:function(e,i){var s,n=0;switch("range"===e&&this.options.range===!0&&("min"===i?(this.options.value=this._values(0),this.options.values=null):"max"===i&&(this.options.value=this._values(this.options.values.length-1),this.options.values=null)),t.isArray(this.options.values)&&(n=this.options.values.length),t.Widget.prototype._setOption.apply(this,arguments),e){case"orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue();break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":for(this._animateOff=!0,this._refreshValue(),s=0;n>s;s+=1)this._change(null,s);this._animateOff=!1;break;case"min":case"max":this._animateOff=!0,this._refreshValue(),this._animateOff=!1;break;case"range":this._animateOff=!0,this._refresh(),this._animateOff=!1}},_value:function(){var t=this.options.value;return t=this._trimAlignValue(t)},_values:function(t){var e,i,s;if(arguments.length)return e=this.options.values[t],e=this._trimAlignValue(e);if(this.options.values&&this.options.values.length){for(i=this.options.values.slice(),s=0;i.length>s;s+=1)i[s]=this._trimAlignValue(i[s]);return i}return[]},_trimAlignValue:function(t){if(this._valueMin()>=t)return this._valueMin();if(t>=this._valueMax())return this._valueMax();var e=this.options.step>0?this.options.step:1,i=(t-this._valueMin())%e,s=t-i;return 2*Math.abs(i)>=e&&(s+=i>0?e:-e),parseFloat(s.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},_refreshValue:function(){var e,i,s,n,o,a=this.options.range,r=this.options,h=this,l=this._animateOff?!1:r.animate,c={};this.options.values&&this.options.values.length?this.handles.each(function(s){i=100*((h.values(s)-h._valueMin())/(h._valueMax()-h._valueMin())),c["horizontal"===h.orientation?"left":"bottom"]=i+"%",t(this).stop(1,1)[l?"animate":"css"](c,r.animate),h.options.range===!0&&("horizontal"===h.orientation?(0===s&&h.range.stop(1,1)[l?"animate":"css"]({left:i+"%"},r.animate),1===s&&h.range[l?"animate":"css"]({width:i-e+"%"},{queue:!1,duration:r.animate})):(0===s&&h.range.stop(1,1)[l?"animate":"css"]({bottom:i+"%"},r.animate),1===s&&h.range[l?"animate":"css"]({height:i-e+"%"},{queue:!1,duration:r.animate}))),e=i}):(s=this.value(),n=this._valueMin(),o=this._valueMax(),i=o!==n?100*((s-n)/(o-n)):0,c["horizontal"===this.orientation?"left":"bottom"]=i+"%",this.handle.stop(1,1)[l?"animate":"css"](c,r.animate),"min"===a&&"horizontal"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({width:i+"%"},r.animate),"max"===a&&"horizontal"===this.orientation&&this.range[l?"animate":"css"]({width:100-i+"%"},{queue:!1,duration:r.animate}),"min"===a&&"vertical"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({height:i+"%"},r.animate),"max"===a&&"vertical"===this.orientation&&this.range[l?"animate":"css"]({height:100-i+"%"},{queue:!1,duration:r.animate}))},_handleEvents:{keydown:function(i){var s,n,o,a,r=t(i.target).data("ui-slider-handle-index");switch(i.keyCode){case t.ui.keyCode.HOME:case t.ui.keyCode.END:case t.ui.keyCode.PAGE_UP:case t.ui.keyCode.PAGE_DOWN:case t.ui.keyCode.UP:case t.ui.keyCode.RIGHT:case t.ui.keyCode.DOWN:case t.ui.keyCode.LEFT:if(i.preventDefault(),!this._keySliding&&(this._keySliding=!0,t(i.target).addClass("ui-state-active"),s=this._start(i,r),s===!1))return}switch(a=this.options.step,n=o=this.options.values&&this.options.values.length?this.values(r):this.value(),i.keyCode){case t.ui.keyCode.HOME:o=this._valueMin();break;case t.ui.keyCode.END:o=this._valueMax();break;case t.ui.keyCode.PAGE_UP:o=this._trimAlignValue(n+(this._valueMax()-this._valueMin())/e);break;case t.ui.keyCode.PAGE_DOWN:o=this._trimAlignValue(n-(this._valueMax()-this._valueMin())/e);break;case t.ui.keyCode.UP:case t.ui.keyCode.RIGHT:if(n===this._valueMax())return;o=this._trimAlignValue(n+a);break;case t.ui.keyCode.DOWN:case t.ui.keyCode.LEFT:if(n===this._valueMin())return;o=this._trimAlignValue(n-a)}this._slide(i,r,o)},click:function(t){t.preventDefault()},keyup:function(e){var i=t(e.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(e,i),this._change(e,i),t(e.target).removeClass("ui-state-active"))}}})}(jQuery),function(t){function e(t){return function(){var e=this.element.val();t.apply(this,arguments),this._refresh(),e!==this.element.val()&&this._trigger("change")}}t.widget("ui.spinner",{version:"1.10.3",defaultElement:"<input>",widgetEventPrefix:"spin",options:{culture:null,icons:{down:"ui-icon-triangle-1-s",up:"ui-icon-triangle-1-n"},incremental:!0,max:null,min:null,numberFormat:null,page:10,step:1,change:null,spin:null,start:null,stop:null},_create:function(){this._setOption("max",this.options.max),this._setOption("min",this.options.min),this._setOption("step",this.options.step),this._value(this.element.val(),!0),this._draw(),this._on(this._events),this._refresh(),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_getCreateOptions:function(){var e={},i=this.element;return t.each(["min","max","step"],function(t,s){var n=i.attr(s);void 0!==n&&n.length&&(e[s]=n)}),e},_events:{keydown:function(t){this._start(t)&&this._keydown(t)&&t.preventDefault()},keyup:"_stop",focus:function(){this.previous=this.element.val()},blur:function(t){return this.cancelBlur?(delete this.cancelBlur,void 0):(this._stop(),this._refresh(),this.previous!==this.element.val()&&this._trigger("change",t),void 0)},mousewheel:function(t,e){if(e){if(!this.spinning&&!this._start(t))return!1;this._spin((e>0?1:-1)*this.options.step,t),clearTimeout(this.mousewheelTimer),this.mousewheelTimer=this._delay(function(){this.spinning&&this._stop(t)},100),t.preventDefault()}},"mousedown .ui-spinner-button":function(e){function i(){var t=this.element[0]===this.document[0].activeElement;t||(this.element.focus(),this.previous=s,this._delay(function(){this.previous=s}))}var s;s=this.element[0]===this.document[0].activeElement?this.previous:this.element.val(),e.preventDefault(),i.call(this),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur,i.call(this)}),this._start(e)!==!1&&this._repeat(null,t(e.currentTarget).hasClass("ui-spinner-up")?1:-1,e)},"mouseup .ui-spinner-button":"_stop","mouseenter .ui-spinner-button":function(e){return t(e.currentTarget).hasClass("ui-state-active")?this._start(e)===!1?!1:(this._repeat(null,t(e.currentTarget).hasClass("ui-spinner-up")?1:-1,e),void 0):void 0},"mouseleave .ui-spinner-button":"_stop"},_draw:function(){var t=this.uiSpinner=this.element.addClass("ui-spinner-input").attr("autocomplete","off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());this.element.attr("role","spinbutton"),this.buttons=t.find(".ui-spinner-button").attr("tabIndex",-1).button().removeClass("ui-corner-all"),this.buttons.height()>Math.ceil(.5*t.height())&&t.height()>0&&t.height(t.height()),this.options.disabled&&this.disable()},_keydown:function(e){var i=this.options,s=t.ui.keyCode;switch(e.keyCode){case s.UP:return this._repeat(null,1,e),!0;case s.DOWN:return this._repeat(null,-1,e),!0;case s.PAGE_UP:return this._repeat(null,i.page,e),!0;case s.PAGE_DOWN:return this._repeat(null,-i.page,e),!0}return!1},_uiSpinnerHtml:function(){return"<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"},_buttonHtml:function(){return"<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon "+this.options.icons.up+"'>&#9650;</span>"+"</a>"+"<a class='ui-spinner-button ui-spinner-down ui-corner-br'>"+"<span class='ui-icon "+this.options.icons.down+"'>&#9660;</span>"+"</a>"},_start:function(t){return this.spinning||this._trigger("start",t)!==!1?(this.counter||(this.counter=1),this.spinning=!0,!0):!1},_repeat:function(t,e,i){t=t||500,clearTimeout(this.timer),this.timer=this._delay(function(){this._repeat(40,e,i)},t),this._spin(e*this.options.step,i)},_spin:function(t,e){var i=this.value()||0;this.counter||(this.counter=1),i=this._adjustValue(i+t*this._increment(this.counter)),this.spinning&&this._trigger("spin",e,{value:i})===!1||(this._value(i),this.counter++)},_increment:function(e){var i=this.options.incremental;return i?t.isFunction(i)?i(e):Math.floor(e*e*e/5e4-e*e/500+17*e/200+1):1},_precision:function(){var t=this._precisionOf(this.options.step);return null!==this.options.min&&(t=Math.max(t,this._precisionOf(this.options.min))),t},_precisionOf:function(t){var e=""+t,i=e.indexOf(".");return-1===i?0:e.length-i-1},_adjustValue:function(t){var e,i,s=this.options;return e=null!==s.min?s.min:0,i=t-e,i=Math.round(i/s.step)*s.step,t=e+i,t=parseFloat(t.toFixed(this._precision())),null!==s.max&&t>s.max?s.max:null!==s.min&&s.min>t?s.min:t},_stop:function(t){this.spinning&&(clearTimeout(this.timer),clearTimeout(this.mousewheelTimer),this.counter=0,this.spinning=!1,this._trigger("stop",t))},_setOption:function(t,e){if("culture"===t||"numberFormat"===t){var i=this._parse(this.element.val());return this.options[t]=e,this.element.val(this._format(i)),void 0}("max"===t||"min"===t||"step"===t)&&"string"==typeof e&&(e=this._parse(e)),"icons"===t&&(this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(e.up),this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(e.down)),this._super(t,e),"disabled"===t&&(e?(this.element.prop("disabled",!0),this.buttons.button("disable")):(this.element.prop("disabled",!1),this.buttons.button("enable")))},_setOptions:e(function(t){this._super(t),this._value(this.element.val())}),_parse:function(t){return"string"==typeof t&&""!==t&&(t=window.Globalize&&this.options.numberFormat?Globalize.parseFloat(t,10,this.options.culture):+t),""===t||isNaN(t)?null:t},_format:function(t){return""===t?"":window.Globalize&&this.options.numberFormat?Globalize.format(t,this.options.numberFormat,this.options.culture):t},_refresh:function(){this.element.attr({"aria-valuemin":this.options.min,"aria-valuemax":this.options.max,"aria-valuenow":this._parse(this.element.val())})},_value:function(t,e){var i;""!==t&&(i=this._parse(t),null!==i&&(e||(i=this._adjustValue(i)),t=this._format(i))),this.element.val(t),this._refresh()},_destroy:function(){this.element.removeClass("ui-spinner-input").prop("disabled",!1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.uiSpinner.replaceWith(this.element)},stepUp:e(function(t){this._stepUp(t)}),_stepUp:function(t){this._start()&&(this._spin((t||1)*this.options.step),this._stop())},stepDown:e(function(t){this._stepDown(t)}),_stepDown:function(t){this._start()&&(this._spin((t||1)*-this.options.step),this._stop())},pageUp:e(function(t){this._stepUp((t||1)*this.options.page)}),pageDown:e(function(t){this._stepDown((t||1)*this.options.page)}),value:function(t){return arguments.length?(e(this._value).call(this,t),void 0):this._parse(this.element.val())},widget:function(){return this.uiSpinner}})}(jQuery),function(t,e){function i(){return++n}function s(t){return t.hash.length>1&&decodeURIComponent(t.href.replace(o,""))===decodeURIComponent(location.href.replace(o,""))}var n=0,o=/#.*$/;t.widget("ui.tabs",{version:"1.10.3",delay:300,options:{active:null,collapsible:!1,event:"click",heightStyle:"content",hide:null,show:null,activate:null,beforeActivate:null,beforeLoad:null,load:null},_create:function(){var e=this,i=this.options;this.running=!1,this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible",i.collapsible).delegate(".ui-tabs-nav > li","mousedown"+this.eventNamespace,function(e){t(this).is(".ui-state-disabled")&&e.preventDefault()}).delegate(".ui-tabs-anchor","focus"+this.eventNamespace,function(){t(this).closest("li").is(".ui-state-disabled")&&this.blur()}),this._processTabs(),i.active=this._initialActive(),t.isArray(i.disabled)&&(i.disabled=t.unique(i.disabled.concat(t.map(this.tabs.filter(".ui-state-disabled"),function(t){return e.tabs.index(t)}))).sort()),this.active=this.options.active!==!1&&this.anchors.length?this._findActive(i.active):t(),this._refresh(),this.active.length&&this.load(i.active)},_initialActive:function(){var i=this.options.active,s=this.options.collapsible,n=location.hash.substring(1);return null===i&&(n&&this.tabs.each(function(s,o){return t(o).attr("aria-controls")===n?(i=s,!1):e}),null===i&&(i=this.tabs.index(this.tabs.filter(".ui-tabs-active"))),(null===i||-1===i)&&(i=this.tabs.length?0:!1)),i!==!1&&(i=this.tabs.index(this.tabs.eq(i)),-1===i&&(i=s?!1:0)),!s&&i===!1&&this.anchors.length&&(i=0),i},_getCreateEventData:function(){return{tab:this.active,panel:this.active.length?this._getPanelForTab(this.active):t()}},_tabKeydown:function(i){var s=t(this.document[0].activeElement).closest("li"),n=this.tabs.index(s),o=!0;if(!this._handlePageNav(i)){switch(i.keyCode){case t.ui.keyCode.RIGHT:case t.ui.keyCode.DOWN:n++;break;case t.ui.keyCode.UP:case t.ui.keyCode.LEFT:o=!1,n--;break;case t.ui.keyCode.END:n=this.anchors.length-1;break;case t.ui.keyCode.HOME:n=0;break;case t.ui.keyCode.SPACE:return i.preventDefault(),clearTimeout(this.activating),this._activate(n),e;case t.ui.keyCode.ENTER:return i.preventDefault(),clearTimeout(this.activating),this._activate(n===this.options.active?!1:n),e;default:return}i.preventDefault(),clearTimeout(this.activating),n=this._focusNextTab(n,o),i.ctrlKey||(s.attr("aria-selected","false"),this.tabs.eq(n).attr("aria-selected","true"),this.activating=this._delay(function(){this.option("active",n)},this.delay))}},_panelKeydown:function(e){this._handlePageNav(e)||e.ctrlKey&&e.keyCode===t.ui.keyCode.UP&&(e.preventDefault(),this.active.focus())},_handlePageNav:function(i){return i.altKey&&i.keyCode===t.ui.keyCode.PAGE_UP?(this._activate(this._focusNextTab(this.options.active-1,!1)),!0):i.altKey&&i.keyCode===t.ui.keyCode.PAGE_DOWN?(this._activate(this._focusNextTab(this.options.active+1,!0)),!0):e},_findNextTab:function(e,i){function s(){return e>n&&(e=0),0>e&&(e=n),e}for(var n=this.tabs.length-1;-1!==t.inArray(s(),this.options.disabled);)e=i?e+1:e-1;return e},_focusNextTab:function(t,e){return t=this._findNextTab(t,e),this.tabs.eq(t).focus(),t},_setOption:function(t,i){return"active"===t?(this._activate(i),e):"disabled"===t?(this._setupDisabled(i),e):(this._super(t,i),"collapsible"===t&&(this.element.toggleClass("ui-tabs-collapsible",i),i||this.options.active!==!1||this._activate(0)),"event"===t&&this._setupEvents(i),"heightStyle"===t&&this._setupHeightStyle(i),e)},_tabId:function(t){return t.attr("aria-controls")||"ui-tabs-"+i()},_sanitizeSelector:function(t){return t?t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g,"\\$&"):""},refresh:function(){var e=this.options,i=this.tablist.children(":has(a[href])");e.disabled=t.map(i.filter(".ui-state-disabled"),function(t){return i.index(t)}),this._processTabs(),e.active!==!1&&this.anchors.length?this.active.length&&!t.contains(this.tablist[0],this.active[0])?this.tabs.length===e.disabled.length?(e.active=!1,this.active=t()):this._activate(this._findNextTab(Math.max(0,e.active-1),!1)):e.active=this.tabs.index(this.active):(e.active=!1,this.active=t()),this._refresh()},_refresh:function(){this._setupDisabled(this.options.disabled),this._setupEvents(this.options.event),this._setupHeightStyle(this.options.heightStyle),this.tabs.not(this.active).attr({"aria-selected":"false",tabIndex:-1}),this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-expanded":"false","aria-hidden":"true"}),this.active.length?(this.active.addClass("ui-tabs-active ui-state-active").attr({"aria-selected":"true",tabIndex:0}),this._getPanelForTab(this.active).show().attr({"aria-expanded":"true","aria-hidden":"false"})):this.tabs.eq(0).attr("tabIndex",0)},_processTabs:function(){var e=this;this.tablist=this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role","tablist"),this.tabs=this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({role:"tab",tabIndex:-1}),this.anchors=this.tabs.map(function(){return t("a",this)[0]}).addClass("ui-tabs-anchor").attr({role:"presentation",tabIndex:-1}),this.panels=t(),this.anchors.each(function(i,n){var o,a,r,h=t(n).uniqueId().attr("id"),l=t(n).closest("li"),c=l.attr("aria-controls");s(n)?(o=n.hash,a=e.element.find(e._sanitizeSelector(o))):(r=e._tabId(l),o="#"+r,a=e.element.find(o),a.length||(a=e._createPanel(r),a.insertAfter(e.panels[i-1]||e.tablist)),a.attr("aria-live","polite")),a.length&&(e.panels=e.panels.add(a)),c&&l.data("ui-tabs-aria-controls",c),l.attr({"aria-controls":o.substring(1),"aria-labelledby":h}),a.attr("aria-labelledby",h)}),this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role","tabpanel")},_getList:function(){return this.element.find("ol,ul").eq(0)},_createPanel:function(e){return t("<div>").attr("id",e).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy",!0)},_setupDisabled:function(e){t.isArray(e)&&(e.length?e.length===this.anchors.length&&(e=!0):e=!1);for(var i,s=0;i=this.tabs[s];s++)e===!0||-1!==t.inArray(s,e)?t(i).addClass("ui-state-disabled").attr("aria-disabled","true"):t(i).removeClass("ui-state-disabled").removeAttr("aria-disabled");this.options.disabled=e},_setupEvents:function(e){var i={click:function(t){t.preventDefault()}};e&&t.each(e.split(" "),function(t,e){i[e]="_eventHandler"}),this._off(this.anchors.add(this.tabs).add(this.panels)),this._on(this.anchors,i),this._on(this.tabs,{keydown:"_tabKeydown"}),this._on(this.panels,{keydown:"_panelKeydown"}),this._focusable(this.tabs),this._hoverable(this.tabs)},_setupHeightStyle:function(e){var i,s=this.element.parent();"fill"===e?(i=s.height(),i-=this.element.outerHeight()-this.element.height(),this.element.siblings(":visible").each(function(){var e=t(this),s=e.css("position");"absolute"!==s&&"fixed"!==s&&(i-=e.outerHeight(!0))}),this.element.children().not(this.panels).each(function(){i-=t(this).outerHeight(!0)}),this.panels.each(function(){t(this).height(Math.max(0,i-t(this).innerHeight()+t(this).height()))}).css("overflow","auto")):"auto"===e&&(i=0,this.panels.each(function(){i=Math.max(i,t(this).height("").height())}).height(i))},_eventHandler:function(e){var i=this.options,s=this.active,n=t(e.currentTarget),o=n.closest("li"),a=o[0]===s[0],r=a&&i.collapsible,h=r?t():this._getPanelForTab(o),l=s.length?this._getPanelForTab(s):t(),c={oldTab:s,oldPanel:l,newTab:r?t():o,newPanel:h};e.preventDefault(),o.hasClass("ui-state-disabled")||o.hasClass("ui-tabs-loading")||this.running||a&&!i.collapsible||this._trigger("beforeActivate",e,c)===!1||(i.active=r?!1:this.tabs.index(o),this.active=a?t():o,this.xhr&&this.xhr.abort(),l.length||h.length||t.error("jQuery UI Tabs: Mismatching fragment identifier."),h.length&&this.load(this.tabs.index(o),e),this._toggle(e,c))},_toggle:function(e,i){function s(){o.running=!1,o._trigger("activate",e,i)}function n(){i.newTab.closest("li").addClass("ui-tabs-active ui-state-active"),a.length&&o.options.show?o._show(a,o.options.show,s):(a.show(),s())}var o=this,a=i.newPanel,r=i.oldPanel;this.running=!0,r.length&&this.options.hide?this._hide(r,this.options.hide,function(){i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),n()}):(i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),r.hide(),n()),r.attr({"aria-expanded":"false","aria-hidden":"true"}),i.oldTab.attr("aria-selected","false"),a.length&&r.length?i.oldTab.attr("tabIndex",-1):a.length&&this.tabs.filter(function(){return 0===t(this).attr("tabIndex")}).attr("tabIndex",-1),a.attr({"aria-expanded":"true","aria-hidden":"false"}),i.newTab.attr({"aria-selected":"true",tabIndex:0})},_activate:function(e){var i,s=this._findActive(e);s[0]!==this.active[0]&&(s.length||(s=this.active),i=s.find(".ui-tabs-anchor")[0],this._eventHandler({target:i,currentTarget:i,preventDefault:t.noop}))},_findActive:function(e){return e===!1?t():this.tabs.eq(e)},_getIndex:function(t){return"string"==typeof t&&(t=this.anchors.index(this.anchors.filter("[href$='"+t+"']"))),t},_destroy:function(){this.xhr&&this.xhr.abort(),this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"),this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"),this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(),this.tabs.add(this.panels).each(function(){t.data(this,"ui-tabs-destroy")?t(this).remove():t(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")}),this.tabs.each(function(){var e=t(this),i=e.data("ui-tabs-aria-controls");i?e.attr("aria-controls",i).removeData("ui-tabs-aria-controls"):e.removeAttr("aria-controls")}),this.panels.show(),"content"!==this.options.heightStyle&&this.panels.css("height","")},enable:function(i){var s=this.options.disabled;s!==!1&&(i===e?s=!1:(i=this._getIndex(i),s=t.isArray(s)?t.map(s,function(t){return t!==i?t:null}):t.map(this.tabs,function(t,e){return e!==i?e:null})),this._setupDisabled(s))},disable:function(i){var s=this.options.disabled;if(s!==!0){if(i===e)s=!0;else{if(i=this._getIndex(i),-1!==t.inArray(i,s))return;s=t.isArray(s)?t.merge([i],s).sort():[i]}this._setupDisabled(s)}},load:function(e,i){e=this._getIndex(e);var n=this,o=this.tabs.eq(e),a=o.find(".ui-tabs-anchor"),r=this._getPanelForTab(o),h={tab:o,panel:r};s(a[0])||(this.xhr=t.ajax(this._ajaxSettings(a,i,h)),this.xhr&&"canceled"!==this.xhr.statusText&&(o.addClass("ui-tabs-loading"),r.attr("aria-busy","true"),this.xhr.success(function(t){setTimeout(function(){r.html(t),n._trigger("load",i,h)},1)}).complete(function(t,e){setTimeout(function(){"abort"===e&&n.panels.stop(!1,!0),o.removeClass("ui-tabs-loading"),r.removeAttr("aria-busy"),t===n.xhr&&delete n.xhr},1)})))},_ajaxSettings:function(e,i,s){var n=this;return{url:e.attr("href"),beforeSend:function(e,o){return n._trigger("beforeLoad",i,t.extend({jqXHR:e,ajaxSettings:o},s))}}},_getPanelForTab:function(e){var i=t(e).attr("aria-controls");return this.element.find(this._sanitizeSelector("#"+i))}})}(jQuery),function(t){function e(e,i){var s=(e.attr("aria-describedby")||"").split(/\s+/);s.push(i),e.data("ui-tooltip-id",i).attr("aria-describedby",t.trim(s.join(" ")))}function i(e){var i=e.data("ui-tooltip-id"),s=(e.attr("aria-describedby")||"").split(/\s+/),n=t.inArray(i,s);-1!==n&&s.splice(n,1),e.removeData("ui-tooltip-id"),s=t.trim(s.join(" ")),s?e.attr("aria-describedby",s):e.removeAttr("aria-describedby")}var s=0;t.widget("ui.tooltip",{version:"1.10.3",options:{content:function(){var e=t(this).attr("title")||"";return t("<a>").text(e).html()},hide:!0,items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flip"},show:!0,tooltipClass:null,track:!1,close:null,open:null},_create:function(){this._on({mouseover:"open",focusin:"open"}),this.tooltips={},this.parents={},this.options.disabled&&this._disable()},_setOption:function(e,i){var s=this;return"disabled"===e?(this[i?"_disable":"_enable"](),this.options[e]=i,void 0):(this._super(e,i),"content"===e&&t.each(this.tooltips,function(t,e){s._updateContent(e)}),void 0)},_disable:function(){var e=this;t.each(this.tooltips,function(i,s){var n=t.Event("blur");n.target=n.currentTarget=s[0],e.close(n,!0)}),this.element.find(this.options.items).addBack().each(function(){var e=t(this);e.is("[title]")&&e.data("ui-tooltip-title",e.attr("title")).attr("title","")})},_enable:function(){this.element.find(this.options.items).addBack().each(function(){var e=t(this);e.data("ui-tooltip-title")&&e.attr("title",e.data("ui-tooltip-title"))})},open:function(e){var i=this,s=t(e?e.target:this.element).closest(this.options.items);s.length&&!s.data("ui-tooltip-id")&&(s.attr("title")&&s.data("ui-tooltip-title",s.attr("title")),s.data("ui-tooltip-open",!0),e&&"mouseover"===e.type&&s.parents().each(function(){var e,s=t(this);s.data("ui-tooltip-open")&&(e=t.Event("blur"),e.target=e.currentTarget=this,i.close(e,!0)),s.attr("title")&&(s.uniqueId(),i.parents[this.id]={element:this,title:s.attr("title")},s.attr("title",""))}),this._updateContent(s,e))},_updateContent:function(t,e){var i,s=this.options.content,n=this,o=e?e.type:null;return"string"==typeof s?this._open(e,t,s):(i=s.call(t[0],function(i){t.data("ui-tooltip-open")&&n._delay(function(){e&&(e.type=o),this._open(e,t,i)})}),i&&this._open(e,t,i),void 0)},_open:function(i,s,n){function o(t){l.of=t,a.is(":hidden")||a.position(l)}var a,r,h,l=t.extend({},this.options.position);
if(n){if(a=this._find(s),a.length)return a.find(".ui-tooltip-content").html(n),void 0;s.is("[title]")&&(i&&"mouseover"===i.type?s.attr("title",""):s.removeAttr("title")),a=this._tooltip(s),e(s,a.attr("id")),a.find(".ui-tooltip-content").html(n),this.options.track&&i&&/^mouse/.test(i.type)?(this._on(this.document,{mousemove:o}),o(i)):a.position(t.extend({of:s},this.options.position)),a.hide(),this._show(a,this.options.show),this.options.show&&this.options.show.delay&&(h=this.delayedShow=setInterval(function(){a.is(":visible")&&(o(l.of),clearInterval(h))},t.fx.interval)),this._trigger("open",i,{tooltip:a}),r={keyup:function(e){if(e.keyCode===t.ui.keyCode.ESCAPE){var i=t.Event(e);i.currentTarget=s[0],this.close(i,!0)}},remove:function(){this._removeTooltip(a)}},i&&"mouseover"!==i.type||(r.mouseleave="close"),i&&"focusin"!==i.type||(r.focusout="close"),this._on(!0,s,r)}},close:function(e){var s=this,n=t(e?e.currentTarget:this.element),o=this._find(n);this.closing||(clearInterval(this.delayedShow),n.data("ui-tooltip-title")&&n.attr("title",n.data("ui-tooltip-title")),i(n),o.stop(!0),this._hide(o,this.options.hide,function(){s._removeTooltip(t(this))}),n.removeData("ui-tooltip-open"),this._off(n,"mouseleave focusout keyup"),n[0]!==this.element[0]&&this._off(n,"remove"),this._off(this.document,"mousemove"),e&&"mouseleave"===e.type&&t.each(this.parents,function(e,i){t(i.element).attr("title",i.title),delete s.parents[e]}),this.closing=!0,this._trigger("close",e,{tooltip:o}),this.closing=!1)},_tooltip:function(e){var i="ui-tooltip-"+s++,n=t("<div>").attr({id:i,role:"tooltip"}).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content "+(this.options.tooltipClass||""));return t("<div>").addClass("ui-tooltip-content").appendTo(n),n.appendTo(this.document[0].body),this.tooltips[i]=e,n},_find:function(e){var i=e.data("ui-tooltip-id");return i?t("#"+i):t()},_removeTooltip:function(t){t.remove(),delete this.tooltips[t.attr("id")]},_destroy:function(){var e=this;t.each(this.tooltips,function(i,s){var n=t.Event("blur");n.target=n.currentTarget=s[0],e.close(n,!0),t("#"+i).remove(),s.data("ui-tooltip-title")&&(s.attr("title",s.data("ui-tooltip-title")),s.removeData("ui-tooltip-title"))})}})}(jQuery);
$(document).on("initAlerts", initAlerts);

//TODO:  this is a stop-gap for testing until initAlerts can be added to main.js
function initAlerts() {
    $('.twc-alert .twc-alert-text:first').prepend('<a class="twc-icon twc-alert-close twc-show_hide" href=""></a>');
    $('.twc-alert .twc-container').css('padding: .5em 2em;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;');

    $(".twc-alert").show();
    $(".twc-show_hide").show();
    $('.twc-show_hide').click(function(e) {
        $(".twc-alert").slideToggle();
        e.preventDefault();
    });
}


;(function($){

    $.fn.alerts = function() {

        var alertSelf = $(this);

        function doesMatch(tagArray, matchVal, matchAll) {
            var match = false;
            for (var i=0; i<tagArray.length; i++) {
                if (tagArray[i].path===matchAll || tagArray[i].path===matchVal || tagArray[i].title===matchVal) {
                    return true;
                }
            }
        };

        function isInRegion(alertMsg, region) {
            return doesMatch(alertMsg.regionTags, region, '/etc/tags/twc/location/region');
        };

        function isInSoiID(alertMsg, soaID) {
            return doesMatch(alertMsg.soaIDTags, soaID, '/etc/tags/twc/location/soaID');
        };

        function isOnPage(alertMsg, page) {
            return doesMatch(alertMsg.pageTags, page, '/etc/tags/twc/lob');
        };

        function isOnTime(alertMsg) {
            return ("ACTIVE" === alertMsg.status )
        };

        /* Strip data that doesn't meet filter criteria: */
        function filterData(data) {
            var regionFilter = typeof(ClientContext)==='object' ? ClientContext.get('profile/region') : ALL_REGIONS;
            var soaIDFilter  = typeof(ClientContext)==='object' ? ClientContext.get('/profile/soaId') : ALL_SOAID;
            var pageFilter = alertSelf.attr('data-alert-filter');

            var jsonObj = {};
            jsonObj['alerts'] = [];

            for (var i=0; i< data.alerts.length; i++) {
                var alertMsg = data.alerts[i];

                if ((isInRegion(alertMsg, regionFilter)|| isInSoiID(alertMsg, soaIDFilter))
                    && isOnPage(alertMsg, pageFilter)
                    && isOnTime(alertMsg))
                {
                    jsonObj['alerts'].push({'message' : cleanUpRTEHtmlMarkup(alertMsg.message),
                                 'backgroundColor' : alertMsg.backgroundColor,
                                 'textColor' : alertMsg.textColor});
                }
            }

            return jsonObj;
        }

        /* Remove unwanted html markup that's injected by the Rich Text Editor - ie <p> </p> <br>   */
        function cleanUpRTEHtmlMarkup(msg) {
            msg = msg.replace(/(<p><\/p>)/ig,"");           //replace <p></p> - globally
            msg = msg.replace(/<p/ig,"<span");              //replace all open paragraphs with span
            msg = msg.replace(/<\/p>/ig,"</span></br>");    //replace all closing paragraphs with closing span and break.  Please note that <br/> keeps the indentation in-tact - where as <p/> invalidates it.
            return msg;
        }

        return this.each(function() {

            if (alertSelf.length>0) {
                var src = alertSelf.attr('data-alert-src');
                var pageFilter = alertSelf.attr('data-alert-filter');

                // if component on page is read in from HTML; defaults to 'default' from JSP
                if (src!=='default' && pageFilter !=='default') {

                    $.getJSON( src + '/jcr:content.json', function(data){
                        if(!data.alerts || !data.alerts.length) return;
                        data = filterData(data);
                        if(!data.alerts.length) return;

                        var templateID = 'alert-content';
                        compiledTemplates[templateID] || loadTemplate(templateID);

                        //assign callback...
                        dust.stream(templateID, dust.context)
                            .on("end", function() { $.event.trigger({ type: "initAlerts" }); })

                        dust.render(templateID, data, function(err, out) { alertSelf.html($(out)); });
                    });
                }
            }
        });
    };
})(jQuery);

$(document).ready(function () {
    $('.twc-alert-section').alerts();
});

var ZipPromptModals = ZipPromptModals || {};

var ZipPromptModals = {
    determineFootprint: function() {
        var geoLocation = this.getJSONfromCookie('twc-user-profile');
        var zipPromptData = this.getJSONfromCookie('zipPromptCookie');

        if (!zipPromptData || zipPromptData != geoLocation.postalCode) {
            this.showPrompts(geoLocation.region);
        }
    },
    showPrompts: function(footprint) {
        if (footprint) loadPopup("contactUsPrompt");
        else loadPopup("contactUsOOF");
    },
    getJSONfromCookie: function(name) {
        if($.cookie(name)) { return jQuery.parseJSON($.cookie(name)); }
        return false;
    }
}

var Twc = Twc || {}
/**
  * Manages functionality for tooltip display. Tooltips require html attribute data-tooltip on the target tooltip instantiation element.
  * Required data-tooltip JSON is {"heading", "body"}
  * @author McGowan
  * @namespace
  */


Twc.Tooltip = (function() {

	/**
	  * marker to indicate link was initalized
	  * @author McGowan
	  */
	var initializedClass = 'js-tooltip-initialized';

	var tooltipWrapperClass = 'tooltip-popup';

	// using pseudo elements for arrow, so we must override with style tag
	var $arrowStyle = $('<style type="text/css" title="js-tooltips"></style>');

	// we must override CSS, so ensure selectors match CSS declaration
	var arrowCSSSelectors = '.tooltip-popup.top .tooltip-content:before, .tooltip-popup.top .tooltip-wrap:before, .tooltip-popup.top .tooltip-wrap:after, ' +
	                        '.tooltip-popup.bottom .tooltip-content:before, .tooltip-popup.bottom .tooltip-wrap:before, .tooltip-popup.bottom .tooltip-wrap:after';

	function cancelTooltipClose(id) {
		window.clearTimeout(id);
	}
   function closeAll()  {
        $('.'+tooltipWrapperClass).hide();
    }
    function error(o)  {
        try {console.error(o)} catch(e) {}
    }

	return {
		/** initializes a group of elements Prevents double initalization.
		  * @author McGowan
		  * @param $objects {Object} jQuery object to iterate over, instantiating on each()
		  */
		init : function($objects) {
			try {
				if (typeof $objects === 'undefined' || !($objects instanceof jQuery)) {
					error('$rows is not a jQuery object');
					return;
				}

				var $window = $(window);

				$('head').append($arrowStyle); // JQuery should only be adding this once, but it's ok to call on init()

				$objects.each(function(i) {
					var $me = $(this);
					if ($me.hasClass(initializedClass)) {
						error('tooltip already initialized');
						return true; // continue to next
					}

					var data = safeParseJson($me.attr('data-tooltip'));


					if(typeof data.body === 'undefined') {
						error("Cound not instantiate tooltip");
						return true; // continue to next
					}

					var tooltipOpen = false;
					var tooltipHeading = data.heading? '<header>'+unescape(data.heading)+'</header>' : '';
					var tooltipBody = unescape(data.body) || '';
					var mouseoutTimeoutId; // used to keep tooltip open for a little bit
					var appendedToDom = false;

					// set to .top for accurate height calculation when determining whether to switch to bottom
					var $tooltip = $('<div class="'+tooltipWrapperClass+' top"><div class="tooltip-content"><div class="tooltip-wrap">'+tooltipHeading+tooltipBody+'</div></div></div>')
					  .on('mouseover', function(e) {
						// e.stopPropagation();
						cancelTooltipClose(mouseoutTimeoutId);
					}).on('mouseout', function() {
						startTooltipClose();
					}).click(function(e) {
						e.stopPropagation(); // prevent this from being closed by $(document).click()
					});

					$tooltip.find('.close').click(function(e) {
						e.preventDefault();
						closeTooltip();
					});

					function startTooltipClose() {
						mouseoutTimeoutId = window.setTimeout(function() {
							$tooltip.stop(true,true).fadeOut(1200, function() {
								closeTooltip();
							});
						}, 500);
					}

					function closeTooltip() {
						$tooltip.hide();
						tooltipOpen = false;
					}

                    function safeParseJson(s){
                        try {
                            return ('undefined' !== typeof (s))?  $.parseJSON(s) : {};
                        } catch (e) {
                            return {};
                        }
                    }
					function showTooltip() {
						$tooltip.stop(true,true);
						closeAll(); // hide any other open tooltips
						$tooltip.css('opacity',1);
						var screen = {
							height: $window.height(),
							width: $window.width(),
							scrollTop: $(window).scrollTop(),
							yBottom : $window.height+$('html').scrollTop()
						}

						var link = {}; // the link that triggers the tooltip
						link.h = $me.outerHeight(true);
						link.w = $me.outerWidth(true);
						link.top = $me.offset().top;
						link.left = $me.offset().left;

						var tooltip = {}
						tooltip.h = $tooltip.outerHeight(true);
						tooltip.w = $tooltip.outerWidth(true);

						// determine top position.  place above the source if tooltip would be off page.
						var screenBottom = $window.height()+$window.scrollTop();
						var tooltipBottom = (link.top+link.h)+tooltip.h;
						tooltip.top = (tooltipBottom >= screenBottom)? link.top-tooltip.h : link.top + link.h;
						$tooltip.removeClass('top bottom').addClass((tooltipBottom >= screenBottom)? 'bottom' : 'top' );

						// determine initial left position and right
						var leftPos = link.left-(tooltip.w/2-link.w/2);
						var rightPos = leftPos + tooltip.w;

						// log('leftPos: '+leftPos,1);
						// log('rightPos: '+rightPos,1);
						// log('screen.width: '+screen.width,1);
						// adjust left/right tooltip position if current is off screen
						if (tooltip.w > screen.width || leftPos < 0) { // flush left
							// log('flush left');
							var arrowLeft = link.left + link.w/2;
							$arrowStyle.html(arrowCSSSelectors+' {left: '+arrowLeft+'px;}');
							leftPos = 0;
						} else if (rightPos > screen.width) { // flush right
							// log('flush right');
							leftPos = (screen.width - tooltip.w); // keep as integer
							var arrowLeft = link.left + link.w/2 - leftPos;
							// log('arrowLeft: '+arrowLeft);
							$arrowStyle.html(arrowCSSSelectors+' {left: '+arrowLeft+'px;}');
							leftPos += 'px'; // add px
						} else { // default, centered behavior
							// log('default');
							$arrowStyle.empty();
						}

						// position tooltip
						$tooltip.css({
							position: 'absolute',
							'top' : tooltip.top,
							'left' : leftPos
						});

						$tooltip.fadeIn(200, function() {
							$(this).hover();
						});
						tooltipOpen = true;
					}

					$me.click(function(e) {
						e.stopPropagation();
						return false;
					}).on('click mouseover', function() {
						cancelTooltipClose(mouseoutTimeoutId);
						if (tooltipOpen) {
							return;
						}
						if (!appendedToDom) {
							// ie8 requires show() on dom insert and setTimeout. Otherwise, tooltip arrows don't show until DIV is moused over
							// opacity:0 prevents flash on screen before it's positioned where it should be.
							$('body').append($tooltip.css('opacity',0).show());
							appendedToDom = true;
							window.setTimeout(function() {
								showTooltip();
							},0);
						} else {
							showTooltip();
						}
					}).on('mouseout', function() {
						startTooltipClose();
					});
					$me.addClass(initializedClass);
				});
			} catch (e) {
                if (console) { // IE doesn't have console
                    console.group(e.name+': '+e.message);
                }
               error(e);
               error(e.stack);
                if (console) {
                    console.groupEnd();
                }
			}

		}


	}
}());

Twc.Tooltip.init($('div').find('a.tooltip'));
$(function() {

    $.fn.promoSlider = function(opts) {
        $(this).data('initialized', true);
        var $that = this;
        
        var slider =  $("ul.carousel-apps", this);
        var speed = 400;
        var num_items = $("ul.carousel-apps > li", this).size();
        var item_width = 274.5;
        var left_offset = -9.5;
        var left_value = left_offset - item_width;
        
        slider.css('width', (item_width * num_items));
        slider.css('left', left_offset);
        
        if (num_items > 2) {
            $('.btnnext', this).show();
            $('.btnprev', this).show();
                        
            $("ul.carousel-apps li:first", this).before($("ul.carousel-apps li:last", this));
            slider.css('left', left_value);
            
            $('.btnprev', this).click(function() {
                if (! slider.is(':animated')) {
                    var left_indent = parseInt(slider.css('left')) + item_width;
                
                    slider.animate({'left' : left_indent}, speed, function() {
                        $("ul.carousel-apps li:first", $that).before($("ul.carousel-apps li:last", $that));
                        slider.css({'left' : left_value});
                    });
                }
                return false;
            });
            
            $('.btnnext', this).click(function() {
                if (! slider.is(':animated')) {
                    var left_indent = parseInt(slider.css('left')) - item_width;
                
                    slider.animate({'left' : left_indent}, speed, function() {
                        $("ul.carousel-apps li:last", $that).after($("ul.carousel-apps li:first", $that));
                        slider.css({'left' : left_value});
                    });
                }
                return false;
            });
        }            
    }
});
$(function () {

    $('button#email').click(function(){
        $('.email-module').toggle();
        emailShareTracking("contact us > email share") ;
    });

    $('.email-module .close').click(function() {
        $('.email-module').toggle();
    });
   $("#emailShareForm").submit(function(event) {
        /* stop form from submitting normally */
        event.preventDefault();
        disabledSubmitButton();
        callEmailShareServlet();
    });
});

var callEmailShareServlet = function() {
    if(validateEmailForm()){
        emailShareTracking("contact us >email send confirm ");
        var parameters = {
            EmailFrom : $('#email_addr').val(),
            EmailTo : $('#to_email_addr').val(),
            AddNote : $('#addNote').val() ,
            currentPagePath : window.location.href,
            resourcePath : $('#resourcePath').val(),
            fillit: $("#fillit :input").val()
        };
        $.ajax({
            type: 'POST',
            url:'/bin/sendTemplatedEmail',
            data:parameters,
            success: function( data,textStatus, jqXHR){
                resetEmailForm();
                alert("Email share form submitted successfully");
            },
            error: function(jqXHR, textStatus, errorThrown) {
                resetEmailForm();
                alert("Email could not be sent::  "+errorThrown);
            }
        })
    } else {
            /*enable submit button, In case of field level validation fails in IE9,8*/
            enableSubmitButton();
    }
}
var emailShareTracking=function (prop19Value){
    if(typeof s !== 'undefined'){
        s.linkTrackVars = "prop19";
        s.prop19 = prop19Value;
        s.tl(this,'o', s.prop19);
        s.linkTrackVars="";
    }
}
var resetEmailForm = function(){
    $(".email-module").toggle();
    $('#emailShareForm').trigger("reset");
    enableSubmitButton();
}
var disabledSubmitButton = function(){
    $("#emailShareForm").find( $('button[type=submit]')).attr('disabled',true);
}
var enableSubmitButton = function(){
    $("#emailShareForm").find( $('button[type=submit]')).attr('disabled',false);
}

var validateEmailForm = function() {
    if (!validateEmail($('input#email_addr').val()) || !validateEmail($('input#to_email_addr').val())) {
        alert("Email must be filled out");
        return false;
    }
    return true;
}
var validateEmail = function(value) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(value);
}

