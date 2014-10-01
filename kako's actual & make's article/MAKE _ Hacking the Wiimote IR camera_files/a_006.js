// detect-zoom is dual-licensed under the WTFPL and MIT license,
// at the recipient's choice.
// https://github.com/yonran/detect-zoom/
var DetectZoom = {
  mediaQueryBinarySearch: function(
      property, unit, a, b, maxIter, epsilon) {
    var matchMedia, head, style, div, binarySearch;
    binarySearch = function(a, b, maxIter) {
      var mid = (a + b)/2;
      if (maxIter == 0 || b - a < epsilon) return mid;
      var query = "(" + property + ":" + mid + unit + ")";
      if (matchMedia(query).matches) {
        return binarySearch(mid, b, maxIter-1);
      } else {
        return binarySearch(a, mid, maxIter-1);
      }
    };
    if (window.matchMedia) {
      matchMedia = window.matchMedia;
    } else {
      head = document.getElementsByTagName('head')[0];
      style = document.createElement('style');
      div = document.createElement('div');
      div.className = 'mediaQueryBinarySearch';
      head.appendChild(style);
      div.style.display = 'none';
      document.body.appendChild(div);
      matchMedia = function(query) {
        style.sheet.insertRule('@media ' + query +
                               '{.mediaQueryBinarySearch ' +
                               '{text-decoration: underline} }', 0);
        var matched = getComputedStyle(div, null).textDecoration
            == 'underline';
        style.sheet.deleteRule(0);
        return {matches:matched};
      };
    }
    var r = binarySearch(a, b, maxIter);
    if (div) {
      head.removeChild(style);
      document.body.removeChild(div);
    }
    return r;
  },
  _zoomIe7: function() {
    // the trick: body's offsetWidth was in CSS pixels, while
    // getBoundingClientRect() was in system pixels in IE7.
    // Thanks to http://help.dottoro.com/ljgshbne.php
    var rect = document.body.getBoundingClientRect();
    var z = (rect.right-rect.left)/document.body.offsetWidth;
    z = Math.round(z * 100) / 100;
    return {zoom: z, devicePxPerCssPx: z};
  },
  _zoomIe8: function() {
    // IE 8+: no trick needed!
    // TODO: MSDN says that logicalXDPI and deviceXDPI existed since IE6
    // (which didn't even have whole-page zoom). Check to see whether
    // this method would also work in IE7.
    var zoom = screen.deviceXDPI / screen.logicalXDPI;
    return {
      zoom: zoom,
      devicePxPerCssPx: zoom
    };
  },
  _zoomWebkitMobile: function() {
    // the trick: window.innerWIdth is in CSS pixels, while
    // screen.width and screen.height are in system pixels.
    // And there are no scrollbars to mess up the measurement.
    var devicePixelRatio = window.devicePixelRatio != null ? window.devicePixelRatio : 1
      , deviceWidth;
    if ( Math.abs(window.orientation) == 90 ) {
      deviceWidth = screen.height;
    } else {
      deviceWidth = screen.width;
    }
    var z = deviceWidth / window.innerWidth;
    // return immediately; don't round at the end.
    return {zoom: z, devicePxPerCssPx: z*devicePixelRatio};
  },
  _zoomWebkit: function() {
    // the trick: an element's clientHeight is in CSS pixels, while you can
    // set its line-height in system pixels using font-size and
    // -webkit-text-size-adjust:none.
    // device-pixel-ratio: http://www.webkit.org/blog/55/high-dpi-web-sites/

    // Previous trick (used before http://trac.webkit.org/changeset/100847):
    // documentElement.scrollWidth is in CSS pixels, while
    // document.width was in system pixels. Note that this is the
    // layout width of the document, which is slightly different from viewport
    // because document width does not include scrollbars and might be wider
    // due to big elements.

    var devicePixelRatio = window.devicePixelRatio != null ? window.devicePixelRatio : 1;

    // The container exists so that the div will be laid out in its own flow
    // while not impacting the layout, viewport size, or display of the
    // webpage as a whole.
    var container = document.createElement('div')
      , div = document.createElement('div');
    
    // Add !important and relevant CSS rule resets
    // so that other rules cannot affect the results.
    var important = function(str){ return str.replace(/;/g, " !important;"); };
    
    container.setAttribute('style', important('width:0; height:0; overflow:hidden; visibility:hidden; position: absolute;'));
    div.innerHTML = "1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>0";
    div.setAttribute('style', important('font: 100px/1em sans-serif; -webkit-text-size-adjust: none; height: auto; width: 1em; padding: 0; overflow: visible;'));
    
    container.appendChild(div);
    document.body.appendChild(container);
    var z = 1000 / div.clientHeight;
    z = Math.round(z * 100) / 100;
    var r = {
      zoom: z,
      devicePxPerCssPx: devicePixelRatio * z
    };
    document.body.removeChild(container);
    return r;
  },
  _zoomFF35: function() {
    // the trick for FF3.5 ONLY: device-width gives CSS pixels, while
    // screen.width gave system pixels. Thanks to QuirksMode's widths table,
    // which called it a bug. http://www.quirksmode.org/m/widths.html
    var z = screen.width /
      this.mediaQueryBinarySearch('min-device-width', 'px', 0, 6000, 20, .0001);
    z = Math.round(z * 100) / 100;
    return {zoom: z, devicePxPerCssPx: z};
  },
  _zoomFF36: function() {
    // the hack for FF3.6: you can measure scrollbar's width in CSS pixels,
    // while in system pixels it's 15px (verified in Ubuntu).

    // TODO: verify for every platform that a scrollbar is exactly 15px wide.
    var container = document.createElement('div')
      , outerDiv = document.createElement('div');
    // The container exists so that the div will be laid out in its own flow
    // while not impacting the layout, viewport size, or display of the
    // webpage as a whole.
    container.setAttribute('style', 'width:0; height:0; overflow:hidden;' +
        'visibility:hidden; position: absolute');
    outerDiv.style.width = outerDiv.style.height = '500px';  // enough for all the scrollbars
    var div = outerDiv;
    for (var i = 0; i < 10; ++i) {
      var child = document.createElement('div');
      child.style.overflowY = 'scroll';
      div.appendChild(child);
      div = child;
    }
    container.appendChild(outerDiv);
    document.body.appendChild(container);
    var outerDivWidth = outerDiv.clientWidth;
    var innerDivWidth = div.clientWidth;
    var scrollbarWidthCss = (outerDivWidth - innerDivWidth)/10;
    document.body.removeChild(container);
    var scrollbarWidthDevice = 15;  // Mac and Linux: scrollbars are 15px wide
    if (-1 != navigator.platform.indexOf('Win')){
      scrollbarWidthDevice = 17;
    }
    var z = scrollbarWidthDevice / scrollbarWidthCss;
    z = Math.round(z * 100) / 100;
    return {zoom: z, devicePxPerCssPx: z};
  },
  _zoomFF4: function() {
    // no real trick; device-pixel-ratio is the ratio of device dpi / css dpi.
    // (Note that this is a different interpretation than Webkit's device
    // pixel ratio, which is the ratio device dpi / system dpi).
    // TODO: is mozmm vs. mm promising?
    var z = this.mediaQueryBinarySearch(
            'min--moz-device-pixel-ratio',
            '', 0, 10, 20, .0001);
    z = Math.round(z * 100) / 100;
    return {zoom: z, devicePxPerCssPx: z};
  },
  _zoomOperaOlder: function() {
    // 10.00 (or before) to 11.01:
    // the trick: a div with position:fixed;width:100%'s offsetWidth is the
    // viewport width in CSS pixels, while window.innerWidth was in system
    // pixels. Thanks to:
    // http://virtuelvis.com/2005/05/how-to-detect-zoom-level-in-opera/
    // TODO: fix bug: when there is a scrollbar, fixed div does NOT
    // include the scrollbar, while window.outerWidth DOES. This causes the
    // calculation to be off by a few percent.
    var fixedDiv = document.createElement('div');
    fixedDiv.style.position = 'fixed';
    fixedDiv.style.width = '100%';
    fixedDiv.style.height = '100%';
    fixedDiv.style.top = fixedDiv.style.left = '0';
    fixedDiv.style.visibility = 'hidden';
    document.body.appendChild(fixedDiv);
    var z = window.innerWidth / fixedDiv.offsetWidth;
    document.body.removeChild(fixedDiv);
    return {zoom: z, devicePxPerCssPx: z};
  },
  _zoomOpera11: function() {
    // works starting Opera 11.11
    // the trick: outerWidth is the viewport width including scrollbars in
    // system px, while innerWidth is the viewport width including scrollbars
    // in CSS px; 
    var z = window.outerWidth / window.innerWidth;
    z = Math.round(z * 100) / 100;
    return {zoom: z, devicePxPerCssPx: z};
  },
  ratios: function() {
    var r;
    if (! isNaN(screen.logicalXDPI) && ! isNaN(screen.systemXDPI) ) {
      return this._zoomIe8();
    } else if ('ontouchstart' in window && document.body.style.webkitTextSizeAdjust != null) {
      return this._zoomWebkitMobile();
    } else if (document.body.style.webkitTextSizeAdjust != null) {  // webkit
      return this._zoomWebkit();
    } else if (-1 != navigator.userAgent.indexOf('Firefox/3.5')) {
      return this._zoomFF35();
    } else if (-1 != navigator.userAgent.indexOf('Firefox/3.6')) {
      return this._zoomFF36();
    } else if (-1 != navigator.appVersion.indexOf("MSIE 7.")) {
      return this._zoomIe7();
    } else if (-1 != navigator.userAgent.indexOf('Opera')) {
      var versionIdx = navigator.userAgent.indexOf('Version/');
      if (11.01 < parseFloat(navigator.userAgent.substr(versionIdx + 8)))
        return this._zoomOpera11();
      else
        return this._zoomOperaOlder();
    } else if (0.001 < (r = this._zoomFF4()).zoom) {
      return r;
    } else {
      return {zoom: 1, devicePxPerCssPx: 1}
    }
  },
  zoom: function() {
    return this.ratios().zoom;
  },
  device: function() {
    return this.ratios().devicePxPerCssPx;
  }
};

