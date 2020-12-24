var http = require('http');
var fs = require('fs');
var url= require('url');
var qs = require('querystring');
var template = require('../lib/template.js') //../로 해야 최상위 디렉토리로 가는 듯?
//refactoring
var app = http.createServer(function(request,response){
var _url = request.url;
var queryData = url.parse(_url,true).query;
var pathname = url.parse(_url,true).pathname;

if(pathname==='/'){
	if(queryData.id===undefined){
		fs.readdir('./Data',function(error,	filelist){
			var title = 'Welcome';
			var description ='Nice to meet you';	
			var list = template.List(filelist);
			var HTML = template.HTML(title, list,`<h2>${title}</h2>${description}`, `<a href="/create">create</a>`);

			response.writeHead(200);
			response.end(HTML);
		})
	}
	else{
		fs.readdir('./Data',function(error,	filelist){
			fs.readFile(`Data/${queryData.id}`,'utf8', function(err,description){  // 색은 저렇게 떠도 작동은 한다.
			var title = queryData.id;	
			var list = template.List(filelist);
			var HTML = template.HTML(title, list,`<h2>${title}</h2>${description}`,`
			<a href="/create">create</a> 
			<a href="/update?id=${title}">update</a> 
			<form action="delete_process" method="post">
				<input type="hidden" name="id" value="${title}">
				<input type="submit" value="delete">

			</form>`);

			response.writeHead(200);
			response.end(HTML);
			})
		})}
}else if(pathname==='/create'){
	fs.readdir('./Data',function(error,	filelist){
		var title = 'WEB-CREATE';
		var list = template.List(filelist);
		var HTML = template.HTML(title, list,
			`
			<form action="/create_process" method="post">
				<p><input type="text" name ="title" placeholder="title"></p>

				<p>
					<textarea name="description" placeholder="description"></textarea>	
				</p>

				<p>
					<input type="submit">
				</p>
			</form>
			`, '' );
		response.writeHead(200);
		response.end(HTML);})
}else if(pathname==='/create_process'){
	var body='';
	request.on('data',function(data){
		body=body+data;
	});
	request.on('end',function(){
		var post = qs.parse(body);
		var title = post.title;
		var description =post.description;
		fs.writeFile(`Data/${title}`, description,'utf8',function(err){
			response.writeHead(302,{Location:`/?id=${title}`});
			response.end();
		})
	})
}else if(pathname==='/update'){
	fs.readdir('./Data',function(error,	filelist){
		fs.readFile(`Data/${queryData.id}`,'utf8', function(err,description){  //히든타입으로 수정할 파일의 본래 이름을 넘겨주는 기능을 수행하는 것.
			var title = queryData.id;	
			var list = template.List(filelist);
			var HTML = template.HTML(title, list,
				`
				<form action="/update_process" method="post">
					<input type="hidden" name = "id" value="${title}">  
					<p><input type="text" name ="title" placeholder="title" value="${title}"></p>

					<p>
						<textarea name="description" placeholder="description">${description}</textarea>	
					</p>

					<p>
						<input type="submit">
					</p>
				</form>
				`,`<a href="/create">create</a><a href="/update?id=${title}">update</a>`);
			response.writeHead(200);
			response.end(HTML);})
	})
}else if(pathname==='/update_process'){
		var body='';
		request.on('data',function(data){
		body=body+data;
		})
		request.on('end',function(){
			var post = qs.parse(body);
			var id = post.id;
			var title = post.title;
			var description =post.description;
			fs.rename(`Data/${id}`,`Data/${title}`, function(error){
				fs.writeFile(`Data/${title}`, description,'utf8',function(err){
					response.writeHead(302,{Location:`/?id=${title}`});  /*redirect*/
					response.end();
				});
			});	
		});	
}else if(pathname==='/delete_process'){
	var body='';
	request.on('data',function(data){
		body=body+data;
	})
	request.on('end',function(){
		var post = qs.parse(body);
		var id =post.id;
		fs.unlink(`Data/${id}`, function(error){
			response.writeHead(302,{Location:`/`});  /*redirect*/
			response.end();
		})
	})
}else{
response.writeHead(404);
response.end("File NOT FOUND");}
});
app.listen(3000);