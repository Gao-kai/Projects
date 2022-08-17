## TypeScript 基础

1. 全局安装 TypeScript 及检查版本

```js
cnpm install -g typescript    全局安装TypeScript
tsc -v      输出版本号为Version 4.3.5
```

2. 在开发工具中配置.ts 文件自动编译为.js 文件

- 新建文件夹,在根目录下运行命令 tsc --init
- 生成 tsconfig.json 配置文件
- 将 tsconfig.json 配置文件中的 outDir 项修改为'./js'
- 新建.ts 文件，书写 ts 代码
- 运行命令 tsc -w 来开启监视，输入代码完成之后保存即可输出编译后的 js 文件

## TypeScript 数据类型

> TS 中定义变量的方式
> TS 中定义变量的时候必须指定变量的数据类型，语法如下：
> var/let 变量名：变量数据类型 = 变量的值;

1. 布尔类型 boolean true/false
   let flag:boolean = true;

2. 数字类型 number
   TS 中不会对整型和浮点型数字做区分，都是用 number 来进行限制
   let num:number = 199;
   let num：number = 0.01;

3. 字符串类型 string
   let str：string = 'hello world'

4. 数组类型 array
   TS 里面规定可以使用两种写法来定义一个数组：

> 定义一个数组中所有数组元素都是同一种数据类型

```js
let 数组名: 数组元素类型[] = [数组值];
```

定义一个数组为 myNum,其内部所有元素都必须为数字类型的值
let myNum:number[] = [1,2,45,646,45];

定义一个数组为 list，其内部所有元素都必须为字符串类型的值
let list:string[] = ['haha','wade','paul'];

> 基于泛型来定义数组

```js
let 数组名：Array<数组元素类型> = [数组值]
```

定义一个数组为 newList,其内部所有元素都必须为 number 数字类型
let newList:Array<number>=[12,45,45,12,45];

定义一个数组为 newList,其内部所有元素都必须为 number 数字类型
let nameList:Array<string>=['lilei','tangmu','bob'];

> 基于 any 来定义可以存放各种数据类型的数组
> let myList:any[] =['tom',123,true,{}];

> 注意：就算在 ts 文件中定义数组的时候没按照要求写入对应类型的值，这段 ts 代码还是会被执行并编译为 js 文件然后拿给浏览器执行，只不过在命令行工具中 tsc 会抛出异常，告诉这是一个不符合规范的值。
> let myNum:number[] = [1,2,45,646,45,false];
> console.log(myNum)  
> 浏览器控制台正常打印出数据[1,2,45,646,45,'jim'];
> 命令行工具抛出异常：error TS2322: Type 'boolean' is not assignable to type 'number'.

5. 元组类型 tuple
   ts 中的元组类型（tuple）本质上是属于数组类型的一种，只不过元组类型具有可以给数组中每一项元素都指定其对应的数据类型的功能，上面的两种定义数组的方法都是只可以规定数组中所有数组元素都是同一种数据类型。

let myList:[number,string,boolean] = ['898','tom',true];

6. 枚举类型 enum
   > 需求：将原来一些后端返回的字段比如支付状态这样的字段用数值来表示某一状态；通过定义枚举类型的值变为将支付状态这样的字段用更加符合其含义的单词来表示某一状态。

事先考虑到某一变量可能取的值，尽量用自然语言中含义清楚的单词来表示这个变量的每一个值，这种方法称之为枚举方法，用这种方法定义的数据类型称之为枚举类型。

> 举例
> 事先考虑到后端返回的 pay_status 支付状态这个变量有三个值，分别为 0,1,2。
> 0 代表支付失败
> 1 代表支付成功
> 2 代表正在支付

通过枚举的方法，使用更加含义清除的单词来代替数字 012 表示支付状态：
fail 代表支付失败
success 代表支付成功
waiting 代表正在支付

> TS 中枚举方法
> enum 枚举名{

    标识符[=整型常数]
    标识符[=整型常数]
    ...
    标识符[=整型常数]

}

> 枚举一个形容支付状态的枚举类型 PayStatus
> enum PayStatus {error=0,success=1,waiting=2;}

> 更加清晰的知道返回的数值代表什么类型
> 定义一个变量为 pay_success，类型为枚举类型，值为 PayStatus.success，1
> let pay_success:PayStatus = PayStatus.success;

定义一个变量为 pay_error，类型为枚举类型，值为 PayStatus.error,0
let pay_error:PayStatus = PayStatus.error;

console.log(pay_success,pay_error)

> 定义枚举类型的时候没有指定数值那么默认以索引为值
> enum PayStatus {red,blue,green};
> console.log(PayStatus)
> {

    0:'red',
    1:'blue',
    2:'green',
    red:0
    blue:1,
    green:2

}

> 定义枚举类型的时候中间有值，那么前面从 0 开始计算，后面从中间的值开始计算
> enum PayStatus {red,blue=5,green};
> console.log(PayStatus)
> {

    0:'red',
    5:'blue',
    6:'green',
    red:0
    blue:5,
    green:6

}

7. 任意类型 any
   如果设置一个变量为任意类型，那么代表给这个变量赋任何值都不会有限制。
   let person:any = 123;

let divEle:any = document.getElementById('demo');
divEle.style.color = 'red';

8. null 和 undefiend
   ts 中的 null 和 undefiend 是其他类型（never）的子类型

> 用法一：定义一个变量不赋值时值为 undefiend 不报错，如果赋值一定为数字类型
> 定义一个变量为 num，指定其元素类型为 number，然后不赋值。虽然可以输出 num 变量的值为 undefiend，但是 ts 会报错；如果此时将 num 的数据类型修改为 undefiend，那么就不会报错。
> let num:number; 报错，因为 num 不赋值就是 undefiend 值，和 number 类型不符合
> let num:undefined; 不报错

