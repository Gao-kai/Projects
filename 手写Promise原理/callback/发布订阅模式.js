const fs = require('fs');
/* let arr = [];
function after(times,callback){
	let arr = [];
	return function(data,index){
		arr[index] = data;
		if(--times === 0){
			callback(arr);
		}
	}
}

let readSuccess = after(2,function(params){
	console.log('文件读取成功',params);
});

fs.readFile('../a.txt','UTF8',function(err,data){
	readSuccess(data,0);
})

// 异步读取b文件
fs.readFile('../b.txt','UTF8',function(err,data){
	readSuccess(data,1);
}) */



/* 
 发布订阅者模式
 先订阅 后发布
 发布订阅者模式核心就是把多个方法先暂存起来 最后依次执行
 发布订阅者模式最主要就是解耦
 可以在多个地方或者类中进行订阅事件
 然后在某一个地方统一执行
 
 */

// 事件中心 用于调度 没读取一次就触发一次
// 订阅有顺序 是靠数组这种数据格式来实现
let events = {
	_events:[],
	on:function(fn){
		this._events.push(fn);
	},
	emit:function(data){
		this._events.forEach(fn=>{
			return fn(data);
		})
	}
}

// 订阅第一件事
let arr = [];
events.on((data)=>{
	console.log('读取文件成功一次',data);
})

// 订阅第二件事
events.on(data=>{
	arr.push(data);
})

// 订阅第三件事
events.on(()=>{
	if(arr.length === 2){
		console.log('读取文件OK');
	}
})

fs.readFile('../a.txt','UTF8',function(err,data){
	events.emit(data);
	// readSuccess(data,0);
})

// 异步读取b文件
fs.readFile('../b.txt','UTF8',function(err,data){
	events.emit(data);
	// readSuccess(data,1);
})

// 观察者模式
/* 
	观察者模式：基于发布订阅模式 内部是基于发布订阅模式实现的
	发布订阅模式的发布和订阅之间么有依赖关系
	观察者模式需要有两个状态：观察者和被观察者
	
 
 */