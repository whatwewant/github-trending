webpackJsonp([1],{724:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(110),u=r(n),s=a(8),p=r(s),c=a(735),o=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t.default=e,t}(c);t.default={namespace:"trending",state:{languages:["all","javascript","python","go","shell","css","typescript","vue"],trendings:{},refreshing:!1,selectedLanguage:"javascript",selectedType:"daily"},reducers:{"save/trending":function(e,t){var a=t.payload;return(0,p.default)({},e,{trendings:(0,p.default)({},e.trendings,a)})},"select/language":function(e,t){var a=t.payload;return(0,p.default)({},e,{selectedLanguage:a})},"switch/refresh":function(e,t){var a=t.payload;return(0,p.default)({},e,{refreshing:a})}},effects:{"sync/repo":u.default.mark(function e(t,a){var r,n=t.payload,s=n.language,p=n.type,c=a.call,l=a.put;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l({type:"select/language",payload:s});case 2:return e.next=4,c(o.fetchRepos,{language:s,type:p});case 4:return r=e.sent,e.next=7,l({type:"save/trending",payload:r});case 7:case"end":return e.stop()}},e,this)}),"refresh/repo":u.default.mark(function e(t,a){var r,n=t.payload,s=n.language,p=n.type,c=a.call,l=a.put;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l({type:"select/language",payload:s});case 2:return e.next=4,l({type:"switch/refresh",payload:!0});case 4:return e.next=6,c(o.fetchRepos,{language:s,type:p});case 6:return r=e.sent,e.next=9,l({type:"switch/refresh",payload:!1});case 9:return e.next=11,l({type:"save/trending",payload:r});case 11:case"end":return e.stop()}},e,this)}),"sync/select/language":u.default.mark(function e(t,a){var r=t.payload,n=a.put;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n({type:"sync/repo",payload:{language:r}});case 2:case"end":return e.stop()}},e,this)})},subscriptions:{setup:function(e){var t=e.dispatch,a=e.history;t({type:"sync/repo",payload:{language:"javascript",type:"daily"}}),a.listen(function(e){var a=e.pathname;if(a.startsWith("/repo/")){var r=/\/repo\/([^?]+)?/.exec(a)[1];t({type:"sync/repo",payload:{language:r}})}})}}},e.exports=t.default},735:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.fetchRepos=void 0;var n=a(110),u=r(n),s=a(114),p=r(s),c=a(8),o=r(c),l=a(303),i=r(l),d=(t.fetchRepos=function(){var e=(0,i.default)(u.default.mark(function e(){var t,a,r,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},s=n.language,c=void 0===s?"javascript":s,l=n.type,i=void 0===l?"daily":l;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=""+y.prefix+y.repo+"/"+c+"/?since="+i,e.next=3,(0,f.default)(t);case 3:return a=e.sent,r=a.data,e.abrupt("return",(0,p.default)({},c+"/"+i,r.map(function(e){return(0,o.default)({},e,{repo:e.repo.slice(1),repoAt:e.repo.slice(1).replace("/","@"),avatar:e.avatars[0],repoLink:e.repo_link})})));case 6:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),a(340)),f=r(d),y=a(736)},736:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={prefix:"https://trending-api-github.herokuapp.com/api",repo:"/repo",dev:"/dev"},e.exports=t.default}});