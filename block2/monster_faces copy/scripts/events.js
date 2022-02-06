import * as monster from './monster.js';

const bodyButtons = document.querySelector(`.body_container`);
const face_container = document.querySelector(`.face_container`)

// This listens for any clicks on the monster body pictures and displays the body and the matching faces. 
bodyButtons.addEventListener("click", function(event){
    if(event.target.matches("#blueBodyImg")) {
        chooseBody("blue");
        //Remove the existing content in the face container
        while(face_container.firstChild) {
            face_container.removeChild(face_container.firstChild);
        }
        displayFaces("blue")
        clickFace("blue")
    
    };
    if(event.target.matches("#greenBodyImg")) {
        chooseBody("green");
        //Remove the existing content in the face container
        while(face_container.firstChild) {
            face_container.removeChild(face_container.firstChild);
        }
        displayFaces("green")
        clickFace("green")
        

    };
    if(event.target.matches("#yellowBodyImg")) {
        chooseBody("yellow");
        //Remove the existing content in the face container
        while(face_container.firstChild) {
            face_container.removeChild(face_container.firstChild);
        }
        displayFaces("yellow")
        clickFace("yellow")
        
    };
    if(event.target.matches("#orangeBodyImg")) {
        chooseBody("orange");
        //Remove the existing content in the face container
        while(face_container.firstChild) {
            face_container.removeChild(face_container.firstChild);
        }
        displayFaces("orange")
        clickFace("orange")
        
    };
}); // End the body buttons


// This listens for any clicks on the monster body pictures and displays the body and the matching faces.
// It takes color as a parameter
function clickFace(color){
 
    face_container.addEventListener("click", function(event){
        if(event.target.matches("#faceImg0")) {
            chooseFace(color, 0)
        
        };
        if(event.target.matches("#faceImg1")) {
            chooseFace(color, 1)
            

        };
        if(event.target.matches("#faceImg2")) {
            chooseFace(color, 2)
            
        };
        if(event.target.matches("#faceImg3")) {
            chooseFace(color, 3)
            
        };
    }); // End the face buttons
};