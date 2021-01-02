var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var tp = require('../NodejsPractice/template.js');


var app = http.createServer(function(request, response){
	var _url = request.url;
	var queryData = url.parse(_url,true).query;
	var pathname = url.parse(_url,true).pathname;
	
	if (pathname==='/'){
		if(queryData.id === undefined){
			fs.readdir('./DataBase', function(error, filelist){
				var title = 'Play_List';
				var description = 'Choice Your Playlist';
				var list = tp.List(filelist);
				var control = `<a href = "/create">새 노래</a>`
				var HTML = tp.HTML(title,description,list,control);
				
				response.writeHead(200);
				response.end(HTML);
			})
		}else{
			fs.readdir('./DataBase', function(error,filelist){
				fs.readFile(`DataBase/${queryData.id}`,'utf8',function(error,data){
					var title = queryData.id;
					var list = tp.List(filelist);
					var control = `	<a href = "/update?id=${title}">업데이트</a>
									<form action='/delete_process' method ='post'>
									<input type="hidden" name ="id" value=${queryData.id}>
									<input type="submit" value="삭제하기">
									</form>
									`;  //update시에 ?뒤에 쿼리 스트링 넘겨두는거 유의!
					var HTML = tp.HTML(title,data,list,control);
					
					response.writeHead(200);
					response.end(HTML);
				})
			})	
		}	
	}else if(pathname==='/create'){
		fs.readdir('./DataBase',function(error, filelist){
			var title = 'Play_List';
			var description = 'Play your list';
			var list = tp.List(filelist);
			var createForm = tp.createForm('/create_process');
			var HTML = tp.HTML(title,description,list,createForm);
			
			response.writeHead(200);
			response.end(HTML);
		})
	}else if(pathname==='/create_process'){
		var body='';
		request.on('data',function(data){
			body=body+data;
		})
		request.on('end', function(){
			//var encode = qs.unescape(body);
			var post = qs.parse(body); // 객체형태로 분석해준다 -> title, description으로 나눠서!
			var title = post.title;
			var description = post.description;
			fs.writeFile(`./DataBase/${title}`,description,'utf8',function(error){ //writeFile의 첫번째 인자로 위치까지 정해준다.
				response.writeHead(302, {Location:`/?id=${title}`});  // wrtieHeader의 두번째 인자로 객체를 써서, redirect -> location으로 클라이언트를 보내준다.
				response.end();	
			})
			
		})
	}else if(pathname==='/update'){
		fs.readdir('./DataBase', function(error, filelist){
			fs.readFile(`DataBase/${queryData.id}`,'utf8',function(error, data){
				var title = queryData.id;
				var list = tp.List(filelist);
				var form = tp.updateForm(title,data);
				var HTML = tp.HTML(title,form,list,`<a href = "/create">새 노래</a>`);
				
				response.writeHead(200);
				response.end(HTML);
			})
			
		})
		
	}else if(pathname==='/update_process'){
		var body='';
		request.on('data',function(data){
			body=body+data;
		})
		request.on('end',function(){
			var post = qs.parse(body);
			var title = post.title;
			var description = post.description;
			fs.rename(`DataBase/${post.id}`,`DataBase/${title}`,function(error){
				fs.writeFile(`DataBase/${title}`,description,'utf8',function(error){
					response.writeHead(302, {Location : `/?id=${title}`});
					response.end();
				});
			});
		});
	}else if(pathname==='/delete_process'){
		var body = '';
		request.on('data',function(data){
			body = body+data;
		})
		request.on('end',function(){
			var post = qs.parse(body).id;
			fs.unlink(`./DataBase/${post}`, function(error){
				response.writeHead(302, {Location : '/'});  //redirection
				response.end();
			})
		})
	}
})

app.listen(3000);