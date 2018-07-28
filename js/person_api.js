new Vue({
	el: '#vueMain',
	data: {
		//		userInfo: {},//会员信息
		username: '',
		trade_credit: '',
		notice: [], //新消息通知
		notice2: {}, //新消息通知详情
		message: {}, //公告
		message1: {}, //公告详情
		finance: '', //资产
		notice_index: 0, //新消息通知下标
		oldLoginPass: '', //旧登陆密码
		newLoginPass1: '', //新一级登陆密码
		newLoginPass1c: '', //新一级登陆密码确认
		newLoginPass2: '', //新二级登陆密码
		newLoginPass2c: '', //新二级登陆密码确认
		oldPayPass: '', //旧支付密码
		newPayPass: '', //新支付密码
		//		isChangeUser: '',
		truename: '',
		wechat: '',
		alipay: '',
		bank_number: '',
		mobile_phone: '',
		bank_name: '',
		bank_username: '',
		bank_addr: ''
	},
	filters: {
		time: function(val) {
			return timestampToTime(val)
		}
	},
	created: function() {
		var user = localStorage.getItem("user")
		var vm = this
		if(user) {
			vm.username = JSON.parse(user).username;
			mui.ajax(apiUrl.Index, {
				type: "post",
				data: {
					id: JSON.parse(user).id
				},
				dataType: 'json',
				success: function(data) {
					if(data.status == 0) {
						mui.toast(data.msg)
					} else if(data.status == 1) {
						vm.trade_credit = data.data.credit;
					}
				}
			});
			mui.ajax(apiUrl.member, {
				type: 'post',
				data: {
					id: JSON.parse(user).id
				},
				dataType: 'json',
				success: function(data) {
					if(data.status == 0) {
						mui.toast(data.msg);
					} else if(data.status == 1) {
						//mui.toast(JSON.stringify(data));
						vm.truename = data.data.truename;
						vm.bank_name = data.data.bank_name;
						vm.bank_number = data.data.bank_number;
						vm.bank_username = data.data.bank_username;
						vm.bank_addr = data.data.bank_addr;
						vm.mobile_phone = data.data.mobile_phone;
						vm.alipay = data.data.alipay;
						vm.wechat = data.data.wechat;
						/*console.log(JSON.stringify(data));
						vm.isChangeUser = data.data;
						console.log(JSON.stringify(vm.isChangeUser));*/
					}
				}
			})
			/*mui.ajax(apiUrl.profile,{
				type:"post",
				data:{id: JSON.parse(user).id},
				dataType:'json',
				success:function(data){	
					if(data.status==0){
						console.log(123);
						mui.toast(data.msg)
					}
					else if(data.status==1){
//						console.log(data.data.edits);
						vm.isChangeUser = data.data.edits;
					}
				},
				error:function(msg){
					mui.toast(msg);
				}
			});*/

			//"http://a394.213986.com:88/api/notice/getnotice"
			//apiUrl.notice
			mui.ajax(apiUrl.newMessage, {
				type: "post",
				data: {
					username: JSON.parse(user).username,
					page: 1
				},
				dataType: 'json',
				success: function(data) {
					if(data.status == 0) {
						mui.toast(data.msg)
					} else if(data.status == 1) {
						vm.notice = data.data;
						//						console.log(JSON.stringify(data.data));
					}
				}
			});
			//apiUrl.message
			//JSON.parse(user).username
			//http://a394.213986.com:88/api/notice/getnotice
			mui.ajax(apiUrl.notice, {
				type: "post",
				data: {
					username: JSON.parse(user).username,
					page: 1
				},
				dataType: 'json',
				success: function(data) {
					//mui.toast(data);
					if(data.status == 0) {
						mui.toast(data.msg)
					} else if(data.status == 1) {
						vm.message = data.data;
						console.log(JSON.stringify(data.data));
						//alert(data.data);
						//console.log(vm.message.length);
					}
				},
				error: function(err) {

				}
			});
			/*mui.ajax(apiUrl.finance, {
				type: "post",
				data: {
					username: JSON.parse(user).username
				},
				dataType: 'json',
				headers: {
					'Content-Type': 'application/json'
				},
				success: function(data) {
					if(data.status == 0) {
						mui.toast(data.msg)
						mui.toast(444);
					} else if(data.status == 1) {
						vm.finance = data.data
					}
				}
			});*/
		}
	},
	mounted: function() {},
	methods: {
		subInfo: function() {
			var user = localStorage.getItem("user")
			var vm = this;
			console.log(vm.mobile_phone);
			if(user) {
				var vm = this;
				var mask = mui.createMask();
				mui.ajax(apiUrl.saveprofile, {
					type: "post",
					data: {
						"id": JSON.parse(user).id,
						"truename": vm.truename,
						"bank_name": vm.bank_name,
						"bank_number": vm.bank_number,
						"bank_username": vm.bank_username,
						"bank_addr": vm.bank_addr,
						"mobile_phone": vm.mobile_phone,
						"alipay": vm.alipay,
						"wechat": vm.wechat
					},
					dataType: 'json',
					beforeSend: function() {
						plus.nativeUI.showWaiting('提交中，请稍后');
						mask.show(); //显示遮罩层
					},
					complete: function() {
						plus.nativeUI.closeWaiting();
						mask.close(); //关闭遮罩层
					},
					success: function(data) {
						plus.nativeUI.closeWaiting();
						mask.close(); //关闭遮罩层\
						if(data.status == 0) {
							mui.toast(data.msg);
						} else if(data.status == 1) {
							mui.toast(data.msg);
						}
					},
					error: function(xhr, type, errorThrown) {
						console.log(xhr);
						console.log(type);
						console.log(errorThrown);
					}
				});
			} else {
				openWindow('../pages/login/login.html')
			}
		},
		turn: function(index) {
			var vm = this;
			var user = localStorage.getItem("user");
			if(user) {
				mui.ajax(apiUrl.viewdetails, {
					type: 'post',
					data: {
						id: index,
						username: JSON.parse(user).username
					},
					dataType: 'json',
					complete: function() {},
					success: function(data) {
						if(data.status == 0) {
							mui.toast(data.msg);
						} else if(data.status == 1) {
							vm.notice2 = data.data;
						}
					},
					error: function(msg) {
						mui.toast(msg);
					}
				})
			} else {
				openWindow('../pages/login/login.html')
			}
		},
		turn1: function(index) {
			var vm = this;
			var user = localStorage.getItem("user");
			if(user) {
				mui.ajax(apiUrl.message, {
					type: 'post',
					data: {
						id: index
					},
					dataType: 'json',
					complete: function() {},
					success: function(data) {
						if(data.status == 0) {
							mui.toast(data.msg);
						} else if(data.status == 1) {
							vm.message1 = data.data;
						}
					},
					error: function(msg) {
						mui.toast(msg);
					}
				})
			} else {
				openWindow('../pages/login/login.html')
			}
		},
		changeLogin: function() {
			var vm = this
			var user = localStorage.getItem('user');
			if(user) {
				var mask = mui.createMask()
				mui.ajax(apiUrl.savepassword, {
					type: "post",
					data: {
						id: JSON.parse(user).id,
						oldpass: vm.oldLoginPass,
						pass1: vm.newLoginPass1,
						pass1c:vm.newLoginPass1c,
						pass2:vm.newLoginPass2,
						pass2c:vm.newLoginPass2c
					},
					dataType: 'json',
					beforeSend: function() {
						plus.nativeUI.showWaiting('提交中，请稍后');
						mask.show(); //显示遮罩层
					},
					complete: function() {

					},
					success: function(data) {
						plus.nativeUI.closeWaiting();
						mask.close(); //关闭遮罩层
						if(data.status == 0) {
							mui.toast(data.msg)
						} else if(data.status == 1) {
							console.log(JSON.stringify(data));
							mui.toast(data.msg)
							vm.oldLoginPass = '';
							vm.newLoginPass1 = '';
							vm.newLoginPass1c = '';
							vm.newLoginPass2 = '';
							vm.newLoginPass2c = '';
							vm.exit()
						}
					},
					error: function() {
						mui.toast('服务器连接超时，请稍后再试');
					}
				});
			}else{
				openWindow('../pages/login/login.html');
			}
		},
		changePay: function() {
			var vm = this
			var mask = mui.createMask()
			mui.ajax(apiUrl.changePass, {
				type: "post",
				data: {
					userid: vm.userInfo.id,
					oldpass: vm.oldPayPass,
					pass2: vm.newPayPass,
					type: 2
				},
				dataType: 'json',
				beforeSend: function() {
					plus.nativeUI.showWaiting('提交中，请稍后');
					mask.show(); //显示遮罩层
				},
				complete: function() {

				},
				success: function(data) {
					plus.nativeUI.closeWaiting();
					mask.close(); //关闭遮罩层
					if(data.status == 0) {
						mui.toast(data.msg)
					} else if(data.status == 1) {
						mui.toast(data.msg)
						vm.newPayPass = ''
						vm.oldPayPass = ''
					}
				},
				error: function() {
					mui.toast('服务器连接超时，请稍后再试');
				}
			});
		},
		exit: function() {
			var user = localStorage.getItem('user');
			mui.ajax(apiUrl.logout, {
				type: 'post',
				data: {
					id: JSON.parse(user).id
				},
				dataType: 'json',
				success: function(data) {
					if(data.status == 0) {
						mui.toast(data.msg);
					} else if(data.status == 1) {
						mui.toast(data.msg);
					}
				}
			})
			localStorage.removeItem('user')
			openWindow('../pages/login/login.html')
		}
	}
})