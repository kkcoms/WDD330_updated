// Chapter 8
window.onload = function() {
  var transition1 = document.getElementById('transition1');
  var transition2 = document.getElementById('transition2');
  var transition3 = document.getElementById('transition3');
  transition1.addEventListener('click', changeClass, false);
  transition2.addEventListener('click', changeClass, false);
  transition3.addEventListener('click', changeClass, false);
}

function changeClass(){
  if (this.className == 'move'){
    this.className = 'still';
    
  }else if (this.className == 'still'){
    this.className = 'move';
    
  }
}

// Chapter 12 examples
//Canvas
//"On a real-life painting canvas, you must first saturate your brush with paint before you can begin. In the HTML5 canvas, you must do the same, and we do so with the strokeStyle or fillStyle properties. Both strokeStyle and fillStyle are set on a context object, and both take one of three values: a string representing a color, a CanvasGradient object, or a CanvasPattern object."
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
context.strokeStyle = "rgb(128,0,128)";
context.fillStyle = "rgba(128,0,128, 0.5)";
context.fillRect(10, 10, 100, 100);   
context.strokeRect(10, 10, 100, 100);

//Gradient example
var canvas = document.getElementById("myCanvas2");
var context = canvas.getContext("2d");
var gradient = context.createLinearGradient(0, 0, 0, 200);
gradient.addColorStop(0, "blue"); 
gradient.addColorStop(1, "white"); 
context.fillStyle = gradient; 
context.fillRect(10, 10, 100, 100); 
context.strokeRect(10, 10, 100, 100); 

//circle example
var canvas = document.getElementById("myCanvasCircle");
var context = canvas.getContext("2d");
context.beginPath();
context.arc(50, 50, 30, 0, Math.PI*2, true);
context.closePath(); 
context.lineWidth = 3; 
context.strokeStyle = "rgb(128,0,128)";
context.fillStyle = "rgba(128,0,128, 0.5)";
context.lineWidth = 3;
context.fill(); 
context.stroke();

WebFont.load({
    google: {
      families: ['Arvo', 'Open+Sans' , 'Merriweather' , 'Special+Elite']
    }
  });
