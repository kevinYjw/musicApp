<template>
	<div class="scroll" ref='scrollWrapper'>
		<slot></slot>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';

	export default {
		props:{
			probeType:{
				type:Number,
				defulat:1
			},
			click:{
				type:Boolean,
				default:true
			},
			data:{
				type:Array,
				default:[]
			},
			listenScroll:{ //是否监听滚动事件
				type:Boolean,
				default:false
			},
			pullup:{ //是否监听下拉刷新
				type:Boolean,
				default:false,
			}
		},
		methods:{
			initScroll(){
				if(!this.$refs.scrollWrapper){
					return;
				}
				this.scroll = new BScroll(this.$refs.scrollWrapper,{
					probeType:this.probeType,
					click:this.click,
				})

				if(this.listenScroll){
					let this_ = this;
					this.scroll.on('scroll',(pos) => {
						this_.$emit('scroll',pos);
					})
				}

				if(this.pullup){
					this.scroll.on('scrollEnd',(pos) => {
						if(this.scroll.y <= (this.scroll.maxScrollY + 50)){
							this.$emit('scrollToEnd');
						}
					})
				}
			},
			refresh(){
				this.scroll && this.scroll.refresh();
			},
			scrollTo(){
				this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments);
			},
			scrollToElement(){
				this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments);
			}
		},
		watch:{
			data(){
				let this_ = this;
				setTimeout(() => {
					this_.refresh();
				},20)
			}
		},
		mounted(){
			let this_ = this;
			setTimeout(() => {
				this_.initScroll();
			},20)
		}
	}
</script>

<style lang="stylus" scoped>
						
</style>