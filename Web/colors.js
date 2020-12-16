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
		$('body').css('backgroundColor','black')
		body.setColor('green')
		
		self.value ='낮'	
		 
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
		body.setBackColor('white')
		body.setColor('black')
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