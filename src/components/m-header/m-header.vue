<template>
	<div class="m-header flex">
		<div class="header-icon"></div>
		<div class="text fs18">Chicken Music</div>
	</div>
</template>

<script>
	export default {
		name:'MHeader',
	}
</script>

<style lang="stylus" scoped>
	.m-header
		justify-content:center;
		align-items:center;
		height:44px;
		.header-icon
			width:30px;
			height:32px;
			background-image:url('./images/logo.png');
			background-size:100% 100%;
			margin-right:9px;
		.text
			color:#ffcd32;
</style>