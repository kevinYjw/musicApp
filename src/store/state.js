import {playMode} from 'common/js/config';

const state = {
	singer:{},
	playing:false,//播放暂停
	fullScreen:false,//展开缩放
	playList:[],//播放列表
	sequenceList:[],//顺序列表
	mode:playMode.sequence,//播放模式
	currentIndex:-1,//当前播放的索引
	disc:{},//歌单数据
	toplist:{},//歌单详情数据
}

export default state;