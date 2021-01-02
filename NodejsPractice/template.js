module.exports ={
	List : function(filelist){
		var list = '<ul>';
		var i = 0;
		while(i<filelist.length){
			list = list+`<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`; // /?id에 대한 이해 => querystring 
			i = i+1;
		}
		list = list+'</ul>';

		return list;
	},
	HTML : function(title, description,list,control){
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
	},
	createForm : function(){
		var form = 
		`
		<form action="/create_process" method="post" accept-charset="utf8">
			<p><input type="text" name="title" placeholder="title"></p>
			<p><textarea name="description" placeholder = "description"></textarea></p>
			<p><input type="submit" value="제출하기"></p>
		</form>
		`
		return form;
	},
	updateForm : function(title,description){
		var form = 
			`
			<form action="/update_process" method = "post">
				<input type ="hidden" name ="id" value =${title}>
				<p><input type = "text" name = "title" placeholder="title" value=${title}></p>	
				<p><textarea name = "description" placeholder = "description" cols='40' rows ='8'>${description}</textarea></p>
				<p><input type="submit" value="업데이트"></p>
			</form>
			`
		return form;
	}
}