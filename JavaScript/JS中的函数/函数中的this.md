# 函数中的this

+ 只有是函数的函数体中才有this对象，它代表当前函数执行的主体，而不是当前函数的执行作用域(上下文),通俗的说就是谁把函数执行的，那么执行函数的主体就是this。

一般面试中遇到this，都要三思而后行。想一句话：你以为你以为的就是你以为的。

+ this是执行函数的主体，不是函数执行的环境(上下文context)
我去上海和平饭店吃饭。
吃饭是一个行为，代表一个方法也就是函数
我是吃饭这个行为的主体，代表this
而上海和平饭店是吃饭的环境，也就是函数执行时的上下文

+ this指向谁和函数在哪里创建的没有关系，和函数在哪里执行的也没有关系，this的指向只看当前函数的执行者是谁，如何查找一个函数的执行者，需要掌握下面几个基本的规律。
(而函数的上一级作用域和在哪里执行没关系，但是和改函数在那个作用域中创建的有关系)



## 查找函数运行时this的几条规律：
1.事件绑定函数中的this

给DOM元素的某个事件绑定方法，当事件触发方法执行的时候，方法中的this是当前操作的DOM元素本身。

>> 全局作用域下声明的函数，在非严格模式下其this指向window对象，在严格模式下this是undefined。
2.立即执行函数
立即执行函数，其this指向window对象或者undefined

3.对象中的方法
对象中的方法，其this指向调用该方法的对象

箭头函数中没有this，其内部的this要根据定义箭头函数的上下文来判断

4.在构造函数中的this
构造函数中的this是当前构造函数构造出来类的实例

5.通过call apply和bind可以修改函数运行时的this指向，bind是提前进行修改，但是并不会执行

6.定时器函数体中的this一般指向window

7.回调函数体当中的this一般指向window
回调函数：当一个函数A被当做实参传递给另外一个函数B，那么这个函数A就是回调函数，回调函数中的this指向window。

需要搞明白A回调函数中的this和B函数体中的this是不一样的，因为函数中的this只和函数的执行者是谁有关系，和在哪里创建或在哪里执行无关，只和执行者有关。

```
window.a = 1;
function x(){
	console.log(this.a); 1
	console.log(this); this指向window
}
function sum(callback){
	callback();等于x函数被执行，打印1和window对象
	console.log(this.a); call改变了sum函数运行的this指向，打印100
	console.log(this);   指向修改后的this ===> obj
}
var obj = {
	a:100,
}
sum.call(obj,x);

```




#### 思考题？
1.hasOwnProperty方法执行时的this指向？ary.__proto__.__proto__
ary.__proto__.__proto__.hasOwnProperty();

2.以下函数中的this的指向？
```
let obj = {
	fn:(function(n){
		console.log(this);      window
		return function(){
			console.log(this);   obj
		}
	})(10),
}
obj.fn();

```


立即执行函数是obj存引用值的时候，堆内存中存的是键值对。fn的属性值是立即执行函数的结果，但是立即执行函数是自己执行的，所以第一个this指向window

立即执行函数返回的结果是return的函数，当obj.fn()的时候，也就等于obj调用了return的那个小函数，所以此时那个return的小函数中的this指向调用者obj。

3.给事件绑定方法中fn函数的this指向
```
document.body.onclick = function(){
	<!-- this指向document.body -->
	fn();
}
function fn(){
	console.log(this);window
}
```
this是谁和函数在哪里创建的，在那个作用域中执行的没有关系，只和函数的调用者有关。

## 函数中的this面试题（存在疑问）
```
var foo = {
	bar:function(){
		console.log(this,666);
	}
};
foo.bar(); this为函数调用者foo对象
(foo.bar)();老师讲的是window，但是浏览器执行后打印的是foo

将一个函数用括号包裹起来，就是将函数声明当做函数表达式来执行，所以bar函数当做foo对象上的一个方法，执行的时候this还是指向函数的调用者foo对象
```

