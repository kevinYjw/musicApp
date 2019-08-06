
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

//获取属性
export function getData(el,name,val){
	name = 'data-' + name;
	if(val){
		return el.setAttribute(name,val);
	}  else {
		return el.getAttribute(name);
	}
}