## JS发展史概述
1. 1995年，网景公司(浏览器厂商)的工程师Brendan Eich在为这家公司即将上市的Netscape Navigator2(网景浏览器2)开发了一个叫做LiveScript的脚本语言，一开始他是计算将这个脚本语言在客户端和服务端都使用，在服务端叫做LiveWire。之所要开发这个脚本语言，当时是为了处理网速缓慢，用户在每次提交表单后需要等待很长时间才可以返回结果的问题，如果有一个可以在提交表单之前就验证表单输入框内容的语言，就可以让用户将一个表单只提交一次就可以了，不必为了一个表单提交多次等待超长时间。

2. 为了赶上发布时间，推动项目进度。网景公司和当时的sun公司一起进行开发，而且为了蹭当时Java这门语言的热度，网景公司决定在Netscape Navigator2发布前将预先定好的LiveScript改名为JavaScript，所以在1995年JS就正式诞生了，但是它本质和Java没有半毛钱关系。

3. Netscape Navigator2浏览器推出市场之后广受好评，随后网景公司又推出了Netscape Navigator3版本浏览器并将JS的版本从1.0升级到了1.1，注意在这时还没有IE和后来的ECMA-262什么事，就是网景公司在一个人秀。

4. 但就在Netscape Navigator3发布后不久，IE3横空出世包含了名为JScript的JavaScript实现，就是说IE3这个浏览器也可以做到和网景浏览器一样的可以解决用户提交表单时间过长的这个痛点。紧接着，1996年，微软全面进军Web浏览器领域，你说你一个做操作系统的你跑来做浏览器还做的那么垃圾，再次鞭尸IE！

5. 由于IE进入Web浏览器市场之后，市场中就存在了两个JavaScript的实现了，一个是网景的JavaScript，一个是IE的JScript。由于此时JavaScript还没有一个规范其语法和特性的标准，所以JS就踏上了标准化之路。

6. 时间来到1997年，JavaScript1.1作为提案提交至*欧洲计算机制造商协会(简称ECMA)*，而该协会中的第39号技术委员会(简称TC39)承担着标准化一门通用、跨平台、厂商中立的脚本语言的任务，TC39的成员来自网景、微软、sun等公司的工程师组成，他们这些人在一起就是为了做一件事：打造出了ECMA-262,也就是ECMAScript这个新的脚本语言标准。

7. 1998年，ECMAScript经过国际标准化组织认证，自此以后各浏览器厂商都将ECMAScript当做标准，而各浏览器的JavaScript则是ECMAScript的实现。

8. 各浏览器的JavaScript实现都是以三大模块组成的：ECMAScript、BOM、DOM

## ECMA各版本发展史
1. ECMA-262 3.0的发布，标志着ECMAScript成为了一门真正的编程语言
2. ECMA-262 4.0 由于改动太大 被废弃，所以推出了3.1版本
3. ECMA-262 3.1 由于4.0版本被废弃，所以这个ECMA-262 3.1就成了第五个版本，也就是ES5。这个版本主要是厘清了ES3.0存在的一些歧义，增加了协议和序列化JSON对象的功能，方便继承和高级属性定义的方法，以及严格执行代码的严格模式。
4. ECMA-262第六个版本，简称为ES6，可以叫做ES2015。是2015年6月发布的新版本，这一版本新增的内容很多，主要包括：
类 模块
迭代器
生成器
箭头函数
Promise
反射
代理
新的数据类型
新的变量声明等

5. ECMA-262第7个版本，简称为ES7。主要新增数组的includes方法和指数操作符。
6. ES8新增异步函数async/await以及Atomics API，以及Object.values() entries getOwnPropertyDescriptors和字符串填充方法
7. ES9新增异步迭代，剩余和拓展属性，Promise.finally()等
8. ES10新增数组的flat/flatMap，字符串的trimStart/trimEnd，Object.fromEntries(),明确定义了一个Function.prototype.toString()的返回值等

## DOM各版本发展史

