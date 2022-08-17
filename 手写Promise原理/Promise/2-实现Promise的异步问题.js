/* 
	相比于上一版本的Promise实现，问题：
	1. 如果在executor方法中存在一个定时器，在1秒之后再执行resolve方法，这时候就会导致promise的状态一直是pending
		所以要解决一个问题:当用户在某些情况下调用then方法的时候，此时promise的状态还是等待态，需要先将这种状态暂存起来
		因为后续有可能会调用resolve和reject方法引起状态的改变，从而引起then方法中的onFulfilled和onRejected方法的执行
	
	2. 一个promise可以调用多次then方法，直接调用的时候其实onFulfilled和onRejected都不具备执行的条件，但是此时可以先存起来
		等到后续状态变了 有执行的条件了 再去执行onFulfilled和onRejected方法
		这里要用到发布订阅模式
		+ 如果成功就把成功的都存起来，失败就把失败的都存起来
		+ 一旦状态变了 再将列表中的成功或者失败依次遍历执行
 */

let MyPromise = require('./Promise-2.js');
const promise = new MyPromise((resolve,reject)=>{
	setTimeout(()=>{
		resolve('一秒钟之后执行成功')
	},1000)
})

promise.then((res)=>{
	console.log('状态成功1',res);
},(err)=>{
	console.log('状态失败1',err);
})

promise.then((res)=>{
	console.log('状态成功2',res);
},(err)=>{
	console.log('状态失败2',err);
})

console.log('这是一行同步执行的代码，应该先于then方法执行！！！');