## 综合面试题 this，作用域链查找机制，变量提升，立即执行函数，闭包
```javascript
var num = 10;
var obj = {num:20};
obj.fn= (function(num){
	this.num = num * 3;
	num++;
	console.log(num);
})(obj.num);
var fn = obj.fn();
fn(5);
obj.fn(10);
console.log(num,obj.num)

答案为依次输出：22 23 65 30

```

## This和面向对象的另外一种深入理解
Array.prototype.slice.call(arr,10,20)和arr.slice(10,20)执行的区别？

### 手写一个数组的push方法，并通过调用自己手写的方法实现给arr1数组末尾依次添加进去7,8,9三个值

```javascript
let arr1 = [1,2,3,1];
function myPush(...args){
	for(var i=0;i<args.length;i++){
		this[this.length] = args[i];
	}
	return this;
}
Array.prototype.myPush = myPush;
```
通过调用myPush方法实现数组末尾添加值有两种方案：
1.直接使用arr1.myPush(7,8,9);
arr1.myPush(7,8,9)执行的时候，this指向实例arr1，方案可以

2.使用Array.prototype.myPush.call(arr1,7,8,9);
Array.prototype.myPush.call(arr1,7,8,9)执行的时候，this指向方法的调用者Array.prototype对象，由于在手写push方法的时候就默认函数体中的this一定是一个Array类的实例，此时Array.prototype对象并不是Array类的实例，所以如果直接运行会报错。但是基于call方法可以将方法中的this从原来的Array.prototype修改为传入的第一个参数arr1,后面的789是函数的实参，这种方法也可以实现，只不过写法上比较复杂。


### 为什么类数组转化为数组可以基于Array.prototype.slice.call(arguments)？

在执行原型链上内置的slice方法的时候
将该方法中的this人为的修改为arguments
那么会有一个神奇的效果
那就是在这个过程中会将方法中的arguments从类数组转化为数组

将arguments转化成为数组的原始方法
创建一个空数组arr
for循环将arguments中每一项遍历并push到新数组arr
return这个新数组arr
此时的arr是将arguments转化成为数组

在手写slice方法并实现浅拷贝的时候
我们发现步骤几乎是一样的
先创建一个新数组用于返回arr
for循环将this也就是操作的数组遍历，每一项push到新数组arr中
返回这个arr
那么这个arr就是浅拷贝之后的数组

那么只需要在执行Array.prototype.slice()方法的时候，将方法中的this人为的修改为arguments，并且不传递任何参数，那么就等于变相的将arguments转化成了新数组

借用数组原型上的slice方法
Array.prototype.slice.call(arguments);
[].slice.call(arguments)

### 编程思想总结：
类数组不能用数组原型上的方法，但是可以先让某一个东西调用数组原型上的方法，这里有两个方案：
1.随便一个数组的实例，比如[].slice.call(aruguments)
2.Array.prototype.slice.call(aruguments)


但是有个前提：类数组和数组的数据结构很相似才可以，数组原型上某个方法中的代码用类数组当做this去执行不会报错且可以执行才可以。

### 应用：将函数传入的所有实参进行求和,该函数接收的实参不是固定的
```
方案一：最笨的for循环
function sum(){
	let len = arguments.length;
	let total = 0;
	for(var i=0;i<len;i++){
		total += arguments[i];
	}
	return total;
}
sum(1,2,4,5,5,45)

方案二：先将类数组转化为数组arr，然后通过join方法和eval方法
function sum(){
	let len = arguments.length;
	let arr = [];
	for(var i=0;i<len;i++){
		arr.push(arguments[i]);
	}
	let str = arr.join('+');
	return eval(str)
}
sum(1,2,4,5,5,45)
```

>>> 方案三：类数组借用数组原型链上的forEach方法完成自身操作
```
function sum(){
	let total = 0;
	[].forEach.call(arguments,item=>{
		total += item;
	})
	return total;
}
sum(1,2,4,5,5,45)
```







