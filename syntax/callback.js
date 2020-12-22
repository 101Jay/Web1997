/*  
1. javascript 에서는 함수도 값이다.
2. 값으로 만들어 놓은 함수를 다른 함수의 파라미터로 받아서 콜백으로 사용할 수 있다.
function a(){
	console.log('A');
}
*/

var a = function(){
	console.log('A');
}

function slowfunc(callback){
	/* a long long code which needs lot of time */
	callback();
}

slowfunc(a);