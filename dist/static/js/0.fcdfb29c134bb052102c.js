webpackJsonp([0],{585:function(t,i,n){function e(t){n(627)}var s=n(9)(n(605),n(640),e,null,null);t.exports=s.exports},590:function(t,i,n){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var e=n(58),s=n.n(e),a=n(66),l=n.n(a),o=n(202),A=n.n(o),r=n(203),c=n.n(r),p=n(49),g=n(130),d=n(86),u=n.i(g.a)("transform"),m=n.i(g.a)("backdrop-filter");i.default={mixins:[d.c],props:{bgImage:{type:String,default:""},songs:{type:Array,default:[]},title:{type:String,default:""},rank:{type:Boolean,default:!1}},data:function(){return{scrollY:0}},created:function(){this.probeType=3,this.listenScroll=!0},computed:{bgStyle:function(){return"background-image:url("+this.bgImage+")"}},mounted:function(){this.imageHeight=this.$refs.bgImage.clientHeight,this.minTranslateY=40-this.imageHeight,this.$refs.list.$el.style.top=this.imageHeight+"px"},methods:s()({handlePlaylist:function(t){var i=t.length>0?"60px":"";this.$refs.list.$el.style.bottom=i,this.$refs.list.refresh()},scroll:function(t){this.scrollY=t.y},back:function(){this.$router.back()},selectItem:function(t,i){this.selectPlay({list:this.songs,index:i})},random:function(){this.randomPlay({list:this.songs})}},n.i(p.c)(["selectPlay","randomPlay"])),watch:{scrollY:function(t){var i=Math.max(this.minTranslateY,t),n=0,e=1,s=0;this.$refs.layer.style[u]="translate3d(0,"+i+"px,0)";var a=Math.abs(t/this.imageHeight);t>0?(e=1+a,n=10):s=Math.min(20*a,20),this.$refs.filter.style[m]="blur("+s+"px)",t<this.minTranslateY?(n=10,this.$refs.bgImage.style.paddingTop=0,this.$refs.bgImage.style.height="40px",this.$refs.playBtn.style.display="none"):(this.$refs.bgImage.style.paddingTop="70%",this.$refs.bgImage.style.height=0,this.$refs.playBtn.style.display=""),this.$refs.bgImage.style.zIndex=n,this.$refs.bgImage.style[u]="scale("+e+")"}},components:{Scroll:l.a,Loading:A.a,SongList:c.a}}},591:function(t,i,n){i=t.exports=n(578)(!0),i.push([t.i,".music-list{position:fixed;z-index:100;top:0;left:0;right:0;bottom:0;background:#222}.music-list .back{position:absolute;top:0;left:0;z-index:50}.music-list .back .icon-back{display:block;padding:10px;font-size:22px;color:#ffcd32}.music-list .title{position:absolute;top:0;left:10%;z-index:40;width:80%;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;text-align:center;line-height:40px;font-size:18px;color:#fff}.music-list .bg-image{position:relative;width:100%;height:0;padding-top:70%;transform-origin:top;background-size:cover}.music-list .bg-image .play-wrapper{position:absolute;bottom:20px;z-index:50;width:100%}.music-list .bg-image .play-wrapper .play{box-sizing:border-box;width:135px;padding:7px 0;margin:0 auto;text-align:center;border:1px solid #ffcd32;color:#ffcd32;border-radius:100px;font-size:0}.music-list .bg-image .play-wrapper .play .icon-play{display:inline-block;vertical-align:middle;margin-right:6px;font-size:16px}.music-list .bg-image .play-wrapper .play .text{display:inline-block;vertical-align:middle;font-size:12px}.music-list .bg-image .filter{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(7,17,27,.4)}.music-list .bg-layer{position:relative;height:100%;background:#222}.music-list .list{position:fixed;top:0;bottom:0;width:100%;background:#222}.music-list .list .song-list-wrapper{padding:20px 30px}.music-list .list .loading-container{position:absolute;width:100%;top:50%;transform:translateY(-50%)}","",{version:3,sources:["/Applications/XAMPP/xamppfiles/htdocs/vue-music/src/components/music-list/music-list.vue"],names:[],mappings:"AACA,YACE,eAAgB,AAChB,YAAa,AACb,MAAO,AACP,OAAQ,AACR,QAAS,AACT,SAAU,AACV,eAAiB,CAClB,AACD,kBACE,kBAAmB,AACnB,MAAO,AACP,OAAQ,AACR,UAAY,CACb,AACD,6BACE,cAAe,AACf,aAAc,AACd,eAAgB,AAChB,aAAe,CAChB,AACD,mBACE,kBAAmB,AACnB,MAAO,AACP,SAAU,AACV,WAAY,AACZ,UAAW,AACX,uBAAwB,AACxB,gBAAiB,AACjB,mBAAoB,AACpB,kBAAmB,AACnB,iBAAkB,AAClB,eAAgB,AAChB,UAAY,CACb,AACD,sBACE,kBAAmB,AACnB,WAAY,AACZ,SAAU,AACV,gBAAiB,AACjB,qBAAsB,AACtB,qBAAuB,CACxB,AACD,oCACE,kBAAmB,AACnB,YAAa,AACb,WAAY,AACZ,UAAY,CACb,AACD,0CACE,sBAAuB,AACvB,YAAa,AACb,cAAe,AACf,cAAe,AACf,kBAAmB,AACnB,yBAA0B,AAC1B,cAAe,AACf,oBAAqB,AACrB,WAAa,CACd,AACD,qDACE,qBAAsB,AACtB,sBAAuB,AACvB,iBAAkB,AAClB,cAAgB,CACjB,AACD,gDACE,qBAAsB,AACtB,sBAAuB,AACvB,cAAgB,CACjB,AACD,8BACE,kBAAmB,AACnB,MAAO,AACP,OAAQ,AACR,WAAY,AACZ,YAAa,AACb,2BAA8B,CAC/B,AACD,sBACE,kBAAmB,AACnB,YAAa,AACb,eAAiB,CAClB,AACD,kBACE,eAAgB,AAChB,MAAO,AACP,SAAU,AACV,WAAY,AACZ,eAAiB,CAClB,AACD,qCACE,iBAAmB,CACpB,AACD,qCACE,kBAAmB,AACnB,WAAY,AACZ,QAAS,AACT,0BAA4B,CAC7B",file:"music-list.vue",sourcesContent:["\n.music-list {\n  position: fixed;\n  z-index: 100;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: #222;\n}\n.music-list .back {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 50;\n}\n.music-list .back .icon-back {\n  display: block;\n  padding: 10px;\n  font-size: 22px;\n  color: #ffcd32;\n}\n.music-list .title {\n  position: absolute;\n  top: 0;\n  left: 10%;\n  z-index: 40;\n  width: 80%;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n  text-align: center;\n  line-height: 40px;\n  font-size: 18px;\n  color: #fff;\n}\n.music-list .bg-image {\n  position: relative;\n  width: 100%;\n  height: 0;\n  padding-top: 70%;\n  transform-origin: top;\n  background-size: cover;\n}\n.music-list .bg-image .play-wrapper {\n  position: absolute;\n  bottom: 20px;\n  z-index: 50;\n  width: 100%;\n}\n.music-list .bg-image .play-wrapper .play {\n  box-sizing: border-box;\n  width: 135px;\n  padding: 7px 0;\n  margin: 0 auto;\n  text-align: center;\n  border: 1px solid #ffcd32;\n  color: #ffcd32;\n  border-radius: 100px;\n  font-size: 0;\n}\n.music-list .bg-image .play-wrapper .play .icon-play {\n  display: inline-block;\n  vertical-align: middle;\n  margin-right: 6px;\n  font-size: 16px;\n}\n.music-list .bg-image .play-wrapper .play .text {\n  display: inline-block;\n  vertical-align: middle;\n  font-size: 12px;\n}\n.music-list .bg-image .filter {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(7,17,27,0.4);\n}\n.music-list .bg-layer {\n  position: relative;\n  height: 100%;\n  background: #222;\n}\n.music-list .list {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  width: 100%;\n  background: #222;\n}\n.music-list .list .song-list-wrapper {\n  padding: 20px 30px;\n}\n.music-list .list .loading-container {\n  position: absolute;\n  width: 100%;\n  top: 50%;\n  transform: translateY(-50%);\n}"],sourceRoot:""}])},592:function(t,i,n){var e=n(591);"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);n(579)("7bc95e06",e,!0,{})},593:function(t,i,n){function e(t){n(592)}var s=n(9)(n(590),n(594),e,null,null);t.exports=s.exports},594:function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"music-list"},[n("div",{staticClass:"back",on:{click:t.back}},[n("i",{staticClass:"icon-back"})]),t._v(" "),n("h1",{staticClass:"title",domProps:{innerHTML:t._s(t.title)}}),t._v(" "),n("div",{ref:"bgImage",staticClass:"bg-image",style:t.bgStyle},[n("div",{staticClass:"play-wrapper"},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.songs.length>0,expression:"songs.length>0"}],ref:"playBtn",staticClass:"play",on:{click:t.random}},[n("i",{staticClass:"icon-play"}),t._v(" "),n("span",{staticClass:"text"},[t._v("随机播放全部")])])]),t._v(" "),n("div",{ref:"filter",staticClass:"filter"})]),t._v(" "),n("div",{ref:"layer",staticClass:"bg-layer"}),t._v(" "),n("scroll",{ref:"list",staticClass:"list",attrs:{"probe-type":t.probeType,"listen-scroll":t.listenScroll,data:t.songs},on:{scroll:t.scroll}},[n("div",{staticClass:"song-list-wrapper"},[n("song-list",{attrs:{rank:t.rank,songs:t.songs},on:{select:t.selectItem}})],1),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!t.songs.length,expression:"!songs.length"}],staticClass:"loading-container"},[n("loading")],1)])],1)},staticRenderFns:[]}},597:function(t,i,n){"use strict";function e(){var t=l()({},A.b,{channel:"singer",page:"list",key:"all_all_all",pagesize:100,pagenum:1,hostUin:0,needNewCode:0,platform:"yqq",g_tk:1685268878});return n.i(o.a)("https://c.y.qq.com/v8/fcg-bin/v8.fcg",t,A.c)}function s(t){var i=l()({},A.b,{hostUin:0,needNewCode:0,platform:"yqq",order:"listen",begin:0,num:100,songsStatus:1,g_tk:1685268878,singermid:t});return n.i(o.a)("https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg",i,A.c)}i.b=e,i.a=s;var a=n(87),l=n.n(a),o=n(129),A=n(57)},605:function(t,i,n){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var e=n(58),s=n.n(e),a=n(49),l=n(597),o=n(57),A=n(131),r=n(593),c=n.n(r);i.default={data:function(){return{songs:[]}},computed:s()({title:function(){return this.singer.name},bgImage:function(){return this.singer.avatar}},n.i(a.a)(["singer"])),created:function(){this._getDetail()},methods:{_getDetail:function(){var t=this;if(!this.singer.id)return void this.$router.push("/singer");n.i(l.a)(this.singer.id).then(function(i){i.code===o.a&&(t.songs=t._normalizeSongs(i.data.list))})},_normalizeSongs:function(t){var i=[];return t.forEach(function(t){var e=t.musicData;e.songid&&e.albummid&&i.push(n.i(A.b)(e))}),i}},components:{MusicList:c.a}}},616:function(t,i,n){i=t.exports=n(578)(!0),i.push([t.i,".slide-enter-active,.slide-leave-active{transition:all .3s}.slide-enter,.slide-leave-to{transform:translate3d(100%,0,0)}","",{version:3,sources:["/Applications/XAMPP/xamppfiles/htdocs/vue-music/src/components/singer-detail/singer-detail.vue"],names:[],mappings:"AACA,wCAEE,kBAAqB,CACtB,AACD,6BAEE,+BAAmC,CACpC",file:"singer-detail.vue",sourcesContent:["\n.slide-enter-active,\n.slide-leave-active {\n  transition: all 0.3s;\n}\n.slide-enter,\n.slide-leave-to {\n  transform: translate3d(100%, 0, 0);\n}"],sourceRoot:""}])},627:function(t,i,n){var e=n(616);"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);n(579)("6d370ede",e,!0,{})},640:function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("transition",{attrs:{name:"slide"}},[n("music-list",{attrs:{songs:t.songs,title:t.title,"bg-image":t.bgImage}})],1)},staticRenderFns:[]}}});
//# sourceMappingURL=0.fcdfb29c134bb052102c.js.map