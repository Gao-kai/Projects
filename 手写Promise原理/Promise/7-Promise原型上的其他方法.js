const MyPromise = require('./Promise-5.js');
/* 
	为了避免我们每次捕获一个promise失败的状态都写两个函数，比如：
 */
new MyPromise((resolve,reject)=>{
		resolve(100);
}).then(res=>{
	console.log('res1',res)
},err=>{
	console.log('err1',err)
})

/* 
	其实可以改写为每次then都写一个回调方法：
	因为我们在实现的时候处理过onFulfilled和onRejected都不传递的情况会赋默认值
 */
new MyPromise((resolve,reject)=>{
		reject(100);
}).then(res=>{
	console.log('res2',res)
}).then(null,err=>{
	console.log('err2',err)
})

/* 
	其实还可以吧null解决掉，用catch来捕获
	catch方法其实本质就是一个没有成功回调函数的then方法
 */

new MyPromise((resolve,reject)=>{
		reject(100);
}).then(res=>{
	console.log('res3',res)
}).catch(err=>{
	console.log('err3',err)
})