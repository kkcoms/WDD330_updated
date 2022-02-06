// Chapter 8 Code Example
//Accessing Form Elements
//const form = document.forms[0];
const form = document.forms['search'];
//Accessing the search input bar
const input = form.elements.searchInput;

//Events
//Focus Event
//input.addEventListener('focus', () => alert('focused'), false);

// Blur Event
// input.addEventListener('blur', () => alert('blurred'), false);

//Change Event
input.addEventListener('change', () => alert('changed'), false);

// Submit Event
form.addEventListener ('submit', search, false);
// function search() {
//     alert(' Form Submitted');
// }
//Submit Event and prevent default
// function search(event) {
//     alert('Form Submitted');
//     event.preventDefault();
// }


//Retrieving and Changing Values From a Form
//Reports back what the user searched for
function search(event) {
    alert(`You Searched for: ${input.value}`);
    event.preventDefault();
}

// Set Value using JavaScript
input.value = 'Search Here';

// Make the text disapear when focused on
input.addEventListener('focus', function(){
    if (input.value==='Search Here') {
        input.value = '' 
    }
}, false); // What does this "false" do?
input.addEventListener('blur', () => {
    if(input.value === '') {
        input.value = 'Search Here';
    } }, false);


//Form Controls
const heroForm = document.forms['hero'];
heroForm.addEventListener('submit', makeHero, false);

function makeHero(event) {
    event.preventDefault(); // prevent the form from being submitted
    const hero = {}; // create an empty object
    hero.name = heroForm.heroName.value; // create a name property based on the input field's value
    hero.realName = heroForm.realName.value; //Access the password field

    // Creates an empty array called powers and adds powers that are checked to the powers array
//     hero.powers = [];
//     for (let i=0; i < form.powers.length; i++) {
//         if (heroForm.powers[i].checked) {
//          hero.powers.push(form.powers[i].value);
//     }
// }
    //This is the same code refactored
    hero.powers = [...heroForm.powers].filter(box => box.checked).map(box => box.value);
    // "This uses the spread operator to turn the node list into an array. This then allows us to use the filter() method that returns an array containing only the check boxes that were checked (this is because their 'checked' property will be truthy). We then chain the map() method to the end, which replaces each checkbox in the array with its 'value' property. This array is then returned and stored in the hero.powers variable."

    hero.category = heroForm.category.value; // Set the radio button value
    hero.age = heroForm.age.value; // Set the age number input
    hero.city = heroForm.city.value; //set the city property:
    hero.origin = heroForm.origin.value; // Set the origin property

    alert(JSON.stringify(hero)); // convert object to JSON string and display in alert dialog
    return hero;
}
//custom Validation example
heroForm.addEventListener('submit',validate,false);
function validate(event) {
    const firstLetter = heroForm.heroName.value[0];
    if (firstLetter.toUpperCase() === 'X') {
        event.preventDefault();
        alert('Your name is not allowed to start with X!');
    }
}
const label = heroForm.querySelector('label');
const error = document.createElement('div');
error.classList.add('error');
error.textContent = '! Your name is not allowed to start with X.';
label.append(error);
function validateInline() {
    const heroName = this.value.toUpperCase();
    if(heroName.startsWith('X')){
    error.style.display = 'block';
    } else {
    error.style.display = 'none';
    }
}