如果我们希望 num 不赋值的时候为 undefiend，如果一旦赋值那么必须为 number，则应该：
let num:number | undefiend; 定义一个变量既可以是 number 类型或者 undefiend 类型
num =123; 不报错
或者直接将 num 定义为 any 类型也可以

> 用法二：一个元素可能具有多个类型
> 一个元素可能是 number 类型，可能是 undefiend，可能是 null 类型
> let num:number | undefined | null;
> num = 123;

9. void 类型
   ts 中的 void 表示没有任何类型
   一般用于定义方法的时候没有返回值

function demo():void{
console.log(666);
}
demo();

function demo():number{
console.log(666); // 报错，方法的返回值必须为 number 值，而不是默认的 undefined
return 123; // 正确
}

function demo():undefined{
console.log(123) // 依然报错，方法如果没有返回值，那么在 ts 中不能写 undefined，而应该定义为 void 类型
}

10. never 类型
    ts 中的 never 类型代表从不会出现的值，它包含了 undefined 和 null 类型
    这意味着声明为 never 的变量只能被 never 类型的值所赋值

let num:undefined; num=undefined num 只可以被 undefiend 赋值
let num:null; num=null num 只可以被 null 赋值

## TypeScript 中的函数

### TypeScript 中定义函数的返回值类型

```js
指定函数demo的返回值数据类型必须为string字符串类型;
function demo(): string {
  return "hello world";
}

var demo = function (): string {
  return "hello world";
};
```

### TypeScript 中定义函数的传参类型

```js
函数getUserInfo的返回值必须为字符串类型
并且在调用函数时传递的参数中，name必须为字符串，age必须为年龄
如果不传递参数或者少传递参数或者参数类型传递不对都会报错
function getUserInfo(name:string,age:number):string{
	return `${name} + '' + ${age}`;
}

var getUserInfo = function(name:string,age:number):string{
	return 'hello world';
}

getUserInfo('wang',18)
```

### TypeScript 中定义没有返回值的函数

```js
function run():void{
	执行逻辑操作，不返回任何值
}
run();
```

### TypeScript 中定义可选参数的函数

ES5 中定义的方法，其实参和形参可以不一样
TS 中定义的方法，如果不一样就需要配置可选参数，否则会报错

```js
在定义参数类型的前面加上一个?号代表这个参数为函数的非必传参数
注意如果要将一个参数设置为可选参数，那么要配置到参数列表的最后面
function getAge(name:string,age?:number):void{
	if(age){
		alert(`用户年龄为${age}`)
	}else{
		alert(`用户年龄保密`)
	}
}
getInfo('tom',18);
getInfo('tom');    就算不传递年龄参数也不会报错
```

### TypeScript 中定义默认参数的函数

```js
ES5中设置默认参数的方式：基于||逻辑运算符
function demo(name,age){
	name = name || 'lilei';
	age = age || 20;
}

ES6中设置默认参数的方式:直接在定义的时候给参数赋默认值
function demo(name='lilei',age=20){}

TS中设置默认参数的方式
function demo(name:string='lilei',age:number=20){}

```

### TypeScript 中定义剩余参数的函数

```js
下面这这种写法当参数过多的时候代码太多
function demo(a:number,b:number,c:number):number{
	return a+b+c;
}

定义一个args数组，类似于ES5的arguments实参列表，然后基于...剩余运算符将参数保存
function demo(...args:number[]):number{
	let sum = 0;
	for(let i=0;i<args.length;i++){
		sum+=args[i];
	}
	return sum;
}
demo(1,2,3,4,5,6,4,5,45)
```

### TypeScript 中的函数重载

java 中方法的重载：指的是两个或两个以上的同名函数，它们的参数不同，此时会出现函数重载的情况。

ES5 中的方法没有重载，在同一作用域中的同名函数，后面的函数总是会覆盖前面的函数

```js
后面定义的foo函数总是会覆盖前面的foo函数，所以说ES5中没有函数的重载
function foo(name,age){
	return name + age;
}
function foo(height,weight){
	return height + weight;
}
```

TS 中支持方法的重载：重载的目的就是为同一名称的函数通过定义不同的类型的参数来实现不同的功能

```js
function foo(name:string):any;
function foo(name:string,age:number):any;

function foo(value:any):any{
	if(typeof value ==='string'){
		console.log(value+'888')
	}else{
		console.log(value+'999')
	}
}

foo('lilei');
foo(18)

```

## ES5 之前的类及继承

### ES5 中创建构造函数以及定义类的实例方法和类自身静态方法

```js
function Person(name,age){
	<!-- 实例私有属性及实例私有方法 -->
	this.name = name;
	this.age = age;
	this.sayName = function(){
		console.log(this.name)
	}
}
<!-- 实例公有属性及实例公有方法 -->
Person.prototype.sex = 'male';
Person.prototype.run = function(){
	console.log(this.name + '在跑步');
}
<!-- 类的静态方法 不可以被实例所继承 -->
Person.doWork = function(){
	console.log('正在工作中...')
}

<!-- 类的实例化 -->
let person = new Person('zhangsan',18);

person = {
	name:'zhangsan',
	age:18,
	sayName:function(){}
	__proto__:{
		sex:'male',
		run:function(){}
	}
}

```

### ES5 继承之构造函数 call 继承

优点：可以按照子类的需求给父类的构造函数传参
缺点：只可以继承父类实例上的私有属性和方法，不可以继承父类原型上的公有属性和方法

```js
function Teacher(height,type){
	Person.call(this,'lilaoshi',28); // 继承父类上的私有方法和属性
	this.height =height;
	this.type = type;
}
let teacher = new Teacher(1.88,'历史');
console.log(teacher)

teacher = {
	name:'lilaoshi',
	age:28,
	height:1.88,
	type:'历史'
	sayName:function(){}
}
```

### ES5 继承之原型链继承

