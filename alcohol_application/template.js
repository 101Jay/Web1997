module.exports = {
	HTML : function(title,body,list,control){
		return `
				<!Doctype html>

				<html>
				<head>
				<title>${title}</title>	
				<meta charset ="UTF8">	
					<div class="link">
				<link rel="preconnect" href="https://fonts.gstatic.com">
				<link href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap" rel="stylesheet">
				<link rel="preconnect" href="https://fonts.gstatic.com">
				<link href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&display=swap" rel="stylesheet">
				<link rel="preconnect" href="https://fonts.gstatic.com">
				<link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Nanum+Myeongjo:wght@400;700;800&display=swap" rel="stylesheet">
					</div>	

				<link rel="stylesheet" href="basic.css">	

				</head>	
				<body>

				<div id="top">
				<span id="develob">Dev.J.S</span>
				<h1><a href="soju.html">Find Your Mariage</a></h1>	

				<div class="line1">

					<div class="item" id="j"><a href="soju.html">증류주</a></div>
					<div class="item" id="a"><a href="about.html">어바웃</a></div>
				</div>
				</div>
				<div id="mid"><p>Find your Mariage</p></div>

				<div class="main">
					<div class="item2"id="left"></div>
					<div class="item2"id="center">
					<ul><br><br>
						${list}
					</ul>
					</div>
					<div class="item2">
					<h2><p>	${title} </p></h2><br><br>
					<img src="https://images.unsplash.com/photo-1590189182193-1fd44f2b4048?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" width=100%>
					<P id="sojuexp">${body}</P><br><br>
					<p>${control}</p>
					</div>
					<div class="item2"></div>
				</div>


				</body>	
				<script src="basic.js"></script>
				</html>
				<!--google fonts http://davidbau.com/colors/-->
				`;
		},
	List : function(filelist){
		var list = '<ul>';
					
		/*<li class="jeng"><p><a href="soju.html">소주</a></p></li><br><br>
		<li class="jeng"><p><a href="wisk.html">위스키</a></p></li><br><br>
		<li class="jeng"><p><a href="bran.html">브랜디</a></p></li>*/
		var i = 0;
		while(i<filelist.length){
			list = list+`<li class="jeng"><p><a href = "/?id=${filelist[i]}">${filelist[i]}</a></p></li><br><br>`;
			i=i+1;
		}
		
		list = list+'</ul>';
		return list;
	} 
} 