

function mouseWheel(obj,fn){
	var ff = navigator.userAgent.indexOf("Firefox");
	if(ff!=-1){
		obj.addEventListener('DOMMouseScroll',wheel,false)
	}
	else{
		obj.onmousewheel=wheel;
	}
	
	function wheel(event){
		var event=event||window.event;
		var down=true;   //判断页面是否向下移动
		if(event.preventDefault()){  //清除默认事件
			event.preventDefault()
		}

		if (event.detail){ //FF
			down = event.detail < 0;
		}else{
			down = event.wheelDelta > 0;
		}
		
		/*注解：fn是作为参数传进来的函数,这里通过apply方法调用fn,并将当前对象和所需参数赋给fn.*/
		
		fn.apply(obj,[event,down]);
		
		return false;
		
	}
	
}
