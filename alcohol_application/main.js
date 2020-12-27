var http = require('http');
var fs = require('fs');
var url = require('url');
var template = require('./template.js');

var app = http.createServer(function(request, response){
	var _url = request.url;
	var queryData = url.parse(_url,true).query;
	var pathname = url.parse(_url,true).pathname;
	if(pathname==='/'){
		if(queryData.id === undefined){
			fs.readdir('./DataBase', function(error, filelist){
				var title = "With alcohol";
				var description = "Nice to meet you";
				var control = `<a href = "/create">새 문서</a>`;
				
				var list = template.List(filelist);
				var HTML = template.HTML(title,description,list,control);
				
				response.writeHead(200);
				response.end(HTML);
			})
		}else{
			fs.readdir('./DataBase',function(error,filelist){
				fs.readFile(`./DataBase/${queryData.id}`,'utf8',function(error,description){
					var title = queryData.id;
					var control = `	<a href = "/update?id=${queryData.id}">업데이트</a><br><br>
									<form action = "/delete_process" method="post">
										<input type="hidden" name="id" value="${title}">
										<input type="submit" value="문서 삭제">				
									</form>
									`;
					var list = template.List(filelist);
					var HTML = template.HTML(title,description,list,control);
					
					response.writeHead(200);
					response.end(HTML);
				})
			})
		}
	}
	
	
	
})

app.listen(3000);