<template>
	<div class="progress-bar" ref="progressBar" @click='progressClick'>
		<div class="bar-inner">
			<div class="progress" ref="progress"></div>
			<div class="progress-btn-wrapper" ref="progressBtn" @touchstart.prevent="progressTouchStart" @touchmove.prevent="progressTouchMove" @touchend.prevent="progressTouchEnd">
				<div class="progress-btn"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import {prefixStyle} from 'common/js/dom';

	const transform = prefixStyle('transform');

	export default {
		name:'ProgressBar',
		props:{
			percent:{
				type:Number,
				defualt:0
			}
		},
		watch:{
			percent(newPercent){
				if(newPercent > 0 && !this.touch.initiated){
					let barWidth = this.$refs.progressBar.clientWidth - 16;
					let offsetWidth = barWidth * newPercent;
					this._offset(offsetWidth);
				}
			},
		},
		methods:{
			progressTouchStart(e){
				this.touch.initiated = true;
				this.touch.start = e.touches[0].pageX;
				this.touch.left = this.$refs.progress.clientWidth;
			},
			progressTouchMove(e){
				if(!this.touch.initiated){
					return;
				}

				const deltaX = e.touches[0].pageX - this.touch.start;
				const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - 16,Math.max(0,deltaX + this.touch.left));
				this._offset(offsetWidth);
			},
			progressTouchEnd(){
				this.touch.initiated = false;
				this._triggerPercent();
			},
			_triggerPercent(){
				const barWidth = this.$refs.progressBar.clientWidth - 16;
				const percent = this.$refs.progress.clientWidth / (this.$refs.progressBar.clientWidth - 16);
				this.$emit('percentChange',percent);
			},
			_offset(offsetWidth){
				this.$refs.progress.style.width = `${offsetWidth}px`;
				this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`;
			},
			progressClick(e){
				this._offset(e.offsetX);
				this._triggerPercent();
			}
		},
		created(){
			this.touch = {};
		}
	}
</script>

<style lang="stylus" scoped>
	.progress-bar
		height:30px;
		.bar-inner 
			position:relative;
			top:13px;
			height:4px;
			background-color:rgba(255, 255, 255, 0.3);
			.progress 
				position: absolute;
				height:100%;
				background-color:#ffcd32;
			.progress-btn-wrapper
				position:absolute;
				left:-8px;
				top:-13px;
				width:30px;
				height:30px;
				.progress-btn
					position:relative;
					top:7px;
					left:7px;
					width:16px;
					height:16px;
					border:3px solid #fff;
					box-sizing:border-box;
					border-radius:50%;
					background-color:#ffcd32;
</style>
