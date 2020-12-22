var http = require('http');
var fs = require('fs');
var url= require('url');
function templateHTML(title, list, body){
	return `
			<!DOCTYPE html>
			<html>
			<head>
			  <title>WEB1 - ${title}</title> 
			  <meta charset="utf-8">
			</head>
			<body>
			  <h1><a href="/">Web</a></h1>
				${list}
				${body}
			</body>
			</html>
			`;
	
}

function templateList(filelist){
	var list='<ul>';
		var i = 0;
			
		while(i<filelist.length){
			list = list+`<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
			i=i+1;
		}
		list = list +'</ul>';
	return list;
}

var app = http.createServer(function(request,response){
var _url = request.url;
var queryData = url.parse(_url,true).query;

var pathname = url.parse(_url,true).pathname;

if(pathname==='/'){
	if(queryData.id===undefined){
		
		fs.readdir('./Data',function(error,	filelist){
		var title = 'Welcome';
		var description ='Nice to meet you';	
		var list = templateList(filelist);
		var template = templateHTML(title, list,`<h2>${title}</h2>${description}` );
	
		response.writeHead(200);
		response.end(template);})}
	else{
		fs.readdir('./Data',function(error,	filelist){
		
		fs.readFile(`Data/${queryData.id}`,'utf8', function(err,description){  // 색은 저렇게 떠도 작동은 한다.
		var title = queryData.id;	
		var list = templateList(filelist);
		var template = templateHTML(title, list,`<h2>${title}</h2>${description}` );
			
		response.writeHead(200);
		response.end(template);
		})
		})}}
else{
response.writeHead(404);
response.end("File NOT FOUND");}
});
app.listen(3000);