优点：可以继承父类的实例属性和方法以及父类原型链上的属性和方法
缺点：子类在 new 实例的时候无法给父类的构造函数传递参数
子类的 constructor 构造器函数需要手动指向子类本身

```js
function Teacher(height,type){
	this.height =height;
	this.type = type;
}
Teacher.prototype = new Person();
Teacher.prototype.constructor = Teacher;

let teacher = new Teacher(1.88,'历史');
console.log(teacher)

teacher = {
	height: 1.88
	type: "历史"
	__proto__: {
		age: undefined
		name: undefined
		sayName: ƒ ()
	}
}
```

### ES5 继承之原型链+call 组合继承

优点：既可以继承父类的所有属性和方法，又可以给父类传递参数
缺点：写法复杂，代码不简洁

```js
function Teacher(height,class){
	Person.call(this,'lilaoshi',28); // 继承父类上的私有方法和属性
	this.height =height;
	this.class = class;
}
Teacher.prototype = Object.create(Person.prototype) // 方法一：实现继承父类原型上的属性和方法
Teacher.prototype = new Person();  // 方法二：实现继承父类原型上的属性和方法

Teacher.prototype.constructor = Teacher;

let teacher = new Teacher(1.88,'历史');
console.log(teacher)

teacher={
	子类实例的私有属性
	height: 1.88
	type: "历史"

	继承自父类的私有属性和方法
	name: "lilaoshi"
	age: 28
	sayName: ƒ ()

	__proto__: {
		constructor: ƒ Teacher(height,type)
		__proto__: {
			继承自父类原型上的公有属性和方法
			run: ƒ ()
			sex: "male"
		}
	}
}


```

## TypeScript 中的类及继承

### TypeScript 中定义类的方法

和 ES6 定义类的方法类似，只是有一些小的区别：

- 所有类的私有属性都可以写在 constructor 构造函数的外面，然后分别定义这些属性该接收的类型,然后依次用分号隔开。因为类可以看作就是在构造函数内部写代码。

- 构造函数 constructor 的参数也都可以接收其接收传参的类型，这里要分开类的实例属性和类的构造函数的参数类型，不是同一个东西。
- 类的原型上的方法可以设置参数类型以及返回值类型

```js
class Person {
  userName: string;
  password: number;
  isOldUser: boolean;

  constructor(uname: string, uwd: number, isOld: boolean) {
    this.userName = uname;
    this.password = uwd;
    this.isOldUser = isOld;
  }

  sayName(name: string): string {
    return this.name;
  }

  static run(): void {
    console.log("i am running");
  }
}

console.dir(Person);
let p = new Person("li", 18, "55555");
console.log(p);
```

### TypeScript 中类继承的方法[类似 ES6 继承]

```js
class Male extends Person {
  constructor(name, age, isOld) {
    super(name, age, isOld);
  }
}

let man = new Male("li", 18, true);
console.log(man);
```

### TypeScript 中类的三种修饰符

TypeScript 里面在定义类的属性的时候给我们提供了三种修饰符：

- public：公有 在类的里面、类的子类以及类外面都可以访问的属性或方法
  属性如果不添加任何修饰符，默认为公有 public 修饰符

- protected：保护 在类里面以及类的子类里面可以访问，在类外部无法访问。
  不可以被类的实例所调用。

```js
Property 'password' is protected and only accessible within class 'Person' and its subclas
ses.
```

- private：私有 在类里面可以访问，在类的子类以及类外部无法访问。
  可以理解为只有类本身可以调用，类的子类以及类的实例都不可以调用这个属性。
  如果一个类的属性不希望被外部修改，那么可以设置这个类的属性为 private 私有。

```js
Property 'isGoodStudent' is private and only accessible within class 'Person'.
```

### TypeScript 中类的静态属性和静态方法

类在 JS 中是构造函数的语法糖，那么只要是函数在 JS 中就属于对象。所以函数的一个角色就是当作对象。
类的静态属性或者静态方法就是直接将属性或者方法添加到类本身上，其调用方法是基于类.或者类中括号[]法来进行调用，类的静态属性和方法不会被继承，也不会被类的实例对象所访问到。

```js
ES5中的静态属性country和静态方法getName;
ES5中的实例属性name和实例方法say;
function Person(name) {
  this.name = name;
  this.say = function () {
    return this.name;
  };
}
Person.prototype.run = function () {
  console.log(8888);
};
Person.country = "China";
Person.getName = function () {
  return "6666";
};
```

类的实例属性或者实例方法指的是当通过 new 调用一个类的构造函数并传入参数的时候，调用的结果会返回一个当前类的实例对象 this，这个实例对象中包含这该类的所有实例属性和方法，所有类的实例都可以拥有这些属性和方法。调用的方法是通过实例的点或者中括号法来调用。

```js
TypeScript中的静态属性staticName和静态方法getStaticName
class Person {
	public userName:string;
	public age:number = 20;

	constructor(uname:string){
		this.userName = uname;
	}

	sayName(name:string):string{
		return this.name;
	}

	static getStaticName():void{
		console.log(this.staticName);// 调用类的静态属性，正确
		console.log(this.userName); // 调用实例的公有属性，错误
	}
	static staticName:string = 'lilei';
}
```

### TypeScript 中类的静态方法

### TypeScript 中的抽象类和抽象方法

> 定义一个抽象类 Animal 以及抽象方法 sleep
> 注意几个点：
> 抽象类存在的意义就是当作其他类的基类或者标准类，不可以通过 new 来实例化一个抽象类
> 在普通类前面加上 abstract 关键字，一个类就变为抽象类
> 一个抽象类里面必须包含一个抽象方法，抽象方法也用关键字 abstract 来声明，并且每一个抽象类的子类都需要重写或者实现这个抽象方法，否则会报错
> 加了 abstract 关键字的抽象方法只可以存在于抽象类中，在其他类中不可以使用抽象方法

