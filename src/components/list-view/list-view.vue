<template>
	<scroll :data="data" class="listView" ref="listView" @scroll="scroll" @refresh="refresh" :listenScroll="true" :probeType="3">
		<ul>
			<li v-for="group in data" class="list-group" ref="listGroup">
				<h2 class="title">{{group.title}}</h2>
				<ul>
					<li v-for="item in group.items" class='list-group-item flex'>
						<img v-lazy="item.avatar" alt="">
						<span class="name fs14">{{item.name}}</span>
					</li>
				</ul>
			</li>
		</ul>
		<ul class="list-shortcut">
			<li 
			v-for="(item,index) in shortcutList" 
			class="item fs12"
			:class="currentIndex === index ? 'active' : '' "
			:data-index="index"
			@touchstart.stop.prevent="onShortcutTouchStart"
			@touchmove.stop.prevent="onShortcutTouchMove">{{item}}</li>
		</ul>
		<div class="list-fixed" v-show="fixedTitle" ref="listFixed">
			<div class="fixed-title">{{fixedTitle}}</div>
		</div>
		<div class="loading-wrapper" v-if="data.length <= 0">
			<loading></loading>
		</div>
	</scroll>
</template>

<script>
	import Scroll from 'base/scroll/scroll';
	import {getData} from 'common/js/dom';
	import Loading from 'base/loading/loading';

	export default {
		name:'ListView',
		props:{
			data:{
				type:Array,
				default:[],
			}
		},
		data(){
			return {
				scrollY:-1,
				currentIndex:0,
				diff:-1,
			}
		},
		computed:{
			//右侧导航栏
			shortcutList(){
				return this.data.map((item,index) => {
					return item.title.substr(0,1);
				})
			},
			fixedTitle(){
				if(this.scrollY > 0){
					return '';
				}
				console.log(this.data[this.currentIndex],this.currentIndex)
				return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''; 
			}
		},
		methods:{
			refresh(){
				this.$refs.listView.refresh();
			},
			onShortcutTouchStart(e){
				let index = getData(e.target,'index');
				let firstTouch = e.touches[0];
				this.touch.y1 = firstTouch.pageY;
				this.touch.anchorIndex = index;
				this._scrollTo(index)
			},
			onShortcutTouchMove(e){
				let lastTouch = e.touches[0];
				this.touch.y2 = lastTouch.pageY;
				let delta = (this.touch.y2 - this.touch.y1) / 18 | 0;
				let index = delta + Number(this.touch.anchorIndex);
				this._scrollTo(index);
			},
			_scrollTo(index){
				if(!index){
					return;
				} 

				if(index < 0){
					index = 0;
				} else if(index > this.listHeight.length - 2){
					index = this.listHeight.length - 2;
				}
				this.$refs.listView.scrollToElement(this.$refs.listGroup[index],0)
			},
			scroll(pos){
				this.scrollY = pos.y;
			},
			_calculateHeight(){
				this.listHeight = [];
				let height = 0;
				const list = this.$refs.listGroup;
				this.listHeight.push(height);
				for (let i = 0; i < list.length; i++){
					height += list[i].clientHeight;
					this.listHeight.push(height);
				}
			}
		},
		watch:{
			data(){
				let this_ = this;
				setTimeout(() => {
					this_._calculateHeight();
				},20)
			},
			scrollY(newY){
				let listHeight = this.listHeight;
				if(newY > 0){
					this.currentIndex = 0;
					return;
				}

				for (let i = 0; i < listHeight.length - 1; i++){
					let height1 = listHeight[i];
					let height2 = listHeight[i + 1];
					if(-newY >= height1 && -newY < height2){
						this.currentIndex = i;
						this.diff = height2 + newY;
						return;
					}
				}

				this.currentIndex = listHeight.length - 2;
			},
			diff(newVal){
				let fixedTop = (newVal > 0 && newVal < 30) ? newVal - 30 : 0;
				if (this.fixedTop === fixedTop){
					return;
				}
				this.fixedTop = fixedTop;
				this.$refs.listFixed.style.transform = `translate3d(0,${fixedTop}px,0)`
			}
		},
		components:{
			Scroll,
			Loading
		},
		created(){
			this.touch = {};
			this.listHeight = [];
		}
	}
</script>

<style lang="stylus" scoped>

	.listView
		position:relative;
		width:100%;
		height:100%;
		overflow:hidden;
		.list-group
			.title
				height:30px;
				line-height:30px;
				padding-left:20px;
				box-sizing:border-box;
				color:rgba(255,255,255,0.5);
				background-color:#333;
			.list-group-item
				padding:20px 0 0 30px;
				align-items:center;
				img
					width:50px;
					height:50px;
					border-radius:50%;
				.name
					margin-left:20px;
					color:rgba(255,255,255,0.5);
		.list-shortcut
			position:absolute
			z-index:30;
			right:0;
			top:50%;
			transform: translateY(-50%);
			width:20px;
			padding:20px 0;
			border-radius:10px;
			text-align:center;
			background-color:rgba(0,0,0,0.3);
			font-family:Helvetica;
			.item
				padding:3px;
				line-height:1;
				color:rgba(255,255,255,0.5);
				&.active
					color:#ffcd32;
		.list-fixed
			position:absolute;
			top:0;
			left:0;
			width:100%;
			.fixed-title
				height:30px;
				line-height:30px;
				padding-left:20px;
				box-sizing:border-box;
				color:rgba(255,255,255,0.5);
				background-color:#333;
		.loading-wrapper
			position:absolute;
			top:50%;
			left:50%;
			transform:translate(-50%,-50%);
</style>