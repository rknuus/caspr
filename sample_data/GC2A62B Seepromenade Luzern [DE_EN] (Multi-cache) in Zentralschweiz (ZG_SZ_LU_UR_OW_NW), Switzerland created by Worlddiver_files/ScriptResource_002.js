var JSON;if(!JSON){JSON={}}(function(){function f(n){return n<10?"0"+n:n}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==="string"){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":value})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}}());
(function(a){var n,t,u,e,B,m,C,h,y,z,r=0,d={},p=[],q=0,c={},k=[],E=null,v=new Image,G=/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,R=/[^\.]\.(swf)\s*$/i,H,I=1,x=0,w="",s,g,l=!1,A=a.extend(a("<div/>")[0],{prop:0}),J=a.browser.msie&&7>a.browser.version&&!window.XMLHttpRequest,K=function(){t.hide();v.onerror=v.onload=null;E&&E.abort();n.empty()},L=function(){!1===d.onError(p,r,d)?(t.hide(),l=!1):(d.titleShow=!1,d.width="auto",d.height="auto",n.html('<p id="fancybox-error">The requested content cannot be loaded.<br />Please try again later.</p>'),
D())},F=function(){var b=p[r],f,c,e,g,k,h;K();d=a.extend({},a.fn.fancybox.defaults,"undefined"==typeof a(b).data("fancybox")?d:a(b).data("fancybox"));h=d.onStart(p,r,d);if(!1===h)l=!1;else{"object"==typeof h&&(d=a.extend(d,h));e=d.title||(b.nodeName?a(b).attr("title"):b.title)||"";b.nodeName&&!d.orig&&(d.orig=a(b).children("img:first").length?a(b).children("img:first"):a(b));""===e&&(d.orig&&d.titleFromAlt)&&(e=d.orig.attr("alt"));f=d.href||(b.nodeName?a(b).attr("href"):b.href)||null;if(/^(?:javascript)/i.test(f)||
"#"==f)f=null;d.type?(c=d.type,f||(f=d.content)):d.content?c="html":f&&(c=f.match(G)?"image":f.match(R)?"swf":a(b).hasClass("iframe")?"iframe":0===f.indexOf("#")?"inline":"ajax");if(c)switch("inline"==c&&(b=f.substr(f.indexOf("#")),c=0<a(b).length?"inline":"ajax"),d.type=c,d.href=f,d.title=e,d.autoDimensions&&("html"==d.type||"inline"==d.type||"ajax"==d.type?(d.width="auto",d.height="auto"):d.autoDimensions=!1),d.modal&&(d.overlayShow=!0,d.hideOnOverlayClick=!1,d.hideOnContentClick=!1,d.enableEscapeButton=
!1,d.showCloseButton=!1),d.padding=parseInt(d.padding,10),d.margin=parseInt(d.margin,10),n.css("padding",d.padding+d.margin),a(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change",function(){a(this).replaceWith(m.children())}),c){case "html":n.html(d.content);D();break;case "inline":if(!0===a(b).parent().is("#fancybox-content")){l=!1;break}a('<div class="fancybox-inline-tmp" />').hide().insertBefore(a(b)).bind("fancybox-cleanup",function(){a(this).replaceWith(m.children())}).bind("fancybox-cancel",
function(){a(this).replaceWith(n.children())});a(b).appendTo(n);D();break;case "image":l=!1;a.fancybox.showActivity();v=new Image;v.onerror=function(){L()};v.onload=function(){l=!0;v.onerror=v.onload=null;d.width=v.width;d.height=v.height;a("<img />").attr({id:"fancybox-img",src:v.src,alt:d.title}).appendTo(n);M()};v.src=f;break;case "swf":d.scrolling="no";g='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+d.width+'" height="'+d.height+'"><param name="movie" value="'+f+'"></param>';
k="";a.each(d.swf,function(b,a){g+='<param name="'+b+'" value="'+a+'"></param>';k+=" "+b+'="'+a+'"'});g+='<embed src="'+f+'" type="application/x-shockwave-flash" width="'+d.width+'" height="'+d.height+'"'+k+"></embed></object>";n.html(g);D();break;case "ajax":l=!1;a.fancybox.showActivity();d.ajax.win=d.ajax.success;E=a.ajax(a.extend({},d.ajax,{url:f,data:d.ajax.data||{},error:function(b,a,f){0<b.status&&L()},success:function(b,a,c){if(200==("object"==typeof c?c:E).status){if("function"==typeof d.ajax.win){h=
d.ajax.win(f,b,a,c);if(!1===h){t.hide();return}if("string"==typeof h||"object"==typeof h)b=h}n.html(b);D()}}}));break;case "iframe":M()}else L()}},D=function(){var b=d.width,c=d.height,b=-1<b.toString().indexOf("%")?parseInt((a(window).width()-2*d.margin)*parseFloat(b)/100,10)+"px":"auto"==b?"auto":b+"px",c=-1<c.toString().indexOf("%")?parseInt((a(window).height()-2*d.margin)*parseFloat(c)/100,10)+"px":"auto"==c?"auto":c+"px";n.wrapInner('<div style="width:'+b+";height:"+c+";overflow: "+("auto"==
d.scrolling?"auto":"yes"==d.scrolling?"scroll":"hidden")+';position:relative;"></div>');d.width=n.width();d.height=n.height();M()},M=function(){var b,f;t.hide();if(c.onCleanup&&e.is(":visible")&&!1===c.onCleanup(k,q,c))a.event.trigger("fancybox-cancel"),l=!1;else{l=!0;a(m.add(u)).unbind();a(window).unbind("resize.fb scroll.fb");a(document).unbind("keydown.fb");e.is(":visible")&&"outside"!==c.titlePosition&&e.css("height",e.height());k=p;q=r;c=d;if(c.overlayShow){if(u.css({"background-color":c.overlayColor,
opacity:c.overlayOpacity,cursor:c.hideOnOverlayClick?"pointer":"auto",height:a(document).height()}),!u.is(":visible")){if(J)a("select:not(#fancybox-tmp select)").filter(function(){return"hidden"!==this.style.visibility}).css({visibility:"hidden"}).one("fancybox-cleanup",function(){this.style.visibility="inherit"});u.show()}}else u.hide();g=S();w=c.title||"";x=0;h.empty().removeAttr("style").removeClass();if(!1!==c.titleShow&&(w=a.isFunction(c.titleFormat)?c.titleFormat(w,k,q,c):w&&w.length?"float"==
c.titlePosition?'<table id="fancybox-title-float-wrap" cellpadding="0" cellspacing="0"><tr><td id="fancybox-title-float-left"></td><td id="fancybox-title-float-main">'+w+'</td><td id="fancybox-title-float-right"></td></tr></table>':'<div id="fancybox-title-'+c.titlePosition+'">'+w+"</div>":!1)&&""!==w)switch(h.addClass("fancybox-title-"+c.titlePosition).html(w).appendTo("body").show(),c.titlePosition){case "inside":h.css({width:g.width-2*c.padding,marginLeft:c.padding,marginRight:c.padding});x=h.outerHeight(!0);
h.appendTo(B);g.height+=x;break;case "over":h.css({marginLeft:c.padding,width:g.width-2*c.padding,bottom:c.padding}).appendTo(B);break;case "float":h.css("left",-1*parseInt((h.width()-g.width-40)/2,10)).appendTo(e);break;default:h.css({width:g.width-2*c.padding,paddingLeft:c.padding,paddingRight:c.padding}).appendTo(e)}h.hide();e.is(":visible")?(a(C.add(y).add(z)).hide(),b=e.position(),s={top:b.top,left:b.left,width:e.width(),height:e.height()},f=s.width==g.width&&s.height==g.height,m.fadeTo(c.changeFade,
0.3,function(){var b=function(){m.html(n.contents()).fadeTo(c.changeFade,1,N)};a.event.trigger("fancybox-change");m.empty().removeAttr("filter").css({"border-width":c.padding,width:g.width-2*c.padding,height:d.autoDimensions?"auto":g.height-x-2*c.padding});f?b():(A.prop=0,a(A).animate({prop:1},{duration:c.changeSpeed,easing:c.easingChange,step:O,complete:b}))})):(e.removeAttr("style"),m.css("border-width",c.padding),"elastic"==c.transitionIn?(s=Q(),m.html(n.contents()),e.show(),c.opacity&&(g.opacity=
0),A.prop=0,a(A).animate({prop:1},{duration:c.speedIn,easing:c.easingIn,step:O,complete:N})):("inside"==c.titlePosition&&0<x&&h.show(),m.css({width:g.width-2*c.padding,height:d.autoDimensions?"auto":g.height-x-2*c.padding}).html(n.contents()),e.css(g).fadeIn("none"==c.transitionIn?0:c.speedIn,N)))}},T=function(){(c.enableEscapeButton||c.enableKeyboardNav)&&a(document).bind("keydown.fb",function(b){if(27==b.keyCode&&c.enableEscapeButton)b.preventDefault(),a.fancybox.close();else if((37==b.keyCode||
39==b.keyCode)&&c.enableKeyboardNav&&"INPUT"!==b.target.tagName&&"TEXTAREA"!==b.target.tagName&&"SELECT"!==b.target.tagName)b.preventDefault(),a.fancybox[37==b.keyCode?"prev":"next"]()});c.showNavArrows?((c.cyclic&&1<k.length||0!==q)&&y.show(),(c.cyclic&&1<k.length||q!=k.length-1)&&z.show()):(y.hide(),z.hide())},N=function(){a.support.opacity||(m.get(0).style.removeAttribute("filter"),e.get(0).style.removeAttribute("filter"));d.autoDimensions&&m.css("height","auto");e.css("height","auto");w&&w.length&&
h.show();c.showCloseButton&&C.show();T();c.hideOnContentClick&&m.bind("click",a.fancybox.close);c.hideOnOverlayClick&&u.bind("click",a.fancybox.close);a(window).bind("resize.fb",a.fancybox.resize);c.centerOnScroll&&a(window).bind("scroll.fb",a.fancybox.center);"iframe"==c.type&&a('<iframe id="fancybox-frame" name="fancybox-frame'+(new Date).getTime()+'" frameborder="0" hspace="0" '+(a.browser.msie?'allowtransparency="true""':"")+' scrolling="'+d.scrolling+'" src="'+c.href+'"></iframe>').appendTo(m);
e.show();l=!1;a.fancybox.center();c.onComplete(k,q,c);var b,f;k.length-1>q&&(b=k[q+1].href,"undefined"!==typeof b&&b.match(G)&&(f=new Image,f.src=b));0<q&&(b=k[q-1].href,"undefined"!==typeof b&&b.match(G)&&(f=new Image,f.src=b))},O=function(b){var a={width:parseInt(s.width+(g.width-s.width)*b,10),height:parseInt(s.height+(g.height-s.height)*b,10),top:parseInt(s.top+(g.top-s.top)*b,10),left:parseInt(s.left+(g.left-s.left)*b,10)};"undefined"!==typeof g.opacity&&(a.opacity=0.5>b?0.5:b);e.css(a);m.css({width:a.width-
2*c.padding,height:a.height-x*b-2*c.padding})},P=function(){return[a(window).width()-2*c.margin,a(window).height()-2*c.margin,a(document).scrollLeft()+c.margin,a(document).scrollTop()+c.margin]},S=function(){var b=P(),a={},e=c.autoScale,g=2*c.padding;-1<c.width.toString().indexOf("%")?a.width=parseInt(b[0]*parseFloat(c.width)/100,10):a.width=c.width+g;-1<c.height.toString().indexOf("%")?a.height=parseInt(b[1]*parseFloat(c.height)/100,10):a.height=c.height+g;if(e&&(a.width>b[0]||a.height>b[1]))"image"==
d.type||"swf"==d.type?(e=c.width/c.height,a.width>b[0]&&(a.width=b[0],a.height=parseInt((a.width-g)/e+g,10)),a.height>b[1]&&(a.height=b[1],a.width=parseInt((a.height-g)*e+g,10))):(a.width=Math.min(a.width,b[0]),a.height=Math.min(a.height,b[1]));a.top=parseInt(Math.max(b[3]-20,b[3]+0.5*(b[1]-a.height-40)),10);a.left=parseInt(Math.max(b[2]-20,b[2]+0.5*(b[0]-a.width-40)),10);return a},Q=function(){var b=d.orig?a(d.orig):!1,f={};b&&b.length?(f=b.offset(),f.top+=parseInt(b.css("paddingTop"),10)||0,f.left+=
parseInt(b.css("paddingLeft"),10)||0,f.top+=parseInt(b.css("border-top-width"),10)||0,f.left+=parseInt(b.css("border-left-width"),10)||0,f.width=b.width(),f.height=b.height(),f={width:f.width+2*c.padding,height:f.height+2*c.padding,top:f.top-c.padding-20,left:f.left-c.padding-20}):(b=P(),f={width:2*c.padding,height:2*c.padding,top:parseInt(b[3]+0.5*b[1],10),left:parseInt(b[2]+0.5*b[0],10)});return f},U=function(){t.is(":visible")?(a("div",t).css("top",-40*I+"px"),I=(I+1)%12):clearInterval(H)};a.fn.fancybox=
function(b){if(!a(this).length)return this;a(this).data("fancybox",a.extend({},b,a.metadata?a(this).metadata():{})).unbind("click.fb").bind("click.fb",function(b){b.preventDefault();l||(l=!0,a(this).blur(),p=[],r=0,b=a(this).attr("rel")||"",!b||""==b||"nofollow"===b?p.push(this):(p=a("a[rel='"+b+"'], area[rel='"+b+"']"),r=p.index(this)),F())});return this};a.fancybox=function(b,c){var d;if(!l){l=!0;d="undefined"!==typeof c?c:{};p=[];r=parseInt(d.index,10)||0;if(a.isArray(b)){for(var e=0,g=b.length;e<
g;e++)"object"==typeof b[e]?a(b[e]).data("fancybox",a.extend({},d,b[e])):b[e]=a({}).data("fancybox",a.extend({content:b[e]},d));p=jQuery.merge(p,b)}else"object"==typeof b?a(b).data("fancybox",a.extend({},d,b)):b=a({}).data("fancybox",a.extend({content:b},d)),p.push(b);if(r>p.length||0>r)r=0;F()}};a.fancybox.showActivity=function(){clearInterval(H);t.show();H=setInterval(U,66)};a.fancybox.hideActivity=function(){t.hide()};a.fancybox.next=function(){return a.fancybox.pos(q+1)};a.fancybox.prev=function(){return a.fancybox.pos(q-
1)};a.fancybox.pos=function(a){l||(a=parseInt(a),p=k,-1<a&&a<k.length?(r=a,F()):c.cyclic&&1<k.length&&(r=a>=k.length?0:k.length-1,F()))};a.fancybox.cancel=function(){l||(l=!0,a.event.trigger("fancybox-cancel"),K(),d.onCancel(p,r,d),l=!1)};a.fancybox.close=function(){function b(){u.fadeOut("fast");h.empty().hide();e.hide();a.event.trigger("fancybox-cleanup");m.empty();c.onClosed(k,q,c);k=d=[];q=r=0;c=d={};l=!1}if(!l&&!e.is(":hidden"))if(l=!0,c&&!1===c.onCleanup(k,q,c))l=!1;else if(K(),a(C.add(y).add(z)).hide(),
a(m.add(u)).unbind(),a(window).unbind("resize.fb scroll.fb"),a(document).unbind("keydown.fb"),m.find("iframe").attr("src",J&&/^https/i.test(window.location.href||"")?"javascript:void(false)":"about:blank"),"inside"!==c.titlePosition&&h.empty(),e.stop(),"elastic"==c.transitionOut){s=Q();var f=e.position();g={top:f.top,left:f.left,width:e.width(),height:e.height()};c.opacity&&(g.opacity=1);h.empty().hide();A.prop=1;a(A).animate({prop:0},{duration:c.speedOut,easing:c.easingOut,step:O,complete:b})}else e.fadeOut("none"==
c.transitionOut?0:c.speedOut,b)};a.fancybox.resize=function(){u.is(":visible")&&u.css("height",a(document).height());a.fancybox.center(!0)};a.fancybox.center=function(a){var d,g;if(!l&&(g=!0===a?1:0,d=P(),g||!(e.width()>d[0]||e.height()>d[1])))e.stop().animate({top:parseInt(Math.max(d[3]-20,d[3]+0.5*(d[1]-m.height()-40)-c.padding)),left:parseInt(Math.max(d[2]-20,d[2]+0.5*(d[0]-m.width()-40)-c.padding))},"number"==typeof a?a:200)};a.fancybox.init=function(){a("#fancybox-wrap").length||(a("body").append(n=
a('<div id="fancybox-tmp"></div>'),t=a('<div id="fancybox-loading"><div></div></div>'),u=a('<div id="fancybox-overlay"></div>'),e=a('<div id="fancybox-wrap"></div>')),B=a('<div id="fancybox-outer"></div>').append('<div class="fancybox-bg" id="fancybox-bg-n"></div><div class="fancybox-bg" id="fancybox-bg-ne"></div><div class="fancybox-bg" id="fancybox-bg-e"></div><div class="fancybox-bg" id="fancybox-bg-se"></div><div class="fancybox-bg" id="fancybox-bg-s"></div><div class="fancybox-bg" id="fancybox-bg-sw"></div><div class="fancybox-bg" id="fancybox-bg-w"></div><div class="fancybox-bg" id="fancybox-bg-nw"></div>').appendTo(e),
B.append(m=a('<div id="fancybox-content"></div>'),C=a('<a id="fancybox-close"></a>'),h=a('<div id="fancybox-title"></div>'),y=a('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'),z=a('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>')),C.click(a.fancybox.close),t.click(a.fancybox.cancel),y.click(function(b){b.preventDefault();a.fancybox.prev()}),z.click(function(b){b.preventDefault();a.fancybox.next()}),
a.fn.mousewheel&&e.bind("mousewheel.fb",function(b,c){if(l)b.preventDefault();else if(0==a(b.target).get(0).clientHeight||a(b.target).get(0).scrollHeight===a(b.target).get(0).clientHeight)b.preventDefault(),a.fancybox[0<c?"prev":"next"]()}),a.support.opacity||e.addClass("fancybox-ie"),J&&(t.addClass("fancybox-ie6"),e.addClass("fancybox-ie6"),a('<iframe id="fancybox-hide-sel-frame" src="'+(/^https/i.test(window.location.href||"")?"javascript:void(false)":"about:blank")+'" scrolling="no" border="0" frameborder="0" tabindex="-1"></iframe>').prependTo(B)))};
a.fn.fancybox.defaults={padding:10,margin:40,opacity:!1,modal:!1,cyclic:!1,scrolling:"auto",width:560,height:340,autoScale:!0,autoDimensions:!0,centerOnScroll:!1,ajax:{},swf:{wmode:"transparent"},hideOnOverlayClick:!0,hideOnContentClick:!1,overlayShow:!0,overlayOpacity:0.7,overlayColor:"#777",titleShow:!0,titlePosition:"float",titleFormat:null,titleFromAlt:!1,transitionIn:"fade",transitionOut:"fade",speedIn:300,speedOut:300,changeSpeed:300,changeFade:"fast",easingIn:"swing",easingOut:"swing",showCloseButton:!0,
showNavArrows:!0,enableEscapeButton:!0,enableKeyboardNav:!0,onStart:function(){},onCancel:function(){},onComplete:function(){},onCleanup:function(){},onClosed:function(){},onError:function(){}};a(document).ready(function(){a.fancybox.init()})})(jQuery);

/* http://keith-wood.name/icalendar.html
iCalendar processing for jQuery v1.1.0.
Written by Keith Wood (kbwood{at}iinet.com.au) October 2008.
Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and 
MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses. 
Please attribute the author if you use it. */

(function($) { // Hide scope, no $ conflict

    var PROP_NAME = 'icalendar';
    var FLASH_ID = 'icalendar-flash-copy';

    /* iCalendar sharing manager. */
    function iCalendar() {
        this._defaults = {
            sites: [],  // List of site IDs to use, empty for all
            icons: '/js/jquery_plugins/icalendar/icalendar.png', // Horizontal amalgamation of all site icons
            iconSize: 16,  // The size of the individual icons
            target: '_blank',  // The name of the target window for the iCalendar links
            compact: false,  // True if a compact presentation should be used, false for full
            popup: false,  // True to have it popup on demand, false to show always
            popupText: 'Send to my calendar...', // Text for the popup trigger
            tipPrefix: '',  // Additional text to show in the tool tip for each icon
            echoUrl: '',  // The URL to echo back iCalendar content, or blank for clipboard
            echoField: '', // The ID of a field to copy the iCalendar definition into, or blank for clipboard
            start: null,  // The start date/time of the event
            end: null,  // The end date/time of the event
            title: '',  // The title of the event
            summary: '',  // The summary of the event
            description: '',  // The description of the event
            location: '',  // The location of the event
            url: '',  // A URL with more information about the event
            contact: '',  // An e-mail address for further contact about the event
            recurrence: null, // Details about a recurring event, an object with attributes:
            // dates (Date or Date[]) or times (Date or Date[]) or
            // periods (Date[2] or Date[][2] or [][Date, string]) or
            // freq (string - secondly, minutely, hourly, daily, weekly, monthly, yearly),
            // interval (number), until (Date), count (number), weekStart (number),
            // by (object or object[] - type (string - second, minute, day, monthday, yearday,
            // weekno, month, setpos), values (number or number[] or string or string[]))
            // Confirmation message for clipboard copy
            copyConfirm: 'The event will be copied to your clipboard. Continue?',
            // Success message during clipboard copy
            copySucceeded: 'The event has been copied to your clipboard',
            // Failure message during clipboard copy
            copyFailed: 'Failed to copy the event to the clipboard\n',
            copyFlash: 'clipboard.swf', // The URL for the Flash clipboard copy module
            // Clipboard not supported message
            copyUnavailable: 'The clipboard is unavailable, please copy the event details from below:\n'
        };
        this._sites = {  // The definitions of the available iCalendar sites
            'google': { display: 'Google', icon: 0, override: null,
                url: 'http://www.google.com/calendar/event?action=TEMPLATE' +
			'&amp;text={t}&amp;dates={s}/{e}&amp;details={d}&amp;location={l}&amp;sprop=website:{u}'
            }
            , 'outlook': {
                display: "Outlook / iCal",
                icon: 2,
                override: null,
                url: '/my/vcalendar.aspx?guid={g}'
            }
            , 'Windows Live': {
                display: "Windows Live",
                icon: 1,
                override: null,
                url: 'http://calendar.live.com/calendar/calendar.aspx?rru=addevent&dtstart={s}&dtend={e}&summary={t}&location={l}'   
            }
            //, 'icalendar': { display: 'iCalendar', icon: 1, override: null, url: 'echo' }
            //, 'outlook': { display: 'Outlook', icon: 2, override: null, url: 'echo' }
            , 'yahoo': { display: 'Yahoo', icon: 3, override: yahooOverride,
                url: 'http://calendar.yahoo.com/?v=60&amp;view=d&amp;type=20' + '&amp;title={t}&amp;st={s}&amp;dur={p}&amp;desc={d}&amp;in_loc={l}&amp;url={u}&amp;rpat={r}'
            }
        };
    }

    var FREQ_SETTINGS = [{ method: 'Seconds', factor: 1 },
	{ method: 'Minutes', factor: 60 }, { method: 'Hours', factor: 3600 },
	{ method: 'Date', factor: 86400 }, { method: 'Month', factor: 1 },
	{ method: 'FullYear', factor: 12 }, { method: 'Date', factor: 604800}];
    var SE = 0;
    var MI = 1;
    var HR = 2;
    var DY = 3;
    var MO = 4;
    var YR = 5;
    var WK = 6;

    $.extend(iCalendar.prototype, {
        /* Class name added to elements to indicate already configured with iCalendar. */
        markerClassName: 'hasICalendar',

        /* Override the default settings for all iCalendar instances.
        @param  settings  (object) the new settings to use as defaults
        @return void */
        setDefaults: function(settings) {
            extendRemove(this._defaults, settings || {});
            return this;
        },

        /* Add a new iCalendar site to the list.
        @param  id        (string) the ID of the new site
        @param  display   (string) the display name for this site
        @param  icon      (url) the location of an icon for this site (16x16), or
        (number) the index of the icon within the combined image
        @param  url       (url) the submission URL for this site
        with {t} marking where the event title should be inserted,
        {s} indicating the event start date/time insertion point,
        {e} indicating the event end date/time insertion point,
        {p} indicating the event period (duration) insertion point,
        {d} indicating the event description insertion point,
        {l} indicating the event location insertion point,
        {u} indicating the event URL insertion point,
        {c} indicating the event contact insertion point,
        {r} indicating the event recurrence insertion point
        {g} indicating the event guid - GSPK special
        @param  override  (function, optional) a function to override default settings
        @return void */
        addSite: function(id, display, icon, url, override) {
            this._sites[id] = { display: display, icon: icon, override: override, url: url };
            return this;
        },

        /* Return the list of defined sites.
        @return  object[] - indexed by site id (string), each object contains
        display (string) the display name,
        icon    (string) the location of the icon, or
        (number) the icon's index in the combined image
        url     (string) the submission URL for the site */
        getSites: function() {
            return this._sites;
        },

        /* Attach the iCalendar widget to a div. */
        _attachICalendar: function(target, settings) {
            target = $(target);
            if (target.hasClass(this.markerClassName)) {
                return;
            }
            target.addClass(this.markerClassName);
            this._updateICalendar(target, settings);
        },

        /* Reconfigure the settings for an iCalendar div. */
        _changeICalendar: function(target, settings) {
            target = $(target);
            if (!target.hasClass(this.markerClassName)) {
                return;
            }
            this._updateICalendar(target, settings);
        },

        /* Construct the requested iCalendar links. */
        _updateICalendar: function(target, settings) {
            settings = extendRemove($.extend({}, this._defaults,
			$.data(target[0], PROP_NAME) || {}), settings);
            $.data(target[0], PROP_NAME, settings);
            var sites = settings.sites || this._defaults.sites;
            if (sites.length == 0) { // default to all sites
                $.each(this._sites, function(id) {
                    sites[sites.length] = id;
                });
            }
            var addSite = function(site, calId) {
                var inserts = { t: encodeURIComponent(settings.title),
                    d: encodeURIComponent(settings.description),
                    s: $.icalendar.formatDateTime(settings.start),
                    e: $.icalendar.formatDateTime(settings.end),
                    p: $.icalendar.calculateDuration(settings.start, settings.end),
                    l: encodeURIComponent(settings.location),
                    u: encodeURIComponent(settings.url),
                    c: encodeURIComponent(settings.contact),
                    r: makeRecurrence(settings.recurrence),
                    g: settings.Guid
                };

                if (site.override) {
                    site.override.apply(target, [inserts, settings]);
                }
                var url = site.url;
                $.each(inserts, function(n, v) {
                    var re = new RegExp('\\{' + n + '\\}', 'g');
                    url = url.replace(re, v);
                });
                var url = (site.url == 'echo' ? '#' : url);
                var item = $('<li></li>');
                var anchor = $('<a href="' + url + '" title="' + settings.tipPrefix + site.display + '"' +
				(site.url == 'echo' ? '' : ' target="_blank"') + '></a>');
                if (site.url == 'echo') {
                    anchor.click(function() {
                        return $.icalendar._echo(target[0], calId);
                    });
                }
                var html = '';
                if (site.icon != null) {
                    if (typeof site.icon == 'number') {
                        html += '<span style="background: ' +
						'transparent url(' + settings.icons + ') no-repeat -' +
						(site.icon * settings.iconSize) + 'px 0px;' +
						($.browser.mozilla && $.browser.version < '1.9' ?
						' padding-left: ' + settings.iconSize + 'px; padding-bottom: ' +
						Math.max(0, (settings.iconSize / 2) - 5) + 'px;' : '') + '"></span>';
                    }
                    else {
                        html += '<img src="' + site.icon + '"' +
						(($.browser.mozilla && $.browser.version < '1.9') ||
						($.browser.msie && $.browser.version < '7.0') ?
						' style="vertical-align: bottom;"' :
						($.browser.msie ? ' style="vertical-align: middle;"' :
						($.browser.opera || $.browser.safari ?
						' style="vertical-align: baseline;"' : ''))) + '/>';
                    }
                    html += (settings.compact ? '' : '&#xa0;');
                }
                anchor.html(html + (settings.compact ? '' : site.display));
                item.append(anchor);
                return item;
            };
            var list = $('<ul class="icalendar_list' +
			(settings.compact ? ' icalendar_compact' : '') + '"></ul>');
            var allSites = this._sites;
            $.each(sites, function(index, id) {
                list.append(addSite(allSites[id], id));
            });
            target.empty().append(list);
            if (settings.popup) {
                list
                    .before(['<span class="icalendar_popup_text">', settings.popupText, '</span>'].join(''))
				    .wrap('<div class="icalendar_popup"></div>');

                target.click(function() {
                    var target = $(this);
                    var offset = target.offset();
                    $('.icalendar_popup', target)
                        .css('left', offset.left)
                        .css('top', offset.top + target.outerHeight()).toggle();
                });
            }
        },

        /* Remove the iCalendar widget from a div. */
        _destroyICalendar: function(target) {
            target = $(target);
            if (!target.hasClass(this.markerClassName)) {
                return;
            }
            target.removeClass(this.markerClassName).empty();
            $.removeData(target[0], PROP_NAME);
        },

        /* Echo the iCalendar text back to the user either as a
        downloadable file or via the clipboard.
        @param  target  (element) the owning division
        @param  calId  (string) the ID of the site to send the calendar to */
        _echo: function(target, calId) {
            var settings = $.data(target, PROP_NAME);
            var event = makeICalendar(settings);
            if (settings.echoUrl) {
                window.location.href = settings.echoUrl + '?content=' + escape(event);
            }
            else if (settings.echoField) {
                $(settings.echoField).val(event);
            }
            else if (!settings.copyFlash) {
                alert(settings.copyUnavailable + event);
            }
            else if (confirm(settings.copyConfirm)) {
                var error = '';
                if (error = copyViaFlash(event, settings.copyFlash)) {
                    alert(settings.copyFailed + error);
                }
                else {
                    alert(settings.copySucceeded);
                }
            }
            return false; // Don't follow link
        },

        /* Ensure a string has at least two digits.
        @param  value  (number) the number to convert
        @return  (string) the string equivalent */
        _ensureTwo: function(value) {
            return (value < 10 ? '0' : '') + value;
        },

        /* Format a date for iCalendar: yyyymmdd.
        @param  date   (Date) the date to format
        @return  (string) the formatted date */
        formatDate: function(date, local) {
            return (!date ? '' : '' + date.getFullYear() +
			this._ensureTwo(date.getMonth() + 1) + this._ensureTwo(date.getDate()));
        },

        /* Format a date/time for iCalendar: yyyymmddThhmmss[Z].
        @param  dateTime  (Date) the date/time to format
        @param  local     (boolean) true if this should be a local date/time
        @return  (string) the formatted date/time */
        formatDateTime: function(dateTime, local) {
            return (!dateTime ? '' : (local ?
			'' + dateTime.getFullYear() + this._ensureTwo(dateTime.getMonth() + 1) +
			this._ensureTwo(dateTime.getDate()) + 'T' + this._ensureTwo(dateTime.getHours()) +
			this._ensureTwo(dateTime.getMinutes()) + this._ensureTwo(dateTime.getSeconds()) :
			'' + dateTime.getUTCFullYear() + this._ensureTwo(dateTime.getUTCMonth() + 1) +
			this._ensureTwo(dateTime.getUTCDate()) + 'T' + this._ensureTwo(dateTime.getUTCHours()) +
			this._ensureTwo(dateTime.getUTCMinutes()) + this._ensureTwo(dateTime.getUTCSeconds()) + 'Z'));
        },

        /* Calculate the duration between two date/times.
        @param  start  (Date) the starting date/time
        @param  end    (Date) the ending date/time
        @return  (string) the formatted duration or blank if invalid parameters */
        calculateDuration: function(start, end) {
            if (!start || !end) {
                return '';
            }
            var seconds = Math.abs(end.getTime() - start.getTime()) / 1000;
            var days = Math.floor(seconds / 86400);
            seconds -= days * 86400;
            var hours = Math.floor(seconds / 3600);
            seconds -= hours * 3600;
            var minutes = Math.floor(seconds / 60);
            seconds -= minutes * 60;
            return (start.getTime() > end.getTime() ? '-' : '') +
			'P' + (days > 0 ? days + 'D' : '') +
			(hours || minutes || seconds ? 'T' + hours + 'H' : '') +
			(minutes || seconds ? minutes + 'M' : '') + (seconds ? seconds + 'S' : '');
        },

        /* Calculate the end date/time given a start and a duration.
        @param  start     (Date) the starting date/time
        @param  duration  (string) the description of the duration
        @return  (Date) the ending date/time
        @throws  error if an invalid duration is found */
        addDuration: function(start, duration) {
            if (!duration) {
                return start;
            }
            var end = new Date(start.getTime());
            var matches = DURATION.exec(duration);
            if (!matches) {
                throw 'Invalid duration';
            }
            if (matches[2] && (matches[3] || matches[5] || matches[6] || matches[7])) {
                throw 'Invalid duration - week must be on its own'; // Week must be on its own
            }
            if (!matches[4] && (matches[5] || matches[6] || matches[7])) {
                throw 'Invalid duration - missing time marker'; // Missing T with hours/minutes/seconds
            }
            var sign = (matches[1] == '-' ? -1 : +1);
            var apply = function(value, factor, method) {
                value = parseInt(value);
                if (!isNaN(value)) {
                    end['setUTC' + method](end['getUTC' + method]() + sign * value * factor);
                }
            };
            if (matches[2]) {
                apply(matches[2], 7, 'Date');
            }
            else {
                apply(matches[3], 1, 'Date');
                apply(matches[5], 1, 'Hours');
                apply(matches[6], 1, 'Minutes');
                apply(matches[7], 1, 'Seconds');
            }
            return end;
        },

        /* Parse the iCalendar data into a JavaScript object model.
        @param  content  (string) the original iCalendar data
        @return  (object) the iCalendar JavaScript model
        @throws  errors if the iCalendar structure is incorrect */
        parse: function(content) {
            var cal = {};
            var timezones = {};
            var lines = unfoldLines(content);
            parseGroup(lines, 0, cal, timezones);
            if (!cal.vcalendar) {
                throw 'Invalid iCalendar data';
            }
            return cal.vcalendar;
        },

        /* Calculate the week of the year for a given date
        according to the ISO 8601 definition.
        @param  date       (Date) the date to calculate the week for
        @param  weekStart  (number) the day on which a week starts:
        0 = Sun, 1 = Mon, ... (optional, defaults to 1)
        @return  (number) the week for these parameters (1-53) */
        getWeekOfYear: function(date, weekStart) {
            return getWeekOfYear(date, weekStart);
        },

        _parseParams: function(owner, params) {
            return parseParams(owner, params);
        }
    });

    /* jQuery extend now ignores nulls! */
    function extendRemove(target, props) {
        $.extend(target, props);
        for (var name in props) {
            if (props[name] == null) {
                target[name] = null;
            }
        }
        return target;
    }

    /* Attach the iCalendar functionality to a jQuery selection.
    @param  command  (string) the command to run (optional, default 'attach')
    @param  options  (object) the new settings to use for these iCalendar instances
    @return  (jQuery object) jQuery for chaining further calls */
    $.fn.icalendar = function(options) {
        var otherArgs = Array.prototype.slice.call(arguments, 1);
        return this.each(function() {
            if (typeof options == 'string') {
                $.icalendar['_' + options + 'ICalendar'].
				apply($.icalendar, [this].concat(otherArgs));
            }
            else {
                $.icalendar._attachICalendar(this, options || {});
            }
        });
    };

    /* Initialise the iCalendar functionality. */
    $.icalendar = new iCalendar(); // singleton instance

    /* Override some substitution values for Yahoo.
    @param  inserts   (object) current values (updated)
    @param  settings  (object) current instance settings */
    function yahooOverride(inserts, settings) {
        var twoDigits = function(value) {
            return (value < 10 ? '0' : '') + value;
        };
        var dur = (settings.end ? (settings.end.getTime() - settings.start.getTime()) / 60000 : 0);
        inserts.p = (dur ? twoDigits(Math.floor(dur / 60)) + '' + twoDigits(dur % 60) : ''); // hhmm
        if (inserts.r) {
            var byDay = (settings.recurrence.by && settings.recurrence.by[0].type == 'day' ?
			settings.recurrence.by[0].values.join('').toLowerCase() : '');
            var freq = { daily: 'dy', weekly: 'wk', monthly: 'mh', yearly: 'yr'}[settings.recurrence.freq];
            inserts.r = (byDay || freq ? twoDigits(settings.recurrence.interval || 1) + (byDay || freq) : '');
        }
    }

    /* Construct an iCalendar with an event object.
    @param  event  (object) the event details
    @return  (string) the iCalendar definition */
    function makeICalendar(event) {
        var limit75 = function(text) {
            var out = '';
            while (text.length > 75) {
                out += text.substr(0, 75) + '\n';
                text = ' ' + text.substr(75);
            }
            out += text;
            return out;
        };
        return 'BEGIN:VCALENDAR\n' +
		'VERSION:2.0\n' +
		'PRODID:jquery.icalendar\n' +
		'METHOD:PUBLISH\n' +
		'BEGIN:VEVENT\n' +
		'UID:' + new Date().getTime() + '@' +
		(window.location.href.replace(/^[^\/]*\/\/([^\/]*)\/.*$/, '$1') || 'localhost') + '\n' +
		'DTSTAMP:' + $.icalendar.formatDateTime(new Date()) + '\n' +
		(event.url ? limit75('URL:' + event.url) + '\n' : '') +
		(event.contact ? limit75('MAILTO:' + event.contact) + '\n' : '') +
		limit75('TITLE:' + event.title) + '\n' +
		'DTSTART:' + $.icalendar.formatDateTime(event.start) + '\n' +
		'DTEND:' + $.icalendar.formatDateTime(event.end) + '\n' +
		(event.summary ? limit75('SUMMARY:' + event.summary) + '\n' : '') +
		(event.description ? limit75('DESCRIPTION:' + event.description) + '\n' : '') +
		(event.location ? limit75('LOCATION:' + event.location) + '\n' : '') +
		(event.recurrence ? makeRecurrence(event.recurrence) + '\n' : '') +
		'END:VEVENT\n' +
		'END:VCALENDAR';
    }

    /* Construct an iCalendar recurrence definition.
    @param  recur  (object) the recurrence details
    @return  (string) the iCalendar definition */
    function makeRecurrence(recur) {
        if (!recur) {
            return '';
        }
        var def = '';
        if (recur.dates) {
            def = 'RDATE;VALUE=DATE:';
            if (!isArray(recur.dates)) {
                recur.dates = [recur.dates];
            }
            for (var i = 0; i < recur.dates.length; i++) {
                def += (i > 0 ? ',' : '') + $.icalendar.formatDate(recur.dates[i]);
            }
        }
        else if (recur.times) {
            def = 'RDATE;VALUE=DATE-TIME:';
            if (!isArray(recur.times)) {
                recur.times = [recur.times];
            }
            for (var i = 0; i < recur.times.length; i++) {
                def += (i > 0 ? ',' : '') + $.icalendar.formatDateTime(recur.times[i]);
            }
        }
        else if (recur.periods) {
            def = 'RDATE;VALUE=PERIOD:';
            if (!isArray(recur.periods[0])) {
                recur.periods = [recur.periods];
            }
            for (var i = 0; i < recur.periods.length; i++) {
                def += (i > 0 ? ',' : '') + $.icalendar.formatDateTime(recur.periods[i][0]) +
				'/' + (recur.periods[i][1].constructor != Date ? recur.periods[i][1] :
				$.icalendar.formatDateTime(recur.periods[i][1]));
            }
        }
        else {
            def = 'RRULE:FREQ=' + (recur.freq || 'daily').toUpperCase() +
			(recur.interval ? ';INTERVAL=' + recur.interval : '') +
			(recur.until ? ';UNTIL=' + $.icalendar.formatDateTime(recur.until) :
			(recur.count ? ';COUNT=' + recur.count : '')) +
			(recur.weekStart != null ? ';WKST=' +
			['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'][recur.weekStart] : '');
            if (recur.by) {
                if (!isArray(recur.by)) {
                    recur.by = [recur.by];
                }
                for (var i = 0; i < recur.by.length; i++) {
                    if (!isArray(recur.by[i].values)) {
                        recur.by[i].values = [recur.by[i].values];
                    }
                    def += ';BY' + recur.by[i].type.toUpperCase() + '=' +
					recur.by[i].values.join(',');
                }
            }
        }
        return def;
    }

    /* Copy the given text to the system clipboard via Flash.
    @param  text  (string) the text to copy
    @param  url   (string) the URL for the Flash clipboard copy module
    @return  (string) '' if successful, error message if not */
    function copyViaFlash(text, url) {
        $('#' + FLASH_ID).remove();
        try {
            $('body').append('<div id="' + FLASH_ID + '"><embed src="' + url +
		'" FlashVars="clipboard=' + encodeURIComponent(text) +
		'" width="0" height="0" type="application/x-shockwave-flash"></embed></div>');
            return '';
        }
        catch (e) {
            return e;
        }
    }

    /* Pattern for folded lines: start with a whitespace character */
    var FOLDED = /^\s(.*)$/;
    /* Pattern for an individual entry: name:value */
    var ENTRY = /^([^:]+):(.*)$/;
    /* Pattern for a date only field: yyyymmdd */
    var DATEONLY = /^(\d{4})(\d\d)(\d\d)$/;
    /* Pattern for a date/time field: yyyymmddThhmmss[Z] */
    var DATETIME = /^(\d{4})(\d\d)(\d\d)T(\d\d)(\d\d)(\d\d)(Z?)$/;
    /* Pattern for a date/time range field: yyyymmddThhmmss[Z]/yyyymmddThhmmss[Z] */
    var DATETIME_RANGE = /^(\d{4})(\d\d)(\d\d)T(\d\d)(\d\d)(\d\d)(Z?)\/(\d{4})(\d\d)(\d\d)T(\d\d)(\d\d)(\d\d)(Z?)$/;
    /* Pattern for a timezone offset field: +hhmm */
    var TZ_OFFSET = /^([+-])(\d\d)(\d\d)$/;
    /* Pattern for a duration: [+-]PnnW or [+-]PnnDTnnHnnMnnS */
    var DURATION = /^([+-])?P(\d+W)?(\d+D)?(T)?(\d+H)?(\d+M)?(\d+S)?$/;
    /* Reserved names not suitable for attrbiute names. */
    var RESERVED_NAMES = ['class'];

    /* iCalendar lines are split so the max length is no more than 75.
    Split lines start with a whitespace character.
    @param  content  (string) the original iCalendar data
    @return  (string[]) the restored iCalendar data */
    function unfoldLines(content) {
        var lines = content.replace(/\r\n/g, '\n').split('\n');
        for (var i = lines.length - 1; i > 0; i--) {
            var matches = FOLDED.exec(lines[i]);
            if (matches) {
                lines[i - 1] += matches[1];
                lines[i] = '';
            }
        }
        return $.map(lines, function(line, i) { // Remove blank lines
            return (line ? line : null);
        });
    }

    /* Parse a group in the file, delimited by BEGIN:xxx and END:xxx.
    Recurse if an embedded group encountered.
    @param  lines      (string[]) the iCalendar data
    @param  index      (number) the current position within the data
    @param  owner      (object) the current owner for the new group
    @param  timezones  (object) collection of defined timezones
    @return  (number) the updated position after processing this group
    @throws  errors if group structure is incorrect */
    function parseGroup(lines, index, owner, timezones) {
        if (index >= lines.length || lines[index].indexOf('BEGIN:') != 0) {
            throw 'Missing group start';
        }
        var group = {};
        var name = lines[index].substr(6);
        addEntry(owner, name.toLowerCase(), group);
        index++;
        while (index < lines.length && lines[index].indexOf('END:') != 0) {
            if (lines[index].indexOf('BEGIN:') == 0) { // Recurse for embedded group
                index = parseGroup(lines, index, group, timezones);
            }
            else {
                var entry = parseEntry(lines[index]);
                addEntry(group, entry._name, (entry._simple ? entry._value : entry));
            }
            index++;
        }
        if (name == 'VTIMEZONE') { // Save timezone offset
            var matches = TZ_OFFSET.exec(group.standard.tzoffsetto);
            if (matches) {
                timezones[group.tzid] = (matches[1] == '-' ? -1 : +1) *
				(parseInt(matches[2], 10) * 60 + parseInt(matches[3], 10));
            }
        }
        else {
            for (var name2 in group) {
                resolveTimezones(group[name2], timezones);
            }
        }
        if (lines[index] != 'END:' + name) {
            throw 'Missing group end ' + name;
        }
        return index;
    }

    /* Resolve timezone references for dates.
    @param  value  (any) the current value to check - updated if appropriate
    @param  timezones  (object) collection of defined timezones */
    function resolveTimezones(value, timezones) {
        if (!value) {
            return;
        }
        if (value.tzid && value._value) {
            var offset = timezones[value.tzid];
            var offsetDate = function(date, tzid) {
                date.setMinutes(date.getMinutes() - offset);
                date._type = tzid;
            };
            if (isArray(value._value)) {
                for (var i = 0; i < value._value.length; i++) {
                    offsetDate(value._value[i], value.tzid);
                }
            }
            else if (value._value.start && value._value.end) {
                offsetDate(value._value.start, value.tzid);
                offsetDate(value._value.end, value.tzid);
            }
            else {
                offsetDate(value._value, value.tzid);
            }
        }
        else if (isArray(value)) {
            for (var i = 0; i < value.length; i++) {
                resolveTimezones(value[i], timezones);
            }
        }
    }

    /* Add a new entry to an object, making multiple entries into an array.
    @param  owner  (object) the owning object for the new entry
    @param  name   (string) the name of the new entry
    @param  value  (string or object) the new entry value */
    function addEntry(owner, name, value) {
        if (typeof value == 'string') {
            value = value.replace(/\\n/g, '\n');
        }
        if ($.inArray(name, RESERVED_NAMES) > -1) {
            name += '_';
        }
        if (owner[name]) { // Turn multiple values into an array
            if (!isArray(owner[name]) || owner['_' + name + 'IsArray']) {
                owner[name] = [owner[name]];
            }
            owner[name][owner[name].length] = value;
            if (owner['_' + name + 'IsArray']) {
                owner['_' + name + 'IsArray'] = undefined;
            }
        }
        else {
            owner[name] = value;
            if (isArray(value)) {
                owner['_' + name + 'IsArray'] = true;
            }
        }
    }

    /* Parse an individual entry.
    The format is: <name>[;<param>=<pvalue>]...:<value>
    @param  line  (string) the line to parse
    @return  (object) the parsed entry with _name and _value
    attributes, _simple to indicate whether or not
    other parameters, and other parameters as necessary */
    function parseEntry(line) {
        var entry = {};
        var matches = ENTRY.exec(line);
        if (!matches) {
            throw 'Missing entry name: ' + line;
        }
        var params = matches[1].split(';');
        entry._name = params[0].toLowerCase();
        entry._value = checkDate(matches[2]);
        entry._simple = true;
        parseParams(entry, params.slice(1));
        return entry;
    }

    /* Parse parameters for an individual entry.
    The format is: <param>=<pvalue>[;...]
    @param  owner   (object) the owning object for the parameters,
    updated with parameters as attributes, and
    _simple to indicate whether or not other parameters
    @param  params  (string or string[]) the parameters to parse */
    function parseParams(owner, params) {
        params = (isArray(params) ? params : params.split(';'));
        owner._simple = true;
        for (var i = 0; i < params.length; i++) {
            var nameValue = params[i].split('=');
            owner[nameValue[0].toLowerCase()] = checkDate(nameValue[1] || '');
            owner._simple = false;
        }
    }

    /* Convert a value into a Date object or array of Date objects if appropriate.
    @param  value  (string) the value to check
    @return  (string or Date) the converted value (if appropriate) */
    function checkDate(value) {
        var matches = DATETIME.exec(value);
        if (matches) {
            return makeDate(matches);
        }
        matches = DATETIME_RANGE.exec(value);
        if (matches) {
            return { start: makeDate(matches), end: makeDate(matches.slice(7)) };
        }
        matches = DATEONLY.exec(value);
        if (matches) {
            return makeDate(matches.concat([0, 0, 0, '']));
        }
        return value;
    }

    /* Create a date value from matches on a string.
    @param  matches  (string[]) the component parts of the date
    @return  (Date) the corresponding date */
    function makeDate(matches) {
        var date = new Date(matches[1], matches[2] - 1, matches[3],
		matches[4], matches[5], matches[6]);
        date._type = (matches[7] ? 'UTC' : 'float');
        return utcDate(date);
    }

    /* Standardise a date to UTC.
    @param  date  (Date) the date to standardise
    @return  (Date) the equivalent UTC date */
    function utcDate(date) {
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return date;
    }

    /* Calculate the week of the year for a given date
    according to the ISO 8601 definition.
    @param  date       (Date) the date to calculate the week for
    @param  weekStart  (number) the day on which a week starts:
    0 = Sun, 1 = Mon, ... (optional, defaults to 1)
    @return  (number) the week for these parameters (1-53) */
    function getWeekOfYear(date, weekStart) {
        weekStart = (weekStart || weekStart == 0 ? weekStart : 1);
        var checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(),
		(date.getTimezoneOffset() / -60));
        var firstDay = new Date(checkDate.getFullYear(), 1 - 1, 4); // First week always contains 4 Jan
        var firstDOW = firstDay.getDay(); // Day of week: Sun = 0, Mon = 1, ...
        firstDay.setDate(4 + weekStart - firstDOW - (weekStart > firstDOW ? 7 : 0)); // Preceding week start
        if (checkDate < firstDay) { // Adjust first three days in year if necessary
            checkDate.setDate(checkDate.getDate() - 3); // Generate for previous year
            return getWeekOfYear(checkDate, weekStart);
        } else if (checkDate > new Date(checkDate.getFullYear(), 12 - 1, 28)) { // Check last three days in year
            var firstDay2 = new Date(checkDate.getFullYear() + 1, 1 - 1, 4); // Find first week in next year
            firstDOW = firstDay2.getDay();
            firstDay2.setDate(4 + weekStart - firstDOW - (weekStart > firstDOW ? 7 : 0));
            if (checkDate >= firstDay2) { // Adjust if necessary
                return 1;
            }
        }
        return Math.floor(((checkDate - firstDay) /
		(FREQ_SETTINGS[DY].factor * 1000)) / 7) + 1; // Weeks to given date
    }

    /* Determine whether an object is an array.
    @param  a  (object) the object to test
    @return  (boolean) true if it is an array, or false if not */
    function isArray(a) {
        return (a && a.constructor == Array);
    }

})(jQuery);

/*
* timeago: a jQuery plugin, version: 0.9.3 (2011-01-21)
* @requires jQuery v1.2.3 or later
*
* Timeago is a jQuery plugin that makes it easy to support automatically
* updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
*
* For usage and examples, visit:
* http://timeago.yarp.com/
*
* Licensed under the MIT:
* http://www.opensource.org/licenses/mit-license.php
*
* Copyright (c) 2008-2011, Ryan McGeary (ryanonjavascript -[at]- mcgeary [*dot*] org)
*/
(function ($) {
    $.timeago = function (timestamp) {
        if (timestamp instanceof Date) {
            return inWords(timestamp);
        } else if (typeof timestamp === "string") {
            return inWords($.timeago.parse(timestamp));
        } else {
            return inWords($.timeago.datetime(timestamp));
        }
    };
    var $t = $.timeago;

    $.extend($.timeago, {
        settings: {
            refreshMillis: 60000,
            allowFuture: false,
            strings: {
                prefixAgo: null,
                prefixFromNow: null,
                suffixAgo: "ago",
                suffixFromNow: "from now",
                seconds: "less than a minute",
                minute: "about a minute",
                minutes: "%d minutes",
                hour: "about an hour",
                hours: "about %d hours",
                day: "a day",
                days: "%d days",
                month: "about a month",
                months: "%d months",
                year: "about a year",
                years: "%d years",
                numbers: []
            }
        },
        inWords: function (distanceMillis) {
            var $l = this.settings.strings;
            var prefix = $l.prefixAgo;
            var suffix = $l.suffixAgo;
            if (this.settings.allowFuture) {
                if (distanceMillis < 0) {
                    prefix = $l.prefixFromNow;
                    suffix = $l.suffixFromNow;
                }
                distanceMillis = Math.abs(distanceMillis);
            }

            var seconds = distanceMillis / 1000;
            var minutes = seconds / 60;
            var hours = minutes / 60;
            var days = hours / 24;
            var years = days / 365;

            function substitute(stringOrFunction, number) {
                var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction;
                var value = ($l.numbers && $l.numbers[number]) || number;
                return string.replace(/%d/i, value);
            }

            var words = seconds < 45 && substitute($l.seconds, Math.round(seconds)) ||
				seconds < 90 && substitute($l.minute, 1) ||
				minutes < 45 && substitute($l.minutes, Math.round(minutes)) ||
				minutes < 90 && substitute($l.hour, 1) ||
				hours < 24 && substitute($l.hours, Math.round(hours)) ||
				hours < 48 && substitute($l.day, 1) ||
				days < 30 && substitute($l.days, Math.floor(days)) ||
				days < 60 && substitute($l.month, 1) ||
				days < 365 && substitute($l.months, Math.floor(days / 30)) ||
				years < 2 && substitute($l.year, 1) ||
				substitute($l.years, Math.floor(years));

            return $.trim([prefix, words, suffix].join(" "));
        },
        parse: function (iso8601) {
            var s = $.trim(iso8601);
            s = s.replace(/\.\d\d+/, ""); // remove milliseconds
            s = s.replace(/-/, "/").replace(/-/, "/");
            s = s.replace(/T/, " ").replace(/Z/, " UTC");
            s = s.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"); // -04:00 -> -0400
            return new Date(s);
        },
        datetime: function (elem) {
            // jQuery's `is()` doesn't play well with HTML5 in IE
            var isTime = $(elem).get(0).tagName.toLowerCase() === "time"; // $(elem).is("time");
            var iso8601 = isTime ? $(elem).attr("datetime") : $(elem).attr("title");
            return $t.parse(iso8601);
        }
    });

    $.fn.timeago = function () {
        var self = this;
        self.each(refresh);

        var $s = $t.settings;
        if ($s.refreshMillis > 0) {
            setInterval(function () { self.each(refresh); }, $s.refreshMillis);
        }
        return self;
    };

    function refresh() {
        var data = prepareData(this);
        if (!isNaN(data.datetime)) {
            $(this).text(inWords(data.datetime));
        }
        return this;
    }

    function prepareData(element) {
        element = $(element);
        if (!element.data("timeago")) {
            element.data("timeago", { datetime: $t.datetime(element) });
            var text = $.trim(element.text());
            if (text.length > 0) {
                element.attr("title", text);
            }
        }
        return element.data("timeago");
    }

    function inWords(date) {
        return $t.inWords(distance(date));
    }

    function distance(date) {
        return (new Date().getTime() - date.getTime());
    }

    // fix for IE6 suckage
    document.createElement("abbr");
    document.createElement("time");
} (jQuery));
(function(c,G,L){function R(){R.history=R.history||[];R.history.push(arguments);if("object"===typeof console){var c=console[console.warn?"warn":"log"],a=Array.prototype.slice.call(arguments);"string"===typeof arguments[0]&&(a[0]="qTip2: "+a[0]);c.apply?c.apply(console,a):c(a)}}function S(b){var a;if(!b||"object"!==typeof b)return l;"object"!==typeof b.metadata&&(b.metadata={type:b.metadata});if("content"in b){if("object"!==typeof b.content||b.content.jquery)b.content={text:b.content};a=b.content.text||
l;if(!c.isFunction(a)&&(!a&&!a.attr||1>a.length||"object"===typeof a&&!a.jquery))b.content.text=l;if("title"in b.content&&("object"!==typeof b.content.title&&(b.content.title={text:b.content.title}),a=b.content.title.text||l,!c.isFunction(a)&&(!a&&!a.attr||1>a.length||"object"===typeof a&&!a.jquery)))b.content.title.text=l}"position"in b&&"object"!==typeof b.position&&(b.position={my:b.position,at:b.position});"show"in b&&"object"!==typeof b.show&&(b.show=b.show.jquery?{target:b.show}:{event:b.show});
"hide"in b&&"object"!==typeof b.hide&&(b.hide=b.hide.jquery?{target:b.hide}:{event:b.hide});"style"in b&&"object"!==typeof b.style&&(b.style={classes:b.style});c.each(x,function(){this.sanitize&&this.sanitize(b)});return b}function X(b,a,m,f){function r(c){var b=0,d,h=a;for(c=c.split(".");h=h[c[b++]];)b<c.length&&(d=h);return[d||a,c.pop()]}function k(){var c=a.style.widget;h.toggleClass(U,c).toggleClass(W,!c);t.content.toggleClass(U+"-content",c);t.titlebar&&t.titlebar.toggleClass(U+"-header",c);
t.button&&t.button.toggleClass(D+"-icon",!c)}function n(a){t.title&&(t.titlebar.remove(),t.titlebar=t.title=t.button=z,a!==l&&d.reposition())}function e(){var b=a.content.title.button,g="string"===typeof b?b:"Close tooltip";t.button&&t.button.remove();t.button=b.jquery?b:c("<a />",{"class":"ui-state-default "+(a.style.widget?"":D+"-icon"),title:g,"aria-label":g}).prepend(c("<span />",{"class":"ui-icon ui-icon-close",html:"&times;"}));t.button.appendTo(t.titlebar).attr("role","button").click(function(a){h.hasClass(I)||
d.hide(a);return l});d.redraw()}function g(){var b=w+"-title";t.titlebar&&n();t.titlebar=c("<div />",{"class":D+"-titlebar "+(a.style.widget?"ui-widget-header":"")}).append(t.title=c("<div />",{id:b,"class":D+"-title","aria-atomic":s})).insertBefore(t.content).delegate(".ui-state-default","mousedown keydown mouseup keyup mouseout",function(a){c(this).toggleClass("ui-state-active ui-state-focus","down"===a.type.substr(-4))}).delegate(".ui-state-default","mouseover mouseout",function(a){c(this).toggleClass("ui-state-hover",
"mouseover"===a.type)});a.content.title.button?e():d.rendered&&d.redraw()}function B(a,g){var u=t.title;if(!d.rendered||!a)return l;c.isFunction(a)&&(a=a.call(b,v.event,d));if(a===l)return n(l);a.jquery&&0<a.length?u.empty().append(a.css({display:"block"})):u.html(a);d.redraw();g!==l&&(d.rendered&&h.is(":visible"))&&d.reposition(v.event)}function p(a,g){function u(a){function b(h){h&&(delete P[h.src],clearTimeout(d.timers.img[h.src]),c(h).unbind(A));c.isEmptyObject(P)&&(d.redraw(),g!==l&&d.reposition(v.event),
a())}var h,P={};if(0===(h=w.find("img:not([height]):not([width])")).length)return b();h.each(function(a,h){if(P[h.src]===L){var g=0;(function Y(){if(h.height||h.width||3<g)return b(h);g+=1;d.timers.img[h.src]=setTimeout(Y,700)})();c(h).bind("error"+A+" load"+A,function(){b(this)});P[h.src]=h}})}var w=t.content;if(!d.rendered||!a)return l;c.isFunction(a)&&(a=a.call(b,v.event,d)||"");a.jquery&&0<a.length?w.empty().append(a.css({display:"block"})):w.html(a);0>d.rendered?h.queue("fx",u):(F=0,u(c.noop));
return d}function y(){function g(c){if(h.hasClass(I))return l;e.show.trigger("qtip-"+m+"-inactive");clearTimeout(d.timers.show);clearTimeout(d.timers.hide);var b=function(){d.toggle(s,c)};0<a.show.delay?d.timers.show=setTimeout(b,a.show.delay):b()}function w(b){if(h.hasClass(I)||H||F)return l;var g=c(b.relatedTarget||b.target),P=g.closest(J)[0]===h[0],g=g[0]===e.show[0];clearTimeout(d.timers.show);clearTimeout(d.timers.hide);if("mouse"===k.target&&P||a.hide.fixed&&/mouse(out|leave|move)/.test(b.type)&&
(P||g))try{b.preventDefault(),b.stopImmediatePropagation()}catch(u){}else 0<a.hide.delay?d.timers.hide=setTimeout(function(){d.hide(b)},a.hide.delay):d.hide(b)}function u(c){if(h.hasClass(I))return l;clearTimeout(d.timers.inactive);d.timers.inactive=setTimeout(function(){d.hide(c)},a.hide.inactive)}function f(a){h.is(":visible")&&d.reposition(a)}var k=a.position,e={show:a.show.target,hide:a.hide.target,viewport:c(k.viewport),document:c(document),body:c(document.body),window:c(G)},n=c.trim(""+a.show.event).split(" "),
r=c.trim(""+a.hide.event).split(" "),B=c.browser.msie&&6===parseInt(c.browser.version,10);h.bind("mouseenter"+A+" mouseleave"+A,function(a){var c="mouseenter"===a.type;c&&d.focus(a);h.toggleClass(Z,c)});a.hide.fixed&&(e.hide=e.hide.add(h),h.bind("mouseover"+A,function(){h.hasClass(I)||clearTimeout(d.timers.hide)}));/mouse(out|leave)/i.test(a.hide.event)?"window"===a.hide.leave&&e.window.bind("mouseout"+A,function(a){/select|option/.test(a.target)&&!a.relatedTarget&&d.hide(a)}):/mouse(over|enter)/i.test(a.show.event)&&
e.hide.bind("mouseleave"+A,function(a){clearTimeout(d.timers.show)});-1<(""+a.hide.event).indexOf("unfocus")&&e.body.bind("mousedown"+A,function(a){var g=c(a.target);!h.hasClass(I)&&h.is(":visible");g[0]!==h[0]&&(0===g.parents(J).length&&1<g.add(b).length&&!g.attr("disabled"))&&d.hide(a)});"number"===typeof a.hide.inactive&&(e.show.bind("qtip-"+m+"-inactive",u),c.each(C.inactiveEvents,function(a,c){e.hide.add(t.tooltip).bind(c+A+"-inactive",u)}));c.each(r,function(a,b){var d=c.inArray(b,n),u=c(e.hide);
-1<d&&u.add(e.show).length===u.length||"unfocus"===b?(e.show.bind(b+A,function(a){h.is(":visible")?w(a):g(a)}),delete n[d]):e.hide.bind(b+A,w)});c.each(n,function(a,c){e.show.bind(c+A,g)});"number"===typeof a.hide.distance&&e.show.add(h).bind("mousemove"+A,function(c){var b=v.origin||{},h=a.hide.distance,g=Math.abs;(g(c.pageX-b.pageX)>=h||g(c.pageY-b.pageY)>=h)&&d.hide(c)});"mouse"===k.target&&(e.show.bind("mousemove"+A,function(a){K={pageX:a.pageX,pageY:a.pageY,type:"mousemove"}}),k.adjust.mouse&&
(a.hide.event&&h.bind("mouseleave"+A,function(a){(a.relatedTarget||a.target)!==e.show[0]&&d.hide(a)}),e.document.bind("mousemove"+A,function(a){!h.hasClass(I)&&h.is(":visible")&&d.reposition(a||K)})));if(k.adjust.resize||e.viewport.length)(c.event.special.resize?e.viewport:e.window).bind("resize"+A,f);(e.viewport.length||B&&"fixed"===h.css("position"))&&e.viewport.bind("scroll"+A,f)}function E(){var b=[a.show.target[0],a.hide.target[0],d.rendered&&t.tooltip[0],a.position.container[0],a.position.viewport[0],
G,document];d.rendered?c([]).pushStack(c.grep(b,function(a){return"object"===typeof a})).unbind(A):a.show.target.unbind(A+"-create")}var d=this,$=document.body,w=D+"-"+m,H=0,F=0,h=c(),A=".qtip-"+m,t,v;d.id=m;d.rendered=l;d.elements=t={target:b};d.timers={img:{}};d.options=a;d.checks={};d.plugins={};d.cache=v={event:{},target:c(),disabled:l,attr:f};d.checks.builtin={"^id$":function(a,b,d){a=d===s?C.nextid:d;b=D+"-"+a;a!==l&&(0<a.length&&!c("#"+b).length)&&(h[0].id=b,t.content[0].id=b+"-content",t.title[0].id=
b+"-title")},"^content.text$":function(a,b,c){p(c)},"^content.title.text$":function(a,b,c){if(!c)return n();!t.title&&c&&g();B(c)},"^content.title.button$":function(a,c,b){a=t.button;c=t.title;d.rendered&&(b?(c||g(),e()):a.remove())},"^position.(my|at)$":function(a,c,b){"string"===typeof b&&(a[c]=new x.Corner(b))},"^position.container$":function(a,c,b){d.rendered&&h.appendTo(b)},"^show.ready$":function(){d.rendered?d.toggle(s):d.render(1)},"^style.classes$":function(a,c,b){h.attr("class",D+" qtip ui-helper-reset "+
b)},"^style.widget|content.title":k,"^events.(render|show|move|hide|focus|blur)$":function(a,b,d){h[(c.isFunction(d)?"":"un")+"bind"]("tooltip"+b,d)},"^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)":function(){var b=a.position;h.attr("tracking","mouse"===b.target&&b.adjust.mouse);E();y()}};c.extend(d,{render:function(e){if(d.rendered)return d;var f=a.content.text,u=a.content.title.text,m=a.position,n=c.Event("tooltiprender");c.attr(b[0],"aria-describedby",w);h=
t.tooltip=c("<div/>",{id:w,"class":D+" qtip ui-helper-reset "+W+" "+a.style.classes+" "+D+"-pos-"+a.position.my.abbreviation(),width:a.style.width||"",height:a.style.height||"",tracking:"mouse"===m.target&&m.adjust.mouse,role:"alert","aria-live":"polite","aria-atomic":l,"aria-describedby":w+"-content","aria-hidden":s}).toggleClass(I,v.disabled).data("qtip",d).appendTo(a.position.container).append(t.content=c("<div />",{"class":D+"-content",id:w+"-content","aria-atomic":s}));d.rendered=-1;H=F=1;u&&
(g(),c.isFunction(u)||B(u,l));c.isFunction(f)||p(f,l);d.rendered=s;k();c.each(a.events,function(a,b){c.isFunction(b)&&h.bind("toggle"===a?"tooltipshow tooltiphide":"tooltip"+a,b)});c.each(x,function(){"render"===this.initialize&&this(d)});y();h.queue("fx",function(b){n.originalEvent=v.event;h.trigger(n,[d]);H=F=0;d.redraw();(a.show.ready||e)&&d.toggle(s,v.event);b()});return d},get:function(b){switch(b.toLowerCase()){case "dimensions":b={height:h.outerHeight(),width:h.outerWidth()};break;case "offset":b=
x.offset(h,a.position.container);break;default:b=r(b.toLowerCase()),b=b[0][b[1]],b=b.precedance?b.string():b}return b},set:function(b,g){var e=/^position\.(my|at|adjust|target|container)|style|content|show\.ready/i,w=/^content\.(title|attr)|style/i,f=l,k=l,m=d.checks,n;"string"===typeof b?(n=b,b={},b[n]=g):b=c.extend(s,{},b);c.each(b,function(a,d){var h=r(a.toLowerCase()),g;g=h[0][h[1]];h[0][h[1]]="object"===typeof d&&d.nodeType?c(d):d;b[a]=[h[0],h[1],d,g];f=e.test(a)||f;k=w.test(a)||k});S(a);H=F=
1;c.each(b,function(a,b){var c,h,g;for(c in m)for(h in m[c])if(g=RegExp(h,"i").exec(a))b.push(g),m[c][h].apply(d,b)});H=F=0;h.is(":visible")&&d.rendered&&(f&&d.reposition("mouse"===a.position.target?z:v.event),k&&d.redraw());return d},toggle:function(b,g){function e(){b?(c.browser.msie&&h[0].style.removeAttribute("filter"),h.css("overflow",""),"string"===typeof w.autofocus&&c(w.autofocus,h).focus(),t=c.Event("tooltipvisible"),t.originalEvent=g?v.event:z,h.trigger(t,[d])):h.css({display:"",visibility:"",
opacity:"",left:"",top:""})}if(!d.rendered)if(b)d.render(1);else return d;var f=b?"show":"hide",w=a[f],k=h.is(":visible"),n=!g||2>a[f].target.length||v.target[0]===g.target,H=a.position,r=a.content,t;(typeof b).search("boolean|number")&&(b=!k);if(!h.is(":animated")&&k===b&&n)return d;if(g){if(/over|enter/.test(g.type)&&/out|leave/.test(v.event.type)&&g.target===a.show.target[0]&&h.has(g.relatedTarget).length)return d;v.event=c.extend({},g)}t=c.Event("tooltip"+f);t.originalEvent=g?v.event:z;h.trigger(t,
[d,90]);if(t.isDefaultPrevented())return d;c.attr(h[0],"aria-hidden",!b);b?(v.origin=c.extend({},K),d.focus(g),c.isFunction(r.text)&&p(r.text,l),c.isFunction(r.title.text)&&B(r.title.text,l),!T&&("mouse"===H.target&&H.adjust.mouse)&&(c(document).bind("mousemove.qtip",function(a){K={pageX:a.pageX,pageY:a.pageY,type:"mousemove"}}),T=s),d.reposition(g),(t.solo=!!w.solo)&&c(J,w.solo).not(h).qtip("hide",t)):(clearTimeout(d.timers.show),delete v.origin,T&&!c(J+'[tracking="true"]:visible',w.solo).not(h).length&&
(c(document).unbind("mousemove.qtip"),T=l),d.blur(g));n&&h.stop(0,1);w.effect===l?(h[f](),e.call(h)):c.isFunction(w.effect)?(w.effect.call(h,d),h.queue("fx",function(a){e();a()})):h.fadeTo(90,b?1:0,e);b&&w.target.trigger("qtip-"+m+"-inactive");return d},show:function(a){return d.toggle(s,a)},hide:function(a){return d.toggle(l,a)},focus:function(a){if(!d.rendered)return d;var b=c(J),g=parseInt(h[0].style.zIndex,10),e=C.zindex+b.length;a=c.extend({},a);var w;h.hasClass(N)||(w=c.Event("tooltipfocus"),
w.originalEvent=a,h.trigger(w,[d,e]),w.isDefaultPrevented()||(g!==e&&(b.each(function(){this.style.zIndex>g&&(this.style.zIndex-=1)}),b.filter("."+N).qtip("blur",a)),h.addClass(N)[0].style.zIndex=e));return d},blur:function(a){a=c.extend({},a);var b;h.removeClass(N);b=c.Event("tooltipblur");b.originalEvent=a;h.trigger(b,[d]);return d},reposition:function(b,g){if(!d.rendered||H)return d;H=1;var e=a.position.target,w=a.position,f=w.my,k=w.at,m=w.adjust,n=m.method.split(" "),t=h.outerWidth(),r=h.outerHeight(),
A=0,F=0,B=c.Event("tooltipmove"),s="fixed"===h.css("position"),p=w.viewport,q={left:0,top:0},E=l,y=d.plugins.tip,z={horizontal:n[0],vertical:n[1]=n[1]||n[0],enabled:p.jquery&&e[0]!==G&&e[0]!==$&&"none"!==m.method,left:function(a){var b="shift"===z.horizontal,c=p.offset.left+p.scrollLeft,g="left"===f.x?t:"right"===f.x?-t:-t/2,d="left"===k.x?A:"right"===k.x?-A:-A/2,h=y&&y.size?y.size.width||0:0,e=y&&y.corner&&"x"===y.corner.precedance&&!b?h:0,w=c-a+e,n=a+t-p.width-c+e,d=g-("x"===f.precedance||f.x===
f.y?d:0),e="center"===f.x;if(b)e=y&&y.corner&&"y"===y.corner.precedance?h:0,d=("left"===f.x?1:-1)*g-e,q.left+=0<w?w:0<n?-n:0,q.left=Math.max(p.offset.left+(e&&"center"===y.corner.x?y.offset:0),a-d,Math.min(Math.max(p.offset.left+p.width,a+d),q.left));else{if(0<w&&("left"!==f.x||0<n))q.left-=d;else if(0<n&&("right"!==f.x||0<w))q.left-=e?-d:d;q.left!==a&&e&&(q.left-=m.x);q.left<c&&-q.left>n&&(q.left=a)}return q.left-a},top:function(a){var b="shift"===z.vertical,c=p.offset.top+p.scrollTop,d="top"===
f.y?r:"bottom"===f.y?-r:-r/2,g="top"===k.y?F:"bottom"===k.y?-F:-F/2,h=y&&y.size?y.size.height||0:0,e=y&&y.corner&&"y"===y.corner.precedance&&!b?h:0,w=c-a+e,c=a+r-p.height-c+e,g=d-("y"===f.precedance||f.x===f.y?g:0),e="center"===f.y;if(b)e=y&&y.corner&&"x"===y.corner.precedance?h:0,g=("top"===f.y?1:-1)*d-e,q.top+=0<w?w:0<c?-c:0,q.top=Math.max(p.offset.top+(e&&"center"===y.corner.x?y.offset:0),a-g,Math.min(Math.max(p.offset.top+p.height,a+g),q.top));else{if(0<w&&("top"!==f.y||0<c))q.top-=g;else if(0<
c&&("bottom"!==f.y||0<w))q.top-=e?-g:g;q.top!==a&&e&&(q.top-=m.y);0>q.top&&-q.top>c&&(q.top=a)}return q.top-a}};if(c.isArray(e)&&2===e.length)k={x:"left",y:"top"},q={left:e[0],top:e[1]};else if("mouse"===e&&(b&&b.pageX||v.event.pageX))k={x:"left",y:"top"},b=(b&&("resize"===b.type||"scroll"===b.type)?v.event:b&&b.pageX&&"mousemove"===b.type?b:K&&K.pageX&&(m.mouse||!b||!b.pageX)?{pageX:K.pageX,pageY:K.pageY}:!m.mouse&&v.origin&&v.origin.pageX?v.origin:b)||b||v.event||K||{},q={top:b.pageY,left:b.pageX};
else{"event"===e?e=b&&b.target&&"scroll"!==b.type&&"resize"!==b.type?v.target=c(b.target):v.target:v.target=c(e);e=c(e).eq(0);if(0===e.length)return d;e[0]===document||e[0]===G?(A=x.iOS?G.innerWidth:e.width(),F=x.iOS?G.innerHeight:e.height(),e[0]===G&&(q={top:!s||x.iOS?(p||e).scrollTop():0,left:!s||x.iOS?(p||e).scrollLeft():0})):e.is("area")&&x.imagemap?q=x.imagemap(e,k,z.enabled?n:l):"http://www.w3.org/2000/svg"===e[0].namespaceURI&&x.svg?q=x.svg(e,k):(A=e.outerWidth(),F=e.outerHeight(),q=x.offset(e,
w.container));q.offset&&(A=q.width,F=q.height,E=q.flipoffset,q=q.offset);if(4.1>x.iOS&&3.1<x.iOS||4.3==x.iOS||!x.iOS&&s)n=c(G),q.left-=n.scrollLeft(),q.top-=n.scrollTop();q.left+="right"===k.x?A:"center"===k.x?A/2:0;q.top+="bottom"===k.y?F:"center"===k.y?F/2:0}q.left+=m.x+("right"===f.x?-t:"center"===f.x?-t/2:0);q.top+=m.y+("bottom"===f.y?-r:"center"===f.y?-r/2:0);z.enabled?(p={elem:p,height:p[(p[0]===G?"h":"outerH")+"eight"](),width:p[(p[0]===G?"w":"outerW")+"idth"](),scrollLeft:s?0:p.scrollLeft(),
scrollTop:s?0:p.scrollTop(),offset:p.offset()||{left:0,top:0}},q.adjusted={left:"none"!==z.horizontal?z.left(q.left):0,top:"none"!==z.vertical?z.top(q.top):0},q.adjusted.left+q.adjusted.top&&h.attr("class",function(a,b){return b.replace(/ui-tooltip-pos-\w+/i,D+"-pos-"+f.abbreviation())}),E&&q.adjusted.left&&(q.left+=E.left),E&&q.adjusted.top&&(q.top+=E.top)):q.adjusted={left:0,top:0};B.originalEvent=c.extend({},b);h.trigger(B,[d,q,p.elem||p]);if(B.isDefaultPrevented())return d;delete q.adjusted;g===
l||isNaN(q.left)||isNaN(q.top)||"mouse"===e||!c.isFunction(w.effect)?h.css(q):c.isFunction(w.effect)&&(w.effect.call(h,d,c.extend({},q)),h.queue(function(a){c(this).css({opacity:"",height:""});c.browser.msie&&this.style.removeAttribute("filter");a()}));H=0;return d},redraw:function(){if(1>d.rendered||F)return d;var b=a.position.container,c,g,e;F=1;a.style.height&&h.css("height",a.style.height);a.style.width?h.css("width",a.style.width):(h.css("width","").addClass(Q),c=h.width()+1,g=h.css("max-width")||
"",e=h.css("min-width")||"",b=-1<(g+e).indexOf("%")?b.width()/100:0,g=(-1<g.indexOf("%")?b:1)*parseInt(g,10)||c,e=(-1<e.indexOf("%")?b:1)*parseInt(e,10)||0,c=g+e?Math.min(Math.max(c,e),g):c,h.css("width",Math.round(c)).removeClass(Q));F=0;return d},disable:function(a){"boolean"!==typeof a&&(a=!(h.hasClass(I)||v.disabled));d.rendered?(h.toggleClass(I,a),c.attr(h[0],"aria-disabled",a)):v.disabled=!!a;return d},enable:function(){return d.disable(l)},destroy:function(){var g=b[0],e=c.attr(g,O),w=b.data("qtip");
d.rendered&&(h.remove(),c.each(d.plugins,function(){this.destroy&&this.destroy()}));clearTimeout(d.timers.show);clearTimeout(d.timers.hide);E();if(!w||d===w)c.removeData(g,"qtip"),a.suppress&&e&&(c.attr(g,"title",e),b.removeAttr(O)),b.removeAttr("aria-describedby");b.unbind(".qtip-"+m);delete V[d.id];return b}})}function aa(b,a){var m,f,r,k,n,e=c(this),g=c(document.body),B=this===document?g:e;f=e.metadata?e.metadata(a.metadata):z;k="html5"===a.metadata.type&&f?f[a.metadata.name]:z;var p=e.data(a.metadata.name||
"qtipopts");try{p="string"===typeof p?(new Function("return "+p))():p}catch(y){R("Unable to parse HTML5 attribute data: "+p)}k=c.extend(s,{},C.defaults,a,"object"===typeof p?S(p):z,S(k||f));f=k.position;k.id=b;if("boolean"===typeof k.content.text)if(r=e.attr(k.content.attr),k.content.attr!==l&&r)k.content.text=r;else return R("Unable to locate content for tooltip! Aborting render of tooltip on element: ",e),l;f.container===l&&(f.container=g);f.target===l&&(f.target=B);k.show.target===l&&(k.show.target=
B);k.show.solo===s&&(k.show.solo=g);k.hide.target===l&&(k.hide.target=B);k.position.viewport===s&&(k.position.viewport=f.container);f.at=new x.Corner(f.at);f.my=new x.Corner(f.my);if(c.data(this,"qtip"))if(k.overwrite)e.qtip("destroy");else if(k.overwrite===l)return l;k.suppress&&(n=c.attr(this,"title"))&&c(this).removeAttr("title").attr(O,n);m=new X(e,k,b,!!r);c.data(this,"qtip",m);e.bind("remove.qtip-"+b,function(){m.destroy()});return m}function ba(b){var a=this,m=b.elements.tooltip,f=b.options.content.ajax,
r=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;b.checks.ajax={"^content.ajax":function(b,c,e){"ajax"===c&&(f=e);"once"===c?a.init():f&&f.url?a.load():m.unbind(".qtip-ajax")}};c.extend(a,{init:function(){if(f&&f.url)m.unbind(".qtip-ajax")[f.once?"one":"bind"]("tooltipshow.qtip-ajax",a.load);return a},load:function(k,m){var e=f.url.indexOf(" "),g=f.url,B,p=f.once&&!f.loading&&m;if(p)try{k.preventDefault()}catch(s){}else if(k&&k.isDefaultPrevented())return a;-1<e&&(B=g.substr(e),g=g.substr(0,
e));c.ajax(c.extend({success:function(a){B&&(a=c("<div/>").append(a.replace(r,"")).find(B));b.set("content.text",a)},error:function(a,c,g){0!==a.status&&b.set("content.text",c+": "+g)},context:b},f,{url:g,complete:function(){p&&(b.show(k.originalEvent),m=l);c.isFunction(f.complete)&&f.complete.apply(this,arguments)}}))}});a.init()}function ca(b){var a=this,m=b.elements,f=m.tooltip,l=".bgiframe-"+b.id;c.extend(a,{init:function(){m.bgiframe=c('<iframe class="ui-tooltip-bgiframe" frameborder="0" tabindex="-1" src="javascript:\'\';"  style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=0); -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";"></iframe>');
m.bgiframe.appendTo(f);f.bind("tooltipmove"+l,a.adjust)},adjust:function(){var a=b.get("dimensions"),c=b.plugins.tip,e=m.tip,g;g=parseInt(f.css("border-left-width"),10)||0;g={left:-g,top:-g};c&&e&&(c="x"===c.corner.precedance?["width","left"]:["height","top"],g[c[1]]-=e[c[0]]());m.bgiframe.css(g).css(a)},destroy:function(){m.bgiframe.remove();f.unbind(l)}});a.init()}function da(b){var a=this,m=b.options.show.modal,f=b.elements,r=f.tooltip,k=".qtipmodal"+b.id,n=c(document.body),e;b.checks.modal={"^show.modal.(on|blur)$":function(){a.init();
f.overlay.toggle(r.is(":visible"))}};c.extend(a,{init:function(){if(!m.on)return a;e=a.create();r.attr("is-modal-qtip",s).css("z-index",x.modal.zindex+c(J+"[is-modal-qtip]").length).unbind(".qtipmodal").unbind(k).bind("tooltipshow.qtipmodal tooltiphide.qtipmodal",function(b,f,k){if((f=b.originalEvent)&&"tooltiphide"===b.type&&/mouse(leave|enter)/.test(f.type)&&c(f.relatedTarget).closest(e[0]).length)try{b.preventDefault()}catch(m){}else if(f&&!f.solo)a[b.type.replace("tooltip","")](b,k)}).bind("tooltipfocus.qtipmodal",
function(a){if(!a.isDefaultPrevented()){var b=c(J).filter("[is-modal-qtip]"),f=x.modal.zindex+b.length,k=parseInt(r[0].style.zIndex,10);e[0].style.zIndex=f-1;b.each(function(){this.style.zIndex>k&&(this.style.zIndex-=1)});b.end().filter("."+N).qtip("blur",a.originalEvent);r.addClass(N)[0].style.zIndex=f;try{a.preventDefault()}catch(m){}}}).bind("tooltiphide.qtipmodal",function(a){c("[is-modal-qtip]").filter(":visible").not(r).last().qtip("focus",a)});m.escape&&c(G).unbind(k).bind("keydown"+k,function(a){27===
a.keyCode&&r.hasClass(N)&&b.hide(a)});m.blur&&f.overlay.unbind(k).bind("click"+k,function(a){r.hasClass(N)&&b.hide(a)});return a},create:function(){var a=c("#qtip-overlay");if(a.length)return f.overlay=a.insertAfter(c(J).last());e=f.overlay=c("<div />",{id:"qtip-overlay",html:"<div></div>",mousedown:function(){return l}}).insertAfter(c(J).last());c(G).unbind(".qtipmodal").bind("resize.qtipmodal",function(){e.css({height:c(G).height(),width:c(G).width()})}).triggerHandler("resize");return e},toggle:function(b,
f,p){if(b&&b.isDefaultPrevented())return a;b=m.effect;var y=f?"show":"hide",x=e.is(":visible"),d=c("[is-modal-qtip]").filter(":visible").not(r);e||(e=a.create());if(e.is(":animated")&&x===f||!f&&d.length)return a;f?(e.css({left:0,top:0}),e.toggleClass("blurs",m.blur),n.bind("focusin"+k,function(a){var b=c(a.target).closest(".qtip");!(1>b.length?l:parseInt(b[0].style.zIndex,10)>parseInt(r[0].style.zIndex,10))&&c(a.target).closest(J)[0]!==r[0]&&r.find("input:visible").filter(":first").focus()})):n.undelegate("*",
"focusin"+k);e.stop(s,l);if(c.isFunction(b))b.call(e,f);else if(b===l)e[y]();else e.fadeTo(parseInt(p,10)||90,f?1:0,function(){f||c(this).hide()});f||e.queue(function(a){e.css({left:"",top:""});a()});return a},show:function(b,c){return a.toggle(b,s,c)},hide:function(b,c){return a.toggle(b,l,c)},destroy:function(){var a=e;a&&((a=1>c("[is-modal-qtip]").not(r).length)?(f.overlay.remove(),c(G).unbind(".qtipmodal")):f.overlay.unbind(".qtipmodal"+b.id),n.undelegate("*","focusin"+k));return r.removeAttr("is-modal-qtip").unbind(".qtipmodal")}});
a.init()}function ea(b,a,c){var f=Math.ceil(a/2),l=Math.ceil(c/2);a={bottomright:[[0,0],[a,c],[a,0]],bottomleft:[[0,0],[a,0],[0,c]],topright:[[0,c],[a,0],[a,c]],topleft:[[0,0],[0,c],[a,c]],topcenter:[[0,c],[f,0],[a,c]],bottomcenter:[[0,0],[a,0],[f,c]],rightcenter:[[0,0],[a,l],[0,c]],leftcenter:[[a,0],[a,c],[0,l]]};a.lefttop=a.bottomright;a.righttop=a.bottomleft;a.leftbottom=a.topright;a.rightbottom=a.topleft;return a[b.string()]}function fa(b,a){function m(a,d,g,h){if(e.tip){a=c.extend({},k.corner);
d=g.adjusted;var f=b.options.position.adjust.method.split(" ");h=f[0];var f=f[1]||f[0],m=l,r=l,p=0,y=0,u,x={},z;k.corner.fixed!==s&&("shift"===h&&"x"===a.precedance&&d.left&&"center"!==a.y?a.precedance="x"===a.precedance?"y":"x":"flip"===h&&d.left&&(a.x="center"===a.x?0<d.left?"left":"right":"left"===a.x?"right":"left"),"shift"===f&&"y"===a.precedance&&d.top&&"center"!==a.x?a.precedance="y"===a.precedance?"x":"y":"flip"===f&&d.top&&(a.y="center"===a.y?0<d.top?"top":"bottom":"top"===a.y?"bottom":"top"),
a.string()!==B.corner&&(B.top!==d.top||B.left!==d.left)&&k.update(a,l));u=k.position(a,d);u.right!==L&&(u.left=-u.right);u.bottom!==L&&(u.top=-u.bottom);u.user=Math.max(0,n.offset);if(m="shift"===h&&!!d.left)if("center"===a.x)x["margin-left"]=p=u["margin-left"]-d.left;else{z=u.right!==L?[d.left,-u.left]:[-d.left,u.left];if((p=Math.max(z[0],z[1]))>z[0])g.left-=d.left,m=l;x[u.right!==L?"right":"left"]=p}if(r="shift"===f&&!!d.top)if("center"===a.y)x["margin-top"]=y=u["margin-top"]-d.top;else{z=u.bottom!==
L?[d.top,-u.top]:[-d.top,u.top];if((y=Math.max(z[0],z[1]))>z[0])g.top-=d.top,r=l;x[u.bottom!==L?"bottom":"top"]=y}e.tip.css(x).toggle(!(p&&y||"center"===a.x&&y||"center"===a.y&&p));g.left-=u.left.charAt?u.user:"shift"!==h||r||!m&&!r?u.left:0;g.top-=u.top.charAt?u.user:"shift"!==f||m||!m&&!r?u.top:0;B.left=d.left;B.top=d.top;B.corner=a.string()}}function f(a,b,c){b=!b?a[a.precedance]:b;var d=g.hasClass(Q);a=e.titlebar&&"top"===a.y?e.titlebar:e.content;b="border-"+b+"-width";g.addClass(Q);a=parseInt(a.css(b),
10);a=(c?a||parseInt(g.css(b),10):a)||0;g.toggleClass(Q,d);return a}function r(a){var b="y"===a.precedance,c=p[b?"width":"height"],e=p[b?"height":"width"],g=-1<a.string().indexOf("center"),f=c*(g?0.5:1),k=Math.pow;a=Math.round;var m=Math.sqrt(k(f,2)+k(e,2)),f=[d/f*m,d/e*m];f[2]=Math.sqrt(k(f[0],2)-k(d,2));f[3]=Math.sqrt(k(f[1],2)-k(d,2));g=(m+f[2]+f[3]+(g?0:f[0]))/m;c=[a(g*e),a(g*c)];return{height:c[b?0:1],width:c[b?1:0]}}var k=this,n=b.options.style.tip,e=b.elements,g=e.tooltip,B={top:0,left:0,corner:""},
p={width:n.width,height:n.height},y,E,d=n.border||0,C=!!(c("<canvas />")[0]||{}).getContext;k.corner=z;k.mimic=z;k.border=d;k.offset=n.offset;k.size=p;b.checks.tip={"^position.my|style.tip.(corner|mimic|border)$":function(){k.init()||k.destroy();b.reposition()},"^style.tip.(height|width)$":function(){p={width:n.width,height:n.height};k.create();k.update();b.reposition()},"^content.title.text|style.(classes|widget)$":function(){e.tip&&k.update()}};c.extend(k,{init:function(){var a=k.detectCorner()&&
(C||c.browser.msie);a&&(k.create(),k.update(),g.unbind(".qtip-tip").bind("tooltipmove.qtip-tip",m));return a},detectCorner:function(){var a=n.corner,c=b.options.position,d=c.at,c=c.my.string?c.my.string():c.my;if(a===l||c===l&&d===l)return l;a===s?k.corner=new x.Corner(c):a.string||(k.corner=new x.Corner(a),k.corner.fixed=s);return"centercenter"!==k.corner.string()},detectColours:function(){var a,d,f=e.tip.css({backgroundColor:"",border:""});a=k.corner;var h=a[a.precedance],m="border-"+h+"-color";
d="border"+h.charAt(0)+h.substr(1)+"Color";var h=/rgba?\(0, 0, 0(, 0)?\)|transparent/i,l=c(document.body).css("color"),r=b.elements.content.css("color"),s=e.titlebar&&("top"===a.y||"center"===a.y&&f.position().top+p.height/2+n.offset<e.titlebar.outerHeight(1))?e.titlebar:e.content;g.addClass(Q);y=a=f.css("background-color");E=d=f[0].style[d]||f.css(m)||g.css(m);if(!a||h.test(a))y=s.css("background-color")||"transparent",h.test(y)&&(y=g.css("background-color")||a);if(!d||h.test(d)||d===l)if(E=s.css(m)||
"transparent",h.test(E)||E===r)E=d;c("*",f).add(f).css("background-color","transparent").css("border","");g.removeClass(Q)},create:function(){var a=p.width,b=p.height;e.tip&&e.tip.remove();e.tip=c("<div />",{"class":"ui-tooltip-tip"}).css({width:a,height:b}).prependTo(g);C?c("<canvas />").appendTo(e.tip)[0].getContext("2d").save():e.tip.html('<vml:shape coordorigin="0,0" style="display:inline-block; position:absolute; behavior:url(#default#VML);"></vml:shape><vml:shape coordorigin="0,0" style="display:inline-block; position:absolute; behavior:url(#default#VML);"></vml:shape>')},
update:function(a,b){var g=e.tip,h=g.children(),m=p.width,t=p.height,v=n.mimic,B=Math.round,D,u,M;a||(a=k.corner);v===l?v=a:(v=new x.Corner(v),v.precedance=a.precedance,"inherit"===v.x?v.x=a.x:"inherit"===v.y?v.y=a.y:v.x===v.y&&(v[a.precedance]=a[a.precedance]));D=v.precedance;k.detectColours();"transparent"!==E&&"#123456"!==E?(d=f(a,z,s),0===n.border&&0<d&&(y=E),k.border=d=n.border!==s?n.border:d):k.border=d=0;u=ea(v,m,t);k.size=M=r(a);g.css(M);g="y"===a.precedance?[B("left"===v.x?d:"right"===v.x?
M.width-m-d:(M.width-m)/2),B("top"===v.y?M.height-t:0)]:[B("left"===v.x?M.width-m:0),B("top"===v.y?d:"bottom"===v.y?M.height-t-d:(M.height-t)/2)];C?(h.attr(M),h=h[0].getContext("2d"),h.restore(),h.save(),h.clearRect(0,0,3E3,3E3),h.translate(g[0],g[1]),h.beginPath(),h.moveTo(u[0][0],u[0][1]),h.lineTo(u[1][0],u[1][1]),h.lineTo(u[2][0],u[2][1]),h.closePath(),h.fillStyle=y,h.strokeStyle=E,h.lineWidth=2*d,h.lineJoin="miter",h.miterLimit=100,d&&h.stroke(),h.fill()):(u="m"+u[0][0]+","+u[0][1]+" l"+u[1][0]+
","+u[1][1]+" "+u[2][0]+","+u[2][1]+" xe",g[2]=d&&/^(r|b)/i.test(a.string())?8===parseFloat(c.browser.version,10)?2:1:0,h.css({antialias:""+(-1<v.string().indexOf("center")),left:g[0]-g[2]*Number("x"===D),top:g[1]-g[2]*Number("y"===D),width:m+d,height:t+d}).each(function(a){var b=c(this);b[b.prop?"prop":"attr"]({coordsize:m+d+" "+(t+d),path:u,fillcolor:y,filled:!!a,stroked:!a}).css({display:d||a?"block":"none"});!a&&""===b.html()&&b.html('<vml:stroke weight="'+2*d+'px" color="'+E+'" miterlimit="1000" joinstyle="miter"  style="behavior:url(#default#VML); display:inline-block;" />')}));
b!==l&&k.position(a)},position:function(a){var b=e.tip,m={},h=Math.max(0,n.offset),p,t,v;if(n.corner===l||!b)return l;a=a||k.corner;p=a.precedance;t=r(a);v=[a.x,a.y];"x"===p&&v.reverse();c.each(v,function(b,k){var l,n;if("center"===k)l="y"===p?"left":"top",m[l]="50%",m["margin-"+l]=-Math.round(t["y"===p?"width":"height"]/2)+h;else{l=f(a,k,s);n=c.browser.mozilla;var r=a.y+(n?"":"-")+a.x;n=(n?"-moz-":c.browser.webkit?"-webkit-":"")+(n?"border-radius-"+r:"border-"+r+"-radius");n=parseInt((e.titlebar&&
"top"===a.y?e.titlebar:e.content).css(n),10)||parseInt(g.css(n),10)||0;m[k]=b?d?f(a,k):0:h+(n>l?n:0)}});m[a[p]]-=t["x"===p?"width":"height"];b.css({top:"",bottom:"",left:"",right:"",margin:""}).css(m);return m},destroy:function(){e.tip&&e.tip.remove();g.unbind(".qtip-tip")}});k.init()}var s=!0,l=!1,z=null,C,x,K,V={},D="ui-tooltip",U="ui-widget",I="ui-state-disabled",J="div.qtip."+D,W=D+"-default",N=D+"-focus",Z=D+"-hover",Q=D+"-fluid",O="oldtitle",T;C=c.fn.qtip=function(b,a,m){var f=(""+b).toLowerCase(),
r=z,k="disable"===f?[s]:c.makeArray(arguments).slice(1),n=k[k.length-1],e=this[0]?c.data(this[0],"qtip"):z;if(!arguments.length&&e||"api"===f)return e;if("string"===typeof b)return this.each(function(){var b=c.data(this,"qtip");if(!b)return s;n&&n.timeStamp&&(b.cache.event=n);if(("option"===f||"options"===f)&&a)if(c.isPlainObject(a)||m!==L)b.set(a,m);else return r=b.get(a),l;else b[f]&&b[f].apply(b[f],k)}),r!==z?r:this;if("object"===typeof b||!arguments.length)return e=S(c.extend(s,{},b)),C.bind.call(this,
e,n)};C.bind=function(b,a){return this.each(function(m){function f(a){function b(){g.render("object"===typeof a||r.show.ready);k.show.add(k.hide).unbind(e)}if(g.cache.disabled)return l;g.cache.event=c.extend({},a);g.cache.target=a?c(a.target):[L];0<r.show.delay?(clearTimeout(g.timers.show),g.timers.show=setTimeout(b,r.show.delay),n.show!==n.hide&&k.hide.bind(n.hide,function(){clearTimeout(g.timers.show)})):b()}var r,k,n,e,g;m=c.isArray(b.id)?b.id[m]:b.id;m=!m||m===l||1>m.length||V[m]?C.nextid++:V[m]=
m;e=".qtip-"+m+"-create";g=aa.call(this,m,b);if(g===l)return s;r=g.options;c.each(x,function(){"initialize"===this.initialize&&this(g)});k={show:r.show.target,hide:r.hide.target};n={show:c.trim(""+r.show.event).replace(/ /g,e+" ")+e,hide:c.trim(""+r.hide.event).replace(/ /g,e+" ")+e};/mouse(over|enter)/i.test(n.show)&&!/mouse(out|leave)/i.test(n.hide)&&(n.hide+=" mouseleave"+e);k.show.bind("mousemove"+e,function(a){K={pageX:a.pageX,pageY:a.pageY,type:"mousemove"}});k.show.bind(n.show,f);(r.show.ready||
r.prerender)&&f(a)})};x=C.plugins={Corner:function(b){b=(""+b).replace(/([A-Z])/," $1").replace(/middle/gi,"center").toLowerCase();this.x=(b.match(/left|right/i)||b.match(/center/)||["inherit"])[0].toLowerCase();this.y=(b.match(/top|bottom|center/i)||["inherit"])[0].toLowerCase();this.precedance=-1<b.charAt(0).search(/^(t|b)/)?"y":"x";this.string=function(){return"y"===this.precedance?this.y+this.x:this.x+this.y};this.abbreviation=function(){var a=this.x.substr(0,1),b=this.y.substr(0,1);return a===
b?a:"c"===a||"c"!==a&&"c"!==b?b+a:a+b}},offset:function(b,a){var c=b.offset(),f=a,l=0,k=document.body,n;if(f){do if("static"!==f.css("position")&&(n=f[0]===k?{left:parseInt(f.css("left"),10)||0,top:parseInt(f.css("top"),10)||0}:f.position(),c.left-=n.left+(parseInt(f.css("borderLeftWidth"),10)||0)+(parseInt(f.css("marginLeft"),10)||0),c.top-=n.top+(parseInt(f.css("borderTopWidth"),10)||0),n=f.css("overflow"),("scroll"===n||"auto"===n)&&l++),f[0]===k)break;while(f=f.offsetParent());a[0]!==k&&l&&(c.left+=
1*a.scrollLeft(),c.top+=1*a.scrollTop())}return c},iOS:parseFloat((""+(/CPU.*OS ([0-9_]{1,3})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent)||[0,""])[1]).replace("undefined","3_2").replace("_","."))||l,fn:{attr:function(b,a){if(this.length){var m=this[0],f=c.data(m,"qtip");if("title"===b&&f&&"object"===typeof f&&f.options.suppress){if(2>arguments.length)return c.attr(m,O);f&&("title"===f.options.content.attr&&f.cache.attr)&&f.set("content.text",a);return this.attr(O,a)}}return c.fn.attr_replacedByqTip.apply(this,
arguments)},clone:function(b){c([]);var a=c.fn.clone_replacedByqTip.apply(this,arguments);b||a.filter("["+O+"]").attr("title",function(){return c.attr(this,O)}).removeAttr(O);return a},remove:c.ui?z:function(b,a){c(this).each(function(){a||(!b||c.filter(b,[this]).length)&&c("*",this).add(this).each(function(){c(this).triggerHandler("remove")})})}}};c.each(x.fn,function(b,a){if(!a||c.fn[b+"_replacedByqTip"])return s;var m=c.fn[b+"_replacedByqTip"]=c.fn[b];c.fn[b]=function(){return a.apply(this,arguments)||
m.apply(this,arguments)}});C.version="2.0.0pre";C.nextid=0;C.inactiveEvents="click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" ");C.zindex=15E3;C.defaults={prerender:l,id:l,overwrite:s,suppress:s,content:{text:s,attr:"title",title:{text:l,button:l}},position:{my:"top left",at:"bottom right",target:l,container:l,viewport:l,adjust:{x:0,y:0,mouse:s,resize:s,method:"flip flip"},effect:function(b,a,m){c(this).animate(a,{duration:200,queue:l})}},show:{target:l,event:"mouseenter",
effect:s,delay:90,solo:l,ready:l,autofocus:l},hide:{target:l,event:"mouseleave",effect:s,delay:0,fixed:l,inactive:l,leave:"window",distance:l},style:{classes:"",widget:l,width:l,height:l},events:{render:z,move:z,show:z,hide:z,toggle:z,visible:z,focus:z,blur:z}};x.ajax=function(b){var a=b.plugins.ajax;return"object"===typeof a?a:b.plugins.ajax=new ba(b)};x.ajax.initialize="render";x.ajax.sanitize=function(b){var a=b.content;a&&"ajax"in a&&(a=a.ajax,"object"!==typeof a&&(a=b.content.ajax={url:a}),"boolean"!==
typeof a.once&&a.once&&(a.once=!!a.once))};c.extend(s,C.defaults,{content:{ajax:{loading:s,once:s}}});x.bgiframe=function(b){var a=c.browser,m=b.plugins.bgiframe;return 1>c("select, object").length||!(a.msie&&"6"===a.version.charAt(0))?l:"object"===typeof m?m:b.plugins.bgiframe=new ca(b)};x.bgiframe.initialize="render";x.imagemap=function(b,a,m){function f(a,b,c){for(var e=0,f=1,g=1,k=0,h=0,m=a.width,l=a.height;0<m&&0<l&&0<f&&0<g;){m=Math.floor(m/2);l=Math.floor(l/2);f="left"===c.x?m:"right"===c.x?
a.width-m:f+Math.floor(m/2);g="top"===c.y?l:"bottom"===c.y?a.height-l:g+Math.floor(l/2);for(e=b.length;e--&&!(2>b.length);)k=b[e][0]-a.offset.left,h=b[e][1]-a.offset.top,("left"===c.x&&k>=f||"right"===c.x&&k<=f||"center"===c.x&&(k<f||k>a.width-f)||"top"===c.y&&h>=g||"bottom"===c.y&&h<=g||"center"===c.y&&(h<g||h>a.height-g))&&b.splice(e,1)}return{left:b[0][0],top:b[0][1]}}b.jquery||(b=c(b));var l=b.attr("shape").toLowerCase(),k=b.attr("coords").split(","),n=[];b=c('img[usemap="#'+b.parent("map").attr("name")+
'"]');var e=b.offset(),g={width:0,height:0,offset:{top:1E10,right:0,bottom:0,left:1E10}},s=0,p=0;e.left+=Math.ceil((b.outerWidth()-b.width())/2);e.top+=Math.ceil((b.outerHeight()-b.height())/2);if("poly"===l)for(s=k.length;s--;)p=[parseInt(k[--s],10),parseInt(k[s+1],10)],p[0]>g.offset.right&&(g.offset.right=p[0]),p[0]<g.offset.left&&(g.offset.left=p[0]),p[1]>g.offset.bottom&&(g.offset.bottom=p[1]),p[1]<g.offset.top&&(g.offset.top=p[1]),n.push(p);else n=c.map(k,function(a){return parseInt(a,10)});
switch(l){case "rect":g={width:Math.abs(n[2]-n[0]),height:Math.abs(n[3]-n[1]),offset:{left:n[0],top:n[1]}};break;case "circle":g={width:n[2]+2,height:n[2]+2,offset:{left:n[0],top:n[1]}};break;case "poly":c.extend(g,{width:Math.abs(g.offset.right-g.offset.left),height:Math.abs(g.offset.bottom-g.offset.top)});if("centercenter"===a.string())g.offset={left:g.offset.left+g.width/2,top:g.offset.top+g.height/2};else if(g.offset=f(g,n.slice(),a),m&&("flip"===m[0]||"flip"===m[1]))g.flipoffset=f(g,n.slice(),
{x:"left"===a.x?"right":"right"===a.x?"left":"center",y:"top"===a.y?"bottom":"bottom"===a.y?"top":"center"}),g.flipoffset.left-=g.offset.left,g.flipoffset.top-=g.offset.top;g.width=g.height=0}g.offset.left+=e.left;g.offset.top+=e.top;return g};x.modal=function(b){var a=b.plugins.modal;return"object"===typeof a?a:b.plugins.modal=new da(b)};x.modal.initialize="render";x.modal.sanitize=function(b){b.show&&("object"!==typeof b.show.modal?b.show.modal={on:!!b.show.modal}:"undefined"===typeof b.show.modal.on&&
(b.show.modal.on=s))};x.modal.zindex=C.zindex-=200;c.extend(s,C.defaults,{show:{modal:{on:l,effect:s,blur:s,escape:s}}});x.svg=function(b,a){var m=c(document),f=b[0],l={width:0,height:0,offset:{top:1E10,left:1E10}},k,n,e;if(f.getBBox&&f.parentNode){k=f.getBBox();n=f.getScreenCTM();f=f.farthestViewportElement||f;if(!f.createSVGPoint)return l;f=f.createSVGPoint();f.x=k.x;f.y=k.y;e=f.matrixTransform(n);l.offset.left=e.x;l.offset.top=e.y;f.x+=k.width;f.y+=k.height;e=f.matrixTransform(n);l.width=e.x-l.offset.left;
l.height=e.y-l.offset.top;l.offset.left+=m.scrollLeft();l.offset.top+=m.scrollTop()}return l};x.tip=function(b){var a=b.plugins.tip;return"object"===typeof a?a:b.plugins.tip=new fa(b)};x.tip.initialize="render";x.tip.sanitize=function(b){var a=b.style;a&&"tip"in a&&(a=b.style.tip,"object"!==typeof a&&(b.style.tip={corner:a}),/string|boolean/i.test(typeof a.corner)||(a.corner=s),"number"!==typeof a.width&&delete a.width,"number"!==typeof a.height&&delete a.height,"number"!==typeof a.border&&a.border!==
s&&delete a.border,"number"!==typeof a.offset&&delete a.offset)};c.extend(s,C.defaults,{style:{tip:{corner:s,mimic:l,width:6,height:6,border:s,offset:0}}})})(jQuery,window);

