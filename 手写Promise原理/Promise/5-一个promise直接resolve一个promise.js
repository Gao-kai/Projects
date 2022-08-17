/* 
	下面这种情况并不是Promise A+规范的，但是在实际开发中经常使用：
	一个promise中又直接resolve一个promise的情况
 */

let MyPromise = require('./Promise-4.js');
new MyPromise((resolve,reject)=>{
	resolve(new MyPromise((resolve,reject)=>{
		resolve(100)
	}))
}).then(res=>{
	console.log("resxxx: ",res);
})

/* 
	默认情况下，如果这种情况不进行处理的话，那么res中打印出来还是一个promise对象，如下
	 resxxx:  MyPromise {
	   status: 'FULFILLED',
	   value: 100,
	   reason: undefined,
	   onFulfilledCallbackList: [],
	   onRejectedCallbackList: []
	 }
	这代表着我们现在实现的promise并没有对resolve中放的是一个promise实例的情况进行处理，我们希望的是最后res中拿到的应该是返回的这个promise的结果100，而不是一个promise对象
	
	if(value instanceof MyPromise){
		return value.then(resolve,reject)
	}
	
	处理之后 拿到的值就是resxxx 100 是我们希望的值
 */