<template>
	<div class="recommend">
		推荐页面
	</div>
</template>

<script>
	import {getRecommend} from 'api/recommend';

	export default {
		name:'Recommend',
		methods:{
			_getRecommend(){
				getRecommend().then((res,data) => {
					console.log(res,data);
				})
			}
		},
		mounted(){
			this._getRecommend();
		}
	}
</script>

<style lang="stylus" scoped>
</style>