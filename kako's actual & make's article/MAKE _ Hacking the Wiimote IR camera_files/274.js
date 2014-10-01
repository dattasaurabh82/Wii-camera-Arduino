
var fmJsHost = (("https:" == document.location.protocol) ? "https://" : "http://");


var fm_query_string = window.location.search.substr(1).split('&');
var fm_pairs = {};
for (var i = 0; i < fm_query_string.length; i++) {
  var pair = fm_query_string[i].split("=");
  fm_pairs[pair[0]] = pair[1];
}


if (typeof __fm_enc_u === "undefined") {
  var __fm_url = document.URL;
  if (top !== self) {
    if (typeof fm_pairs['fm_url'] === "string") {
      __fm_url = fm_pairs['fm_url'];
    } else if (typeof document.referrer === "string" && document.referrer !== "") {
      __fm_url = document.referrer;
    }
  }
  __fm_enc_u = (typeof encodeURIComponent === 'function') ? encodeURIComponent(__fm_url) : escape(__fm_url);
}
if (typeof(fm_pairs['federated_media_section']) == "string") {
	var federated_media_section = fm_pairs['federated_media_section'];
}

var federated_media_section_source = '';
if (typeof(federated_media_section) == "string") {
  federated_media_section_source = federated_media_section.replace(/([^a-zA-Z0-9_\-\/])|(^\/)/g, "");
  var federated_media_sections = ["homepage","blog","bing_rewards"];
  var section_match = 0;
  for (i = 0; i < federated_media_sections.length; i++) {
    if (federated_media_section_source.toLowerCase() == federated_media_sections[i].toLowerCase()) {
      federated_media_section_source = federated_media_sections[i];
      section_match = 1;
      break;
    }
  }
  if (!section_match) {
    federated_media_section_source = '';
  }
}

var federated_media_tile;
if (typeof(federated_media_tile) == "undefined") {
  federated_media_tile = 1;
} else {
  federated_media_tile++;
}
var federated_media_random_number;
if (typeof(federated_media_random_number) == "undefined") {
  federated_media_random_number = Math.random()*10000000000000000;
}

function _quantgc(n) {
  var c=document.cookie;if(!c)return '';
  var i=c.indexOf(n+"=");if(-1==i)return '';
  var len=i+n.length+1;
  var end=c.indexOf(";", len);
  return c.substring(len,end<0?c.length:end);
}
quantSegs = "";
var _qsegs = _quantgc('__qseg').split('|');
for (var i = 0; i < _qsegs.length; i++) {
  var qArr = _qsegs[i].split("_");
  if (qArr.length>1) { quantSegs += ("qcseg=" + qArr[1] + ";"); }
}
if (typeof(fm_custom_kvs) == "undefined") {
  fm_custom_kvs = "";
}

if(typeof fmwp == 'object') {
    var tp_params = [];
    var v;
    for (var k in fmwp) {
        v = fmwp[k];

        if (k === 'url') v = unescape(v);
            tp_params.push('wp'+k+'='+v);
    }
    fm_custom_kvs = tp_params.join(';');
}

if(fm_custom_kvs.substr(-1) == ";"){
    fm_custom_kvs = fm_custom_kvs.substr(0, fm_custom_kvs.length-1); //to avoid double semicolons (see next block), will be readded later
}

if(typeof(fm_pairs['fm_custom_kvs']) != "undefined") {
    fm_custom_kvs += fm_custom_kvs == "" ? unescape(fm_pairs['fm_custom_kvs']) : ';' + unescape(fm_pairs['fm_custom_kvs']);
} else if (top !== self && typeof(document.referrer) == "string" && document.referrer != "" && document.referrer.match(/fm_custom_kvs/i)) {
    var fm_custom_kvs_from_referrer = unescape(document.referrer.replace(/^.+?fm_custom_kvs=([^&;]*).*?$/i,"$1"));
    fm_custom_kvs +=
        fm_custom_kvs == "" ? fm_custom_kvs_from_referrer : ';' + fm_custom_kvs_from_referrer;
}

if (fm_custom_kvs.length > 0 && fm_custom_kvs.substr(-1) != ";") {
  fm_custom_kvs += ";";
}

// Sanitize custom kvs
fm_custom_kvs = fm_custom_kvs.replace(/[^;=a-zA-Z0-9!_-]/ig, '');

