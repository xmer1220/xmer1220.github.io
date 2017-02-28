// JavaScript Document
window.onload=function(){
	//---------------------------------------------------
	//menu
	menu('jdMenu');
	//---------------------------------------------------
	//banner轮播
	slide('ban_slide',false,true);
	//---------------------------------------------------
	//sever
	tab_serve ();
	tab("tabServe",false);
	//选项卡 每个楼层
	tab('tabOne',false);
	tab('tabTwo',false);
	tab('tabThree',false);
	tab('tabFour',false);
	tab('tabFive',false);
	tab('tabSix',false);
	tab('tabSeven',false);
	tab('tabEight',false);
	tab('tabNine',false);
	tab('tabTen',false);
	tab('tabEleven',false);
	tab('tabTwelve',false);
	//侧边导航
	sideNav("sideBar","main");
};
window.onscroll=window.onresize=function(){
	sideNav("sideBar","main");
};