var wpcom_img_zoomer = {
	zoomed: false,
	timer: null,
	interval: 1000, // zoom polling interval in millisecond

	// Should we apply width/height attributes to control the image size?
	imgNeedsSizeAtts: function( img ) {
		// Do not overwrite existing width/height attributes.
		if ( img.getAttribute('width') !== null || img.getAttribute('height') !== null )
			return false;
		// Do not apply the attributes if the image is already constrained by a parent element.
		if ( img.width < img.naturalWidth || img.height < img.naturalHeight )
			return false;
		return true;
	},

	init: function() {
		var t = this;
		try{
			t.zoomImages();
			t.timer = setInterval( function() { t.zoomImages(); }, t.interval );
		}
		catch(e){
		}
	},

	stop: function() {
		if ( this.timer )
			clearInterval( this.timer );
	},

	getScale: function() {
		var scale = DetectZoom.device();
		// Round up to 1.5 or the next integer below the cap.
		if      ( scale <= 1.0 ) scale = 1.0;
		else if ( scale <= 1.5 ) scale = 1.5;
		else if ( scale <= 2.0 ) scale = 2.0;
		else if ( scale <= 3.0 ) scale = 3.0;
		else if ( scale <= 4.0 ) scale = 4.0;
		else                     scale = 5.0;
		return scale;
	},

	shouldZoom: function( scale ) {
		var t = this;
		// Do not operate on hidden frames.
		if ( "innerWidth" in window && !window.innerWidth )
			return false;
		// Don't do anything until scale > 1
		if ( scale == 1.0 && t.zoomed == false )
			return false;
		return true;
	},

	zoomImages: function() {
		var t = this;
		var scale = t.getScale();
		if ( ! t.shouldZoom( scale ) ){
			return;
		}
		t.zoomed = true;
		// Loop through all the <img> elements on the page.
		var imgs = document.getElementsByTagName("img");

		for ( var i = 0; i < imgs.length; i++ ) {
			// Skip images that don't need processing.
			var imgScale = imgs[i].getAttribute("scale");
			if ( imgScale == scale || imgScale == "0" )
				continue;

			// Skip images that have already failed at this scale
			var scaleFail = imgs[i].getAttribute("scale-fail");
			if ( scaleFail && scaleFail <= scale )
				continue;

			// Skip images that have no dimensions yet.
			if ( ! ( imgs[i].width && imgs[i].height ) )
				continue;

			if ( t.scaleImage( imgs[i], scale ) ) {
				// Mark the img as having been processed at this scale.
				imgs[i].setAttribute("scale", scale);
			}
			else {
				// Set the flag to skip this image.
				imgs[i].setAttribute("scale", "0");
			}
		}
	},

	scaleImage: function( img, scale ) {
		var t = this;
		var newSrc = img.src;

		// Skip slideshow images
		if ( img.parentNode.className.match(/slideshow-slide/) )
			return false;

		// Scale gravatars that have ?s= or ?size=
		if ( img.src.match( /^https?:\/\/([^\/]*\.)?gravatar\.com\/.+[?&](s|size)=/ ) ) {
			newSrc = img.src.replace( /([?&](s|size)=)(\d+)/, function( $0, $1, $2, $3 ) {
				// Stash the original size
				var originalAtt = "originals",
				originalSize = img.getAttribute(originalAtt);
				if ( originalSize === null ) {
					originalSize = $3;
					img.setAttribute(originalAtt, originalSize);
					if ( t.imgNeedsSizeAtts( img ) ) {
						// Fix width and height attributes to rendered dimensions.
						img.width = img.width;
						img.height = img.height;
					}
				}
				// Get the width/height of the image in CSS pixels
				var size = img.clientWidth;
				// Convert CSS pixels to device pixels
				var targetSize = Math.ceil(img.clientWidth * scale);
				// Don't go smaller than the original size
				targetSize = Math.max( targetSize, originalSize );
				// Don't go larger than the service supports
				targetSize = Math.min( targetSize, 512 );
				return $1 + targetSize;
			});
		}

		// Scale resize queries (*.files.wordpress.com) that have ?w= or ?h=
		else if ( img.src.match( /^https?:\/\/([^\/]+)\.files\.wordpress\.com\/.+[?&][wh]=/ ) ) {
			if ( img.src.match( /[?&]crop/ ) )
				return false;
			var changedAttrs = {};
			var matches = img.src.match( /([?&]([wh])=)(\d+)/g );
			for ( var i = 0; i < matches.length; i++ ) {
				var lr = matches[i].split( '=' );
				var thisAttr = lr[0].replace(/[?&]/g, '' );
				var thisVal = lr[1];

				// Stash the original size
				var originalAtt = 'original' + thisAttr, originalSize = img.getAttribute( originalAtt );
				if ( originalSize === null ) {
					originalSize = thisVal;
					img.setAttribute(originalAtt, originalSize);
					if ( t.imgNeedsSizeAtts( img ) ) {
						// Fix width and height attributes to rendered dimensions.
						img.width = img.width;
						img.height = img.height;
					}
				}
				// Get the width/height of the image in CSS pixels
				var size = thisAttr == 'w' ? img.clientWidth : img.clientHeight;
				var naturalSize = ( thisAttr == 'w' ? img.naturalWidth : img.naturalHeight );
				// Convert CSS pixels to device pixels
				var targetSize = Math.ceil(size * scale);
				// Don't go smaller than the original size
				targetSize = Math.max( targetSize, originalSize );
				// Don't go bigger unless the current one is actually lacking
				if ( scale > img.getAttribute("scale") && targetSize <= naturalSize )
					targetSize = thisVal;
				// Don't try to go bigger if the image is already smaller than was requested
				if ( naturalSize < thisVal )
					targetSize = thisVal;
				if ( targetSize != thisVal )
					changedAttrs[ thisAttr ] = targetSize;
			}
			var w = changedAttrs.w || false;
			var h = changedAttrs.h || false;

			if ( w ) {
				newSrc = img.src.replace(/([?&])w=\d+/g, function( $0, $1 ) {
					return $1 + 'w=' + w;
				});
			}			
			if ( h ) {
				newSrc = newSrc.replace(/([?&])h=\d+/g, function( $0, $1 ) {
					return $1 + 'h=' + h;
				});
			}
		}

		// Scale mshots that have width
		else if ( img.src.match(/^https?:\/\/([^\/]+\.)*(wordpress|wp)\.com\/mshots\/.+[?&]w=\d+/) ) {
			newSrc = img.src.replace( /([?&]w=)(\d+)/, function($0, $1, $2) {
				// Stash the original size
				var originalAtt = 'originalw', originalSize = img.getAttribute(originalAtt);
				if ( originalSize === null ) {
					originalSize = $2;
					img.setAttribute(originalAtt, originalSize);
					if ( t.imgNeedsSizeAtts( img ) ) {
						// Fix width and height attributes to rendered dimensions.
						img.width = img.width;
						img.height = img.height;
					}
				}
				// Get the width of the image in CSS pixels
				var size = img.clientWidth;
				// Convert CSS pixels to device pixels
				var targetSize = Math.ceil(size * scale);
				// Don't go smaller than the original size
				targetSize = Math.max( targetSize, originalSize );
				// Don't go bigger unless the current one is actually lacking
				if ( scale > img.getAttribute("scale") && targetSize <= img.naturalWidth )
					targetSize = $2;
				if ( $2 != targetSize )
					return $1 + targetSize;
			});
		}

		// Scale simple imgpress queries (s0.wp.com) that only specify w/h/fit
		else if ( img.src.match(/^https?:\/\/([^\/.]+\.)*(wp|wordpress)\.com\/imgpress\?(.+)/) ) {
			var imgpressSafeFunctions = ["zoom", "url", "h", "w", "fit", "filter", "brightness", "contrast", "colorize", "smooth", "unsharpmask"];
			// Search the query string for unsupported functions.
			var qs = RegExp.$3.split('&');
			for ( var q in qs ) {
				q = qs[q].split('=')[0];
				if ( imgpressSafeFunctions.indexOf(q) == -1 ) {
					return false;
				}
			}
			// Fix width and height attributes to rendered dimensions.
			img.width = img.width;
			img.height = img.height;
			// Compute new src
			if ( scale == 1 )
				newSrc = img.src.replace(/\?(zoom=[^&]+&)?/, '?');
			else
				newSrc = img.src.replace(/\?(zoom=[^&]+&)?/, '?zoom=' + scale + '&');
		}

		// Scale LaTeX images
		else if ( img.src.match(/^https?:\/\/([^\/.]+\.)*(wp|wordpress)\.com\/latex\.php\?(latex|zoom)=(.+)/) ) {
			// Fix width and height attributes to rendered dimensions.
			img.width = img.width;
			img.height = img.height;
			// Compute new src
			if ( scale == 1 )
				newSrc = img.src.replace(/\?(zoom=[^&]+&)?/, '?');
			else
				newSrc = img.src.replace(/\?(zoom=[^&]+&)?/, '?zoom=' + scale + '&');
		}

		// Scale static assets that have a name matching *-1x.png or *@1x.png
		else if ( img.src.match(/^https?:\/\/[^\/]+\/.*[-@]([12])x\.(gif|jpeg|jpg|png)(\?|$)/) ) {
			// Fix width and height attributes to rendered dimensions.
			img.width = img.width;
			img.height = img.height;
			var currentSize = RegExp.$1, newSize = currentSize;
			if ( scale <= 1 )
				newSize = 1;
			else
				newSize = 2;
			if ( currentSize != newSize )
				newSrc = img.src.replace(/([-@])[12]x\.(gif|jpeg|jpg|png)(\?|$)/, '$1'+newSize+'x.$2$3');
		}

		else {
			return false;
		}

		// Don't set img.src unless it has changed. This avoids unnecessary reloads.
		if ( newSrc != img.src ) {
			// Store the original img.src
			var prevSrc, origSrc = img.getAttribute("src-orig");
			if ( !origSrc ) {
				origSrc = img.src;
				img.setAttribute("src-orig", origSrc);
			}
			// In case of error, revert img.src
			if ( img.complete )
				prevSrc = img.src;
			else
				prevSrc = origSrc;
			img.onerror = function(){
				img.src = prevSrc;
				if ( img.getAttribute("scale-fail") < scale )
					img.setAttribute("scale-fail", scale);
				img.onerror = null;
			};
			// Finally load the new image
			img.src = newSrc;
		}

		return true;
	}
};

