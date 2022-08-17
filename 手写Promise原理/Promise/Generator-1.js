/* 
	async + await
 */
const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

async function read() {
	let AFileContent = await readFile('../a.txt', 'utf-8');
	let BFileContent = await readFile(AFileContent, 'utf-8');
	return BFileContent;
}
console.log("read: ", read());

read().then(data => {
	console.log("data: ", data); // data:bbbb
}).catch(err => {
	console.log("err: ", err);
})

async function demo() {
	let res = await new Promise((resolve, reject) => {
		setTimeout(() => {
			// console.log(1111111111);
			resolve(1111111)
		}, 1000)
	})
	// return res;
}

demo().then(res => {
	console.log("res: ", res); // undefined
})


const p = new Promise((resolve, reject) => {
	console.log(11111);
	resolve();
	console.log(22222);
})

p.then(() => console.log(3333), () => console.log(4444))

Promise.resolve(1)
.then(x => x+1)
.then(x => {throw new Error('Eror 0000')})
.catch(() => 1)
.then(x => x+1)
.then(x => console.log(x))
.catch(console.error)
