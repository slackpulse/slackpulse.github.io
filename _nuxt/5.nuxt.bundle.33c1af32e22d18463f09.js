webpackJsonp([5],{1016:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",{staticClass:"container"},[i("h2",{directives:[{name:"translate",rawName:"v-translate"}]},[t._v("PORTABILITY CALCULATOR")]),i("div",{style:{visibility:t.showAffix?"hidden":"visible"}},[i("div",{staticClass:"row"},[i("div",{staticClass:"col2 center"},[i("span",{directives:[{name:"translate",rawName:"v-translate"}],staticClass:"label"},[t._v("DISPLAY PORT.")]),t.isValid?i("label",{staticClass:"statistics"},[t._v(t._s(t._f("commify")(t.sum)))]):i("label",[t._v(t._s(t.t("Error")))])]),i("div",{staticClass:"col2 center"},[i("span",{directives:[{name:"translate",rawName:"v-translate"}],staticClass:"label"},[t._v("CALCULATED PORT.")]),t.isValid?i("label",{staticClass:"statistics"},[t._v(t._s(t._f("commify")(t.portable)))]):i("label",[t._v(t._s(t.t("Error")))])])]),i("div",{staticClass:"row"},[i("div",{staticClass:"col2 center"},[i("span",{directives:[{name:"translate",rawName:"v-translate"}],staticClass:"label"},[t._v("SKATER")]),t.isValid?i("label",{staticClass:"statistics"},[t._v(t._s(t.t(t.skating?"YES":"NO")))]):i("label",[t._v(t._s(t.t("Error")))])]),i("div",{staticClass:"col2 center"},[i("span",{directives:[{name:"translate",rawName:"v-translate"}],staticClass:"label"},[t._v("TIER")]),t.isValid?i("label",{staticClass:"statistics"},[t._v(t._s(t.tier))]):i("label",[t._v(t._s(t.t("Error")))])])])]),i("transition",{attrs:{name:"affix-transition"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.showAffix,expression:"showAffix"}],staticClass:"affix",style:t.affix},[i("div",{staticClass:"row"},[i("div",{staticClass:"col2 center"},[i("span",{directives:[{name:"translate",rawName:"v-translate"}],staticClass:"label"},[t._v("DISPLAY PORT.")]),t.isValid?i("label",{staticClass:"statistics"},[t._v(t._s(t._f("commify")(t.sum)))]):i("label",[t._v(t._s(t.t("Error")))])]),i("div",{staticClass:"col2 center"},[i("span",{directives:[{name:"translate",rawName:"v-translate"}],staticClass:"label"},[t._v("CALCULATED PORT.")]),t.isValid?i("label",{staticClass:"statistics"},[t._v(t._s(t._f("commify")(t.portable)))]):i("label",[t._v(t._s(t.t("Error")))])])]),i("div",{staticClass:"row"},[i("div",{staticClass:"col2 center"},[i("span",{directives:[{name:"translate",rawName:"v-translate"}],staticClass:"label"},[t._v("SKATER")]),t.isValid?i("label",{staticClass:"statistics"},[t._v(t._s(t.t(t.skating?"YES":"NO")))]):i("label",[t._v(t._s(t.t("Error")))])]),i("div",{staticClass:"col2 center"},[i("span",{directives:[{name:"translate",rawName:"v-translate"}],staticClass:"label"},[t._v("TIER")]),t.isValid?i("label",{staticClass:"statistics"},[t._v(t._s(t.tier))]):i("label",[t._v(t._s(t.t("Error")))])])])])]),i("div",{staticClass:"row form-start"},[i("label",{directives:[{name:"translate",rawName:"v-translate"}],staticClass:"label col2",attrs:{for:"portability-headgear"}},[t._v("HEADGEAR")]),i("div",{staticClass:"slider-wrapper"},[i("vue-slider",t._b({model:{value:t.headValue,callback:function(e){t.headValue=e},expression:"headValue"}},"vue-slider",t.sliderOption1(800,1e3)))],1)]),i("div",{staticClass:"row"},[i("label",{directives:[{name:"translate",rawName:"v-translate"}],staticClass:"label col2",attrs:{for:"portability-torso"}},[t._v("TORSO")]),i("div",{staticClass:"slider-wrapper"},[i("vue-slider",t._b({model:{value:t.torsoValue,callback:function(e){t.torsoValue=e},expression:"torsoValue"}},"vue-slider",t.sliderOption1(600,1e3)))],1)]),i("div",{staticClass:"row"},[i("label",{directives:[{name:"translate",rawName:"v-translate"}],staticClass:"label col2",attrs:{for:"portability-pants "}},[t._v("LEG")]),i("div",{staticClass:"slider-wrapper"},[i("vue-slider",t._b({model:{value:t.pantsValue,callback:function(e){t.pantsValue=e},expression:"pantsValue"}},"vue-slider",t.sliderOption1(800,1e3)))],1)]),i("div",{staticClass:"row"},[i("label",{directives:[{name:"translate",rawName:"v-translate"}],staticClass:"label col2",attrs:{for:"portability-weapon"}},[t._v("WEAPON")]),i("div",{staticClass:"slider-wrapper"},[i("vue-slider",t._b({model:{value:t.weaponValue,callback:function(e){t.weaponValue=e},expression:"weaponValue"}},"vue-slider",t.sliderOption2(300,800)))],1)]),i("div",{staticClass:"row"},[i("label",{directives:[{name:"translate",rawName:"v-translate"}],staticClass:"label col2",attrs:{for:"portability-addition"}},[t._v("+RATE(%)")]),i("div",{staticClass:"slider-wrapper"},[i("vue-slider",t._b({model:{value:t.rateValue,callback:function(e){t.rateValue=e},expression:"rateValue"}},"vue-slider",t.sliderOption3()))],1)])],1)},staticRenderFns:[]}},1024:function(t,e,i){var s=i(997);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);i(9)("ac698376",s,!0)},73:function(t,e,i){i(1024);var s=i(3)(i(990),i(1016),"data-v-2f10c0aa",null);t.exports=s.exports},869:function(t,e,i){!function(e,i){t.exports=i()}(0,function(){return function(t){function e(s){if(i[s])return i[s].exports;var r=i[s]={i:s,l:!1,exports:{}};return t[s].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var i={};return e.m=t,e.c=i,e.i=function(t){return t},e.d=function(t,i,s){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:s})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=9)}([function(t,e,i){i(5);var s=i(3)(i(8),i(4),"data-v-4f2807ae",null);t.exports=s.exports},function(t,e,i){e=t.exports=i(2)(),e.push([t.i,'.vue-slider-wrap[data-v-4f2807ae]{position:relative;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.vue-slider-wrap.vue-slider-disabled[data-v-4f2807ae]{opacity:.5;cursor:not-allowed}.vue-slider-wrap.vue-slider-has-label[data-v-4f2807ae]{margin-bottom:15px}.vue-slider-wrap.vue-slider-disabled .vue-slider-dot[data-v-4f2807ae]{cursor:not-allowed}.vue-slider-wrap .vue-slider[data-v-4f2807ae]{position:relative;display:block;border-radius:15px;background-color:#ccc}.vue-slider-wrap .vue-slider[data-v-4f2807ae]:after{content:"";position:absolute;left:0;top:0;width:100%;height:100%;z-index:2}.vue-slider-process[data-v-4f2807ae]{position:absolute;border-radius:15px;background-color:#3498db;transition:all 0s;z-index:1}.vue-slider-horizontal .vue-slider-process[data-v-4f2807ae]{width:0;height:100%;top:0;left:0;will-change:width}.vue-slider-vertical .vue-slider-process[data-v-4f2807ae]{width:100%;height:0;bottom:0;left:0;will-change:height}.vue-slider-horizontal-reverse .vue-slider-process[data-v-4f2807ae]{width:0;height:100%;top:0;right:0}.vue-slider-vertical-reverse .vue-slider-process[data-v-4f2807ae]{width:100%;height:0;top:0;left:0}.vue-slider-dot[data-v-4f2807ae]{position:absolute;border-radius:50%;background-color:#fff;box-shadow:.5px .5px 2px 1px rgba(0,0,0,.32);transition:all 0s;will-change:transform;cursor:pointer;z-index:3}.vue-slider-horizontal .vue-slider-dot[data-v-4f2807ae]{left:0}.vue-slider-vertical .vue-slider-dot[data-v-4f2807ae]{bottom:0}.vue-slider-horizontal-reverse .vue-slider-dot[data-v-4f2807ae]{right:0}.vue-slider-vertical-reverse .vue-slider-dot[data-v-4f2807ae]{top:0}.vue-slider-tooltip[data-v-4f2807ae]{display:none;font-size:14px;white-space:nowrap;position:absolute;padding:2px 5px;min-width:20px;text-align:center;color:#fff;border-radius:5px;border:1px solid #3498db;background-color:#3498db;z-index:9}.vue-slider-tooltip.vue-slider-tooltip-top[data-v-4f2807ae]{top:-9px;left:50%;transform:translate(-50%,-100%)}.vue-slider-tooltip.vue-slider-tooltip-bottom[data-v-4f2807ae]{bottom:-9px;left:50%;transform:translate(-50%,100%)}.vue-slider-tooltip.vue-slider-tooltip-left[data-v-4f2807ae]{top:50%;left:-9px;transform:translate(-100%,-50%)}.vue-slider-tooltip.vue-slider-tooltip-right[data-v-4f2807ae]{top:50%;right:-9px;transform:translate(100%,-50%)}.vue-slider-tooltip.vue-slider-tooltip-top[data-v-4f2807ae]:before{content:"";position:absolute;bottom:-10px;left:50%;width:0;height:0;border:5px solid transparent;border:6px solid transparent\\0;border-top-color:inherit;transform:translate(-50%)}.vue-slider-tooltip.vue-slider-tooltip-bottom[data-v-4f2807ae]:before{content:"";position:absolute;top:-10px;left:50%;width:0;height:0;border:5px solid transparent;border:6px solid transparent\\0;border-bottom-color:inherit;transform:translate(-50%)}.vue-slider-tooltip.vue-slider-tooltip-left[data-v-4f2807ae]:before{content:"";position:absolute;top:50%;right:-10px;width:0;height:0;border:5px solid transparent;border:6px solid transparent\\0;border-left-color:inherit;transform:translateY(-50%)}.vue-slider-tooltip.vue-slider-tooltip-right[data-v-4f2807ae]:before{content:"";position:absolute;top:50%;left:-10px;width:0;height:0;border:5px solid transparent;border:6px solid transparent\\0;border-right-color:inherit;transform:translateY(-50%)}.vue-slider-dot.vue-slider-hover:hover .vue-slider-tooltip[data-v-4f2807ae]{display:block}.vue-slider-dot.vue-slider-always .vue-slider-tooltip[data-v-4f2807ae]{display:block!important}.vue-slider-piecewise[data-v-4f2807ae]{position:absolute;width:100%;padding:0;margin:0;left:0;top:0;height:100%;list-style:none}.vue-slider-piecewise li[data-v-4f2807ae]{position:absolute;width:8px;height:8px}.vue-slider-piecewise .vue-slider-piecewise-dot[data-v-4f2807ae]{position:absolute;left:50%;top:50%;width:100%;height:100%;display:inline-block;background-color:rgba(0,0,0,.16);border-radius:50%;transform:translate(-50%,-50%);z-index:2;transition:all .3s}.vue-slider-piecewise li:first-child .vue-slider-piecewise-dot[data-v-4f2807ae],.vue-slider-piecewise li:last-child .vue-slider-piecewise-dot[data-v-4f2807ae]{visibility:hidden}.vue-slider-piecewise .vue-slider-piecewise-label[data-v-4f2807ae]{position:absolute;display:inline-block;top:15px;left:50%;white-space:nowrap;font-size:12px;color:#333;transform:translateX(-50%);visibility:visible}',""])},function(t,e){t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var i=this[e];i[2]?t.push("@media "+i[2]+"{"+i[1]+"}"):t.push(i[1])}return t.join("")},t.i=function(e,i){"string"==typeof e&&(e=[[null,e,""]]);for(var s={},r=0;r<this.length;r++){var a=this[r][0];"number"==typeof a&&(s[a]=!0)}for(r=0;r<e.length;r++){var o=e[r];"number"==typeof o[0]&&s[o[0]]||(i&&!o[2]?o[2]=i:i&&(o[2]="("+o[2]+") and ("+i+")"),t.push(o))}},t}},function(t,e){t.exports=function(t,e,i,s){var r,a=t=t||{},o=typeof t.default;"object"!==o&&"function"!==o||(r=t,a=t.default);var n="function"==typeof a?a.options:a;if(e&&(n.render=e.render,n.staticRenderFns=e.staticRenderFns),i&&(n._scopeId=i),s){var l=Object.create(n.computed||null);Object.keys(s).forEach(function(t){var e=s[t];l[t]=function(){return e}}),n.computed=l}return{esModule:r,exports:a,options:n}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],ref:"wrap",class:["vue-slider-wrap",t.flowDirection,t.disabledClass,{"vue-slider-has-label":t.piecewiseLabel}],style:t.wrapStyles,on:{click:t.wrapClick}},[i("div",{ref:"elem",staticClass:"vue-slider",style:[t.elemStyles,t.bgStyle]},[t.isMoblie?[t.isRange?[i("div",{ref:"dot0",class:[t.tooltipStatus,"vue-slider-dot"],style:[t.sliderStyles[0],t.dotStyles],on:{touchstart:function(e){t.moveStart(0)}}},[i("span",{class:["vue-slider-tooltip-"+t.tooltipDirection[0],"vue-slider-tooltip"],style:t.tooltipStyles[0]},[t._v(t._s(t.formatter?t.formatting(t.val[0]):t.val[0]))])]),t._v(" "),i("div",{ref:"dot1",class:[t.tooltipStatus,"vue-slider-dot"],style:[t.sliderStyles[1],t.dotStyles],on:{touchstart:function(e){t.moveStart(1)}}},[i("span",{class:["vue-slider-tooltip-"+t.tooltipDirection[1],"vue-slider-tooltip"],style:t.tooltipStyles[1]},[t._v(t._s(t.formatter?t.formatting(t.val[1]):t.val[1]))])])]:[i("div",{ref:"dot",class:[t.tooltipStatus,"vue-slider-dot"],style:[t.sliderStyles,t.dotStyles],on:{touchstart:t.moveStart}},[i("span",{class:["vue-slider-tooltip-"+t.tooltipDirection,"vue-slider-tooltip"],style:t.tooltipStyles},[t._v(t._s(t.formatter?t.formatting(t.val):t.val))])])]]:[t.isRange?[i("div",{ref:"dot0",class:[t.tooltipStatus,"vue-slider-dot"],style:[t.sliderStyles[0],t.dotStyles],on:{mousedown:function(e){t.moveStart(0)}}},[i("span",{class:["vue-slider-tooltip-"+t.tooltipDirection[0],"vue-slider-tooltip"],style:t.tooltipStyles[0]},[t._v(t._s(t.formatter?t.formatting(t.val[0]):t.val[0]))])]),t._v(" "),i("div",{ref:"dot1",class:[t.tooltipStatus,"vue-slider-dot"],style:[t.sliderStyles[1],t.dotStyles],on:{mousedown:function(e){t.moveStart(1)}}},[i("span",{class:["vue-slider-tooltip-"+t.tooltipDirection[1],"vue-slider-tooltip"],style:t.tooltipStyles[1]},[t._v(t._s(t.formatter?t.formatting(t.val[1]):t.val[1]))])])]:[i("div",{ref:"dot",class:[t.tooltipStatus,"vue-slider-dot"],style:[t.sliderStyles,t.dotStyles],on:{mousedown:t.moveStart}},[i("span",{class:["vue-slider-tooltip-"+t.tooltipDirection,"vue-slider-tooltip"],style:t.tooltipStyles},[t._v(t._s(t.formatter?t.formatting(t.val):t.val))])])]],t._v(" "),t.piecewise?[i("ul",{staticClass:"vue-slider-piecewise"},t._l(t.piecewiseDotWrap,function(e,s){return i("li",{style:[t.piecewiseDotStyle,e.style]},[i("span",{staticClass:"vue-slider-piecewise-dot",style:[t.piecewiseStyle,e.inRange?t.piecewiseActiveStyle:null]}),t._v(" "),t.piecewiseLabel?i("span",{staticClass:"vue-slider-piecewise-label",style:[t.labelStyle,e.inRange?t.labelActiveStyle:null]},[t._v(t._s(e.label))]):t._e()])}))]:t._e(),t._v(" "),i("div",{ref:"process",staticClass:"vue-slider-process",style:t.processStyle})],2)])},staticRenderFns:[]}},function(t,e,i){var s=i(1);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals),i(6)("1bf5195a",s,!0)},function(t,e,i){function s(t){for(var e=0;e<t.length;e++){var i=t[e],s=u[i.id];if(s){s.refs++;for(var r=0;r<s.parts.length;r++)s.parts[r](i.parts[r]);for(;r<i.parts.length;r++)s.parts.push(a(i.parts[r]));s.parts.length>i.parts.length&&(s.parts.length=i.parts.length)}else{for(var o=[],r=0;r<i.parts.length;r++)o.push(a(i.parts[r]));u[i.id]={id:i.id,refs:1,parts:o}}}}function r(){var t=document.createElement("style");return t.type="text/css",h.appendChild(t),t}function a(t){var e,i,s=document.querySelector('style[data-vue-ssr-id~="'+t.id+'"]');if(s){if(f)return v;s.parentNode.removeChild(s)}if(m){var a=p++;s=c||(c=r()),e=o.bind(null,s,a,!1),i=o.bind(null,s,a,!0)}else s=r(),e=n.bind(null,s),i=function(){s.parentNode.removeChild(s)};return e(t),function(s){if(s){if(s.css===t.css&&s.media===t.media&&s.sourceMap===t.sourceMap)return;e(t=s)}else i()}}function o(t,e,i,s){var r=i?"":s.css;if(t.styleSheet)t.styleSheet.cssText=b(e,r);else{var a=document.createTextNode(r),o=t.childNodes;o[e]&&t.removeChild(o[e]),o.length?t.insertBefore(a,o[e]):t.appendChild(a)}}function n(t,e){var i=e.css,s=e.media,r=e.sourceMap;if(s&&t.setAttribute("media",s),r&&(i+="\n/*# sourceURL="+r.sources[0]+" */",i+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */"),t.styleSheet)t.styleSheet.cssText=i;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(i))}}var l="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!l)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var d=i(7),u={},h=l&&(document.head||document.getElementsByTagName("head")[0]),c=null,p=0,f=!1,v=function(){},m="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());t.exports=function(t,e,i){f=i;var r=d(t,e);return s(r),function(e){for(var i=[],a=0;a<r.length;a++){var o=r[a],n=u[o.id];n.refs--,i.push(n)}e?(r=d(t,e),s(r)):r=[];for(var a=0;a<i.length;a++){var n=i[a];if(0===n.refs){for(var l=0;l<n.parts.length;l++)n.parts[l]();delete u[n.id]}}}};var b=function(){var t=[];return function(e,i){return t[e]=i,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t,e){for(var i=[],s={},r=0;r<e.length;r++){var a=e[r],o=a[0],n=a[1],l=a[2],d=a[3],u={id:t+":"+r,css:n,media:l,sourceMap:d};s[o]?s[o].parts.push(u):i.push(s[o]={id:o,parts:[u]})}return i}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{flag:!1,size:0,currentValue:0,currentSlider:0}},props:{width:{type:[Number,String],default:"auto"},height:{type:[Number,String],default:6},data:{type:Array,default:null},dotSize:{type:Number,default:16},min:{type:Number,default:0},max:{type:Number,default:100},interval:{type:Number,default:1},show:{type:Boolean,default:!0},disabled:{type:Boolean,default:!1},piecewise:{type:Boolean,default:!1},tooltip:{type:[String,Boolean],default:"always"},eventType:{type:String,default:"auto"},direction:{type:String,default:"horizontal"},reverse:{type:Boolean,default:!1},lazy:{type:Boolean,default:!1},clickable:{type:Boolean,default:!0},speed:{type:Number,default:.5},realTime:{type:Boolean,default:!1},value:{type:[String,Number,Array],default:0},piecewiseLabel:{type:Boolean,default:!1},sliderStyle:[Array,Object],tooltipDir:[Array,String],formatter:[String,Function],piecewiseStyle:Object,piecewiseActiveStyle:Object,processStyle:Object,bgStyle:Object,tooltipStyle:[Array,Object],labelStyle:Object,labelActiveStyle:Object},computed:{flowDirection:function(){return"vue-slider-"+this.direction+(this.reverse?"-reverse":"")},tooltipDirection:function(){var t=this.tooltipDir||("vertical"===this.direction?"left":"top");return Array.isArray(t)?this.isRange?t:t[1]:this.isRange?[t,t]:t},tooltipStatus:function(){return"hover"===this.tooltip&&this.flag?"vue-slider-always":this.tooltip?"vue-slider-"+this.tooltip:""},tooltipClass:function(){return["vue-slider-tooltip-"+this.tooltipDirection,"vue-slider-tooltip"]},isMoblie:function(){return"touch"===this.eventType||"mouse"!==this.eventType&&/(iPhone|iPad|iPod|iOS|Android|SymbianOS|Windows Phone|Mobile)/i.test(navigator.userAgent)},isDisabled:function(){return"none"===this.eventType||this.disabled},disabledClass:function(){return this.disabled?"vue-slider-disabled":""},isRange:function(){return Array.isArray(this.value)},slider:function(){return this.isRange?[this.$refs.dot0,this.$refs.dot1]:this.$refs.dot},minimum:function(){return this.data?0:this.min},val:{get:function(){return this.data?this.isRange?[this.data[this.currentValue[0]],this.data[this.currentValue[1]]]:this.data[this.currentValue]:this.currentValue},set:function(t){if(this.data)if(this.isRange){var e=this.data.indexOf(t[0]),i=this.data.indexOf(t[1]);e>-1&&i>-1&&(this.currentValue=[e,i])}else{var s=this.data.indexOf(t);s>-1&&(this.currentValue=s)}else this.currentValue=t}},currentIndex:function(){return this.isRange?this.data?this.currentValue:[(this.currentValue[0]-this.minimum)/this.spacing,(this.currentValue[1]-this.minimum)/this.spacing]:(this.currentValue-this.minimum)/this.spacing},indexRange:function(){return this.isRange?this.currentIndex:[0,this.currentIndex]},maximum:function(){return this.data?this.data.length-1:this.max},multiple:function(){var t=(""+this.interval).split(".")[1];return t?Math.pow(10,t.length):1},spacing:function(){return this.data?1:this.interval},total:function(){return this.data?this.data.length-1:(~~((this.maximum-this.minimum)*this.multiple)%(this.interval*this.multiple)!=0&&console.error("[Vue-slider warn]: Prop[interval] is illegal, Please make sure that the interval can be divisible"),(this.maximum-this.minimum)/this.interval)},gap:function(){return this.size/this.total},position:function(){return this.isRange?[(this.currentValue[0]-this.minimum)/this.spacing*this.gap,(this.currentValue[1]-this.minimum)/this.spacing*this.gap]:(this.currentValue-this.minimum)/this.spacing*this.gap},limit:function(){return this.isRange?[[0,this.position[1]],[this.position[0],this.size]]:[0,this.size]},valueLimit:function(){return this.isRange?[[this.minimum,this.currentValue[1]],[this.currentValue[0],this.maximum]]:[this.minimum,this.maximum]},wrapStyles:function(){return"vertical"===this.direction?{height:"number"==typeof this.height?this.height+"px":this.height,padding:this.dotSize/2+"px"}:{width:"number"==typeof this.width?this.width+"px":this.width,padding:this.dotSize/2+"px"}},sliderStyles:function(){return Array.isArray(this.sliderStyle)?this.isRange?this.sliderStyle:this.sliderStyle[1]:this.isRange?[this.sliderStyle,this.sliderStyle]:this.sliderStyle},tooltipStyles:function(){return Array.isArray(this.tooltipStyle)?this.isRange?this.tooltipStyle:this.tooltipStyle[1]:this.isRange?[this.tooltipStyle,this.tooltipStyle]:this.tooltipStyle},elemStyles:function(){return"vertical"===this.direction?{width:this.width+"px",height:"100%"}:{height:this.height+"px"}},dotStyles:function(){return"vertical"===this.direction?{width:this.dotSize+"px",height:this.dotSize+"px",left:-(this.dotSize-this.width)/2+"px"}:{width:this.dotSize+"px",height:this.dotSize+"px",top:-(this.dotSize-this.height)/2+"px"}},piecewiseDotStyle:function(){return"vertical"===this.direction?{width:this.width+"px",height:this.width+"px"}:{width:this.height+"px",height:this.height+"px"}},piecewiseDotWrap:function(){if(!this.piecewise)return!1;for(var t=[],e=(this.size,"vertical"===this.direction?this.width:this.height,this.total,0);e<=this.total;e++){var i="vertical"===this.direction?{bottom:this.gap*e-this.width/2+"px",left:"200px"}:{left:this.gap*e-this.height/2+"px",top:"0"},s=this.reverse?this.total-e:e,r=this.data?this.data[s]:this.spacing*s+this.min;t.push({style:i,label:this.formatter?this.formatting(r):r,inRange:s>=this.indexRange[0]&&s<=this.indexRange[1]})}return t}},watch:{value:function(t){this.flag||this.setValue(t,!0)},max:function(t){var e=this.limitValue(this.val);e!==!1&&this.setValue(e),this.refresh()},min:function(t){var e=this.limitValue(this.val);e!==!1&&this.setValue(e),this.refresh()},show:function(t){var e=this;t&&!this.size&&this.$nextTick(function(){e.refresh()})}},methods:{bindEvents:function(){this.isMoblie?(this.$refs.wrap.addEventListener("touchmove",this.moving),this.$refs.wrap.addEventListener("touchend",this.moveEnd)):(document.addEventListener("mousemove",this.moving),document.addEventListener("mouseup",this.moveEnd),document.addEventListener("mouseleave",this.moveEnd))},unbindEvents:function(){window.removeEventListener("resize",this.refresh),this.isMoblie?(this.$refs.wrap.removeEventListener("touchmove",this.moving),this.$refs.wrap.removeEventListener("touchend",this.moveEnd)):(document.removeEventListener("mousemove",this.moving),document.removeEventListener("mouseup",this.moveEnd),document.removeEventListener("mouseleave",this.moveEnd))},formatting:function(t){return"string"==typeof this.formatter?this.formatter.replace(/\{value\}/,t):this.formatter(t)},getPos:function(t){return this.realTime&&this.getStaticData(),"vertical"===this.direction?this.reverse?t.pageY-this.offset:this.size-(t.pageY-this.offset):this.reverse?this.size-(t.clientX-this.offset):t.clientX-this.offset},wrapClick:function(t){if(this.isDisabled||!this.clickable)return!1;var e=this.getPos(t);this.isRange&&(this.currentSlider=e>(this.position[1]-this.position[0])/2+this.position[0]?1:0),this.setValueOnPos(e)},moveStart:function(t){if(this.isDisabled)return!1;this.isRange&&(this.currentSlider=t),this.flag=!0,this.$emit("drag-start",this)},moving:function(t){if(!this.flag)return!1;t.preventDefault(),this.isMoblie&&(t=t.targetTouches[0]),this.setValueOnPos(this.getPos(t),!0)},moveEnd:function(t){if(!this.flag)return!1;this.$emit("drag-end",this),this.lazy&&this.isDiff(this.val,this.value)&&this.syncValue(),this.flag=!1,this.setPosition()},setValueOnPos:function(t,e){var i=this.isRange?this.limit[this.currentSlider]:this.limit,s=this.isRange?this.valueLimit[this.currentSlider]:this.valueLimit;if(t>=i[0]&&t<=i[1]){this.setTransform(t);var r=(Math.round(t/this.gap)*(this.spacing*this.multiple)+this.minimum*this.multiple)/this.multiple;this.setCurrentValue(r,e)}else t<i[0]?(this.setTransform(i[0]),this.setCurrentValue(s[0]),1===this.currentSlider&&(this.currentSlider=0)):(this.setTransform(i[1]),this.setCurrentValue(s[1]),0===this.currentSlider&&(this.currentSlider=1))},isDiff:function(t,e){return Object.prototype.toString.call(t)!==Object.prototype.toString.call(e)||(Array.isArray(t)&&t.length===e.length?t.some(function(t,i){return t!==e[i]}):t!==e)},setCurrentValue:function(t,e){if(t<this.minimum||t>this.maximum)return!1;this.isRange?this.isDiff(this.currentValue[this.currentSlider],t)&&(this.currentValue.splice(this.currentSlider,1,t),this.lazy&&this.flag||this.syncValue()):this.isDiff(this.currentValue,t)&&(this.currentValue=t,this.lazy&&this.flag||this.syncValue()),e||this.setPosition()},setIndex:function(t){if(Array.isArray(t)&&this.isRange){var e=void 0;e=this.data?[this.data[t[0]],this.data[t[1]]]:[this.spacing*t[0]+this.minimum,this.spacing*t[1]+this.minimum],this.setValue(e)}else t=this.spacing*t+this.minimum,this.isRange&&(this.currentSlider=t>(this.currentValue[1]-this.currentValue[0])/2+this.currentValue[0]?1:0),this.setCurrentValue(t)},setValue:function(t,e,i){var s=this;if(this.isDiff(this.val,t)){var r=this.limitValue(t);this.val=r!==!1?this.isRange?r.concat():r:this.isRange?t.concat():t,this.syncValue(e)}this.$nextTick(function(){s.setPosition(i)})},setPosition:function(t){this.flag||this.setTransitionTime(void 0===t?this.speed:t),this.isRange?(this.currentSlider=0,this.setTransform(this.position[this.currentSlider]),this.currentSlider=1,this.setTransform(this.position[this.currentSlider])):this.setTransform(this.position),this.flag||this.setTransitionTime(0)},setTransform:function(t){var e=("vertical"===this.direction?this.dotSize/2-t:t-this.dotSize/2)*(this.reverse?-1:1),i="vertical"===this.direction?"translateY("+e+"px)":"translateX("+e+"px)",s=(0===this.currentSlider?this.position[1]-t:t-this.position[0])+"px",r=(0===this.currentSlider?t:this.position[0])+"px";this.isRange?(this.slider[this.currentSlider].style.transform=i,this.slider[this.currentSlider].style.WebkitTransform=i,this.slider[this.currentSlider].style.msTransform=i,"vertical"===this.direction?(this.$refs.process.style.height=s,this.$refs.process.style[this.reverse?"top":"bottom"]=r):(this.$refs.process.style.width=s,this.$refs.process.style[this.reverse?"right":"left"]=r)):(this.slider.style.transform=i,this.slider.style.WebkitTransform=i,this.slider.style.msTransform=i,"vertical"===this.direction?(this.$refs.process.style.height=t+"px",this.$refs.process.style[this.reverse?"top":"bottom"]=0):(this.$refs.process.style.width=t+"px",this.$refs.process.style[this.reverse?"right":"left"]=0))},setTransitionTime:function(t){if(t||this.$refs.process.offsetWidth,this.isRange){for(var e=0;e<this.slider.length;e++)this.slider[e].style.transitionDuration=t+"s",this.slider[e].style.WebkitTransitionDuration=t+"s";this.$refs.process.style.transitionDuration=t+"s",this.$refs.process.style.WebkitTransitionDuration=t+"s"}else this.slider.style.transitionDuration=t+"s",this.slider.style.WebkitTransitionDuration=t+"s",this.$refs.process.style.transitionDuration=t+"s",this.$refs.process.style.WebkitTransitionDuration=t+"s"},limitValue:function(t){var e=this,i=!1;return this.isRange?t=t.map(function(t){return t<e.min?(i=!0,e.min):t>e.max?(i=!0,e.max):t}):t>this.max?(i=!0,t=this.max):t<this.min&&(i=!0,t=this.min),i&&t},syncValue:function(t){t||this.$emit("callback",this.val),this.$emit("input",this.isRange?this.val.concat():this.val)},getValue:function(){return this.val},getIndex:function(){return this.currentIndex},getStaticData:function(){this.$refs.elem&&(this.size="vertical"===this.direction?this.$refs.elem.offsetHeight:this.$refs.elem.offsetWidth,this.offset="vertical"===this.direction?this.$refs.elem.getBoundingClientRect().top+window.pageYOffset||document.documentElement.scrollTop:this.$refs.elem.getBoundingClientRect().left)},refresh:function(){this.$refs.elem&&(this.getStaticData(),this.setPosition())}},created:function(){window.addEventListener("resize",this.refresh)},mounted:function(){var t=this;this.$nextTick(function(){t.getStaticData(),t.setValue(t.value,!0,0),t.bindEvents()})},beforeDestroy:function(){this.unbindEvents()}}},function(t,e,i){"use strict";var s=i(0);t.exports=s}])})},990:function(t,e,i){"use strict";function s(t){var e=1e3;return t&&(e=t),(new Date).getTime().toString(16)+Math.floor(e*Math.random()).toString(16)}Object.defineProperty(e,"__esModule",{value:!0});var r=i(21),a=i.n(r),o=this,n=null;n=i(869),a.a.templateSettings.interpolate=/{{([\s\S]+?)}}/g,e.default={locales:{ja:{"PORTABILITY CALCULATOR":"アフパルポータブル計算機",HEAD:"頭",HEADGEAR:"ヘッドギア",TORSO:"胴体",LEG:"脚",WEAPON:"武器","+RATE(%)":"加算率(%)","DISPLAY PORT.":"表示ポータブル","CALCULATED PORT.":"算出ポータブル",DISPLAYED:"表示",CALCULATED:"算出",SKATER:"スケート",TIER:"ギヤ",YES:"できる",NO:"できない",CLEAR:"クリア",TWEET:"ツイートする",SAVE:"保存",Error:"エラー",Skater:"スケートできる!","Not skater":"スケートできません..."}},data:function(){return{headValue:940,torsoValue:880,pantsValue:900,weaponValue:580,rateValue:0}},mounted:function(){var t=this;this.$nextTick(function(){t.loadHistories()})},beforeRouteEnter:function(t,e,i){i(function(e){var i=a.a.get(t,"query.head",0);a.a.has(t,"query.head")&&(e.headPortable=parseInt(i,10));var s=a.a.get(t,"query.torso",0);a.a.has(t,"query.torso")&&(e.torsoPortable=parseInt(s,10));var r=a.a.get(t,"query.pants",0);a.a.has(t,"query.pants")&&(e.pantsPortable=parseInt(r,10));var o=a.a.get(t,"query.weapon",0);a.a.has(t,"query.weapon")&&(e.weaponPortable=parseInt(o,10));var n=a.a.get(t,"query.rate",0);a.a.has(t,"query.rate")&&(e.additionalRate=parseInt(n,10))})},watch:{$route:function(t,e){"portable"===t.name&&(o.$root.title="Afterpulse Portability Calculator")},headValue:function(t){this.headPortable=t},torsoValue:function(t){this.torsoPortable=t},pantsValue:function(t){this.pantsPortable=t},weaponValue:function(t){this.weaponPortable=t},rateValue:function(t){this.additionalRate=t}},computed:{scrollY:function(){return this.$store.state.scrollY},showAffix:function(){return 100<this.scrollY},affix:function(){var t=0,e=null;return this.showAffix&&(t=1,e=["translateY(",this.scrollY,"px)"].join("")),{opacity:t,transform:e}},headPortable:{get:function(){return this.$store.state.portability.headPortable},set:function(t){this.$store.dispatch("setPortability",{key:"headPortable",value:t})}},torsoPortable:{get:function(){return this.$store.state.portability.torsoPortable},set:function(t){this.$store.dispatch("setPortability",{key:"torsoPortable",value:t})}},pantsPortable:{get:function(){return this.$store.state.portability.pantsPortable},set:function(t){this.$store.dispatch("setPortability",{key:"pantsPortable",value:t})}},weaponPortable:{get:function(){return this.$store.state.portability.weaponPortable},set:function(t){this.$store.dispatch("setPortability",{key:"weaponPortable",value:t})}},additionalRate:{get:function(){return this.$store.state.portability.additionalRate},set:function(t){this.$store.dispatch("setPortability",{key:"additionalRate",value:t})}},histories:function(){return this.$store.state.portabilityHistories},sum:function(){return this.headPortable+this.torsoPortable+this.pantsPortable+this.weaponPortable},isValid:function(){return!(this.additionalRate<0)&&(!(this.headPortable<0||1e3<this.headPortable)&&(!(this.torsoPortable<0||1e3<this.torsoPortable)&&(!(this.pantsPortable<0||1e3<this.pantsPortable)&&!(this.weaponPortable<0||1e3<this.weaponPortable))))},portable:function(){if(!this.isValid)return this.t("Error");var t=this.sum,e=0;return e=2===this.additionalRate?24:5===this.additionalRate?60:7===this.additionalRate?86:10===this.additionalRate?119:12===this.additionalRate?147:17===this.additionalRate?205:30===this.additionalRate?357:this.additionalRate/100*1190,t+=e,Math.floor(t)},skating:function(){return 3311<=this.portable},tier:function(){return this.portable<3311?0:Math.floor((this.portable-3311)/50)+1},shareURL:function(){var t=a.a.template([window.location.protocol+"//"+window.location.host+"/#!/","?head={{ head }}","&torso={{ torso }}","&pants={{ pants }}","&weapon={{ weapon }}","&rate={{ rate }}"].join("")),e="";return this.skating?e+="スケートできる！！":e+="スケートできません...",["https://twitter.com/intent/tweet","?url="+encodeURIComponent(t({head:this.headPortable,torso:this.torsoPortable,pants:this.pantsPortable,weapon:this.weaponPortable,rate:this.additionalRate})),"&hashtags=アフパルポータブル計算機","&text="+e].join("")}},methods:{loadHistories:function(){this.$store.dispatch("loadPortabilityHistories")},clear:function(){this.$store.dispatch("clearPortability")},save:function(){this.isValid&&this.$store.dispatch("savePortability",{uuid:s(),headPortable:this.headPortable,torsoPortable:this.torsoPortable,pantsPortable:this.pantsPortable,weaponPortable:this.weaponPortable,additionalRate:this.additionalRate,sum:this.sum,portable:this.portable,skating:this.skating})},remove:function(t){this.$store.dispatch("removePortability",t)},sliderOption1:function(t,e){return{width:"100%",height:8,dotSize:20,min:t||600,max:e||1e3,disabled:!1,show:!0,tooltip:"always",tooltipDir:"top",formatter:"{value}",piecewise:!1,style:{marginBottom:"30px"},bgStyle:{backgroundColor:"#fff",boxShadow:"inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)"},sliderStyle:[{backgroundColor:"#f05b72"},{backgroundColor:"#3498db"}],tooltipStyle:[{backgroundColor:"#f05b72",borderColor:"#f05b72"},{backgroundColor:"#3498db",borderColor:"#3498db"}],processStyle:{backgroundImage:"-webkit-linear-gradient(left, #f05b72, #3498db)"}}},sliderOption2:function(t,e){return{width:"100%",height:8,dotSize:20,min:t||300,max:e||800,interval:10,disabled:!1,show:!0,tooltip:"always",tooltipDir:"top",formatter:"{value}",piecewise:!1,style:{marginBottom:"30px"},bgStyle:{backgroundColor:"#fff",boxShadow:"inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)"},sliderStyle:[{backgroundColor:"#f05b72"},{backgroundColor:"#3498db"}],tooltipStyle:[{backgroundColor:"#f05b72",borderColor:"#f05b72"},{backgroundColor:"#3498db",borderColor:"#3498db"}],processStyle:{backgroundImage:"-webkit-linear-gradient(left, #f05b72, #3498db)"}}},sliderOption3:function(){return{width:"100%",height:8,dotSize:20,min:0,max:30,disabled:!1,show:!0,tooltip:"always",tooltipDir:"top",formatter:"{value}",piecewise:!1,style:{marginBottom:"30px"},bgStyle:{backgroundColor:"#fff",boxShadow:"inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)"},sliderStyle:[{backgroundColor:"#f05b72"},{backgroundColor:"#3498db"}],tooltipStyle:[{backgroundColor:"#f05b72",borderColor:"#f05b72"},{backgroundColor:"#3498db",borderColor:"#3498db"}],processStyle:{backgroundImage:"-webkit-linear-gradient(left, #f05b72, #3498db)"}}}},components:{VueSlider:n}}},997:function(t,e,i){e=t.exports=i(8)(void 0),e.push([t.i,".affix[data-v-2f10c0aa]{margin-top:64px;margin-top:4rem;position:absolute;top:0;color:#fff;background-color:rgba(0,0,0,.8);width:100vw;padding:16px 0;padding:1rem 0;opacity:0;-webkit-transition:opacity .3s ease,-webkit-transform .1s linear;transition:opacity .3s ease,-webkit-transform .1s linear;transition:transform .1s linear,opacity .3s ease;transition:transform .1s linear,opacity .3s ease,-webkit-transform .1s linear;z-index:9999}",""])}});