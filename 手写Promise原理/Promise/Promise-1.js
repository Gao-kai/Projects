/* 
	Promise/A+规范 -- 基本
	1. Promise是一个对象或者一个函数，但是这个promise必须有一个then方法并且符合规范
	2. thenable的意思是一个对象或者函数上具有then方法
	3. 在调用resolve或者reject的时候可以传值value，value可以是JS值，包含了undefined，或者是一个promise
	4. 异常可以用throw来排除
	5. reason是一个值，reason将会告诉我们这个promise为什么被rejected拒绝了
	
	Promise/A+规范 -- 状态
	一个Promise一定有三种状态，pending、fulfilled或者rejected
	1. 当Promise的状态是pending的时候，可以被转换为fulfilled或者rejected
	2. 当一个Promise的状态是fulfilled或者rejected的时候，不能再转化为其他状态
	3. 当状态发生变化的时候传递的value或者失败时候的reason其值是不能被深度修改的，也就是不能修改这个值的引用地址
	
	Promise/A+规范 -- then方法
	1. 一个Promise实例上必须得有一个then方法，这个then方法接收两个参数分别是onFullfilled和onRejected，分别代表状态为成功或者失败之后执行的回调函数
	
	注意：executor执行时传入的resolve和reject函数是用来修改状态的，和then方法里面的成功回调以及失败回调并没有必然的联系，这是一个容易弄混的情况。
 */

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
			
		// 用来改变状态为成功的resolve函数
		const resolve = (value) =>{
			if(this.status===PENDING){
				this.value = value;
				this.status = FULFILLED; // 执行resolve修改状态
			}
		}
		
		// 用来改变状态为成功的reject函数
		const reject = (reason) =>{
			if(this.status===PENDING){
				this.reason = reason;
				this.status = REJECTED; // 执行reject修改状态
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
		if(this.status === FULFILLED){
			onFulfilled(this.value);
		}else if(this.status === REJECTED){
			onRejected(this.reason);
		}
	}
}

module.exports = MyPromise;