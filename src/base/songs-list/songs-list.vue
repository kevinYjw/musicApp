<template>
	<div class="songsList">
		<ul>
			<li v-for="(item,index) in songs" class="item flex" @click="selectItem(item,index)">
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
			}
		},
		methods:{
			getDesc(data){
				return `${data.name}.${data.album}`;
			},
			selectItem(song,index){
				this.$emit('select',song,index);
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.songsList
		.item
			align-items:center;
			height:64px;
			.content
				flex:1
				.name
					color:#fff;
				.desc
					color:rgba(255,255,255,0.3);
					margin-top:4px;
</style>