DOM是一个应用程序接口，主要用于在HTML中使用拓展的XML，DOM将页面抽象为一个个的节点，每个节点都保存不同的数据。DOM是一套可以增删改查HTML或者XML页面的API接口。
DOM的标准是由W3C指定的，一开始也是由于网景和IE支持不同形式的DHTML(动态HTML)，首先可以做到不刷新网页的情况下可以修改网页外观和内容，问题是如果不统一的话，开发人员就得针对不同的浏览器写多个HTML页面。
1. DOM0级标准 
其实压根没有这个标准 就是最早的DHTML 可以实现修改网页外观而不刷新网页

2. DOM1级标准 
W3C于1998年制定的标准，由两个模块组成DOM Core以及DOM HTML。DOM核心主要提供了一种映射的XML文档，从而可以方便的去操作页面文档任意部分；DOM  HTML拓展了前者，并增加了特定于HTML页面的对象和方法。DOM1主要还是映射文档结构，便于去修改文档操作文档。

3. DOM2级标准 这一版的标准增加了很多模块
DOM视图：比如新增 应用CSS样式前后的文档的接口
DOM事件：新增描述事件和事件处理的接口
DOM样式：描述处理元素CSS样式的接口
DOM遍历：新增遍历和操作DOM树的接口

4. DOM3级标准 DOM Core支持了所有XML1.0的特性
目前，已经不再以等级来维护DOM了，但是新增的DOM还是称为DOM4.0 新增了Mutation Event中的Mutation Observers，在微任务中看到过此概念。

除了W3C发布的DOM Core和DOM HTML之外，也有其他语言也发布了自己对于DOM的标准。比如可伸缩矢量图（SVG）也是基于XML的，但是该语言也增加了独有的DOM方法和接口

## BOM发展简史
BOM并没有一个标准的，但是自从HTML5出来之后，许多BOM相关的兼容性问题都就解决了。BOM主要包含以下部分：
+ 弹出新窗口的接口
+ 移动缩放和关闭浏览器窗口的接口
+ navigator对象，包含浏览器相关信息
+ location对象，包含url地址相关信息
+ screen对象，包含用户屏幕相关信息
+ performance对象，提供浏览器内存占用、导航行为和时间统计的相关信息
+ 对cookie的支持
+ XMLHttpRequest对象
## script标签常见的8个属性
script标签没有必选属性，所有的8个属性都是可选的。
+ type 表示代码块中脚本语言的内容类型(也可以称作MIME类型)
script标签的type值一般情况下都是text/javascript
如果type值是module，那么代表当前的script中的代码是一个ES6的模块，只有当type值为module的时候才可以在代码中写export和import关键字，否则会报错，因为浏览器并不能正确解析export和import。日常项目中可以用那是因为有webpack这样的工具将ES6编译成了ES5浏览器可识别的代码。

但是如何在HTTP数据传输中服务器返回了一个js文件，那么这个js文件本身的MIME类型也就是content-type属性是application/x-javascript,这一点需要注意。

+ src 表示要执行的外部文件路径 
基于src属性可以实现动态插入js脚本，这也是JSONP可以解决跨域的基础

+ async 表示异步执行脚本 window.onload之前执行此脚本
此属性只可以设置在外部的js脚本上，这是HTML5明确规定的。
设置此属性之后，当浏览器解析到script标签后，代表告诉浏览器，请立即开始下次此脚本，但不要立即执行以免阻塞你构建DOM的流程，如果有多个像我这样带有async属性的script标签，其执行顺序不一定按照先后顺序来执行，但是一定会在window.onload事件触发前全部执行完毕，但是不能确定是否在DOMContentLoaded事件触发之前或者之后执行。


+ defer 表示延迟执行脚本 DOMContentLoaded之前执行此脚本
此属性只可以设置在外部的js脚本上，这是HTML5明确规定的。
设置此属性之后，当浏览器解析到script标签后，代表告诉浏览器，浏览器可以立即开始下载此脚本，但是不要立即执行，需要等到浏览器解析到</html>标签时才开始执行js代码，所以说此脚本会在DOMContentLoaded事件触发之前执行。如果有多个像我这样带有defer属性的script标签，其执行顺序一定会按照标签的先后顺序来执行。



