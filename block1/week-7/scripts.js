'use strict';
//Call and Apply Methods
// I can't get the imput to read and work. 
//It just flashes and leaves the screen. This would be a good thing to figure out
//

// const nameDisplay = document.querySelector(`#displayName`)
// const nameInput = document.getElementById(`name`).value;
// const amy = {name: nameInput}
// const nameExample = document.querySelector(`.nameExample`)

// nameExample.addEventListener("submit", () => sayHello.call(name));
// nameExample.addEventListener("submit", displayName);

// console.log(sayHello.call(amy));
// nameDisplay.innerHTML = sayHello.call(amy);

const nameDisplay1 = document.querySelector(`#displayName1`)
const nameDisplay2 = document.querySelector(`#displayName2`)
const clark = { name: 'Clark' };
const bruce = { name: 'Bruce' };

function sayHello(){
  // "There is nothing to stop you adding your own properties to functions in the same way 
  // that you can add properties to any object in JavaScript. For example, you could add 
  // a description property to a function that describes what it does:"
  sayHello.description = 'returns a greeting'
  return `Hello, my name is ${ this.name }`;
  

};

console.log(sayHello.call(clark));
console.log(sayHello.call(bruce));

nameDisplay1.innerHTML = sayHello.call(clark);
nameDisplay2.innerHTML = sayHello.call(bruce);

//With Arguments
function sayHello1(greeting='Hello'){
  return `${ greeting }, my name is ${ this.name }`;
}
console.log(sayHello1.call(clark, 'How do you do'));
console.log(sayHello1.call(bruce));


//Immediately Invoked function expressions
(function(){
  const temp = 'World';
  console.log(`Hello ${temp}`);
  })();

// "An IIFE can be used to set up any initialization code that there’ll be no need for again. Because the code is only run once, there’s no need to create any reusable, named functions, and all the variables will also be temporary. An IIFE will be invoked once, and can set up any variables, objects and event handlers when the page loads. The following example logs a welcome message to the console, then eliminates all the temporary variables used in putting the message together:"

(function() {
  const name = 'Peter Parker'; // This might be obtained from a cookie in reality
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday', 'Friday','Saturday'];
  const date = new Date(),today = days[date.getDay()];
  console.log(`Welcome back ${name}. Today is ${today}`);
})();

//You don't really need to do that in ES6, putting the code in a block works the same. 
// A block is {}
// This is a good example of local scope as well
{
  const name = 'Peter Parker'; // This might be obtained from a cookie in reality
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday', 'Friday','Saturday'];
  const date = new Date(),today = days[date.getDay()];
  console.log(`Welcome back ${name}. Today is ${today}`);
}

//Creating Self-contained Code Blocks
(function() {
  // block A
  const name = 'Block A';
  console.log(`Hello from ${name}`);
  }());
  (function() {
  // block B
  const name = 'Block B';
  console.log(`Hello from ${name}`);
}());

//Self defining functions
//(this is cool)
function party(){
  console.log('Wow this is amazing!');
  party = function(){
      console.log('Been there, got the T-Shirt');
  }
}
party()
party()

//recursive functions
function factorial(n) {
  if (n === 0) {
      return 1;
  } else {
      return n * factorial(n - 1);//this is calling it's self - 1
  }
}
console.log("The factorial of 5 is:",factorial(5));

function collatz(n, sequence=[n]) {
  if (n === 1){
      return `Sequence took ${sequence.length} steps. It was ${sequence}`;
  }
  if (n%2 === 0) {
      n = n/2;
  } else { 
      n = 3*n + 1;
  }
  return collatz(n,[...sequence,n]); //note the use of the spread operator
}
console.log(collatz(9));

//Callback
//function to represent something that might take a long time
function wait(message, callback, seconds){
  setTimeout(callback,seconds * 1000);
  console.log(message);
}
//callback function
function selfDestruct(){
  console.log('BOOOOM!');
}
//putting it all together
wait('This tape will self-destruct in five seconds ... ', selfDestruct, 5);
console.log('Hmmm, should I accept this mission or not ... ?');

