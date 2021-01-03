var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var tp = require('../NodejsPractice/template.js');
var sanitizeHtml = require('sanitize-html')
var path = require('path');


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
				var filteredId = path.parse(queryData.id).base;
				fs.readFile(`DataBase/${filteredId}`,'utf8',function(error,data){
					var title = queryData.id;
					var sanitizedTitle = sanitizeHtml(title, {
						allowedTags: ['h2']
					})
					var sanitizedDescription = sanitizeHtml(data);
					var kortitle = encodeURIComponent(sanitizedTitle);
					var list = tp.List(filelist);
					var control = `	<a href = "/update?id=${sanitizedTitle}">업데이트</a>
									<form action='/delete_process' method ='post'>
									<input type="hidden" name ="id" value=${kortitle}>  
									<input type="submit" value="삭제하기">
									</form>
									`;  //update시에 ?뒤에 쿼리 스트링 넘겨두는거 유의!
					//form으로 delete_process로 보낼 때, 띄어쓰기나 한국어가 http로 보내지는 과정에서 이상하게 변질되어 갈 수 있다.ex) me morise -> me20%morise -> request로 받을 때 me만 옴
					//따라서 보낼 때 인코딩해서 보내고, 받을 때 디코딩해서 받아야 제대로 된 값을 받을 수 있다.
					//encoding은 변질되지 않게 하는 방부제 같은 것이다!!
					var HTML = tp.HTML(sanitizedTitle,sanitizedDescription,list,control);
					
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
			var kortitle = encodeURIComponent(title);// redirect시에 한글이 적힌 주소가 오류를 발생시킬 수 있기 때문에, 인코딩해서 location으로 보내준다.location은 인코딩해서 보내도 괜찮은듯?
			fs.writeFile(`./DataBase/${title}`,description,'utf-8',function(error){ //writeFile의 첫번째 인자로 위치까지 정해준다.
				response.writeHead(302, {Location:`/?id=${kortitle}`});  
				// wrtieHeader의 두번째 인자로 객체를 써서, redirect -> location으로 클라이언트를 보내준다.
				response.end();
			})
			
		})
	}else if(pathname==='/update'){
		fs.readdir('./DataBase', function(error, filelist){
			var filteredId = path.parse(queryData.id).base;
			fs.readFile(`DataBase/${filteredId}`,'utf8',function(error, data){
				var title = queryData.id;
				var sanitizedTitle = sanitizeHtml(title);
				var sanitizedDescription = sanitizeHtml(data);
				var encodeSatitizedTitle = encodeURIComponent(sanitizedTitle);
				var list = tp.List(filelist);
				var form = tp.updateForm(encodeSatitizedTitle,sanitizedTitle,sanitizedDescription);
				var HTML = tp.HTML(sanitizedTitle,form,list,`<a href = "/create">새 노래</a>`);
				
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
			var postID = decodeURIComponent(post.id);
			console.log(postID);
			var kortitle = encodeURIComponent(title);
			console.log(title);
			fs.rename(`DataBase/${postID}`,`DataBase/${title}`,function(error){
				fs.writeFile(`DataBase/${title}`,description,'utf8',function(error){
					response.writeHead(302, {Location : `/?id=${kortitle}`});  //fs로 할 때는 제대로 디코딩만 되어있으면 되는데, 로케이션 쓸 때는 바꿔줘야한다?
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
			var postID = qs.parse(body).id;
			var decodePostId = decodeURIComponent(postID);
			fs.unlink(`./DataBase/${decodePostId}`, function(error){
				response.writeHead(302, {Location : '/'});  //redirection
				response.end();
			})
		})
	}
})

app.listen(3000);
//정리1: fs로 파일 읽거나 쓸 때는, 디코딩만 잘 되어있으면 - 원래 우리가 사용하는 문자 그대로 - 인식해준다. 그러나 리디렉션해서 local로 넘길 때는 encode해줘야한다!
//정리2: 또한, form으로 delete_process로 보낼 때, 띄어쓰기나 한국어가 http로 보내지는 과정에서 이상하게 변질되어 갈 수 있다.ex) me morise -> me20%morise -> request로 받을 때 me만 옴
//따라서 보낼 때 인코딩해서 보내고, 받을 때 디코딩해서 받아야 제대로 된 값을 받을 수 있다.
//encoding은 변질되지 않게 하는 방부제 같은 것이다!!