/* 
	上一版已经实现了Promise最基本的功能，下面要实现的是Promise的核心功能：
	1. Promise的链式调用，回调地狱就是靠链式调用来解决的
	2. Promise是如何解决同一时间发起多个异步请求的，但是如果等待所有异步请求都返回结果之后再去执行下一步业务逻辑的问题
	3. 多个异步请求出现错误异常的问题，需要每一个都捕获错误
 */

/* 
	1. 使用promise的链式调用解决上一个异步请求的输出是下一个异步请求的输入问题
	+ 缺点1：常规解决方案就会很轻松的写出回调地狱的代码
	+ 缺点2：每一次都需要对异步请求的结果去捕获异常，对异常进行处理判断
 */

const fs = require("fs");
/* fs.readFile('../a.txt','UTF8',function(err,data){
	if(err){
		console.log(err);
		return;
	}
	console.log('读取到b文件的路径是',data);
	fs.readFile(data,'UTF8',function(err,data){
		if(err){
			console.log(err);
			return;
		}
		console.log('读取到b文件中的内容是',data);
	})
}) */

let MyPromise = require('./Promise-4.js');
function readTxtB(filePath, encoding) {
	return new MyPromise((resolve, reject) => {
		// 第一次异步获取b文件的路径
		fs.readFile(filePath, encoding, function(err, data) {
			if (err) {
				reject(err);
				return;
			}
			resolve(data);
		});
	});
}


let promise2 = new MyPromise((resolve,reject) => {
	reject(1111);
}).then(res => {
	console.log('res1111', res);
	return new MyPromise((resolve,reject) => {
		setTimeout(()=>{
			resolve('返回的新的promise成功');
		},1000)
		
	})
}, err => {
	console.log('err1111', err);
	return new MyPromise((resolve,reject) => {
		setTimeout(()=>{
			reject('返回的新的promise失败');
		},1000)
		
	})
})

promise2.then(res => {
	console.log('res2222', res);
}, err => {
	console.log('err2222', err);
})


