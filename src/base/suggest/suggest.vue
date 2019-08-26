<template>
	<scroll class="suggest" :data="result" :pullup="pullup" @scrollToEnd="scrollToEnd" ref="scroll">
		<ul class="suggest-list">
			<li class="suggest-item flex" v-for="item in result">
				<div class="icon"><i class="fs14" :class="getIconCls(item)"></i></div>
				<div class="name fs14 ellipsis" v-html="getDisplayName(item)"></div>
			</li>
			<loading v-show="hasMore"></loading>
		</ul>
	</scroll>
</template>

<script>
	import {search} from 'api/search';
	import { createSong, isValidMusic, processSongsUrl } from 'common/js/song';

	import Scroll from 'base/scroll/scroll';
	import Loading from 'base/loading/loading';

	export default {
		name:'Suggest',
		props:{
			query:{
				type:String,
				default:''
			},
			showSinger:{//是否显示歌手
				type:Boolean,
				default:true,
			}
		},
		data(){
			return {
				page:1,
				result:[],
				pullup:true,
				hasMore:true, //是否有更多的数据
			}
		},
		methods:{
			_search(){
				this.hasMore = true;
				this.page = 1;
				this.$refs.scroll.scrollTo(0,0);
				search(this.query,this.page,this.showSinger,20).then((res) => {
					if(res.code === 0){
						res = res.data;
						this._genResult(res).then((result) => {
							this.result = result;
						})
						this._checkMore(res);
					}
				})
			},
			scrollToEnd(){
				if(!this.hasMore){
					return;
				}
				this.page++;
				search(this.query,this.page,this.showSinger,20).then((res) => {
					if(res.code === 0){
						res = res.data;
						this._genResult(res).then((result) => {
							this.result = this.result.concat(result);
						})
						this._checkMore(res);
					}
				})
			},
			_checkMore:function(data){
				const song = data.song;
				if(!song.list.length || (song.curnum + song.curpage * 20) >= song.totalnum){
					this.hasMore = false;
				}
			},
			_genResult(data){
				let ret = [];
				console.log(data);
				if(data.zhida && data.zhida.singerid && this.page === 1){
					ret.push({...data.zhida,...{type:'singer'}})
				}
				console.log(ret);
				return processSongsUrl(this._normalizeSongs(data.song.list)).then((songs) => {
					ret = ret.concat(songs);
					console.log(ret);
					return ret;
				})
			},
			_normalizeSongs(list) {
				let ret = []
				list.forEach((musicData) => {
					if (isValidMusic(musicData)) {
						ret.push(createSong(musicData))
					}
				})
				return ret;
			},
			getIconCls(item){
				if(item.type === 'singer'){
					return 'icon-mine';
				} else {
					return 'icon-music';
				}
			},
			getDisplayName(item){
				if(item.type === 'singer'){
					return item.singername;
				} else {
					return `${item.name}-${item.singer}`;
				}
			}
		},
		watch:{
			query(){
				this._search();
			}
		},
		components:{
			Scroll,
			Loading
		}
	}
</script>

<style lang="stylus" scoped>
	.suggest
		height:100%;
		overflow:hidden;
		.suggest-list
			padding:0 30px;
			.suggest-item
				align-items:center;
				padding-bottom:20px;
				.icon
					flex:0 0 30px;
					width:30px;
					[class^='icon-']
						color:rgba(255,255,255,0.3);
				.name
					flex:1;
					color:rgba(255,255,255,0.3);
					overflow:hidden;
</style>