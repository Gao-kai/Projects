## babel.js编译

babel就是js的编译器

babel主要的功能就是将ES6+代码编译成为低版本浏览器都可以识别的js代码

`Babel` 的功能很纯粹。我们传递一段源代码给 `Babel`，然后它返回一串新的代码给我们。就是这么简单，它不会运行我们的代码，也不会去打包我们的代码。

它只是一个编译器。

方法1 在客户端在线的编译代码

此方法需要引入babel.js文件 一般这个文件名是brower.min.js

这种方法不太好  会在运行代码的时候有延迟，而且brower.min.js这个文件自身就不支持低版本浏览器。所以实际开发中不会用。

在引入brower.min.js之后，还需要将script标签内的属性type修改为text/babel，这样才可以在低版本浏览器中执行ES6+的代码。浏览器默认script的type是text/javascript，所以需要专门声明这个script的属性type是babel，这时候浏览器才会去找引入的brower.min.js文件，让这个文件去编译type为babel的script中的代码。

方法2 编译JS文件

1.node

npm是node.js的包管理器，可以帮我们下载包 运行包 管理包等一系列功能