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

/* 
	promise链式调用的基础：一个promise实例调用then方法的返回值是一个新的promise实例
	jquery的链式调用：是通过返回this来实现的。但是promise的链式调用不能返回自身，因为这样会导致一个promise实例内部的状态一直变化，这就是为什么每次then都会返回新的promise实例的原因
	
	promise链式调用过程中return值的情况：
	1. then中方法返回的是一个普通值，也就是说非promise实例，这个普通值就会被当做外层下一次then方法的成功回调函数的结果传递过去
	2. then中方法如果出错或者手动抛出了一个异常，那么这个异常就会被当做外层下一次then方法的失败回调函数的结果传递过去
	3. 特别注意：无论上一个then中方法走的是成功还是失败，只要返回的是普通值，这个普通值包含了undefined也就是什么都不return的情况，那么等于就把undefined这个值当做外层下一次then方法的成功回调函数的结果传递过去
	4. 特别注意：只有手动throw new Error的时候才会将异常对象传递给下一次then方法的失败回调中去，如果是return new Error等于返回了一个错误对象其实还是可以普通值，那么这这个异常对象会当做下一次then方法的成功回调函数的结果传递过去。

	5. then中方法返回的也是一个Promise的实例比如是A，此时会根据当前这个Promise实例A的结果来处理是走成功还是失败
		+ 如果当前A里面的状态变为成功，那么就会将成功的值传递给外层下一次then方法的成功回调中去
		+ 如果当前A里面的状态变为失败，那么就会将失败的reason传递给外层下一次then方法的失败回调中去

	总结：
	1. 如果上一个promise的then方法中不管成功回调还是失败回调中返回的值是一个状态为成功的Promise实例，以及JS值、undefined以及return new Error等情况那么都会将这个返回的值传递给下一个外层新的promise实例的then方法的成功回调函数中去；
	2. 反之如果返回的值是一个失败的Promise实例或者手动throw new Error异常等情况，那么才会走到下一个外层新的Promise实例的then方法的失败回调函数中去
/* 
	使用promise来改造这个回调地狱的方法
 */
let MyPromise = require('./Promise-3.js');

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
// readTxtB("../a.txt", "UTF8")
// 	.then(
// 		(data) => {
// 			console.log("第一步读取到b文件的路径是", data);
// 		},
// 		(err) => {
// 			console.log("读取失败", err);
// 		}
// 	)

let promise2 = new MyPromise((resolve,reject) => {
	resolve(1111);
}).then(res => {
	console.log('res1111', res);
	return new MyPromise((resolve,reject) => {
		resolve('返回的新的promise成功');
		reject('返回的新的promise失败');
	})
}, err => {
	console.log('err1111', err);
})

promise2.then(res => {
	console.log('res2222', res);
}, err => {
	console.log('err2222', err);
})


