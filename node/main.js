var http = require('http');
var fs = require('fs');
var url= require('url');
var qs = require('querystring');
var path = require('path'); // 보안을 위해서.
var sanitizeHtml = require('sanitize-html'); // 사용자의 입력값을 그대로 출력하면 사용자가 <script>등을 이용하여 페이지의 보안을 해칠 수 있다.
var template = require('../lib/template.js'); //../로 해야 최상위 디렉토리로 가는 듯?

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

				response.writeHead(200); //200번대는 정상적으로 갔다는 http번호
				response.end(HTML);
			})
		}
		else{
			fs.readdir('./Data',function(error,	filelist){
				var filteredID = path.parse(queryData.id).base;  // 보안을 위해 세탁하는 코드
				fs.readFile(`Data/${filteredID}`,'utf8', function(err,description){  
					var title = queryData.id;	
					var sanitizedTitle = sanitizeHtml(title, {
						allowedTags: ['h2']
					});
					var sanitizedDescription= sanitizeHtml(description, {
						allowedTags: ['h2']
					});
					var list = template.List(filelist);
					var HTML = template.HTML(sanitizedTitle, list,`<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,`
					<a href="/create">create</a> 
					<a href="/update?id=${sanitizedTitle}">update</a> 
					<form action="delete_process" method="post">
						<input type="hidden" name="id" value="${sanitizedTitle}">
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
			var filteredID = path.parse(queryData.id).base;
			fs.readFile(`Data/${filteredID}`,'utf8', function(err,description){  //히든타입으로 수정할 파일의 본래 이름을 넘겨주는 기능을 수행하는 것.
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
			body=body+data; //id 값을 받기 위함이다.
		})
		request.on('end',function(){
			var post = qs.parse(body);
			var filteredID = path.parse(post.id).base;
			fs.unlink(`Data/${filteredID}`, function(error){
				response.writeHead(302,{Location:`/`});  /*redirect*/
				response.end();
			})
		})
	}else{
	response.writeHead(404);
	response.end("File NOT FOUND");}
	});
app.listen(3000); 