var JSON;JSON||(JSON={});
(function(){function e(a){return 10>a?"0"+a:a}function k(a){p.lastIndex=0;return p.test(a)?'"'+a.replace(p,function(a){var d=t[a];return"string"===typeof d?d:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function h(a,e){var d,f,l,r,s=c,g,b=e[a];b&&("object"===typeof b&&"function"===typeof b.toJSON)&&(b=b.toJSON(a));"function"===typeof m&&(b=m.call(e,a,b));switch(typeof b){case "string":return k(b);case "number":return isFinite(b)?String(b):"null";case "boolean":case "null":return String(b);case "object":if(!b)return"null";
c+=q;g=[];if("[object Array]"===Object.prototype.toString.apply(b)){r=b.length;for(d=0;d<r;d+=1)g[d]=h(d,b)||"null";l=0===g.length?"[]":c?"[\n"+c+g.join(",\n"+c)+"\n"+s+"]":"["+g.join(",")+"]";c=s;return l}if(m&&"object"===typeof m){r=m.length;for(d=0;d<r;d+=1)if(f=m[d],"string"===typeof f&&(l=h(f,b)))g.push(k(f)+(c?": ":":")+l)}else for(f in b)if(Object.hasOwnProperty.call(b,f)&&(l=h(f,b)))g.push(k(f)+(c?": ":":")+l);l=0===g.length?"{}":c?"{\n"+c+g.join(",\n"+c)+"\n"+s+"}":"{"+g.join(",")+"}";c=
s;return l}}"function"!==typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+e(this.getUTCMonth()+1)+"-"+e(this.getUTCDate())+"T"+e(this.getUTCHours())+":"+e(this.getUTCMinutes())+":"+e(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});var n=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
p=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,c,q,t={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},m;"function"!==typeof JSON.stringify&&(JSON.stringify=function(a,e,d){var f;q=c="";if("number"===typeof d)for(f=0;f<d;f+=1)q+=" ";else"string"===typeof d&&(q=d);if((m=e)&&"function"!==typeof e&&("object"!==typeof e||"number"!==typeof e.length))throw Error("JSON.stringify");return h("",{"":a})});
"function"!==typeof JSON.parse&&(JSON.parse=function(a,e){function d(a,f){var c,g,b=a[f];if(b&&"object"===typeof b)for(c in b)Object.hasOwnProperty.call(b,c)&&(g=d(b,c),void 0!==g?b[c]=g:delete b[c]);return e.call(a,f,b)}var f;a=String(a);n.lastIndex=0;n.test(a)&&(a=a.replace(n,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return f=eval("("+a+")"),"function"===typeof e?d({"":f},""):f;throw new SyntaxError("JSON.parse");})})();
(function(e){e.pageMethod=function(k,h,n,p,c){-1==k.indexOf("/")&&(k=location.pathname.match("/$")?location.pathname+"default.aspx/"+k:location.pathname+"/"+k);e.isFunction(h)?(n=data,h="{}"):e.isPlainObject(h)&&(h=JSON.stringify(h));e.ajax({type:"POST",cache:c||!1,url:k,data:h,contentType:"application/json; charset=utf-8",dataFilter:function(c){return c.replace(/"\\\/(Date\([0-9-]+\))\\\/"/gi,"new $1")},success:n,error:p})}})(jQuery);

/*

A jQuery edit in place plugin

Version 2.3.0

Authors:
Dave Hauenstein
Martin HÃ¤cker <spamfaenger [at] gmx [dot] de>

Project home:
http://code.google.com/p/jquery-in-place-editor/

Patches with tests welcomed! For guidance see the tests  </spec/unit/>. To submit, attach them to the bug tracker.

License:
This source file is subject to the BSD license bundled with this package.
Available online: {@link http://www.opensource.org/licenses/bsd-license.php}
If you did not receive a copy of the license, and are unable to obtain it, 
learn to use a search engine.

*/

(function ($) {

    $.fn.editInPlace = function (options) {

        var settings = $.extend({}, $.fn.editInPlace.defaults, options);

        assertMandatorySettingsArePresent(settings);

        preloadImage(settings.saving_image);

        return this.each(function () {
            var dom = $(this);
            // This won't work with live queries as there is no specific element to attach this
            // one way to deal with this could be to store a reference to self and then compare that in click?
            if (dom.data('editInPlace'))
                return; // already an editor here
            dom.data('editInPlace', true);

            new InlineEditor(settings, dom).init();
        });
    };

    /// Switch these through the dictionary argument to $(aSelector).editInPlace(overideOptions)
    /// Required Options: Either url or callback, so the editor knows what to do with the edited values.
    $.fn.editInPlace.defaults = {
        url: "", // string: POST URL to send edited content
        bg_over: "#ffc", // string: background color of hover of unactivated editor
        bg_out: "transparent", // string: background color on restore from hover
        hover_class: "",  // string: class added to root element during hover. Will override bg_over and bg_out
        show_buttons: false, // boolean: will show the buttons: cancel or save; will automatically cancel out the onBlur functionality
        save_button: '<button class="inplace_save">Save</button>', // string: image button tag to use as â€œSaveâ€ button
        cancel_button: '<button class="inplace_cancel">Cancel</button>', // string: image button tag to use as â€œCancelâ€ button
        params: "", // string: example: first_name=dave&last_name=hauenstein extra paramters sent via the post request to the server
        field_type: "text", // string: "text", "textarea", or "select";  The type of form field that will appear on instantiation
        default_text: "(Click here to add text)", // string: text to show up if the element that has this functionality is empty
        use_html: false, // boolean, set to true if the editor should use jQuery.fn.html() to extract the value to show from the dom node
        textarea_rows: 10, // integer: set rows attribute of textarea, if field_type is set to textarea. Use CSS if possible though
        textarea_cols: 25, // integer: set cols attribute of textarea, if field_type is set to textarea. Use CSS if possible though
        select_text: "Choose new value", // string: default text to show up in select box
        select_options: "", // string or array: Used if field_type is set to 'select'. Can be comma delimited list of options 'textandValue,text:value', Array of options ['textAndValue', 'text:value'] or array of arrays ['textAndValue', ['text', 'value']]. The last form is especially usefull if your labels or values contain colons)
        text_size: null, // integer: set cols attribute of text input, if field_type is set to text. Use CSS if possible though

        // Specifying callback_skip_dom_reset will disable all saving_* options
        saving_text: undefined, // string: text to be used when server is saving information. Example "Saving..."
        saving_image: "", // string: uses saving text specify an image location instead of text while server is saving
        saving_animation_color: 'transparent', // hex color string, will be the color the pulsing animation during the save pulses to. Note: Only works if jquery-ui is loaded

        value_required: false, // boolean: if set to true, the element will not be saved unless a value is entered
        element_id: "element_id", // string: name of parameter holding the id or the editable
        update_value: "update_value", // string: name of parameter holding the updated/edited value
        original_value: 'original_value', // string: name of parameter holding the updated/edited value
        original_html: "original_html", // string: name of parameter holding original_html value of the editable /* DEPRECATED in 2.2.0 */ use original_value instead.
        save_if_nothing_changed: false,  // boolean: submit to function or server even if the user did not change anything
        on_blur: "save", // string: "save" or null; what to do on blur; will be overridden if show_buttons is true
        cancel: "", // string: if not empty, a jquery selector for elements that will not cause the editor to open even though they are clicked. E.g. if you have extra buttons inside editable fields

        // All callbacks will have this set to the DOM node of the editor that triggered the callback

        callback: null, // function: function to be called when editing is complete; cancels ajax submission to the url param. 
        // Prototype: function(idOfEditor, enteredText, orinalHTMLContent, settingsParams, callbacks). 
        // The function needs to return the value that should be shown in the dom.
        // Returning undefined means cancel and will restore the dom and trigger an error. 
        // callbacks is a dictionary with two functions didStartSaving and didEndSaving() that you can use to tell the inline editor that 
        // it should start and stop any saving animations it has configured. /* DEPRECATED in 2.1.0 */ Parameter idOfEditor, use $(this).attr('id') instead
        callback_skip_dom_reset: false, // boolean: set this to true if the callback should handle replacing the editor with the new value to show
        success: null, // function: this function gets called if server responds with a success. Prototype: function(newEditorContentString)
        error: null, // function: this function gets called if server responds with an error. Prototype: function(request)
        error_sink: function (idOfEditor, errorString) { alert(errorString); }, // function: gets id of the editor and the error. Make sure the editor has an id, or it will just be undefined. If set to null, no error will be reported. /* DEPRECATED in 2.1.0 */ Parameter idOfEditor, use $(this).attr('id') instead
        preinit: null, // function: this function gets called after a click on an editable element but before the editor opens. If you return false, the inline editor will not open. Prototype: function(currentDomNode). DEPRECATED in 2.2.0 use delegate shouldOpenEditInPlace call instead
        postclose: null, // function: this function gets called after the inline editor has closed and all values are updated. Prototype: function(currentDomNode). DEPRECATED in 2.2.0 use delegate didCloseEditInPlace call instead
        delegate: null // object: if it has methods with the name of the callbacks documented below in delegateExample these will be called. This means that you just need to impelment the callbacks you are interested in.
    };

    // Lifecycle events that the delegate can implement
    // this will always be fixed to the delegate
    var delegateExample = {
        // called while opening the editor.
        // return false to prevent editor from opening
        shouldOpenEditInPlace: function (aDOMNode, aSettingsDict, triggeringEvent) { },
        // return content to show in inplace editor
        willOpenEditInPlace: function (aDOMNode, aSettingsDict) { },
        didOpenEditInPlace: function (aDOMNode, aSettingsDict) { },

        // called while closing the editor
        // return false to prevent the editor from closing
        shouldCloseEditInPlace: function (aDOMNode, aSettingsDict, triggeringEvent) { },
        // return value will be shown during saving
        willCloseEditInPlace: function (aDOMNode, aSettingsDict) { },
        didCloseEditInPlace: function (aDOMNode, aSettingsDict) { },

        missingCommaErrorPreventer: ''
    };


    function InlineEditor(settings, dom) {
        this.settings = settings;
        this.dom = dom;
        this.originalValue = null;
        this.didInsertDefaultText = false;
        this.shouldDelayReinit = false;
    };

    $.extend(InlineEditor.prototype, {

        init: function () {
            this.setDefaultTextIfNeccessary();
            this.connectOpeningEvents();
        },

        reinit: function () {
            if (this.shouldDelayReinit)
                return;

            this.triggerCallback(this.settings.postclose, /* DEPRECATED in 2.1.0 */this.dom);
            this.triggerDelegateCall('didCloseEditInPlace');

            this.markEditorAsInactive();
            this.setDefaultTextIfNeccessary();
            this.connectOpeningEvents();
        },

        setDefaultTextIfNeccessary: function () {
            if ('' !== jQuery.trim(this.dom.html()))
                return;

            this.dom.html(this.settings.default_text);
            this.didInsertDefaultText = true;
        },

        connectOpeningEvents: function () {
            var that = this;
            this.dom
			.bind('mouseenter.editInPlace', function () { that.addHoverEffect(); })
			.bind('mouseleave.editInPlace', function () { that.removeHoverEffect(); })
			.bind('click.editInPlace', function (anEvent) { that.openEditor(anEvent); });
        },

        disconnectOpeningEvents: function () {
            // prevent re-opening the editor when it is already open
            this.dom.unbind('.editInPlace');
        },

        addHoverEffect: function () {
            if (this.settings.hover_class)
                this.dom.addClass(this.settings.hover_class);
            else
                this.dom.css("background-color", this.settings.bg_over);
        },

        removeHoverEffect: function () {
            if (this.settings.hover_class)
                this.dom.removeClass(this.settings.hover_class);
            else
                this.dom.css("background-color", this.settings.bg_out);
        },

        openEditor: function (anEvent) {
            if (!this.shouldOpenEditor(anEvent))
                return;

            this.workAroundFirefoxBlurBug();
            this.disconnectOpeningEvents();
            this.removeHoverEffect();
            this.removeInsertedDefaultTextIfNeccessary();
            this.saveOriginalValue();
            this.markEditorAsActive();
            this.replaceContentWithEditor();
            this.connectOpeningEventsToEditor();
            this.triggerDelegateCall('didOpenEditInPlace');
        },

        shouldOpenEditor: function (anEvent) {
            if (this.isClickedObjectCancelled(anEvent.target))
                return false;

            if (false === this.triggerCallback(this.settings.preinit, /* DEPRECATED in 2.1.0 */this.dom))
                return false;

            if (false === this.triggerDelegateCall('shouldOpenEditInPlace', true, anEvent))
                return false;

            return true;
        },

        removeInsertedDefaultTextIfNeccessary: function () {
            if (!this.didInsertDefaultText
			|| this.dom.html() !== this.settings.default_text)
                return;

            this.dom.html('');
            this.didInsertDefaultText = false;
        },

        isClickedObjectCancelled: function (eventTarget) {
            if (!this.settings.cancel)
                return false;

            var eventTargetAndParents = $(eventTarget).parents().andSelf();
            var elementsMatchingCancelSelector = eventTargetAndParents.filter(this.settings.cancel);
            return 0 !== elementsMatchingCancelSelector.length;
        },

        saveOriginalValue: function () {
            if (this.settings.use_html)
                this.originalValue = this.dom.html();
            else
                this.originalValue = trim(this.dom.text());
        },

        restoreOriginalValue: function () {
            this.setClosedEditorContent(this.originalValue);
        },

        setClosedEditorContent: function (aValue) {
            if (this.settings.use_html)
                this.dom.html(aValue);
            else
                this.dom.text(aValue);
        },

        workAroundFirefoxBlurBug: function () {
            if (!$.browser.mozilla)
                return;

            // TODO: Opera seems to also have this bug....

            // Firefox will forget to send a blur event to an input element when another one is
            // created and selected programmatically. This means that if another inline editor is
            // opened, existing inline editors will _not_ close if they are configured to submit when blurred.
            // This is actually the first time I've written browser specific code for a browser different than IE! Wohoo!

            // Using parents() instead document as base to workaround the fact that in the unittests
            // the editor is not a child of window.document but of a document fragment
            this.dom.parents(':last').find('.editInPlace-active :input').blur();
        },

        replaceContentWithEditor: function () {
            var buttons_html = (this.settings.show_buttons) ? this.settings.save_button + ' ' + this.settings.cancel_button : '';
            var editorElement = this.createEditorElement(); // needs to happen before anything is replaced
            /* insert the new in place form after the element they click, then empty out the original element */
            /* Kewix workaround for jQuery 1.4.2 with firefox: Add an useless div and append the form inside. In this way everything is going fine! */
            this.dom.html('<div></div>')
			.append('<form class="inplace_form" style="display: inline; margin: 0; padding: 0;"></form>')
			.find('form')
				.append(editorElement)
                .append("<br/>")
                .append(buttons_html);
        },

        createEditorElement: function () {
            if (-1 === $.inArray(this.settings.field_type, ['text', 'textarea', 'select']))
                throw "Unknown field_type <fnord>, supported are 'text', 'textarea' and 'select'";

            var editor = null;
            if ("select" === this.settings.field_type)
                editor = this.createSelectEditor();
            else if ("text" === this.settings.field_type)
                editor = $('<input type="text" ' + this.inputNameAndClass()
				+ ' size="' + this.settings.text_size + '" />');
            else if ("textarea" === this.settings.field_type)
                editor = $('<textarea ' + this.inputNameAndClass()
				+ ' rows="' + this.settings.textarea_rows + '" '
				+ ' cols="' + this.settings.textarea_cols + '" />');

            editor.val(this.triggerDelegateCall('willOpenEditInPlace', this.originalValue));
            return editor;
        },

        inputNameAndClass: function () {
            return ' name="inplace_value" class="inplace_field" ';
        },

        createSelectEditor: function () {
            var editor = $('<select' + this.inputNameAndClass() + '>'
			+ '<option disabled="true" value="">' + this.settings.select_text + '</option>'
			+ '</select>');

            var optionsArray = this.settings.select_options;
            if (!$.isArray(optionsArray))
                optionsArray = optionsArray.split(',');

            for (var i = 0; i < optionsArray.length; i++) {

                var currentTextAndValue = optionsArray[i];
                if (!$.isArray(currentTextAndValue))
                    currentTextAndValue = currentTextAndValue.split(':');

                var value = trim(currentTextAndValue[1] || currentTextAndValue[0]);
                var text = trim(currentTextAndValue[0]);

                var selected = (value == this.originalValue) ? 'selected="selected" ' : '';
                var option = $('<option ' + selected + ' ></option>').val(value).text(text);
                editor.append(option);
            }
            return editor;

        },

        // REFACT: rename opening is not what it's about. Its about closing events really
        connectOpeningEventsToEditor: function () {
            var that = this;
            function cancelEditorAction(anEvent) {
                that.handleCancelEditor(anEvent);
                return false; // stop event bubbling
            }
            function saveEditorAction(anEvent) {
                that.handleSaveEditor(anEvent);
                return false; // stop event bubbling
            }

            var form = this.dom.find("form");

            form.find(".inplace_field").focus().select();
            form.find(".inplace_cancel").click(cancelEditorAction);
            form.find(".inplace_save").click(saveEditorAction);

            if (!this.settings.show_buttons) {
                // TODO: Firefox has a bug where blur is not reliably called when focus is lost 
                //       (for example by another editor appearing)
                if ("save" === this.settings.on_blur)
                    form.find(".inplace_field").blur(saveEditorAction);
                else
                    form.find(".inplace_field").blur(cancelEditorAction);

                // workaround for firefox bug where it won't submit on enter if no button is shown
                if ($.browser.mozilla)
                    this.bindSubmitOnEnterInInput();
            }

            form.keyup(function (anEvent) {
                // allow canceling with escape
                var escape = 27;
                if (escape === anEvent.which)
                    return cancelEditorAction();
            });

            // workaround for webkit nightlies where they won't submit at all on enter
            // REFACT: find a way to just target the nightlies
            if ($.browser.safari)
                this.bindSubmitOnEnterInInput();


            form.submit(saveEditorAction);
        },

        bindSubmitOnEnterInInput: function () {
            if ('textarea' === this.settings.field_type)
                return; // can't enter newlines otherwise

            var that = this;
            this.dom.find(':input').keyup(function (event) {
                var enter = 13;
                if (enter === event.which)
                    return that.dom.find('form').submit();
            });

        },

        handleCancelEditor: function (anEvent) {
            // REFACT: remove duplication between save and cancel
            if (false === this.triggerDelegateCall('shouldCloseEditInPlace', true, anEvent))
                return;

            var enteredText = this.dom.find(':input').val();
            enteredText = this.triggerDelegateCall('willCloseEditInPlace', enteredText);

            this.restoreOriginalValue();

//            if (hasContent(enteredText)
//			&& !this.isDisabledDefaultSelectChoice())
            //                this.setClosedEditorContent(enteredText);

            this.reinit();
        },

        handleSaveEditor: function (anEvent) {
            if (false === this.triggerDelegateCall('shouldCloseEditInPlace', true, anEvent))
                return;

            var enteredText = this.dom.find(':input').val();
            enteredText = this.triggerDelegateCall('willCloseEditInPlace', enteredText);

            if (this.isDisabledDefaultSelectChoice()
			|| this.isUnchangedInput(enteredText)) {
                this.handleCancelEditor(anEvent);
                return;
            }

            if (this.didForgetRequiredText(enteredText)) {
                this.handleCancelEditor(anEvent);
                this.reportError("Error: You must enter a value to save this field");
                return;
            }

            this.showSaving(enteredText);

            if (this.settings.callback)
                this.handleSubmitToCallback(enteredText);
            else
                this.handleSubmitToServer(enteredText);
        },

        didForgetRequiredText: function (enteredText) {
            return this.settings.value_required
			&& ("" === $.trim(enteredText)
				|| undefined === enteredText
				|| null === enteredText);
        },

        isDisabledDefaultSelectChoice: function () {
            return this.dom.find('option').eq(0).is(':selected:disabled');
        },

        isUnchangedInput: function (enteredText) {
            return !this.settings.save_if_nothing_changed
			&& this.originalValue === enteredText;
        },

        showSaving: function (enteredText) {
            if (this.settings.callback && this.settings.callback_skip_dom_reset)
                return;

            var savingMessage = enteredText;
            if (hasContent(this.settings.saving_text))
                savingMessage = this.settings.saving_text;
            if (hasContent(this.settings.saving_image))
            // REFACT: alt should be the configured saving message
                savingMessage = $('<img />').attr('src', this.settings.saving_image).attr('alt', savingMessage);
            this.dom.html(savingMessage);
        },

        handleSubmitToCallback: function (enteredText) {
            // REFACT: consider to encode enteredText and originalHTML before giving it to the callback
            this.enableOrDisableAnimationCallbacks(true, false);
            var newHTML = this.triggerCallback(this.settings.callback, /* DEPRECATED in 2.1.0 */this.id(), enteredText, this.originalValue,
			this.settings.params, this.savingAnimationCallbacks());

            if (this.settings.callback_skip_dom_reset)
                ; // do nothing
            else if (undefined === newHTML) {
                // failure; put original back
                this.reportError("Error: Failed to save value: " + enteredText);
                this.restoreOriginalValue();
            }
            else
            // REFACT: use setClosedEditorContent
                this.dom.html(newHTML);

            if (this.didCallNoCallbacks()) {
                this.enableOrDisableAnimationCallbacks(false, false);
                this.reinit();
            }
        },

        handleSubmitToServer: function (enteredText) {
            var data = this.settings.update_value + '=' + encodeURIComponent(enteredText)
			+ '&' + this.settings.element_id + '=' + this.dom.attr("id")
			+ ((this.settings.params) ? '&' + this.settings.params : '')
			+ '&' + this.settings.original_html + '=' + encodeURIComponent(this.originalValue) /* DEPRECATED in 2.2.0 */
			+ '&' + this.settings.original_value + '=' + encodeURIComponent(this.originalValue);

            this.enableOrDisableAnimationCallbacks(true, false);
            this.didStartSaving();
            var that = this;
            $.ajax({
                url: that.settings.url,
                type: "POST",
                data: data,
                dataType: "html",
                complete: function (request) {
                    that.didEndSaving();
                },
                success: function (html) {
                    var new_text = html || that.settings.default_text;

                    /* put the newly updated info into the original element */
                    // FIXME: should be affected by the preferences switch
                    that.dom.html(new_text);
                    // REFACT: remove dom parameter, already in this, not documented, should be easy to remove
                    // REFACT: callback should be able to override what gets put into the DOM
                    that.triggerCallback(that.settings.success, html);
                },
                error: function (request) {
                    that.dom.html(that.originalHTML); // REFACT: what about a restorePreEditingContent()
                    if (that.settings.error)
                    // REFACT: remove dom parameter, already in this, not documented, can remove without deprecation
                    // REFACT: callback should be able to override what gets entered into the DOM
                        that.triggerCallback(that.settings.error, request);
                    else
                        that.reportError("Failed to save value: " + request.responseText || 'Unspecified Error');
                }
            });
        },

        // Utilities .........................................................

        triggerCallback: function (aCallback /*, arguments */) {
            if (!aCallback)
                return; // callback wasn't specified after all

            var callbackArguments = Array.prototype.slice.call(arguments, 1);
            return aCallback.apply(this.dom[0], callbackArguments);
        },

        /// defaultReturnValue is only used if the delegate returns undefined
        triggerDelegateCall: function (aDelegateMethodName, defaultReturnValue, optionalEvent) {
            // REFACT: consider to trigger equivalent callbacks automatically via a mapping table?
            if (!this.settings.delegate
			|| !$.isFunction(this.settings.delegate[aDelegateMethodName]))
                return defaultReturnValue;

            var delegateReturnValue = this.settings.delegate[aDelegateMethodName](this.dom, this.settings, optionalEvent);
            return (undefined === delegateReturnValue)
			? defaultReturnValue
			: delegateReturnValue;
        },

        reportError: function (anErrorString) {
            this.triggerCallback(this.settings.error_sink, /* DEPRECATED in 2.1.0 */this.id(), anErrorString);
        },

        // REFACT: this method should go, callbacks should get the dom node itself as an argument
        id: function () {
            return this.dom.attr('id');
        },

        markEditorAsActive: function () {
            this.dom.addClass('editInPlace-active');
        },

        markEditorAsInactive: function () {
            this.dom.removeClass('editInPlace-active');
        },

        // REFACT: consider rename, doesn't deal with animation directly
        savingAnimationCallbacks: function () {
            var that = this;
            return {
                didStartSaving: function () { that.didStartSaving(); },
                didEndSaving: function () { that.didEndSaving(); }
            };
        },

        enableOrDisableAnimationCallbacks: function (shouldEnableStart, shouldEnableEnd) {
            this.didStartSaving.enabled = shouldEnableStart;
            this.didEndSaving.enabled = shouldEnableEnd;
        },

        didCallNoCallbacks: function () {
            return this.didStartSaving.enabled && !this.didEndSaving.enabled;
        },

        assertCanCall: function (methodName) {
            if (!this[methodName].enabled)
                throw new Error('Cannot call ' + methodName + ' now. See documentation for details.');
        },

        didStartSaving: function () {
            this.assertCanCall('didStartSaving');
            this.shouldDelayReinit = true;
            this.enableOrDisableAnimationCallbacks(false, true);

            this.startSavingAnimation();
        },

        didEndSaving: function () {
            this.assertCanCall('didEndSaving');
            this.shouldDelayReinit = false;
            this.enableOrDisableAnimationCallbacks(false, false);
            this.reinit();

            this.stopSavingAnimation();
        },

        startSavingAnimation: function () {
            var that = this;
            this.dom
			.animate({ backgroundColor: this.settings.saving_animation_color }, 400)
			.animate({ backgroundColor: 'transparent' }, 400, 'swing', function () {
			    // In the tests animations are turned off - i.e they happen instantaneously.
			    // Hence we need to prevent this from becomming an unbounded recursion.
			    setTimeout(function () { that.startSavingAnimation(); }, 10);
			});
        },

        stopSavingAnimation: function () {
            this.dom
			.stop(true)
			.css({ backgroundColor: '' });
        },

        missingCommaErrorPreventer: ''
    });



    // Private helpers .......................................................

    function assertMandatorySettingsArePresent(options) {
        // one of these needs to be non falsy
        if (options.url || options.callback)
            return;

        throw new Error("Need to set either url: or callback: option for the inline editor to work.");
    }

    /* preload the loading icon if it is configured */
    function preloadImage(anImageURL) {
        if ('' === anImageURL)
            return;

        var loading_image = new Image();
        loading_image.src = anImageURL;
    }

    function trim(aString) {
        return aString
		.replace(/^\s+/, '')
		.replace(/\s+$/, '');
    }

    function hasContent(something) {
        if (undefined === something || null === something)
            return false;

        if (0 === something.length)
            return false;

        return true;
    }

})(jQuery);
/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
* Licensed under the MIT License (LICENSE.txt).
*
* Version 1.0
*
* Contributions by:
*   - Neil Monroe (neil.monroe[at]gmail.com)
*/

(function ($) {

    $.fn.extend({
        countable: function (givenOptions) {
            return this.each(function () {
                var $this = $(this), interval, prev_char_diff, $el,
                options = $.extend({
                    threshold: .5,
                    appendMethod: 'insertAfter', // insertBefore || insertAfter || prependTo || appendTo
                    target: $this, // relative element with which to place the counter
                    startOpacity: .25,
                    maxLength: parseInt($this.attr('maxlength'), 10) || 0,
                    maxClassName: 'maxed',
                    className: 'counter',
                    tagName: 'span',
                    interval: 750,
                    positiveCopy: 'You have {n}&nbsp;characters left.',
                    negativeCopy: 'You are {n}&nbsp;characters over.',
                    fadeDuration: 'normal',
                    defaultText: '' // text to disregard in the character count
                }, givenOptions);

                // create counter element
                $el = $('<' + options.tagName + '/>')
                .html(options.positiveCopy.replace('{n}', '<span class="num"></span>'))
                .addClass(options.className);

                // set initial opacity to 0 if opacity is supported
                if ($.support.opacity) $el.css({ opacity: 0 }); // don't set opacity for IE to avoid clear text issues.

                // sppend counter element to the DOM
                $el[options.appendMethod](options.target);

                // hook up events for the input/textarea being monitored
                $this
                .bind('keyup', check)
                .bind('focus blur', function (event) {
                    if (event.type == 'blur') clearInterval(interval);
                    if (event.type == 'focus' && !interval) setInterval(check, options.interval);
                });

                // actual function to do the character counting and notification
                function check() {
                    var val = $this.val(),
                    length = (val == options.defaultText ? 0 : val.length),
                    percentage_complete = length / options.maxLength,
                    char_diff = options.maxLength - length,
                    opacity;

                    // return if we haven't made any progress
                    if (prev_char_diff != undefined && char_diff == prev_char_diff) return;

                    // if counter element is hidden and we are past the given threshold, show it
                    if ($el.is(':hidden') && percentage_complete >= options.threshold)
                        $el.show();
                    // if the counter element is visible and we are now under the given threshold, hide it
                    if ($el.is(':visible') && percentage_complete < options.threshold)
                        $el.hide();

                    if ($.support.opacity) { // don't set opacity for IE to avoid clear type issues.
                        // calculate the correct opacity
                        opacity = options.startOpacity + ((options.threshold - percentage_complete) * ((options.startOpacity * 2) - 2));
                        // animate to the correct opacity
                        $el.stop().fadeTo(options.fadeDuration, percentage_complete >= options.threshold ? opacity : 0);
                    }

                    // set the correct copy if under or over the max number of characters
                    if (char_diff >= 0) {
                        if ($el.is('.' + options.maxClassName))
                            $el.html(options.positiveCopy.replace('{n}', '<span class="num"></span>'));
                    } else {
                        if (!$el.is('.' + options.maxClassName))
                            $el.html(options.negativeCopy.replace('{n}', '<span class="num"></span>'));
                    }

                    // add or remove the max class name
                    $el[(char_diff < 0 ? 'add' : 'remove') + 'Class'](options.maxClassName);

                    // set the number of characters left or number of characters over the limit
                    $el.find('.num').text(Math.abs(char_diff));

                    // make sure the plural is necessary or not
                    if (char_diff == -1 || char_diff == 1)
                        $el.html($el.html().replace(/characters\b/, 'character'));
                    else
                        $el.html($el.html().replace(/character\b/, 'characters'));

                    prev_char_diff = char_diff;
                };
                // run an initial check
                check();
            });
        }
    });

})(jQuery);
/*
* Lazy Load - jQuery plugin for lazy loading images
*
* Copyright (c) 2007-2011 Mika Tuupola
*
* Licensed under the MIT license:
*   http://www.opensource.org/licenses/mit-license.php
*
* Project home:
*   http://www.appelsiini.net/projects/lazyload
*
* Version:  1.7.0-dev
*
*/
(function ($) {

    $.fn.lazyload = function (options) {
        var settings = {
            threshold: 0,
            failure_limit: 0,
            event: "scroll",
            effect: "show",
            container: window,
            skip_invisible: true,
            callback: null
        };

        if (options) {
            /* Maintain BC for a couple of version. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit;
            }

            $.extend(settings, options);
        }

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        var elements = this;
        if (0 == settings.event.indexOf("scroll")) {
            $(settings.container).bind(settings.event, function (event) {
                var counter = 0;
                elements.each(function () {
                    $this = $(this);
                    if (settings.skip_invisible && !$this.is(":visible")) return;
                    if ($.abovethetop(this, settings) ||
                        $.leftofbegin(this, settings)) {
                        /* Nothing. */
                    } else if (!$.belowthefold(this, settings) &&
                        !$.rightoffold(this, settings)) {
                        $this.trigger("appear");
                    } else {
                        if (++counter > settings.failure_limit) {
                            return false;
                        }
                    }
                });

                /* Remove image from array so it is not looped next time. */
                var temp = $.grep(elements, function (element) {
                    return !element.loaded;
                });
                elements = $(temp);

            });
        }

        this.each(function () {
            var self = this;
            var $self = $(this);

            self.loaded = false;

            /* When appear is triggered load original image. */
            $self.one("appear", function () {
                if (!this.loaded) {
                    $("<img />")
                        .bind("load", function () {
                            $self
                                .hide()
                                .attr("src", $self.data("original"))
                                [settings.effect](settings.effectspeed);
                            self.loaded = true;
                            if (settings.callback) {
                                settings.callback.call(self);
                            }
                        })
                        .attr("src", $self.data("original"));
                };
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 != settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function (event) {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* Check if something appears when window is resized. */
        $(window).bind("resize", function (event) {
            $(settings.container).trigger(settings.event);
        });

        /* Force initial check if images should appear. */
        $(settings.container).trigger(settings.event);

        return this;

    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function (element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).height() + $(window).scrollTop();
        } else {
            var fold = $(settings.container).offset().top + $(settings.container).height();
        }
        return fold <= $(element).offset().top - settings.threshold;
    };

    $.rightoffold = function (element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).width() + $(window).scrollLeft();
        } else {
            var fold = $(settings.container).offset().left + $(settings.container).width();
        }
        return fold <= $(element).offset().left - settings.threshold;
    };

    $.abovethetop = function (element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).scrollTop();
        } else {
            var fold = $(settings.container).offset().top;
        }
        return fold >= $(element).offset().top + settings.threshold + $(element).height();
    };

    $.leftofbegin = function (element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).scrollLeft();
        } else {
            var fold = $(settings.container).offset().left;
        }
        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };
    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() */

    $.extend($.expr[':'], {
        "below-the-fold": function (a) { return $.belowthefold(a, { threshold: 0, container: window }) },
        "above-the-fold": function (a) { return !$.belowthefold(a, { threshold: 0, container: window }) },
        "right-of-fold": function (a) { return $.rightoffold(a, { threshold: 0, container: window }) },
        "left-of-fold": function (a) { return !$.rightoffold(a, { threshold: 0, container: window }) }
    });

})(jQuery);
/*!
* jQuery Templates Plugin 1.0.0pre
* http://github.com/jquery/jquery-tmpl
* Requires jQuery 1.4.2
*
* Copyright Software Freedom Conservancy, Inc.
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
(function (jQuery, undefined) {
    var oldManip = jQuery.fn.domManip, tmplItmAtt = "_tmplitem", htmlExpr = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,
		newTmplItems = {}, wrappedItems = {}, appendToTmplItems, topTmplItem = { key: 0, data: {} }, itemKey = 0, cloneIndex = 0, stack = [];

    function newTmplItem(options, parentItem, fn, data) {
        // Returns a template item data structure for a new rendered instance of a template (a 'template item').
        // The content field is a hierarchical array of strings and nested items (to be
        // removed and replaced by nodes field of dom elements, once inserted in DOM).
        var newItem = {
            data: data || (data === 0 || data === false) ? data : (parentItem ? parentItem.data : {}),
            _wrap: parentItem ? parentItem._wrap : null,
            tmpl: null,
            parent: parentItem || null,
            nodes: [],
            calls: tiCalls,
            nest: tiNest,
            wrap: tiWrap,
            html: tiHtml,
            update: tiUpdate
        };
        if (options) {
            jQuery.extend(newItem, options, { nodes: [], parent: parentItem });
        }
        if (fn) {
            // Build the hierarchical content to be used during insertion into DOM
            newItem.tmpl = fn;
            newItem._ctnt = newItem._ctnt || newItem.tmpl(jQuery, newItem);
            newItem.key = ++itemKey;
            // Keep track of new template item, until it is stored as jQuery Data on DOM element
            (stack.length ? wrappedItems : newTmplItems)[itemKey] = newItem;
        }
        return newItem;
    }

    // Override appendTo etc., in order to provide support for targeting multiple elements. (This code would disappear if integrated in jquery core).
    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (name, original) {
        jQuery.fn[name] = function (selector) {
            var ret = [], insert = jQuery(selector), elems, i, l, tmplItems,
				parent = this.length === 1 && this[0].parentNode;

            appendToTmplItems = newTmplItems || {};
            if (parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1) {
                insert[original](this[0]);
                ret = this;
            } else {
                for (i = 0, l = insert.length; i < l; i++) {
                    cloneIndex = i;
                    elems = (i > 0 ? this.clone(true) : this).get();
                    jQuery(insert[i])[original](elems);
                    ret = ret.concat(elems);
                }
                cloneIndex = 0;
                ret = this.pushStack(ret, name, insert.selector);
            }
            tmplItems = appendToTmplItems;
            appendToTmplItems = null;
            jQuery.tmpl.complete(tmplItems);
            return ret;
        };
    });

    jQuery.fn.extend({
        // Use first wrapped element as template markup.
        // Return wrapped set of template items, obtained by rendering template against data.
        tmpl: function (data, options, parentItem) {
            return jQuery.tmpl(this[0], data, options, parentItem);
        },

        // Find which rendered template item the first wrapped DOM element belongs to
        tmplItem: function () {
            return jQuery.tmplItem(this[0]);
        },

        // Consider the first wrapped element as a template declaration, and get the compiled template or store it as a named template.
        template: function (name) {
            return jQuery.template(name, this[0]);
        },

        domManip: function (args, table, callback, options) {
            if (args[0] && jQuery.isArray(args[0])) {
                var dmArgs = jQuery.makeArray(arguments), elems = args[0], elemsLength = elems.length, i = 0, tmplItem;
                while (i < elemsLength && !(tmplItem = jQuery.data(elems[i++], "tmplItem"))) { }
                if (tmplItem && cloneIndex) {
                    dmArgs[2] = function (fragClone) {
                        // Handler called by oldManip when rendered template has been inserted into DOM.
                        jQuery.tmpl.afterManip(this, fragClone, callback);
                    };
                }
                oldManip.apply(this, dmArgs);
            } else {
                oldManip.apply(this, arguments);
            }
            cloneIndex = 0;
            if (!appendToTmplItems) {
                jQuery.tmpl.complete(newTmplItems);
            }
            return this;
        }
    });

    jQuery.extend({
        // Return wrapped set of template items, obtained by rendering template against data.
        tmpl: function (tmpl, data, options, parentItem) {
            var ret, topLevel = !parentItem;
            if (topLevel) {
                // This is a top-level tmpl call (not from a nested template using {{tmpl}})
                parentItem = topTmplItem;
                tmpl = jQuery.template[tmpl] || jQuery.template(null, tmpl);
                wrappedItems = {}; // Any wrapped items will be rebuilt, since this is top level
            } else if (!tmpl) {
                // The template item is already associated with DOM - this is a refresh.
                // Re-evaluate rendered template for the parentItem
                tmpl = parentItem.tmpl;
                newTmplItems[parentItem.key] = parentItem;
                parentItem.nodes = [];
                if (parentItem.wrapped) {
                    updateWrapped(parentItem, parentItem.wrapped);
                }
                // Rebuild, without creating a new template item
                return jQuery(build(parentItem, null, parentItem.tmpl(jQuery, parentItem)));
            }
            if (!tmpl) {
                return []; // Could throw...
            }
            if (typeof data === "function") {
                data = data.call(parentItem || {});
            }
            if (options && options.wrapped) {
                updateWrapped(options, options.wrapped);
            }
            ret = jQuery.isArray(data) ?
				jQuery.map(data, function (dataItem) {
				    return dataItem ? newTmplItem(options, parentItem, tmpl, dataItem) : null;
				}) :
				[newTmplItem(options, parentItem, tmpl, data)];
            return topLevel ? jQuery(build(parentItem, null, ret)) : ret;
        },

        // Return rendered template item for an element.
        tmplItem: function (elem) {
            var tmplItem;
            if (elem instanceof jQuery) {
                elem = elem[0];
            }
            while (elem && elem.nodeType === 1 && !(tmplItem = jQuery.data(elem, "tmplItem")) && (elem = elem.parentNode)) { }
            return tmplItem || topTmplItem;
        },

        // Set:
        // Use $.template( name, tmpl ) to cache a named template,
        // where tmpl is a template string, a script element or a jQuery instance wrapping a script element, etc.
        // Use $( "selector" ).template( name ) to provide access by name to a script block template declaration.

        // Get:
        // Use $.template( name ) to access a cached template.
        // Also $( selectorToScriptBlock ).template(), or $.template( null, templateString )
        // will return the compiled template, without adding a name reference.
        // If templateString includes at least one HTML tag, $.template( templateString ) is equivalent
        // to $.template( null, templateString )
        template: function (name, tmpl) {
            if (tmpl) {
                // Compile template and associate with name
                if (typeof tmpl === "string") {
                    // This is an HTML string being passed directly in.
                    tmpl = buildTmplFn(tmpl)
                } else if (tmpl instanceof jQuery) {
                    tmpl = tmpl[0] || {};
                }
                if (tmpl.nodeType) {
                    // If this is a template block, use cached copy, or generate tmpl function and cache.
                    tmpl = jQuery.data(tmpl, "tmpl") || jQuery.data(tmpl, "tmpl", buildTmplFn(tmpl.innerHTML));
                    // Issue: In IE, if the container element is not a script block, the innerHTML will remove quotes from attribute values whenever the value does not include white space.
                    // This means that foo="${x}" will not work if the value of x includes white space: foo="${x}" -> foo=value of x.
                    // To correct this, include space in tag: foo="${ x }" -> foo="value of x"
                }
                return typeof name === "string" ? (jQuery.template[name] = tmpl) : tmpl;
            }
            // Return named compiled template
            return name ? (typeof name !== "string" ? jQuery.template(null, name) :
				(jQuery.template[name] ||
            // If not in map, and not containing at least on HTML tag, treat as a selector.
            // (If integrated with core, use quickExpr.exec)
					jQuery.template(null, htmlExpr.test(name) ? name : jQuery(name)))) : null;
        },

        encode: function (text) {
            // Do HTML encoding replacing < > & and ' and " by corresponding entities.
            return ("" + text).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;");
        }
    });

    jQuery.extend(jQuery.tmpl, {
        tag: {
            "tmpl": {
                _default: { $2: "null" },
                open: "if($notnull_1){__=__.concat($item.nest($1,$2));}"
                // tmpl target parameter can be of type function, so use $1, not $1a (so not auto detection of functions)
                // This means that {{tmpl foo}} treats foo as a template (which IS a function).
                // Explicit parens can be used if foo is a function that returns a template: {{tmpl foo()}}.
            },
            "wrap": {
                _default: { $2: "null" },
                open: "$item.calls(__,$1,$2);__=[];",
                close: "call=$item.calls();__=call._.concat($item.wrap(call,__));"
            },
            "each": {
                _default: { $2: "$index, $value" },
                open: "if($notnull_1){$.each($1a,function($2){with(this){",
                close: "}});}"
            },
            "if": {
                open: "if(($notnull_1) && $1a){",
                close: "}"
            },
            "else": {
                _default: { $1: "true" },
                open: "}else if(($notnull_1) && $1a){"
            },
            "html": {
                // Unecoded expression evaluation.
                open: "if($notnull_1){__.push($1a);}"
            },
            "=": {
                // Encoded expression evaluation. Abbreviated form is ${}.
                _default: { $1: "$data" },
                open: "if($notnull_1){__.push($.encode($1a));}"
            },
            "!": {
                // Comment tag. Skipped by parser
                open: ""
            }
        },

        // This stub can be overridden, e.g. in jquery.tmplPlus for providing rendered events
        complete: function (items) {
            newTmplItems = {};
        },

        // Call this from code which overrides domManip, or equivalent
        // Manage cloning/storing template items etc.
        afterManip: function afterManip(elem, fragClone, callback) {
            // Provides cloned fragment ready for fixup prior to and after insertion into DOM
            var content = fragClone.nodeType === 11 ?
				jQuery.makeArray(fragClone.childNodes) :
				fragClone.nodeType === 1 ? [fragClone] : [];

            // Return fragment to original caller (e.g. append) for DOM insertion
            callback.call(elem, fragClone);

            // Fragment has been inserted:- Add inserted nodes to tmplItem data structure. Replace inserted element annotations by jQuery.data.
            storeTmplItems(content);
            cloneIndex++;
        }
    });

    //========================== Private helper functions, used by code above ==========================

    function build(tmplItem, nested, content) {
        // Convert hierarchical content into flat string array
        // and finally return array of fragments ready for DOM insertion
        var frag, ret = content ? jQuery.map(content, function (item) {
            return (typeof item === "string") ?
            // Insert template item annotations, to be converted to jQuery.data( "tmplItem" ) when elems are inserted into DOM.
				(tmplItem.key ? item.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + tmplItmAtt + "=\"" + tmplItem.key + "\" $2") : item) :
            // This is a child template item. Build nested template.
				build(item, tmplItem, item._ctnt);
        }) :
        // If content is not defined, insert tmplItem directly. Not a template item. May be a string, or a string array, e.g. from {{html $item.html()}}.
		tmplItem;
        if (nested) {
            return ret;
        }

        // top-level template
        ret = ret.join("");

        // Support templates which have initial or final text nodes, or consist only of text
        // Also support HTML entities within the HTML markup.
        ret.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/, function (all, before, middle, after) {
            frag = jQuery(middle).get();

            storeTmplItems(frag);
            if (before) {
                frag = unencode(before).concat(frag);
            }
            if (after) {
                frag = frag.concat(unencode(after));
            }
        });
        return frag ? frag : unencode(ret);
    }

    function unencode(text) {
        // Use createElement, since createTextNode will not render HTML entities correctly
        var el = document.createElement("div");
        el.innerHTML = text;
        return jQuery.makeArray(el.childNodes);
    }

    // Generate a reusable function that will serve to render a template against data
    function buildTmplFn(markup) {
        return new Function("jQuery", "$item",
        // Use the variable __ to hold a string array while building the compiled template. (See https://github.com/jquery/jquery-tmpl/issues#issue/10).
			"var $=jQuery,call,__=[],$data=$item.data;" +

        // Introduce the data as local variables using with(){}
			"with($data){__.push('" +

        // Convert the template into pure JavaScript
			jQuery.trim(markup)
				.replace(/([\\'])/g, "\\$1")
				.replace(/[\r\t\n]/g, " ")
				.replace(/\$\{([^\}]*)\}/g, "{{= $1}}")
				.replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,
				function (all, slash, type, fnargs, target, parens, args) {
				    var tag = jQuery.tmpl.tag[type], def, expr, exprAutoFnDetect;
				    if (!tag) {
				        throw "Unknown template tag: " + type;
				    }
				    def = tag._default || [];
				    if (parens && !/\w$/.test(target)) {
				        target += parens;
				        parens = "";
				    }
				    if (target) {
				        target = unescape(target);
				        args = args ? ("," + unescape(args) + ")") : (parens ? ")" : "");
				        // Support for target being things like a.toLowerCase();
				        // In that case don't call with template item as 'this' pointer. Just evaluate...
				        expr = parens ? (target.indexOf(".") > -1 ? target + unescape(parens) : ("(" + target + ").call($item" + args)) : target;
				        exprAutoFnDetect = parens ? expr : "(typeof(" + target + ")==='function'?(" + target + ").call($item):(" + target + "))";
				    } else {
				        exprAutoFnDetect = expr = def.$1 || "null";
				    }
				    fnargs = unescape(fnargs);
				    return "');" +
						tag[slash ? "close" : "open"]
							.split("$notnull_1").join(target ? "typeof(" + target + ")!=='undefined' && (" + target + ")!=null" : "true")
							.split("$1a").join(exprAutoFnDetect)
							.split("$1").join(expr)
							.split("$2").join(fnargs || def.$2 || "") +
						"__.push('";
				}) +
			"');}return __;"
		);
    }
    function updateWrapped(options, wrapped) {
        // Build the wrapped content.
        options._wrap = build(options, true,
        // Suport imperative scenario in which options.wrapped can be set to a selector or an HTML string.
			jQuery.isArray(wrapped) ? wrapped : [htmlExpr.test(wrapped) ? wrapped : jQuery(wrapped).html()]
		).join("");
    }

    function unescape(args) {
        return args ? args.replace(/\\'/g, "'").replace(/\\\\/g, "\\") : null;
    }
    function outerHtml(elem) {
        var div = document.createElement("div");
        div.appendChild(elem.cloneNode(true));
        return div.innerHTML;
    }

    // Store template items in jQuery.data(), ensuring a unique tmplItem data data structure for each rendered template instance.
    function storeTmplItems(content) {
        var keySuffix = "_" + cloneIndex, elem, elems, newClonedItems = {}, i, l, m;
        for (i = 0, l = content.length; i < l; i++) {
            if ((elem = content[i]).nodeType !== 1) {
                continue;
            }
            elems = elem.getElementsByTagName("*");
            for (m = elems.length - 1; m >= 0; m--) {
                processItemKey(elems[m]);
            }
            processItemKey(elem);
        }
        function processItemKey(el) {
            var pntKey, pntNode = el, pntItem, tmplItem, key;
            // Ensure that each rendered template inserted into the DOM has its own template item,
            if ((key = el.getAttribute(tmplItmAtt))) {
                while (pntNode.parentNode && (pntNode = pntNode.parentNode).nodeType === 1 && !(pntKey = pntNode.getAttribute(tmplItmAtt))) { }
                if (pntKey !== key) {
                    // The next ancestor with a _tmplitem expando is on a different key than this one.
                    // So this is a top-level element within this template item
                    // Set pntNode to the key of the parentNode, or to 0 if pntNode.parentNode is null, or pntNode is a fragment.
                    pntNode = pntNode.parentNode ? (pntNode.nodeType === 11 ? 0 : (pntNode.getAttribute(tmplItmAtt) || 0)) : 0;
                    if (!(tmplItem = newTmplItems[key])) {
                        // The item is for wrapped content, and was copied from the temporary parent wrappedItem.
                        tmplItem = wrappedItems[key];
                        tmplItem = newTmplItem(tmplItem, newTmplItems[pntNode] || wrappedItems[pntNode]);
                        tmplItem.key = ++itemKey;
                        newTmplItems[itemKey] = tmplItem;
                    }
                    if (cloneIndex) {
                        cloneTmplItem(key);
                    }
                }
                el.removeAttribute(tmplItmAtt);
            } else if (cloneIndex && (tmplItem = jQuery.data(el, "tmplItem"))) {
                // This was a rendered element, cloned during append or appendTo etc.
                // TmplItem stored in jQuery data has already been cloned in cloneCopyEvent. We must replace it with a fresh cloned tmplItem.
                cloneTmplItem(tmplItem.key);
                newTmplItems[tmplItem.key] = tmplItem;
                pntNode = jQuery.data(el.parentNode, "tmplItem");
                pntNode = pntNode ? pntNode.key : 0;
            }
            if (tmplItem) {
                pntItem = tmplItem;
                // Find the template item of the parent element.
                // (Using !=, not !==, since pntItem.key is number, and pntNode may be a string)
                // Modified Dave Stensgaard per : https://github.com/jquery/jquery-tmpl/issues/117
                // In reference to FB: http://lisa.hq.groundspeak.biz/FogBUGZ/default.asp?31617
                while (pntItem && pntItem.nodes && pntItem.key != pntNode) {
                    // Add this element as a top-level node for this rendered template item, as well as for any
                    // ancestor items between this item and the item of its parent element
                    pntItem.nodes.push(el);
                    pntItem = pntItem.parent;
                }
                // Delete content built during rendering - reduce API surface area and memory use, and avoid exposing of stale data after rendering...
                delete tmplItem._ctnt;
                delete tmplItem._wrap;
                // Store template item as jQuery data on the element
                jQuery.data(el, "tmplItem", tmplItem);
            }
            function cloneTmplItem(key) {
                key = key + keySuffix;
                tmplItem = newClonedItems[key] =
					(newClonedItems[key] || newTmplItem(tmplItem, newTmplItems[tmplItem.parent.key + keySuffix] || tmplItem.parent));
            }
        }
    }

    //---- Helper functions for template item ----

    function tiCalls(content, tmpl, data, options) {
        if (!content) {
            return stack.pop();
        }
        stack.push({ _: content, tmpl: tmpl, item: this, data: data, options: options });
    }

    function tiNest(tmpl, data, options) {
        // nested template, using {{tmpl}} tag
        return jQuery.tmpl(jQuery.template(tmpl), data, options, this);
    }

    function tiWrap(call, wrapped) {
        // nested template, using {{wrap}} tag
        var options = call.options || {};
        options.wrapped = wrapped;
        // Apply the template, which may incorporate wrapped content,
        return jQuery.tmpl(jQuery.template(call.tmpl), call.data, options, call.item);
    }

    function tiHtml(filter, textOnly) {
        var wrapped = this._wrap;
        return jQuery.map(
			jQuery(jQuery.isArray(wrapped) ? wrapped.join("") : wrapped).filter(filter || "*"),
			function (e) {
			    return textOnly ?
					e.innerText || e.textContent :
					e.outerHTML || outerHtml(e);
			});
    }

    function tiUpdate() {
        var coll = this.nodes;
        jQuery.tmpl(null, null, null, this).insertBefore(coll[0]);
        jQuery(coll).remove();
    }
})(jQuery);
(function ($) {

    $.fn.endlessScroll = function (options) {

        var defaults = {
            bottomPixels: 50,
            fireOnce: true,
            fireDelay: 150,
            loader: "<br />Loading...<br />",
            data: "",
            insertAfter: "div:last",
            resetCounter: function () { return false; },
            callback: function () { return true; },
            ceaseFire: function () { return false; }
        };

        var options = $.extend(defaults, options);
        var firing = true;
        var fired = false;
        var fireSequence = 0;
        var isDocWin = (this === document || window);

        if (options.ceaseFire.apply(this) === true) {
            firing = false;
        }

        if (firing === true) {
            $(this).scroll(function () {
                var is_scrollable = false;

                if (isDocWin) {
                    is_scrollable = $(document).height() - $(window).height() <= $(window).scrollTop() + options.bottomPixels;
                } else {
                    // calculates the actual height of the scrolling container
                    var inner_wrap = $(".endless_scroll_inner_wrap", this);
                    if (inner_wrap.length == 0) {
                        $(this).wrapInner("<div class=\"endless_scroll_inner_wrap\" />");
                    }
                    is_scrollable = inner_wrap.length > 0 && (inner_wrap.height() - $(this).height() <= $(this).scrollTop() + options.bottomPixels);
                }

                if ((options.ceaseFire.apply(this) === false) && is_scrollable && (options.fireOnce == false || (options.fireOnce == true && fired != true))) {
                    if (options.resetCounter.apply(this) === true) fireSequence = 0;

                    fired = true;
                    fireSequence++;

                    $(options.insertAfter).after("<div id=\"endless_scroll_loader\">" + options.loader + "</div>");

                    data = typeof options.data == 'function' ? options.data.apply(this) : options.data;
                    if (data !== false) {
                        $("div#endless_scroll_loader").remove();
                        $(options.insertAfter).after("<div id=\"endless_scroll_data\">" + data + "</div>");
                        $("div#endless_scroll_data").hide().fadeIn();
                        $("div#endless_scroll_data").removeAttr("id");

                        var args = new Array();
                        args[0] = fireSequence;
                        options.callback.apply(this, args);
                        if (options.fireDelay !== false || options.fireDelay !== 0) {
                            // slight delay for preventing event firing twice
                            $("body").after("<div id=\"endless_scroll_marker\"></div>");
                            $("div#endless_scroll_marker").fadeTo(options.fireDelay, 1, function () {
                                $(this).remove();
                                fired = false;
                            });
                        }
                        else {
                            fired = false;
                        }
                    }
                }
            });
        }
    };

})(jQuery);
(function(){if(!window.console){var a="log debug info warn error assert dir dirxml group groupEnd time timeEnd count trace profile profileEnd memoryProfile memoryProfileEnd".split(" ");window.console={};for(var b=0;b<a.length;++b)window.console[a[b]]=function(){}}})();var urlParams=urlParams||{};(function(){for(var a,b=window.location.search.substring(1),e=/([^&=]+)=?([^&]*)/g;a=e.exec(b);)urlParams[decodeURIComponent(a[1].replace(/\+/g," "))]=decodeURIComponent(a[2].replace(/\+/g," "))})();
function loadLibrary(a){var b=document.createElement("script");b.src="../js/"+a;b.type="text/javascript";b.setAttribute("async","true");document.documentElement.firstChild.appendChild(b)}function IsNumeric(a){var b,e=!0;if(0===a.length)return!1;for(i=0;i<a.length&&!0===e;i++)b=a.charAt(i),-1==="0123456789.-".indexOf(b)&&(e=!1);return e}
function addLoadEvent(a){if(window.jQuery)if(window.Prototype){var b=window.onload;window.onload="function"!=typeof window.onload?a:function(){b&&b();a()}}else document.observe("dom:loaded",a);else $(a)}
var Cookie={set:function(a,b,e){e?(d=new Date,d.setTime(d.getTime()+1E3*e),expiry="; expires="+d.toGMTString()):expiry="";document.cookie=a+"="+b+expiry+"; path=/"},get:function(a){nameEQ=a+"=";ca=document.cookie.split(";");for(a=0;a<ca.length;a++){for(c=ca[a];" "==c.charAt(0);)c=c.substring(1,c.length);if(0===c.indexOf(nameEQ))return c.substring(nameEQ.length,c.length)}return null},unset:function(a){Cookie.set(a,"",-1)}};

var rot13array;function createROT13array(){for(var a=0,b=[],a=0;26>a;a++)b["abcdefghijklmnopqrstuvwxyz".charAt(a)]="abcdefghijklmnopqrstuvwxyz".charAt((a+13)%26);for(a=0;26>a;a++)b["abcdefghijklmnopqrstuvwxyz".charAt(a).toUpperCase()]="abcdefghijklmnopqrstuvwxyz".charAt((a+13)%26).toUpperCase();return b}function convertROT13String(a){var b=0,d=a.length,e="";rot13array||(rot13array=createROT13array());for(b=0;b<d;b++)e+=convertROT13Char(a.charAt(b));return e}
function convertROT13Char(a){return"A"<=a&&"Z">=a||"a"<=a&&"z">=a?rot13array[a]:a}
function convertROTStringWithBrackets(a){var b="",d="",e=!0,c=0,g=a.length,f=!1;rot13array||(rot13array=createROT13array());for(c=0;c<g;c++)if(b=a.charAt(c),c<g-4&&"<br/>"==a.toLowerCase().substr(c,4))d+="<br>",c+=3;else if(c<g-3&&"<br>"==a.toLowerCase().substr(c,4))d+="<br>",c+=3;else{if("["==b&&!f)f=!0;else if("]"==b&&f)f=!1;else if("<"==b&&e)e=!1;else if(">"==b&&!e)e=!0;else if(" "!=b)if("&"==b){var h=/\&[^;]*\;/.exec(a.substr(c,a.length-c))[0];h&&(d+=h,c+=h.length-1,b="")}else e&&!f&&(b=convertROT13Char(b));
d+=b}return d};


/* *******************************************
// Copyright 2010-2012, Anthony Hand
//
// File version date: January 21, 2012
//		Update: 
//		- Moved Windows Phone 7 to the iPhone Tier. WP7.5's IE 9-based browser is good enough now.  
//		- Added a new variable for 2 versions of the new BlackBerry Bold Touch (9900 and 9930): deviceBBBoldTouch. 
//		- Updated DetectBlackBerryTouch() to support the 2 versions of the new BlackBerry Bold Touch (9900 and 9930). 
//		- Updated DetectKindle() to focus on eInk devices only. The Kindle Fire should be detected as a regular Android device.
//
// File version date: August 22, 2011
//		Update: 
//		- Updated DetectAndroidTablet() to fix a bug introduced in the last fix! The true/false returns were mixed up. 
//
// File version date: August 16, 2011
//		Update: 
//		- Updated DetectAndroidTablet() to exclude Opera Mini, which was falsely reporting as running on a tablet device when on a phone.
//		- Updated the user agent (uagent) init technique to handle spiders and such with null values.
//
// File version date: August 7, 2011
//		Update: 
//		- The Opera for Android browser doesn't follow Google's recommended useragent string guidelines, so some fixes were needed.
//		- Updated DetectAndroidPhone() and DetectAndroidTablet() to properly detect devices running Opera Mobile.
//		- Created 2 new methods: DetectOperaAndroidPhone() and DetectOperaAndroidTablet(). 
//		- Updated DetectTierIphone(). Removed the call to DetectMaemoTablet(), an obsolete mobile OS.
//
//
// LICENSE INFORMATION
// Licensed under the Apache License, Version 2.0 (the "License"); 
// you may not use this file except in compliance with the License. 
// You may obtain a copy of the License at 
//        http://www.apache.org/licenses/LICENSE-2.0 
// Unless required by applicable law or agreed to in writing, 
// software distributed under the License is distributed on an 
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, 
// either express or implied. See the License for the specific 
// language governing permissions and limitations under the License. 
//
//
// ABOUT THIS PROJECT
//   Project Owner: Anthony Hand
//   Email: anthony.hand@gmail.com
//   Web Site: http://www.mobileesp.com
//   Source Files: http://code.google.com/p/mobileesp/
//   
//   Versions of this code are available for:
//      PHP, JavaScript, Java, ASP.NET (C#), and Ruby
//
//
// WARNING: 
//   These JavaScript-based device detection features may ONLY work 
//   for the newest generation of smartphones, such as the iPhone, 
//   Android and Palm WebOS devices.
//   These device detection features may NOT work for older smartphones 
//   which had poor support for JavaScript, including 
//   older BlackBerry, PalmOS, and Windows Mobile devices. 
//   Additionally, because JavaScript support is extremely poor among 
//   'feature phones', these features may not work at all on such devices.
//   For better results, consider using a server-based version of this code, 
//   such as Java, APS.NET, PHP, or Ruby.
//
// *******************************************
*/

