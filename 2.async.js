webpackJsonp([2],{698:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(112),u=n(r),s=a(8),p=n(s),o=a(712),c=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t.default=e,t}(o);t.default={namespace:"trending",state:{languages:["all","javascript","python","go","shell","css","typescript","vue"],trendings:{},selectedLanguage:"javascript",selectedType:"daily"},reducers:{"save/trending":function(e,t){var a=t.payload;return(0,p.default)({},e,{trendings:(0,p.default)({},e.trendings,a)})},"select/language":function(e,t){var a=t.payload;return(0,p.default)({},e,{selectedLanguage:a})}},effects:{"sync/repo":u.default.mark(function e(t,a){var n,r=t.payload,s=r.language,p=r.type,o=a.call,l=a.put;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l({type:"select/language",payload:s});case 2:return e.next=4,o(c.fetchRepos,{language:s,type:p});case 4:return n=e.sent,e.next=7,l({type:"save/trending",payload:n});case 7:case"end":return e.stop()}},e,this)}),"sync/select/language":u.default.mark(function e(t,a){var n=t.payload,r=a.put;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r({type:"sync/repo",payload:{language:n}});case 2:case"end":return e.stop()}},e,this)})},subscriptions:{setup:function(e){var t=e.dispatch,a=e.history;t({type:"sync/repo",payload:{language:"javascript",type:"daily"}}),a.listen(function(e){var a=e.pathname;if(a.startsWith("/repo/")){var n=/\/repo\/([^?]+)?/.exec(a)[1];t({type:"sync/repo",payload:{language:n}})}})}}},e.exports=t.default},712:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.fetchRepos=void 0;var r=a(112),u=n(r),s=a(123),p=n(s),o=a(8),c=n(o),l=a(392),i=n(l),d=(t.fetchRepos=function(){var e=(0,i.default)(u.default.mark(function e(){var t,a,n,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},s=r.language,o=void 0===s?"javascript":s,l=r.type,i=void 0===l?"daily":l;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=""+y.prefix+y.repo+"/"+o+"/?since="+i,e.next=3,(0,f.default)(t);case 3:return a=e.sent,n=a.data,e.abrupt("return",(0,p.default)({},o+"/"+i,n.map(function(e){return(0,c.default)({},e,{avatar:e.avatars[0],repoLink:e.repo_link})})));case 6:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),a(391)),f=n(d),y=a(713)},713:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={prefix:"https://trending-api-github.herokuapp.com/api",repo:"/repo",dev:"/dev"},e.exports=t.default}});