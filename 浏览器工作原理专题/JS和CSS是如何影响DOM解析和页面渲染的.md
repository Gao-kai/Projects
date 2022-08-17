在寻找答案之前，先思考下面这些问题和其背后的原因：
+ 问题1：内嵌的JS脚本和外部JS文件会阻塞DOM解析和页面渲染么？
+ 问题2：为什么我们一般情况下要将页面的script标签放置在body元素的最底端？
+ 问题3：script标签的async和defer都是做什么用的?
+ 问题4：内嵌的CSS样式和外部CSS文件会阻塞DOM解析和页面渲染么？
+ 问题5：为什么我们一般情况下要将CSS文件放在head元素下？
+ 问题6：DOMContentLoaded事件的执行时机到底是怎样的？
带着问题找答案会学习和记忆的更加深刻，因为这中间有一个思考的过程。

> 一个页面加载缓慢的原因可能有很多，在分析页面性能的过程中，总归是离不开两个阶段，那就是从输入URL到网络进程接收到服务器返回的数据这个导航阶段；还有一个就是渲染进程接收到网络进程提交的资源之后的渲染阶段。前者更加注重对于网络和HTTP这块的优化；后者则更多的注重渲染流水线上一些过程的优化，而渲染流水线上多数的步骤都直接或者间接的依赖于一开始生成的DOM树，所以搞清楚DOM是什么？DOM树是如何形成的？以及哪些操作会影响DOM树的构建这三个问题，对于深刻理解渲染这一阶段的性能十分重要。

## 一、DOM到底是什么呢？
当浏览器在网络进程中接收到服务器返回的数据之后，会和渲染进程建立通信管道，持续不断的把数据传输过去直到传输完整为止。以HTML文件为例，浏览器的渲染引擎也就是Chrome的blink排版引擎并不能直接识别HTML中的字节流，所以需要先把HTML中的文本转化为渲染引擎自己可以理解的数据结构，而这个结构我们就叫做DOM，DOM就是对HTML文档结构的一种抽象和表示，在渲染引擎中，DOM有以下三层含义：

1. 从页面的角度来看，DOM是渲染引擎用于渲染页面所需要的基础数据结构。

2. 从js脚本的角度来看，DOM(文档对象模型)提供了一系列供JavaScript脚本操作DOM结构的API接口，基于这些接口我们可以用js对文档结构和样式自己内容进行修改。

3. 从安全的角度来看，DOM是一道安全防线，一些不安全的内容在DOM解析阶段就被阻止，从而避免其渲染到最终页面上。

## 二、DOM树是如何生成的？

在回答这个问题之前，需要先了解一下渲染进程中的一个模块，那就是HTMLParser(HTML解析器)是如何工作的，HTMLParser的主要职责就是将HTML字节流转化为DOM结构，在详细了解其转化过程之前，需要先了解一个HTMLParser工作的前提：

> 渲染进程中的HTML解析器并不是等网络进程中的HTML文档完全接收加载完成之后再开始解析，而是网络进程中接收到了多少HTML文档的数据，HTMLParser就解析多少数据，是一边接收一边解析的。

### 1.网络进程将数据传输给渲染进程的HTMLParser过程

1. 网络进程中接收到服务端返回的响应头之后，会读取响应头中的"Content-Type"字段，并根据该字段的值来判断本次请求服务器返回的是什么类型的数据，以HTML文档为例那么返回的应该是'text/html'。

2. 如果是HTML文档，那么浏览器会创建一个渲染进程用于渲染页面。

3. 等待渲染进程创建好之后，网络进程和渲染进程之间会建立一个共享数据的管道，也就是跨进程通信。具体一点的说就是一个管道，网络进程这边接收到多少数据就源源不断的把数据传输到渲染进程，渲染进程接收到数据之后就将其转发给HTMLParser。

4. HTMLParser接收到HTML字节流数据之后，就开始将HTML转化为DOM结构。


### 2.HTMLParser是如何将字节流转化为DOM的

> 第一阶段：通过分词器将字节流转化为Token