//Optional: Store values for quickly accessing same info multiple times.
//Note: These values are not set automatically.
//Stores whether the device is an iPhone or iPod Touch.
var isIphone = false;
//Stores whether the device is an Android phone or multi-media player.
var isAndroidPhone = false;
//Stores whether is the Tablet (HTML5-capable, larger screen) tier of devices.
var isTierTablet = false;
//Stores whether is the iPhone tier of devices.
var isTierIphone = false;
//Stores whether the device can probably support Rich CSS, but JavaScript support is not assumed. (e.g., newer BlackBerry, Windows Mobile)
var isTierRichCss = false;
//Stores whether it is another mobile device, which cannot be assumed to support CSS or JS (eg, older BlackBerry, RAZR)
var isTierGenericMobile = false;

//Initialize some initial string variables we'll look for later.
var engineWebKit = "webkit";
var deviceIphone = "iphone";
var deviceIpod = "ipod";
var deviceIpad = "ipad";
var deviceMacPpc = "macintosh"; //Used for disambiguation

var deviceAndroid = "android";
var deviceGoogleTV = "googletv";
var deviceXoom = "xoom"; //Motorola Xoom
var deviceHtcFlyer = "htc_flyer"; //HTC Flyer

var deviceNuvifone = "nuvifone"; //Garmin Nuvifone