```js
abstract class Animal {
	public animalName:string;
	constructor(name:string){
		this.animalName = name;
	}
	abstract sleep():any;
}

class Dog extends Animal {
	constructor(name:string){
		super(name);
	}
	sleep(){
		return this.animalName + '早上睡觉';  // 子类DOG继承自抽象父类，必须实现父类中抽象方法sleep
	}
}

class Cat extends Animal {
	constructor(name:string){
		super(name);
	}
	sleep(){
		return this.animalName + '晚上睡觉';  // 子类Cat继承自抽象父类，必须实现父类中抽象方法sleep
	}
}

```

### TypeScript 中类的多态

> 定义：父类定义一个方法不去实现，让继承它的子类去实现，每一个子类都有不同的表现
> 举例：动物类定义一个吃的方法不实现功能，每一个继承动物类的子类都继承了这个吃的方法，但是子类具体如何实现或者【如何重写】这个吃的方法，我们把这种操作称之为类的多态。

```js
class Animal {
  animalName: string;
  constructor(name: string) {
    this.animalName = name;
  }
  eat(): void {} // 父类定义一个吃的方法
}

class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }
  eat() {
    return this.animalName + "吃骨头"; // 子类DOG对父类方法的重写
  }
}

class Cat extends Animal {
  constructor(name: string) {
    super(name);
  }
  eat() {
    return this.animalName + "吃罐头"; // 子类Cat对父类方法的重写
  }
}
```

## TypeScript 中的接口

### 什么是 TS 中的接口？

在面向对象编程中，接口主要用于定义规范，通俗点说就是假如定义了一个 JSON 对象属性接口，那么就等于规定了这个对象中必须实现哪些属性，这些属性必须为什么数据类型等这种规范。

接口并不关心这个 JSON 对象中每一个属性的值或者方法实现的逻辑，接口只关心制定一种规范。

TS 中的接口有灵活的接口类型，包括属性、函数、可索引和类等接口都可以定义。

TS 中接口还有一个作用就是可以实现批量约束规范。

### 属性类接口：对 JSON 对象中属性的约束

TS 中对函数的普通参数做约束，代表要调用 demo 函数必须传入一个字符串类型的参数，并且参数的个数只能有一个。很明显相比较与 ES5 中函数参数的松散，这里对于函数传递的参数做了很强的约束。

```js
function demo(name: string): void {
  console.log(name);
}
```

TS 中对函数的对象参数做约束，代表必须传入一个对象当做函数的参数，并且该对象中必须只有一个 name 属性，且 name 属性的类型为字符串。如果对象含有其他属性，这里会报错的。

```js
function demo(config: { name: string }): void {
  console.log(name);
}
```

> 批量实现约束对象属性的方法————属性接口
> 上面这种方法可以满足对于对象中属性的约束，但是有一个问题，假如我有 100 个方法都需要对他们的属性做一个相同的约束，难道我们需要一个个按照上面方法手写么？此时就有了批量约束对象中属性的东西出现，我们称之为属性接口。

### 属性接口定义的方式及注意点

1. 接口通过一个关键字 interface 来进行定义，通过下面这种方法定义的接口，可以批量实现多个方法对于属性规范及约束的要求。

2. 在 TS 中定义接口的时候，虽然是以对象的形式进行包裹，但是里面每一行之间都是通过分号来进行间隔的

3. 注意：直接传入对象和传入引用了对象的变量的区别

如果直接将一个对象当做参数传入，那么此时这个对象必须完全满足接口 UserInfo 的要求，也就是只能包含三个属性，并且属性的类型必须完全匹配，如果含有其他多余属性那么会报错。

如果先把一个对象赋值给一个变量，然后将这个变量当做参数传入，那么这个变量指向的对象只需要包含接口 UserInfo 中规范的三个属性即可，有多余的 TS 也不会报错。

4. 在给函数传递被接口约束的参数时，传递的参数顺序可以任意排列，对于结果没有影响。

5. 可选属性的接口：在属性的前面加上一个?号代表这个属性是可选的

定义一个 UserInfo 对象接口，里面有三个属性 name，age 以及 height
方法 getUserInfo 的参数 info 通过接口 userInfo 进行约束，也就是说在调用 getUserInfo 方法的时候，传入的参数必须满足接口 userInfo 的约束。

```js
interface UserInfo {
	name:string;
	age:number;
	height?:string; // height属性是可选的
}
function getUserInfo(info:UserInfo):void{
	console.log(info.name,info.age,info.height)
}
> 直接把对象当做参数传入，多余属性将会报错
getUserInfo({name:'li',age:18,height:'1.72m',hah:18})

> 先把对象的引用地址保存在变量中，然后将这个变量传入，多出的属性不会报错
let temp = {name:'li',age:18,height:'1.72m',hah:18};
getUserInfo(temp);

> 但是如果传入的多余参数在方法getUserInfo中有被引用到，此时TS还是会报错，所以建议严格按照接口的规范来传入变量参数。

```

### 函数类接口：对方法传入的参数及返回值进行约束

```js
定义一个getInfo函数类接口，该接口规定只要实现了此接口的函数，必须满足参数为数字和字符串，返回值为字符串类型。

interface getInfo {
	(id:number,phone:string):string;
}

const getUserName:getInfo = (uid:number,uPhone:string):string=>{
	return uid + '----' + uPhone;
}

const getUserAge:getInfo = (uid:number,uPhone:string):string=>{
	return uid + '++++' + uPhone;
}

console.log(getUserName(666,'18708141523'))
console.log(getUserAge(999,'18708141523'))
```

### 可索引接口：对数组以及对象的约束【不常用】

ES5 中的数组和对象可以写任何类型的元素和属性值。在 TS 中的可索引接口主要指的是对数组和对象的约束。但是这两个接口用的很少，对于数组已经有下面三种方法进行定义并且进行约束，对于对象也基本不用这种方法进行约束且定义。

