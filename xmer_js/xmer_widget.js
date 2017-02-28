// JavaScript Document
/*-------------------------------------------------------*/
//选项卡
function tab(id,autoplay){
	var tab=document.getElementById(id);
	var tabList=tab.getElementsByClassName('tabList')[0];
	var aLi=tabList.getElementsByTagName('li');
	var aTabItem=tab.getElementsByClassName('tabItem');
	var n=0;//显示图片的编号
	var timer;
	for(var i=0;i<aLi.length;i++){
		(function(index){
			aLi[i].onmouseover = function(){
				//隐藏所有图片
				for(var j=0;j<aLi.length;j++){
					aTabItem[j].style.display="none";
					console.log(aTabItem[j]);
					aLi[j].className="";
				}
				//对应按钮的图片显示
				aTabItem[index].style.display="block";
				this.className="ac";
				//
				n=index;
			}
		})(i);
		/*其它方法：
		aLi[i].index=i;//发个编号
		aLi[i].onclick=function(){
			//隐藏所有图片
			for(var j=0;j<aLi.length;j++){
				aTabItem[j].style.display="none";
				aLi[j].className="";
			};
			//对应按钮的图片显示
			aTabItem[this.index].style.display="block";
			this.className="ac";
			//
			n=this.index;
		};*/
	}
	//自动跳转图片
	function show_item(n){
		for(var i=0;i<aLi.length;i++){//先把所有的图片隐藏
			aTabItem[i].style.display="none";
			aLi[i].className="";
		}
		aTabItem[n].style.display="block";//参数指定的图片显示
		aLi[n].className="ac";
	}
	//封装定时器
	if(autoplay==1){
		function auto_run(){
			timer=setInterval(function(){
				show_item(n);
				n++;
				if(n==aLi.length){//
					n=0;
				}
			},1000);
		}
		auto_run();
		tab.onmouseover=function(){
			clearInterval(timer);
		};
		tab.onmouseout=function(){
			auto_run();
		};
	}
}
/*-------------------------------------------------------*/
//京东serve
function tab_serve () {
	var my_json=my_tools();
	var aside = document.getElementById('serve');
	var ali = aside.getElementsByTagName('li');
	var tabServe = document.getElementById('tabServe');
	var close_btn = document.getElementById('close_btn');
	var tabList=tabServe.getElementsByTagName('ul')[0];
	var oLi=tabList.getElementsByTagName('li');
	var tabCont=tabServe.getElementsByClassName('tabItem');
	var timer;
	var show = true;
	for (var i = 0;i < 4;i++) {
		ali[i].index = i;
		ali[i].onmouseover = function () {
			var k=this.index;
			if (show) {
				timer=setTimeout(function(){
					tabServe.style.display = "block";
					my_json.move(tabServe,{"top": 0}, 1000);
					oLi[k].className="ac";
					tabCont[k].style.display="block";
					show=false;
				},1000)
			}
			return false;
		};
		ali[i].onmouseout=function(ev){
			var k=this.index;
			oLi[k].className="";
			var oEv=ev||window.event;
			var oEl=oEv.relatedTarget||oEv.toElement;
			clearTimeout(timer);
			if(my_json.isParent(this,oEl)){return}
			show=true;
		};
		close_btn.children[0].onclick = function () {
			clearTimeout(timer);
			tabServe.style.display ="none";
			tabServe.style.top="48px";
		}
	}
}
/*-------------------------------------------------------*/
//menu 京东菜单导航
function menu(id){
	var my_json=my_tools();
	var oMenu=document.getElementById(id);
	var aUl_m=oMenu.getElementsByTagName('ul')[0];
	var aLi_m=aUl_m.getElementsByTagName('li');
	var oMenuCont=document.getElementById('jdMenu_cont');

	var navCon=oMenuCont.getElementsByClassName('nav-con');
	var leave_menu=null;
	//删除li的样式
	function del_li_ac(){
		for(var i=0;i<aLi_m.length;i++){
			aLi_m[i].className='';
		}
	}
	for(var i=0;i<aLi_m.length;i++){
		//鼠标移到li上
		aLi_m[i].onmouseover=function(){
			clearTimeout(leave_menu);
			oMenuCont.style.display='block';
			del_li_ac();//删除所有li上的ac
			this.className="ac";

			for(var i=0; i<navCon.length;i++){
				navCon[i].style.display="none";
			}
			var itemIndex=this.getAttribute('data-index');
			//console.log(document.getElementById('item'+itemIndex));
			document.getElementById('item'+itemIndex).style.display="block";
		};
		//鼠标离开li
		aLi_m[i].onmouseout=function(){
			clearTimeout(leave_menu);
			leave_menu=setTimeout(function(){
				oMenuCont.style.display="none";
				del_li_ac();
			},200);
		};
	}
	//relatedTarget
	oMenuCont.onmouseover=function(ev){
		var oEv=ev || window.event;
		var oEl=oEv.relatedTarget || oEv.fromElement;
		if(my_json.isParent(this,oEl)){return}
		clearTimeout(leave_menu);
		this.style.display="block";
	};
	oMenuCont.onmouseout=function(ev){
		var oEv=ev || window.event;
		var oEl=oEv.relatedTarget || oEv.toElement;
		if(my_json.isParent(this,oEl)){return}
		del_li_ac();
		this.style.display="none";
	};
}
/*-------------------------------------------------------*/
//侧边导航
function sideNav(sideId,mainId){
	var aSide=document.getElementById(sideId);//导航
	var aMain=document.getElementById(mainId);//这个楼层
	var aSection=aMain.getElementsByClassName('section');
	var aSpan=aSide.getElementsByTagName('span');
	var footer=document.getElementById('footer');
	if(aSide!=null){
		var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;//滚动条
		var screenH=document.documentElement.clientHeight;//屏幕高度
		//left的位置----------------------------
		var ul=aSide.getElementsByTagName('ul')[0];
		var l=aSide.offsetLeft;
		var t=(screenH-ul.offsetHeight)/2;

		ul.style.left=l-40+'px';
		ul.style.top=t+'px';
		//显示的位置----------------------------
		for(var i=0; i<aSpan.length;i++){
			aSpan[i].className="";
			aSection[i].children[0].className="";
			if(scrollTop+screenH<aMain.offsetTop|| scrollTop>footer.offsetTop){
				aSide.style.display="none";
			}else{
				aSide.style.display="block";
			}
			if(i+1<aSpan.length){
				if(scrollTop+screenH>=aMain.offsetTop&&  scrollTop<aSection[1].offsetTop-t-40){aSection[0].children[0].className="active";
					aSpan[0].className="ac";
				}else if(scrollTop>=aSection[11].offsetTop-t){aSection[11].children[0].className="active";
					aSpan[11].className="ac";
				}else if(scrollTop>=aSection[i].offsetTop-t-40 && scrollTop<aSection[i+1].offsetTop-t-40){
					aSection[i].children[0].className="active";
					aSpan[i].className="ac";
				}
			}else{
				if(scrollTop+screenH>=aMain.offsetTop&&  scrollTop<aSection[1].offsetTop-t-40){aSection[0].children[0].className="active";
					aSpan[0].className="ac";
				}else if(scrollTop>=aSection[11].offsetTop-t){aSection[11].children[0].className="active";
					aSpan[11].className="ac";
				}else if(scrollTop>=aSection[i].offsetTop-t-40 ){
					aSection[i].children[0].className="active";
					aSpan[i].className="ac";
				}
			}
		}
	}
}
/*-------------------------------------------------------*/
//无缝滚动 走马灯
function marquee(id,li_width,speed){
	var oDiv=document.getElementById(id);
	var oUl=oDiv.getElementsByTagName('ul')[0];
	var aLi=oUl.getElementsByTagName('li');
	
	var w=aLi.length*li_width;//一套图片的宽度
	oUl.innerHTML+=oUl.innerHTML;//再添加一套ul
	oUl.style.width=2*w+'px';
	var l=0;//移动的初始值
	var timer;//定义定时器
	
	function move(){
		l-=speed;
		if(l<-w){
			l=0;
		}
		oUl.style.left=l+'px';
	}
	//clearInterval(timer);
	timer=setInterval(move,30);
	//鼠标over时，清除定时器
	oDiv.onmouseover=function(){
		clearInterval(timer);
	};
	oDiv.onmouseout=function(){
	timer=setInterval(move,30);
	};
}
/*-------------------------------------------------------*/
//错误弹框
function error_box(text,time){
	var box=document.createElement('div');//创建标签
	var timer;
	box.className='error_box';//添加样式
	box.innerHTML=text;//添加内容
	document.body.appendChild(box);
	//居中显示
	show_center(box);
	
	function del_error_box(){
		timer=setTimeout(function(){
			//error_box.style.display="none";
			document.body.removeChild(box);
		},time || 2000);//隔2s消失
	}
	del_error_box();
	
	box.onmouseover=function(){
		clearTimeout(timer);
	};
	box.onmouseout=function(){
		del_error_box();
	};
}
/*-------------------------------------------------------*/
//模态层
function model_layer(){
	var layer=document.createElement('div');
	layer.id="black_modal";
	layer.className="modal";
	document.body.appendChild(layer);
}
/*-------------------------------------------------------*/
//登录模块
function login_box(){
	model_layer();
	var oDiv=document.createElement('div');
	oDiv.id="box"; 
	oDiv.className="login_popBox";
	oDiv.innerHTML='<h4>用户登录</h4>'+
	'<a id="closeBtn" href="javascript:;">×</a>'+
	'<p><label>用户名：<input type="text"></label></p>'+
	'<p><label>密　码：<input type="password"></label></p>'+
	'<p><button class="loginBtn" type="button">登录</button></p>';
	document.body.appendChild(oDiv);
	//居中显示
    show_center(oDiv);
	//调整窗口大小
	window.onresize=function(){
		show_center(oDiv);	
	};
	//拖拽
	var title=oDiv.children[0];
	drag(oDiv,title);
	//关闭弹框
	var closeBtn=oDiv.children[1];
	closeBtn.onclick=function(){
		document.body.removeChild(oDiv);
		document.body.removeChild(document.getElementById('black_modal'));
		//error_box('关闭成功！');
	};
	var text=oDiv.children[2];
	var password=oDiv.children[3];
	var loginBtn=oDiv.children[4];
	
	password.onkeyup=function(){
		if(isNaN(password.value)){
			error_box('请输入数字！');
		}
	};
}
/*-------------------------------------------------------*/
//轮播
function slide(id,hideNum,autoplay){
	var oSlide=document.getElementById(id);
	var oSlideList=oSlide.getElementsByClassName('slideList')[0];
	var aLi=oSlideList.getElementsByTagName('li');
	var n=0;//第一张图片
	//定义一个参数调用json工厂
	var my_json=my_tools();
	
	//ul的宽度
	var li_w=aLi[0].offsetWidth;
	oSlideList.style.width=li_w*aLi.length+'px';
	//编号
	var ol=document.createElement('ol');
	for(var i=0;i<aLi.length;i++){
		if(i==0){
			ol.innerHTML+='<li class="ac">'+(hideNum ? '' : (i+1))+'</li>';
		}else{
			ol.innerHTML+='<li>'+(hideNum ? '' : (i+1))+'</li>';
		}
	}
	oSlide.appendChild(ol);
	function changeBtnClass(n){
		for(var j=0;j<aBtn.length;j++){
			aBtn[j].className='';
		}	
		aBtn[n].className='ac';
	}
	//点击编号按钮
	var aBtn=ol.children;
	for(var i=0;i<aBtn.length;i++){
		aBtn[i].index=i;
		aBtn[i].onclick=function(){
			n=this.index;
			changeBtnClass(n);
			my_json.move(oSlideList,{'left':-(li_w*n)});
		}
	}
	//左右按钮
	var pBtn=oSlide.getElementsByClassName('prev')[0];
	var nBtn=oSlide.getElementsByClassName('next')[0];
	pBtn.onclick=function(){
		n--;
		if(n<0)n=0;
		my_json.move(oSlideList,{'left':-(li_w*n)});
		changeBtnClass(n);
	};
	nBtn.onclick=function(){
		n++;
		if(n>aLi.length-1)n=aLi.length-1;
		my_json.move(oSlideList,{'left':-(li_w*n)});
		changeBtnClass(n);
	};
	//封装定时器
	if(autoplay){
		function auto_run(){
			timer=setInterval(function(){
				changeBtnClass(n);
				my_json.move(oSlideList,{'left':-(li_w*n)});
				n++;
				if(n==aLi.length){
					n=0;
				}
			},1000);
		}
		auto_run();
		oSlide.onmouseover=function(){
			clearInterval(timer);
			pBtn.style.display=nBtn.style.display='block';
		};
		oSlide.onmouseout=function(){
			auto_run();
			pBtn.style.display=nBtn.style.display='none';
		};
	}
}
/*-------------------------------------------------------*/
//分页
function showPage(data,id,num){
	var page=0;
	var news=document.getElementById(id);
	var oUl=document.createElement('ul');
	oUl.className="newsList";
	news.appendChild(oUl);

	function changePage(n){
		//把数据插入到li 在把li插入ul
		//var num=5;//每页多少行
		var start=n*num;//开始
		var end=start+num;//结束
		oUl.innerHTML="";//每次清空

		for(var i=start;i<end;i++){
			if(data[i]){
				/*var li=document.createElement('li');
				 li.innerHTML='<a href=javascript:;>'+news_arr[i].title+'</a><span>'+news_arr[i].time+'</span>';
				 oUl.appendChild(li);*/
				//在oUl里面添加li
				oUl.innerHTML+='<li><a href=javascript:;>'+data[i].title+'</a><span>'+data[i].time+'</span></li>';
			}
		}
	}
	changePage(page);//首次调用
	//最后页的ul高度
	oUl.style.height=oUl.offsetHeight+'px';

	//插入分页
	var pageList = document.createElement('div');
	pageList.className='page';
	pageList.innerHTML='<span>上一页</span>';
	//怎么分页
	for(var i=1;i<data.length;i++){
		if(i%num==0){//取模
			//计算分页号
			var p_num=i/num;
			pageList.innerHTML+='<a>'+p_num+'</a>';
		}
	}
	if(data.length%num!=0){//不足一页
		pageList.innerHTML+='<a>'+(p_num+1)+'</a>';//增加分页
	}

	pageList.innerHTML+='<span>下一页</span>';
	news.appendChild(pageList);//插入分页
	pageList.children[1].className='ac';

	//清除所有a标签上的ac
	function clearAc(){
		for(var i=0;i<aA.length;i++){
			aA[i].className="";
		}
	}
	//点击切换
	var aA=pageList.getElementsByTagName('a');
	for(var j=0;j<aA.length;j++){
		aA[j].onclick=function(){
			//切换颜色
			clearAc();
			this.className="ac";
			//点击数字 换li
			page=this.innerHTML-1;
			changePage(page);
		};
	}
	//上下页切换
	var prev=pageList.getElementsByTagName('span')[0];
	var next=pageList.getElementsByTagName('span')[1];
	prev.onclick=function(){
		page--;
		if(page<0)page=0;
		changePage(page);
		//切换颜色
		clearAc();
		aA[page].className="ac";
	};
	next.onclick=function(){
		page++;
		if(page>p_num)page=p_num;
		changePage(page);
		//切换颜色
		clearAc();
		aA[page].className="ac";
	};
}