var deviceSymbian = "symbian";
var deviceS60 = "series60";
var deviceS70 = "series70";
var deviceS80 = "series80";
var deviceS90 = "series90";

var deviceWinPhone7 = "windows phone os 7";
var deviceWinMob = "windows ce";
var deviceWindows = "windows";
var deviceIeMob = "iemobile";
var devicePpc = "ppc"; //Stands for PocketPC
var enginePie = "wm5 pie";  //An old Windows Mobile

var deviceBB = "blackberry";
var vndRIM = "vnd.rim"; //Detectable when BB devices emulate IE or Firefox
var deviceBBStorm = "blackberry95"; //Storm 1 and 2
var deviceBBBold = "blackberry97"; //Bold 97x0 (non-touch)
var deviceBBBoldTouch = "blackberry 99"; //Bold 99x0 (touchscreen)
var deviceBBTour = "blackberry96"; //Tour
var deviceBBCurve = "blackberry89"; //Curve 2
var deviceBBTorch = "blackberry 98"; //Torch
var deviceBBPlaybook = "playbook"; //PlayBook tablet

var devicePalm = "palm";
var deviceWebOS = "webos"; //For Palm's line of WebOS devices
var deviceWebOShp = "hpwos"; //For HP's line of WebOS devices

var engineBlazer = "blazer"; //Old Palm browser
var engineXiino = "xiino";

