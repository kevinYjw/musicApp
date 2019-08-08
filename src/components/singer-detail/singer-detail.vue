<template>
	<transition appear name="detail">
		<music-list :songs="songs" :title="title" :bgImage='bgImage'></music-list>
	</transition>
</template>

<script>
	import {mapGetters} from 'vuex';
	import {getSingerDetail} from 'api/singer';
	import {createSong,isValidMusic,processSongsUrl} from 'common/js/song';
	import MusicList from 'components/music-list/music-list';

	export default {
		name:'SingerDetail',
		data(){
			return {
				songs:[]
			}
		},
		computed:{
			title(){
				return this.singer.name;
			},
			bgImage(){
				return this.singer.avatar;
			},
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
		components:{
			MusicList
		},
		created(){
			this._getSingerDetail();
		}
	}
</script>

<style lang="stylus" scoped>
	.detail-enter-active, .detail-leave-active
		transition:all 0.3s;
		transform:translate3d(0,0,0);
	.detail-enter, .detail-leave-to
		transform:translate3d(100%,0,0);
</style>