//Promises
//"A promise is created using a constructor function. This takes a function called anexecutoras an argument. The executor initializes the promise and starts the asynchronous operation. It also accepts two functions as arguments: the resolve() function is called if the operation is successful, and the reject() function is called if the operation fails. The general layout of a promise can be seen in the code below:"
// const promiseExample = new Promise( (resolve, reject) => {
//   // initialization code goes here
//   if (success) {
//       resolve(value);
//   } else {
//       reject(error);
//   }
// });

// example with dice
const dice = {
  sides: 20,
  roll() {
      return Math.floor(this.sides * Math.random()) + 1;
  }
}

const promise = new Promise( (resolve,reject) => {
  const n = dice.roll();
  setTimeout(() => {
      (n > 1) ? resolve(n) : reject(n);
  }, n*1000);
  
});
console.log("you rolled a :",dice.roll());
console.log(promise);
//How do I do something with promise?
promise.then( result => console.log(`Yes! I rolled a ${result}`), result => console.log(`Drat! ... I rolled a ${result}`) );

//Functions that return functions
function returnHello() {
  console.log('returnHello() called');
  return function() {
      console.log('Hello World!');
  }
}
returnHello()
const hello = returnHello();
hello()

//Closure example
function outer() {
  const outside = 'Outside!';
  function inner() {
      const inside = 'Inside!';
      console.log(outside);
      console.log(inside);
  }
  console.log(outside);
  inner();
}
outer()

//Chapter 13 AJAX
//fetch method
// const url = 'https:example.com/data';
// fetch(url)
// .then((response) => {
//     if(response.ok) {
//         return response;
//     }
//     throw Error(response.statusText);
// })
// .then( response => // do something with response )
// .catch( error => console.log('There was an error!') )

//Here is an example of how a JSON response promise would be resolved:
// fetch(url)
// .then( response => response.json() ); // transforms the JSON data into a JavaScript object
// .then( data => console.log(Object.entries(data)) )
// .catch( error => console.log('There was an error: ', error))

//A constructor function is used to create a new Request object. An example is shown below:

const request = new Request('https://example.com/data', {
  method: 'GET',
  mode: 'cors',
  redirect: 'follow',
  cache: 'no-cache'
});

//an example of everything put together
// const url = 'https:example.com/data';
// const headers = new Headers({ 'Content-Type': 'text/plain', 'Accept-Charset' : 'utf-8', 'Accept-Encoding':'gzip,deflate' })
// const request = (url,{
//     headers: headers
// })
// fetch(request)
// .then( function(response) {
//     if(response.ok) {
//         return response;
//     }
//     throw Error(response.statusText);
// })
// .then( response => // do something with response )
// .catch( error => console.log('There was an error!') )

//Receiving data code example
//variables
const textButton = document.getElementById('number');
const apiButton = document.getElementById('chuck');
const outputDiv = document.getElementById('output');
// URL variables
const textURL = 'http://numbersapi.com/random';
const apiURL = 'https://api.chucknorris.io/jokes/random';

//event handlers
//number fact
textButton.addEventListener('click', () => {
  fetch(textURL)
  .then( response => {
      outputDiv.innerHTML = 'Waiting for response...';
  if(response.ok) {
      return response;
  }
      throw Error(response.statusText);
  })
  .then( response => response.text() )
  .then( text => outputDiv.innerText = text )
  .catch( error => console.log('There was an error:', error))
},false);

//Chuck Noris
apiButton.addEventListener('click', () => {
  fetch(apiURL)
  .then( response => {
      outputDiv.innerHTML = 'Waiting for response...';
  if(response.ok) {
      return response;
  }
  throw Error(response.statusText);
  })
  .then( response => response.json() )
  .then( data => outputDiv.innerText = data.value )
  .catch( error => console.log('There was an error:', error))
},false);


//Sending Data Code Example
const form = document.forms['todo'];
form.addEventListener('submit', addTask, false);
function addTask(event) {
    event.preventDefault();
    const number = form.task.value;
    const task = {
        userId: 1,
        title: form.task.value,
        completed: false
    }
    const data = JSON.stringify(task);
    const url = 'https://jsonplaceholder.typicode.com/todos';
    const headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    });
    const request = new Request(url,
    {
        method: 'POST',
        header: headers,
        body: data
    }
    )
    fetch(request)
    .then( response => response.json() )
    .then( task => console.log(`Task saved with an id of ${task.id}`) )
    .catch( error => console.log('There was an error:', error))
}

