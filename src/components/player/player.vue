<template>
	<div class="player" v-show="playList.length > 0">
		<transition appear name="normal" @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
			<div class="normal-player" v-show="fullScreen">
				<div class="background">
					<img :src="currentSong.image" width="100%" height="100%">
				</div>
				<div class="top">
					<div class="back">
						<div class="icon-back fs22" @click="_setFullScreen(false)"></div>
					</div>
					<div class="title fs18 ellipsis">{{currentSong.name}}</div>
					<div class="subtitle fs14">{{currentSong.singer}}</div>
				</div>
				<div class="middle">
					<div class="middle-1">
						<div class="cd-wrapper" ref="cdWrapper">
							<div class="cd" :class="cdCls"><img :src="currentSong.image" alt="" class="image"></div>
						</div>
						<div class="playing-lyric-wrapper">
							<div class="playing-lyric"></div>
						</div>
					</div>
				</div>
				<div class="bottom">
					<div class="progress-wrapper flex">
						<div class="time fs12 time-l">{{format(currentTime)}}</div>
						<div class="progress-bar-wrapper">
							<progress-bar :percent='percent' @percentChange="_percentChange"></progress-bar>
						</div>
						<div class="time fs12 time-r">{{format(currentSong.duration)}}</div>
					</div>
					<div class="operators flex">
						<div class="icon i-left">
							<i class="icon-sequence"></i>
						</div>
						<div class="icon i-left" @click='prev'>
							<i class="icon-prev"></i>
						</div>
						<div class="icon i-center" @click="togglePlaying">
							<i :class="playIcon"></i>
						</div>
						<div class="icon i-right" @click="next">
							<i class="icon-next"></i>
						</div>
						<div class="icon i-right">
							<i class="icon icon-not-favorite"></i>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<transition appear name="mini">
			<div class="mini-player flex" v-show="!fullScreen" @click="_setFullScreen(true)">
				<div class="icon">
					<div class="imgWrapper" :class="cdCls">
						<img :src="currentSong.image" width='40' height="40">
					</div>
				</div>
				<div class="text flex">
					<h2 class="name ellipsis fs14">{{currentSong.name}}</h2>
					<p class="desc ellipsis fs14">{{currentSong.singer}}</p>
				</div>
				<div class="control" @click.stop="togglePlaying">
					<i class="icon-mini" :class="miniPlayIcon"></i>
				</div>
				<div class="control">
					<i class="icon-playlist"></i>
				</div>
			</div>
		</transition>
		<audio :src="currentSong.url" ref="audio" @playing="ready" @error="error" @timeupdate='updateTime'></audio>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex';
	import {mapMutations} from 'vuex';

	import animations from 'create-keyframe-animation';
	import {prefixStyle} from 'common/js/dom';
	import ProgressBar from 'base/progress-bar/progress-bar';

	const transform = prefixStyle('transform');
	const transtion = prefixStyle('transtion');

	export default {
		name:'Player',
		computed:{
			playIcon(){
				return this.playing ? 'icon-pause' : 'icon-play';
			},
			miniPlayIcon(){
				return this.playing ? 'icon-pause-mini' : 'icon-play-mini';
			},
			cdCls(){
				return this.playing ? 'play' : 'play pause';
			},
			percent(){
				return this.currentTime / this.currentSong.duration;
			},
			...mapGetters([
				'fullScreen',
				'playList',
				'currentSong',
				'playing',
				'currentIndex'
			])
		},
		data(){
			return {
				songReady:false,
				currentTime:0,
			}
		},
		methods:{
			_setFullScreen:function(flag){
				this.setFullScreen(flag);
			},
			enter(el,done){
				const {x,y,scale} = this._getPosAndScale();
				const animation = {
					0:{
						transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
					},
					60:{
						transform: `translate3d(0,0,0) scale(1.1)`
					},
					100:{
						transform: 'translate3d(0,0,0) scale(1)'
					}
				}

				animations.registerAnimation({
					name:'move',
					animation,
					presets:{
						duration:400,
						easing:'linear'
					}
				})

				animations.runAnimation(this.$refs.cdWrapper,'move',done);
			},
			afterEnter(){
				animations.unregisterAnimation("move");
				this.$refs.cdWrapper.style.animation = '';
			},
			leave(el,done){
				const {x,y,scale} = this._getPosAndScale();
				this.$refs.cdWrapper.style.transition = 'all 0.4s';
				this.$refs.cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`;
				this.$refs.cdWrapper.addEventListener('transitionend',done);
			},
			afterLeave(){
				this.$refs.cdWrapper.style.transition = '';
				this.$refs.cdWrapper.style[transform] = '';
			},
			//获取初始位置
			_getPosAndScale(){
				const targetWidth = 40;
				const paddingLeft = 40;
				const paddingBottom = 30;
				const paddingTop = 80;
				const width = window.innerWidth * 0.8;
				const scale = targetWidth / width;
				const x = -(window.innerWidth / 2 - paddingLeft);
				const y = window.innerHeight - paddingTop - paddingBottom - width / 2;
				return {
					x,
					y,
					scale
				}
			},
			togglePlaying(){
				if(!this.songReady){
					return;
				}
				this.setPlaying(!this.playing);
				this.songReady = true;
			},
			prev(){
				if(!this.songReady){
					return;
				}
				let index = this.currentIndex - 1;
				if(index === -1){
					index = this.playList.length - 1;
				}
				this.setCurrentIndex(index);
				if(!this.playing){
					this.togglePlaying();
				}
				this.songReady = true;
			},
			next(){
				if(!this.songReady){
					return;
				}
				let index = this.currentIndex + 1;
				if(index === this.playList.length){
					index = 0;
				}
				this.setCurrentIndex(index);
				if(!this.playing){
					this.togglePlaying();
				}
				this.songReady = true;
			},
			ready(){
				this.songReady = true;
			},
			error(){
				this.songReady = true;
			},
			updateTime(e){
				this.currentTime = e.target.currentTime;
			},
			format(time){
				time = time | 0;
				let minute = String(time / 60 | 0).padStart(2,'0');
				let second = String(time % 60 | 0).padStart(2,'0');
				return `${minute}:${second}`;
			},
			_percentChange(percent){
				this.$refs.audio.currentTime = this.currentSong.duration * percent;
				if(!this.playing){
					this.togglePlaying();
				}
			},
			...mapMutations({
				'setFullScreen':'SET_FULL_SCREEN',
				'setPlaying':'SET_PLAYING',
				'setCurrentIndex':'SET_CURRENT_INDEX'
			})
		},
		watch:{
			currentSong(){
				this.$nextTick(() => {
					this.$refs.audio.play();
				})
			},
			playing(newPlay){
				const audio = this.$refs.audio;
				this.$nextTick(() => {
					newPlay ? audio.play() : audio.pause();
				})
			}
		},
		components:{
			ProgressBar
		},
		created(){
		}
	}
</script>

<style lang="stylus" scoped>
	.player
		.normal-player
			position:fixed;
			top:0;
			left:0;
			right:0;
			bottom:0;
			z-index:150;
			background-color:#222;
			&.normal-enter-active,&.normal-leave-active
				transition:all 0.4s;
				.top,.bottom
					transition:all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
			&.normal-enter,&.normal-leave-to
				opacity:0;
				.top
					transform:translate3d(0,-100px,0);
				.bottom
					transform:translate3d(0,100px,0)
			.background
				position:absolute;
				top:0;
				left:0;
				width:100%;
				height:100%;
				z-index:-1;
				opacity:0.6;
				filter: blur(20px);
			.top
				position:relative;
				margin-bottom:25px;
				.back
					position:absolute;
					top:0;
					left:6px;
					z-index:50;
					.icon-back
						display:block;
						padding:9px;
						color:#ffcd32;
				.title
					width:70%;
					height:40px;
					line-height:40px;
					text-align:center;
					color:#fff;
					margin:0 auto;
				.subtitle
					height:20px;
					line-height:20px;
					color:#fff;
					text-align:center;
			.middle
				position:fixed;
				width:100%;
				top:80px;
				bottom:170px;
				white-space:nowrap;
				font-size:0;
				.middle-1
					display:inline-block;
					vertical-align:top;
					position:relative;
					width:100%;
					height:0;
					padding-top:80%;
					.cd-wrapper
						position:absolute;
						left:10%;
						top:0;
						width:80%;
						box-sizing:border-box;
						height:100%;
						.cd
							width:100%;
							height:100%;
							border-radius:50%;
							&.play
								animation:rotate 20s linear infinite;
							&.pause
								animation-play-state:paused
							.image
								position:absolute;
								left:0;
								top:0;
								width:100%;
								height:100%;
								box-sizing:border-box;
								border-radius:50%;
								border:10px solid rgba(255,255,255,0.1);
					.playing-lyric-wrapper
						width:80%;
						margin:30px auto 0;
						overflow:hidden;
						text-align:center;
						.playing-lyric
							height:20px;
							line-height:20px;
							color:rgba(255,255,255,0.5);
			.bottom
				position:absolute;
				bottom:50px;
				width:100%;
				.progress-wrapper
					width:80%;
					align-items:center;
					margin:0 auto;
					padding:10px 0;
					.progress-bar-wrapper
						flex:1
					.time
						color:#fff;
						width:35px;
						flex:0 0 35px;
						line-height:30px;
						&.time-r
							text-align:right;
						&.time-l
							text-align:left;
				.operators
					align-items:center;
					.icon
						flex:1;
						color:#ffcd32;
						i
							font-size:30px;
					.i-left
						text-align:right;
					.i-center
						padding:0 20px;
						text-align:center;
						i
							font-size:40px;
					.i-right
						text-align:left;
		.mini-player
			align-items:center;
			position:fixed;
			bottom:0;
			left:0;
			width:100%;
			height:60px;
			background-color:#333;
			z-index:180;
			&.mini-enter-active,&.mini-leave-active
				transition:all 0.4s;
			&.mini-enter,&.mini-leave-to
				opacity:0;
			.icon
				flex:0 0 40px;
				width:40px;
				height:40px;
				padding:0 10px 0 20px;
				.imgWrapper
					width:100%;
					height:100%;
					&.play
						animation:rotate 20s linear infinite;
					&.pause
						animation-play-state:paused
					img
						border-radius:50%;
			.text
				flex-direction:column;
				justify-content:center;
				flex:1;
				line-height:20px;
				overflow:hidden;
				.name
					margin-bottom:2px;
					color:#fff;
				.desc
					color:rgba(255,255,255,0.3);
			.control
				flex: 0 0 30px;
				width:30px;
				padding:0 10px;
				.icon-play-mini, .icon-pause-mini, .icon-playlist
					color:rgba(255,205,49,0.5);
					font-size:30px;
				.icon-mini
					font-size:31px;
	@keyframes rotate
		0%
			transform: rotate(0);
		100%
			transform: rotate(360deg);

</style>