## 内联脚本和外部脚本文件区别

内联脚本 直接在script标签内部写js代码
外部脚本 将写好的.js文件通过src属性引入到当前HTML页面中，外部脚本的可维护性高，并且支持浏览器缓存cache，避免每次请求对页面造成延迟。

1. 内联脚本内部不能再出现'</script>'字符串，因为浏览器会将其当做闭合标签去解析，如果一定要用，那么需要使用转义符'<\/script>'

2. 要插入外部脚本，必须声明src属性，并且该src属性的属性值是一个URL地址，指向包含js代码的文件路径。如果一个script标签已经指定了src外部脚本的路径，那么在该标签内部不应该再写js代码，如果一定要写，那么浏览器也只会下载并执行外部的js文件，内部的代码会被忽略。

3. 不管是内联脚本还是外部脚本，都会阻塞页面的加载。而且如果是外部脚本，浏览器还需要先在网络进程中下载，下载完成之后立即执行js代码，执行完成之后才进行后续的页面渲染，所以script脚本会阻塞页面加载。

4. script标签的src属性的值可以是一个完整的url地址，而且这个URL指向的资源可以跟当前包含此标签的HTML页面不同源，也就是可以跳出浏览器的同源策略去访问其他站点的资源，基于这个特性可以处理类似于JSONP跨域的问题。

5. 浏览器会按照script标签在页面中出现的顺序依次执行他们，并且只有在上一个script标签包含的js代码执行完毕之后才会下载执行下一个script中的代码，依次类推。除非是给每个script标签添加了async属性




## DOCTYPE文档模式详解(这不是ES的严格模式)
1. HTML文档中第一行声明的<!DOCTYPE html>有什么作用？
在文档开头显式声明<!DOCTYPE html>，首先要知道这不是一个标签，而是一个语法格式。
DOCTYPE用于定义浏览器应该使用什么样的文本类型定义(DTD)载入页面，通俗的来讲就是浏览器该使用哪种HTML规范或者XML规范来解析文档。

2. 什么是文档模式？都有哪几种？
IE5.5引入了文档模式的概念，主要有两种常见的文档模式：一种是混杂模式，一种是标准模式。这两种模式的切换就通过前面说到的<!DOCTYPE>来切换，在文档的顶部声明不同的文档模式，那么浏览器将会按照不同的规范去解析页面

+ 混杂模式 也叫做兼容模式
混杂模式指的是浏览器按照自己的方式来解析代码，是一种宽松的向后兼容的方式去解析，在这种模式下IE低版本浏览器也可以解析渲染页面。

主要有以下几种方式来声明混杂模式：
01. 文档顶部不写<!DOCTYPE html>
02. <!DOCTYPE html>前面加上xml声明 <?xml version="1.0" encoding="utf-8"?> (IE6)
03. <!DOCTYPE html>前面有（标签、文本、注释）(ie8以下都有，ie9以上未测)

+ 标准模式 也叫作严格模式
标准模式是一种要求浏览器严格的按照web标准去解析、排版和执行js的模式。
在文档顶部声明<!DOCTYPE html>，要求浏览器以HTML5的web规范去解析页面。


3. 两种模式都有哪些区别
一般情况下两种模式的区别都集中在css解析方面，也有js解析的不同。
+ css盒模型
混杂模式的盒模型遵循border-box的盒模型，也就是元素的width值就是页面中元素内容宽度+边框宽度*2+内边距宽度*2;
标准模式的盒模型遵循content-box的盒模型，元素的witdh值只代表自身的元素内容宽度，不包含元素的边框和内边距的值。

+ margin:0 auto
标准模式下会让一个有宽度的盒子水平居中，在IE混杂模式下会失效。

