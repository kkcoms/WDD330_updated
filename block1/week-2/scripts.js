//Chapter 3 discoveries
const heroes = [];
heroes[0] = `Superman`;
heroes[1] = `Wonder Woman`;
heroes[2] = `Flash`;
heroes[3] = `Batman`
heroes[5] = `Aquaman`;
console.log(heroes[0]);
console.log(heroes);


let avengers = ['Captain America', 'Iron Man', 'Thor', 'Hulk', 'Hawkeye', 'Black Widow'];
console.log(avengers);
console.log(avengers[avengers.length - 1]);
avengers = avengers.concat([`Spiderman`, `Captain Marvel`, `Black Panther`]);
console.log(avengers)
avengers = [...avengers,...[`Falcon`, `Nick Fury`, `Ant Man`, `Wasp`]];
console.log(avengers)
console.log(avengers.join(` & `));
let original = avengers.slice(0,6);
console.log(`The Originals: ` + original.join(` & `));


//Chapter 4 quiz ninja game
const quiz = [
  ["What is Superman's real name?","Clark Kent"],
  ["What is Wonder Woman's real name?","Diana Prince"],
  ["What is Batman's real name?","Bruce Wayne"]
];

function start(quiz){
  let score = 0;
  // main game loop
  for(const [question,answer] of quiz){
      const response = ask(question);
      check(response,answer);
  }

  // end of main game loop
  gameOver();
  // function declarations
  function ask(question){
      return prompt(question);
  }
  function check(response,answer){
      if(response === answer){
      alert('Correct!');
      score++;
      } else {
      alert(`Wrong! The correct answer was ${answer}`);
      }
  }
  function gameOver(){
      alert(`Game Over, you scored ${score} point${score !== 1 ? 's' : ''}`);
  }
}
start(quiz);
 
//Chapter 4 

//Rest operator. Allows the user to enter any number of arguments
function mean(...values) {
  let total = 0;
  for(const value of values) {
      total += value;
  }
  return total/values.length;
}
console.log(mean(2,8,13,11,4,2))

// Mean function using reduce and map
function mean_with_reduce(array,callback) {
  if (callback) {
  array.map( callback );
  } 
  const total = array.reduce((a, b) => a + b);
  return total/array.length;
}
console.log(mean_with_reduce([2,5,7,11,4]));

//?? Couldn't get this to work
console.log(mean_with_reduce([2,5,7,11,4], x => 2 * x + 1));


// Trying to figure out callbacks
// Represents a user input array
function user_numbers(){
let number = [2, 8, 13, 11, 4, 2]
return number
}
console.log(user_numbers());

// Display the mean to the user Can't get this to work this week
function show_mean(operator){
  const average = operator(user_numbers());
  document.getElementById(`result`).innerHTML = (`The mean is: ${average}`);
  console.log(user_numbers());
  
}