//Same Code using FormData
const form = document.forms['todo'];
form.addEventListener('submit', addTask, false);
function addTask(event) {
    event.preventDefault();
    const task = new FormData(form);
    const url = `http://echo.jsontest.com/id/1/title/${form.task.value}`;
    const headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    });
    const request = new Request(url,
    {
        method: 'POST',
        mode: 'cors',
        header: headers,
        body: JSON.stringify(task)
    }
    )
    fetch(request)
    .then( response => response.json() )
    .then( data => console.log(`${data.title} saved with an id of ${data.id}`) )
    .catch( error => console.log('There was an error:', error))
}


// Quiz Ninja Code
//AJAX example from chapter 13
const url = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/questions.json';

fetch(url)
  .then(res => res.json())
  .then(quiz => {
    view.start.addEventListener('click', () => game.start(quiz.questions), false);
    view.response.addEventListener('click', (event) => game.check(event), false);
});

//Function examples from chapter 11
// Utility functions
function random(a,b=1) {
// if only 1 argument is provided, we need to swap the values of a and b
  if (b === 1) {
	  [a,b] = [b,a];
  }
  return Math.floor((b-a+1) * Math.random()) + a;
}

function shuffle(array) {
  for (let i = array.length; i; i--) {
      let j = random(i)-1;
      [array[i - 1], array[j]] = [array[j], array[i - 1]];
  }
}

// View Object
const view = {
  score: document.querySelector('#score strong'),
  question: document.querySelector('#question'),
  result: document.querySelector('#result'),
  info: document.querySelector('#info'),
  start: document.querySelector('#start'),
  response: document.querySelector('#response'),
  timer: document.querySelector('#timer strong'),
  render(target,content,attributes) {
      for(const key in attributes) {
        target.setAttribute(key, attributes[key]);
      }
      target.innerHTML = content;
  },
  show(element){
    element.style.display = 'block';
  },
  hide(element){
    element.style.display = 'none';
  },
  setup(){
    this.show(this.question);
    this.show(this.response);
    this.show(this.result);
    this.hide(this.start);
    this.render(this.score,game.score);
    this.render(this.result,'');
    this.render(this.info,'');
  },
  teardown(){
    this.hide(this.question);
    this.hide(this.response);
    this.show(this.start);
  },
  buttons(array){
    return array.map(value => `<button>${value}</button>`).join('');
  }
};

const game = {
  start(quiz){
    console.log('start() invoked');
    this.score = 0;
    this.questions = [...quiz];
    view.setup();
    this.secondsRemaining = 20;
    this.timer = setInterval( this.countdown , 1000 );
    this.ask();
  },
  countdown() {
    game.secondsRemaining--;
    view.render(view.timer,game.secondsRemaining);
      if(game.secondsRemaining <= 0) {
        game.gameOver();
      }
  },
  ask(name){
    console.log('ask() invoked');
    if(this.questions.length > 2) {
      shuffle(this.questions);
      this.question = this.questions.pop();
      const options = [this.questions[0].realName, this.questions[1].realName, this.question.realName];
      shuffle(options);
      const question = `What is ${this.question.name}'s real name?`;
      view.render(view.question,question);
      view.render(view.response,view.buttons(options));
    }
    else {
      this.gameOver();
    }
  },
  check(event){
    console.log('check(event) invoked');
    const response = event.target.textContent;
    const answer = this.question.realName;
    if(response === answer){
      console.log('correct');
      view.render(view.result,'Correct!',{'class':'correct'});
      this.score++;
      view.render(view.score,this.score);
    } else {
      console.log('wrong');
      view.render(view.result,`Wrong! The correct answer was ${answer}`,{'class':'wrong'});
    }
    this.ask();
  },
  gameOver(){
    console.log('gameOver() invoked');
    view.render(view.info,`Game Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
    view.teardown();
    clearInterval(this.timer);
  }
}



// end quiz Ninja!


WebFont.load({
    google: {
      families: ['Arvo', 'Open+Sans' , 'Merriweather' , 'Special+Elite']
    }
  });
