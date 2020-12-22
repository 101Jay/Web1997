var testFolder = './Data';
var fs = require('fs');

fs.readdir(testFolder, function(error, filelist){
	var i = 0;
	while(i<filelist.length){
		var path = './file.txt'

	try {
	  if (fs.existsSync(path)) {
		//file exists
	  }
	} catch(err) {
	  console.error(err)
	};	
	}
});

//이것을 이용해서 더 파일이 자동으로 추가되고 제거되는 동적인 App을 만들어보자. readdir은 array형식으로 내보내준다

var file = 'test.txt'; 
fs.open(file,'w',function(err,fd){ 
	if (err) throw err; 
	console.log('file open complete'); });

var data = `

`; 
fs.writeFile('text1.txt', data, 'utf8', function(error){
	console.log('write end') });




var i = 0;
while(i<filelist.length){
	var name = filelist[i];
	fs.appendFile('here?여기에다 적는 법.txt', 'data to append', function (err) 
				  { if (err) throw err;})
}