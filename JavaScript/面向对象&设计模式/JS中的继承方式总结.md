## 面向对象OOP中类的继承方法总结extend
什么是面向对象编程？
在JS中我们将所有内容根据各自的功能和特点将其分为一个个的类，我们研究的时候研究的是类的实例，因为只要高清除一个类的实例，这个类的其他实例也有着相同的特点和特性。
面向对象就是面向类和类的实例编程。
研究类就是研究类的继承 封装 和多态
研究实例就是研究实例的原型链


### 1. 类的继承 封装 多态
>>> 封装：高内聚低耦合
页面当中的冗余代码减少 低耦合
相同功能的代码的使用频率提高 高内聚
把实现某一个功能的代码进行函数封装，实现更强的可复用性。

>>> 多态：重载和重写
重载：方法名相同，但是根据传递的形参个数或者形参数据类型不一样，方法会被重载执行不同的函数。

JS中的函数不存在真正意义上的重载，也就是同一个作用域中如果存在两个名称相同的函数,按照顺序，声明在后的函数总会覆盖声明在前面的函数。

JS中通常意义上的重载指的是：同一个方法，根据传参个数或者数据类型的不同，在方法内部执行不同的代码从而实现出不同的功能。
```js 
根据传参个数来实现JS中函数的多态
function sum(x,y,z){
	if(arguments.length===1){
		当传入一个参数的时候，执行的代码
		return ...;
	}else if(arguments.length===2){
		当传入二个参数的时候，执行的代码
		return ...;
	}
}


```

类的重写：在类的继承中，子类可以重写父类中的方法。






### 2. 为什么要继承
类的继承：JS中的继承指的是子类继承父类上的属性和方法，目的是让子类的实例可以调用父类中的属性和方法。

父类Father具有私有属性money和car;Father的原型上具有公有方法getMoney
```js
function Father(money,car){
	this.money = money;
	this.car = car;
}
Father.prototype.getMoney = function(){
	console.log('今天赚了' + this.money + '元');
}
```

子类Son具有私有属性name和age;Son的原型上具有公有方法getName
```js
function Son(name,age){
	this.name = name;
	this.age = age;
}
Son.prototype.getName = function(){
	console.log('我今年' + this.name + '岁了');
}

```

现在想要Son类构造出来的实例不仅可以调用实例私有的属性name和age；以及基于原型链可以调用类的原型对象上的方法getName。而且想要调用Father类上公有的方法getMoney以及Father类的实例所具有的私有属性money和car，那么一个类的实例想要调用另外一个类上的属性和方法，此时就用到继承了。



### 3. 继承常用的四种方法
第一种方案：面向对象中的原型继承

原理：让父类中的属性和方法存在于子类实例的原型链上
实现：让子类的原型对象指向父类的实例,从而让子类的实例的原型链上同时存在父类的实例和父类自身的原型对象，从而子类的实例可以调用父类原型上的方法以及父类实例对象上的私有属性和方法。


```js
function A(money,car){
	this.money = money;
	this.car = car;
}
A.prototype.getMoney = function(){
	console.log('今天赚了' + this.money + '元');
}
function B(name,age){
	this.name = name;
	this.age = age;
}
B.prototype = new A(200,'benz');
B.prototype.constructor = B;

B.prototype.getName = function(){
	console.log('我今年' + this.name + '岁了');
}
```
继承前的son实例的原型链：
son==>son.__proto__ ==>Son.prototype ==>Object.prototype

继承后的son实例的原型链：
son==>son.__proto__ ==>Son.prototype ==> new Father()father实例 ==> father.__proto__ ==> Father.prototype ==> Object.prototype

注意：一个类的原型只要重定向了，为了保证这个类的原型的完整性，我们都要记得给这个类的原型加一个constructor属性指回当前类。

原型继承的特点：
1.查找型继承：不像其他语言的继承一样，其他语言的继承一般是拷贝继承，也就是子类继承父类，会把父类中的属性和方法拷贝一份到子类中，供子类的实例调取使用。JS中的原型继承的原理是把父类的原型放到子类实例的原型链上，实例想调取这些方法，是基于__proto__原型链查找机制完成的，是查找型继承。

2.重写有影响：其他语言中，子类重写父类上的方法代表的意思是将从父类拷贝过来的方法进行了重写，并不是对父类本身上的方法进行了重写，所以就算重写了也不会对父类构造出来的其他实例产生影响。

JS中的原型继承中，由于子类可以重写并修改父类上的方法，这样会导致父类其他的实例也收到影响，所以这是原型继承一大缺点。

Son子类通过__proto__修改了父类Parent上的sum方法，后面所有父类Parent构造出来的实例上的sum方法都会收到影响。

