webpackJsonp([3],{725:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(110),u=n(a),c=r(114),s=n(c),o=r(8),f=n(o),l=r(9),d=n(l),p=r(737),i=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}(p);t.default={namespace:"repository",state:{current:null,data:{}},reducers:{save:function(e,t){var r=t.payload,n=e.data,a=(0,d.default)(e,["data"]);return(0,f.default)({},a,{data:(0,f.default)({},n,r)})},"set/current":function(e,t){var r=t.payload;return(0,f.default)({},e,{current:r})}},effects:{sync:u.default.mark(function e(t,r){var n,a,c=t.payload,o=r.select,f=r.call,l=r.put;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l({type:"set/current",payload:c});case 2:return e.next=4,o(function(e){return e.repository.data});case 4:if(n=e.sent,!n[c]){e.next=7;break}return e.abrupt("return",!1);case 7:return e.next=9,f(i.fetchRepo,c);case 9:return a=e.sent,e.next=12,l({type:"readme/sync",payload:c});case 12:return e.next=14,l({type:"save",payload:(0,s.default)({},c,a)});case 14:case"end":return e.stop()}},e,this)})},subscriptions:{}},e.exports=t.default},737:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.fetchRepo=void 0;var a=r(110),u=n(a),c=r(303),s=n(c),o=(t.fetchRepo=function(){var e=(0,s.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.default)("https://api.github.com/repos/"+t.replace("@","/")).then(function(e){return e.json()}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),r(304)),f=n(o)}});