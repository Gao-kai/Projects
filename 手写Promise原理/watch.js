// 被观察者的类 需要将观察者进行收集
class Subject {
	constructor(name){
		this.name = name;
		this.state = '开心';
		this.observers = [];
	}
	
	attach(observer){
		this.observers.push(observer);
	}
	
	publish(newState){
		this.observers.forEach(ob=>{
			ob.update(this.name,newState);
		})
	}
	
}

// 观察者的类
class Observer {
	constructor(name){
		this.name = name;
	}
	
	update(name,state){
		console.log(this.name,`${name}当前的状态是：${state}`);
	}
}


const baby1 = new Subject('小宝宝1');
const baby2 = new Subject('小宝宝2');

const observer1 = new Observer('爸爸');
const observer2 = new Observer('妈妈');

baby1.attach(observer1);
baby1.attach(observer2);
baby2.attach(observer1);
baby2.attach(observer2);


baby1.publish('很生气哦')
baby2.publish('很开心哦')

/* 
	vue是数据变 dom就要变
	这里的数据就是状态 
	数据发生变化，就要通知观察者，这里的观察者就是视图，那么视图就会变 有多个观察者就是多个视图都会变 Vuex
	
	观察者模式多了一个依赖关系
	
	发布订阅模式是先订阅好 然后主动去发布
	观察者模式是被动的 只要被观察者的转态发生变化 会主动通知所有观察者 告诉观察者我的状态变了
 */