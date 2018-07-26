new Vue({
	el: '#vueMain',
	data:{
//		userInfo: {},//会员信息
		username:'',
		trade_credit:'',
		notice:[],//新消息通知
		message:[],//公告
		finance:'',//资产
		notice_index:0 ,//新消息通知下标
		oldLoginPass:'',//旧登陆密码
		newLoginPass:'',//新登陆密码
		oldPayPass:'',//旧支付密码
		newPayPass:'',//新支付密码
		isChangeUser:[],
		truename:'',
		alias:'',
		sex:'',
		card:'',
		email:'',
		QQ:''
		
	},
	filters:{
		time:function(val){
			return timestampToTime(val)
		}
	},
	created:function(){
		var user = localStorage.getItem("user")
		var vm = this		
		if(user){
			vm.username = JSON.parse(user).username;
			mui.ajax(apiUrl.Index,{
				type:"post",
				data:{id: JSON.parse(user).id},
				dataType:'json',
				success:function(data){		
					if(data.status==0){
						mui.toast(data.msg)
					}
					else if(data.status==1){	
						vm.trade_credit = data.data.credit;
					}
				}
			});	
			mui.ajax(apiUrl.profile,{
				type:"post",
				data:{id: JSON.parse(user).id},
				dataType:'json',
				success:function(data){	
					if(data.status==0){
						console.log(123);
						mui.toast(data.msg)
					}
					else if(data.status==1){	
//						mui.toast(123);
//						vm.isChangeUser = data.data.edits
//						mui.toast(data.data.edits);
//						console.log(data.data.edits);
//						mui.toast(data.data.edits);
						vm.isChangeUser = data.data.edits;
					}
				},
				error:function(msg){
					mui.toast(msg);
				}
			});
			
			//"http://a394.213986.com:88/api/notice/getnotice"
			//apiUrl.notice
			mui.ajax("http://a394.213986.com:88/api/notice/getmail",{
				type:"post",
				data:{username: "1"},
				dataType:'json',				
				success:function(data){
//					alert(JSON.stringify(data))
					if(data.status==0){
						mui.toast(data.msg)
					}
					else if(data.status==1){	
						vm.notice = data.data
						
					}
				}
				
			});
			//apiUrl.message
			//JSON.parse(user).username
			//http://a394.213986.com:88/api/notice/getnotice
			mui.ajax(apiUrl.notice,{
				type:"post",
				data:{
						username: JSON.parse(user).username,
						page:1
					},
				dataType:'json',				
				success:function(data){	
//					mui.toast(data);
					if(data.status==0){
						mui.toast(data.msg)
					}
					else if(data.status==1){	
						vm.message = data.data;
						alert(data.data);
						console.log(vm.message.length);
					}
				},
				error:function(err){

					
				}
			});
			mui.ajax(apiUrl.finance,{
				type:"post",
				data:{username: JSON.parse(user).username},
				dataType:'json',
				headers:{'Content-Type':'application/json'},				
				success:function(data){					
					if(data.status==0){
						mui.toast(data.msg)
					}
					else if(data.status==1){	
						vm.finance = data.data
					}
				}
			});
		} 
	},
	mounted:function(){			
	},
	methods:{	
		subInfo:function(){
			var user = localStorage.getItem("user")
			var form = new FormData();
			var vm = this
			var data = {}
			form.append('username',JSON.parse(user).username)
			for (var i = 0;i<vm.isChangeUser.length;i++) {
				form.append(vm.isChangeUser[i].name, vm.isChangeUser[i].value)
			}
			var vm = this		
			var mask=mui.createMask()

			mui.ajax(apiUrl.profilemanagement,{
				type:"post",
				/*contentType: false,
				processData: false,*/
//				data:form,
				data:$('#my-form-id').serialize(),
				async:false,
				dataType:'json',
				beforeSend: function() {			       
			        plus.nativeUI.showWaiting('提交中，请稍后');
					mask.show();//显示遮罩层
			    },
			    complete: function() {
			     	plus.nativeUI.closeWaiting();
			        mask.close();//关闭遮罩层
			    },
				success:function(data){	
					mui.toast(456);
					plus.nativeUI.closeWaiting();
			        mask.close();//关闭遮罩层\
			        console.log(data);
					if(data.status==0){
						mui.toast(data.msg)
					}							
					else if(data.status==1){
						mui.toast(data.msg)						
					}
				},
				error:function(err){
					mui.toast(123);
					mui.toast('服务器连接超时，请稍后再试');
				}
			});
		},
		changeLogin:function(){
			var vm = this		
			var mask=mui.createMask()
			mui.ajax(apiUrl.changePass,{
				type:"post",
				data:{
					  userid: vm.userInfo.id,
					  oldpass: vm.oldLoginPass,
					  pass1: vm.newLoginPass,
					  type: 1
				},
				dataType:'json',
				beforeSend: function() {			       
			        plus.nativeUI.showWaiting('提交中，请稍后');
					mask.show();//显示遮罩层
			    },
			    complete: function() {
			     
			    },
				success:function(data){	
					plus.nativeUI.closeWaiting();
			        mask.close();//关闭遮罩层
					if(data.status==0){
						mui.toast(data.msg)
					}							
					else if(data.status==1){
						mui.toast(data.msg)
						vm.newLoginPass=''
						vm.oldLoginPass=''
						vm.exit()						
					}
				},
				error:function(){
					mui.toast('服务器连接超时，请稍后再试');
				}
			});
		},
		changePay:function(){
			var vm = this		
			var mask=mui.createMask()
			mui.ajax(apiUrl.changePass,{
				type:"post",
				data:{
					  userid: vm.userInfo.id,
					  oldpass: vm.oldPayPass,
					  pass2: vm.newPayPass,
					  type: 2
				},
				dataType:'json',
				beforeSend: function() {			       
			        plus.nativeUI.showWaiting('提交中，请稍后');
					mask.show();//显示遮罩层
			    },
			    complete: function() {
			     
			    },
				success:function(data){	
					plus.nativeUI.closeWaiting();
			        mask.close();//关闭遮罩层
					if(data.status==0){
						mui.toast(data.msg)
					}							
					else if(data.status==1){
						mui.toast(data.msg)
						vm.newPayPass=''
						vm.oldPayPass=''
					}
				},
				error:function(){
					mui.toast('服务器连接超时，请稍后再试');
				}
			});
		},
		exit:function(){
			var user = localStorage.getItem('user');
			mui.ajax(apiUrl.logout,{
				type:'post',
				data:{
					id:JSON.parse(user).id
				},
				dataType:'json',
				success:function(data){
					if(data.status == 0){
						mui.toast(data.msg);
					}else if(data.status == 1){
						mui.toast(data.msg);
					}
				}
			})
			localStorage.removeItem('user')     
			openWindow('../pages/login/login.html')
		}
	}
})