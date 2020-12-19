document.querySelector('title').innerHTML="With alcohol";

function route(text){
	document.getElementById('mid').innerHTML=text;
}

var name = window.location.href;

if(name.indexOf("about") >-1)
{
	route("Find your Mariage > 어바웃");
	var matches = document.querySelectorAll('a');
	matches[2].style.color='black';
}

if(name.indexOf("soju") >-1)
{
	route("Find your Mariage > 증류주 > 소주");
	var matches = document.querySelectorAll('a');
	matches[3].style.color="green";
	matches[1].style.color='black';
}

if(name.indexOf("wisk") >-1)
{
	route("Find your Mariage > 증류주 > 위스키");
	var matches = document.querySelectorAll('a');
	matches[4].style.color="darkorange";
	matches[1].style.color='black';
}

if(name.indexOf("bran") >-1)
{
	route("Find your Mariage > 증류주 > 브랜디");
	var matches = document.querySelectorAll('a');
	matches[5].style.color="gold";
	matches[1].style.color='black';
}