wpcom_img_zoomer.init();
;
(function(e,h,l,c){e.fn.sonar=function(o,n){if(typeof o==="boolean"){n=o;o=c}return e.sonar(this[0],o,n)};var f=l.body,a="scrollin",m="scrollout",b=function(r,n,t){if(r){f||(f=l.body);var s=r,u=0,v=f.offsetHeight,o=h.innerHeight||l.documentElement.clientHeight||f.clientHeight||0,q=l.documentElement.scrollTop||h.pageYOffset||f.scrollTop||0,p=r.offsetHeight||0;if(!r.sonarElemTop||r.sonarBodyHeight!==v){if(s.offsetParent){do{u+=s.offsetTop}while(s=s.offsetParent)}r.sonarElemTop=u;r.sonarBodyHeight=v}n=n===c?0:n;return(!(r.sonarElemTop+(t?0:p)<q-n)&&!(r.sonarElemTop+(t?p:0)>q+o+n))}},d={},j=0,i=function(){setTimeout(function(){var s,o,t,q,p,r,n;for(t in d){o=d[t];for(r=0,n=o.length;r<n;r++){q=o[r];s=q.elem;p=b(s,q.px,q.full);if(t===m?!p:p){if(!q.tr){if(s[t]){e(s).trigger(t);q.tr=1}else{o.splice(r,1);r--;n--}}}else{q.tr=0}}}},25)},k=function(n,o){n[o]=0},g=function(r,p){var t=p.px,q=p.full,s=p.evt,o=b(r,t,q),n=0;r[s]=1;if(s===m?!o:o){setTimeout(function(){e(r).trigger(s===m?m:a)},0);n=1}d[s].push({elem:r,px:t,full:q,tr:n});if(!j){e(h).bind("scroll",i);j=1}};e.sonar=b;d[a]=[];e.event.special[a]={add:function(n){var p=n.data||{},o=this;if(!o[a]){g(this,{px:p.distance,full:p.full,evt:a})}},remove:function(n){k(this,a)}};d[m]=[];e.event.special[m]={add:function(n){var p=n.data||{},o=this;if(!o[m]){g(o,{px:p.distance,full:p.full,evt:m})}},remove:function(n){k(this,m)}}})(jQuery,window,document);;
(function($) {
	lazy_load_init();
	$( 'body' ).bind( 'post-load', lazy_load_init ); // Work with WP.com infinite scroll

	function lazy_load_init() {
		$( 'img[data-lazy-src]' ).bind( 'scrollin', { distance: 200 }, function() {
			lazy_load_image( this );
		});

		// We need to force load gallery images in Jetpack Carousel and give up lazy-loading otherwise images don't show up correctly
		$( '[data-carousel-extra]' ).each( function() {
			$( this ).find( 'img[data-lazy-src]' ).each( function() {
				lazy_load_image( this );
			} );		
		} );
	}

	function lazy_load_image( img ) {
		var $img = jQuery( img ),
			src = $img.attr( 'data-lazy-src' );

		if ( ! src || 'undefined' === typeof( src ) )
			return;

		$img.unbind( 'scrollin' ) // remove event binding
			.hide()
			.removeAttr( 'data-lazy-src' )
			.attr( 'data-lazy-loaded', 'true' );

		img.src = src;
		$img.fadeIn();
	}
})(jQuery);
;
