// Variables
export const tasks = document.querySelector(`.todo_list`);
export const toDoForm = document.querySelector(`.toDo`);
export let toDoList = [];
export let finishedList = [];
export let unfinishedList = [];

// Function to collect user input, save it to the to do list array and add it to the html
function submitTask(event){
    // Stop default submit
    event.preventDefault();
    
    // Get task from user input
    // Can write this using current target or getElementById
    //const taskName = event.currentTarget.task.value;
    const taskName = document.getElementById(`task`).value
    
    //Save task information about the task to toDo
    const toDo = { 
        id : Date.now(), 
        content: taskName, 
        completed: false 
    };

    //Push toDo into toDoList array
    toDoList.push(toDo);

    //Clear form
    // Can write this using current target or getElementById
    //event.currentTarget.task.value = ``;
    document.getElementById(`task`).value = ``;

    //Create a custom task sumbitted event (This is a custom event listener)
    toDoForm.dispatchEvent(new CustomEvent("tasksSubmitted"));
} //End Submit task function


// Function to display tasks 
function displayTasks(arrayName){
    // loop through all items in the to do list array and make them into html list items
    const listItems = arrayName.map(toDo => 
        `<li class = "todo_item">
        <input type = "checkbox" ${toDo.completed && "checked"} value = "${toDo.id}" >
        <span class = "todo_item_name"> <p>${toDo.content} </p></span>
        <button aria-label = "Remove ${toDo.content}" value = "${toDo.id}" class="fas fa-trash"></button> 
        </li>`).join(``);

    // Add the list items to the html
    tasks.innerHTML = listItems;

} //End Display Function

// removes tasks from the list
function deleteItem(id){
    //This filters the array into checked and not checked and deletes the checked ones
    toDoList = toDoList.filter(toDo => toDo.id !== id);

    //Event that calls display tasks and save to local storage
    toDoForm.dispatchEvent(new CustomEvent("tasksSubmitted"));

} //End Delete Item function

// gathers and saves completed tasks
function completedTasks(id){
    // this looks through the to do list array 
    //and finds the todo with an id that matches the one that was clicked
    const taskRef = toDoList.find(toDo => toDo.id == id);

    //This changes completed from false to true when clicked
    taskRef.completed = !taskRef.completed;

    //Event that calls display tasks and save to local storage
    toDoForm.dispatchEvent(new CustomEvent("tasksSubmitted"));
    console.log("CHeckbox clicked")
    
}// end completed tasks

//Function to split the to do list into a new array for completed items
function filterFinished(){
    finishedList = toDoList.filter(toDoSingle => toDoSingle.completed == true);
}


//Function to split the to do list into a new array for uncompleted items
function filterNotFinished(){
    unfinishedList = toDoList.filter(toDoSingle => toDoSingle.completed == false);

}


export { submitTask,displayTasks, deleteItem, completedTasks, filterFinished, filterNotFinished};
