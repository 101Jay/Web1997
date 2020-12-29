var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');

var makeList = function(filelist){
	var list = '<ul>';
	var i = 0;
	while(i<filelist.length){
		list = list+`<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`; // /?id에 대한 이해 => querystring 
		i = i+1;
	}
	list = list+'</ul>';
	
	return list;
}
var makeHTML = function(title, description,list,control){
	var html = 	`
					<!doctype html>
					<html>
					<head>
					  <title>${title}</title>
					  <meta charset="utf-8">
					</head>
					<body>
					  <h1><a href="/">With you, Music</a></h1>
						${list}
						${control}
					  <h2>${title}</h2>
					 <p>
						 ${description}
					</p>
					</body>
					</html>
				`;
	return html;
	
}

var makeForm = function(){
	var form = 
	`
	<form action="/create_process" method="post">
		<p><input type="text" name="title" placeholder="title"></p>
		<p><textarea name="description" placeholder = "description"></textarea></p>
		<p><input type="submit" value="제출하기"></p>
	</form>
	`
	return form;
}

var app = http.createServer(function(request, response){
	var _url = request.url;
	var queryData = url.parse(_url,true).query;
	var pathname = url.parse(_url,true).pathname;
	
	if (pathname==='/'){
		if(queryData.id === undefined){
			fs.readdir('./DataBase', function(error, filelist){
				var title = 'Play_List';
				var description = 'Choice Your Playlist';
				var list = makeList(filelist);
				var control = `<a href = "/create">Create</a>`
				var HTML = makeHTML(title,description,list,control);
				
				response.writeHead(200);
				response.end(HTML);
			})
		}else{
			fs.readdir('./DataBase', function(error,filelist){
				fs.readFile(`DataBase/${queryData.id}`,'utf8',function(error,data){
					var title = queryData.id;
					var list = makeList(filelist);
					var HTML = makeHTML(title,data,list,'');
					
					response.writeHead(200);
					response.end(HTML);
				})
			})	
		}	
	}else if(pathname==='/create'){
		fs.readdir('./DataBase',function(error, filelist){
			var title = 'Play_List';
			var description = 'Play your list';
			var list = makeList(filelist);
			var createForm = makeForm();
			var HTML = makeHTML(title,description,list,createForm);
			
			response.writeHead(200);
			response.end(HTML);
		})
	}else if(pathname==='/create_process'){
		var body='';
		request.on('data',function(data){
			body=body+data;
		})
		request.on('end', function(){
			var post = qs.parse(body); // 객체형태로 분석해준다 -> title, description으로 나눠서!
			var title = post.title;
			var description = post.description;
			fs.writeFile(`./DataBase/${title}`,description,'utf8',function(error){ //writeFile의 첫번째 인자로 위치까지 정해준다.
				response.writeHead(302, {Location:`/?id=${title}`});  // wrtieHeader의 두번째 인자로 객체를 써서, redirect -> location으로 클라이언트를 보내준다.
				response.end();	
			})
			
		})
	}
})

app.listen(3000);