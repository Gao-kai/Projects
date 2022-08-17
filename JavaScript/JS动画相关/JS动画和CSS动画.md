## 处理动画的技术优先级
CSS动画
requestAnimationFrame
第三方动画库
JS动画

## CSS3中的动画和变形
### 1. transfrom中的2D变形属性
原理：通过改变元素的css样式来完成元素的变形，它并不是动画
优点：
1. transform在使用的时候开启了硬件加速，比传统的样式改变在性能上更加优化和流程。
2. transform变形不会影响周边其他盒子的位置，也就是不会引起其他盒子的回流和重绘，可以看做transfrom的元素相当于会脱离文档流，和开启绝对定位以及浮动元素差不多，但是不是真正的脱离文档流。
3. transform变形也为我们提供了性能优化的一个思路，那就是先将需要改变某个盒子的位置布局，为了避免造成回流，可以先将该盒子开启绝对定位脱离文档流，然后将样式应用上再恢复正常文档流。

transfrom变形的属性值有以下几类：
+ translate(X,Y) 位移 不影响周边盒子的位置
+ scale(N) 缩放 不影响盒子其他位置
+ rotate(N deg) 旋转N度 deg为正顺时针 为负逆时针
+ skew(N deg) 倾斜N度 变为一个平行四边形
+ matrix 矩阵变形

>>> 小技巧：将一个网站的所有元素颜色都设置为黑白色
document.body.style.filter = 'grayscale(1)'



### 2. transition的过渡动画[从A到B的一种过渡]
1. 原理
给元素设置一个过渡效果，当元素的样式在某种场景下发生改变的时候，不是立即改变，而是按照指定的效果慢慢的去改变，从而实现动画效果。

2. transition属性可选值

+ transition-property：设置过渡的样式属性，也就是哪些样式改变的时候要为其执行过渡效果，默认是all也就是所有样式改变都要执行过渡效果

+ transition-duration：设置过渡的时间 单位可以是毫秒和秒 ms/s 必须值

+ transition-timing-function：设置过渡的运行方式
默认值为ease 慢速开始，然后变快，最后变慢
ease-in 加速运动
ease-out 减速运动
ease-in-out 先加速后减速，和ease类似但是幅度比ease大
linear 匀速运动
cubic-bezier 贝塞尔曲线

+ transition-delay：设置延迟的时间，默认为0s不延迟。

3. transition的复合写法
transition：all 1s linear 0s；
各个子属性用空格隔开，不用逗号。因为空格代表是同一个大属性的子属性，逗号代表的是不同的属性。
只有过渡时间是必选属性，而且过渡时间和延迟时间只有一个时间值的时候默认为过渡时间
那个盒子需要过渡，就将过渡属性transition设置给那个盒子





### 3. animation的帧动画[从A到B到C到D的一种轨迹动画]

第一步：制作运动的轨迹(每一帧元素的样式)

```css
@keyframes 动画名字{
	0%或者from{
		这里面是第一帧的样式
	}
	
	50%{
		这里面是中间某帧的样式
	}
	
	100或者to{
		这里面是最后一帧的样式
	}
}

```
第二步：按照轨迹播放动画,控制动画的播放时间延迟重复等 animation

1. animation-name：动画名称
2. animation-duration：动画运行时间
3. animation-timing-function：规定动画的运动曲线
其他值同上
ease 先加速后减速
ease-in out 加速减速
ease-in-out 比ease幅度更大的一种加速和减速
linear 匀速
step(N) 规定动画步长为N，分N步来完成动画

4. animation-delay：规定动画延时多少秒后开始

5. animation-iteration-count：规定动画运行次数
1：默认值
infinty：无限循环

6. animation-direction：设置动画播放结束后反向播放
normal：默认值
alternate：代表动画结束后需要反向播放

7. animation-fill-mode：设置动画播放结束后是否回到起始状态
backwards：默认值 动画结束后回到起始状态
forwards：动画结束后停留在结束状态

8. animation-play-state：设置动画状态为运行或者暂停
running：默认值，运行
paused：暂停动画运行











## JS定时器实现动画
限定步长
限定时间
简单封装动画库

## js动画库[Animate.css](https://animate.style/)
stop/finish
fadeIn/fadeOut/fadeToggle
show/hide/toggle
slideDown/slideUp/slideToggle
animate

## HTML5新增api：requestAnimationFrame
