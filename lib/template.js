module.exports = {
	HTML: function(title, list, body, control){
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
					${control}  <!--일단 만든것이지!-->
					${body}
				</body>
				</html>
				`;
	},
	List: function(filelist){
		var list='<ul>';
		var i = 0;
			
		while(i<filelist.length){
			list = list+`<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
			i=i+1;
		}
		list = list +'</ul>';
		return list;
	}	
};
