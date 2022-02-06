import {toDoList, toDoForm} from './to_do.js'

//I didn't know how to use local storage, 
//so I used information from Wes Bos' beginner 
//JavaScript class. There is a walkthrough in the 
//class that explains how to use it. 
//Here is the link: https://beginnerjavascript.com

// Save user input to local storage
function saveToLs(){
    // Convert our array object to JSON so local storage can read it and save it
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
}

//Get user input from local storage
function getTasks(){
    const lsTasks = JSON.parse(localStorage.getItem("toDoList"));
    if (lsTasks.length >= 1){
        toDoList.push(...lsTasks);
        toDoForm.dispatchEvent(new CustomEvent("tasksSubmitted"));
    }
}


export { saveToLs, getTasks };
//end ls file