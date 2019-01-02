//知识点扩充:apply();call()

function mouseWheel(obj, fn) {
	var ff = navigator.userAgent.indexOf('Firefox');
	if(ff != -1) {
		obj.addEventListener('DOMMouseScroll', wheel, false);
	} else {
		obj.onmousewheel = wheel;
	}
}

function wheel(event) {
	var event = event || window.event;
	var down = true; //判断页面是否向下滚动
	if(event.preventDefault()) {
		event.preventDefault(); //清除默认事件
	}

	if(event.detail) {
		down = event.detail < 0;
	} else {
		down = event.wheelDelta > 0;
	}

}