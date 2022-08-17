/* 
	1. Promise.resolve()
	Promise.resolve方法的重大作用在于可以接受一个promsie实例作为参数
	并且等待这个promsie实例返回结果之后
	再将结果传递下去
	
	2. Promise.reject()
	下面是原生的示例：
 */
Promise.resolve(100).then(res=>{
	console.log('res1',res)
},err=>{
	console.log('err1',err)
})

/* 
	其实这个方法很简单，就是等于将new Promise这个过程封装起来了：
 */
new Promise((resolve,reject)=>{
		resolve(100);
}).then(res=>{
	console.log('res2',res)
},err=>{
	console.log('err2',err)
})

/* 引入自己写的MyPromise */
const MyPromise = require('./Promise-5.js');
// resolve的值是普通值
MyPromise.resolve(200).then(res=>{
	console.log('res3',res)
},err=>{
	console.log('err3',err)
})
// resolve的值是一个promise
MyPromise.resolve(
	new MyPromise((resolve,reject)=>{
		setTimeout(()=>{
			resolve(996)
		},1000)
	})
).then(res=>{
	console.log('res996',res)
},err=>{
	console.log('err996',err)
})

// reject的值是普通值
MyPromise.reject(200).then(res=>{
	console.log('res4',res)
},err=>{
	console.log('err4',err)
})

// reject的值是一个promise 那么此时无需处理
MyPromise.reject(
	new MyPromise((resolve,reject)=>{
		setTimeout(()=>{
			resolve(997)
		},1000)
	})
).then(res=>{
	console.log('res997',res)
},err=>{
	console.log('err997',err)
})