> TS 中三种定义数组的方式
> const arr:number[] = [1,2,3,4,5];
> const arr:Array<string> = ['li','wang','liu'];
> const arr:any[] = [1,2,'li',true];

> TS 中定义约束数组的接口
> 定义了一个名为 myArr 数组的接口，实现该接口的数组必须满足两个条件：
> 数组的索引必须为数字类型
> 数组索引访问到的数组元素的值必须为字符串类型。

```js
interface myArr {
  [index: number]: string;
}

const arr: newArr = ["car", "dog"]; // 正确 数组所有项的值都为字符串
const arr1: newArr = [123, "li", "dog"]; // 错误，因为数组第0项的值为数字
```

> TS 中定义约束对象的接口
> 定义了一个名为 myObj 对象的接口，实现该接口的对象必须满足两个条件：
> 对象的索引必须为字符串类型，也就是对象属性必须为字符串类型
> 对象属性的属性值必须都为数字类型

```js
interface myObj {
  [index: string]: number;
}
const obj: myObj = { age: 18, height: 1.72 }; // 正确 对象中所有属性值都为数字
const obj: myObj = { age: 18, name: "li" }; // 错误 对象中属性值有字符串
```

### 类接口：对类的约束【和抽象类有点类似】

回顾下 TS 中抽象类的特点：

- 抽象类用关键字 abstract 定义，需要加载 class 前面代表这是一个抽象类
- 抽象类不可以通过 new 来实例化
- 一个抽象类里面必须至少包含一个抽象方法，抽象方法也用关键字 abstract 来声明
- 只有在抽象类中才可以用关键字 abstract 来声明一个抽象方法，在普通的类里面会报错
- 抽象类原型上的抽象方法，子类在继承之后必须基于自己类的需求去实现不同的功能，这种父类定义的方法不去实现，由继承的子类实现不同功能的现象叫做类的多态。

定义一个 Animal 类的接口,实现了这个接口的类必须满足下面几个规范：

- 类必须要有公有属性 name 和 count 以及对应属性的数据类型
- 类必须要有公有方法 eat，eat 方法的参数必须为字符串类型，该方法没有返回值
- 类的接口通过 implements(实施，执行的意思)关键字来实现，而不是 extends 来实现
- 类的接口功能要比抽象类的规范更加强大

```js
interface Animal {
  name: string;
  count: number;
  eat(food: string): void;
}

class Dog implements Animal {
  name: string;
  count: number;
  constructor(n: string, c: number) {
    this.name = n;
    this.count = c;
  }

  eat(food: string): void {
    console.log(this.name + "喜欢吃" + food);
  }
}

let dog = new Dog("xaiohei", 1);
dog.eat("骨头");
```

### 接口的继承：类接口可以继承其他类接口

其实就是继承了接口的规范,在类实现类的接口的时候不仅要实现父类接口的规范,子类接口的规范也要实现.

```js
interface Person {
  name: string;
  eat(food: string): void;
}

interface Woman extends Person {
  age: number;
  dance(type: string): void;
}
// 由于Woman接口继承了Person接口的规范
// Girl类在实现Woman类接口的时候,不仅要实现Woman接口规范还需要实现Person接口规范

class Girl implements Woman {
  name: string;
  age: number;

  constructor(name: string, count: number) {
    this.name = name;
    this.age = count + 1;
  }

  eat(food: string): void {
    console.log(this.name);
  }

  dance(type: string): void {
    console.log(this.age);
  }
}

let girl = new Girl("xaiohei", 18);
console.log(girl);
```

## TypeScript 中的泛型

### 泛型的定义

泛型主要用在需要创建的组件不仅能够支持当前的数据类型，同时也具备支持未来数据类型的要求，所以使用泛型来创建的组件具有很高的复用性，一个组件可以支持多种数据类型，这样用户就可以以自己的数据类型来使用组件。

通俗的说泛型就是解决类、接口、方法的复用性，以及针对不特定数据类型的支持。
并且具有 any 不具备的数据类型校验

### 泛型函数

要求：定义一个函数 demo，要求该函数输入的是什么类型的值，返回的也必须是对应该类型的值

实现方案 1：基于 any 类型
缺点：any 类型等于关闭了类型检查，如果这样就没有必要使用 TS 了，直接写 es 即可
any 类型不能保证函数输入值和返回值的数据类型相同

解决方案：基于泛型
在定义函数或者类的时候，如果遇到类型不明确的时候就可以使用泛型
泛型就是一个不确定的类型，也就是说一个函数或者类里面参数的类型一开始不会被确定是什么类型，只有当该函数被调用或者类被实例化的时候其类型才会被具体确定下来。
优点：首先可以对函数参数和返回值做类型检查
其次根据 value:T 和:T 可以确定函数的参数和返回值类型是一致的，而这个是 any 实现不了的

```js
> 定义一个泛型函数
function demo<T>(value:T):T{
	return value;
}
> 直接调用具有泛型的函数,在调用的时候会基于参数判断T的类型,利用TS的自动推断
demo(5);
// 参数为5，其类型为number，代表将number传递给了T，将实参5传递给了形参value

demo('hello');
// 参数为'hello'，其类型为string，代表将string传递给了T，将实参'hello'传递给形参value

> 手动指定泛型的类型后调用
demo<string>('world');
// 手动指定泛型变量T的值为string，将字符串参数'world'传递给函数的实参
demo<number>(996);
// 手动指定泛型变量T的值为number，将数字996传递给函数的实参
```

### 可以同时为类或者函数指定多个泛型

```js
function demo<T,K>(num1:T,num2:K):T{
	return num1;
}

手动指定泛型类型，T的类型为number，K的类型为string
demo<number,string>(2,'haha');
基于TS自动推断确定泛型类型，推断出T为number，K为boolean。但是不推荐
demo(3,true);

```

