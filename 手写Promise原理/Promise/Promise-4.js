const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

/**
 * resolvePromise 基于x的值来决定调用promise2的resolve还是reject方法
 */
function resolvePromise(promise2,x,resolve,reject){
	// console.log(promise2,x,resolve,reject);
	/* 
		规范一：如果promise2和x是同一个对象 也就是同一个引用地址 那么就要抛出一个TypeError
		这是因为then方法返回了一个promise 但是如果是自身的话既不会成功也不会失败 那就这是不合理的
	 */
	if(promise2===x){
		throw new TypeError('Chaining cycle detected for promise #<Promise>')
	}
	

	
	/* 
		规范二：如果返回的x是一个promise 那么它必须是一个函数或者对象，也就是说只有x是函数或者对象的前提下，x才有可能是一个promise实例；否则那么x就是一个JS中的普通值
	 */
	if((typeof x === 'object' && x !== null) || typeof x === 'function'){
		/* 
			规范三：如何精确的确定x是promsie实例呢?就是将x的then方法赋值给then
			如果这个过程发生异常那么就将异常当做promise2的reject传递出去
			那么什么时候x.then会报错呢？就是下面这种情况 因为这个返回的x可能不是我们实现的这个Promise类构造出来的实例 有可能是调用者自己实现的自己的一个Promise类的实例 
			所以这里看似简单的一个取值 但是还是有风险
			let x = {};
			Object.defineProperty(x,'then',{
				get(){
					throw new Error();
				}
			})
		 */
		
		/*
			还需要考虑的一个问题是如果是别人写的promsie 那么这个x作为promsie实例
			有可能会有一个大问题 就是既可以调用成功 然后又可以调用失败
			这个和A+规范相悖 但是我们无法控制
			所以我们需要用一个锁来锁住 确保了别人的promise符合规范
		 */
		let called = false;
		try{
			let then = x.then;
			if(typeof then === 'function'){
				/*
					如果then是一个函数 那么就认定x是一个promise
					那么就要调用then方法，让x作为this 等价于x.then
					如果写成x.then 还是有可能会触发getter 触发异常
					所以就把上面第一次得到的then变量 直接去调用即可
					
					然后调用then方法的时候传入两个函数作为参数
					第一个是resolvePromise，该函数有一个参数是y
					第二个是rejectPromise，该函数有一个参数是r
				 */
				then.call(x,y=>{
					if(called)return;
					called = true;
					// resolve的参数又是一个promsie 那么需要递归解析
					resolvePromise(promise2,y,resolve,reject);
				},r=>{
					if(called)return;
					called = true;
					reject(r);
				});
			}else{
				/* 
					如果then不是一个函数 那么就只有两种情况：
					x是对象，对象上有个then属性的值是对象
					x是函数，函数对象上有个then属性的值是对象
				 */
				
				resolve(x);
			}
		}catch(e){
			if(called)return;
			called = true;
			reject(e);
		}
		
		
	}else{
		// 如果是普通值 直接将x通过promise2中的resolve传递出去
		resolve(x);
	}
}

class MyPromise {
	constructor(executor) {
		// 开始时的状态为PENDING
		this.status = PENDING;

		// 保存成功值或者失败的原因
		this.value = undefined;
		this.reason = undefined;

		// 存放成功的回调函数列表
		this.onFulfilledCallbackList = [];
		// 存放失败的回调函数列表
		this.onRejectedCallbackList = [];

		// 用来改变状态为成功的resolve函数 constructor里面的this是指向实例对象的
		const resolve = (value) => {
			/* 
			这里的value如果是promsise 也只能是自己的promise 不能是别人的
			如果是reject 则无需解析 因为已经失败了 
			*/
			if(value instanceof MyPromise){
				return value.then(resolve,reject)
			}
			
			if (this.status === PENDING) {
				this.value = value;
				this.status = FULFILLED; // 执行resolve修改状态

				// 发布
				this.onFulfilledCallbackList.forEach((fn) => fn());
			}
		};

		// 用来改变状态为成功的reject函数
		const reject = (reason) => {
			if (this.status === PENDING) {
				this.reason = reason;
				this.status = REJECTED; // 执行reject修改状态

				// 发布
				this.onRejectedCallbackList.forEach((fn) => fn());
			}
		};

		try {
			executor(resolve, reject);
		} catch (e) {
			reject(e);
		}
	}

