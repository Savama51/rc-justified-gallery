var rc_sb_currentSlideID,rc_sb_currentPosition,rc_sb_shadowboxHTML,rc_sb_slideURLs=new Array,rc_sb_slideIDs=new Array,rc_sb_slideRootElements=new Array,rc_sb_keyPressed=!1,rc_sb_buttonID=1,rc_sb_toolbarAddonButtonsHTML="",rc_sb_addonFunctions=new Array,rc_sb_runAfter=!0;function rc_sb_insertButton(e,r,_,s){var c="";void 0!==s&&(c+='<a href="'+s+'" title="'+e+'">'),c+='<div title="'+e+'" class="rc_sb_button rc_sb_addonbutton '+r+'" id="'+("rc_sb_addonbutton_"+rc_sb_buttonID)+'"></div>',void 0!==s&&(c+="</a>"),rc_sb_toolbarAddonButtonsHTML+=c,rc_sb_addonFunctions[rc_sb_buttonID]=function(){_()},rc_sb_buttonID++}function rc_sb_preload(e,r){rc_sb_runAfter=!0,jQuery("<img/>").load(function(){rc_sb_runAfter&&r()}).attr("src",e)}function rc_sb_setupSlides(){jQuery("a[rel^='shadowbox']").each(function(){rc_sb_slideURLs[rc_sb_slideURLs.length]=jQuery(this).attr("href"),rc_sb_slideIDs[rc_sb_slideIDs.length]="rc_sb_slide_"+rc_sb_slideIDs.length,rc_sb_slideRootElements[rc_sb_slideRootElements.length]=this}),jQuery("a[rel^='shadowbox']").on("click",function(e){e.preventDefault(),rc_sb_createShadowbox(),rc_sb_openSlide(rc_sb_slideURLs.indexOf(jQuery(this).attr("href")),!1,280)})}function rc_sb_openSlide(e,r,_){rc_sb_preload(rc_sb_slideURLs[e],function(){rc_sb_giveFocus(e,_),rc_sb_currentSlideID=e,rc_sb_updateNavigationButtons(e),jQuery("#"+rc_sb_slideIDs[e]).attr("src",rc_sb_slideURLs[e])});var s='<img class="rc_sb_image" id="'+rc_sb_slideIDs[e]+'" />';0==jQuery(".rc_sb_image").length?jQuery("#rc_sb_container").append(s):0==jQuery("#"+rc_sb_slideIDs[e]).length&&(r?jQuery(s).insertAfter("#"+rc_sb_slideIDs[rc_sb_currentSlideID]):jQuery(s).insertBefore("#"+rc_sb_slideIDs[rc_sb_currentSlideID])),rc_sb_putSlideInStartingPosition(e,_)}function rc_sb_initialiseShadowboxMarkup(){rc_sb_shadowboxHTML='<div id="rc_sb_overlay"></div><div id="rc_sb_container"><div id="rc_sb_toolbar"><div id="rc_sb_close" class="rc_sb_button"></div></div>',rc_sb_shadowboxHTML+='<div id="rc_sb_prev"  class="rc_sb_button"></div><div id="rc_sb_next"  class="rc_sb_button"></div></div>'}function rc_sb_createShadowbox(){0==jQuery("#rc_sb_overlay").length&&(jQuery(rc_sb_shadowboxHTML).hide().prependTo("body").fadeIn(280),jQuery("#rc_sb_toolbar").append(rc_sb_toolbarAddonButtonsHTML),rc_sb_initialiseControls())}function rc_sb_updateNavigationButtons(e){0==e?jQuery("#rc_sb_prev").fadeOut(140):jQuery("#rc_sb_prev").fadeIn(140),e==rc_sb_slideIDs.length-1?jQuery("#rc_sb_next").fadeOut(140):jQuery("#rc_sb_next").fadeIn(140)}function rc_sb_closeShadowbox(){jQuery("#rc_sb_overlay").fadeOut(280,function(){jQuery(this).remove()}),rc_sb_placeSlideOverSourceElement(rc_sb_currentSlideID,280,0),jQuery(".rc_sb_button").remove(),setTimeout(function(){jQuery("#rc_sb_container").remove()},280),rc_sb_runAfter=!1}function rc_sb_putSlideInStartingPosition(e,r){1==jQuery(".rc_sb_image").length?rc_sb_placeSlideOverSourceElement(e,0,0):rc_sb_placeSlideInCenterAtBack(e,0,0)}function rc_sb_giveFocus(e,r){rc_sb_expandSlideToRequiredSize(e,280,r)}function rc_sb_loseFocus(e,r){switch(r){case"left":jQuery("#"+rc_sb_slideIDs[e]).animate({left:"-50%",zIndex:"99996"},280);break;case"right":default:jQuery("#"+rc_sb_slideIDs[e]).animate({left:"150%",zIndex:"99996"},280)}}function rc_sb_next(){rc_sb_currentSlideID<rc_sb_slideIDs.length-1&&(rc_sb_loseFocus(rc_sb_currentSlideID,"left"),rc_sb_openSlide(rc_sb_currentSlideID+1,!0))}function rc_sb_prev(){rc_sb_currentSlideID>0&&(rc_sb_loseFocus(rc_sb_currentSlideID,"right"),rc_sb_openSlide(rc_sb_currentSlideID-1,!1))}function rc_sb_expandSlideToRequiredSize(e,r,_){rc_sb_currentPosition="FULL_SCREEN";var s=rc_sb_getRatio(jQuery(rc_sb_slideRootElements[e]).children().first()),c=rc_sb_getRatio(jQuery("#rc_sb_container")),n=jQuery("#rc_sb_container").width()*rc_sb_expandSize,i=jQuery("#rc_sb_container").height()*rc_sb_expandSize;s>=c?i=n/s:n=i*s,jQuery("#"+rc_sb_slideIDs[e]).delay(_).animate({marginLeft:-n/2+"px",left:"50%",top:jQuery("#rc_sb_container").height()/2+"px",width:n+"px",height:i+"px",zIndex:"99997"},r,"linear")}function rc_sb_placeSlideOverSourceElement(e,r,_){rc_sb_currentPosition="OVERLAID";var s=jQuery(rc_sb_slideRootElements[e]).children().first(),c=jQuery(s).width(),n=jQuery(s).height(),i=jQuery(s).position().top+n/2-jQuery(window).scrollTop(),t=jQuery(s).position().left-jQuery(window).scrollLeft();jQuery("#"+rc_sb_slideIDs[e]).animate({marginLeft:"0",top:i+"px",left:t+"px",width:c+"px",height:n+"px",zIndex:"99996"},r)}function rc_sb_placeSlideInCenterAtBack(e,r){rc_sb_currentPosition="CENTER",jQuery("#"+rc_sb_slideIDs[e]).animate({marginLeft:"0",top:jQuery("#rc_sb_container").height()/2-35+"px",left:jQuery("#rc_sb_container").width()/2-35+"px",width:"70px",height:"70px",zIndex:"99996"},r)}function rc_sb_getRatio(e){return initWidth=jQuery(e).width(),initHeight=jQuery(e).height(),initWidth/initHeight}function rc_sb_initialiseControls(){jQuery(".rc_sb_addonbutton").on("click",function(){var e=jQuery(this).attr("id").replace("rc_sb_addonbutton_","");rc_sb_addonFunctions[e]()}),jQuery("#rc_sb_prev").on("click",function(){rc_sb_prev()}),jQuery("#rc_sb_next").on("click",function(){rc_sb_next()}),jQuery("#rc_sb_close").on("click",function(){rc_sb_closeShadowbox()}),jQuery("#rc_sb_container").on("click",function(e){if(e.target!=this)return!1;rc_sb_closeShadowbox()}),jQuery("#rc_sb_container").on("swipeleft",function(e){rc_sb_next()}),jQuery("#rc_sb_container").on("swiperight",function(e){rc_sb_prev()}),jQuery(document).on("keydown",function(e){if(!rc_sb_keyPressed)switch(e.which){case 37:rc_sb_prev();break;case 39:rc_sb_next();break;case 27:case 8:rc_sb_closeShadowbox()}rc_sb_keyPressed=!0}),jQuery(document).on("keyup",function(){rc_sb_keyPressed=!1})}function rc_sb_openAnchorLinkedSlide(){"#rc_"==window.location.hash.substring(0,4)&&jQuery(window.location.hash).parent().trigger("click")}function rc_sb_getAnchorLinkForCurrentSlide(){return jQuery(rc_sb_slideRootElements[rc_sb_currentSlideID]).children().first().attr("id")}jQuery(function(){rc_sb_initialiseShadowboxMarkup(),rc_sb_setupSlides(),rc_sb_preload(rc_sb_imgFolder+"loading.gif",function(){}),rc_sb_preload(rc_sb_imgFolder+"close.png",function(){}),rc_sb_preload(rc_sb_imgFolder+"prev.png",function(){}),rc_sb_preload(rc_sb_imgFolder+"next.png",function(){}),rc_sb_openAnchorLinkedSlide()}),jQuery(window).on("hashchange",function(){rc_sb_openAnchorLinkedSlide()}),jQuery(window).resize(function(){rc_sb_expandSlideToRequiredSize(rc_sb_currentSlideID,0,0)}),jQuery(window).scroll(function(){"OVERLAID"==rc_sb_currentPosition&&rc_sb_placeSlideOverSourceElement(rc_sb_currentSlideID,0,0)});var isSlideshow=!1,slideShowInterval=5e3;function beginSlideShow(){rc_sb_createShadowbox(),rc_sb_openSlide(rc_sb_slideURLs.indexOf(jQuery(this).attr("href")),!1,280),setTimeout(stepSlideShow,slideShowInterval)}function stepSlideShow(){setTimeout(stepSlideShow,slideShowInterval)}