+ 图片底部的空白像素
当一个div盒子中有一张image图片的时候：在混杂模式下该图片和div盒子的底边框是对齐的；而在标准模式下该图片和div盒子的底部有3px的空白间距，之所以出现这种情况的原理是在标准模式下图片作为inline-block元素，其内部排版的vertical-align的值是baseline也就是和基线对齐，我们只需要给这个图片给一个除了baseline之外的值就可以解决这个问题，比如middle、bottom都可以。

+ 设置行内元素(dispaly：inline)宽高
标准模式下，给一个span行内元素直接设置宽度和高度会失效；
在混杂模式下可以直接给行内元素设置宽度和高度

+ 给盒子设置百分比宽度的时候
IE的混杂模式下，如果父元素是BFC元素也就是开启了浮动、定位或者inline-block元素，那么给子元素设置一个百分比宽度100%的时候，此时子元素的宽度会按照父元素的宽度来计算，如果父元素也没有设置那么就向上查找一直找到body元素

标准模式下，上述这种情况，子元素的宽度只和自身所包裹的内容的宽度有关，不会讲开启了BFC父元素的宽度当做计算对象。

4. 如何判断两种模式(基于document.compatMode 文档兼容模式)
```js
(function checkDoctype(){
	let docType = '';
	if(document.compatMode==='CSS1Compat'){
		docType = '标准模式';
	}else if(document.compatMode==='BackCompat'){
		docType = '混杂模式';
	}
	return docType;
})();

```


## script标签的位置及放在顶部不阻塞页面加载解决方案
为了不影响浏览器在解析渲染HTML文件的时候，script标签阻塞页面的加载。
推荐一律将script标签也在body标签的最后一行，这样可以保证所有DOM都加载完成之后才开始下载解析js代码，不会造成页面的阻塞。
如果一定要写在head标签中，也就是同一将外部的js文件和link引入的外部scc样式表集中写在一起，那么通常有以下几个解决方案：

+ 1. 监听window.onload事件(DOM0级事件)
在script标签的第一行使用window.onload事件，当页面中的所有资源都加载完成之后，才会开始执行事件回调函数的js代码。此事件所有浏览器都支持。
```
window.onload = function(){
	// 此时全部资源包含图片、css文件等都加载完成
}

```

+ 2. 监听DOMContentLoaded事件(DOM2级事件，不可通过on绑定)
在script标签的第一行声明DOMContentLoaded事件，DOMContentLoaded 事件在 html文档加载完毕，并且 html 所引用的内联 js、以及外链 js 的同步代码都执行完毕后触发。
此事件IE8以下不支持，但是IE8以下支持onreadystatechange事件，该事件的目的是提供一个与文档的加载状态有关的信息。

```
document.addEventListener('DOMContentLoaded',function(){
	// 此时DOM树已经加载完成
})
		
```

+ 使用JQuery库中的$(document).ready()
当我们引入了JQuery库的时候，可以在script标签中包含的js文件第一行声明：
```js
$(document).ready(function(){
	// 此时DOM树已经加载完成，ready这个事件的本质就是监听DOMContentLoaded事件
	
})
$(document).load(function(){
	// 此时全部资源都已经加载完成，load这个事件的本质就是监听window.onload事件
})
```

## 手写JQuery的ready方法(DOM加载完成事件)
基于addEventListener的DOMContentLoaded事件触发
在IE下基于document.onreadystate属性为complete来判断DOM加载完成
```js
JQuery的$(document).ready(function(){})事件内部逻辑

@params fn 页面加载完成之后调用的启动函数
@retrun 无 只调用函数，无输出

function ready(fn){
	if(document.addEventListener){
		document.addEventListener('DOMContentLoaded',function(){
			// 当DOM加载完成之后，先移除此事件，并且接着执行传入的函数
			document.removeEventListener('DOMContentLoaded',arguments.callee,false);
			fn();
		},false)
		return;
	}
	// 如果在IE浏览器中
	if(document.attachEvent){
		document.attachEvent('onreadystatechange',function(){
			// 当readystate的值为complete的时候，代表DOM加载完成，此时移除事件且执行函数
			if(document.readystate=='complete'){
				document.detachEvent('DOMContentLoaded',arguments.callee);
				fn();
			}
		})
		return;
	}
}

ready(init);

function init(){
	getIndexData(); // 获取首页数据
	handleData();   // 操作数据，渲染DOM等 
	...
}
```

