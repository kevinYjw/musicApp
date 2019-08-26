<template>
	<div class="searchBox flex">
		<div class="icon icon-search fs24"></div>
		<input type="text" class='fs14' v-model="query" :placeholder="placeholder">
		<div class="icon icon-dismiss fs24" v-show="query" @click="deleteQuery"></div>
	</div>
</template>

<script>
	export default {
		name:'SearchBox',
		props:{
			placeholder:{
				type:String,
				default:''
			}
		},
		data(){
			return {
				query:''
			}
		},
		methods:{
			deleteQuery(){
				this.query = '';
			}
		},
		created(){
			this.$watch('query',function(newQuery){
				this.$emit('query',newQuery);
			})
		}
	}
</script>

<style lang="stylus" scoped>
	.searchBox
		align-items:center;
		width:100%;
		padding:0 6px;
		height:40px;
		background-color:#333;
		border-radius:6px;
		box-sizing:border-box;
		.icon
			color:#222;
		input
			flex:1
			margin:0 5px;
			line-height:18px;
			background-color:#333;
			color:#fff;
			outline:none;
			border:none;
</style>