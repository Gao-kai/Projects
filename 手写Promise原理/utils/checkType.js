function checkType (type,value) {
	return Object.prototype.toString.call(value) === `[object ${type}]`
}

// 柯里化解决
function myCurring2(fn){
	const Len = fn.length; // 2
	function temp(args = []){
		/* temp函数执行要不就是返回计算的最终结果 要不就是返回一个函数 */
		if(args.length >= Len){
			return fn(...args);
		}else{
			return function(...innerArgs){
				return temp([...args,...innerArgs]);
			}
		}
	}
	return temp();
}

// 遍历添加
const utils = {};
const types = ['Number','String','Boolean'];

types.forEach(type=>{
	utils['is' + type] = myCurring2(checkType)(type);
})



// console.log(checkType('Number',100));
// console.log(checkType('String',100));
// console.log(checkType('String','100'));

// 弊端在于太依赖于用户的输入了 很有可能写错Number、String等出现错误的判断 


// function checkType(type){
// 	return function(value){
// 		return Object.prototype.toString.call(value) === `[object ${type}]`
// 	}
// }

// // 帮助用户定义好 代码太冗余了
// let isNumber = checkType('Number');
// const res1 = isNumber(100);

// let isString = checkType('String');
// const res2 = isString(100);

// types.forEach(type=>{
// 	utils['is' + type] = checkType(type)
// })



// const curringType = myCurring2(checkType);
// types.forEach(type=>{
// 	utils['is' + type] = myCurring2(checkType)(type);
// })
