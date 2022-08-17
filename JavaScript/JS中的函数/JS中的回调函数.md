### 什么是回调函数？
把一个函数A当做实参传递给另外一个函数B，在函数B执行的过程当中，将传递进来的函数A也进行执行，这个被当做实参传递的函数A就是回调函数。但是在执行的时候有以下情况需要考虑：
+ 传递进来的函数A需要执行多少次
+ 函数到底如何执行
+ 函数执行的过程中需不需要改变this
+ 函数接不接收返回值
+ 函数传不传递参数

### JS哪些地方会用到回调函数
+ AJAX异步请求成功做什么事情，请求失败做什么事情
拿到数据之后做什么事，把那个要做的事情当做回调函数传递进去，获得数据之后，把回调函数一执行，这样子想要对数据做什么操作只需要写在回调函数中就可以了。
```js
function getIndexData(successCall,errorCall){
	$.ajax({
		url:'xxx.json',
		method:"GET",
		async:true,
		success:res=>{
			typeof successCall === 'function'?successCall(res):null;
		},
		fail:err=>{
			typeof errorCall === 'function'?errorCall(res):null;
		}
	})
}
getIndexData(function(data){
	// 接收从服务器拿到的数据res
	// 并对请求成功的结果进行处理
	data = this.indexData;
},function(err){
	// 接收从服务器返回的错误信息
	// 并对错误信息进行展示
	window.alert(err);
})
```

+ 浏览器内置的诸多迭代和遍历数组forEach map filter sort这些方法中用到回调函数 
arr.forEach((item,index)=>{})
循环数组中每一项，每循环一次都将当前项的值和索引当做参数传递给回调函数(item,index)=>{}，并将回调函数执行一次。

作业：重写一个可以循环遍历数组 类数组以及对象的方法each
```js


```


+ 定时器也是回调函数，将一个函数传递给window.setTimeout这个方法，当时间到了之后将传递进去的回调函数执行
setTimeout(()=>{},1000) 里面的那个箭头函数就是回调函数，等于将箭头函数当做实参传递给了window.setTimeout这个方法，只不过window.setTimeout这个方法是等待一秒之后执行。也就是代表

+ 插件组件封装中的钩子函数（生命周期函数）
new Drag('.box',{
	start:function(){},
	move:function(){},
	end:function(){}
})

应用场景
凡是符合我想做这件事的时候，中间某个阶段或者做完之后某个阶段我想干一些其他事情，那么我们就可以将想干的其他事情当做回调函数传进来。

### 字符串内置replace方法的重写
let str = "{0}年{1}月{2}日",
	arr = ['2019','09','03'];
let newStr = str.replace(/\{(\d)\}/g,function(match,p1,index){
	console.log()
})

```js 封装用于进行数据类型检测的工具方法checkType
function checkType(val){
	let type = Object.prototype.toString.call(val);
	return type.substring(8,type.length-1);
}
```

```js 封装基于substring方法来进行原始字符串替换的方法handleStr
使用字符串的substring方法完成字符串替换思路
function handleStr(str,oldStr,newStr){
	let index = str.indexOf(oldStr),
		length = oldStr.length;
	if(index <0)return str;
	return str.substring(0,index) + newStr + str.substring(index+length);
}
```
 
#### 实现重写replace方法的知识储备
每一个正则对象都有的属性
global：true代表全局 false代表不是全局
ignoreCase 是否开启大小写模糊匹配
 
除此之外正则对象的原型上还有几个常用的方法:
1. reg.exec(str) 检索字符串中的正则表达式的匹配。返回一个数组，其中存放匹配的结果。如果未找到匹配，则返回值为 null。
正则对象的exec方法的返回值
返回的数组中存有以下信息:
数组中[0]项一定是匹配到的所有字符串
数组中[1]-[n]项是括号中分组捕获到内容
index属性 匹配到的字符串相对于原始字符串的索引
input 原始字符串
2. reg.test(str) 只是为了判断是否匹配（true或 false）
3. toString 转化为字符串
 
```js 基于以上两个方法完成replace方法重写
@params pattern      模式可以是字符串或者正则表达式
		replacement  替换内容为字符串或者回调函数
		
@return 返回值为经过替换后的新的字符串
		原字符串不发生改变
		
@注意点：
1.当参数pattern的值为正则表达式，第二个参数replacement的值为回调函数的时候，如果正则表达式开启了global全局匹配，那么正则在字符串中匹配几次，回调函数就会被执行几次。

2.每次在执行回调函数的时候，传递给回调函数的实参是当前正则reg调用exec方法进行捕获的详细信息，如果捕获成功会返回一个包含匹配值和分组信息以及匹配值的索引存在的数组，将这个数组中每一项通过apply或者展开运算符...arr展开后当做实参传递给回调函数。

3.回调函数每次执行的返回值会拿去替换当前字符串匹配到的这一项字符串。

4.回调函数中的this默认为window，不进行任何改变

5.每次执行此方法都需要先克隆一个执行此方法的实例


function myReplace(pattern,replacement){
	let cloneStr = this.substring(0);
	// 判断替换模式 如果是字符串 不管替换项为函数还是字符串 都只替换一次
	if(checkType(pattern)==='String'){
		if(checkType(replacement)==='String'){
			return handleStr(cloneStr,pattern,replacement);
		}
		if(checkType(replacement)==='Function'){
			let res = replacement();
			return handleStr(cloneStr,pattern,res);
		}
	}
	// 判断替换模式 如果是正则表达式 会替换多次
	if(checkType(pattern)==='RegExp'&&checkType(replacement)==='Function'){
		let isGlobal = pattern.global;
		let arr = pattern.exec(cloneStr);
		while(arr){
			let res = replacement.apply(null,arr);
			let index = arr.index;
			let pipeixiang = arr[0];
			cloneStr = handleStr(cloneStr,pipeixiang,res);
			console.log('这一次操作后结果成为了',cloneStr);
			arr = pattern.exec(cloneStr);
			if(!isGlobal)break;
		}
		return cloneStr;
	}
	
};
String.prototype.myReplace = myReplace;
```

