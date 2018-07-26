window.onload=function(){
	mui('body').on('tap','.router-link',function(){
		var dataLink = this.getAttribute('data-href')
		if(!!dataLink){
			openWindow(dataLink)
		}else {
			mui.alert('此功能尚未开放，敬请期待')
		}
	})
}



function openWindow(url){
	mui.plusReady(function() {
		mui.openWindow({
			url:url,
			id: url,
			styles: {
				top:'0px', //新页面顶部位置
				bottom: '0px', //新页面底部位置
				cachemode:"noCache",
			},
			createNew: true, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
			show: {
				autoShow: true, //页面loaded事件发生后自动显示，默认为true
				aniShow: 'slide-in-right', //页面显示动画，默认为”slide-in-right“；
				duration: '100ms' 
			},
			waiting: {
				autoShow: true, //自动显示等待框，默认为true
				title: '正在加载...', //等待对话框上显示的提示内容
			}
		})
	});
}
function getCookie(name)
{
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	return unescape(arr[2]);
	else
	return null;
}
function setCookie(name,value)
{
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
// 数字过滤
function clearNoNum(obj) {
    obj = obj.replace(/[^\d.]/g, "");//清除“数字”和“.”以外的字符
    obj = obj.replace(/^\./g, "");//验证第一个字符是数字而不是.
    obj = obj.replace(/\.{2,}/g, ".");//只保留第一个. 清除多余的.
    obj = obj.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
}
mui('body').on('tap','.reload',function(){
	location.reload();
})
function getQueryString(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); 
    return null; 
} 


function timestampToTime(timestamp) {
	if(!timestamp){
		return ' ' 
	}else {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = date.getDate()<10? '0'+date.getDate() + ' ':date.getDate() + ' ' ;
    h = date.getHours()<10? '0'+date.getHours() + ':': date.getHours() + ':';
    m = date.getMinutes()<10? '0'+date.getMinutes() + ':': date.getMinutes() + ':';
    s = date.getSeconds()<10? '0'+date.getSeconds() : date.getSeconds();
    return Y+M+D+h+m+s;}
}