var deviceKindle = "kindle"; //Amazon Kindle, eInk one.

//Initialize variables for mobile-specific content.
var vndwap = "vnd.wap";
var wml = "wml";

//Initialize variables for random devices and mobile browsers.
//Some of these may not support JavaScript
var deviceTablet = "tablet"; //Generic term for slate and tablet devices
var deviceBrew = "brew";
var deviceDanger = "danger";
var deviceHiptop = "hiptop";
var devicePlaystation = "playstation";
var deviceNintendoDs = "nitro";
var deviceNintendo = "nintendo";
var deviceWii = "wii";
var deviceXbox = "xbox";
var deviceArchos = "archos";

var engineOpera = "opera"; //Popular browser
var engineNetfront = "netfront"; //Common embedded OS browser
var engineUpBrowser = "up.browser"; //common on some phones
var engineOpenWeb = "openweb"; //Transcoding by OpenWave server
var deviceMidp = "midp"; //a mobile Java technology
var uplink = "up.link";
var engineTelecaQ = 'teleca q'; //a modern feature phone browser

var devicePda = "pda";
var mini = "mini";  //Some mobile browsers put 'mini' in their names.
var mobile = "mobile"; //Some mobile browsers put 'mobile' in their user agent strings.
var mobi = "mobi"; //Some mobile browsers put 'mobi' in their user agent strings.

