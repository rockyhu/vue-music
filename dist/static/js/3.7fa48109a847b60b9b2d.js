webpackJsonp([3],{583:function(e,t,n){function i(e){n(625)}var o=n(9)(n(603),n(638),i,null,null);e.exports=o.exports},596:function(e,t,n){"use strict";function i(){var e=c()({},a.b,{platform:"h5",uin:0,needNewCode:1});return n.i(A.a)("https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg",e,a.c)}function o(){var e=c()({},a.b,{platform:"yqq",hostUin:0,uin:0,sin:0,ein:29,sortId:5,categoryId:1e7,rnd:Math.random(),needNewCode:0,format:"json"});return p.a.get("/api/getDiscList",{params:e}).then(function(e){return d.a.resolve(e.data)})}function r(e){var t=c()({},a.b,{disstid:e,type:1,json:1,utf8:1,onlysong:0,g_tk:1685268878,inCharset:"utf8",platform:"yqq",hostUin:0,needNewCode:0,format:"json"});return p.a.get("/api/getSongList",{params:t}).then(function(e){return d.a.resolve(e.data)})}t.b=i,t.c=o,t.a=r;var s=n(88),d=n.n(s),l=n(87),c=n.n(l),A=n(129),a=n(57),m=n(204),p=n.n(m)},599:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(207),o=n(130);t.default={data:function(){return{dots:[],currentPageIndex:0}},props:{loop:{type:Boolean,default:!0},autoPlay:{type:Boolean,default:!0},threshold:{type:Number,default:.3},speed:{type:Number,default:400},interval:{type:Number,default:4e3}},mounted:function(){var e=this;setTimeout(function(){e._setSliderWidth(),e._initDots(),e._initSlider(),e.autoPlay&&e._play()},20),window.addEventListener("resize",function(){e.slider&&(e._setSliderWidth(!0),e.slider.refresh())})},methods:{_setSliderWidth:function(e){this.children=this.$refs.sliderGroup.children;for(var t=0,i=this.$refs.slider.clientWidth,r=0;r<this.children.length;r++){var s=this.children[r];n.i(o.c)(s,"slider-item"),s.style.width=i+"px",t+=i}this.loop&&!e&&(t+=2*i),this.$refs.sliderGroup.style.width=t+"px"},_initDots:function(){this.dots=new Array(this.children.length)},_initSlider:function(){var e=this;this.slider=new i.a(this.$refs.slider,{scrollX:!0,scrollY:!1,momentum:!1,snap:{loop:this.loop,threshold:this.threshold,speed:this.speed}}),this.slider.on("scrollEnd",function(){var t=e.slider.getCurrentPage().pageX;e.currentPageIndex=t,e.autoPlay&&(clearTimeout(e.timer),e._play())})},_play:function(){var e=this,t=this.currentPageIndex+1;t===this.dots.length&&this.loop&&(t=0),this.timer=setTimeout(function(){e.slider.goToPage(t,0,e.speed)},this.interval)}},activated:function(){this.autoPlay&&this._play()},deactivated:function(){clearTimeout(this.timer)},beforeDestroy:function(){clearTimeout(this.timer)}}},603:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(58),o=n.n(i),r=n(202),s=n.n(r),d=n(66),l=n.n(d),c=n(632),A=n.n(c),a=n(596),m=n(57),p=n(86),h=n(49);t.default={mixins:[p.c],data:function(){return{recommends:[],discList:[]}},created:function(){this._getRecommend(),this._getDiscList()},methods:o()({handlePlaylist:function(e){var t=e.length>0?"60px":"";this.$refs.recommend.style.bottom=t,this.$refs.scroll.refresh()},_getRecommend:function(){var e=this;n.i(a.b)().then(function(t){t.code===m.a&&(e.recommends=t.data.slider)})},selectItem:function(e){this.$router.push({path:"/recommend/"+e.dissid}),this.setDisc(e)},_getDiscList:function(){var e=this;n.i(a.c)().then(function(t){t.code===m.a&&(e.discList=t.data.list)})},loadImage:function(){this.checkLoaded||(this.$refs.scroll.refresh(),this.checkLoaded=!0)}},n.i(h.b)({setDisc:"SET_DISC"})),components:{Slider:A.a,Scroll:l.a,Loading:s.a}}},614:function(e,t,n){t=e.exports=n(578)(!0),t.push([e.i,".recommend{position:fixed;width:100%;top:88px;bottom:0}.recommend .recommend-content{height:100%;overflow:hidden}.recommend .recommend-content .slider-wrapper{position:relative;width:100%;overflow:hidden}.recommend .recommend-content .recommend-list .list-title{height:65px;line-height:65px;text-align:center;font-size:14px;color:#ffcd32}.recommend .recommend-content .recommend-list .item{display:flex;box-sizing:border-box;align-items:center;padding:0 20px 20px}.recommend .recommend-content .recommend-list .item .icon{flex:0 0 60px;width:60px;padding-right:20px}.recommend .recommend-content .recommend-list .item .text{display:flex;flex-direction:column;justify-content:center;flex:1;line-height:20px;overflow:hidden;font-size:14px}.recommend .recommend-content .recommend-list .item .text .name{margin-bottom:10px;color:#fff}.recommend .recommend-content .recommend-list .item .text .desc{color:hsla(0,0%,100%,.3)}.recommend .recommend-content .loading-container{position:absolute;width:100%;top:50%;transform:translateY(-50%)}","",{version:3,sources:["/Applications/XAMPP/xamppfiles/htdocs/vue-music/src/components/recommend/recommend.vue"],names:[],mappings:"AACA,WACE,eAAgB,AAChB,WAAY,AACZ,SAAU,AACV,QAAU,CACX,AACD,8BACE,YAAa,AACb,eAAiB,CAClB,AACD,8CACE,kBAAmB,AACnB,WAAY,AACZ,eAAiB,CAClB,AACD,0DACE,YAAa,AACb,iBAAkB,AAClB,kBAAmB,AACnB,eAAgB,AAChB,aAAe,CAChB,AACD,oDACE,aAAc,AACd,sBAAuB,AACvB,mBAAoB,AACpB,mBAA0B,CAC3B,AACD,0DACE,cAAe,AACf,WAAY,AACZ,kBAAoB,CACrB,AACD,0DACE,aAAc,AACd,sBAAuB,AACvB,uBAAwB,AACxB,OAAQ,AACR,iBAAkB,AAClB,gBAAiB,AACjB,cAAgB,CACjB,AACD,gEACE,mBAAoB,AACpB,UAAY,CACb,AACD,gEACE,wBAA6B,CAC9B,AACD,iDACE,kBAAmB,AACnB,WAAY,AACZ,QAAS,AACT,0BAA4B,CAC7B",file:"recommend.vue",sourcesContent:["\n.recommend {\n  position: fixed;\n  width: 100%;\n  top: 88px;\n  bottom: 0;\n}\n.recommend .recommend-content {\n  height: 100%;\n  overflow: hidden;\n}\n.recommend .recommend-content .slider-wrapper {\n  position: relative;\n  width: 100%;\n  overflow: hidden;\n}\n.recommend .recommend-content .recommend-list .list-title {\n  height: 65px;\n  line-height: 65px;\n  text-align: center;\n  font-size: 14px;\n  color: #ffcd32;\n}\n.recommend .recommend-content .recommend-list .item {\n  display: flex;\n  box-sizing: border-box;\n  align-items: center;\n  padding: 0 20px 20px 20px;\n}\n.recommend .recommend-content .recommend-list .item .icon {\n  flex: 0 0 60px;\n  width: 60px;\n  padding-right: 20px;\n}\n.recommend .recommend-content .recommend-list .item .text {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  flex: 1;\n  line-height: 20px;\n  overflow: hidden;\n  font-size: 14px;\n}\n.recommend .recommend-content .recommend-list .item .text .name {\n  margin-bottom: 10px;\n  color: #fff;\n}\n.recommend .recommend-content .recommend-list .item .text .desc {\n  color: rgba(255,255,255,0.3);\n}\n.recommend .recommend-content .loading-container {\n  position: absolute;\n  width: 100%;\n  top: 50%;\n  transform: translateY(-50%);\n}"],sourceRoot:""}])},618:function(e,t,n){t=e.exports=n(578)(!0),t.push([e.i,".slider{min-height:1px}.slider .slider-group{position:relative;overflow:hidden;white-space:nowrap}.slider .slider-group .slider-item{float:left;box-sizing:border-box;overflow:hidden;text-align:center}.slider .slider-group .slider-item a{display:block;width:100%;overflow:hidden;text-decoration:none}.slider .slider-group .slider-item a img{display:block;width:100%}.slider .dots{position:absolute;right:0;left:0;bottom:12px;text-align:center;font-size:0}.slider .dots .dot{display:inline-block;margin:0 4px;width:8px;height:8px;border-radius:50%;background:hsla(0,0%,100%,.5)}.slider .dots .dot.active{width:20px;border-radius:5px;background:hsla(0,0%,100%,.8)}","",{version:3,sources:["/Applications/XAMPP/xamppfiles/htdocs/vue-music/src/base/slider/slider.vue"],names:[],mappings:"AACA,QACE,cAAgB,CACjB,AACD,sBACE,kBAAmB,AACnB,gBAAiB,AACjB,kBAAoB,CACrB,AACD,mCACE,WAAY,AACZ,sBAAuB,AACvB,gBAAiB,AACjB,iBAAmB,CACpB,AACD,qCACE,cAAe,AACf,WAAY,AACZ,gBAAiB,AACjB,oBAAsB,CACvB,AACD,yCACE,cAAe,AACf,UAAY,CACb,AACD,cACE,kBAAmB,AACnB,QAAS,AACT,OAAQ,AACR,YAAa,AACb,kBAAmB,AACnB,WAAa,CACd,AACD,mBACE,qBAAsB,AACtB,aAAc,AACd,UAAW,AACX,WAAY,AACZ,kBAAmB,AACnB,6BAAkC,CACnC,AACD,0BACE,WAAY,AACZ,kBAAmB,AACnB,6BAAkC,CACnC",file:"slider.vue",sourcesContent:["\n.slider {\n  min-height: 1px;\n}\n.slider .slider-group {\n  position: relative;\n  overflow: hidden;\n  white-space: nowrap;\n}\n.slider .slider-group .slider-item {\n  float: left;\n  box-sizing: border-box;\n  overflow: hidden;\n  text-align: center;\n}\n.slider .slider-group .slider-item a {\n  display: block;\n  width: 100%;\n  overflow: hidden;\n  text-decoration: none;\n}\n.slider .slider-group .slider-item a img {\n  display: block;\n  width: 100%;\n}\n.slider .dots {\n  position: absolute;\n  right: 0;\n  left: 0;\n  bottom: 12px;\n  text-align: center;\n  font-size: 0;\n}\n.slider .dots .dot {\n  display: inline-block;\n  margin: 0 4px;\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: rgba(255,255,255,0.5);\n}\n.slider .dots .dot.active {\n  width: 20px;\n  border-radius: 5px;\n  background: rgba(255,255,255,0.8);\n}"],sourceRoot:""}])},625:function(e,t,n){var i=n(614);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n(579)("383ad1f8",i,!0,{})},629:function(e,t,n){var i=n(618);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n(579)("5b1325ad",i,!0,{})},632:function(e,t,n){function i(e){n(629)}var o=n(9)(n(599),n(642),i,null,null);e.exports=o.exports},638:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"recommend",staticClass:"recommend"},[n("scroll",{ref:"scroll",staticClass:"recommend-content",attrs:{data:e.discList}},[n("div",[e.recommends.length?n("div",{staticClass:"slider-wrapper"},[n("slider",e._l(e.recommends,function(t){return n("div",[n("a",{attrs:{href:t.linkUrl}},[n("img",{staticClass:"needsclick",attrs:{src:t.picUrl,alt:""},on:{load:e.loadImage}})])])}))],1):e._e(),e._v(" "),n("div",{staticClass:"recommend-list"},[n("h1",{staticClass:"list-title"},[e._v("热门歌单推荐")]),e._v(" "),n("ul",e._l(e.discList,function(t){return n("li",{staticClass:"item",on:{click:function(n){e.selectItem(t)}}},[n("div",{staticClass:"icon"},[n("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.imgurl,expression:"item.imgurl"}],attrs:{width:"60",height:"60",alt:""}})]),e._v(" "),n("div",{staticClass:"text"},[n("h2",{staticClass:"name",domProps:{innerHTML:e._s(t.creator.name)}}),e._v(" "),n("p",{staticClass:"desc",domProps:{innerHTML:e._s(t.dissname)}})])])}))])]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!e.discList.length,expression:"!discList.length"}],staticClass:"loading-container"},[n("loading")],1)]),e._v(" "),n("router-view")],1)},staticRenderFns:[]}},642:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"slider",staticClass:"slider"},[n("div",{ref:"sliderGroup",staticClass:"slider-group"},[e._t("default")],2),e._v(" "),n("div",{staticClass:"dots"},e._l(e.dots,function(t,i){return n("span",{staticClass:"dot",class:{active:e.currentPageIndex===i}})}))])},staticRenderFns:[]}}});
//# sourceMappingURL=3.7fa48109a847b60b9b2d.js.map