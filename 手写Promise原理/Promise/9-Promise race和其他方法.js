const MyPromise = require('./Promise-5.js');
/* 
	3. Promise.race
	无论多个promsie的结果是成功还是失败
	只返回最快的那个结果
	多用于超时处理
	
	注意：race方法并不是说最快的那个promise变为成功或者失败之后
	剩余的promsie就不执行了 只是将最快的promsie结果返回
	其他的promise还是会执行完成 只不过这些结果就不返回了
	
	应用：图片加载 请求加载 都有可能造成超时，但是这种超时不包含：
	发出请求后等待5秒超时了 此时结果已经变为失败
	但是过了一会儿又回来了 但是结果不能再变成成功了
 */

/* 
	race的应用：解决当我们调接口或者加载脚本或者加载图片的时候超出3s之后没有返回结果 就手动中止接口请求 
 */
let abort = null;
function getList(){
	return new MyPromise((resolve,reject)=>{
		abort = reject;
		setTimeout(()=>{
			// 模拟的异步请求 假设这个异步请求5s之后才会返回结果
			resolve('返回结果为100')
		},5000);
	})
}
let p = getList();
p.abort = abort;

p.then(data=>{
	console.log("data: ",data);
},err=>{
	console.log("err: ",err);
})

/* 
	美好的设想是：当超出3s之后还没有返回结果时，我就中止这个请求，也就是让这个p变为失败状态，并且后续不可更改，比如调用p的abort方法
 */

setTimeout(()=>{
	p.abort('当前p接口调用超时，判定结果为失败');
},3000)


/* 
	但是 以上这种方法处理的不优雅，首先有个问题是还需要用户自己声明一个abore变量，并且没有用到race方法
	
	我们可以巧妙的使用race方法有一个失败就全部失败，有一个成功就成功的这个特点
	1. 自己手动new 出来一个promsie实例
	2. 将自己的这个promsie实例的rejct方法给内部变量abort
	3. 使用race方法执行自己的这个promsie和用户真正要执行的那个promise
	4. 将abort方法再给到最终返回的race方法的返回值
	5. 在外面调用abort方法即可
 */
function getList1(){
	return new MyPromise((resolve,reject)=>{
		setTimeout(()=>{
			// 模拟的异步请求 假设这个异步请求5s之后才会返回结果
			resolve('返回结果为100')
		},5000);
	})
}
let p1 = getList1();
/* 
	结果wrap方法包装之后的promsie实例就有了可以自由控制其接口在超出一定时间后返回失败的能力 就是打断某个promise的请求
 */
function wrap(promiseInstance){
	let abort = null;
	let _promise = new MyPromise((resolve,reject)=>{
		abort = reject;
	})
	let resultPromsie = MyPromise.race([promiseInstance,_promise]);
	resultPromsie.abort = abort;
	return resultPromsie;
}

let p2 = wrap(p1);
p2.then(data=>{
	console.log("data: ",data);
},err=>{
	console.log("err: ",err);
})
setTimeout(()=>{
	p2.abort('当前p接口调用超时，判定结果为失败');
},3000)


/* 
	fetch API 是没有中断请求的方法
 */