var d=document;(function(){var b,l,c={},m,f=d.getElementsByTagName('SCRIPT');var r='r756';for(b=0;b<f.length;b++){if(!f[b].src){continue}if(f[b]._surly){continue}var n=f[b].src,u=(n.indexOf('c.betrad.com')>-1&&n.indexOf('c.betrad.com')<50);if(n.match('surly.js')&&u){f[b]._surly=1;var s=false,p=Math.floor(Math.random()*100000),k=n.split(';');c['uqid']=p;k=k.splice(1,k.length);for(l=0;l<k.length;l++){if(k[l]=='r=0'){return}var q=k[l].split('=');c[q[0]]=q[1];if(q[0]=='nowrite'){s=true}}this._bao=c;try{m=(("https:"==document.location.protocol)?"https://c.betrad.com":"http://c.betrad.com")}catch(e){}if(s){function v(a){if(!a||"object"!=typeof a){return a}var h=a.constructor();for(var g in a){if(a.hasOwnProperty(g)){h[g]=a[g]}}return h}var i=d.createElement('img');i.style.margin='0px';i.style.padding='0px';i.border=i.width=i.height='0';i.src=m+'/a/4.gif';i.id='bap-pixel-'+p;f[b].parentNode.insertBefore(i,f[b]);if(!d.getElementById('ba.js')){var t=false,j=d.createElement('script');j.id='ba.js';j.src=m+'/geo/ba.js?'+r;if(navigator.userAgent.indexOf('MSIE ')>-1){j.onreadystatechange=function(){if(!t&&(this.readyState=='loaded'||this.readyState=='complete')){t=true;j.onload();j.onload=null}}}var o=v(c);window['_bs_'+c.uqid]=function(){try{BAP.start(o)}catch(e){var a=window._bab||[];var h={};for(var g in o){h[g]=o[g]}a.push(h);window._bab=a}};j.onload=function(){window['_bs_'+o.uqid]()};f[b].parentNode.insertBefore(j,f[b])}else{window['_bs_'+c.uqid]=function(){try{BAP.start(c)}catch(e){var a=window._bab||[];var h={};for(var g in c){h[g]=c[g]}a.push(h);window._bab=a}};window['_bs_'+c.uqid]()}}else{d.write('<img style="margin:0;padding:0;" border="0" width="0" height="0" src="'+m+'/a/4.gif" id="bap-pixel-'+p+'"/>');d.write('<script>(function(){if(d.getElementById(\'ba.js\'))return;d.write(\'<sc\'+\'ript id="ba.js" type="text/javascript" src="'+m+'/geo/ba.js?'+r+'"></scr\'+\'ipt>\');})();</script><script>d.write(\'<sc\'+\'ript>try{BAP.start(_bao);}catch(e){var _bab = _bab||[];var ob={}; for (var p in _bao) {ob[p]=_bao[p]}_bab.push(ob);}</sc\'+\'ript>\');</script>')}}}})();
