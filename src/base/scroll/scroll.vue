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
			},
			refresh(){
				this.scroll && this.scroll.refresh();
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