## 为什么要将css放在顶部，将js脚本放在底部？
一切都是为了减少FP(First Paint)的时间，也就是首屏展示的时间。也可以看做性能优化一部分。

因为浏览器它不会等到所有HTML都下载完成之后才去网络进程中拿到资源开始解析，而是加载一部分HTML后就开始拿到渲染进程的主线程上开始渲染，最先开始构建DOM树，当解析到css外部文件的时候，虽然会阻塞当前DOM树的构建，但是由于后续要构建CSS树也就是构建每一个节点对应的ComputedStyle样式，所以css放在顶部可以在DOM树构建完成之后形成CSS树，并且css不会改变DOM。

但是js脚本会操作DOM，在执行js代码的过程中还会造成阻塞，所以一般将其放在底部，等DOM树和节点的样式树都构建完成之后，再去执行js代码，这样就不会影响FP的展示，可以减少FP的时间。

## 原生JS实现JSONP：动态加载js脚本
创建一个script标签
指定其src属性和acync为false，代表同步执行此脚本，也就是必须执行完里面的代码之后再干其他事
插入到head最后面
```js
let script = document.create('script');
script.src = 'xxx.js'; 
script.async = false;  
document.head.appendChild('script');
```

```html
<script>
function jsonpCallBack(res){
	//对返回数据res的操作
}
let script = document.create('script');
// 跨域访问的接口，只支持get请求
script.src = 'https://www.bbb.com/api/user?uid=1088&callback=jsonpCallBack'; 
script.async = false;  
document.head.appendChild('script');
</script>
```
uid参数给后端，这就是我本次get请求的参数
callback参数给后端，意思就是前端这里有一个叫做jsonpCallBack的函数用于接收你返回的数据，所以你只需要在返回体中写入jsonpCallBack()就可以了，并将你要返回的内容以jsonpCallBack函数的形参传递给我

前端在拿到后端的jsonpCallBack({name：'james',age:32})之后，发现这是一个函数调用，那么调用此函数，执行预先写好的jsonpCallBack并用res接收传递过来的返回数据，此时就在跨域的基础上完成了一次访问。

## JQuery中的JSONP函数
假设我要请求一个跨域资源如下，需要在ajax做如下配置：
https://www.bbb.com/api/user?uid=1088&cb=showUserInfo
```js
function showData(res){
	// 对返回数据res的处理...
}
$.ajax({
	url:'https://www.bbb.com/api/user',
	type:'get',
	data:{
		uid:1088
	},
	dataType:'jsonp', // 代表指定服务器返回的数据类型
	jsonp：'cb', // 代表指定jsonp的参数名称
	jsonpCallBack:'showData', // 代表指定的回调函数名称
	success:function(res){ // 接口调用成功后执行的回调函数
		//对返回数据res的操作
	}
})
```

1. JQuery会默认在请求路径后加上callback=xxx,这个xxx是一个随机的值，假设是jQuery202106066688
https://www.bbb.com/api/user?uid=1088&callback=jQuery202106066688
这样子并不好看，因为callback是指定的，后面的jQuery202106066688是随机的

2. 通过加jsonpCallback：'自定义回调函数名称，如showData'
3. 通过加jsonp：'指定参数名称，如cb'
4. jsonp只支持get请求，如post请求也会转化为get请求，这是jsonp的缺点
5. 不管是否自己自定义了回调函数，success函数是一定会调用的。如果没有指定，那么就执行success函数，如果有指定，那么会优先执行自己指定的回调函数如showData然后执行success回调函数。

## 手写一个JSONP的实现[JSON With Padding]
```js
@parmas options 对象
options中的可选参数如下：
url：请求地址，string
params：请求参数，object
jsonp：指定的jsonp参数，string
jsonpCallBack：指定的回调函数名称，string




```