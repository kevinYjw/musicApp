
// 添加class
export function addClass(ele,className){
	if(hasClass(className)){
		return;
	}

	let newClass = ele.className.split(' ');
	newClass.push(className);
	ele.className = newClass.join(' ');
}

// 判断有没有class
export function hasClass(ele,className){
	let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
	return reg.test(ele.className);
}