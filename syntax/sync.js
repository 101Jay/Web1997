var fs = require('fs');

console.log('A');
var text = fs.readFileSync('./syntax/sample.txt', 'utf8');
console.log(text);
console.log('C');  //Sync: 동기적 -> 이 일이 다 끝나야 다음일로 넘어간다 코드적으로 비효율적


console.log('A');
fs.readFile('./syntax/sample.txt', 'utf8', function(err, result){
	console.log(result);
});
console.log('C'); //ASync: 비동기적 -> 일을 시켜놓고 밑에거 먼저 일한 다음에, 이 일이 끝나면 그 때 확인 -> 코드적으로 매우 효율적 : node js에서 권장하고 있잖아