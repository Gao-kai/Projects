const MyPromise = require('./Promise-5.js');
/* 
	1. Promise.all([p1,p2,...])
	如果在同一时刻并发的发起多个异步请求，那么Promise.all会等待这多个Promise实例内部的状态都变为成功之后才会返回最终的结果，如果其中有任意一个失败了，那么就走失败的回调
	
	适用的场景是什么呢？
	就是解决原来并行发起多个请求的时候写那种计数器的代码
	每次有一个成功计数器就+1
	等到加到一个数 满足执行下一步的条件时
	才是才去执行
	 
	Promise.all方法的返回值还是一个promise实例
	它内部会将所有成功的结果都按照我们请求的顺序放在一个数组中resolve出去
	
	对这个实例执行then方法，那么这个then方法的onFulfilled回调的参数res就可以拿到所有成功的结果
	
	如果其中有一个失败 就会调用then方法的onRejected方法的err参数中就可以拿到失败的结果
	
	Promise.all方法的参数不一定非是promise实例 普通值也是可以的
	更加准确的说这个参数一定是一个可被迭代的数据结构
	就是部署了[Symbol.iterator]方法的
	一个可迭代对象，如 Array 或 String。
	
	allSeletted
	
 */

let p1 = new MyPromise((resolve,reject)=>{
	setTimeout(()=>{
		resolve(100);
	},1000)
});

let p2 = new MyPromise((resolve,reject)=>{
	setTimeout(()=>{
		reject(200); 
	},2000)
})


MyPromise.all([1,2,p1,3,p2]).then(data=>{
	console.log("data: ",data);
}).catch(err=>{
	console.log("err: ",err);
})

/* 
	Promise.allSettled
	不管成功还是失败 都会拿到所有的结果
	然后resole出来
	不会走catch方法
	解决了promsie的all方法一个失败就GG的问题
 */
MyPromise.allSettled([1,2,p1,3,p2]).then(data=>{
	console.log("data1: ",data);
}).catch(err=>{
	console.log("err1: ",err);
})

/* 
	Promise.any
	如果其中一个成功 就会走成功 并且将第一个成功的值resolve出去
	如果全部失败了 才会走失败 并且将失败的结果放到数组中reject出去
 */

/* 
	2. Promise.prototype.finally
	无论成功还是失败 而且还是可以向下执行
	finally返回的还是promise 还是可以继续then
	finally的回调函数是拿不到data的
	并且promise的结果可以透传，比如下面这样：
 */


// new Promise((resolve,reject)=>{
// 	setTimeout(()=>{
// 		resolve(3000); 
// 	},3000)
// }).finally(()=>{
// 	console.log("finally");
// }).then(data=>{
// 	console.log("透传的data: ",data);
// })

/* 
	如果finally的回调函数onFinally中手动return了一个新的promise实例
	如果这个promise实例是成功的，那么并不会将成功的结果传递给下一个promise的成功回调中去，结果不传递但是代码还是会执行
	如果是失败的，那么就会直接到下一个then方法的错误回调中去
	
	这和then以及catch方法是不同的
	
 */
new MyPromise((resolve,reject)=>{
	setTimeout(()=>{
		reject(3000); 
	},1000)
}).finally(()=>{
	console.log("finally");
	return new MyPromise((resolve,reject)=>{
		setTimeout(()=>{
			// resolve('返回的promise成功')
			reject('返回的promise失败')
		},1000)
	})
}).then(data=>{
	console.log("透传的data: ",data);
},err=>{
	console.log("透传的err: ",err);
})