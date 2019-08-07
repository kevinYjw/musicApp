<template>
	<transition appear name="detail">
		<div class="singerDetail"></div>
	</transition>
</template>

<script>
	import {mapGetters} from 'vuex';
	import {getSingerDetail} from 'api/singer';
	import {createSong,isValidMusic,processSongsUrl} from 'common/js/song';

	export default {
		name:'SingerDetail',
		data(){
			return {
				song:[]
			}
		},
		computed:{
			...mapGetters([
				'singer'
			])
		},
		methods:{
			_getSingerDetail(){
				if(!this.singer.id){
					this.$router.push('/singer');
					return;
				}
				let this_ = this;
				getSingerDetail(this.singer.id).then((res) => {
					if(res.code == 0){
						res = res.data;
						processSongsUrl(this.dealWithData(res.list)).then((songs) => {
							this.songs = songs;
						})
					}
				})
			},
			dealWithData(list){
				let ret = [];
				list.forEach((item) => {
					let {musicData} = item
					if (isValidMusic(musicData)) {
						ret.push(createSong(musicData))
					}
				})

				return ret;
			}
		},
		created(){
			this._getSingerDetail();
		}
	}
</script>

<style lang="stylus" scoped>
	.singerDetail
		position:fixed;
		top:0;
		left:0;
		right:0;
		bottom:0;
		z-index:100;
		background-color:#222;
	
	.detail-enter-active, .detail-leave-active
		transition:all 0.3s;
		transform:translate3d(0,0,0);
	.detail-enter, .detail-leave-to
		transform:translate3d(100%,0,0);
</style>