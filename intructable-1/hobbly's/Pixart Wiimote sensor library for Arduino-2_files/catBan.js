(function(){try{if(!String.prototype.format)String.prototype.format=function(){for(var d=this,c=0;c<arguments.length;c++)d=d.replace(RegExp("\\{"+c+"\\}","gi"),arguments[c]);return d};if(!Array.prototype.indexOf)Array.prototype.indexOf=function(d,c){var a=this.length,b=Number(c)||0,b=b<0?Math.ceil(b):Math.floor(b);for(b<0&&(b+=a);b<a;b++)if(b in this&&this[b]===d)return b;return-1};var g=function(){return{appendHiddenIframe:function(d,c){try{var a=document.createElement("iframe");a.style.width="0px";
a.style.height="0px";a.style.display="none";a.src=d;var b=function(){a.parentNode.removeChild(a);a.detachEvent?a.detachEvent("onload",j):a.onload=null},j=function(){typeof c=="function"&&c();setTimeout(b,100)};a.attachEvent?a.attachEvent("onload",j):a.onload=j;document.body.appendChild(a)}catch(g){}},categoryWhitelisted:function(d,c){try{for(var a=!1,b=0;b<c.length;b++)if(d.indexOf(c[b])>-1){a=!0;break}return a}catch(j){}},locationWhitelisted:function(d){try{for(var c=!1,a=window.location.hostname,
b=0;b<d.length;b++)if(a.indexOf(d[b])>-1){c=!0;break}return c}catch(j){}},locationBlacklisted:function(d){try{for(var c=!1,a=window.location.hostname,b=0;b<d.length;b++)if(a.indexOf(d[b])>-1){c=!0;break}return c}catch(j){}},appendScriptWithSrc:function(d,c){try{var a=document.createElement("script");a.type="text/javascript";a.src=d;var b=!1;a.onload=a.onreadystatechange=function(){if(!b&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete"))b=!0,a.onload=a.onreadystatechange=
null,typeof c=="function"&&c()};document.getElementsByTagName("head")[0].appendChild(a)}catch(j){}},setupTracking:function(){try{typeof mixpanel=="undefined"&&function(c,a){window.mixpanel=a;var b,d,g;b=c.createElement("script");b.type="text/javascript";b.async=!0;b.src=("https:"===c.location.protocol?"https:":"http:")+"//cdn.mxpnl.com/libs/mixpanel-2.1.min.js";c.getElementsByTagName("head")[0].appendChild(b);a._i=[];a.init=function(c,b,x){function m(a,c){var b=c.split(".");2==b.length&&(a=a[b[0]],
c=b[1]);a[c]=function(){a.push([c].concat(Array.prototype.slice.call(arguments,0)))}}var h=a;"undefined"!==typeof x?h=a[x]=[]:x="mixpanel";h.people=h.people||[];d="disable track track_pageview track_links track_forms register register_once unregister identify name_tag set_config people.identify people.set people.increment".split(" ");for(g=0;g<d.length;g++)m(h,d[g]);a._i.push([c,b,x])};a.__SV=1.1}(document,window.mixpanel||[])}catch(d){}},track:function(d){try{Math.random()<0.0010&&(mixpanel.catBanner||
mixpanel.init("c949fff4b59a6f2d402a59f36f7938ac",{},"catBanner"),mixpanel.catBanner&&mixpanel.catBanner.track(d))}catch(c){}}}}();window.catBanner=function(){function d(o){try{return l.createElement(o)}catch(a){}}function c(o,a){try{return o.appendChild(a)}catch(c){}}function a(a){try{return h.getComputedStyle?h.getComputedStyle(a,null):a.currentStyle}catch(c){}}function b(){try{typeof localStorage!=null&&(localStorage.setItem(p,"true"),localStorage.setItem(v,(new Date).getTime()))}catch(a){}}function j(){try{var a=
!1;if(typeof localStorage!=null&&(a=localStorage.getItem(p)=="true"?!0:!1,a==!0)){var c=parseInt(localStorage.getItem(v));(new Date).getTime()-c>V&&(localStorage.removeItem(p),localStorage.removeItem(v),a=!1)}return a}catch(b){return!1}}function K(a,c){try{var b=!0,d=typeof window.innerHeight!="undefined"?window.innerHeight:document.documentElement.clientHeight;if((typeof window.innerWidth!="undefined"?window.innerWidth:document.documentElement.clientWidth)<a||d<c)b=!1;return b}catch(e){return!0}}
function L(){try{var a=!1;document.getElementById(M)!=null&&(a=!0);return a}catch(c){}}function R(o,T,U,z,e,j,u,x,W,X,G){try{var k=/msie ([0-9])/i.exec(navigator.userAgent),s=k&&parseInt(k[1]),k=0,i="",f="",A=s&&s<9?"top:12px;right:0;width:10px;height:"+(e-14)+"px;-ms-writing-mode:bt-rl;writing-mode:bt-rl;":"top:"+e/2+"px;right:-"+(e/2-12)+"px;width:"+(e-14)+"px;height:10px;-webkit-transform:rotate(90deg);-moz-transform:rotate(90deg);-ms-transform:rotate(90deg);-o-transform:rotate(90deg);transform:rotate(90deg);text-align:right;",
t=null;switch(o){case "top":k=e;i="top:0;bottom:auto;left:0;right:auto;width:100%;height:"+k+"px;";f="left:0;right:0;";break;case "bottom":k=e;i="bottom:0;top:auto;left:0;right:auto;width:100%;height:"+k+"px;";f="left:0;right:0;";break;case "left":i="left:0;right:auto;top:0;bottom:auto;width:"+z+"px;height:100%;",f="top:0;bottom:0;";case "right":k=z,i="right:0;left:auto;top:0;bottom:auto;width:"+k+"px;height:100%;",f="top:0;bottom:0;"}switch(T){case "top":f="top:0;bottom:auto;left:auto;right:auto;";
break;case "bottom":f="bottom:0;top:auto;left:auto;right:auto;";break;case "left":f="left:0;right:auto;top:auto;bottom:auto;";break;case "right":f="right:0;left:auto;top:auto;bottom:auto;"}if(j!=null&&k>0){var t=l.body.style.cssText,w=a(l.body),C=parseFloat(w.width),H="margin"+o.charAt(0).toUpperCase()+o.substr(1);l.body.style[H]=parseFloat(w[H])+k+"px";if((o=="left"||o=="right")&&(s?w.width=="100%":parseFloat(w.width)==C))l.body.style.width="auto"}var q=d("div");q.style.cssText="text-align:left;position:fixed;"+
i+"margin:0 auto;border:0;padding:0;"+(j?"background-color:"+j+";":"")+"z-index:2147483646;";var n=d("div");n.id=M;n.style.cssText="position:absolute;"+f+"margin:auto;border:0;padding:0;width:"+z+"px;height:"+e+"px;"+(!j?"background-color:#eee;":"");c(q,n);var y=d("iframe");y.src=U;y.width=z;y.height=e;y.setAttribute("frameBorder","0");y.setAttribute("scrolling","no");y.setAttribute("allowTransparency","allowTransparency");y.style.cssText="position:static;display:block;margin:0;border:0;padding:0;width:"+
z+"px;height:"+e+"px;";c(n,y);if(X==!0&&G!=null){var r=d("img");r.src="//edge.omnitwig.com/app/closebutton_12x12.png";r.alt="Close";r.style.cssText="display: block; position: absolute; left:auto, bottom:auto; right: 0; top: 0; margin: 0; border: 0; padding: 0; cursor: pointer;";r.onclick=function(){try{l.body.removeChild(q);if(t!=null)l.body.style.cssText=t;g.track("---"+B+" close");b()}catch(a){}};c(n,r);var m=d("div");m.style.cssText="position:absolute;margin:0;border:0;padding:1px;"+A+"color:#333;font:10px/10px normal Arial,Helvetica,sans-serif;text-decoration:none;";
c(n,m);var D=d("a");D.innerHTML="Disable";D.href="javascript:void(0)";D.onclick=function(){g.appendHiddenIframe("//edge.omnitwig.com/setData.html?p="+G+":false&t=setting&g="+I,function(){window.location.reload()});this.onclick=null};D.style.cssText="color:#333;font:10px/10px normal Arial,Helvetica,sans-serif;text-decoration:none;";c(m,D);n.style.width=z+12+"px"}else{r=d("img");r.src="//edge.omnitwig.com/app/close_btn.jpg";r.alt="Close";r.style.cssText="display: block; width:16px;height:16px;position: absolute;left:auto; bottom:auto; right: 0; top: 0; margin: 0; border: 0; padding: 0; cursor: pointer;";
r.onclick=function(){try{l.body.removeChild(q);if(t!=null)l.body.style.cssText=t;g.track("---"+B+" close");b()}catch(a){}};c(q,r);var E=d("img");E.src="//edge.omnitwig.com/app/settings_btn.jpg";E.alt="Close";E.style.cssText="display:block;width:16px;height:16px;position:absolute;left:auto;bottom:auto;right:18px;top:0;margin:0;border:0;padding:0;cursor:pointer;";E.onclick=function(){try{g.track("---"+B+" settings"),window.open(x,"_blank")}catch(a){}};c(q,E)}c(l.body,q);if(u){var p=h.addEventListener?
"addEventListener":"attachEvent",v=h[h.addEventListener?"removeEventListener":"detachEvent"],N=p=="attachEvent"?"onmessage":"message",O=function(a){try{if(a.origin==J+"//edge.omnitwig.com"||a.origin==J+"//c.ztstatic.com")try{parseInt(a.data)?F(!0):(document.body.removeChild(q),catBanner.reason="noad:"+Y.join(","),F(!1,catBanner.reason)),v(N,O,!1)}catch(c){}}catch(b){}};(0,h[p])(N,O,!1)}W&&K(P+Z,Q+$)&&g.appendScriptWithSrc(aa,function(){try{typeof reviewWidget!="undefined"&&reviewWidget.init(function(a){if(a)if(o==
"top"||o=="bottom"){var b=d("div");b.style.cssText="width:140px;position: absolute; left:auto; bottom:auto; right:0; top: 0; margin: 0; border: 0;";c(b,a);c(n,b);n.style.width=z+a.offsetWidth+17+"px"}else c(n,a),n.style.height=e+a.offsetHeight+"px"})}catch(a){}});setTimeout(function(){try{var a;s?(a=document.createEventObject(),a.type="resize",window.document.fireEvent("onresize",a)):(a=document.createEvent("Event"),a.initEvent("resize",!0,!0),window.document.dispatchEvent(a))}catch(c){}},0);g.setupTracking();
g.track("---"+B+" render");catBanner.rendered=!0}catch(L){}}function x(a){try{var c=[],b;for(b in a)a[b]===!1&&c.push(b);return c}catch(d){}}function m(a,c,b,d,e){try{F=c||function(){};a||(a={});b||(b=[]);I=e;var h=b.join(","),l=g.locationWhitelisted(".qq.com,.sina.com.cn,.163.com,weibo.com,.sohu.com,.youku.com,ifeng.com,.tudou.com,.360buy.com,renren.com,.kankan.com".split(",")),m=g.locationWhitelisted(".livejasmin.com,.youporn.com,.xnxx.com,adultfriendfinder.com,.streamate.com,.freeones.com,.fling.com,literotica.com,.playboy.com,.benaughty.com,.flirt4free.com,debonairblog.com,apetube.com,.aebn.net,.videosexarchive.com,.hqpornlinks.com,femjoy.com,clips4sale.com,.voyeurweb.com,.asstr.org,.worldsex.com,.xcams.com,girlfriendvideos.com,.videobox.com,adultmovienetwork.com,xxxmsncam.com,pixandvideo.com,payserve.com,.allinternal.com,.asstraffic.com,fuckforforest.com,japanhardcoremovies.com,wierdporno.com,smutnetwork.com,cdgirls.com,.tube.cc,movieerotica.com,angelsofporn.net".split(","))&&
a.onlyDat==!0,p=g.categoryWhitelisted(b,[7,9,272,285])&&a.onlyDat==!0;if(a.onlyDat==!0&&!p&&!m)F(!1);else{var v=g.locationBlacklisted("sex,boobs,penis,pussy,cunt,porn,anal,teen,latina,cum,amateur,bondage,babe,bbw,bukkake,hentai,gangbang,orgy,strip,pov,asian,nipple,tits,blowjob,mature,squirt,shemale,nude,cock,breast,virgin,chicks,escort,facial,horny,orgasm,gay,lesbian,xxx,fuck,dick".split(",")),G={closed:!j(),small:K(P,Q),rendered:!L(),fb:window.location.hostname.indexOf(".facebook.")===-1,xxx:!v||
m==!0||p==!0,badornocats:!d&&b.length||l==!0||m==!0||p==!0},k=x(G);if(k.length===0){var s,i=a.adWidth||728,f=a.adHeight||90,c=!0,A=a.cPosition||"bottom",t=a.aPosition||"center",w=a.cBackground||"#eee",b=!0,d=!1,C,H=a.ataUrl||"http://goireview.com/support",e="general",v={general_728x90:264,general_160x600:265,custom1_728x90:266,custom1_160x600:267,custom2_728x90:268,custom2_160x600:269};l?(B="chi",Math.random()<0.5?(i=728,f=90,A="bottom"):(i=160,f=600,A="right"),t="center",w="#eee",u=a.ChiZ||S,s="//ads.esina.cn/www/delivery/afr.php?cb="+
Math.random()+"&zoneid="+u["s"+i+"x"+f],c=a.useAdm=!1):m?(B="dat",i=728,f=90,A="bottom",t="center",w="",u=a.DatDomZ||ba,b=!1,d=!0,C="DatBanner",e="custom2"):p?(B="dat",i=728,f=90,A="bottom",t="center",w="",u=a.DatCatZ||ca,b=!1,d=!0,C="DatBanner",e="custom1"):u=a.Z||u;var q=encodeURIComponent(da);a.useAdm==!0?s="//c.ztstatic.com/ancbanner_{0}_{1}x{2}_{3}.htm?cat={4}&clientId={5}&l={6}".format(e,i,f,v[e+"_"+i+"x"+f],h,I,q):s||(s="//edge.omnitwig.com/app/category.htm?zone={0}&cat={1}&l={2}".format(u["s"+
i+"x"+f],h,q));R(A,t,s,i,f,w,c,H,b,d,C)}else catBanner.reason=k.join(","),F(!1,catBanner.reason)}}catch(n){}}var h=window,l=document,u={s160x600:989,s300x250:988,s728x90:990},S={s160x600:7,s728x90:9},ca={s160x600:993,s300x250:994,s728x90:992},ba={s160x600:997,s300x250:996,s728x90:995},P=750,Q=600,Z=150,$=90,B="cat",J=h.location.protocol,da=J+"//"+h.location.host,p="sidebanclosed",v="sidebanclosetime",V=72E5,M="otcbanner",aa="//edge.omnitwig.com/app/reviewWidget.js?3",I,F,Y;return{rendered:!1,reason:null,
version:2.1,init:function(a,b,c,d,e){try{m(a,b,c,d,e)}catch(g){}}}}();typeof bbbrain!="undefined"&&(typeof bbbrain.version=="undefined"||bbbrain.version<2)&&catBanner.init()}catch(ea){}})();
