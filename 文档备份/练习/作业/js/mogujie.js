//function part3() {
//	var odiv = document.getElementsByClassName('box1')[0];
//	var odiv2 = document.getElementsByClassName('mslide_banner')[0];
//	var btn = odiv2.getElementsByTagName('a');
//
//	for(i = 0; i < btn.length; i++) {
//		btn[i].index = i;
//
//		btn[i].onmouseover = function() {
//			for(i = 0; i < div2.length; i++) {
//				btn[i].className = ''
//				div2[i].style.display = 'none'
//			}
//			div2[this.index].style.display = 'block'
//		}
//	}
//}
//part3();

/*猜你喜欢瀑布流*/

var warp = document.getElementsByClassName('boe2_01');
var list = document.getElementsByClassName('uls');

creatLi();

//创建li元素
function creatLi() {
	for(var i = 0; i < 5; i++) //控制li的个数
	{

		var li = document.createElement('li');
		li.style.marginBottom = "28px";

		var imgs = new Image;
		imgs.src = "img/171008_29.webp";
		li.appendChild(imgs);

		var thep = document.createElement('p');
		thep.style.background = "#fff";
		thep.innerHTML = "冬季加厚棉服女韩版中长款过膝面包服棉袄大毛领宽松学生棉衣";
		thep.classList.add('wu_word02');

		var theb = document.createElement('b');
		theb.innerHTML = "¥169.71";
		theb.classList.add('price_info');

		li.appendChild(thep);
		li.appendChild(theb);
		list[0].appendChild(li);
	}

}

//滚动事件
window.onscroll = function() {

	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	var windowHeight = document.documentElement.clientHeight; //可视区高度
	var bodyHeight = document.body.clientHeight //页面总高度
	var scrollHeight = bodyHeight - windowHeight;
	//滚动最大高度
	if(scrollTop >= scrollHeight - 200) {
		creatLi();
	}

}