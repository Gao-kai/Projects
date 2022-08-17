const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class MyPromise {
	constructor(executor){
		// 开始时的状态为PENDING
		this.status = PENDING;
		
		// 保存成功值或者失败的原因
		this.value = undefined;
		this.reason = undefined;
		
		// 存放成功的回调函数列表
		this.onFulfilledCallbackList = [];
		// 存放失败的回调函数列表
		this.onRejectedCallbackList = [];	
		
		// 用来改变状态为成功的resolve函数
		const resolve = (value) =>{
			if(this.status===PENDING){
				this.value = value;
				this.status = FULFILLED; // 执行resolve修改状态
				
				// 发布
				this.onFulfilledCallbackList.forEach(fn=>fn()); 
			}
		}
		
		// 用来改变状态为成功的reject函数
		const reject = (reason) =>{
			if(this.status===PENDING){
				this.reason = reason;
				this.status = REJECTED; // 执行reject修改状态
				
				// 发布
				this.onRejectedCallbackList.forEach(fn=>fn());
			}
		}
		
		try{
			executor(resolve,reject);
		}catch(e){
			reject(e);
		}
	}
	
	// 执行then方法
	then(onFulfilled,onRejected){
		// 当状态为pengding的时候 有可能是executor中的resolve或者reject是异步才可以执行的，所以要暂存起来
		if(this.status === PENDING){
			
			// 订阅成功
			this.onFulfilledCallbackList.push(()=>{
				// ...todo
				onFulfilled(this.value);
			})
			
			// 订阅失败
			this.onRejectedCallbackList.push(()=>{
				// ...todo
				onRejected(this.reason);
			})
		}
		
		if(this.status === FULFILLED){
			onFulfilled(this.value);
		}else if(this.status === REJECTED){
			onRejected(this.reason);
		}
	}
}

module.exports = MyPromise;