	/* 
		对于then方法中参数的规范要求：
		1. onFulfilled和onRejected是可选的，如果不是一个函数，那么就会被忽略 此时就需要我们手动赋值一个函数
		2. onFulfilled和onRejected如果是一个函数 那就用这个函数
		3. 如果不传递参数 那么结果可以透传
		比如：new MyPromise((resolve)=>{resolve(100)}).then().thne().then(res=>console.log(res))
	 */
	then(onFulfilled, onRejected) {
		onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v=>v;
		onRejected = typeof onRejected === 'function' ? onRejected : err=>{throw err} ;
		
		// 用于实现then的链式调用
		let promise2 = new MyPromise((resolve, reject) => {
			// 当状态为pengding的时候 有可能是executor中的resolve或者reject是异步才可以执行的，所以要暂存起来
			if (this.status === PENDING) {
				// 订阅成功
				this.onFulfilledCallbackList.push(() => {
					setTimeout(()=>{
						try {
							// ...todo
							let x = onFulfilled(this.value);
							resolvePromise(promise2,x,resolve,reject);
						} catch (e) {
							reject(e)
						}
					},0)
				});

				this.onRejectedCallbackList.push(() => {
					setTimeout(()=>{
						try {
							// ...todo
							let x = onRejected(this.reason);
							resolvePromise(promise2,x,resolve,reject);
						} catch (e) {
							reject(e)
						}
					},0)
					
				});
			}

			if (this.status === FULFILLED) {
				// 基于定时器创建一个异步任务 
				// 等待new MyPromise同步代码执行完成之后再执行内部的函数 这时候就可以拿到生成的实例promsie2了 就是保证new MyPromise执行完成 让里面的代码在下一个事件循环的时候执行
				setTimeout(()=>{
					try {
						// ...todo
						let x = onFulfilled(this.value);
						/* 
							直接这样写会报错：resolvePromise(promise2,x,resolve,reject);
							因为这时候参数promise2实例还没有生成，变量不能在未定义之前使用
							解决方案A+规范中说有四个：
							宏任务：setTimeout setImmedidate
							微任务：Mutation.observer() process.nextTick()
							
						 */
						resolvePromise(promise2,x,resolve,reject);
					} catch (e) {
						reject(e)
					}
				},0)
				
			}

			if (this.status === REJECTED) {
				setTimeout(()=>{
					try {
						let x = onRejected(this.reason);
						resolvePromise(promise2,x,resolve,reject);
					} catch (e) {
						reject(e)
					}
				},0)
			}
		});

		return promise2;
	}
}

// npm i promises-aplus-tests -g

// 这个deferred延迟对象可以帮助我们减少一次套用 目前应用并不是很广泛 

/* 
	未包装前的时候 第一次异步请求还需要return一个promsie的实例
	
	function readFile(filePath,encoding){
		return new MyPromise((resolve,reject)=>{
			fs.readFile(filePath,encoding,(err,data)=>{
				if(err){
					return reject(err);
				}
				resolve(data);
			})
		})
	}
 */


MyPromise.deferred = function(){
	let dfd = {};
	dfd.promise = new MyPromise((resolve,reject)=>{
		dfd.resolve = resolve;
		dfd.reject = reject;
	})
	return dfd;
}




/* 
	使用这个dfd对象包装之后
	执行MyPromise.deferred()方法返回了一个对象dfd 这个对象上面就有promsie属性
	该属性的值就是一个promise实例
	并且dfd对象上还有resolve和reject属性分别都执行executor中的方法
	
	这样包装一层之后就会避免多一层嵌套 是一种延迟对象的概念
	也就是把promsie放到一个对象中 通过对象点的方法去访问 而不是new Promise类去访问
 */
function readFile(filePath,encoding){
	let dfd = MyPromise.deferred();
	fs.readFile(filePath,encoding,(err,data)=>{
		if(err){
			return dfd.reject(err);
		}
		dfd.resolve(data);
	})
	return dfd.promise;
	
	/* return new MyPromise((resolve,reject)=>{
		fs.readFile(filePath,encoding,(err,data)=>{
			if(err){
				return reject(err);
			}
			resolve(data);
		})
	}) */
}

module.exports = MyPromise;
