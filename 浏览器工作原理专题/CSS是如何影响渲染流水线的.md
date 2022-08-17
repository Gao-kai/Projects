> 渲染进程接收到HTML文件之后，浏览器会开启一个预解析的线程，专门用于提前加载当前HTML文档中用到的js和css等重要文件，然后进行HTML解析，构建DOM树，在DOM树构建好之后页面还是不能进行渲染，因为还必须要等待CSS文件解析为CSSOM之后，才可以基于DOM和CSSDOM来构建布局树，然后才是后续的分层、合成和展示。所以总的来说，CSS文件也是需要下载的，而且CSS也是需要解析为浏览器可以理解的数据结构CSSOM的，因此CSS也会影响整个渲染进度的。

##
```html
<meta charset="utf-8"></meta>
<meta>


```



HTML文档中常见的meta标签有哪些
async和defer还是没吃透
DOMContentLoaded的加载时机：等待js？还是等待DOM?
