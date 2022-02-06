window.onload = function() {
    let transition1 = document.getElementById('transition1');
    let transition2 = document.getElementById('transition2');
    let transition3 = document.getElementById('transition3');
    // transition1.addEventListener('click', changeClass, false);
    transition1.addEventListener('click', () => changeClass("shrink"));
    transition2.addEventListener('click', () => changeClass("bounce"));
    transition3.addEventListener('click', () => changeClass("grow"));
  }
  
  function changeClass(name){
    let a = document.getElementById('moveBody')
    let b = document.getElementById('moveFace')

    if (a.className == name){
      a.className = 'still';
      b.className = 'still';
      
    }else if (a.className == 'still'){
      a.className = name;
      b.className = name;
      
    }
  }