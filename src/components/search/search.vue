<template>
	<div class="search">
		<div class="search-box-wrapper">
			<search-box :placeholder="placeholder" @query="onQueryChange"></search-box>
		</div>
		<div class="shortcut-wrapper" v-show="!query">
			<div class="shortcut">
				<div class="hot-key">
					<h1 class="title fs14">热门搜索</h1>
					<ul>
						<li class="item" v-for="item in hotKey">{{item.k}}</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="shortcut-wrapper" v-show="query">
			<suggest :query="query"></suggest>
		</div>
	</div>
</template>

<script>
	import {getHotKey} from 'api/search';

	import SearchBox from 'components/search-box/search-box';
	import Suggest from 'base/suggest/suggest';

	export default {
		name:'Search',
		data(){
			return {
				placeholder:'搜索歌曲、歌手',
				hotKey:[],
				query:''
			}
		},
		methods:{
			_getHotKey(){
				let this_ = this;
				getHotKey().then((res) => {
					if(res.code == 0){
						this.hotKey = res.data.hotkey.slice(0,10);
					}
				})
			},
			onQueryChange:function(newQuery){
				this.query = newQuery;
			}
		},
		components:{
			SearchBox,
			Suggest
		},
		mounted(){
			this._getHotKey();
		}
	}
</script>

<style lang="stylus" scoped>
	.search-box-wrapper
		padding:20px;
		box-sizing:border-box;
	.shortcut-wrapper
		position:fixed;
		top:178px;
		left:0;
		bottom:0;
		width:100%;
		.shortcut
			height:100%;
			overflow:hidden;
			.hot-key
				margin:0 20px 20px;
				.title
					margin-bottom:20px;
					color:rgba(255,255,255,0.5);
				.item
					display:inline-block;
					padding:5px 10px;
					margin:0 20px 10px 0;
					border-radius:6px;
					background-color:#333;
					color:rgba(255,255,255,0.3);
					
</style>