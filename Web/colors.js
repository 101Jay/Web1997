var body = {};  
		
		body.setColor = function(color){
			document.querySelector('body').style.color=color;
		}
		body.setBackColor = function(color){
			document.querySelector('body').style.backgroundColor=color;
		}
		
	function daynight(self)
		{
		var target = document.querySelector('body'); 
			
		if(self.value ==='밤'){
		target.style.backgroundImage = "URL('http://www.gameinsight.co.kr/news/photo/202003/20143_46993_437.jpg')";						
		body.setColor('white');
		
		self.value ='낮'	;
		 
		var links = document.querySelectorAll('a');
		var i = 0;
		while(i<links.length){
			if (links[i].id==='enter'){
				links[i].style.color='white';
			}
			else{
				links[i].style.color='white';
			}
		 i=i+1;
		 }
		 }	
		else{
		target.style.backgroundImage = "URL('https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcvEJbh%2FbtqEDRqeByP%2FkTnK75yW8wW4kSKVfKz281%2Fimg.jpg')";		
		body.setColor('black');
		self.value ='밤';		
		
		var links = document.querySelectorAll('a');
		var i = 0;
		while(i<links.length){
		 if (links[i].id==='enter'){
				links[i].style.color='white';
			}
			else{
				links[i].style.color='blue';
			};
		 i=i+1;
		 }
		 
		 }	
		}