//Use Maemo, Tablet, and Linux to test for Nokia's Internet Tablets.
var maemo = "maemo";
var linux = "linux";
var qtembedded = "qt embedded"; //for Sony Mylo and others
var mylocom2 = "com2"; //for Sony Mylo also

//In some UserAgents, the only clue is the manufacturer.
var manuSonyEricsson = "sonyericsson";
var manuericsson = "ericsson";
var manuSamsung1 = "sec-sgh";
var manuSony = "sony";
var manuHtc = "htc"; //Popular Android and WinMo manufacturer

//In some UserAgents, the only clue is the operator.
var svcDocomo = "docomo";
var svcKddi = "kddi";
var svcVodafone = "vodafone";

//Disambiguation strings.
var disUpdate = "update"; //pda vs. update



//Initialize our user agent string.
var uagent = "";
if (navigator && navigator.userAgent)
    uagent = navigator.userAgent.toLowerCase();


//**************************
// Detects if the current device is an iPhone.
function DetectIphone() {
    if (uagent.search(deviceIphone) > -1) {
        //The iPad and iPod Touch say they're an iPhone! So let's disambiguate.
        if (DetectIpad() || DetectIpod())
            return false;
        //Yay! It's an iPhone!
        else
            return true;
    }
    else
        return false;
}

