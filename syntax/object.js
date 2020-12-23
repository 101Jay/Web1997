// array, object, function  
// function은 값이 될 수 있다.  -> array와 object의 구성원이 될 수 있다.

var f = function (){
	console.log(1+1);
}

var a =[f];
a[0]();

var o ={
	func:f
}
o.func();

