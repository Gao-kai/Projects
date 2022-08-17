const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

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
		执行then方法 
		then方法执行的时候new Promise里面的executor里面的代码立即执行
		就会根据状态判断当前在调用then方法的这个promise实例上的onFulfilled或者onRejected执行
		同时可以拿到当前这个promise实例的返回结果
		调用then方法的this就是当前的promise实例对象
		只有调用then方法的时候里面的this才可以被确定 这个很关键
	 */

	then(onFulfilled, onRejected) {
		// 用于实现then的链式调用
		let promise2 = new MyPromise((resolve, reject) => {
			// 当状态为pengding的时候 有可能是executor中的resolve或者reject是异步才可以执行的，所以要暂存起来
			if (this.status === PENDING) {
				// 订阅成功
				this.onFulfilledCallbackList.push(() => {
					try {
						// ...todo
						let res = onFulfilled(this.value);
						resolve(res);
					} catch (e) {
						reject(e)
					}
				});

				this.onRejectedCallbackList.push(() => {
					try {
						// ...todo
						let reason = onRejected(this.reason);
						resolve(reason);
					} catch (e) {
						reject(e)
					}
				});
			}

			if (this.status === FULFILLED) {
				try {
					/* 
						这个res有可能是一个普通值 或者是一个promsie
						如果promise需要看下这个promise是成功还是失败
						如何判断？
						调用这个promsie的then方法，如果成功，就把这个promise成功的结果 通过调用promise2的resolve传递进去
						如果失败，就调用promise2的reject传递进去
						
						总结这个res的值决定了调用promise2的resolve还是reject
						如果是promsie实例 需要取它的状态
						如果是普通值 直接传递过去即可
					 */
					let res = onFulfilled(this.value);
					
					resolve(res);
				} catch (e) {
					reject(e)
				}

			}

			if (this.status === REJECTED) {
				try {
					let reason = onRejected(this.reason);
					resolve(reason);
				} catch (e) {
					reject(e)
				}
			}
		});

		return promise2;
	}
}

module.exports = MyPromise;