//**************************
// Detects if the current device is an iPod Touch.
function DetectIpod() {
    if (uagent.search(deviceIpod) > -1)
        return true;
    else
        return false;
}

//**************************
// Detects if the current device is an iPad tablet.
function DetectIpad() {
    if (uagent.search(deviceIpad) > -1 && DetectWebkit())
        return true;
    else
        return false;
}

//**************************
// Detects if the current device is an iPhone or iPod Touch.
function DetectIphoneOrIpod() {
    //We repeat the searches here because some iPods 
    //  may report themselves as an iPhone, which is ok.
    if (uagent.search(deviceIphone) > -1 ||
       uagent.search(deviceIpod) > -1)
        return true;
    else
        return false;
}

//**************************
// Detects *any* iOS device: iPhone, iPod Touch, iPad.
function DetectIos() {
    if (DetectIphoneOrIpod() || DetectIpad())
        return true;
    else
        return false;
}

//**************************
// Detects *any* Android OS-based device: phone, tablet, and multi-media player.
// Also detects Google TV.
function DetectAndroid() {
    if ((uagent.search(deviceAndroid) > -1) || DetectGoogleTV())
        return true;
    //Special check for the HTC Flyer 7" tablet. It should report here.
    if (uagent.search(deviceHtcFlyer) > -1)
        return true;
    else
        return false;
}