// Quiz Ninja Project
const quiz = [
    { name: "Superman",realName: "Clark Kent" },
    { name: "Wonderwoman",realName: "Dianna Prince" },
    { name: "Batman",realName: "Bruce Wayne" },
  ];
  
  // View Object
  const view = {
    score: document.querySelector('#score strong'),
    question: document.getElementById('question'),
    result: document.getElementById('result'),
    info: document.getElementById('info'),
    start: document.getElementById('start'),
    response: document.querySelector('#response'),
    render(target,content,attributes) { for(const key in attributes) {
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
        this.resetForm();
    },
    resetForm(){
        this.response.answer.value = '';
        this.response.answer.focus();
    },
    teardown(){
        this.hide(this.question);
        this.hide(this.response);
        this.show(this.start);
    }
  };
  
  // Game Object
  const game = {
    start(quiz){
        this.score = 0;
        this.questions = [...quiz];
        view.setup();
        this.ask();
    },
    ask(name){
        if(this.questions.length > 0) {
            this.question = this.questions.pop();
            const question = `What is ${this.question.name}'s real name?`;
            view.render(view.question,question);
        }
        else {
            this.gameOver();
        }
    },
    check(event){
        event.preventDefault();
        const response = view.response.answer.value;
        const answer = this.question.realName;
        if(response === answer){
            view.render(view.result,'Correct!',{'class':'correct'});
            this.score++;
            view.render(view.score,this.score);
        } else {
            view.render(view.result,`Wrong! The correct answer was ${answer}`,{'class':'wrong'});
        }
        view.resetForm();
        this.ask();
    },
    gameOver(){
        view.render(view.info,`Game Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
        view.teardown();
    }
  }
  
  view.start.addEventListener('click', () => game.start(quiz), false);
  view.response.addEventListener('submit', (event) => game.check(event), false);
  view.hide(view.response);



// Chapter 12 Code Examples
//Prototypal Inheritance
class Turtle {
    constructor(name) {
        this.name = name;
        this.weapon = 'hands';
    }
    sayHi() {
        return `Hi dude, my name is ${this.name}`;
    }
    attack(){
        return `Feel the power of my ${this.weapon}!`;
    }
    sayGoodbye (ele) {
        document.getElementById (ele) .innerHTML += "<br>" + `Goodbye my name is ${leo.name}`;
    }
}
// make a new turtle
const leo = new Turtle('Leonardo');

// How do I get these in the HTML?
document.getElementById('turtle').innerHTML = leo.name;
document.getElementById ('turtleName').innerHTML = leo.sayHi();

// How do I get these into the HTML with a button?
let dis = (func) => document.getElementById ('turtleName2') .innerHTML += "<br>" + func; 

// How do I get the event listener to work?
const tButton = document.querySelector(`#turtleButton`);
tButton.addEventListener('click', () => dis(leo.sayHi()));
tButton.addEventListener('click', () => leo.sayGoodbye(`turtleName2`, leo.sayHi));


//Mixin Example That Creates Deep Copy of an Object
function mixin(target,...objects) {
    for (const object of objects) {   
    if(typeof object === 'object') {
        for (const key of Object.keys(object)) {
            if (typeof object[key] === 'object') {
            target[key] = Array.isArray(object[key]) ? [] : {};
            mixin(target[key],object[key]);
            } else {
            Object.assign(target,object);  
            }
        }
        }
    }
    return target;
}
//Chapter 12 Quiz Ninja Project
const quiz2 = [
    { name2: "Superman",realName2: "Clark Kent" },
    { name2: "Wonder Woman",realName2: "Diana Prince" },
    { name2: "Batman",realName2: "Bruce Wayne" },
    { name2: "The Hulk",realName2: "Bruce Banner" },
    { name2: "Spider-man",realName2: "Peter Parker" },
    { name2: "Cyclops",realName2: "Scott Summers" }
];
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
const view2 = {
      score2: document.querySelector('#score2 strong'),
      question2: document.querySelector('#question2'),
      result2: document.querySelector('#result2'),
      info2: document.querySelector('#info2'),
      start2: document.querySelector('#start2'),
      response2: document.querySelector('#response2'),
      timer: document.querySelector('#timer strong'),
      render2(target,content,attributes) {
          for(const key in attributes) {
            target.setAttribute(key, attributes[key]);
          }
          target.innerHTML = content;
      },
      show2(element){
        element.style.display = 'block';
      },
      hide2(element){
        element.style.display = 'none';
      },

      setup2(){
          this.show2(this.question2);
          this.show2(this.response2);
          this.show2(this.result2);
          this.hide2(this.start2);
          this.render2(this.score2,game2.score2);
          this.render2(this.result2,'');
          this.render2(this.info2,'');
      },
      teardown2(){
        this.hide2(this.question2);
        this.hide2(this.response2);
        this.show2(this.start2);
      },
      buttons(array){
        return array.map(value => `<button>${value}</button>`).join('');
    }
};
    
const game2 = {
      start(quiz2){
        console.log('start() invoked');
        this.score2 = 0;
        this.questions2 = [...quiz2];
        view2.setup2();
        this.secondsRemaining = 20;
        this.timer = setInterval( this.countdown , 1000 );
        this.ask2();
      },
      countdown() {
        game2.secondsRemaining--;
        view2.render2(view2.timer,game2.secondsRemaining);
        if(game2.secondsRemaining <= 0) {
          game2.gameOver2();
        }
      },
      ask2(name){
        console.log('ask() invoked');
        if(this.questions2.length > 2) {
        shuffle(this.questions2);
        this.question2 = this.questions2.pop();
        const options = [this.questions2[0].realName2, this.questions2[1].realName2, this.question2.realName2];
        shuffle(options);
        const question2 = `What is ${this.question2.name2}'s real name?`;
        view2.render2(view2.question2,question2);
        view2.render2(view2.response2,view2.buttons(options));
        }
        else {
        this.gameOver2();
        }
    },
    check2(event){
        console.log('check(event) invoked');
        const response2 = event.target.textContent;
        const answer2 = this.question2.realName2;
        if(response2 === answer2){
        view2.render2(view2.result2,'Correct!',{'class':'correct'});
        this.score2++;
        view2.render2(view2.score2,this.score2);
        } else {
        view2.render2(view2.result2,`Wrong! The correct answer was ${answer2}`,{'class':'wrong'});
        }
        this.ask2();
    },
      gameOver2(){
        console.log('gameOver() invoked');
        view2.render2(view2.info2,`Game Over, you scored ${this.score2} point${this.score2 !== 1 ? 's' : ''}`);
        view2.teardown2();
        clearInterval(this.timer);
      }
    }
    
    view2.start2.addEventListener('click', () => game2.start(quiz2), false);
    view2.response2.addEventListener('click', (event) => game2.check2(event), false);
// End Chapter 12


//Chapter 15 Modular Javascript


WebFont.load({
    google: {
      families: ['Arvo', 'Open+Sans' , 'Merriweather' , 'Special+Elite']
    }
  });
