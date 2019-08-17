<template>
	<div class="recommend" ref="recommend">
		<scroll :data="disclist" ref="scroll" class="recommend-wrapper"> 
			<div>
				<div class="banner" v-if="bannerList.length > 0">
					<swiper>
						<div class="slider-item" v-for="item in bannerList">
							<a :href="item.linkUrl">
								<img :src="item.picUrl" @load="loadImage">
							</a>
						</div>
					</swiper>
				</div>
				<div class="recommend-list">
					<div class="title fs14">热门歌单推荐</div>
					<ul v-if="disclist.length > 0">
						<li v-for="item in disclist" class="item flex" @click="toDisc(item)">
							<div class="item-img"><img v-lazy="item.imgurl" alt="" width="60" height="60"></div>
							<div class="text">
								<h2 class="fs16">{{item.creator.name}}</h2>
								<p class="desc fs14">{{item.dissname}}</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="loading-wrapper" v-if="disclist.length <= 0">
				<loading></loading>
			</div>
		</scroll>
		<router-view></router-view>
	</div>
</template>

<script>
	import {getRecommend,getDiscList} from 'api/recommend';
	import Swiper from 'base/swiper/swiper';
	import Scroll from 'base/scroll/scroll';
	import Loading from 'base/loading/loading';
	import {playlistMixin} from 'common/js/mixin';
	import {mapMutations} from 'vuex';

	export default {
		name:'Recommend',
		mixins:[playlistMixin],
		data(){
			return {
				bannerList:[],
				disclist:[],
			}
		},
		methods:{
			_getRecommend(){
				let this_ = this;
				getRecommend().then((res) => {
					if(res.code == 0){
						this_.bannerList = res.data.slider;
					}
				})
			},
			_getDiscList:function(){
				let this_ = this;
				getDiscList().then((res) => {
					if(res.code == 0){
						this_.disclist = res.data.list;
						console.log(res.data.list)
					}
				})
			},
			loadImage(){
				if(!this.checkloaded){
					this.checkloaded = true;
					setTimeout(() => {
						this.$refs.scroll.refresh();
					},20)
				}
			},
			handlePlaylist(playList){
				const bottom = playList.length > 0 ? '60px' : '';
				this.$refs.recommend.style.paddingBottom = bottom;
				this.$refs.recommend.style.boxSizing = 'border-box';
				this.$refs.scroll.refresh();
			},
			toDisc(item){
				this.$router.push({
					path:`/recommend/${item.dissid}`
				})
				this.setDisc(item);
			},
			...mapMutations({
				'setDisc':'SET_DISC'
			})
		},
		components:{
			Swiper,
			Scroll,
			Loading,
		},
		mounted(){
			this._getRecommend();
			this._getDiscList();
		}
	}
</script>

<style lang="stylus" scoped>
	.recommend
		height:calc(100vh - 88px);
		.recommend-wrapper
			position:relative;
			height:100%;
			overflow:hidden;
			.recommend-list
				.title
					height:65px;
					line-height:65px;
					text-align:center;
					color:#ffcd32;
				.item
					align-items:center;
					padding:0 20px 20px;
					box-sizing:border-box;
					.item-img
						width:60px;
						flex:0 0 60px;
						margin-right:20px;
					.text
						h2
							margin-bottom:10px;
							color:#fff;
							font-weight:400;
						.desc
							color:rgba(255,255,255,0.3);
			.loading-wrapper
				position:absolute;
				top:50%;
				left:50%;
				transform:translate(-50%,-50%);
						
</style>