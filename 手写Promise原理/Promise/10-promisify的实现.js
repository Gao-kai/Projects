const MyPromise = require('./Promise-5.js');
/* 
	promisify就是将一个异步操作改造成为Promise的方案
	主要是给node来使用
	回调函数的参数的第一个参数永远是err 把这种回调叫做error-first
	
	就是将一个回调函数的方式 改造成为一个Promise的方式
 */
const fs =require('fs');
fs.readFile('../a.txt','utf-8',function(err,data){
	console.log("err: ",err);
	console.log("data: ",data);
})

/* 
	导入node的util模块 里面就有promisify方法
 */
const util = require('util');
const promisifyReadFile = util.promisify(fs.readFile);

promisifyReadFile('../a.txt','utf-8').then(data=>{
	console.log("data: ",data);
}).catch(err=>{
	console.log("err: ",err);
})

/* 
	自己实现promisify
 */
function myPromisify(fn){
	return function(...args){
		return new Promise((resolve,reject)=>{
			try{
				fn(...args,(err,data)=>{
					if(err){
						reject(err);
					}else{
						resolve(data);
					}
				});
			}catch(e){
				//TODO handle the exception
				reject(e);
			}
			
		})
	}
}

/* 
	自己实现promisify All 
	bluebird中用到的
	将obj上的所有方法转化为promise
 */
function myPromisifyAll(obj){
	let result = {};
	for(let key of Object.keys(obj)){
		if(typeof obj[key] === 'function'){
			result[key + 'Promise'] = myPromisify(obj[key])
		}
	}
	return result;
}
