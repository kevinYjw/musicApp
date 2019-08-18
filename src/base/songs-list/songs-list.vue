<template>
	<div class="songsList">
		<ul>
			<li v-for="(item,index) in songs" class="item flex" @click="selectItem(item,index)">
				<div class="rankIcon" v-if="rank">
					<span :class="getRankCLs(index)">{{getRankText(index)}}</span>
				</div>
				<div class="content fs14">
					<div class="name">{{item.name}}</div>
					<div class="desc">{{getDesc(item)}}</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name:'SongsList',
		props:{
			songs:{
				type:Array,
				default:[]
			},
			rank:{
				rank:Boolean,
				default:false,
			}
		},
		methods:{
			getDesc(data){
				return `${data.name}.${data.album}`;
			},
			selectItem(song,index){
				this.$emit('select',song,index);
			},
			getRankCLs(index){
				if(index <= 2){
					return `icon icon${index}`;
				} else {
					return 'text fs18';
				}
			},
			getRankText(index){
				if(index > 2){
					return index + 1;
				}
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import "~style/base";

	.songsList
		.item
			align-items:center;
			height:64px;
			.rankIcon
				flex:0 0 25px;
				width:25px;
				height:24px;
				text-align:center;
				margin-right:30px;
				.icon
					display:inline-block;
					width:25px;
					height:24px;
					background-size:25px 24px;
					&.icon0
						bg-image('first');
					&.icon1
						bg-image('second');
					&.icon2
						bg-image('third');
				.text
					color:#ffcd32;
			.content
				flex:1
				.name
					color:#fff;
				.desc
					color:rgba(255,255,255,0.3);
					margin-top:4px;
</style>