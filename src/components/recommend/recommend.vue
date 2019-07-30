<template>
	<div class="recommend">
		<div class="banner" v-if="bannerList.length > 0">
			<swiper>
				<div class="slider-item" v-for="item in bannerList">
					<a :href="item.linkUrl">
						<img :src="item.picUrl">
					</a>
				</div>
			</swiper>
		</div>
	</div>
</template>

<script>
	import {getRecommend} from 'api/recommend';
	import Swiper from 'base/swiper/swiper';

	export default {
		name:'Recommend',
		data(){
			return {
				bannerList:[],
			}
		},
		methods:{
			_getRecommend(){
				var this_ = this;
				getRecommend().then((res) => {
					console.log(res);
					if(res.code == 0){
						this_.bannerList = res.data.slider;
					}
				})
			}
		},
		components:{
			Swiper,
		},
		mounted(){
			this._getRecommend();
		}
	}
</script>

<style lang="stylus" scoped>
</style>