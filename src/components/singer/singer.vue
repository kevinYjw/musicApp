<template>
	<div class="singer">
		<list-view :data="singerList" v-if="singerList" @toDetail="toDetail"></list-view>
		<router-view></router-view>
	</div>
</template>

<script>
	import {getSingerList} from 'api/singer';
	import Singer from 'common/js/singer';
	import ListView from 'components/list-view/list-view';

	import {mapMutations} from 'vuex';

	export default {
		name:'Singer',
		data(){
			return {
				singerList:[]
			}
		},
		methods:{
			_getSingerList(){
				let this_ = this;
				getSingerList().then((res) => {
					if(res.code == 0){
						this_.singerList = this_.dealWidthData(res.data.list);
					}
				})
			},
			dealWidthData(list){
				let map = {
					hot:{
						title:'热门',
						items:[],
					}
				}

				list.forEach((item,index) => {
					if(index < 10){
						map['hot'].items.push(new Singer({
							id:item.Fsinger_mid,
							name:item.Fsinger_name
						}))
					}
					const key = item.Findex;
					if(!map[key]){
						map[key] = {
							title:key,
							items:[]
						}
					}

					map[key]['items'].push(new Singer({
						id:item.Fsinger_mid,
						name:item.Fsinger_name
					}))

				})

				let hot = [];
				let ret = [];

				for (let key in map){
					let val = map[key];
					if(val.title == '热门'){
						hot.push(val);
					} else if(val.title.match(/[a-zA-z]/)){
						ret.push(val);
					}
				}

				ret.sort((a,b) => {
					return a.title.charCodeAt(0) - b.title.charCodeAt(0);
				})
				return hot.concat(ret);
			},
			toDetail(item){
				this.$router.push({
					path:`/singer/${item.id}`
				})
				this.setSinger(item);
			},
			...mapMutations({
				'setSinger':'SET_SINGER'
			})
		},
		components:{
			ListView
		},
		mounted(){
			this._getSingerList();
		}
	}
</script>

<style lang="stylus" scoped>
	.singer
		height:calc(100vh - 88px);
</style>