Chrome中的V8引擎在编译JavaScript代码的时候，第一步是先做词法分析，将JavaScript先分解为一个个的Token。而HTMLParser在解析HTML的时候，第一步也是将HTML字节流通过分词器转化为一个个的Token，Token分为标签Token(Tag Token)和文本Token,Tag分为StartTag和EndTag也就是开始标签和结束标签。

```HTML
<html>
	<body>
		<div>Hello</div>
		<p>World</p>
	</body>
</html>
```

*HTMLParser将上述HTML代码转化为如下一个个小的Token*

```css
StartTag html
StartTag body
StartTag div
Hello
EndTag div
StartTag p
World
EndTag p
EndTag body
EndTag html
```

> 第二阶段：将分解后的Token解析为DOM节点，并将DOM节点挂载到DOM树上

HTMLParser解析器会维护一个Token栈结构，这个栈的主要功能就是用来计算节点之间的父子关系，在上一个阶段中生成的Token会被按照顺序依次压入到这个Token中，然后HTMLParser对其进行处理，处理的规则如下：

1. HTMLParser在开始解析HTML之前，会默认创建一个根为document的空DOM结构，并将StartTag document的Token首先压入栈底。

2. 如果分词器解析出来的Token是StartTag Token,HTMLParser会将该Token压入到栈中，然后为该Token创建一个同名的DOM节点，并将该节点挂载到DOM树上，在挂载的时候查找父节点的方法就是当前栈中相邻的Token生成的节点就是父节点。

3. 如果分词器解析出来的Token是文本Token，那么HTMLParser会生成一个文本节点但是不会将Token压入到栈中，那么文本节点的父节点怎么找呢？方法是直接看当前Token栈中最顶部的那个Token所对应的DOM节点。

4. 如果分词器解析出来的Token是EndTag Token,HTMLParser会查看当前Token栈顶的Token是否为和其匹配的StartTag，如果是就将当前栈顶的这个StartTag从栈中弹出，这也就意味着一个元素解析完成了。

> 通过分词器产生的Token就这样不停的进栈和出栈，整个解析过程就这样持续下去，直到分词器将所有HTML文档都分词完成，DOM树也就形成了。


第一个阶段通过分词器依次解析出来的Token按照如下过程形成DOM树：
```html 
Token StartTag html => 压入栈中 => 创建html的DOM节点 => 确定父节点 => 栈中相邻的是Token StartTag document => 将html节点挂载到document节点下

Token StartTag body => 压入栈中 => 创建body的DOM节点 => 确定父节点 => 栈中相邻的是Token StartTag html => 将body节点挂载到html节点下

Token StartTag div => 压入栈中 => 创建div的DOM节点 => 确定父节点 => 栈中相邻的是Token StartTag body => 将div节点挂载到body节点下

Token 文本Hello => 创建Hello的文本节点 => 确定父节点 => 当前栈顶的是Token StartTag div =>
将Hello文本节点挂载到div节点下

Token EndTag div => 查询栈顶元素为Token StartTag div => 匹配成功 => 将Token StartTag div从栈顶弹出 => div元素解析完成

...
```

## 三、JavaScript是如何影响DOM树生成的？
### 情况1：body中内嵌JavaScript 脚本
```html
<html>
<body>
    <div>Hello</div>
    <script>
		let div1 = document.getElementsByTagName('div')[0]
		div1.innerText = '好好学习!'
    </script>
	<p>World</p>
</body>
</html>
```
在script标签之前的解析流程是正常的，但是一旦分词器产生了一个StartTag script也就是解析到一个script标签的时候，渲染引擎判断这是一段js脚本，此时HTML解析器会暂时停止DOM解析,因为js可以修改当前已经生成的DOM结构。此时专门用于解析js代码的V8引擎介入，开始解析执行这段js脚本，等待js脚本执行完成之后，HTML解析器开始继续解析后续的内容，可以看出这段js脚本就将之前形成的DOM树节点进行了修改。

