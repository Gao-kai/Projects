/* 明确已知函数的参数个数 */
function sum (a,b,c,d) {
	return a+b+c+d;
}

function myCurring1(fn){
	// 确定函数的形参个数
	const Len = fn.length;
	// 用变量saveParamsList保存每次传递进来的参数
	const saveParamsList = [];
	
	return function Temp(...args){
		saveParamsList.push(...args);
		
		if(saveParamsList.length === Len){
			return fn(...saveParamsList);
		}
		return Temp;
	}
}

function myCurring2(fn){
	const Len = fn.length;
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

sum = myCurring2(sum);
console.log(sum(1));
console.log(sum(2,3));
console.log(sum(4)); // 输出10

