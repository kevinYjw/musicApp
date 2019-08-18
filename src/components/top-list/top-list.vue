<template>
	<transition appear name="topList">
		<music-list :songs="songs" :title="title" :bgImage='bgImage' :rank="rank"></music-list>
	</transition>
</template>

<script>
	import {mapGetters} from 'vuex';
	import {getMusicList} from 'api/rank';
	import { createSong, isValidMusic, processSongsUrl } from 'common/js/song'
	import MusicList from 'components/music-list/music-list';

	export default {
		name:'TopList',
		computed:{
			title(){
				return this.toplist.topTitle;
			},
			bgImage(){
				if(this.songs.length > 0){
					return this.songs[0].image;
				}
				return this.toplist.picUrl;
			},
			...mapGetters([
				'toplist'
			])
		},
		data(){
			return {
				songs:[],
				rank:true
			}
		},
		methods:{
			_getMusicList(){
				getMusicList(this.toplist.id).then((res) => {
					if(res.code == 0){
						processSongsUrl(this._normalizeSongs(res.songlist)).then((songs) => {
							this.songs = songs
						})
					}
				})
			},
			_normalizeSongs(list){
				let ret = [];
				list.forEach((item) => {
					const musicData = item.data
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
		mounted(){
			this._getMusicList();
		}
	}
</script>

<style lang="stylus" scoped>
	.topList-enter-active, .topList-leave-active
		transition:all 0.3s;
		transform:translate3d(0,0,0);
	.topList-enter, .topList-leave-to
		transform:translate3d(100%,0,0);
</style>