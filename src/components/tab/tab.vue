<template>
	<div class="tab flex">
		<router-link tag="div" class="item" to='/recommend'>
			<span>推荐</span>
		</router-link>
		<router-link tag="div" class="item" to='/singer'>
			<span>歌手</span>
		</router-link>
		<router-link tag="div" class="item" to='/rank'>
			<span>排行</span>
		</router-link>
		<router-link tag="div" class="item" to='/search'>
			<span>搜索</span>
		</router-link>
	</div>
</template>

<script>
	export default {
		name:'Tab',
	}
</script>

<style lang="stylus" scoped>
	.tab
		.item
			flex:1;
			height:44px;
			line-height:44px;
			text-align:center;
			font-size:14px;
			color:rgba(255,255,255,0.5);
		.router-link-active
			span
				padding-bottom:5px;
				color:#ffcd32;
				border-bottom:2px solid #ffcd32;
			
</style>