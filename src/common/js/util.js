export function shuffle(list){
	let arr_ = list.slice();
	console.log(arr_);
	for (let i = 0; i < list.length; i++){
		let j = getRandomInt(0,i);
		let z = arr_[i];
		arr_[i] = arr_[j];
		arr_[j] = z;
	}
	return arr_;
}

export function getRandomInt(min,max){
	return Math.floor(Math.random() * (max - min + 1) + min);
}