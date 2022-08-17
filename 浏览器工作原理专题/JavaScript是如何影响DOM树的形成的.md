## 大专题：几种不同情况下资源阻塞问题？
css会阻塞dom解析么？
css会阻塞页面的渲染么？

浏览器的预解析和预加载机制
js内联会阻塞dom解析么
js外联会阻塞dom解析me

css为什么放上面
js为什么放最下面
哪些操作是重排
哪些操作是重绘
哪些操作是合成
如何避免重排和重绘？

珠峰培训姜文的网络优化课程
JS高级程序设计
李兵浏览器专栏









## CSS文件是如何间接影响DOM解析的


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

HTML解析遇到script内嵌脚本，暂停DOM解析
js解析引擎开始解析执行js脚本内代码
解析到div1.style.color = 'red'代表要操作CSSOM对象,基于DOM接口操作节点样式的前提是有CSSOM
等待外部的css文件下载并解析成为CSSOM对象
执行js代码，修改样式

> 但是有个问题就是就是引擎在执行js代码之前，是并不知道js代码要操作css样式的，所以渲染引擎中的HTML解析器一旦解析到script标签之后，不会管该脚本是否操作了css，都会先下载css文件，然后等待css解析成为CSSOM，然后才是开始执行脚本中的js代码，这也就解释了为什么css文件也会间接的影响到DOM树的解析。

JavaScript的内嵌脚本和外部文件是一定会影响DOM解析的，而执行JavaScript脚本的前提是等待页面中的CSS文件加载完毕，所以样式文件会阻塞js代码的执行，从而间接的影响DOM树的构建。

## 下面代码的会在页面展示什么？
```html
<html>
<body>
    <div>1</div>
    <script>
    let div1 = document.getElementsByTagName('div')[0]
    div1.innerText = 'baidu'

    let div2 = document.getElementsByTagName('div')[1]
    div2.innerText = 'Tencent'
    </script>
    <div>test</div>
</body>
</html>
```
页面会展示两行，分别是baidu和Tencent
控制台会报错：Uncaught TypeError:cannot set properties of undefiend
第一个div会被后来的js脚本修改，但是脚本并不能获取到第二个div，所以脚本会报错，但是不会影响脚本之后的HTML解析和DOM树的构建。