### 泛型 T 必须是接口的实现类

### 泛型类

> > > TS 中基于类型校验定义的类
> > > 有对类的方法和属性做类型校验，但是可复用性差以及针对未知数据类型适用性差
> > > MinValue 类中对公共属性 list、公有方法 addValue 和 getMinValue 做了类型校验，但是如果要满足其他类型数据的功能就要重新写一个差不多逻辑的类

```js
class MinValue {
	public list:number[]=[];
	addValue(value:number):void{
		this.list.push(value)
	}
	getMinValue():number{
		let minValue = this.list[0];
		for(let i=0;i<this.list.length;i++){
			if(this.list[i]<minValue){
				minValue = this.list[i];
			}
		}
		return minValue;
	}
}

let x = new MinValue();
x.addValue(1);
x.addValue(12);
x.addValue(6);
x.addValue(8);
console.log(x.getMinValue()) //输出1

```

> TS 中基于泛型定义的类

1. 通过泛型变量 T 来接收类在实例化的时候传入的类型变量，让类的方法和属性具备了类型校验的功能
2. 可以为类传入任意数据类型去实例化类，让类具备了很高的可复用性

```js
class MinValue<T> {
	public list:T[]=[];
	addValue(value:T):void{
		this.list.push(value)
	}
	getMinValue():T{
		let minValue = this.list[0];
		for(let i=0;i<this.list.length;i++){
			if(this.list[i]<minValue){
				minValue = this.list[i];
			}
		}
		return minValue;
	}
}

let x = new MinValue<number>();
x.addValue(1);
x.addValue(12);
console.log(x.getMinValue()) //输出1

let y = new MinValue<string>();
x.addValue('12');
x.addValue('15');
console.log(y.getMinValue()) //输出'12' 字符串比较基于ASCII码

```

### 泛型接口

```js
interface configFn{
	(num1:string,num2:string):string;
}

接口规范中定义的函数参数名称为num1,num2可以和函数在实现该接口时自己定义的形参名称如a，b不一致

const getData:configFn = function (a:string,b:string):string{
	return a+b；
}
getData('hah','heihei');
```

### 把类当做参数类型的泛型类【比较绕】

泛型类
取消重复代码
把类当做参数传递给泛型，此时泛型变量的值就是类
然后对类在实例化时传入的参数进行验证

## TypeScript 中的模块规范

TypeScript 1.5 里面对于模块的术语已经发生了变化。
内部模块现在称之为命名空间，外部模块称之为模块，模块在其自身作用域中执行，而不是全局作用域里。
这意味着一个定义在模块中的变量、函数以及类在模块外部是不可见的，要想使用模块中的内容，必须在模块中先通过 export 关键字导出，然后在你当前的模块中通过 import 关键字导入，导入之后才可以使用其他模块中的变量、函数以及类。

**_遵循 ES6 Modules 模块化规范_**

### 基于 export 关键字一个个导出或者统一导出

```js
A.js文件中导出
export let num = 100;
export function demo(){};
export class Person {}

----------------------------------

let num = 100;
function demo(){};
class Person {}

export {
	num,
	demo,
	Person
}

B.js文件中使用大括号默认导入
import {num,demo,Person} from './A.js'

B.js文件中对导入模块做别名处理后导入
import {num as myNumber,demo as myFunc,Person as myClass} from './A.js'

B.js文件中把导出模块全部导入后放到一个对象中
import * as myModule from './A.js'
```

### 基于 export default 默认导出

export default 在一个文件中只能默认导出一次
export default 导出的模块，在导入的时候可以用任何变量名去接收
export default 导出的模块在导入的时候不用{}
export default 在一个文件中只能使用一次，但是并不代表该文件中其他内容不能同 export 导出

```js
A.js文件中导出;
let num = 100;
function demo() {}
class Person {}

export default {
  num,
  demo,
  Person,
};

B.js文件中使用大括号导入;
import myObj from "./A.js";
```

## TypeScript 中的命名空间

命名空间：当一个项目代码量增多的情况下，为了避免各种变量命名相互冲突，将相似功能的函数、类、接口等放置到命名空间内。这个命名空间可以将代码包裹起来，只对外暴露需要在内部访问的对象。

### ES5 中基于立即执行函数+闭包实现命名空间

当一个项目在开发的时候，如果没有提前规定好开发时声明变量、函数以及类的命名规范的时候，各开发者在独立开发的时候很容易命名一些冲突的全局变量，在 ES6 Modules 没有出来之前，解决这个问题的方法就是每个人都把自己命名的变量、函数以及类通过一个函数包裹起来，然后将需要暴露给外部使用的对象 return 出去，外部在拿到立即执行函数执行结果的同时，等于就拿到了 return 出去的全局变量。

> 小李写的 A.js
> 该命名空间 moduleA 中暴露了一个变量、函数以及类
> 在外部就可以基于 moudleA.xxx 来使用暴露的内容

```js
let moduleA = (function () {
  let name = "li";

  function demo() {
    console.log(8888);
  }

  class Animal {
    constructor(uName: string) {
      this.name = uName;
    }
  }

  return {
    name,
    demo,
    Animal,
  };
})();
```

> 小王写的 B.js
> 该命名空间 moduleB 中暴露了一个变量、函数以及类
> 在外部就可以基于 moudleB.xxx 来使用暴露的内容

```js
let moduleA = (function () {
  let name = "li";

  function demo() {
    console.log(8888);
  }

  class Animal {
    constructor(uName: string) {
      this.name = uName;
    }
  }

  return {
    name,
    demo,
    Animal,
  };
})();
```

> 在最终的 index.html 中依次导入 A.js 和 B.js