Son.prototype.__proto__.sum = function(){...}

3.原型继承会导致父类中私有或者公有的属性和方法都会变成子类中公有的属性和方法，子类的实例可以基于原型__proto__调用这些属性和方法。

最好是父类的私有属性变为子类的私有属性
父类的公有属性变为子类的公有属性
那就要看下面的方案call继承和寄生组合继承

第二种方案：call继承
```js
function A(money,car){
	this.money = money;
	this.car = car;
}
A.prototype.getMoney = function(){
	console.log('今天赚了' + this.money + '元');
}
function B(name,age){
	A.call(this,'100','benz');
	this.name = name;
	this.age = age;
}
B.prototype.getName = function(){
	console.log('我今年' + this.name + '岁了');
}
```
call继承的特点：
在子类B函数体内部，把父类A当做普通函数执行，通过call可以改变函数执行时this的特点，将父类A中的this指向子类B的实例(原本父类A中的this在构造实例的时候是指向A自己的实例的)，从而让子类B的实例上设置了很多父类的属性和方法。

1.只能继承父类私有的属性或方法，也就是父类函数体中this.xxx = xxx的属性和方法。因为是把父类当做普通函数执行，所以和父类原型上的公有属性和方法没有任何关系。

2.通过call继承之后，可以让父类私有的属性和方法变为子类私有的属性和方法


第三种方案：寄生组合式继承
先搞懂Object.create(obj)的方法

let obj = {name:'666',age:88};
let a = Object.create(obj);

Object.create方法会创建一个空对象，然后将创建出来的这个空对象的原型__proto__指向传入的参数obj对象，也就是说原本存在于obj对象上的属性和方法，此时已经可以基于原型链__proto__被新创建的空对象a所调用。

由于IE浏览器中不支持__proto__属性被调用并且Object.create是ES6的方法，我们该如何手写一个Object.create方法呢？
Object.create = function(proto){
	
	
	//让一个对象的原型指向另外一个对象的方法 基于__proto__直接赋值
	let obj = {};
	obj.__proto__ = proto;

	// 间接思路：先创建一个类，让类的原型对象prototype指向原本obj要指向的对象proto；然后再创建这个类的实例对象obj,这样子obj.__proto是一定指向构造函数Fn.prototype;而Fn的原型对象prototype已经提前等于proto对象，所以等于间接实现了obj的原型指向另外一个对象proto的方法
	obj.__proto__ ===>Object.prototype ===> proto
	
	function Fn(){};
	Fn.prototype = proto;
	let obj = new Fn();
	
	return obj;
}

```js
function A(money,car){
	this.money = money;
	this.car = car;
}
A.prototype.getMoney = function(){
	console.log('今天赚了' + this.money + '元');
}
function B(name,age){
	A.call(this,'100','benz');
	this.name = name;
	this.age = age;
}

B.prototype = Object.create(A.prototype);
B.prototype.constructor=B;

B.prototype.getName = function(){
	console.log('我今年' + this.name + '岁了');
}

```
B.prototype = Object.create(A.prototype);分为两步看：
首先Object.create(A.prototype) 创建一个空对象x，并且将空对象的__proto__原型对象指向A.prototype

然后将B.prototype原型对象指向创建出来的这个空对象x,所以在这一步之后要在x对象中添加一个属性constructor，指向B类自身。因为B的原型对象发生了重定向，重定向之后需要进行constructor的修改。

Object.create(A.prototype)和原型继承中new A()的区别
都会创建一个对象

前者创建的是空对象，该对象中不存在A类中this.xxx这些私有的属性和方法，只可以调用A类的原型上存在的公有属性和方法。

后者创建的是一个A类的实例对象，该对象中既包含A类中this.xxx等这些私有属性和方法，并且可以调用A类的原型上的公有属性和方法

在没有ES6的extend之前，基于call和Object.create方法的寄生组合式继承是实现子类继承父类最有效的方法；如果某些低版本浏览器不兼容Object.create方法，那么我们需要自己手写一个Object.create这样一个方法来实现。

实例中的私有属性和方法除了自己的，还继承了父类实例上私有的属性和方法
实例中的公有属性和方法除了自己类原型的，还继承了父类原型上公有的属性和方法

第四种继承：ES6 extends继承
class CHILD extends PARENT 
实现父类原型上公有属性和方法可以变为子类实例所能调用的公有属性和方法
类似于继承组合式继承
class B extends A{}等同于：
B.prototype = Object.create(A.prototype)等同于：
B.prototype.__proto__ = A.prototype


