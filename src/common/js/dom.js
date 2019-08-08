
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

let elementStyle = document.createElement('div').style;

let vendor = (() => {

	let transformNames = {
		webkit: 'webkitTransform',
		Moz: 'MozTransform',
		O: 'OTransform',
		ms: 'msTransform',
		standard: 'transform'
	}

	for (let key in transformNames){
		if(elementStyle[transformNames[key]] !== undefined){
			return key;
		}
	}

	return false;


})();

export function prefixStyle(style) {
	if (!vendor) {
		return false;
	}

	if (vendor === 'standard') {
		return style
	}

	return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}