### 情况2：body中引入了外部JavaScript文件
```html
<html>
<body>
    <div>Hello</div>
    <script type="text/javascript" src='index.js'></script>
	<p>World</p>
</body>
</html>
```
HTML解析器在解析到script标签的时候，暂停DOM的解析，然后js解析引擎开始执行js脚本。但是和上面内嵌脚本不一样的是需要被解析执行的js脚本是外部文件，所以需要先下载js代码然后才可以执行。所以相比较上面的情况，这里又多了一个JavaScript脚本的下载过程，而下载又会受到网络环境、当前js文件的大小这些因素的影响，所以js脚本的下载也会影响DOM的解析。

针对于上面这种外部引入js代码的情况，Chrome浏览器对其做了一定的优化，一个主要的优化就是*预解析操作*。什么是预解析操作呢？就是当渲染引擎收到HTML文档之后，首先会开启一个预解析线程来扫描HTML文件中包含的JavaScript、CSS等文件，如果确实有这些文件，那么避免后面DOM解析的时候下载这些资源消耗过多时间，预解析线程此时就会去下载这些文件。

### 如何优化HTML文档中JavaScript代码阻塞DOM解析?
1. 压缩js代码
2. 使用CDN来加速JavaScript文件的加载
3. 如果当前js代码中没有操作DOM的代码，将该js脚本设置为异步加载，避免阻塞DOM解析。
4. 将js脚本放在页面最底端，等待DOM树构建完成之后再加载js脚本


### 如何设置js脚本的异步加载？
script标签有两个属性，async和defer,通过给script标签来设置这两个属性就可以启用异步加载。

给script标签加async属性的作用：
1. 并行下载脚本，不阻塞DOM的解析和DOM树的构建
2. 等待脚本加载完成之后立即执行
3. 多个加了async的脚本执行顺序是不可确定的
4. 执行时机不可确定，但是一定在load事件派发之前,执行的时候有可能DOM还没有解析完成，所以这时候如果js脚本中包含了操作DOM的代码就会引起DOM结构的变化

```js
<script async type="text/javascript" src='index.js'></script> 
```

给script标签加defer属性的作用：
1. 并行下载脚本，不阻塞HTML的解析和DOM树的构建
2. 脚本加载好之后不会立即执行，而是一定会等待HTML解析完成之后才开始执行
3. 多个加了defer的脚本执行顺序为自上到下依次执行
4. 一定会在文档的DOMContentLoaded事件触发之前执行

```js
<script defer type="text/javascript" src='index.js'></script>
```

## 四、CSS是如何间接影响DOM树生成的？

### 1. 什么是CSSOM(CSS树)？
和HTML文档一样，浏览器的渲染引擎也是无法直接理解CSS文件内容的，所以需要先将CSS文本转化成为渲染引擎可以理解的数据结构，这个数据结构就被称之为CSSOM。CSSOM具有下面两个含义：

1. 从渲染页面的视角来看，CSSOM为页面的渲染提供了基础的样式信息。
2. 从js脚本的视角来看，CSSOM为JavaScript操作DOM节点的样式提供了能力。

CSSOM具体的体现在DOM中就是document.styleSheets,它的数据结构是一个数组列表，列表中的每一项都是一个个的对象，指定了一系列CSS样式渲染的规则和信息。

### 2. 渲染流水线中涉及到CSS的部分
+ 构建DOM树
渲染引擎将HTML解析为DOM树
+ 构建CSSOM树
渲染引擎将CSS解析为CSSOM树
+ 样式计算
渲染引擎为每一个DOM节点计算其对应的样式信息，并将计算结果保存在元素的computedStyle中，可基于方法window.getComputedStyle(ele,null)查询任意一个DOM节点结果最终计算后的样式信息
+ 计算布局
渲染引擎计算布局树中每一个元素所对应的几何位置
+ 合成布局树
基于DOM树和CSSDOM树合成布局树:布局树基本上就是DOM树的复制，但是会过滤掉display为none的元素和head标签下的所有元素,样式计算和计算布局完成之后就代表着布局树的构建完成。

### 3.CSS文件是如何间接影响DOM解析的
```html
<html>
    <head>
        <style src='index.css'></style>
    </head>
<body>
    <div>1</div>
    <script>
            let div1 = document.getElementsByTagName('div')[0]
            div1.innerText = 'time.geekbang' //需要DOM
            div1.style.color = 'red'  //需要CSSOM
        </script>
    <div>test</div>
</body>
</html>

```
上面这段代码的执行逻辑是：

