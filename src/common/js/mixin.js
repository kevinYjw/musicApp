import {mapGetters} from 'vuex';

export const playlistMixin = {
	computed: {
		...mapGetters([
			'playList'
		])
	},
	watch: {
		playList(newVal) {
			this.handlePlaylist(newVal)
		}
	},
	methods: {
		handlePlaylist() {
			throw new Error('请添加 handlePlaylist 方法')
		}
	},
	mounted() {
		this.handlePlaylist(this.playList)
	},
	activated() {
		this.handlePlaylist(this.playList)
	}
}
