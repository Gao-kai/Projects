
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
function read() {
	setTimeout(()=>{
		events.emit('ok')
	},1000)
}
events.on(function(value){
	if(value === 'ok'){
		console.log('文件读取成功');
		setTimeout(()=>{
			events.emit('open')
		},1000)
		
	}
})

events.on(function(value){
	
	if(value === 'open'){
		console.log('文件打开成功');
		setTimeout(()=>{
			events.emit('write')
		},1000)
		
	}
})

events.on(function(value){
	if(value === 'write'){
		console.log('文件写入成功');
	}
})
read();
		
// function open() {
// 	setTimeout(()=>{
// 		events.on(function(){
// 			console.log('打开成功');
// 		})
// 		// console.log('打开成功');
// 		// write();
// 	},1000)
	
// }

// function write() {
// 	setTimeout(()=>{
// 		events.on(function(){
// 			console.log('写入成功');
// 		})
// 		// console.log('写入成功');
// 	},1000)
// }
// read();



