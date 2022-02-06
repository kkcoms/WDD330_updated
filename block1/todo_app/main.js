// Imports
import { toDoList, toDoForm, tasks, unfinishedList, finishedList, submitTask,displayTasks, deleteItem, completedTasks, filterFinished, filterNotFinished} from './to_do.js';
import { saveToLs, getTasks } from './ls.js';
import * as util from './utilities.js';

//Variables
const bottomButtons = document.querySelector(`.bottomButtons`);

//Event Listeners
//I used information from Wes Bos' beginner JavaScript 
//course to learn how to create custom listening events. 
//Here is the link: https://beginnerjavascript.com
toDoForm.addEventListener("submit", submitTask);
toDoForm.addEventListener("tasksSubmitted", () => displayTasks(toDoList));
toDoForm.addEventListener("tasksSubmitted", saveToLs);


// This event listener is listening for a click anywhere in tasks.
//here is the article where I found it:
// https://gomakethings.com/checking-event-target-selectors-with-event-bubbling-in-vanilla-javascript/
//Then it calls either the delete item function or the completed task function depending on what is clicked. 
tasks.addEventListener("click", function(event){
    const id = parseInt(event.target.value);
    if(event.target.matches("button")) {
        deleteItem(id);
    };

    if(event.target.matches("input[type = 'checkbox']")) {
        completedTasks(id);

    };
});

// This listens for any click in the bottom buttons div and then calls functions depending on what is clicked. 
bottomButtons.addEventListener("click", function(event){
    if(event.target.matches("#all")) {
        displayTasks(toDoList);
        
    };
    if(event.target.matches("#active")) {
        filterNotFinished();
        displayTasks(unfinishedList);

    };
    if(event.target.matches("#completed")) {
        filterFinished();
        displayTasks(finishedList);
    };
});

//This is calling the get tasks function that retrieves information from local storage
getTasks();