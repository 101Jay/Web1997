
var o ={
	v1:'v1',
	v2:'v2',
	f1: function(){
	console.log(this.v1);
	},

	f2: function(){
	console.log(this.v2);
	}
}

o.f1();
o.f2(); // 객체를 이용해서 main.js를 수정해보기


var object ={
	A1:'A1',
	A2:'A2',
	F1: function(){
		console.log(this.A1);
	},
	F2: function(){
		console.log(this.A2);
	}
}

object.F1();