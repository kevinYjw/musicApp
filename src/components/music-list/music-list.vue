<template>
	<div class="musicList">
		<div class="back" @click="back">
			<div class="icon-back fs22"></div>
		</div>
		<div class="title ellipsis fs18">{{title}}</div>
		<div class="bgImage" :style="bgImageStyle" ref="bgImage">
			<div class="play-wrapper">
				<div class="play" @click="random" ref="playBtn">
					<i class="icon-play"></i>
					<span class="text fs12">随机播放全部</span>
				</div>
			</div>
		</div>
		<div class="bg-layer" ref="bgLayer"></div>
		<scroll :data='songs' :probeType="3" :listenScroll="true" @scroll="scroll" class='list' ref="list">
			<div class="songs-list-wrapper">
				<songs-list :songs="songs" @select="selectItem" ref="songsList" :rank="rank"></songs-list>
			</div>
		</scroll>
		<div class="loading-wrapper" v-if="songs.length <= 0">
			<loading></loading>
		</div>
	</div>
</template>

<script>
	import {mapActions} from 'vuex';

	import Scroll from 'base/scroll/scroll';
	import SongsList from 'base/songs-list/songs-list';
	import {prefixStyle} from 'common/js/dom';
	import Loading from 'base/loading/loading';
	import {playlistMixin} from 'common/js/mixin';

	const transform = prefixStyle('transform');

	export default {
		name:'MusicList',
		mixins:[playlistMixin],
		props:{
			title:{
				type:String,
				default:''
			},
			bgImage:{
				type:String,
				default:''
			},
			songs:{
				type:Array,
				default:[]
			},
			rank:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return {
				scrollY:0
			}
		},
		computed:{
			bgImageStyle(){
				return `background-image:url(${this.bgImage})`;
			}
		},
		methods:{
			scroll(pos){
				this.scrollY = pos.y;
			},
			back(){
				this.$router.back();
			},
			selectItem(song,index){
				this.selectPlay({songs:this.songs,index});
			},
			random(){
				console.log(this.songs,'1');
				this.randomPlay({songs:this.songs});
			},
			handlePlaylist(playList){
				const bottom = playList.length > 0 ? '60px' : '';
				this.$refs.list.$el.style.bottom = bottom;
				this.$refs.list.refresh();
			},
			...mapActions([
				'selectPlay',
				'randomPlay'
			])
		},
		watch:{
			scrollY(newY){
				let translateY = Math.max(this.minTransalteY,newY);
				let zIndex = 0;
				let scale = 1;
				const percent = Math.abs(newY / this.imageHeight)
				if(newY > 0){
					scale = 1 + percent;
				}
				this.$refs.bgLayer.style[transform] = `translate3d(0,${translateY}px,0)`
				if(newY < this.minTransalteY){
					zIndex = 10;
					this.$refs.bgImage.style['paddingBottom'] = '0';
					this.$refs.bgImage.style['height'] = '40px';
					this.$refs.playBtn.style.display = 'none';
				} else {
					this.$refs.bgImage.style['paddingBottom'] = '70%';
					this.$refs.bgImage.style['height'] = '0';
					this.$refs.playBtn.style.display = 'block';
				}
				this.$refs.bgImage.style['zIndex'] = zIndex;
				this.$refs.bgImage.style[transform] = `scale(${scale})`
			}
		},
		components:{
			Scroll,
			SongsList,
			Loading
		},
		mounted(){
			this.imageHeight = this.$refs.bgImage.clientHeight;
			this.minTransalteY = -this.imageHeight + 40;
			this.$refs.list.$el.style.top = `${this.imageHeight}px`;
		}
	}
</script>

<style lang="stylus" scoped>
	.musicList
		position:fixed;
		top:0;
		left:0;
		right:0;
		bottom:0;
		z-index:100;
		background-color:#222;
		.back
			position:absolute;
			top:0;
			left:6px;
			z-index:50;
			.icon-back
				padding:10px;
				color:#ffcd32;
		.title
			position:absolute;
			top:0;
			left:10%;
			width:80%;
			height:40px;
			line-height:40px;
			text-align:center;
			color:#fff;
			z-index:40;
		.bgImage
			position: relative;
			width:100%;
			height:0;
			padding-bottom:70%;
			background-size:cover;
			transform-origin:top;
			.play-wrapper
				position: absolute;
				bottom:20px;
				z-index:50;
				width:100%;
				.play
					width:135px;
					padding:7px 0;
					margin:0 auto;
					text-align:center;
					box-sizing:border-box;
					color:#ffcd32;
					border:1px solid #ffcd32;
					border-radius:100px;
		.bg-layer
			height:100%;
			background-color:#222;
		.list
			position:fixed;
			top:0;
			bottom:0;
			width:100%;
			.songs-list-wrapper
				padding:20px 30px;
				box-sizing:border-box;
		.loading-wrapper
			position:absolute;
			top:50%;
			left:50%;
			transform:translate(-50%,-50%);
</style>