可以看出，就算小王和小李都声明了同名的变量 name，以及同名的 demo，但是在使用的时候并不会互相覆盖，因为这是通过 return 出来的对象，在函数外部作用域中某个内容保持了对于函数当前作用域中某个私有变量或者方法的引用，所以这里形成了闭包，闭包的一个作用就是可以保护其私有变量不被污染。

```html
<script src="./A.js" type="text/javascript" charset="utf-8"></script>
<script src="./B.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
  console.log(moduleA.name); // li
  console.log(moduleB.name); // wang
</script>
```

### TypeScript 中基于 namespace 和 export 实现命名空间

TypeScript 中的命名空间：主要指的就是内部模块，主要用于组织代码避免命名冲突
TypeScript 中的模块：主要指的外部模块，侧重于代码的复用，一个模块中可能会有多个命名空间

在 TypeScript 中，通过 namespace 声明一个命名空间，在这个命名空间内的所有变量和函数以及类都是该作用域下私有的，如果想要暴露该命名空间下的变量、函数或者类给外部使用，我们使用 export 关键字导出就可以了。

```js
namespace ModuleA {
	export let name = 'li';

	export function demo(){
		console.log(8888)
	}

	export class Animal {
		constructor(uName:string){
			this.name = uName;
		}
	}
}

namespace ModuleB {
	export let name = 'wang';

	export function demo(){
		console.log(9999)
	}

	export class Animal {
		constructor(uAge:string){
			this.age = uAge;
		}
	}
}

console.log(ModuleA.name)
console.log(ModuleB.name)

```

### 在 TypeScript 中一个模块内部可以包含多个命名空间

一个模块中可以包含多个命名空间，通过 export 关键字将不同的命名空间当做一个对象变量导出，在其他文件中通过 import 引入后使用

```js index_module.js
export namespace ModuleA {
	export let banner = [...data1];
}

export namespace ModuleB {
	export let banner = [...data2];
}
```

```js 在页面home中引入index_module.js中暴露的命名空间
import { ModuleA, ModuleB } from "./index_module.js";
var b1 = ModuleA.banner;
var b2 = ModuleB.banner;
```

## TypeScript 中的装饰器

### 什么是装饰器

装饰器是 ES7 新增的标准特性，它是一种特殊类型的声明，它可以被附加到类声明，方法，属性或者参数上，可以修改类的行为。
通俗的说装饰器就是一个 JS 中的方法，可以注入到类、方法、属性、参数上，使用装饰器的目的就是拓展类、方法、属性、参数的功能。
对于一个需求，可能基于多个装饰器都可以实现，我们选择一个相对适合自己需求的就可以了，用的最多的是类装饰器。
可以同时存在多个装饰器，比如多个装饰器可以同时修饰一个类，中间直接连接不用任何符合隔开

常见的装饰器：类装饰器、属性装饰器、方法装饰器、参数装饰器
装饰器的写法：普通装饰器（无法传递参数）、装饰器工厂（可传递参数）

### 类的普通装饰器

> 注意点

1. 类装饰器在类声明之前使用，类装饰器应用于类的构造函数，可以用来监视，修改或者替换类定义。
2. 类的普通装饰器无法再在修饰类的时候传递更多的参数，只能接收一个默认的参数 target，target 代表当前这个装饰器要修饰的类本身。
3. 类的装饰器一定写在类声明的前面，用@代表给当前类使用了一个装饰器，中间不用分号不加括号
4. 类的装饰器作用：

- 不改变类本身的前提下
- 为类动态的添加和拓展一些属性和方法

```js
>>> 首先定义一个类装饰器personDec，该装饰器的作用是为要装饰的类在其原型上新增一个属性age以及一个方法run

function personDec(target:any){
	console.log(target) // target代表当前要装饰的类

	// 给类拓展一个公有属性age
	target.prototype.age = '18';
	// 给类拓展一个公有方法run
	target.prototype.run = function(){
		console.log(this.name + '正在running!!!')
	}
}

>>> 在类的声明前基于@语法糖为Person类应用装饰器

@personDec
class Person {
	name:string;
	constructor(uName:string){
		this.name = uName;
	}

	say(){
		console.log(this.name);
	}
}

>>> 将经过装饰后的类实例化，得到的实例是已经拓展了属性和方法的实例，因为默认的Person类中并没有age属性和run方法，所以可以确定类的装饰器已经生效了。

let p = new Person('xiaowang');
console.log(p);
p.say();   // xiaowang
p.run();   // xiaowang正在running!!!

```

### 类的工厂装饰器

- 类的普通装饰器的缺点在于无法再装饰类的时候传递更多的参数
- 通过类的工厂装饰器可以在对类进行装饰的时候，传递更多的参数以便于我们更加方便、更加灵活的去拓展类的方法和属性等功能。
- 一般我们在类的装饰器中 return 一个新的函数来实现传递更多参数，外层函数接收参数，里层函数默认参数为修饰类

```js
function personDec(height: string, car: string) {
  return function (target: any) {
    console.log(height, car); // 传递进来的参数
    console.log(target); // 要修饰的类本身

    // 基于传递的height参数为修饰的类增加一个height身高属性
    target.prototype.height = height;

    // 基于传递的car参数为修饰的类增加一个drive方法，该方法的功能是打印开什么类型的车
    target.prototype.drive = function (): void {
      console.log(this.name + "开的是" + car + "!!!");
    };
  };
}

@personDec("1.98m", "benz")
class Person {
  name: string;
  constructor(uName: string) {
    this.name = uName;
  }

  say() {
    console.log(this.name);
  }
}

let p = new Person("xiaowang");
console.log(p);
p.say(); // xiaowang
p.drive(); // xiaowang开的是benz!!!
```

### 基于类的装饰器重载类的方法或者构造函数

当我们在某个场景下既想要不重新定义一个新的类，但是又想把类的构造函数或者类上面的方法按照当前的需求重新定义下，此时就需要用类的装饰器来重载类的方法和构造函数。