+ HTML解析遇到script内嵌脚本，暂停DOM解析
+ 在执行js代码之前先等待index.css中文件解析为CSSOM
+ js解析引擎开始解析执行js脚本内代码
+ 解析到div1.style.color = 'red'代表要操作CSSOM对象,基于DOM接口操作节点样式的前提是有CSSOM
+ js代码执行完毕
+ 继续进行HTML的解析，构建DOM树

##### 不管是内联的CSS文件还是外部引入的CSS层叠样式表，有一个前提就是如果解析HTML文档的时候页面中有script脚本，那么在script脚本的执行需要等待当前文档中的CSS文本被渲染引擎解析成为CSSOM这种结构之后，V8引擎中的JS代码才可以开始执行，因为V8引擎在执行js代码之前，是并不知道js代码要操作css样式的。执行完成之后才可以继续进行后续的DOM解析，总的来说就是script脚本的加载和执行会阻塞DOM解析，而CSS文件又会阻塞JS脚本的执行，所以CSS文件也是会间接的影响DOM的解析，从而影响布局树的合成，最终影响渲染流水线。

##### 如果在预解析的过程中，HTML预解析器发现有CSS外部文件和JS外部文件需要加载，那么此时会同时发起请求CSS文件和JS文件的请求，所以下载时间要按照下载最久的那个算。

## 五、优化思路
渲染流水线影响到了首屏展示的速度，这会直接影响一个web应用的用户体验的。通过前面的分析，可以知道影响渲染流水线的最大因素在于CSS文件的下载速度、JS文件的下载速度和JS文件的执行。

1. 内联CSS和内联JS，移除下载这两个文件的时间
2. 如果不内联，那么就尽量减小文件的大小，比如webpack在打包的时候压缩文件
3. 给js代码加上async和defer属性，不要让js的执行阻塞DOM解析
4. 基于媒体查询，识别当前页面呈现的场景，在不同的场景下加载不同的CSS文件

## 回答开始提出的问题
+ 问题1：内嵌的JS脚本和外部JS文件会阻塞DOM解析和页面渲染么？
会的。因为只要是HTML解析遇到script标签的时候会停止解析，等到js脚本执行完毕之后继续解析，如果是外部的js文件还需要等待下载好之后才可以执行js代码。

+ 问题2：为什么我们一般情况下要将页面的script标签放置在body元素的最底端？
原因主要有两个：第一个是为了避免放在顶部或者中间阻塞DOM的解析，影响构建DOM树的时间；第二个主要是为了避免js脚本中有操作DOM的代码，在DOM树生成一半的时候操作了DOM，将之前已经构建好的DOM树修改导致DOM树的重新生成，引起回流和重绘。

+ 问题3：script标签的async和defer都是做什么用的?
都是为了避免阻塞DOM解析，来异步下载JS文件的。不同之处在于async会在js脚本加载完成之后立即执行；而defer会等待DOM树构建完成之后，也就是DOMContentLoaded事件触发之前才开始执行。

+ 问题4：内嵌的CSS样式和外部CSS文件会阻塞DOM解析和页面渲染么？
会的。只不过是间接的影响，因为一旦页面中既包含了JS文件和CSS文件，那么浏览器一定会等到CSS文件加载成为CSSOM之后，才开始执行JS脚本，而JS脚本又会阻塞DOM的解析，如果JS代码在文档底部，那么CSS不会阻塞DOM的解析，但是会阻塞页面的渲染。

+ 问题5：为什么我们一般情况下要将CSS文件放在head元素下？
如果CSS文件放在页面body的中间或者底部，前面的DOM节点样式已经生成了，此时解析到CSS文件会构建CSSOM树，此时会重新进行DOM节点的样式计算，引起渲染流水线的重绘操作。
如果放在Head标签下的时候，浏览器在开始解析body前总是会先解析CSS并生成CSSDOM，后续只有JS可以修改样式，避免了二次计算样式的问题。

+ 问题6：DOMContentLoaded事件的执行时机到底是怎样的？
DOM树构建完成之后，此事件会触发。