<template>
	<div class="swiper" ref="swiper">
		<div class="swiper-group" ref="swiperGroup">
			<slot></slot>
		</div>
		<div class="dots">
			<span class="dot" v-for="(item,index) in dots" :class="currentPageIndex == index ? 'active' : '' "></span>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import {addClass} from 'common/js/dom';

	export default {
		name:'Swiper',
		props:{
			//是否循环播放
			loop:{
				type:Boolean,
				default:true,
			},
			//是否自动播放
			autoPlay:{
				type:Boolean,
				default:true,
			},
			// 轮播图切换时间
			interval:{
				type:Number,
				default:2000
			}
		},
		data(){
			return {
				dots:[],
				currentPageIndex:0,
			}
		},
		methods:{
			//设置轮播图宽度
			setSliderWidth(isResize){
				let sliderWidth = this.$refs.swiper.clientWidth;
				this.children = this.$refs.swiperGroup.children;
				let width = 0;

				for(let i = 0; i < this.children.length; i++){
					let child = this.children[i];
					addClass(child,'slider-item');
					child.style.width = sliderWidth + 'px';
					width += sliderWidth;
				}

				if(this.loop && !isResize){
					width += 2 * sliderWidth;
				}
				this.$refs.swiperGroup.style.width = width + 'px';
			},
			initDots(){
				this.dots = new Array(this.children.length);
			},
			initSlider(){
				var this_ = this;

				this.slider = new BScroll(this.$refs.swiper,{
					scrollX: true,
					scrollY: false,
					momentum: false,
					snap: {
						loop: this.loop,
						threshold: 0.3,
						speed: 400
					}
				})

				this.slider.on('scrollEnd', () => {
					let pageIndex = this.slider.getCurrentPage().pageX;
					this.currentPageIndex = pageIndex;

					if(this_.autoPlay){
						clearTimeout(this.timer);
						this_.play();
					}
				})
			},
			play(){
				var this_ = this;
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					this_.slider.next();
				},this.interval);
			}
		},
		mounted(){
			let this_ = this;
			setTimeout(() => {
				this_.setSliderWidth();
				this_.initDots();
				this_.initSlider();

				if(this_.autoPlay){
					this_.play();
				}
			},20)

			window.addEventListener('resize',() => {
				if(!this_.slider){
					return;
				}
				this_.setSliderWidth(true);
				this_.slider.refresh();
			})
		},
		destroyed(){
			clearTimeout(this.timer);
		}
	}
</script>

<style lang="stylus" scoped>
	.swiper
		position:relative;
		overflow:hidden;
		.swiper-group
			position:relative;
			overflow:hidden;
			.slider-item
				float:left;
				overflow:hidden;
				a
					display:block;
					width:100%;
					img
						width:100%;
		.dots
			position:absolute;
			left:0;
			right:0;
			bottom:12px;
			text-align:center;
			.dot
				display:inline-block;
				width:8px;
				height:8px;
				margin:0 4px;
				border-radius:50%;
				background-color:rgba(255,255,255,0.5);
				&.active
					width:25px;
					border-radius:20px;
					background-color:rgba(255,255,255,0.8);
					
</style>