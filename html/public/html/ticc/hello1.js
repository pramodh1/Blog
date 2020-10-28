
			function clearb(){
	for (var i =0;i<x.length;i++) {
		x[i].textContent="";
	}
}
var b=document.getElementById("bit");
b.addEventListener("click",clearb);

var x = document.querySelectorAll("td");
for(var i=0;i<x.length;i++)
{
	x[i].addEventListener("click",fillsquares);
}
function fillsquares(){

	if (this.textContent==="") {
		this.textContent="x";
	}else if(this.textContent==="x"){
		this.textContent="o";
	}else{
		this.textContent="";
	}
}
