/* 
	现在我们需要手写实现一个Promise的polyfill，那么按照规范应该至少满足以下几个要求：
	1. Promise应该是一个类，并且不用考虑任何浏览器的兼容性
	2. 使用这个Promise类的时候，必须要传入一个函数也就是执行器executor，这个函数会在new Promise的时候会被立即同步执行
	3. new Promise的时候传入的执行器executor函数自己接收两个参数，这两个参数也是两个函数，分别用resolve和reject代指，分别用来描述Promise的当前状态.如果调用resolve那么会将状态修改为成功，如果调用reject函数那么代表出现异常或者失败，会将状态修改为失败
	4. Promise中有三个状态 等待pending 成功fulfilled 失败rejected，默认状态下就是等待状态
	5. 每一个通过new Promise得到的promise实例上都有一个then方法，then方法接收两个函数作为参数，分别是当前promise内部状态为成功或者为失败后的回调函数。
	6. executor函数是同步执行的，then方法是异步执行的
	7. resolve和reject在调用的时候可以传递参数，这个参数会被then方法中的成功回调或者失败回调函数的形参所接收
	8. 如果是executor中抛出了异常 那么也会走到then方法的失败回调中
	9. promise一旦状态发生变化，那么不可再次更改 也就是说先调用resolve 然后再调用reject或者抛出异常 那么只会执行resolve的成功回调 因为状态是不可发生更改的
	10.promise的核心其实还是回调函数
 */

let MyPromise = require('./Promise-1.js');
const promise = new MyPromise((resolve,reject)=>{
	console.log('executor函数被执行');
	// resolve('成功');
	reject('失败')
	throw new Error('抛出了错误')
})

promise.then((res)=>{
	console.log('状态成功',res);
},(err)=>{
	console.log('状态失败',err);
})

console.log('这是一行同步执行的代码，应该先于then方法执行！！！');