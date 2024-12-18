(()=>{var Ya={9737:()=>{+function(O){"use strict";var y=".dropdown-backdrop",o='[data-toggle="dropdown"]',f=function(l){O(l).on("click.bs.dropdown",this.toggle)};f.VERSION="3.4.1";function i(l){var s=l.attr("data-target");s||(s=l.attr("href"),s=s&&/#[A-Za-z]/.test(s)&&s.replace(/.*(?=#[^\s]*$)/,""));var c=s!=="#"?O(document).find(s):null;return c&&c.length?c:l.parent()}function n(l){l&&l.which===3||(O(y).remove(),O(o).each(function(){var s=O(this),c=i(s),m={relatedTarget:this};c.hasClass("open")&&(l&&l.type=="click"&&/input|textarea/i.test(l.target.tagName)&&O.contains(c[0],l.target)||(c.trigger(l=O.Event("hide.bs.dropdown",m)),!l.isDefaultPrevented()&&(s.attr("aria-expanded","false"),c.removeClass("open").trigger(O.Event("hidden.bs.dropdown",m)))))}))}f.prototype.toggle=function(l){var s=O(this);if(!s.is(".disabled, :disabled")){var c=i(s),m=c.hasClass("open");if(n(),!m){"ontouchstart"in document.documentElement&&!c.closest(".navbar-nav").length&&O(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(O(this)).on("click",n);var r={relatedTarget:this};if(c.trigger(l=O.Event("show.bs.dropdown",r)),l.isDefaultPrevented())return;s.trigger("focus").attr("aria-expanded","true"),c.toggleClass("open").trigger(O.Event("shown.bs.dropdown",r))}return!1}},f.prototype.keydown=function(l){if(!(!/(38|40|27|32)/.test(l.which)||/input|textarea/i.test(l.target.tagName))){var s=O(this);if(l.preventDefault(),l.stopPropagation(),!s.is(".disabled, :disabled")){var c=i(s),m=c.hasClass("open");if(!m&&l.which!=27||m&&l.which==27)return l.which==27&&c.find(o).trigger("focus"),s.trigger("click");var r=" li:not(.disabled):visible a",g=c.find(".dropdown-menu"+r);if(g.length){var d=g.index(l.target);l.which==38&&d>0&&d--,l.which==40&&d<g.length-1&&d++,~d||(d=0),g.eq(d).trigger("focus")}}}};function p(l){return this.each(function(){var s=O(this),c=s.data("bs.dropdown");c||s.data("bs.dropdown",c=new f(this)),typeof l=="string"&&c[l].call(s)})}var h=O.fn.dropdown;O.fn.dropdown=p,O.fn.dropdown.Constructor=f,O.fn.dropdown.noConflict=function(){return O.fn.dropdown=h,this},O(document).on("click.bs.dropdown.data-api",n).on("click.bs.dropdown.data-api",".dropdown form",function(l){l.stopPropagation()}).on("click.bs.dropdown.data-api",o,f.prototype.toggle).on("keydown.bs.dropdown.data-api",o,f.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",f.prototype.keydown)}(jQuery)},6927:()=>{+function(O){"use strict";var y=function(i,n){this.init("popover",i,n)};if(!O.fn.tooltip)throw new Error("Popover requires tooltip.js");y.VERSION="3.4.1",y.DEFAULTS=O.extend({},O.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),y.prototype=O.extend({},O.fn.tooltip.Constructor.prototype),y.prototype.constructor=y,y.prototype.getDefaults=function(){return y.DEFAULTS},y.prototype.setContent=function(){var i=this.tip(),n=this.getTitle(),p=this.getContent();if(this.options.html){var h=typeof p;this.options.sanitize&&(n=this.sanitizeHtml(n),h==="string"&&(p=this.sanitizeHtml(p))),i.find(".popover-title").html(n),i.find(".popover-content").children().detach().end()[h==="string"?"html":"append"](p)}else i.find(".popover-title").text(n),i.find(".popover-content").children().detach().end().text(p);i.removeClass("fade top bottom left right in"),i.find(".popover-title").html()||i.find(".popover-title").hide()},y.prototype.hasContent=function(){return this.getTitle()||this.getContent()},y.prototype.getContent=function(){var i=this.$element,n=this.options;return i.attr("data-content")||(typeof n.content=="function"?n.content.call(i[0]):n.content)},y.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};function o(i){return this.each(function(){var n=O(this),p=n.data("bs.popover"),h=typeof i=="object"&&i;!p&&/destroy|hide/.test(i)||(p||n.data("bs.popover",p=new y(this,h)),typeof i=="string"&&p[i]())})}var f=O.fn.popover;O.fn.popover=o,O.fn.popover.Constructor=y,O.fn.popover.noConflict=function(){return O.fn.popover=f,this}}(jQuery)},3497:()=>{+function(O){"use strict";function y(i,n){this.$body=O(document.body),this.$scrollElement=O(i).is(document.body)?O(window):O(i),this.options=O.extend({},y.DEFAULTS,n),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",O.proxy(this.process,this)),this.refresh(),this.process()}y.VERSION="3.4.1",y.DEFAULTS={offset:10},y.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},y.prototype.refresh=function(){var i=this,n="offset",p=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),O.isWindow(this.$scrollElement[0])||(n="position",p=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var h=O(this),l=h.data("target")||h.attr("href"),s=/^#./.test(l)&&O(l);return s&&s.length&&s.is(":visible")&&[[s[n]().top+p,l]]||null}).sort(function(h,l){return h[0]-l[0]}).each(function(){i.offsets.push(this[0]),i.targets.push(this[1])})},y.prototype.process=function(){var i=this.$scrollElement.scrollTop()+this.options.offset,n=this.getScrollHeight(),p=this.options.offset+n-this.$scrollElement.height(),h=this.offsets,l=this.targets,s=this.activeTarget,c;if(this.scrollHeight!=n&&this.refresh(),i>=p)return s!=(c=l[l.length-1])&&this.activate(c);if(s&&i<h[0])return this.activeTarget=null,this.clear();for(c=h.length;c--;)s!=l[c]&&i>=h[c]&&(h[c+1]===void 0||i<h[c+1])&&this.activate(l[c])},y.prototype.activate=function(i){this.activeTarget=i,this.clear();var n=this.selector+'[data-target="'+i+'"],'+this.selector+'[href="'+i+'"]',p=O(n).parents("li").addClass("active");p.parent(".dropdown-menu").length&&(p=p.closest("li.dropdown").addClass("active")),p.trigger("activate.bs.scrollspy")},y.prototype.clear=function(){O(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};function o(i){return this.each(function(){var n=O(this),p=n.data("bs.scrollspy"),h=typeof i=="object"&&i;p||n.data("bs.scrollspy",p=new y(this,h)),typeof i=="string"&&p[i]()})}var f=O.fn.scrollspy;O.fn.scrollspy=o,O.fn.scrollspy.Constructor=y,O.fn.scrollspy.noConflict=function(){return O.fn.scrollspy=f,this},O(window).on("load.bs.scrollspy.data-api",function(){O('[data-spy="scroll"]').each(function(){var i=O(this);o.call(i,i.data())})})}(jQuery)},7814:()=>{+function(O){"use strict";var y=function(n){this.element=O(n)};y.VERSION="3.4.1",y.TRANSITION_DURATION=150,y.prototype.show=function(){var n=this.element,p=n.closest("ul:not(.dropdown-menu)"),h=n.data("target");if(h||(h=n.attr("href"),h=h&&h.replace(/.*(?=#[^\s]*$)/,"")),!n.parent("li").hasClass("active")){var l=p.find(".active:last a"),s=O.Event("hide.bs.tab",{relatedTarget:n[0]}),c=O.Event("show.bs.tab",{relatedTarget:l[0]});if(l.trigger(s),n.trigger(c),!(c.isDefaultPrevented()||s.isDefaultPrevented())){var m=O(document).find(h);this.activate(n.closest("li"),p),this.activate(m,m.parent(),function(){l.trigger({type:"hidden.bs.tab",relatedTarget:n[0]}),n.trigger({type:"shown.bs.tab",relatedTarget:l[0]})})}}},y.prototype.activate=function(n,p,h){var l=p.find("> .active"),s=h&&O.support.transition&&(l.length&&l.hasClass("fade")||!!p.find("> .fade").length);function c(){l.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),n.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),s?(n[0].offsetWidth,n.addClass("in")):n.removeClass("fade"),n.parent(".dropdown-menu").length&&n.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),h&&h()}l.length&&s?l.one("bsTransitionEnd",c).emulateTransitionEnd(y.TRANSITION_DURATION):c(),l.removeClass("in")};function o(n){return this.each(function(){var p=O(this),h=p.data("bs.tab");h||p.data("bs.tab",h=new y(this)),typeof n=="string"&&h[n]()})}var f=O.fn.tab;O.fn.tab=o,O.fn.tab.Constructor=y,O.fn.tab.noConflict=function(){return O.fn.tab=f,this};var i=function(n){n.preventDefault(),o.call(O(this),"show")};O(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',i).on("click.bs.tab.data-api",'[data-toggle="pill"]',i)}(jQuery)},6278:()=>{+function(O){"use strict";var y=["sanitize","whiteList","sanitizeFn"],o=["background","cite","href","itemtype","longdesc","poster","src","xlink:href"],f=/^aria-[\w-]*$/i,i={"*":["class","dir","id","lang","role",f],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],div:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},n=/^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,p=/^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;function h(r,g){var d=r.nodeName.toLowerCase();if(O.inArray(d,g)!==-1)return O.inArray(d,o)!==-1?Boolean(r.nodeValue.match(n)||r.nodeValue.match(p)):!0;for(var u=O(g).filter(function(b,R){return R instanceof RegExp}),v=0,I=u.length;v<I;v++)if(d.match(u[v]))return!0;return!1}function l(r,g,d){if(r.length===0)return r;if(d&&typeof d=="function")return d(r);if(!document.implementation||!document.implementation.createHTMLDocument)return r;var u=document.implementation.createHTMLDocument("sanitization");u.body.innerHTML=r;for(var v=O.map(g,function(x,T){return T}),I=O(u.body).find("*"),b=0,R=I.length;b<R;b++){var A=I[b],E=A.nodeName.toLowerCase();if(O.inArray(E,v)===-1){A.parentNode.removeChild(A);continue}for(var _=O.map(A.attributes,function(x){return x}),C=[].concat(g["*"]||[],g[E]||[]),z=0,N=_.length;z<N;z++)h(_[z],C)||A.removeAttribute(_[z].nodeName)}return u.body.innerHTML}var s=function(r,g){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",r,g)};s.VERSION="3.4.1",s.TRANSITION_DURATION=150,s.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0},sanitize:!0,sanitizeFn:null,whiteList:i},s.prototype.init=function(r,g,d){if(this.enabled=!0,this.type=r,this.$element=O(g),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&O(document).find(O.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var u=this.options.trigger.split(" "),v=u.length;v--;){var I=u[v];if(I=="click")this.$element.on("click."+this.type,this.options.selector,O.proxy(this.toggle,this));else if(I!="manual"){var b=I=="hover"?"mouseenter":"focusin",R=I=="hover"?"mouseleave":"focusout";this.$element.on(b+"."+this.type,this.options.selector,O.proxy(this.enter,this)),this.$element.on(R+"."+this.type,this.options.selector,O.proxy(this.leave,this))}}this.options.selector?this._options=O.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},s.prototype.getDefaults=function(){return s.DEFAULTS},s.prototype.getOptions=function(r){var g=this.$element.data();for(var d in g)g.hasOwnProperty(d)&&O.inArray(d,y)!==-1&&delete g[d];return r=O.extend({},this.getDefaults(),g,r),r.delay&&typeof r.delay=="number"&&(r.delay={show:r.delay,hide:r.delay}),r.sanitize&&(r.template=l(r.template,r.whiteList,r.sanitizeFn)),r},s.prototype.getDelegateOptions=function(){var r={},g=this.getDefaults();return this._options&&O.each(this._options,function(d,u){g[d]!=u&&(r[d]=u)}),r},s.prototype.enter=function(r){var g=r instanceof this.constructor?r:O(r.currentTarget).data("bs."+this.type);if(g||(g=new this.constructor(r.currentTarget,this.getDelegateOptions()),O(r.currentTarget).data("bs."+this.type,g)),r instanceof O.Event&&(g.inState[r.type=="focusin"?"focus":"hover"]=!0),g.tip().hasClass("in")||g.hoverState=="in"){g.hoverState="in";return}if(clearTimeout(g.timeout),g.hoverState="in",!g.options.delay||!g.options.delay.show)return g.show();g.timeout=setTimeout(function(){g.hoverState=="in"&&g.show()},g.options.delay.show)},s.prototype.isInStateTrue=function(){for(var r in this.inState)if(this.inState[r])return!0;return!1},s.prototype.leave=function(r){var g=r instanceof this.constructor?r:O(r.currentTarget).data("bs."+this.type);if(g||(g=new this.constructor(r.currentTarget,this.getDelegateOptions()),O(r.currentTarget).data("bs."+this.type,g)),r instanceof O.Event&&(g.inState[r.type=="focusout"?"focus":"hover"]=!1),!g.isInStateTrue()){if(clearTimeout(g.timeout),g.hoverState="out",!g.options.delay||!g.options.delay.hide)return g.hide();g.timeout=setTimeout(function(){g.hoverState=="out"&&g.hide()},g.options.delay.hide)}},s.prototype.show=function(){var r=O.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(r);var g=O.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(r.isDefaultPrevented()||!g)return;var d=this,u=this.tip(),v=this.getUID(this.type);this.setContent(),u.attr("id",v),this.$element.attr("aria-describedby",v),this.options.animation&&u.addClass("fade");var I=typeof this.options.placement=="function"?this.options.placement.call(this,u[0],this.$element[0]):this.options.placement,b=/\s?auto?\s?/i,R=b.test(I);R&&(I=I.replace(b,"")||"top"),u.detach().css({top:0,left:0,display:"block"}).addClass(I).data("bs."+this.type,this),this.options.container?u.appendTo(O(document).find(this.options.container)):u.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var A=this.getPosition(),E=u[0].offsetWidth,_=u[0].offsetHeight;if(R){var C=I,z=this.getPosition(this.$viewport);I=I=="bottom"&&A.bottom+_>z.bottom?"top":I=="top"&&A.top-_<z.top?"bottom":I=="right"&&A.right+E>z.width?"left":I=="left"&&A.left-E<z.left?"right":I,u.removeClass(C).addClass(I)}var N=this.getCalculatedOffset(I,A,E,_);this.applyPlacement(N,I);var x=function(){var T=d.hoverState;d.$element.trigger("shown.bs."+d.type),d.hoverState=null,T=="out"&&d.leave(d)};O.support.transition&&this.$tip.hasClass("fade")?u.one("bsTransitionEnd",x).emulateTransitionEnd(s.TRANSITION_DURATION):x()}},s.prototype.applyPlacement=function(r,g){var d=this.tip(),u=d[0].offsetWidth,v=d[0].offsetHeight,I=parseInt(d.css("margin-top"),10),b=parseInt(d.css("margin-left"),10);isNaN(I)&&(I=0),isNaN(b)&&(b=0),r.top+=I,r.left+=b,O.offset.setOffset(d[0],O.extend({using:function(N){d.css({top:Math.round(N.top),left:Math.round(N.left)})}},r),0),d.addClass("in");var R=d[0].offsetWidth,A=d[0].offsetHeight;g=="top"&&A!=v&&(r.top=r.top+v-A);var E=this.getViewportAdjustedDelta(g,r,R,A);E.left?r.left+=E.left:r.top+=E.top;var _=/top|bottom/.test(g),C=_?E.left*2-u+R:E.top*2-v+A,z=_?"offsetWidth":"offsetHeight";d.offset(r),this.replaceArrow(C,d[0][z],_)},s.prototype.replaceArrow=function(r,g,d){this.arrow().css(d?"left":"top",50*(1-r/g)+"%").css(d?"top":"left","")},s.prototype.setContent=function(){var r=this.tip(),g=this.getTitle();this.options.html?(this.options.sanitize&&(g=l(g,this.options.whiteList,this.options.sanitizeFn)),r.find(".tooltip-inner").html(g)):r.find(".tooltip-inner").text(g),r.removeClass("fade in top bottom left right")},s.prototype.hide=function(r){var g=this,d=O(this.$tip),u=O.Event("hide.bs."+this.type);function v(){g.hoverState!="in"&&d.detach(),g.$element&&g.$element.removeAttr("aria-describedby").trigger("hidden.bs."+g.type),r&&r()}if(this.$element.trigger(u),!u.isDefaultPrevented())return d.removeClass("in"),O.support.transition&&d.hasClass("fade")?d.one("bsTransitionEnd",v).emulateTransitionEnd(s.TRANSITION_DURATION):v(),this.hoverState=null,this},s.prototype.fixTitle=function(){var r=this.$element;(r.attr("title")||typeof r.attr("data-original-title")!="string")&&r.attr("data-original-title",r.attr("title")||"").attr("title","")},s.prototype.hasContent=function(){return this.getTitle()},s.prototype.getPosition=function(r){r=r||this.$element;var g=r[0],d=g.tagName=="BODY",u=g.getBoundingClientRect();u.width==null&&(u=O.extend({},u,{width:u.right-u.left,height:u.bottom-u.top}));var v=window.SVGElement&&g instanceof window.SVGElement,I=d?{top:0,left:0}:v?null:r.offset(),b={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:r.scrollTop()},R=d?{width:O(window).width(),height:O(window).height()}:null;return O.extend({},u,b,R,I)},s.prototype.getCalculatedOffset=function(r,g,d,u){return r=="bottom"?{top:g.top+g.height,left:g.left+g.width/2-d/2}:r=="top"?{top:g.top-u,left:g.left+g.width/2-d/2}:r=="left"?{top:g.top+g.height/2-u/2,left:g.left-d}:{top:g.top+g.height/2-u/2,left:g.left+g.width}},s.prototype.getViewportAdjustedDelta=function(r,g,d,u){var v={top:0,left:0};if(!this.$viewport)return v;var I=this.options.viewport&&this.options.viewport.padding||0,b=this.getPosition(this.$viewport);if(/right|left/.test(r)){var R=g.top-I-b.scroll,A=g.top+I-b.scroll+u;R<b.top?v.top=b.top-R:A>b.top+b.height&&(v.top=b.top+b.height-A)}else{var E=g.left-I,_=g.left+I+d;E<b.left?v.left=b.left-E:_>b.right&&(v.left=b.left+b.width-_)}return v},s.prototype.getTitle=function(){var r,g=this.$element,d=this.options;return r=g.attr("data-original-title")||(typeof d.title=="function"?d.title.call(g[0]):d.title),r},s.prototype.getUID=function(r){do r+=~~(Math.random()*1e6);while(document.getElementById(r));return r},s.prototype.tip=function(){if(!this.$tip&&(this.$tip=O(this.options.template),this.$tip.length!=1))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},s.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},s.prototype.enable=function(){this.enabled=!0},s.prototype.disable=function(){this.enabled=!1},s.prototype.toggleEnabled=function(){this.enabled=!this.enabled},s.prototype.toggle=function(r){var g=this;r&&(g=O(r.currentTarget).data("bs."+this.type),g||(g=new this.constructor(r.currentTarget,this.getDelegateOptions()),O(r.currentTarget).data("bs."+this.type,g))),r?(g.inState.click=!g.inState.click,g.isInStateTrue()?g.enter(g):g.leave(g)):g.tip().hasClass("in")?g.leave(g):g.enter(g)},s.prototype.destroy=function(){var r=this;clearTimeout(this.timeout),this.hide(function(){r.$element.off("."+r.type).removeData("bs."+r.type),r.$tip&&r.$tip.detach(),r.$tip=null,r.$arrow=null,r.$viewport=null,r.$element=null})},s.prototype.sanitizeHtml=function(r){return l(r,this.options.whiteList,this.options.sanitizeFn)};function c(r){return this.each(function(){var g=O(this),d=g.data("bs.tooltip"),u=typeof r=="object"&&r;!d&&/destroy|hide/.test(r)||(d||g.data("bs.tooltip",d=new s(this,u)),typeof r=="string"&&d[r]())})}var m=O.fn.tooltip;O.fn.tooltip=c,O.fn.tooltip.Constructor=s,O.fn.tooltip.noConflict=function(){return O.fn.tooltip=m,this}}(jQuery)},2027:O=>{var y=function(){this.Diff_Timeout=1,this.Diff_EditCost=4,this.Match_Threshold=.5,this.Match_Distance=1e3,this.Patch_DeleteThreshold=.5,this.Patch_Margin=4,this.Match_MaxBits=32},o=-1,f=1,i=0;y.Diff=function(n,p){return[n,p]},y.prototype.diff_main=function(n,p,h,l){typeof l=="undefined"&&(this.Diff_Timeout<=0?l=Number.MAX_VALUE:l=new Date().getTime()+this.Diff_Timeout*1e3);var s=l;if(n==null||p==null)throw new Error("Null input. (diff_main)");if(n==p)return n?[new y.Diff(i,n)]:[];typeof h=="undefined"&&(h=!0);var c=h,m=this.diff_commonPrefix(n,p),r=n.substring(0,m);n=n.substring(m),p=p.substring(m),m=this.diff_commonSuffix(n,p);var g=n.substring(n.length-m);n=n.substring(0,n.length-m),p=p.substring(0,p.length-m);var d=this.diff_compute_(n,p,c,s);return r&&d.unshift(new y.Diff(i,r)),g&&d.push(new y.Diff(i,g)),this.diff_cleanupMerge(d),d},y.prototype.diff_compute_=function(n,p,h,l){var s;if(!n)return[new y.Diff(f,p)];if(!p)return[new y.Diff(o,n)];var c=n.length>p.length?n:p,m=n.length>p.length?p:n,r=c.indexOf(m);if(r!=-1)return s=[new y.Diff(f,c.substring(0,r)),new y.Diff(i,m),new y.Diff(f,c.substring(r+m.length))],n.length>p.length&&(s[0][0]=s[2][0]=o),s;if(m.length==1)return[new y.Diff(o,n),new y.Diff(f,p)];var g=this.diff_halfMatch_(n,p);if(g){var d=g[0],u=g[1],v=g[2],I=g[3],b=g[4],R=this.diff_main(d,v,h,l),A=this.diff_main(u,I,h,l);return R.concat([new y.Diff(i,b)],A)}return h&&n.length>100&&p.length>100?this.diff_lineMode_(n,p,l):this.diff_bisect_(n,p,l)},y.prototype.diff_lineMode_=function(n,p,h){var l=this.diff_linesToChars_(n,p);n=l.chars1,p=l.chars2;var s=l.lineArray,c=this.diff_main(n,p,!1,h);this.diff_charsToLines_(c,s),this.diff_cleanupSemantic(c),c.push(new y.Diff(i,""));for(var m=0,r=0,g=0,d="",u="";m<c.length;){switch(c[m][0]){case f:g++,u+=c[m][1];break;case o:r++,d+=c[m][1];break;case i:if(r>=1&&g>=1){c.splice(m-r-g,r+g),m=m-r-g;for(var v=this.diff_main(d,u,!1,h),I=v.length-1;I>=0;I--)c.splice(m,0,v[I]);m=m+v.length}g=0,r=0,d="",u="";break}m++}return c.pop(),c},y.prototype.diff_bisect_=function(n,p,h){for(var l=n.length,s=p.length,c=Math.ceil((l+s)/2),m=c,r=2*c,g=new Array(r),d=new Array(r),u=0;u<r;u++)g[u]=-1,d[u]=-1;g[m+1]=0,d[m+1]=0;for(var v=l-s,I=v%2!=0,b=0,R=0,A=0,E=0,_=0;_<c&&!(new Date().getTime()>h);_++){for(var C=-_+b;C<=_-R;C+=2){var z=m+C,N;C==-_||C!=_&&g[z-1]<g[z+1]?N=g[z+1]:N=g[z-1]+1;for(var x=N-C;N<l&&x<s&&n.charAt(N)==p.charAt(x);)N++,x++;if(g[z]=N,N>l)R+=2;else if(x>s)b+=2;else if(I){var T=m+v-C;if(T>=0&&T<r&&d[T]!=-1){var P=l-d[T];if(N>=P)return this.diff_bisectSplit_(n,p,N,x,h)}}}for(var J=-_+A;J<=_-E;J+=2){var T=m+J,P;J==-_||J!=_&&d[T-1]<d[T+1]?P=d[T+1]:P=d[T-1]+1;for(var F=P-J;P<l&&F<s&&n.charAt(l-P-1)==p.charAt(s-F-1);)P++,F++;if(d[T]=P,P>l)E+=2;else if(F>s)A+=2;else if(!I){var z=m+v-J;if(z>=0&&z<r&&g[z]!=-1){var N=g[z],x=m+N-z;if(P=l-P,N>=P)return this.diff_bisectSplit_(n,p,N,x,h)}}}}return[new y.Diff(o,n),new y.Diff(f,p)]},y.prototype.diff_bisectSplit_=function(n,p,h,l,s){var c=n.substring(0,h),m=p.substring(0,l),r=n.substring(h),g=p.substring(l),d=this.diff_main(c,m,!1,s),u=this.diff_main(r,g,!1,s);return d.concat(u)},y.prototype.diff_linesToChars_=function(n,p){var h=[],l={};h[0]="";function s(g){for(var d="",u=0,v=-1,I=h.length;v<g.length-1;){v=g.indexOf(`
`,u),v==-1&&(v=g.length-1);var b=g.substring(u,v+1);(l.hasOwnProperty?l.hasOwnProperty(b):l[b]!==void 0)?d+=String.fromCharCode(l[b]):(I==c&&(b=g.substring(u),v=g.length),d+=String.fromCharCode(I),l[b]=I,h[I++]=b),u=v+1}return d}var c=4e4,m=s(n);c=65535;var r=s(p);return{chars1:m,chars2:r,lineArray:h}},y.prototype.diff_charsToLines_=function(n,p){for(var h=0;h<n.length;h++){for(var l=n[h][1],s=[],c=0;c<l.length;c++)s[c]=p[l.charCodeAt(c)];n[h][1]=s.join("")}},y.prototype.diff_commonPrefix=function(n,p){if(!n||!p||n.charAt(0)!=p.charAt(0))return 0;for(var h=0,l=Math.min(n.length,p.length),s=l,c=0;h<s;)n.substring(c,s)==p.substring(c,s)?(h=s,c=h):l=s,s=Math.floor((l-h)/2+h);return s},y.prototype.diff_commonSuffix=function(n,p){if(!n||!p||n.charAt(n.length-1)!=p.charAt(p.length-1))return 0;for(var h=0,l=Math.min(n.length,p.length),s=l,c=0;h<s;)n.substring(n.length-s,n.length-c)==p.substring(p.length-s,p.length-c)?(h=s,c=h):l=s,s=Math.floor((l-h)/2+h);return s},y.prototype.diff_commonOverlap_=function(n,p){var h=n.length,l=p.length;if(h==0||l==0)return 0;h>l?n=n.substring(h-l):h<l&&(p=p.substring(0,h));var s=Math.min(h,l);if(n==p)return s;for(var c=0,m=1;;){var r=n.substring(s-m),g=p.indexOf(r);if(g==-1)return c;m+=g,(g==0||n.substring(s-m)==p.substring(0,m))&&(c=m,m++)}},y.prototype.diff_halfMatch_=function(n,p){if(this.Diff_Timeout<=0)return null;var h=n.length>p.length?n:p,l=n.length>p.length?p:n;if(h.length<4||l.length*2<h.length)return null;var s=this;function c(R,A,E){for(var _=R.substring(E,E+Math.floor(R.length/4)),C=-1,z="",N,x,T,P;(C=A.indexOf(_,C+1))!=-1;){var J=s.diff_commonPrefix(R.substring(E),A.substring(C)),F=s.diff_commonSuffix(R.substring(0,E),A.substring(0,C));z.length<F+J&&(z=A.substring(C-F,C)+A.substring(C,C+J),N=R.substring(0,E-F),x=R.substring(E+J),T=A.substring(0,C-F),P=A.substring(C+J))}return z.length*2>=R.length?[N,x,T,P,z]:null}var m=c(h,l,Math.ceil(h.length/4)),r=c(h,l,Math.ceil(h.length/2)),g;if(!m&&!r)return null;r?m?g=m[4].length>r[4].length?m:r:g=r:g=m;var d,u,v,I;n.length>p.length?(d=g[0],u=g[1],v=g[2],I=g[3]):(v=g[0],I=g[1],d=g[2],u=g[3]);var b=g[4];return[d,u,v,I,b]},y.prototype.diff_cleanupSemantic=function(n){for(var p=!1,h=[],l=0,s=null,c=0,m=0,r=0,g=0,d=0;c<n.length;)n[c][0]==i?(h[l++]=c,m=g,r=d,g=0,d=0,s=n[c][1]):(n[c][0]==f?g+=n[c][1].length:d+=n[c][1].length,s&&s.length<=Math.max(m,r)&&s.length<=Math.max(g,d)&&(n.splice(h[l-1],0,new y.Diff(o,s)),n[h[l-1]+1][0]=f,l--,l--,c=l>0?h[l-1]:-1,m=0,r=0,g=0,d=0,s=null,p=!0)),c++;for(p&&this.diff_cleanupMerge(n),this.diff_cleanupSemanticLossless(n),c=1;c<n.length;){if(n[c-1][0]==o&&n[c][0]==f){var u=n[c-1][1],v=n[c][1],I=this.diff_commonOverlap_(u,v),b=this.diff_commonOverlap_(v,u);I>=b?(I>=u.length/2||I>=v.length/2)&&(n.splice(c,0,new y.Diff(i,v.substring(0,I))),n[c-1][1]=u.substring(0,u.length-I),n[c+1][1]=v.substring(I),c++):(b>=u.length/2||b>=v.length/2)&&(n.splice(c,0,new y.Diff(i,u.substring(0,b))),n[c-1][0]=f,n[c-1][1]=v.substring(0,v.length-b),n[c+1][0]=o,n[c+1][1]=u.substring(b),c++),c++}c++}},y.prototype.diff_cleanupSemanticLossless=function(n){function p(b,R){if(!b||!R)return 6;var A=b.charAt(b.length-1),E=R.charAt(0),_=A.match(y.nonAlphaNumericRegex_),C=E.match(y.nonAlphaNumericRegex_),z=_&&A.match(y.whitespaceRegex_),N=C&&E.match(y.whitespaceRegex_),x=z&&A.match(y.linebreakRegex_),T=N&&E.match(y.linebreakRegex_),P=x&&b.match(y.blanklineEndRegex_),J=T&&R.match(y.blanklineStartRegex_);return P||J?5:x||T?4:_&&!z&&N?3:z||N?2:_||C?1:0}for(var h=1;h<n.length-1;){if(n[h-1][0]==i&&n[h+1][0]==i){var l=n[h-1][1],s=n[h][1],c=n[h+1][1],m=this.diff_commonSuffix(l,s);if(m){var r=s.substring(s.length-m);l=l.substring(0,l.length-m),s=r+s.substring(0,s.length-m),c=r+c}for(var g=l,d=s,u=c,v=p(l,s)+p(s,c);s.charAt(0)===c.charAt(0);){l+=s.charAt(0),s=s.substring(1)+c.charAt(0),c=c.substring(1);var I=p(l,s)+p(s,c);I>=v&&(v=I,g=l,d=s,u=c)}n[h-1][1]!=g&&(g?n[h-1][1]=g:(n.splice(h-1,1),h--),n[h][1]=d,u?n[h+1][1]=u:(n.splice(h+1,1),h--))}h++}},y.nonAlphaNumericRegex_=/[^a-zA-Z0-9]/,y.whitespaceRegex_=/\s/,y.linebreakRegex_=/[\r\n]/,y.blanklineEndRegex_=/\n\r?\n$/,y.blanklineStartRegex_=/^\r?\n\r?\n/,y.prototype.diff_cleanupEfficiency=function(n){for(var p=!1,h=[],l=0,s=null,c=0,m=!1,r=!1,g=!1,d=!1;c<n.length;)n[c][0]==i?(n[c][1].length<this.Diff_EditCost&&(g||d)?(h[l++]=c,m=g,r=d,s=n[c][1]):(l=0,s=null),g=d=!1):(n[c][0]==o?d=!0:g=!0,s&&(m&&r&&g&&d||s.length<this.Diff_EditCost/2&&m+r+g+d==3)&&(n.splice(h[l-1],0,new y.Diff(o,s)),n[h[l-1]+1][0]=f,l--,s=null,m&&r?(g=d=!0,l=0):(l--,c=l>0?h[l-1]:-1,g=d=!1),p=!0)),c++;p&&this.diff_cleanupMerge(n)},y.prototype.diff_cleanupMerge=function(n){n.push(new y.Diff(i,""));for(var p=0,h=0,l=0,s="",c="",m;p<n.length;)switch(n[p][0]){case f:l++,c+=n[p][1],p++;break;case o:h++,s+=n[p][1],p++;break;case i:h+l>1?(h!==0&&l!==0&&(m=this.diff_commonPrefix(c,s),m!==0&&(p-h-l>0&&n[p-h-l-1][0]==i?n[p-h-l-1][1]+=c.substring(0,m):(n.splice(0,0,new y.Diff(i,c.substring(0,m))),p++),c=c.substring(m),s=s.substring(m)),m=this.diff_commonSuffix(c,s),m!==0&&(n[p][1]=c.substring(c.length-m)+n[p][1],c=c.substring(0,c.length-m),s=s.substring(0,s.length-m))),p-=h+l,n.splice(p,h+l),s.length&&(n.splice(p,0,new y.Diff(o,s)),p++),c.length&&(n.splice(p,0,new y.Diff(f,c)),p++),p++):p!==0&&n[p-1][0]==i?(n[p-1][1]+=n[p][1],n.splice(p,1)):p++,l=0,h=0,s="",c="";break}n[n.length-1][1]===""&&n.pop();var r=!1;for(p=1;p<n.length-1;)n[p-1][0]==i&&n[p+1][0]==i&&(n[p][1].substring(n[p][1].length-n[p-1][1].length)==n[p-1][1]?(n[p][1]=n[p-1][1]+n[p][1].substring(0,n[p][1].length-n[p-1][1].length),n[p+1][1]=n[p-1][1]+n[p+1][1],n.splice(p-1,1),r=!0):n[p][1].substring(0,n[p+1][1].length)==n[p+1][1]&&(n[p-1][1]+=n[p+1][1],n[p][1]=n[p][1].substring(n[p+1][1].length)+n[p+1][1],n.splice(p+1,1),r=!0)),p++;r&&this.diff_cleanupMerge(n)},y.prototype.diff_xIndex=function(n,p){var h=0,l=0,s=0,c=0,m;for(m=0;m<n.length&&(n[m][0]!==f&&(h+=n[m][1].length),n[m][0]!==o&&(l+=n[m][1].length),!(h>p));m++)s=h,c=l;return n.length!=m&&n[m][0]===o?c:c+(p-s)},y.prototype.diff_prettyHtml=function(n){for(var p=[],h=/&/g,l=/</g,s=/>/g,c=/\n/g,m=0;m<n.length;m++){var r=n[m][0],g=n[m][1],d=g.replace(h,"&amp;").replace(l,"&lt;").replace(s,"&gt;").replace(c,"&para;<br>");switch(r){case f:p[m]='<ins style="background:#e6ffe6;">'+d+"</ins>";break;case o:p[m]='<del style="background:#ffe6e6;">'+d+"</del>";break;case i:p[m]="<span>"+d+"</span>";break}}return p.join("")},y.prototype.diff_text1=function(n){for(var p=[],h=0;h<n.length;h++)n[h][0]!==f&&(p[h]=n[h][1]);return p.join("")},y.prototype.diff_text2=function(n){for(var p=[],h=0;h<n.length;h++)n[h][0]!==o&&(p[h]=n[h][1]);return p.join("")},y.prototype.diff_levenshtein=function(n){for(var p=0,h=0,l=0,s=0;s<n.length;s++){var c=n[s][0],m=n[s][1];switch(c){case f:h+=m.length;break;case o:l+=m.length;break;case i:p+=Math.max(h,l),h=0,l=0;break}}return p+=Math.max(h,l),p},y.prototype.diff_toDelta=function(n){for(var p=[],h=0;h<n.length;h++)switch(n[h][0]){case f:p[h]="+"+encodeURI(n[h][1]);break;case o:p[h]="-"+n[h][1].length;break;case i:p[h]="="+n[h][1].length;break}return p.join("	").replace(/%20/g," ")},y.prototype.diff_fromDelta=function(n,p){for(var h=[],l=0,s=0,c=p.split(/\t/g),m=0;m<c.length;m++){var r=c[m].substring(1);switch(c[m].charAt(0)){case"+":try{h[l++]=new y.Diff(f,decodeURI(r))}catch(u){throw new Error("Illegal escape in diff_fromDelta: "+r)}break;case"-":case"=":var g=parseInt(r,10);if(isNaN(g)||g<0)throw new Error("Invalid number in diff_fromDelta: "+r);var d=n.substring(s,s+=g);c[m].charAt(0)=="="?h[l++]=new y.Diff(i,d):h[l++]=new y.Diff(o,d);break;default:if(c[m])throw new Error("Invalid diff operation in diff_fromDelta: "+c[m])}}if(s!=n.length)throw new Error("Delta length ("+s+") does not equal source text length ("+n.length+").");return h},y.prototype.match_main=function(n,p,h){if(n==null||p==null||h==null)throw new Error("Null input. (match_main)");return h=Math.max(0,Math.min(h,n.length)),n==p?0:n.length?n.substring(h,h+p.length)==p?h:this.match_bitap_(n,p,h):-1},y.prototype.match_bitap_=function(n,p,h){if(p.length>this.Match_MaxBits)throw new Error("Pattern too long for this browser.");var l=this.match_alphabet_(p),s=this;function c(N,x){var T=N/p.length,P=Math.abs(h-x);return s.Match_Distance?T+P/s.Match_Distance:P?1:T}var m=this.Match_Threshold,r=n.indexOf(p,h);r!=-1&&(m=Math.min(c(0,r),m),r=n.lastIndexOf(p,h+p.length),r!=-1&&(m=Math.min(c(0,r),m)));var g=1<<p.length-1;r=-1;for(var d,u,v=p.length+n.length,I,b=0;b<p.length;b++){for(d=0,u=v;d<u;)c(b,h+u)<=m?d=u:v=u,u=Math.floor((v-d)/2+d);v=u;var R=Math.max(1,h-u+1),A=Math.min(h+u,n.length)+p.length,E=Array(A+2);E[A+1]=(1<<b)-1;for(var _=A;_>=R;_--){var C=l[n.charAt(_-1)];if(b===0?E[_]=(E[_+1]<<1|1)&C:E[_]=(E[_+1]<<1|1)&C|((I[_+1]|I[_])<<1|1)|I[_+1],E[_]&g){var z=c(b,_-1);if(z<=m)if(m=z,r=_-1,r>h)R=Math.max(1,2*h-r);else break}}if(c(b+1,h)>m)break;I=E}return r},y.prototype.match_alphabet_=function(n){for(var p={},h=0;h<n.length;h++)p[n.charAt(h)]=0;for(var h=0;h<n.length;h++)p[n.charAt(h)]|=1<<n.length-h-1;return p},y.prototype.patch_addContext_=function(n,p){if(p.length!=0){if(n.start2===null)throw Error("patch not initialized");for(var h=p.substring(n.start2,n.start2+n.length1),l=0;p.indexOf(h)!=p.lastIndexOf(h)&&h.length<this.Match_MaxBits-this.Patch_Margin-this.Patch_Margin;)l+=this.Patch_Margin,h=p.substring(n.start2-l,n.start2+n.length1+l);l+=this.Patch_Margin;var s=p.substring(n.start2-l,n.start2);s&&n.diffs.unshift(new y.Diff(i,s));var c=p.substring(n.start2+n.length1,n.start2+n.length1+l);c&&n.diffs.push(new y.Diff(i,c)),n.start1-=s.length,n.start2-=s.length,n.length1+=s.length+c.length,n.length2+=s.length+c.length}},y.prototype.patch_make=function(n,p,h){var l,s;if(typeof n=="string"&&typeof p=="string"&&typeof h=="undefined")l=n,s=this.diff_main(l,p,!0),s.length>2&&(this.diff_cleanupSemantic(s),this.diff_cleanupEfficiency(s));else if(n&&typeof n=="object"&&typeof p=="undefined"&&typeof h=="undefined")s=n,l=this.diff_text1(s);else if(typeof n=="string"&&p&&typeof p=="object"&&typeof h=="undefined")l=n,s=p;else if(typeof n=="string"&&typeof p=="string"&&h&&typeof h=="object")l=n,s=h;else throw new Error("Unknown call format to patch_make.");if(s.length===0)return[];for(var c=[],m=new y.patch_obj,r=0,g=0,d=0,u=l,v=l,I=0;I<s.length;I++){var b=s[I][0],R=s[I][1];switch(!r&&b!==i&&(m.start1=g,m.start2=d),b){case f:m.diffs[r++]=s[I],m.length2+=R.length,v=v.substring(0,d)+R+v.substring(d);break;case o:m.length1+=R.length,m.diffs[r++]=s[I],v=v.substring(0,d)+v.substring(d+R.length);break;case i:R.length<=2*this.Patch_Margin&&r&&s.length!=I+1?(m.diffs[r++]=s[I],m.length1+=R.length,m.length2+=R.length):R.length>=2*this.Patch_Margin&&r&&(this.patch_addContext_(m,u),c.push(m),m=new y.patch_obj,r=0,u=v,g=d);break}b!==f&&(g+=R.length),b!==o&&(d+=R.length)}return r&&(this.patch_addContext_(m,u),c.push(m)),c},y.prototype.patch_deepCopy=function(n){for(var p=[],h=0;h<n.length;h++){var l=n[h],s=new y.patch_obj;s.diffs=[];for(var c=0;c<l.diffs.length;c++)s.diffs[c]=new y.Diff(l.diffs[c][0],l.diffs[c][1]);s.start1=l.start1,s.start2=l.start2,s.length1=l.length1,s.length2=l.length2,p[h]=s}return p},y.prototype.patch_apply=function(n,p){if(n.length==0)return[p,[]];n=this.patch_deepCopy(n);var h=this.patch_addPadding(n);p=h+p+h,this.patch_splitMax(n);for(var l=0,s=[],c=0;c<n.length;c++){var m=n[c].start2+l,r=this.diff_text1(n[c].diffs),g,d=-1;if(r.length>this.Match_MaxBits?(g=this.match_main(p,r.substring(0,this.Match_MaxBits),m),g!=-1&&(d=this.match_main(p,r.substring(r.length-this.Match_MaxBits),m+r.length-this.Match_MaxBits),(d==-1||g>=d)&&(g=-1))):g=this.match_main(p,r,m),g==-1)s[c]=!1,l-=n[c].length2-n[c].length1;else{s[c]=!0,l=g-m;var u;if(d==-1?u=p.substring(g,g+r.length):u=p.substring(g,d+this.Match_MaxBits),r==u)p=p.substring(0,g)+this.diff_text2(n[c].diffs)+p.substring(g+r.length);else{var v=this.diff_main(r,u,!1);if(r.length>this.Match_MaxBits&&this.diff_levenshtein(v)/r.length>this.Patch_DeleteThreshold)s[c]=!1;else{this.diff_cleanupSemanticLossless(v);for(var I=0,b,R=0;R<n[c].diffs.length;R++){var A=n[c].diffs[R];A[0]!==i&&(b=this.diff_xIndex(v,I)),A[0]===f?p=p.substring(0,g+b)+A[1]+p.substring(g+b):A[0]===o&&(p=p.substring(0,g+b)+p.substring(g+this.diff_xIndex(v,I+A[1].length))),A[0]!==o&&(I+=A[1].length)}}}}}return p=p.substring(h.length,p.length-h.length),[p,s]},y.prototype.patch_addPadding=function(n){for(var p=this.Patch_Margin,h="",l=1;l<=p;l++)h+=String.fromCharCode(l);for(var l=0;l<n.length;l++)n[l].start1+=p,n[l].start2+=p;var s=n[0],c=s.diffs;if(c.length==0||c[0][0]!=i)c.unshift(new y.Diff(i,h)),s.start1-=p,s.start2-=p,s.length1+=p,s.length2+=p;else if(p>c[0][1].length){var m=p-c[0][1].length;c[0][1]=h.substring(c[0][1].length)+c[0][1],s.start1-=m,s.start2-=m,s.length1+=m,s.length2+=m}if(s=n[n.length-1],c=s.diffs,c.length==0||c[c.length-1][0]!=i)c.push(new y.Diff(i,h)),s.length1+=p,s.length2+=p;else if(p>c[c.length-1][1].length){var m=p-c[c.length-1][1].length;c[c.length-1][1]+=h.substring(0,m),s.length1+=m,s.length2+=m}return h},y.prototype.patch_splitMax=function(n){for(var p=this.Match_MaxBits,h=0;h<n.length;h++)if(!(n[h].length1<=p)){var l=n[h];n.splice(h--,1);for(var s=l.start1,c=l.start2,m="";l.diffs.length!==0;){var r=new y.patch_obj,g=!0;for(r.start1=s-m.length,r.start2=c-m.length,m!==""&&(r.length1=r.length2=m.length,r.diffs.push(new y.Diff(i,m)));l.diffs.length!==0&&r.length1<p-this.Patch_Margin;){var d=l.diffs[0][0],u=l.diffs[0][1];d===f?(r.length2+=u.length,c+=u.length,r.diffs.push(l.diffs.shift()),g=!1):d===o&&r.diffs.length==1&&r.diffs[0][0]==i&&u.length>2*p?(r.length1+=u.length,s+=u.length,g=!1,r.diffs.push(new y.Diff(d,u)),l.diffs.shift()):(u=u.substring(0,p-r.length1-this.Patch_Margin),r.length1+=u.length,s+=u.length,d===i?(r.length2+=u.length,c+=u.length):g=!1,r.diffs.push(new y.Diff(d,u)),u==l.diffs[0][1]?l.diffs.shift():l.diffs[0][1]=l.diffs[0][1].substring(u.length))}m=this.diff_text2(r.diffs),m=m.substring(m.length-this.Patch_Margin);var v=this.diff_text1(l.diffs).substring(0,this.Patch_Margin);v!==""&&(r.length1+=v.length,r.length2+=v.length,r.diffs.length!==0&&r.diffs[r.diffs.length-1][0]===i?r.diffs[r.diffs.length-1][1]+=v:r.diffs.push(new y.Diff(i,v))),g||n.splice(++h,0,r)}}},y.prototype.patch_toText=function(n){for(var p=[],h=0;h<n.length;h++)p[h]=n[h];return p.join("")},y.prototype.patch_fromText=function(n){var p=[];if(!n)return p;for(var h=n.split(`
`),l=0,s=/^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;l<h.length;){var c=h[l].match(s);if(!c)throw new Error("Invalid patch string: "+h[l]);var m=new y.patch_obj;for(p.push(m),m.start1=parseInt(c[1],10),c[2]===""?(m.start1--,m.length1=1):c[2]=="0"?m.length1=0:(m.start1--,m.length1=parseInt(c[2],10)),m.start2=parseInt(c[3],10),c[4]===""?(m.start2--,m.length2=1):c[4]=="0"?m.length2=0:(m.start2--,m.length2=parseInt(c[4],10)),l++;l<h.length;){var r=h[l].charAt(0);try{var g=decodeURI(h[l].substring(1))}catch(d){throw new Error("Illegal escape in patch_fromText: "+g)}if(r=="-")m.diffs.push(new y.Diff(o,g));else if(r=="+")m.diffs.push(new y.Diff(f,g));else if(r==" ")m.diffs.push(new y.Diff(i,g));else{if(r=="@")break;if(r!=="")throw new Error('Invalid patch mode "'+r+'" in: '+g)}l++}}return p},y.patch_obj=function(){this.diffs=[],this.start1=null,this.start2=null,this.length1=0,this.length2=0},y.patch_obj.prototype.toString=function(){var n,p;this.length1===0?n=this.start1+",0":this.length1==1?n=this.start1+1:n=this.start1+1+","+this.length1,this.length2===0?p=this.start2+",0":this.length2==1?p=this.start2+1:p=this.start2+1+","+this.length2;for(var h=["@@ -"+n+" +"+p+` @@
`],l,s=0;s<this.diffs.length;s++){switch(this.diffs[s][0]){case f:l="+";break;case o:l="-";break;case i:l=" ";break}h[s+1]=l+encodeURI(this.diffs[s][1])+`
`}return h.join("").replace(/%20/g," ")},O.exports=y,O.exports.diff_match_patch=y,O.exports.DIFF_DELETE=o,O.exports.DIFF_INSERT=f,O.exports.DIFF_EQUAL=i},177:function(O){/**!

 @license
 handlebars v4.7.7

Copyright (C) 2011-2019 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/(function(y,o){O.exports=o()})(this,function(){return function(y){function o(i){if(f[i])return f[i].exports;var n=f[i]={exports:{},id:i,loaded:!1};return y[i].call(n.exports,n,n.exports,o),n.loaded=!0,n.exports}var f={};return o.m=y,o.c=f,o.p="",o(0)}([function(y,o,f){"use strict";function i(){var A=b();return A.compile=function(E,_){return m.compile(E,_,A)},A.precompile=function(E,_){return m.precompile(E,_,A)},A.AST=s.default,A.Compiler=m.Compiler,A.JavaScriptCompiler=g.default,A.Parser=c.parser,A.parse=c.parse,A.parseWithoutProcessing=c.parseWithoutProcessing,A}var n=f(1).default;o.__esModule=!0;var p=f(2),h=n(p),l=f(45),s=n(l),c=f(46),m=f(51),r=f(52),g=n(r),d=f(49),u=n(d),v=f(44),I=n(v),b=h.default.create,R=i();R.create=i,I.default(R),R.Visitor=u.default,R.default=R,o.default=R,y.exports=o.default},function(y,o){"use strict";o.default=function(f){return f&&f.__esModule?f:{default:f}},o.__esModule=!0},function(y,o,f){"use strict";function i(){var A=new l.HandlebarsEnvironment;return d.extend(A,l),A.SafeString=c.default,A.Exception=r.default,A.Utils=d,A.escapeExpression=d.escapeExpression,A.VM=v,A.template=function(E){return v.template(E,A)},A}var n=f(3).default,p=f(1).default;o.__esModule=!0;var h=f(4),l=n(h),s=f(37),c=p(s),m=f(6),r=p(m),g=f(5),d=n(g),u=f(38),v=n(u),I=f(44),b=p(I),R=i();R.create=i,b.default(R),R.default=R,o.default=R,y.exports=o.default},function(y,o){"use strict";o.default=function(f){if(f&&f.__esModule)return f;var i={};if(f!=null)for(var n in f)Object.prototype.hasOwnProperty.call(f,n)&&(i[n]=f[n]);return i.default=f,i},o.__esModule=!0},function(y,o,f){"use strict";function i(A,E,_){this.helpers=A||{},this.partials=E||{},this.decorators=_||{},s.registerDefaultHelpers(this),c.registerDefaultDecorators(this)}var n=f(1).default;o.__esModule=!0,o.HandlebarsEnvironment=i;var p=f(5),h=f(6),l=n(h),s=f(10),c=f(30),m=f(32),r=n(m),g=f(33),d="4.7.7";o.VERSION=d;var u=8;o.COMPILER_REVISION=u;var v=7;o.LAST_COMPATIBLE_COMPILER_REVISION=v;var I={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1",7:">= 4.0.0 <4.3.0",8:">= 4.3.0"};o.REVISION_CHANGES=I;var b="[object Object]";i.prototype={constructor:i,logger:r.default,log:r.default.log,registerHelper:function(A,E){if(p.toString.call(A)===b){if(E)throw new l.default("Arg not supported with multiple helpers");p.extend(this.helpers,A)}else this.helpers[A]=E},unregisterHelper:function(A){delete this.helpers[A]},registerPartial:function(A,E){if(p.toString.call(A)===b)p.extend(this.partials,A);else{if(typeof E=="undefined")throw new l.default('Attempting to register a partial called "'+A+'" as undefined');this.partials[A]=E}},unregisterPartial:function(A){delete this.partials[A]},registerDecorator:function(A,E){if(p.toString.call(A)===b){if(E)throw new l.default("Arg not supported with multiple decorators");p.extend(this.decorators,A)}else this.decorators[A]=E},unregisterDecorator:function(A){delete this.decorators[A]},resetLoggedPropertyAccesses:function(){g.resetLoggedProperties()}};var R=r.default.log;o.log=R,o.createFrame=p.createFrame,o.logger=r.default},function(y,o){"use strict";function f(I){return m[I]}function i(I){for(var b=1;b<arguments.length;b++)for(var R in arguments[b])Object.prototype.hasOwnProperty.call(arguments[b],R)&&(I[R]=arguments[b][R]);return I}function n(I,b){for(var R=0,A=I.length;R<A;R++)if(I[R]===b)return R;return-1}function p(I){if(typeof I!="string"){if(I&&I.toHTML)return I.toHTML();if(I==null)return"";if(!I)return I+"";I=""+I}return g.test(I)?I.replace(r,f):I}function h(I){return!I&&I!==0||!(!v(I)||I.length!==0)}function l(I){var b=i({},I);return b._parent=I,b}function s(I,b){return I.path=b,I}function c(I,b){return(I?I+".":"")+b}o.__esModule=!0,o.extend=i,o.indexOf=n,o.escapeExpression=p,o.isEmpty=h,o.createFrame=l,o.blockParams=s,o.appendContextPath=c;var m={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;","=":"&#x3D;"},r=/[&<>"'`=]/g,g=/[&<>"'`=]/,d=Object.prototype.toString;o.toString=d;var u=function(I){return typeof I=="function"};u(/x/)&&(o.isFunction=u=function(I){return typeof I=="function"&&d.call(I)==="[object Function]"}),o.isFunction=u;var v=Array.isArray||function(I){return!(!I||typeof I!="object")&&d.call(I)==="[object Array]"};o.isArray=v},function(y,o,f){"use strict";function i(h,l){var s=l&&l.loc,c=void 0,m=void 0,r=void 0,g=void 0;s&&(c=s.start.line,m=s.end.line,r=s.start.column,g=s.end.column,h+=" - "+c+":"+r);for(var d=Error.prototype.constructor.call(this,h),u=0;u<p.length;u++)this[p[u]]=d[p[u]];Error.captureStackTrace&&Error.captureStackTrace(this,i);try{s&&(this.lineNumber=c,this.endLineNumber=m,n?(Object.defineProperty(this,"column",{value:r,enumerable:!0}),Object.defineProperty(this,"endColumn",{value:g,enumerable:!0})):(this.column=r,this.endColumn=g))}catch(v){}}var n=f(7).default;o.__esModule=!0;var p=["description","fileName","lineNumber","endLineNumber","message","name","number","stack"];i.prototype=new Error,o.default=i,y.exports=o.default},function(y,o,f){y.exports={default:f(8),__esModule:!0}},function(y,o,f){var i=f(9);y.exports=function(n,p,h){return i.setDesc(n,p,h)}},function(y,o){var f=Object;y.exports={create:f.create,getProto:f.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:f.getOwnPropertyDescriptor,setDesc:f.defineProperty,setDescs:f.defineProperties,getKeys:f.keys,getNames:f.getOwnPropertyNames,getSymbols:f.getOwnPropertySymbols,each:[].forEach}},function(y,o,f){"use strict";function i(E){l.default(E),c.default(E),r.default(E),d.default(E),v.default(E),b.default(E),A.default(E)}function n(E,_,C){E.helpers[_]&&(E.hooks[_]=E.helpers[_],C||delete E.helpers[_])}var p=f(1).default;o.__esModule=!0,o.registerDefaultHelpers=i,o.moveHelperToHooks=n;var h=f(11),l=p(h),s=f(12),c=p(s),m=f(25),r=p(m),g=f(26),d=p(g),u=f(27),v=p(u),I=f(28),b=p(I),R=f(29),A=p(R)},function(y,o,f){"use strict";o.__esModule=!0;var i=f(5);o.default=function(n){n.registerHelper("blockHelperMissing",function(p,h){var l=h.inverse,s=h.fn;if(p===!0)return s(this);if(p===!1||p==null)return l(this);if(i.isArray(p))return p.length>0?(h.ids&&(h.ids=[h.name]),n.helpers.each(p,h)):l(this);if(h.data&&h.ids){var c=i.createFrame(h.data);c.contextPath=i.appendContextPath(h.data.contextPath,h.name),h={data:c}}return s(p,h)})},y.exports=o.default},function(y,o,f){(function(i){"use strict";var n=f(13).default,p=f(1).default;o.__esModule=!0;var h=f(5),l=f(6),s=p(l);o.default=function(c){c.registerHelper("each",function(m,r){function g(z,N,x){b&&(b.key=z,b.index=N,b.first=N===0,b.last=!!x,R&&(b.contextPath=R+z)),I+=d(m[z],{data:b,blockParams:h.blockParams([m[z],z],[R+z,null])})}if(!r)throw new s.default("Must pass iterator to #each");var d=r.fn,u=r.inverse,v=0,I="",b=void 0,R=void 0;if(r.data&&r.ids&&(R=h.appendContextPath(r.data.contextPath,r.ids[0])+"."),h.isFunction(m)&&(m=m.call(this)),r.data&&(b=h.createFrame(r.data)),m&&typeof m=="object")if(h.isArray(m))for(var A=m.length;v<A;v++)v in m&&g(v,v,v===m.length-1);else if(i.Symbol&&m[i.Symbol.iterator]){for(var E=[],_=m[i.Symbol.iterator](),C=_.next();!C.done;C=_.next())E.push(C.value);m=E;for(var A=m.length;v<A;v++)g(v,v,v===m.length-1)}else(function(){var z=void 0;n(m).forEach(function(N){z!==void 0&&g(z,v-1),z=N,v++}),z!==void 0&&g(z,v-1,!0)})();return v===0&&(I=u(this)),I})},y.exports=o.default}).call(o,function(){return this}())},function(y,o,f){y.exports={default:f(14),__esModule:!0}},function(y,o,f){f(15),y.exports=f(21).Object.keys},function(y,o,f){var i=f(16);f(18)("keys",function(n){return function(p){return n(i(p))}})},function(y,o,f){var i=f(17);y.exports=function(n){return Object(i(n))}},function(y,o){y.exports=function(f){if(f==null)throw TypeError("Can't call method on  "+f);return f}},function(y,o,f){var i=f(19),n=f(21),p=f(24);y.exports=function(h,l){var s=(n.Object||{})[h]||Object[h],c={};c[h]=l(s),i(i.S+i.F*p(function(){s(1)}),"Object",c)}},function(y,o,f){var i=f(20),n=f(21),p=f(22),h="prototype",l=function(s,c,m){var r,g,d,u=s&l.F,v=s&l.G,I=s&l.S,b=s&l.P,R=s&l.B,A=s&l.W,E=v?n:n[c]||(n[c]={}),_=v?i:I?i[c]:(i[c]||{})[h];v&&(m=c);for(r in m)g=!u&&_&&r in _,g&&r in E||(d=g?_[r]:m[r],E[r]=v&&typeof _[r]!="function"?m[r]:R&&g?p(d,i):A&&_[r]==d?function(C){var z=function(N){return this instanceof C?new C(N):C(N)};return z[h]=C[h],z}(d):b&&typeof d=="function"?p(Function.call,d):d,b&&((E[h]||(E[h]={}))[r]=d))};l.F=1,l.G=2,l.S=4,l.P=8,l.B=16,l.W=32,y.exports=l},function(y,o){var f=y.exports=typeof window!="undefined"&&window.Math==Math?window:typeof self!="undefined"&&self.Math==Math?self:Function("return this")();typeof __g=="number"&&(__g=f)},function(y,o){var f=y.exports={version:"1.2.6"};typeof __e=="number"&&(__e=f)},function(y,o,f){var i=f(23);y.exports=function(n,p,h){if(i(n),p===void 0)return n;switch(h){case 1:return function(l){return n.call(p,l)};case 2:return function(l,s){return n.call(p,l,s)};case 3:return function(l,s,c){return n.call(p,l,s,c)}}return function(){return n.apply(p,arguments)}}},function(y,o){y.exports=function(f){if(typeof f!="function")throw TypeError(f+" is not a function!");return f}},function(y,o){y.exports=function(f){try{return!!f()}catch(i){return!0}}},function(y,o,f){"use strict";var i=f(1).default;o.__esModule=!0;var n=f(6),p=i(n);o.default=function(h){h.registerHelper("helperMissing",function(){if(arguments.length!==1)throw new p.default('Missing helper: "'+arguments[arguments.length-1].name+'"')})},y.exports=o.default},function(y,o,f){"use strict";var i=f(1).default;o.__esModule=!0;var n=f(5),p=f(6),h=i(p);o.default=function(l){l.registerHelper("if",function(s,c){if(arguments.length!=2)throw new h.default("#if requires exactly one argument");return n.isFunction(s)&&(s=s.call(this)),!c.hash.includeZero&&!s||n.isEmpty(s)?c.inverse(this):c.fn(this)}),l.registerHelper("unless",function(s,c){if(arguments.length!=2)throw new h.default("#unless requires exactly one argument");return l.helpers.if.call(this,s,{fn:c.inverse,inverse:c.fn,hash:c.hash})})},y.exports=o.default},function(y,o){"use strict";o.__esModule=!0,o.default=function(f){f.registerHelper("log",function(){for(var i=[void 0],n=arguments[arguments.length-1],p=0;p<arguments.length-1;p++)i.push(arguments[p]);var h=1;n.hash.level!=null?h=n.hash.level:n.data&&n.data.level!=null&&(h=n.data.level),i[0]=h,f.log.apply(f,i)})},y.exports=o.default},function(y,o){"use strict";o.__esModule=!0,o.default=function(f){f.registerHelper("lookup",function(i,n,p){return i&&p.lookupProperty(i,n)})},y.exports=o.default},function(y,o,f){"use strict";var i=f(1).default;o.__esModule=!0;var n=f(5),p=f(6),h=i(p);o.default=function(l){l.registerHelper("with",function(s,c){if(arguments.length!=2)throw new h.default("#with requires exactly one argument");n.isFunction(s)&&(s=s.call(this));var m=c.fn;if(n.isEmpty(s))return c.inverse(this);var r=c.data;return c.data&&c.ids&&(r=n.createFrame(c.data),r.contextPath=n.appendContextPath(c.data.contextPath,c.ids[0])),m(s,{data:r,blockParams:n.blockParams([s],[r&&r.contextPath])})})},y.exports=o.default},function(y,o,f){"use strict";function i(l){h.default(l)}var n=f(1).default;o.__esModule=!0,o.registerDefaultDecorators=i;var p=f(31),h=n(p)},function(y,o,f){"use strict";o.__esModule=!0;var i=f(5);o.default=function(n){n.registerDecorator("inline",function(p,h,l,s){var c=p;return h.partials||(h.partials={},c=function(m,r){var g=l.partials;l.partials=i.extend({},g,h.partials);var d=p(m,r);return l.partials=g,d}),h.partials[s.args[0]]=s.fn,c})},y.exports=o.default},function(y,o,f){"use strict";o.__esModule=!0;var i=f(5),n={methodMap:["debug","info","warn","error"],level:"info",lookupLevel:function(p){if(typeof p=="string"){var h=i.indexOf(n.methodMap,p.toLowerCase());p=h>=0?h:parseInt(p,10)}return p},log:function(p){if(p=n.lookupLevel(p),typeof console!="undefined"&&n.lookupLevel(n.level)<=p){var h=n.methodMap[p];console[h]||(h="log");for(var l=arguments.length,s=Array(l>1?l-1:0),c=1;c<l;c++)s[c-1]=arguments[c];console[h].apply(console,s)}}};o.default=n,y.exports=o.default},function(y,o,f){"use strict";function i(v){var I=s(null);I.constructor=!1,I.__defineGetter__=!1,I.__defineSetter__=!1,I.__lookupGetter__=!1;var b=s(null);return b.__proto__=!1,{properties:{whitelist:r.createNewLookupObject(b,v.allowedProtoProperties),defaultValue:v.allowProtoPropertiesByDefault},methods:{whitelist:r.createNewLookupObject(I,v.allowedProtoMethods),defaultValue:v.allowProtoMethodsByDefault}}}function n(v,I,b){return p(typeof v=="function"?I.methods:I.properties,b)}function p(v,I){return v.whitelist[I]!==void 0?v.whitelist[I]===!0:v.defaultValue!==void 0?v.defaultValue:(h(I),!1)}function h(v){u[v]!==!0&&(u[v]=!0,d.log("error",'Handlebars: Access has been denied to resolve the property "'+v+`" because it is not an "own property" of its parent.
You can add a runtime option to disable the check or this warning:
See https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details`))}function l(){c(u).forEach(function(v){delete u[v]})}var s=f(34).default,c=f(13).default,m=f(3).default;o.__esModule=!0,o.createProtoAccessControl=i,o.resultIsAllowed=n,o.resetLoggedProperties=l;var r=f(36),g=f(32),d=m(g),u=s(null)},function(y,o,f){y.exports={default:f(35),__esModule:!0}},function(y,o,f){var i=f(9);y.exports=function(n,p){return i.create(n,p)}},function(y,o,f){"use strict";function i(){for(var h=arguments.length,l=Array(h),s=0;s<h;s++)l[s]=arguments[s];return p.extend.apply(void 0,[n(null)].concat(l))}var n=f(34).default;o.__esModule=!0,o.createNewLookupObject=i;var p=f(5)},function(y,o){"use strict";function f(i){this.string=i}o.__esModule=!0,f.prototype.toString=f.prototype.toHTML=function(){return""+this.string},o.default=f,y.exports=o.default},function(y,o,f){"use strict";function i(x){var T=x&&x[0]||1,P=_.COMPILER_REVISION;if(!(T>=_.LAST_COMPATIBLE_COMPILER_REVISION&&T<=_.COMPILER_REVISION)){if(T<_.LAST_COMPATIBLE_COMPILER_REVISION){var J=_.REVISION_CHANGES[P],F=_.REVISION_CHANGES[T];throw new E.default("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+J+") or downgrade your runtime to an older version ("+F+").")}throw new E.default("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+x[1]+").")}}function n(x,T){function P(M,j,B){B.hash&&(j=R.extend({},j,B.hash),B.ids&&(B.ids[0]=!0)),M=T.VM.resolvePartial.call(this,M,j,B);var K=R.extend({},B,{hooks:this.hooks,protoAccessControl:this.protoAccessControl}),W=T.VM.invokePartial.call(this,M,j,K);if(W==null&&T.compile&&(B.partials[B.name]=T.compile(M,x.compilerOptions,T),W=B.partials[B.name](j,K)),W!=null){if(B.indent){for(var Q=W.split(`
`),re=0,ue=Q.length;re<ue&&(Q[re]||re+1!==ue);re++)Q[re]=B.indent+Q[re];W=Q.join(`
`)}return W}throw new E.default("The partial "+B.name+" could not be compiled when running in runtime-only mode")}function J(M){function j(re){return""+x.main(U,re,U.helpers,U.partials,K,Q,W)}var B=arguments.length<=1||arguments[1]===void 0?{}:arguments[1],K=B.data;J._setup(B),!B.partial&&x.useData&&(K=c(M,K));var W=void 0,Q=x.useBlockParams?[]:void 0;return x.useDepths&&(W=B.depths?M!=B.depths[0]?[M].concat(B.depths):B.depths:[M]),(j=m(x.main,j,U,B.depths||[],K,Q))(M,B)}if(!T)throw new E.default("No environment passed to template");if(!x||!x.main)throw new E.default("Unknown template object: "+typeof x);x.main.decorator=x.main_d,T.VM.checkRevision(x.compiler);var F=x.compiler&&x.compiler[0]===7,U={strict:function(M,j,B){if(!(M&&j in M))throw new E.default('"'+j+'" not defined in '+M,{loc:B});return U.lookupProperty(M,j)},lookupProperty:function(M,j){var B=M[j];return B==null||Object.prototype.hasOwnProperty.call(M,j)||N.resultIsAllowed(B,U.protoAccessControl,j)?B:void 0},lookup:function(M,j){for(var B=M.length,K=0;K<B;K++){var W=M[K]&&U.lookupProperty(M[K],j);if(W!=null)return M[K][j]}},lambda:function(M,j){return typeof M=="function"?M.call(j):M},escapeExpression:R.escapeExpression,invokePartial:P,fn:function(M){var j=x[M];return j.decorator=x[M+"_d"],j},programs:[],program:function(M,j,B,K,W){var Q=this.programs[M],re=this.fn(M);return j||W||K||B?Q=p(this,M,re,j,B,K,W):Q||(Q=this.programs[M]=p(this,M,re)),Q},data:function(M,j){for(;M&&j--;)M=M._parent;return M},mergeIfNeeded:function(M,j){var B=M||j;return M&&j&&M!==j&&(B=R.extend({},j,M)),B},nullContext:d({}),noop:T.VM.noop,compilerInfo:x.compiler};return J.isTop=!0,J._setup=function(M){if(M.partial)U.protoAccessControl=M.protoAccessControl,U.helpers=M.helpers,U.partials=M.partials,U.decorators=M.decorators,U.hooks=M.hooks;else{var j=R.extend({},T.helpers,M.helpers);r(j,U),U.helpers=j,x.usePartial&&(U.partials=U.mergeIfNeeded(M.partials,T.partials)),(x.usePartial||x.useDecorators)&&(U.decorators=R.extend({},T.decorators,M.decorators)),U.hooks={},U.protoAccessControl=N.createProtoAccessControl(M);var B=M.allowCallsToHelperMissing||F;C.moveHelperToHooks(U,"helperMissing",B),C.moveHelperToHooks(U,"blockHelperMissing",B)}},J._child=function(M,j,B,K){if(x.useBlockParams&&!B)throw new E.default("must pass block params");if(x.useDepths&&!K)throw new E.default("must pass parent depths");return p(U,M,x[M],j,0,B,K)},J}function p(x,T,P,J,F,U,M){function j(B){var K=arguments.length<=1||arguments[1]===void 0?{}:arguments[1],W=M;return!M||B==M[0]||B===x.nullContext&&M[0]===null||(W=[B].concat(M)),P(x,B,x.helpers,x.partials,K.data||J,U&&[K.blockParams].concat(U),W)}return j=m(P,j,x,M,J,U),j.program=T,j.depth=M?M.length:0,j.blockParams=F||0,j}function h(x,T,P){return x?x.call||P.name||(P.name=x,x=P.partials[x]):x=P.name==="@partial-block"?P.data["partial-block"]:P.partials[P.name],x}function l(x,T,P){var J=P.data&&P.data["partial-block"];P.partial=!0,P.ids&&(P.data.contextPath=P.ids[0]||P.data.contextPath);var F=void 0;if(P.fn&&P.fn!==s&&function(){P.data=_.createFrame(P.data);var U=P.fn;F=P.data["partial-block"]=function(M){var j=arguments.length<=1||arguments[1]===void 0?{}:arguments[1];return j.data=_.createFrame(j.data),j.data["partial-block"]=J,U(M,j)},U.partials&&(P.partials=R.extend({},P.partials,U.partials))}(),x===void 0&&F&&(x=F),x===void 0)throw new E.default("The partial "+P.name+" could not be found");if(x instanceof Function)return x(T,P)}function s(){return""}function c(x,T){return T&&"root"in T||(T=T?_.createFrame(T):{},T.root=x),T}function m(x,T,P,J,F,U){if(x.decorator){var M={};T=x.decorator(T,M,P,J&&J[0],F,U,J),R.extend(T,M)}return T}function r(x,T){u(x).forEach(function(P){var J=x[P];x[P]=g(J,T)})}function g(x,T){var P=T.lookupProperty;return z.wrapHelper(x,function(J){return R.extend({lookupProperty:P},J)})}var d=f(39).default,u=f(13).default,v=f(3).default,I=f(1).default;o.__esModule=!0,o.checkRevision=i,o.template=n,o.wrapProgram=p,o.resolvePartial=h,o.invokePartial=l,o.noop=s;var b=f(5),R=v(b),A=f(6),E=I(A),_=f(4),C=f(10),z=f(43),N=f(33)},function(y,o,f){y.exports={default:f(40),__esModule:!0}},function(y,o,f){f(41),y.exports=f(21).Object.seal},function(y,o,f){var i=f(42);f(18)("seal",function(n){return function(p){return n&&i(p)?n(p):p}})},function(y,o){y.exports=function(f){return typeof f=="object"?f!==null:typeof f=="function"}},function(y,o){"use strict";function f(i,n){if(typeof i!="function")return i;var p=function(){var h=arguments[arguments.length-1];return arguments[arguments.length-1]=n(h),i.apply(this,arguments)};return p}o.__esModule=!0,o.wrapHelper=f},function(y,o){(function(f){"use strict";o.__esModule=!0,o.default=function(i){var n=typeof f!="undefined"?f:window,p=n.Handlebars;i.noConflict=function(){return n.Handlebars===i&&(n.Handlebars=p),i}},y.exports=o.default}).call(o,function(){return this}())},function(y,o){"use strict";o.__esModule=!0;var f={helpers:{helperExpression:function(i){return i.type==="SubExpression"||(i.type==="MustacheStatement"||i.type==="BlockStatement")&&!!(i.params&&i.params.length||i.hash)},scopedId:function(i){return/^\.|this\b/.test(i.original)},simpleId:function(i){return i.parts.length===1&&!f.helpers.scopedId(i)&&!i.depth}}};o.default=f,y.exports=o.default},function(y,o,f){"use strict";function i(v,I){if(v.type==="Program")return v;s.default.yy=u,u.locInfo=function(R){return new u.SourceLocation(I&&I.srcName,R)};var b=s.default.parse(v);return b}function n(v,I){var b=i(v,I),R=new m.default(I);return R.accept(b)}var p=f(1).default,h=f(3).default;o.__esModule=!0,o.parseWithoutProcessing=i,o.parse=n;var l=f(47),s=p(l),c=f(48),m=p(c),r=f(50),g=h(r),d=f(5);o.parser=s.default;var u={};d.extend(u,g)},function(y,o){"use strict";o.__esModule=!0;var f=function(){function i(){this.yy={}}var n={trace:function(){},yy:{},symbols_:{error:2,root:3,program:4,EOF:5,program_repetition0:6,statement:7,mustache:8,block:9,rawBlock:10,partial:11,partialBlock:12,content:13,COMMENT:14,CONTENT:15,openRawBlock:16,rawBlock_repetition0:17,END_RAW_BLOCK:18,OPEN_RAW_BLOCK:19,helperName:20,openRawBlock_repetition0:21,openRawBlock_option0:22,CLOSE_RAW_BLOCK:23,openBlock:24,block_option0:25,closeBlock:26,openInverse:27,block_option1:28,OPEN_BLOCK:29,openBlock_repetition0:30,openBlock_option0:31,openBlock_option1:32,CLOSE:33,OPEN_INVERSE:34,openInverse_repetition0:35,openInverse_option0:36,openInverse_option1:37,openInverseChain:38,OPEN_INVERSE_CHAIN:39,openInverseChain_repetition0:40,openInverseChain_option0:41,openInverseChain_option1:42,inverseAndProgram:43,INVERSE:44,inverseChain:45,inverseChain_option0:46,OPEN_ENDBLOCK:47,OPEN:48,mustache_repetition0:49,mustache_option0:50,OPEN_UNESCAPED:51,mustache_repetition1:52,mustache_option1:53,CLOSE_UNESCAPED:54,OPEN_PARTIAL:55,partialName:56,partial_repetition0:57,partial_option0:58,openPartialBlock:59,OPEN_PARTIAL_BLOCK:60,openPartialBlock_repetition0:61,openPartialBlock_option0:62,param:63,sexpr:64,OPEN_SEXPR:65,sexpr_repetition0:66,sexpr_option0:67,CLOSE_SEXPR:68,hash:69,hash_repetition_plus0:70,hashSegment:71,ID:72,EQUALS:73,blockParams:74,OPEN_BLOCK_PARAMS:75,blockParams_repetition_plus0:76,CLOSE_BLOCK_PARAMS:77,path:78,dataName:79,STRING:80,NUMBER:81,BOOLEAN:82,UNDEFINED:83,NULL:84,DATA:85,pathSegments:86,SEP:87,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",14:"COMMENT",15:"CONTENT",18:"END_RAW_BLOCK",19:"OPEN_RAW_BLOCK",23:"CLOSE_RAW_BLOCK",29:"OPEN_BLOCK",33:"CLOSE",34:"OPEN_INVERSE",39:"OPEN_INVERSE_CHAIN",44:"INVERSE",47:"OPEN_ENDBLOCK",48:"OPEN",51:"OPEN_UNESCAPED",54:"CLOSE_UNESCAPED",55:"OPEN_PARTIAL",60:"OPEN_PARTIAL_BLOCK",65:"OPEN_SEXPR",68:"CLOSE_SEXPR",72:"ID",73:"EQUALS",75:"OPEN_BLOCK_PARAMS",77:"CLOSE_BLOCK_PARAMS",80:"STRING",81:"NUMBER",82:"BOOLEAN",83:"UNDEFINED",84:"NULL",85:"DATA",87:"SEP"},productions_:[0,[3,2],[4,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[13,1],[10,3],[16,5],[9,4],[9,4],[24,6],[27,6],[38,6],[43,2],[45,3],[45,1],[26,3],[8,5],[8,5],[11,5],[12,3],[59,5],[63,1],[63,1],[64,5],[69,1],[71,3],[74,3],[20,1],[20,1],[20,1],[20,1],[20,1],[20,1],[20,1],[56,1],[56,1],[79,2],[78,1],[86,3],[86,1],[6,0],[6,2],[17,0],[17,2],[21,0],[21,2],[22,0],[22,1],[25,0],[25,1],[28,0],[28,1],[30,0],[30,2],[31,0],[31,1],[32,0],[32,1],[35,0],[35,2],[36,0],[36,1],[37,0],[37,1],[40,0],[40,2],[41,0],[41,1],[42,0],[42,1],[46,0],[46,1],[49,0],[49,2],[50,0],[50,1],[52,0],[52,2],[53,0],[53,1],[57,0],[57,2],[58,0],[58,1],[61,0],[61,2],[62,0],[62,1],[66,0],[66,2],[67,0],[67,1],[70,1],[70,2],[76,1],[76,2]],performAction:function(h,l,s,c,m,r,g){var d=r.length-1;switch(m){case 1:return r[d-1];case 2:this.$=c.prepareProgram(r[d]);break;case 3:this.$=r[d];break;case 4:this.$=r[d];break;case 5:this.$=r[d];break;case 6:this.$=r[d];break;case 7:this.$=r[d];break;case 8:this.$=r[d];break;case 9:this.$={type:"CommentStatement",value:c.stripComment(r[d]),strip:c.stripFlags(r[d],r[d]),loc:c.locInfo(this._$)};break;case 10:this.$={type:"ContentStatement",original:r[d],value:r[d],loc:c.locInfo(this._$)};break;case 11:this.$=c.prepareRawBlock(r[d-2],r[d-1],r[d],this._$);break;case 12:this.$={path:r[d-3],params:r[d-2],hash:r[d-1]};break;case 13:this.$=c.prepareBlock(r[d-3],r[d-2],r[d-1],r[d],!1,this._$);break;case 14:this.$=c.prepareBlock(r[d-3],r[d-2],r[d-1],r[d],!0,this._$);break;case 15:this.$={open:r[d-5],path:r[d-4],params:r[d-3],hash:r[d-2],blockParams:r[d-1],strip:c.stripFlags(r[d-5],r[d])};break;case 16:this.$={path:r[d-4],params:r[d-3],hash:r[d-2],blockParams:r[d-1],strip:c.stripFlags(r[d-5],r[d])};break;case 17:this.$={path:r[d-4],params:r[d-3],hash:r[d-2],blockParams:r[d-1],strip:c.stripFlags(r[d-5],r[d])};break;case 18:this.$={strip:c.stripFlags(r[d-1],r[d-1]),program:r[d]};break;case 19:var u=c.prepareBlock(r[d-2],r[d-1],r[d],r[d],!1,this._$),v=c.prepareProgram([u],r[d-1].loc);v.chained=!0,this.$={strip:r[d-2].strip,program:v,chain:!0};break;case 20:this.$=r[d];break;case 21:this.$={path:r[d-1],strip:c.stripFlags(r[d-2],r[d])};break;case 22:this.$=c.prepareMustache(r[d-3],r[d-2],r[d-1],r[d-4],c.stripFlags(r[d-4],r[d]),this._$);break;case 23:this.$=c.prepareMustache(r[d-3],r[d-2],r[d-1],r[d-4],c.stripFlags(r[d-4],r[d]),this._$);break;case 24:this.$={type:"PartialStatement",name:r[d-3],params:r[d-2],hash:r[d-1],indent:"",strip:c.stripFlags(r[d-4],r[d]),loc:c.locInfo(this._$)};break;case 25:this.$=c.preparePartialBlock(r[d-2],r[d-1],r[d],this._$);break;case 26:this.$={path:r[d-3],params:r[d-2],hash:r[d-1],strip:c.stripFlags(r[d-4],r[d])};break;case 27:this.$=r[d];break;case 28:this.$=r[d];break;case 29:this.$={type:"SubExpression",path:r[d-3],params:r[d-2],hash:r[d-1],loc:c.locInfo(this._$)};break;case 30:this.$={type:"Hash",pairs:r[d],loc:c.locInfo(this._$)};break;case 31:this.$={type:"HashPair",key:c.id(r[d-2]),value:r[d],loc:c.locInfo(this._$)};break;case 32:this.$=c.id(r[d-1]);break;case 33:this.$=r[d];break;case 34:this.$=r[d];break;case 35:this.$={type:"StringLiteral",value:r[d],original:r[d],loc:c.locInfo(this._$)};break;case 36:this.$={type:"NumberLiteral",value:Number(r[d]),original:Number(r[d]),loc:c.locInfo(this._$)};break;case 37:this.$={type:"BooleanLiteral",value:r[d]==="true",original:r[d]==="true",loc:c.locInfo(this._$)};break;case 38:this.$={type:"UndefinedLiteral",original:void 0,value:void 0,loc:c.locInfo(this._$)};break;case 39:this.$={type:"NullLiteral",original:null,value:null,loc:c.locInfo(this._$)};break;case 40:this.$=r[d];break;case 41:this.$=r[d];break;case 42:this.$=c.preparePath(!0,r[d],this._$);break;case 43:this.$=c.preparePath(!1,r[d],this._$);break;case 44:r[d-2].push({part:c.id(r[d]),original:r[d],separator:r[d-1]}),this.$=r[d-2];break;case 45:this.$=[{part:c.id(r[d]),original:r[d]}];break;case 46:this.$=[];break;case 47:r[d-1].push(r[d]);break;case 48:this.$=[];break;case 49:r[d-1].push(r[d]);break;case 50:this.$=[];break;case 51:r[d-1].push(r[d]);break;case 58:this.$=[];break;case 59:r[d-1].push(r[d]);break;case 64:this.$=[];break;case 65:r[d-1].push(r[d]);break;case 70:this.$=[];break;case 71:r[d-1].push(r[d]);break;case 78:this.$=[];break;case 79:r[d-1].push(r[d]);break;case 82:this.$=[];break;case 83:r[d-1].push(r[d]);break;case 86:this.$=[];break;case 87:r[d-1].push(r[d]);break;case 90:this.$=[];break;case 91:r[d-1].push(r[d]);break;case 94:this.$=[];break;case 95:r[d-1].push(r[d]);break;case 98:this.$=[r[d]];break;case 99:r[d-1].push(r[d]);break;case 100:this.$=[r[d]];break;case 101:r[d-1].push(r[d])}},table:[{3:1,4:2,5:[2,46],6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{1:[3]},{5:[1,4]},{5:[2,2],7:5,8:6,9:7,10:8,11:9,12:10,13:11,14:[1,12],15:[1,20],16:17,19:[1,23],24:15,27:16,29:[1,21],34:[1,22],39:[2,2],44:[2,2],47:[2,2],48:[1,13],51:[1,14],55:[1,18],59:19,60:[1,24]},{1:[2,1]},{5:[2,47],14:[2,47],15:[2,47],19:[2,47],29:[2,47],34:[2,47],39:[2,47],44:[2,47],47:[2,47],48:[2,47],51:[2,47],55:[2,47],60:[2,47]},{5:[2,3],14:[2,3],15:[2,3],19:[2,3],29:[2,3],34:[2,3],39:[2,3],44:[2,3],47:[2,3],48:[2,3],51:[2,3],55:[2,3],60:[2,3]},{5:[2,4],14:[2,4],15:[2,4],19:[2,4],29:[2,4],34:[2,4],39:[2,4],44:[2,4],47:[2,4],48:[2,4],51:[2,4],55:[2,4],60:[2,4]},{5:[2,5],14:[2,5],15:[2,5],19:[2,5],29:[2,5],34:[2,5],39:[2,5],44:[2,5],47:[2,5],48:[2,5],51:[2,5],55:[2,5],60:[2,5]},{5:[2,6],14:[2,6],15:[2,6],19:[2,6],29:[2,6],34:[2,6],39:[2,6],44:[2,6],47:[2,6],48:[2,6],51:[2,6],55:[2,6],60:[2,6]},{5:[2,7],14:[2,7],15:[2,7],19:[2,7],29:[2,7],34:[2,7],39:[2,7],44:[2,7],47:[2,7],48:[2,7],51:[2,7],55:[2,7],60:[2,7]},{5:[2,8],14:[2,8],15:[2,8],19:[2,8],29:[2,8],34:[2,8],39:[2,8],44:[2,8],47:[2,8],48:[2,8],51:[2,8],55:[2,8],60:[2,8]},{5:[2,9],14:[2,9],15:[2,9],19:[2,9],29:[2,9],34:[2,9],39:[2,9],44:[2,9],47:[2,9],48:[2,9],51:[2,9],55:[2,9],60:[2,9]},{20:25,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:36,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{4:37,6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],39:[2,46],44:[2,46],47:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{4:38,6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],44:[2,46],47:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{15:[2,48],17:39,18:[2,48]},{20:41,56:40,64:42,65:[1,43],72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{4:44,6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],47:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{5:[2,10],14:[2,10],15:[2,10],18:[2,10],19:[2,10],29:[2,10],34:[2,10],39:[2,10],44:[2,10],47:[2,10],48:[2,10],51:[2,10],55:[2,10],60:[2,10]},{20:45,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:46,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:47,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:41,56:48,64:42,65:[1,43],72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{33:[2,78],49:49,65:[2,78],72:[2,78],80:[2,78],81:[2,78],82:[2,78],83:[2,78],84:[2,78],85:[2,78]},{23:[2,33],33:[2,33],54:[2,33],65:[2,33],68:[2,33],72:[2,33],75:[2,33],80:[2,33],81:[2,33],82:[2,33],83:[2,33],84:[2,33],85:[2,33]},{23:[2,34],33:[2,34],54:[2,34],65:[2,34],68:[2,34],72:[2,34],75:[2,34],80:[2,34],81:[2,34],82:[2,34],83:[2,34],84:[2,34],85:[2,34]},{23:[2,35],33:[2,35],54:[2,35],65:[2,35],68:[2,35],72:[2,35],75:[2,35],80:[2,35],81:[2,35],82:[2,35],83:[2,35],84:[2,35],85:[2,35]},{23:[2,36],33:[2,36],54:[2,36],65:[2,36],68:[2,36],72:[2,36],75:[2,36],80:[2,36],81:[2,36],82:[2,36],83:[2,36],84:[2,36],85:[2,36]},{23:[2,37],33:[2,37],54:[2,37],65:[2,37],68:[2,37],72:[2,37],75:[2,37],80:[2,37],81:[2,37],82:[2,37],83:[2,37],84:[2,37],85:[2,37]},{23:[2,38],33:[2,38],54:[2,38],65:[2,38],68:[2,38],72:[2,38],75:[2,38],80:[2,38],81:[2,38],82:[2,38],83:[2,38],84:[2,38],85:[2,38]},{23:[2,39],33:[2,39],54:[2,39],65:[2,39],68:[2,39],72:[2,39],75:[2,39],80:[2,39],81:[2,39],82:[2,39],83:[2,39],84:[2,39],85:[2,39]},{23:[2,43],33:[2,43],54:[2,43],65:[2,43],68:[2,43],72:[2,43],75:[2,43],80:[2,43],81:[2,43],82:[2,43],83:[2,43],84:[2,43],85:[2,43],87:[1,50]},{72:[1,35],86:51},{23:[2,45],33:[2,45],54:[2,45],65:[2,45],68:[2,45],72:[2,45],75:[2,45],80:[2,45],81:[2,45],82:[2,45],83:[2,45],84:[2,45],85:[2,45],87:[2,45]},{52:52,54:[2,82],65:[2,82],72:[2,82],80:[2,82],81:[2,82],82:[2,82],83:[2,82],84:[2,82],85:[2,82]},{25:53,38:55,39:[1,57],43:56,44:[1,58],45:54,47:[2,54]},{28:59,43:60,44:[1,58],47:[2,56]},{13:62,15:[1,20],18:[1,61]},{33:[2,86],57:63,65:[2,86],72:[2,86],80:[2,86],81:[2,86],82:[2,86],83:[2,86],84:[2,86],85:[2,86]},{33:[2,40],65:[2,40],72:[2,40],80:[2,40],81:[2,40],82:[2,40],83:[2,40],84:[2,40],85:[2,40]},{33:[2,41],65:[2,41],72:[2,41],80:[2,41],81:[2,41],82:[2,41],83:[2,41],84:[2,41],85:[2,41]},{20:64,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{26:65,47:[1,66]},{30:67,33:[2,58],65:[2,58],72:[2,58],75:[2,58],80:[2,58],81:[2,58],82:[2,58],83:[2,58],84:[2,58],85:[2,58]},{33:[2,64],35:68,65:[2,64],72:[2,64],75:[2,64],80:[2,64],81:[2,64],82:[2,64],83:[2,64],84:[2,64],85:[2,64]},{21:69,23:[2,50],65:[2,50],72:[2,50],80:[2,50],81:[2,50],82:[2,50],83:[2,50],84:[2,50],85:[2,50]},{33:[2,90],61:70,65:[2,90],72:[2,90],80:[2,90],81:[2,90],82:[2,90],83:[2,90],84:[2,90],85:[2,90]},{20:74,33:[2,80],50:71,63:72,64:75,65:[1,43],69:73,70:76,71:77,72:[1,78],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{72:[1,79]},{23:[2,42],33:[2,42],54:[2,42],65:[2,42],68:[2,42],72:[2,42],75:[2,42],80:[2,42],81:[2,42],82:[2,42],83:[2,42],84:[2,42],85:[2,42],87:[1,50]},{20:74,53:80,54:[2,84],63:81,64:75,65:[1,43],69:82,70:76,71:77,72:[1,78],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{26:83,47:[1,66]},{47:[2,55]},{4:84,6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],39:[2,46],44:[2,46],47:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{47:[2,20]},{20:85,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{4:86,6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],47:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{26:87,47:[1,66]},{47:[2,57]},{5:[2,11],14:[2,11],15:[2,11],19:[2,11],29:[2,11],34:[2,11],39:[2,11],44:[2,11],47:[2,11],48:[2,11],51:[2,11],55:[2,11],60:[2,11]},{15:[2,49],18:[2,49]},{20:74,33:[2,88],58:88,63:89,64:75,65:[1,43],69:90,70:76,71:77,72:[1,78],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{65:[2,94],66:91,68:[2,94],72:[2,94],80:[2,94],81:[2,94],82:[2,94],83:[2,94],84:[2,94],85:[2,94]},{5:[2,25],14:[2,25],15:[2,25],19:[2,25],29:[2,25],34:[2,25],39:[2,25],44:[2,25],47:[2,25],48:[2,25],51:[2,25],55:[2,25],60:[2,25]},{20:92,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:74,31:93,33:[2,60],63:94,64:75,65:[1,43],69:95,70:76,71:77,72:[1,78],75:[2,60],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:74,33:[2,66],36:96,63:97,64:75,65:[1,43],69:98,70:76,71:77,72:[1,78],75:[2,66],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:74,22:99,23:[2,52],63:100,64:75,65:[1,43],69:101,70:76,71:77,72:[1,78],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:74,33:[2,92],62:102,63:103,64:75,65:[1,43],69:104,70:76,71:77,72:[1,78],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{33:[1,105]},{33:[2,79],65:[2,79],72:[2,79],80:[2,79],81:[2,79],82:[2,79],83:[2,79],84:[2,79],85:[2,79]},{33:[2,81]},{23:[2,27],33:[2,27],54:[2,27],65:[2,27],68:[2,27],72:[2,27],75:[2,27],80:[2,27],81:[2,27],82:[2,27],83:[2,27],84:[2,27],85:[2,27]},{23:[2,28],33:[2,28],54:[2,28],65:[2,28],68:[2,28],72:[2,28],75:[2,28],80:[2,28],81:[2,28],82:[2,28],83:[2,28],84:[2,28],85:[2,28]},{23:[2,30],33:[2,30],54:[2,30],68:[2,30],71:106,72:[1,107],75:[2,30]},{23:[2,98],33:[2,98],54:[2,98],68:[2,98],72:[2,98],75:[2,98]},{23:[2,45],33:[2,45],54:[2,45],65:[2,45],68:[2,45],72:[2,45],73:[1,108],75:[2,45],80:[2,45],81:[2,45],82:[2,45],83:[2,45],84:[2,45],85:[2,45],87:[2,45]},{23:[2,44],33:[2,44],54:[2,44],65:[2,44],68:[2,44],72:[2,44],75:[2,44],80:[2,44],81:[2,44],82:[2,44],83:[2,44],84:[2,44],85:[2,44],87:[2,44]},{54:[1,109]},{54:[2,83],65:[2,83],72:[2,83],80:[2,83],81:[2,83],82:[2,83],83:[2,83],84:[2,83],85:[2,83]},{54:[2,85]},{5:[2,13],14:[2,13],15:[2,13],19:[2,13],29:[2,13],34:[2,13],39:[2,13],44:[2,13],47:[2,13],48:[2,13],51:[2,13],55:[2,13],60:[2,13]},{38:55,39:[1,57],43:56,44:[1,58],45:111,46:110,47:[2,76]},{33:[2,70],40:112,65:[2,70],72:[2,70],75:[2,70],80:[2,70],81:[2,70],82:[2,70],83:[2,70],84:[2,70],85:[2,70]},{47:[2,18]},{5:[2,14],14:[2,14],15:[2,14],19:[2,14],29:[2,14],34:[2,14],39:[2,14],44:[2,14],47:[2,14],48:[2,14],51:[2,14],55:[2,14],60:[2,14]},{33:[1,113]},{33:[2,87],65:[2,87],72:[2,87],80:[2,87],81:[2,87],82:[2,87],83:[2,87],84:[2,87],85:[2,87]},{33:[2,89]},{20:74,63:115,64:75,65:[1,43],67:114,68:[2,96],69:116,70:76,71:77,72:[1,78],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{33:[1,117]},{32:118,33:[2,62],74:119,75:[1,120]},{33:[2,59],65:[2,59],72:[2,59],75:[2,59],80:[2,59],81:[2,59],82:[2,59],83:[2,59],84:[2,59],85:[2,59]},{33:[2,61],75:[2,61]},{33:[2,68],37:121,74:122,75:[1,120]},{33:[2,65],65:[2,65],72:[2,65],75:[2,65],80:[2,65],81:[2,65],82:[2,65],83:[2,65],84:[2,65],85:[2,65]},{33:[2,67],75:[2,67]},{23:[1,123]},{23:[2,51],65:[2,51],72:[2,51],80:[2,51],81:[2,51],82:[2,51],83:[2,51],84:[2,51],85:[2,51]},{23:[2,53]},{33:[1,124]},{33:[2,91],65:[2,91],72:[2,91],80:[2,91],81:[2,91],82:[2,91],83:[2,91],84:[2,91],85:[2,91]},{33:[2,93]},{5:[2,22],14:[2,22],15:[2,22],19:[2,22],29:[2,22],34:[2,22],39:[2,22],44:[2,22],47:[2,22],48:[2,22],51:[2,22],55:[2,22],60:[2,22]},{23:[2,99],33:[2,99],54:[2,99],68:[2,99],72:[2,99],75:[2,99]},{73:[1,108]},{20:74,63:125,64:75,65:[1,43],72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{5:[2,23],14:[2,23],15:[2,23],19:[2,23],29:[2,23],34:[2,23],39:[2,23],44:[2,23],47:[2,23],48:[2,23],51:[2,23],55:[2,23],60:[2,23]},{47:[2,19]},{47:[2,77]},{20:74,33:[2,72],41:126,63:127,64:75,65:[1,43],69:128,70:76,71:77,72:[1,78],75:[2,72],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{5:[2,24],14:[2,24],15:[2,24],19:[2,24],29:[2,24],34:[2,24],39:[2,24],44:[2,24],47:[2,24],48:[2,24],51:[2,24],55:[2,24],60:[2,24]},{68:[1,129]},{65:[2,95],68:[2,95],72:[2,95],80:[2,95],81:[2,95],82:[2,95],83:[2,95],84:[2,95],85:[2,95]},{68:[2,97]},{5:[2,21],14:[2,21],15:[2,21],19:[2,21],29:[2,21],34:[2,21],39:[2,21],44:[2,21],47:[2,21],48:[2,21],51:[2,21],55:[2,21],60:[2,21]},{33:[1,130]},{33:[2,63]},{72:[1,132],76:131},{33:[1,133]},{33:[2,69]},{15:[2,12],18:[2,12]},{14:[2,26],15:[2,26],19:[2,26],29:[2,26],34:[2,26],47:[2,26],48:[2,26],51:[2,26],55:[2,26],60:[2,26]},{23:[2,31],33:[2,31],54:[2,31],68:[2,31],72:[2,31],75:[2,31]},{33:[2,74],42:134,74:135,75:[1,120]},{33:[2,71],65:[2,71],72:[2,71],75:[2,71],80:[2,71],81:[2,71],82:[2,71],83:[2,71],84:[2,71],85:[2,71]},{33:[2,73],75:[2,73]},{23:[2,29],33:[2,29],54:[2,29],65:[2,29],68:[2,29],72:[2,29],75:[2,29],80:[2,29],81:[2,29],82:[2,29],83:[2,29],84:[2,29],85:[2,29]},{14:[2,15],15:[2,15],19:[2,15],29:[2,15],34:[2,15],39:[2,15],44:[2,15],47:[2,15],48:[2,15],51:[2,15],55:[2,15],60:[2,15]},{72:[1,137],77:[1,136]},{72:[2,100],77:[2,100]},{14:[2,16],15:[2,16],19:[2,16],29:[2,16],34:[2,16],44:[2,16],47:[2,16],48:[2,16],51:[2,16],55:[2,16],60:[2,16]},{33:[1,138]},{33:[2,75]},{33:[2,32]},{72:[2,101],77:[2,101]},{14:[2,17],15:[2,17],19:[2,17],29:[2,17],34:[2,17],39:[2,17],44:[2,17],47:[2,17],48:[2,17],51:[2,17],55:[2,17],60:[2,17]}],defaultActions:{4:[2,1],54:[2,55],56:[2,20],60:[2,57],73:[2,81],82:[2,85],86:[2,18],90:[2,89],101:[2,53],104:[2,93],110:[2,19],111:[2,77],116:[2,97],119:[2,63],122:[2,69],135:[2,75],136:[2,32]},parseError:function(h,l){throw new Error(h)},parse:function(h){function l(){var U;return U=s.lexer.lex()||1,typeof U!="number"&&(U=s.symbols_[U]||U),U}var s=this,c=[0],m=[null],r=[],g=this.table,d="",u=0,v=0,I=0;this.lexer.setInput(h),this.lexer.yy=this.yy,this.yy.lexer=this.lexer,this.yy.parser=this,typeof this.lexer.yylloc=="undefined"&&(this.lexer.yylloc={});var b=this.lexer.yylloc;r.push(b);var R=this.lexer.options&&this.lexer.options.ranges;typeof this.yy.parseError=="function"&&(this.parseError=this.yy.parseError);for(var A,E,_,C,z,N,x,T,P,J={};;){if(_=c[c.length-1],this.defaultActions[_]?C=this.defaultActions[_]:(A!==null&&typeof A!="undefined"||(A=l()),C=g[_]&&g[_][A]),typeof C=="undefined"||!C.length||!C[0]){var F="";if(!I){P=[];for(N in g[_])this.terminals_[N]&&N>2&&P.push("'"+this.terminals_[N]+"'");F=this.lexer.showPosition?"Parse error on line "+(u+1)+`:
`+this.lexer.showPosition()+`
Expecting `+P.join(", ")+", got '"+(this.terminals_[A]||A)+"'":"Parse error on line "+(u+1)+": Unexpected "+(A==1?"end of input":"'"+(this.terminals_[A]||A)+"'"),this.parseError(F,{text:this.lexer.match,token:this.terminals_[A]||A,line:this.lexer.yylineno,loc:b,expected:P})}}if(C[0]instanceof Array&&C.length>1)throw new Error("Parse Error: multiple actions possible at state: "+_+", token: "+A);switch(C[0]){case 1:c.push(A),m.push(this.lexer.yytext),r.push(this.lexer.yylloc),c.push(C[1]),A=null,E?(A=E,E=null):(v=this.lexer.yyleng,d=this.lexer.yytext,u=this.lexer.yylineno,b=this.lexer.yylloc,I>0&&I--);break;case 2:if(x=this.productions_[C[1]][1],J.$=m[m.length-x],J._$={first_line:r[r.length-(x||1)].first_line,last_line:r[r.length-1].last_line,first_column:r[r.length-(x||1)].first_column,last_column:r[r.length-1].last_column},R&&(J._$.range=[r[r.length-(x||1)].range[0],r[r.length-1].range[1]]),z=this.performAction.call(J,d,v,u,this.yy,C[1],m,r),typeof z!="undefined")return z;x&&(c=c.slice(0,-1*x*2),m=m.slice(0,-1*x),r=r.slice(0,-1*x)),c.push(this.productions_[C[1]][0]),m.push(J.$),r.push(J._$),T=g[c[c.length-2]][c[c.length-1]],c.push(T);break;case 3:return!0}}return!0}},p=function(){var h={EOF:1,parseError:function(l,s){if(!this.yy.parser)throw new Error(l);this.yy.parser.parseError(l,s)},setInput:function(l){return this._input=l,this._more=this._less=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var l=this._input[0];this.yytext+=l,this.yyleng++,this.offset++,this.match+=l,this.matched+=l;var s=l.match(/(?:\r\n?|\n).*/g);return s?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),l},unput:function(l){var s=l.length,c=l.split(/(?:\r\n?|\n)/g);this._input=l+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-s-1),this.offset-=s;var m=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),c.length-1&&(this.yylineno-=c.length-1);var r=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:c?(c.length===m.length?this.yylloc.first_column:0)+m[m.length-c.length].length-c[0].length:this.yylloc.first_column-s},this.options.ranges&&(this.yylloc.range=[r[0],r[0]+this.yyleng-s]),this},more:function(){return this._more=!0,this},less:function(l){this.unput(this.match.slice(l))},pastInput:function(){var l=this.matched.substr(0,this.matched.length-this.match.length);return(l.length>20?"...":"")+l.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var l=this.match;return l.length<20&&(l+=this._input.substr(0,20-l.length)),(l.substr(0,20)+(l.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var l=this.pastInput(),s=new Array(l.length+1).join("-");return l+this.upcomingInput()+`
`+s+"^"},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var l,s,c,m,r;this._more||(this.yytext="",this.match="");for(var g=this._currentRules(),d=0;d<g.length&&(c=this._input.match(this.rules[g[d]]),!c||s&&!(c[0].length>s[0].length)||(s=c,m=d,this.options.flex));d++);return s?(r=s[0].match(/(?:\r\n?|\n).*/g),r&&(this.yylineno+=r.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:r?r[r.length-1].length-r[r.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+s[0].length},this.yytext+=s[0],this.match+=s[0],this.matches=s,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._input=this._input.slice(s[0].length),this.matched+=s[0],l=this.performAction.call(this,this.yy,this,g[m],this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),l||void 0):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var l=this.next();return typeof l!="undefined"?l:this.lex()},begin:function(l){this.conditionStack.push(l)},popState:function(){return this.conditionStack.pop()},_currentRules:function(){return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules},topState:function(){return this.conditionStack[this.conditionStack.length-2]},pushState:function(l){this.begin(l)}};return h.options={},h.performAction=function(l,s,c,m){function r(g,d){return s.yytext=s.yytext.substring(g,s.yyleng-d+g)}switch(c){case 0:if(s.yytext.slice(-2)==="\\\\"?(r(0,1),this.begin("mu")):s.yytext.slice(-1)==="\\"?(r(0,1),this.begin("emu")):this.begin("mu"),s.yytext)return 15;break;case 1:return 15;case 2:return this.popState(),15;case 3:return this.begin("raw"),15;case 4:return this.popState(),this.conditionStack[this.conditionStack.length-1]==="raw"?15:(r(5,9),"END_RAW_BLOCK");case 5:return 15;case 6:return this.popState(),14;case 7:return 65;case 8:return 68;case 9:return 19;case 10:return this.popState(),this.begin("raw"),23;case 11:return 55;case 12:return 60;case 13:return 29;case 14:return 47;case 15:return this.popState(),44;case 16:return this.popState(),44;case 17:return 34;case 18:return 39;case 19:return 51;case 20:return 48;case 21:this.unput(s.yytext),this.popState(),this.begin("com");break;case 22:return this.popState(),14;case 23:return 48;case 24:return 73;case 25:return 72;case 26:return 72;case 27:return 87;case 28:break;case 29:return this.popState(),54;case 30:return this.popState(),33;case 31:return s.yytext=r(1,2).replace(/\\"/g,'"'),80;case 32:return s.yytext=r(1,2).replace(/\\'/g,"'"),80;case 33:return 85;case 34:return 82;case 35:return 82;case 36:return 83;case 37:return 84;case 38:return 81;case 39:return 75;case 40:return 77;case 41:return 72;case 42:return s.yytext=s.yytext.replace(/\\([\\\]])/g,"$1"),72;case 43:return"INVALID";case 44:return 5}},h.rules=[/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/,/^(?:\{\{\{\{(?=[^\/]))/,/^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/,/^(?:[^\x00]+?(?=(\{\{\{\{)))/,/^(?:[\s\S]*?--(~)?\}\})/,/^(?:\()/,/^(?:\))/,/^(?:\{\{\{\{)/,/^(?:\}\}\}\})/,/^(?:\{\{(~)?>)/,/^(?:\{\{(~)?#>)/,/^(?:\{\{(~)?#\*?)/,/^(?:\{\{(~)?\/)/,/^(?:\{\{(~)?\^\s*(~)?\}\})/,/^(?:\{\{(~)?\s*else\s*(~)?\}\})/,/^(?:\{\{(~)?\^)/,/^(?:\{\{(~)?\s*else\b)/,/^(?:\{\{(~)?\{)/,/^(?:\{\{(~)?&)/,/^(?:\{\{(~)?!--)/,/^(?:\{\{(~)?![\s\S]*?\}\})/,/^(?:\{\{(~)?\*?)/,/^(?:=)/,/^(?:\.\.)/,/^(?:\.(?=([=~}\s\/.)|])))/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}(~)?\}\})/,/^(?:(~)?\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@)/,/^(?:true(?=([~}\s)])))/,/^(?:false(?=([~}\s)])))/,/^(?:undefined(?=([~}\s)])))/,/^(?:null(?=([~}\s)])))/,/^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/,/^(?:as\s+\|)/,/^(?:\|)/,/^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/,/^(?:\[(\\\]|[^\]])*\])/,/^(?:.)/,/^(?:$)/],h.conditions={mu:{rules:[7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44],inclusive:!1},emu:{rules:[2],inclusive:!1},com:{rules:[6],inclusive:!1},raw:{rules:[3,4,5],inclusive:!1},INITIAL:{rules:[0,1,44],inclusive:!0}},h}();return n.lexer=p,i.prototype=n,n.Parser=i,new i}();o.default=f,y.exports=o.default},function(y,o,f){"use strict";function i(){var r=arguments.length<=0||arguments[0]===void 0?{}:arguments[0];this.options=r}function n(r,g,d){g===void 0&&(g=r.length);var u=r[g-1],v=r[g-2];return u?u.type==="ContentStatement"?(v||!d?/\r?\n\s*?$/:/(^|\r?\n)\s*?$/).test(u.original):void 0:d}function p(r,g,d){g===void 0&&(g=-1);var u=r[g+1],v=r[g+2];return u?u.type==="ContentStatement"?(v||!d?/^\s*?\r?\n/:/^\s*?(\r?\n|$)/).test(u.original):void 0:d}function h(r,g,d){var u=r[g==null?0:g+1];if(u&&u.type==="ContentStatement"&&(d||!u.rightStripped)){var v=u.value;u.value=u.value.replace(d?/^\s+/:/^[ \t]*\r?\n?/,""),u.rightStripped=u.value!==v}}function l(r,g,d){var u=r[g==null?r.length-1:g-1];if(u&&u.type==="ContentStatement"&&(d||!u.leftStripped)){var v=u.value;return u.value=u.value.replace(d?/\s+$/:/[ \t]+$/,""),u.leftStripped=u.value!==v,u.leftStripped}}var s=f(1).default;o.__esModule=!0;var c=f(49),m=s(c);i.prototype=new m.default,i.prototype.Program=function(r){var g=!this.options.ignoreStandalone,d=!this.isRootSeen;this.isRootSeen=!0;for(var u=r.body,v=0,I=u.length;v<I;v++){var b=u[v],R=this.accept(b);if(R){var A=n(u,v,d),E=p(u,v,d),_=R.openStandalone&&A,C=R.closeStandalone&&E,z=R.inlineStandalone&&A&&E;R.close&&h(u,v,!0),R.open&&l(u,v,!0),g&&z&&(h(u,v),l(u,v)&&b.type==="PartialStatement"&&(b.indent=/([ \t]+$)/.exec(u[v-1].original)[1])),g&&_&&(h((b.program||b.inverse).body),l(u,v)),g&&C&&(h(u,v),l((b.inverse||b.program).body))}}return r},i.prototype.BlockStatement=i.prototype.DecoratorBlock=i.prototype.PartialBlockStatement=function(r){this.accept(r.program),this.accept(r.inverse);var g=r.program||r.inverse,d=r.program&&r.inverse,u=d,v=d;if(d&&d.chained)for(u=d.body[0].program;v.chained;)v=v.body[v.body.length-1].program;var I={open:r.openStrip.open,close:r.closeStrip.close,openStandalone:p(g.body),closeStandalone:n((u||g).body)};if(r.openStrip.close&&h(g.body,null,!0),d){var b=r.inverseStrip;b.open&&l(g.body,null,!0),b.close&&h(u.body,null,!0),r.closeStrip.open&&l(v.body,null,!0),!this.options.ignoreStandalone&&n(g.body)&&p(u.body)&&(l(g.body),h(u.body))}else r.closeStrip.open&&l(g.body,null,!0);return I},i.prototype.Decorator=i.prototype.MustacheStatement=function(r){return r.strip},i.prototype.PartialStatement=i.prototype.CommentStatement=function(r){var g=r.strip||{};return{inlineStandalone:!0,open:g.open,close:g.close}},o.default=i,y.exports=o.default},function(y,o,f){"use strict";function i(){this.parents=[]}function n(m){this.acceptRequired(m,"path"),this.acceptArray(m.params),this.acceptKey(m,"hash")}function p(m){n.call(this,m),this.acceptKey(m,"program"),this.acceptKey(m,"inverse")}function h(m){this.acceptRequired(m,"name"),this.acceptArray(m.params),this.acceptKey(m,"hash")}var l=f(1).default;o.__esModule=!0;var s=f(6),c=l(s);i.prototype={constructor:i,mutating:!1,acceptKey:function(m,r){var g=this.accept(m[r]);if(this.mutating){if(g&&!i.prototype[g.type])throw new c.default('Unexpected node type "'+g.type+'" found when accepting '+r+" on "+m.type);m[r]=g}},acceptRequired:function(m,r){if(this.acceptKey(m,r),!m[r])throw new c.default(m.type+" requires "+r)},acceptArray:function(m){for(var r=0,g=m.length;r<g;r++)this.acceptKey(m,r),m[r]||(m.splice(r,1),r--,g--)},accept:function(m){if(m){if(!this[m.type])throw new c.default("Unknown type: "+m.type,m);this.current&&this.parents.unshift(this.current),this.current=m;var r=this[m.type](m);return this.current=this.parents.shift(),!this.mutating||r?r:r!==!1?m:void 0}},Program:function(m){this.acceptArray(m.body)},MustacheStatement:n,Decorator:n,BlockStatement:p,DecoratorBlock:p,PartialStatement:h,PartialBlockStatement:function(m){h.call(this,m),this.acceptKey(m,"program")},ContentStatement:function(){},CommentStatement:function(){},SubExpression:n,PathExpression:function(){},StringLiteral:function(){},NumberLiteral:function(){},BooleanLiteral:function(){},UndefinedLiteral:function(){},NullLiteral:function(){},Hash:function(m){this.acceptArray(m.pairs)},HashPair:function(m){this.acceptRequired(m,"value")}},o.default=i,y.exports=o.default},function(y,o,f){"use strict";function i(b,R){if(R=R.path?R.path.original:R,b.path.original!==R){var A={loc:b.path.loc};throw new I.default(b.path.original+" doesn't match "+R,A)}}function n(b,R){this.source=b,this.start={line:R.first_line,column:R.first_column},this.end={line:R.last_line,column:R.last_column}}function p(b){return/^\[.*\]$/.test(b)?b.substring(1,b.length-1):b}function h(b,R){return{open:b.charAt(2)==="~",close:R.charAt(R.length-3)==="~"}}function l(b){return b.replace(/^\{\{~?!-?-?/,"").replace(/-?-?~?\}\}$/,"")}function s(b,R,A){A=this.locInfo(A);for(var E=b?"@":"",_=[],C=0,z=0,N=R.length;z<N;z++){var x=R[z].part,T=R[z].original!==x;if(E+=(R[z].separator||"")+x,T||x!==".."&&x!=="."&&x!=="this")_.push(x);else{if(_.length>0)throw new I.default("Invalid path: "+E,{loc:A});x===".."&&C++}}return{type:"PathExpression",data:b,depth:C,parts:_,original:E,loc:A}}function c(b,R,A,E,_,C){var z=E.charAt(3)||E.charAt(2),N=z!=="{"&&z!=="&",x=/\*/.test(E);return{type:x?"Decorator":"MustacheStatement",path:b,params:R,hash:A,escaped:N,strip:_,loc:this.locInfo(C)}}function m(b,R,A,E){i(b,A),E=this.locInfo(E);var _={type:"Program",body:R,strip:{},loc:E};return{type:"BlockStatement",path:b.path,params:b.params,hash:b.hash,program:_,openStrip:{},inverseStrip:{},closeStrip:{},loc:E}}function r(b,R,A,E,_,C){E&&E.path&&i(b,E);var z=/\*/.test(b.open);R.blockParams=b.blockParams;var N=void 0,x=void 0;if(A){if(z)throw new I.default("Unexpected inverse block on decorator",A);A.chain&&(A.program.body[0].closeStrip=E.strip),x=A.strip,N=A.program}return _&&(_=N,N=R,R=_),{type:z?"DecoratorBlock":"BlockStatement",path:b.path,params:b.params,hash:b.hash,program:R,inverse:N,openStrip:b.strip,inverseStrip:x,closeStrip:E&&E.strip,loc:this.locInfo(C)}}function g(b,R){if(!R&&b.length){var A=b[0].loc,E=b[b.length-1].loc;A&&E&&(R={source:A.source,start:{line:A.start.line,column:A.start.column},end:{line:E.end.line,column:E.end.column}})}return{type:"Program",body:b,strip:{},loc:R}}function d(b,R,A,E){return i(b,A),{type:"PartialBlockStatement",name:b.path,params:b.params,hash:b.hash,program:R,openStrip:b.strip,closeStrip:A&&A.strip,loc:this.locInfo(E)}}var u=f(1).default;o.__esModule=!0,o.SourceLocation=n,o.id=p,o.stripFlags=h,o.stripComment=l,o.preparePath=s,o.prepareMustache=c,o.prepareRawBlock=m,o.prepareBlock=r,o.prepareProgram=g,o.preparePartialBlock=d;var v=f(6),I=u(v)},function(y,o,f){"use strict";function i(){}function n(I,b,R){if(I==null||typeof I!="string"&&I.type!=="Program")throw new r.default("You must pass a string or Handlebars AST to Handlebars.precompile. You passed "+I);b=b||{},"data"in b||(b.data=!0),b.compat&&(b.useDepths=!0);var A=R.parse(I,b),E=new R.Compiler().compile(A,b);return new R.JavaScriptCompiler().compile(E,b)}function p(I,b,R){function A(){var C=R.parse(I,b),z=new R.Compiler().compile(C,b),N=new R.JavaScriptCompiler().compile(z,b,void 0,!0);return R.template(N)}function E(C,z){return _||(_=A()),_.call(this,C,z)}if(b===void 0&&(b={}),I==null||typeof I!="string"&&I.type!=="Program")throw new r.default("You must pass a string or Handlebars AST to Handlebars.compile. You passed "+I);b=g.extend({},b),"data"in b||(b.data=!0),b.compat&&(b.useDepths=!0);var _=void 0;return E._setup=function(C){return _||(_=A()),_._setup(C)},E._child=function(C,z,N,x){return _||(_=A()),_._child(C,z,N,x)},E}function h(I,b){if(I===b)return!0;if(g.isArray(I)&&g.isArray(b)&&I.length===b.length){for(var R=0;R<I.length;R++)if(!h(I[R],b[R]))return!1;return!0}}function l(I){if(!I.path.parts){var b=I.path;I.path={type:"PathExpression",data:!1,depth:0,parts:[b.original+""],original:b.original+"",loc:b.loc}}}var s=f(34).default,c=f(1).default;o.__esModule=!0,o.Compiler=i,o.precompile=n,o.compile=p;var m=f(6),r=c(m),g=f(5),d=f(45),u=c(d),v=[].slice;i.prototype={compiler:i,equals:function(I){var b=this.opcodes.length;if(I.opcodes.length!==b)return!1;for(var R=0;R<b;R++){var A=this.opcodes[R],E=I.opcodes[R];if(A.opcode!==E.opcode||!h(A.args,E.args))return!1}b=this.children.length;for(var R=0;R<b;R++)if(!this.children[R].equals(I.children[R]))return!1;return!0},guid:0,compile:function(I,b){return this.sourceNode=[],this.opcodes=[],this.children=[],this.options=b,this.stringParams=b.stringParams,this.trackIds=b.trackIds,b.blockParams=b.blockParams||[],b.knownHelpers=g.extend(s(null),{helperMissing:!0,blockHelperMissing:!0,each:!0,if:!0,unless:!0,with:!0,log:!0,lookup:!0},b.knownHelpers),this.accept(I)},compileProgram:function(I){var b=new this.compiler,R=b.compile(I,this.options),A=this.guid++;return this.usePartial=this.usePartial||R.usePartial,this.children[A]=R,this.useDepths=this.useDepths||R.useDepths,A},accept:function(I){if(!this[I.type])throw new r.default("Unknown type: "+I.type,I);this.sourceNode.unshift(I);var b=this[I.type](I);return this.sourceNode.shift(),b},Program:function(I){this.options.blockParams.unshift(I.blockParams);for(var b=I.body,R=b.length,A=0;A<R;A++)this.accept(b[A]);return this.options.blockParams.shift(),this.isSimple=R===1,this.blockParams=I.blockParams?I.blockParams.length:0,this},BlockStatement:function(I){l(I);var b=I.program,R=I.inverse;b=b&&this.compileProgram(b),R=R&&this.compileProgram(R);var A=this.classifySexpr(I);A==="helper"?this.helperSexpr(I,b,R):A==="simple"?(this.simpleSexpr(I),this.opcode("pushProgram",b),this.opcode("pushProgram",R),this.opcode("emptyHash"),this.opcode("blockValue",I.path.original)):(this.ambiguousSexpr(I,b,R),this.opcode("pushProgram",b),this.opcode("pushProgram",R),this.opcode("emptyHash"),this.opcode("ambiguousBlockValue")),this.opcode("append")},DecoratorBlock:function(I){var b=I.program&&this.compileProgram(I.program),R=this.setupFullMustacheParams(I,b,void 0),A=I.path;this.useDecorators=!0,this.opcode("registerDecorator",R.length,A.original)},PartialStatement:function(I){this.usePartial=!0;var b=I.program;b&&(b=this.compileProgram(I.program));var R=I.params;if(R.length>1)throw new r.default("Unsupported number of partial arguments: "+R.length,I);R.length||(this.options.explicitPartialContext?this.opcode("pushLiteral","undefined"):R.push({type:"PathExpression",parts:[],depth:0}));var A=I.name.original,E=I.name.type==="SubExpression";E&&this.accept(I.name),this.setupFullMustacheParams(I,b,void 0,!0);var _=I.indent||"";this.options.preventIndent&&_&&(this.opcode("appendContent",_),_=""),this.opcode("invokePartial",E,A,_),this.opcode("append")},PartialBlockStatement:function(I){this.PartialStatement(I)},MustacheStatement:function(I){this.SubExpression(I),I.escaped&&!this.options.noEscape?this.opcode("appendEscaped"):this.opcode("append")},Decorator:function(I){this.DecoratorBlock(I)},ContentStatement:function(I){I.value&&this.opcode("appendContent",I.value)},CommentStatement:function(){},SubExpression:function(I){l(I);var b=this.classifySexpr(I);b==="simple"?this.simpleSexpr(I):b==="helper"?this.helperSexpr(I):this.ambiguousSexpr(I)},ambiguousSexpr:function(I,b,R){var A=I.path,E=A.parts[0],_=b!=null||R!=null;this.opcode("getContext",A.depth),this.opcode("pushProgram",b),this.opcode("pushProgram",R),A.strict=!0,this.accept(A),this.opcode("invokeAmbiguous",E,_)},simpleSexpr:function(I){var b=I.path;b.strict=!0,this.accept(b),this.opcode("resolvePossibleLambda")},helperSexpr:function(I,b,R){var A=this.setupFullMustacheParams(I,b,R),E=I.path,_=E.parts[0];if(this.options.knownHelpers[_])this.opcode("invokeKnownHelper",A.length,_);else{if(this.options.knownHelpersOnly)throw new r.default("You specified knownHelpersOnly, but used the unknown helper "+_,I);E.strict=!0,E.falsy=!0,this.accept(E),this.opcode("invokeHelper",A.length,E.original,u.default.helpers.simpleId(E))}},PathExpression:function(I){this.addDepth(I.depth),this.opcode("getContext",I.depth);var b=I.parts[0],R=u.default.helpers.scopedId(I),A=!I.depth&&!R&&this.blockParamIndex(b);A?this.opcode("lookupBlockParam",A,I.parts):b?I.data?(this.options.data=!0,this.opcode("lookupData",I.depth,I.parts,I.strict)):this.opcode("lookupOnContext",I.parts,I.falsy,I.strict,R):this.opcode("pushContext")},StringLiteral:function(I){this.opcode("pushString",I.value)},NumberLiteral:function(I){this.opcode("pushLiteral",I.value)},BooleanLiteral:function(I){this.opcode("pushLiteral",I.value)},UndefinedLiteral:function(){this.opcode("pushLiteral","undefined")},NullLiteral:function(){this.opcode("pushLiteral","null")},Hash:function(I){var b=I.pairs,R=0,A=b.length;for(this.opcode("pushHash");R<A;R++)this.pushParam(b[R].value);for(;R--;)this.opcode("assignToHash",b[R].key);this.opcode("popHash")},opcode:function(I){this.opcodes.push({opcode:I,args:v.call(arguments,1),loc:this.sourceNode[0].loc})},addDepth:function(I){I&&(this.useDepths=!0)},classifySexpr:function(I){var b=u.default.helpers.simpleId(I.path),R=b&&!!this.blockParamIndex(I.path.parts[0]),A=!R&&u.default.helpers.helperExpression(I),E=!R&&(A||b);if(E&&!A){var _=I.path.parts[0],C=this.options;C.knownHelpers[_]?A=!0:C.knownHelpersOnly&&(E=!1)}return A?"helper":E?"ambiguous":"simple"},pushParams:function(I){for(var b=0,R=I.length;b<R;b++)this.pushParam(I[b])},pushParam:function(I){var b=I.value!=null?I.value:I.original||"";if(this.stringParams)b.replace&&(b=b.replace(/^(\.?\.\/)*/g,"").replace(/\//g,".")),I.depth&&this.addDepth(I.depth),this.opcode("getContext",I.depth||0),this.opcode("pushStringParam",b,I.type),I.type==="SubExpression"&&this.accept(I);else{if(this.trackIds){var R=void 0;if(!I.parts||u.default.helpers.scopedId(I)||I.depth||(R=this.blockParamIndex(I.parts[0])),R){var A=I.parts.slice(1).join(".");this.opcode("pushId","BlockParam",R,A)}else b=I.original||b,b.replace&&(b=b.replace(/^this(?:\.|$)/,"").replace(/^\.\//,"").replace(/^\.$/,"")),this.opcode("pushId",I.type,b)}this.accept(I)}},setupFullMustacheParams:function(I,b,R,A){var E=I.params;return this.pushParams(E),this.opcode("pushProgram",b),this.opcode("pushProgram",R),I.hash?this.accept(I.hash):this.opcode("emptyHash",A),E},blockParamIndex:function(I){for(var b=0,R=this.options.blockParams.length;b<R;b++){var A=this.options.blockParams[b],E=A&&g.indexOf(A,I);if(A&&E>=0)return[b,E]}}}},function(y,o,f){"use strict";function i(u){this.value=u}function n(){}function p(u,v,I,b){var R=v.popStack(),A=0,E=I.length;for(u&&E--;A<E;A++)R=v.nameLookup(R,I[A],b);return u?[v.aliasable("container.strict"),"(",R,", ",v.quotedString(I[A]),", ",JSON.stringify(v.source.currentLocation)," )"]:R}var h=f(13).default,l=f(1).default;o.__esModule=!0;var s=f(4),c=f(6),m=l(c),r=f(5),g=f(53),d=l(g);n.prototype={nameLookup:function(u,v){return this.internalNameLookup(u,v)},depthedLookup:function(u){return[this.aliasable("container.lookup"),"(depths, ",JSON.stringify(u),")"]},compilerInfo:function(){var u=s.COMPILER_REVISION,v=s.REVISION_CHANGES[u];return[u,v]},appendToBuffer:function(u,v,I){return r.isArray(u)||(u=[u]),u=this.source.wrap(u,v),this.environment.isSimple?["return ",u,";"]:I?["buffer += ",u,";"]:(u.appendToBuffer=!0,u)},initializeBuffer:function(){return this.quotedString("")},internalNameLookup:function(u,v){return this.lookupPropertyFunctionIsUsed=!0,["lookupProperty(",u,",",JSON.stringify(v),")"]},lookupPropertyFunctionIsUsed:!1,compile:function(u,v,I,b){this.environment=u,this.options=v,this.stringParams=this.options.stringParams,this.trackIds=this.options.trackIds,this.precompile=!b,this.name=this.environment.name,this.isChild=!!I,this.context=I||{decorators:[],programs:[],environments:[]},this.preamble(),this.stackSlot=0,this.stackVars=[],this.aliases={},this.registers={list:[]},this.hashes=[],this.compileStack=[],this.inlineStack=[],this.blockParams=[],this.compileChildren(u,v),this.useDepths=this.useDepths||u.useDepths||u.useDecorators||this.options.compat,this.useBlockParams=this.useBlockParams||u.useBlockParams;var R=u.opcodes,A=void 0,E=void 0,_=void 0,C=void 0;for(_=0,C=R.length;_<C;_++)A=R[_],this.source.currentLocation=A.loc,E=E||A.loc,this[A.opcode].apply(this,A.args);if(this.source.currentLocation=E,this.pushSource(""),this.stackSlot||this.inlineStack.length||this.compileStack.length)throw new m.default("Compile completed with content left on stack");this.decorators.isEmpty()?this.decorators=void 0:(this.useDecorators=!0,this.decorators.prepend(["var decorators = container.decorators, ",this.lookupPropertyFunctionVarDeclaration(),`;
`]),this.decorators.push("return fn;"),b?this.decorators=Function.apply(this,["fn","props","container","depth0","data","blockParams","depths",this.decorators.merge()]):(this.decorators.prepend(`function(fn, props, container, depth0, data, blockParams, depths) {
`),this.decorators.push(`}
`),this.decorators=this.decorators.merge()));var z=this.createFunctionContext(b);if(this.isChild)return z;var N={compiler:this.compilerInfo(),main:z};this.decorators&&(N.main_d=this.decorators,N.useDecorators=!0);var x=this.context,T=x.programs,P=x.decorators;for(_=0,C=T.length;_<C;_++)T[_]&&(N[_]=T[_],P[_]&&(N[_+"_d"]=P[_],N.useDecorators=!0));return this.environment.usePartial&&(N.usePartial=!0),this.options.data&&(N.useData=!0),this.useDepths&&(N.useDepths=!0),this.useBlockParams&&(N.useBlockParams=!0),this.options.compat&&(N.compat=!0),b?N.compilerOptions=this.options:(N.compiler=JSON.stringify(N.compiler),this.source.currentLocation={start:{line:1,column:0}},N=this.objectLiteral(N),v.srcName?(N=N.toStringWithSourceMap({file:v.destName}),N.map=N.map&&N.map.toString()):N=N.toString()),N},preamble:function(){this.lastContext=0,this.source=new d.default(this.options.srcName),this.decorators=new d.default(this.options.srcName)},createFunctionContext:function(u){var v=this,I="",b=this.stackVars.concat(this.registers.list);b.length>0&&(I+=", "+b.join(", "));var R=0;h(this.aliases).forEach(function(_){var C=v.aliases[_];C.children&&C.referenceCount>1&&(I+=", alias"+ ++R+"="+_,C.children[0]="alias"+R)}),this.lookupPropertyFunctionIsUsed&&(I+=", "+this.lookupPropertyFunctionVarDeclaration());var A=["container","depth0","helpers","partials","data"];(this.useBlockParams||this.useDepths)&&A.push("blockParams"),this.useDepths&&A.push("depths");var E=this.mergeSource(I);return u?(A.push(E),Function.apply(this,A)):this.source.wrap(["function(",A.join(","),`) {
  `,E,"}"])},mergeSource:function(u){var v=this.environment.isSimple,I=!this.forceBuffer,b=void 0,R=void 0,A=void 0,E=void 0;return this.source.each(function(_){_.appendToBuffer?(A?_.prepend("  + "):A=_,E=_):(A&&(R?A.prepend("buffer += "):b=!0,E.add(";"),A=E=void 0),R=!0,v||(I=!1))}),I?A?(A.prepend("return "),E.add(";")):R||this.source.push('return "";'):(u+=", buffer = "+(b?"":this.initializeBuffer()),A?(A.prepend("return buffer + "),E.add(";")):this.source.push("return buffer;")),u&&this.source.prepend("var "+u.substring(2)+(b?"":`;
`)),this.source.merge()},lookupPropertyFunctionVarDeclaration:function(){return`
      lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    }
    `.trim()},blockValue:function(u){var v=this.aliasable("container.hooks.blockHelperMissing"),I=[this.contextName(0)];this.setupHelperArgs(u,0,I);var b=this.popStack();I.splice(1,0,b),this.push(this.source.functionCall(v,"call",I))},ambiguousBlockValue:function(){var u=this.aliasable("container.hooks.blockHelperMissing"),v=[this.contextName(0)];this.setupHelperArgs("",0,v,!0),this.flushInline();var I=this.topStack();v.splice(1,0,I),this.pushSource(["if (!",this.lastHelper,") { ",I," = ",this.source.functionCall(u,"call",v),"}"])},appendContent:function(u){this.pendingContent?u=this.pendingContent+u:this.pendingLocation=this.source.currentLocation,this.pendingContent=u},append:function(){if(this.isInline())this.replaceStack(function(v){return[" != null ? ",v,' : ""']}),this.pushSource(this.appendToBuffer(this.popStack()));else{var u=this.popStack();this.pushSource(["if (",u," != null) { ",this.appendToBuffer(u,void 0,!0)," }"]),this.environment.isSimple&&this.pushSource(["else { ",this.appendToBuffer("''",void 0,!0)," }"])}},appendEscaped:function(){this.pushSource(this.appendToBuffer([this.aliasable("container.escapeExpression"),"(",this.popStack(),")"]))},getContext:function(u){this.lastContext=u},pushContext:function(){this.pushStackLiteral(this.contextName(this.lastContext))},lookupOnContext:function(u,v,I,b){var R=0;b||!this.options.compat||this.lastContext?this.pushContext():this.push(this.depthedLookup(u[R++])),this.resolvePath("context",u,R,v,I)},lookupBlockParam:function(u,v){this.useBlockParams=!0,this.push(["blockParams[",u[0],"][",u[1],"]"]),this.resolvePath("context",v,1)},lookupData:function(u,v,I){u?this.pushStackLiteral("container.data(data, "+u+")"):this.pushStackLiteral("data"),this.resolvePath("data",v,0,!0,I)},resolvePath:function(u,v,I,b,R){var A=this;if(this.options.strict||this.options.assumeObjects)return void this.push(p(this.options.strict&&R,this,v,u));for(var E=v.length;I<E;I++)this.replaceStack(function(_){var C=A.nameLookup(_,v[I],u);return b?[" && ",C]:[" != null ? ",C," : ",_]})},resolvePossibleLambda:function(){this.push([this.aliasable("container.lambda"),"(",this.popStack(),", ",this.contextName(0),")"])},pushStringParam:function(u,v){this.pushContext(),this.pushString(v),v!=="SubExpression"&&(typeof u=="string"?this.pushString(u):this.pushStackLiteral(u))},emptyHash:function(u){this.trackIds&&this.push("{}"),this.stringParams&&(this.push("{}"),this.push("{}")),this.pushStackLiteral(u?"undefined":"{}")},pushHash:function(){this.hash&&this.hashes.push(this.hash),this.hash={values:{},types:[],contexts:[],ids:[]}},popHash:function(){var u=this.hash;this.hash=this.hashes.pop(),this.trackIds&&this.push(this.objectLiteral(u.ids)),this.stringParams&&(this.push(this.objectLiteral(u.contexts)),this.push(this.objectLiteral(u.types))),this.push(this.objectLiteral(u.values))},pushString:function(u){this.pushStackLiteral(this.quotedString(u))},pushLiteral:function(u){this.pushStackLiteral(u)},pushProgram:function(u){u!=null?this.pushStackLiteral(this.programExpression(u)):this.pushStackLiteral(null)},registerDecorator:function(u,v){var I=this.nameLookup("decorators",v,"decorator"),b=this.setupHelperArgs(v,u);this.decorators.push(["fn = ",this.decorators.functionCall(I,"",["fn","props","container",b])," || fn;"])},invokeHelper:function(u,v,I){var b=this.popStack(),R=this.setupHelper(u,v),A=[];I&&A.push(R.name),A.push(b),this.options.strict||A.push(this.aliasable("container.hooks.helperMissing"));var E=["(",this.itemsSeparatedBy(A,"||"),")"],_=this.source.functionCall(E,"call",R.callParams);this.push(_)},itemsSeparatedBy:function(u,v){var I=[];I.push(u[0]);for(var b=1;b<u.length;b++)I.push(v,u[b]);return I},invokeKnownHelper:function(u,v){var I=this.setupHelper(u,v);this.push(this.source.functionCall(I.name,"call",I.callParams))},invokeAmbiguous:function(u,v){this.useRegister("helper");var I=this.popStack();this.emptyHash();var b=this.setupHelper(0,u,v),R=this.lastHelper=this.nameLookup("helpers",u,"helper"),A=["(","(helper = ",R," || ",I,")"];this.options.strict||(A[0]="(helper = ",A.push(" != null ? helper : ",this.aliasable("container.hooks.helperMissing"))),this.push(["(",A,b.paramsInit?["),(",b.paramsInit]:[],"),","(typeof helper === ",this.aliasable('"function"')," ? ",this.source.functionCall("helper","call",b.callParams)," : helper))"])},invokePartial:function(u,v,I){var b=[],R=this.setupParams(v,1,b);u&&(v=this.popStack(),delete R.name),I&&(R.indent=JSON.stringify(I)),R.helpers="helpers",R.partials="partials",R.decorators="container.decorators",u?b.unshift(v):b.unshift(this.nameLookup("partials",v,"partial")),this.options.compat&&(R.depths="depths"),R=this.objectLiteral(R),b.push(R),this.push(this.source.functionCall("container.invokePartial","",b))},assignToHash:function(u){var v=this.popStack(),I=void 0,b=void 0,R=void 0;this.trackIds&&(R=this.popStack()),this.stringParams&&(b=this.popStack(),I=this.popStack());var A=this.hash;I&&(A.contexts[u]=I),b&&(A.types[u]=b),R&&(A.ids[u]=R),A.values[u]=v},pushId:function(u,v,I){u==="BlockParam"?this.pushStackLiteral("blockParams["+v[0]+"].path["+v[1]+"]"+(I?" + "+JSON.stringify("."+I):"")):u==="PathExpression"?this.pushString(v):u==="SubExpression"?this.pushStackLiteral("true"):this.pushStackLiteral("null")},compiler:n,compileChildren:function(u,v){for(var I=u.children,b=void 0,R=void 0,A=0,E=I.length;A<E;A++){b=I[A],R=new this.compiler;var _=this.matchExistingProgram(b);if(_==null){this.context.programs.push("");var C=this.context.programs.length;b.index=C,b.name="program"+C,this.context.programs[C]=R.compile(b,v,this.context,!this.precompile),this.context.decorators[C]=R.decorators,this.context.environments[C]=b,this.useDepths=this.useDepths||R.useDepths,this.useBlockParams=this.useBlockParams||R.useBlockParams,b.useDepths=this.useDepths,b.useBlockParams=this.useBlockParams}else b.index=_.index,b.name="program"+_.index,this.useDepths=this.useDepths||_.useDepths,this.useBlockParams=this.useBlockParams||_.useBlockParams}},matchExistingProgram:function(u){for(var v=0,I=this.context.environments.length;v<I;v++){var b=this.context.environments[v];if(b&&b.equals(u))return b}},programExpression:function(u){var v=this.environment.children[u],I=[v.index,"data",v.blockParams];return(this.useBlockParams||this.useDepths)&&I.push("blockParams"),this.useDepths&&I.push("depths"),"container.program("+I.join(", ")+")"},useRegister:function(u){this.registers[u]||(this.registers[u]=!0,this.registers.list.push(u))},push:function(u){return u instanceof i||(u=this.source.wrap(u)),this.inlineStack.push(u),u},pushStackLiteral:function(u){this.push(new i(u))},pushSource:function(u){this.pendingContent&&(this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent),this.pendingLocation)),this.pendingContent=void 0),u&&this.source.push(u)},replaceStack:function(u){var v=["("],I=void 0,b=void 0,R=void 0;if(!this.isInline())throw new m.default("replaceStack on non-inline");var A=this.popStack(!0);if(A instanceof i)I=[A.value],v=["(",I],R=!0;else{b=!0;var E=this.incrStack();v=["((",this.push(E)," = ",A,")"],I=this.topStack()}var _=u.call(this,I);R||this.popStack(),b&&this.stackSlot--,this.push(v.concat(_,")"))},incrStack:function(){return this.stackSlot++,this.stackSlot>this.stackVars.length&&this.stackVars.push("stack"+this.stackSlot),this.topStackName()},topStackName:function(){return"stack"+this.stackSlot},flushInline:function(){var u=this.inlineStack;this.inlineStack=[];for(var v=0,I=u.length;v<I;v++){var b=u[v];if(b instanceof i)this.compileStack.push(b);else{var R=this.incrStack();this.pushSource([R," = ",b,";"]),this.compileStack.push(R)}}},isInline:function(){return this.inlineStack.length},popStack:function(u){var v=this.isInline(),I=(v?this.inlineStack:this.compileStack).pop();if(!u&&I instanceof i)return I.value;if(!v){if(!this.stackSlot)throw new m.default("Invalid stack pop");this.stackSlot--}return I},topStack:function(){var u=this.isInline()?this.inlineStack:this.compileStack,v=u[u.length-1];return v instanceof i?v.value:v},contextName:function(u){return this.useDepths&&u?"depths["+u+"]":"depth"+u},quotedString:function(u){return this.source.quotedString(u)},objectLiteral:function(u){return this.source.objectLiteral(u)},aliasable:function(u){var v=this.aliases[u];return v?(v.referenceCount++,v):(v=this.aliases[u]=this.source.wrap(u),v.aliasable=!0,v.referenceCount=1,v)},setupHelper:function(u,v,I){var b=[],R=this.setupHelperArgs(v,u,b,I),A=this.nameLookup("helpers",v,"helper"),E=this.aliasable(this.contextName(0)+" != null ? "+this.contextName(0)+" : (container.nullContext || {})");return{params:b,paramsInit:R,name:A,callParams:[E].concat(b)}},setupParams:function(u,v,I){var b={},R=[],A=[],E=[],_=!I,C=void 0;_&&(I=[]),b.name=this.quotedString(u),b.hash=this.popStack(),this.trackIds&&(b.hashIds=this.popStack()),this.stringParams&&(b.hashTypes=this.popStack(),b.hashContexts=this.popStack());var z=this.popStack(),N=this.popStack();(N||z)&&(b.fn=N||"container.noop",b.inverse=z||"container.noop");for(var x=v;x--;)C=this.popStack(),I[x]=C,this.trackIds&&(E[x]=this.popStack()),this.stringParams&&(A[x]=this.popStack(),R[x]=this.popStack());return _&&(b.args=this.source.generateArray(I)),this.trackIds&&(b.ids=this.source.generateArray(E)),this.stringParams&&(b.types=this.source.generateArray(A),b.contexts=this.source.generateArray(R)),this.options.data&&(b.data="data"),this.useBlockParams&&(b.blockParams="blockParams"),b},setupHelperArgs:function(u,v,I,b){var R=this.setupParams(u,v,I);return R.loc=JSON.stringify(this.source.currentLocation),R=this.objectLiteral(R),b?(this.useRegister("options"),I.push("options"),["options=",R]):I?(I.push(R),""):R}},function(){for(var u="break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield await null true false".split(" "),v=n.RESERVED_WORDS={},I=0,b=u.length;I<b;I++)v[u[I]]=!0}(),n.isValidJavaScriptVariableName=function(u){return!n.RESERVED_WORDS[u]&&/^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(u)},o.default=n,y.exports=o.default},function(y,o,f){"use strict";function i(s,c,m){if(h.isArray(s)){for(var r=[],g=0,d=s.length;g<d;g++)r.push(c.wrap(s[g],m));return r}return typeof s=="boolean"||typeof s=="number"?s+"":s}function n(s){this.srcFile=s,this.source=[]}var p=f(13).default;o.__esModule=!0;var h=f(5),l=void 0;try{}catch(s){}l||(l=function(s,c,m,r){this.src="",r&&this.add(r)},l.prototype={add:function(s){h.isArray(s)&&(s=s.join("")),this.src+=s},prepend:function(s){h.isArray(s)&&(s=s.join("")),this.src=s+this.src},toStringWithSourceMap:function(){return{code:this.toString()}},toString:function(){return this.src}}),n.prototype={isEmpty:function(){return!this.source.length},prepend:function(s,c){this.source.unshift(this.wrap(s,c))},push:function(s,c){this.source.push(this.wrap(s,c))},merge:function(){var s=this.empty();return this.each(function(c){s.add(["  ",c,`
`])}),s},each:function(s){for(var c=0,m=this.source.length;c<m;c++)s(this.source[c])},empty:function(){var s=this.currentLocation||{start:{}};return new l(s.start.line,s.start.column,this.srcFile)},wrap:function(s){var c=arguments.length<=1||arguments[1]===void 0?this.currentLocation||{start:{}}:arguments[1];return s instanceof l?s:(s=i(s,this,c),new l(c.start.line,c.start.column,this.srcFile,s))},functionCall:function(s,c,m){return m=this.generateList(m),this.wrap([s,c?"."+c+"(":"(",m,")"])},quotedString:function(s){return'"'+(s+"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")+'"'},objectLiteral:function(s){var c=this,m=[];p(s).forEach(function(g){var d=i(s[g],c);d!=="undefined"&&m.push([c.quotedString(g),":",d])});var r=this.generateList(m);return r.prepend("{"),r.add("}"),r},generateList:function(s){for(var c=this.empty(),m=0,r=s.length;m<r;m++)m&&c.add(","),c.add(i(s[m],this));return c},generateArray:function(s){var c=this.generateList(s);return c.prepend("["),c.add("]"),c}},o.default=n,y.exports=o.default}])})},7178:(O,y,o)=>{var f,i;f=[o(8934),o(7792),o(2134),o(8663),o(454),o(6981),o(7661),o(8048),o(461),o(1045),o(6525),o(5385)],i=function(n,p,h,l,s,c,m){"use strict";var r=/%20/g,g=/#.*$/,d=/([?&])_=[^&]*/,u=/^(.*?):[ \t]*([^\r\n]*)$/mg,v=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,I=/^(?:GET|HEAD)$/,b=/^\/\//,R={},A={},E="*/".concat("*"),_=p.createElement("a");_.href=s.href;function C(P){return function(J,F){typeof J!="string"&&(F=J,J="*");var U,M=0,j=J.toLowerCase().match(l)||[];if(h(F))for(;U=j[M++];)U[0]==="+"?(U=U.slice(1)||"*",(P[U]=P[U]||[]).unshift(F)):(P[U]=P[U]||[]).push(F)}}function z(P,J,F,U){var M={},j=P===A;function B(K){var W;return M[K]=!0,n.each(P[K]||[],function(Q,re){var ue=re(J,F,U);if(typeof ue=="string"&&!j&&!M[ue])return J.dataTypes.unshift(ue),B(ue),!1;if(j)return!(W=ue)}),W}return B(J.dataTypes[0])||!M["*"]&&B("*")}function N(P,J){var F,U,M=n.ajaxSettings.flatOptions||{};for(F in J)J[F]!==void 0&&((M[F]?P:U||(U={}))[F]=J[F]);return U&&n.extend(!0,P,U),P}function x(P,J,F){for(var U,M,j,B,K=P.contents,W=P.dataTypes;W[0]==="*";)W.shift(),U===void 0&&(U=P.mimeType||J.getResponseHeader("Content-Type"));if(U){for(M in K)if(K[M]&&K[M].test(U)){W.unshift(M);break}}if(W[0]in F)j=W[0];else{for(M in F){if(!W[0]||P.converters[M+" "+W[0]]){j=M;break}B||(B=M)}j=j||B}if(j)return j!==W[0]&&W.unshift(j),F[j]}function T(P,J,F,U){var M,j,B,K,W,Q={},re=P.dataTypes.slice();if(re[1])for(B in P.converters)Q[B.toLowerCase()]=P.converters[B];for(j=re.shift();j;)if(P.responseFields[j]&&(F[P.responseFields[j]]=J),!W&&U&&P.dataFilter&&(J=P.dataFilter(J,P.dataType)),W=j,j=re.shift(),j){if(j==="*")j=W;else if(W!=="*"&&W!==j){if(B=Q[W+" "+j]||Q["* "+j],!B){for(M in Q)if(K=M.split(" "),K[1]===j&&(B=Q[W+" "+K[0]]||Q["* "+K[0]],B)){B===!0?B=Q[M]:Q[M]!==!0&&(j=K[0],re.unshift(K[1]));break}}if(B!==!0)if(B&&P.throws)J=B(J);else try{J=B(J)}catch(ue){return{state:"parsererror",error:B?ue:"No conversion from "+W+" to "+j}}}}return{state:"success",data:J}}return n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:s.href,type:"GET",isLocal:v.test(s.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":E,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(P,J){return J?N(N(P,n.ajaxSettings),J):N(n.ajaxSettings,P)},ajaxPrefilter:C(R),ajaxTransport:C(A),ajax:function(P,J){typeof P=="object"&&(J=P,P=void 0),J=J||{};var F,U,M,j,B,K,W,Q,re,ue,X=n.ajaxSetup({},J),Ie=X.context||X,be=X.context&&(Ie.nodeType||Ie.jquery)?n(Ie):n.event,Re=n.Deferred(),qe=n.Callbacks("once memory"),ht=X.statusCode||{},At={},vt={},kt="canceled",we={readyState:0,getResponseHeader:function(Be){var Ue;if(W){if(!j)for(j={};Ue=u.exec(M);)j[Ue[1].toLowerCase()+" "]=(j[Ue[1].toLowerCase()+" "]||[]).concat(Ue[2]);Ue=j[Be.toLowerCase()+" "]}return Ue==null?null:Ue.join(", ")},getAllResponseHeaders:function(){return W?M:null},setRequestHeader:function(Be,Ue){return W==null&&(Be=vt[Be.toLowerCase()]=vt[Be.toLowerCase()]||Be,At[Be]=Ue),this},overrideMimeType:function(Be){return W==null&&(X.mimeType=Be),this},statusCode:function(Be){var Ue;if(Be)if(W)we.always(Be[we.status]);else for(Ue in Be)ht[Ue]=[ht[Ue],Be[Ue]];return this},abort:function(Be){var Ue=Be||kt;return F&&F.abort(Ue),mt(0,Ue),this}};if(Re.promise(we),X.url=((P||X.url||s.href)+"").replace(b,s.protocol+"//"),X.type=J.method||J.type||X.method||X.type,X.dataTypes=(X.dataType||"*").toLowerCase().match(l)||[""],X.crossDomain==null){K=p.createElement("a");try{K.href=X.url,K.href=K.href,X.crossDomain=_.protocol+"//"+_.host!=K.protocol+"//"+K.host}catch(Be){X.crossDomain=!0}}if(X.data&&X.processData&&typeof X.data!="string"&&(X.data=n.param(X.data,X.traditional)),z(R,X,J,we),W)return we;Q=n.event&&X.global,Q&&n.active++===0&&n.event.trigger("ajaxStart"),X.type=X.type.toUpperCase(),X.hasContent=!I.test(X.type),U=X.url.replace(g,""),X.hasContent?X.data&&X.processData&&(X.contentType||"").indexOf("application/x-www-form-urlencoded")===0&&(X.data=X.data.replace(r,"+")):(ue=X.url.slice(U.length),X.data&&(X.processData||typeof X.data=="string")&&(U+=(m.test(U)?"&":"?")+X.data,delete X.data),X.cache===!1&&(U=U.replace(d,"$1"),ue=(m.test(U)?"&":"?")+"_="+c.guid+++ue),X.url=U+ue),X.ifModified&&(n.lastModified[U]&&we.setRequestHeader("If-Modified-Since",n.lastModified[U]),n.etag[U]&&we.setRequestHeader("If-None-Match",n.etag[U])),(X.data&&X.hasContent&&X.contentType!==!1||J.contentType)&&we.setRequestHeader("Content-Type",X.contentType),we.setRequestHeader("Accept",X.dataTypes[0]&&X.accepts[X.dataTypes[0]]?X.accepts[X.dataTypes[0]]+(X.dataTypes[0]!=="*"?", "+E+"; q=0.01":""):X.accepts["*"]);for(re in X.headers)we.setRequestHeader(re,X.headers[re]);if(X.beforeSend&&(X.beforeSend.call(Ie,we,X)===!1||W))return we.abort();if(kt="abort",qe.add(X.complete),we.done(X.success),we.fail(X.error),F=z(A,X,J,we),!F)mt(-1,"No Transport");else{if(we.readyState=1,Q&&be.trigger("ajaxSend",[we,X]),W)return we;X.async&&X.timeout>0&&(B=window.setTimeout(function(){we.abort("timeout")},X.timeout));try{W=!1,F.send(At,mt)}catch(Be){if(W)throw Be;mt(-1,Be)}}function mt(Be,Ue,Lt,ze){var oe,_e,xe,ae,ve,pe=Ue;W||(W=!0,B&&window.clearTimeout(B),F=void 0,M=ze||"",we.readyState=Be>0?4:0,oe=Be>=200&&Be<300||Be===304,Lt&&(ae=x(X,we,Lt)),!oe&&n.inArray("script",X.dataTypes)>-1&&n.inArray("json",X.dataTypes)<0&&(X.converters["text script"]=function(){}),ae=T(X,ae,we,oe),oe?(X.ifModified&&(ve=we.getResponseHeader("Last-Modified"),ve&&(n.lastModified[U]=ve),ve=we.getResponseHeader("etag"),ve&&(n.etag[U]=ve)),Be===204||X.type==="HEAD"?pe="nocontent":Be===304?pe="notmodified":(pe=ae.state,_e=ae.data,xe=ae.error,oe=!xe)):(xe=pe,(Be||!pe)&&(pe="error",Be<0&&(Be=0))),we.status=Be,we.statusText=(Ue||pe)+"",oe?Re.resolveWith(Ie,[_e,pe,we]):Re.rejectWith(Ie,[we,pe,xe]),we.statusCode(ht),ht=void 0,Q&&be.trigger(oe?"ajaxSuccess":"ajaxError",[we,X,oe?_e:xe]),qe.fireWith(Ie,[we,pe]),Q&&(be.trigger("ajaxComplete",[we,X]),--n.active||n.event.trigger("ajaxStop")))}return we},getJSON:function(P,J,F){return n.get(P,J,F,"json")},getScript:function(P,J){return n.get(P,void 0,J,"script")}}),n.each(["get","post"],function(P,J){n[J]=function(F,U,M,j){return h(U)&&(j=j||M,M=U,U=void 0),n.ajax(n.extend({url:F,type:J,dataType:j,data:U,success:M},n.isPlainObject(F)&&F))}}),n.ajaxPrefilter(function(P){var J;for(J in P.headers)J.toLowerCase()==="content-type"&&(P.contentType=P.headers[J]||"")}),n}.apply(y,f),i!==void 0&&(O.exports=i)},7533:(O,y,o)=>{var f,i;f=[o(8934),o(2134),o(6981),o(7661),o(7178)],i=function(n,p,h,l){"use strict";var s=[],c=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var m=s.pop()||n.expando+"_"+h.guid++;return this[m]=!0,m}}),n.ajaxPrefilter("json jsonp",function(m,r,g){var d,u,v,I=m.jsonp!==!1&&(c.test(m.url)?"url":typeof m.data=="string"&&(m.contentType||"").indexOf("application/x-www-form-urlencoded")===0&&c.test(m.data)&&"data");if(I||m.dataTypes[0]==="jsonp")return d=m.jsonpCallback=p(m.jsonpCallback)?m.jsonpCallback():m.jsonpCallback,I?m[I]=m[I].replace(c,"$1"+d):m.jsonp!==!1&&(m.url+=(l.test(m.url)?"&":"?")+m.jsonp+"="+d),m.converters["script json"]=function(){return v||n.error(d+" was not called"),v[0]},m.dataTypes[0]="json",u=window[d],window[d]=function(){v=arguments},g.always(function(){u===void 0?n(window).removeProp(d):window[d]=u,m[d]&&(m.jsonpCallback=r.jsonpCallback,s.push(d)),v&&p(u)&&u(v[0]),v=u=void 0}),"script"})}.apply(y,f),i!==void 0&&(O.exports=i)},4581:(O,y,o)=>{var f,i;f=[o(8934),o(4552),o(2134),o(2889),o(7178),o(8482),o(2632),o(655)],i=function(n,p,h){"use strict";n.fn.load=function(l,s,c){var m,r,g,d=this,u=l.indexOf(" ");return u>-1&&(m=p(l.slice(u)),l=l.slice(0,u)),h(s)?(c=s,s=void 0):s&&typeof s=="object"&&(r="POST"),d.length>0&&n.ajax({url:l,type:r||"GET",dataType:"html",data:s}).done(function(v){g=arguments,d.html(m?n("<div>").append(n.parseHTML(v)).find(m):v)}).always(c&&function(v,I){d.each(function(){c.apply(this,g||[v.responseText,I,v])})}),this}}.apply(y,f),i!==void 0&&(O.exports=i)},5488:(O,y,o)=>{var f,i;f=[o(8934),o(7792),o(7178)],i=function(n,p){"use strict";n.ajaxPrefilter(function(h){h.crossDomain&&(h.contents.script=!1)}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(h){return n.globalEval(h),h}}}),n.ajaxPrefilter("script",function(h){h.cache===void 0&&(h.cache=!1),h.crossDomain&&(h.type="GET")}),n.ajaxTransport("script",function(h){if(h.crossDomain||h.scriptAttrs){var l,s;return{send:function(c,m){l=n("<script>").attr(h.scriptAttrs||{}).prop({charset:h.scriptCharset,src:h.url}).on("load error",s=function(r){l.remove(),s=null,r&&m(r.type==="error"?404:200,r.type)}),p.head.appendChild(l[0])},abort:function(){s&&s()}}}})}.apply(y,f),i!==void 0&&(O.exports=i)},454:(O,y,o)=>{var f;f=function(){"use strict";return window.location}.call(y,o,y,O),f!==void 0&&(O.exports=f)},6981:(O,y,o)=>{var f;f=function(){"use strict";return{guid:Date.now()}}.call(y,o,y,O),f!==void 0&&(O.exports=f)},7661:(O,y,o)=>{var f;f=function(){"use strict";return/\?/}.call(y,o,y,O),f!==void 0&&(O.exports=f)},8853:(O,y,o)=>{var f,i;f=[o(8934),o(9523),o(7178)],i=function(n,p){"use strict";n.ajaxSettings.xhr=function(){try{return new window.XMLHttpRequest}catch(s){}};var h={0:200,1223:204},l=n.ajaxSettings.xhr();p.cors=!!l&&"withCredentials"in l,p.ajax=l=!!l,n.ajaxTransport(function(s){var c,m;if(p.cors||l&&!s.crossDomain)return{send:function(r,g){var d,u=s.xhr();if(u.open(s.type,s.url,s.async,s.username,s.password),s.xhrFields)for(d in s.xhrFields)u[d]=s.xhrFields[d];s.mimeType&&u.overrideMimeType&&u.overrideMimeType(s.mimeType),!s.crossDomain&&!r["X-Requested-With"]&&(r["X-Requested-With"]="XMLHttpRequest");for(d in r)u.setRequestHeader(d,r[d]);c=function(v){return function(){c&&(c=m=u.onload=u.onerror=u.onabort=u.ontimeout=u.onreadystatechange=null,v==="abort"?u.abort():v==="error"?typeof u.status!="number"?g(0,"error"):g(u.status,u.statusText):g(h[u.status]||u.status,u.statusText,(u.responseType||"text")!=="text"||typeof u.responseText!="string"?{binary:u.response}:{text:u.responseText},u.getAllResponseHeaders()))}},u.onload=c(),m=u.onerror=u.ontimeout=c("error"),u.onabort!==void 0?u.onabort=m:u.onreadystatechange=function(){u.readyState===4&&window.setTimeout(function(){c&&m()})},c=c("abort");try{u.send(s.hasContent&&s.data||null)}catch(v){if(c)throw v}},abort:function(){c&&c()}}})}.apply(y,f),i!==void 0&&(O.exports=i)},8468:(O,y,o)=>{var f,i;f=[o(8934),o(2853),o(4043),o(4015),o(4580)],i=function(n){"use strict";return n}.apply(y,f),i!==void 0&&(O.exports=i)},2853:(O,y,o)=>{var f,i;f=[o(8934),o(7163),o(7060),o(2941),o(8663),o(655)],i=function(n,p,h,l,s){"use strict";var c,m=n.expr.attrHandle;n.fn.extend({attr:function(r,g){return p(this,n.attr,r,g,arguments.length>1)},removeAttr:function(r){return this.each(function(){n.removeAttr(this,r)})}}),n.extend({attr:function(r,g,d){var u,v,I=r.nodeType;if(!(I===3||I===8||I===2)){if(typeof r.getAttribute=="undefined")return n.prop(r,g,d);if((I!==1||!n.isXMLDoc(r))&&(v=n.attrHooks[g.toLowerCase()]||(n.expr.match.bool.test(g)?c:void 0)),d!==void 0){if(d===null){n.removeAttr(r,g);return}return v&&"set"in v&&(u=v.set(r,d,g))!==void 0?u:(r.setAttribute(g,d+""),d)}return v&&"get"in v&&(u=v.get(r,g))!==null?u:(u=n.find.attr(r,g),u==null?void 0:u)}},attrHooks:{type:{set:function(r,g){if(!l.radioValue&&g==="radio"&&h(r,"input")){var d=r.value;return r.setAttribute("type",g),d&&(r.value=d),g}}}},removeAttr:function(r,g){var d,u=0,v=g&&g.match(s);if(v&&r.nodeType===1)for(;d=v[u++];)r.removeAttribute(d)}}),c={set:function(r,g,d){return g===!1?n.removeAttr(r,d):r.setAttribute(d,d),d}},n.each(n.expr.match.bool.source.match(/\w+/g),function(r,g){var d=m[g]||n.find.attr;m[g]=function(u,v,I){var b,R,A=v.toLowerCase();return I||(R=m[A],m[A]=b,b=d(u,v,I)!=null?A:null,m[A]=R),b}})}.apply(y,f),i!==void 0&&(O.exports=i)},4015:(O,y,o)=>{var f,i;f=[o(8934),o(4552),o(2134),o(8663),o(9081),o(8048)],i=function(n,p,h,l,s){"use strict";function c(r){return r.getAttribute&&r.getAttribute("class")||""}function m(r){return Array.isArray(r)?r:typeof r=="string"?r.match(l)||[]:[]}n.fn.extend({addClass:function(r){var g,d,u,v,I,b;return h(r)?this.each(function(R){n(this).addClass(r.call(this,R,c(this)))}):(g=m(r),g.length?this.each(function(){if(u=c(this),d=this.nodeType===1&&" "+p(u)+" ",d){for(I=0;I<g.length;I++)v=g[I],d.indexOf(" "+v+" ")<0&&(d+=v+" ");b=p(d),u!==b&&this.setAttribute("class",b)}}):this)},removeClass:function(r){var g,d,u,v,I,b;return h(r)?this.each(function(R){n(this).removeClass(r.call(this,R,c(this)))}):arguments.length?(g=m(r),g.length?this.each(function(){if(u=c(this),d=this.nodeType===1&&" "+p(u)+" ",d){for(I=0;I<g.length;I++)for(v=g[I];d.indexOf(" "+v+" ")>-1;)d=d.replace(" "+v+" "," ");b=p(d),u!==b&&this.setAttribute("class",b)}}):this):this.attr("class","")},toggleClass:function(r,g){var d,u,v,I,b=typeof r,R=b==="string"||Array.isArray(r);return h(r)?this.each(function(A){n(this).toggleClass(r.call(this,A,c(this),g),g)}):typeof g=="boolean"&&R?g?this.addClass(r):this.removeClass(r):(d=m(r),this.each(function(){if(R)for(I=n(this),v=0;v<d.length;v++)u=d[v],I.hasClass(u)?I.removeClass(u):I.addClass(u);else(r===void 0||b==="boolean")&&(u=c(this),u&&s.set(this,"__className__",u),this.setAttribute&&this.setAttribute("class",u||r===!1?"":s.get(this,"__className__")||""))}))},hasClass:function(r){var g,d,u=0;for(g=" "+r+" ";d=this[u++];)if(d.nodeType===1&&(" "+p(c(d))+" ").indexOf(g)>-1)return!0;return!1}})}.apply(y,f),i!==void 0&&(O.exports=i)},4043:(O,y,o)=>{var f,i;f=[o(8934),o(7163),o(2941),o(655)],i=function(n,p,h){"use strict";var l=/^(?:input|select|textarea|button)$/i,s=/^(?:a|area)$/i;n.fn.extend({prop:function(c,m){return p(this,n.prop,c,m,arguments.length>1)},removeProp:function(c){return this.each(function(){delete this[n.propFix[c]||c]})}}),n.extend({prop:function(c,m,r){var g,d,u=c.nodeType;if(!(u===3||u===8||u===2))return(u!==1||!n.isXMLDoc(c))&&(m=n.propFix[m]||m,d=n.propHooks[m]),r!==void 0?d&&"set"in d&&(g=d.set(c,r,m))!==void 0?g:c[m]=r:d&&"get"in d&&(g=d.get(c,m))!==null?g:c[m]},propHooks:{tabIndex:{get:function(c){var m=n.find.attr(c,"tabindex");return m?parseInt(m,10):l.test(c.nodeName)||s.test(c.nodeName)&&c.href?0:-1}}},propFix:{for:"htmlFor",class:"className"}}),h.optSelected||(n.propHooks.selected={get:function(c){var m=c.parentNode;return m&&m.parentNode&&m.parentNode.selectedIndex,null},set:function(c){var m=c.parentNode;m&&(m.selectedIndex,m.parentNode&&m.parentNode.selectedIndex)}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this})}.apply(y,f),i!==void 0&&(O.exports=i)},2941:(O,y,o)=>{var f,i;f=[o(7792),o(9523)],i=function(n,p){"use strict";return function(){var h=n.createElement("input"),l=n.createElement("select"),s=l.appendChild(n.createElement("option"));h.type="checkbox",p.checkOn=h.value!=="",p.optSelected=s.selected,h=n.createElement("input"),h.value="t",h.type="radio",p.radioValue=h.value==="t"}(),p}.apply(y,f),i!==void 0&&(O.exports=i)},4580:(O,y,o)=>{var f,i;f=[o(8934),o(4552),o(2941),o(7060),o(2134),o(8048)],i=function(n,p,h,l,s){"use strict";var c=/\r/g;n.fn.extend({val:function(m){var r,g,d,u=this[0];return arguments.length?(d=s(m),this.each(function(v){var I;this.nodeType===1&&(d?I=m.call(this,v,n(this).val()):I=m,I==null?I="":typeof I=="number"?I+="":Array.isArray(I)&&(I=n.map(I,function(b){return b==null?"":b+""})),r=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],(!r||!("set"in r)||r.set(this,I,"value")===void 0)&&(this.value=I))})):u?(r=n.valHooks[u.type]||n.valHooks[u.nodeName.toLowerCase()],r&&"get"in r&&(g=r.get(u,"value"))!==void 0?g:(g=u.value,typeof g=="string"?g.replace(c,""):g==null?"":g)):void 0}}),n.extend({valHooks:{option:{get:function(m){var r=n.find.attr(m,"value");return r!=null?r:p(n.text(m))}},select:{get:function(m){var r,g,d,u=m.options,v=m.selectedIndex,I=m.type==="select-one",b=I?null:[],R=I?v+1:u.length;for(v<0?d=R:d=I?v:0;d<R;d++)if(g=u[d],(g.selected||d===v)&&!g.disabled&&(!g.parentNode.disabled||!l(g.parentNode,"optgroup"))){if(r=n(g).val(),I)return r;b.push(r)}return b},set:function(m,r){for(var g,d,u=m.options,v=n.makeArray(r),I=u.length;I--;)d=u[I],(d.selected=n.inArray(n.valHooks.option.get(d),v)>-1)&&(g=!0);return g||(m.selectedIndex=-1),v}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(m,r){if(Array.isArray(r))return m.checked=n.inArray(n(m).val(),r)>-1}},h.checkOn||(n.valHooks[this].get=function(m){return m.getAttribute("value")===null?"on":m.value})})}.apply(y,f),i!==void 0&&(O.exports=i)},8924:(O,y,o)=>{var f,i;f=[o(8934),o(8082),o(2134),o(8663)],i=function(n,p,h,l){"use strict";function s(c){var m={};return n.each(c.match(l)||[],function(r,g){m[g]=!0}),m}return n.Callbacks=function(c){c=typeof c=="string"?s(c):n.extend({},c);var m,r,g,d,u=[],v=[],I=-1,b=function(){for(d=d||c.once,g=m=!0;v.length;I=-1)for(r=v.shift();++I<u.length;)u[I].apply(r[0],r[1])===!1&&c.stopOnFalse&&(I=u.length,r=!1);c.memory||(r=!1),m=!1,d&&(r?u=[]:u="")},R={add:function(){return u&&(r&&!m&&(I=u.length-1,v.push(r)),function A(E){n.each(E,function(_,C){h(C)?(!c.unique||!R.has(C))&&u.push(C):C&&C.length&&p(C)!=="string"&&A(C)})}(arguments),r&&!m&&b()),this},remove:function(){return n.each(arguments,function(A,E){for(var _;(_=n.inArray(E,u,_))>-1;)u.splice(_,1),_<=I&&I--}),this},has:function(A){return A?n.inArray(A,u)>-1:u.length>0},empty:function(){return u&&(u=[]),this},disable:function(){return d=v=[],u=r="",this},disabled:function(){return!u},lock:function(){return d=v=[],!r&&!m&&(u=r=""),this},locked:function(){return!!d},fireWith:function(A,E){return d||(E=E||[],E=[A,E.slice?E.slice():E],v.push(E),m||b()),this},fire:function(){return R.fireWith(this,arguments),this},fired:function(){return!!g}};return R},n}.apply(y,f),i!==void 0&&(O.exports=i)},8934:(O,y,o)=>{var f,i;f=[o(3727),o(8045),o(3623),o(3932),o(1780),o(5431),o(5949),o(7763),o(9694),o(4194),o(3),o(9523),o(2134),o(9031),o(1224),o(8082)],i=function(n,p,h,l,s,c,m,r,g,d,u,v,I,b,R,A){"use strict";var E="3.7.0",_=/HTML$/i,C=function(N,x){return new C.fn.init(N,x)};C.fn=C.prototype={jquery:E,constructor:C,length:0,toArray:function(){return h.call(this)},get:function(N){return N==null?h.call(this):N<0?this[N+this.length]:this[N]},pushStack:function(N){var x=C.merge(this.constructor(),N);return x.prevObject=this,x},each:function(N){return C.each(this,N)},map:function(N){return this.pushStack(C.map(this,function(x,T){return N.call(x,T,x)}))},slice:function(){return this.pushStack(h.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},even:function(){return this.pushStack(C.grep(this,function(N,x){return(x+1)%2}))},odd:function(){return this.pushStack(C.grep(this,function(N,x){return x%2}))},eq:function(N){var x=this.length,T=+N+(N<0?x:0);return this.pushStack(T>=0&&T<x?[this[T]]:[])},end:function(){return this.prevObject||this.constructor()},push:s,sort:n.sort,splice:n.splice},C.extend=C.fn.extend=function(){var N,x,T,P,J,F,U=arguments[0]||{},M=1,j=arguments.length,B=!1;for(typeof U=="boolean"&&(B=U,U=arguments[M]||{},M++),typeof U!="object"&&!I(U)&&(U={}),M===j&&(U=this,M--);M<j;M++)if((N=arguments[M])!=null)for(x in N)P=N[x],!(x==="__proto__"||U===P)&&(B&&P&&(C.isPlainObject(P)||(J=Array.isArray(P)))?(T=U[x],J&&!Array.isArray(T)?F=[]:!J&&!C.isPlainObject(T)?F={}:F=T,J=!1,U[x]=C.extend(B,F,P)):P!==void 0&&(U[x]=P));return U},C.extend({expando:"jQuery"+(E+Math.random()).replace(/\D/g,""),isReady:!0,error:function(N){throw new Error(N)},noop:function(){},isPlainObject:function(N){var x,T;return!N||r.call(N)!=="[object Object]"?!1:(x=p(N),x?(T=g.call(x,"constructor")&&x.constructor,typeof T=="function"&&d.call(T)===u):!0)},isEmptyObject:function(N){var x;for(x in N)return!1;return!0},globalEval:function(N,x,T){R(N,{nonce:x&&x.nonce},T)},each:function(N,x){var T,P=0;if(z(N))for(T=N.length;P<T&&x.call(N[P],P,N[P])!==!1;P++);else for(P in N)if(x.call(N[P],P,N[P])===!1)break;return N},text:function(N){var x,T="",P=0,J=N.nodeType;if(J){if(J===1||J===9||J===11)return N.textContent;if(J===3||J===4)return N.nodeValue}else for(;x=N[P++];)T+=C.text(x);return T},makeArray:function(N,x){var T=x||[];return N!=null&&(z(Object(N))?C.merge(T,typeof N=="string"?[N]:N):s.call(T,N)),T},inArray:function(N,x,T){return x==null?-1:c.call(x,N,T)},isXMLDoc:function(N){var x=N&&N.namespaceURI,T=N&&(N.ownerDocument||N).documentElement;return!_.test(x||T&&T.nodeName||"HTML")},merge:function(N,x){for(var T=+x.length,P=0,J=N.length;P<T;P++)N[J++]=x[P];return N.length=J,N},grep:function(N,x,T){for(var P,J=[],F=0,U=N.length,M=!T;F<U;F++)P=!x(N[F],F),P!==M&&J.push(N[F]);return J},map:function(N,x,T){var P,J,F=0,U=[];if(z(N))for(P=N.length;F<P;F++)J=x(N[F],F,T),J!=null&&U.push(J);else for(F in N)J=x(N[F],F,T),J!=null&&U.push(J);return l(U)},guid:1,support:v}),typeof Symbol=="function"&&(C.fn[Symbol.iterator]=n[Symbol.iterator]),C.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(N,x){m["[object "+x+"]"]=x.toLowerCase()});function z(N){var x=!!N&&"length"in N&&N.length,T=A(N);return I(N)||b(N)?!1:T==="array"||x===0||typeof x=="number"&&x>0&&x-1 in N}return C}.apply(y,f),i!==void 0&&(O.exports=i)},1224:(O,y,o)=>{var f,i;f=[o(7792)],i=function(n){"use strict";var p={type:!0,src:!0,nonce:!0,noModule:!0};function h(l,s,c){c=c||n;var m,r,g=c.createElement("script");if(g.text=l,s)for(m in p)r=s[m]||s.getAttribute&&s.getAttribute(m),r&&g.setAttribute(m,r);c.head.appendChild(g).parentNode.removeChild(g)}return h}.apply(y,f),i!==void 0&&(O.exports=i)},7163:(O,y,o)=>{var f,i;f=[o(8934),o(8082),o(2134)],i=function(n,p,h){"use strict";var l=function(s,c,m,r,g,d,u){var v=0,I=s.length,b=m==null;if(p(m)==="object"){g=!0;for(v in m)l(s,c,v,m[v],!0,d,u)}else if(r!==void 0&&(g=!0,h(r)||(u=!0),b&&(u?(c.call(s,r),c=null):(b=c,c=function(R,A,E){return b.call(n(R),E)})),c))for(;v<I;v++)c(s[v],m,u?r:r.call(s[v],v,c(s[v],m)));return g?s:b?c.call(s):I?c(s[0],m):d};return l}.apply(y,f),i!==void 0&&(O.exports=i)},1133:(O,y)=>{var o,f;o=[],f=function(){"use strict";var i=/^-ms-/,n=/-([a-z])/g;function p(l,s){return s.toUpperCase()}function h(l){return l.replace(i,"ms-").replace(n,p)}return h}.apply(y,o),f!==void 0&&(O.exports=f)},8048:(O,y,o)=>{var f,i;f=[o(8934),o(7792),o(2134),o(5250),o(1764)],i=function(n,p,h,l){"use strict";var s,c=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,m=n.fn.init=function(r,g,d){var u,v;if(!r)return this;if(d=d||s,typeof r=="string")if(r[0]==="<"&&r[r.length-1]===">"&&r.length>=3?u=[null,r,null]:u=c.exec(r),u&&(u[1]||!g))if(u[1]){if(g=g instanceof n?g[0]:g,n.merge(this,n.parseHTML(u[1],g&&g.nodeType?g.ownerDocument||g:p,!0)),l.test(u[1])&&n.isPlainObject(g))for(u in g)h(this[u])?this[u](g[u]):this.attr(u,g[u]);return this}else return v=p.getElementById(u[2]),v&&(this[0]=v,this.length=1),this;else return!g||g.jquery?(g||d).find(r):this.constructor(g).find(r);else{if(r.nodeType)return this[0]=r,this.length=1,this;if(h(r))return d.ready!==void 0?d.ready(r):r(n)}return n.makeArray(r,this)};return m.prototype=n.fn,s=n(p),m}.apply(y,f),i!==void 0&&(O.exports=i)},70:(O,y,o)=>{var f,i;f=[o(8934),o(7730),o(712)],i=function(n,p){"use strict";var h=function(s){return n.contains(s.ownerDocument,s)},l={composed:!0};return p.getRootNode&&(h=function(s){return n.contains(s.ownerDocument,s)||s.getRootNode(l)===s.ownerDocument}),h}.apply(y,f),i!==void 0&&(O.exports=i)},7060:(O,y,o)=>{var f;f=function(){"use strict";function i(n,p){return n.nodeName&&n.nodeName.toLowerCase()===p.toLowerCase()}return i}.call(y,o,y,O),f!==void 0&&(O.exports=f)},2889:(O,y,o)=>{var f,i;f=[o(8934),o(7792),o(5250),o(3360),o(1622)],i=function(n,p,h,l,s){"use strict";return n.parseHTML=function(c,m,r){if(typeof c!="string")return[];typeof m=="boolean"&&(r=m,m=!1);var g,d,u;return m||(s.createHTMLDocument?(m=p.implementation.createHTMLDocument(""),g=m.createElement("base"),g.href=p.location.href,m.head.appendChild(g)):m=p),d=h.exec(c),u=!r&&[],d?[m.createElement(d[1])]:(d=l([c],m,u),u&&u.length&&n(u).remove(),n.merge([],d.childNodes))},n.parseHTML}.apply(y,f),i!==void 0&&(O.exports=i)},461:(O,y,o)=>{var f,i;f=[o(8934)],i=function(n){"use strict";return n.parseXML=function(p){var h,l;if(!p||typeof p!="string")return null;try{h=new window.DOMParser().parseFromString(p,"text/xml")}catch(s){}return l=h&&h.getElementsByTagName("parsererror")[0],(!h||l)&&n.error("Invalid XML: "+(l?n.map(l.childNodes,function(s){return s.textContent}).join(`
`):p)),h},n.parseXML}.apply(y,f),i!==void 0&&(O.exports=i)},5703:(O,y,o)=>{var f,i;f=[o(8934),o(7792),o(3442),o(6525)],i=function(n,p){"use strict";var h=n.Deferred();n.fn.ready=function(s){return h.then(s).catch(function(c){n.readyException(c)}),this},n.extend({isReady:!1,readyWait:1,ready:function(s){(s===!0?--n.readyWait:n.isReady)||(n.isReady=!0,!(s!==!0&&--n.readyWait>0)&&h.resolveWith(p,[n]))}}),n.ready.then=h.then;function l(){p.removeEventListener("DOMContentLoaded",l),window.removeEventListener("load",l),n.ready()}p.readyState==="complete"||p.readyState!=="loading"&&!p.documentElement.doScroll?window.setTimeout(n.ready):(p.addEventListener("DOMContentLoaded",l),window.addEventListener("load",l))}.apply(y,f),i!==void 0&&(O.exports=i)},3442:(O,y,o)=>{var f,i;f=[o(8934)],i=function(n){"use strict";n.readyException=function(p){window.setTimeout(function(){throw p})}}.apply(y,f),i!==void 0&&(O.exports=i)},4552:(O,y,o)=>{var f,i;f=[o(8663)],i=function(n){"use strict";function p(h){var l=h.match(n)||[];return l.join(" ")}return p}.apply(y,f),i!==void 0&&(O.exports=i)},1622:(O,y,o)=>{var f,i;f=[o(7792),o(9523)],i=function(n,p){"use strict";return p.createHTMLDocument=function(){var h=n.implementation.createHTMLDocument("").body;return h.innerHTML="<form></form><form></form>",h.childNodes.length===2}(),p}.apply(y,f),i!==void 0&&(O.exports=i)},8082:(O,y,o)=>{var f,i;f=[o(5949),o(7763)],i=function(n,p){"use strict";function h(l){return l==null?l+"":typeof l=="object"||typeof l=="function"?n[p.call(l)]||"object":typeof l}return h}.apply(y,f),i!==void 0&&(O.exports=i)},5250:(O,y,o)=>{var f;f=function(){"use strict";return/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i}.call(y,o,y,O),f!==void 0&&(O.exports=f)},8515:(O,y,o)=>{var f,i;f=[o(8934),o(7163),o(1133),o(7060),o(6871),o(618),o(4507),o(5057),o(3122),o(5410),o(610),o(7432),o(3781),o(4405),o(3997),o(8048),o(5703),o(655)],i=function(n,p,h,l,s,c,m,r,g,d,u,v,I,b,R){"use strict";var A=/^(none|table(?!-c[ea]).+)/,E={position:"absolute",visibility:"hidden",display:"block"},_={letterSpacing:"0",fontWeight:"400"};function C(x,T,P){var J=s.exec(T);return J?Math.max(0,J[2]-(P||0))+(J[3]||"px"):T}function z(x,T,P,J,F,U){var M=T==="width"?1:0,j=0,B=0,K=0;if(P===(J?"border":"content"))return 0;for(;M<4;M+=2)P==="margin"&&(K+=n.css(x,P+r[M],!0,F)),J?(P==="content"&&(B-=n.css(x,"padding"+r[M],!0,F)),P!=="margin"&&(B-=n.css(x,"border"+r[M]+"Width",!0,F))):(B+=n.css(x,"padding"+r[M],!0,F),P!=="padding"?B+=n.css(x,"border"+r[M]+"Width",!0,F):j+=n.css(x,"border"+r[M]+"Width",!0,F));return!J&&U>=0&&(B+=Math.max(0,Math.ceil(x["offset"+T[0].toUpperCase()+T.slice(1)]-U-B-j-.5))||0),B+K}function N(x,T,P){var J=g(x),F=!b.boxSizingReliable()||P,U=F&&n.css(x,"boxSizing",!1,J)==="border-box",M=U,j=u(x,T,J),B="offset"+T[0].toUpperCase()+T.slice(1);if(c.test(j)){if(!P)return j;j="auto"}return(!b.boxSizingReliable()&&U||!b.reliableTrDimensions()&&l(x,"tr")||j==="auto"||!parseFloat(j)&&n.css(x,"display",!1,J)==="inline")&&x.getClientRects().length&&(U=n.css(x,"boxSizing",!1,J)==="border-box",M=B in x,M&&(j=x[B])),j=parseFloat(j)||0,j+z(x,T,P||(U?"border":"content"),M,J,j)+"px"}return n.extend({cssHooks:{opacity:{get:function(x,T){if(T){var P=u(x,"opacity");return P===""?"1":P}}}},cssNumber:{animationIterationCount:!0,aspectRatio:!0,borderImageSlice:!0,columnCount:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,scale:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeMiterlimit:!0,strokeOpacity:!0},cssProps:{},style:function(x,T,P,J){if(!(!x||x.nodeType===3||x.nodeType===8||!x.style)){var F,U,M,j=h(T),B=m.test(T),K=x.style;if(B||(T=R(j)),M=n.cssHooks[T]||n.cssHooks[j],P!==void 0){if(U=typeof P,U==="string"&&(F=s.exec(P))&&F[1]&&(P=v(x,T,F),U="number"),P==null||P!==P)return;U==="number"&&!B&&(P+=F&&F[3]||(n.cssNumber[j]?"":"px")),!b.clearCloneStyle&&P===""&&T.indexOf("background")===0&&(K[T]="inherit"),(!M||!("set"in M)||(P=M.set(x,P,J))!==void 0)&&(B?K.setProperty(T,P):K[T]=P)}else return M&&"get"in M&&(F=M.get(x,!1,J))!==void 0?F:K[T]}},css:function(x,T,P,J){var F,U,M,j=h(T),B=m.test(T);return B||(T=R(j)),M=n.cssHooks[T]||n.cssHooks[j],M&&"get"in M&&(F=M.get(x,!0,P)),F===void 0&&(F=u(x,T,J)),F==="normal"&&T in _&&(F=_[T]),P===""||P?(U=parseFloat(F),P===!0||isFinite(U)?U||0:F):F}}),n.each(["height","width"],function(x,T){n.cssHooks[T]={get:function(P,J,F){if(J)return A.test(n.css(P,"display"))&&(!P.getClientRects().length||!P.getBoundingClientRect().width)?d(P,E,function(){return N(P,T,F)}):N(P,T,F)},set:function(P,J,F){var U,M=g(P),j=!b.scrollboxSize()&&M.position==="absolute",B=j||F,K=B&&n.css(P,"boxSizing",!1,M)==="border-box",W=F?z(P,T,F,K,M):0;return K&&j&&(W-=Math.ceil(P["offset"+T[0].toUpperCase()+T.slice(1)]-parseFloat(M[T])-z(P,T,"border",!1,M)-.5)),W&&(U=s.exec(J))&&(U[3]||"px")!=="px"&&(P.style[T]=J,J=n.css(P,T)),C(P,J,W)}}}),n.cssHooks.marginLeft=I(b.reliableMarginLeft,function(x,T){if(T)return(parseFloat(u(x,"marginLeft"))||x.getBoundingClientRect().left-d(x,{marginLeft:0},function(){return x.getBoundingClientRect().left}))+"px"}),n.each({margin:"",padding:"",border:"Width"},function(x,T){n.cssHooks[x+T]={expand:function(P){for(var J=0,F={},U=typeof P=="string"?P.split(" "):[P];J<4;J++)F[x+r[J]+T]=U[J]||U[J-2]||U[0];return F}},x!=="margin"&&(n.cssHooks[x+T].set=C)}),n.fn.extend({css:function(x,T){return p(this,function(P,J,F){var U,M,j={},B=0;if(Array.isArray(J)){for(U=g(P),M=J.length;B<M;B++)j[J[B]]=n.css(P,J[B],!1,U);return j}return F!==void 0?n.style(P,J,F):n.css(P,J)},x,T,arguments.length>1)}}),n}.apply(y,f),i!==void 0&&(O.exports=i)},3781:(O,y,o)=>{var f;f=function(){"use strict";function i(n,p){return{get:function(){if(n()){delete this.get;return}return(this.get=p).apply(this,arguments)}}}return i}.call(y,o,y,O),f!==void 0&&(O.exports=f)},7432:(O,y,o)=>{var f,i;f=[o(8934),o(6871)],i=function(n,p){"use strict";function h(l,s,c,m){var r,g,d=20,u=m?function(){return m.cur()}:function(){return n.css(l,s,"")},v=u(),I=c&&c[3]||(n.cssNumber[s]?"":"px"),b=l.nodeType&&(n.cssNumber[s]||I!=="px"&&+v)&&p.exec(n.css(l,s));if(b&&b[3]!==I){for(v=v/2,I=I||b[3],b=+v||1;d--;)n.style(l,s,b+I),(1-g)*(1-(g=u()/v||.5))<=0&&(d=0),b=b/g;b=b*2,n.style(l,s,b+I),c=c||[]}return c&&(b=+b||+v||0,r=c[1]?b+(c[1]+1)*c[2]:+c[2],m&&(m.unit=I,m.start=b,m.end=r)),r}return h}.apply(y,f),i!==void 0&&(O.exports=i)},610:(O,y,o)=>{var f,i;f=[o(8934),o(70),o(3151),o(618),o(3122),o(4507),o(9508),o(4405)],i=function(n,p,h,l,s,c,m,r){"use strict";function g(d,u,v){var I,b,R,A,E=c.test(u),_=d.style;return v=v||s(d),v&&(A=v.getPropertyValue(u)||v[u],E&&A&&(A=A.replace(m,"$1")||void 0),A===""&&!p(d)&&(A=n.style(d,u)),!r.pixelBoxStyles()&&l.test(A)&&h.test(u)&&(I=_.width,b=_.minWidth,R=_.maxWidth,_.minWidth=_.maxWidth=_.width=A,A=v.width,_.width=I,_.minWidth=b,_.maxWidth=R)),A!==void 0?A+"":A}return g}.apply(y,f),i!==void 0&&(O.exports=i)},3997:(O,y,o)=>{var f,i;f=[o(7792),o(8934)],i=function(n,p){"use strict";var h=["Webkit","Moz","ms"],l=n.createElement("div").style,s={};function c(r){for(var g=r[0].toUpperCase()+r.slice(1),d=h.length;d--;)if(r=h[d]+g,r in l)return r}function m(r){var g=p.cssProps[r]||s[r];return g||(r in l?r:s[r]=c(r)||r)}return m}.apply(y,f),i!==void 0&&(O.exports=i)},2365:(O,y,o)=>{var f,i;f=[o(8934),o(655)],i=function(n){"use strict";n.expr.pseudos.hidden=function(p){return!n.expr.pseudos.visible(p)},n.expr.pseudos.visible=function(p){return!!(p.offsetWidth||p.offsetHeight||p.getClientRects().length)}}.apply(y,f),i!==void 0&&(O.exports=i)},8516:(O,y,o)=>{var f,i;f=[o(8934),o(9081),o(5626)],i=function(n,p,h){"use strict";var l={};function s(m){var r,g=m.ownerDocument,d=m.nodeName,u=l[d];return u||(r=g.body.appendChild(g.createElement(d)),u=n.css(r,"display"),r.parentNode.removeChild(r),u==="none"&&(u="block"),l[d]=u,u)}function c(m,r){for(var g,d,u=[],v=0,I=m.length;v<I;v++)d=m[v],d.style&&(g=d.style.display,r?(g==="none"&&(u[v]=p.get(d,"display")||null,u[v]||(d.style.display="")),d.style.display===""&&h(d)&&(u[v]=s(d))):g!=="none"&&(u[v]="none",p.set(d,"display",g)));for(v=0;v<I;v++)u[v]!=null&&(m[v].style.display=u[v]);return m}return n.fn.extend({show:function(){return c(this,!0)},hide:function(){return c(this)},toggle:function(m){return typeof m=="boolean"?m?this.show():this.hide():this.each(function(){h(this)?n(this).show():n(this).hide()})}}),c}.apply(y,f),i!==void 0&&(O.exports=i)},4405:(O,y,o)=>{var f,i;f=[o(8934),o(7792),o(7730),o(9523)],i=function(n,p,h,l){"use strict";return function(){function s(){if(b){I.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",b.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",h.appendChild(I).appendChild(b);var R=window.getComputedStyle(b);m=R.top!=="1%",v=c(R.marginLeft)===12,b.style.right="60%",d=c(R.right)===36,r=c(R.width)===36,b.style.position="absolute",g=c(b.offsetWidth/3)===12,h.removeChild(I),b=null}}function c(R){return Math.round(parseFloat(R))}var m,r,g,d,u,v,I=p.createElement("div"),b=p.createElement("div");b.style&&(b.style.backgroundClip="content-box",b.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle=b.style.backgroundClip==="content-box",n.extend(l,{boxSizingReliable:function(){return s(),r},pixelBoxStyles:function(){return s(),d},pixelPosition:function(){return s(),m},reliableMarginLeft:function(){return s(),v},scrollboxSize:function(){return s(),g},reliableTrDimensions:function(){var R,A,E,_;return u==null&&(R=p.createElement("table"),A=p.createElement("tr"),E=p.createElement("div"),R.style.cssText="position:absolute;left:-11111px;border-collapse:separate",A.style.cssText="border:1px solid",A.style.height="1px",E.style.height="9px",E.style.display="block",h.appendChild(R).appendChild(A).appendChild(E),_=window.getComputedStyle(A),u=parseInt(_.height,10)+parseInt(_.borderTopWidth,10)+parseInt(_.borderBottomWidth,10)===A.offsetHeight,h.removeChild(R)),u}}))}(),l}.apply(y,f),i!==void 0&&(O.exports=i)},5057:(O,y,o)=>{var f;f=function(){"use strict";return["Top","Right","Bottom","Left"]}.call(y,o,y,O),f!==void 0&&(O.exports=f)},3122:(O,y,o)=>{var f;f=function(){"use strict";return function(i){var n=i.ownerDocument.defaultView;return(!n||!n.opener)&&(n=window),n.getComputedStyle(i)}}.call(y,o,y,O),f!==void 0&&(O.exports=f)},5626:(O,y,o)=>{var f,i;f=[o(8934),o(70)],i=function(n,p){"use strict";return function(h,l){return h=l||h,h.style.display==="none"||h.style.display===""&&p(h)&&n.css(h,"display")==="none"}}.apply(y,f),i!==void 0&&(O.exports=i)},3151:(O,y,o)=>{var f,i;f=[o(5057)],i=function(n){"use strict";return new RegExp(n.join("|"),"i")}.apply(y,f),i!==void 0&&(O.exports=i)},4507:(O,y,o)=>{var f;f=function(){"use strict";return/^--/}.call(y,o,y,O),f!==void 0&&(O.exports=f)},618:(O,y,o)=>{var f,i;f=[o(8308)],i=function(n){"use strict";return new RegExp("^("+n+")(?!px)[a-z%]+$","i")}.apply(y,f),i!==void 0&&(O.exports=i)},5410:(O,y,o)=>{var f;f=function(){"use strict";return function(i,n,p){var h,l,s={};for(l in n)s[l]=i.style[l],i.style[l]=n[l];h=p.call(i);for(l in n)i.style[l]=s[l];return h}}.call(y,o,y,O),f!==void 0&&(O.exports=f)},1786:(O,y,o)=>{var f,i;f=[o(8934),o(7163),o(1133),o(9081),o(2109)],i=function(n,p,h,l,s){"use strict";var c=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,m=/[A-Z]/g;function r(d){return d==="true"?!0:d==="false"?!1:d==="null"?null:d===+d+""?+d:c.test(d)?JSON.parse(d):d}function g(d,u,v){var I;if(v===void 0&&d.nodeType===1)if(I="data-"+u.replace(m,"-$&").toLowerCase(),v=d.getAttribute(I),typeof v=="string"){try{v=r(v)}catch(b){}s.set(d,u,v)}else v=void 0;return v}return n.extend({hasData:function(d){return s.hasData(d)||l.hasData(d)},data:function(d,u,v){return s.access(d,u,v)},removeData:function(d,u){s.remove(d,u)},_data:function(d,u,v){return l.access(d,u,v)},_removeData:function(d,u){l.remove(d,u)}}),n.fn.extend({data:function(d,u){var v,I,b,R=this[0],A=R&&R.attributes;if(d===void 0){if(this.length&&(b=s.get(R),R.nodeType===1&&!l.get(R,"hasDataAttrs"))){for(v=A.length;v--;)A[v]&&(I=A[v].name,I.indexOf("data-")===0&&(I=h(I.slice(5)),g(R,I,b[I])));l.set(R,"hasDataAttrs",!0)}return b}return typeof d=="object"?this.each(function(){s.set(this,d)}):p(this,function(E){var _;if(R&&E===void 0)return _=s.get(R,d),_!==void 0||(_=g(R,d),_!==void 0)?_:void 0;this.each(function(){s.set(this,d,E)})},null,u,arguments.length>1,null,!0)},removeData:function(d){return this.each(function(){s.remove(this,d)})}}),n}.apply(y,f),i!==void 0&&(O.exports=i)},7172:(O,y,o)=>{var f,i;f=[o(8934),o(1133),o(8663),o(2238)],i=function(n,p,h,l){"use strict";function s(){this.expando=n.expando+s.uid++}return s.uid=1,s.prototype={cache:function(c){var m=c[this.expando];return m||(m={},l(c)&&(c.nodeType?c[this.expando]=m:Object.defineProperty(c,this.expando,{value:m,configurable:!0}))),m},set:function(c,m,r){var g,d=this.cache(c);if(typeof m=="string")d[p(m)]=r;else for(g in m)d[p(g)]=m[g];return d},get:function(c,m){return m===void 0?this.cache(c):c[this.expando]&&c[this.expando][p(m)]},access:function(c,m,r){return m===void 0||m&&typeof m=="string"&&r===void 0?this.get(c,m):(this.set(c,m,r),r!==void 0?r:m)},remove:function(c,m){var r,g=c[this.expando];if(g!==void 0){if(m!==void 0)for(Array.isArray(m)?m=m.map(p):(m=p(m),m=m in g?[m]:m.match(h)||[]),r=m.length;r--;)delete g[m[r]];(m===void 0||n.isEmptyObject(g))&&(c.nodeType?c[this.expando]=void 0:delete c[this.expando])}},hasData:function(c){var m=c[this.expando];return m!==void 0&&!n.isEmptyObject(m)}},s}.apply(y,f),i!==void 0&&(O.exports=i)},2238:(O,y,o)=>{var f;f=function(){"use strict";return function(i){return i.nodeType===1||i.nodeType===9||!+i.nodeType}}.call(y,o,y,O),f!==void 0&&(O.exports=f)},9081:(O,y,o)=>{var f,i;f=[o(7172)],i=function(n){"use strict";return new n}.apply(y,f),i!==void 0&&(O.exports=i)},2109:(O,y,o)=>{var f,i;f=[o(7172)],i=function(n){"use strict";return new n}.apply(y,f),i!==void 0&&(O.exports=i)},6525:(O,y,o)=>{var f,i;f=[o(8934),o(2134),o(3623),o(8924)],i=function(n,p,h){"use strict";function l(m){return m}function s(m){throw m}function c(m,r,g,d){var u;try{m&&p(u=m.promise)?u.call(m).done(r).fail(g):m&&p(u=m.then)?u.call(m,r,g):r.apply(void 0,[m].slice(d))}catch(v){g.apply(void 0,[v])}}return n.extend({Deferred:function(m){var r=[["notify","progress",n.Callbacks("memory"),n.Callbacks("memory"),2],["resolve","done",n.Callbacks("once memory"),n.Callbacks("once memory"),0,"resolved"],["reject","fail",n.Callbacks("once memory"),n.Callbacks("once memory"),1,"rejected"]],g="pending",d={state:function(){return g},always:function(){return u.done(arguments).fail(arguments),this},catch:function(v){return d.then(null,v)},pipe:function(){var v=arguments;return n.Deferred(function(I){n.each(r,function(b,R){var A=p(v[R[4]])&&v[R[4]];u[R[1]](function(){var E=A&&A.apply(this,arguments);E&&p(E.promise)?E.promise().progress(I.notify).done(I.resolve).fail(I.reject):I[R[0]+"With"](this,A?[E]:arguments)})}),v=null}).promise()},then:function(v,I,b){var R=0;function A(E,_,C,z){return function(){var N=this,x=arguments,T=function(){var J,F;if(!(E<R)){if(J=C.apply(N,x),J===_.promise())throw new TypeError("Thenable self-resolution");F=J&&(typeof J=="object"||typeof J=="function")&&J.then,p(F)?z?F.call(J,A(R,_,l,z),A(R,_,s,z)):(R++,F.call(J,A(R,_,l,z),A(R,_,s,z),A(R,_,l,_.notifyWith))):(C!==l&&(N=void 0,x=[J]),(z||_.resolveWith)(N,x))}},P=z?T:function(){try{T()}catch(J){n.Deferred.exceptionHook&&n.Deferred.exceptionHook(J,P.error),E+1>=R&&(C!==s&&(N=void 0,x=[J]),_.rejectWith(N,x))}};E?P():(n.Deferred.getErrorHook?P.error=n.Deferred.getErrorHook():n.Deferred.getStackHook&&(P.error=n.Deferred.getStackHook()),window.setTimeout(P))}}return n.Deferred(function(E){r[0][3].add(A(0,E,p(b)?b:l,E.notifyWith)),r[1][3].add(A(0,E,p(v)?v:l)),r[2][3].add(A(0,E,p(I)?I:s))}).promise()},promise:function(v){return v!=null?n.extend(v,d):d}},u={};return n.each(r,function(v,I){var b=I[2],R=I[5];d[I[1]]=b.add,R&&b.add(function(){g=R},r[3-v][2].disable,r[3-v][3].disable,r[0][2].lock,r[0][3].lock),b.add(I[3].fire),u[I[0]]=function(){return u[I[0]+"With"](this===u?void 0:this,arguments),this},u[I[0]+"With"]=b.fireWith}),d.promise(u),m&&m.call(u,u),u},when:function(m){var r=arguments.length,g=r,d=Array(g),u=h.call(arguments),v=n.Deferred(),I=function(b){return function(R){d[b]=this,u[b]=arguments.length>1?h.call(arguments):R,--r||v.resolveWith(d,u)}};if(r<=1&&(c(m,v.done(I(g)).resolve,v.reject,!r),v.state()==="pending"||p(u[g]&&u[g].then)))return v.then();for(;g--;)c(u[g],I(g),v.reject);return v.promise()}}),n}.apply(y,f),i!==void 0&&(O.exports=i)},1009:(O,y,o)=>{var f,i;f=[o(8934),o(6525)],i=function(n){"use strict";var p=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;n.Deferred.exceptionHook=function(h,l){window.console&&window.console.warn&&h&&p.test(h.name)&&window.console.warn("jQuery.Deferred exception: "+h.message,h.stack,l)}}.apply(y,f),i!==void 0&&(O.exports=i)},7722:(O,y,o)=>{var f,i;f=[o(8934),o(7060),o(1133),o(8082),o(2134),o(9031),o(3623),o(7982),o(8138)],i=function(n,p,h,l,s,c,m){"use strict";var r=/^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;n.proxy=function(g,d){var u,v,I;if(typeof d=="string"&&(u=g[d],d=g,g=u),!!s(g))return v=m.call(arguments,2),I=function(){return g.apply(d||this,v.concat(m.call(arguments)))},I.guid=g.guid=g.guid||n.guid++,I},n.holdReady=function(g){g?n.readyWait++:n.ready(!0)},n.isArray=Array.isArray,n.parseJSON=JSON.parse,n.nodeName=p,n.isFunction=s,n.isWindow=c,n.camelCase=h,n.type=l,n.now=Date.now,n.isNumeric=function(g){var d=n.type(g);return(d==="number"||d==="string")&&!isNaN(g-parseFloat(g))},n.trim=function(g){return g==null?"":(g+"").replace(r,"$1")}}.apply(y,f),i!==void 0&&(O.exports=i)},7982:(O,y,o)=>{var f,i;f=[o(8934),o(7178),o(7881)],i=function(n){"use strict";n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(p,h){n.fn[h]=function(l){return this.on(h,l)}})}.apply(y,f),i!==void 0&&(O.exports=i)},8138:(O,y,o)=>{var f,i;f=[o(8934),o(7881),o(1045)],i=function(n){"use strict";n.fn.extend({bind:function(p,h,l){return this.on(p,null,h,l)},unbind:function(p,h){return this.off(p,null,h)},delegate:function(p,h,l,s){return this.on(h,p,l,s)},undelegate:function(p,h,l){return arguments.length===1?this.off(p,"**"):this.off(h,p||"**",l)},hover:function(p,h){return this.mouseenter(p).mouseleave(h||p)}}),n.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(p,h){n.fn[h]=function(l,s){return arguments.length>0?this.on(h,null,l,s):this.trigger(h)}})}.apply(y,f),i!==void 0&&(O.exports=i)},5126:(O,y,o)=>{var f,i;f=[o(8934),o(7163),o(9031),o(8515)],i=function(n,p,h){"use strict";return n.each({Height:"height",Width:"width"},function(l,s){n.each({padding:"inner"+l,content:s,"":"outer"+l},function(c,m){n.fn[m]=function(r,g){var d=arguments.length&&(c||typeof r!="boolean"),u=c||(r===!0||g===!0?"margin":"border");return p(this,function(v,I,b){var R;return h(v)?m.indexOf("outer")===0?v["inner"+l]:v.document.documentElement["client"+l]:v.nodeType===9?(R=v.documentElement,Math.max(v.body["scroll"+l],R["scroll"+l],v.body["offset"+l],R["offset"+l],R["client"+l])):b===void 0?n.css(v,I,u):n.style(v,I,b,u)},s,d?r:void 0,d)}})}),n}.apply(y,f),i!==void 0&&(O.exports=i)},7429:(O,y,o)=>{var f,i;f=[o(8934),o(1133),o(7792),o(2134),o(6871),o(8663),o(5057),o(5626),o(7432),o(9081),o(8516),o(8048),o(1387),o(6525),o(8482),o(2632),o(8515),o(8314)],i=function(n,p,h,l,s,c,m,r,g,d,u){"use strict";var v,I,b=/^(?:toggle|show|hide)$/,R=/queueHooks$/;function A(){I&&(h.hidden===!1&&window.requestAnimationFrame?window.requestAnimationFrame(A):window.setTimeout(A,n.fx.interval),n.fx.tick())}function E(){return window.setTimeout(function(){v=void 0}),v=Date.now()}function _(T,P){var J,F=0,U={height:T};for(P=P?1:0;F<4;F+=2-P)J=m[F],U["margin"+J]=U["padding"+J]=T;return P&&(U.opacity=U.width=T),U}function C(T,P,J){for(var F,U=(x.tweeners[P]||[]).concat(x.tweeners["*"]),M=0,j=U.length;M<j;M++)if(F=U[M].call(J,P,T))return F}function z(T,P,J){var F,U,M,j,B,K,W,Q,re="width"in P||"height"in P,ue=this,X={},Ie=T.style,be=T.nodeType&&r(T),Re=d.get(T,"fxshow");J.queue||(j=n._queueHooks(T,"fx"),j.unqueued==null&&(j.unqueued=0,B=j.empty.fire,j.empty.fire=function(){j.unqueued||B()}),j.unqueued++,ue.always(function(){ue.always(function(){j.unqueued--,n.queue(T,"fx").length||j.empty.fire()})}));for(F in P)if(U=P[F],b.test(U)){if(delete P[F],M=M||U==="toggle",U===(be?"hide":"show"))if(U==="show"&&Re&&Re[F]!==void 0)be=!0;else continue;X[F]=Re&&Re[F]||n.style(T,F)}if(K=!n.isEmptyObject(P),!(!K&&n.isEmptyObject(X))){re&&T.nodeType===1&&(J.overflow=[Ie.overflow,Ie.overflowX,Ie.overflowY],W=Re&&Re.display,W==null&&(W=d.get(T,"display")),Q=n.css(T,"display"),Q==="none"&&(W?Q=W:(u([T],!0),W=T.style.display||W,Q=n.css(T,"display"),u([T]))),(Q==="inline"||Q==="inline-block"&&W!=null)&&n.css(T,"float")==="none"&&(K||(ue.done(function(){Ie.display=W}),W==null&&(Q=Ie.display,W=Q==="none"?"":Q)),Ie.display="inline-block")),J.overflow&&(Ie.overflow="hidden",ue.always(function(){Ie.overflow=J.overflow[0],Ie.overflowX=J.overflow[1],Ie.overflowY=J.overflow[2]})),K=!1;for(F in X)K||(Re?"hidden"in Re&&(be=Re.hidden):Re=d.access(T,"fxshow",{display:W}),M&&(Re.hidden=!be),be&&u([T],!0),ue.done(function(){be||u([T]),d.remove(T,"fxshow");for(F in X)n.style(T,F,X[F])})),K=C(be?Re[F]:0,F,ue),F in Re||(Re[F]=K.start,be&&(K.end=K.start,K.start=0))}}function N(T,P){var J,F,U,M,j;for(J in T)if(F=p(J),U=P[F],M=T[J],Array.isArray(M)&&(U=M[1],M=T[J]=M[0]),J!==F&&(T[F]=M,delete T[J]),j=n.cssHooks[F],j&&"expand"in j){M=j.expand(M),delete T[F];for(J in M)J in T||(T[J]=M[J],P[J]=U)}else P[F]=U}function x(T,P,J){var F,U,M=0,j=x.prefilters.length,B=n.Deferred().always(function(){delete K.elem}),K=function(){if(U)return!1;for(var re=v||E(),ue=Math.max(0,W.startTime+W.duration-re),X=ue/W.duration||0,Ie=1-X,be=0,Re=W.tweens.length;be<Re;be++)W.tweens[be].run(Ie);return B.notifyWith(T,[W,Ie,ue]),Ie<1&&Re?ue:(Re||B.notifyWith(T,[W,1,0]),B.resolveWith(T,[W]),!1)},W=B.promise({elem:T,props:n.extend({},P),opts:n.extend(!0,{specialEasing:{},easing:n.easing._default},J),originalProperties:P,originalOptions:J,startTime:v||E(),duration:J.duration,tweens:[],createTween:function(re,ue){var X=n.Tween(T,W.opts,re,ue,W.opts.specialEasing[re]||W.opts.easing);return W.tweens.push(X),X},stop:function(re){var ue=0,X=re?W.tweens.length:0;if(U)return this;for(U=!0;ue<X;ue++)W.tweens[ue].run(1);return re?(B.notifyWith(T,[W,1,0]),B.resolveWith(T,[W,re])):B.rejectWith(T,[W,re]),this}}),Q=W.props;for(N(Q,W.opts.specialEasing);M<j;M++)if(F=x.prefilters[M].call(W,T,Q,W.opts),F)return l(F.stop)&&(n._queueHooks(W.elem,W.opts.queue).stop=F.stop.bind(F)),F;return n.map(Q,C,W),l(W.opts.start)&&W.opts.start.call(T,W),W.progress(W.opts.progress).done(W.opts.done,W.opts.complete).fail(W.opts.fail).always(W.opts.always),n.fx.timer(n.extend(K,{elem:T,anim:W,queue:W.opts.queue})),W}return n.Animation=n.extend(x,{tweeners:{"*":[function(T,P){var J=this.createTween(T,P);return g(J.elem,T,s.exec(P),J),J}]},tweener:function(T,P){l(T)?(P=T,T=["*"]):T=T.match(c);for(var J,F=0,U=T.length;F<U;F++)J=T[F],x.tweeners[J]=x.tweeners[J]||[],x.tweeners[J].unshift(P)},prefilters:[z],prefilter:function(T,P){P?x.prefilters.unshift(T):x.prefilters.push(T)}}),n.speed=function(T,P,J){var F=T&&typeof T=="object"?n.extend({},T):{complete:J||!J&&P||l(T)&&T,duration:T,easing:J&&P||P&&!l(P)&&P};return n.fx.off?F.duration=0:typeof F.duration!="number"&&(F.duration in n.fx.speeds?F.duration=n.fx.speeds[F.duration]:F.duration=n.fx.speeds._default),(F.queue==null||F.queue===!0)&&(F.queue="fx"),F.old=F.complete,F.complete=function(){l(F.old)&&F.old.call(this),F.queue&&n.dequeue(this,F.queue)},F},n.fn.extend({fadeTo:function(T,P,J,F){return this.filter(r).css("opacity",0).show().end().animate({opacity:P},T,J,F)},animate:function(T,P,J,F){var U=n.isEmptyObject(T),M=n.speed(P,J,F),j=function(){var B=x(this,n.extend({},T),M);(U||d.get(this,"finish"))&&B.stop(!0)};return j.finish=j,U||M.queue===!1?this.each(j):this.queue(M.queue,j)},stop:function(T,P,J){var F=function(U){var M=U.stop;delete U.stop,M(J)};return typeof T!="string"&&(J=P,P=T,T=void 0),P&&this.queue(T||"fx",[]),this.each(function(){var U=!0,M=T!=null&&T+"queueHooks",j=n.timers,B=d.get(this);if(M)B[M]&&B[M].stop&&F(B[M]);else for(M in B)B[M]&&B[M].stop&&R.test(M)&&F(B[M]);for(M=j.length;M--;)j[M].elem===this&&(T==null||j[M].queue===T)&&(j[M].anim.stop(J),U=!1,j.splice(M,1));(U||!J)&&n.dequeue(this,T)})},finish:function(T){return T!==!1&&(T=T||"fx"),this.each(function(){var P,J=d.get(this),F=J[T+"queue"],U=J[T+"queueHooks"],M=n.timers,j=F?F.length:0;for(J.finish=!0,n.queue(this,T,[]),U&&U.stop&&U.stop.call(this,!0),P=M.length;P--;)M[P].elem===this&&M[P].queue===T&&(M[P].anim.stop(!0),M.splice(P,1));for(P=0;P<j;P++)F[P]&&F[P].finish&&F[P].finish.call(this);delete J.finish})}}),n.each(["toggle","show","hide"],function(T,P){var J=n.fn[P];n.fn[P]=function(F,U,M){return F==null||typeof F=="boolean"?J.apply(this,arguments):this.animate(_(P,!0),F,U,M)}}),n.each({slideDown:_("show"),slideUp:_("hide"),slideToggle:_("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(T,P){n.fn[T]=function(J,F,U){return this.animate(P,J,F,U)}}),n.timers=[],n.fx.tick=function(){var T,P=0,J=n.timers;for(v=Date.now();P<J.length;P++)T=J[P],!T()&&J[P]===T&&J.splice(P--,1);J.length||n.fx.stop(),v=void 0},n.fx.timer=function(T){n.timers.push(T),n.fx.start()},n.fx.interval=13,n.fx.start=function(){I||(I=!0,A())},n.fx.stop=function(){I=null},n.fx.speeds={slow:600,fast:200,_default:400},n}.apply(y,f),i!==void 0&&(O.exports=i)},8314:(O,y,o)=>{var f,i;f=[o(8934),o(3997),o(8515)],i=function(n,p){"use strict";function h(l,s,c,m,r){return new h.prototype.init(l,s,c,m,r)}n.Tween=h,h.prototype={constructor:h,init:function(l,s,c,m,r,g){this.elem=l,this.prop=c,this.easing=r||n.easing._default,this.options=s,this.start=this.now=this.cur(),this.end=m,this.unit=g||(n.cssNumber[c]?"":"px")},cur:function(){var l=h.propHooks[this.prop];return l&&l.get?l.get(this):h.propHooks._default.get(this)},run:function(l){var s,c=h.propHooks[this.prop];return this.options.duration?this.pos=s=n.easing[this.easing](l,this.options.duration*l,0,1,this.options.duration):this.pos=s=l,this.now=(this.end-this.start)*s+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):h.propHooks._default.set(this),this}},h.prototype.init.prototype=h.prototype,h.propHooks={_default:{get:function(l){var s;return l.elem.nodeType!==1||l.elem[l.prop]!=null&&l.elem.style[l.prop]==null?l.elem[l.prop]:(s=n.css(l.elem,l.prop,""),!s||s==="auto"?0:s)},set:function(l){n.fx.step[l.prop]?n.fx.step[l.prop](l):l.elem.nodeType===1&&(n.cssHooks[l.prop]||l.elem.style[p(l.prop)]!=null)?n.style(l.elem,l.prop,l.now+l.unit):l.elem[l.prop]=l.now}}},h.propHooks.scrollTop=h.propHooks.scrollLeft={set:function(l){l.elem.nodeType&&l.elem.parentNode&&(l.elem[l.prop]=l.now)}},n.easing={linear:function(l){return l},swing:function(l){return .5-Math.cos(l*Math.PI)/2},_default:"swing"},n.fx=h.prototype.init,n.fx.step={}}.apply(y,f),i!==void 0&&(O.exports=i)},8393:(O,y,o)=>{var f,i;f=[o(8934),o(655),o(7429)],i=function(n){"use strict";n.expr.pseudos.animated=function(p){return n.grep(n.timers,function(h){return p===h.elem}).length}}.apply(y,f),i!==void 0&&(O.exports=i)},7881:(O,y,o)=>{var f,i;f=[o(8934),o(7792),o(7730),o(2134),o(8663),o(8104),o(3623),o(2238),o(9081),o(7060),o(8048),o(655)],i=function(n,p,h,l,s,c,m,r,g,d){"use strict";var u=/^([^.]*)(?:\.(.+)|)/;function v(){return!0}function I(){return!1}function b(A,E,_,C,z,N){var x,T;if(typeof E=="object"){typeof _!="string"&&(C=C||_,_=void 0);for(T in E)b(A,T,_,C,E[T],N);return A}if(C==null&&z==null?(z=_,C=_=void 0):z==null&&(typeof _=="string"?(z=C,C=void 0):(z=C,C=_,_=void 0)),z===!1)z=I;else if(!z)return A;return N===1&&(x=z,z=function(P){return n().off(P),x.apply(this,arguments)},z.guid=x.guid||(x.guid=n.guid++)),A.each(function(){n.event.add(this,E,z,C,_)})}n.event={global:{},add:function(A,E,_,C,z){var N,x,T,P,J,F,U,M,j,B,K,W=g.get(A);if(r(A))for(_.handler&&(N=_,_=N.handler,z=N.selector),z&&n.find.matchesSelector(h,z),_.guid||(_.guid=n.guid++),(P=W.events)||(P=W.events=Object.create(null)),(x=W.handle)||(x=W.handle=function(Q){return typeof n!="undefined"&&n.event.triggered!==Q.type?n.event.dispatch.apply(A,arguments):void 0}),E=(E||"").match(s)||[""],J=E.length;J--;)T=u.exec(E[J])||[],j=K=T[1],B=(T[2]||"").split(".").sort(),j&&(U=n.event.special[j]||{},j=(z?U.delegateType:U.bindType)||j,U=n.event.special[j]||{},F=n.extend({type:j,origType:K,data:C,handler:_,guid:_.guid,selector:z,needsContext:z&&n.expr.match.needsContext.test(z),namespace:B.join(".")},N),(M=P[j])||(M=P[j]=[],M.delegateCount=0,(!U.setup||U.setup.call(A,C,B,x)===!1)&&A.addEventListener&&A.addEventListener(j,x)),U.add&&(U.add.call(A,F),F.handler.guid||(F.handler.guid=_.guid)),z?M.splice(M.delegateCount++,0,F):M.push(F),n.event.global[j]=!0)},remove:function(A,E,_,C,z){var N,x,T,P,J,F,U,M,j,B,K,W=g.hasData(A)&&g.get(A);if(!(!W||!(P=W.events))){for(E=(E||"").match(s)||[""],J=E.length;J--;){if(T=u.exec(E[J])||[],j=K=T[1],B=(T[2]||"").split(".").sort(),!j){for(j in P)n.event.remove(A,j+E[J],_,C,!0);continue}for(U=n.event.special[j]||{},j=(C?U.delegateType:U.bindType)||j,M=P[j]||[],T=T[2]&&new RegExp("(^|\\.)"+B.join("\\.(?:.*\\.|)")+"(\\.|$)"),x=N=M.length;N--;)F=M[N],(z||K===F.origType)&&(!_||_.guid===F.guid)&&(!T||T.test(F.namespace))&&(!C||C===F.selector||C==="**"&&F.selector)&&(M.splice(N,1),F.selector&&M.delegateCount--,U.remove&&U.remove.call(A,F));x&&!M.length&&((!U.teardown||U.teardown.call(A,B,W.handle)===!1)&&n.removeEvent(A,j,W.handle),delete P[j])}n.isEmptyObject(P)&&g.remove(A,"handle events")}},dispatch:function(A){var E,_,C,z,N,x,T=new Array(arguments.length),P=n.event.fix(A),J=(g.get(this,"events")||Object.create(null))[P.type]||[],F=n.event.special[P.type]||{};for(T[0]=P,E=1;E<arguments.length;E++)T[E]=arguments[E];if(P.delegateTarget=this,!(F.preDispatch&&F.preDispatch.call(this,P)===!1)){for(x=n.event.handlers.call(this,P,J),E=0;(z=x[E++])&&!P.isPropagationStopped();)for(P.currentTarget=z.elem,_=0;(N=z.handlers[_++])&&!P.isImmediatePropagationStopped();)(!P.rnamespace||N.namespace===!1||P.rnamespace.test(N.namespace))&&(P.handleObj=N,P.data=N.data,C=((n.event.special[N.origType]||{}).handle||N.handler).apply(z.elem,T),C!==void 0&&(P.result=C)===!1&&(P.preventDefault(),P.stopPropagation()));return F.postDispatch&&F.postDispatch.call(this,P),P.result}},handlers:function(A,E){var _,C,z,N,x,T=[],P=E.delegateCount,J=A.target;if(P&&J.nodeType&&!(A.type==="click"&&A.button>=1)){for(;J!==this;J=J.parentNode||this)if(J.nodeType===1&&!(A.type==="click"&&J.disabled===!0)){for(N=[],x={},_=0;_<P;_++)C=E[_],z=C.selector+" ",x[z]===void 0&&(x[z]=C.needsContext?n(z,this).index(J)>-1:n.find(z,this,null,[J]).length),x[z]&&N.push(C);N.length&&T.push({elem:J,handlers:N})}}return J=this,P<E.length&&T.push({elem:J,handlers:E.slice(P)}),T},addProp:function(A,E){Object.defineProperty(n.Event.prototype,A,{enumerable:!0,configurable:!0,get:l(E)?function(){if(this.originalEvent)return E(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[A]},set:function(_){Object.defineProperty(this,A,{enumerable:!0,configurable:!0,writable:!0,value:_})}})},fix:function(A){return A[n.expando]?A:new n.Event(A)},special:{load:{noBubble:!0},click:{setup:function(A){var E=this||A;return c.test(E.type)&&E.click&&d(E,"input")&&R(E,"click",!0),!1},trigger:function(A){var E=this||A;return c.test(E.type)&&E.click&&d(E,"input")&&R(E,"click"),!0},_default:function(A){var E=A.target;return c.test(E.type)&&E.click&&d(E,"input")&&g.get(E,"click")||d(E,"a")}},beforeunload:{postDispatch:function(A){A.result!==void 0&&A.originalEvent&&(A.originalEvent.returnValue=A.result)}}}};function R(A,E,_){if(!_){g.get(A,E)===void 0&&n.event.add(A,E,v);return}g.set(A,E,!1),n.event.add(A,E,{namespace:!1,handler:function(C){var z,N=g.get(this,E);if(C.isTrigger&1&&this[E]){if(N)(n.event.special[E]||{}).delegateType&&C.stopPropagation();else if(N=m.call(arguments),g.set(this,E,N),this[E](),z=g.get(this,E),g.set(this,E,!1),N!==z)return C.stopImmediatePropagation(),C.preventDefault(),z}else N&&(g.set(this,E,n.event.trigger(N[0],N.slice(1),this)),C.stopPropagation(),C.isImmediatePropagationStopped=v)}})}return n.removeEvent=function(A,E,_){A.removeEventListener&&A.removeEventListener(E,_)},n.Event=function(A,E){if(!(this instanceof n.Event))return new n.Event(A,E);A&&A.type?(this.originalEvent=A,this.type=A.type,this.isDefaultPrevented=A.defaultPrevented||A.defaultPrevented===void 0&&A.returnValue===!1?v:I,this.target=A.target&&A.target.nodeType===3?A.target.parentNode:A.target,this.currentTarget=A.currentTarget,this.relatedTarget=A.relatedTarget):this.type=A,E&&n.extend(this,E),this.timeStamp=A&&A.timeStamp||Date.now(),this[n.expando]=!0},n.Event.prototype={constructor:n.Event,isDefaultPrevented:I,isPropagationStopped:I,isImmediatePropagationStopped:I,isSimulated:!1,preventDefault:function(){var A=this.originalEvent;this.isDefaultPrevented=v,A&&!this.isSimulated&&A.preventDefault()},stopPropagation:function(){var A=this.originalEvent;this.isPropagationStopped=v,A&&!this.isSimulated&&A.stopPropagation()},stopImmediatePropagation:function(){var A=this.originalEvent;this.isImmediatePropagationStopped=v,A&&!this.isSimulated&&A.stopImmediatePropagation(),this.stopPropagation()}},n.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,char:!0,code:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:!0},n.event.addProp),n.each({focus:"focusin",blur:"focusout"},function(A,E){function _(C){if(p.documentMode){var z=g.get(this,"handle"),N=n.event.fix(C);N.type=C.type==="focusin"?"focus":"blur",N.isSimulated=!0,z(C),N.target===N.currentTarget&&z(N)}else n.event.simulate(E,C.target,n.event.fix(C))}n.event.special[A]={setup:function(){var C;if(R(this,A,!0),p.documentMode)C=g.get(this,E),C||this.addEventListener(E,_),g.set(this,E,(C||0)+1);else return!1},trigger:function(){return R(this,A),!0},teardown:function(){var C;if(p.documentMode)C=g.get(this,E)-1,C?g.set(this,E,C):(this.removeEventListener(E,_),g.remove(this,E));else return!1},_default:function(C){return g.get(C.target,A)},delegateType:E},n.event.special[E]={setup:function(){var C=this.ownerDocument||this.document||this,z=p.documentMode?this:C,N=g.get(z,E);N||(p.documentMode?this.addEventListener(E,_):C.addEventListener(A,_,!0)),g.set(z,E,(N||0)+1)},teardown:function(){var C=this.ownerDocument||this.document||this,z=p.documentMode?this:C,N=g.get(z,E)-1;N?g.set(z,E,N):(p.documentMode?this.removeEventListener(E,_):C.removeEventListener(A,_,!0),g.remove(z,E))}}}),n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(A,E){n.event.special[A]={delegateType:E,bindType:E,handle:function(_){var C,z=this,N=_.relatedTarget,x=_.handleObj;return(!N||N!==z&&!n.contains(z,N))&&(_.type=x.origType,C=x.handler.apply(this,arguments),_.type=E),C}}}),n.fn.extend({on:function(A,E,_,C){return b(this,A,E,_,C)},one:function(A,E,_,C){return b(this,A,E,_,C,1)},off:function(A,E,_){var C,z;if(A&&A.preventDefault&&A.handleObj)return C=A.handleObj,n(A.delegateTarget).off(C.namespace?C.origType+"."+C.namespace:C.origType,C.selector,C.handler),this;if(typeof A=="object"){for(z in A)this.off(z,E,A[z]);return this}return(E===!1||typeof E=="function")&&(_=E,E=void 0),_===!1&&(_=I),this.each(function(){n.event.remove(this,A,_,E)})}}),n}.apply(y,f),i!==void 0&&(O.exports=i)},1045:(O,y,o)=>{var f,i;f=[o(8934),o(7792),o(9081),o(2238),o(9694),o(2134),o(9031),o(7881)],i=function(n,p,h,l,s,c,m){"use strict";var r=/^(?:focusinfocus|focusoutblur)$/,g=function(d){d.stopPropagation()};return n.extend(n.event,{trigger:function(d,u,v,I){var b,R,A,E,_,C,z,N,x=[v||p],T=s.call(d,"type")?d.type:d,P=s.call(d,"namespace")?d.namespace.split("."):[];if(R=N=A=v=v||p,!(v.nodeType===3||v.nodeType===8)&&!r.test(T+n.event.triggered)&&(T.indexOf(".")>-1&&(P=T.split("."),T=P.shift(),P.sort()),_=T.indexOf(":")<0&&"on"+T,d=d[n.expando]?d:new n.Event(T,typeof d=="object"&&d),d.isTrigger=I?2:3,d.namespace=P.join("."),d.rnamespace=d.namespace?new RegExp("(^|\\.)"+P.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,d.result=void 0,d.target||(d.target=v),u=u==null?[d]:n.makeArray(u,[d]),z=n.event.special[T]||{},!(!I&&z.trigger&&z.trigger.apply(v,u)===!1))){if(!I&&!z.noBubble&&!m(v)){for(E=z.delegateType||T,r.test(E+T)||(R=R.parentNode);R;R=R.parentNode)x.push(R),A=R;A===(v.ownerDocument||p)&&x.push(A.defaultView||A.parentWindow||window)}for(b=0;(R=x[b++])&&!d.isPropagationStopped();)N=R,d.type=b>1?E:z.bindType||T,C=(h.get(R,"events")||Object.create(null))[d.type]&&h.get(R,"handle"),C&&C.apply(R,u),C=_&&R[_],C&&C.apply&&l(R)&&(d.result=C.apply(R,u),d.result===!1&&d.preventDefault());return d.type=T,!I&&!d.isDefaultPrevented()&&(!z._default||z._default.apply(x.pop(),u)===!1)&&l(v)&&_&&c(v[T])&&!m(v)&&(A=v[_],A&&(v[_]=null),n.event.triggered=T,d.isPropagationStopped()&&N.addEventListener(T,g),v[T](),d.isPropagationStopped()&&N.removeEventListener(T,g),n.event.triggered=void 0,A&&(v[_]=A)),d.result}},simulate:function(d,u,v){var I=n.extend(new n.Event,v,{type:d,isSimulated:!0});n.event.trigger(I,null,u)}}),n.fn.extend({trigger:function(d,u){return this.each(function(){n.event.trigger(d,u,this)})},triggerHandler:function(d,u){var v=this[0];if(v)return n.event.trigger(d,u,v,!0)}}),n}.apply(y,f),i!==void 0&&(O.exports=i)},692:(O,y,o)=>{var f,i,f,i;f=[o(8934)],i=function(n){"use strict";f=[],i=function(){return n}.apply(y,f),i!==void 0&&(O.exports=i)}.apply(y,f),i!==void 0&&(O.exports=i)},4278:(O,y,o)=>{var f,i;f=[o(8934)],i=function(n){"use strict";var p=window.jQuery,h=window.$;n.noConflict=function(l){return window.$===n&&(window.$=h),l&&window.jQuery===n&&(window.jQuery=p),n},typeof noGlobal=="undefined"&&(window.jQuery=window.$=n)}.apply(y,f),i!==void 0&&(O.exports=i)},4002:(O,y,o)=>{var f,i;f=[o(8934),o(655),o(8482),o(8924),o(6525),o(1009),o(5703),o(1786),o(1387),o(6572),o(8468),o(7881),o(2632),o(8123),o(5594),o(8515),o(2365),o(5385),o(7178),o(8853),o(5488),o(7533),o(4581),o(461),o(2889),o(7429),o(8393),o(5356),o(5126),o(7722),o(692),o(4278)],i=function(n){"use strict";return n}.apply(y,f),i!==void 0&&(O.exports=i)},2632:(O,y,o)=>{var f,i;f=[o(8934),o(70),o(3932),o(2134),o(1780),o(8104),o(7163),o(9422),o(8950),o(5219),o(2455),o(7162),o(3360),o(8771),o(9081),o(2109),o(2238),o(1224),o(7060),o(8048),o(8482),o(655),o(7881)],i=function(n,p,h,l,s,c,m,r,g,d,u,v,I,b,R,A,E,_,C){"use strict";var z=/<script|<style|<link/i,N=/checked\s*(?:[^=]|=\s*.checked.)/i,x=/^\s*<!\[CDATA\[|\]\]>\s*$/g;function T(B,K){return C(B,"table")&&C(K.nodeType!==11?K:K.firstChild,"tr")&&n(B).children("tbody")[0]||B}function P(B){return B.type=(B.getAttribute("type")!==null)+"/"+B.type,B}function J(B){return(B.type||"").slice(0,5)==="true/"?B.type=B.type.slice(5):B.removeAttribute("type"),B}function F(B,K){var W,Q,re,ue,X,Ie,be;if(K.nodeType===1){if(R.hasData(B)&&(ue=R.get(B),be=ue.events,be)){R.remove(K,"handle events");for(re in be)for(W=0,Q=be[re].length;W<Q;W++)n.event.add(K,re,be[re][W])}A.hasData(B)&&(X=A.access(B),Ie=n.extend({},X),A.set(K,Ie))}}function U(B,K){var W=K.nodeName.toLowerCase();W==="input"&&c.test(B.type)?K.checked=B.checked:(W==="input"||W==="textarea")&&(K.defaultValue=B.defaultValue)}function M(B,K,W,Q){K=h(K);var re,ue,X,Ie,be,Re,qe=0,ht=B.length,At=ht-1,vt=K[0],kt=l(vt);if(kt||ht>1&&typeof vt=="string"&&!b.checkClone&&N.test(vt))return B.each(function(we){var mt=B.eq(we);kt&&(K[0]=vt.call(this,we,mt.html())),M(mt,K,W,Q)});if(ht&&(re=I(K,B[0].ownerDocument,!1,B,Q),ue=re.firstChild,re.childNodes.length===1&&(re=ue),ue||Q)){for(X=n.map(u(re,"script"),P),Ie=X.length;qe<ht;qe++)be=re,qe!==At&&(be=n.clone(be,!0,!0),Ie&&n.merge(X,u(be,"script"))),W.call(B[qe],be,qe);if(Ie)for(Re=X[X.length-1].ownerDocument,n.map(X,J),qe=0;qe<Ie;qe++)be=X[qe],g.test(be.type||"")&&!R.access(be,"globalEval")&&n.contains(Re,be)&&(be.src&&(be.type||"").toLowerCase()!=="module"?n._evalUrl&&!be.noModule&&n._evalUrl(be.src,{nonce:be.nonce||be.getAttribute("nonce")},Re):_(be.textContent.replace(x,""),be,Re))}return B}function j(B,K,W){for(var Q,re=K?n.filter(K,B):B,ue=0;(Q=re[ue])!=null;ue++)!W&&Q.nodeType===1&&n.cleanData(u(Q)),Q.parentNode&&(W&&p(Q)&&v(u(Q,"script")),Q.parentNode.removeChild(Q));return B}return n.extend({htmlPrefilter:function(B){return B},clone:function(B,K,W){var Q,re,ue,X,Ie=B.cloneNode(!0),be=p(B);if(!b.noCloneChecked&&(B.nodeType===1||B.nodeType===11)&&!n.isXMLDoc(B))for(X=u(Ie),ue=u(B),Q=0,re=ue.length;Q<re;Q++)U(ue[Q],X[Q]);if(K)if(W)for(ue=ue||u(B),X=X||u(Ie),Q=0,re=ue.length;Q<re;Q++)F(ue[Q],X[Q]);else F(B,Ie);return X=u(Ie,"script"),X.length>0&&v(X,!be&&u(B,"script")),Ie},cleanData:function(B){for(var K,W,Q,re=n.event.special,ue=0;(W=B[ue])!==void 0;ue++)if(E(W)){if(K=W[R.expando]){if(K.events)for(Q in K.events)re[Q]?n.event.remove(W,Q):n.removeEvent(W,Q,K.handle);W[R.expando]=void 0}W[A.expando]&&(W[A.expando]=void 0)}}}),n.fn.extend({detach:function(B){return j(this,B,!0)},remove:function(B){return j(this,B)},text:function(B){return m(this,function(K){return K===void 0?n.text(this):this.empty().each(function(){(this.nodeType===1||this.nodeType===11||this.nodeType===9)&&(this.textContent=K)})},null,B,arguments.length)},append:function(){return M(this,arguments,function(B){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){var K=T(this,B);K.appendChild(B)}})},prepend:function(){return M(this,arguments,function(B){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){var K=T(this,B);K.insertBefore(B,K.firstChild)}})},before:function(){return M(this,arguments,function(B){this.parentNode&&this.parentNode.insertBefore(B,this)})},after:function(){return M(this,arguments,function(B){this.parentNode&&this.parentNode.insertBefore(B,this.nextSibling)})},empty:function(){for(var B,K=0;(B=this[K])!=null;K++)B.nodeType===1&&(n.cleanData(u(B,!1)),B.textContent="");return this},clone:function(B,K){return B=B==null?!1:B,K=K==null?B:K,this.map(function(){return n.clone(this,B,K)})},html:function(B){return m(this,function(K){var W=this[0]||{},Q=0,re=this.length;if(K===void 0&&W.nodeType===1)return W.innerHTML;if(typeof K=="string"&&!z.test(K)&&!d[(r.exec(K)||["",""])[1].toLowerCase()]){K=n.htmlPrefilter(K);try{for(;Q<re;Q++)W=this[Q]||{},W.nodeType===1&&(n.cleanData(u(W,!1)),W.innerHTML=K);W=0}catch(ue){}}W&&this.empty().append(K)},null,B,arguments.length)},replaceWith:function(){var B=[];return M(this,arguments,function(K){var W=this.parentNode;n.inArray(this,B)<0&&(n.cleanData(u(this)),W&&W.replaceChild(K,this))},B)}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(B,K){n.fn[B]=function(W){for(var Q,re=[],ue=n(W),X=ue.length-1,Ie=0;Ie<=X;Ie++)Q=Ie===X?this:this.clone(!0),n(ue[Ie])[K](Q),s.apply(re,Q.get());return this.pushStack(re)}}),n}.apply(y,f),i!==void 0&&(O.exports=i)},8123:(O,y,o)=>{var f,i;f=[o(7178)],i=function(n){"use strict";return n._evalUrl=function(p,h,l){return n.ajax({url:p,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,converters:{"text script":function(){}},dataFilter:function(s){n.globalEval(s,h,l)}})},n._evalUrl}.apply(y,f),i!==void 0&&(O.exports=i)},3360:(O,y,o)=>{var f,i;f=[o(8934),o(8082),o(70),o(9422),o(8950),o(5219),o(2455),o(7162)],i=function(n,p,h,l,s,c,m,r){"use strict";var g=/<|&#?\w+;/;function d(u,v,I,b,R){for(var A,E,_,C,z,N,x=v.createDocumentFragment(),T=[],P=0,J=u.length;P<J;P++)if(A=u[P],A||A===0)if(p(A)==="object")n.merge(T,A.nodeType?[A]:A);else if(!g.test(A))T.push(v.createTextNode(A));else{for(E=E||x.appendChild(v.createElement("div")),_=(l.exec(A)||["",""])[1].toLowerCase(),C=c[_]||c._default,E.innerHTML=C[1]+n.htmlPrefilter(A)+C[2],N=C[0];N--;)E=E.lastChild;n.merge(T,E.childNodes),E=x.firstChild,E.textContent=""}for(x.textContent="",P=0;A=T[P++];){if(b&&n.inArray(A,b)>-1){R&&R.push(A);continue}if(z=h(A),E=m(x.appendChild(A),"script"),z&&r(E),I)for(N=0;A=E[N++];)s.test(A.type||"")&&I.push(A)}return x}return d}.apply(y,f),i!==void 0&&(O.exports=i)},2455:(O,y,o)=>{var f,i;f=[o(8934),o(7060)],i=function(n,p){"use strict";function h(l,s){var c;return typeof l.getElementsByTagName!="undefined"?c=l.getElementsByTagName(s||"*"):typeof l.querySelectorAll!="undefined"?c=l.querySelectorAll(s||"*"):c=[],s===void 0||s&&p(l,s)?n.merge([l],c):c}return h}.apply(y,f),i!==void 0&&(O.exports=i)},7162:(O,y,o)=>{var f,i;f=[o(9081)],i=function(n){"use strict";function p(h,l){for(var s=0,c=h.length;s<c;s++)n.set(h[s],"globalEval",!l||n.get(l[s],"globalEval"))}return p}.apply(y,f),i!==void 0&&(O.exports=i)},8771:(O,y,o)=>{var f,i;f=[o(7792),o(9523)],i=function(n,p){"use strict";return function(){var h=n.createDocumentFragment(),l=h.appendChild(n.createElement("div")),s=n.createElement("input");s.setAttribute("type","radio"),s.setAttribute("checked","checked"),s.setAttribute("name","t"),l.appendChild(s),p.checkClone=l.cloneNode(!0).cloneNode(!0).lastChild.checked,l.innerHTML="<textarea>x</textarea>",p.noCloneChecked=!!l.cloneNode(!0).lastChild.defaultValue,l.innerHTML="<option></option>",p.option=!!l.lastChild}(),p}.apply(y,f),i!==void 0&&(O.exports=i)},8950:(O,y,o)=>{var f;f=function(){"use strict";return/^$|^module$|\/(?:java|ecma)script/i}.call(y,o,y,O),f!==void 0&&(O.exports=f)},9422:(O,y,o)=>{var f;f=function(){"use strict";return/<([a-z][^\/\0>\x20\t\r\n\f]*)/i}.call(y,o,y,O),f!==void 0&&(O.exports=f)},5219:(O,y,o)=>{var f,i;f=[o(8771)],i=function(n){"use strict";var p={thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};return p.tbody=p.tfoot=p.colgroup=p.caption=p.thead,p.th=p.td,n.option||(p.optgroup=p.option=[1,"<select multiple='multiple'>","</select>"]),p}.apply(y,f),i!==void 0&&(O.exports=i)},5356:(O,y,o)=>{var f,i;f=[o(8934),o(7163),o(7730),o(2134),o(618),o(610),o(3781),o(4405),o(9031),o(8048),o(8515),o(655)],i=function(n,p,h,l,s,c,m,r,g){"use strict";return n.offset={setOffset:function(d,u,v){var I,b,R,A,E,_,C,z=n.css(d,"position"),N=n(d),x={};z==="static"&&(d.style.position="relative"),E=N.offset(),R=n.css(d,"top"),_=n.css(d,"left"),C=(z==="absolute"||z==="fixed")&&(R+_).indexOf("auto")>-1,C?(I=N.position(),A=I.top,b=I.left):(A=parseFloat(R)||0,b=parseFloat(_)||0),l(u)&&(u=u.call(d,v,n.extend({},E))),u.top!=null&&(x.top=u.top-E.top+A),u.left!=null&&(x.left=u.left-E.left+b),"using"in u?u.using.call(d,x):N.css(x)}},n.fn.extend({offset:function(d){if(arguments.length)return d===void 0?this:this.each(function(b){n.offset.setOffset(this,d,b)});var u,v,I=this[0];if(I)return I.getClientRects().length?(u=I.getBoundingClientRect(),v=I.ownerDocument.defaultView,{top:u.top+v.pageYOffset,left:u.left+v.pageXOffset}):{top:0,left:0}},position:function(){if(this[0]){var d,u,v,I=this[0],b={top:0,left:0};if(n.css(I,"position")==="fixed")u=I.getBoundingClientRect();else{for(u=this.offset(),v=I.ownerDocument,d=I.offsetParent||v.documentElement;d&&(d===v.body||d===v.documentElement)&&n.css(d,"position")==="static";)d=d.parentNode;d&&d!==I&&d.nodeType===1&&(b=n(d).offset(),b.top+=n.css(d,"borderTopWidth",!0),b.left+=n.css(d,"borderLeftWidth",!0))}return{top:u.top-b.top-n.css(I,"marginTop",!0),left:u.left-b.left-n.css(I,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var d=this.offsetParent;d&&n.css(d,"position")==="static";)d=d.offsetParent;return d||h})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(d,u){var v=u==="pageYOffset";n.fn[d]=function(I){return p(this,function(b,R,A){var E;if(g(b)?E=b:b.nodeType===9&&(E=b.defaultView),A===void 0)return E?E[u]:b[R];E?E.scrollTo(v?E.pageXOffset:A,v?A:E.pageYOffset):b[R]=A},d,I,arguments.length)}}),n.each(["top","left"],function(d,u){n.cssHooks[u]=m(r.pixelPosition,function(v,I){if(I)return I=c(v,u),s.test(I)?n(v).position()[u]+"px":I})}),n}.apply(y,f),i!==void 0&&(O.exports=i)},1387:(O,y,o)=>{var f,i;f=[o(8934),o(9081),o(6525),o(8924)],i=function(n,p){"use strict";return n.extend({queue:function(h,l,s){var c;if(h)return l=(l||"fx")+"queue",c=p.get(h,l),s&&(!c||Array.isArray(s)?c=p.access(h,l,n.makeArray(s)):c.push(s)),c||[]},dequeue:function(h,l){l=l||"fx";var s=n.queue(h,l),c=s.length,m=s.shift(),r=n._queueHooks(h,l),g=function(){n.dequeue(h,l)};m==="inprogress"&&(m=s.shift(),c--),m&&(l==="fx"&&s.unshift("inprogress"),delete r.stop,m.call(h,g,r)),!c&&r&&r.empty.fire()},_queueHooks:function(h,l){var s=l+"queueHooks";return p.get(h,s)||p.access(h,s,{empty:n.Callbacks("once memory").add(function(){p.remove(h,[l+"queue",s])})})}}),n.fn.extend({queue:function(h,l){var s=2;return typeof h!="string"&&(l=h,h="fx",s--),arguments.length<s?n.queue(this[0],h):l===void 0?this:this.each(function(){var c=n.queue(this,h,l);n._queueHooks(this,h),h==="fx"&&c[0]!=="inprogress"&&n.dequeue(this,h)})},dequeue:function(h){return this.each(function(){n.dequeue(this,h)})},clearQueue:function(h){return this.queue(h||"fx",[])},promise:function(h,l){var s,c=1,m=n.Deferred(),r=this,g=this.length,d=function(){--c||m.resolveWith(r,[r])};for(typeof h!="string"&&(l=h,h=void 0),h=h||"fx";g--;)s=p.get(r[g],h+"queueHooks"),s&&s.empty&&(c++,s.empty.add(d));return d(),m.promise(l)}}),n}.apply(y,f),i!==void 0&&(O.exports=i)},6572:(O,y,o)=>{var f,i;f=[o(8934),o(1387),o(7429)],i=function(n){"use strict";return n.fn.delay=function(p,h){return p=n.fx&&n.fx.speeds[p]||p,h=h||"fx",this.queue(h,function(l,s){var c=window.setTimeout(l,p);s.stop=function(){window.clearTimeout(c)}})},n.fn.delay}.apply(y,f),i!==void 0&&(O.exports=i)},655:(O,y,o)=>{var f,i;f=[o(8934),o(7060),o(3727),o(7792),o(5431),o(9694),o(6683),o(1780),o(3623),o(5871),o(9133),o(2992),o(9508),o(9523),o(712),o(7232)],i=function(n,p,h,l,s,c,m,r,g,d,u,v,I,b){"use strict";var R=l,A=r;(function(){var E,_,C,z,N,x=A,T,P,J,F,U,M=n.expando,j=0,B=0,K=Ee(),W=Ee(),Q=Ee(),re=Ee(),ue=function(Z,H){return Z===H&&(N=!0),0},X="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",Ie="(?:\\\\[\\da-fA-F]{1,6}"+v+"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",be="\\["+v+"*("+Ie+")(?:"+v+"*([*^$|!~]?=)"+v+`*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(`+Ie+"))|)"+v+"*\\]",Re=":("+Ie+`)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|`+be+")*)|.*)\\)|)",qe=new RegExp(v+"+","g"),ht=new RegExp("^"+v+"*,"+v+"*"),At=new RegExp("^"+v+"*([>+~]|"+v+")"+v+"*"),vt=new RegExp(v+"|>"),kt=new RegExp(Re),we=new RegExp("^"+Ie+"$"),mt={ID:new RegExp("^#("+Ie+")"),CLASS:new RegExp("^\\.("+Ie+")"),TAG:new RegExp("^("+Ie+"|[*])"),ATTR:new RegExp("^"+be),PSEUDO:new RegExp("^"+Re),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+v+"*(even|odd|(([+-]|)(\\d*)n|)"+v+"*(?:([+-]|)"+v+"*(\\d+)|))"+v+"*\\)|)","i"),bool:new RegExp("^(?:"+X+")$","i"),needsContext:new RegExp("^"+v+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+v+"*((?:-\\d)?\\d*)"+v+"*\\)|)(?=[^-]|$)","i")},Be=/^(?:input|select|textarea|button)$/i,Ue=/^h\d$/i,Lt=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ze=/[+~]/,oe=new RegExp("\\\\[\\da-fA-F]{1,6}"+v+"?|\\\\([^\\r\\n\\f])","g"),_e=function(Z,H){var q="0x"+Z.slice(1)-65536;return H||(q<0?String.fromCharCode(q+65536):String.fromCharCode(q>>10|55296,q&1023|56320))},xe=function(){Tt()},ae=Wt(function(Z){return Z.disabled===!0&&p(Z,"fieldset")},{dir:"parentNode",next:"legend"});function ve(){try{return T.activeElement}catch(Z){}}try{x.apply(h=g.call(R.childNodes),R.childNodes),h[R.childNodes.length].nodeType}catch(Z){x={apply:function(H,q){A.apply(H,g.call(q))},call:function(H){A.apply(H,g.call(arguments,1))}}}function pe(Z,H,q,ee){var ie,ge,Ae,ne,$,ce,le,ye=H&&H.ownerDocument,Oe=H?H.nodeType:9;if(q=q||[],typeof Z!="string"||!Z||Oe!==1&&Oe!==9&&Oe!==11)return q;if(!ee&&(Tt(H),H=H||T,J)){if(Oe!==11&&($=Lt.exec(Z)))if(ie=$[1]){if(Oe===9)if(Ae=H.getElementById(ie)){if(Ae.id===ie)return x.call(q,Ae),q}else return q;else if(ye&&(Ae=ye.getElementById(ie))&&pe.contains(H,Ae)&&Ae.id===ie)return x.call(q,Ae),q}else{if($[2])return x.apply(q,H.getElementsByTagName(Z)),q;if((ie=$[3])&&H.getElementsByClassName)return x.apply(q,H.getElementsByClassName(ie)),q}if(!re[Z+" "]&&(!F||!F.test(Z))){if(le=Z,ye=H,Oe===1&&(vt.test(Z)||At.test(Z))){for(ye=ze.test(Z)&&lt(H.parentNode)||H,(ye!=H||!b.scope)&&((ne=H.getAttribute("id"))?ne=n.escapeSelector(ne):H.setAttribute("id",ne=M)),ce=bt(Z),ge=ce.length;ge--;)ce[ge]=(ne?"#"+ne:":scope")+" "+sn(ce[ge]);le=ce.join(",")}try{return x.apply(q,ye.querySelectorAll(le)),q}catch(me){re(Z,!0)}finally{ne===M&&H.removeAttribute("id")}}}return Rn(Z.replace(I,"$1"),H,q,ee)}function Ee(){var Z=[];function H(q,ee){return Z.push(q+" ")>_.cacheLength&&delete H[Z.shift()],H[q+" "]=ee}return H}function De(Z){return Z[M]=!0,Z}function Le(Z){var H=T.createElement("fieldset");try{return!!Z(H)}catch(q){return!1}finally{H.parentNode&&H.parentNode.removeChild(H),H=null}}function Qe(Z){return function(H){return p(H,"input")&&H.type===Z}}function Ye(Z){return function(H){return(p(H,"input")||p(H,"button"))&&H.type===Z}}function Ke(Z){return function(H){return"form"in H?H.parentNode&&H.disabled===!1?"label"in H?"label"in H.parentNode?H.parentNode.disabled===Z:H.disabled===Z:H.isDisabled===Z||H.isDisabled!==!Z&&ae(H)===Z:H.disabled===Z:"label"in H?H.disabled===Z:!1}}function rt(Z){return De(function(H){return H=+H,De(function(q,ee){for(var ie,ge=Z([],q.length,H),Ae=ge.length;Ae--;)q[ie=ge[Ae]]&&(q[ie]=!(ee[ie]=q[ie]))})})}function lt(Z){return Z&&typeof Z.getElementsByTagName!="undefined"&&Z}function Tt(Z){var H,q=Z?Z.ownerDocument||Z:R;return q==T||q.nodeType!==9||!q.documentElement||(T=q,P=T.documentElement,J=!n.isXMLDoc(T),U=P.matches||P.webkitMatchesSelector||P.msMatchesSelector,R!=T&&(H=T.defaultView)&&H.top!==H&&H.addEventListener("unload",xe),b.getById=Le(function(ee){return P.appendChild(ee).id=n.expando,!T.getElementsByName||!T.getElementsByName(n.expando).length}),b.disconnectedMatch=Le(function(ee){return U.call(ee,"*")}),b.scope=Le(function(){return T.querySelectorAll(":scope")}),b.cssHas=Le(function(){try{return T.querySelector(":has(*,:jqfake)"),!1}catch(ee){return!0}}),b.getById?(_.filter.ID=function(ee){var ie=ee.replace(oe,_e);return function(ge){return ge.getAttribute("id")===ie}},_.find.ID=function(ee,ie){if(typeof ie.getElementById!="undefined"&&J){var ge=ie.getElementById(ee);return ge?[ge]:[]}}):(_.filter.ID=function(ee){var ie=ee.replace(oe,_e);return function(ge){var Ae=typeof ge.getAttributeNode!="undefined"&&ge.getAttributeNode("id");return Ae&&Ae.value===ie}},_.find.ID=function(ee,ie){if(typeof ie.getElementById!="undefined"&&J){var ge,Ae,ne,$=ie.getElementById(ee);if($){if(ge=$.getAttributeNode("id"),ge&&ge.value===ee)return[$];for(ne=ie.getElementsByName(ee),Ae=0;$=ne[Ae++];)if(ge=$.getAttributeNode("id"),ge&&ge.value===ee)return[$]}return[]}}),_.find.TAG=function(ee,ie){return typeof ie.getElementsByTagName!="undefined"?ie.getElementsByTagName(ee):ie.querySelectorAll(ee)},_.find.CLASS=function(ee,ie){if(typeof ie.getElementsByClassName!="undefined"&&J)return ie.getElementsByClassName(ee)},F=[],Le(function(ee){var ie;P.appendChild(ee).innerHTML="<a id='"+M+"' href='' disabled='disabled'></a><select id='"+M+"-\r\\' disabled='disabled'><option selected=''></option></select>",ee.querySelectorAll("[selected]").length||F.push("\\["+v+"*(?:value|"+X+")"),ee.querySelectorAll("[id~="+M+"-]").length||F.push("~="),ee.querySelectorAll("a#"+M+"+*").length||F.push(".#.+[+~]"),ee.querySelectorAll(":checked").length||F.push(":checked"),ie=T.createElement("input"),ie.setAttribute("type","hidden"),ee.appendChild(ie).setAttribute("name","D"),P.appendChild(ee).disabled=!0,ee.querySelectorAll(":disabled").length!==2&&F.push(":enabled",":disabled"),ie=T.createElement("input"),ie.setAttribute("name",""),ee.appendChild(ie),ee.querySelectorAll("[name='']").length||F.push("\\["+v+"*name"+v+"*="+v+`*(?:''|"")`)}),b.cssHas||F.push(":has"),F=F.length&&new RegExp(F.join("|")),ue=function(ee,ie){if(ee===ie)return N=!0,0;var ge=!ee.compareDocumentPosition-!ie.compareDocumentPosition;return ge||(ge=(ee.ownerDocument||ee)==(ie.ownerDocument||ie)?ee.compareDocumentPosition(ie):1,ge&1||!b.sortDetached&&ie.compareDocumentPosition(ee)===ge?ee===T||ee.ownerDocument==R&&pe.contains(R,ee)?-1:ie===T||ie.ownerDocument==R&&pe.contains(R,ie)?1:z?s.call(z,ee)-s.call(z,ie):0:ge&4?-1:1)}),T}pe.matches=function(Z,H){return pe(Z,null,null,H)},pe.matchesSelector=function(Z,H){if(Tt(Z),J&&!re[H+" "]&&(!F||!F.test(H)))try{var q=U.call(Z,H);if(q||b.disconnectedMatch||Z.document&&Z.document.nodeType!==11)return q}catch(ee){re(H,!0)}return pe(H,T,null,[Z]).length>0},pe.contains=function(Z,H){return(Z.ownerDocument||Z)!=T&&Tt(Z),n.contains(Z,H)},pe.attr=function(Z,H){(Z.ownerDocument||Z)!=T&&Tt(Z);var q=_.attrHandle[H.toLowerCase()],ee=q&&c.call(_.attrHandle,H.toLowerCase())?q(Z,H,!J):void 0;return ee!==void 0?ee:Z.getAttribute(H)},pe.error=function(Z){throw new Error("Syntax error, unrecognized expression: "+Z)},n.uniqueSort=function(Z){var H,q=[],ee=0,ie=0;if(N=!b.sortStable,z=!b.sortStable&&g.call(Z,0),d.call(Z,ue),N){for(;H=Z[ie++];)H===Z[ie]&&(ee=q.push(ie));for(;ee--;)u.call(Z,q[ee],1)}return z=null,Z},n.fn.uniqueSort=function(){return this.pushStack(n.uniqueSort(g.apply(this)))},_=n.expr={cacheLength:50,createPseudo:De,match:mt,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(Z){return Z[1]=Z[1].replace(oe,_e),Z[3]=(Z[3]||Z[4]||Z[5]||"").replace(oe,_e),Z[2]==="~="&&(Z[3]=" "+Z[3]+" "),Z.slice(0,4)},CHILD:function(Z){return Z[1]=Z[1].toLowerCase(),Z[1].slice(0,3)==="nth"?(Z[3]||pe.error(Z[0]),Z[4]=+(Z[4]?Z[5]+(Z[6]||1):2*(Z[3]==="even"||Z[3]==="odd")),Z[5]=+(Z[7]+Z[8]||Z[3]==="odd")):Z[3]&&pe.error(Z[0]),Z},PSEUDO:function(Z){var H,q=!Z[6]&&Z[2];return mt.CHILD.test(Z[0])?null:(Z[3]?Z[2]=Z[4]||Z[5]||"":q&&kt.test(q)&&(H=bt(q,!0))&&(H=q.indexOf(")",q.length-H)-q.length)&&(Z[0]=Z[0].slice(0,H),Z[2]=q.slice(0,H)),Z.slice(0,3))}},filter:{TAG:function(Z){var H=Z.replace(oe,_e).toLowerCase();return Z==="*"?function(){return!0}:function(q){return p(q,H)}},CLASS:function(Z){var H=K[Z+" "];return H||(H=new RegExp("(^|"+v+")"+Z+"("+v+"|$)"))&&K(Z,function(q){return H.test(typeof q.className=="string"&&q.className||typeof q.getAttribute!="undefined"&&q.getAttribute("class")||"")})},ATTR:function(Z,H,q){return function(ee){var ie=pe.attr(ee,Z);return ie==null?H==="!=":H?(ie+="",H==="="?ie===q:H==="!="?ie!==q:H==="^="?q&&ie.indexOf(q)===0:H==="*="?q&&ie.indexOf(q)>-1:H==="$="?q&&ie.slice(-q.length)===q:H==="~="?(" "+ie.replace(qe," ")+" ").indexOf(q)>-1:H==="|="?ie===q||ie.slice(0,q.length+1)===q+"-":!1):!0}},CHILD:function(Z,H,q,ee,ie){var ge=Z.slice(0,3)!=="nth",Ae=Z.slice(-4)!=="last",ne=H==="of-type";return ee===1&&ie===0?function($){return!!$.parentNode}:function($,ce,le){var ye,Oe,me,Je,ct,st=ge!==Ae?"nextSibling":"previousSibling",gt=$.parentNode,We=ne&&$.nodeName.toLowerCase(),$e=!le&&!ne,Et=!1;if(gt){if(ge){for(;st;){for(me=$;me=me[st];)if(ne?p(me,We):me.nodeType===1)return!1;ct=st=Z==="only"&&!ct&&"nextSibling"}return!0}if(ct=[Ae?gt.firstChild:gt.lastChild],Ae&&$e){for(Oe=gt[M]||(gt[M]={}),ye=Oe[Z]||[],Je=ye[0]===j&&ye[1],Et=Je&&ye[2],me=Je&&gt.childNodes[Je];me=++Je&&me&&me[st]||(Et=Je=0)||ct.pop();)if(me.nodeType===1&&++Et&&me===$){Oe[Z]=[j,Je,Et];break}}else if($e&&(Oe=$[M]||($[M]={}),ye=Oe[Z]||[],Je=ye[0]===j&&ye[1],Et=Je),Et===!1)for(;(me=++Je&&me&&me[st]||(Et=Je=0)||ct.pop())&&!((ne?p(me,We):me.nodeType===1)&&++Et&&($e&&(Oe=me[M]||(me[M]={}),Oe[Z]=[j,Et]),me===$)););return Et-=ie,Et===ee||Et%ee===0&&Et/ee>=0}}},PSEUDO:function(Z,H){var q,ee=_.pseudos[Z]||_.setFilters[Z.toLowerCase()]||pe.error("unsupported pseudo: "+Z);return ee[M]?ee(H):ee.length>1?(q=[Z,Z,"",H],_.setFilters.hasOwnProperty(Z.toLowerCase())?De(function(ie,ge){for(var Ae,ne=ee(ie,H),$=ne.length;$--;)Ae=s.call(ie,ne[$]),ie[Ae]=!(ge[Ae]=ne[$])}):function(ie){return ee(ie,0,q)}):ee}},pseudos:{not:De(function(Z){var H=[],q=[],ee=hn(Z.replace(I,"$1"));return ee[M]?De(function(ie,ge,Ae,ne){for(var $,ce=ee(ie,null,ne,[]),le=ie.length;le--;)($=ce[le])&&(ie[le]=!(ge[le]=$))}):function(ie,ge,Ae){return H[0]=ie,ee(H,null,Ae,q),H[0]=null,!q.pop()}}),has:De(function(Z){return function(H){return pe(Z,H).length>0}}),contains:De(function(Z){return Z=Z.replace(oe,_e),function(H){return(H.textContent||n.text(H)).indexOf(Z)>-1}}),lang:De(function(Z){return we.test(Z||"")||pe.error("unsupported lang: "+Z),Z=Z.replace(oe,_e).toLowerCase(),function(H){var q;do if(q=J?H.lang:H.getAttribute("xml:lang")||H.getAttribute("lang"))return q=q.toLowerCase(),q===Z||q.indexOf(Z+"-")===0;while((H=H.parentNode)&&H.nodeType===1);return!1}}),target:function(Z){var H=window.location&&window.location.hash;return H&&H.slice(1)===Z.id},root:function(Z){return Z===P},focus:function(Z){return Z===ve()&&T.hasFocus()&&!!(Z.type||Z.href||~Z.tabIndex)},enabled:Ke(!1),disabled:Ke(!0),checked:function(Z){return p(Z,"input")&&!!Z.checked||p(Z,"option")&&!!Z.selected},selected:function(Z){return Z.parentNode&&Z.parentNode.selectedIndex,Z.selected===!0},empty:function(Z){for(Z=Z.firstChild;Z;Z=Z.nextSibling)if(Z.nodeType<6)return!1;return!0},parent:function(Z){return!_.pseudos.empty(Z)},header:function(Z){return Ue.test(Z.nodeName)},input:function(Z){return Be.test(Z.nodeName)},button:function(Z){return p(Z,"input")&&Z.type==="button"||p(Z,"button")},text:function(Z){var H;return p(Z,"input")&&Z.type==="text"&&((H=Z.getAttribute("type"))==null||H.toLowerCase()==="text")},first:rt(function(){return[0]}),last:rt(function(Z,H){return[H-1]}),eq:rt(function(Z,H,q){return[q<0?q+H:q]}),even:rt(function(Z,H){for(var q=0;q<H;q+=2)Z.push(q);return Z}),odd:rt(function(Z,H){for(var q=1;q<H;q+=2)Z.push(q);return Z}),lt:rt(function(Z,H,q){var ee;for(q<0?ee=q+H:q>H?ee=H:ee=q;--ee>=0;)Z.push(ee);return Z}),gt:rt(function(Z,H,q){for(var ee=q<0?q+H:q;++ee<H;)Z.push(ee);return Z})}},_.pseudos.nth=_.pseudos.eq;for(E in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})_.pseudos[E]=Qe(E);for(E in{submit:!0,reset:!0})_.pseudos[E]=Ye(E);function Jt(){}Jt.prototype=_.filters=_.pseudos,_.setFilters=new Jt;function bt(Z,H){var q,ee,ie,ge,Ae,ne,$,ce=W[Z+" "];if(ce)return H?0:ce.slice(0);for(Ae=Z,ne=[],$=_.preFilter;Ae;){(!q||(ee=ht.exec(Ae)))&&(ee&&(Ae=Ae.slice(ee[0].length)||Ae),ne.push(ie=[])),q=!1,(ee=At.exec(Ae))&&(q=ee.shift(),ie.push({value:q,type:ee[0].replace(I," ")}),Ae=Ae.slice(q.length));for(ge in _.filter)(ee=mt[ge].exec(Ae))&&(!$[ge]||(ee=$[ge](ee)))&&(q=ee.shift(),ie.push({value:q,type:ge,matches:ee}),Ae=Ae.slice(q.length));if(!q)break}return H?Ae.length:Ae?pe.error(Z):W(Z,ne).slice(0)}function sn(Z){for(var H=0,q=Z.length,ee="";H<q;H++)ee+=Z[H].value;return ee}function Wt(Z,H,q){var ee=H.dir,ie=H.next,ge=ie||ee,Ae=q&&ge==="parentNode",ne=B++;return H.first?function($,ce,le){for(;$=$[ee];)if($.nodeType===1||Ae)return Z($,ce,le);return!1}:function($,ce,le){var ye,Oe,me=[j,ne];if(le){for(;$=$[ee];)if(($.nodeType===1||Ae)&&Z($,ce,le))return!0}else for(;$=$[ee];)if($.nodeType===1||Ae)if(Oe=$[M]||($[M]={}),ie&&p($,ie))$=$[ee]||$;else{if((ye=Oe[ge])&&ye[0]===j&&ye[1]===ne)return me[2]=ye[2];if(Oe[ge]=me,me[2]=Z($,ce,le))return!0}return!1}}function fn(Z){return Z.length>1?function(H,q,ee){for(var ie=Z.length;ie--;)if(!Z[ie](H,q,ee))return!1;return!0}:Z[0]}function Mn(Z,H,q){for(var ee=0,ie=H.length;ee<ie;ee++)pe(Z,H[ee],q);return q}function xt(Z,H,q,ee,ie){for(var ge,Ae=[],ne=0,$=Z.length,ce=H!=null;ne<$;ne++)(ge=Z[ne])&&(!q||q(ge,ee,ie))&&(Ae.push(ge),ce&&H.push(ne));return Ae}function On(Z,H,q,ee,ie,ge){return ee&&!ee[M]&&(ee=On(ee)),ie&&!ie[M]&&(ie=On(ie,ge)),De(function(Ae,ne,$,ce){var le,ye,Oe,me,Je=[],ct=[],st=ne.length,gt=Ae||Mn(H||"*",$.nodeType?[$]:$,[]),We=Z&&(Ae||!H)?xt(gt,Je,Z,$,ce):gt;if(q?(me=ie||(Ae?Z:st||ee)?[]:ne,q(We,me,$,ce)):me=We,ee)for(le=xt(me,ct),ee(le,[],$,ce),ye=le.length;ye--;)(Oe=le[ye])&&(me[ct[ye]]=!(We[ct[ye]]=Oe));if(Ae){if(ie||Z){if(ie){for(le=[],ye=me.length;ye--;)(Oe=me[ye])&&le.push(We[ye]=Oe);ie(null,me=[],le,ce)}for(ye=me.length;ye--;)(Oe=me[ye])&&(le=ie?s.call(Ae,Oe):Je[ye])>-1&&(Ae[le]=!(ne[le]=Oe))}}else me=xt(me===ne?me.splice(st,me.length):me),ie?ie(null,ne,me,ce):x.apply(ne,me)})}function St(Z){for(var H,q,ee,ie=Z.length,ge=_.relative[Z[0].type],Ae=ge||_.relative[" "],ne=ge?1:0,$=Wt(function(ye){return ye===H},Ae,!0),ce=Wt(function(ye){return s.call(H,ye)>-1},Ae,!0),le=[function(ye,Oe,me){var Je=!ge&&(me||Oe!=C)||((H=Oe).nodeType?$(ye,Oe,me):ce(ye,Oe,me));return H=null,Je}];ne<ie;ne++)if(q=_.relative[Z[ne].type])le=[Wt(fn(le),q)];else{if(q=_.filter[Z[ne].type].apply(null,Z[ne].matches),q[M]){for(ee=++ne;ee<ie&&!_.relative[Z[ee].type];ee++);return On(ne>1&&fn(le),ne>1&&sn(Z.slice(0,ne-1).concat({value:Z[ne-2].type===" "?"*":""})).replace(I,"$1"),q,ne<ee&&St(Z.slice(ne,ee)),ee<ie&&St(Z=Z.slice(ee)),ee<ie&&sn(Z))}le.push(q)}return fn(le)}function Gn(Z,H){var q=H.length>0,ee=Z.length>0,ie=function(ge,Ae,ne,$,ce){var le,ye,Oe,me=0,Je="0",ct=ge&&[],st=[],gt=C,We=ge||ee&&_.find.TAG("*",ce),$e=j+=gt==null?1:Math.random()||.1,Et=We.length;for(ce&&(C=Ae==T||Ae||ce);Je!==Et&&(le=We[Je])!=null;Je++){if(ee&&le){for(ye=0,!Ae&&le.ownerDocument!=T&&(Tt(le),ne=!J);Oe=Z[ye++];)if(Oe(le,Ae||T,ne)){x.call($,le);break}ce&&(j=$e)}q&&((le=!Oe&&le)&&me--,ge&&ct.push(le))}if(me+=Je,q&&Je!==me){for(ye=0;Oe=H[ye++];)Oe(ct,st,Ae,ne);if(ge){if(me>0)for(;Je--;)ct[Je]||st[Je]||(st[Je]=m.call($));st=xt(st)}x.apply($,st),ce&&!ge&&st.length>0&&me+H.length>1&&n.uniqueSort($)}return ce&&(j=$e,C=gt),ct};return q?De(ie):ie}function hn(Z,H){var q,ee=[],ie=[],ge=Q[Z+" "];if(!ge){for(H||(H=bt(Z)),q=H.length;q--;)ge=St(H[q]),ge[M]?ee.push(ge):ie.push(ge);ge=Q(Z,Gn(ie,ee)),ge.selector=Z}return ge}function Rn(Z,H,q,ee){var ie,ge,Ae,ne,$,ce=typeof Z=="function"&&Z,le=!ee&&bt(Z=ce.selector||Z);if(q=q||[],le.length===1){if(ge=le[0]=le[0].slice(0),ge.length>2&&(Ae=ge[0]).type==="ID"&&H.nodeType===9&&J&&_.relative[ge[1].type]){if(H=(_.find.ID(Ae.matches[0].replace(oe,_e),H)||[])[0],H)ce&&(H=H.parentNode);else return q;Z=Z.slice(ge.shift().value.length)}for(ie=mt.needsContext.test(Z)?0:ge.length;ie--&&(Ae=ge[ie],!_.relative[ne=Ae.type]);)if(($=_.find[ne])&&(ee=$(Ae.matches[0].replace(oe,_e),ze.test(ge[0].type)&&lt(H.parentNode)||H))){if(ge.splice(ie,1),Z=ee.length&&sn(ge),!Z)return x.apply(q,ee),q;break}}return(ce||hn(Z,le))(ee,H,!J,q,!H||ze.test(Z)&&lt(H.parentNode)||H),q}b.sortStable=M.split("").sort(ue).join("")===M,Tt(),b.sortDetached=Le(function(Z){return Z.compareDocumentPosition(T.createElement("fieldset"))&1}),n.find=pe,n.expr[":"]=n.expr.pseudos,n.unique=n.uniqueSort,pe.compile=hn,pe.select=Rn,pe.setDocument=Tt,pe.escape=n.escapeSelector,pe.getText=n.text,pe.isXML=n.isXMLDoc,pe.selectors=n.expr,pe.support=n.support,pe.uniqueSort=n.uniqueSort})()}.apply(y,f),i!==void 0&&(O.exports=i)},712:(O,y,o)=>{var f,i;f=[o(8934)],i=function(n){"use strict";n.contains=function(p,h){var l=h&&h.parentNode;return p===l||!!(l&&l.nodeType===1&&(p.contains?p.contains(l):p.compareDocumentPosition&&p.compareDocumentPosition(l)&16))}}.apply(y,f),i!==void 0&&(O.exports=i)},7232:(O,y,o)=>{var f,i;f=[o(8934)],i=function(n){"use strict";var p=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;function h(l,s){return s?l==="\0"?"\uFFFD":l.slice(0,-1)+"\\"+l.charCodeAt(l.length-1).toString(16)+" ":"\\"+l}n.escapeSelector=function(l){return(l+"").replace(p,h)}}.apply(y,f),i!==void 0&&(O.exports=i)},5385:(O,y,o)=>{var f,i;f=[o(8934),o(8082),o(8104),o(2134),o(8048),o(8482),o(4043)],i=function(n,p,h,l){"use strict";var s=/\[\]$/,c=/\r?\n/g,m=/^(?:submit|button|image|reset|file)$/i,r=/^(?:input|select|textarea|keygen)/i;function g(d,u,v,I){var b;if(Array.isArray(u))n.each(u,function(R,A){v||s.test(d)?I(d,A):g(d+"["+(typeof A=="object"&&A!=null?R:"")+"]",A,v,I)});else if(!v&&p(u)==="object")for(b in u)g(d+"["+b+"]",u[b],v,I);else I(d,u)}return n.param=function(d,u){var v,I=[],b=function(R,A){var E=l(A)?A():A;I[I.length]=encodeURIComponent(R)+"="+encodeURIComponent(E==null?"":E)};if(d==null)return"";if(Array.isArray(d)||d.jquery&&!n.isPlainObject(d))n.each(d,function(){b(this.name,this.value)});else for(v in d)g(v,d[v],u,b);return I.join("&")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var d=n.prop(this,"elements");return d?n.makeArray(d):this}).filter(function(){var d=this.type;return this.name&&!n(this).is(":disabled")&&r.test(this.nodeName)&&!m.test(d)&&(this.checked||!h.test(d))}).map(function(d,u){var v=n(this).val();return v==null?null:Array.isArray(v)?n.map(v,function(I){return{name:u.name,value:I.replace(c,`\r
`)}}):{name:u.name,value:v.replace(c,`\r
`)}}).get()}}),n}.apply(y,f),i!==void 0&&(O.exports=i)},8482:(O,y,o)=>{var f,i;f=[o(8934),o(8045),o(5431),o(1721),o(2495),o(8020),o(7060),o(8048),o(1764),o(655)],i=function(n,p,h,l,s,c,m){"use strict";var r=/^(?:parents|prev(?:Until|All))/,g={children:!0,contents:!0,next:!0,prev:!0};n.fn.extend({has:function(u){var v=n(u,this),I=v.length;return this.filter(function(){for(var b=0;b<I;b++)if(n.contains(this,v[b]))return!0})},closest:function(u,v){var I,b=0,R=this.length,A=[],E=typeof u!="string"&&n(u);if(!c.test(u)){for(;b<R;b++)for(I=this[b];I&&I!==v;I=I.parentNode)if(I.nodeType<11&&(E?E.index(I)>-1:I.nodeType===1&&n.find.matchesSelector(I,u))){A.push(I);break}}return this.pushStack(A.length>1?n.uniqueSort(A):A)},index:function(u){return u?typeof u=="string"?h.call(n(u),this[0]):h.call(this,u.jquery?u[0]:u):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(u,v){return this.pushStack(n.uniqueSort(n.merge(this.get(),n(u,v))))},addBack:function(u){return this.add(u==null?this.prevObject:this.prevObject.filter(u))}});function d(u,v){for(;(u=u[v])&&u.nodeType!==1;);return u}return n.each({parent:function(u){var v=u.parentNode;return v&&v.nodeType!==11?v:null},parents:function(u){return l(u,"parentNode")},parentsUntil:function(u,v,I){return l(u,"parentNode",I)},next:function(u){return d(u,"nextSibling")},prev:function(u){return d(u,"previousSibling")},nextAll:function(u){return l(u,"nextSibling")},prevAll:function(u){return l(u,"previousSibling")},nextUntil:function(u,v,I){return l(u,"nextSibling",I)},prevUntil:function(u,v,I){return l(u,"previousSibling",I)},siblings:function(u){return s((u.parentNode||{}).firstChild,u)},children:function(u){return s(u.firstChild)},contents:function(u){return u.contentDocument!=null&&p(u.contentDocument)?u.contentDocument:(m(u,"template")&&(u=u.content||u),n.merge([],u.childNodes))}},function(u,v){n.fn[u]=function(I,b){var R=n.map(this,v,I);return u.slice(-5)!=="Until"&&(b=I),b&&typeof b=="string"&&(R=n.filter(b,R)),this.length>1&&(g[u]||n.uniqueSort(R),r.test(u)&&R.reverse()),this.pushStack(R)}}),n}.apply(y,f),i!==void 0&&(O.exports=i)},1764:(O,y,o)=>{var f,i;f=[o(8934),o(5431),o(2134),o(8020),o(655)],i=function(n,p,h,l){"use strict";function s(c,m,r){return h(m)?n.grep(c,function(g,d){return!!m.call(g,d,g)!==r}):m.nodeType?n.grep(c,function(g){return g===m!==r}):typeof m!="string"?n.grep(c,function(g){return p.call(m,g)>-1!==r}):n.filter(m,c,r)}n.filter=function(c,m,r){var g=m[0];return r&&(c=":not("+c+")"),m.length===1&&g.nodeType===1?n.find.matchesSelector(g,c)?[g]:[]:n.find.matches(c,n.grep(m,function(d){return d.nodeType===1}))},n.fn.extend({find:function(c){var m,r,g=this.length,d=this;if(typeof c!="string")return this.pushStack(n(c).filter(function(){for(m=0;m<g;m++)if(n.contains(d[m],this))return!0}));for(r=this.pushStack([]),m=0;m<g;m++)n.find(c,d[m],r);return g>1?n.uniqueSort(r):r},filter:function(c){return this.pushStack(s(this,c||[],!1))},not:function(c){return this.pushStack(s(this,c||[],!0))},is:function(c){return!!s(this,typeof c=="string"&&l.test(c)?n(c):c||[],!1).length}})}.apply(y,f),i!==void 0&&(O.exports=i)},1721:(O,y,o)=>{var f,i;f=[o(8934)],i=function(n){"use strict";return function(p,h,l){for(var s=[],c=l!==void 0;(p=p[h])&&p.nodeType!==9;)if(p.nodeType===1){if(c&&n(p).is(l))break;s.push(p)}return s}}.apply(y,f),i!==void 0&&(O.exports=i)},8020:(O,y,o)=>{var f,i;f=[o(8934),o(655)],i=function(n){"use strict";return n.expr.match.needsContext}.apply(y,f),i!==void 0&&(O.exports=i)},2495:(O,y,o)=>{var f;f=function(){"use strict";return function(i,n){for(var p=[];i;i=i.nextSibling)i.nodeType===1&&i!==n&&p.push(i);return p}}.call(y,o,y,O),f!==void 0&&(O.exports=f)},3:(O,y,o)=>{var f,i;f=[o(4194)],i=function(n){"use strict";return n.call(Object)}.apply(y,f),i!==void 0&&(O.exports=i)},3727:(O,y,o)=>{var f;f=function(){"use strict";return[]}.call(y,o,y,O),f!==void 0&&(O.exports=f)},5949:(O,y,o)=>{var f;f=function(){"use strict";return{}}.call(y,o,y,O),f!==void 0&&(O.exports=f)},7792:(O,y,o)=>{var f;f=function(){"use strict";return window.document}.call(y,o,y,O),f!==void 0&&(O.exports=f)},7730:(O,y,o)=>{var f,i;f=[o(7792)],i=function(n){"use strict";return n.documentElement}.apply(y,f),i!==void 0&&(O.exports=i)},3932:(O,y,o)=>{var f,i;f=[o(3727)],i=function(n){"use strict";return n.flat?function(p){return n.flat.call(p)}:function(p){return n.concat.apply([],p)}}.apply(y,f),i!==void 0&&(O.exports=i)},4194:(O,y,o)=>{var f,i;f=[o(9694)],i=function(n){"use strict";return n.toString}.apply(y,f),i!==void 0&&(O.exports=i)},8045:(O,y,o)=>{var f;f=function(){"use strict";return Object.getPrototypeOf}.call(y,o,y,O),f!==void 0&&(O.exports=f)},9694:(O,y,o)=>{var f,i;f=[o(5949)],i=function(n){"use strict";return n.hasOwnProperty}.apply(y,f),i!==void 0&&(O.exports=i)},5431:(O,y,o)=>{var f,i;f=[o(3727)],i=function(n){"use strict";return n.indexOf}.apply(y,f),i!==void 0&&(O.exports=i)},2134:(O,y,o)=>{var f;f=function(){"use strict";return function(n){return typeof n=="function"&&typeof n.nodeType!="number"&&typeof n.item!="function"}}.call(y,o,y,O),f!==void 0&&(O.exports=f)},9031:(O,y,o)=>{var f;f=function(){"use strict";return function(n){return n!=null&&n===n.window}}.call(y,o,y,O),f!==void 0&&(O.exports=f)},8308:(O,y,o)=>{var f;f=function(){"use strict";return/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source}.call(y,o,y,O),f!==void 0&&(O.exports=f)},6683:(O,y,o)=>{var f,i;f=[o(3727)],i=function(n){"use strict";return n.pop}.apply(y,f),i!==void 0&&(O.exports=i)},1780:(O,y,o)=>{var f,i;f=[o(3727)],i=function(n){"use strict";return n.push}.apply(y,f),i!==void 0&&(O.exports=i)},8104:(O,y,o)=>{var f;f=function(){"use strict";return/^(?:checkbox|radio)$/i}.call(y,o,y,O),f!==void 0&&(O.exports=f)},6871:(O,y,o)=>{var f,i;f=[o(8308)],i=function(n){"use strict";return new RegExp("^(?:([+-])=|)("+n+")([a-z%]*)$","i")}.apply(y,f),i!==void 0&&(O.exports=i)},8663:(O,y,o)=>{var f;f=function(){"use strict";return/[^\x20\t\r\n\f]+/g}.call(y,o,y,O),f!==void 0&&(O.exports=f)},9508:(O,y,o)=>{var f,i;f=[o(2992)],i=function(n){"use strict";return new RegExp("^"+n+"+|((?:^|[^\\\\])(?:\\\\.)*)"+n+"+$","g")}.apply(y,f),i!==void 0&&(O.exports=i)},3623:(O,y,o)=>{var f,i;f=[o(3727)],i=function(n){"use strict";return n.slice}.apply(y,f),i!==void 0&&(O.exports=i)},5871:(O,y,o)=>{var f,i;f=[o(3727)],i=function(n){"use strict";return n.sort}.apply(y,f),i!==void 0&&(O.exports=i)},9133:(O,y,o)=>{var f,i;f=[o(3727)],i=function(n){"use strict";return n.splice}.apply(y,f),i!==void 0&&(O.exports=i)},9523:(O,y,o)=>{var f;f=function(){"use strict";return{}}.call(y,o,y,O),f!==void 0&&(O.exports=f)},7763:(O,y,o)=>{var f,i;f=[o(5949)],i=function(n){"use strict";return n.toString}.apply(y,f),i!==void 0&&(O.exports=i)},2992:(O,y,o)=>{var f;f=function(){"use strict";return"[\\x20\\t\\r\\n\\f]"}.call(y,o,y,O),f!==void 0&&(O.exports=f)},5594:(O,y,o)=>{var f,i;f=[o(8934),o(2134),o(8048),o(2632),o(8482)],i=function(n,p){"use strict";return n.fn.extend({wrapAll:function(h){var l;return this[0]&&(p(h)&&(h=h.call(this[0])),l=n(h,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&l.insertBefore(this[0]),l.map(function(){for(var s=this;s.firstElementChild;)s=s.firstElementChild;return s}).append(this)),this},wrapInner:function(h){return p(h)?this.each(function(l){n(this).wrapInner(h.call(this,l))}):this.each(function(){var l=n(this),s=l.contents();s.length?s.wrapAll(h):l.append(h)})},wrap:function(h){var l=p(h);return this.each(function(s){n(this).wrapAll(l?h.call(this,s):h)})},unwrap:function(h){return this.parent(h).not("body").each(function(){n(this).replaceWith(this.childNodes)}),this}}),n}.apply(y,f),i!==void 0&&(O.exports=i)},6486:function(O,y,o){O=o.nmd(O);var f;/**
* @license
* Lodash <https://lodash.com/>
* Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
* Released under MIT license <https://lodash.com/license>
* Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
* Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
*/(function(){var i,n="4.17.21",p=200,h="Unsupported core-js use. Try https://npms.io/search?q=ponyfill.",l="Expected a function",s="Invalid `variable` option passed into `_.template`",c="__lodash_hash_undefined__",m=500,r="__lodash_placeholder__",g=1,d=2,u=4,v=1,I=2,b=1,R=2,A=4,E=8,_=16,C=32,z=64,N=128,x=256,T=512,P=30,J="...",F=800,U=16,M=1,j=2,B=3,K=1/0,W=9007199254740991,Q=17976931348623157e292,re=0/0,ue=4294967295,X=ue-1,Ie=ue>>>1,be=[["ary",N],["bind",b],["bindKey",R],["curry",E],["curryRight",_],["flip",T],["partial",C],["partialRight",z],["rearg",x]],Re="[object Arguments]",qe="[object Array]",ht="[object AsyncFunction]",At="[object Boolean]",vt="[object Date]",kt="[object DOMException]",we="[object Error]",mt="[object Function]",Be="[object GeneratorFunction]",Ue="[object Map]",Lt="[object Number]",ze="[object Null]",oe="[object Object]",_e="[object Promise]",xe="[object Proxy]",ae="[object RegExp]",ve="[object Set]",pe="[object String]",Ee="[object Symbol]",De="[object Undefined]",Le="[object WeakMap]",Qe="[object WeakSet]",Ye="[object ArrayBuffer]",Ke="[object DataView]",rt="[object Float32Array]",lt="[object Float64Array]",Tt="[object Int8Array]",Jt="[object Int16Array]",bt="[object Int32Array]",sn="[object Uint8Array]",Wt="[object Uint8ClampedArray]",fn="[object Uint16Array]",Mn="[object Uint32Array]",xt=/\b__p \+= '';/g,On=/\b(__p \+=) '' \+/g,St=/(__e\(.*?\)|\b__t\)) \+\n'';/g,Gn=/&(?:amp|lt|gt|quot|#39);/g,hn=/[&<>"']/g,Rn=RegExp(Gn.source),Z=RegExp(hn.source),H=/<%-([\s\S]+?)%>/g,q=/<%([\s\S]+?)%>/g,ee=/<%=([\s\S]+?)%>/g,ie=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,ge=/^\w*$/,Ae=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,ne=/[\\^$.*+?()[\]{}|]/g,$=RegExp(ne.source),ce=/^\s+/,le=/\s/,ye=/\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,Oe=/\{\n\/\* \[wrapped with (.+)\] \*/,me=/,? & /,Je=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,ct=/[()=,{}\[\]\/\s]/,st=/\\(\\)?/g,gt=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,We=/\w*$/,$e=/^[-+]0x[0-9a-f]+$/i,Et=/^0b[01]+$/i,As=/^\[object .+?Constructor\]$/,bs=/^0o[0-7]+$/i,Hn=/^(?:0|[1-9]\d*)$/,Xa=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,bi=/($^)/,$a=/['\n\r\u2028\u2029\\]/g,Si="\\ud800-\\udfff",qa="\\u0300-\\u036f",Qa="\\ufe20-\\ufe2f",el="\\u20d0-\\u20ff",Ss=qa+Qa+el,Es="\\u2700-\\u27bf",Os="a-z\\xdf-\\xf6\\xf8-\\xff",tl="\\xac\\xb1\\xd7\\xf7",nl="\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",il="\\u2000-\\u206f",rl=" \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",Rs="A-Z\\xc0-\\xd6\\xd8-\\xde",Ts="\\ufe0e\\ufe0f",_s=tl+nl+il+rl,ur="['\u2019]",sl="["+Si+"]",Cs="["+_s+"]",Ei="["+Ss+"]",ws="\\d+",ol="["+Es+"]",xs="["+Os+"]",Ns="[^"+Si+_s+ws+Es+Os+Rs+"]",pr="\\ud83c[\\udffb-\\udfff]",al="(?:"+Ei+"|"+pr+")",Ps="[^"+Si+"]",dr="(?:\\ud83c[\\udde6-\\uddff]){2}",fr="[\\ud800-\\udbff][\\udc00-\\udfff]",Un="["+Rs+"]",ks="\\u200d",zs="(?:"+xs+"|"+Ns+")",ll="(?:"+Un+"|"+Ns+")",Ms="(?:"+ur+"(?:d|ll|m|re|s|t|ve))?",Ds="(?:"+ur+"(?:D|LL|M|RE|S|T|VE))?",Js=al+"?",Zs="["+Ts+"]?",cl="(?:"+ks+"(?:"+[Ps,dr,fr].join("|")+")"+Zs+Js+")*",ul="\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",pl="\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",Bs=Zs+Js+cl,dl="(?:"+[ol,dr,fr].join("|")+")"+Bs,fl="(?:"+[Ps+Ei+"?",Ei,dr,fr,sl].join("|")+")",hl=RegExp(ur,"g"),ml=RegExp(Ei,"g"),hr=RegExp(pr+"(?="+pr+")|"+fl+Bs,"g"),gl=RegExp([Un+"?"+xs+"+"+Ms+"(?="+[Cs,Un,"$"].join("|")+")",ll+"+"+Ds+"(?="+[Cs,Un+zs,"$"].join("|")+")",Un+"?"+zs+"+"+Ms,Un+"+"+Ds,pl,ul,ws,dl].join("|"),"g"),yl=RegExp("["+ks+Si+Ss+Ts+"]"),Il=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,vl=["Array","Buffer","DataView","Date","Error","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Map","Math","Object","Promise","RegExp","Set","String","Symbol","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","WeakMap","_","clearTimeout","isFinite","parseInt","setTimeout"],Al=-1,ut={};ut[rt]=ut[lt]=ut[Tt]=ut[Jt]=ut[bt]=ut[sn]=ut[Wt]=ut[fn]=ut[Mn]=!0,ut[Re]=ut[qe]=ut[Ye]=ut[At]=ut[Ke]=ut[vt]=ut[we]=ut[mt]=ut[Ue]=ut[Lt]=ut[oe]=ut[ae]=ut[ve]=ut[pe]=ut[Le]=!1;var at={};at[Re]=at[qe]=at[Ye]=at[Ke]=at[At]=at[vt]=at[rt]=at[lt]=at[Tt]=at[Jt]=at[bt]=at[Ue]=at[Lt]=at[oe]=at[ae]=at[ve]=at[pe]=at[Ee]=at[sn]=at[Wt]=at[fn]=at[Mn]=!0,at[we]=at[mt]=at[Le]=!1;var bl={\u00C0:"A",\u00C1:"A",\u00C2:"A",\u00C3:"A",\u00C4:"A",\u00C5:"A",\u00E0:"a",\u00E1:"a",\u00E2:"a",\u00E3:"a",\u00E4:"a",\u00E5:"a",\u00C7:"C",\u00E7:"c",\u00D0:"D",\u00F0:"d",\u00C8:"E",\u00C9:"E",\u00CA:"E",\u00CB:"E",\u00E8:"e",\u00E9:"e",\u00EA:"e",\u00EB:"e",\u00CC:"I",\u00CD:"I",\u00CE:"I",\u00CF:"I",\u00EC:"i",\u00ED:"i",\u00EE:"i",\u00EF:"i",\u00D1:"N",\u00F1:"n",\u00D2:"O",\u00D3:"O",\u00D4:"O",\u00D5:"O",\u00D6:"O",\u00D8:"O",\u00F2:"o",\u00F3:"o",\u00F4:"o",\u00F5:"o",\u00F6:"o",\u00F8:"o",\u00D9:"U",\u00DA:"U",\u00DB:"U",\u00DC:"U",\u00F9:"u",\u00FA:"u",\u00FB:"u",\u00FC:"u",\u00DD:"Y",\u00FD:"y",\u00FF:"y",\u00C6:"Ae",\u00E6:"ae",\u00DE:"Th",\u00FE:"th",\u00DF:"ss",\u0100:"A",\u0102:"A",\u0104:"A",\u0101:"a",\u0103:"a",\u0105:"a",\u0106:"C",\u0108:"C",\u010A:"C",\u010C:"C",\u0107:"c",\u0109:"c",\u010B:"c",\u010D:"c",\u010E:"D",\u0110:"D",\u010F:"d",\u0111:"d",\u0112:"E",\u0114:"E",\u0116:"E",\u0118:"E",\u011A:"E",\u0113:"e",\u0115:"e",\u0117:"e",\u0119:"e",\u011B:"e",\u011C:"G",\u011E:"G",\u0120:"G",\u0122:"G",\u011D:"g",\u011F:"g",\u0121:"g",\u0123:"g",\u0124:"H",\u0126:"H",\u0125:"h",\u0127:"h",\u0128:"I",\u012A:"I",\u012C:"I",\u012E:"I",\u0130:"I",\u0129:"i",\u012B:"i",\u012D:"i",\u012F:"i",\u0131:"i",\u0134:"J",\u0135:"j",\u0136:"K",\u0137:"k",\u0138:"k",\u0139:"L",\u013B:"L",\u013D:"L",\u013F:"L",\u0141:"L",\u013A:"l",\u013C:"l",\u013E:"l",\u0140:"l",\u0142:"l",\u0143:"N",\u0145:"N",\u0147:"N",\u014A:"N",\u0144:"n",\u0146:"n",\u0148:"n",\u014B:"n",\u014C:"O",\u014E:"O",\u0150:"O",\u014D:"o",\u014F:"o",\u0151:"o",\u0154:"R",\u0156:"R",\u0158:"R",\u0155:"r",\u0157:"r",\u0159:"r",\u015A:"S",\u015C:"S",\u015E:"S",\u0160:"S",\u015B:"s",\u015D:"s",\u015F:"s",\u0161:"s",\u0162:"T",\u0164:"T",\u0166:"T",\u0163:"t",\u0165:"t",\u0167:"t",\u0168:"U",\u016A:"U",\u016C:"U",\u016E:"U",\u0170:"U",\u0172:"U",\u0169:"u",\u016B:"u",\u016D:"u",\u016F:"u",\u0171:"u",\u0173:"u",\u0174:"W",\u0175:"w",\u0176:"Y",\u0177:"y",\u0178:"Y",\u0179:"Z",\u017B:"Z",\u017D:"Z",\u017A:"z",\u017C:"z",\u017E:"z",\u0132:"IJ",\u0133:"ij",\u0152:"Oe",\u0153:"oe",\u0149:"'n",\u017F:"s"},Sl={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},El={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'"},Ol={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"},Rl=parseFloat,Tl=parseInt,js=typeof o.g=="object"&&o.g&&o.g.Object===Object&&o.g,_l=typeof self=="object"&&self&&self.Object===Object&&self,Ct=js||_l||Function("return this")(),Fs=y&&!y.nodeType&&y,si=Fs&&!0&&O&&!O.nodeType&&O,Ls=si&&si.exports===Fs,mr=Ls&&js.process,Xt=function(){try{var V=si&&si.require&&si.require("util").types;return V||mr&&mr.binding&&mr.binding("util")}catch(se){}}(),Ws=Xt&&Xt.isArrayBuffer,Gs=Xt&&Xt.isDate,Hs=Xt&&Xt.isMap,Us=Xt&&Xt.isRegExp,Ks=Xt&&Xt.isSet,Vs=Xt&&Xt.isTypedArray;function Gt(V,se,te){switch(te.length){case 0:return V.call(se);case 1:return V.call(se,te[0]);case 2:return V.call(se,te[0],te[1]);case 3:return V.call(se,te[0],te[1],te[2])}return V.apply(se,te)}function Cl(V,se,te,Te){for(var Me=-1,et=V==null?0:V.length;++Me<et;){var Ot=V[Me];se(Te,Ot,te(Ot),V)}return Te}function $t(V,se){for(var te=-1,Te=V==null?0:V.length;++te<Te&&se(V[te],te,V)!==!1;);return V}function wl(V,se){for(var te=V==null?0:V.length;te--&&se(V[te],te,V)!==!1;);return V}function Ys(V,se){for(var te=-1,Te=V==null?0:V.length;++te<Te;)if(!se(V[te],te,V))return!1;return!0}function Tn(V,se){for(var te=-1,Te=V==null?0:V.length,Me=0,et=[];++te<Te;){var Ot=V[te];se(Ot,te,V)&&(et[Me++]=Ot)}return et}function Oi(V,se){var te=V==null?0:V.length;return!!te&&Kn(V,se,0)>-1}function gr(V,se,te){for(var Te=-1,Me=V==null?0:V.length;++Te<Me;)if(te(se,V[Te]))return!0;return!1}function pt(V,se){for(var te=-1,Te=V==null?0:V.length,Me=Array(Te);++te<Te;)Me[te]=se(V[te],te,V);return Me}function _n(V,se){for(var te=-1,Te=se.length,Me=V.length;++te<Te;)V[Me+te]=se[te];return V}function yr(V,se,te,Te){var Me=-1,et=V==null?0:V.length;for(Te&&et&&(te=V[++Me]);++Me<et;)te=se(te,V[Me],Me,V);return te}function xl(V,se,te,Te){var Me=V==null?0:V.length;for(Te&&Me&&(te=V[--Me]);Me--;)te=se(te,V[Me],Me,V);return te}function Ir(V,se){for(var te=-1,Te=V==null?0:V.length;++te<Te;)if(se(V[te],te,V))return!0;return!1}var Nl=vr("length");function Pl(V){return V.split("")}function kl(V){return V.match(Je)||[]}function Xs(V,se,te){var Te;return te(V,function(Me,et,Ot){if(se(Me,et,Ot))return Te=et,!1}),Te}function Ri(V,se,te,Te){for(var Me=V.length,et=te+(Te?1:-1);Te?et--:++et<Me;)if(se(V[et],et,V))return et;return-1}function Kn(V,se,te){return se===se?Hl(V,se,te):Ri(V,$s,te)}function zl(V,se,te,Te){for(var Me=te-1,et=V.length;++Me<et;)if(Te(V[Me],se))return Me;return-1}function $s(V){return V!==V}function qs(V,se){var te=V==null?0:V.length;return te?br(V,se)/te:re}function vr(V){return function(se){return se==null?i:se[V]}}function Ar(V){return function(se){return V==null?i:V[se]}}function Qs(V,se,te,Te,Me){return Me(V,function(et,Ot,ot){te=Te?(Te=!1,et):se(te,et,Ot,ot)}),te}function Ml(V,se){var te=V.length;for(V.sort(se);te--;)V[te]=V[te].value;return V}function br(V,se){for(var te,Te=-1,Me=V.length;++Te<Me;){var et=se(V[Te]);et!==i&&(te=te===i?et:te+et)}return te}function Sr(V,se){for(var te=-1,Te=Array(V);++te<V;)Te[te]=se(te);return Te}function Dl(V,se){return pt(se,function(te){return[te,V[te]]})}function eo(V){return V&&V.slice(0,ro(V)+1).replace(ce,"")}function Ht(V){return function(se){return V(se)}}function Er(V,se){return pt(se,function(te){return V[te]})}function oi(V,se){return V.has(se)}function to(V,se){for(var te=-1,Te=V.length;++te<Te&&Kn(se,V[te],0)>-1;);return te}function no(V,se){for(var te=V.length;te--&&Kn(se,V[te],0)>-1;);return te}function Jl(V,se){for(var te=V.length,Te=0;te--;)V[te]===se&&++Te;return Te}var Zl=Ar(bl),Bl=Ar(Sl);function jl(V){return"\\"+Ol[V]}function Fl(V,se){return V==null?i:V[se]}function Vn(V){return yl.test(V)}function Ll(V){return Il.test(V)}function Wl(V){for(var se,te=[];!(se=V.next()).done;)te.push(se.value);return te}function Or(V){var se=-1,te=Array(V.size);return V.forEach(function(Te,Me){te[++se]=[Me,Te]}),te}function io(V,se){return function(te){return V(se(te))}}function Cn(V,se){for(var te=-1,Te=V.length,Me=0,et=[];++te<Te;){var Ot=V[te];(Ot===se||Ot===r)&&(V[te]=r,et[Me++]=te)}return et}function Ti(V){var se=-1,te=Array(V.size);return V.forEach(function(Te){te[++se]=Te}),te}function Gl(V){var se=-1,te=Array(V.size);return V.forEach(function(Te){te[++se]=[Te,Te]}),te}function Hl(V,se,te){for(var Te=te-1,Me=V.length;++Te<Me;)if(V[Te]===se)return Te;return-1}function Ul(V,se,te){for(var Te=te+1;Te--;)if(V[Te]===se)return Te;return Te}function Yn(V){return Vn(V)?Vl(V):Nl(V)}function on(V){return Vn(V)?Yl(V):Pl(V)}function ro(V){for(var se=V.length;se--&&le.test(V.charAt(se)););return se}var Kl=Ar(El);function Vl(V){for(var se=hr.lastIndex=0;hr.test(V);)++se;return se}function Yl(V){return V.match(hr)||[]}function Xl(V){return V.match(gl)||[]}var $l=function V(se){se=se==null?Ct:_i.defaults(Ct.Object(),se,_i.pick(Ct,vl));var te=se.Array,Te=se.Date,Me=se.Error,et=se.Function,Ot=se.Math,ot=se.Object,Rr=se.RegExp,ql=se.String,qt=se.TypeError,Ci=te.prototype,Ql=et.prototype,Xn=ot.prototype,wi=se["__core-js_shared__"],xi=Ql.toString,nt=Xn.hasOwnProperty,ec=0,so=function(){var e=/[^.]+$/.exec(wi&&wi.keys&&wi.keys.IE_PROTO||"");return e?"Symbol(src)_1."+e:""}(),Ni=Xn.toString,tc=xi.call(ot),nc=Ct._,ic=Rr("^"+xi.call(nt).replace(ne,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),Pi=Ls?se.Buffer:i,wn=se.Symbol,ki=se.Uint8Array,oo=Pi?Pi.allocUnsafe:i,zi=io(ot.getPrototypeOf,ot),ao=ot.create,lo=Xn.propertyIsEnumerable,Mi=Ci.splice,co=wn?wn.isConcatSpreadable:i,ai=wn?wn.iterator:i,Dn=wn?wn.toStringTag:i,Di=function(){try{var e=Fn(ot,"defineProperty");return e({},"",{}),e}catch(t){}}(),rc=se.clearTimeout!==Ct.clearTimeout&&se.clearTimeout,sc=Te&&Te.now!==Ct.Date.now&&Te.now,oc=se.setTimeout!==Ct.setTimeout&&se.setTimeout,Ji=Ot.ceil,Zi=Ot.floor,Tr=ot.getOwnPropertySymbols,ac=Pi?Pi.isBuffer:i,uo=se.isFinite,lc=Ci.join,cc=io(ot.keys,ot),Rt=Ot.max,Nt=Ot.min,uc=Te.now,pc=se.parseInt,po=Ot.random,dc=Ci.reverse,_r=Fn(se,"DataView"),li=Fn(se,"Map"),Cr=Fn(se,"Promise"),$n=Fn(se,"Set"),ci=Fn(se,"WeakMap"),ui=Fn(ot,"create"),Bi=ci&&new ci,qn={},fc=Ln(_r),hc=Ln(li),mc=Ln(Cr),gc=Ln($n),yc=Ln(ci),ji=wn?wn.prototype:i,pi=ji?ji.valueOf:i,fo=ji?ji.toString:i;function k(e){if(ft(e)&&!Ze(e)&&!(e instanceof Ve)){if(e instanceof Qt)return e;if(nt.call(e,"__wrapped__"))return ha(e)}return new Qt(e)}var Qn=function(){function e(){}return function(t){if(!dt(t))return{};if(ao)return ao(t);e.prototype=t;var a=new e;return e.prototype=i,a}}();function Fi(){}function Qt(e,t){this.__wrapped__=e,this.__actions__=[],this.__chain__=!!t,this.__index__=0,this.__values__=i}k.templateSettings={escape:H,evaluate:q,interpolate:ee,variable:"",imports:{_:k}},k.prototype=Fi.prototype,k.prototype.constructor=k,Qt.prototype=Qn(Fi.prototype),Qt.prototype.constructor=Qt;function Ve(e){this.__wrapped__=e,this.__actions__=[],this.__dir__=1,this.__filtered__=!1,this.__iteratees__=[],this.__takeCount__=ue,this.__views__=[]}function Ic(){var e=new Ve(this.__wrapped__);return e.__actions__=Zt(this.__actions__),e.__dir__=this.__dir__,e.__filtered__=this.__filtered__,e.__iteratees__=Zt(this.__iteratees__),e.__takeCount__=this.__takeCount__,e.__views__=Zt(this.__views__),e}function vc(){if(this.__filtered__){var e=new Ve(this);e.__dir__=-1,e.__filtered__=!0}else e=this.clone(),e.__dir__*=-1;return e}function Ac(){var e=this.__wrapped__.value(),t=this.__dir__,a=Ze(e),S=t<0,w=a?e.length:0,D=Pu(0,w,this.__views__),L=D.start,G=D.end,Y=G-L,de=S?G:L-1,fe=this.__iteratees__,he=fe.length,Se=0,Ce=Nt(Y,this.__takeCount__);if(!a||!S&&w==Y&&Ce==Y)return Jo(e,this.__actions__);var Pe=[];e:for(;Y--&&Se<Ce;){de+=t;for(var Fe=-1,ke=e[de];++Fe<he;){var He=fe[Fe],Xe=He.iteratee,Vt=He.type,Dt=Xe(ke);if(Vt==j)ke=Dt;else if(!Dt){if(Vt==M)continue e;break e}}Pe[Se++]=ke}return Pe}Ve.prototype=Qn(Fi.prototype),Ve.prototype.constructor=Ve;function Jn(e){var t=-1,a=e==null?0:e.length;for(this.clear();++t<a;){var S=e[t];this.set(S[0],S[1])}}function bc(){this.__data__=ui?ui(null):{},this.size=0}function Sc(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t}function Ec(e){var t=this.__data__;if(ui){var a=t[e];return a===c?i:a}return nt.call(t,e)?t[e]:i}function Oc(e){var t=this.__data__;return ui?t[e]!==i:nt.call(t,e)}function Rc(e,t){var a=this.__data__;return this.size+=this.has(e)?0:1,a[e]=ui&&t===i?c:t,this}Jn.prototype.clear=bc,Jn.prototype.delete=Sc,Jn.prototype.get=Ec,Jn.prototype.has=Oc,Jn.prototype.set=Rc;function mn(e){var t=-1,a=e==null?0:e.length;for(this.clear();++t<a;){var S=e[t];this.set(S[0],S[1])}}function Tc(){this.__data__=[],this.size=0}function _c(e){var t=this.__data__,a=Li(t,e);if(a<0)return!1;var S=t.length-1;return a==S?t.pop():Mi.call(t,a,1),--this.size,!0}function Cc(e){var t=this.__data__,a=Li(t,e);return a<0?i:t[a][1]}function wc(e){return Li(this.__data__,e)>-1}function xc(e,t){var a=this.__data__,S=Li(a,e);return S<0?(++this.size,a.push([e,t])):a[S][1]=t,this}mn.prototype.clear=Tc,mn.prototype.delete=_c,mn.prototype.get=Cc,mn.prototype.has=wc,mn.prototype.set=xc;function gn(e){var t=-1,a=e==null?0:e.length;for(this.clear();++t<a;){var S=e[t];this.set(S[0],S[1])}}function Nc(){this.size=0,this.__data__={hash:new Jn,map:new(li||mn),string:new Jn}}function Pc(e){var t=er(this,e).delete(e);return this.size-=t?1:0,t}function kc(e){return er(this,e).get(e)}function zc(e){return er(this,e).has(e)}function Mc(e,t){var a=er(this,e),S=a.size;return a.set(e,t),this.size+=a.size==S?0:1,this}gn.prototype.clear=Nc,gn.prototype.delete=Pc,gn.prototype.get=kc,gn.prototype.has=zc,gn.prototype.set=Mc;function Zn(e){var t=-1,a=e==null?0:e.length;for(this.__data__=new gn;++t<a;)this.add(e[t])}function Dc(e){return this.__data__.set(e,c),this}function Jc(e){return this.__data__.has(e)}Zn.prototype.add=Zn.prototype.push=Dc,Zn.prototype.has=Jc;function an(e){var t=this.__data__=new mn(e);this.size=t.size}function Zc(){this.__data__=new mn,this.size=0}function Bc(e){var t=this.__data__,a=t.delete(e);return this.size=t.size,a}function jc(e){return this.__data__.get(e)}function Fc(e){return this.__data__.has(e)}function Lc(e,t){var a=this.__data__;if(a instanceof mn){var S=a.__data__;if(!li||S.length<p-1)return S.push([e,t]),this.size=++a.size,this;a=this.__data__=new gn(S)}return a.set(e,t),this.size=a.size,this}an.prototype.clear=Zc,an.prototype.delete=Bc,an.prototype.get=jc,an.prototype.has=Fc,an.prototype.set=Lc;function ho(e,t){var a=Ze(e),S=!a&&Wn(e),w=!a&&!S&&zn(e),D=!a&&!S&&!w&&ii(e),L=a||S||w||D,G=L?Sr(e.length,ql):[],Y=G.length;for(var de in e)(t||nt.call(e,de))&&!(L&&(de=="length"||w&&(de=="offset"||de=="parent")||D&&(de=="buffer"||de=="byteLength"||de=="byteOffset")||An(de,Y)))&&G.push(de);return G}function mo(e){var t=e.length;return t?e[Br(0,t-1)]:i}function Wc(e,t){return tr(Zt(e),Bn(t,0,e.length))}function Gc(e){return tr(Zt(e))}function wr(e,t,a){(a!==i&&!ln(e[t],a)||a===i&&!(t in e))&&yn(e,t,a)}function di(e,t,a){var S=e[t];(!(nt.call(e,t)&&ln(S,a))||a===i&&!(t in e))&&yn(e,t,a)}function Li(e,t){for(var a=e.length;a--;)if(ln(e[a][0],t))return a;return-1}function Hc(e,t,a,S){return xn(e,function(w,D,L){t(S,w,a(w),L)}),S}function go(e,t){return e&&pn(t,_t(t),e)}function Uc(e,t){return e&&pn(t,jt(t),e)}function yn(e,t,a){t=="__proto__"&&Di?Di(e,t,{configurable:!0,enumerable:!0,value:a,writable:!0}):e[t]=a}function xr(e,t){for(var a=-1,S=t.length,w=te(S),D=e==null;++a<S;)w[a]=D?i:us(e,t[a]);return w}function Bn(e,t,a){return e===e&&(a!==i&&(e=e<=a?e:a),t!==i&&(e=e>=t?e:t)),e}function en(e,t,a,S,w,D){var L,G=t&g,Y=t&d,de=t&u;if(a&&(L=w?a(e,S,w,D):a(e)),L!==i)return L;if(!dt(e))return e;var fe=Ze(e);if(fe){if(L=zu(e),!G)return Zt(e,L)}else{var he=Pt(e),Se=he==mt||he==Be;if(zn(e))return jo(e,G);if(he==oe||he==Re||Se&&!w){if(L=Y||Se?{}:sa(e),!G)return Y?Eu(e,Uc(L,e)):Su(e,go(L,e))}else{if(!at[he])return w?e:{};L=Mu(e,he,G)}}D||(D=new an);var Ce=D.get(e);if(Ce)return Ce;D.set(e,L),za(e)?e.forEach(function(ke){L.add(en(ke,t,a,ke,e,D))}):Pa(e)&&e.forEach(function(ke,He){L.set(He,en(ke,t,a,He,e,D))});var Pe=de?Y?Xr:Yr:Y?jt:_t,Fe=fe?i:Pe(e);return $t(Fe||e,function(ke,He){Fe&&(He=ke,ke=e[He]),di(L,He,en(ke,t,a,He,e,D))}),L}function Kc(e){var t=_t(e);return function(a){return yo(a,e,t)}}function yo(e,t,a){var S=a.length;if(e==null)return!S;for(e=ot(e);S--;){var w=a[S],D=t[w],L=e[w];if(L===i&&!(w in e)||!D(L))return!1}return!0}function Io(e,t,a){if(typeof e!="function")throw new qt(l);return vi(function(){e.apply(i,a)},t)}function fi(e,t,a,S){var w=-1,D=Oi,L=!0,G=e.length,Y=[],de=t.length;if(!G)return Y;a&&(t=pt(t,Ht(a))),S?(D=gr,L=!1):t.length>=p&&(D=oi,L=!1,t=new Zn(t));e:for(;++w<G;){var fe=e[w],he=a==null?fe:a(fe);if(fe=S||fe!==0?fe:0,L&&he===he){for(var Se=de;Se--;)if(t[Se]===he)continue e;Y.push(fe)}else D(t,he,S)||Y.push(fe)}return Y}var xn=Ho(un),vo=Ho(Pr,!0);function Vc(e,t){var a=!0;return xn(e,function(S,w,D){return a=!!t(S,w,D),a}),a}function Wi(e,t,a){for(var S=-1,w=e.length;++S<w;){var D=e[S],L=t(D);if(L!=null&&(G===i?L===L&&!Kt(L):a(L,G)))var G=L,Y=D}return Y}function Yc(e,t,a,S){var w=e.length;for(a=je(a),a<0&&(a=-a>w?0:w+a),S=S===i||S>w?w:je(S),S<0&&(S+=w),S=a>S?0:Da(S);a<S;)e[a++]=t;return e}function Ao(e,t){var a=[];return xn(e,function(S,w,D){t(S,w,D)&&a.push(S)}),a}function wt(e,t,a,S,w){var D=-1,L=e.length;for(a||(a=Ju),w||(w=[]);++D<L;){var G=e[D];t>0&&a(G)?t>1?wt(G,t-1,a,S,w):_n(w,G):S||(w[w.length]=G)}return w}var Nr=Uo(),bo=Uo(!0);function un(e,t){return e&&Nr(e,t,_t)}function Pr(e,t){return e&&bo(e,t,_t)}function Gi(e,t){return Tn(t,function(a){return bn(e[a])})}function jn(e,t){t=Pn(t,e);for(var a=0,S=t.length;e!=null&&a<S;)e=e[dn(t[a++])];return a&&a==S?e:i}function So(e,t,a){var S=t(e);return Ze(e)?S:_n(S,a(e))}function zt(e){return e==null?e===i?De:ze:Dn&&Dn in ot(e)?Nu(e):Gu(e)}function kr(e,t){return e>t}function Xc(e,t){return e!=null&&nt.call(e,t)}function $c(e,t){return e!=null&&t in ot(e)}function qc(e,t,a){return e>=Nt(t,a)&&e<Rt(t,a)}function zr(e,t,a){for(var S=a?gr:Oi,w=e[0].length,D=e.length,L=D,G=te(D),Y=1/0,de=[];L--;){var fe=e[L];L&&t&&(fe=pt(fe,Ht(t))),Y=Nt(fe.length,Y),G[L]=!a&&(t||w>=120&&fe.length>=120)?new Zn(L&&fe):i}fe=e[0];var he=-1,Se=G[0];e:for(;++he<w&&de.length<Y;){var Ce=fe[he],Pe=t?t(Ce):Ce;if(Ce=a||Ce!==0?Ce:0,!(Se?oi(Se,Pe):S(de,Pe,a))){for(L=D;--L;){var Fe=G[L];if(!(Fe?oi(Fe,Pe):S(e[L],Pe,a)))continue e}Se&&Se.push(Pe),de.push(Ce)}}return de}function Qc(e,t,a,S){return un(e,function(w,D,L){t(S,a(w),D,L)}),S}function hi(e,t,a){t=Pn(t,e),e=ca(e,t);var S=e==null?e:e[dn(nn(t))];return S==null?i:Gt(S,e,a)}function Eo(e){return ft(e)&&zt(e)==Re}function eu(e){return ft(e)&&zt(e)==Ye}function tu(e){return ft(e)&&zt(e)==vt}function mi(e,t,a,S,w){return e===t?!0:e==null||t==null||!ft(e)&&!ft(t)?e!==e&&t!==t:nu(e,t,a,S,mi,w)}function nu(e,t,a,S,w,D){var L=Ze(e),G=Ze(t),Y=L?qe:Pt(e),de=G?qe:Pt(t);Y=Y==Re?oe:Y,de=de==Re?oe:de;var fe=Y==oe,he=de==oe,Se=Y==de;if(Se&&zn(e)){if(!zn(t))return!1;L=!0,fe=!1}if(Se&&!fe)return D||(D=new an),L||ii(e)?na(e,t,a,S,w,D):wu(e,t,Y,a,S,w,D);if(!(a&v)){var Ce=fe&&nt.call(e,"__wrapped__"),Pe=he&&nt.call(t,"__wrapped__");if(Ce||Pe){var Fe=Ce?e.value():e,ke=Pe?t.value():t;return D||(D=new an),w(Fe,ke,a,S,D)}}return Se?(D||(D=new an),xu(e,t,a,S,w,D)):!1}function iu(e){return ft(e)&&Pt(e)==Ue}function Mr(e,t,a,S){var w=a.length,D=w,L=!S;if(e==null)return!D;for(e=ot(e);w--;){var G=a[w];if(L&&G[2]?G[1]!==e[G[0]]:!(G[0]in e))return!1}for(;++w<D;){G=a[w];var Y=G[0],de=e[Y],fe=G[1];if(L&&G[2]){if(de===i&&!(Y in e))return!1}else{var he=new an;if(S)var Se=S(de,fe,Y,e,t,he);if(!(Se===i?mi(fe,de,v|I,S,he):Se))return!1}}return!0}function Oo(e){if(!dt(e)||Bu(e))return!1;var t=bn(e)?ic:As;return t.test(Ln(e))}function ru(e){return ft(e)&&zt(e)==ae}function su(e){return ft(e)&&Pt(e)==ve}function ou(e){return ft(e)&&ar(e.length)&&!!ut[zt(e)]}function Ro(e){return typeof e=="function"?e:e==null?Ft:typeof e=="object"?Ze(e)?Co(e[0],e[1]):_o(e):Ka(e)}function Dr(e){if(!Ii(e))return cc(e);var t=[];for(var a in ot(e))nt.call(e,a)&&a!="constructor"&&t.push(a);return t}function au(e){if(!dt(e))return Wu(e);var t=Ii(e),a=[];for(var S in e)S=="constructor"&&(t||!nt.call(e,S))||a.push(S);return a}function Jr(e,t){return e<t}function To(e,t){var a=-1,S=Bt(e)?te(e.length):[];return xn(e,function(w,D,L){S[++a]=t(w,D,L)}),S}function _o(e){var t=qr(e);return t.length==1&&t[0][2]?aa(t[0][0],t[0][1]):function(a){return a===e||Mr(a,e,t)}}function Co(e,t){return es(e)&&oa(t)?aa(dn(e),t):function(a){var S=us(a,e);return S===i&&S===t?ps(a,e):mi(t,S,v|I)}}function Hi(e,t,a,S,w){e!==t&&Nr(t,function(D,L){if(w||(w=new an),dt(D))lu(e,t,L,a,Hi,S,w);else{var G=S?S(ns(e,L),D,L+"",e,t,w):i;G===i&&(G=D),wr(e,L,G)}},jt)}function lu(e,t,a,S,w,D,L){var G=ns(e,a),Y=ns(t,a),de=L.get(Y);if(de){wr(e,a,de);return}var fe=D?D(G,Y,a+"",e,t,L):i,he=fe===i;if(he){var Se=Ze(Y),Ce=!Se&&zn(Y),Pe=!Se&&!Ce&&ii(Y);fe=Y,Se||Ce||Pe?Ze(G)?fe=G:yt(G)?fe=Zt(G):Ce?(he=!1,fe=jo(Y,!0)):Pe?(he=!1,fe=Fo(Y,!0)):fe=[]:Ai(Y)||Wn(Y)?(fe=G,Wn(G)?fe=Ja(G):(!dt(G)||bn(G))&&(fe=sa(Y))):he=!1}he&&(L.set(Y,fe),w(fe,Y,S,D,L),L.delete(Y)),wr(e,a,fe)}function wo(e,t){var a=e.length;if(a)return t+=t<0?a:0,An(t,a)?e[t]:i}function xo(e,t,a){t.length?t=pt(t,function(D){return Ze(D)?function(L){return jn(L,D.length===1?D[0]:D)}:D}):t=[Ft];var S=-1;t=pt(t,Ht(Ne()));var w=To(e,function(D,L,G){var Y=pt(t,function(de){return de(D)});return{criteria:Y,index:++S,value:D}});return Ml(w,function(D,L){return bu(D,L,a)})}function cu(e,t){return No(e,t,function(a,S){return ps(e,S)})}function No(e,t,a){for(var S=-1,w=t.length,D={};++S<w;){var L=t[S],G=jn(e,L);a(G,L)&&gi(D,Pn(L,e),G)}return D}function uu(e){return function(t){return jn(t,e)}}function Zr(e,t,a,S){var w=S?zl:Kn,D=-1,L=t.length,G=e;for(e===t&&(t=Zt(t)),a&&(G=pt(e,Ht(a)));++D<L;)for(var Y=0,de=t[D],fe=a?a(de):de;(Y=w(G,fe,Y,S))>-1;)G!==e&&Mi.call(G,Y,1),Mi.call(e,Y,1);return e}function Po(e,t){for(var a=e?t.length:0,S=a-1;a--;){var w=t[a];if(a==S||w!==D){var D=w;An(w)?Mi.call(e,w,1):Lr(e,w)}}return e}function Br(e,t){return e+Zi(po()*(t-e+1))}function pu(e,t,a,S){for(var w=-1,D=Rt(Ji((t-e)/(a||1)),0),L=te(D);D--;)L[S?D:++w]=e,e+=a;return L}function jr(e,t){var a="";if(!e||t<1||t>W)return a;do t%2&&(a+=e),t=Zi(t/2),t&&(e+=e);while(t);return a}function Ge(e,t){return is(la(e,t,Ft),e+"")}function du(e){return mo(ri(e))}function fu(e,t){var a=ri(e);return tr(a,Bn(t,0,a.length))}function gi(e,t,a,S){if(!dt(e))return e;t=Pn(t,e);for(var w=-1,D=t.length,L=D-1,G=e;G!=null&&++w<D;){var Y=dn(t[w]),de=a;if(Y==="__proto__"||Y==="constructor"||Y==="prototype")return e;if(w!=L){var fe=G[Y];de=S?S(fe,Y,G):i,de===i&&(de=dt(fe)?fe:An(t[w+1])?[]:{})}di(G,Y,de),G=G[Y]}return e}var ko=Bi?function(e,t){return Bi.set(e,t),e}:Ft,hu=Di?function(e,t){return Di(e,"toString",{configurable:!0,enumerable:!1,value:fs(t),writable:!0})}:Ft;function mu(e){return tr(ri(e))}function tn(e,t,a){var S=-1,w=e.length;t<0&&(t=-t>w?0:w+t),a=a>w?w:a,a<0&&(a+=w),w=t>a?0:a-t>>>0,t>>>=0;for(var D=te(w);++S<w;)D[S]=e[S+t];return D}function gu(e,t){var a;return xn(e,function(S,w,D){return a=t(S,w,D),!a}),!!a}function Ui(e,t,a){var S=0,w=e==null?S:e.length;if(typeof t=="number"&&t===t&&w<=Ie){for(;S<w;){var D=S+w>>>1,L=e[D];L!==null&&!Kt(L)&&(a?L<=t:L<t)?S=D+1:w=D}return w}return Fr(e,t,Ft,a)}function Fr(e,t,a,S){var w=0,D=e==null?0:e.length;if(D===0)return 0;t=a(t);for(var L=t!==t,G=t===null,Y=Kt(t),de=t===i;w<D;){var fe=Zi((w+D)/2),he=a(e[fe]),Se=he!==i,Ce=he===null,Pe=he===he,Fe=Kt(he);if(L)var ke=S||Pe;else de?ke=Pe&&(S||Se):G?ke=Pe&&Se&&(S||!Ce):Y?ke=Pe&&Se&&!Ce&&(S||!Fe):Ce||Fe?ke=!1:ke=S?he<=t:he<t;ke?w=fe+1:D=fe}return Nt(D,X)}function zo(e,t){for(var a=-1,S=e.length,w=0,D=[];++a<S;){var L=e[a],G=t?t(L):L;if(!a||!ln(G,Y)){var Y=G;D[w++]=L===0?0:L}}return D}function Mo(e){return typeof e=="number"?e:Kt(e)?re:+e}function Ut(e){if(typeof e=="string")return e;if(Ze(e))return pt(e,Ut)+"";if(Kt(e))return fo?fo.call(e):"";var t=e+"";return t=="0"&&1/e==-K?"-0":t}function Nn(e,t,a){var S=-1,w=Oi,D=e.length,L=!0,G=[],Y=G;if(a)L=!1,w=gr;else if(D>=p){var de=t?null:_u(e);if(de)return Ti(de);L=!1,w=oi,Y=new Zn}else Y=t?[]:G;e:for(;++S<D;){var fe=e[S],he=t?t(fe):fe;if(fe=a||fe!==0?fe:0,L&&he===he){for(var Se=Y.length;Se--;)if(Y[Se]===he)continue e;t&&Y.push(he),G.push(fe)}else w(Y,he,a)||(Y!==G&&Y.push(he),G.push(fe))}return G}function Lr(e,t){return t=Pn(t,e),e=ca(e,t),e==null||delete e[dn(nn(t))]}function Do(e,t,a,S){return gi(e,t,a(jn(e,t)),S)}function Ki(e,t,a,S){for(var w=e.length,D=S?w:-1;(S?D--:++D<w)&&t(e[D],D,e););return a?tn(e,S?0:D,S?D+1:w):tn(e,S?D+1:0,S?w:D)}function Jo(e,t){var a=e;return a instanceof Ve&&(a=a.value()),yr(t,function(S,w){return w.func.apply(w.thisArg,_n([S],w.args))},a)}function Wr(e,t,a){var S=e.length;if(S<2)return S?Nn(e[0]):[];for(var w=-1,D=te(S);++w<S;)for(var L=e[w],G=-1;++G<S;)G!=w&&(D[w]=fi(D[w]||L,e[G],t,a));return Nn(wt(D,1),t,a)}function Zo(e,t,a){for(var S=-1,w=e.length,D=t.length,L={};++S<w;){var G=S<D?t[S]:i;a(L,e[S],G)}return L}function Gr(e){return yt(e)?e:[]}function Hr(e){return typeof e=="function"?e:Ft}function Pn(e,t){return Ze(e)?e:es(e,t)?[e]:fa(tt(e))}var yu=Ge;function kn(e,t,a){var S=e.length;return a=a===i?S:a,!t&&a>=S?e:tn(e,t,a)}var Bo=rc||function(e){return Ct.clearTimeout(e)};function jo(e,t){if(t)return e.slice();var a=e.length,S=oo?oo(a):new e.constructor(a);return e.copy(S),S}function Ur(e){var t=new e.constructor(e.byteLength);return new ki(t).set(new ki(e)),t}function Iu(e,t){var a=t?Ur(e.buffer):e.buffer;return new e.constructor(a,e.byteOffset,e.byteLength)}function vu(e){var t=new e.constructor(e.source,We.exec(e));return t.lastIndex=e.lastIndex,t}function Au(e){return pi?ot(pi.call(e)):{}}function Fo(e,t){var a=t?Ur(e.buffer):e.buffer;return new e.constructor(a,e.byteOffset,e.length)}function Lo(e,t){if(e!==t){var a=e!==i,S=e===null,w=e===e,D=Kt(e),L=t!==i,G=t===null,Y=t===t,de=Kt(t);if(!G&&!de&&!D&&e>t||D&&L&&Y&&!G&&!de||S&&L&&Y||!a&&Y||!w)return 1;if(!S&&!D&&!de&&e<t||de&&a&&w&&!S&&!D||G&&a&&w||!L&&w||!Y)return-1}return 0}function bu(e,t,a){for(var S=-1,w=e.criteria,D=t.criteria,L=w.length,G=a.length;++S<L;){var Y=Lo(w[S],D[S]);if(Y){if(S>=G)return Y;var de=a[S];return Y*(de=="desc"?-1:1)}}return e.index-t.index}function Wo(e,t,a,S){for(var w=-1,D=e.length,L=a.length,G=-1,Y=t.length,de=Rt(D-L,0),fe=te(Y+de),he=!S;++G<Y;)fe[G]=t[G];for(;++w<L;)(he||w<D)&&(fe[a[w]]=e[w]);for(;de--;)fe[G++]=e[w++];return fe}function Go(e,t,a,S){for(var w=-1,D=e.length,L=-1,G=a.length,Y=-1,de=t.length,fe=Rt(D-G,0),he=te(fe+de),Se=!S;++w<fe;)he[w]=e[w];for(var Ce=w;++Y<de;)he[Ce+Y]=t[Y];for(;++L<G;)(Se||w<D)&&(he[Ce+a[L]]=e[w++]);return he}function Zt(e,t){var a=-1,S=e.length;for(t||(t=te(S));++a<S;)t[a]=e[a];return t}function pn(e,t,a,S){var w=!a;a||(a={});for(var D=-1,L=t.length;++D<L;){var G=t[D],Y=S?S(a[G],e[G],G,a,e):i;Y===i&&(Y=e[G]),w?yn(a,G,Y):di(a,G,Y)}return a}function Su(e,t){return pn(e,Qr(e),t)}function Eu(e,t){return pn(e,ia(e),t)}function Vi(e,t){return function(a,S){var w=Ze(a)?Cl:Hc,D=t?t():{};return w(a,e,Ne(S,2),D)}}function ei(e){return Ge(function(t,a){var S=-1,w=a.length,D=w>1?a[w-1]:i,L=w>2?a[2]:i;for(D=e.length>3&&typeof D=="function"?(w--,D):i,L&&Mt(a[0],a[1],L)&&(D=w<3?i:D,w=1),t=ot(t);++S<w;){var G=a[S];G&&e(t,G,S,D)}return t})}function Ho(e,t){return function(a,S){if(a==null)return a;if(!Bt(a))return e(a,S);for(var w=a.length,D=t?w:-1,L=ot(a);(t?D--:++D<w)&&S(L[D],D,L)!==!1;);return a}}function Uo(e){return function(t,a,S){for(var w=-1,D=ot(t),L=S(t),G=L.length;G--;){var Y=L[e?G:++w];if(a(D[Y],Y,D)===!1)break}return t}}function Ou(e,t,a){var S=t&b,w=yi(e);function D(){var L=this&&this!==Ct&&this instanceof D?w:e;return L.apply(S?a:this,arguments)}return D}function Ko(e){return function(t){t=tt(t);var a=Vn(t)?on(t):i,S=a?a[0]:t.charAt(0),w=a?kn(a,1).join(""):t.slice(1);return S[e]()+w}}function ti(e){return function(t){return yr(Ha(Ga(t).replace(hl,"")),e,"")}}function yi(e){return function(){var t=arguments;switch(t.length){case 0:return new e;case 1:return new e(t[0]);case 2:return new e(t[0],t[1]);case 3:return new e(t[0],t[1],t[2]);case 4:return new e(t[0],t[1],t[2],t[3]);case 5:return new e(t[0],t[1],t[2],t[3],t[4]);case 6:return new e(t[0],t[1],t[2],t[3],t[4],t[5]);case 7:return new e(t[0],t[1],t[2],t[3],t[4],t[5],t[6])}var a=Qn(e.prototype),S=e.apply(a,t);return dt(S)?S:a}}function Ru(e,t,a){var S=yi(e);function w(){for(var D=arguments.length,L=te(D),G=D,Y=ni(w);G--;)L[G]=arguments[G];var de=D<3&&L[0]!==Y&&L[D-1]!==Y?[]:Cn(L,Y);if(D-=de.length,D<a)return qo(e,t,Yi,w.placeholder,i,L,de,i,i,a-D);var fe=this&&this!==Ct&&this instanceof w?S:e;return Gt(fe,this,L)}return w}function Vo(e){return function(t,a,S){var w=ot(t);if(!Bt(t)){var D=Ne(a,3);t=_t(t),a=function(G){return D(w[G],G,w)}}var L=e(t,a,S);return L>-1?w[D?t[L]:L]:i}}function Yo(e){return vn(function(t){var a=t.length,S=a,w=Qt.prototype.thru;for(e&&t.reverse();S--;){var D=t[S];if(typeof D!="function")throw new qt(l);if(w&&!L&&Qi(D)=="wrapper")var L=new Qt([],!0)}for(S=L?S:a;++S<a;){D=t[S];var G=Qi(D),Y=G=="wrapper"?$r(D):i;Y&&ts(Y[0])&&Y[1]==(N|E|C|x)&&!Y[4].length&&Y[9]==1?L=L[Qi(Y[0])].apply(L,Y[3]):L=D.length==1&&ts(D)?L[G]():L.thru(D)}return function(){var de=arguments,fe=de[0];if(L&&de.length==1&&Ze(fe))return L.plant(fe).value();for(var he=0,Se=a?t[he].apply(this,de):fe;++he<a;)Se=t[he].call(this,Se);return Se}})}function Yi(e,t,a,S,w,D,L,G,Y,de){var fe=t&N,he=t&b,Se=t&R,Ce=t&(E|_),Pe=t&T,Fe=Se?i:yi(e);function ke(){for(var He=arguments.length,Xe=te(He),Vt=He;Vt--;)Xe[Vt]=arguments[Vt];if(Ce)var Dt=ni(ke),Yt=Jl(Xe,Dt);if(S&&(Xe=Wo(Xe,S,w,Ce)),D&&(Xe=Go(Xe,D,L,Ce)),He-=Yt,Ce&&He<de){var It=Cn(Xe,Dt);return qo(e,t,Yi,ke.placeholder,a,Xe,It,G,Y,de-He)}var cn=he?a:this,En=Se?cn[e]:e;return He=Xe.length,G?Xe=Hu(Xe,G):Pe&&He>1&&Xe.reverse(),fe&&Y<He&&(Xe.length=Y),this&&this!==Ct&&this instanceof ke&&(En=Fe||yi(En)),En.apply(cn,Xe)}return ke}function Xo(e,t){return function(a,S){return Qc(a,e,t(S),{})}}function Xi(e,t){return function(a,S){var w;if(a===i&&S===i)return t;if(a!==i&&(w=a),S!==i){if(w===i)return S;typeof a=="string"||typeof S=="string"?(a=Ut(a),S=Ut(S)):(a=Mo(a),S=Mo(S)),w=e(a,S)}return w}}function Kr(e){return vn(function(t){return t=pt(t,Ht(Ne())),Ge(function(a){var S=this;return e(t,function(w){return Gt(w,S,a)})})})}function $i(e,t){t=t===i?" ":Ut(t);var a=t.length;if(a<2)return a?jr(t,e):t;var S=jr(t,Ji(e/Yn(t)));return Vn(t)?kn(on(S),0,e).join(""):S.slice(0,e)}function Tu(e,t,a,S){var w=t&b,D=yi(e);function L(){for(var G=-1,Y=arguments.length,de=-1,fe=S.length,he=te(fe+Y),Se=this&&this!==Ct&&this instanceof L?D:e;++de<fe;)he[de]=S[de];for(;Y--;)he[de++]=arguments[++G];return Gt(Se,w?a:this,he)}return L}function $o(e){return function(t,a,S){return S&&typeof S!="number"&&Mt(t,a,S)&&(a=S=i),t=Sn(t),a===i?(a=t,t=0):a=Sn(a),S=S===i?t<a?1:-1:Sn(S),pu(t,a,S,e)}}function qi(e){return function(t,a){return typeof t=="string"&&typeof a=="string"||(t=rn(t),a=rn(a)),e(t,a)}}function qo(e,t,a,S,w,D,L,G,Y,de){var fe=t&E,he=fe?L:i,Se=fe?i:L,Ce=fe?D:i,Pe=fe?i:D;t|=fe?C:z,t&=~(fe?z:C),t&A||(t&=~(b|R));var Fe=[e,t,w,Ce,he,Pe,Se,G,Y,de],ke=a.apply(i,Fe);return ts(e)&&ua(ke,Fe),ke.placeholder=S,pa(ke,e,t)}function Vr(e){var t=Ot[e];return function(a,S){if(a=rn(a),S=S==null?0:Nt(je(S),292),S&&uo(a)){var w=(tt(a)+"e").split("e"),D=t(w[0]+"e"+(+w[1]+S));return w=(tt(D)+"e").split("e"),+(w[0]+"e"+(+w[1]-S))}return t(a)}}var _u=$n&&1/Ti(new $n([,-0]))[1]==K?function(e){return new $n(e)}:gs;function Qo(e){return function(t){var a=Pt(t);return a==Ue?Or(t):a==ve?Gl(t):Dl(t,e(t))}}function In(e,t,a,S,w,D,L,G){var Y=t&R;if(!Y&&typeof e!="function")throw new qt(l);var de=S?S.length:0;if(de||(t&=~(C|z),S=w=i),L=L===i?L:Rt(je(L),0),G=G===i?G:je(G),de-=w?w.length:0,t&z){var fe=S,he=w;S=w=i}var Se=Y?i:$r(e),Ce=[e,t,a,S,w,fe,he,D,L,G];if(Se&&Lu(Ce,Se),e=Ce[0],t=Ce[1],a=Ce[2],S=Ce[3],w=Ce[4],G=Ce[9]=Ce[9]===i?Y?0:e.length:Rt(Ce[9]-de,0),!G&&t&(E|_)&&(t&=~(E|_)),!t||t==b)var Pe=Ou(e,t,a);else t==E||t==_?Pe=Ru(e,t,G):(t==C||t==(b|C))&&!w.length?Pe=Tu(e,t,a,S):Pe=Yi.apply(i,Ce);var Fe=Se?ko:ua;return pa(Fe(Pe,Ce),e,t)}function ea(e,t,a,S){return e===i||ln(e,Xn[a])&&!nt.call(S,a)?t:e}function ta(e,t,a,S,w,D){return dt(e)&&dt(t)&&(D.set(t,e),Hi(e,t,i,ta,D),D.delete(t)),e}function Cu(e){return Ai(e)?i:e}function na(e,t,a,S,w,D){var L=a&v,G=e.length,Y=t.length;if(G!=Y&&!(L&&Y>G))return!1;var de=D.get(e),fe=D.get(t);if(de&&fe)return de==t&&fe==e;var he=-1,Se=!0,Ce=a&I?new Zn:i;for(D.set(e,t),D.set(t,e);++he<G;){var Pe=e[he],Fe=t[he];if(S)var ke=L?S(Fe,Pe,he,t,e,D):S(Pe,Fe,he,e,t,D);if(ke!==i){if(ke)continue;Se=!1;break}if(Ce){if(!Ir(t,function(He,Xe){if(!oi(Ce,Xe)&&(Pe===He||w(Pe,He,a,S,D)))return Ce.push(Xe)})){Se=!1;break}}else if(!(Pe===Fe||w(Pe,Fe,a,S,D))){Se=!1;break}}return D.delete(e),D.delete(t),Se}function wu(e,t,a,S,w,D,L){switch(a){case Ke:if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)return!1;e=e.buffer,t=t.buffer;case Ye:return!(e.byteLength!=t.byteLength||!D(new ki(e),new ki(t)));case At:case vt:case Lt:return ln(+e,+t);case we:return e.name==t.name&&e.message==t.message;case ae:case pe:return e==t+"";case Ue:var G=Or;case ve:var Y=S&v;if(G||(G=Ti),e.size!=t.size&&!Y)return!1;var de=L.get(e);if(de)return de==t;S|=I,L.set(e,t);var fe=na(G(e),G(t),S,w,D,L);return L.delete(e),fe;case Ee:if(pi)return pi.call(e)==pi.call(t)}return!1}function xu(e,t,a,S,w,D){var L=a&v,G=Yr(e),Y=G.length,de=Yr(t),fe=de.length;if(Y!=fe&&!L)return!1;for(var he=Y;he--;){var Se=G[he];if(!(L?Se in t:nt.call(t,Se)))return!1}var Ce=D.get(e),Pe=D.get(t);if(Ce&&Pe)return Ce==t&&Pe==e;var Fe=!0;D.set(e,t),D.set(t,e);for(var ke=L;++he<Y;){Se=G[he];var He=e[Se],Xe=t[Se];if(S)var Vt=L?S(Xe,He,Se,t,e,D):S(He,Xe,Se,e,t,D);if(!(Vt===i?He===Xe||w(He,Xe,a,S,D):Vt)){Fe=!1;break}ke||(ke=Se=="constructor")}if(Fe&&!ke){var Dt=e.constructor,Yt=t.constructor;Dt!=Yt&&"constructor"in e&&"constructor"in t&&!(typeof Dt=="function"&&Dt instanceof Dt&&typeof Yt=="function"&&Yt instanceof Yt)&&(Fe=!1)}return D.delete(e),D.delete(t),Fe}function vn(e){return is(la(e,i,ya),e+"")}function Yr(e){return So(e,_t,Qr)}function Xr(e){return So(e,jt,ia)}var $r=Bi?function(e){return Bi.get(e)}:gs;function Qi(e){for(var t=e.name+"",a=qn[t],S=nt.call(qn,t)?a.length:0;S--;){var w=a[S],D=w.func;if(D==null||D==e)return w.name}return t}function ni(e){var t=nt.call(k,"placeholder")?k:e;return t.placeholder}function Ne(){var e=k.iteratee||hs;return e=e===hs?Ro:e,arguments.length?e(arguments[0],arguments[1]):e}function er(e,t){var a=e.__data__;return Zu(t)?a[typeof t=="string"?"string":"hash"]:a.map}function qr(e){for(var t=_t(e),a=t.length;a--;){var S=t[a],w=e[S];t[a]=[S,w,oa(w)]}return t}function Fn(e,t){var a=Fl(e,t);return Oo(a)?a:i}function Nu(e){var t=nt.call(e,Dn),a=e[Dn];try{e[Dn]=i;var S=!0}catch(D){}var w=Ni.call(e);return S&&(t?e[Dn]=a:delete e[Dn]),w}var Qr=Tr?function(e){return e==null?[]:(e=ot(e),Tn(Tr(e),function(t){return lo.call(e,t)}))}:ys,ia=Tr?function(e){for(var t=[];e;)_n(t,Qr(e)),e=zi(e);return t}:ys,Pt=zt;(_r&&Pt(new _r(new ArrayBuffer(1)))!=Ke||li&&Pt(new li)!=Ue||Cr&&Pt(Cr.resolve())!=_e||$n&&Pt(new $n)!=ve||ci&&Pt(new ci)!=Le)&&(Pt=function(e){var t=zt(e),a=t==oe?e.constructor:i,S=a?Ln(a):"";if(S)switch(S){case fc:return Ke;case hc:return Ue;case mc:return _e;case gc:return ve;case yc:return Le}return t});function Pu(e,t,a){for(var S=-1,w=a.length;++S<w;){var D=a[S],L=D.size;switch(D.type){case"drop":e+=L;break;case"dropRight":t-=L;break;case"take":t=Nt(t,e+L);break;case"takeRight":e=Rt(e,t-L);break}}return{start:e,end:t}}function ku(e){var t=e.match(Oe);return t?t[1].split(me):[]}function ra(e,t,a){t=Pn(t,e);for(var S=-1,w=t.length,D=!1;++S<w;){var L=dn(t[S]);if(!(D=e!=null&&a(e,L)))break;e=e[L]}return D||++S!=w?D:(w=e==null?0:e.length,!!w&&ar(w)&&An(L,w)&&(Ze(e)||Wn(e)))}function zu(e){var t=e.length,a=new e.constructor(t);return t&&typeof e[0]=="string"&&nt.call(e,"index")&&(a.index=e.index,a.input=e.input),a}function sa(e){return typeof e.constructor=="function"&&!Ii(e)?Qn(zi(e)):{}}function Mu(e,t,a){var S=e.constructor;switch(t){case Ye:return Ur(e);case At:case vt:return new S(+e);case Ke:return Iu(e,a);case rt:case lt:case Tt:case Jt:case bt:case sn:case Wt:case fn:case Mn:return Fo(e,a);case Ue:return new S;case Lt:case pe:return new S(e);case ae:return vu(e);case ve:return new S;case Ee:return Au(e)}}function Du(e,t){var a=t.length;if(!a)return e;var S=a-1;return t[S]=(a>1?"& ":"")+t[S],t=t.join(a>2?", ":" "),e.replace(ye,`{
/* [wrapped with `+t+`] */
`)}function Ju(e){return Ze(e)||Wn(e)||!!(co&&e&&e[co])}function An(e,t){var a=typeof e;return t=t==null?W:t,!!t&&(a=="number"||a!="symbol"&&Hn.test(e))&&e>-1&&e%1==0&&e<t}function Mt(e,t,a){if(!dt(a))return!1;var S=typeof t;return(S=="number"?Bt(a)&&An(t,a.length):S=="string"&&t in a)?ln(a[t],e):!1}function es(e,t){if(Ze(e))return!1;var a=typeof e;return a=="number"||a=="symbol"||a=="boolean"||e==null||Kt(e)?!0:ge.test(e)||!ie.test(e)||t!=null&&e in ot(t)}function Zu(e){var t=typeof e;return t=="string"||t=="number"||t=="symbol"||t=="boolean"?e!=="__proto__":e===null}function ts(e){var t=Qi(e),a=k[t];if(typeof a!="function"||!(t in Ve.prototype))return!1;if(e===a)return!0;var S=$r(a);return!!S&&e===S[0]}function Bu(e){return!!so&&so in e}var ju=wi?bn:Is;function Ii(e){var t=e&&e.constructor,a=typeof t=="function"&&t.prototype||Xn;return e===a}function oa(e){return e===e&&!dt(e)}function aa(e,t){return function(a){return a==null?!1:a[e]===t&&(t!==i||e in ot(a))}}function Fu(e){var t=sr(e,function(S){return a.size===m&&a.clear(),S}),a=t.cache;return t}function Lu(e,t){var a=e[1],S=t[1],w=a|S,D=w<(b|R|N),L=S==N&&a==E||S==N&&a==x&&e[7].length<=t[8]||S==(N|x)&&t[7].length<=t[8]&&a==E;if(!(D||L))return e;S&b&&(e[2]=t[2],w|=a&b?0:A);var G=t[3];if(G){var Y=e[3];e[3]=Y?Wo(Y,G,t[4]):G,e[4]=Y?Cn(e[3],r):t[4]}return G=t[5],G&&(Y=e[5],e[5]=Y?Go(Y,G,t[6]):G,e[6]=Y?Cn(e[5],r):t[6]),G=t[7],G&&(e[7]=G),S&N&&(e[8]=e[8]==null?t[8]:Nt(e[8],t[8])),e[9]==null&&(e[9]=t[9]),e[0]=t[0],e[1]=w,e}function Wu(e){var t=[];if(e!=null)for(var a in ot(e))t.push(a);return t}function Gu(e){return Ni.call(e)}function la(e,t,a){return t=Rt(t===i?e.length-1:t,0),function(){for(var S=arguments,w=-1,D=Rt(S.length-t,0),L=te(D);++w<D;)L[w]=S[t+w];w=-1;for(var G=te(t+1);++w<t;)G[w]=S[w];return G[t]=a(L),Gt(e,this,G)}}function ca(e,t){return t.length<2?e:jn(e,tn(t,0,-1))}function Hu(e,t){for(var a=e.length,S=Nt(t.length,a),w=Zt(e);S--;){var D=t[S];e[S]=An(D,a)?w[D]:i}return e}function ns(e,t){if(!(t==="constructor"&&typeof e[t]=="function")&&t!="__proto__")return e[t]}var ua=da(ko),vi=oc||function(e,t){return Ct.setTimeout(e,t)},is=da(hu);function pa(e,t,a){var S=t+"";return is(e,Du(S,Uu(ku(S),a)))}function da(e){var t=0,a=0;return function(){var S=uc(),w=U-(S-a);if(a=S,w>0){if(++t>=F)return arguments[0]}else t=0;return e.apply(i,arguments)}}function tr(e,t){var a=-1,S=e.length,w=S-1;for(t=t===i?S:t;++a<t;){var D=Br(a,w),L=e[D];e[D]=e[a],e[a]=L}return e.length=t,e}var fa=Fu(function(e){var t=[];return e.charCodeAt(0)===46&&t.push(""),e.replace(Ae,function(a,S,w,D){t.push(w?D.replace(st,"$1"):S||a)}),t});function dn(e){if(typeof e=="string"||Kt(e))return e;var t=e+"";return t=="0"&&1/e==-K?"-0":t}function Ln(e){if(e!=null){try{return xi.call(e)}catch(t){}try{return e+""}catch(t){}}return""}function Uu(e,t){return $t(be,function(a){var S="_."+a[0];t&a[1]&&!Oi(e,S)&&e.push(S)}),e.sort()}function ha(e){if(e instanceof Ve)return e.clone();var t=new Qt(e.__wrapped__,e.__chain__);return t.__actions__=Zt(e.__actions__),t.__index__=e.__index__,t.__values__=e.__values__,t}function Ku(e,t,a){(a?Mt(e,t,a):t===i)?t=1:t=Rt(je(t),0);var S=e==null?0:e.length;if(!S||t<1)return[];for(var w=0,D=0,L=te(Ji(S/t));w<S;)L[D++]=tn(e,w,w+=t);return L}function Vu(e){for(var t=-1,a=e==null?0:e.length,S=0,w=[];++t<a;){var D=e[t];D&&(w[S++]=D)}return w}function Yu(){var e=arguments.length;if(!e)return[];for(var t=te(e-1),a=arguments[0],S=e;S--;)t[S-1]=arguments[S];return _n(Ze(a)?Zt(a):[a],wt(t,1))}var Xu=Ge(function(e,t){return yt(e)?fi(e,wt(t,1,yt,!0)):[]}),$u=Ge(function(e,t){var a=nn(t);return yt(a)&&(a=i),yt(e)?fi(e,wt(t,1,yt,!0),Ne(a,2)):[]}),qu=Ge(function(e,t){var a=nn(t);return yt(a)&&(a=i),yt(e)?fi(e,wt(t,1,yt,!0),i,a):[]});function Qu(e,t,a){var S=e==null?0:e.length;return S?(t=a||t===i?1:je(t),tn(e,t<0?0:t,S)):[]}function ep(e,t,a){var S=e==null?0:e.length;return S?(t=a||t===i?1:je(t),t=S-t,tn(e,0,t<0?0:t)):[]}function tp(e,t){return e&&e.length?Ki(e,Ne(t,3),!0,!0):[]}function np(e,t){return e&&e.length?Ki(e,Ne(t,3),!0):[]}function ip(e,t,a,S){var w=e==null?0:e.length;return w?(a&&typeof a!="number"&&Mt(e,t,a)&&(a=0,S=w),Yc(e,t,a,S)):[]}function ma(e,t,a){var S=e==null?0:e.length;if(!S)return-1;var w=a==null?0:je(a);return w<0&&(w=Rt(S+w,0)),Ri(e,Ne(t,3),w)}function ga(e,t,a){var S=e==null?0:e.length;if(!S)return-1;var w=S-1;return a!==i&&(w=je(a),w=a<0?Rt(S+w,0):Nt(w,S-1)),Ri(e,Ne(t,3),w,!0)}function ya(e){var t=e==null?0:e.length;return t?wt(e,1):[]}function rp(e){var t=e==null?0:e.length;return t?wt(e,K):[]}function sp(e,t){var a=e==null?0:e.length;return a?(t=t===i?1:je(t),wt(e,t)):[]}function op(e){for(var t=-1,a=e==null?0:e.length,S={};++t<a;){var w=e[t];S[w[0]]=w[1]}return S}function Ia(e){return e&&e.length?e[0]:i}function ap(e,t,a){var S=e==null?0:e.length;if(!S)return-1;var w=a==null?0:je(a);return w<0&&(w=Rt(S+w,0)),Kn(e,t,w)}function lp(e){var t=e==null?0:e.length;return t?tn(e,0,-1):[]}var cp=Ge(function(e){var t=pt(e,Gr);return t.length&&t[0]===e[0]?zr(t):[]}),up=Ge(function(e){var t=nn(e),a=pt(e,Gr);return t===nn(a)?t=i:a.pop(),a.length&&a[0]===e[0]?zr(a,Ne(t,2)):[]}),pp=Ge(function(e){var t=nn(e),a=pt(e,Gr);return t=typeof t=="function"?t:i,t&&a.pop(),a.length&&a[0]===e[0]?zr(a,i,t):[]});function dp(e,t){return e==null?"":lc.call(e,t)}function nn(e){var t=e==null?0:e.length;return t?e[t-1]:i}function fp(e,t,a){var S=e==null?0:e.length;if(!S)return-1;var w=S;return a!==i&&(w=je(a),w=w<0?Rt(S+w,0):Nt(w,S-1)),t===t?Ul(e,t,w):Ri(e,$s,w,!0)}function hp(e,t){return e&&e.length?wo(e,je(t)):i}var mp=Ge(va);function va(e,t){return e&&e.length&&t&&t.length?Zr(e,t):e}function gp(e,t,a){return e&&e.length&&t&&t.length?Zr(e,t,Ne(a,2)):e}function yp(e,t,a){return e&&e.length&&t&&t.length?Zr(e,t,i,a):e}var Ip=vn(function(e,t){var a=e==null?0:e.length,S=xr(e,t);return Po(e,pt(t,function(w){return An(w,a)?+w:w}).sort(Lo)),S});function vp(e,t){var a=[];if(!(e&&e.length))return a;var S=-1,w=[],D=e.length;for(t=Ne(t,3);++S<D;){var L=e[S];t(L,S,e)&&(a.push(L),w.push(S))}return Po(e,w),a}function rs(e){return e==null?e:dc.call(e)}function Ap(e,t,a){var S=e==null?0:e.length;return S?(a&&typeof a!="number"&&Mt(e,t,a)?(t=0,a=S):(t=t==null?0:je(t),a=a===i?S:je(a)),tn(e,t,a)):[]}function bp(e,t){return Ui(e,t)}function Sp(e,t,a){return Fr(e,t,Ne(a,2))}function Ep(e,t){var a=e==null?0:e.length;if(a){var S=Ui(e,t);if(S<a&&ln(e[S],t))return S}return-1}function Op(e,t){return Ui(e,t,!0)}function Rp(e,t,a){return Fr(e,t,Ne(a,2),!0)}function Tp(e,t){var a=e==null?0:e.length;if(a){var S=Ui(e,t,!0)-1;if(ln(e[S],t))return S}return-1}function _p(e){return e&&e.length?zo(e):[]}function Cp(e,t){return e&&e.length?zo(e,Ne(t,2)):[]}function wp(e){var t=e==null?0:e.length;return t?tn(e,1,t):[]}function xp(e,t,a){return e&&e.length?(t=a||t===i?1:je(t),tn(e,0,t<0?0:t)):[]}function Np(e,t,a){var S=e==null?0:e.length;return S?(t=a||t===i?1:je(t),t=S-t,tn(e,t<0?0:t,S)):[]}function Pp(e,t){return e&&e.length?Ki(e,Ne(t,3),!1,!0):[]}function kp(e,t){return e&&e.length?Ki(e,Ne(t,3)):[]}var zp=Ge(function(e){return Nn(wt(e,1,yt,!0))}),Mp=Ge(function(e){var t=nn(e);return yt(t)&&(t=i),Nn(wt(e,1,yt,!0),Ne(t,2))}),Dp=Ge(function(e){var t=nn(e);return t=typeof t=="function"?t:i,Nn(wt(e,1,yt,!0),i,t)});function Jp(e){return e&&e.length?Nn(e):[]}function Zp(e,t){return e&&e.length?Nn(e,Ne(t,2)):[]}function Bp(e,t){return t=typeof t=="function"?t:i,e&&e.length?Nn(e,i,t):[]}function ss(e){if(!(e&&e.length))return[];var t=0;return e=Tn(e,function(a){if(yt(a))return t=Rt(a.length,t),!0}),Sr(t,function(a){return pt(e,vr(a))})}function Aa(e,t){if(!(e&&e.length))return[];var a=ss(e);return t==null?a:pt(a,function(S){return Gt(t,i,S)})}var jp=Ge(function(e,t){return yt(e)?fi(e,t):[]}),Fp=Ge(function(e){return Wr(Tn(e,yt))}),Lp=Ge(function(e){var t=nn(e);return yt(t)&&(t=i),Wr(Tn(e,yt),Ne(t,2))}),Wp=Ge(function(e){var t=nn(e);return t=typeof t=="function"?t:i,Wr(Tn(e,yt),i,t)}),Gp=Ge(ss);function Hp(e,t){return Zo(e||[],t||[],di)}function Up(e,t){return Zo(e||[],t||[],gi)}var Kp=Ge(function(e){var t=e.length,a=t>1?e[t-1]:i;return a=typeof a=="function"?(e.pop(),a):i,Aa(e,a)});function ba(e){var t=k(e);return t.__chain__=!0,t}function Vp(e,t){return t(e),e}function nr(e,t){return t(e)}var Yp=vn(function(e){var t=e.length,a=t?e[0]:0,S=this.__wrapped__,w=function(D){return xr(D,e)};return t>1||this.__actions__.length||!(S instanceof Ve)||!An(a)?this.thru(w):(S=S.slice(a,+a+(t?1:0)),S.__actions__.push({func:nr,args:[w],thisArg:i}),new Qt(S,this.__chain__).thru(function(D){return t&&!D.length&&D.push(i),D}))});function Xp(){return ba(this)}function $p(){return new Qt(this.value(),this.__chain__)}function qp(){this.__values__===i&&(this.__values__=Ma(this.value()));var e=this.__index__>=this.__values__.length,t=e?i:this.__values__[this.__index__++];return{done:e,value:t}}function Qp(){return this}function ed(e){for(var t,a=this;a instanceof Fi;){var S=ha(a);S.__index__=0,S.__values__=i,t?w.__wrapped__=S:t=S;var w=S;a=a.__wrapped__}return w.__wrapped__=e,t}function td(){var e=this.__wrapped__;if(e instanceof Ve){var t=e;return this.__actions__.length&&(t=new Ve(this)),t=t.reverse(),t.__actions__.push({func:nr,args:[rs],thisArg:i}),new Qt(t,this.__chain__)}return this.thru(rs)}function nd(){return Jo(this.__wrapped__,this.__actions__)}var id=Vi(function(e,t,a){nt.call(e,a)?++e[a]:yn(e,a,1)});function rd(e,t,a){var S=Ze(e)?Ys:Vc;return a&&Mt(e,t,a)&&(t=i),S(e,Ne(t,3))}function sd(e,t){var a=Ze(e)?Tn:Ao;return a(e,Ne(t,3))}var od=Vo(ma),ad=Vo(ga);function ld(e,t){return wt(ir(e,t),1)}function cd(e,t){return wt(ir(e,t),K)}function ud(e,t,a){return a=a===i?1:je(a),wt(ir(e,t),a)}function Sa(e,t){var a=Ze(e)?$t:xn;return a(e,Ne(t,3))}function Ea(e,t){var a=Ze(e)?wl:vo;return a(e,Ne(t,3))}var pd=Vi(function(e,t,a){nt.call(e,a)?e[a].push(t):yn(e,a,[t])});function dd(e,t,a,S){e=Bt(e)?e:ri(e),a=a&&!S?je(a):0;var w=e.length;return a<0&&(a=Rt(w+a,0)),lr(e)?a<=w&&e.indexOf(t,a)>-1:!!w&&Kn(e,t,a)>-1}var fd=Ge(function(e,t,a){var S=-1,w=typeof t=="function",D=Bt(e)?te(e.length):[];return xn(e,function(L){D[++S]=w?Gt(t,L,a):hi(L,t,a)}),D}),hd=Vi(function(e,t,a){yn(e,a,t)});function ir(e,t){var a=Ze(e)?pt:To;return a(e,Ne(t,3))}function md(e,t,a,S){return e==null?[]:(Ze(t)||(t=t==null?[]:[t]),a=S?i:a,Ze(a)||(a=a==null?[]:[a]),xo(e,t,a))}var gd=Vi(function(e,t,a){e[a?0:1].push(t)},function(){return[[],[]]});function yd(e,t,a){var S=Ze(e)?yr:Qs,w=arguments.length<3;return S(e,Ne(t,4),a,w,xn)}function Id(e,t,a){var S=Ze(e)?xl:Qs,w=arguments.length<3;return S(e,Ne(t,4),a,w,vo)}function vd(e,t){var a=Ze(e)?Tn:Ao;return a(e,or(Ne(t,3)))}function Ad(e){var t=Ze(e)?mo:du;return t(e)}function bd(e,t,a){(a?Mt(e,t,a):t===i)?t=1:t=je(t);var S=Ze(e)?Wc:fu;return S(e,t)}function Sd(e){var t=Ze(e)?Gc:mu;return t(e)}function Ed(e){if(e==null)return 0;if(Bt(e))return lr(e)?Yn(e):e.length;var t=Pt(e);return t==Ue||t==ve?e.size:Dr(e).length}function Od(e,t,a){var S=Ze(e)?Ir:gu;return a&&Mt(e,t,a)&&(t=i),S(e,Ne(t,3))}var Rd=Ge(function(e,t){if(e==null)return[];var a=t.length;return a>1&&Mt(e,t[0],t[1])?t=[]:a>2&&Mt(t[0],t[1],t[2])&&(t=[t[0]]),xo(e,wt(t,1),[])}),rr=sc||function(){return Ct.Date.now()};function Td(e,t){if(typeof t!="function")throw new qt(l);return e=je(e),function(){if(--e<1)return t.apply(this,arguments)}}function Oa(e,t,a){return t=a?i:t,t=e&&t==null?e.length:t,In(e,N,i,i,i,i,t)}function Ra(e,t){var a;if(typeof t!="function")throw new qt(l);return e=je(e),function(){return--e>0&&(a=t.apply(this,arguments)),e<=1&&(t=i),a}}var os=Ge(function(e,t,a){var S=b;if(a.length){var w=Cn(a,ni(os));S|=C}return In(e,S,t,a,w)}),Ta=Ge(function(e,t,a){var S=b|R;if(a.length){var w=Cn(a,ni(Ta));S|=C}return In(t,S,e,a,w)});function _a(e,t,a){t=a?i:t;var S=In(e,E,i,i,i,i,i,t);return S.placeholder=_a.placeholder,S}function Ca(e,t,a){t=a?i:t;var S=In(e,_,i,i,i,i,i,t);return S.placeholder=Ca.placeholder,S}function wa(e,t,a){var S,w,D,L,G,Y,de=0,fe=!1,he=!1,Se=!0;if(typeof e!="function")throw new qt(l);t=rn(t)||0,dt(a)&&(fe=!!a.leading,he="maxWait"in a,D=he?Rt(rn(a.maxWait)||0,t):D,Se="trailing"in a?!!a.trailing:Se);function Ce(It){var cn=S,En=w;return S=w=i,de=It,L=e.apply(En,cn),L}function Pe(It){return de=It,G=vi(He,t),fe?Ce(It):L}function Fe(It){var cn=It-Y,En=It-de,Va=t-cn;return he?Nt(Va,D-En):Va}function ke(It){var cn=It-Y,En=It-de;return Y===i||cn>=t||cn<0||he&&En>=D}function He(){var It=rr();if(ke(It))return Xe(It);G=vi(He,Fe(It))}function Xe(It){return G=i,Se&&S?Ce(It):(S=w=i,L)}function Vt(){G!==i&&Bo(G),de=0,S=Y=w=G=i}function Dt(){return G===i?L:Xe(rr())}function Yt(){var It=rr(),cn=ke(It);if(S=arguments,w=this,Y=It,cn){if(G===i)return Pe(Y);if(he)return Bo(G),G=vi(He,t),Ce(Y)}return G===i&&(G=vi(He,t)),L}return Yt.cancel=Vt,Yt.flush=Dt,Yt}var _d=Ge(function(e,t){return Io(e,1,t)}),Cd=Ge(function(e,t,a){return Io(e,rn(t)||0,a)});function wd(e){return In(e,T)}function sr(e,t){if(typeof e!="function"||t!=null&&typeof t!="function")throw new qt(l);var a=function(){var S=arguments,w=t?t.apply(this,S):S[0],D=a.cache;if(D.has(w))return D.get(w);var L=e.apply(this,S);return a.cache=D.set(w,L)||D,L};return a.cache=new(sr.Cache||gn),a}sr.Cache=gn;function or(e){if(typeof e!="function")throw new qt(l);return function(){var t=arguments;switch(t.length){case 0:return!e.call(this);case 1:return!e.call(this,t[0]);case 2:return!e.call(this,t[0],t[1]);case 3:return!e.call(this,t[0],t[1],t[2])}return!e.apply(this,t)}}function xd(e){return Ra(2,e)}var Nd=yu(function(e,t){t=t.length==1&&Ze(t[0])?pt(t[0],Ht(Ne())):pt(wt(t,1),Ht(Ne()));var a=t.length;return Ge(function(S){for(var w=-1,D=Nt(S.length,a);++w<D;)S[w]=t[w].call(this,S[w]);return Gt(e,this,S)})}),as=Ge(function(e,t){var a=Cn(t,ni(as));return In(e,C,i,t,a)}),xa=Ge(function(e,t){var a=Cn(t,ni(xa));return In(e,z,i,t,a)}),Pd=vn(function(e,t){return In(e,x,i,i,i,t)});function kd(e,t){if(typeof e!="function")throw new qt(l);return t=t===i?t:je(t),Ge(e,t)}function zd(e,t){if(typeof e!="function")throw new qt(l);return t=t==null?0:Rt(je(t),0),Ge(function(a){var S=a[t],w=kn(a,0,t);return S&&_n(w,S),Gt(e,this,w)})}function Md(e,t,a){var S=!0,w=!0;if(typeof e!="function")throw new qt(l);return dt(a)&&(S="leading"in a?!!a.leading:S,w="trailing"in a?!!a.trailing:w),wa(e,t,{leading:S,maxWait:t,trailing:w})}function Dd(e){return Oa(e,1)}function Jd(e,t){return as(Hr(t),e)}function Zd(){if(!arguments.length)return[];var e=arguments[0];return Ze(e)?e:[e]}function Bd(e){return en(e,u)}function jd(e,t){return t=typeof t=="function"?t:i,en(e,u,t)}function Fd(e){return en(e,g|u)}function Ld(e,t){return t=typeof t=="function"?t:i,en(e,g|u,t)}function Wd(e,t){return t==null||yo(e,t,_t(t))}function ln(e,t){return e===t||e!==e&&t!==t}var Gd=qi(kr),Hd=qi(function(e,t){return e>=t}),Wn=Eo(function(){return arguments}())?Eo:function(e){return ft(e)&&nt.call(e,"callee")&&!lo.call(e,"callee")},Ze=te.isArray,Ud=Ws?Ht(Ws):eu;function Bt(e){return e!=null&&ar(e.length)&&!bn(e)}function yt(e){return ft(e)&&Bt(e)}function Kd(e){return e===!0||e===!1||ft(e)&&zt(e)==At}var zn=ac||Is,Vd=Gs?Ht(Gs):tu;function Yd(e){return ft(e)&&e.nodeType===1&&!Ai(e)}function Xd(e){if(e==null)return!0;if(Bt(e)&&(Ze(e)||typeof e=="string"||typeof e.splice=="function"||zn(e)||ii(e)||Wn(e)))return!e.length;var t=Pt(e);if(t==Ue||t==ve)return!e.size;if(Ii(e))return!Dr(e).length;for(var a in e)if(nt.call(e,a))return!1;return!0}function $d(e,t){return mi(e,t)}function qd(e,t,a){a=typeof a=="function"?a:i;var S=a?a(e,t):i;return S===i?mi(e,t,i,a):!!S}function ls(e){if(!ft(e))return!1;var t=zt(e);return t==we||t==kt||typeof e.message=="string"&&typeof e.name=="string"&&!Ai(e)}function Qd(e){return typeof e=="number"&&uo(e)}function bn(e){if(!dt(e))return!1;var t=zt(e);return t==mt||t==Be||t==ht||t==xe}function Na(e){return typeof e=="number"&&e==je(e)}function ar(e){return typeof e=="number"&&e>-1&&e%1==0&&e<=W}function dt(e){var t=typeof e;return e!=null&&(t=="object"||t=="function")}function ft(e){return e!=null&&typeof e=="object"}var Pa=Hs?Ht(Hs):iu;function ef(e,t){return e===t||Mr(e,t,qr(t))}function tf(e,t,a){return a=typeof a=="function"?a:i,Mr(e,t,qr(t),a)}function nf(e){return ka(e)&&e!=+e}function rf(e){if(ju(e))throw new Me(h);return Oo(e)}function sf(e){return e===null}function of(e){return e==null}function ka(e){return typeof e=="number"||ft(e)&&zt(e)==Lt}function Ai(e){if(!ft(e)||zt(e)!=oe)return!1;var t=zi(e);if(t===null)return!0;var a=nt.call(t,"constructor")&&t.constructor;return typeof a=="function"&&a instanceof a&&xi.call(a)==tc}var cs=Us?Ht(Us):ru;function af(e){return Na(e)&&e>=-W&&e<=W}var za=Ks?Ht(Ks):su;function lr(e){return typeof e=="string"||!Ze(e)&&ft(e)&&zt(e)==pe}function Kt(e){return typeof e=="symbol"||ft(e)&&zt(e)==Ee}var ii=Vs?Ht(Vs):ou;function lf(e){return e===i}function cf(e){return ft(e)&&Pt(e)==Le}function uf(e){return ft(e)&&zt(e)==Qe}var pf=qi(Jr),df=qi(function(e,t){return e<=t});function Ma(e){if(!e)return[];if(Bt(e))return lr(e)?on(e):Zt(e);if(ai&&e[ai])return Wl(e[ai]());var t=Pt(e),a=t==Ue?Or:t==ve?Ti:ri;return a(e)}function Sn(e){if(!e)return e===0?e:0;if(e=rn(e),e===K||e===-K){var t=e<0?-1:1;return t*Q}return e===e?e:0}function je(e){var t=Sn(e),a=t%1;return t===t?a?t-a:t:0}function Da(e){return e?Bn(je(e),0,ue):0}function rn(e){if(typeof e=="number")return e;if(Kt(e))return re;if(dt(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=dt(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=eo(e);var a=Et.test(e);return a||bs.test(e)?Tl(e.slice(2),a?2:8):$e.test(e)?re:+e}function Ja(e){return pn(e,jt(e))}function ff(e){return e?Bn(je(e),-W,W):e===0?e:0}function tt(e){return e==null?"":Ut(e)}var hf=ei(function(e,t){if(Ii(t)||Bt(t)){pn(t,_t(t),e);return}for(var a in t)nt.call(t,a)&&di(e,a,t[a])}),Za=ei(function(e,t){pn(t,jt(t),e)}),cr=ei(function(e,t,a,S){pn(t,jt(t),e,S)}),mf=ei(function(e,t,a,S){pn(t,_t(t),e,S)}),gf=vn(xr);function yf(e,t){var a=Qn(e);return t==null?a:go(a,t)}var If=Ge(function(e,t){e=ot(e);var a=-1,S=t.length,w=S>2?t[2]:i;for(w&&Mt(t[0],t[1],w)&&(S=1);++a<S;)for(var D=t[a],L=jt(D),G=-1,Y=L.length;++G<Y;){var de=L[G],fe=e[de];(fe===i||ln(fe,Xn[de])&&!nt.call(e,de))&&(e[de]=D[de])}return e}),vf=Ge(function(e){return e.push(i,ta),Gt(Ba,i,e)});function Af(e,t){return Xs(e,Ne(t,3),un)}function bf(e,t){return Xs(e,Ne(t,3),Pr)}function Sf(e,t){return e==null?e:Nr(e,Ne(t,3),jt)}function Ef(e,t){return e==null?e:bo(e,Ne(t,3),jt)}function Of(e,t){return e&&un(e,Ne(t,3))}function Rf(e,t){return e&&Pr(e,Ne(t,3))}function Tf(e){return e==null?[]:Gi(e,_t(e))}function _f(e){return e==null?[]:Gi(e,jt(e))}function us(e,t,a){var S=e==null?i:jn(e,t);return S===i?a:S}function Cf(e,t){return e!=null&&ra(e,t,Xc)}function ps(e,t){return e!=null&&ra(e,t,$c)}var wf=Xo(function(e,t,a){t!=null&&typeof t.toString!="function"&&(t=Ni.call(t)),e[t]=a},fs(Ft)),xf=Xo(function(e,t,a){t!=null&&typeof t.toString!="function"&&(t=Ni.call(t)),nt.call(e,t)?e[t].push(a):e[t]=[a]},Ne),Nf=Ge(hi);function _t(e){return Bt(e)?ho(e):Dr(e)}function jt(e){return Bt(e)?ho(e,!0):au(e)}function Pf(e,t){var a={};return t=Ne(t,3),un(e,function(S,w,D){yn(a,t(S,w,D),S)}),a}function kf(e,t){var a={};return t=Ne(t,3),un(e,function(S,w,D){yn(a,w,t(S,w,D))}),a}var zf=ei(function(e,t,a){Hi(e,t,a)}),Ba=ei(function(e,t,a,S){Hi(e,t,a,S)}),Mf=vn(function(e,t){var a={};if(e==null)return a;var S=!1;t=pt(t,function(D){return D=Pn(D,e),S||(S=D.length>1),D}),pn(e,Xr(e),a),S&&(a=en(a,g|d|u,Cu));for(var w=t.length;w--;)Lr(a,t[w]);return a});function Df(e,t){return ja(e,or(Ne(t)))}var Jf=vn(function(e,t){return e==null?{}:cu(e,t)});function ja(e,t){if(e==null)return{};var a=pt(Xr(e),function(S){return[S]});return t=Ne(t),No(e,a,function(S,w){return t(S,w[0])})}function Zf(e,t,a){t=Pn(t,e);var S=-1,w=t.length;for(w||(w=1,e=i);++S<w;){var D=e==null?i:e[dn(t[S])];D===i&&(S=w,D=a),e=bn(D)?D.call(e):D}return e}function Bf(e,t,a){return e==null?e:gi(e,t,a)}function jf(e,t,a,S){return S=typeof S=="function"?S:i,e==null?e:gi(e,t,a,S)}var Fa=Qo(_t),La=Qo(jt);function Ff(e,t,a){var S=Ze(e),w=S||zn(e)||ii(e);if(t=Ne(t,4),a==null){var D=e&&e.constructor;w?a=S?new D:[]:dt(e)?a=bn(D)?Qn(zi(e)):{}:a={}}return(w?$t:un)(e,function(L,G,Y){return t(a,L,G,Y)}),a}function Lf(e,t){return e==null?!0:Lr(e,t)}function Wf(e,t,a){return e==null?e:Do(e,t,Hr(a))}function Gf(e,t,a,S){return S=typeof S=="function"?S:i,e==null?e:Do(e,t,Hr(a),S)}function ri(e){return e==null?[]:Er(e,_t(e))}function Hf(e){return e==null?[]:Er(e,jt(e))}function Uf(e,t,a){return a===i&&(a=t,t=i),a!==i&&(a=rn(a),a=a===a?a:0),t!==i&&(t=rn(t),t=t===t?t:0),Bn(rn(e),t,a)}function Kf(e,t,a){return t=Sn(t),a===i?(a=t,t=0):a=Sn(a),e=rn(e),qc(e,t,a)}function Vf(e,t,a){if(a&&typeof a!="boolean"&&Mt(e,t,a)&&(t=a=i),a===i&&(typeof t=="boolean"?(a=t,t=i):typeof e=="boolean"&&(a=e,e=i)),e===i&&t===i?(e=0,t=1):(e=Sn(e),t===i?(t=e,e=0):t=Sn(t)),e>t){var S=e;e=t,t=S}if(a||e%1||t%1){var w=po();return Nt(e+w*(t-e+Rl("1e-"+((w+"").length-1))),t)}return Br(e,t)}var Yf=ti(function(e,t,a){return t=t.toLowerCase(),e+(a?Wa(t):t)});function Wa(e){return ds(tt(e).toLowerCase())}function Ga(e){return e=tt(e),e&&e.replace(Xa,Zl).replace(ml,"")}function Xf(e,t,a){e=tt(e),t=Ut(t);var S=e.length;a=a===i?S:Bn(je(a),0,S);var w=a;return a-=t.length,a>=0&&e.slice(a,w)==t}function $f(e){return e=tt(e),e&&Z.test(e)?e.replace(hn,Bl):e}function qf(e){return e=tt(e),e&&$.test(e)?e.replace(ne,"\\$&"):e}var Qf=ti(function(e,t,a){return e+(a?"-":"")+t.toLowerCase()}),eh=ti(function(e,t,a){return e+(a?" ":"")+t.toLowerCase()}),th=Ko("toLowerCase");function nh(e,t,a){e=tt(e),t=je(t);var S=t?Yn(e):0;if(!t||S>=t)return e;var w=(t-S)/2;return $i(Zi(w),a)+e+$i(Ji(w),a)}function ih(e,t,a){e=tt(e),t=je(t);var S=t?Yn(e):0;return t&&S<t?e+$i(t-S,a):e}function rh(e,t,a){e=tt(e),t=je(t);var S=t?Yn(e):0;return t&&S<t?$i(t-S,a)+e:e}function sh(e,t,a){return a||t==null?t=0:t&&(t=+t),pc(tt(e).replace(ce,""),t||0)}function oh(e,t,a){return(a?Mt(e,t,a):t===i)?t=1:t=je(t),jr(tt(e),t)}function ah(){var e=arguments,t=tt(e[0]);return e.length<3?t:t.replace(e[1],e[2])}var lh=ti(function(e,t,a){return e+(a?"_":"")+t.toLowerCase()});function ch(e,t,a){return a&&typeof a!="number"&&Mt(e,t,a)&&(t=a=i),a=a===i?ue:a>>>0,a?(e=tt(e),e&&(typeof t=="string"||t!=null&&!cs(t))&&(t=Ut(t),!t&&Vn(e))?kn(on(e),0,a):e.split(t,a)):[]}var uh=ti(function(e,t,a){return e+(a?" ":"")+ds(t)});function ph(e,t,a){return e=tt(e),a=a==null?0:Bn(je(a),0,e.length),t=Ut(t),e.slice(a,a+t.length)==t}function dh(e,t,a){var S=k.templateSettings;a&&Mt(e,t,a)&&(t=i),e=tt(e),t=cr({},t,S,ea);var w=cr({},t.imports,S.imports,ea),D=_t(w),L=Er(w,D),G,Y,de=0,fe=t.interpolate||bi,he="__p += '",Se=Rr((t.escape||bi).source+"|"+fe.source+"|"+(fe===ee?gt:bi).source+"|"+(t.evaluate||bi).source+"|$","g"),Ce="//# sourceURL="+(nt.call(t,"sourceURL")?(t.sourceURL+"").replace(/\s/g," "):"lodash.templateSources["+ ++Al+"]")+`
`;e.replace(Se,function(ke,He,Xe,Vt,Dt,Yt){return Xe||(Xe=Vt),he+=e.slice(de,Yt).replace($a,jl),He&&(G=!0,he+=`' +
__e(`+He+`) +
'`),Dt&&(Y=!0,he+=`';
`+Dt+`;
__p += '`),Xe&&(he+=`' +
((__t = (`+Xe+`)) == null ? '' : __t) +
'`),de=Yt+ke.length,ke}),he+=`';
`;var Pe=nt.call(t,"variable")&&t.variable;if(!Pe)he=`with (obj) {
`+he+`
}
`;else if(ct.test(Pe))throw new Me(s);he=(Y?he.replace(xt,""):he).replace(On,"$1").replace(St,"$1;"),he="function("+(Pe||"obj")+`) {
`+(Pe?"":`obj || (obj = {});
`)+"var __t, __p = ''"+(G?", __e = _.escape":"")+(Y?`, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
`:`;
`)+he+`return __p
}`;var Fe=Ua(function(){return et(D,Ce+"return "+he).apply(i,L)});if(Fe.source=he,ls(Fe))throw Fe;return Fe}function fh(e){return tt(e).toLowerCase()}function hh(e){return tt(e).toUpperCase()}function mh(e,t,a){if(e=tt(e),e&&(a||t===i))return eo(e);if(!e||!(t=Ut(t)))return e;var S=on(e),w=on(t),D=to(S,w),L=no(S,w)+1;return kn(S,D,L).join("")}function gh(e,t,a){if(e=tt(e),e&&(a||t===i))return e.slice(0,ro(e)+1);if(!e||!(t=Ut(t)))return e;var S=on(e),w=no(S,on(t))+1;return kn(S,0,w).join("")}function yh(e,t,a){if(e=tt(e),e&&(a||t===i))return e.replace(ce,"");if(!e||!(t=Ut(t)))return e;var S=on(e),w=to(S,on(t));return kn(S,w).join("")}function Ih(e,t){var a=P,S=J;if(dt(t)){var w="separator"in t?t.separator:w;a="length"in t?je(t.length):a,S="omission"in t?Ut(t.omission):S}e=tt(e);var D=e.length;if(Vn(e)){var L=on(e);D=L.length}if(a>=D)return e;var G=a-Yn(S);if(G<1)return S;var Y=L?kn(L,0,G).join(""):e.slice(0,G);if(w===i)return Y+S;if(L&&(G+=Y.length-G),cs(w)){if(e.slice(G).search(w)){var de,fe=Y;for(w.global||(w=Rr(w.source,tt(We.exec(w))+"g")),w.lastIndex=0;de=w.exec(fe);)var he=de.index;Y=Y.slice(0,he===i?G:he)}}else if(e.indexOf(Ut(w),G)!=G){var Se=Y.lastIndexOf(w);Se>-1&&(Y=Y.slice(0,Se))}return Y+S}function vh(e){return e=tt(e),e&&Rn.test(e)?e.replace(Gn,Kl):e}var Ah=ti(function(e,t,a){return e+(a?" ":"")+t.toUpperCase()}),ds=Ko("toUpperCase");function Ha(e,t,a){return e=tt(e),t=a?i:t,t===i?Ll(e)?Xl(e):kl(e):e.match(t)||[]}var Ua=Ge(function(e,t){try{return Gt(e,i,t)}catch(a){return ls(a)?a:new Me(a)}}),bh=vn(function(e,t){return $t(t,function(a){a=dn(a),yn(e,a,os(e[a],e))}),e});function Sh(e){var t=e==null?0:e.length,a=Ne();return e=t?pt(e,function(S){if(typeof S[1]!="function")throw new qt(l);return[a(S[0]),S[1]]}):[],Ge(function(S){for(var w=-1;++w<t;){var D=e[w];if(Gt(D[0],this,S))return Gt(D[1],this,S)}})}function Eh(e){return Kc(en(e,g))}function fs(e){return function(){return e}}function Oh(e,t){return e==null||e!==e?t:e}var Rh=Yo(),Th=Yo(!0);function Ft(e){return e}function hs(e){return Ro(typeof e=="function"?e:en(e,g))}function _h(e){return _o(en(e,g))}function Ch(e,t){return Co(e,en(t,g))}var wh=Ge(function(e,t){return function(a){return hi(a,e,t)}}),xh=Ge(function(e,t){return function(a){return hi(e,a,t)}});function ms(e,t,a){var S=_t(t),w=Gi(t,S);a==null&&!(dt(t)&&(w.length||!S.length))&&(a=t,t=e,e=this,w=Gi(t,_t(t)));var D=!(dt(a)&&"chain"in a)||!!a.chain,L=bn(e);return $t(w,function(G){var Y=t[G];e[G]=Y,L&&(e.prototype[G]=function(){var de=this.__chain__;if(D||de){var fe=e(this.__wrapped__),he=fe.__actions__=Zt(this.__actions__);return he.push({func:Y,args:arguments,thisArg:e}),fe.__chain__=de,fe}return Y.apply(e,_n([this.value()],arguments))})}),e}function Nh(){return Ct._===this&&(Ct._=nc),this}function gs(){}function Ph(e){return e=je(e),Ge(function(t){return wo(t,e)})}var kh=Kr(pt),zh=Kr(Ys),Mh=Kr(Ir);function Ka(e){return es(e)?vr(dn(e)):uu(e)}function Dh(e){return function(t){return e==null?i:jn(e,t)}}var Jh=$o(),Zh=$o(!0);function ys(){return[]}function Is(){return!1}function Bh(){return{}}function jh(){return""}function Fh(){return!0}function Lh(e,t){if(e=je(e),e<1||e>W)return[];var a=ue,S=Nt(e,ue);t=Ne(t),e-=ue;for(var w=Sr(S,t);++a<e;)t(a);return w}function Wh(e){return Ze(e)?pt(e,dn):Kt(e)?[e]:Zt(fa(tt(e)))}function Gh(e){var t=++ec;return tt(e)+t}var Hh=Xi(function(e,t){return e+t},0),Uh=Vr("ceil"),Kh=Xi(function(e,t){return e/t},1),Vh=Vr("floor");function Yh(e){return e&&e.length?Wi(e,Ft,kr):i}function Xh(e,t){return e&&e.length?Wi(e,Ne(t,2),kr):i}function $h(e){return qs(e,Ft)}function qh(e,t){return qs(e,Ne(t,2))}function Qh(e){return e&&e.length?Wi(e,Ft,Jr):i}function e0(e,t){return e&&e.length?Wi(e,Ne(t,2),Jr):i}var t0=Xi(function(e,t){return e*t},1),n0=Vr("round"),i0=Xi(function(e,t){return e-t},0);function r0(e){return e&&e.length?br(e,Ft):0}function s0(e,t){return e&&e.length?br(e,Ne(t,2)):0}return k.after=Td,k.ary=Oa,k.assign=hf,k.assignIn=Za,k.assignInWith=cr,k.assignWith=mf,k.at=gf,k.before=Ra,k.bind=os,k.bindAll=bh,k.bindKey=Ta,k.castArray=Zd,k.chain=ba,k.chunk=Ku,k.compact=Vu,k.concat=Yu,k.cond=Sh,k.conforms=Eh,k.constant=fs,k.countBy=id,k.create=yf,k.curry=_a,k.curryRight=Ca,k.debounce=wa,k.defaults=If,k.defaultsDeep=vf,k.defer=_d,k.delay=Cd,k.difference=Xu,k.differenceBy=$u,k.differenceWith=qu,k.drop=Qu,k.dropRight=ep,k.dropRightWhile=tp,k.dropWhile=np,k.fill=ip,k.filter=sd,k.flatMap=ld,k.flatMapDeep=cd,k.flatMapDepth=ud,k.flatten=ya,k.flattenDeep=rp,k.flattenDepth=sp,k.flip=wd,k.flow=Rh,k.flowRight=Th,k.fromPairs=op,k.functions=Tf,k.functionsIn=_f,k.groupBy=pd,k.initial=lp,k.intersection=cp,k.intersectionBy=up,k.intersectionWith=pp,k.invert=wf,k.invertBy=xf,k.invokeMap=fd,k.iteratee=hs,k.keyBy=hd,k.keys=_t,k.keysIn=jt,k.map=ir,k.mapKeys=Pf,k.mapValues=kf,k.matches=_h,k.matchesProperty=Ch,k.memoize=sr,k.merge=zf,k.mergeWith=Ba,k.method=wh,k.methodOf=xh,k.mixin=ms,k.negate=or,k.nthArg=Ph,k.omit=Mf,k.omitBy=Df,k.once=xd,k.orderBy=md,k.over=kh,k.overArgs=Nd,k.overEvery=zh,k.overSome=Mh,k.partial=as,k.partialRight=xa,k.partition=gd,k.pick=Jf,k.pickBy=ja,k.property=Ka,k.propertyOf=Dh,k.pull=mp,k.pullAll=va,k.pullAllBy=gp,k.pullAllWith=yp,k.pullAt=Ip,k.range=Jh,k.rangeRight=Zh,k.rearg=Pd,k.reject=vd,k.remove=vp,k.rest=kd,k.reverse=rs,k.sampleSize=bd,k.set=Bf,k.setWith=jf,k.shuffle=Sd,k.slice=Ap,k.sortBy=Rd,k.sortedUniq=_p,k.sortedUniqBy=Cp,k.split=ch,k.spread=zd,k.tail=wp,k.take=xp,k.takeRight=Np,k.takeRightWhile=Pp,k.takeWhile=kp,k.tap=Vp,k.throttle=Md,k.thru=nr,k.toArray=Ma,k.toPairs=Fa,k.toPairsIn=La,k.toPath=Wh,k.toPlainObject=Ja,k.transform=Ff,k.unary=Dd,k.union=zp,k.unionBy=Mp,k.unionWith=Dp,k.uniq=Jp,k.uniqBy=Zp,k.uniqWith=Bp,k.unset=Lf,k.unzip=ss,k.unzipWith=Aa,k.update=Wf,k.updateWith=Gf,k.values=ri,k.valuesIn=Hf,k.without=jp,k.words=Ha,k.wrap=Jd,k.xor=Fp,k.xorBy=Lp,k.xorWith=Wp,k.zip=Gp,k.zipObject=Hp,k.zipObjectDeep=Up,k.zipWith=Kp,k.entries=Fa,k.entriesIn=La,k.extend=Za,k.extendWith=cr,ms(k,k),k.add=Hh,k.attempt=Ua,k.camelCase=Yf,k.capitalize=Wa,k.ceil=Uh,k.clamp=Uf,k.clone=Bd,k.cloneDeep=Fd,k.cloneDeepWith=Ld,k.cloneWith=jd,k.conformsTo=Wd,k.deburr=Ga,k.defaultTo=Oh,k.divide=Kh,k.endsWith=Xf,k.eq=ln,k.escape=$f,k.escapeRegExp=qf,k.every=rd,k.find=od,k.findIndex=ma,k.findKey=Af,k.findLast=ad,k.findLastIndex=ga,k.findLastKey=bf,k.floor=Vh,k.forEach=Sa,k.forEachRight=Ea,k.forIn=Sf,k.forInRight=Ef,k.forOwn=Of,k.forOwnRight=Rf,k.get=us,k.gt=Gd,k.gte=Hd,k.has=Cf,k.hasIn=ps,k.head=Ia,k.identity=Ft,k.includes=dd,k.indexOf=ap,k.inRange=Kf,k.invoke=Nf,k.isArguments=Wn,k.isArray=Ze,k.isArrayBuffer=Ud,k.isArrayLike=Bt,k.isArrayLikeObject=yt,k.isBoolean=Kd,k.isBuffer=zn,k.isDate=Vd,k.isElement=Yd,k.isEmpty=Xd,k.isEqual=$d,k.isEqualWith=qd,k.isError=ls,k.isFinite=Qd,k.isFunction=bn,k.isInteger=Na,k.isLength=ar,k.isMap=Pa,k.isMatch=ef,k.isMatchWith=tf,k.isNaN=nf,k.isNative=rf,k.isNil=of,k.isNull=sf,k.isNumber=ka,k.isObject=dt,k.isObjectLike=ft,k.isPlainObject=Ai,k.isRegExp=cs,k.isSafeInteger=af,k.isSet=za,k.isString=lr,k.isSymbol=Kt,k.isTypedArray=ii,k.isUndefined=lf,k.isWeakMap=cf,k.isWeakSet=uf,k.join=dp,k.kebabCase=Qf,k.last=nn,k.lastIndexOf=fp,k.lowerCase=eh,k.lowerFirst=th,k.lt=pf,k.lte=df,k.max=Yh,k.maxBy=Xh,k.mean=$h,k.meanBy=qh,k.min=Qh,k.minBy=e0,k.stubArray=ys,k.stubFalse=Is,k.stubObject=Bh,k.stubString=jh,k.stubTrue=Fh,k.multiply=t0,k.nth=hp,k.noConflict=Nh,k.noop=gs,k.now=rr,k.pad=nh,k.padEnd=ih,k.padStart=rh,k.parseInt=sh,k.random=Vf,k.reduce=yd,k.reduceRight=Id,k.repeat=oh,k.replace=ah,k.result=Zf,k.round=n0,k.runInContext=V,k.sample=Ad,k.size=Ed,k.snakeCase=lh,k.some=Od,k.sortedIndex=bp,k.sortedIndexBy=Sp,k.sortedIndexOf=Ep,k.sortedLastIndex=Op,k.sortedLastIndexBy=Rp,k.sortedLastIndexOf=Tp,k.startCase=uh,k.startsWith=ph,k.subtract=i0,k.sum=r0,k.sumBy=s0,k.template=dh,k.times=Lh,k.toFinite=Sn,k.toInteger=je,k.toLength=Da,k.toLower=fh,k.toNumber=rn,k.toSafeInteger=ff,k.toString=tt,k.toUpper=hh,k.trim=mh,k.trimEnd=gh,k.trimStart=yh,k.truncate=Ih,k.unescape=vh,k.uniqueId=Gh,k.upperCase=Ah,k.upperFirst=ds,k.each=Sa,k.eachRight=Ea,k.first=Ia,ms(k,function(){var e={};return un(k,function(t,a){nt.call(k.prototype,a)||(e[a]=t)}),e}(),{chain:!1}),k.VERSION=n,$t(["bind","bindKey","curry","curryRight","partial","partialRight"],function(e){k[e].placeholder=k}),$t(["drop","take"],function(e,t){Ve.prototype[e]=function(a){a=a===i?1:Rt(je(a),0);var S=this.__filtered__&&!t?new Ve(this):this.clone();return S.__filtered__?S.__takeCount__=Nt(a,S.__takeCount__):S.__views__.push({size:Nt(a,ue),type:e+(S.__dir__<0?"Right":"")}),S},Ve.prototype[e+"Right"]=function(a){return this.reverse()[e](a).reverse()}}),$t(["filter","map","takeWhile"],function(e,t){var a=t+1,S=a==M||a==B;Ve.prototype[e]=function(w){var D=this.clone();return D.__iteratees__.push({iteratee:Ne(w,3),type:a}),D.__filtered__=D.__filtered__||S,D}}),$t(["head","last"],function(e,t){var a="take"+(t?"Right":"");Ve.prototype[e]=function(){return this[a](1).value()[0]}}),$t(["initial","tail"],function(e,t){var a="drop"+(t?"":"Right");Ve.prototype[e]=function(){return this.__filtered__?new Ve(this):this[a](1)}}),Ve.prototype.compact=function(){return this.filter(Ft)},Ve.prototype.find=function(e){return this.filter(e).head()},Ve.prototype.findLast=function(e){return this.reverse().find(e)},Ve.prototype.invokeMap=Ge(function(e,t){return typeof e=="function"?new Ve(this):this.map(function(a){return hi(a,e,t)})}),Ve.prototype.reject=function(e){return this.filter(or(Ne(e)))},Ve.prototype.slice=function(e,t){e=je(e);var a=this;return a.__filtered__&&(e>0||t<0)?new Ve(a):(e<0?a=a.takeRight(-e):e&&(a=a.drop(e)),t!==i&&(t=je(t),a=t<0?a.dropRight(-t):a.take(t-e)),a)},Ve.prototype.takeRightWhile=function(e){return this.reverse().takeWhile(e).reverse()},Ve.prototype.toArray=function(){return this.take(ue)},un(Ve.prototype,function(e,t){var a=/^(?:filter|find|map|reject)|While$/.test(t),S=/^(?:head|last)$/.test(t),w=k[S?"take"+(t=="last"?"Right":""):t],D=S||/^find/.test(t);w&&(k.prototype[t]=function(){var L=this.__wrapped__,G=S?[1]:arguments,Y=L instanceof Ve,de=G[0],fe=Y||Ze(L),he=function(He){var Xe=w.apply(k,_n([He],G));return S&&Se?Xe[0]:Xe};fe&&a&&typeof de=="function"&&de.length!=1&&(Y=fe=!1);var Se=this.__chain__,Ce=!!this.__actions__.length,Pe=D&&!Se,Fe=Y&&!Ce;if(!D&&fe){L=Fe?L:new Ve(this);var ke=e.apply(L,G);return ke.__actions__.push({func:nr,args:[he],thisArg:i}),new Qt(ke,Se)}return Pe&&Fe?e.apply(this,G):(ke=this.thru(he),Pe?S?ke.value()[0]:ke.value():ke)})}),$t(["pop","push","shift","sort","splice","unshift"],function(e){var t=Ci[e],a=/^(?:push|sort|unshift)$/.test(e)?"tap":"thru",S=/^(?:pop|shift)$/.test(e);k.prototype[e]=function(){var w=arguments;if(S&&!this.__chain__){var D=this.value();return t.apply(Ze(D)?D:[],w)}return this[a](function(L){return t.apply(Ze(L)?L:[],w)})}}),un(Ve.prototype,function(e,t){var a=k[t];if(a){var S=a.name+"";nt.call(qn,S)||(qn[S]=[]),qn[S].push({name:t,func:a})}}),qn[Yi(i,R).name]=[{name:"wrapper",func:i}],Ve.prototype.clone=Ic,Ve.prototype.reverse=vc,Ve.prototype.value=Ac,k.prototype.at=Yp,k.prototype.chain=Xp,k.prototype.commit=$p,k.prototype.next=qp,k.prototype.plant=ed,k.prototype.reverse=td,k.prototype.toJSON=k.prototype.valueOf=k.prototype.value=nd,k.prototype.first=k.prototype.head,ai&&(k.prototype[ai]=Qp),k},_i=$l();Ct._=_i,f=function(){return _i}.call(y,o,y,O),f!==i&&(O.exports=f)}).call(this)},9593:(O,y,o)=>{"use strict";const f=o(4411),i=Symbol("max"),n=Symbol("length"),p=Symbol("lengthCalculator"),h=Symbol("allowStale"),l=Symbol("maxAge"),s=Symbol("dispose"),c=Symbol("noDisposeOnSet"),m=Symbol("lruList"),r=Symbol("cache"),g=Symbol("updateAgeOnGet"),d=()=>1;class u{constructor(C){if(typeof C=="number"&&(C={max:C}),C||(C={}),C.max&&(typeof C.max!="number"||C.max<0))throw new TypeError("max must be a non-negative number");const z=this[i]=C.max||1/0,N=C.length||d;if(this[p]=typeof N!="function"?d:N,this[h]=C.stale||!1,C.maxAge&&typeof C.maxAge!="number")throw new TypeError("maxAge must be a number");this[l]=C.maxAge||0,this[s]=C.dispose,this[c]=C.noDisposeOnSet||!1,this[g]=C.updateAgeOnGet||!1,this.reset()}set max(C){if(typeof C!="number"||C<0)throw new TypeError("max must be a non-negative number");this[i]=C||1/0,b(this)}get max(){return this[i]}set allowStale(C){this[h]=!!C}get allowStale(){return this[h]}set maxAge(C){if(typeof C!="number")throw new TypeError("maxAge must be a non-negative number");this[l]=C,b(this)}get maxAge(){return this[l]}set lengthCalculator(C){typeof C!="function"&&(C=d),C!==this[p]&&(this[p]=C,this[n]=0,this[m].forEach(z=>{z.length=this[p](z.value,z.key),this[n]+=z.length})),b(this)}get lengthCalculator(){return this[p]}get length(){return this[n]}get itemCount(){return this[m].length}rforEach(C,z){z=z||this;for(let N=this[m].tail;N!==null;){const x=N.prev;E(this,C,N,z),N=x}}forEach(C,z){z=z||this;for(let N=this[m].head;N!==null;){const x=N.next;E(this,C,N,z),N=x}}keys(){return this[m].toArray().map(C=>C.key)}values(){return this[m].toArray().map(C=>C.value)}reset(){this[s]&&this[m]&&this[m].length&&this[m].forEach(C=>this[s](C.key,C.value)),this[r]=new Map,this[m]=new f,this[n]=0}dump(){return this[m].map(C=>I(this,C)?!1:{k:C.key,v:C.value,e:C.now+(C.maxAge||0)}).toArray().filter(C=>C)}dumpLru(){return this[m]}set(C,z,N){if(N=N||this[l],N&&typeof N!="number")throw new TypeError("maxAge must be a number");const x=N?Date.now():0,T=this[p](z,C);if(this[r].has(C)){if(T>this[i])return R(this,this[r].get(C)),!1;const F=this[r].get(C).value;return this[s]&&(this[c]||this[s](C,F.value)),F.now=x,F.maxAge=N,F.value=z,this[n]+=T-F.length,F.length=T,this.get(C),b(this),!0}const P=new A(C,z,T,x,N);return P.length>this[i]?(this[s]&&this[s](C,z),!1):(this[n]+=P.length,this[m].unshift(P),this[r].set(C,this[m].head),b(this),!0)}has(C){if(!this[r].has(C))return!1;const z=this[r].get(C).value;return!I(this,z)}get(C){return v(this,C,!0)}peek(C){return v(this,C,!1)}pop(){const C=this[m].tail;return C?(R(this,C),C.value):null}del(C){R(this,this[r].get(C))}load(C){this.reset();const z=Date.now();for(let N=C.length-1;N>=0;N--){const x=C[N],T=x.e||0;if(T===0)this.set(x.k,x.v);else{const P=T-z;P>0&&this.set(x.k,x.v,P)}}}prune(){this[r].forEach((C,z)=>v(this,z,!1))}}const v=(_,C,z)=>{const N=_[r].get(C);if(N){const x=N.value;if(I(_,x)){if(R(_,N),!_[h])return}else z&&(_[g]&&(N.value.now=Date.now()),_[m].unshiftNode(N));return x.value}},I=(_,C)=>{if(!C||!C.maxAge&&!_[l])return!1;const z=Date.now()-C.now;return C.maxAge?z>C.maxAge:_[l]&&z>_[l]},b=_=>{if(_[n]>_[i])for(let C=_[m].tail;_[n]>_[i]&&C!==null;){const z=C.prev;R(_,C),C=z}},R=(_,C)=>{if(C){const z=C.value;_[s]&&_[s](z.key,z.value),_[n]-=z.length,_[r].delete(z.key),_[m].removeNode(C)}};class A{constructor(C,z,N,x,T){this.key=C,this.value=z,this.length=N,this.now=x,this.maxAge=T||0}}const E=(_,C,z,N)=>{let x=z.value;I(_,x)&&(R(_,z),_[h]||(x=void 0)),x&&C.call(N,x.value,x.key,_)};O.exports=u},7874:()=>{(function(O){var y="\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b",o={pattern:/(^(["']?)\w+\2)[ \t]+\S.*/,lookbehind:!0,alias:"punctuation",inside:null},f={bash:o,environment:{pattern:RegExp("\\$"+y),alias:"constant"},variable:[{pattern:/\$?\(\([\s\S]+?\)\)/,greedy:!0,inside:{variable:[{pattern:/(^\$\(\([\s\S]+)\)\)/,lookbehind:!0},/^\$\(\(/],number:/\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,operator:/--|\+\+|\*\*=?|<<=?|>>=?|&&|\|\||[=!+\-*/%<>^&|]=?|[?~:]/,punctuation:/\(\(?|\)\)?|,|;/}},{pattern:/\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,greedy:!0,inside:{variable:/^\$\(|^`|\)$|`$/}},{pattern:/\$\{[^}]+\}/,greedy:!0,inside:{operator:/:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,punctuation:/[\[\]]/,environment:{pattern:RegExp("(\\{)"+y),lookbehind:!0,alias:"constant"}}},/\$(?:\w+|[#?*!@$])/],entity:/\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|U[0-9a-fA-F]{8}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{1,2})/};O.languages.bash={shebang:{pattern:/^#!\s*\/.*/,alias:"important"},comment:{pattern:/(^|[^"{\\$])#.*/,lookbehind:!0},"function-name":[{pattern:/(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/,lookbehind:!0,alias:"function"},{pattern:/\b[\w-]+(?=\s*\(\s*\)\s*\{)/,alias:"function"}],"for-or-select":{pattern:/(\b(?:for|select)\s+)\w+(?=\s+in\s)/,alias:"variable",lookbehind:!0},"assign-left":{pattern:/(^|[\s;|&]|[<>]\()\w+(?:\.\w+)*(?=\+?=)/,inside:{environment:{pattern:RegExp("(^|[\\s;|&]|[<>]\\()"+y),lookbehind:!0,alias:"constant"}},alias:"variable",lookbehind:!0},parameter:{pattern:/(^|\s)-{1,2}(?:\w+:[+-]?)?\w+(?:\.\w+)*(?=[=\s]|$)/,alias:"variable",lookbehind:!0},string:[{pattern:/((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/,lookbehind:!0,greedy:!0,inside:f},{pattern:/((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,lookbehind:!0,greedy:!0,inside:{bash:o}},{pattern:/(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/,lookbehind:!0,greedy:!0,inside:f},{pattern:/(^|[^$\\])'[^']*'/,lookbehind:!0,greedy:!0},{pattern:/\$'(?:[^'\\]|\\[\s\S])*'/,greedy:!0,inside:{entity:f.entity}}],environment:{pattern:RegExp("\\$?"+y),alias:"constant"},variable:f.variable,function:{pattern:/(^|[\s;|&]|[<>]\()(?:add|apropos|apt|apt-cache|apt-get|aptitude|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cargo|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|docker|docker-compose|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|java|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|node|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|podman|podman-compose|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|sysctl|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vcpkg|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,lookbehind:!0},keyword:{pattern:/(^|[\s;|&]|[<>]\()(?:case|do|done|elif|else|esac|fi|for|function|if|in|select|then|until|while)(?=$|[)\s;|&])/,lookbehind:!0},builtin:{pattern:/(^|[\s;|&]|[<>]\()(?:\.|:|alias|bind|break|builtin|caller|cd|command|continue|declare|echo|enable|eval|exec|exit|export|getopts|hash|help|let|local|logout|mapfile|printf|pwd|read|readarray|readonly|return|set|shift|shopt|source|test|times|trap|type|typeset|ulimit|umask|unalias|unset)(?=$|[)\s;|&])/,lookbehind:!0,alias:"class-name"},boolean:{pattern:/(^|[\s;|&]|[<>]\()(?:false|true)(?=$|[)\s;|&])/,lookbehind:!0},"file-descriptor":{pattern:/\B&\d\b/,alias:"important"},operator:{pattern:/\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/,inside:{"file-descriptor":{pattern:/^\d/,alias:"important"}}},punctuation:/\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,number:{pattern:/(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,lookbehind:!0}},o.inside=O.languages.bash;for(var i=["comment","function-name","for-or-select","assign-left","parameter","string","environment","function","keyword","builtin","boolean","file-descriptor","operator","punctuation","number"],n=f.variable[1].inside,p=0;p<i.length;p++)n[i[p]]=O.languages.bash[i[p]];O.languages.sh=O.languages.bash,O.languages.shell=O.languages.bash})(Prism)},57:()=>{(function(O){function y(s){return RegExp("(^(?:"+s+"):[ 	]*(?![ 	]))[^]+","i")}O.languages.http={"request-line":{pattern:/^(?:CONNECT|DELETE|GET|HEAD|OPTIONS|PATCH|POST|PRI|PUT|SEARCH|TRACE)\s(?:https?:\/\/|\/)\S*\sHTTP\/[\d.]+/m,inside:{method:{pattern:/^[A-Z]+\b/,alias:"property"},"request-target":{pattern:/^(\s)(?:https?:\/\/|\/)\S*(?=\s)/,lookbehind:!0,alias:"url",inside:O.languages.uri},"http-version":{pattern:/^(\s)HTTP\/[\d.]+/,lookbehind:!0,alias:"property"}}},"response-status":{pattern:/^HTTP\/[\d.]+ \d+ .+/m,inside:{"http-version":{pattern:/^HTTP\/[\d.]+/,alias:"property"},"status-code":{pattern:/^(\s)\d+(?=\s)/,lookbehind:!0,alias:"number"},"reason-phrase":{pattern:/^(\s).+/,lookbehind:!0,alias:"string"}}},header:{pattern:/^[\w-]+:.+(?:(?:\r\n?|\n)[ \t].+)*/m,inside:{"header-value":[{pattern:y(/Content-Security-Policy/.source),lookbehind:!0,alias:["csp","languages-csp"],inside:O.languages.csp},{pattern:y(/Public-Key-Pins(?:-Report-Only)?/.source),lookbehind:!0,alias:["hpkp","languages-hpkp"],inside:O.languages.hpkp},{pattern:y(/Strict-Transport-Security/.source),lookbehind:!0,alias:["hsts","languages-hsts"],inside:O.languages.hsts},{pattern:y(/[^:]+/.source),lookbehind:!0}],"header-name":{pattern:/^[^:]+/,alias:"keyword"},punctuation:/^:/}}};var o=O.languages,f={"application/javascript":o.javascript,"application/json":o.json||o.javascript,"application/xml":o.xml,"text/xml":o.xml,"text/html":o.html,"text/css":o.css,"text/plain":o.plain},i={"application/json":!0,"application/xml":!0};function n(s){var c=s.replace(/^[a-z]+\//,""),m="\\w+/(?:[\\w.-]+\\+)+"+c+"(?![+\\w.-])";return"(?:"+s+"|"+m+")"}var p;for(var h in f)if(f[h]){p=p||{};var l=i[h]?n(h):h;p[h.replace(/\//g,"-")]={pattern:RegExp("("+/content-type:\s*/.source+l+/(?:(?:\r\n?|\n)[\w-].*)*(?:\r(?:\n|(?!\n))|\n)/.source+")"+/[^ \t\w-][\s\S]*/.source,"i"),lookbehind:!0,inside:f[h]}}p&&O.languages.insertBefore("http","header",p)})(Prism)},4277:()=>{Prism.languages.json={property:{pattern:/(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,lookbehind:!0,greedy:!0},string:{pattern:/(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,lookbehind:!0,greedy:!0},comment:{pattern:/\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,greedy:!0},number:/-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,punctuation:/[{}[\],]/,operator:/:/,boolean:/\b(?:false|true)\b/,null:{pattern:/\bnull\b/,alias:"keyword"}},Prism.languages.webmanifest=Prism.languages.json},366:()=>{Prism.languages.python={comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0,greedy:!0},"string-interpolation":{pattern:/(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,greedy:!0,inside:{interpolation:{pattern:/((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,lookbehind:!0,inside:{"format-spec":{pattern:/(:)[^:(){}]+(?=\}$)/,lookbehind:!0},"conversion-option":{pattern:/![sra](?=[:}]$)/,alias:"punctuation"},rest:null}},string:/[\s\S]+/}},"triple-quoted-string":{pattern:/(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,greedy:!0,alias:"string"},string:{pattern:/(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,greedy:!0},function:{pattern:/((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,lookbehind:!0},"class-name":{pattern:/(\bclass\s+)\w+/i,lookbehind:!0},decorator:{pattern:/(^[\t ]*)@\w+(?:\.\w+)*/m,lookbehind:!0,alias:["annotation","punctuation"],inside:{punctuation:/\./}},keyword:/\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,builtin:/\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,boolean:/\b(?:False|None|True)\b/,number:/\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,operator:/[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,punctuation:/[{}[\];(),.:]/},Prism.languages.python["string-interpolation"].inside.interpolation.inside.rest=Prism.languages.python,Prism.languages.py=Prism.languages.python},5660:(O,y,o)=>{var f=typeof window!="undefined"?window:typeof WorkerGlobalScope!="undefined"&&self instanceof WorkerGlobalScope?self:{};/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */var i=function(n){var p=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,h=0,l={},s={manual:n.Prism&&n.Prism.manual,disableWorkerMessageHandler:n.Prism&&n.Prism.disableWorkerMessageHandler,util:{encode:function A(E){return E instanceof c?new c(E.type,A(E.content),E.alias):Array.isArray(E)?E.map(A):E.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(A){return Object.prototype.toString.call(A).slice(8,-1)},objId:function(A){return A.__id||Object.defineProperty(A,"__id",{value:++h}),A.__id},clone:function A(E,_){_=_||{};var C,z;switch(s.util.type(E)){case"Object":if(z=s.util.objId(E),_[z])return _[z];C={},_[z]=C;for(var N in E)E.hasOwnProperty(N)&&(C[N]=A(E[N],_));return C;case"Array":return z=s.util.objId(E),_[z]?_[z]:(C=[],_[z]=C,E.forEach(function(x,T){C[T]=A(x,_)}),C);default:return E}},getLanguage:function(A){for(;A;){var E=p.exec(A.className);if(E)return E[1].toLowerCase();A=A.parentElement}return"none"},setLanguage:function(A,E){A.className=A.className.replace(RegExp(p,"gi"),""),A.classList.add("language-"+E)},currentScript:function(){if(typeof document=="undefined")return null;if("currentScript"in document&&1<2)return document.currentScript;try{throw new Error}catch(C){var A=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(C.stack)||[])[1];if(A){var E=document.getElementsByTagName("script");for(var _ in E)if(E[_].src==A)return E[_]}return null}},isActive:function(A,E,_){for(var C="no-"+E;A;){var z=A.classList;if(z.contains(E))return!0;if(z.contains(C))return!1;A=A.parentElement}return!!_}},languages:{plain:l,plaintext:l,text:l,txt:l,extend:function(A,E){var _=s.util.clone(s.languages[A]);for(var C in E)_[C]=E[C];return _},insertBefore:function(A,E,_,C){C=C||s.languages;var z=C[A],N={};for(var x in z)if(z.hasOwnProperty(x)){if(x==E)for(var T in _)_.hasOwnProperty(T)&&(N[T]=_[T]);_.hasOwnProperty(x)||(N[x]=z[x])}var P=C[A];return C[A]=N,s.languages.DFS(s.languages,function(J,F){F===P&&J!=A&&(this[J]=N)}),N},DFS:function A(E,_,C,z){z=z||{};var N=s.util.objId;for(var x in E)if(E.hasOwnProperty(x)){_.call(E,x,E[x],C||x);var T=E[x],P=s.util.type(T);P==="Object"&&!z[N(T)]?(z[N(T)]=!0,A(T,_,null,z)):P==="Array"&&!z[N(T)]&&(z[N(T)]=!0,A(T,_,x,z))}}},plugins:{},highlightAll:function(A,E){s.highlightAllUnder(document,A,E)},highlightAllUnder:function(A,E,_){var C={callback:_,container:A,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};s.hooks.run("before-highlightall",C),C.elements=Array.prototype.slice.apply(C.container.querySelectorAll(C.selector)),s.hooks.run("before-all-elements-highlight",C);for(var z=0,N;N=C.elements[z++];)s.highlightElement(N,E===!0,C.callback)},highlightElement:function(A,E,_){var C=s.util.getLanguage(A),z=s.languages[C];s.util.setLanguage(A,C);var N=A.parentElement;N&&N.nodeName.toLowerCase()==="pre"&&s.util.setLanguage(N,C);var x=A.textContent,T={element:A,language:C,grammar:z,code:x};function P(F){T.highlightedCode=F,s.hooks.run("before-insert",T),T.element.innerHTML=T.highlightedCode,s.hooks.run("after-highlight",T),s.hooks.run("complete",T),_&&_.call(T.element)}if(s.hooks.run("before-sanity-check",T),N=T.element.parentElement,N&&N.nodeName.toLowerCase()==="pre"&&!N.hasAttribute("tabindex")&&N.setAttribute("tabindex","0"),!T.code){s.hooks.run("complete",T),_&&_.call(T.element);return}if(s.hooks.run("before-highlight",T),!T.grammar){P(s.util.encode(T.code));return}if(E&&n.Worker){var J=new Worker(s.filename);J.onmessage=function(F){P(F.data)},J.postMessage(JSON.stringify({language:T.language,code:T.code,immediateClose:!0}))}else P(s.highlight(T.code,T.grammar,T.language))},highlight:function(A,E,_){var C={code:A,grammar:E,language:_};if(s.hooks.run("before-tokenize",C),!C.grammar)throw new Error('The language "'+C.language+'" has no grammar.');return C.tokens=s.tokenize(C.code,C.grammar),s.hooks.run("after-tokenize",C),c.stringify(s.util.encode(C.tokens),C.language)},tokenize:function(A,E){var _=E.rest;if(_){for(var C in _)E[C]=_[C];delete E.rest}var z=new g;return d(z,z.head,A),r(A,z,E,z.head,0),v(z)},hooks:{all:{},add:function(A,E){var _=s.hooks.all;_[A]=_[A]||[],_[A].push(E)},run:function(A,E){var _=s.hooks.all[A];if(!(!_||!_.length))for(var C=0,z;z=_[C++];)z(E)}},Token:c};n.Prism=s;function c(A,E,_,C){this.type=A,this.content=E,this.alias=_,this.length=(C||"").length|0}c.stringify=function A(E,_){if(typeof E=="string")return E;if(Array.isArray(E)){var C="";return E.forEach(function(P){C+=A(P,_)}),C}var z={type:E.type,content:A(E.content,_),tag:"span",classes:["token",E.type],attributes:{},language:_},N=E.alias;N&&(Array.isArray(N)?Array.prototype.push.apply(z.classes,N):z.classes.push(N)),s.hooks.run("wrap",z);var x="";for(var T in z.attributes)x+=" "+T+'="'+(z.attributes[T]||"").replace(/"/g,"&quot;")+'"';return"<"+z.tag+' class="'+z.classes.join(" ")+'"'+x+">"+z.content+"</"+z.tag+">"};function m(A,E,_,C){A.lastIndex=E;var z=A.exec(_);if(z&&C&&z[1]){var N=z[1].length;z.index+=N,z[0]=z[0].slice(N)}return z}function r(A,E,_,C,z,N){for(var x in _)if(!(!_.hasOwnProperty(x)||!_[x])){var T=_[x];T=Array.isArray(T)?T:[T];for(var P=0;P<T.length;++P){if(N&&N.cause==x+","+P)return;var J=T[P],F=J.inside,U=!!J.lookbehind,M=!!J.greedy,j=J.alias;if(M&&!J.pattern.global){var B=J.pattern.toString().match(/[imsuy]*$/)[0];J.pattern=RegExp(J.pattern.source,B+"g")}for(var K=J.pattern||J,W=C.next,Q=z;W!==E.tail&&!(N&&Q>=N.reach);Q+=W.value.length,W=W.next){var re=W.value;if(E.length>A.length)return;if(!(re instanceof c)){var ue=1,X;if(M){if(X=m(K,Q,A,U),!X||X.index>=A.length)break;var qe=X.index,Ie=X.index+X[0].length,be=Q;for(be+=W.value.length;qe>=be;)W=W.next,be+=W.value.length;if(be-=W.value.length,Q=be,W.value instanceof c)continue;for(var Re=W;Re!==E.tail&&(be<Ie||typeof Re.value=="string");Re=Re.next)ue++,be+=Re.value.length;ue--,re=A.slice(Q,be),X.index-=Q}else if(X=m(K,0,re,U),!X)continue;var qe=X.index,ht=X[0],At=re.slice(0,qe),vt=re.slice(qe+ht.length),kt=Q+re.length;N&&kt>N.reach&&(N.reach=kt);var we=W.prev;At&&(we=d(E,we,At),Q+=At.length),u(E,we,ue);var mt=new c(x,F?s.tokenize(ht,F):ht,j,ht);if(W=d(E,we,mt),vt&&d(E,W,vt),ue>1){var Be={cause:x+","+P,reach:kt};r(A,E,_,W.prev,Q,Be),N&&Be.reach>N.reach&&(N.reach=Be.reach)}}}}}}function g(){var A={value:null,prev:null,next:null},E={value:null,prev:A,next:null};A.next=E,this.head=A,this.tail=E,this.length=0}function d(A,E,_){var C=E.next,z={value:_,prev:E,next:C};return E.next=z,C.prev=z,A.length++,z}function u(A,E,_){for(var C=E.next,z=0;z<_&&C!==A.tail;z++)C=C.next;E.next=C,C.prev=E,A.length-=z}function v(A){for(var E=[],_=A.head.next;_!==A.tail;)E.push(_.value),_=_.next;return E}if(!n.document)return n.addEventListener&&(s.disableWorkerMessageHandler||n.addEventListener("message",function(A){var E=JSON.parse(A.data),_=E.language,C=E.code,z=E.immediateClose;n.postMessage(s.highlight(C,s.languages[_],_)),z&&n.close()},!1)),s;var I=s.util.currentScript();I&&(s.filename=I.src,I.hasAttribute("data-manual")&&(s.manual=!0));function b(){s.manual||s.highlightAll()}if(!s.manual){var R=document.readyState;R==="loading"||R==="interactive"&&I&&I.defer?document.addEventListener("DOMContentLoaded",b):window.requestAnimationFrame?window.requestAnimationFrame(b):window.setTimeout(b,16)}return s}(f);O.exports&&(O.exports=i),typeof o.g!="undefined"&&(o.g.Prism=i),i.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},i.languages.markup.tag.inside["attr-value"].inside.entity=i.languages.markup.entity,i.languages.markup.doctype.inside["internal-subset"].inside=i.languages.markup,i.hooks.add("wrap",function(n){n.type==="entity"&&(n.attributes.title=n.content.replace(/&amp;/,"&"))}),Object.defineProperty(i.languages.markup.tag,"addInlined",{value:function(p,h){var l={};l["language-"+h]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:i.languages[h]},l.cdata=/^<!\[CDATA\[|\]\]>$/i;var s={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:l}};s["language-"+h]={pattern:/[\s\S]+/,inside:i.languages[h]};var c={};c[p]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return p}),"i"),lookbehind:!0,greedy:!0,inside:s},i.languages.insertBefore("markup","cdata",c)}}),Object.defineProperty(i.languages.markup.tag,"addAttribute",{value:function(n,p){i.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+n+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[p,"language-"+p],inside:i.languages[p]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),i.languages.html=i.languages.markup,i.languages.mathml=i.languages.markup,i.languages.svg=i.languages.markup,i.languages.xml=i.languages.extend("markup",{}),i.languages.ssml=i.languages.xml,i.languages.atom=i.languages.xml,i.languages.rss=i.languages.xml,function(n){var p=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;n.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+p.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+p.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+p.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+p.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:p,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},n.languages.css.atrule.inside.rest=n.languages.css;var h=n.languages.markup;h&&(h.tag.addInlined("style","css"),h.tag.addAttribute("style","css"))}(i),i.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},i.languages.javascript=i.languages.extend("clike",{"class-name":[i.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),i.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,i.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:i.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:i.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:i.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:i.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:i.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),i.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:i.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),i.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),i.languages.markup&&(i.languages.markup.tag.addInlined("script","javascript"),i.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),i.languages.js=i.languages.javascript,function(){if(typeof i=="undefined"||typeof document=="undefined")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var n="Loading\u2026",p=function(I,b){return"\u2716 Error "+I+" while fetching file: "+b},h="\u2716 Error: File does not exist or is empty",l={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},s="data-src-status",c="loading",m="loaded",r="failed",g="pre[data-src]:not(["+s+'="'+m+'"]):not(['+s+'="'+c+'"])';function d(I,b,R){var A=new XMLHttpRequest;A.open("GET",I,!0),A.onreadystatechange=function(){A.readyState==4&&(A.status<400&&A.responseText?b(A.responseText):A.status>=400?R(p(A.status,A.statusText)):R(h))},A.send(null)}function u(I){var b=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(I||"");if(b){var R=Number(b[1]),A=b[2],E=b[3];return A?E?[R,Number(E)]:[R,void 0]:[R,R]}}i.hooks.add("before-highlightall",function(I){I.selector+=", "+g}),i.hooks.add("before-sanity-check",function(I){var b=I.element;if(b.matches(g)){I.code="",b.setAttribute(s,c);var R=b.appendChild(document.createElement("CODE"));R.textContent=n;var A=b.getAttribute("data-src"),E=I.language;if(E==="none"){var _=(/\.(\w+)$/.exec(A)||[,"none"])[1];E=l[_]||_}i.util.setLanguage(R,E),i.util.setLanguage(b,E);var C=i.plugins.autoloader;C&&C.loadLanguages(E),d(A,function(z){b.setAttribute(s,m);var N=u(b.getAttribute("data-range"));if(N){var x=z.split(/\r\n?|\n/g),T=N[0],P=N[1]==null?x.length:N[1];T<0&&(T+=x.length),T=Math.max(0,Math.min(T-1,x.length)),P<0&&(P+=x.length),P=Math.max(0,Math.min(P,x.length)),z=x.slice(T,P).join(`
`),b.hasAttribute("data-start")||b.setAttribute("data-start",String(T+1))}R.textContent=z,i.highlightElement(R)},function(z){b.setAttribute(s,r),R.textContent=z})}}),i.plugins.fileHighlight={highlight:function(b){for(var R=(b||document).querySelectorAll(g),A=0,E;E=R[A++];)i.highlightElement(E)}};var v=!1;i.fileHighlight=function(){v||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),v=!0),i.plugins.fileHighlight.highlight.apply(this,arguments)}}()},2257:(O,y,o)=>{const f=Symbol("SemVer ANY");class i{static get ANY(){return f}constructor(g,d){if(d=n(d),g instanceof i){if(g.loose===!!d.loose)return g;g=g.value}g=g.trim().split(/\s+/).join(" "),s("comparator",g,d),this.options=d,this.loose=!!d.loose,this.parse(g),this.semver===f?this.value="":this.value=this.operator+this.semver.version,s("comp",this)}parse(g){const d=this.options.loose?p[h.COMPARATORLOOSE]:p[h.COMPARATOR],u=g.match(d);if(!u)throw new TypeError(`Invalid comparator: ${g}`);this.operator=u[1]!==void 0?u[1]:"",this.operator==="="&&(this.operator=""),u[2]?this.semver=new c(u[2],this.options.loose):this.semver=f}toString(){return this.value}test(g){if(s("Comparator.test",g,this.options.loose),this.semver===f||g===f)return!0;if(typeof g=="string")try{g=new c(g,this.options)}catch(d){return!1}return l(g,this.operator,this.semver,this.options)}intersects(g,d){if(!(g instanceof i))throw new TypeError("a Comparator is required");return this.operator===""?this.value===""?!0:new m(g.value,d).test(this.value):g.operator===""?g.value===""?!0:new m(this.value,d).test(g.semver):(d=n(d),d.includePrerelease&&(this.value==="<0.0.0-0"||g.value==="<0.0.0-0")||!d.includePrerelease&&(this.value.startsWith("<0.0.0")||g.value.startsWith("<0.0.0"))?!1:!!(this.operator.startsWith(">")&&g.operator.startsWith(">")||this.operator.startsWith("<")&&g.operator.startsWith("<")||this.semver.version===g.semver.version&&this.operator.includes("=")&&g.operator.includes("=")||l(this.semver,"<",g.semver,d)&&this.operator.startsWith(">")&&g.operator.startsWith("<")||l(this.semver,">",g.semver,d)&&this.operator.startsWith("<")&&g.operator.startsWith(">")))}}O.exports=i;const n=o(2893),{safeRe:p,t:h}=o(5765),l=o(7539),s=o(4225),c=o(6376),m=o(6902)},6902:(O,y,o)=>{class f{constructor(j,B){if(B=p(B),j instanceof f)return j.loose===!!B.loose&&j.includePrerelease===!!B.includePrerelease?j:new f(j.raw,B);if(j instanceof h)return this.raw=j.value,this.set=[[j]],this.format(),this;if(this.options=B,this.loose=!!B.loose,this.includePrerelease=!!B.includePrerelease,this.raw=j.trim().split(/\s+/).join(" "),this.set=this.raw.split("||").map(K=>this.parseRange(K.trim())).filter(K=>K.length),!this.set.length)throw new TypeError(`Invalid SemVer Range: ${this.raw}`);if(this.set.length>1){const K=this.set[0];if(this.set=this.set.filter(W=>!I(W[0])),this.set.length===0)this.set=[K];else if(this.set.length>1){for(const W of this.set)if(W.length===1&&b(W[0])){this.set=[W];break}}}this.format()}format(){return this.range=this.set.map(j=>j.join(" ").trim()).join("||").trim(),this.range}toString(){return this.range}parseRange(j){const K=((this.options.includePrerelease&&u)|(this.options.loose&&v))+":"+j,W=n.get(K);if(W)return W;const Q=this.options.loose,re=Q?c[m.HYPHENRANGELOOSE]:c[m.HYPHENRANGE];j=j.replace(re,F(this.options.includePrerelease)),l("hyphen replace",j),j=j.replace(c[m.COMPARATORTRIM],r),l("comparator trim",j),j=j.replace(c[m.TILDETRIM],g),l("tilde trim",j),j=j.replace(c[m.CARETTRIM],d),l("caret trim",j);let ue=j.split(" ").map(Re=>A(Re,this.options)).join(" ").split(/\s+/).map(Re=>J(Re,this.options));Q&&(ue=ue.filter(Re=>(l("loose invalid filter",Re,this.options),!!Re.match(c[m.COMPARATORLOOSE])))),l("range list",ue);const X=new Map,Ie=ue.map(Re=>new h(Re,this.options));for(const Re of Ie){if(I(Re))return[Re];X.set(Re.value,Re)}X.size>1&&X.has("")&&X.delete("");const be=[...X.values()];return n.set(K,be),be}intersects(j,B){if(!(j instanceof f))throw new TypeError("a Range is required");return this.set.some(K=>R(K,B)&&j.set.some(W=>R(W,B)&&K.every(Q=>W.every(re=>Q.intersects(re,B)))))}test(j){if(!j)return!1;if(typeof j=="string")try{j=new s(j,this.options)}catch(B){return!1}for(let B=0;B<this.set.length;B++)if(U(this.set[B],j,this.options))return!0;return!1}}O.exports=f;const i=o(9593),n=new i({max:1e3}),p=o(2893),h=o(2257),l=o(4225),s=o(6376),{safeRe:c,t:m,comparatorTrimReplace:r,tildeTrimReplace:g,caretTrimReplace:d}=o(5765),{FLAG_INCLUDE_PRERELEASE:u,FLAG_LOOSE:v}=o(3295),I=M=>M.value==="<0.0.0-0",b=M=>M.value==="",R=(M,j)=>{let B=!0;const K=M.slice();let W=K.pop();for(;B&&K.length;)B=K.every(Q=>W.intersects(Q,j)),W=K.pop();return B},A=(M,j)=>(l("comp",M,j),M=z(M,j),l("caret",M),M=_(M,j),l("tildes",M),M=x(M,j),l("xrange",M),M=P(M,j),l("stars",M),M),E=M=>!M||M.toLowerCase()==="x"||M==="*",_=(M,j)=>M.trim().split(/\s+/).map(B=>C(B,j)).join(" "),C=(M,j)=>{const B=j.loose?c[m.TILDELOOSE]:c[m.TILDE];return M.replace(B,(K,W,Q,re,ue)=>{l("tilde",M,K,W,Q,re,ue);let X;return E(W)?X="":E(Q)?X=`>=${W}.0.0 <${+W+1}.0.0-0`:E(re)?X=`>=${W}.${Q}.0 <${W}.${+Q+1}.0-0`:ue?(l("replaceTilde pr",ue),X=`>=${W}.${Q}.${re}-${ue} <${W}.${+Q+1}.0-0`):X=`>=${W}.${Q}.${re} <${W}.${+Q+1}.0-0`,l("tilde return",X),X})},z=(M,j)=>M.trim().split(/\s+/).map(B=>N(B,j)).join(" "),N=(M,j)=>{l("caret",M,j);const B=j.loose?c[m.CARETLOOSE]:c[m.CARET],K=j.includePrerelease?"-0":"";return M.replace(B,(W,Q,re,ue,X)=>{l("caret",M,W,Q,re,ue,X);let Ie;return E(Q)?Ie="":E(re)?Ie=`>=${Q}.0.0${K} <${+Q+1}.0.0-0`:E(ue)?Q==="0"?Ie=`>=${Q}.${re}.0${K} <${Q}.${+re+1}.0-0`:Ie=`>=${Q}.${re}.0${K} <${+Q+1}.0.0-0`:X?(l("replaceCaret pr",X),Q==="0"?re==="0"?Ie=`>=${Q}.${re}.${ue}-${X} <${Q}.${re}.${+ue+1}-0`:Ie=`>=${Q}.${re}.${ue}-${X} <${Q}.${+re+1}.0-0`:Ie=`>=${Q}.${re}.${ue}-${X} <${+Q+1}.0.0-0`):(l("no pr"),Q==="0"?re==="0"?Ie=`>=${Q}.${re}.${ue}${K} <${Q}.${re}.${+ue+1}-0`:Ie=`>=${Q}.${re}.${ue}${K} <${Q}.${+re+1}.0-0`:Ie=`>=${Q}.${re}.${ue} <${+Q+1}.0.0-0`),l("caret return",Ie),Ie})},x=(M,j)=>(l("replaceXRanges",M,j),M.split(/\s+/).map(B=>T(B,j)).join(" ")),T=(M,j)=>{M=M.trim();const B=j.loose?c[m.XRANGELOOSE]:c[m.XRANGE];return M.replace(B,(K,W,Q,re,ue,X)=>{l("xRange",M,K,W,Q,re,ue,X);const Ie=E(Q),be=Ie||E(re),Re=be||E(ue),qe=Re;return W==="="&&qe&&(W=""),X=j.includePrerelease?"-0":"",Ie?W===">"||W==="<"?K="<0.0.0-0":K="*":W&&qe?(be&&(re=0),ue=0,W===">"?(W=">=",be?(Q=+Q+1,re=0,ue=0):(re=+re+1,ue=0)):W==="<="&&(W="<",be?Q=+Q+1:re=+re+1),W==="<"&&(X="-0"),K=`${W+Q}.${re}.${ue}${X}`):be?K=`>=${Q}.0.0${X} <${+Q+1}.0.0-0`:Re&&(K=`>=${Q}.${re}.0${X} <${Q}.${+re+1}.0-0`),l("xRange return",K),K})},P=(M,j)=>(l("replaceStars",M,j),M.trim().replace(c[m.STAR],"")),J=(M,j)=>(l("replaceGTE0",M,j),M.trim().replace(c[j.includePrerelease?m.GTE0PRE:m.GTE0],"")),F=M=>(j,B,K,W,Q,re,ue,X,Ie,be,Re,qe,ht)=>(E(K)?B="":E(W)?B=`>=${K}.0.0${M?"-0":""}`:E(Q)?B=`>=${K}.${W}.0${M?"-0":""}`:re?B=`>=${B}`:B=`>=${B}${M?"-0":""}`,E(Ie)?X="":E(be)?X=`<${+Ie+1}.0.0-0`:E(Re)?X=`<${Ie}.${+be+1}.0-0`:qe?X=`<=${Ie}.${be}.${Re}-${qe}`:M?X=`<${Ie}.${be}.${+Re+1}-0`:X=`<=${X}`,`${B} ${X}`.trim()),U=(M,j,B)=>{for(let K=0;K<M.length;K++)if(!M[K].test(j))return!1;if(j.prerelease.length&&!B.includePrerelease){for(let K=0;K<M.length;K++)if(l(M[K].semver),M[K].semver!==h.ANY&&M[K].semver.prerelease.length>0){const W=M[K].semver;if(W.major===j.major&&W.minor===j.minor&&W.patch===j.patch)return!0}return!1}return!0}},6376:(O,y,o)=>{const f=o(4225),{MAX_LENGTH:i,MAX_SAFE_INTEGER:n}=o(3295),{safeRe:p,t:h}=o(5765),l=o(2893),{compareIdentifiers:s}=o(6742);class c{constructor(r,g){if(g=l(g),r instanceof c){if(r.loose===!!g.loose&&r.includePrerelease===!!g.includePrerelease)return r;r=r.version}else if(typeof r!="string")throw new TypeError(`Invalid version. Must be a string. Got type "${typeof r}".`);if(r.length>i)throw new TypeError(`version is longer than ${i} characters`);f("SemVer",r,g),this.options=g,this.loose=!!g.loose,this.includePrerelease=!!g.includePrerelease;const d=r.trim().match(g.loose?p[h.LOOSE]:p[h.FULL]);if(!d)throw new TypeError(`Invalid Version: ${r}`);if(this.raw=r,this.major=+d[1],this.minor=+d[2],this.patch=+d[3],this.major>n||this.major<0)throw new TypeError("Invalid major version");if(this.minor>n||this.minor<0)throw new TypeError("Invalid minor version");if(this.patch>n||this.patch<0)throw new TypeError("Invalid patch version");d[4]?this.prerelease=d[4].split(".").map(u=>{if(/^[0-9]+$/.test(u)){const v=+u;if(v>=0&&v<n)return v}return u}):this.prerelease=[],this.build=d[5]?d[5].split("."):[],this.format()}format(){return this.version=`${this.major}.${this.minor}.${this.patch}`,this.prerelease.length&&(this.version+=`-${this.prerelease.join(".")}`),this.version}toString(){return this.version}compare(r){if(f("SemVer.compare",this.version,this.options,r),!(r instanceof c)){if(typeof r=="string"&&r===this.version)return 0;r=new c(r,this.options)}return r.version===this.version?0:this.compareMain(r)||this.comparePre(r)}compareMain(r){return r instanceof c||(r=new c(r,this.options)),s(this.major,r.major)||s(this.minor,r.minor)||s(this.patch,r.patch)}comparePre(r){if(r instanceof c||(r=new c(r,this.options)),this.prerelease.length&&!r.prerelease.length)return-1;if(!this.prerelease.length&&r.prerelease.length)return 1;if(!this.prerelease.length&&!r.prerelease.length)return 0;let g=0;do{const d=this.prerelease[g],u=r.prerelease[g];if(f("prerelease compare",g,d,u),d===void 0&&u===void 0)return 0;if(u===void 0)return 1;if(d===void 0)return-1;if(d===u)continue;return s(d,u)}while(++g)}compareBuild(r){r instanceof c||(r=new c(r,this.options));let g=0;do{const d=this.build[g],u=r.build[g];if(f("prerelease compare",g,d,u),d===void 0&&u===void 0)return 0;if(u===void 0)return 1;if(d===void 0)return-1;if(d===u)continue;return s(d,u)}while(++g)}inc(r,g,d){switch(r){case"premajor":this.prerelease.length=0,this.patch=0,this.minor=0,this.major++,this.inc("pre",g,d);break;case"preminor":this.prerelease.length=0,this.patch=0,this.minor++,this.inc("pre",g,d);break;case"prepatch":this.prerelease.length=0,this.inc("patch",g,d),this.inc("pre",g,d);break;case"prerelease":this.prerelease.length===0&&this.inc("patch",g,d),this.inc("pre",g,d);break;case"major":(this.minor!==0||this.patch!==0||this.prerelease.length===0)&&this.major++,this.minor=0,this.patch=0,this.prerelease=[];break;case"minor":(this.patch!==0||this.prerelease.length===0)&&this.minor++,this.patch=0,this.prerelease=[];break;case"patch":this.prerelease.length===0&&this.patch++,this.prerelease=[];break;case"pre":{const u=Number(d)?1:0;if(!g&&d===!1)throw new Error("invalid increment argument: identifier is empty");if(this.prerelease.length===0)this.prerelease=[u];else{let v=this.prerelease.length;for(;--v>=0;)typeof this.prerelease[v]=="number"&&(this.prerelease[v]++,v=-2);if(v===-1){if(g===this.prerelease.join(".")&&d===!1)throw new Error("invalid increment argument: identifier already exists");this.prerelease.push(u)}}if(g){let v=[g,u];d===!1&&(v=[g]),s(this.prerelease[0],g)===0?isNaN(this.prerelease[1])&&(this.prerelease=v):this.prerelease=v}break}default:throw new Error(`invalid increment argument: ${r}`)}return this.raw=this.format(),this.build.length&&(this.raw+=`+${this.build.join(".")}`),this}}O.exports=c},3507:(O,y,o)=>{const f=o(3959),i=(n,p)=>{const h=f(n.trim().replace(/^[=v]+/,""),p);return h?h.version:null};O.exports=i},7539:(O,y,o)=>{const f=o(8718),i=o(1194),n=o(1312),p=o(5903),h=o(1544),l=o(2056),s=(c,m,r,g)=>{switch(m){case"===":return typeof c=="object"&&(c=c.version),typeof r=="object"&&(r=r.version),c===r;case"!==":return typeof c=="object"&&(c=c.version),typeof r=="object"&&(r=r.version),c!==r;case"":case"=":case"==":return f(c,r,g);case"!=":return i(c,r,g);case">":return n(c,r,g);case">=":return p(c,r,g);case"<":return h(c,r,g);case"<=":return l(c,r,g);default:throw new TypeError(`Invalid operator: ${m}`)}};O.exports=s},9038:(O,y,o)=>{const f=o(6376),i=o(3959),{safeRe:n,t:p}=o(5765),h=(l,s)=>{if(l instanceof f)return l;if(typeof l=="number"&&(l=String(l)),typeof l!="string")return null;s=s||{};let c=null;if(!s.rtl)c=l.match(n[p.COERCE]);else{let m;for(;(m=n[p.COERCERTL].exec(l))&&(!c||c.index+c[0].length!==l.length);)(!c||m.index+m[0].length!==c.index+c[0].length)&&(c=m),n[p.COERCERTL].lastIndex=m.index+m[1].length+m[2].length;n[p.COERCERTL].lastIndex=-1}return c===null?null:i(`${c[2]}.${c[3]||"0"}.${c[4]||"0"}`,s)};O.exports=h},8880:(O,y,o)=>{const f=o(6376),i=(n,p,h)=>{const l=new f(n,h),s=new f(p,h);return l.compare(s)||l.compareBuild(s)};O.exports=i},7880:(O,y,o)=>{const f=o(6269),i=(n,p)=>f(n,p,!0);O.exports=i},6269:(O,y,o)=>{const f=o(6376),i=(n,p,h)=>new f(n,h).compare(new f(p,h));O.exports=i},2378:(O,y,o)=>{const f=o(3959),i=(n,p)=>{const h=f(n,null,!0),l=f(p,null,!0),s=h.compare(l);if(s===0)return null;const c=s>0,m=c?h:l,r=c?l:h,g=!!m.prerelease.length;if(!!r.prerelease.length&&!g)return!r.patch&&!r.minor?"major":m.patch?"patch":m.minor?"minor":"major";const u=g?"pre":"";return h.major!==l.major?u+"major":h.minor!==l.minor?u+"minor":h.patch!==l.patch?u+"patch":"prerelease"};O.exports=i},8718:(O,y,o)=>{const f=o(6269),i=(n,p,h)=>f(n,p,h)===0;O.exports=i},1312:(O,y,o)=>{const f=o(6269),i=(n,p,h)=>f(n,p,h)>0;O.exports=i},5903:(O,y,o)=>{const f=o(6269),i=(n,p,h)=>f(n,p,h)>=0;O.exports=i},253:(O,y,o)=>{const f=o(6376),i=(n,p,h,l,s)=>{typeof h=="string"&&(s=l,l=h,h=void 0);try{return new f(n instanceof f?n.version:n,h).inc(p,l,s).version}catch(c){return null}};O.exports=i},1544:(O,y,o)=>{const f=o(6269),i=(n,p,h)=>f(n,p,h)<0;O.exports=i},2056:(O,y,o)=>{const f=o(6269),i=(n,p,h)=>f(n,p,h)<=0;O.exports=i},8679:(O,y,o)=>{const f=o(6376),i=(n,p)=>new f(n,p).major;O.exports=i},7789:(O,y,o)=>{const f=o(6376),i=(n,p)=>new f(n,p).minor;O.exports=i},1194:(O,y,o)=>{const f=o(6269),i=(n,p,h)=>f(n,p,h)!==0;O.exports=i},3959:(O,y,o)=>{const f=o(6376),i=(n,p,h=!1)=>{if(n instanceof f)return n;try{return new f(n,p)}catch(l){if(!h)return null;throw l}};O.exports=i},2358:(O,y,o)=>{const f=o(6376),i=(n,p)=>new f(n,p).patch;O.exports=i},7559:(O,y,o)=>{const f=o(3959),i=(n,p)=>{const h=f(n,p);return h&&h.prerelease.length?h.prerelease:null};O.exports=i},9795:(O,y,o)=>{const f=o(6269),i=(n,p,h)=>f(p,n,h);O.exports=i},3657:(O,y,o)=>{const f=o(8880),i=(n,p)=>n.sort((h,l)=>f(l,h,p));O.exports=i},5712:(O,y,o)=>{const f=o(6902),i=(n,p,h)=>{try{p=new f(p,h)}catch(l){return!1}return p.test(n)};O.exports=i},1100:(O,y,o)=>{const f=o(8880),i=(n,p)=>n.sort((h,l)=>f(h,l,p));O.exports=i},6397:(O,y,o)=>{const f=o(3959),i=(n,p)=>{const h=f(n,p);return h?h.version:null};O.exports=i},1249:(O,y,o)=>{const f=o(5765),i=o(3295),n=o(6376),p=o(6742),h=o(3959),l=o(6397),s=o(3507),c=o(253),m=o(2378),r=o(8679),g=o(7789),d=o(2358),u=o(7559),v=o(6269),I=o(9795),b=o(7880),R=o(8880),A=o(1100),E=o(3657),_=o(1312),C=o(1544),z=o(8718),N=o(1194),x=o(5903),T=o(2056),P=o(7539),J=o(9038),F=o(2257),U=o(6902),M=o(5712),j=o(1042),B=o(5775),K=o(1657),W=o(5316),Q=o(9042),re=o(6826),ue=o(7606),X=o(32),Ie=o(2937),be=o(7908),Re=o(799);O.exports={parse:h,valid:l,clean:s,inc:c,diff:m,major:r,minor:g,patch:d,prerelease:u,compare:v,rcompare:I,compareLoose:b,compareBuild:R,sort:A,rsort:E,gt:_,lt:C,eq:z,neq:N,gte:x,lte:T,cmp:P,coerce:J,Comparator:F,Range:U,satisfies:M,toComparators:j,maxSatisfying:B,minSatisfying:K,minVersion:W,validRange:Q,outside:re,gtr:ue,ltr:X,intersects:Ie,simplifyRange:be,subset:Re,SemVer:n,re:f.re,src:f.src,tokens:f.t,SEMVER_SPEC_VERSION:i.SEMVER_SPEC_VERSION,RELEASE_TYPES:i.RELEASE_TYPES,compareIdentifiers:p.compareIdentifiers,rcompareIdentifiers:p.rcompareIdentifiers}},3295:O=>{const y="2.0.0",f=Number.MAX_SAFE_INTEGER||9007199254740991,i=16,n=256-6,p=["major","premajor","minor","preminor","patch","prepatch","prerelease"];O.exports={MAX_LENGTH:256,MAX_SAFE_COMPONENT_LENGTH:i,MAX_SAFE_BUILD_LENGTH:n,MAX_SAFE_INTEGER:f,RELEASE_TYPES:p,SEMVER_SPEC_VERSION:y,FLAG_INCLUDE_PRERELEASE:1,FLAG_LOOSE:2}},4225:O=>{const y=typeof process=="object"&&process.env&&process.env.NODE_DEBUG&&/\bsemver\b/i.test(process.env.NODE_DEBUG)?(...o)=>console.error("SEMVER",...o):()=>{};O.exports=y},6742:O=>{const y=/^[0-9]+$/,o=(i,n)=>{const p=y.test(i),h=y.test(n);return p&&h&&(i=+i,n=+n),i===n?0:p&&!h?-1:h&&!p?1:i<n?-1:1},f=(i,n)=>o(n,i);O.exports={compareIdentifiers:o,rcompareIdentifiers:f}},2893:O=>{const y=Object.freeze({loose:!0}),o=Object.freeze({}),f=i=>i?typeof i!="object"?y:i:o;O.exports=f},5765:(O,y,o)=>{const{MAX_SAFE_COMPONENT_LENGTH:f,MAX_SAFE_BUILD_LENGTH:i,MAX_LENGTH:n}=o(3295),p=o(4225);y=O.exports={};const h=y.re=[],l=y.safeRe=[],s=y.src=[],c=y.t={};let m=0;const r="[a-zA-Z0-9-]",g=[["\\s",1],["\\d",n],[r,i]],d=v=>{for(const[I,b]of g)v=v.split(`${I}*`).join(`${I}{0,${b}}`).split(`${I}+`).join(`${I}{1,${b}}`);return v},u=(v,I,b)=>{const R=d(I),A=m++;p(v,A,I),c[v]=A,s[A]=I,h[A]=new RegExp(I,b?"g":void 0),l[A]=new RegExp(R,b?"g":void 0)};u("NUMERICIDENTIFIER","0|[1-9]\\d*"),u("NUMERICIDENTIFIERLOOSE","\\d+"),u("NONNUMERICIDENTIFIER",`\\d*[a-zA-Z-]${r}*`),u("MAINVERSION",`(${s[c.NUMERICIDENTIFIER]})\\.(${s[c.NUMERICIDENTIFIER]})\\.(${s[c.NUMERICIDENTIFIER]})`),u("MAINVERSIONLOOSE",`(${s[c.NUMERICIDENTIFIERLOOSE]})\\.(${s[c.NUMERICIDENTIFIERLOOSE]})\\.(${s[c.NUMERICIDENTIFIERLOOSE]})`),u("PRERELEASEIDENTIFIER",`(?:${s[c.NUMERICIDENTIFIER]}|${s[c.NONNUMERICIDENTIFIER]})`),u("PRERELEASEIDENTIFIERLOOSE",`(?:${s[c.NUMERICIDENTIFIERLOOSE]}|${s[c.NONNUMERICIDENTIFIER]})`),u("PRERELEASE",`(?:-(${s[c.PRERELEASEIDENTIFIER]}(?:\\.${s[c.PRERELEASEIDENTIFIER]})*))`),u("PRERELEASELOOSE",`(?:-?(${s[c.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${s[c.PRERELEASEIDENTIFIERLOOSE]})*))`),u("BUILDIDENTIFIER",`${r}+`),u("BUILD",`(?:\\+(${s[c.BUILDIDENTIFIER]}(?:\\.${s[c.BUILDIDENTIFIER]})*))`),u("FULLPLAIN",`v?${s[c.MAINVERSION]}${s[c.PRERELEASE]}?${s[c.BUILD]}?`),u("FULL",`^${s[c.FULLPLAIN]}$`),u("LOOSEPLAIN",`[v=\\s]*${s[c.MAINVERSIONLOOSE]}${s[c.PRERELEASELOOSE]}?${s[c.BUILD]}?`),u("LOOSE",`^${s[c.LOOSEPLAIN]}$`),u("GTLT","((?:<|>)?=?)"),u("XRANGEIDENTIFIERLOOSE",`${s[c.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`),u("XRANGEIDENTIFIER",`${s[c.NUMERICIDENTIFIER]}|x|X|\\*`),u("XRANGEPLAIN",`[v=\\s]*(${s[c.XRANGEIDENTIFIER]})(?:\\.(${s[c.XRANGEIDENTIFIER]})(?:\\.(${s[c.XRANGEIDENTIFIER]})(?:${s[c.PRERELEASE]})?${s[c.BUILD]}?)?)?`),u("XRANGEPLAINLOOSE",`[v=\\s]*(${s[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${s[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${s[c.XRANGEIDENTIFIERLOOSE]})(?:${s[c.PRERELEASELOOSE]})?${s[c.BUILD]}?)?)?`),u("XRANGE",`^${s[c.GTLT]}\\s*${s[c.XRANGEPLAIN]}$`),u("XRANGELOOSE",`^${s[c.GTLT]}\\s*${s[c.XRANGEPLAINLOOSE]}$`),u("COERCE",`(^|[^\\d])(\\d{1,${f}})(?:\\.(\\d{1,${f}}))?(?:\\.(\\d{1,${f}}))?(?:$|[^\\d])`),u("COERCERTL",s[c.COERCE],!0),u("LONETILDE","(?:~>?)"),u("TILDETRIM",`(\\s*)${s[c.LONETILDE]}\\s+`,!0),y.tildeTrimReplace="$1~",u("TILDE",`^${s[c.LONETILDE]}${s[c.XRANGEPLAIN]}$`),u("TILDELOOSE",`^${s[c.LONETILDE]}${s[c.XRANGEPLAINLOOSE]}$`),u("LONECARET","(?:\\^)"),u("CARETTRIM",`(\\s*)${s[c.LONECARET]}\\s+`,!0),y.caretTrimReplace="$1^",u("CARET",`^${s[c.LONECARET]}${s[c.XRANGEPLAIN]}$`),u("CARETLOOSE",`^${s[c.LONECARET]}${s[c.XRANGEPLAINLOOSE]}$`),u("COMPARATORLOOSE",`^${s[c.GTLT]}\\s*(${s[c.LOOSEPLAIN]})$|^$`),u("COMPARATOR",`^${s[c.GTLT]}\\s*(${s[c.FULLPLAIN]})$|^$`),u("COMPARATORTRIM",`(\\s*)${s[c.GTLT]}\\s*(${s[c.LOOSEPLAIN]}|${s[c.XRANGEPLAIN]})`,!0),y.comparatorTrimReplace="$1$2$3",u("HYPHENRANGE",`^\\s*(${s[c.XRANGEPLAIN]})\\s+-\\s+(${s[c.XRANGEPLAIN]})\\s*$`),u("HYPHENRANGELOOSE",`^\\s*(${s[c.XRANGEPLAINLOOSE]})\\s+-\\s+(${s[c.XRANGEPLAINLOOSE]})\\s*$`),u("STAR","(<|>)?=?\\s*\\*"),u("GTE0","^\\s*>=\\s*0\\.0\\.0\\s*$"),u("GTE0PRE","^\\s*>=\\s*0\\.0\\.0-0\\s*$")},7606:(O,y,o)=>{const f=o(6826),i=(n,p,h)=>f(n,p,">",h);O.exports=i},2937:(O,y,o)=>{const f=o(6902),i=(n,p,h)=>(n=new f(n,h),p=new f(p,h),n.intersects(p,h));O.exports=i},32:(O,y,o)=>{const f=o(6826),i=(n,p,h)=>f(n,p,"<",h);O.exports=i},5775:(O,y,o)=>{const f=o(6376),i=o(6902),n=(p,h,l)=>{let s=null,c=null,m=null;try{m=new i(h,l)}catch(r){return null}return p.forEach(r=>{m.test(r)&&(!s||c.compare(r)===-1)&&(s=r,c=new f(s,l))}),s};O.exports=n},1657:(O,y,o)=>{const f=o(6376),i=o(6902),n=(p,h,l)=>{let s=null,c=null,m=null;try{m=new i(h,l)}catch(r){return null}return p.forEach(r=>{m.test(r)&&(!s||c.compare(r)===1)&&(s=r,c=new f(s,l))}),s};O.exports=n},5316:(O,y,o)=>{const f=o(6376),i=o(6902),n=o(1312),p=(h,l)=>{h=new i(h,l);let s=new f("0.0.0");if(h.test(s)||(s=new f("0.0.0-0"),h.test(s)))return s;s=null;for(let c=0;c<h.set.length;++c){const m=h.set[c];let r=null;m.forEach(g=>{const d=new f(g.semver.version);switch(g.operator){case">":d.prerelease.length===0?d.patch++:d.prerelease.push(0),d.raw=d.format();case"":case">=":(!r||n(d,r))&&(r=d);break;case"<":case"<=":break;default:throw new Error(`Unexpected operation: ${g.operator}`)}}),r&&(!s||n(s,r))&&(s=r)}return s&&h.test(s)?s:null};O.exports=p},6826:(O,y,o)=>{const f=o(6376),i=o(2257),{ANY:n}=i,p=o(6902),h=o(5712),l=o(1312),s=o(1544),c=o(2056),m=o(5903),r=(g,d,u,v)=>{g=new f(g,v),d=new p(d,v);let I,b,R,A,E;switch(u){case">":I=l,b=c,R=s,A=">",E=">=";break;case"<":I=s,b=m,R=l,A="<",E="<=";break;default:throw new TypeError('Must provide a hilo val of "<" or ">"')}if(h(g,d,v))return!1;for(let _=0;_<d.set.length;++_){const C=d.set[_];let z=null,N=null;if(C.forEach(x=>{x.semver===n&&(x=new i(">=0.0.0")),z=z||x,N=N||x,I(x.semver,z.semver,v)?z=x:R(x.semver,N.semver,v)&&(N=x)}),z.operator===A||z.operator===E||(!N.operator||N.operator===A)&&b(g,N.semver))return!1;if(N.operator===E&&R(g,N.semver))return!1}return!0};O.exports=r},7908:(O,y,o)=>{const f=o(5712),i=o(6269);O.exports=(n,p,h)=>{const l=[];let s=null,c=null;const m=n.sort((u,v)=>i(u,v,h));for(const u of m)f(u,p,h)?(c=u,s||(s=u)):(c&&l.push([s,c]),c=null,s=null);s&&l.push([s,null]);const r=[];for(const[u,v]of l)u===v?r.push(u):!v&&u===m[0]?r.push("*"):v?u===m[0]?r.push(`<=${v}`):r.push(`${u} - ${v}`):r.push(`>=${u}`);const g=r.join(" || "),d=typeof p.raw=="string"?p.raw:String(p);return g.length<d.length?g:p}},799:(O,y,o)=>{const f=o(6902),i=o(2257),{ANY:n}=i,p=o(5712),h=o(6269),l=(d,u,v={})=>{if(d===u)return!0;d=new f(d,v),u=new f(u,v);let I=!1;e:for(const b of d.set){for(const R of u.set){const A=m(b,R,v);if(I=I||A!==null,A)continue e}if(I)return!1}return!0},s=[new i(">=0.0.0-0")],c=[new i(">=0.0.0")],m=(d,u,v)=>{if(d===u)return!0;if(d.length===1&&d[0].semver===n){if(u.length===1&&u[0].semver===n)return!0;v.includePrerelease?d=s:d=c}if(u.length===1&&u[0].semver===n){if(v.includePrerelease)return!0;u=c}const I=new Set;let b,R;for(const T of d)T.operator===">"||T.operator===">="?b=r(b,T,v):T.operator==="<"||T.operator==="<="?R=g(R,T,v):I.add(T.semver);if(I.size>1)return null;let A;if(b&&R){if(A=h(b.semver,R.semver,v),A>0)return null;if(A===0&&(b.operator!==">="||R.operator!=="<="))return null}for(const T of I){if(b&&!p(T,String(b),v)||R&&!p(T,String(R),v))return null;for(const P of u)if(!p(T,String(P),v))return!1;return!0}let E,_,C,z,N=R&&!v.includePrerelease&&R.semver.prerelease.length?R.semver:!1,x=b&&!v.includePrerelease&&b.semver.prerelease.length?b.semver:!1;N&&N.prerelease.length===1&&R.operator==="<"&&N.prerelease[0]===0&&(N=!1);for(const T of u){if(z=z||T.operator===">"||T.operator===">=",C=C||T.operator==="<"||T.operator==="<=",b){if(x&&T.semver.prerelease&&T.semver.prerelease.length&&T.semver.major===x.major&&T.semver.minor===x.minor&&T.semver.patch===x.patch&&(x=!1),T.operator===">"||T.operator===">="){if(E=r(b,T,v),E===T&&E!==b)return!1}else if(b.operator===">="&&!p(b.semver,String(T),v))return!1}if(R){if(N&&T.semver.prerelease&&T.semver.prerelease.length&&T.semver.major===N.major&&T.semver.minor===N.minor&&T.semver.patch===N.patch&&(N=!1),T.operator==="<"||T.operator==="<="){if(_=g(R,T,v),_===T&&_!==R)return!1}else if(R.operator==="<="&&!p(R.semver,String(T),v))return!1}if(!T.operator&&(R||b)&&A!==0)return!1}return!(b&&C&&!R&&A!==0||R&&z&&!b&&A!==0||x||N)},r=(d,u,v)=>{if(!d)return u;const I=h(d.semver,u.semver,v);return I>0?d:I<0||u.operator===">"&&d.operator===">="?u:d},g=(d,u,v)=>{if(!d)return u;const I=h(d.semver,u.semver,v);return I<0?d:I>0||u.operator==="<"&&d.operator==="<="?u:d};O.exports=l},1042:(O,y,o)=>{const f=o(6902),i=(n,p)=>new f(n,p).set.map(h=>h.map(l=>l.value).join(" ").trim().split(" "));O.exports=i},9042:(O,y,o)=>{const f=o(6902),i=(n,p)=>{try{return new f(n,p).range||"*"}catch(h){return null}};O.exports=i},9602:O=>{"use strict";O.exports=function(y){y.prototype[Symbol.iterator]=function*(){for(let o=this.head;o;o=o.next)yield o.value}}},4411:(O,y,o)=>{"use strict";O.exports=f,f.Node=h,f.create=f;function f(l){var s=this;if(s instanceof f||(s=new f),s.tail=null,s.head=null,s.length=0,l&&typeof l.forEach=="function")l.forEach(function(r){s.push(r)});else if(arguments.length>0)for(var c=0,m=arguments.length;c<m;c++)s.push(arguments[c]);return s}f.prototype.removeNode=function(l){if(l.list!==this)throw new Error("removing node which does not belong to this list");var s=l.next,c=l.prev;return s&&(s.prev=c),c&&(c.next=s),l===this.head&&(this.head=s),l===this.tail&&(this.tail=c),l.list.length--,l.next=null,l.prev=null,l.list=null,s},f.prototype.unshiftNode=function(l){if(l!==this.head){l.list&&l.list.removeNode(l);var s=this.head;l.list=this,l.next=s,s&&(s.prev=l),this.head=l,this.tail||(this.tail=l),this.length++}},f.prototype.pushNode=function(l){if(l!==this.tail){l.list&&l.list.removeNode(l);var s=this.tail;l.list=this,l.prev=s,s&&(s.next=l),this.tail=l,this.head||(this.head=l),this.length++}},f.prototype.push=function(){for(var l=0,s=arguments.length;l<s;l++)n(this,arguments[l]);return this.length},f.prototype.unshift=function(){for(var l=0,s=arguments.length;l<s;l++)p(this,arguments[l]);return this.length},f.prototype.pop=function(){if(this.tail){var l=this.tail.value;return this.tail=this.tail.prev,this.tail?this.tail.next=null:this.head=null,this.length--,l}},f.prototype.shift=function(){if(this.head){var l=this.head.value;return this.head=this.head.next,this.head?this.head.prev=null:this.tail=null,this.length--,l}},f.prototype.forEach=function(l,s){s=s||this;for(var c=this.head,m=0;c!==null;m++)l.call(s,c.value,m,this),c=c.next},f.prototype.forEachReverse=function(l,s){s=s||this;for(var c=this.tail,m=this.length-1;c!==null;m--)l.call(s,c.value,m,this),c=c.prev},f.prototype.get=function(l){for(var s=0,c=this.head;c!==null&&s<l;s++)c=c.next;if(s===l&&c!==null)return c.value},f.prototype.getReverse=function(l){for(var s=0,c=this.tail;c!==null&&s<l;s++)c=c.prev;if(s===l&&c!==null)return c.value},f.prototype.map=function(l,s){s=s||this;for(var c=new f,m=this.head;m!==null;)c.push(l.call(s,m.value,this)),m=m.next;return c},f.prototype.mapReverse=function(l,s){s=s||this;for(var c=new f,m=this.tail;m!==null;)c.push(l.call(s,m.value,this)),m=m.prev;return c},f.prototype.reduce=function(l,s){var c,m=this.head;if(arguments.length>1)c=s;else if(this.head)m=this.head.next,c=this.head.value;else throw new TypeError("Reduce of empty list with no initial value");for(var r=0;m!==null;r++)c=l(c,m.value,r),m=m.next;return c},f.prototype.reduceReverse=function(l,s){var c,m=this.tail;if(arguments.length>1)c=s;else if(this.tail)m=this.tail.prev,c=this.tail.value;else throw new TypeError("Reduce of empty list with no initial value");for(var r=this.length-1;m!==null;r--)c=l(c,m.value,r),m=m.prev;return c},f.prototype.toArray=function(){for(var l=new Array(this.length),s=0,c=this.head;c!==null;s++)l[s]=c.value,c=c.next;return l},f.prototype.toArrayReverse=function(){for(var l=new Array(this.length),s=0,c=this.tail;c!==null;s++)l[s]=c.value,c=c.prev;return l},f.prototype.slice=function(l,s){s=s||this.length,s<0&&(s+=this.length),l=l||0,l<0&&(l+=this.length);var c=new f;if(s<l||s<0)return c;l<0&&(l=0),s>this.length&&(s=this.length);for(var m=0,r=this.head;r!==null&&m<l;m++)r=r.next;for(;r!==null&&m<s;m++,r=r.next)c.push(r.value);return c},f.prototype.sliceReverse=function(l,s){s=s||this.length,s<0&&(s+=this.length),l=l||0,l<0&&(l+=this.length);var c=new f;if(s<l||s<0)return c;l<0&&(l=0),s>this.length&&(s=this.length);for(var m=this.length,r=this.tail;r!==null&&m>s;m--)r=r.prev;for(;r!==null&&m>l;m--,r=r.prev)c.push(r.value);return c},f.prototype.splice=function(l,s,...c){l>this.length&&(l=this.length-1),l<0&&(l=this.length+l);for(var m=0,r=this.head;r!==null&&m<l;m++)r=r.next;for(var g=[],m=0;r&&m<s;m++)g.push(r.value),r=this.removeNode(r);r===null&&(r=this.tail),r!==this.head&&r!==this.tail&&(r=r.prev);for(var m=0;m<c.length;m++)r=i(this,r,c[m]);return g},f.prototype.reverse=function(){for(var l=this.head,s=this.tail,c=l;c!==null;c=c.prev){var m=c.prev;c.prev=c.next,c.next=m}return this.head=s,this.tail=l,this};function i(l,s,c){var m=s===l.head?new h(c,null,s,l):new h(c,s,s.next,l);return m.next===null&&(l.tail=m),m.prev===null&&(l.head=m),l.length++,m}function n(l,s){l.tail=new h(s,l.tail,null,l),l.head||(l.head=l.tail),l.length++}function p(l,s){l.head=new h(s,null,l.head,l),l.tail||(l.tail=l.head),l.length++}function h(l,s,c,m){if(!(this instanceof h))return new h(l,s,c,m);this.list=m,this.value=l,s?(s.next=this,this.prev=s):this.prev=null,c?(c.prev=this,this.next=c):this.next=null}try{o(9602)(f)}catch(l){}}},vs={};function it(O){var y=vs[O];if(y!==void 0)return y.exports;var o=vs[O]={id:O,loaded:!1,exports:{}};return Ya[O].call(o.exports,o,o.exports,it),o.loaded=!0,o.exports}it.n=O=>{var y=O&&O.__esModule?()=>O.default:()=>O;return it.d(y,{a:y}),y},it.d=(O,y)=>{for(var o in y)it.o(y,o)&&!it.o(O,o)&&Object.defineProperty(O,o,{enumerable:!0,get:y[o]})},it.g=function(){if(typeof globalThis=="object")return globalThis;try{return this||new Function("return this")()}catch(O){if(typeof window=="object")return window}}(),it.o=(O,y)=>Object.prototype.hasOwnProperty.call(O,y),it.nmd=O=>(O.paths=[],O.children||(O.children=[]),O);var o0={};(()=>{var Lt;"use strict";var O=it(4002),y=it.n(O),o=it(6486),f=it(1249),i=it.n(f),n=it(177),p=it.n(n),h=it(9737),l=it(6278),s=it(6927),c=it(3497),m=it(7814),r=it(5660),g=it.n(r),d=it(7874),u=it(4277),v=it(57),I=it(366);class b{hydrate(oe,_e){const xe=new URL(oe,typeof window=="undefined"?"https://dummy.base":window.location.origin),ae={};xe.pathname.split("/").forEach((ve,pe)=>{if(ve.charAt(0)===":"){const Ee=ve.slice(1);typeof _e[Ee]!="undefined"&&(xe.pathname=xe.pathname.replace(ve,encodeURIComponent(_e[Ee])),ae[Ee]=_e[Ee])}});for(const ve in _e)(typeof ae[ve]=="undefined"||xe.searchParams.has(ve))&&xe.searchParams.set(ve,_e[ve]);return xe.toString()}}function R(){y()(".sample-request-send").off("click"),y()(".sample-request-send").on("click",function(ze){ze.preventDefault();const oe=y()(this).parents("article"),_e=oe.data("group"),xe=oe.data("name"),ae=oe.data("version");C(_e,xe,ae,y()(this).data("type"))}),y()(".sample-request-clear").off("click"),y()(".sample-request-clear").on("click",function(ze){ze.preventDefault();const oe=y()(this).parents("article"),_e=oe.data("group"),xe=oe.data("name"),ae=oe.data("version");z(_e,xe,ae)})}function A(ze){return ze.replace(/{(.+?)}/g,":$1")}function E(ze,oe){const _e=ze.find(".sample-request-url").val(),xe=new b,ae=A(_e);return xe.hydrate(ae,oe)}function _(ze){const oe={};["header","query","body"].forEach(xe=>{const ae={};try{ze.find(y()(`[data-family="${xe}"]:visible`)).each((ve,pe)=>{const Ee=pe.dataset.name;let De=pe.value;if(pe.type==="checkbox")if(pe.checked)De="on";else return!0;if(!De&&!pe.dataset.optional&&pe.type!=="checkbox")return y()(pe).addClass("border-danger"),!0;ae[Ee]=De})}catch(ve){return}oe[xe]=ae});const _e=ze.find(y()('[data-family="body-json"]'));return _e.is(":visible")?(oe.body=_e.val(),oe.header["Content-Type"]="application/json"):oe.header["Content-Type"]="multipart/form-data",oe}function C(ze,oe,_e,xe){const ae=y()(`article[data-group="${ze}"][data-name="${oe}"][data-version="${_e}"]`),ve=_(ae),pe={};if(pe.url=E(ae,ve.query),pe.headers=ve.header,pe.headers["Content-Type"]==="application/json")pe.data=ve.body;else if(pe.headers["Content-Type"]==="multipart/form-data"){const Le=new FormData;for(const[Qe,Ye]of Object.entries(ve.body))Le.append(Qe,Ye);pe.data=Le,pe.processData=!1,delete pe.headers["Content-Type"],pe.contentType=!1}pe.type=xe,pe.success=Ee,pe.error=De,y().ajax(pe),ae.find(".sample-request-response").fadeTo(200,1),ae.find(".sample-request-response-json").html("Loading...");function Ee(Le,Qe,Ye){let Ke;try{Ke=JSON.parse(Ye.responseText),Ke=JSON.stringify(Ke,null,4)}catch(rt){Ke=Ye.responseText}ae.find(".sample-request-response-json").text(Ke),g().highlightAll()}function De(Le,Qe,Ye){let Ke="Error "+Le.status+": "+Ye,rt;try{rt=JSON.parse(Le.responseText),rt=JSON.stringify(rt,null,4)}catch(lt){rt=Le.responseText}rt&&(Ke+=`
`+rt),ae.find(".sample-request-response").is(":visible")&&ae.find(".sample-request-response").fadeTo(1,.1),ae.find(".sample-request-response").fadeTo(250,1),ae.find(".sample-request-response-json").text(Ke),g().highlightAll()}}function z(ze,oe,_e){const xe=y()('article[data-group="'+ze+'"][data-name="'+oe+'"][data-version="'+_e+'"]');xe.find(".sample-request-response-json").html(""),xe.find(".sample-request-response").hide(),xe.find(".sample-request-input").each((ve,pe)=>{pe.value=pe.placeholder!==pe.dataset.name?pe.placeholder:""});const ae=xe.find(".sample-request-url");ae.val(ae.prop("defaultValue"))}const N={"Allowed values:":"Valors permesos:","Compare all with predecessor":"Comparar tot amb versi\xF3 anterior","compare changes to:":"comparar canvis amb:","compared to":"comparat amb","Default value:":"Valor per defecte:",Description:"Descripci\xF3",Field:"Camp",General:"General","Generated with":"Generat amb",Name:"Nom","No response values.":"Sense valors en la resposta.",optional:"opcional",Parameter:"Par\xE0metre","Permission:":"Permisos:",Response:"Resposta",Send:"Enviar","Send a Sample Request":"Enviar una petici\xF3 d'exemple","show up to version:":"mostrar versi\xF3:","Size range:":"Tamany de rang:",Type:"Tipus",url:"url"},x={"Allowed values:":"Povolen\xE9 hodnoty:","Compare all with predecessor":"Porovnat v\u0161e s p\u0159edchoz\xEDmi verzemi","compare changes to:":"porovnat zm\u011Bny s:","compared to":"porovnat s","Default value:":"V\xFDchoz\xED hodnota:",Description:"Popis",Field:"Pole",General:"Obecn\xE9","Generated with":"Vygenerov\xE1no pomoc\xED",Name:"N\xE1zev","No response values.":"Nebyly vr\xE1ceny \u017E\xE1dn\xE9 hodnoty.",optional:"voliteln\xE9",Parameter:"Parametr","Permission:":"Opr\xE1vn\u011Bn\xED:",Response:"Odpov\u011B\u010F",Send:"Odeslat","Send a Sample Request":"Odeslat uk\xE1zkov\xFD po\u017Eadavek","show up to version:":"zobrazit po verzi:","Size range:":"Rozsah velikosti:",Type:"Typ",url:"url"},T={"Allowed values:":"Erlaubte Werte:","Compare all with predecessor":"Vergleiche alle mit ihren Vorg\xE4ngern","compare changes to:":"vergleiche \xC4nderungen mit:","compared to":"verglichen mit","Default value:":"Standardwert:",Description:"Beschreibung",Field:"Feld",General:"Allgemein","Generated with":"Erstellt mit",Name:"Name","No response values.":"Keine R\xFCckgabewerte.",optional:"optional",Parameter:"Parameter","Permission:":"Berechtigung:",Response:"Antwort",Send:"Senden","Send a Sample Request":"Eine Beispielanfrage senden","show up to version:":"zeige bis zur Version:","Size range:":"Gr\xF6\xDFenbereich:",Type:"Typ",url:"url"},P={"Allowed values:":"Valores permitidos:","Compare all with predecessor":"Comparar todo con versi\xF3n anterior","compare changes to:":"comparar cambios con:","compared to":"comparado con","Default value:":"Valor por defecto:",Description:"Descripci\xF3n",Field:"Campo",General:"General","Generated with":"Generado con",Name:"Nombre","No response values.":"Sin valores en la respuesta.",optional:"opcional",Parameter:"Par\xE1metro","Permission:":"Permisos:",Response:"Respuesta",Send:"Enviar","Send a Sample Request":"Enviar una petici\xF3n de ejemplo","show up to version:":"mostrar a versi\xF3n:","Size range:":"Tama\xF1o de rango:",Type:"Tipo",url:"url"},J={"Allowed values:":"Valeurs autoris\xE9es :",Body:"Corps","Compare all with predecessor":"Tout comparer avec ...","compare changes to:":"comparer les changements \xE0 :","compared to":"comparer \xE0","Default value:":"Valeur par d\xE9faut :",Description:"Description",Field:"Champ",General:"G\xE9n\xE9ral","Generated with":"G\xE9n\xE9r\xE9 avec",Header:"En-t\xEAte",Headers:"En-t\xEAtes",Name:"Nom","No response values.":"Aucune valeur de r\xE9ponse.","No value":"Aucune valeur",optional:"optionnel",Parameter:"Param\xE8tre",Parameters:"Param\xE8tres","Permission:":"Permission :","Query Parameter(s)":"Param\xE8tre(s) de la requ\xEAte","Query Parameters":"Param\xE8tres de la requ\xEAte","Request Body":"Corps de la requ\xEAte",required:"requis",Response:"R\xE9ponse",Send:"Envoyer","Send a Sample Request":"Envoyer une requ\xEAte repr\xE9sentative","show up to version:":"Montrer \xE0 partir de la version :","Size range:":"Ordre de grandeur :",Type:"Type",url:"url"},F={"Allowed values:":"Valori permessi:","Compare all with predecessor":"Confronta tutto con versioni precedenti","compare changes to:":"confronta modifiche con:","compared to":"confrontato con","Default value:":"Valore predefinito:",Description:"Descrizione",Field:"Campo",General:"Generale","Generated with":"Creato con",Name:"Nome","No response values.":"Nessun valore di risposta.",optional:"opzionale",Parameter:"Parametro","Permission:":"Permessi:",Response:"Risposta",Send:"Invia","Send a Sample Request":"Invia una richiesta di esempio","show up to version:":"mostra alla versione:","Size range:":"Intervallo dimensione:",Type:"Tipo",url:"url"},U={"Allowed values:":"Toegestane waarden:","Compare all with predecessor":"Vergelijk alle met voorgaande versie","compare changes to:":"vergelijk veranderingen met:","compared to":"vergelijk met","Default value:":"Standaard waarde:",Description:"Omschrijving",Field:"Veld",General:"Algemeen","Generated with":"Gegenereerd met",Name:"Naam","No response values.":"Geen response waardes.",optional:"optioneel",Parameter:"Parameter","Permission:":"Permissie:",Response:"Antwoorden",Send:"Sturen","Send a Sample Request":"Stuur een sample aanvragen","show up to version:":"toon tot en met versie:","Size range:":"Maatbereik:",Type:"Type",url:"url"},M={"Allowed values:":"Dozwolone warto\u015Bci:","Compare all with predecessor":"Por\xF3wnaj z poprzednimi wersjami","compare changes to:":"por\xF3wnaj zmiany do:","compared to":"por\xF3wnaj do:","Default value:":"Warto\u015B\u0107 domy\u015Blna:",Description:"Opis",Field:"Pole",General:"Generalnie","Generated with":"Wygenerowano z",Name:"Nazwa","No response values.":"Brak odpowiedzi.",optional:"opcjonalny",Parameter:"Parametr","Permission:":"Uprawnienia:",Response:"Odpowied\u017A",Send:"Wy\u015Blij","Send a Sample Request":"Wy\u015Blij przyk\u0142adowe \u017C\u0105danie","show up to version:":"poka\u017C do wersji:","Size range:":"Zakres rozmiaru:",Type:"Typ",url:"url"},j={"Allowed values:":"Valores permitidos:","Compare all with predecessor":"Compare todos com antecessores","compare changes to:":"comparar altera\xE7\xF5es com:","compared to":"comparado com","Default value:":"Valor padr\xE3o:",Description:"Descri\xE7\xE3o",Field:"Campo",General:"Geral","Generated with":"Gerado com",Name:"Nome","No response values.":"Sem valores de resposta.",optional:"opcional",Parameter:"Par\xE2metro","Permission:":"Permiss\xE3o:",Response:"Resposta",Send:"Enviar","Send a Sample Request":"Enviar um Exemplo de Pedido","show up to version:":"aparecer para a vers\xE3o:","Size range:":"Faixa de tamanho:",Type:"Tipo",url:"url"},B={"Allowed values:":"Valori permise:","Compare all with predecessor":"Compar\u0103 toate cu versiunea precedent\u0103","compare changes to:":"compar\u0103 cu versiunea:","compared to":"comparat cu","Default value:":"Valoare implicit\u0103:",Description:"Descriere",Field:"C\xE2mp",General:"General","Generated with":"Generat cu",Name:"Nume","No response values.":"Nici o valoare returnat\u0103.",optional:"op\u021Bional",Parameter:"Parametru","Permission:":"Permisiune:",Response:"R\u0103spuns",Send:"Trimite","Send a Sample Request":"Trimite o cerere de prob\u0103","show up to version:":"arat\u0103 p\xE2n\u0103 la versiunea:","Size range:":"Interval permis:",Type:"Tip",url:"url"},K={"Allowed values:":"\u0414\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F:","Compare all with predecessor":"\u0421\u0440\u0430\u0432\u043D\u0438\u0442\u044C \u0441 \u043F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0435\u0439 \u0432\u0435\u0440\u0441\u0438\u0435\u0439","compare changes to:":"\u0441\u0440\u0430\u0432\u043D\u0438\u0442\u044C \u0441:","compared to":"\u0432 \u0441\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u0438 \u0441","Default value:":"\u041F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E:",Description:"\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435",Field:"\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435",General:"\u041E\u0431\u0449\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F","Generated with":"\u0421\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043E \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E",Name:"\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435","No response values.":"\u041D\u0435\u0442 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0439 \u0434\u043B\u044F \u043E\u0442\u0432\u0435\u0442\u0430.",optional:"\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0439",Parameter:"\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440","Permission:":"\u0420\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u043E:",Response:"\u041E\u0442\u0432\u0435\u0442",Send:"\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C","Send a Sample Request":"\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0442\u0435\u0441\u0442\u043E\u0432\u044B\u0439 \u0437\u0430\u043F\u0440\u043E\u0441","show up to version:":"\u043F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0432\u0435\u0440\u0441\u0438\u044E:","Size range:":"\u041E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u044F:",Type:"\u0422\u0438\u043F",url:"URL"},W={"Allowed values:":"\u0130zin verilen de\u011Ferler:","Compare all with predecessor":"T\xFCm\xFCn\xFC \xF6ncekiler ile kar\u015F\u0131la\u015Ft\u0131r","compare changes to:":"de\u011Fi\u015Fiklikleri kar\u015F\u0131la\u015Ft\u0131r:","compared to":"kar\u015F\u0131la\u015Ft\u0131r","Default value:":"Varsay\u0131lan de\u011Fer:",Description:"A\xE7\u0131klama",Field:"Alan",General:"Genel","Generated with":"Olu\u015Fturan",Name:"\u0130sim","No response values.":"D\xF6n\xFC\u015F verisi yok.",optional:"opsiyonel",Parameter:"Parametre","Permission:":"\u0130zin:",Response:"D\xF6n\xFC\u015F",Send:"G\xF6nder","Send a Sample Request":"\xD6rnek istek g\xF6nder","show up to version:":"bu versiyona kadar g\xF6ster:","Size range:":"Boyut aral\u0131\u011F\u0131:",Type:"Tip",url:"url"},Q={"Allowed values:":"Gi\xE1 tr\u1ECB ch\u1EA5p nh\u1EADn:","Compare all with predecessor":"So s\xE1nh v\u1EDBi t\u1EA5t c\u1EA3 phi\xEAn b\u1EA3n tr\u01B0\u1EDBc","compare changes to:":"so s\xE1nh s\u1EF1 thay \u0111\u1ED5i v\u1EDBi:","compared to":"so s\xE1nh v\u1EDBi","Default value:":"Gi\xE1 tr\u1ECB m\u1EB7c \u0111\u1ECBnh:",Description:"Ch\xFA th\xEDch",Field:"Tr\u01B0\u1EDDng d\u1EEF li\u1EC7u",General:"T\u1ED5ng quan","Generated with":"\u0110\u01B0\u1EE3c t\u1EA1o b\u1EDFi",Name:"T\xEAn","No response values.":"Kh\xF4ng c\xF3 k\u1EBFt qu\u1EA3 tr\u1EA3 v\u1EC1.",optional:"T\xF9y ch\u1ECDn",Parameter:"Tham s\u1ED1","Permission:":"Quy\u1EC1n h\u1EA1n:",Response:"K\u1EBFt qu\u1EA3",Send:"G\u1EEDi","Send a Sample Request":"G\u1EEDi m\u1ED9t y\xEAu c\u1EA7u m\u1EABu","show up to version:":"hi\u1EC3n th\u1ECB phi\xEAn b\u1EA3n:","Size range:":"K\xEDch c\u1EE1:",Type:"Ki\u1EC3u",url:"li\xEAn k\u1EBFt"},re={"Allowed values:":"\u5141\u8BB8\u503C:",Body:"\u8BF7\u6C42\u4F53","Compare all with predecessor":"\u4E0E\u6240\u6709\u4E4B\u524D\u7684\u7248\u672C\u6BD4\u8F83","compare changes to:":"\u5C06\u5F53\u524D\u7248\u672C\u4E0E\u6307\u5B9A\u7248\u672C\u6BD4\u8F83:","compared to":"\u76F8\u6BD4\u4E8E","Default value:":"\u9ED8\u8BA4\u503C:",DEPRECATED:"\u5F03\u7528",Description:"\u63CF\u8FF0","Error 4xx":"\u8BF7\u6C42\u5931\u8D25\uFF084xx\uFF09",Field:"\u5B57\u6BB5","Filter...":"\u7B5B\u9009\u2026",General:"\u6982\u8981","Generated with":"\u6784\u5EFA\u4E8E",Header:"\u8BF7\u6C42\u5934",Headers:"\u8BF7\u6C42\u5934",Name:"\u540D\u79F0","No response values.":"\u65E0\u8FD4\u56DE\u503C.","No value":"\u7A7A\u503C",optional:"\u53EF\u9009",Parameter:"\u53C2\u6570",Parameters:"\u53C2\u6570","Permission:":"\u6743\u9650:","Query Parameter(s)":"\u67E5\u8BE2\u53C2\u6570","Query Parameters":"\u67E5\u8BE2\u53C2\u6570","Request Body":"\u8BF7\u6C42\u6570\u636E",required:"\u5FC5\u9700",Reset:"\u91CD\u7F6E",Response:"\u8FD4\u56DE",Send:"\u53D1\u9001","Send a Sample Request":"\u53D1\u9001\u793A\u4F8B\u8BF7\u6C42","show up to version:":"\u663E\u793A\u6307\u5B9A\u7248\u672C:","Size range:":"\u53D6\u503C\u8303\u56F4:","Success 200":"\u8BF7\u6C42\u6210\u529F\uFF08200\uFF09",Type:"\u7C7B\u578B",url:"\u5730\u5740"},ue={ca:N,cn:re,cs:x,de:T,es:P,en:{},fr:J,it:F,nl:U,pl:M,pt:j,pt_br:j,ro:B,ru:K,tr:W,vi:Q,zh:re,zh_cn:re},X=((Lt=window.navigator.language)!=null?Lt:"en-GB").toLowerCase().substr(0,2);let Ie=ue[X]?ue[X]:ue.en;function be(ze){const oe=Ie[ze];return oe===void 0?ze:oe}function Re(ze){if(!Object.prototype.hasOwnProperty.call(ue,ze))throw new Error(`Invalid value for language setting! Available values are ${Object.keys(ue).join(",")}`);Ie=ue[ze]}const{defaultsDeep:qe}=o,ht=(ze,oe)=>{const _e=(xe,ae,ve,pe)=>({[ae]:ve+1<pe.length?xe:oe});return ze.reduceRight(_e,{})},At=ze=>{let oe={};return ze.forEach(_e=>{const xe=ht(_e[0].split("."),_e[1]);oe=qe(oe,xe)}),vt(oe)};function vt(ze){return JSON.stringify(ze,null,4)}function kt(ze){const oe=[];return ze.forEach(_e=>{let xe;switch(_e.type.toLowerCase()){case"string":xe=_e.defaultValue||"";break;case"boolean":xe=Boolean(_e.defaultValue)||!1;break;case"number":xe=parseInt(_e.defaultValue||0,10);break;case"date":xe=_e.defaultValue||new Date().toLocaleDateString(window.navigator.language);break}oe.push([_e.field,xe])}),At(oe)}var we=it(2027);class mt extends we{constructor(oe){super(),this.testMode=oe}diffMain(oe,_e,xe,ae){return super.diff_main(this._stripHtml(oe),this._stripHtml(_e),xe,ae)}diffPrettyHtml(oe){const _e=[],xe=/&/g,ae=/</g,ve=/>/g,pe=/\n/g;for(let Ee=0;Ee<oe.length;Ee++){const De=oe[Ee][0],Qe=oe[Ee][1].replace(xe,"&amp;").replace(ae,"&lt;").replace(ve,"&gt;").replace(pe,"&para;<br>");switch(De){case we.DIFF_INSERT:_e[Ee]="<ins>"+Qe+"</ins>";break;case we.DIFF_DELETE:_e[Ee]="<del>"+Qe+"</del>";break;case we.DIFF_EQUAL:_e[Ee]="<span>"+Qe+"</span>";break}}return _e.join("")}diffCleanupSemantic(oe){return this.diff_cleanupSemantic(oe)}_stripHtml(oe){if(this.testMode)return oe;const _e=document.createElement("div");return _e.innerHTML=oe,_e.textContent||_e.innerText||""}}function Be(){p().registerHelper("markdown",function(ae){return ae&&(ae=ae.replace(/((\[(.*?)\])?\(#)((.+?):(.+?))(\))/mg,function(ve,pe,Ee,De,Le,Qe,Ye){const Ke=De||Qe+"/"+Ye;return'<a href="#api-'+Qe+"-"+Ye+'">'+Ke+"</a>"}),ae)}),p().registerHelper("setInputType",function(ae){switch(ae){case"File":case"Email":case"Color":case"Number":case"Date":return ae[0].toLowerCase()+ae.substring(1);case"Boolean":return"checkbox";default:return"text"}});let ze;p().registerHelper("startTimer",function(ae){return ze=new Date,""}),p().registerHelper("stopTimer",function(ae){return console.log(new Date-ze),""}),p().registerHelper("__",function(ae){return be(ae)}),p().registerHelper("cl",function(ae){return console.log(ae),""}),p().registerHelper("underscoreToSpace",function(ae){return ae.replace(/(_+)/g," ")}),p().registerHelper("removeDblQuotes",function(ae){return ae.replace(/"/g,"")}),p().registerHelper("assign",function(ae){if(arguments.length>0){const ve=typeof arguments[1];let pe=null;(ve==="string"||ve==="number"||ve==="boolean")&&(pe=arguments[1]),p().registerHelper(ae,function(){return pe})}return""}),p().registerHelper("nl2br",function(ae){return _e(ae)}),p().registerHelper("ifCond",function(ae,ve,pe,Ee){switch(ve){case"==":return ae==pe?Ee.fn(this):Ee.inverse(this);case"===":return ae===pe?Ee.fn(this):Ee.inverse(this);case"!=":return ae!=pe?Ee.fn(this):Ee.inverse(this);case"!==":return ae!==pe?Ee.fn(this):Ee.inverse(this);case"<":return ae<pe?Ee.fn(this):Ee.inverse(this);case"<=":return ae<=pe?Ee.fn(this):Ee.inverse(this);case">":return ae>pe?Ee.fn(this):Ee.inverse(this);case">=":return ae>=pe?Ee.fn(this):Ee.inverse(this);case"&&":return ae&&pe?Ee.fn(this):Ee.inverse(this);case"||":return ae||pe?Ee.fn(this):Ee.inverse(this);default:return Ee.inverse(this)}});const oe={};p().registerHelper("subTemplate",function(ae,ve){oe[ae]||(oe[ae]=p().compile(document.getElementById("template-"+ae).innerHTML));const pe=oe[ae],Ee=y().extend({},this,ve.hash);return new(p()).SafeString(pe(Ee))}),p().registerHelper("toLowerCase",function(ae){return ae&&typeof ae=="string"?ae.toLowerCase():""}),p().registerHelper("splitFill",function(ae,ve,pe){const Ee=ae.split(ve);return new Array(Ee.length).join(pe)+Ee[Ee.length-1]});function _e(ae){return(""+ae).replace(/(?:^|<\/pre>)[^]*?(?:<pre>|$)/g,ve=>ve.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,"$1<br>$2"))}p().registerHelper("each_compare_list_field",function(ae,ve,pe){const Ee=pe.hash.field,De=[];ae&&ae.forEach(function(Qe){const Ye=Qe;Ye.key=Qe[Ee],De.push(Ye)});const Le=[];return ve&&ve.forEach(function(Qe){const Ye=Qe;Ye.key=Qe[Ee],Le.push(Ye)}),xe("key",De,Le,pe)}),p().registerHelper("each_compare_keys",function(ae,ve,pe){const Ee=[];ae&&Object.keys(ae).forEach(function(Qe){const Ye={};Ye.value=ae[Qe],Ye.key=Qe,Ee.push(Ye)});const De=[];return ve&&Object.keys(ve).forEach(function(Qe){const Ye={};Ye.value=ve[Qe],Ye.key=Qe,De.push(Ye)}),xe("key",Ee,De,pe)}),p().registerHelper("body2json",function(ae,ve){return kt(ae)}),p().registerHelper("each_compare_field",function(ae,ve,pe){return xe("field",ae,ve,pe)}),p().registerHelper("each_compare_title",function(ae,ve,pe){return xe("title",ae,ve,pe)}),p().registerHelper("reformat",function(ae,ve){if(ve==="json")try{return JSON.stringify(JSON.parse(ae.trim()),null,"    ")}catch(pe){}return ae}),p().registerHelper("showDiff",function(ae,ve,pe){let Ee="";if(ae===ve)Ee=ae;else{if(!ae)return ve;if(!ve)return ae;const De=new mt,Le=De.diffMain(ve,ae);De.diffCleanupSemantic(Le),Ee=De.diffPrettyHtml(Le),Ee=Ee.replace(/&para;/gm,"")}return pe==="nl2br"&&(Ee=_e(Ee)),Ee});function xe(ae,ve,pe,Ee){const De=[];let Le=0;ve&&ve.forEach(function(Ke){let rt=!1;if(pe&&pe.forEach(function(lt){if(Ke[ae]===lt[ae]){const Tt={typeSame:!0,source:Ke,compare:lt,index:Le};De.push(Tt),rt=!0,Le++}}),!rt){const lt={typeIns:!0,source:Ke,index:Le};De.push(lt),Le++}}),pe&&pe.forEach(function(Ke){let rt=!1;if(ve&&ve.forEach(function(lt){lt[ae]===Ke[ae]&&(rt=!0)}),!rt){const lt={typeDel:!0,compare:Ke,index:Le};De.push(lt),Le++}});let Qe="";const Ye=De.length;for(const Ke in De)parseInt(Ke,10)===Ye-1&&(De[Ke]._last=!0),Qe=Qe+Ee.fn(De[Ke]);return Qe}}document.addEventListener("DOMContentLoaded",()=>{Ue(),R(),g().highlightAll()});function Ue(){var Ae;let ze=[{type:"delete",url:"/api/artists",title:"Remove featured artists from track",name:"Delete_Remove_featured_artists_from_track",group:"API_Artists",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},query:[{group:"Query",type:"number",optional:!1,field:"trackId",description:""},{group:"Query",type:"number",optional:!1,field:"artistId",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"feature-artists/feature-artists.router.js",groupTitle:"API_Artists"},{type:"post",url:"/api/artists/:trackId",title:"Add featured artist to track",name:"Post_Add_featured_artist_to_track",group:"API_Artists",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"trackId",description:""}]}},body:[{group:"Body",type:"string",optional:!1,field:"name",description:""},{group:"Body",type:"string",optional:!1,field:"spotifyId",description:""},{group:"Body",type:"string",optional:!0,field:"soundCloudId",description:""},{group:"Body",type:"string",optional:!0,field:"appleMusicId",description:""},{group:"Body",type:"string",optional:!0,field:"country",description:""},{group:"Body",type:"string",optional:!0,field:"avatar",description:"<p><code>url</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "featureArtist": {
        "id": 16,
        "trackId": "2648",
        "name": "artist",
        "spotifyId": "1pU40mNxB72IERMSbGwCBm",
        "soundCloudId": "asdf123",
        "appleMusicId": "as123",
        "country": "Ukraine",
        "avatar": "https://api-major-labl.pixy.pro/b32865a9-e6d2-47a1-a79f-8a3c1f412124.jpg",
        "onMajorLabl": true,
        "avatarMin": "thumb_17a46669-2b99-4671-a883-e8d47945d4a0.jpg",
        "updatedAt": "2023-09-18T10:47:45.287Z",
        "createdAt": "2023-09-18T10:47:45.287Z"
    }
}`,type:"json"}]},version:"0.0.0",filename:"feature-artists/feature-artists.router.js",groupTitle:"API_Artists"},{type:"put",url:"/api/artists/edit",title:"Edit featured artist",name:"Post_Edit_featured_artist",group:"API_Artists",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},query:[{group:"Query",type:"number",optional:!1,field:"artistId",description:""}],body:[{group:"Body",type:"string",optional:!0,field:"country",description:""},{group:"Body",type:"string",optional:!0,field:"soundCloudId",description:""},{group:"Body",type:"string",optional:!0,field:"appleMusicId",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "featureArtist": {
        "id": 132,
        "name": "artist",
        "spotifyId": "1pU40mNxB72IERMSbGwCBm",
        "avatar": "https://api-major-labl.pixy.pro/b32865a9-e6d2-47a1-a79f-8a3c1f412124.jpg",
        "onMajorLabl": false,
        "avatarMin": "thumb_7a8e5514-653a-40aa-a4e7-d07306af1a6e.jpg",
        "soundCloudId": 1111111111,
        "appleMusicId": 22222222222222,
        "country": "ukkk",
        "createdAt": "2023-10-26T15:15:33.000Z",
        "updatedAt": "2023-10-26T15:17:30.476Z",
        "trackId": 3062
    }
}`,type:"json"}]},version:"0.0.0",filename:"feature-artists/feature-artists.router.js",groupTitle:"API_Artists"},{type:"delete",url:"/api/baps/admin/:bapId",title:"Admin Delete bap by id",name:"Delete_Admin_Delete_bap_by_id",group:"API_Bap",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"bapId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
}`,type:"json"}]},version:"0.0.0",filename:"baps/baps.router.js",groupTitle:"API_Bap"},{type:"delete",url:"/api/baps/:bapId",title:"Apply to deletion bap",name:"Delete_Apply_to_deletion_bap",group:"API_Bap",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"bapId",description:""}]}},body:[{group:"Body",type:"string",optional:!0,field:"emailFutureCreator",description:"<p><code>ONLY FOR BAP WITH MULTIPLY USER</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImVtYWlsIjoic25hbWUucGFyc2VyMTIzQGdtYWlsLmNvbSIsImJhcElkIjoiOTE1IiwiYWxsVXNlcnMiOmZhbHNlLCJpYXQiOjE2ODIwMTYzMzYsImV4cCI6MTY4NDYwODMzNn0.A88yFC11bGze8BLSVl8lsDrhRAJQn3RSJ79ZFJYJYIA"
}`,type:"json"}]},version:"0.0.0",filename:"baps/baps.router.js",groupTitle:"API_Bap"},{type:"delete",url:"/api/baps/confirm/",title:"Confirm deletion bap (ONLY FOR BAP WITH ONE USER)",name:"Delete_Confirm_deletion_bap",group:"API_Bap",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},query:[{group:"Query",type:"string",optional:!1,field:"token",description:"<p><code>from Apply to deletion bap</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"baps/baps.router.js",groupTitle:"API_Bap"},{type:"get",url:"/api/baps/members/:bapId",title:"Get members of bap",name:"Ge_Get_members_of_bap",group:"API_Bap",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"bapId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "members": [
        {
            "userId": 4,
            "firstName": "SASHA",
            "lastName": "qwe",
            "email": "sname.parser123@gmail.com",
            "bapId": 370,
            "avatar": "28169604-e36e-47aa-a30d-3138f14e0b1e.jpg",
            "role": "sfdsfsdf",
            "uuidEveara": null,
            "thumbnail": "thumb_24540144-3c9d-44f9-b922-85498c639de1.jpg",
            "isFullAdmin": 0
        },
        {
            "userId": 269,
            "firstName": "Lelah",
            "lastName": "Braun",
            "email": "848799261@mail.com",
            "bapId": 370,
            "avatar": null,
            "role": "qwe",
            "uuidEveara": null,
            "thumbnail": "thumb_24540144-3c9d-44f9-b922-85498c639de1.jpg",
            "isCreator": true,
            "isFullAdmin": 1
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"baps/baps.router.js",groupTitle:"API_Bap"},{type:"get",url:"/api/baps/future",title:"Accept to be future creator of bap",name:"Get_Accept_to_be_future_creator_of_bap",group:"API_Bap",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},query:[{group:"Query",type:"number",optional:!1,field:"token",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "futureCreator": {
        "id": 916,
        "name": "zsdfzsdfzsdf",
        "description": null,
        "artist_bio": null,
        "avatar": null,
        "role": "qwe",
        "createdAt": "2023-04-20T18:49:33.000Z",
        "updatedAt": "2023-04-20T18:54:23.929Z",
        "creatorId": 611
    }
}`,type:"json"}]},version:"0.0.0",filename:"baps/baps.router.js",groupTitle:"API_Bap"},{type:"get",url:"/api/baps/all",title:"Admin Get all baps",name:"Get_Admin_Get_all_baps",group:"API_Bap",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`   HTTP/1.1 200 OK
{
   "success": true,
   "baps": {
       "id": 1707,
       "name": "Topic",
       "description": null,
       "artist_bio": null,
       "avatar": "7cb20418-bd08-4874-9426-c34c3b61ac5c.jpg",
       "role": "Artist/Band member",
       "designId": null,
       "mainGenereId": 1,
       "secondGenereId": null,
       "facebookPixel": null,
       "spotifyId": "0u6GtibW46tFX7koQ6uNJZ",
       "thumbnail": null,
       "bapStatus": "ACTIVE",
       "createdAt": "2023-07-24T11:28:06.000Z",
       "updatedAt": "2023-07-24T11:28:33.000Z",
       "creatorId": 1254
   }
}`,type:"json"}]},version:"0.0.0",filename:"baps/baps.router.js",groupTitle:"API_Bap"},{type:"get",url:"/api/baps/detail/:bapId",title:"Admin Get baps detail",name:"Get_Admin_Get_baps_detail",group:"API_Bap",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"bapId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
 {
    "success": true,
        "baps": [
            {
            "id": 12,
            "name": "sfsdf",
            "bapStatus": "ACTIVE",
            "countMembers": 2,
            "countReleases": 0
            },
            {
                "id": 13,
                "name": "sas",
                "bapStatus": "ACTIVE",
                "countMembers": 18,
                "countReleases": 0
            },
    ]
}`,type:"json"}]},version:"0.0.0",filename:"baps/baps.router.js",groupTitle:"API_Bap"},{type:"get",url:"/api/baps/allMembers/:bapId",title:"Admin Get members of bap",name:"Get_Admin_Get_members_of_bap",group:"API_Bap",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"bapId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "members": [
        {
            "id": 753,
            "role": "Artist/Band member",
            "userId": 1239,
            "firstName": "\u0414\u043C\u0438\u0442\u0440\u0438\u0439",
            "lastName": "\u041A\u0430\u0448\u0443\u0431\u0430",
            "email": "dmitrij.kashuba@gmail.com",
            "accountStatus": "ACTIVE"
        },
        {
            "id": null,
            "role": "creator",
            "userId": 1254,
            "firstName": "Advocate10",
            "lastName": "test",
            "email": "advocate101234567@gmail.com",
            "accountStatus": "ACTIVE"
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"baps/baps.router.js",groupTitle:"API_Bap"},{type:"get",url:"/api/baps/releases/:bapId",title:"Admin Get releases of bap",name:"Get_Admin_Get_releases_of_bap",group:"API_Bap",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"bapId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "baps": [
        {
            "id": 505,
            "name": "New",
            "type": "Single",
            "logo": "c5d6aa6c-808b-482d-9662-80f1f0e87c86.jpg"
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"baps/baps.router.js",groupTitle:"API_Bap"},{type:"get",url:"/api/baps/",title:"Get all baps",name:"Get_Get_all_baps",group:"API_Bap",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "baps": [
        {
            "bapId": 1038,
            "bapName": "sas",
            "bapAvatar": "https://i.scdn.co/image/adasdasdasd",
            "thumbnail": "thumb_24540144-3c9d-44f9-b922-85498c639de1.jpg"
            "bapDescription": "change",
            "bapArtistBio": null,
            "designId": "123",
            "napsterId": null,
            "deezerId": null,
            "appleMusicId": null,
            "spotifyUri": null,
            "evearaBapId": null,
            "country": ukraine
        },
        {
            "bapId": 974,
            "bapName": "zsdfzsdfzsdf",
            "bapAvatar": null,
            "thumbnail": "thumb_24540144-3c9d-44f9-b922-85498c639de1.jpg"
            "bapDescription": null,
            "bapArtistBio": null,
            "designId": null,
            "facebookPixel": null,
            "napsterId": null,
            "deezerId": null,
            "appleMusicId": null,
            "spotifyUri": null,
            "evearaBapId": null,
            "country": null
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"baps/baps.router.js",groupTitle:"API_Bap"},{type:"get",url:"/api/baps/spotify/:artistId",title:"Get artist from Spotify by id",name:"Get_artist_from_Spotify_by_id",group:"API_Bap",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"artistId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "artist": {
        "external_urls": {
            "spotify": "https://open.spotify.com/artist/2LRoIwlKmHjgvigdNGBHNo"
        },
        "followers": {
            "href": null,
            "total": 6859765
        },
        "genres": [
            "colombian pop",
            "pop reggaeton",
            "reggaeton colombiano",
            "trap latino",
            "urbano latino"
        ],
        "href": "https://api.spotify.com/v1/artists/2LRoIwlKmHjgvigdNGBHNo",
        "id": "2LRoIwlKmHjgvigdNGBHNo",
        "images": [
            {
                "height": 640,
                "url": "https://i.scdn.co/image/ab6761610000e5ebba48bd734c25b2d41de6d099",
                "width": 640
            },
            {
                "height": 320,
                "url": "https://i.scdn.co/image/ab67616100005174ba48bd734c25b2d41de6d099",
                "width": 320
            },
            {
                "height": 160,
                "url": "https://i.scdn.co/image/ab6761610000f178ba48bd734c25b2d41de6d099",
                "width": 160
            }
        ],
        "name": "Feid",
        "popularity": 89,
        "type": "artist",
        "uri": "spotify:artist:2LRoIwlKmHjgvigdNGBHNo"
    }
}`,type:"json"}]},version:"0.0.0",filename:"baps/baps.router.js",groupTitle:"API_Bap"},{type:"post",url:"/api/baps/",title:"Create bap",name:"Post_Create_bap",group:"API_Bap",body:[{group:"Body",type:"string",optional:!1,field:"name",description:""},{group:"Body",type:"string",optional:!1,field:"role",description:""}],header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "bap": {
        "id": 12,
        "name": "sfsdf",
        "role": "qwe",
        "creatorId": 2,
        "updatedAt": "2023-03-03T16:02:23.354Z",
        "createdAt": "2023-03-03T16:02:23.354Z"
    }
}`,type:"json"}]},version:"0.0.0",filename:"baps/baps.router.js",groupTitle:"API_Bap"},{type:"put",url:"/api/baps/info/:bapId",title:"Edit info of bap",name:"Post_Edit_info_of_bap",group:"API_Bap",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"bapId",description:""}]}},body:[{group:"Body",type:"string",optional:!0,field:"name",description:""},{group:"Body",type:"string",optional:!0,field:"description",description:""},{group:"Body",type:"string",optional:!0,field:"artist_bio",description:""},{group:"Body",type:"string",optional:!0,field:"designId",description:"<p><code>id of image from canva</code></p>"},{group:"Body",type:"string",optional:!0,field:"urlAvatar",description:"<p><code>url to image from spotify / this field or avatar</code></p>"},{group:"Body",type:"number",optional:!0,field:"facebookPixel",description:""},{group:"Body",type:"string",optional:!0,field:"spotifyId",description:""},{group:"Body",type:"files",optional:!0,field:"avatar",description:""},{group:"Body",type:"string",optional:!0,field:"napsterId",description:""},{group:"Body",type:"string",optional:!0,field:"deezerId",description:""},{group:"Body",type:"string",optional:!0,field:"appleMusicId",description:""},{group:"Body",type:"string",optional:!0,field:"soundCloudId",description:""},{group:"Body",type:"string",optional:!0,field:"spotifyUri",description:""},{group:"Body",type:"string",optional:!0,field:"country",description:""},{group:"Body",type:"string",optional:!0,field:"evearaBapId",description:""},{group:"Body",type:"string",optional:!0,field:"removeAvatar",description:"<p><code>&quot;true&quot; - to delete avatar</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "bap": {
        "id": 11,
        "name": "sas",
        "description": "chan123ge",
        "artist_bio": "sss",
        "avatar": null,
        "role": "qwe",
        "designId": null,
        "facebookPixel": null,
        "spotifyId": null,
        "napsterId": "2345",
        "deezerId": "6565165",
        "appleMusicId": null,
        "soundCloudId": null,
        "spotifyUri": null,
        "evearaBapId": "23",
        "country": "Ukraine",
        "thumbnail": "thumb_24540144-3c9d-44f9-b922-85498c639de1.jpg",
        "createdAt": "2023-03-03T15:51:15.000Z",
        "updatedAt": "2023-03-06T13:23:28.236Z",
        "creatorId": 2
    }
}`,type:"json"}]},version:"0.0.0",filename:"baps/baps.router.js",groupTitle:"API_Bap"},{type:"post",url:"/api/baps/invite/:bapId",title:"Send invite to bap",name:"Post_Send_invite_to_bap",group:"API_Bap",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"bapId",description:""}]}},body:[{group:"Body",type:"string",optional:!1,field:"email",description:""},{group:"Body",type:"string",optional:!1,field:"role",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "notification": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZW5kZXJJZCI6NCwiYmFwSWQiOiI3ODQiLCJyb2xlIjoic2RmZHNlZiIsInR5cGVOb3RpZmljYXRpb25JZCI6MSwiaWF0IjoxNjgxNzI0NDc0LCJleHAiOjE2ODQzMTY0NzR9.0Eg5SimOQU2jNhwbbs6AclHVXQbIe-EHCOh4eUmNV68"
}`,type:"json"}]},version:"0.0.0",filename:"baps/baps.router.js",groupTitle:"API_Bap"},{type:"put",url:"/api/baps/update/:bapId",title:"Admin Update bap",name:"Put_Admin_Update_bap",group:"API_Bap",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"bapId",description:""}]}},body:[{group:"Body",type:"string",optional:!0,field:"name",description:""},{group:"Body",type:"string",optional:!0,field:"description",description:""},{group:"Body",type:"string",optional:!0,field:"artist_bio",description:""},{group:"Body",type:"string",optional:!0,field:"bapStatus",description:"<p><code>ACTIVE OR HIDDEN</code></p>"},{group:"Body",type:"string",optional:!0,field:"designId",description:"<p><code>id of image from canva</code></p>"},{group:"Body",type:"string",optional:!0,field:"urlAvatar",description:"<p><code>url to image from spotify / this field or avatar</code></p>"},{group:"Body",type:"number",optional:!0,field:"facebookPixel",description:""},{group:"Body",type:"string",optional:!0,field:"spotifyId",description:""},{group:"Body",type:"files",optional:!0,field:"avatar",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "bap": {
        "id": 1597,
        "name": "Author",
        "description": null,
        "artist_bio": null,
        "avatar": null,
        "role": "Admin",
        "designId": null,
        "mainGenereId": null,
        "secondGenereId": null,
        "facebookPixel": null,
        "spotifyId": "sadasd134123",
        "thumbnail": "thumb_null",
        "bapStatus": "ACTIVE",
        "createdAt": "2023-06-27T12:37:59.000Z",
        "updatedAt": "2023-07-26T18:39:11.000Z",
        "creatorId": 1156
    }
}`,type:"json"}]},version:"0.0.0",filename:"baps/baps.router.js",groupTitle:"API_Bap"},{type:"put",url:"/api/baps/admin/:bapId",title:"Set permission of user on bap",name:"Put_Set_permission_of_user_on_bap",group:"API_Bap",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"bapId",description:""}]}},body:[{group:"Body",type:"string",optional:!1,field:"userId",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "member": {
        "id": 416,
        "isFullAdmin": true,
        "role": "role",
        "createdAt": "2023-04-07T12:22:07.000Z",
        "updatedAt": "2023-04-07T12:24:55.547Z",
        "userId": 533,
        "bapId": 715,
        "notificationId": 485
    }
}`,type:"json"}]},version:"0.0.0",filename:"baps/baps.router.js",groupTitle:"API_Bap"},{type:"delete",url:"/api/brands/:brandId",title:"Remove brand",name:"Delete_Remove_brand",group:"API_Brand",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"brandId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"brands/brands.router.js",groupTitle:"API_Brand"},{type:"delete",url:"/api/brands/palette/:brandId",title:"Remove palette of brand",name:"Delete_Remove_palette_of_brand",group:"API_Brand",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"brandId",description:""}]}},body:[{group:"Body",type:"string",optional:!1,field:"brandPaletteName",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"brands/brands.router.js",groupTitle:"API_Brand"},{type:"get",url:"/api/brands/:bapId",title:"Get brand info by bap",name:"Get_Get_brand_info_by_bap",group:"API_Brand",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"bapId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "brand": {
        "id": 7,
        "name": "Brand Kit",
        "paletteName": "New palette",
        "logo": null,
        "designId": null,
        "createdAt": "2023-04-27T07:56:58.000Z",
        "updatedAt": "2023-04-27T07:56:58.000Z",
        "bapId": 560,
        "fonts": [],
        "palette": [
            {
                "id": 1,
                "hex": "sfsdf",
                "createdAt": "2222-11-11T00:00:00.000Z",
                "updatedAt": "2222-11-11T00:00:00.000Z",
                "brandId": 7
            }
        ]
    }
}`,type:"json"}]},version:"0.0.0",filename:"brands/brands.router.js",groupTitle:"API_Brand"},{type:"put",url:"/api/brands/:brandId",title:"Edit brand main info",name:"Put_Edit_brand_main_info",group:"API_Brand",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"brandId",description:""}]},examples:[{title:"Request-Example:",content:`{
    "fonts": [{
        "font": "Arial",
        "size": 25
    }],
    "name": "btc",
    "paletteName": "eth",
    "urlLogo": "https://export-download.canva.com/sdfzsdf",
    "designId": "AJsd514s"
}`,type:"json"}]},body:[{group:"Body",type:"string",optional:!0,field:"paletteName",description:""},{group:"Body",type:"string",optional:!0,field:"name",description:""},{group:"Body",type:"string",optional:!0,field:"urlLogo",description:"<p><code>url to image from canva</code></p>"},{group:"Body",type:"file",optional:!0,field:"logo",description:""},{group:"Body",type:"string",optional:!0,field:"designId",description:"<p><code>id of image from canva</code></p>"},{group:"Body",type:"array",optional:!0,field:"fonts",description:"<p><code>array with fields: &quot;font&quot;, &quot;size&quot;, &quot;italic&quot;, &quot;weight&quot;</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "brand": {
        "palette": [
            {
                "id": 41,
                "hex": "FFFF00",
                "createdAt": "2023-04-28T11:16:32.000Z",
                "updatedAt": "2023-04-28T11:16:32.000Z",
                "brandId": 7
            },
            {
                "id": 44,
                "hex": "#FFF000",
                "createdAt": "2023-04-28T11:18:56.000Z",
                "updatedAt": "2023-04-28T11:18:56.000Z",
                "brandId": 7
            }
        ],
        "fonts": [
            {
                "id": 77,
                "font": "Arial",
                "size": 25,
                "italic": null,
                "weight": null,
                "createdAt": "2023-04-28T11:16:32.000Z",
                "updatedAt": "2023-04-28T11:16:32.000Z",
                "brandId": 7
            }
        ],
        "main": {
            "id": 7,
            "name": "btc",
            "paletteName": "eth",
            "logo": "https://export-download.canva.com/sdfzsdf",
            "designId": "AJsd514s",
            "createdAt": "2023-04-27T07:56:58.000Z",
            "updatedAt": "2023-04-28T11:17:39.000Z",
            "bapId": 560
        }
    }
}`,type:"json"}]},version:"0.0.0",filename:"brands/brands.router.js",groupTitle:"API_Brand"},{type:"put",url:"/api/brands/palette/:brandId",title:"Edit palette of brand",name:"Put_Edit_palette_of_brand",group:"API_Brand",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"brandId",description:""}]},examples:[{title:"Request-Example:",content:`{
    "brandPaletteName": "asdasd",
    "hex": [
        "#FFFF00",
        "#FF0000",
    ]
}`,type:"json"}]},body:[{group:"Body",type:"string",optional:!1,field:"brandPaletteName",description:""},{group:"Body",type:"array",optional:!1,field:"hex",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "palette": [
        {
            "id": 3,
            "name": "asddd",
            "createdAt": "2023-05-17T09:56:27.000Z",
            "updatedAt": "2023-05-17T09:56:27.000Z",
            "brandId": 7,
            "colours": [
                {
                    "id": 8,
                    "hex": "asdasdasd",
                    "createdAt": "2023-05-17T09:56:35.000Z",
                    "updatedAt": "2023-05-17T09:56:35.000Z",
                    "brandPaletteNameId": 3,
                    "brandId": 7
                },
                {
                    "id": 9,
                    "hex": "testttttt",
                    "createdAt": "2023-05-17T09:56:46.000Z",
                    "updatedAt": "2023-05-17T09:56:46.000Z",
                    "brandPaletteNameId": 3,
                    "brandId": 7
                }
            ]
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"brands/brands.router.js",groupTitle:"API_Brand"},{type:"delete",url:"/api/contracts/:contractId",title:"Remove contract",name:"Delete_Remove_contract",group:"API_Contract",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"contractId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
 {
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"contracts/contracts.router.js",groupTitle:"API_Contract"},{type:"get",url:"/api/contracts/splits/pending",title:"Get contracts and pending splits",name:"Get_Get_contracts_and_pending_splits",group:"API_Contract",query:[{group:"Query",type:"number",optional:!0,field:"userId",description:"<p><code>this</code></p>"},{group:"Query",type:"number",optional:!0,field:"bapId",description:"<p><code>or this</code></p>"},{group:"Query",type:"number",optional:!0,field:"releaseId",description:"<p><code>or this</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "contracts": [
        {
            "contractId": 110,
            "bapName": "B.A.P",
            "createdAt": "2023-05-16T09:20:16.000Z",
            "splitId": 491,
            "referenceContractId": 1,
            "releaseName": "Second RELEASE",
            "releaseId": 425,
            "bapId": 123,
            "creatorBapId": 123,
            "isOldContract": 0,
            "isCancelled": 1375,
            "tracks": [
                {
                    "trackId": 814,
                    "releaseId": 425,
                    "splitId": 491,
                    "uniqueName": "1cb3facf-db33-45bf-b647-606dc7bc377c.mp3",
                    "name": "ONEIL_ORGAN_FAVIA",
                    "type": "Acoustic",
                    "credits": [
                        {
                            "name": "ivaan",
                            "creditIds": "[1]"
                        },
                        {
                            "email": "ivankovdrin7@gmail.com",
                            "userId": 1225,
                            "lastName": "lastname",
                            "creditIds": "[1,2,3]",
                            "firstName": "name"
                        }
                    ]
                }
            ],
            "users": [
                {
                    "userId": 899,
                    "email": "lepiv83352@carpetra.com",
                    "firstName": "Vlad",
                    "lastName": "t1",
                    "userAvatar": null,
                    "ownership": "100",
                    "splitId": 491,
                    "signature": null,
                    "reviewed": 0
                }
            ]
        }
    ],
    "splits": [
        {
            "id": 493,
            "createdAt": "2023-05-16T09:44:22.000Z",
            "updatedAt": "2023-05-16T09:44:22.000Z",
            "releaseId": 425,
            "releaseName": "Second RELEASE",
            "bapName": "B.A.P",
            "bapId": 123,
            "creatorBapId": 123,
            "tracks": [
                {
                    "trackId": 815,
                    "releaseId": 425,
                    "splitId": 493,
                    "uniqueName": "c964b5c9-3ca5-4891-97cb-bb7526c7e3b2.mp3",
                    "name": "DNDM__Hussein_Arbabi",
                    "type": null
                },
                {
                    "trackId": 816,
                    "releaseId": 425,
                    "splitId": 493,
                    "uniqueName": "6964c073-cb3e-4e75-9014-7c78e7a2ae8f.wav",
                    "name": "Bula_v_mene_parova_mashina.",
                    "type": null
                }
            ],
            "users": [
                {
                    "userId": 899,
                    "email": "lepiv83352@carpetra.com",
                    "firstName": "Vlad",
                    "lastName": "t1",
                    "userAvatar": null,
                    "ownership": "50",
                    "splitId": 493,
                    "signature": null,
                    "reviewed": 0
                },
                {
                    "userId": 4,
                    "email": "sname.parser123@gmail.com",
                    "firstName": "SASHA",
                    "lastName": "qwe",
                    "userAvatar": "28169604-e36e-47aa-a30d-3138f14e0b1e.jpg",
                    "ownership": "50",
                    "splitId": 493,
                    "signature": null,
                    "reviewed": 0
                }
            ]
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"contracts/contracts.router.js",groupTitle:"API_Contract"},{type:"get",url:"/api/contracts/signature/:contractId/:userId",title:"Get signature image",name:"Get_Get_signature_image",group:"API_Contract",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"contractId",description:""},{group:"Parameter",type:"number",optional:!1,field:"userId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"file",description:""}]}},version:"0.0.0",filename:"contracts/contracts.router.js",groupTitle:"API_Contract"},{type:"get",url:"/api/contracts/:contractId",title:"Get contract",name:"Get_contract",group:"API_Contract",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"contractId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "contract": {
        "id": 4,
        "createdAt": "2023-04-25T06:25:08.000Z",
        "updatedAt": "2023-04-25T06:25:08.000Z",
        "releaseId": 337,
        "referenceContractId": 1,
        "splitId": 123,
        "tracksSplit": [
            {
                "trackId": 639,
                "releaseId": 337,
                "splitId": 326,
                "uniqueName": "d91ca1f5-fb06-4a5a-aaaa-bc6f3ff2a5a6.mp3",
                "name": "DNDM__Hussein_Arbabi_-_Dubai_(Dj_Rauff_remix)_(ringon.site).mp3",
                "type": null
            },
            {
                "trackId": 640,
                "releaseId": 337,
                "splitId": 326,
                "uniqueName": "b10c4946-1b77-41fe-8cfd-6c70acfda741.mp3",
                "name": "ONEIL_ORGAN_FAVIA_-_Sweet_dreams_(ringon.site).mp3",
                "type": null
            }
        ],
        "splitUsers": [
            {
                "userId": 10,
                "email": "test@gmail.com",
                "firstName": "test",
                "lastName": "test",
                "ownership": "39",
                "splitId": 326,
                "signature": null,
                "reviewed": 0
            },
            {
                "userId": 571,
                "email": "qqq@qqq.com",
                "firstName": "qqq",
                "lastName": "QQQ",
                "ownership": "61",
                "splitId": 326,
                "signature": null,
                "reviewed": 0
            }
        ]
    }
}`,type:"json"}]},version:"0.0.0",filename:"contracts/contracts.router.js",groupTitle:"API_Contract"},{type:"post",url:"/api/contracts/:splitId",title:"Create contract",name:"Post_Create_contract",group:"API_Contract",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"splitId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "contract": {
        "id": 4,
        "createdAt": "2023-04-25T06:25:08.000Z",
        "updatedAt": "2023-04-25T06:25:08.000Z",
        "releaseId": 337,
        "tracksSplit": [
            {
                "trackId": 639,
                "releaseId": 337,
                "splitId": 326,
                "uniqueName": "d91ca1f5-fb06-4a5a-aaaa-bc6f3ff2a5a6.mp3",
                "name": "DNDM__Hussein_Arbabi_-_Dubai_(Dj_Rauff_remix)_(ringon.site).mp3",
                "type": null
            },
            {
                "trackId": 640,
                "releaseId": 337,
                "splitId": 326,
                "uniqueName": "b10c4946-1b77-41fe-8cfd-6c70acfda741.mp3",
                "name": "ONEIL_ORGAN_FAVIA_-_Sweet_dreams_(ringon.site).mp3",
                "type": null
            }
        ],
        "splitUsers": [
            {
                "userId": 10,
                "email": "test@gmail.com",
                "firstName": "test",
                "lastName": "test",
                "ownership": "39",
                "splitId": 326,
                "signature": null,
                "reviewed": 0
            },
            {
                "userId": 571,
                "email": "qqq@qqq.com",
                "firstName": "qqq",
                "lastName": "QQQ",
                "ownership": "61",
                "splitId": 326,
                "signature": null,
                "reviewed": 0
            }
        ]
    }
}`,type:"json"}]},version:"0.0.0",filename:"contracts/contracts.router.js",groupTitle:"API_Contract"},{type:"post",url:"/api/contracts/signature/remind/:contractId",title:"send remind participants contract",name:"Post_send_remind_participants_contract",group:"API_Contract",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"contractId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"contracts/contracts.router.js",groupTitle:"API_Contract"},{type:"put",url:"/api/contracts/signature/:contractId",title:"Signature contract",name:"Put_Signature_contract",group:"API_Contract",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"contractId",description:""}]}},body:[{group:"Body",type:"string",optional:!0,field:"content",description:"<p><code>if you decline contract, you must write reason</code></p>"},{group:"Body",type:"boolean",optional:!0,field:"isAccept",description:"<p><code>true || false. If you don't specify parameters, so isAccept will be false</code></p>",checked:!1},{group:"Body",type:"files",optional:!0,field:"signature",description:"<p><code>file signature of user</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "contractUser": [
        {
            "userId": 571,
            "email": "qqq@qqq.com",
            "firstName": "qqq",
            "lastName": "QQQ",
            "ownership": "80",
            "splitId": 189,
            "signature": "signature",
            "reviewed": 1
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"contracts/contracts.router.js",groupTitle:"API_Contract"},{type:"delete",url:"/api/credits/",title:"Remove credits",name:"Delete_Remove_credits",group:"API_Credit",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},query:[{group:"Query",type:"number",optional:!1,field:"trackId",description:""},{group:"Query",type:"number",optional:!1,field:"userId",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"credits/credits.router.js",groupTitle:"API_Credit"},{type:"get",url:"/api/credits/:trackId",title:"Get Credits",name:"Get_Credits",group:"API_Credit",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"trackId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "credits": [
        {
            "userId": 169,
            "firstName": "Jessica",
            "lastName": "Hammes",
            "email": "79390016@mail.com",
            "trackId": 348,
            "splitId": 153,
            "creditNames": [
                "Composer",
                "Lyricist",
                "Producer",
                "Remixer"
            ]
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"credits/credits.router.js",groupTitle:"API_Credit"},{type:"Get",url:"/api/credits/type",title:"Get credit types",name:"Get_Get_credit_types",group:"API_Credit",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "creditTypes": [
        {
            "id": 1,
            "name": "No Credit"
        },
        {
            "id": 2,
            "name": "Composer"
        },
        {
            "id": 3,
            "name": "Lyricist"
        },
        {
            "id": 4,
            "name": "Producer"
        },
        {
            "id": 5,
            "name": "Remixer"
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"credits/credits.router.js",groupTitle:"API_Credit"},{type:"post",url:"/api/credits/",title:"Add credits",name:"Post_Add_credits",group:"API_Credit",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},body:[{group:"Body",type:"number",optional:!0,field:"userId",description:"<p><code>this</code></p>"},{group:"Body",type:"string",optional:!0,field:"name",description:"<p><code>or this</code></p>"},{group:"Body",type:"number",optional:!1,field:"trackId",description:""},{group:"Body",type:"array",optional:!1,field:"creditIds",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "credit": {
        "id": 14,
        "userId": "4",
        "trackId": "14",
        "updatedAt": "2023-04-05T09:46:41.537Z",
        "createdAt": "2023-04-05T09:46:41.537Z"
    }
}`,type:"json"}]},version:"0.0.0",filename:"credits/credits.router.js",groupTitle:"API_Credit"},{type:"delete",url:"/api/customers/landing/page/basket/:landingPageId",title:"Remove track from basket",name:"Delete_Remove_track_from_basket",group:"API_Customers-Landing",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"landingPageId",description:""}]}},body:[{group:"Body",type:"number",optional:!1,field:"trackId",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"customers/landing/customers-landing.router.js",groupTitle:"API_Customers-Landing"},{type:"get",url:"/api/customers/landing/page/basket/:landingPageId",title:"Get tracks from basket",name:"Get_Get_tracks_from_basket",group:"API_Customers-Landing",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"landingPageId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
 {
    "success": true,
    "tracks": [
        {
            "track": {
                "id": 2575,
                "name": "Charlie Brown",
                "uniqueName": "c4b829c4-3be2-4b66-b286-d09cc342a039.mp3",
                "preview": "cut_c4b829c4-3be2-4b66-b286-d09cc342a039.mp3",
                "originalName": "c4b829c4-3be2-4b66-b286-d09cc342a039.mp3",
                "type": null,
                "price": "10.000",
                "info": {
                    "status": "success",
                    "result": {
                        "artist": "Alice Merton",
                        "title": "Charlie Brown",
                        "album": "Charlie Brown",
                        "release_date": "2023-06-16",
                        "label": "Paper Plane Records International",
                        "timecode": "00:09",
                        "song_link": "https://lis.tn/tbFtkq",
                        "apple_music": {
                            "previews": [
                                {
                                    "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/7b/12/dd/7b12dd53-df3a-6186-3c9e-05f22bba3442/mzaf_13455979570281027305.plus.aac.p.m4a"
                                }
                            ],
                            "artwork": {
                                "width": 3000,
                                "height": 3000,
                                "url": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/6d/03/31/6d03311f-e804-bb9a-c563-a0c95c4f9f45/cover_4251917100987.jpg/{w}x{h}bb.jpg",
                                "bgColor": "fec200",
                                "textColor1": "130400",
                                "textColor2": "432413",
                                "textColor3": "422a00",
                                "textColor4": "68430f"
                            },
                            "artistName": "Alice Merton",
                            "url": "https://music.apple.com/us/album/charlie-brown/1690605786?app=music&at=1000l33QU&i=1690605787&mt=1",
                            "discNumber": 1,
                            "genreNames": [
                                "Indie Pop",
                                "Music",
                                "Alternative"
                            ],
                            "durationInMillis": 169893,
                            "releaseDate": "2023-06-16",
                            "name": "Charlie Brown",
                            "isrc": "DEVQ72300003",
                            "albumName": "Charlie Brown - Single",
                            "playParams": {
                                "id": "1690605787",
                                "kind": "song"
                            },
                            "trackNumber": 1,
                            "composerName": "Alice Merton, Christopher Wood, Matt Wills & William Farquarson"
                        },
                        "spotify": {
                            "album": {
                                "name": "Charlie Brown",
                                "artists": [
                                    {
                                        "name": "Alice Merton",
                                        "id": "7f0OLhGgBMX9fUjm1dcPip",
                                        "uri": "spotify:artist:7f0OLhGgBMX9fUjm1dcPip",
                                        "href": "https://api.spotify.com/v1/artists/7f0OLhGgBMX9fUjm1dcPip",
                                        "external_urls": {
                                            "spotify": "https://open.spotify.com/artist/7f0OLhGgBMX9fUjm1dcPip"
                                        }
                                    }
                                ],
                                "album_group": "",
                                "album_type": "single",
                                "id": "3vLHtJNQIxQJCQqcFE2d78",
                                "uri": "spotify:album:3vLHtJNQIxQJCQqcFE2d78",
                                "href": "https://api.spotify.com/v1/albums/3vLHtJNQIxQJCQqcFE2d78",
                                "images": [
                                    {
                                        "height": 640,
                                        "width": 640,
                                        "url": "https://i.scdn.co/image/ab67616d0000b27365dc0efa74bdb63e31b05ddf"
                                    },
                                    {
                                        "height": 300,
                                        "width": 300,
                                        "url": "https://i.scdn.co/image/ab67616d00001e0265dc0efa74bdb63e31b05ddf"
                                    },
                                    {
                                        "height": 64,
                                        "width": 64,
                                        "url": "https://i.scdn.co/image/ab67616d0000485165dc0efa74bdb63e31b05ddf"
                                    }
                                ],
                                "external_urls": {
                                    "spotify": "https://open.spotify.com/album/3vLHtJNQIxQJCQqcFE2d78"
                                },
                                "release_date": "2023-06-16",
                                "release_date_precision": "day"
                            },
                            "external_ids": {
                                "isrc": "DEVQ72300003"
                            },
                            "popularity": 43,
                            "is_playable": null,
                            "linked_from": null,
                            "artists": [
                                {
                                    "name": "Alice Merton",
                                    "id": "7f0OLhGgBMX9fUjm1dcPip",
                                    "uri": "spotify:artist:7f0OLhGgBMX9fUjm1dcPip",
                                    "href": "https://api.spotify.com/v1/artists/7f0OLhGgBMX9fUjm1dcPip",
                                    "external_urls": {
                                        "spotify": "https://open.spotify.com/artist/7f0OLhGgBMX9fUjm1dcPip"
                                    }
                                }
                            ],
                            "disc_number": 1,
                            "duration_ms": 169893,
                            "explicit": false,
                            "external_urls": {
                                "spotify": "https://open.spotify.com/track/16WnxfT3YRRQP6CA10CFcm"
                            },
                            "href": "https://api.spotify.com/v1/tracks/16WnxfT3YRRQP6CA10CFcm",
                            "id": "16WnxfT3YRRQP6CA10CFcm",
                            "name": "Charlie Brown",
                            "preview_url": "https://p.scdn.co/mp3-preview/b1e18feefdeec307afcb1a6bfb690701c52b0c44?cid=e44e7b8278114c7db211c00ea273ac69",
                            "track_number": 1,
                            "uri": "spotify:track:16WnxfT3YRRQP6CA10CFcm"
                        }
                    },
                    "preview": "https://p.scdn.co/mp3-preview/b1e18feefdeec307afcb1a6bfb690701c52b0c44?cid=e44e7b8278114c7db211c00ea273ac69"
                },
                "position": 1,
                "socialLinks": "https://lis.tn/tbFtkq",
                "composers": "Alice Merton, Christopher Wood, Matt Wills, William Farquarson",
                "duration": 169893,
                "discNumber": 1,
                "isrc": "DEVQ72300003",
                "lyrics": "0",
                "spotifyId": "16WnxfT3YRRQP6CA10CFcm",
                "spotifyPreviewUrl": "https://p.scdn.co/mp3-preview/b1e18feefdeec307afcb1a6bfb690701c52b0c44?cid=e44e7b8278114c7db211c00ea273ac69",
                "timeCode": "00:09",
                "albumSpotifyId": "3vLHtJNQIxQJCQqcFE2d78",
                "explicit": false,
                "spotifyLink": "https://open.spotify.com/track/16WnxfT3YRRQP6CA10CFcm",
                "createdAt": "2023-09-04T14:18:46.000Z",
                "updatedAt": "2023-09-05T09:49:20.000Z",
                "releaseId": 992,
                "bapId": 1811
            }
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"customers/landing/customers-landing.router.js",groupTitle:"API_Customers-Landing"},{type:"post",url:"/api/customers/landing/page/basket/:landingPageId",title:"Add track to basket",name:"Post_Add_track_to_basket",group:"API_Customers-Landing",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"landingPageId",description:""}]}},body:[{group:"Body",type:"array",optional:!1,field:"trackIds",description:"<p><code>[1, 2, 3, 4, 5, 6]</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"customers/landing/customers-landing.router.js",groupTitle:"API_Customers-Landing"},{type:"get",url:"/api/customers/orders/",title:"Get orders",name:"Get_Get_orders",group:"API_Customers-Order",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "orders": [
        {
            "id": 25,
            "createdAt": "2023-06-13T08:49:25.000Z",
            "bapName": "creamy",
            "releaseName": "test",
            "trackName": "1473123940.mp3",
            "gross": "10.000",
            "contractId": null,
            "trackId": 1051,
            "releaseLogo": "https://export-download.canva.com/tA_EI/DAFkrFtA_EI/2/0/0001-328029038307322220.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHKNGJLC2J7OGJ6Q%2F20230602%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230602T064400Z&X-Amz-Expires=23364&X-Amz-Signature=acf5e9bae7c99de4850ea64c5a67d18e990fd71d34e95afc03bfed10e6dbda81&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%2A%3DUTF-8%27%27Untitled%2520design.png&response-expires=Fri%2C%2002%20Jun%202023%2013%3A13%3A24%20GMT"
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"customers/orders/orders.router.js",groupTitle:"API_Customers-Order"},{type:"post",url:"/api/customers/payment/",title:"Payment for tracks",name:"Post_Payment_for_tracks",group:"API_Customers-Payment",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},query:[{group:"Query",type:"number",optional:!1,field:"purchaseLocationTypeId",description:"<p><code>id: 1 - shop. id: 2 - landing</code></p>"},{group:"Query",type:"number",optional:!1,field:"purchaseLocationId",description:"<p><code>it's of shop or landing</code></p>"}],body:[{group:"Body",type:"string",optional:!1,field:"paymentEmail",description:""},{group:"Body",type:"number",optional:!1,field:"invoiceId",description:"<p><code>Invoice from PayPal</code></p>"},{group:"Body",type:"object",optional:!1,field:"trackIds",description:"<p><code>Object keys is releaseId and value is trackIds as array</code></p>"}],parameter:{examples:[{title:"Request-Example:",content:`{
    "paymentEmail": "raceg14sf552@jwsuns.com",
    "trackIds": {
         1984: [2358, 15489]
     },
    "invoiceId: "6789"
    "tips": 12
}`,type:"json"}]},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"customers/payment/payment.router.js",groupTitle:"API_Customers-Payment"},{type:"delete",url:"/api/customers/shops/basket/:shopId",title:"Remove track from basket",name:"Delete_Remove_track_from_basket",group:"API_Customers-Shop",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"shopId",description:""}]}},body:[{group:"Body",type:"number",optional:!1,field:"trackId",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"customers/shop/customers-shop.router.js",groupTitle:"API_Customers-Shop"},{type:"get",url:"/api/customers/shops/basket/:shopId",title:"Get tracks from basket",name:"Get_Get_tracks_from_basket",group:"API_Customers-Shop",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"shopId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "basket": [
        {
            "shopId": 1,
            "shopName": "sfsdfz",
            "trackName": "name",
            "uniqueName": "98747c7a-da04-49c6-a792-0287d5606af4.mp3",
            "trackId": 33,
            "basketId": 7
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"customers/shop/customers-shop.router.js",groupTitle:"API_Customers-Shop"},{type:"post",url:"/api/customers/shops/basket/:shopId",title:"Add track to basket",name:"Post_Add_track_to_basket",group:"API_Customers-Shop",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"shopId",description:""}]}},body:[{group:"Body",type:"array",optional:!1,field:"trackIds",description:"<p><code>[1, 2, 3, 4, 5, 6]</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"customers/shop/customers-shop.router.js",groupTitle:"API_Customers-Shop"},{type:"post",url:"/api/eveara/subscriptions/user",title:"Subscriptions - Add user subscription",name:"Add_User_Subscription",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},body:[{group:"Body",type:"array",optional:!1,field:"subscriptions",description:""},{group:"Body",type:"number",optional:!1,field:"subscriptions.subscription_id",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "message": "subscription added sucessfully",
    "success": true,
    "data": [
        {
            "subscription_id": "571",
            "my_subscription_id": 36259
       }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"eveara/subscriptions/subscriptions.router.js",groupTitle:"API_Eveara"},{type:"post",url:"/api/eveara/albums",title:"Albums - Add album",name:"Add_album",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},body:[{group:"Body",type:"number",optional:!1,field:"releaseId",description:"<p><code>release id on majorlabl</code></p>"},{group:"Body",type:"number",optional:!1,field:"subscription_id",description:""},{group:"Body",type:"array",optional:!0,field:"artists",description:"<p><code>Artist(s) Id of the Album, for example: [123, 124]</code></p>"},{group:"Body",type:"number",optional:!0,field:"ean_upc",description:"<p><code>EAN or UPC number of the Album</code></p>"},{group:"Body",type:"number",optional:!0,field:"label_id",description:"<p><code>Label of the Album</code></p>"},{group:"Body",type:"date",optional:!0,field:"original_release_date",description:"<p><code>Original Release Date of the Album (dd-mm-yyyy)</code></p>"},{group:"Body",type:"string",optional:!0,field:"product_type",description:"<p><code>Acceptable product types are album,single,compilation_album,ep</code></p>"},{group:"Body",type:"string",optional:!0,field:"product_code_type",description:"<p><code>Acceptable product type codes are ean, upc and jan</code></p>"},{group:"Body",type:"boolean",optional:!0,field:"code_auto_generate",description:"<p><code>code auto generate for enable/disable</code></p>",checked:!1},{group:"Body",type:"number",optional:!0,field:"spatial_ean_upc",description:"<p><code>EAN or UPC number of the spatial audio</code></p>"},{group:"Body",type:"string",optional:!0,field:"spatial_product_code_type",description:"<p><code>Acceptable product type codes are ean, upc and jan</code></p>"},{group:"Body",type:"boolean",optional:!0,field:"spatial_code_auto_generate",description:"<p><code>spatial product code auto generate for enable/disable</code></p>",checked:!1},{group:"Body",type:"string",optional:!0,field:"product_format",description:"<p><code>Acceptable product formats are Stereo, Stereo and Dolby Atmos and Stereo and 360RA</code></p>"},{group:"Body",type:"object",optional:!0,field:"cover_image",description:""},{group:"Body",type:"string",optional:!0,field:"cover_image.url",description:"<p><code>URL of the file. File size should be between 100KB and 10 MB. The image must be of 1:1 ratio (square), and size can range from 1400px to 4000px</code></p>"},{group:"Body",type:"string",optional:!0,field:"cover_image.extension",description:"<p><code>File extension, Acceptable extensions are JPG, JPEG, PNG, BMP, TIF, TIFF or GIF</code></p>"},{group:"Body",type:"array",optional:!0,field:"tracks",description:""},{group:"Body",type:"number",optional:!0,field:"tracks.track_id",description:""},{group:"Body",type:"array",optional:!0,field:"tracks.artists",description:"<p><code>Artist(s) Id of the Track</code></p>"},{group:"Body",type:"array",optional:!0,field:"tracks.featured_artists",description:""},{group:"Body",type:"object",optional:!0,field:"tracks.preview",description:""},{group:"Body",type:"number",optional:!0,field:"preview.start_at",description:""},{group:"Body",type:"number",optional:!0,field:"preview.duration",description:""},{group:"Body",type:"array",optional:!0,field:"tracks.participant",description:""},{group:"Body",type:"number",optional:!0,field:"participant.id",description:""},{group:"Body",type:"number",optional:!0,field:"participant.role_id",description:""},{group:"Body",type:"number",optional:!0,field:"participant.payout_share_percentage",description:"<p><code>Participant payout share percentage , total share percentage per track should be equal to 100</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "data": {
        "message": "Album saved successfully",
        "success": true,
        "release_id": 100000469648
    }
}`,type:"json"}]},version:"0.0.0",filename:"eveara/albums/albums.router.js",groupTitle:"API_Eveara"},{type:"post",url:"/api/eveara/artists",title:"Artists - Add artist",name:"Add_artist",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},body:[{group:"Body",type:"string",optional:!1,field:"name",description:""},{group:"Body",type:"string",optional:!1,field:"country",description:""},{group:"Body",type:"string",optional:!0,field:"bapId",description:""},{group:"Body",type:"object",optional:!0,field:"outlets_profile",description:""},{group:"Body",type:"string",optional:!0,field:"outlets_profile.spotify_profile",description:"<p><code>Expecting a valid Spotify artist profile URI (Eg: spotify:artist:#############)</code></p>"},{group:"Body",type:"string",optional:!0,field:"outlets_profile.soundcloudgo_profile",description:"<p><code>Expecting a valid SoundCloud artist profile permalink (Eg: for &quot;https://soundcloud.com/#############&quot; just include &quot;#############&quot;)</code></p>"},{group:"Body",type:"string",optional:!0,field:"outlets_profile.applemusic_profile",description:"<p><code>Expecting a valid Apple artist profile id (Eg: for &quot;https://music.apple.com/us/artist/abcdefgh/#############&quot; just include &quot;#############&quot;)</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "message": "Artist saved successfully",
    "success": true,
    "artist_id": "85194",
    "artist_name": "name"
}`,type:"json"}]},version:"0.0.0",filename:"eveara/artists/artists.router.js",groupTitle:"API_Eveara"},{type:"post",url:"/api/eveara/labels",title:"Labels - Add label",name:"Add_label",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},body:[{group:"Body",type:"string",optional:!1,field:"releaseId",description:""},{group:"Body",type:"string",optional:!1,field:"name",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "message": "Label saved successfully",
    "success": true,
    "label_id": "34247",
    "label_name": "mylabel"
}`,type:"json"}]},version:"0.0.0",filename:"eveara/labels/labels.router.js",groupTitle:"API_Eveara"},{type:"post",url:"/api/eveara/participants",title:"Participants - Add participant",name:"Add_participant",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},body:[{group:"Body",type:"number",optional:!1,field:"userId",description:""},{group:"Body",type:"string",optional:!1,field:"name",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "participant": {
        "id": 3,
        "creatorId": 1225,
        "uuidEveara": "2A7339FF-E0ED-3EEE-9B018973A7AC12A9",
        "userId": 1225,
        "participantId": 73471,
        "updatedAt": "2023-10-05T08:54:51.267Z",
        "createdAt": "2023-10-05T08:54:51.267Z"
    }
}`,type:"json"}]},version:"0.0.0",filename:"eveara/participants/participants.router.js",groupTitle:"API_Eveara"},{type:"post",url:"/api/eveara/participants/paypal/:participantId",title:"Participants - Add participant paypal",name:"Add_participant_paypal",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"string",optional:!1,field:"participantId",description:"<p><code>Participant Id</code></p>"}]}},body:[{group:"Body",type:"string",optional:!1,field:"uuid",description:"<p><code>User unique UuidEveara</code></p>"},{group:"Body",type:"string",optional:!1,field:"paypalEmailId",description:"<p><code>Same paypal id can't be duplicated with different participants</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "message": "Participant Paypal saved successfully",
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"eveara/participants/participants.router.js",groupTitle:"API_Eveara"},{type:"post",url:"/api/eveara/tracks",title:"Tracks - Add tracks",name:"Add_tracks",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},body:[{group:"Body",type:"string",optional:!1,field:"releaseId",description:"<p><code>releaseId on majorlabl</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "tracks": [
        {
            "id": 2749,
            "message": "track already exist on Eveara",
            "originalName": "cacc2943-b3c4-4355-b8cd-ef356cfe5bba.flac",
            "evearaTrackId": "358651"
        },
        {
            "id": 2753,
            "message": "track added and updated on Eveara successfully",
            "originalName": "1fa4f345-8d98-4d7e-9752-75a0443193b0.flac",
            "evearaTrackId": 358660
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"eveara/eveara-tracks/eveara-tracks.router.js",groupTitle:"API_Eveara"},{type:"post",url:"/api/eveara/users",title:"Users - Create user on Eveara",name:"Create_user_on_Eveara",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},body:[{group:"Body",type:"string",optional:!1,field:"email",description:""},{group:"Body",type:"string",optional:!1,field:"firstName",description:""},{group:"Body",type:"string",optional:!1,field:"lastName",description:""},{group:"Body",type:"number",optional:!0,field:"isMailSubscribed",description:"<p><code>1 (subscribed) or  0(not subscribed)</code></p>"},{group:"Body",type:"object",optional:!0,field:"address",description:""},{group:"Body",type:"string",optional:!0,field:"address.house",description:"<p><code>House number of the user</code></p>"},{group:"Body",type:"string",optional:!0,field:"address.street",description:"<p><code>Street of the user</code></p>"},{group:"Body",type:"string",optional:!0,field:"address.city",description:"<p><code>City of the user</code></p>"},{group:"Body",type:"string",optional:!0,field:"address.zip",description:"<p><code>Zip code of the user, expecting a number between 5 - 8 digits long</code></p>"},{group:"Body",type:"string",optional:!0,field:"address.mobile",description:"<p><code>Mobile number of the user</code></p>"},{group:"Body",type:"string",optional:!0,field:"country",description:"<p><code>Country in ISO code</code></p>"},{group:"Body",type:"string",optional:!0,field:"state",description:"<p><code>State in ISO code</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "message": "User saved successfully",
    "success": true,
    "uuid": "88A54D95-AE42-0CC3-7DAFD4143CCDED4A"
}`,type:"json"}]},version:"0.0.0",filename:"eveara/users/eveara-users.router.js",groupTitle:"API_Eveara"},{type:"patch",url:"/api/eveara/outlets/:releaseId/distribute",title:"Outlets - Distribute",name:"Distribute",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"releaseId",description:""}]},examples:[{title:"Request-Example:",content:`{
    "uuid": "2A7339FF-E0ED-3EEE-9B018973A7AC12A9",
    "outlets_details": [
        {
            "store_id": 2,
            "pre_sales_date": "02-03-2020",
            "release_start_date": "08-05-2020",
            "release_end_date": "06-08-2020",
            "price_code" : {
                "album_price_id" : 361,
                "track_price_id" : 374
            }
        }
    ],
    "evearaPriceId":  {
        "appleMusicReleasePriceId": 123,
        "appleMusicTrackPriceId": 321,
        "amazonReleasePriceId": 456,
        "amazonTrackPriceId": 654
    }
}`,type:"json"}]},body:[{group:"Body",type:"string",optional:!1,field:"uuid",description:""},{group:"Body",type:"array",optional:!1,field:"outlets_details",description:""},{group:"Body",type:"number",optional:!1,field:"outlets_details.store_id",description:"<p><code>Store Id obtained from get Outlets</code></p>"},{group:"Body",type:"date",optional:!1,field:"outlets_details.release_start_date",description:"<p><code>Release Start Date of the album on store (dd-mm-yyyy)</code></p>"},{group:"Body",type:"date",optional:!0,field:"outlets_details.pre_sales_date",description:"<p><code>Pre Sales Date for album to distirbute on store (dd-mm-yyyy)</code></p>"},{group:"Body",type:"date",optional:!0,field:"outlets_details.release_end_date",description:"<p><code>Release End Date of the album on store (dd-mm-yyyy)</code></p>"},{group:"Body",type:"object",optional:!0,field:"price_code",description:""},{group:"Body",type:"number",optional:!0,field:"price_code.album_price_id",description:"<p><code>Album Price Id obtained from get Outlets by Album API</code></p>"},{group:"Body",type:"number",optional:!0,field:"price_code.track_price_id",description:"<p><code>Track Price Id obtained from get Outlets by Album API</code></p>"},{group:"Body",type:"object",optional:!0,field:"evearaPriceId",description:""},{group:"Body",type:"number",optional:!0,field:"evearaPriceId.appleMusicReleasePriceId",description:""},{group:"Body",type:"number",optional:!0,field:"evearaPriceId.appleMusicTrackPriceId",description:""},{group:"Body",type:"number",optional:!0,field:"evearaPriceId.amazonReleasePriceId",description:""},{group:"Body",type:"number",optional:!0,field:"evearaPriceId.amazonTrackPriceId",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "message": "Album distribution initiated successfully",
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"eveara/outlets/outlets.router.js",groupTitle:"API_Eveara"},{type:"get",url:"/api/eveara/reports/download",title:"Reports - Download report",name:"Download_report",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},query:[{group:"Query",type:"string",optional:!1,field:"uuidEveara",description:""},{group:"Query",type:"string",optional:!1,field:"reportType",description:"<p><code>Report type determines the type of stream report. Accepted values are country, store, album and track</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "message": "1 records found",
    "success": true,
    "data": [
        {
            "album_name": "MyTest",
            "eanupc": "5055829872111",
            "release_id": 100000314902,
            "download_count": 0
        }
    ],
    "status_code": 200
}`,type:"json"}]},version:"0.0.0",filename:"eveara/reports/reports.router.js",groupTitle:"API_Eveara"},{type:"get",url:"/api/eveara/utilities/countries",title:"Utilities - Get countries",name:"Get_Countries",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "data": [
        {
            "country_code": "AF",
            "country_name": "Afghanistan",
            "state": [
                {
                    "state_code": "BDS",
                    "state_name": "Badakhsh\u0101n"
                },
                {
                    "state_code": "BDG",
                    "state_name": "B\u0101dgh\u012Bs"
                },
                ...`,type:"json"}]},version:"0.0.0",filename:"eveara/utilities/utilities.router.js",groupTitle:"API_Eveara"},{type:"get",url:"/api/eveara/outlets/:releaseId",title:"Outlets - Get outlets details by album",name:"Get_Outlets_Details_By_Album",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"releaseId",description:"<p><code>Release Id of the Album</code></p>"}]}},query:[{group:"Query",type:"string",optional:!1,field:"uuidEveara",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
   "message": "Successfully fetched Outlet details",
   "success": true,
   "data": [
       {
           "process_duration_dates": 10,
            "release_start_date": "19-09-2023",
            "store_name": "Outlet Group 1",
            "is_presales_date_enabled": false,
            "pre_sales_date": "",
            "release_end_date": "",
            "store_id": 4073,
            "outlet_status": {
                "status_code": 1021,
                "status_name": "Draft"
            },
            "child_stores": [
                "7 Digital",
                "Digster",
                "Electric Jukebox / Roxi",
                "eMusic",
                "Klassik Radio",
                "Moodagent",
                "Mus.uy",
                "MuzArcade",
                "MyMelo",
                "NEC",
                "Snap",
                "Xite"
            ],
            "price_code_list": {
                "album": [],
                "track": []
            },
            "price_code": {
                "track_price_id": 0,
                "album_price_id": 0
            }
       },
   ]
}`,type:"json"}]},version:"0.0.0",filename:"eveara/outlets/outlets.router.js",groupTitle:"API_Eveara"},{type:"get",url:"/api/eveara/participants/id",title:"Participants - Get participants by id",name:"Get_Participants_By_Id",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},query:[{group:"Query",type:"number",optional:!1,field:"creatorId",description:"<p><code>this</code></p>"},{group:"Query",type:"number",optional:!1,field:"userId",description:"<p><code>or this</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "participants": [
        {
            "id": 1,
            "creatorId": 1225,
            "userId": 1225,
            "participantId": 73469,
            "paypalEmailId": null,
            "createdAt": "2023-10-05T08:24:39.000Z",
            "updatedAt": "2023-10-05T08:24:39.000Z"
        },
        {
            "id": 2,
            "creatorId": 1225,
            "userId": 1225,
            "participantId": 73470,
            "paypalEmailId": null,
            "createdAt": "2023-10-05T08:27:29.000Z",
            "updatedAt": "2023-10-05T08:27:29.000Z"
        },
        ...
    }
}`,type:"json"}]},version:"0.0.0",filename:"eveara/participants/participants.router.js",groupTitle:"API_Eveara"},{type:"get",url:"/api/eveara/subscriptions/partner",title:"Subscriptions - Get partner subscriptions",name:"Get_Partner_Subscriptions",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},query:[{group:"Query",type:"number",optional:!0,field:"subscriptionId",description:"<p><code>to find only one subscription</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "message": "Currently showing 1 record(s)",
    "success": true,
    "total_records": 1,
    "data": [
        {
            "total_number_of_albums": "Unlimited",
            "currency": "USD",
            "max_artists_per_product": 20,
            "total_number_of_tracks": "Unlimited",
            "subscription_limit_per_year": 20,
            "name": "EVEARA Test",
            "max_tracks_per_product": 20,
            "amount": 0,
            "subscription_id": 571,
            "total_number_of_artist": "Unlimited",
            "subscription_product_type": [
                "Album",
                "Single",
                "Compilation Album",
                "EP"
            ],
            "sku": "EVEA0001",
            "track_file_quality": [
                "Stereo"
            ],
            "duration": "Forever"
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"eveara/subscriptions/subscriptions.router.js",groupTitle:"API_Eveara"},{type:"get",url:"/api/eveara/utilities/roles",title:"Utilities - Get roles",name:"Get_Roles",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "message": "Succesfully fetched role details",
    "success": true,
    "data": [
        {
            "role_id": 1,
            "name": "Author (Lyrics)"
        },
        {
            "role_id": 2,
            "name": "Composer (Music)"
        },
        ...`,type:"json"}]},version:"0.0.0",filename:"eveara/utilities/utilities.router.js",groupTitle:"API_Eveara"},{type:"get",url:"/api/eveara/subscriptions/user",title:"Subscriptions - Get user subscriptions",name:"Get_User_Subscriptions",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},query:[{group:"Query",type:"number",optional:!0,field:"subscriptionId",description:"<p><code>to find only one subscription</code></p>"},{group:"Query",type:"string",optional:!1,field:"uuidEveara",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "message": "Currently showing 2 record(s)",
    "success": true,
    "total_records": 2,
    "data": [
        {
            "deactivate_enabled": true,
            "artists_added": 0,
            "status": "Active",
            "expiration_date": "",
            "subscription_details": {
                "total_number_of_albums": "Unlimited",
                "total_number_of_tracks": "Unlimited",
                "subscription_id": 571,
                "total_number_of_artist": "Unlimited",
                "sku": "EVEA0001",
                "duration": "Forever",
                "name": "EVEARA Test"
            },
            "reactivate_enabled": false,
            "my_subscription_id": 36390,
            "albums_added": 0,
            "tracks_added": 0,
            "cancel_enabled": false
        },
        {
            "deactivate_enabled": true,
            "artists_added": 0,
            "status": "Active",
            "expiration_date": "",
            "subscription_details": {
                "total_number_of_albums": "Unlimited",
                "total_number_of_tracks": "Unlimited",
                "subscription_id": 571,
                "total_number_of_artist": "Unlimited",
                "sku": "EVEA0001",
                "duration": "Forever",
                "name": "EVEARA Test"
            },
            "reactivate_enabled": false,
            "my_subscription_id": 36389,
            "albums_added": 1,
            "tracks_added": 0,
            "cancel_enabled": false
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"eveara/subscriptions/subscriptions.router.js",groupTitle:"API_Eveara"},{type:"get",url:"/api/eveara/albums",title:"Albums - Get album",name:"Get_album",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},query:[{group:"Query",type:"string",optional:!1,field:"uuidEveara",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "message": "Currently showing 1 record(s)",
    "success": true,
    "total_records": 1,
    "data": [
        {
            "cover_image": "",
            "subscription": {
                "expiration_date": "",
                "subscription_id": 36389,
                "subscription_name": "EVEARA Test"
            },
            "ean_upc": "",
            "is_active": 1,
            "product_format": "",
            "original_release_date": "",
            "name": "",
            "release_id": 100000471465,
            "spatial_ean_upc": "",
            "pre_save_link": "",
            "tracks": [],
            "product_type": "Album",
            "album_status": {
                "status_code": 1021,
                "status_name": "Draft"
            },
            "artist": [],
            "spatial_product_code_type": "",
            "disapprove_message": "",
            "product_code_type": "EAN",
            "outlets": [],
            "removable": "true",
            "track_count": 0
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"eveara/albums/albums.router.js",groupTitle:"API_Eveara"},{type:"get",url:"/api/eveara/artists",title:"Artists - Get artist",name:"Get_artist",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},query:[{group:"Query",type:"number",optional:!0,field:"artistId",description:"<p><code>to find only one artist</code></p>"},{group:"Query",type:"string",optional:!1,field:"uuidEveara",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "message": "Currently showing 1 record(s)",
    "success": true,
    "total_records": 1,
    "data": [
        {
            "artist_id": 81880,
            "is_active": 1,
            "outlets": [
                {
                    "outlet_name": "Spotify",
                    "outlet_id": "UAHDNAVX"
                }
            ],
            "removable": true,
            "name": "Barret"
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"eveara/artists/artists.router.js",groupTitle:"API_Eveara"},{type:"get",url:"/api/eveara/utilities/availabilities",title:"Utilities - Get availabilities",name:"Get_availabilities",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "message": "Succesfully fetched availability details",
    "success": true,
    "data": [
        {
            "availability_id": 1,
            "name": "Download"
        },
        {
            "availability_id": 2,
            "name": "Stream"
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"eveara/utilities/utilities.router.js",groupTitle:"API_Eveara"},{type:"get",url:"/api/eveara/utilities/genres",title:"Utilities - Get genres",name:"Get_genres",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "message": "Succesfully fetched genre details",
    "success": true,
    "data": [
        {
            "genre_id": 1,
            "name": "Alternative"
        },
        {
            "genre_id": 2,
            "name": "Alternative Rock"
        },
        {
            "genre_id": 3,
            "name": "Alternativo & Rock Latino"
        },
        ...
    ]
}`,type:"json"}]},version:"0.0.0",filename:"eveara/utilities/utilities.router.js",groupTitle:"API_Eveara"},{type:"get",url:"/api/eveara/labels",title:"Labels - Get label",name:"Get_label",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},query:[{group:"Query",type:"number",optional:!0,field:"labelId",description:"<p><code>to find only one label</code></p>"},{group:"Query",type:"string",optional:!1,field:"uuidEveara",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "message": "Currently showing 1 record(s)",
    "success": true,
    "total_records": 1,
    "data": [
        {
            "label_id": 34247,
            "is_active": 1,
            "label_name": "mylabel",
            "removable": true
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"eveara/labels/labels.router.js",groupTitle:"API_Eveara"},{type:"get",url:"/api/eveara/utilities/languages",title:"Utilities - Get languages",name:"Get_languages",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "data": [
        {
            "language_code": "af",
            "language_name": "Afrikaans"
        },
        {
            "language_code": "sq",
            "language_name": "Albanian"
        },
        ...`,type:"json"}]},version:"0.0.0",filename:"eveara/utilities/utilities.router.js",groupTitle:"API_Eveara"},{type:"get",url:"/api/eveara/outlets",title:"Outlets - Get outlets",name:"Get_outlets",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},query:[{group:"Query",type:"string",optional:!1,field:"uuidEveara",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
   "message": "Successfully fetched Outlet details",
   "success": true,
   "data": [
       {
           "process_duration_dates": 10,
           "dolby_enabled": false,
           "store_name": "Outlet Group 1",
           "is_presales_date_enabled": false,
           "sony360_enabled": false,
           "store_id": 4073,
           "child_stores": [
               "7 Digital",
               "Digster",
               "Electric Jukebox / Roxi",
               "eMusic",
               "Exlibris",
               "Fan Label",
               "Global Eagle",
               "Global Radio",
               "Grandpad",
               "Jazzed",
               "Klassik Radio",
               "Moodagent",
               "Mus.uy",
               "MuzArcade",
               "MyMelo",
               "NEC",
               "Snap",
               "Songclip (Audiobyte LLC",
               "Soundhound",
               "Soundmouse",
               "Soundtrack",
               "Trebel Music MX/M&M Media",
               "Trebel Music US/M&M Media",
               "Triller",
               "Weltbild Radio",
               "Xite"
           ]
       },
       ...
   ]
}`,type:"json"}]},version:"0.0.0",filename:"eveara/outlets/outlets.router.js",groupTitle:"API_Eveara"},{type:"get",url:"/api/eveara/participants",title:"Participants - Get participant",name:"Get_participant",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},query:[{group:"Query",type:"string",optional:!1,field:"uuidEveara",description:""},{group:"Query",type:"number",optional:!0,field:"participantId",description:"<p><code>to find only one participant</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "message": "The search terms have 1 record(s)",
    "success": true,
    "total_records": 1,
    "data": [
        {
            "participant_id": 73289,
            "ipn": "",
            "isni": "",
            "is_active": 1,
            "removable": true,
            "name": "name"
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"eveara/participants/participants.router.js",groupTitle:"API_Eveara"},{type:"get",url:"/api/eveara/participants/paypal/:participantId",title:"Participants - Get participant paypal",name:"Get_participant_paypal",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"string",optional:!1,field:"participantId",description:"<p><code>Participant Id</code></p>"}]}},query:[{group:"Query",type:"string",optional:!1,field:"uuidEveara",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "message": "Successfully fetched paypal details",
    "success": true,
    "data": {
        "paypal_email_id": "test@gmail.com"
    }
}`,type:"json"}]},version:"0.0.0",filename:"eveara/participants/participants.router.js",groupTitle:"API_Eveara"},{type:"get",url:"/api/eveara/payout/:uuidEveara/balance",title:"Payout - Get payout balance",name:"Get_payout_balance",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"string",optional:!1,field:"uuidEveara",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "message": "Successfully fetched the payout balance details",
    "success": true,
    "data": [
        {
            "currency": "USD",
            "participant_id": 69334,
            "amount_to_pay": "0.3200",
            "name": "Raymond"
        },
        {
            "currency": "USD",
            "participant_id": 69196,
            "amount_to_pay": "0.1600",
            "name": "Daniel"
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"eveara/payout/payout.router.js",groupTitle:"API_Eveara"},{type:"get",url:"/api/eveara/payout/:uuidEveara/history",title:"Payout - Get payout history",name:"Get_payout_history",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"string",optional:!1,field:"uuidEveara",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "message": "Successfully fetched the payout history details",
    "success": true,
    "data": [
        {
            "payout_amount": 33.32,
            "currency": "USD",
            "participant_id": 70552,
            "paid_date": "25-05-2022",
            "payout_status": {
                "status_code": 1111,
                "status_name": "SUCCESS"
            },
            "name": "Stuart"
        },
        {
            "payout_amount": 48.02,
            "currency": "USD",
            "participant_id": 69331,
            "paid_date": "24-05-2022",
            "payout_status": {
               "status_code": 1121,
               "status_name": "PROCESSING"
            },
            "name": "Sheldon Cooper"
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"eveara/payout/payout.router.js",groupTitle:"API_Eveara"},{type:"get",url:"/api/eveara/reports/stream/:uuidEveara",title:"Reports - Get summary",name:"Get_summary",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"string",optional:!1,field:"uuidEveara",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "message": "Succesfully fetched total stream details",
    "success": true,
    "data": {
        "total_streams": 6020598
    }
}`,type:"json"}]},version:"0.0.0",filename:"eveara/reports/reports.router.js",groupTitle:"API_Eveara"},{type:"get",url:"/api/eveara/tracks",title:"Tracks - Get track from Eveara",name:"Get_track_from_Eveara",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},query:[{group:"Query",type:"number",optional:!1,field:"evearaTrackId",description:""},{group:"Query",type:"string",optional:!1,field:"uuidEveara",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "message": "Currently showing 1 records",
    "success": true,
    "total_records": 1,
    "data": [
       {
           "language": "en",
           "featured_artists": [],
           "album_only": "false",
           "sony_360ra_isrc": "",
           "artists": [],
           "stereo_isrc": "IELOI2301190",
           "genres": [
               {
                   "genre_id": 1,
                   "name": "Alternative"
               },
               {
                   "genre_id": 2,
                   "name": "Alternative Rock"
               }
            ],
           "extention": "flac",
           "name": "name",
           "track_id": 358435,
           "track_url": "https://s3.amazonaws.com/eveara-bucket/staging/contents/54228/music_catalog_tracks/358435.flac?AWSAccessKeyId=AKIA56KZMVANEUHP7T5B&Expires=1691454184&Signature=6d5RICffVw7ZVa80RCs5X94%2FpRk%3D",
           "iswc": "",
           "availability": [],
           "dolby_atmos_isrc": "",
           "removable": false,
           "explicit": "true"
       }
   ]
}`,type:"json"}]},version:"0.0.0",filename:"eveara/eveara-tracks/eveara-tracks.router.js",groupTitle:"API_Eveara"},{type:"get",url:"/api/eveara/users",title:"Users - Get user from Eveara",name:"Get_user_from_eveara",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},query:[{group:"Query",type:"string",optional:!0,field:"email",description:""},{group:"Query",type:"string",optional:!1,field:"uuidEveara",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "message": "Currently showing 1 record(s)",
    "success": true,
    "total_records": 1,
    "data": [
        {
            "language": {
                "iso": "en",
               "name": "English"
            },
            "sur_name": "lastname",
            "is_mail_subscribed": false,
            "state": {
                "iso": "LND",
                "name": "London, City of"
            },
            "email": "test8@gmail.com",
            "is_active": 1,
            "first_name": "name",
            "country": {
                "iso": "GB",
                "name": "United Kingdom"
            },
            "address": {
                "zip": "",
                "city": "",
                "house": "",
               "street": "",
                "mobile": ""
            },
            "gender": "M",
            "uuid": "856E9A38-FF7F-9C29-8C808270958E9BFB",
            "stripe_customer_id": ""
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"eveara/users/eveara-users.router.js",groupTitle:"API_Eveara"},{type:"post",url:"/api/eveara/payout/:uuidEveara",title:"Payout - Payout",name:"Payout",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"string",optional:!1,field:"uuidEveara",description:""}]}},body:[{group:"Body",type:"array",optional:!0,field:"participantId",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "message": "Payout successfully initiated for the participants",
    "success": true,
    "participants_ids": [
        68038,
        70552
    ]
}`,type:"json"}]},version:"0.0.0",filename:"eveara/payout/payout.router.js",groupTitle:"API_Eveara"},{type:"delete",url:"/api/eveara/tracks/:trackId",title:"Tracks - Remove track from Eveara",name:"Remove_track_from_Eveara",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"trackId",description:""}]}},query:[{group:"Query",type:"string",optional:!1,field:"uuidEveara",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "message": "Track deleted successfully",
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"eveara/eveara-tracks/eveara-tracks.router.js",groupTitle:"API_Eveara"},{type:"get",url:"/api/eveara/reports/sales",title:"Reports - Sales report",name:"Sales_report",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},query:[{group:"Query",type:"string",optional:!1,field:"uuidEveara",description:""},{group:"Query",type:"string",optional:!1,field:"reportType",description:"<p><code>Report type determines the type of stream report. Accepted values are country, store, album and track</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "currency": "USD",
    "message": "1 records found",
    "success": true,
    "data": [
        {
            "album_name": "MyTest",
            "eanupc": "5055829872111",
            "release_id": 100000314902,
            "amount": "0.0016541561",
            "play_count": 3
        }
    ],
    "status_code": 200
}`,type:"json"}]},version:"0.0.0",filename:"eveara/reports/reports.router.js",groupTitle:"API_Eveara"},{type:"put",url:"/api/eveara/simulate/distribute",title:"Simulates - Simulate distribute",name:"Simulate_Distribute",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},body:[{group:"Body",type:"string",optional:!1,field:"uuidEveara",description:""},{group:"Body",type:"number",optional:!1,field:"releaseId",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "message": "Album distributed successfully to all initiated outlets",
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"eveara/simulate/simulate.router.js",groupTitle:"API_Eveara"},{type:"put",url:"/api/eveara/simulate/takedown",title:"Simulates - Simulate takedown",name:"Simulate_Takedown",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},body:[{group:"Body",type:"string",optional:!1,field:"uuidEveara",description:""},{group:"Body",type:"number",optional:!1,field:"releaseId",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "message": "Album takedown successfully to all initiated outlets",
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"eveara/simulate/simulate.router.js",groupTitle:"API_Eveara"},{type:"get",url:"/api/eveara/reports/stream",title:"Reports - Stream report",name:"Stream_report",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},query:[{group:"Query",type:"string",optional:!1,field:"uuidEveara",description:""},{group:"Query",type:"string",optional:!1,field:"reportType",description:"<p><code>Report type determines the type of stream report. Accepted values are country, store, album and track</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "message": "2 records found",
    "success": true,
    "data": [
        {
            "play_count": 1,
           "country_name": "Angola",
            "country_code": "AO"
        },
        {
            "play_count": 3,
            "country_name": "Antigua and Barbuda",
            "country_code": "AG"
        }
    ],
    "status_code": 200
}`,type:"json"}]},version:"0.0.0",filename:"eveara/reports/reports.router.js",groupTitle:"API_Eveara"},{type:"put",url:"/api/eveara/albums/:releaseId",title:"Albums - Update album",name:"Update_album",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},body:[{group:"Body",type:"string",optional:!1,field:"uuidEveara",description:""},{group:"Body",type:"number",optional:!1,field:"subscription_id",description:"<p><code>Subscription Id of Album</code></p>"},{group:"Body",type:"string",optional:!0,field:"name",description:""},{group:"Body",type:"array",optional:!0,field:"artists",description:"<p><code>Artist(s) Id of the Album, for example: [12345, 12346]</code></p>"},{group:"Body",type:"number",optional:!0,field:"ean_upc",description:"<p><code>EAN or UPC number of the Album</code></p>"},{group:"Body",type:"number",optional:!0,field:"label_id",description:"<p><code>Label of the Album</code></p>"},{group:"Body",type:"date",optional:!0,field:"original_release_date",description:"<p><code>Original Release Date of the Album (dd-mm-yyyy)</code></p>"},{group:"Body",type:"string",optional:!0,field:"product_type",description:"<p><code>Acceptable product types are album,single,compilation_album,ep</code></p>"},{group:"Body",type:"string",optional:!0,field:"product_code_type",description:"<p><code>Acceptable product type codes are ean, upc and jan</code></p>"},{group:"Body",type:"boolean",optional:!0,field:"code_auto_generate",description:"<p><code>code auto generate for enable/disable</code></p>",checked:!1},{group:"Body",type:"number",optional:!0,field:"spatial_ean_upc",description:"<p><code>EAN or UPC number of the spatial audio</code></p>"},{group:"Body",type:"string",optional:!0,field:"spatial_product_code_type",description:"<p><code>Acceptable product type codes are ean, upc and jan</code></p>"},{group:"Body",type:"boolean",optional:!0,field:"spatial_code_auto_generate",description:"<p><code>spatial product code auto generate for enable/disable</code></p>",checked:!1},{group:"Body",type:"string",optional:!0,field:"product_format",description:"<p><code>Acceptable product formats are Stereo, Stereo and Dolby Atmos and Stereo and 360RA</code></p>"},{group:"Body",type:"object",optional:!0,field:"cover_image",description:""},{group:"Body",type:"string",optional:!0,field:"cover_image.url",description:"<p><code>URL of the file. File size should be between 100KB and 10 MB. The image must be of 1:1 ratio (square), and size can range from 1400px to 4000px</code></p>"},{group:"Body",type:"string",optional:!0,field:"cover_image.extension",description:"<p><code>File extension, Acceptable extensions are JPG, JPEG, PNG, BMP, TIF, TIFF or GIF</code></p>"},{group:"Body",type:"array",optional:!0,field:"tracks",description:""},{group:"Body",type:"number",optional:!0,field:"tracks.track_id",description:""},{group:"Body",type:"array",optional:!0,field:"tracks.artists",description:"<p><code>Artist(s) Id of the Track, for example: [22621]</code></p>"},{group:"Body",type:"array",optional:!0,field:"tracks.featured_artists",description:""},{group:"Body",type:"object",optional:!0,field:"tracks.preview",description:""},{group:"Body",type:"number",optional:!0,field:"preview.start_at",description:""},{group:"Body",type:"number",optional:!0,field:"preview.duration",description:""},{group:"Body",type:"array",optional:!0,field:"tracks.participant",description:""},{group:"Body",type:"number",optional:!0,field:"participant.id",description:""},{group:"Body",type:"number",optional:!0,field:"participant.role_id",description:""},{group:"Body",type:"number",optional:!0,field:"participant.payout_share_percentage",description:"<p><code>Participant payout share percentage , total share percentage per track should be equal to 100</code></p>"}],parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"releaseId",description:"<p><code>Release Id generated on time of album creation</code></p>"}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "message": "Album updated successfully",
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"eveara/albums/albums.router.js",groupTitle:"API_Eveara"},{type:"post",url:"/api/eveara/artists/:artistId",title:"Artists - Update artist (not working yet)",name:"Update_artist_(not_working_yet)",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"artistId",description:""}]}},body:[{group:"Body",type:"string",optional:!1,field:"uuid",description:""},{group:"Body",type:"string",optional:!1,field:"artistName",description:""},{group:"Body",type:"string",optional:!1,field:"country",description:""},{group:"Body",type:"object",optional:!0,field:"outlets_profile",description:""},{group:"Body",type:"string",optional:!0,field:"outlets_profile.spotify_profile",description:"<p><code>Expecting a valid Spotify artist profile URI (Eg: spotify:artist:#############)</code></p>"},{group:"Body",type:"string",optional:!0,field:"outlets_profile.soundcloudgo_profile",description:"<p><code>Expecting a valid SoundCloud artist profile permalink (Eg: for &quot;https://soundcloud.com/#############&quot; just include &quot;#############&quot;)</code></p>"},{group:"Body",type:"string",optional:!0,field:"outlets_profile.applemusic_profile",description:"<p><code>Expecting a valid Apple artist profile id (Eg: for &quot;https://music.apple.com/us/artist/abcdefgh/#############&quot; just include &quot;#############&quot;)</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "message": "Artist saved successfully",
    "success": true,
    "artist_id": "85194",
    "artist_name": "name"
}`,type:"json"}]},version:"0.0.0",filename:"eveara/artists/artists.router.js",groupTitle:"API_Eveara"},{type:"put",url:"/api/eveara/tracks/:trackId",title:"Tracks - Update track on Eveara",name:"Update_track_on_Eveara",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"trackId",description:""}]}},body:[{group:"Body",type:"string",optional:!1,field:"uuid",description:""},{group:"Body",type:"string",optional:!1,field:"name",description:""},{group:"Body",type:"string",optional:!0,field:"stereo_isrc",description:"<p><code>Expecting a unique ISRC code in standared format (CCXXXYYNNNNN)</code></p>"},{group:"Body",type:"string",optional:!0,field:"iswc",description:"<p><code>ISWC of the track</code></p>"},{group:"Body",type:"array",optional:!0,field:"genre",description:"<p><code>Supported genres can be obtained using the &quot;Get Genres&quot; endpoint (genre_id)</code></p>"},{group:"Body",type:"string",optional:!0,field:"language",description:"<p><code>The supported language can be obtained using the &quot;Get Language List&quot; endpoint &amp;&amp; Expected value is the language ISO code (language_code)</code></p>"},{group:"Body",type:"number",optional:!0,field:"explicit",description:"<p><code>Explicit : 0-Clean, 1-Explicit, 2-Not Required</code></p>"},{group:"Body",type:"array",optional:!0,field:"availability",description:"<p><code>Supported availability options can be obtained using the &quot;Get Availability&quot; endpoint (availability_id)</code></p>"},{group:"Body",type:"array",optional:!0,field:"artists",description:"<p><code>Artist For: Single Track</code></p>"},{group:"Body",type:"array",optional:!0,field:"featured_artists",description:"<p><code>Feature artist must be upto 5</code></p>"},{group:"Body",type:"boolean",optional:!0,field:"album_only",description:"<p><code>Available For: Single Track- False, With Album Only -True</code></p>",checked:!1},{group:"Body",type:"string",optional:!0,field:"lyrics",description:"<p><code>Lyrics for the tracks</code></p>"},{group:"Body",type:"string",optional:!0,field:"dolby_atmos_isrc",description:"<p><code>Expecting a unique ISRC code in standared format (CCXXXYYNNNNN)</code></p>"},{group:"Body",type:"string",optional:!0,field:"sony_360ra_isrc",description:"<p><code>Expecting a unique ISRC code in standared format (CCXXXYYNNNNN)</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "message": "Track updated successfully",
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"eveara/eveara-tracks/eveara-tracks.router.js",groupTitle:"API_Eveara"},{type:"put",url:"/api/eveara/users",title:"Users - Update user on Eveara",name:"Update_user_on_Eveara",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},body:[{group:"Body",type:"string",optional:!1,field:"uuidEveara",description:""},{group:"Body",type:"string",optional:!1,field:"email",description:""},{group:"Body",type:"string",optional:!1,field:"firstName",description:""},{group:"Body",type:"string",optional:!1,field:"lastName",description:""},{group:"Body",type:"number",optional:!0,field:"isMailSubscribed",description:"<p><code>1 (subscribed) or  0(not subscribed)</code></p>"},{group:"Body",type:"object",optional:!0,field:"address",description:""},{group:"Body",type:"string",optional:!0,field:"address.house",description:"<p><code>House number of the user</code></p>"},{group:"Body",type:"string",optional:!0,field:"address.street",description:"<p><code>Street of the user</code></p>"},{group:"Body",type:"string",optional:!0,field:"address.city",description:"<p><code>City of the user</code></p>"},{group:"Body",type:"string",optional:!0,field:"address.zip",description:"<p><code>Zip code of the user, expecting a number between 5 - 8 digits long</code></p>"},{group:"Body",type:"string",optional:!0,field:"address.mobile",description:"<p><code>Mobile number of the user</code></p>"},{group:"Body",type:"string",optional:!0,field:"country",description:"<p><code>Country in ISO code</code></p>"},{group:"Body",type:"string",optional:!0,field:"state",description:"<p><code>State in ISO code</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "message": "User updated successfully",
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"eveara/users/eveara-users.router.js",groupTitle:"API_Eveara"},{type:"get",url:"/api/eveara/albums/:releaseId/validate",title:"Albums - Validate album",name:"Validate_album",group:"API_Eveara",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"releaseId",description:""}]}},query:[{group:"Query",type:"string",optional:!1,field:"uuidEveara",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "message": "You can't distribute this album now. Please enter all required details for this album",
    "success": true,
    "data": {
        "album_status": {
            "status_code": 1021,
            "status_name": "Draft"
        },
        "error_fields": [
            {
                "fields": "Artists",
                "message": "Album artist is empty"
            },
            {
                "fields": "label_id",
                "message": "Label Id is empty"
            }
        ]
    }
}`,type:"json"}]},version:"0.0.0",filename:"eveara/albums/albums.router.js",groupTitle:"API_Eveara"},{type:"get",url:"/api/release/filter/uniqueFields",title:"Get unique fields for relases",name:"Get_Get_unique_fields_for_relases",group:"API_Filter",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
        "uniqueFields": {
                "releaseTypes": [
                    "tyypeeee",
                    "type",
                    "typeName306416"
                ],
                "performers": [
                    "king",
                    "@mail.com885834686",
                    "babName359309951"
                ],
                "genres": [
                    "Alternative",
                    "Anime",
                    "Blues"
                ],
                "subGenres": [
                    "Art Punk",
                    "Alternative Rock",
                    "Britpunk"
                ]
        }
    }`,type:"json"}]},version:"0.0.0",filename:"release/release.router.js",groupTitle:"API_Filter"},{type:"get",url:"/api/incomes/filter/uniqueFields",title:"Get unique fields for transactions",name:"Get_Get_unique_fields_for_transactions",group:"API_Filter",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
        "uniqueFields": {
                "paymentEmail": [
                    "qwerty89@gmail.com",
                    "sb-kq9mi26003566@personal.example.com",
                    "raceg14sf552@jwsuns.com"
                ],
                "releaseTypes": [
                    "tyypeeee",
                    "type",
                    "typeName306416"
                ],
                "performer": [
                    "king",
                    "@mail.com885834686",
                    "babName359309951"
                ],
                "genres": [
                    "Alternative",
                    "Anime",
                    "Blues"
                ],
                "subGenres": [
                    "Art Punk",
                    "Alternative Rock",
                    "Britpunk"
                ]
        }
    }`,type:"json"}]},version:"0.0.0",filename:"incomes/incomes.router.js",groupTitle:"API_Filter"},{type:"get",url:"/api/users/filter/uniqueFields",title:"Get unique fields for users",name:"Get_unique_fields_for_users",group:"API_Filter",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
        "uniqueFields": {
                "performers": [
                    "king",
                    "@mail.com885834686",
                    "babName359309951"
                ],
                "roles": [
                    "xxx",
                    "role",
                    "sdfdsf"
                ],
        }
    }`,type:"json"}]},version:"0.0.0",filename:"users/users.router.js",groupTitle:"API_Filter"},{type:"delete",url:"/api/genres/:bapId",title:"Remove genre bap",name:"Delete_Remove_genre_bap",group:"API_Genre",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"bapId",description:""}]}},query:[{group:"Query",type:"number",optional:!1,field:"subGenreId",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"genres/genres.router.js",groupTitle:"API_Genre"},{type:"Get",url:"/api/genres/:bapId",title:"Get genres of bap",name:"Get_Get_genres_of_bap",group:"API_Genre",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"bapId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "genresBap": {
     mainGenere: { id: 1, name: 'Alternative' },
     secondGeneres: { id: 2, name: 'Anime' },
     sub_genres: [
         {
             id: 1,
             name: 'Art Punk',
             mainGenreId: 1,
             genres_baps: {
                 id: 84,
                 createdAt: '2023-07-04T11:07:54.000Z',
                 updatedAt: '2023-07-04T11:07:54.000Z',
                 subGenreId: 1,
                 bapId: 6
             }
         },
         {
             id: 2,
             name: 'Alternative Rock',
             mainGenreId: 1,
             genres_baps: {
                 id: 85,
                 createdAt: '2023-07-04T11:07:54.000Z',
                 updatedAt: '2023-07-04T11:07:54.000Z',
                 subGenreId: 2,
                 bapId: 6
             }
         }
       ]
     }
 }`,type:"json"}]},version:"0.0.0",filename:"genres/genres.router.js",groupTitle:"API_Genre"},{type:"get",url:"/api/genres/main",title:"Get main genres",name:"Get_Get_main_genres",group:"API_Genre",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "mainGenres": [
        {
            "id": 1,
            "name": "Alternative"
        },
        {
            "id": 2,
            "name": "Anime"
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"genres/genres.router.js",groupTitle:"API_Genre"},{type:"get",url:"/api/genres/sub",title:"Get sub genres",name:"Get_Get_sub_genres",group:"API_Genre",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},query:[{group:"Query",type:"number",optional:!1,field:"firstGenreId",description:""},{group:"Query",type:"number",optional:!0,field:"secondGenreId",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "subGenres": [
        {
            "id": 1,
            "name": "Art Punk",
            "mainGenreId": 1
        },
        {
            "id": 2,
            "name": "Alternative Rock",
            "mainGenreId": 1
        },
    ]
}`,type:"json"}]},version:"0.0.0",filename:"genres/genres.router.js",groupTitle:"API_Genre"},{type:"Post",url:"/api/genres/:bapId",title:"Save genres on bap",name:"Post_Save_genres_on_bap",group:"API_Genre",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"bapId",description:""}]}},body:[{group:"Body",type:"number[]",optional:!0,field:"subGenereIds",description:""},{group:"Body",type:"number",optional:!0,field:"mainGenereId",description:""},{group:"Body",type:"number",optional:!0,field:"sub_generes_ids",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
}`,type:"json"}]},version:"0.0.0",filename:"genres/genres.router.js",groupTitle:"API_Genre"},{type:"get",url:"/:name",title:"Get Image",name:"Get_Image",group:"API_Image",parameter:{fields:{Parameter:[{group:"Parameter",type:"string",optional:!1,field:"name",description:"<p><code>name with type of image -&gt; .jpg</code></p>"}]}},version:"0.0.0",filename:"routes.js",groupTitle:"API_Image"},{type:"get",url:"/api/incomes/admin/transactions",title:"Admin Get all transactions",name:"Get_Admin_Get_all_transactions",group:"API_Incomes",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},query:[{group:"Query",type:"String",optional:!1,field:"orderBy",description:"<p><code>Example: &quot;id&quot;, &quot;paymentEmail&quot;, &quot;createdAt&quot;, &quot;price&quot;</code></p>"},{group:"Query",type:"string",optional:!1,field:"sortOrder",description:"<p><code>Example: &quot;ASC&quot;, &quot;DESC&quot;</code></p>"},{group:"Query",type:"String",optional:!1,field:"date",description:"<p><code>Number of days, for example date=30</code></p>"},{group:"Query",type:"String",optional:!1,field:"buyer",description:""},{group:"Query",type:"string",optional:!1,field:"releaseType",description:""},{group:"Query",type:"string",optional:!1,field:"performer",description:""},{group:"Query",type:"string",optional:!1,field:"mainGenre",description:""},{group:"Query",type:"string",optional:!1,field:"subGenres",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "income": {
        "incomes": [
            {
                "id": 2,
                "createdAt": "2023-06-12T11:50:51.000Z",
                "bapName": "random band name",
                "gross": "5.000",
                "fees": "0.5000",
                "net": "4.5000",
                "tracks": []
            },
            {
                "id": 1,
                "createdAt": "2023-06-12T10:56:03.000Z",
                "bapName": "random band name",
                "gross": "5.000",
                "fees": "0.5000",
                "net": "4.5000",
                "tracks": []
            }
        ],
        "incomeGross": 10,
        "incomeFees": 1,
        "incomeNet": 9
    }
}`,type:"json"}]},version:"0.0.0",filename:"incomes/incomes.router.js",groupTitle:"API_Incomes"},{type:"get",url:"/api/incomes/admin/transactions/:transactionId",title:"Admin Get transaction by id",name:"Get_Admin_Get_transaction_by_id",group:"API_Incomes",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"Number",optional:!1,field:"transactionId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "income": {
        "incomes": [
            {
                "id": 2,
                "createdAt": "2023-06-12T11:50:51.000Z",
                "bapName": "random band name",
                "gross": "5.000",
                "fees": "0.5000",
                "net": "4.5000",
                "tracks": []
            },
            {
                "id": 1,
                "createdAt": "2023-06-12T10:56:03.000Z",
                "bapName": "random band name",
                "gross": "5.000",
                "fees": "0.5000",
                "net": "4.5000",
                "tracks": []
            }
        ],
        "incomeGross": 10,
        "incomeFees": 1,
        "incomeNet": 9
    }
}`,type:"json"}]},version:"0.0.0",filename:"incomes/incomes.router.js",groupTitle:"API_Incomes"},{type:"get",url:"/api/incomes",title:"Get incomes",name:"Get_Get_incomes",group:"API_Incomes",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},query:[{group:"Query",type:"number",optional:!0,field:"bapId",description:""},{group:"Query",type:"number",optional:!0,field:"releaseId",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "incomes": [
        {
            "id": 1534,
            "createdAt": "2023-09-22T16:46:56.000Z",
            "bapName": "bap",
            "gross": "0.000",
            "fees": "0.0000",
            "net": "0.0000",
            "tips": 0,
            "tracks": [
                {
                    "name": "syluet",
                    "uniqueName": "e390d59e-7908-435a-8fca-a411282168af.mp3",
                    "id": 2724,
                    "releaseName": "release"
                },
                {
                    "name": "love",
                    "uniqueName": "7f936017-366b-4569-9fab-37dcde251abd.mp3",
                    "id": 2760,
                    "releaseName": "releaseee"
                }
            ]
        },
    ],
    "incomeGross": 0
}`,type:"json"}]},version:"0.0.0",filename:"incomes/incomes.router.js",groupTitle:"API_Incomes"},{type:"get",url:"/api/incomes/:incomeId",title:"Get incomes by id",name:"Get_Get_incomes_by_id",group:"API_Incomes",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"incomeId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "income": {
        "id": 1350,
        "invoiceId": 0,
        "paymentEmail": "sb-kq9mi26003566-2@personal.example.com",
        "bapName": null,
        "date": "2023-07-25T08:28:00.000Z",
        "gross": "310.000",
        "fees": "31.0000",
        "net": "279.0000",
        "tips": 0,
        "tracks": [
            {
                "id": 1291,
                "trackName": "ONEIL_ORGAN_FAVIA",
                "releaseName": null,
                "price": "4.000",
                "splitUsers": [
                    {
                        "id": 1246,
                        "email": "Admin",
                        "ownership": "100",
                        "reviewed": null,
                        "signature": null,
                        "createdAt": null,
                        "updatedAt": null,
                        "splitId": null,
                        "firstName": "Admin",
                        "lastName": "Admin"
                    }
                ]
            },
            {
                "id": 1333,
                "trackName": "songWithoutSplit",
                "releaseName": null,
                "price": "101.000",
                "splitUsers": [
                    {
                        "id": 1257,
                        "email": "qwerty89@gmail.com",
                        "ownership": "100",
                        "reviewed": true,
                        "signature": "signature/367/944",
                        "createdAt": "2023-07-26T14:19:52.000Z",
                        "updatedAt": "2023-07-26T14:19:52.000Z",
                        "splitId": 835,
                        "firstName": "Vlad",
                        "lastName": "Sch"
                    }
                ]
            }
        ],
        "customerPayment": 279
    }
}`,type:"json"}]},version:"0.0.0",filename:"incomes/incomes.router.js",groupTitle:"API_Incomes"},{type:"delete",url:"/api/landing/design",title:"Remove design of landing page by id",name:"Delete_Remove_design_of_landing_page_by_id",group:"API_Landing",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},query:[{group:"Query",type:"number",optional:!1,field:"landingPageId",description:""},{group:"Query",type:"number",optional:!1,field:"designId",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"landing/landing.router.js",groupTitle:"API_Landing"},{type:"delete",url:"/api/landing/page/:landingPageId",title:"Remove landing page by id",name:"Delete_Remove_landing_page_by_id",group:"API_Landing",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"landingPageId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"landing/landing.router.js",groupTitle:"API_Landing"},{type:"get",url:"/api/landing/page/",title:"Get landing page",name:"Get_Get_landing_page",group:"API_Landing",query:[{group:"Query",type:"number",optional:!0,field:"id",description:"<p><code>you must enter only one param. id || name</code></p>"},{group:"Query",type:"string",optional:!0,field:"name",description:"<p><code>you must enter only one param. id || name</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "landingPage": {
        "id": 1,
        "name": "gggg\u043E\u043E\u043E",
        "favicon": "0892bbc0-697f-408c-8fde-b7666b76ccef.jpg",
        "logo": null,
        "metaTitle": "asd",
        "metaDescription": "description333",
        "facebookPixel": "pixel1111",
        "backgroundBlur": 29,
        "releaseId": 470,
        "webpagesTypeId": 1,
        "trackIdForStreaming": null,
        "bapName": "Image",
        "releaseName": "jyrfmrymrymry",
        "releaseLogo": "https://export-download.canva.com/lvAf8/DAFkAOlvAf8/2/0/0001-5508870526.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHKNGJLC2J7OGJ6Q%2F20230526%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230526T010218Z&X-Amz-Expires=34687&X-Amz-Signature=ce31d721e114fda2158980d1514b1719e368142f18f398f0da68540086f5ddef&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%2A%3DUTF-8%27%27%25D0%2594%25D0%25B8%25D0%25B7%25D0%25B0%25D0%25B9%25D0%25BD%2520%25D0%25B1%25D0%25B5%25D0%25B7%2520%25D0%25BD%25D0%25B0%25D0%25B7%25D0%25B2%25D0%25B0%25D0%25BD%25D0%25B8%25D1%258F.png&response-expires=Fri%2C%2026%20May%202023%2010%3A40%3A25%20GMT",
        "sumPriceTracks": 12,
        "showSocialLinks": false,
        "socialLinksType": "white",
        "tracks": [
            {
                "id": 930,
                "name": "qwertyuiop",
                "uniqueName": "7053418a-c25e-4f83-a203-52944e075702.mp3",
                "price": "7.000",
                "info": {
                    "status": "success",
                    "result": {
                        "artist": "Eminem",
                        "title": "Lose Yourself",
                        "album": "8 Mile",
                        "release_date": "2002-01-01",
                        "label": "Universal Music",
                        "timecode": "05:18",
                        "song_link": "https://lis.tn/LoseYourself"
                    },
                    "preview": "https://p.scdn.co/mp3-preview/03b89cd457ff6f50e839a01873511b48e54c9c12?cid=e44e7b8278114c7db211c00ea273ac69"
                }
            }
        ],
        "design": [
            {
                "id": 1,
                "hex": "#abcabc",
                "font": "sdfdsf",
                "size": 12,
                "italic": 123,
                "weight": 123,
                "createdAt": "2023-05-31T11:57:52.000Z",
                "updatedAt": "2023-05-31T11:57:52.000Z",
                "landingDesignTypeId": null,
                "landingPageId": 1
            },
        ],
        "socialLinks": [
            {
                "id": 64,
                "link": "first",
                "position": 1,
                "createdAt": "2023-08-24T15:27:54.000Z",
                "updatedAt": "2023-08-24T15:27:54.000Z",
                "landingPageId": 153
            }
        ],
        "streamingLinks": [
            {
                "id": 33,
                "link": "first",
                "position": 1,
                "createdAt": "2023-08-24T15:27:54.000Z",
                "updatedAt": "2023-08-24T15:27:54.000Z",
                "landingPageId": 153
            }
        ]
    }
}`,type:"json"}]},version:"0.0.0",filename:"landing/landing.router.js",groupTitle:"API_Landing"},{type:"get",url:"/api/landing/pages/",title:"Get landing pages",name:"Get_Get_landing_pages",group:"API_Landing",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},query:[{group:"Query",type:"number",optional:!0,field:"bapId",description:"<p><code>you must enter only one param. bapId || releaseId</code></p>"},{group:"Query",type:"number",optional:!0,field:"releaseId",description:"<p><code>you must enter only one param. bapId || releaseId</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "landingPage": [
        {
            "id": 3,
            "name": "123123",
            "favicon": null,
            "createdAt": "2023-05-09T08:44:04.000Z",
            "updatedAt": "2023-05-09T08:44:04.000Z",
            "releaseId": 400,
            "releaseLogo": "eea71804-44e6-425f-8660-c8da4680a4b4.jpg",
            "releaseThumbnail": "thumb_eea71804-44e6-425f-8660-c8da4680a4b4.jpg",
            "webpagesTypeId": 3,
            "trackIdForStreaming": "2222",
            "type": "Standard-album",
            "logo": null,
            "releaseSpotifyId": null,
            "bapId": 1243,
            "shopId": null,
            "description": "Landing page where you can place links to the release on streaming services\\n\\n\\n",
            "webpagesTypeName": "Streaming links"
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"landing/landing.router.js",groupTitle:"API_Landing"},{type:"post",url:"/api/landing/design/",title:"Add design to landing",name:"POST_Add_design_to_landing",group:"API_Landing",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},query:[{group:"Query",type:"number",optional:!1,field:"landingPageId",description:""}],body:[{group:"Body",type:"string",optional:!1,field:"font",description:""},{group:"Body",type:"string",optional:!1,field:"hex",description:""},{group:"Body",type:"number",optional:!1,field:"size",description:""},{group:"Body",type:"number",optional:!1,field:"italic",description:""},{group:"Body",type:"number",optional:!1,field:"weight",description:""},{group:"Body",type:"number",optional:!1,field:"landingDesignTypeId",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "design": {
        "id": 1,
        "landingPageId": "1",
        "hex": "#abcabc",
        "font": "sdfdsf",
        "size": 12,
        "italic": 123,
        "weight": 123,
        "updatedAt": "2023-05-31T11:57:52.436Z",
        "createdAt": "2023-05-31T11:57:52.436Z"
    }
}`,type:"json"}]},version:"0.0.0",filename:"landing/landing.router.js",groupTitle:"API_Landing"},{type:"post",url:"/api/landing/page/:landingPageId",title:"Add social links to landing page",name:"Post_Add_social_links_to_landing_page",group:"API_Landing",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"landingPageId",description:""}]},examples:[{title:"Request-Example:",content:`{
    "data": [
        {
            "link": "first",
            "position": 1
        },
        {
            "link": "second",
            "position": 12
        },
        {
            "link": "asdasd",
            "position": 13
        }
    ]
}`,type:"json"}]},body:[{group:"Body",type:"array",optional:!1,field:"data",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "socialLinks": [
        {
            "link": "first",
            "position": 1
        },
        {
            "link": "second",
            "position": 12
        },
        {
            "link": "asdasd",
            "position": 13
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"landing/landing.router.js",groupTitle:"API_Landing"},{type:"post",url:"/api/landing/page/streaming/:landingPageId",title:"Add streaming links to landing page",name:"Post_Add_streaming_links_to_landing_page",group:"API_Landing",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"landingPageId",description:""}]},examples:[{title:"Request-Example:",content:`{
    "data": [
        {
            "link": "first",
            "position": 1
        },
        {
            "link": "second",
            "position": 12
        },
        {
            "link": "asdasd",
            "position": 13
        }
    ]
}`,type:"json"}]},body:[{group:"Body",type:"array",optional:!1,field:"data",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "socialLinks": [
        {
            "link": "first",
            "position": 1
        },
        {
            "link": "second",
            "position": 12
        },
        {
            "link": "asdasd",
            "position": 13
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"landing/landing.router.js",groupTitle:"API_Landing"},{type:"post",url:"/api/landing/page/:releaseId",title:"Create landing page",name:"Post_Create_landing_page",group:"API_Landing",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"releaseId",description:""}]}},body:[{group:"Body",type:"string",optional:!1,field:"name",description:""},{group:"Body",type:"string",optional:!1,field:"facebookPixel",description:""},{group:"Body",type:"string",optional:!1,field:"metaTitle",description:""},{group:"Body",type:"string",optional:!1,field:"metaDescription",description:""},{group:"Body",type:"number",optional:!1,field:"webpagesTypeId",description:""},{group:"Body",type:"number",optional:!1,field:"backgroundBlur",description:"<p><code>0 &lt;= x &lt;= 100</code></p>"},{group:"Body",type:"string",optional:!1,field:"urlFavicon",description:""},{group:"Body",type:"string",optional:!1,field:"urlLogo",description:""},{group:"Body",type:"string",optional:!0,field:"trackIdForStreaming",description:"<p><code>only for webpagesTypeId 3</code></p>"},{group:"Body",type:"files",optional:!1,field:"favicon",description:""},{group:"Body",type:"files",optional:!1,field:"logo",description:""},{group:"Body",type:"boolean",optional:!0,field:"showSocialLinks",description:"",checked:!1},{group:"Body",type:"string",optional:!0,field:"socialLinksType",description:"<p><code>must be a 'white', 'black' or 'colour'</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "landingPage": {
        "id": 13,
        "name": "123123",
        "releaseId": "400",
        "webpagesTypeId": 3,
        "trackIdForStreaming": "2222",
        "updatedAt": "2023-05-10T14:10:34.402Z",
        "createdAt": "2023-05-10T14:10:34.402Z",
        "backgroundBlur": 100,
        "showSocialLinks": false,
        "socialLinksType": "white",
        "releaseFullInfo": {
            "id": 400,
            "name": "Brand Kit",
            "type": "Standard-album",
            "logo": null,
            "createdAt": "2023-05-09T10:02:24.000Z",
            "updatedAt": "2023-05-09T10:02:24.000Z",
            "bapId": 1243,
            "description": null,
            "artist_bio": null,
            "avatar": null,
            "role": "Artist/Band member",
            "designId": null,
            "facebookPixel": 0,
            "creatorId": 410,
            "paletteName": "New palette",
            "tracks": [
                {
                    "id": 784,
                    "uniqueName": "2ef3e687-468b-4987-b1bb-c58f35bd179d.mp3"
                },
                {
                    "id": 785,
                    "uniqueName": "c45ab78c-bc9b-44ad-a2ea-92633e1cb6eb.mp3"
                }
            ]
        }
    }
}`,type:"json"}]},version:"0.0.0",filename:"landing/landing.router.js",groupTitle:"API_Landing"},{type:"put",url:"/api/landing/page/:landingPageId",title:"Edit landing page",name:"Put_Edit_landing_page",group:"API_Landing",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"landingPageId",description:""}]}},body:[{group:"Body",type:"string",optional:!1,field:"name",description:""},{group:"Body",type:"string",optional:!1,field:"facebookPixel",description:"<p><code>if the string is empty, then the field is set to null</code></p>"},{group:"Body",type:"string",optional:!1,field:"metaTitle",description:"<p><code>if the string is empty, then the field is set to null</code></p>"},{group:"Body",type:"string",optional:!1,field:"metaDescription",description:"<p><code>if the string is empty, then the field is set to null</code></p>"},{group:"Body",type:"string",optional:!0,field:"trackIdForStreaming",description:"<p><code>only for webpagesTypeId 3, &quot;&quot; - for set null</code></p>"},{group:"Body",type:"number",optional:!1,field:"backgroundBlur",description:"<p><code>0 &lt;= x &lt;= 100</code></p>"},{group:"Body",type:"string",optional:!1,field:"urlFavicon",description:""},{group:"Body",type:"string",optional:!1,field:"urlLogo",description:""},{group:"Body",type:"files",optional:!1,field:"favicon",description:""},{group:"Body",type:"files",optional:!1,field:"logo",description:""},{group:"Body",type:"boolean",optional:!0,field:"showSocialLinks",description:"",checked:!1},{group:"Body",type:"string",optional:!0,field:"socialLinksType",description:"<p><code>must be a 'white', 'black' or 'colour'</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "landingPage": {
        "id": 13,
        "name": "123123",
        "favicon": null,
        "releaseId": 400,
        "webpagesTypeId": 3,
        "trackIdForStreaming": "2222",
        "sumPriceTracks": 173,
        "backgroundBlur": 100,
        "showSocialLinks": false,
        "socialLinksType": "white",
        "tracks": [
            {
                "id": 784,
                "uniqueName": "2ef3e687-468b-4987-b1bb-c58f35bd179d.mp3",
                "price": 123
            },
            {
                "id": 785,
                "uniqueName": "c45ab78c-bc9b-44ad-a2ea-92633e1cb6eb.mp3",
                "price": 50
            }
        ]
    }
}`,type:"json"}]},version:"0.0.0",filename:"landing/landing.router.js",groupTitle:"API_Landing"},{type:"delete",url:"/api/mailing/",title:"Delete users from mailing list",name:"Delete_users_from_mailing_list",group:"API_Mailing",body:[{group:"Body",type:"number",optional:!1,field:"bapId",description:""},{group:"Body",type:"array",optional:!1,field:"userIds",description:"<p><code>[1, 2, 3, 4, 5]</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
        "message": "these users deleted"
}`,type:"json"}]},version:"0.0.0",filename:"mailing/mailing.router.js",groupTitle:"API_Mailing"},{type:"get",url:"/api/mailing/:bapId",title:"Get mailing list",name:"Get_mailing_list",group:"API_Mailing",parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"bapId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
[
     {
        "id": 1,
        "userId": 1222,
        "bapId": 123,
        "firstName": "Molly",
        "lastName": "Smit",
        "email": "869568663@mail.com",
        "createdAt": "2023-04-07T12:55:36.000Z",
        "updatedAt": "2023-04-07T12:55:36.000Z"
     },
     {
        "id": 2,
        "userId": 1223,
        "bapId": 124,
        "firstName": "Molly2",
        "lastName": "Smit2",
        "email": "869568000@mail.com",
        "createdAt": "2023-04-07T12:57:36.000Z",
        "updatedAt": "2023-04-07T12:57:36.000Z"
     }
]`,type:"json"}]},version:"0.0.0",filename:"mailing/mailing.router.js",groupTitle:"API_Mailing"},{type:"get",url:"/api/mailing/subscribes/:userId",title:"Get user subscribes",name:"Post_Get_user_subscribes",group:"API_Mailing",parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"userId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "bapIds": [
        111,
        112,
        113
     ]
}`,type:"json"}]},version:"0.0.0",filename:"mailing/mailing.router.js",groupTitle:"API_Mailing"},{type:"post",url:"/api/mailing/subscribe",title:"User subscribe",name:"Post_User_subscribe",group:"API_Mailing",body:[{group:"Body",type:"number",optional:!1,field:"userId",description:""},{group:"Body",type:"number",optional:!1,field:"bapId",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
        "id": 1,
        "userId": 1222,
        "bapId": 123,
        "firstName": "Molly",
        "lastName": "Smit",
        "email": "test@mail.com",
        "createdAt": "2023-04-07T12:55:36.000Z",
        "updatedAt": "2023-04-07T12:55:36.000Z"
}`,type:"json"}]},version:"0.0.0",filename:"mailing/mailing.router.js",groupTitle:"API_Mailing"},{type:"post",url:"/api/mails/sendLinkPassword/",title:"Mail send link recovery password",name:"Post_Mail_send_link_recovery_password",group:"API_Mails",body:[{group:"Body",type:"String",optional:!1,field:"email",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "message": "Successfully",
}`,type:"json"}]},version:"0.0.0",filename:"mails/mails.router.js",groupTitle:"API_Mails"},{type:"delete",url:"/api/notifications/:notificationId",title:"Remove a sent notification",name:"Delete_Remove_a_sent_notification",group:"API_Notifications",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"notificationId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"notifications/notifications.router.js",groupTitle:"API_Notifications"},{type:"get",url:"/api/notifications/pending/:bapId",title:"Get pending notifications bap",name:"Get_Get_pending_notifications_bap",group:"API_Notifications",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"bapId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "users": [
        {
            "id": 1332,
            "email": null,
            "role": null,
            "createdAt": "2023-05-16T14:18:07.000Z",
            "updatedAt": "2023-05-16T14:18:07.000Z",
            "bapId": 1315,
            "userId": null,
            "notificationId": 1332,
            "isAccept": 0,
            "isViaEmail": 0,
            "reviewed": 0,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZW5kZXJJZCI6MzcyLCJiYXBJZCI6IjEzMTUiLCJyb2xlIjoiQXJ0aXN0L0JhbmQgbWVtYmVyIiwidHlwZU5vdGlmaWNhdGlvbklkIjoxLCJpYXQiOjE2ODQyNDY2ODcsImV4cCI6MTY4NjgzODY4N30.Sw7YXOS6xDeg1TzG9knjN2PvvH9Zr0j-gtMclodhePA",
            "content": null,
            "typeNotificationId": 1,
            "senderId": 372
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"notifications/notifications.router.js",groupTitle:"API_Notifications"},{type:"get",url:"/api/notifications",title:"Get all not reviewed notifications",name:"Post_Get_all_not_reviewed_notifications",group:"API_Notifications",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "notifications": [
        {
            "id": 530,
            "isAccept": 0,
            "reviewed": 0,
            "senderId": 4,
            "senderFirstName": "SASHA",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZW5kZXJJZCI6NCwicmVjaXBpZW50SWQiOjU5MiwiYmFwSWQiOiI3ODQiLCJyb2xlIjoic2RmZHNlZiIsImVtYWlsIjoieG92YWdpMjgyNkBtb21vc2hlLmNvbSIsInR5cGVOb3RpZmljYXRpb25JZCI6MSwiaWF0IjoxNjgxNzIyNTkxLCJleHAiOjE2ODQzMTQ1OTF9.SE--JftemeH0OkE2ejtkst6OKs_IXWooWQfCE2k7dr0",
            "senderLastName": "qwe",
            "bapName": "zsdfzsdfzsdf",
            "typeNotificationId": 1,
            "userId": 592,
            "bapAvatar": null,
            "createdAt": "2023-04-20T18:16:07.000Z"
         }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"notifications/notifications.router.js",groupTitle:"API_Notifications"},{type:"put",url:"/api/notifications/",title:"Check notification",name:"Put_Check_notification",group:"API_Notifications",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},body:[{group:"Body",type:"boolean",optional:!0,field:"isAccept",description:"<p><code>true || false. If you don't specify parameters, so isAccept will be false</code></p>",checked:!1},{group:"Body",type:"number",optional:!1,field:"typeNotificationId",description:"<p><code>from get all not reviewed notifications</code></p>"}],query:[{group:"Query",type:"string",optional:!1,field:"token",description:"<p><code>from get all not reviewed notifications</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "notification": {
        "id": 530,
        "isAccept": true,
        "reviewed": true,
        "email": "xovagi2826@momoshe.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZW5kZXJJZCI6NCwicmVjaXBpZW50SWQiOjU5MiwiYmFwSWQiOiI3ODQiLCJyb2xlIjoic2RmZHNlZiIsImVtYWlsIjoieG92YWdpMjgyNkBtb21vc2hlLmNvbSIsInR5cGVOb3RpZmljYXRpb25JZCI6MSwiaWF0IjoxNjgxNzIyNTkxLCJleHAiOjE2ODQzMTQ1OTF9.SE--JftemeH0OkE2ejtkst6OKs_IXWooWQfCE2k7dr0",
        "createdAt": "2023-04-17T09:09:51.000Z",
        "updatedAt": "2023-04-17T09:10:10.438Z",
        "userId": 592,
        "senderId": 4,
        "typeNotificationId": 1
    }
}`,type:"json"}]},version:"0.0.0",filename:"notifications/notifications.router.js",groupTitle:"API_Notifications"},{type:"delete",url:"/api/release/admin/:releaseId",title:"Admin Delete release",name:"Delete_Admin_Delete_release",group:"API_Release",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"releaseId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
}`,type:"json"}]},version:"0.0.0",filename:"release/release.router.js",groupTitle:"API_Release"},{type:"get",url:"/api/release/admin/all",title:"Admin Get all releases",name:"Get_Admin_Get_all_releases",group:"API_Release",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},query:[{group:"Query",type:"string",optional:!1,field:"orderBy",description:"<p><code>Example: &quot;id&quot;, &quot;name&quot;, &quot;createdAt&quot;, &quot;type&quot;, releaseDate</code></p>"},{group:"Query",type:"string",optional:!1,field:"sortOrder",description:"<p><code>Example: &quot;ASC&quot;, &quot;DESC&quot;</code></p>"},{group:"Query",type:"string",optional:!1,field:"type",description:""},{group:"Query",type:"string",optional:!1,field:"performer",description:""},{group:"Query",type:"string",optional:!1,field:"mainGenre",description:""},{group:"Query",type:"string",optional:!1,field:"subGenres",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "releases": [
        {
            "subGenresIds": [
                "1",
                "2"
            ],
            "id": 2,
            "name": "First",
            "type": "tyypeeee",
            "logo": null,
            "releaseSpotifyId": null,
            "auddSocialLink": null,
            "releaseDate": "2023-06-27",
            "label": "label",
            "mainGenreId": 1,
            "secondaryGenreId": 1,
            "designId": null,
            "releasesStatus": "ACTIVE",
            "createdAt": "2023-03-13T16:06:00.000Z",
            "updatedAt": "2023-07-28T13:18:50.000Z",
            "bapId": 74,
            "countTracks": 1,
            "mainGenere": {
                "id": 1,
                "name": "Alternative"
            },
            "secondGeneres": {
                "id": 1,
                "name": "Alternative"
            },
            "subGenres": [
                {
                    "id": 1,
                    "name": "Art Punk",
                    "mainGenreId": 1
                },
                {
                    "id": 2,
                    "name": "Alternative Rock",
                    "mainGenreId": 1
                }
            ]
        },
        {
            "subGenresIds": null,
            "id": 3,
            "name": "name",
            "type": "type",
            "logo": null,
            "releaseSpotifyId": null,
            "auddSocialLink": null,
            "releaseDate": null,
            "label": null,
            "mainGenreId": null,
            "secondaryGenreId": null,
            "designId": null,
            "releasesStatus": "ACTIVE",
            "createdAt": "2023-03-14T07:45:32.000Z",
            "updatedAt": "2023-03-14T07:45:32.000Z",
            "bapId": 80,
            "countTracks": 0,
            "mainGenere": null,
            "secondGeneres": null
        },
    ]
}`,type:"json"}]},version:"0.0.0",filename:"release/release.router.js",groupTitle:"API_Release"},{type:"get",url:"/api/release/admin/:releaseId",title:"Admin Get release with track",name:"Get_Admin_Get_release_with_track",group:"API_Release",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"releaseId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "releases": {
        "id": 2,
        "name": "First",
        "type": "tyypeeee",
        "logo": null,
        "bapName": "dfsf",
        "tracks": [
            {
                "id": 59,
                "name": "sdfdsfasdasd",
                "uniqueName": "52a5d11a-3ef5-4887-ac20-10397da8a917.mp3",
                "type": null,
                "price": "0.000",
                "info": "{\\"status\\":\\"success\\",\\"result\\":{\\"artist\\":\\"Eminem\\",\\"title\\":\\"Lose Yourself\\",\\"album\\":\\"8 Mile\\",\\"release_date\\":\\"2002-01-01\\",\\"label\\":\\"Universal Music\\",\\"timecode\\":\\"05:18\\",\\"song_link\\":\\"https://lis.tn/LoseYourself\\"},\\"preview\\":\\"https://p.scdn.co/mp3-preview/03b89cd457ff6f50e839a01873511b48e54c9c12?cid=e44e7b8278114c7db211c00ea273ac69\\"}",
                "position": 100,
                "createdAt": "2023-03-17T08:29:31.000Z",
                "updatedAt": "2023-03-17T08:29:31.000Z",
                "releaseId": 2,
                "bapId": null
            }
        ]
    }
}`,type:"json"}]},version:"0.0.0",filename:"release/release.router.js",groupTitle:"API_Release"},{type:"get",url:"/api/release/:bapId",title:"Get releases",name:"Get_Get_releases",group:"API_Release",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"bapId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "releases": [
                {
                    subGenresIds: [ '1', '2' ],
                    id: 2,
                    name: 'First',
                    type: 'tyypeeee',
                    logo: '5287aac8-5843-4b07-939c-a523e7bb42f3.jpg',
                    thumbnail: "thumb_5287aac8-5843-4b07-939c-a523e7bb42f3.jpg"
                    releaseSpotifyId: null,
                    auddSocialLink: null,
                    releaseDate: '2023-06-27',
                    distributeDate: "2023-11-29T10:57:44.000Z",
                    copyrights: [
                        {
                            "text": "2023 MONOLIT",
                            "type": "C"
                        }
                    ],
                    label: 'label',
                    mainGenreId: 1,
                    secondaryGenreId: 1,
                    designId: '2',
                    createdAt: '2023-03-13T16:06:00.000Z',
                    updatedAt: '2023-06-27T14:31:33.000Z',
                    bapId: 74,
                    totalTracks: 7,
                    upc: "5468418158",
                    releasePrice: 0,
                    evearaReleaseId: null,
                    evearaLabelId: null,
                    evearaReleaseLogo: null,
                    appleMusicReleasePriceId: null,
                    appleMusicTrackPriceId: null,
                    amazonReleasePriceId: null,
                    amazonTrackPriceId: null,
                    evearaGenreIds: [
                        1,
                        2
                    ],
                    mainGenere: { id: 1, name: 'Alternative' },
                    secondGeneres: { id: 1, name: 'Alternative' },
                    subGenres: [
                    { id: 1, name: 'Art Punk', mainGenreId: 1 },
                    { id: 2, name: 'Alternative Rock', mainGenreId: 1 }
                    ]
                }
                ]
}`,type:"json"}]},version:"0.0.0",filename:"release/release.router.js",groupTitle:"API_Release"},{type:"get",url:"/api/release/:releaseSpotifyId/tracksStreamingLings",title:"Get tracks streaming lings",name:"Get_Get_tracks_streaming_lings",group:"API_Release",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"releaseSpotifyId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "release": {
        "id": 983,
        "name": "No Roots - Single",
        "allTracksStreamingLinks": [
            {
                "trackName": 123,
                "song_link": "tewtwe",
                "spotifyLink": "frfewrew",
                "spotifyTrackId": 21312412
            }
        ]
    }
}`,type:"json"}]},version:"0.0.0",filename:"release/release.router.js",groupTitle:"API_Release"},{type:"post",url:"/api/release/:bapId",title:"Create release",name:"Post_Create_release",group:"API_Release",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"bapId",description:""}]}},body:[{group:"Body",type:"string",optional:!1,field:"name",description:""},{group:"Body",type:"string",optional:!1,field:"type",description:""},{group:"Body",type:"file",optional:!1,field:"logo",description:""},{group:"Body",type:"string",optional:!1,field:"urlLogo",description:"<p><code>for upload image from Canva</code></p>"},{group:"Body",type:"string",optional:!1,field:"releaseSpotifyId",description:"<p><code>playlist id in spotify</code></p>"},{group:"Body",type:"string",optional:!1,field:"auddSocialLink",description:"<p><code>from audd</code></p>"},{group:"Body",type:"string",optional:!0,field:"releaseDate",description:""},{group:"Body",type:"string",optional:!0,field:"label",description:""},{group:"Body",type:"string",optional:!0,field:"designId",description:""},{group:"Body",type:"string",optional:!0,field:"mainGenreId",description:""},{group:"Body",type:"string",optional:!0,field:"secondaryGenreId",description:""},{group:"Body",type:"array",optional:!0,field:"subGenresIds",description:""},{group:"Body",type:"number",optional:!0,field:"totalTracks",description:""},{group:"Body",type:"string",optional:!0,field:"upc",description:""},{group:"Body",type:"array",optional:!0,field:"copyrights",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "release": {
        "id": 285,
        "name": "naame",
        "type": "tyypeeee",
        "logo": "5287aac8-5843-4b07-939c-a523e7bb42f3.jpg",
        "thumbnail": "thumb_5287aac8-5843-4b07-939c-a523e7bb42f3.jpg"
        "bapId": "439",
        "releaseSpotifyId": "3cEYpjA9oz9GiPac4AsH4n",
        "auddSocialLink": "asdasdasd",
        "designId": "10",
        "totalTracks": 7,
        "upc": "615815161",
        "copyrights": [
            {
                "text": "2023 MONOLIT",
                "type": "C"
            }
        ],
        "updatedAt": "2023-04-14T08:56:00.534Z",
        "createdAt": "2023-04-14T08:56:00.534Z"
    }
}`,type:"json"}]},version:"0.0.0",filename:"release/release.router.js",groupTitle:"API_Release"},{type:"put",url:"/api/release/admin/:releaseId",title:"Admin Update release",name:"Put_Admin_Update_release",group:"API_Release",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"releaseId",description:""}]}},body:[{group:"Body",type:"string",optional:!0,field:"releasesStatus",description:"<p><code>ACTIVE or HIDDEN</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
}`,type:"json"}]},version:"0.0.0",filename:"release/release.router.js",groupTitle:"API_Release"},{type:"put",url:"/api/release/:releaseId",title:"Edit release",name:"Put_Edit_release",group:"API_Release",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"releaseId",description:""}]}},body:[{group:"Body",type:"string",optional:!0,field:"name",description:""},{group:"Body",type:"string",optional:!0,field:"type",description:""},{group:"Body",type:"file",optional:!0,field:"image",description:""},{group:"Body",type:"string",optional:!0,field:"urlImage",description:"<p><code>For upload image from Canva</code></p>"},{group:"Body",type:"string",optional:!0,field:"releaseSpotifyId",description:"<p><code>Playlist id in spotify</code></p>"},{group:"Body",type:"date",optional:!0,field:"releaseDate",description:""},{group:"Body",type:"date",optional:!0,field:"distributeDate",description:""},{group:"Body",type:"string",optional:!0,field:"label",description:""},{group:"Body",type:"string",optional:!0,field:"designId",description:""},{group:"Body",type:"number",optional:!0,field:"totalTracks",description:""},{group:"Body",type:"string",optional:!0,field:"upc",description:""},{group:"Body",type:"string",optional:!0,field:"spotifyUri",description:""},{group:"Body",type:"string",optional:!0,field:"mainGenreId",description:""},{group:"Body",type:"string",optional:!0,field:"secondaryGenreId",description:""},{group:"Body",type:"array",optional:!0,field:"subGenresIds",description:""},{group:"Body",type:"array",optional:!0,field:"copyrights",description:""},{group:"Body",type:"number",optional:!0,field:"releasePrice",description:""},{group:"Body",type:"array",optional:!0,field:"evearaGenreIds",description:"<p><code>array of numbers, for example: [1, 2, 3]</code></p>"},{group:"Body",type:"array",optional:!0,field:"evearaLabelId",description:""},{group:"Body",type:"number",optional:!0,field:"appleMusicReleasePriceId",description:""},{group:"Body",type:"number",optional:!0,field:"appleMusicTrackPriceId",description:""},{group:"Body",type:"number",optional:!0,field:"amazonReleasePriceId",description:""},{group:"Body",type:"number",optional:!0,field:"amazonTrackPriceId",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "releases": {
        "id": 43,
        "name": "aaaaa",
        "type": "tyypeeee",
        "logo": "a79d3c86-5d90-4254-a0e4-5ce63d9a38be.jpg",
        "thumbnail": "thumb_5287aac8-5843-4b07-939c-a523e7bb42f3.jpg"
        "releaseSpotifyId": "3cEYpjA9oz9GiPac4AsH4n",
        "designId": "3",
        "totalTracks": "7",
        "upc": "561588116",
        "evearaGenreIds": [1, 2, 3],
        "evearaLabelId": null,
        "appleMusicReleasePriceId": null,
        "appleMusicTrackPriceId": null,
        "amazonReleasePriceId": null,
        "amazonTrackPriceId": null,
        "createdAt": "2023-03-27T14:46:31.000Z",
        "updatedAt": "2023-03-27T14:54:39.555Z",
        "bapId": 432
    }
}`,type:"json"}]},version:"0.0.0",filename:"release/release.router.js",groupTitle:"API_Release"},{type:"put",url:"/api/release/:releaseSpotifyId/tracksStreamingLings",title:"Edit release field allTracksStreamingLinks",name:"Put_Edit_release_field_allTracksStreamingLinks",group:"API_Release",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"releaseSpotifyId",description:""}]}},body:[{group:"Body",type:"array",optional:!0,field:"allTracksStreamingLinks",description:"<p><code>Array of objects. Example: [{trackName: 123, song_link: 'www/songLink', spotifyLink: 'www/spotifyLink', spotifyTrackId: '21312412'} ........] </code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "release": {
        "id": 983,
        "name": "No Roots - Single",
        "allTracksStreamingLinks": [
            {
                "trackName": 123,
                "song_link": "tewtwe",
                "spotifyLink": "frfewrew",
                "spotifyTrackId": 21312412
            }
        ]
    }
}`,type:"json"}]},version:"0.0.0",filename:"release/release.router.js",groupTitle:"API_Release"},{type:"get",url:"/api/landing/linkName",title:"Get landing page names",name:"Get_Get_landing_page_names",group:"API_SEO",success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "landings": [
        "aaaa",
        "bbbb",
        "cccc",
        "dddd",
        "eeee",
        "shop1"
    ]
}`,type:"json"}]},version:"0.0.0",filename:"landing/landing.router.js",groupTitle:"API_SEO"},{type:"get",url:"/api/shops/linkName",title:"Get shops link name",name:"Get_Get_shops_link_name",group:"API_SEO",success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "shops": [
        {
            "linkName": "sophie",
            "bapName": "Sophie and the Giants"
        },
        {
            "linkName": "frost",
            "bapName": "Porcelain"
        },
        {
            "linkName": "shop111",
            "bapName": "test"
        },
        {
            "linkName": "shop",
            "bapName": "bap"
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"shops/shops.router.js",groupTitle:"API_SEO"},{type:"delete",url:"/api/shops/design/:designId",title:"Remove design of shop",name:"Delete_Remove_design_of_shop",group:"API_Shop",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"designId",description:""}]}},success:{examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "design": {
        "id": 1,
        "releaseId": "1",
        "hex": "#abcabc",
        "font": "sdfdsf",
        "size": 12,
        "italic": 123,
        "weight": 123,
        "shopDesignTypeId": 1,
        "updatedAt": "2023-05-25T09:51:43.505Z",
        "createdAt": "2023-05-25T09:51:43.505Z"
    }
}`,type:"json"}]},version:"0.0.0",filename:"shops/shops.router.js",groupTitle:"API_Shop"},{type:"delete",url:"/api/shops/release/:shopId",title:"Remove release to shop",name:"Delete_Remove_release_to_shop",group:"API_Shop",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"shopId",description:""}]}},query:[{group:"Query",type:"number",optional:!1,field:"releaseId",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"shops/shops.router.js",groupTitle:"API_Shop"},{type:"delete",url:"/api/shops/:shopId",title:"Remove shop by id",name:"Delete_Remove_shop_by_id",group:"API_Shop",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"shopId",description:""}]}},success:{examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
}`,type:"json"}]},version:"0.0.0",filename:"shops/shops.router.js",groupTitle:"API_Shop"},{type:"get",url:"/api/shops/releases/:name",title:"Get shop releases",name:"Get_Get_shop_releases",group:"API_Shop",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"string",optional:!1,field:"name",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "releases": [
         {
            "id": 494,
            "type": "Single",
            "createdAt": "2023-06-02T14:29:14.000Z",
            "bapId": 1415,
            "shopId": 80,
            "logo": "47da1bc1-9b2d-40a8-93d2-f3efada06a72.jpg",
            "name": "1",
            "backgroundBlur": 0,
            "releaseSpotifyId": null,
            "releaseDate": null
        }
    ],
    "design": [
        {
            "id": 1,
            "hex": "#abcabc",
            "font": "sdfdsf",
            "size": 12,
            "italic": 123,
            "weight": 123,
            "createdAt": "2023-06-06T06:40:15.000Z",
            "updatedAt": "2023-06-06T06:40:15.000Z",
            "shopDesignTypeId": 1,
            "shopId": 80
        }
    ]
    "shop": {
        "id": 80,
        "name": "test56587",
        "favicon": null,
        "background": null,
        "metaTitle": null,
        "metaDescription": null,
        "facebookPixel": null,
        "logo": null,
        "banner": "bf574dfd-3c6f-4983-84ca-b2de150026a9.jpg",
        "backgroundBlur": null,
        "createdAt": "2023-06-02T14:41:13.000Z",
        "updatedAt": "2023-06-02T14:41:13.000Z",
        "bapId": 1415,
        "bapName": "bap",
        "positionTypeId": 2,
        "webpagesTypeId": null,
        "showSocialLinks": false,
        "socialLinksType": "white",
        "socialLinks": [
            {
                "id": 1,
                "link": "first",
                "position": 1,
                "createdAt": "2023-08-24T13:48:30.000Z",
                "updatedAt": "2023-08-24T13:48:30.000Z",
                "shopId": 224
            }
        ]
    }
}`,type:"json"}]},version:"0.0.0",filename:"shops/shops.router.js",groupTitle:"API_Shop"},{type:"get",url:"/api/shops/",title:"Get shops",name:"Get_Get_shops",group:"API_Shop",query:[{group:"Query",type:"number",optional:!0,field:"bapId",description:"<p><code>must enter only one query param</code></p>"},{group:"Query",type:"number",optional:!0,field:"releaseId",description:"<p><code>must enter only one query param</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "shops": [
        {
            "id": 219,
            "name": "nameee",
            "favicon": null,
            "background": null,
            "metaTitle": "title",
            "metaDescription": "desssc",
            "backgroundBlur": null,
            "logo": null,
            "banner": "047243f8-e272-42a5-a50f-cce7e1f84ea9.mp4",
            "facebookPixel": null,
            "createdAt": null,
            "updatedAt": null,
            "bapId": 1773,
            "positionTypeId": null,
            "webpagesTypeId": null,
            "bannerType": "video",
            "shopId": null,
            "contractId": null,
            "description": null,
            "webpagesTypeName": null,
            "releaseIds": [
                986,
                1012
            ]
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"shops/shops.router.js",groupTitle:"API_Shop"},{type:"post",url:"/api/shops/design/",title:"Add design to shop",name:"POST_Add_design_to_shop",group:"API_Shop",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},query:[{group:"Query",type:"number",optional:!1,field:"shopId",description:""}],body:[{group:"Body",type:"string",optional:!1,field:"font",description:""},{group:"Body",type:"string",optional:!1,field:"hex",description:""},{group:"Body",type:"number",optional:!1,field:"size",description:""},{group:"Body",type:"number",optional:!1,field:"italic",description:""},{group:"Body",type:"number",optional:!1,field:"weight",description:""},{group:"Body",type:"number",optional:!1,field:"shopDesignTypeId",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "design": {
        "id": 1,
        "releaseId": "1",
        "hex": "#abcabc",
        "font": "sdfdsf",
        "size": 12,
        "italic": 123,
        "weight": 123,
        "shopDesignTypeId": 1,
        "updatedAt": "2023-05-25T09:51:43.505Z",
        "createdAt": "2023-05-25T09:51:43.505Z"
    }
}`,type:"json"}]},version:"0.0.0",filename:"shops/shops.router.js",groupTitle:"API_Shop"},{type:"post",url:"/api/shops/social/:shopId",title:"Add social links to shop",name:"Post_Add_social_links_to_shop",group:"API_Shop",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"shopId",description:""}]},examples:[{title:"Request-Example:",content:`{
    "data": [
        {
            "link": "first",
            "position": 1
        },
        {
            "link": "second",
            "position": 12
        },
        {
            "link": "asdasd",
            "position": 13
        }
    ]
}`,type:"json"}]},body:[{group:"Body",type:"array",optional:!1,field:"data",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "socialLinks": [
        {
            "link": "first",
            "position": 1
        },
        {
            "link": "second",
            "position": 12
        },
        {
            "link": "asdasd",
            "position": 13
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"shops/shops.router.js",groupTitle:"API_Shop"},{type:"post",url:"/api/shops/create/:bapId",title:"Create shop",name:"Post_Create_shop",group:"API_Shop",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"bapId",description:""}]}},body:[{group:"Body",type:"string",optional:!1,field:"name",description:""},{group:"Body",type:"string",optional:!0,field:"metaTitle",description:""},{group:"Body",type:"string",optional:!0,field:"metaDescription",description:""},{group:"Body",type:"string",optional:!0,field:"facebookPixel",description:""},{group:"Body",type:"string",optional:!0,field:"positionTypeId",description:""},{group:"Body",type:"string",optional:!0,field:"urlFavicon",description:""},{group:"Body",type:"string",optional:!0,field:"urlBackground",description:""},{group:"Body",type:"number",optional:!1,field:"backgroundBlur",description:"<p><code>0 &lt;= x &lt;= 100</code></p>"},{group:"Body",type:"file",optional:!0,field:"favicon",description:""},{group:"Body",type:"file",optional:!0,field:"background",description:""},{group:"Body",type:"file",optional:!0,field:"logo",description:""},{group:"Body",type:"file",optional:!0,field:"banner",description:""},{group:"Body",type:"string",optional:!0,field:"bannerType",description:"<p><code>must be a 'string' or 'video', reset - ''</code></p>"},{group:"Body",type:"boolean",optional:!0,field:"showSocialLinks",description:"",checked:!1},{group:"Body",type:"string",optional:!0,field:"socialLinksType",description:"<p><code>must be a 'white', 'black' or 'colour'</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "shop": {
        "id": 4,
        "name": "asdasd",
        "banner": "69b8d284-f3a1-409a-a0d6-92fc7f2bb28f.jpg"
        "bannerType": "image",
        "showSocialLinks": false,
        "socialLinksType": "white",
        "favicon": "https://export-download.canva.com/dsfdsfsdf",
        "background": "https://export-download.canva.com/dsfdsfsdf",
        "updatedAt": "2023-05-16T12:44:51.252Z",
        "createdAt": "2023-05-16T12:44:51.252Z"
    }
}`,type:"json"}]},version:"0.0.0",filename:"shops/shops.router.js",groupTitle:"API_Shop"},{type:"put",url:"/api/shops/release",title:"Add release to shop",name:"Put_Add_release_to_shop",group:"API_Shop",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},query:[{group:"Query",type:"number",optional:!1,field:"shopId",description:""}],body:[{group:"Body",type:"array",optional:!1,field:"releaseIds",description:""}],parameter:{examples:[{title:"Request-Example:",content:`{
    "releaseIds": [1, 2, 3, 4, 5]
}`,type:"json"}]},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"shops/shops.router.js",groupTitle:"API_Shop"},{type:"put",url:"/api/shops/release/settings",title:"Edit settings release shop",name:"Put_Edit_settings_release_shop",group:"API_Shop",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},query:[{group:"Query",type:"number",optional:!1,field:"shopId",description:""},{group:"Query",type:"number",optional:!1,field:"releaseId",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "settings": {
        "id": 2,
        "backgroundBlur": 10,
        "createdAt": "2023-05-30T15:17:53.000Z",
        "updatedAt": "2023-06-07T07:19:32.429Z",
        "shopId": 58,
        "releaseId": 481,
        "contractId": null
    }
}`,type:"json"}]},version:"0.0.0",filename:"shops/shops.router.js",groupTitle:"API_Shop"},{type:"put",url:"/api/shops/edit/:shopId",title:"Edit shop",name:"Put_Edit_shop",group:"API_Shop",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"shopId",description:""}]}},body:[{group:"Body",type:"number",optional:!1,field:"bapId",description:""},{group:"Body",type:"string",optional:!1,field:"name",description:""},{group:"Body",type:"string",optional:!0,field:"metaTitle",description:"<p><code>if the string is empty, then the field is set to null</code></p>"},{group:"Body",type:"string",optional:!0,field:"metaDescription",description:"<p><code>if the string is empty, then the field is set to null</code></p>"},{group:"Body",type:"string",optional:!0,field:"facebookPixel",description:"<p><code>if the string is empty, then the field is set to null</code></p>"},{group:"Body",type:"string",optional:!0,field:"positionTypeId",description:""},{group:"Body",type:"string",optional:!0,field:"urlFavicon",description:""},{group:"Body",type:"string",optional:!0,field:"urlBackground",description:""},{group:"Body",type:"string",optional:!0,field:"urlBanner",description:""},{group:"Body",type:"string",optional:!0,field:"urlLogo",description:""},{group:"Body",type:"file",optional:!0,field:"favicon",description:""},{group:"Body",type:"file",optional:!0,field:"background",description:""},{group:"Body",type:"file",optional:!0,field:"logo",description:""},{group:"Body",type:"file",optional:!0,field:"banner",description:""},{group:"Body",type:"string",optional:!0,field:"bannerType",description:"<p><code>must be a 'string' or 'video', reset - ''</code></p>"},{group:"Body",type:"boolean",optional:!0,field:"showSocialLinks",description:"",checked:!1},{group:"Body",type:"string",optional:!0,field:"socialLinksType",description:"<p><code>must be a 'white', 'black' or 'colour'</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "shop": {
        "id": 4,
        "name": "asdasd",
        "banner": "69b8d284-f3a1-409a-a0d6-92fc7f2bb28f.jpg"
        "bannerType": "image",
        "showSocialLinks": false,
        "socialLinksType": "white",
        "favicon": "https://export-download.canva.com/dsfdsfsdf",
        "background": "https://export-download.canva.com/dasdsadasdasdasd",
        "createdAt": "2023-05-16T12:44:51.000Z",
        "updatedAt": "2023-05-16T12:46:03.948Z",
        "positionTypeId": null
    }
}`,type:"json"}]},version:"0.0.0",filename:"shops/shops.router.js",groupTitle:"API_Shop"},{type:"get",url:"/api/socials/:bapId",title:"Get social links of bap",name:"Get_Get_social_links_of_bap",group:"API_Social",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"bapId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "socialLinks": [
        {
            "id": 4,
            "social": "dasd",
            "createdAt": "2023-03-07T17:10:23.000Z",
            "updatedAt": "2023-03-07T17:10:23.000Z",
            "bapId": 1
        },
        {
            "id": 5,
            "social": "dasd",
            "createdAt": "2023-03-07T17:14:36.000Z",
            "updatedAt": "2023-03-07T17:14:36.000Z",
            "bapId": 1
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"socials/socials.router.js",groupTitle:"API_Social"},{type:"put",url:"/api/socials/:bapId",title:"Edit social links",name:"Put_Edit_social_links",group:"API_Social",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"bapId",description:""}]},examples:[{title:"Request-Example:",content:`{
    "socialData": [
        {
            "social": "https://spotify.com/qwertyui",
            "position": 1
        },
        {
            "social": "https://example.com/89wdhn3mxax",
            "position": 3
        }
    ]
}`,type:"json"}]},body:[{group:"Body",type:"array",optional:!1,field:"socialData",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "socials": [
        {
            "id": 454,
            "social": "https://spotify.com/qwertyui",
            "position": 1,
            "createdAt": "2023-05-01T15:04:00.000Z",
            "updatedAt": "2023-05-01T15:04:00.000Z",
            "bapId": 84
        },
        {
            "id": 455,
            "social": "https://example.com/89wdhn3mxax",
            "position": 3,
            "createdAt": "2023-05-01T15:04:00.000Z",
            "updatedAt": "2023-05-01T15:04:00.000Z",
            "bapId": 84
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"socials/socials.router.js",groupTitle:"API_Social"},{type:"delete",url:"/api/splits/:splitId",title:"Remove split",name:"Delete_Remove_split",group:"API_Split",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"splitId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
 {
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"splits/splits.router.js",groupTitle:"API_Split"},{type:"Get",url:"/api/splits/:splitId",title:"Get one split by id",name:"Get_Get_one_split_by_id",group:"API_Split",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"splitId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
 {
    "success": true,
    "split": {
        "id": 155,
        "createdAt": "2023-04-10T09:36:28.000Z",
        "updatedAt": "2023-04-10T09:36:28.000Z",
        "releaseId": 67,
        "tracksSplit": [
            {
                "id": 125,
                "name": "sdfdsfasdasd",
                "uniqueName": "3d80b6a1-12f9-40e8-9442-5226b2fb9620.wav",
                "type": null,
                "createdAt": "2023-03-28T08:07:28.000Z",
                "updatedAt": "2023-03-28T08:07:28.000Z",
                "releaseId": 67
            },
            {
                "id": 270,
                "name": "sdfdsfasdasd",
                "uniqueName": "6be2235b-041f-4833-a1f6-1765a5cbae83.wav",
                "type": null,
                "createdAt": "2023-04-06T08:11:09.000Z",
                "updatedAt": "2023-04-06T08:11:09.000Z",
                "releaseId": 67
            }
        ],
        "splitUsers": {
            "id": 173,
            "email": "xixito9939@necktai.com",
            "ownership": "100",
            "createdAt": "2023-04-10T10:10:32.000Z",
            "updatedAt": "2023-04-10T10:10:32.000Z",
            "splitId": 155
        }
    }
}`,type:"json"}]},version:"0.0.0",filename:"splits/splits.router.js",groupTitle:"API_Split"},{type:"post",url:"/api/splits/ownership/:splitId",title:"Add writer ownership",name:"Post_Add_writer_ownership",group:"API_Split",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"splitId",description:""}]},examples:[{title:"Request-Example:",content:`{
  "ownership": {
      "temp@mail.com": 50,
      "temp2@mail.com": 30,
      "temp3@mail.com": 20
  }
}`,type:"json"}]},body:[{group:"Body",type:"object",optional:!1,field:"ownership",description:"<p><code>object key - email, value - percent</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "splitUsers": [
        {
            "id": 3,
            "splitId": "1",
            "email": "temp@mail.com",
            "ownership": 50,
            "updatedAt": "2023-03-17T13:11:13.531Z",
            "createdAt": "2023-03-17T13:11:13.531Z"
        },
        {
            "id": 4,
            "splitId": "1",
            "email": "temp2@mail.com",
            "ownership": 30,
            "updatedAt": "2023-03-17T13:11:13.889Z",
            "createdAt": "2023-03-17T13:11:13.889Z"
        },
        {
            "id": 5,
            "splitId": "1",
            "email": "temp3@mail.com",
            "ownership": 20,
            "updatedAt": "2023-03-17T13:11:13.938Z",
            "createdAt": "2023-03-17T13:11:13.938Z"
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"splits/splits.router.js",groupTitle:"API_Split"},{type:"post",url:"/api/splits/:releaseId",title:"Create split",name:"Post_Create_split",group:"API_Split",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"releaseId",description:""}]},examples:[{title:"Request-Example:",content:`{
  "onlyContract": true,
  "trackIds": [1, 2, 3, 4]
}`,type:"json"}]},body:[{group:"Body",type:"boolean",optional:!1,field:"onlyContract",description:"",checked:!1},{group:"Body",type:"array",optional:!1,field:"trackIds",description:"<p>array of trackIds. Example: tracks: [1, 2, 3, 4]</p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "result": {
        "split": {
            "id": 6,
            "releaseId": 1,
            "updatedAt": "2023-03-17T12:03:44.001Z",
            "createdAt": "2023-03-17T12:03:44.001Z"
        },
        "tracksSplit": [
            {
                "id": 13,
                "splitId": 6,
                "trackId": 1,
                "updatedAt": "2023-03-17T12:03:44.185Z",
                "createdAt": "2023-03-17T12:03:44.185Z"
            },
            {
                "id": 14,
                "splitId": 6,
                "trackId": 2,
                "updatedAt": "2023-03-17T12:03:44.465Z",
                "createdAt": "2023-03-17T12:03:44.465Z"
            }
        ]
    }
}`,type:"json"}]},version:"0.0.0",filename:"splits/splits.router.js",groupTitle:"API_Split"},{type:"post",url:"/api/splits/reference/:splitId",title:"Create split reference",name:"Post_Create_split_reference",group:"API_Split",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"splitId",description:""}]},examples:[{title:"Request-Example:",content:`{
  "splitId": 1
}`,type:"json"}]},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "result": {
        "split": {
            "id": 6,
            "releaseId": 1,
            "updatedAt": "2023-03-17T12:03:44.001Z",
            "createdAt": "2023-03-17T12:03:44.001Z"
        },
    }
}`,type:"json"}]},version:"0.0.0",filename:"splits/splits.router.js",groupTitle:"API_Split"},{type:"get",url:"/api/spotify",title:"Artists from spotify",name:"Get_Artists_from_spotify",group:"API_Spotify",query:[{group:"Query",type:"string",optional:!1,field:"name",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "baps": [
        {
            "external_urls": {
                "spotify": "https://open.spotify.com/artist/6dC0rIJNLSFZwqckLgXJ8p"
            },
            "followers": {
                "href": null,
                "total": 327686
            },
            "images": [
                {
                    "height": 1000,
                    "url": "https://i.scdn.co/image/b81e5fa38ce9af63d09a5e93f8524c42f6d02ea4",
                    "width": 1000
                },
                {
                    "height": 640,
                    "url": "https://i.scdn.co/image/741dcbf70f4fc157a818fa9c73a39e023f8a446b",
                    "width": 640
                },
                {
                    "height": 200,
                    "url": "https://i.scdn.co/image/dc6f5e949d9559aa8091a405bda421c11ad8177e",
                    "width": 200
                },
                {
                    "height": 64,
                    "url": "https://i.scdn.co/image/6c709d0a985278765ea0f52028a33dd57bca066f",
                    "width": 64
                }
            ],
            "name": "Timeflies",
            "type": "artist",
            "genres": [
                "dance pop",
                "indie pop rap",
                "indie poptimism",
                "pop",
                "pop dance",
                "pop edm",
                "pop rap",
                "pop rock",
                "post-teen pop",
                "tropical house"
            ],
            "isSynced": false
        },
        ...
 ]`,type:"json"}]},version:"0.0.0",filename:"spotify/spotify.router.js",groupTitle:"API_Spotify"},{type:"get",url:"/api/spotify/track/features/:spotifyTrackId",title:"Get track audio features",name:"Get_Get_track_audio_features",group:"API_Spotify",parameter:{fields:{Parameter:[{group:"Parameter",type:"string",optional:!1,field:"spotifyTrackId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "trackAudioFeatures": {
        "danceability": 0.593,
        "energy": 0.525,
        "key": 0,
        "loudness": -5.079,
        "mode": 1,
        "speechiness": 0.0303,
        "acousticness": 0.444,
        "instrumentalness": 0,
        "liveness": 0.124,
        "valence": 0.426,
        "tempo": 79.992,
        "type": "audio_features",
        "id": "3mlRdYbzDZbfpbzj9hxEdq",
        "uri": "spotify:track:3mlRdYbzDZbfpbzj9hxEdq",
        "track_href": "https://api.spotify.com/v1/tracks/3mlRdYbzDZbfpbzj9hxEdq",
        "analysis_url": "https://api.spotify.com/v1/audio-analysis/3mlRdYbzDZbfpbzj9hxEdq",
        "duration_ms": 216880,
        "time_signature": 4
    }
}`,type:"json"}]},version:"0.0.0",filename:"spotify/spotify.router.js",groupTitle:"API_Spotify"},{type:"get",url:"/api/spotify/track/info/:trackSpotifyId",title:"Get track info by trackSpotifyId",name:"Get_Get_track_info_by_trackSpotifyId",group:"API_Spotify",parameter:{fields:{Parameter:[{group:"Parameter",type:"string",optional:!1,field:"trackSpotifyId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "data": {
        "album": {
            "album_type": "single",
            "artists": [
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/6SoxBuLPk2kaupSod0zfEB"
                    },
                    "href": "https://api.spotify.com/v1/artists/6SoxBuLPk2kaupSod0zfEB",
                    "id": "6SoxBuLPk2kaupSod0zfEB",
                    "name": "Porcelain",
                    "type": "artist",
                    "uri": "spotify:artist:6SoxBuLPk2kaupSod0zfEB"
                }
            ],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/3gAX8X6kwq3Tiz8hM7Ic7c"
            },
            "href": "https://api.spotify.com/v1/albums/3gAX8X6kwq3Tiz8hM7Ic7c",
            "id": "3gAX8X6kwq3Tiz8hM7Ic7c",
            "images": [
                {
                    "height": 640,
                    "url": "https://i.scdn.co/image/ab67616d0000b2738f1c9fa73022ca8db603a600",
                    "width": 640
                },
                {
                    "height": 300,
                    "url": "https://i.scdn.co/image/ab67616d00001e028f1c9fa73022ca8db603a600",
                    "width": 300
                },
                {
                    "height": 64,
                    "url": "https://i.scdn.co/image/ab67616d000048518f1c9fa73022ca8db603a600",
                    "width": 64
                }
            ],
            "name": "Part One",
            "release_date": "2020-08-14",
            "release_date_precision": "day",
            "total_tracks": 4,
            "type": "album",
            "uri": "spotify:album:3gAX8X6kwq3Tiz8hM7Ic7c"
        },
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/6SoxBuLPk2kaupSod0zfEB"
                },
                "href": "https://api.spotify.com/v1/artists/6SoxBuLPk2kaupSod0zfEB",
                "id": "6SoxBuLPk2kaupSod0zfEB",
                "name": "Porcelain",
                "type": "artist",
                "uri": "spotify:artist:6SoxBuLPk2kaupSod0zfEB"
            }
        ],
        "disc_number": 1,
        "duration_ms": 280101,
        "explicit": false,
        "external_ids": {
            "isrc": "UKY6K2000001"
        },
        "external_urls": {
            "spotify": "https://open.spotify.com/track/5aU4O07XuMFpNNR0v60Wnc"
        },
        "href": "https://api.spotify.com/v1/tracks/5aU4O07XuMFpNNR0v60Wnc",
        "id": "5aU4O07XuMFpNNR0v60Wnc",
        "is_local": false,
        "name": "Destruction",
        "popularity": 11,
        "preview_url": "https://p.scdn.co/mp3-preview/86b4a6484b839b6ca5fc624a8fc70f569f1d177b?cid=a7bbe306375a40438db3c04bc60f489f",
        "track_number": 1,
        "type": "track",
        "uri": "spotify:track:5aU4O07XuMFpNNR0v60Wnc"
    }
}`,type:"json"}]},version:"0.0.0",filename:"spotify/spotify.router.js",groupTitle:"API_Spotify"},{type:"get",url:"/api/spotify/releases",title:"Releases from Spotify",name:"Get_Releases_from_Spotify",group:"API_Spotify",query:[{group:"Query",type:"string",optional:!1,field:"name",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "releases": [
        {
            "external_urls": {
                "spotify": "https://open.spotify.com/playlist/37i9dQZF1DX7rOY2tZUw1k"
            },
            "images": [
                {
                    "height": null,
                    "url": "https://i.scdn.co/image/ab67706f00000003ab79e9cccfbc31fc14063f55",
                    "width": null
                }
            ],
            "name": "Timeless Love Songs",
            "tracks": {
                "href": "https://api.spotify.com/v1/playlists/37i9dQZF1DX7rOY2tZUw1k/tracks",
                "total": 100
            }
        },
        {
            "external_urls": {
                "spotify": "https://open.spotify.com/playlist/56QNzMgZScQU3ma1GWf1mt"
            },
            "images": [
                {
                    "height": null,
                    "url": "https://i.scdn.co/image/ab67706c0000bebbe15ad75ed292c285c6a59364",
                    "width": null
                }
            ],
            "name": "time flies bye bye they all sang along",
            "tracks": {
                "href": "https://api.spotify.com/v1/playlists/56QNzMgZScQU3ma1GWf1mt/tracks",
                "total": 20
            }
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"spotify/spotify.router.js",groupTitle:"API_Spotify"},{type:"get",url:"/api/spotify/track/:releaseSpotifyId",title:"Tracks from Spotify of Releases",name:"Get_Tracks_from_Spotify_of_Releases",group:"API_Spotify",parameter:{fields:{Parameter:[{group:"Parameter",type:"string",optional:!1,field:"releaseSpotifyId",description:"<p><code>id release (playlist) from spotify</code></p>"}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "tracks": [
        {
            "name": "All I Want",
            "type": "track",
            "spotify": "https://open.spotify.com/track/4Cy0NHJ8Gh0xMdwyM9RkQm",
            "preview_url": "https://p.scdn.co/mp3-preview/cc680ec0f5fd5ff21f0cd11ac47e10d3cbb92190?cid=a7bbe306375a40438db3c04bc60f489f"
        },
        {
            "name": "You Are So Beautiful",
            "type": "track",
            "spotify": "https://open.spotify.com/track/2E2znCPaS8anQe21GLxcvJ",
            "preview_url": null
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"spotify/spotify.router.js",groupTitle:"API_Spotify"},{type:"get",url:"/api/spotify/tracks",title:"Tracks from spotify by track or artist name",name:"Get_Tracks_from_spotify_by_track_or_artist_name",group:"API_Spotify",query:[{group:"Query",type:"string",optional:!1,field:"trackName",description:""},{group:"Query",type:"string",optional:!1,field:"artistName",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "tracks": [
        {
            "id": "4JdSXF2p71cr8uCY3UiJM0",
            "name": "Fr\xE1gil",
            "preview_url": "https://p.scdn.co/mp3-preview/391c95844ca92dc6a73d3091802c9a14ae2ea4fa?cid=a7bbe306375a40438db3c04bc60f489f",
            "album": {
                "id": "6iZUwDpa27jeAvKxs8UYI2",
                "name": "Fr\xE1gil"
            },
            "artists": [
                {
                    "id": "51ZSh80McCt7vbqHouzW0A",
                    "name": "Yahritza Y Su Esencia"
                },
                {
                    "id": "6XkjpgcEsYab502Vr1bBeW",
                    "name": "Grupo Frontera"
                }
            ]
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"spotify/spotify.router.js",groupTitle:"API_Spotify"},{type:"get",url:"/api/spotify/albums/:id/tracks",title:"Get Spotify Album Tracks",name:"Get_get_Spotify_Album_Tracks.",group:"API_Spotify",parameter:{fields:{Parameter:[{group:"Parameter",type:"string",optional:!1,field:"id",description:"<p><code>id Spotife album</code></p>"}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"spotify/spotify.router.js",groupTitle:"API_Spotify"},{type:"get",url:"/api/spotify/artists/:id/albums",title:"Get Spotify artist's albums.",name:"Get_get_Spotify_catalog_information_about_an_artist's_albums.",group:"API_Spotify",parameter:{fields:{Parameter:[{group:"Parameter",type:"string",optional:!1,field:"id",description:"<p><code>id Spotife artist</code></p>"}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"spotify/spotify.router.js",groupTitle:"API_Spotify"},{type:"post",url:"/api/spotify/albums/:id",title:"Get Spotify total tracks and Apple Music data",name:"Post_Get_Spotify_total_tracks_and_Apple_Music_data",group:"API_Spotify",parameter:{fields:{Parameter:[{group:"Parameter",type:"string",optional:!1,field:"id",description:"<p><code>id Spotife album</code></p>"}]}},body:[{group:"Body",type:"boolean",optional:!0,field:"withAppleMusic",description:"<p><code>true or false</code></p>",checked:!1}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "data": {
        "albumType": "album",
        "id": "382ObEPsp2rxGrnsizN5TX",
        "name": "TRON: Legacy Reconfigured",
        "releaseDate": "2011-01-01",
        "releaseDatePrecision": "day",
        "type": "album",
        "uri": "spotify:album:382ObEPsp2rxGrnsizN5TX",
        "upc": "00050087239633",
        "totalTracks": 15,
        "label": "Walt Disney Records",
        "externalUrls": {
            "spotify": "https://open.spotify.com/album/382ObEPsp2rxGrnsizN5TX"
        },
        "artists": [
            {
                "id": "4tZwfgrHOc3mvqYlEYSvVi",
                "name": "Daft Punk"
            }
        ],
        "copyrights": [
            {
                "text": "2011 Disney",
                "type": "C"
            },
            {
                "text": "2011 Walt Disney Records",
                "type": "P"
            }
        ],
        "appleMusicData": {
            "artists": [
                {
                    "id": "1215008293",
                    "name": "ANIVAR",
                    "artistUrl": "https://music.apple.com/us/artist/anivar/1215008293"
                },
                {
                    "id": "1445606139",
                    "name": "ADAMYAN",
                    "artistUrl": "https://music.apple.com/us/artist/adamyan/1445606139"
                }
            ],
            "artwork": {
                "width": 1400,
                "height": 1400,
                "url": "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/1c/51/fd/1c51fdad-6ad4-ecb6-144b-a406e307d5f7/cover.jpg/{w}x{h}bb.jpg",
                "bgColor": "7799c0",
                "textColor1": "0a0504",
                "textColor2": "161616",
                "textColor3": "202229",
                "textColor4": "2a3138"
            },
            "genreNames": [
                "Pop",
                "Music"
            ]
        }
    }
}`,type:"json"}]},version:"0.0.0",filename:"spotify/spotify.router.js",groupTitle:"API_Spotify"},{type:"delete",url:"/api/tracks/admin/:trackId",title:"Admin Delete track",name:"Admin_Delete_track",group:"API_Track",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"trackId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"tracks/tracks.router.js",groupTitle:"API_Track"},{type:"get",url:"/api/tracks/admin/download",title:"Admin Download track",name:"Admin_Download_track",group:"API_Track",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},query:[{group:"Query",type:"string",optional:!1,field:"trackId",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"File",description:"<p><code>track</code></p>"}]}},version:"0.0.0",filename:"tracks/tracks.router.js",groupTitle:"API_Track"},{type:"delete",url:"/api/tracks/release/:releaseId",title:"Remove track from release",name:"Delete_Remove_track_from_release",group:"API_Track",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"releaseId",description:""}]}},query:[{group:"Query",type:"number",optional:!1,field:"trackId",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"tracks/tracks.router.js",groupTitle:"API_Track"},{type:"get",url:"/api/tracks/free/download",title:"Download track",name:"Download_track",group:"API_Track",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},query:[{group:"Query",type:"string",optional:!1,field:"trackId",description:""}],body:[{group:"Body",type:"boolean",optional:!0,field:"isFree",description:"<p><code>true or false</code></p>",checked:!1}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"File",description:"<p><code>track</code></p>"}]}},version:"0.0.0",filename:"tracks/tracks.router.js",groupTitle:"API_Track"},{type:"get",url:"/api/tracks/:releaseId",title:"Get Tracks",name:"Get_Get_Tracks",group:"API_Track",parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"releaseId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "tracks": [
        {
            "id": 2489,
            "name": "Live ",
            "uniqueName": "a177eb8e-8c3f-4a9a-baac-b5cad6e63d96.mp3",
            "originalName": "a177eb8e-8c3f-4a9a-baac-b5cad6e63d96.mp3",
            "type": null,
            "price": "2.000",
            "info": {
                "status": "success",
                "result": {
                    "artist": "David Newton",
                    "title": "Temperance",
                    "album": "Pacific Heights",
                    "release_date": "2003-12-01",
                    "label": "Bright New Day Records",
                    "timecode": "00:45",
                    "song_link": "https://lis.tn/gGlnfK",
                    "apple_music": {
                        "previews": [
                            {
                                "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/bb/ab/3c/bbab3cc3-9567-ec76-a1e5-74e2b81c70a0/mzaf_11032452442755243355.plus.aac.p.m4a"
                            }
                        ],
                        "artwork": {
                            "width": 1500,
                            "height": 1500,
                            "url": "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/9c/dd/94/9cdd94ca-e0f4-21a8-5355-5cbcaac57514/5060074160319.png/{w}x{h}bb.jpg",
                            "bgColor": "54bff1",
                            "textColor1": "110a0b",
                            "textColor2": "242916",
                            "textColor3": "1f2e39",
                            "textColor4": "2d4742"
                        },
                        "artistName": "David Newton, Colin Oxley & Dave Chamberlain",
                        "url": "https://music.apple.com/us/album/temperance/1617358144?app=music&at=1000l33QU&i=1617358482&mt=1",
                        "discNumber": 1,
                        "genreNames": [
                            "Contemporary Jazz",
                            "Music",
                            "Jazz"
                        ],
                        "durationInMillis": 302053,
                        "releaseDate": "2003-12-01",
                        "name": "Temperance",
                        "isrc": "GBBET0702865",
                        "albumName": "Pacific Heights",
                        "playParams": {
                            "id": "1617358482",
                            "kind": "song"
                        },
                        "trackNumber": 8,
                        "composerName": "Unknown"
                    },
                    "spotify": {
                        "album": {
                            "name": "Pacific Heights",
                            "artists": [
                                {
                                    "name": "David Newton",
                                    "id": "3ecO9MnClCeQeRCPLzAEgy",
                                    "uri": "spotify:artist:3ecO9MnClCeQeRCPLzAEgy",
                                    "href": "https://api.spotify.com/v1/artists/3ecO9MnClCeQeRCPLzAEgy",
                                    "external_urls": {
                                        "spotify": "https://open.spotify.com/artist/3ecO9MnClCeQeRCPLzAEgy"
                                    }
                                },
                                {
                                    "name": "Colin Oxley",
                                    "id": "6Qs92KB5NHAzQ3NsLfZ6qs",
                                    "uri": "spotify:artist:6Qs92KB5NHAzQ3NsLfZ6qs",
                                    "href": "https://api.spotify.com/v1/artists/6Qs92KB5NHAzQ3NsLfZ6qs",
                                    "external_urls": {
                                        "spotify": "https://open.spotify.com/artist/6Qs92KB5NHAzQ3NsLfZ6qs"
                                    }
                                },
                                {
                                    "name": "Dave Chamberlain",
                                    "id": "39LRDjCTn1f255RhV5cmyF",
                                    "uri": "spotify:artist:39LRDjCTn1f255RhV5cmyF",
                                    "href": "https://api.spotify.com/v1/artists/39LRDjCTn1f255RhV5cmyF",
                                    "external_urls": {
                                        "spotify": "https://open.spotify.com/artist/39LRDjCTn1f255RhV5cmyF"
                                    }
                                }
                            ],
                            "album_group": "",
                            "album_type": "album",
                            "id": "0vKVxcAWjAbnjA9kxKZKny",
                            "uri": "spotify:album:0vKVxcAWjAbnjA9kxKZKny",
                            "href": "https://api.spotify.com/v1/albums/0vKVxcAWjAbnjA9kxKZKny",
                            "images": [
                                {
                                    "height": 640,
                                    "width": 640,
                                    "url": "https://i.scdn.co/image/ab67616d0000b27311918f21a0093dabb7bb9631"
                                },
                                {
                                    "height": 300,
                                    "width": 300,
                                    "url": "https://i.scdn.co/image/ab67616d00001e0211918f21a0093dabb7bb9631"
                                },
                                {
                                    "height": 64,
                                    "width": 64,
                                    "url": "https://i.scdn.co/image/ab67616d0000485111918f21a0093dabb7bb9631"
                                }
                            ],
                            "external_urls": {
                                "spotify": "https://open.spotify.com/album/0vKVxcAWjAbnjA9kxKZKny"
                            },
                            "release_date": "2003",
                            "release_date_precision": "year"
                        },
                        "external_ids": {
                            "isrc": "GBBET0702865"
                        },
                        "popularity": 1,
                        "is_playable": null,
                        "linked_from": null,
                        "artists": [
                            {
                                "name": "David Newton",
                                "id": "3ecO9MnClCeQeRCPLzAEgy",
                                "uri": "spotify:artist:3ecO9MnClCeQeRCPLzAEgy",
                                "href": "https://api.spotify.com/v1/artists/3ecO9MnClCeQeRCPLzAEgy",
                                "external_urls": {
                                    "spotify": "https://open.spotify.com/artist/3ecO9MnClCeQeRCPLzAEgy"
                                }
                            },
                            {
                                "name": "Colin Oxley",
                                "id": "6Qs92KB5NHAzQ3NsLfZ6qs",
                                "uri": "spotify:artist:6Qs92KB5NHAzQ3NsLfZ6qs",
                                "href": "https://api.spotify.com/v1/artists/6Qs92KB5NHAzQ3NsLfZ6qs",
                                "external_urls": {
                                    "spotify": "https://open.spotify.com/artist/6Qs92KB5NHAzQ3NsLfZ6qs"
                                }
                            },
                            {
                                "name": "Dave Chamberlain",
                                "id": "39LRDjCTn1f255RhV5cmyF",
                                "uri": "spotify:artist:39LRDjCTn1f255RhV5cmyF",
                                "href": "https://api.spotify.com/v1/artists/39LRDjCTn1f255RhV5cmyF",
                                "external_urls": {
                                    "spotify": "https://open.spotify.com/artist/39LRDjCTn1f255RhV5cmyF"
                                }
                            }
                        ],
                        "disc_number": 1,
                        "duration_ms": 302053,
                        "explicit": false,
                        "external_urls": {
                            "spotify": "https://open.spotify.com/track/1rLwx4a2IDwubjhQBsv6O6"
                        },
                        "href": "https://api.spotify.com/v1/tracks/1rLwx4a2IDwubjhQBsv6O6",
                        "id": "1rLwx4a2IDwubjhQBsv6O6",
                        "name": "Temperance",
                        "preview_url": "https://p.scdn.co/mp3-preview/ac70795c2a0a16496a07b8db4f9d328cff4b42e6?cid=e44e7b8278114c7db211c00ea273ac69",
                        "track_number": 8,
                        "uri": "spotify:track:1rLwx4a2IDwubjhQBsv6O6"
                    }
                },
                "preview": "https://p.scdn.co/mp3-preview/ac70795c2a0a16496a07b8db4f9d328cff4b42e6?cid=e44e7b8278114c7db211c00ea273ac69"
            },
            "position": 1,
            "socialLinks": "https://lis.tn/gGlnfK",
            "composers": "Unknown",
            "duration": 302053,
            "discNumber": 1,
            "isrc": "GBBET0702865",
            "lyrics": "0",
            "spotifyId": "1rLwx4a2IDwubjhQBsv6O6",
            "spotifyPreviewUrl": "https://p.scdn.co/mp3-preview/ac70795c2a0a16496a07b8db4f9d328cff4b42e6?cid=e44e7b8278114c7db211c00ea273ac69",
            "timeCode": "00:45",
            "albumSpotifyId": null,
            "explicit": false,
            "spotifyLink": "example",
            "createdAt": "2023-08-30T23:25:55.000Z",
            "updatedAt": "2023-08-30T23:29:22.000Z",
            "releaseId": 989,
            "bapId": 1816,
            "featureArtists": null,
            "evearaTrackId": null,
            "evearaPriceId": null,
            "evearaPreviewDuration": null,
            "featureArtists": [],
            "trackFull": "a177eb8e-8c3f-4a9a-baac-b5cad6e63d96.mp3",
            "trackPreview": "cut_a177eb8e-8c3f-4a9a-baac-b5cad6e63d96.mp3"
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"tracks/tracks.router.js",groupTitle:"API_Track"},{type:"get",url:"/api/tracks/listen/mp3/:uniqueName",title:"Listen of track",name:"Get_Listen_of_track",group:"API_Track",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"string",optional:!1,field:"uniqueName",description:"<p><code>with format -&gt; .mp3 / .wav</code></p>"}]}},version:"0.0.0",filename:"tracks/tracks.router.js",groupTitle:"API_Track"},{type:"post",url:"/api/tracks/create/:releaseId",title:"Upload track to release",name:"Get_Upload_track_to_release",group:"API_Track",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"releaseId",description:""}]}},body:[{group:"Body",type:"string",optional:!1,field:"name",description:""},{group:"Body",type:"number",optional:!1,field:"position",description:""},{group:"Body",type:"number",optional:!1,field:"bapSpotifyId",description:""},{group:"Body",type:"files",optional:!1,field:"track",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
 {
    "success": true,
    "trackInfo": {
        "lyrics": false,
        "id": 2514,
        "releaseId": 982,
        "bapId": 1810,
        "name": "Love Tonight (Edit)",
        "originalName": "bd05111d-080d-455f-8ff4-9625ccda5ef2.flac",
        "uniqueName": "bd05111d-080d-455f-8ff4-9625ccda5ef2.mp3",
        "info": {
            "status": "success",
            "result": {
                "artist": "Shouse",
                "title": "Love Tonight (Edit)",
                "album": "Love Tonight",
                "release_date": "2017-12-14",
                "label": "Hell Beach",
                "timecode": "04:01",
                "song_link": "https://lis.tn/LoveTonightEdit",
                "apple_music": {
                    "previews": [
                        {
                            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/e4/ee/32/e4ee3277-f154-2d6a-8cb8-38c2fe36a15f/mzaf_17780636437467656123.plus.aac.p.m4a"
                        }
                    ],
                    "artwork": {
                        "width": 1400,
                        "height": 1400,
                        "url": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/bf/52/2d/bf522d83-2845-ed86-fd9c-e2ab7cbf429b/191515989932_Cover.jpg/{w}x{h}bb.jpg",
                        "bgColor": "351718",
                        "textColor1": "fcf006",
                        "textColor2": "e5ae97",
                        "textColor3": "d4c509",
                        "textColor4": "c2907e"
                    },
                    "artistName": "Shouse",
                    "url": "https://music.apple.com/us/album/love-tonight-edit/1320367566?app=music&at=1000l33QU&i=1320367588&mt=1",
                    "discNumber": 1,
                    "genreNames": [
                        "Electronic",
                        "Music"
                    ],
                    "durationInMillis": 241970,
                    "releaseDate": "2017-12-14",
                    "name": "Love Tonight (Edit)",
                    "isrc": "USQY51798087",
                    "albumName": "Love Tonight - Single",
                    "playParams": {
                        "id": "1320367588",
                        "kind": "song"
                    },
                    "trackNumber": 2,
                    "composerName": "Jack Madin & Edward Service"
                },
                "spotify": {
                    "album": {
                        "name": "Love Tonight",
                        "artists": [
                            {
                                "name": "Shouse",
                                "id": "2TcGJdSOiOvITBzhvfX8XB",
                                "uri": "spotify:artist:2TcGJdSOiOvITBzhvfX8XB",
                                "href": "https://api.spotify.com/v1/artists/2TcGJdSOiOvITBzhvfX8XB",
                                "external_urls": {
                                    "spotify": "https://open.spotify.com/artist/2TcGJdSOiOvITBzhvfX8XB"
                                }
                            }
                        ],
                        "album_group": "",
                        "album_type": "single",
                        "id": "5KXv2MHeoLSqZ96jRuFF9H",
                        "uri": "spotify:album:5KXv2MHeoLSqZ96jRuFF9H",
                        "href": "https://api.spotify.com/v1/albums/5KXv2MHeoLSqZ96jRuFF9H",
                        "images": [
                            {
                                "height": 640,
                                "width": 640,
                                "url": "https://i.scdn.co/image/ab67616d0000b27381376e47003d45f6513b5657"
                            },
                            {
                                "height": 300,
                                "width": 300,
                                "url": "https://i.scdn.co/image/ab67616d00001e0281376e47003d45f6513b5657"
                            },
                            {
                                "height": 64,
                                "width": 64,
                                "url": "https://i.scdn.co/image/ab67616d0000485181376e47003d45f6513b5657"
                            }
                        ],
                        "external_urls": {
                            "spotify": "https://open.spotify.com/album/5KXv2MHeoLSqZ96jRuFF9H"
                        },
                        "release_date": "2017-12-14",
                        "release_date_precision": "day"
                    },
                    "external_ids": {
                        "isrc": "USQY51798087"
                    },
                    "popularity": 76,
                    "is_playable": null,
                    "linked_from": null,
                    "artists": [
                        {
                            "name": "Shouse",
                            "id": "2TcGJdSOiOvITBzhvfX8XB",
                            "uri": "spotify:artist:2TcGJdSOiOvITBzhvfX8XB",
                            "href": "https://api.spotify.com/v1/artists/2TcGJdSOiOvITBzhvfX8XB",
                            "external_urls": {
                                "spotify": "https://open.spotify.com/artist/2TcGJdSOiOvITBzhvfX8XB"
                            }
                        }
                    ],
                    "disc_number": 1,
                    "duration_ms": 241970,
                    "explicit": false,
                    "external_urls": {
                        "spotify": "https://open.spotify.com/track/6OufwUcCqo81guU2jAlDVP"
                    },
                    "href": "https://api.spotify.com/v1/tracks/6OufwUcCqo81guU2jAlDVP",
                    "id": "6OufwUcCqo81guU2jAlDVP",
                    "name": "Love Tonight (Edit)",
                    "preview_url": "https://p.scdn.co/mp3-preview/7d9ec9cde591eb2ac749710539a3a49d9f4ed30e?cid=e44e7b8278114c7db211c00ea273ac69",
                    "track_number": 2,
                    "uri": "spotify:track:6OufwUcCqo81guU2jAlDVP"
                }
            },
            "preview": "cut_bd05111d-080d-455f-8ff4-9625ccda5ef2.mp3",
            "full": "bd05111d-080d-455f-8ff4-9625ccda5ef2.mp3"
        },
        "socialLinks": "https://lis.tn/LoveTonightEdit",
        "composers": "Jack Madin, Edward Service",
        "duration": 241970,
        "discNumber": 1,
        "isrc": "USQY51798087",
        "spotifyId": "6OufwUcCqo81guU2jAlDVP",
        "spotifyPreviewUrl": "https://p.scdn.co/mp3-preview/7d9ec9cde591eb2ac749710539a3a49d9f4ed30e?cid=e44e7b8278114c7db211c00ea273ac69",
        "timeCode": "04:01",
        "albumSpotifyId": "5KXv2MHeoLSqZ96jRuFF9H",
        "explicit": false,
        "updatedAt": "2023-09-01T11:52:18.145Z",
        "createdAt": "2023-09-01T11:52:18.145Z"
    }
}`,type:"json"}]},version:"0.0.0",filename:"tracks/tracks.router.js",groupTitle:"API_Track"},{type:"post",url:"/api/tracks/split/:splitId",title:"Add track to split",name:"Post_Add_track_to_split",group:"API_Track",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"number",optional:!1,field:"splitId",description:""}]},examples:[{title:"Request-Example:",content:`{
  "trackIds": [1, 2, 3, 4]
}`,type:"json"}]},body:[{group:"Body",type:"number",optional:!1,field:"trackIds",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
 {
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"tracks/tracks.router.js",groupTitle:"API_Track"},{type:"put",url:"/api/tracks/settings",title:"Edit settings of track",name:"Post_Edit_settings_of_track",group:"API_Track",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},query:[{group:"Query",type:"string",optional:!1,field:"uniqueName",description:"<p><code>with format -&gt; .mp3 / .wav</code></p>"}],body:[{group:"Body",type:"string",optional:!1,field:"name",description:""},{group:"Body",type:"string",optional:!1,field:"type",description:"<p><code>&quot;&quot; or null to set null</code></p>"},{group:"Body",type:"number",optional:!1,field:"position",description:""},{group:"Body",type:"string",optional:!0,field:"socialLinks",description:"<p><code>&quot;&quot; or null to set null</code></p>"},{group:"Body",type:"string",optional:!0,field:"composers",description:"<p><code>&quot;&quot; or null to set null</code></p>"},{group:"Body",type:"number",optional:!0,field:"duration",description:""},{group:"Body",type:"string",optional:!0,field:"isrc",description:""},{group:"Body",type:"string",optional:!0,field:"lyrics",description:""},{group:"Body",type:"boolean",optional:!0,field:"explicit",description:"<p><code>Example: true/false</code></p>",checked:!1},{group:"Body",type:"number",optional:!0,field:"appleMusicDiscNumber",description:""},{group:"Body",type:"string",optional:!0,field:"spotifyId",description:""},{group:"Body",type:"string",optional:!0,field:"spotifyPreviewUrl",description:"<p><code>&quot;&quot; or null to set null</code></p>"},{group:"Body",type:"string",optional:!0,field:"timeCode",description:"<p><code>Example: 00:19, &quot;&quot; or null to set null</code></p>"},{group:"Body",type:"string",optional:!0,field:"albumSpotifyId",description:"<p><code>albumSpotifyId same values as releaseSpotifyId</code></p>"},{group:"Body",type:"string",optional:!0,field:"spotifyLink",description:""},{group:"Body",type:"number",optional:!0,field:"evearaPreviewDuration",description:"<p><code>default 15</code></p>"},{group:"Body",type:"number",optional:!0,field:"evearaPreviewStartAt",description:"<p><code>default 15</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "tracks": {
        "id": 23,
        "name": "sdfsdfszfsfsf",
        "uniqueName": "53745fd5-b8f5-4a2b-ba37-24cb91c8a894.mp3",
        "type": null,
        "price": "0.000",
        "position": 1,
        "createdAt": "2023-03-14T08:42:26.000Z",
        "updatedAt": "2023-03-14T11:51:02.558Z",
        "releaseId": 1
    }
}`,type:"json"}]},version:"0.0.0",filename:"tracks/tracks.router.js",groupTitle:"API_Track"},{type:"post",url:"/api/tracks/release/platforms",title:"Get data from platforms by preview url",name:"Post_Get_data_from_platforms_by_preview_url",group:"API_Track",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},body:[{group:"Body",type:"string",optional:!1,field:"previewUrl",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    status: 'success',
    result: {
        artist: 'Imagine Dragons',
        title: 'Smoke And Mirrors',
        album: 'Smoke + Mirrors',
        release_date: '2015-10-30',
        label: 'Kid Ina Korner / Interscope',
        timecode: '00:19',
        song_link: 'https://lis.tn/jEYODY',
        apple_music: {
            previews: [Array],
            artwork: [Object],
            artistName: 'Imagine Dragons',
            url: 'https://music.apple.com/us/album/smoke-and-mirrors/1440831203?app=music&at=1000l33QU&i=1440831214&mt=1',
            discNumber: 1,
            genreNames: [Array],
            durationInMillis: 260907,
            releaseDate: '2014-09-18',
            name: 'Smoke and Mirrors',
            isrc: 'USUM71417930',
            albumName: 'Smoke + Mirrors (Deluxe)',
            playParams: [Object],
            trackNumber: 3,
            composerName: 'Dan Reynolds, Wayne Sermon, Ben McKee & Daniel Platzman'
        },
    }
}`,type:"json"}]},version:"0.0.0",filename:"tracks/tracks.router.js",groupTitle:"API_Track"},{type:"put",url:"/api/tracks/release/audd",title:"Get info by track from Audd",name:"Post_Get_info_by_track_from_Audd",group:"API_Track",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},body:[{group:"Body",type:"files",optional:!1,field:"track",description:""}],query:[{group:"Query",type:"string",optional:!1,field:"uniqueName",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    status: 'success',
    result: {
        artist: 'Imagine Dragons',
        title: 'Smoke And Mirrors',
        album: 'Smoke + Mirrors',
        release_date: '2015-10-30',
        label: 'Kid Ina Korner / Interscope',
        timecode: '00:19',
        song_link: 'https://lis.tn/jEYODY',
        apple_music: {
            previews: [Array],
            artwork: [Object],
            artistName: 'Imagine Dragons',
            url: 'https://music.apple.com/us/album/smoke-and-mirrors/1440831203?app=music&at=1000l33QU&i=1440831214&mt=1',
            discNumber: 1,
            genreNames: [Array],
            durationInMillis: 260907,
            releaseDate: '2014-09-18',
            name: 'Smoke and Mirrors',
            isrc: 'USUM71417930',
            albumName: 'Smoke + Mirrors (Deluxe)',
            playParams: [Object],
            trackNumber: 3,
            composerName: 'Dan Reynolds, Wayne Sermon, Ben McKee & Daniel Platzman'
        },
        deezer: {
            id: 94935176,
            readable: true,
            title: 'Smoke And Mirrors',
            title_short: 'Smoke And Mirrors',
            title_version: '',
            isrc: 'USUM71417930',
            link: 'https://www.deezer.com/track/94935176',
            share: 'https://www.deezer.com/track/94935176?utm_source=deezer&utm_content=track-94935176&utm_term=0_1692130309&utm_medium=web',
            duration: 260,
            track_position: 3,
            disk_number: 1,
            rank: 289022,
            release_date: '2015-02-17',
            explicit_lyrics: false,
            explicit_content_lyrics: 0,
            explicit_content_cover: 0,
            preview: 'https://cdns-preview-c.dzcdn.net/stream/c-c263c8223fafa42cd17bf29727050e7c-13.mp3',
            bpm: 110,
            gain: -8.4,
            contributors: [Array],
            md5_image: 'f778ecc964c57c30c082444c22bf3264',
            artist: [Object],
            album: [Object],
            type: 'track'
        },
        spotify: {
            album: [Object],
            external_ids: [Object],
            popularity: 48,
            is_playable: null,
            linked_from: null,
            artists: [Array],
            disc_number: 1,
            duration_ms: 260906,
            explicit: false,
            external_urls: [Object],
            href: 'https://api.spotify.com/v1/tracks/6Aiu4fCAEzvXpjmy1HsJxM',
            id: '6Aiu4fCAEzvXpjmy1HsJxM',
            name: 'Smoke And Mirrors',
            preview_url: '',
            track_number: 3,
            uri: 'spotify:track:6Aiu4fCAEzvXpjmy1HsJxM'
        }
    }
}`,type:"json"}]},version:"0.0.0",filename:"tracks/tracks.router.js",groupTitle:"API_Track"},{type:"post",url:"/api/tracks/create",title:"Upload track and create release",name:"Post_Upload_track_and_create_release",group:"API_Track",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},body:[{group:"Body",type:"string",optional:!1,field:"name",description:""},{group:"Body",type:"number",optional:!1,field:"position",description:""},{group:"Body",type:"string",optional:!1,field:"bapSpotifyId",description:""},{group:"Body",type:"number",optional:!1,field:"bapId",description:""},{group:"Body",type:"files",optional:!1,field:"track",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "trackInfo": {
        "lyrics": false,
        "id": 2513,
        "releaseId": 997,
        "bapId": 1810,
        "name": "Love Tonight (Edit)",
        "originalName": "fe1f9310-ae9c-4e3b-9ab2-07caf57e7c3d.flac",
        "uniqueName": "fe1f9310-ae9c-4e3b-9ab2-07caf57e7c3d.mp3",
        "info": {
            "status": "success",
            "result": {
                "artist": "Shouse",
                "title": "Love Tonight (Edit)",
                "album": "Love Tonight",
                "release_date": "2017-12-14",
                "label": "Hell Beach",
                "timecode": "04:01",
                "song_link": "https://lis.tn/LoveTonightEdit",
                "apple_music": {
                    "previews": [
                        {
                            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/e4/ee/32/e4ee3277-f154-2d6a-8cb8-38c2fe36a15f/mzaf_17780636437467656123.plus.aac.p.m4a"
                        }
                    ],
                    "artwork": {
                        "width": 1400,
                        "height": 1400,
                        "url": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/bf/52/2d/bf522d83-2845-ed86-fd9c-e2ab7cbf429b/191515989932_Cover.jpg/{w}x{h}bb.jpg",
                        "bgColor": "351718",
                        "textColor1": "fcf006",
                        "textColor2": "e5ae97",
                        "textColor3": "d4c509",
                        "textColor4": "c2907e"
                    },
                    "artistName": "Shouse",
                    "url": "https://music.apple.com/us/album/love-tonight-edit/1320367566?app=music&at=1000l33QU&i=1320367588&mt=1",
                    "discNumber": 1,
                    "genreNames": [
                        "Electronic",
                        "Music"
                    ],
                    "durationInMillis": 241970,
                    "releaseDate": "2017-12-14",
                    "name": "Love Tonight (Edit)",
                    "isrc": "USQY51798087",
                    "albumName": "Love Tonight - Single",
                    "playParams": {
                        "id": "1320367588",
                        "kind": "song"
                    },
                    "trackNumber": 2,
                    "composerName": "Jack Madin & Edward Service"
                },
                "spotify": {
                    "album": {
                        "name": "Love Tonight",
                        "artists": [
                            {
                                "name": "Shouse",
                                "id": "2TcGJdSOiOvITBzhvfX8XB",
                                "uri": "spotify:artist:2TcGJdSOiOvITBzhvfX8XB",
                                "href": "https://api.spotify.com/v1/artists/2TcGJdSOiOvITBzhvfX8XB",
                                "external_urls": {
                                    "spotify": "https://open.spotify.com/artist/2TcGJdSOiOvITBzhvfX8XB"
                                }
                            }
                        ],
                        "album_group": "",
                        "album_type": "single",
                        "id": "5KXv2MHeoLSqZ96jRuFF9H",
                        "uri": "spotify:album:5KXv2MHeoLSqZ96jRuFF9H",
                        "href": "https://api.spotify.com/v1/albums/5KXv2MHeoLSqZ96jRuFF9H",
                        "images": [
                            {
                                "height": 640,
                                "width": 640,
                                "url": "https://i.scdn.co/image/ab67616d0000b27381376e47003d45f6513b5657"
                            },
                            {
                                "height": 300,
                                "width": 300,
                                "url": "https://i.scdn.co/image/ab67616d00001e0281376e47003d45f6513b5657"
                            },
                            {
                                "height": 64,
                                "width": 64,
                                "url": "https://i.scdn.co/image/ab67616d0000485181376e47003d45f6513b5657"
                            }
                        ],
                        "external_urls": {
                            "spotify": "https://open.spotify.com/album/5KXv2MHeoLSqZ96jRuFF9H"
                        },
                        "release_date": "2017-12-14",
                        "release_date_precision": "day"
                    },
                    "external_ids": {
                        "isrc": "USQY51798087"
                    },
                    "popularity": 76,
                    "is_playable": null,
                    "linked_from": null,
                    "artists": [
                        {
                            "name": "Shouse",
                            "id": "2TcGJdSOiOvITBzhvfX8XB",
                            "uri": "spotify:artist:2TcGJdSOiOvITBzhvfX8XB",
                            "href": "https://api.spotify.com/v1/artists/2TcGJdSOiOvITBzhvfX8XB",
                            "external_urls": {
                                "spotify": "https://open.spotify.com/artist/2TcGJdSOiOvITBzhvfX8XB"
                            }
                        }
                    ],
                    "disc_number": 1,
                    "duration_ms": 241970,
                    "explicit": false,
                    "external_urls": {
                        "spotify": "https://open.spotify.com/track/6OufwUcCqo81guU2jAlDVP"
                    },
                    "href": "https://api.spotify.com/v1/tracks/6OufwUcCqo81guU2jAlDVP",
                    "id": "6OufwUcCqo81guU2jAlDVP",
                    "name": "Love Tonight (Edit)",
                    "preview_url": "https://p.scdn.co/mp3-preview/7d9ec9cde591eb2ac749710539a3a49d9f4ed30e?cid=e44e7b8278114c7db211c00ea273ac69",
                    "track_number": 2,
                    "uri": "spotify:track:6OufwUcCqo81guU2jAlDVP"
                }
            },
            "preview": "cut_fe1f9310-ae9c-4e3b-9ab2-07caf57e7c3d.mp3",
            "full": "fe1f9310-ae9c-4e3b-9ab2-07caf57e7c3d.mp3"
        },
        "socialLinks": "https://lis.tn/LoveTonightEdit",
        "composers": "Jack Madin, Edward Service",
        "duration": 241970,
        "discNumber": 1,
        "isrc": "USQY51798087",
        "spotifyId": "6OufwUcCqo81guU2jAlDVP",
        "spotifyPreviewUrl": "https://p.scdn.co/mp3-preview/7d9ec9cde591eb2ac749710539a3a49d9f4ed30e?cid=e44e7b8278114c7db211c00ea273ac69",
        "timeCode": "04:01",
        "albumSpotifyId": "5KXv2MHeoLSqZ96jRuFF9H",
        "explicit": false,
        "updatedAt": "2023-09-01T11:30:57.628Z",
        "createdAt": "2023-09-01T11:30:57.628Z"
    },
    "releaseInfo": {
        "mainGenreId": null,
        "secondaryGenreId": null,
        "releasesStatus": "ACTIVE",
        "releasePrice": 0,
        "subGenresIds": null,
        "id": 997,
        "name": "Love Tonight (Edit)",
        "releaseSpotifyId": "5KXv2MHeoLSqZ96jRuFF9H",
        "releaseDate": "2017-12-14T00:00:00.000Z",
        "label": "Hell Beach",
        "spotifyUri": "spotify:album:5KXv2MHeoLSqZ96jRuFF9H",
        "totalTracks": 2,
        "upc": "191515989932",
        "copyrights": [
            {
                "text": "\xA9 2017 Hell Beach",
                "type": "C"
            },
            {
                "text": "\u2117 2017 Hell Beach",
                "type": "P"
            }
        ],
        "isReleaseByOriginalAudio": true,
        "logo": "cecfe3c2-6e52-4ab5-988a-ece8e9942bf0.jpg",
        "thumbnail": "thumb_cecfe3c2-6e52-4ab5-988a-ece8e9942bf0.jpg",
        "bapId": "1810",
        "updatedAt": "2023-09-01T11:30:57.210Z",
        "createdAt": "2023-09-01T11:30:57.210Z",
        "additionalInfo": {
            "albumType": "single",
            "albumGenres": [
                "Electronic",
                "Music"
            ]
        }
    }
}`,type:"json"}]},version:"0.0.0",filename:"tracks/tracks.router.js",groupTitle:"API_Track"},{type:"put",url:"/api/tracks/many",title:"Edit settings many tracks",name:"Put_Edit_settings_many_tracks",group:"API_Track",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{examples:[{title:"Request-Example:",content:`{
    "53745fd5-b8f5-4a2b-ba37-24cb91c8a894.mp3": {
        "price": 1234,
        "position": 1
    },
    "a2c7b316-4675-4fa4-8d88-7ef88eed8cdc.mp3": {
        "price": 1234,
        "position": 2
    }
}
}`,type:"json"}]},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"tracks/tracks.router.js",groupTitle:"API_Track"},{type:"delete",url:"/api/users/:userId",title:"Delete user by id as admin",name:"Delete_Delete_user_by_id_as_admin",group:"API_User",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"string",optional:!1,field:"userId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"users/users.router.js",groupTitle:"API_User"},{type:"get",url:"/api/users/activateNewEmail/",title:"Activate a new email for user",name:"Get_Activate_a_new_email_for_user",group:"API_User",query:[{group:"Query",type:"string",optional:!1,field:"token",description:"<p><code>activateToken from email</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
}`,type:"json"}]},version:"0.0.0",filename:"users/users.router.js",groupTitle:"API_User"},{type:"get",url:"/api/users/all",title:"Admin Get all users",name:"Get_Admin_Get_all_users",group:"API_User",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},query:[{group:"Query",type:"string",optional:!1,field:"orderBy",description:"<p><code>Example: &quot;id&quot;, &quot;firstName&quot;, &quot;lastName&quot;, &quot;email&quot;, &quot;accountStatus&quot;, &quot;signIn&quot;</code></p>"},{group:"Query",type:"string",optional:!1,field:"sortOrder",description:"<p><code>Example: &quot;ASC&quot;, &quot;DESC&quot;</code></p>"},{group:"Query",type:"string",optional:!1,field:"role",description:""},{group:"Query",type:"string",optional:!1,field:"performers",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "users": [
        {
            "id": 1,
            "firstName": "ssfdsf",
            "lastName": "sdfsdf",
            "email": "ssfdsf@sf.sdf",
            "address": null,
            "phone": null,
            "provider": "email",
            "avatar": null,
            "isEmailConfirmed": 0,
            "password": "$2b$10$8jdzfYQDtTCryvjpWA7qTOvYvcobr.o.gJ2N/506x3.m6q81dgokm",
            "createdAt": "2023-03-03T09:04:07.000Z",
            "updatedAt": "2023-03-03T09:04:07.000Z",
            "baps": [
                {
                    "bapId": 1873,
                    "bapName": "bap",
                    "avatar": null,
                    "role": admin
                }
            ],
            "token": {
                "lastSignIn": "2023-10-09T11:47:35.000Z"
            }
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"users/users.router.js",groupTitle:"API_User"},{type:"get",url:"/api/users/",title:"Get users by query params",name:"Get_Get_users_by_query_params",group:"API_User",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},query:[{group:"Query",type:"string",optional:!1,field:"search",description:"<p><code>your email, firstName, lastName or name(firstName or lastName)</code></p>"},{group:"Query",type:"string",optional:!1,field:"type",description:"<p><code>&quot;email&quot;, &quot;firstName&quot;, &quot;lastName&quot; or &quot;name&quot; - search by both first and last name</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "users": [
        {
            "id": 1,
            "firstName": "ssfdsf",
            "lastName": "sdfsdf",
            "email": "ssfdsf@sf.sdf",
            "address": null,
            "phone": null,
            "provider": "email",
            "avatar": null,
            "isEmailConfirmed": 0,
            "password": "$2b$10$8jdzfYQDtTCryvjpWA7qTOvYvcobr.o.gJ2N/506x3.m6q81dgokm",
            "number": "5151528",
            "streetAddressOne": "streetAddressOne",
            "streetAddressTwo": "streetAddressTwo",
            "city": "Kyiv",
            "regionState": "Region/State",
            "postCodeZipCode": "Post Code/Zip Code",
            "country": "Ukraine",
            "createdAt": "2023-03-03T09:04:07.000Z",
            "updatedAt": "2023-03-03T09:04:07.000Z",
            "thumbnail": "thumb_24540144-3c9d-44f9-b922-85498c639de1.jpg"
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"users/users.router.js",groupTitle:"API_User"},{type:"get",url:"/api/users/:userId",title:"Get users by userId as admin",name:"Get_Get_users_by_userId_as_admin",group:"API_User",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"string",optional:!1,field:"userId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
 {
    "success": true,
    "user": {
        "id": 105,
        "firstName": "testName111",
        "lastName": "testName",
        "email": "aaa111@gmail.com",
        "avatar": "2669d0ba-7b25-4391-b8ad-4393f4a256d5.jpg",
        "address": "DFDS, \xD6rnekulans V\xE4g, K\xE4rrdalen, Hisingen, Gothenburg, G\xF6teborgs Stad, V\xE4stra G\xF6taland County, 423 59, Sweden",
        "phone": "380637020793",
        "paymentEmail": null,
        "isSubscribedOnMailing": null,
        "accountStatus": "ACTIVE",
        "thumbnail": null,
        "totalAuddRequests": 6,
        "totalWeightTracks": 123,
        "totalInvites": 1,
        "createdAt": "2023-03-13T19:42:26.000Z",
        "updatedAt": "2023-03-14T14:39:18.000Z",
        "baps": [
            {
                "id": 92,
                "name": "fdf",
                "avatar": "3eb49679-8100-43d2-ba22-9d8935d1a953.jpg",
                "role": null
            }
        ],
        "token": {
            "lastSignIn": "2023-10-09T13:32:18.000Z"
        },
        "incomeFees": 886.69
    }
}`,type:"json"}]},version:"0.0.0",filename:"users/users.router.js",groupTitle:"API_User"},{type:"Get",url:"/api/auth/activate/",title:"User activate account",name:"Get_User_activate_account",group:"API_User",query:[{group:"Query",type:"string",optional:!1,field:"token",description:"<p><code>activateToken from singUp</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
}`,type:"json"}]},version:"0.0.0",filename:"auth/auth.router.js",groupTitle:"API_User"},{type:"post",url:"/api/auth/admin/signin/",title:"Admin signIn",name:"Post_Admin_signIn",group:"API_User",body:[{group:"Body",type:"String",optional:!1,field:"email",description:""},{group:"Body",type:"String",optional:!1,field:"password",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTM2LCJlbWFpbCI6Ijg2OTU2ODY2M0BtYWlsLmNvbSIsImZpcnN0TmFtZSI6Ik1lbGxpZSIsImxhc3ROYW1lIjoiSHlhdHQiLCJpc0VtYWlsQ29uZmlybWVkIjp0cnVlLCJpYXQiOjE2ODA4NzIzNDEsImV4cCI6MTY4MzQ2NDM0MX0.IaR0LB_5ti2ls99TlyA-JCvDzkqvUo4HzKtN_SCawIY",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTM2LCJlbWFpbCI6Ijg2OTU2ODY2M0BtYWlsLmNvbSIsImZpcnN0TmFtZSI6Ik1lbGxpZSIsImxhc3ROYW1lIjoiSHlhdHQiLCJpc0VtYWlsQ29uZmlybWVkIjp0cnVlLCJpYXQiOjE2ODA4NzIzNDEsImV4cCI6MTY4MzQ2NDM0MX0.29ArCHqPoBOBYl9vFuJFw06yfyIlUnDJnccJfzl5HJ4",
    "user": {
        "id": 536,
        "firstName": "Mellie",
        "lastName": "Hyatt",
        "email": "869568663@mail.com",
        "provider": "email",
        "avatar": null,
        "address": null,
        "phone": null,
        "password": "$2b$10$mILU77JsA/itBgrJSgyKlOMGbdQNXbQWv9.NliugDmKTaAhu/YtzS",
        "isEmailConfirmed": true,
        "createdAt": "2023-04-07T12:55:23.000Z",
        "updatedAt": "2023-04-07T12:58:58.000Z"
    }
}`,type:"json"}]},version:"0.0.0",filename:"auth/auth.router.js",groupTitle:"API_User"},{type:"post",url:"/api/users/ban/:userId",title:"Ban user by id as admin",name:"Post_Ban_user_by_id_as_admin",group:"API_User",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"string",optional:!1,field:"userId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"users/users.router.js",groupTitle:"API_User"},{type:"post",url:"/api/users/",title:"Get users info by ids",name:"Post_Get_users_info_by_ids",group:"API_User",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},body:[{group:"Body",type:"array",optional:!1,field:"userIds",description:"<p><code>array of numbers</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "users": [
        {
            "id": 1,
            "firstName": "ssfdsf",
            "lastName": "sdfsdf",
            "email": "ssfdsf@sf.sdf",
            "address": null,
            "phone": null,
            "provider": "email",
            "avatar": null,
            "isEmailConfirmed": 0,
            "password": "$2b$10$8jdzfYQDtTCryvjpWA7qTOvYvcobr.o.gJ2N/506x3.m6q81dgokm",
            "number": "5151528",
            "streetAddressOne": "streetAddressOne",
            "streetAddressTwo": "streetAddressTwo",
            "city": "Kyiv",
            "regionState": "Region/State",
            "postCodeZipCode": "Post Code/Zip Code",
            "country": "Ukraine",
            "createdAt": "2023-03-03T09:04:07.000Z",
            "updatedAt": "2023-03-03T09:04:07.000Z",
            "thumbnail": "thumb_24540144-3c9d-44f9-b922-85498c639de1.jpg"
        }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"users/users.router.js",groupTitle:"API_User"},{type:"post",url:"/api/auth/social/",title:"Sign with social",name:"Post_Sign_with_social",group:"API_User",query:[{group:"Query",type:"String",optional:!0,field:"token",description:"<p><code>unique token for accept invite</code></p>"}],body:[{group:"Body",type:"String",optional:!1,field:"email",description:""},{group:"Body",type:"String",optional:!1,field:"firstName",description:""},{group:"Body",type:"String",optional:!1,field:"authToken",description:""},{group:"Body",type:"String",optional:!0,field:"lastName",description:""},{group:"Body",type:"String",optional:!0,field:"urlAvatar",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzAxLCJlbWFpbCI6InJleG9uaTM5MzhAcGl4aWlsLmNvbSIsImZpcnN0TmFtZSI6InNzaCIsImlzRW1haWxDb25maXJtZWQiOmZhbHNlLCJpYXQiOjE2ODI2NzEyNDksImV4cCI6MTY4NTI2MzI0OX0.mgSpwziMJmDHBYlrXvYl_8sbTF-q6H6KI4zJVL_U1_8",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzAxLCJlbWFpbCI6InJleG9uaTM5MzhAcGl4aWlsLmNvbSIsImZpcnN0TmFtZSI6InNzaCIsImlzRW1haWxDb25maXJtZWQiOmZhbHNlLCJpYXQiOjE2ODI2NzEyNDksImV4cCI6MTY4NTI2MzI0OX0.7SOh0aW-2vF1RKXCIXe3qOc9cV8rIoGvEE1WMkd9eO0",
    "user": {
        "provider": "email",
        "isEmailConfirmed": false,
        "id": 701,
        "firstName": "ssh",
        "email": "rexoni3938@pixiil.com",
        "password": "$2b$10$lQCDRFpgkTag2IxEHNypouz8/e0zPC.MohiJkAZXrj96OOo4Ojj3K",
        "updatedAt": "2023-04-28T08:40:49.364Z",
        "createdAt": "2023-04-28T08:40:49.364Z"
    }
}`,type:"json"}]},version:"0.0.0",filename:"auth/auth.router.js",groupTitle:"API_User"},{type:"post",url:"/api/users/unban/:userId",title:"Unban user by id as admin",name:"Post_Unban_user_by_id_as_admin",group:"API_User",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"string",optional:!1,field:"userId",description:""}]}},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"users/users.router.js",groupTitle:"API_User"},{type:"post",url:"/api/auth/logout/",title:"User logout",name:"Post_User_logout",group:"API_User",header:{fields:{Cookies:[{group:"Cookies",type:"String",optional:!1,field:"refreshToken",description:"<p><code>JWT refreshToken token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJzbmFtZS5wYXJzZXIxMjNAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiMTIzIiwibGFzdE5hbWUiOiJxd2UiLCJpc0VtYWlsQ29uZmlybWVkIjp0cnVlLCJpYXQiOjE2Nzk5MTkyNTEsImV4cCI6MTY4MjUxMTI1MX0.z6Qy2hijV6PJ01Dt3kBcEuSp2SEApfkgRcM92-Kdy6A"
}`,type:"json"}]},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "message": "Logout successfully!"
}`,type:"json"}]},version:"0.0.0",filename:"auth/auth.router.js",groupTitle:"API_User"},{type:"get",url:"/api/auth/refresh/",title:"User refresh",name:"Post_User_refresh",group:"API_User",header:{fields:{Cookies:[{group:"Cookies",type:"String",optional:!1,field:"refreshToken",description:"<p><code>JWT refreshToken token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJzbmFtZS5wYXJzZXIxMjNAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiMTIzIiwibGFzdE5hbWUiOiJxd2UiLCJpc0VtYWlsQ29uZmlybWVkIjp0cnVlLCJpYXQiOjE2Nzk5MTkyNTEsImV4cCI6MTY4MjUxMTI1MX0.z6Qy2hijV6PJ01Dt3kBcEuSp2SEApfkgRcM92-Kdy6A"
}`,type:"json"}]},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "tokens": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJzbmFtZS5wYXJzZXIxMjNAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiZHNmZHMiLCJsYXN0TmFtZSI6InNkZnNkZiIsImlhdCI6MTY3ODQ0NjI4MiwiZXhwIjoxNjgxMDM4MjgyfQ.jj3Jrz0hIwznkpDCZ2jS_xY20WibMVTT9uDt5HvJTFg",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJzbmFtZS5wYXJzZXIxMjNAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiZHNmZHMiLCJsYXN0TmFtZSI6InNkZnNkZiIsImlhdCI6MTY3ODQ0NjI4MiwiZXhwIjoxNjgxMDM4MjgyfQ.LjEK8PD5zzXVdKFxAo4W2lqM4MJIiBPLBEfFf5zOD5c"
    }
}`,type:"json"}]},version:"0.0.0",filename:"auth/auth.router.js",groupTitle:"API_User"},{type:"post",url:"/api/auth/signin/",title:"User signIn",name:"Post_User_signIn",group:"API_User",body:[{group:"Body",type:"String",optional:!1,field:"email",description:""},{group:"Body",type:"String",optional:!1,field:"password",description:""}],query:[{group:"Query",type:"String",optional:!0,field:"token",description:"<p><code>unique token for accept invite</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTM2LCJlbWFpbCI6Ijg2OTU2ODY2M0BtYWlsLmNvbSIsImZpcnN0TmFtZSI6Ik1lbGxpZSIsImxhc3ROYW1lIjoiSHlhdHQiLCJpc0VtYWlsQ29uZmlybWVkIjp0cnVlLCJpYXQiOjE2ODA4NzIzNDEsImV4cCI6MTY4MzQ2NDM0MX0.IaR0LB_5ti2ls99TlyA-JCvDzkqvUo4HzKtN_SCawIY",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTM2LCJlbWFpbCI6Ijg2OTU2ODY2M0BtYWlsLmNvbSIsImZpcnN0TmFtZSI6Ik1lbGxpZSIsImxhc3ROYW1lIjoiSHlhdHQiLCJpc0VtYWlsQ29uZmlybWVkIjp0cnVlLCJpYXQiOjE2ODA4NzIzNDEsImV4cCI6MTY4MzQ2NDM0MX0.29ArCHqPoBOBYl9vFuJFw06yfyIlUnDJnccJfzl5HJ4",
    "user": {
        "id": 536,
        "firstName": "Mellie",
        "lastName": "Hyatt",
        "email": "869568663@mail.com",
        "provider": "email",
        "avatar": null,
        "address": null,
        "phone": null,
        "password": "$2b$10$mILU77JsA/itBgrJSgyKlOMGbdQNXbQWv9.NliugDmKTaAhu/YtzS",
        "isEmailConfirmed": true,
        "createdAt": "2023-04-07T12:55:23.000Z",
        "updatedAt": "2023-04-07T12:58:58.000Z"
    }
}`,type:"json"}]},version:"0.0.0",filename:"auth/auth.router.js",groupTitle:"API_User"},{type:"post",url:"/api/auth/signup/",title:"User signUp",name:"Post_User_signUp",group:"API_User",body:[{group:"Body",type:"String",optional:!1,field:"email",description:""},{group:"Body",type:"String",optional:!1,field:"firstName",description:""},{group:"Body",type:"String",optional:!1,field:"lastName",description:""},{group:"Body",type:"String",optional:!1,field:"password",description:""},{group:"Body",type:"String",optional:!0,field:"provider",description:"<p><code>The name of the service you are signUp with (Google, Facebook, Spotify). If email - not require</code></p>"}],query:[{group:"Query",type:"String",optional:!0,field:"token",description:"<p><code>unique token for accept invite</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "activateToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ijg2OTU2ODY2M0BtYWlsLmNvbSIsImlkIjo1MzYsImlhdCI6MTY4MDg3MjEyNCwiZXhwIjoxNjgzNDY0MTI0fQ.k3xY-IYA-ZnaiPinXTzeZC4yGjN9dwKqTtiMAM9Ha5M",
    "user": {
        "isEmailConfirmed": false,
        "id": 536,
        "firstName": "Mellie",
        "lastName": "Hyatt",
        "email": "869568663@mail.com",
        "password": "$2b$10$mILU77JsA/itBgrJSgyKlOMGbdQNXbQWv9.NliugDmKTaAhu/YtzS",
        "provider": "email",
        "updatedAt": "2023-04-07T12:55:23.639Z",
        "createdAt": "2023-04-07T12:55:23.639Z"
    }
}`,type:"json"}]},version:"0.0.0",filename:"auth/auth.router.js",groupTitle:"API_User"},{type:"put",url:"/api/users/settings/",title:"User edit settings account",name:"Put_User_edit_settings_account",group:"API_User",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},body:[{group:"Body",type:"String",optional:!0,field:"firstName",description:""},{group:"Body",type:"String",optional:!0,field:"lastName",description:""},{group:"Body",type:"String",optional:!0,field:"email",description:""},{group:"Body",type:"String",optional:!0,field:"address",description:""},{group:"Body",type:"String",optional:!0,field:"phone",description:""},{group:"Body",type:"String",optional:!0,field:"paymentEmail",description:"<p><code>&quot;&quot; - to set null</code></p>"},{group:"Body",type:"String",optional:!0,field:"number",description:""},{group:"Body",type:"String",optional:!0,field:"streetAddressOne",description:"<p><code>&quot;&quot; - to set null</code></p>"},{group:"Body",type:"String",optional:!0,field:"streetAddressTwo",description:"<p><code>&quot;&quot; - to set null</code></p>"},{group:"Body",type:"String",optional:!0,field:"city",description:"<p><code>&quot;&quot; - to set null</code></p>"},{group:"Body",type:"String",optional:!0,field:"regionState",description:"<p><code>&quot;&quot; - to set null</code></p>"},{group:"Body",type:"String",optional:!0,field:"postCodeZipCode",description:"<p><code>&quot;&quot; - to set null</code></p>"},{group:"Body",type:"String",optional:!0,field:"country",description:"<p><code>&quot;&quot; - to set null</code></p>"},{group:"Body",type:"String",optional:!0,field:"uuidEveara",description:""},{group:"Body",type:"Files",optional:!0,field:"avatar",description:""},{group:"Body",type:"boolean",optional:!0,field:"isNew",description:"",checked:!1}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "settings": {
        "id": 536,
        "firstName": "firstName785289710",
        "lastName": "lastName104584820",
        "email": "869568663@mail.com",
        "provider": "email",
        "avatar": null,
        "address": "address505231707",
        "phone": "515276",
        "password": "$2b$10$mILU77JsA/itBgrJSgyKlOMGbdQNXbQWv9.NliugDmKTaAhu/YtzS",
        "isEmailConfirmed": true,
        "thumbnail": "thumb_24540144-3c9d-44f9-b922-85498c639de1.jpg",
        "number": "5151528",
        "streetAddressOne": "streetAddressOne",
        "streetAddressTwo": "streetAddressTwo",
        "city": "Kyiv",
        "regionState": "Region/State",
        "postCodeZipCode": "Post Code/Zip Code",
        "country": "Ukraine",
        "createdAt": "2023-04-07T12:55:23.000Z",
        "updatedAt": "2023-04-07T13:02:33.053Z"
    }
}`,type:"json"}]},version:"0.0.0",filename:"users/users.router.js",groupTitle:"API_User"},{type:"put",url:"/api/users/newEmail/",title:"User set new email",name:"Put_User_set_new_email",group:"API_User",body:[{group:"Body",type:"String",optional:!1,field:"newEmail",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
 {
    "success": true,
    "user": {
        "id": 1156,
        "firstName": "Petro",
        "lastName": "Mosta",
        "email": "petromosta@gmail.com",
        "balance": "0.0000000000",
        "provider": "email",
        "avatar": null,
        "address": "sdafds",
        "phone": "15417083275",
        "password": "$2b$10$FhNVeWPMHFg26aMIWSU1SewrJHXJYCioF3i8L0BuBHna4kK1ECA5i",
        "isEmailConfirmed": true,
        "paymentEmail": "petromosta@gmail.com",
        "uuidEveara": "E1C0A422-CC11-39E2-40F11D4CEC98B685",
        "isSubscribedOnMailing": null,
        "accountStatus": "ACTIVE",
        "thumbnail": null,
        "newEmail": "waraba9253@nmaller.com",
        "createdAt": "2023-06-26T16:48:52.000Z",
        "updatedAt": "2023-07-26T09:34:24.000Z"
    }
}`,type:"json"}]},version:"0.0.0",filename:"users/users.router.js",groupTitle:"API_User"},{type:"put",url:"/api/users/newPassword/",title:"User set new password",name:"Put_User_set_new_password",group:"API_User",query:[{group:"Query",type:"String",optional:!1,field:"token",description:"<p><code>recovery token</code></p>"}],body:[{group:"Body",type:"String",optional:!1,field:"newPassword",description:""},{group:"Body",type:"String",optional:!1,field:"confirmPassword",description:""}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "user": {
        "id": 505,
        "firstName": "firstName525824425",
        "lastName": "lastName497435752",
        "email": "421738512@mail.com",
        "provider": "email",
        "avatar": "a1d427e8-8fae-4ebc-ad94-8fc2d557024f.jpg",
        "address": "address481438621",
        "phone": "650704028",
        "password": "$2b$10$wOmP3VF0HTNNjJFtXAKF/um0baQnLYfalptJcKRsTc58VJOwU/yH6",
        "isEmailConfirmed": true,
        "createdAt": "2023-04-03T15:23:52.000Z",
        "updatedAt": "2023-04-07T13:04:41.584Z"
    }
}`,type:"json"}]},version:"0.0.0",filename:"users/users.router.js",groupTitle:"API_User"},{type:"delete",url:"/api/users/",title:"Remove Account",name:"Remove_Account",group:"API_User",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"users/users.router.js",groupTitle:"API_User"},{type:"delete",url:"/api/users/avatar",title:"Remove avatar",name:"Remove_avatar",group:"API_User",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true
}`,type:"json"}]},version:"0.0.0",filename:"users/users.router.js",groupTitle:"API_User"},{type:"get",url:"/api/users/info/",title:"User info yourself",name:"User_info_yourself",group:"API_User",header:{fields:{Authorization:[{group:"Authorization",type:"String",optional:!1,field:"Authorization",description:"<p><code>JWT access token</code></p>"}]},examples:[{title:"Header-Example:",content:`{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
}`,type:"json"}]},success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "activateToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ijg2OTU2ODY2M0BtYWlsLmNvbSIsImlkIjo1MzYsImlhdCI6MTY4MDg3MjEyNCwiZXhwIjoxNjgzNDY0MTI0fQ.k3xY-IYA-ZnaiPinXTzeZC4yGjN9dwKqTtiMAM9Ha5M",
    "user": {
        "isEmailConfirmed": false,
        "id": 536,
        "firstName": "Mellie",
        "lastName": "Hyatt",
        "email": "869568663@mail.com",
        "password": "$2b$10$mILU77JsA/itBgrJSgyKlOMGbdQNXbQWv9.NliugDmKTaAhu/YtzS",
        "provider": "email",
        "thumbnail": "thumb_24540144-3c9d-44f9-b922-85498c639de1.jpg",
        "number": "5151528",
        "streetAddressOne": "streetAddressOne",
        "streetAddressTwo": "streetAddressTwo",
        "city": "Kyiv",
        "regionState": "Region/State",
        "postCodeZipCode": "Post Code/Zip Code",
        "country": "Ukraine",
        "updatedAt": "2023-04-07T12:55:23.639Z",
        "createdAt": "2023-04-07T12:55:23.639Z"
    }
}`,type:"json"}]},version:"0.0.0",filename:"users/users.router.js",groupTitle:"API_User"},{type:"put",url:"/api/withdrawals/",title:"Create withdrawals",name:"Create_withdrawals",group:"API_Withdrawals",body:[{group:"Body",type:"number",optional:!1,field:"amount",description:"<p><code>amount cash for withdrawal</code></p>"}],success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "withdraw": {
        "isReviewed": false,
        "isApproved": false,
        "id": 5,
        "userId": 4,
        "amount": 100,
        "paymentEmail": "werewrwerwerwer@sdfs.dfdsf",
        "updatedAt": "2023-06-22T13:18:05.218Z",
        "createdAt": "2023-06-22T13:18:05.218Z"
    }
}`,type:"json"}]},version:"0.0.0",filename:"withdrawals/withdrawals.router.js",groupTitle:"API_Withdrawals"},{type:"get",url:"/api/withdrawals/",title:"Get withdrawals",name:"Get_withdrawals",group:"API_Withdrawals",success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "withdraws": [
            {
                "id": 1,
                "amount": "10.000",
                "isReviewed": true,
                "isApproved": false,
                "paymentEmail": "sname.parser123@gmail.com",
                "createdAt": "2023-06-01T07:49:38.000Z",
                "updatedAt": "2023-06-01T07:49:38.000Z",
                "userId": 4,
            },
            {
                "id": 2,
                "amount": "10.000",
                "isReviewed": true,
                "isApproved": false,
                "paymentEmail": "sname.parser123@gmail.com",
                "createdAt": "2023-06-01T07:59:16.000Z",
                "updatedAt": "2023-06-01T07:59:16.000Z",
                "userId": 4,
            }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"withdrawals/withdrawals.router.js",groupTitle:"API_Withdrawals"},{type:"get",url:"/api/withdrawals/admin",title:"Get withdrawals as Admin",name:"Get_withdrawals_as_Admin",group:"API_Withdrawals",success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "withdraws": [
         {
                "id": 1,
                "amount": "10.000",
                "isReviewed": true,
                "isApproved": false,
                "paymentEmail": "sname.parser123@gmail.com",
                "createdAt": "2023-06-01T07:49:38.000Z",
                "updatedAt": "2023-06-01T07:49:38.000Z",
                "userId": 4,
                "firstName": "SASHA",
                "lastName": "qwe"
            },
            {
                "id": 2,
                "amount": "10.000",
                "isReviewed": true,
                "isApproved": false,
                "paymentEmail": "sname.parser123@gmail.com",
                "createdAt": "2023-06-01T07:59:16.000Z",
                "updatedAt": "2023-06-01T07:59:16.000Z",
                "userId": 4,
                "firstName": "SASHA",
                "lastName": "qwe"
            }
    ]
}`,type:"json"}]},version:"0.0.0",filename:"withdrawals/withdrawals.router.js",groupTitle:"API_Withdrawals"},{type:"Put",url:"/api/withdrawals/admin/:withdrawalId",title:"Update withdrawal as Admin",name:"Update_withdrawal_as_Admin",group:"API_Withdrawals",success:{fields:{"Success 200":[{group:"Success 200",type:"String",optional:!1,field:"JSON",description:""}]},examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
 }`,type:"json"}]},parameter:{fields:{Parameter:[{group:"Parameter",type:"string",optional:!1,field:"withdrawalId",description:""}]}},body:[{group:"Body",type:"string",optional:!0,field:"isReviewed",description:"<p><code>true/false</code></p>"},{group:"Body",type:"string",optional:!0,field:"isApproved",description:"<p><code>true/false</code></p>"}],version:"0.0.0",filename:"withdrawals/withdrawals.router.js",groupTitle:"API_Withdrawals"},{type:"get",url:"/api/analytics",title:"Get analytics",name:"Get_analytics",group:"API_analytics",query:[{group:"Query",type:"string",optional:!1,field:"trackId",description:""},{group:"Query",type:"string",optional:!1,field:"releaseId",description:""},{group:"Query",type:"string",optional:!1,field:"bapId",description:""},{group:"Query",type:"number",optional:!1,field:"date",description:""}],success:{examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "analytics": {
        "uniqueUserDownloads": 1,
        "totalDownloads": 2,
        "uniqueUserPurchase": 1,
        "totalPurchase": 2,
        "incomes": [
            {
                "id": 1395,
                "gross": "10.000",
                "fees": "1.0000",
                "net": "9.0000",
                "tips": 0,
                "paymentEmail": "sb-kq9mi26003566-1@personal.example.com",
                "createdAt": "2023-08-01T07:46:14.000Z",
                "updatedAt": "2023-08-01T07:46:14.000Z",
                "invoiceId": 0,
                "purchaseLocationId": 144,
                "contractId": null,
                "userId": 1254,
                "purchaseLocationTypeId": 1,
                "releaseId": 819,
                "bapId": 1720
            },
            {
                "id": 1450,
                "gross": "10.000",
                "fees": "1.0000",
                "net": "9.0000",
                "tips": 0,
                "paymentEmail": "sb-kq9mi26003566-1@personal.example.com",
                "createdAt": "2023-08-02T11:02:36.000Z",
                "updatedAt": "2023-08-02T11:02:36.000Z",
                "invoiceId": 0,
                "purchaseLocationId": 144,
                "contractId": null,
                "userId": 1254,
                "purchaseLocationTypeId": 1,
                "releaseId": 819,
                "bapId": 1720
            }
        ]
    }
}`,type:"json"}]},version:"0.0.0",filename:"analytics/analytics.router.js",groupTitle:"API_analytics"},{type:"get",url:"/api/analytics/google",title:"analytics from google",name:"Get_analytics_from_google",group:"API_analytics",query:[{group:"Query",type:"number",optional:!1,field:"date",description:""},{group:"Query",type:"string",optional:!1,field:"type",description:"<p><code>Example: all, landing, shop</code></p>"},{group:"Query",type:"string",optional:!1,field:"bapId",description:""}],success:{examples:[{title:"Success-Response:",content:`    HTTP/1.1 200 OK
{
    "success": true,
    "analytics": {
        "filteredOperatingSystemGoogleResponse": [
            {
                "dimensionValues": [
                    {
                        "value": "Windows",
                        "oneValue": "value"
                    },
                    {
                        "value": "/music/my",
                        "oneValue": "value"
                    },
                    {
                        "value": "1971",
                        "oneValue": "value"
                    }
                ],
                "metricValues": [
                    {
                        "value": "1",
                        "oneValue": "value"
                    }
                ]
            },
            {
                "dimensionValues": [
                    {
                        "value": "Windows",
                        "oneValue": "value"
                    },
                    {
                        "value": "/music/streamiiiiiiiiing",
                        "oneValue": "value"
                    },
                    {
                        "value": "1971",
                        "oneValue": "value"
                    }
                ],
                "metricValues": [
                    {
                        "value": "1",
                        "oneValue": "value"
                    }
                ]
            }
        ],
        "filteredPagePathGoogleResponse": [
            {
                "dimensionValues": [
                    {
                        "value": "/music/my",
                        "oneValue": "value"
                    },
                    {
                        "value": "1971",
                        "oneValue": "value"
                    }
                ],
                "metricValues": [
                    {
                        "value": "1",
                        "oneValue": "value"
                    }
                ]
            },
            {
                "dimensionValues": [
                    {
                        "value": "/music/shop/shop123/1249",
                        "oneValue": "value"
                    },
                    {
                        "value": "1971",
                        "oneValue": "value"
                    }
                ],
                "metricValues": [
                    {
                        "value": "1",
                        "oneValue": "value"
                    }
                ]
            }
        ],
        "filteredDeviceCategoryGoogleResponse": [
            {
                "dimensionValues": [
                    {
                        "value": "desktop",
                        "oneValue": "value"
                    },
                    {
                        "value": "/music/my",
                        "oneValue": "value"
                    },
                    {
                        "value": "1971",
                        "oneValue": "value"
                    }
                ],
                "metricValues": [
                    {
                        "value": "1",
                        "oneValue": "value"
                    }
                ]
            },
            {
                "dimensionValues": [
                    {
                        "value": "desktop",
                        "oneValue": "value"
                    },
                    {
                        "value": "/music/streamiiiiiiiiing",
                        "oneValue": "value"
                    },
                    {
                        "value": "1971",
                        "oneValue": "value"
                    }
                ],
                "metricValues": [
                    {
                        "value": "1",
                        "oneValue": "value"
                    }
                ]
            }
        ],
        "filteredCountryGoogleResponse": [
            {
                "dimensionValues": [
                    {
                        "value": "Ukraine",
                        "oneValue": "value"
                    },
                    {
                        "value": "/music/my",
                        "oneValue": "value"
                    },
                    {
                        "value": "1971",
                        "oneValue": "value"
                    }
                ],
                "metricValues": [
                    {
                        "value": "1",
                        "oneValue": "value"
                    }
                ]
            },
            {
                "dimensionValues": [
                    {
                        "value": "Ukraine",
                        "oneValue": "value"
                    },
                    {
                        "value": "/music/myyyyyyyyy",
                        "oneValue": "value"
                    },
                    {
                        "value": "1971",
                        "oneValue": "value"
                    }
                ],
                "metricValues": [
                    {
                        "value": "1",
                        "oneValue": "value"
                    }
                ]
            }
        ],
        "filteredEventsDataResponse": [
            {
                "dimensionValues": [
                    {
                        "value": "click",
                        "oneValue": "value"
                    },
                    {
                        "value": "/music/shop/shop123",
                        "oneValue": "value"
                    },
                    {
                        "value": "1971",
                        "oneValue": "value"
                    }
                ],
                "metricValues": [
                    {
                        "value": "24",
                        "oneValue": "value"
                    },
                    {
                        "value": "1",
                        "oneValue": "value"
                    }
                ]
            },
            {
                "dimensionValues": [
                    {
                        "value": "download",
                        "oneValue": "value"
                    },
                    {
                        "value": "/music/myyyyyyyyy",
                        "oneValue": "value"
                    },
                    {
                        "value": "1971",
                        "oneValue": "value"
                    }
                ],
                "metricValues": [
                    {
                        "value": "10",
                        "oneValue": "value"
                    },
                    {
                        "value": "1",
                        "oneValue": "value"
                    }
                ]
            },
            {
                "dimensionValues": [
                    {
                        "value": "streaming",
                        "oneValue": "value"
                    },
                    {
                        "value": "/music/streamiiing",
                        "oneValue": "value"
                    },
                    {
                        "value": "1971",
                        "oneValue": "value"
                    }
                ],
                "metricValues": [
                    {
                        "value": "6",
                        "oneValue": "value"
                    },
                    {
                        "value": "1",
                        "oneValue": "value"
                    }
                ]
            }
        ],
        "uniqueClicks": 5
    }
}`,type:"json"}]},version:"0.0.0",filename:"analytics/analytics.router.js",groupTitle:"API_analytics"}];const oe={name:"Acme project",version:"0.0.0",description:"REST Api",sampleUrl:!1,defaultVersion:"0.0.0",apidoc:"0.3.0",generator:{name:"apidoc",time:"Tue Dec 05 2023 11:59:37 GMT+0200 (\u0437\u0430 \u0441\u0445\u0456\u0434\u043D\u043E\u0454\u0432\u0440\u043E\u043F\u0435\u0439\u0441\u044C\u043A\u0438\u043C \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u0438\u043C \u0447\u0430\u0441\u043E\u043C)",url:"https://apidocjs.com",version:"0.54.0"}};Be();const _e=p().compile(y()("#template-header").html()),xe=p().compile(y()("#template-footer").html()),ae=p().compile(y()("#template-article").html()),ve=p().compile(y()("#template-compare-article").html()),pe=p().compile(y()("#template-generator").html()),Ee=p().compile(y()("#template-project").html()),De=p().compile(y()("#template-sections").html()),Le=p().compile(y()("#template-sidenav").html()),Qe={aloneDisplay:!1,showRequiredLabels:!1,withGenerator:!0,withCompare:!0};oe.template=Object.assign(Qe,(Ae=oe.template)!=null?Ae:{}),oe.template.forceLanguage&&Re(oe.template.forceLanguage);const Ye=(0,o.groupBy)(ze,ne=>ne.group),Ke={};y().each(Ye,(ne,$)=>{Ke[ne]=(0,o.groupBy)($,ce=>ce.name)});const rt=[];y().each(Ke,(ne,$)=>{let ce=[];y().each($,(le,ye)=>{const Oe=ye[0].title;Oe&&ce.push(Oe.toLowerCase()+"#~#"+le)}),ce.sort(),oe.order&&(ce=ie(ce,oe.order,"#~#")),ce.forEach(le=>{const Oe=le.split("#~#")[1];$[Oe].forEach(me=>{rt.push(me)})})}),ze=rt;let lt={};const Tt={};let Jt={};Jt[oe.version]=1,y().each(ze,(ne,$)=>{lt[$.group]=1,Tt[$.group]=$.groupTitle||$.group,Jt[$.version]=1}),lt=Object.keys(lt),lt.sort(),oe.order&&(lt=ge(Tt,oe.order)),Jt=Object.keys(Jt),Jt.sort(i().compare),Jt.reverse();const bt=[];lt.forEach(ne=>{bt.push({group:ne,isHeader:!0,title:Tt[ne]});let $="";ze.forEach(ce=>{ce.group===ne&&($!==ce.name?bt.push({title:ce.title,group:ne,name:ce.name,type:ce.type,version:ce.version,url:ce.url}):bt.push({title:ce.title,group:ne,hidden:!0,name:ce.name,type:ce.type,version:ce.version,url:ce.url}),$=ce.name)})});function sn(ne,$,ce){let le=!1;if(!$)return le;const ye=$.match(/<h(1|2).*?>(.+?)<\/h(1|2)>/gi);return ye&&ye.forEach(function(Oe){const me=Oe.substring(2,3),Je=Oe.replace(/<.+?>/g,""),ct=Oe.match(/id="api-([^-]+)(?:-(.+))?"/),st=ct?ct[1]:null,gt=ct?ct[2]:null;me==="1"&&Je&&st&&(ne.splice(ce,0,{group:st,isHeader:!0,title:Je,isFixed:!0}),ce++,le=!0),me==="2"&&Je&&st&&gt&&(ne.splice(ce,0,{group:st,name:gt,isHeader:!1,title:Je,isFixed:!1,version:"1.0"}),ce++)}),le}let Wt;if(oe.header&&(Wt=sn(bt,oe.header.content,0),Wt||bt.unshift({group:"_header",isHeader:!0,title:oe.header.title==null?be("General"):oe.header.title,isFixed:!0})),oe.footer){const ne=bt.length;Wt=sn(bt,oe.footer.content,bt.length),!Wt&&oe.footer.title!=null&&bt.splice(ne,0,{group:"_footer",isHeader:!0,title:oe.footer.title,isFixed:!0})}const fn=oe.title?oe.title:"apiDoc: "+oe.name+" - "+oe.version;y()(document).attr("title",fn),y()("#loader").remove();const Mn={nav:bt};y()("#sidenav").append(Le(Mn)),y()("#generator").append(pe(oe)),(0,o.extend)(oe,{versions:Jt}),y()("#project").append(Ee(oe)),oe.header&&y()("#header").append(_e(oe.header)),oe.footer&&(y()("#footer").append(xe(oe.footer)),oe.template.aloneDisplay&&document.getElementById("api-_footer").classList.add("hide"));const xt={};let On="";lt.forEach(function(ne){const $=[];let ce="",le={},ye=ne,Oe="";xt[ne]={},ze.forEach(function(me){ne===me.group&&(ce!==me.name?(ze.forEach(function(Je){ne===Je.group&&me.name===Je.name&&(Object.prototype.hasOwnProperty.call(xt[me.group],me.name)||(xt[me.group][me.name]=[]),xt[me.group][me.name].push(Je.version))}),le={article:me,versions:xt[me.group][me.name]}):le={article:me,hidden:!0,versions:xt[me.group][me.name]},oe.sampleUrl&&oe.sampleUrl===!0&&(oe.sampleUrl=window.location.origin),oe.url&&le.article.url.substr(0,4).toLowerCase()!=="http"&&(le.article.url=oe.url+le.article.url),H(le,me),me.groupTitle&&(ye=me.groupTitle),me.groupDescription&&(Oe=me.groupDescription),$.push({article:ae(le),group:me.group,name:me.name,aloneDisplay:oe.template.aloneDisplay}),ce=me.name)}),le={group:ne,title:ye,description:Oe,articles:$,aloneDisplay:oe.template.aloneDisplay},On+=De(le)}),y()("#sections").append(On),oe.template.aloneDisplay||(document.body.dataset.spy="scroll",y()("body").scrollspy({target:"#scrollingNav"})),y()(".form-control").on("focus change",function(){y()(this).removeClass("border-danger")}),y()(".sidenav").find("a").on("click",function(ne){ne.preventDefault();const $=this.getAttribute("href");if(oe.template.aloneDisplay){const ce=document.querySelector(".sidenav > li.active");ce&&ce.classList.remove("active"),this.parentNode.classList.add("active")}else{const ce=document.querySelector($);ce&&y()("html,body").animate({scrollTop:ce.offsetTop},400)}window.location.hash=$});function St(ne){let $=!1;return y().each(ne,ce=>{$=$||(0,o.some)(ne[ce],le=>le.type)}),$}function Gn(){y()('button[data-toggle="popover"]').popover().click(function($){$.preventDefault()});const ne=y()("#version strong").html();if(y()("#sidenav li").removeClass("is-new"),oe.template.withCompare&&y()("#sidenav li[data-version='"+ne+"']").each(function(){const $=y()(this).data("group"),ce=y()(this).data("name"),le=y()("#sidenav li[data-group='"+$+"'][data-name='"+ce+"']").length,ye=y()("#sidenav li[data-group='"+$+"'][data-name='"+ce+"']").index(y()(this));(le===1||ye===le-1)&&y()(this).addClass("is-new")}),y()(".nav-tabs-examples a").click(function($){$.preventDefault(),y()(this).tab("show")}),y()(".nav-tabs-examples").find("a:first").tab("show"),y()(".sample-request-content-type-switch").change(function(){y()(this).val()==="body-form-data"?(y()("#sample-request-body-json-input-"+y()(this).data("id")).hide(),y()("#sample-request-body-form-input-"+y()(this).data("id")).show()):(y()("#sample-request-body-form-input-"+y()(this).data("id")).hide(),y()("#sample-request-body-json-input-"+y()(this).data("id")).show())}),oe.template.aloneDisplay&&(y()(".show-group").click(function(){const $="."+y()(this).attr("data-group")+"-group",ce="."+y()(this).attr("data-group")+"-article";y()(".show-api-group").addClass("hide"),y()($).removeClass("hide"),y()(".show-api-article").addClass("hide"),y()(ce).removeClass("hide")}),y()(".show-api").click(function(){const $=this.getAttribute("href").substring(1),ce=document.getElementById("version").textContent.trim(),le=`.${this.dataset.name}-article`,ye=`[id="${$}-${ce}"]`,Oe=`.${this.dataset.group}-group`;y()(".show-api-group").addClass("hide"),y()(Oe).removeClass("hide"),y()(".show-api-article").addClass("hide");let me=y()(le);y()(ye).length&&(me=y()(ye).parent()),me.removeClass("hide"),$.match(/_(header|footer)/)&&document.getElementById($).classList.remove("hide")})),oe.template.aloneDisplay||y()("body").scrollspy("refresh"),oe.template.aloneDisplay){const $=decodeURI(window.location.hash);if($!=null&&$.length!==0){const ce=document.getElementById("version").textContent.trim(),le=document.querySelector(`li .${$.slice(1)}-init`),ye=document.querySelector(`li[data-version="${ce}"] .show-api.${$.slice(1)}-init`);let Oe=le;ye&&(Oe=ye),Oe.click()}}}function hn(ne){typeof ne=="undefined"?ne=y()("#version strong").html():y()("#version strong").html(ne),y()("article").addClass("hide"),y()("#sidenav li:not(.nav-fixed)").addClass("hide");const $={};document.querySelectorAll("article[data-version]").forEach(ce=>{const le=ce.dataset.group,ye=ce.dataset.name,Oe=ce.dataset.version,me=le+ye;!$[me]&&i().lte(Oe,ne)&&($[me]=!0,document.querySelector(`article[data-group="${le}"][data-name="${ye}"][data-version="${Oe}"]`).classList.remove("hide"),document.querySelector(`#sidenav li[data-group="${le}"][data-name="${ye}"][data-version="${Oe}"]`).classList.remove("hide"),document.querySelector(`#sidenav li.nav-header[data-group="${le}"]`).classList.remove("hide"))}),y()("article[data-version]").each(function(ce){const le=y()(this).data("group");y()("section#api-"+le).removeClass("hide"),y()("section#api-"+le+" article:visible").length===0?y()("section#api-"+le).addClass("hide"):y()("section#api-"+le).removeClass("hide")})}if(hn(),y()("#versions li.version a").on("click",function(ne){ne.preventDefault(),hn(y()(this).html())}),y()("#compareAllWithPredecessor").on("click",Z),y()("article .versions li.version a").on("click",Rn),y().urlParam=function(ne){const $=new RegExp("[\\?&amp;]"+ne+"=([^&amp;#]*)").exec(window.location.href);return $&&$[1]?$[1]:null},y().urlParam("compare")&&y()("#compareAllWithPredecessor").trigger("click"),window.location.hash){const ne=decodeURI(window.location.hash);y()(ne).length>0&&y()("html,body").animate({scrollTop:parseInt(y()(ne).offset().top)},0)}y()("#scrollingNav .sidenav-search input.search").focus(),y()('[data-action="filter-search"]').on("keyup",ne=>{const $=ne.currentTarget.value.toLowerCase();y()(".sidenav").find("a.nav-list-item").each((ce,le)=>{y()(le).show(),le.innerText.toLowerCase().includes($)||y()(le).hide()})}),y()("span.search-reset").on("click",function(){y()("#scrollingNav .sidenav-search input.search").val("").focus(),y()(".sidenav").find("a.nav-list-item").show()});function Rn(ne){ne.preventDefault();const $=y()(this).parents("article"),ce=y()(this).html(),le=$.find(".version"),ye=le.find("strong").html();le.find("strong").html(ce);const Oe=$.data("group"),me=$.data("name"),Je=$.data("version"),ct=$.data("compare-version");if(ct!==ce&&!(!ct&&Je===ce)){if(ct&&xt[Oe][me][0]===ce||Je===ce)ee(Oe,me,Je);else{let st={},gt={};y().each(Ke[Oe][me],function(bs,Hn){Hn.version===Je&&(st=Hn),Hn.version===ce&&(gt=Hn)});const We={article:st,compare:gt,versions:xt[Oe][me]};We.article.id=We.article.group+"-"+We.article.name+"-"+We.article.version,We.article.id=We.article.id.replace(/\./g,"_"),We.compare.id=We.compare.group+"-"+We.compare.name+"-"+We.compare.version,We.compare.id=We.compare.id.replace(/\./g,"_");let $e=st;$e.parameter&&$e.parameter.fields&&(We._hasTypeInParameterFields=St($e.parameter.fields)),$e.error&&$e.error.fields&&(We._hasTypeInErrorFields=St($e.error.fields)),$e.success&&$e.success.fields&&(We._hasTypeInSuccessFields=St($e.success.fields)),$e.info&&$e.info.fields&&(We._hasTypeInInfoFields=St($e.info.fields)),$e=gt,We._hasTypeInParameterFields!==!0&&$e.parameter&&$e.parameter.fields&&(We._hasTypeInParameterFields=St($e.parameter.fields)),We._hasTypeInErrorFields!==!0&&$e.error&&$e.error.fields&&(We._hasTypeInErrorFields=St($e.error.fields)),We._hasTypeInSuccessFields!==!0&&$e.success&&$e.success.fields&&(We._hasTypeInSuccessFields=St($e.success.fields)),We._hasTypeInInfoFields!==!0&&$e.info&&$e.info.fields&&(We._hasTypeInInfoFields=St($e.info.fields));const Et=ve(We);$.after(Et),$.next().find(".versions li.version a").on("click",Rn),y()("#sidenav li[data-group='"+Oe+"'][data-name='"+me+"'][data-version='"+ye+"']").addClass("has-modifications"),$.remove()}g().highlightAll()}}function Z(ne){ne.preventDefault(),y()("article:visible .versions").each(function(){const ce=y()(this).parents("article").data("version");let le=null;y()(this).find("li.version a").each(function(){y()(this).html()<ce&&!le&&(le=y()(this))}),le&&le.trigger("click")})}function H(ne,$){ne.id=ne.article.group+"-"+ne.article.name+"-"+ne.article.version,ne.id=ne.id.replace(/\./g,"_"),$.header&&$.header.fields&&(ne._hasTypeInHeaderFields=St($.header.fields)),$.parameter&&$.parameter.fields&&(ne._hasTypeInParameterFields=St($.parameter.fields)),$.error&&$.error.fields&&(ne._hasTypeInErrorFields=St($.error.fields)),$.success&&$.success.fields&&(ne._hasTypeInSuccessFields=St($.success.fields)),$.info&&$.info.fields&&(ne._hasTypeInInfoFields=St($.info.fields)),ne.template=oe.template}function q(ne,$,ce){let le={};y().each(Ke[ne][$],function(Oe,me){me.version===ce&&(le=me)});const ye={article:le,versions:xt[ne][$]};return H(ye,le),ae(ye)}function ee(ne,$,ce){const le=y()("article[data-group='"+ne+"'][data-name='"+$+"']:visible"),ye=q(ne,$,ce);le.after(ye),le.next().find(".versions li.version a").on("click",Rn),y()("#sidenav li[data-group='"+ne+"'][data-name='"+$+"'][data-version='"+ce+"']").removeClass("has-modifications"),le.remove()}function ie(ne,$,ce){const le=[];return $.forEach(function(ye){ce?ne.forEach(function(Oe){const me=Oe.split(ce);(me[0]===ye||me[1]===ye)&&le.push(Oe)}):ne.forEach(function(Oe){Oe===ye&&le.push(ye)})}),ne.forEach(function(ye){le.indexOf(ye)===-1&&le.push(ye)}),le}function ge(ne,$){const ce=[];return $.forEach(le=>{Object.keys(ne).forEach(ye=>{ne[ye].replace(/_/g," ")===le&&ce.push(ye)})}),Object.keys(ne).forEach(le=>{ce.indexOf(le)===-1&&ce.push(le)}),ce}Gn()}})()})();