> 通过 return class extends target 这种固定语句来实现装饰器重载类的构造函数和方法

```js
> 定义类的工厂装饰器
function personDec(firstName:string){
	return function(target:any){
		return class extends target{
			name:string = firstName; // 重载类的构造函数中对于name属性的构造
			say(){
				console.log(this.name + 99999); // 重载类中say方法的实现
			}

		}
	}
}

> 此处类的装饰器是工厂模式的，可以进行传递参数
@personDec('hahha')
class Person {
	name:string;

	constructor(uName:string){
		this.name = uName;
	}

	say(){
		console.log(this.name);
	}
}

let p = new Person('xiaowang');
console.log(p);
p.say();
```

### 类的属性装饰器

作用：将要修饰类上的属性的值在不改变 Person 类的前提下进行修改
写法：和类装饰器一样，先定义属性装饰器，然后通过@语法糖修饰类的属性
注意：和类装饰器不同的是，属性装饰器在运行的时候会被当做函数调用，传入两个参数

- 第一个参数 target
  如果要装饰的属性是类的静态属性，那么 target 代表类本身 Person
  如果要装饰的属性是类的实例属性，那么 target 代表类的原型对象 Person.prototype
- 第二个参数 attr 指的是当前要修饰的属性名称，是字符串格式，所以需要用[]法进行访问

如下所示：通过属性装饰器 propertyDec，每次在 new 一个类生成实例的过程中，都会将类的属性 desc 的值从一个值装饰为另外一个值。

```js
function propertyDec(params:any){
	return function(target:any,attr:string){
		// attr是要修饰的属性
		// target是要修饰的类的原型对象Person.prototype
		console.log(target,'----',attr)
		target[attr] = params;
	}
}


class Person {
	@propertyDec('这是Person类的原型上的经过装饰的属性desc')
	public desc:string='这是Person类的原型上的属性desc';
	constructor(){
	}
	getHeight(){
		console.log(this.desc)
	}
}

let p = new Person();
p.getHeight();


```

### 类的方法装饰器

作用：可以在不修改类的前提下修改类的方法的逻辑
拓展当前类的属性和方法，和类的装饰器功能类似
  
写法：和类装饰器一样，先定义方法装饰器，然后通过@语法糖修饰类的属性

注意：和类装饰器不同的是，属性装饰器在运行的时候会被当做函数调用，传入三个参数

- 第一个参数 target
  如果要装饰的属性是类的静态属性，那么 target 代表类本身 Person
  如果要装饰的属性是类的实例属性，那么 target 代表类的原型对象 Person.prototype
- 第二个参数 methodName
  指的是当前要修饰的类的方法名称，是字符串格式，所以需要用[]法进行访问

- 第三个参数 desc
  由于第三个参数 desc 中的 value 属性保存了当前修饰的方法的引用地址，可以基于这个特性修改原有类里面方法的执行逻辑

#### 举例：通过方法装饰器拓展当前类的属性和方法【和类的装饰器功能类似】

通过方法修饰符 methodsDec 为 Person 类拓展了公有属性 name 和 age

```js
function methodsDec(params: any) {
  return function (target: any, methodName: string, desc: any) {
    console.log(target); //Person类的原型对象
    console.log(methodName); // 要修饰的属性名getData
    console.log(desc); // getData的属性修饰符对象 {writable: true, enumerable: true, configurable: true, value: ƒ}

    target.name = params.name; //为类拓展公有属性name
    target.age = params.age; //为类拓展公有属性age
  };
}

let params = {
  name: "li",
  age: 18,
};

class Person {
  constructor() {}

  @methodsDec({ name: "li", age: 18 })
  sayInfo() {
    console.log(this.name + this.age);
  }
}

let p = new Person();
console.dir(Person); // 经过方法修饰符对于类的拓展，现在的类Person不仅有原来的sayInfo方法，还通过修饰符methodsDec给类拓展了name，age等公有属性
```

#### 举例：通过方法装饰器修改类的方法的逻辑

本质上是基于方法装饰器返回的返回的第三个参数 desc 属性描述符里面的 value 属性保存着当前要修饰方法的引用地址，我们直接将其进行替换即可。

基于方法装饰器修改类原有的方法，比如这里我们将类的 getData 方法从原来的打印一句 console.log('执行了未修饰前的 getData 方法')经过修饰之后，变为将所有调用 getData 方法时将参数转化为字符串之后打印，从根本上修饰了方法的逻辑。

```js
function methodsDec(params: any) {
  return function (target: any, attr: string, desc: any) {
    // 保留原来方法引用地址为0x0001，如果不需要执行原来的getData方法可以选择不保留这个引用地址，直接进行修改即可
    let _method = desc.value;

    // 下面直接修改了类的getData方法的引用地址
    // 从原来的0X0001现在指向0X0002
    // 实例p.getData()执行等于执行堆内存中0X0002的代码，如果有必要还可以将原来0X0001也进行执行
    desc.value = function (...args: any[]) {
      let formatArgs = args.map((value) => {
        return String(value);
      });
      console.log(formatArgs); // 打印字符串参数
      _method.apply(this, args); // 将修改前的getData方法执行一遍
    };
  };
}

class Person {
  constructor() {}

  @methodsDec(params)
  getData() {
    console.log("执行了未修饰前的getData方法");
  }
}

let p = new Person();
console.log(p, 999999); // 这里已经对方法进行了替换
p.getData("li", {}, 456); // 输出["li", "[object Object]", "456"]
```

### 装饰器执行的顺序

1. 总是先执行类里面的装饰器，然后再执行最外面的类装饰器
   这个就和先自上而下执行构造函数内部的代码，然后执行函数外部的代码一样
   在执行类里面的装饰器的时候，总是会按照 JS 的执行顺序，那个装饰器定义在前就先执行那个

2. 如果有多个装饰器装饰一个东西，那么顺序是从后往前依次执行装饰器
