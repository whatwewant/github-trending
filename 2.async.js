webpackJsonp([2],{578:function(t,e,a){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function s(t){return{link:{textDecoration:"none",display:"inline-block",width:"100%"},repo:{position:"absolute",top:64,left:0,width:"100%",height:"calc(100% - 80px)",overflowX:"hidden",overflowY:"auto",WebkitOverflowScrolling:"touch",backgroundColor:"rgba(255, 255, 255, 1)",loading:{transition:"opacity .3s ease-in .2s",opacity:t.loading?1:0,height:t.loading?82:0},statistics:{padding:8,display:"flex",alignItems:"center",stars:{flex:1,display:"flex",alignItems:"center",marginRight:4},forks:{flex:1,display:"flex",alignItems:"center",marginRight:4},members:{flex:2}}}}}Object.defineProperty(e,"__esModule",{value:!0});var l=a(46),r=i(l),o=a(0),d=(i(o),a(145)),n=a(250),f=a(146),u=a(249),c=i(u),g=a(251),p=i(g),v=a(591),m=i(v),y=a(592),h=i(y);e.default=function(t){var e=t.avatar,a=t.repo,i=t.desc,l=t.stars,o=t.forks,u=t.avatars,g=t.repoAt,v=t.loading,y=s({loading:v});return(0,r.default)(d.Link,{style:y.link,to:"/repository/"+g},void 0,(0,r.default)(f.ListItem,{},a,(0,r.default)(n.Card,{},void 0,(0,r.default)(n.CardHeader,{avatar:e,title:a,subtitle:""}),(0,r.default)(c.default,{style:{marginLeft:8,marginRight:8}}),(0,r.default)(n.CardText,{},void 0,i),(0,r.default)(c.default,{style:{marginLeft:8,marginRight:8}}),(0,r.default)("div",{style:y.repo.statistics},void 0,(0,r.default)("div",{style:y.repo.statistics.stars},void 0,(0,r.default)("img",{style:{marginRight:4},role:"presentation",src:m.default}),(0,r.default)("span",{},void 0,l)),(0,r.default)("div",{style:y.repo.statistics.forks},void 0,(0,r.default)("img",{style:{marginRight:4},role:"presentation",src:h.default}),(0,r.default)("span",{},void 0,o)),(0,r.default)("div",{style:y.repo.statistics.members},void 0,u.map(function(t,e){return(0,r.default)(p.default,{size:20,src:t},e)}))))))},t.exports=e.default},591:function(t,e,a){t.exports=a.p+"static/star.a6381169.svg"},592:function(t,e,a){t.exports=a.p+"static/fork.f3eaf4dd.svg"}});