import * as types from './mutations-type';

export const selectPlay = function({commit,state},{songs,index}){
	commit(types.SET_PLAYING,true);
	commit(types.SET_FULL_SCREEN,true);
	commit(types.SET_PLAY_LIST,songs);
	commit(types.SET_SEQUENCE_LIST,songs);
	commit(types.SET_CURRENT_INDEX,index);
}