```js
class A{
	constructor(name,age){
		this.name =name;
		this.age  =age;
	}
	// 内部声明的函数就等于A的prototype上的公有方法
	getName(){
		console.log(this.name)
	}
}

class B extends A{
	constructor(car,money){
		super('xiaoming',18);
		this.car =car;
		this.money=money;
	}
	// 内部声明的函数就等于A的prototype上的公有方法
	getCar(){
		console.log(this.car)
	}
}
let b = new B('benz',500);

```
如果A的原型上需要加一个公有的属性，那么需要这样写：
A.prototype.Good = true;

ES6中基于class关键字创建出来的类不能当做函数来执行，只能用于构造类的实例
所以call继承在ES6中不可以使用，因为call继承的原理就是把类当做函数来执行，执行的时候修改其内部的this

其次基于class创建的类也不允许重定向类的原型对象，所以：
B.prototype = Object.create(A.prototype)
这种写法虽然不会报错，但是B的原型对象并不会发生改变

class在使用extends要实现继承的时候，不写constructor(){}并不会报错，这样只是代表这个类中没有自己私有的属性而已。但是浏览器会在内部创建一个super方法的实现。写了就以自己写的为准，没有写那么就以默认传递的参数为准。
constructor(...args){
	super(...args);
}

但是如果class使用了extends关键字,并且使用了construcotr(){},那么应该在constructor中的第一条语句就应该写super();如果不写那么就会报错
super(参数1，参数2,...);的作用就等于PARENT.call(this,参数1，参数2);但是由于class声明的类不可以通过普通函数执行，所以创建一个super方法，既可以实现call继承私有属性的功能，还可以实现传参。


### 真实项目中 继承的使用场景

1. 创建React组件 利用的原理就是ES6继承
```
class Login extends React.components{
	constructor(props){
		super(props);
	}
	render(){
		
	}
	componentsWillMount(){
		//this代表当前Login的实例，它继承了React.components类的原型上的公有方法，所以：this.setState = React.components.prototype.setState方法
		this.setState();
	}
}

```

2. 自己创建组件和类
Promise.prototype上的属性和方法：then catch finally
```js
class Dialog extends Promise{
	constructor(){
		super();
	}
	show(){
		this.then().then();
	}
}
this.then().then();this.then()会返回一个类的实例，然后再then()执行会处理异步结果
```

3. 两个类的方法共用
class Utils{
	query(){
		
	}
}

class Dialog extends Utils(){
	constructor(title,duration){
		super();
		this.title = title;
		this.duration = duration;
		
		this.query();
	}
	
}
let dialog = new Dialog();
类和类之间通过继承实现相互的调取和使用
比如Dialog类想要调用Utils类上的query方法：
1.先new Utils()得到一个实例，然后在调用query方法
2.通过ES6 extends和super()关键字


### 大杀器：你是如何来理解面向对象的？或者说什么叫面向对象？【这部分视频可以再听一遍】

>>> 首先：围绕面向对象在JS中的三大应用来回答
首先面向对象是一种编程思想，它和面向过程编程是相对应的。【此处要了解面向对象和面向过程的区别？】面向对象思想是将有共同特征和特点的事物封装为一个类，然后基于创建这个类的实例去编程；而面向过程是函数式编程，根据程序逻辑流程来进行编程。

对于前端来说，首先JS其自身就是基于面向对象构建出来的。
比如JS自身就有很多内置的类，如Function这个类，它有许多子类如Object、Array、Number、String、Function等，通过new这些子类可以创建其对应的实例。

比如ES6中新增的内置类Promise，我们通过new Promise得到一个promise的实例，通过这个实例去管理异步编程。来实际项目中，Promise实例处理异步编程用到很多。比如之前做的异步返回地图坐标所对应的地址等等，对于Promise的源码研究过一点点。

我们平时用的Vue、React等这些框架其实也就是基于面向对象构建出来的，比如Vue它本身也是一个类。我们平时开发的时候都是new Vue()创建他们的实例来操作的。

我自己所封装的组件也是基于面向对象思想创建出来的，这样可以创建不同的实例，来管理私有的属性和公有的方法，很方便。
比如我封装的组件举例说明：详细说下自己封装的组件中用到的面向对象思想
Dialog
拖拽组件


>>> 然后：围绕JS中面向对象和其他编程语言中面向对象不同来回答
JS中的面向对象和其他编程语言中的面向对象还是有不同的。JS中的类和实例是基于原型和原型链机制来处理的。而且JS中关于类的重载、重写、继承也和其他语言不太一样（这里要搞明白重载 重写 和继承的方法和思路）

搞清楚JS中类的重载和后端语言类的重载的区别
搞清楚JS中类的重写
搞清楚类的继承的多种方法和思路
搞清楚类、实例、原型对象三者关系
搞清楚原型链查找机制








