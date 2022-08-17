/* 核心函数core */
function core(a,b){
	console.log('core函数被执行，执行结果是：',a+b);
}

/* 拓展core函数 */

Function.prototype.before = function(beforeCallback){
	let that = this;
	return function(){
		const params = Array.from(arguments);
		beforeCallback();
		that.apply(null,params);
	}
}

Function.prototype.after = function(afterCallback){
	return (...args)=>{
		afterCallback();
		this(...args);
	}
}

Function.prototype.all = function(beforeCallback,afterCallback){
	return (...args)=>{
		beforeCallback();
		this(...args);
		afterCallback();
	}
}



/* 在独立的函数中定义core函数执行前和执行后需要拓展的业务逻辑 */
function beforeCore(){
	console.log('beforeCore函数被执行');
}

function afterCore(){
	console.log('afterCore函数被执行');
}

/* 最终的效果是别人单独调用core函数不影响原有逻辑 */
core(10,20);

/* 调用beforeCore方法的高阶函数 */
const newBeforeCore = core.before(beforeCore);
newBeforeCore(10,20);


const newAfterCore = core.after(afterCore);
newBeforeCore(50,100);


const newAllCore = core.all(beforeCore,afterCore);
newAllCore(100,200);