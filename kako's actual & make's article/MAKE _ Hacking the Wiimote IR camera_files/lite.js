if(typeof LJT_Lite!="object")var LJT_Lite=function(){var global={};try{global={errors:[],guid:function(){var myGuid=(new Date).getTime()+((1+Math.random())*65536|0).toString(16).substring(1)+((1+Math.random())*65536|0).toString(16).substring(1)+((1+Math.random())*65536|0).toString(16).substring(1);window.LJT_Lite.guid=function(){return myGuid};return myGuid},legacyBeacon:function(type,informer_uri,legacyOpts){var payload={informer_uri:informer_uri,image_tracking:LJT.imageTracking,tracker_uri:"res/images/wijitTrack.gif",
rr:"",informerID:legacyOpts.informer,pubCategoryId:legacyOpts.pubCategoryId,isQuantcastEnabled:legacyOpts.isQuantcastEnabled,isComscoreEnabled:legacyOpts.isComscoreEnabled,dataProviders:legacyOpts.dataProviders,threePTrackers:legacyOpts.threePTrackers,beacon:legacyOpts.beacon};if(legacyOpts.viglink&&legacyOpts.viglink.apiKey!=="0")payload.viglink={vigLinkCUID:legacyOpts.viglink.vigLinkCUID,apiKey:legacyOpts.viglink.apiKey,libURL:legacyOpts.viglink.urlOfLib};this.fireBeacon(type,payload)},beaconFIRED:false,
fireBeacon:function(type,payload){try{payload=payload||this.lastPayload;if(payload.informer_uri){var wijitTrack=new Image;var query="uri="+encodeURIComponent(payload.informer_uri);query+="&informer="+encodeURIComponent(payload.informerID);query+="&viewId="+this.guid();query+="&rand="+(new Date).getTime();if(typeof payload.rr!=="undefined"&&payload.rr.length>0)query+="&rr="+encodeURIComponent(payload.rr);else if(document.referrer.length>0)query+="&rr="+encodeURIComponent(document.referrer);query+=
"&type="+type;var wijitTrackUrl=payload.image_tracking+payload.tracker_uri+"?"+query;if(!this.beaconFIRED){wijitTrackUrl+="&beacon=1";this.beaconFIRED=true;this.beaconWijit=type;wijitTrack.onload=function(){try{LJT_Lite.readerBeacon(type,payload)}catch(Err){LJT_Lite.errors.push(["readerBeacon",Err])}};wijitTrack.src=wijitTrackUrl;if(payload.viglink)try{this.viglink(payload.viglink,payload)}catch(Err){this.errors.push(["Viglink",Err])}try{this.thirdParty(payload)}catch(Err){this.errors.push(["ThirdParty",
Err])}if(payload.threePTrackers)try{this.wijit_3p_trackers(payload.threePTrackers,payload)}catch(Err){this.errors.push("3p",Err)}}else{console.debug("Beacon Fired");x.src=url}this.lastPayload=payload}}catch(Err){this.errors.push(["ThirdParty",Err])}},wijit_3p_trackers:function(urls,payload){var location=document.location.href;var rr=payload.rr;var rand=parseInt(Math.random()*99999);for(i=0;i<urls.length;i++)try{var out=new Image;out.src=urls[i].replace(/@location@/,location).replace(/@rr@/,rr).replace(/@rnd@/,
rand)}catch(Err){this.errors.push(["3p attempt",Err])}},thirdParty:function(payload){var rnd=Math.floor(Math.random()*999999999+1);try{var img1=new Image;img1.src="http://b.scorecardresearch.com/b?c1=7&c2=6401037&c3="+payload.pubCategoryId+"&c4=&c5=&c6=&c15=&cv=1.3&cj=1&ljt_r="+rnd;delete img1}catch(Err){LJT_Lite.errors.push(Err)}try{var img2=new Image;img2.src="http://pixel.quantserve.com/pixel/p-01ujhAj7lIRP-.gif?r="+rnd;delete img2}catch(Err){LJT_Lite.errors.push(Err)}},viglink:function(vigOpts,
payload){if(typeof vigOpts=="object"){var vglnk_domain="http://api.viglink.com";var url=vigOpts.libURL+"?key="+vigOpts.apiKey+"&sub_id="+vigOpts.vigLinkCUID;document.write('<script src="'+url+'"><\/script>');window.vglnk={api_url:"http://api.viglink.com/api",key:vigOpts.apiKey,sub_id:""+vigOpts.vigLinkCUID}}},readerBeacon:function(type,payload){var query="viewId="+LJT_Lite.guid();query+="&rand="+(new Date).getTime();query+="&uri="+encodeURIComponent(payload.informer_uri);query+="&informer="+payload.informerID;
query+="&v=1.0";query+="&type="+type;if(typeof payload.rr!=="undefined"&&payload.rr.length>0)query+="&rr="+encodeURIComponent(payload.rr);else if(document.referrer.length>0)query+="&rr="+encodeURIComponent(document.referrer);var beaconInit=false;var beacon=document.createElement("iframe");if(beacon.style){beacon.style.border="0";beacon.style.width="1px";beacon.style.height="1px";beacon.style.display="none";beaconInit=true}else if(typeof beacon.setAttribute=="function"){beacon.setAttribute("width",
"1px");beacon.setAttribute("height","1px");beacon.setAttribute("border","0");beaconInit=true}var url="";if(payload.beacon_url)beacon.src=payload.beacon_url+"?"+query;else beacon.src=payload.image_tracking+"beacon?"+query;if(document.body&&beaconInit)document.body.appendChild(beacon)}}}catch(Err){this.errors.push(Err)}return global}();