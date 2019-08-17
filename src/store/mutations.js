import * as types from './mutations-type';

const mutations = {
	[types.SET_SINGER](state,singer){
		state.singer = singer;
	},
	[types.SET_PLAYING](state,flag){
		state.playing = flag;
	},
	[types.SET_FULL_SCREEN](state,flag){
		state.fullScreen = flag;
	},
	[types.SET_PLAY_LIST](state,data){
		state.playList = data;
	},
	[types.SET_SEQUENCE_LIST](state,data){
		state.sequenceList = data;
	},
	[types.SET_MODE](state,mode){
		state.mode = mode;
	},
	[types.SET_CURRENT_INDEX](state,index){
		state.currentIndex = index;
	},
	[types.SET_DISC](state,data){
		state.disc = data;
	}
}

export default mutations;