var _fm_cookie = document.cookie;
if (_fm_cookie && _fm_cookie.indexOf("_fm_bizo=") >= 0) {
    var _fm_bizo = _fm_cookie.match(/_fm_bizo=(.*?)(;|$)/)[1];
    _fm_bizo = unescape(_fm_bizo);
} else {
    var _fm_bizo = "";
}

if (_fm_cookie && _fm_cookie.indexOf("_fm_crowdscience=") >= 0) {
    var _fm_crowdscience = _fm_cookie.match(/_fm_crowdscience=(.*?)(;|$)/)[1];
    _fm_crowdscience = _fm_crowdscience.split('|').join(';') + ';';
} else {
    var _fm_crowdscience = "";
}

var ___fm_kw;
if (typeof(___fm_kw) == "undefined") {
  var _fm_kw_req = document.createElement('script'); _fm_kw_req.type = 'text/javascript'; _fm_kw_req.src = fmJsHost + 'keywords.fmpub.net/?t=js&s=80&u=' + __fm_enc_u;
  var _fmkwrq = document.getElementsByTagName('script')[0]; _fmkwrq.parentNode.insertBefore(_fm_kw_req,_fmkwrq);
  var __fmzkwrd274 = 'fmpub.makezine/' + (federated_media_section_source != "" ? "" + federated_media_section_source : "") + ';sz=728x90;fmzid=274;;fmcls=ATF;tile=' + federated_media_tile + ';' + quantSegs + _fm_bizo + _fm_crowdscience + fm_custom_kvs + 'ord=' + federated_media_random_number;
  document.write('<' + 'script type="text/javascript" src="' + fmJsHost +'keywords.fmpub.net/?t=r&s=80&u=' + __fm_enc_u + '&r=' + __fmzkwrd274.replace(/;/g,"_fM_") + (fmJsHost == 'https://' ? '&sec=1' : '') + '"></scr' + 'ipt>');
} else {
  var __fm_kw_kv = __fm_kw_kv || (___fm_kw != "" ? ___fm_kw : "");
  document.write('<' + 'script type="text/javascript" src="' + fmJsHost +'ad.doubleclick.net/adj/fmpub.makezine/' + (federated_media_section_source != "" ? "" + federated_media_section_source : "") + ';sz=728x90;fmzid=274;' + __fm_kw_kv + ';fmcls=ATF;tile=' + federated_media_tile + ';' + quantSegs + _fm_bizo + _fm_crowdscience + fm_custom_kvs + 'ord=' + federated_media_random_number +'"></scr' + 'ipt>');
}

// Invoke site pixel if it hasn't been already and if we are not in an iframe
if(top === self && typeof(async_site_pixel_request_sent) == "undefined") {
    document.write("<scr" + "ipt type='text/javascript' src='" + fmJsHost + "static.fmpub.net//site/makezine" + "'></scr" + "ipt>");
}

var __fmx = ''; if (federated_media_section_source!="") {__fmx='&s='+federated_media_section_source;} if (typeof(___fm_kw)!="undefined"&&___fm_kw!=""){__fmx+='&keywords='+___fm_kw.replace(/fmkw=/g,"").replace(/\;/g,"|");}
if (typeof(__fm_enc_u !== "undefined")) { __fmx += '&u='+__fm_enc_u;}
var tp_params = tp_params || [];
if (tp_params.length == 0) {
  if (typeof _fm_bizo !== 'undefined' && _fm_bizo.length > 0) tp_params.push(_fm_bizo);
  if (typeof _fm_crowdscience !== 'undefined' && _fm_crowdscience.length > 0) tp_params.push("cssegs="+_fm_crowdscience.replace(/csseg=/g,''));
  if (typeof quantSegs !== 'undefined' && quantSegs.length > 0) tp_params.push("qcsegs="+quantSegs.replace(/qcseg=/g,''));
}
if (tp_params.length > 0) {
  for (var i=tp_params.length; i--;)
    tp_params[i] = tp_params[i].replace(/;/g, '|').replace(/\|$/, '');
  __fmx += '&' + tp_params.join('&');
}
var __fmz274 = document.createElement('script'); __fmz274.type = 'text/javascript'; __fmz274.async = true; __fmz274.src = fmJsHost +'tenzing.fmpub.net/?t=z&n=274' + __fmx + '&fleur_de_sel=' + Math.floor(Math.random()*10000000000000000);
var _fmz = document.getElementsByTagName('script')[0]; _fmz.parentNode.insertBefore(__fmz274, _fmz);
