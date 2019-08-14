import * as types from './mutations-type';
import {playMode} from 'common/js/config';
import {shuffle} from 'common/js/util';

export const selectPlay = function({commit,state},{songs,index}){
	commit(types.SET_SEQUENCE_LIST,songs);
	if(state.mode === playMode.random){
		let randomList = shuffle(songs);
		commit(types.SET_PLAY_LIST,randomList);
		index = findIndex(randomList,songs[index]);
	} else {
		commit(types.SET_PLAY_LIST,songs);
	}
	commit(types.SET_PLAYING,true);
	commit(types.SET_FULL_SCREEN,true);
	commit(types.SET_CURRENT_INDEX,index);
}

export const randomPlay = function({commit},{songs}){
	commit(types.SET_MODE,playMode.random);
	commit(types.SET_SEQUENCE_LIST,songs);
	console.log(songs);
	let randomList = shuffle(songs);
	commit(types.SET_PLAY_LIST,randomList);
	commit(types.SET_CURRENT_INDEX,0);
	commit(types.SET_PLAYING,true);
	commit(types.SET_FULL_SCREEN,true);
}

function findIndex(list,song){
	return list.findIndex((item) => {
		return item.id === song.id;
	})
}