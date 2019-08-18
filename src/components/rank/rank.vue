<template>
	<div class="rank" ref="rank">
		<scroll class="topList" :data="topList" ref="scroll">
			<ul>
				<li class="item flex" v-for="item in topList" @click="toTopList(item)">
					<div class="item-img"><img v-lazy="item.picUrl" alt="" width="100%" height='100%'></div>
					<ul class="songlist flex fs12">
						<li class="song ellipsis" v-for="(song,index) in item.songList">
							<span>{{index + 1}}</span>
							<span>{{song.songname}}-{{song.singername}}</span>
						</li>
					</ul>
				</li>
			</ul>
			<div class="loading-wrapper" v-if="topList.length <= 0">
				<loading></loading>
			</div>
		</scroll>
		<router-view></router-view>
	</div>
</template>

<script>
	import Scroll from 'base/scroll/scroll';
	import {playlistMixin} from 'common/js/mixin';
	import Loading from 'base/loading/loading';

	import {getTopList} from 'api/rank';
	import {mapMutations} from 'vuex';

	export default {
		name:'Rank',
		mixins:[playlistMixin],
		data(){
			return {
				topList:[]
			}
		},
		methods:{
			_getTopList(){
				let this_ = this;
				getTopList().then((res) => {
					res = res.data;
					this_.topList = res.topList;
				})
			},
			handlePlaylist(playList){
				const bottom = playList.length > 0 ? '60px' : '';
				this.$refs.rank.style.bottom = bottom;
				this.$refs.scroll.refresh();
			},
			toTopList(item){
				this.$router.push({
					path:`/rank/${item.id}`
				})
				this.setTopList(item);
			},
			...mapMutations({
				'setTopList':'SET_TOP_LIST'
			})
		},
		components:{
			Scroll,
			Loading
		},
		mounted(){
			this._getTopList();
		}
	}
</script>

<style lang="stylus" scoped>
	.rank
		position:fixed;
		top:88px;
		bottom:0;
		width:100%;
		.topList
			height:100%;
			overflow:hidden;
			.item
				margin:0 20px;
				height:100px;
				padding-top:20px;
				.item-img
					width:100px;
					height:100px;
					flex:0 0 100px;
				.songlist
					flex:1;
					flex-direction:column;
					justify-content:center;
					padding:0 20px;
					height:100%;
					overflow:hidden;
					background-color:#333;
					color:rgba(255,255,255,0.3);
					.song
						line-height:26px;
		.loading-wrapper
			position:absolute;
			top:50%;
			left:50%;
			transform:translate(-50%,-50%);
					
</style>