//**************************
// Detects if the current device is a (small-ish) Android OS-based device
// used for calling and/or multi-media (like a Samsung Galaxy Player).
// Google says these devices will have 'Android' AND 'mobile' in user agent.
// Ignores tablets (Honeycomb and later).
function DetectAndroidPhone() {
    if (DetectAndroid() && (uagent.search(mobile) > -1))
        return true;
    //Special check for Android phones with Opera Mobile. They should report here.
    if (DetectOperaAndroidPhone())
        return true;
    //Special check for the HTC Flyer 7" tablet. It should report here.
    if (uagent.search(deviceHtcFlyer) > -1)
        return true;
    else
        return false;
}

//**************************
// Detects if the current device is a (self-reported) Android tablet.
// Google says these devices will have 'Android' and NOT 'mobile' in their user agent.
function DetectAndroidTablet() {
    //First, let's make sure we're on an Android device.
    if (!DetectAndroid())
        return false;

    //Special check for Opera Android Phones. They should NOT report here.
    if (DetectOperaMobile())
        return false;
    //Special check for the HTC Flyer 7" tablet. It should NOT report here.
    if (uagent.search(deviceHtcFlyer) > -1)
        return false;

    //Otherwise, if it's Android and does NOT have 'mobile' in it, Google says it's a tablet.
    if (uagent.search(mobile) > -1)
        return false;
    else
        return true;
}


//**************************
// Detects if the current device is an Android OS-based device and
//   the browser is based on WebKit.
function DetectAndroidWebKit() {
    if (DetectAndroid() && DetectWebkit())
        return true;
    else
        return false;
}


//**************************
// Detects if the current device is a GoogleTV.
function DetectGoogleTV() {
    if (uagent.search(deviceGoogleTV) > -1)
        return true;
    else
        return false;
}


//**************************
// Detects if the current browser is based on WebKit.
function DetectWebkit() {
    if (uagent.search(engineWebKit) > -1)
        return true;
    else
        return false;
}

//**************************
// Detects if the current browser is the Nokia S60 Open Source Browser.
function DetectS60OssBrowser() {
    if (DetectWebkit()) {
        if ((uagent.search(deviceS60) > -1 ||
          uagent.search(deviceSymbian) > -1))
            return true;
        else
            return false;
    }
    else
        return false;
}

//**************************
// Detects if the current device is any Symbian OS-based device,
//   including older S60, Series 70, Series 80, Series 90, and UIQ, 
//   or other browsers running on these devices.
function DetectSymbianOS() {
    if (uagent.search(deviceSymbian) > -1 ||
       uagent.search(deviceS60) > -1 ||
       uagent.search(deviceS70) > -1 ||
       uagent.search(deviceS80) > -1 ||
       uagent.search(deviceS90) > -1)
        return true;
    else
        return false;
}

//**************************
// Detects if the current browser is a 
// Windows Phone 7 device.
function DetectWindowsPhone7() {
    if (uagent.search(deviceWinPhone7) > -1)
        return true;
    else
        return false;
}

//**************************
// Detects if the current browser is a Windows Mobile device.
// Excludes Windows Phone 7 devices. 
// Focuses on Windows Mobile 6.xx and earlier.
function DetectWindowsMobile() {
    //Exclude new Windows Phone 7.
    if (DetectWindowsPhone7())
        return false;
    //Most devices use 'Windows CE', but some report 'iemobile' 
    //  and some older ones report as 'PIE' for Pocket IE. 
    if (uagent.search(deviceWinMob) > -1 ||
       uagent.search(deviceIeMob) > -1 ||
       uagent.search(enginePie) > -1)
        return true;
    //Test for Windows Mobile PPC but not old Macintosh PowerPC.
    if ((uagent.search(devicePpc) > -1) &&
       !(uagent.search(deviceMacPpc) > -1))
        return true;
    //Test for Windwos Mobile-based HTC devices.
    if (uagent.search(manuHtc) > -1 &&
       uagent.search(deviceWindows) > -1)
        return true;
    else
        return false;
}

//**************************
// Detects if the current browser is a BlackBerry of some sort.
// Includes the PlayBook.
function DetectBlackBerry() {
    if (uagent.search(deviceBB) > -1)
        return true;
    if (uagent.search(vndRIM) > -1)
        return true;
    else
        return false;
}

//**************************
// Detects if the current browser is on a BlackBerry tablet device.
//    Example: PlayBook
function DetectBlackBerryTablet() {
    if (uagent.search(deviceBBPlaybook) > -1)
        return true;
    else
        return false;
}

//**************************
// Detects if the current browser is a BlackBerry device AND uses a
//    WebKit-based browser. These are signatures for the new BlackBerry OS 6.
//    Examples: Torch. Includes the Playbook.
function DetectBlackBerryWebKit() {
    if (DetectBlackBerry() &&
       uagent.search(engineWebKit) > -1)
        return true;
    else
        return false;
}

//**************************
// Detects if the current browser is a BlackBerry Touch
//    device, such as the Storm, Torch, and Bold Touch. Excludes the Playbook.
function DetectBlackBerryTouch() {
    if (DetectBlackBerry() &&
        ((uagent.search(deviceBBStorm) > -1) ||
        (uagent.search(deviceBBTorch) > -1) ||
        (uagent.search(deviceBBBoldTouch) > -1)))
        return true;
    else
        return false;
}

//**************************
// Detects if the current browser is a BlackBerry OS 5 device AND
//    has a more capable recent browser. Excludes the Playbook.
//    Examples, Storm, Bold, Tour, Curve2
//    Excludes the new BlackBerry OS 6 and 7 browser!!
function DetectBlackBerryHigh() {
    //Disambiguate for BlackBerry OS 6 or 7 (WebKit) browser
    if (DetectBlackBerryWebKit())
        return false;
    if (DetectBlackBerry()) {
        if (DetectBlackBerryTouch() ||
        uagent.search(deviceBBBold) > -1 ||
        uagent.search(deviceBBTour) > -1 ||
        uagent.search(deviceBBCurve) > -1)
            return true;
        else
            return false;
    }
    else
        return false;
}

//**************************
// Detects if the current browser is a BlackBerry device AND
//    has an older, less capable browser. 
//    Examples: Pearl, 8800, Curve1.
function DetectBlackBerryLow() {
    if (DetectBlackBerry()) {
        //Assume that if it's not in the High tier or has WebKit, then it's Low.
        if (DetectBlackBerryHigh() || DetectBlackBerryWebKit())
            return false;
        else
            return true;
    }
    else
        return false;
}


//**************************
// Detects if the current browser is on a PalmOS device.
function DetectPalmOS() {
    //Most devices nowadays report as 'Palm', 
    //  but some older ones reported as Blazer or Xiino.
    if (uagent.search(devicePalm) > -1 ||
       uagent.search(engineBlazer) > -1 ||
       uagent.search(engineXiino) > -1) {
        //Make sure it's not WebOS first
        if (DetectPalmWebOS())
            return false;
        else
            return true;
    }
    else
        return false;
}

//**************************
// Detects if the current browser is on a Palm device
//   running the new WebOS.
function DetectPalmWebOS() {
    if (uagent.search(deviceWebOS) > -1)
        return true;
    else
        return false;
}

//**************************
// Detects if the current browser is on an HP tablet running WebOS.
function DetectWebOSTablet() {
    if (uagent.search(deviceWebOShp) > -1 &&
       uagent.search(deviceTablet) > -1)
        return true;
    else
        return false;
}

//**************************
// Detects if the current browser is a
//   Garmin Nuvifone.
function DetectGarminNuvifone() {
    if (uagent.search(deviceNuvifone) > -1)
        return true;
    else
        return false;
}


//**************************
// Check to see whether the device is a 'smartphone'.
//   You might wish to send smartphones to a more capable web page
//   than a dumbed down WAP page. 
function DetectSmartphone() {
    if (DetectIphoneOrIpod()
      || DetectAndroidPhone()
      || DetectS60OssBrowser()
      || DetectSymbianOS()
      || DetectWindowsMobile()
      || DetectWindowsPhone7()
      || DetectBlackBerry()
      || DetectPalmWebOS()
      || DetectPalmOS()
      || DetectGarminNuvifone())
        return true;

    //Otherwise, return false.
    return false;
};

//**************************
// Detects if the current device is an Archos media player/Internet tablet.
function DetectArchos() {
    if (uagent.search(deviceArchos) > -1)
        return true;
    else
        return false;
}

//**************************
// Detects whether the device is a Brew-powered device.
function DetectBrewDevice() {
    if (uagent.search(deviceBrew) > -1)
        return true;
    else
        return false;
}

//**************************
// Detects the Danger Hiptop device.
function DetectDangerHiptop() {
    if (uagent.search(deviceDanger) > -1 ||
       uagent.search(deviceHiptop) > -1)
        return true;
    else
        return false;
}

//**************************
// Detects if the current device is on one of 
// the Maemo-based Nokia Internet Tablets.
function DetectMaemoTablet() {
    if (uagent.search(maemo) > -1)
        return true;
    //For Nokia N810, must be Linux + Tablet, or else it could be something else.
    if ((uagent.search(linux) > -1)
       && (uagent.search(deviceTablet) > -1)
       && !DetectWebOSTablet()
       && !DetectAndroid())
        return true;
    else
        return false;
}

//**************************
// Detects if the current browser is a Sony Mylo device.
function DetectSonyMylo() {
    if (uagent.search(manuSony) > -1) {
        if (uagent.search(qtembedded) > -1 ||
         uagent.search(mylocom2) > -1)
            return true;
        else
            return false;
    }
    else
        return false;
}

//**************************
// Detects if the current browser is Opera Mobile or Mini.
function DetectOperaMobile() {
    if (uagent.search(engineOpera) > -1) {
        if (uagent.search(mini) > -1 ||
         uagent.search(mobi) > -1)
            return true;
        else
            return false;
    }
    else
        return false;
}

//**************************
// Detects if the current browser is Opera Mobile 
// running on an Android phone.
function DetectOperaAndroidPhone() {
    if ((uagent.search(engineOpera) > -1) &&
      (uagent.search(deviceAndroid) > -1) &&
      (uagent.search(mobi) > -1))
        return true;
    else
        return false;
}

//**************************
// Detects if the current browser is Opera Mobile 
// running on an Android tablet.
function DetectOperaAndroidTablet() {
    if ((uagent.search(engineOpera) > -1) &&
      (uagent.search(deviceAndroid) > -1) &&
      (uagent.search(deviceTablet) > -1))
        return true;
    else
        return false;
}

//**************************
// Detects if the current device is a Sony Playstation.
function DetectSonyPlaystation() {
    if (uagent.search(devicePlaystation) > -1)
        return true;
    else
        return false;
};

//**************************
// Detects if the current device is a Nintendo game device.
function DetectNintendo() {
    if (uagent.search(deviceNintendo) > -1 ||
	uagent.search(deviceWii) > -1 ||
	uagent.search(deviceNintendoDs) > -1)
        return true;
    else
        return false;
};

//**************************
// Detects if the current device is a Microsoft Xbox.
function DetectXbox() {
    if (uagent.search(deviceXbox) > -1)
        return true;
    else
        return false;
};

//**************************
// Detects if the current device is an Internet-capable game console.
function DetectGameConsole() {
    if (DetectSonyPlaystation())
        return true;
    if (DetectNintendo())
        return true;
    if (DetectXbox())
        return true;
    else
        return false;
};

//**************************
// Detects if the current device is an Amazon Kindle (eInk devices only).
// Note: For the Kindle Fire, use the normal Android methods.
function DetectKindle() {
    if (uagent.search(deviceKindle) > -1 &&
       !DetectAndroid())
        return true;
    else
        return false;
}

//**************************
// Detects if the current device is a mobile device.
//  This method catches most of the popular modern devices.
//  Excludes Apple iPads and other modern tablets.
function DetectMobileQuick() {
    //Let's exclude tablets.
    if (DetectTierTablet())
        return false;

    //Most mobile browsing is done on smartphones
    if (DetectSmartphone())
        return true;

    if (uagent.search(deviceMidp) > -1 ||
	DetectBrewDevice())
        return true;

    if (DetectOperaMobile())
        return true;

    if (uagent.search(engineNetfront) > -1)
        return true;
    if (uagent.search(engineUpBrowser) > -1)
        return true;
    if (uagent.search(engineOpenWeb) > -1)
        return true;

    if (DetectDangerHiptop())
        return true;

    if (DetectMaemoTablet())
        return true;
    if (DetectArchos())
        return true;

    if ((uagent.search(devicePda) > -1) &&
        !(uagent.search(disUpdate) > -1))
        return true;
    if (uagent.search(mobile) > -1)
        return true;

    if (DetectKindle())
        return true;

    return false;
};


//**************************
// Detects in a more comprehensive way if the current device is a mobile device.
function DetectMobileLong() {
    if (DetectMobileQuick())
        return true;
    if (DetectGameConsole())
        return true;
    if (DetectSonyMylo())
        return true;

    //Detect for certain very old devices with stupid useragent strings.
    if (uagent.search(manuSamsung1) > -1 ||
	uagent.search(manuSonyEricsson) > -1 ||
	uagent.search(manuericsson) > -1)
        return true;

    if (uagent.search(svcDocomo) > -1)
        return true;
    if (uagent.search(svcKddi) > -1)
        return true;
    if (uagent.search(svcVodafone) > -1)
        return true;


    return false;
};


//*****************************
// For Mobile Web Site Design
//*****************************

//**************************
// The quick way to detect for a tier of devices.
//   This method detects for the new generation of
//   HTML 5 capable, larger screen tablets.
//   Includes iPad, Android (e.g., Xoom), BB Playbook, WebOS, etc.
function DetectTierTablet() {
    if (DetectIpad()
        || DetectAndroidTablet()
        || DetectBlackBerryTablet()
        || DetectWebOSTablet())
        return true;
    else
        return false;
};

//**************************
// The quick way to detect for a tier of devices.
//   This method detects for devices which can 
//   display iPhone-optimized web content.
//   Includes iPhone, iPod Touch, Android, Windows Phone 7, WebOS, etc.
function DetectTierIphone() {
    if (DetectIphoneOrIpod())
        return true;
    if (DetectAndroidPhone())
        return true;
    if (DetectBlackBerryWebKit() && DetectBlackBerryTouch())
        return true;
    if (DetectWindowsPhone7())
        return true;
    if (DetectPalmWebOS())
        return true;
    if (DetectGarminNuvifone())
        return true;
    else
        return false;
};

//**************************
// The quick way to detect for a tier of devices.
//   This method detects for devices which are likely to be 
//   capable of viewing CSS content optimized for the iPhone, 
//   but may not necessarily support JavaScript.
//   Excludes all iPhone Tier devices.
function DetectTierRichCss() {
    if (DetectMobileQuick()) {
        if (DetectTierIphone())
            return false;

        //The following devices are explicitly ok.
        if (DetectWebkit())
            return true;
        if (DetectS60OssBrowser())
            return true;

        //Note: 'High' BlackBerry devices ONLY
        if (DetectBlackBerryHigh())
            return true;

        //Older Windows 'Mobile' isn't good enough for iPhone Tier.
        if (DetectWindowsMobile())
            return true;

        if (uagent.search(engineTelecaQ) > -1)
            return true;

        else
            return false;
    }
    else
        return false;
};

//**************************
// The quick way to detect for a tier of devices.
//   This method detects for all other types of phones,
//   but excludes the iPhone and RichCSS Tier devices.
// NOTE: This method probably won't work due to poor
//  support for JavaScript among other devices. 
function DetectTierOtherPhones() {
    if (DetectMobileLong()) {
        //Exclude devices in the other 2 categories
        if (DetectTierIphone() || DetectTierRichCss())
            return false;

        //Otherwise, it's a YES
        else
            return true;
    }
    else
        return false;
};


//**************************
// Initialize Key Stored Values.
function InitDeviceScan() {
    //We'll use these 4 variables to speed other processing. They're super common.
    isIphone = DetectIphoneOrIpod();
    isAndroidPhone = DetectAndroidPhone();
    isTierIphone = DetectTierIphone();
    isTierTablet = DetectTierTablet();

    //Optional: Comment these out if you don't need them.
    isTierRichCss = DetectTierRichCss();
    isTierGenericMobile = DetectTierOtherPhones();
};

//Now, run the initialization method.
InitDeviceScan()