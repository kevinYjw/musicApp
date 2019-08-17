<template>
	<transition appear name="disc">
		<music-list :songs="songs" :title="title" :bgImage='bgImage'></music-list>
	</transition>
</template>

<script>
	import {mapGetters} from 'vuex';
	import MusicList from 'components/music-list/music-list';

	import {getSongList} from 'api/recommend';
	import { createSong, isValidMusic, processSongsUrl } from 'common/js/song'

	export default {
		name:'Disc',
		computed:{
			title(){
				return this.disc.dissname;
			},
			bgImage(){
				return this.disc.imgurl;
			},
			...mapGetters([
				'disc'
			])
		},
		data(){
			return {
				songs:[],
			}
		},
		methods:{
			_getSongList(){
				if(!this.disc.dissid){
					this.$router.push('/recommend');
					return;
				}
				getSongList(this.disc.dissid).then((res) => {
					if(res.code === 0){
						processSongsUrl(this._normalizeSongs(res.cdlist[0].songlist)).then((songs) => {
							this.songs = songs
						})
					}
				})
			},
			_normalizeSongs(list){
				let ret = [];
				list.forEach((item) => {
					if (isValidMusic(item)) {
						ret.push(createSong(item))
					}
				})
				return ret;
			}
		},
		components:{
			MusicList,
		},
		mounted(){
			this._getSongList();
		}
	}
</script>

<style lang="stylus" scoped>
	.disc-enter-active, .disc-leave-active
		transition:all 0.3s;
		transform:translate3d(0,0,0);
	.disc-enter, .disc-leave-to
		transform:translate3d(100%,0,0);
</style>