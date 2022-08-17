## generator生成器函数

generator——生成器的意思

是一种相对特殊的函数  踹一脚走一步

普通函数：只要开始执行就会跑完整个函数中的代码，直到函数执行结束，中间不停止

generator函数：中间可以暂停的函数

和普通函数的区别：函数名和function之间有一个*号，可以和函数名连接 可以和function连接 

yield：放弃的意思  暂时放弃执行 过一会儿在去执行  yield放在那 就走到那

generator函数和普通函数最大区别是：generator函数不会先执行函数体中的代码，而是先创造一个generator对象出来，也就是说执行generator函数会得到一个对象。这个对象中有一个next方法。generator对象调用这个next方法一次，函数体执行一次，执行到yield存在的位置，再调用一个next方法，函数体再执行一次。

generator函数的用处

再请求数据的时候，请求数据是个异步任务，所以可以利用generator函数在请求数据的时候让函数暂停执行，等到数据返回之后，再让这个函数执行

generator函数执行时候的底层逻辑

就是generator函数在执行的时候，生成若干个小函数，第一次next的时候走第一个小函数，第二次next的时候走第二个函数。

## yield

yield可以传参

在generator函数执行的时候会生成一个generator生成器对象，用这个对象调用next方法就可以实现让generator函数走一步停一步的操作。

在generator对象调用next（）方法的时候，可以为这个方法传递参数，而yield就可以接收到这个参数。

第一个next（）是没法给yield传递参数的，要传参就用传统的方法给generator函数按照传统的方法传递参数



又可以返回值































