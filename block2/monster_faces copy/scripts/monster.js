
//global Variables
const monsterURL = 'https://shakerbaker78.github.io./amy_baker_portfolio/block2/monster_faces/data/monster.json';
const createMonster = document.getElementById("makeMonster");


// get monster info from the JSON file
// fetch the local json data

fetch(monsterURL, {method: 'GET'})
.then(response => response.json())
.then(json => {
        //Create a monster object
        const monster = json['monsters'];
        


// display all the body choices    
function displayBodies(){
    // loop through all items in the bodies object and display the bodies (that sounds so morbid!)
    const body_container = document.querySelector(`.body_container`);
    const bodies = monster.map(body => 
    `<div class = "body" id = "${body.color}Body">
    <img class "monsterBody" id = "${body.color}BodyImg" src = "${body.body}" alt = "${body.color} Body">
    </div>`).join(``);

    // Add the list items to the html
    body_container.innerHTML = bodies;

 }//End Display Bodies Function
// Call display bodies    
 displayBodies()

    //function to filter the monster object by color. 
    function filterColor(color){
        return monster.filter(monster => monster.color == color);
    }

    // Display all the faces of a given color
    function displayFaces(color){
        const face_container = document.querySelector(`.face_container`);
       
        //filter the monster file to an object with only the values from the selected color
        const allFaces = filterColor(color);

        // create a faces object with all of the faces of one color in it.
        const face = allFaces[0].faces

        //Iterate throught the faces aray and find the correct face
        for (let j = 0; j < face.length; j++){
 
                //Add the divs that hold the face images
                let faceDiv = document.createElement('div')
                faceDiv.setAttribute('class', 'face')
                faceDiv.setAttribute('id', 'face' + [j]);
                face_container.appendChild(faceDiv)

                //Add the face images
                let monsterFace = document.createElement('img');
                monsterFace.setAttribute('class', 'monsterFace');
                monsterFace.setAttribute('id', 'faceImg' + [j]);
                monsterFace.setAttribute('src', face[j]);
                monsterFace.setAttribute('alt',"face " + (j + 1));
                document.querySelector('#face' + [j]).appendChild(monsterFace);
            
        
        }// End for loop        
    
    }// End Display Faces Function
    //Call display faces (should I move this to the HTML onload?)
    displayFaces("yellow")

  
    // make a monster function to call the correct body. This will also pass in the color variable for the faces
    //Function takes a color and face number parameter
    function chooseBody(color) {
        const bodyDiv = document.querySelector('.chosenBody');
    
        // Remove the current child of bodyDiv
        if (bodyDiv.hasChildNodes()) {
            bodyDiv.removeChild(bodyDiv.childNodes[0]);
        }
          

        //filter the monster object and match the selected color 
        const chosenBody = filterColor(color)


        bodyDiv.setAttribute('id', 'body' + chosenBody[0].color );
      
        //dislay the correct colored body
        let monsterImage = document.createElement('img');
        monsterImage.setAttribute('class', 'variableBody');
        monsterImage.setAttribute('src', chosenBody[0].body);
        monsterImage.setAttribute('alt', chosenBody[0].color + " Body");
        bodyDiv.appendChild(monsterImage);
            
            
    } //End Choose Body Function
    


    function chooseFace(color,face_number){
        const faces = filterColor(color)
        const face = faces[0].faces
        const faceDiv = document.querySelector('.chosenFace');

        // Remove the current child of faceDiv
        if (faceDiv.hasChildNodes()) {
            faceDiv.removeChild(faceDiv.childNodes[0]);
        }

        //Iterate through the faces aray and find the correct face
        for (let j = 0; j < face.length; j++){
            if (j == face_number) {


                //Add the correct face to the page
                let monsterFace = document.createElement('img');
                monsterFace.setAttribute('class', 'variableFace' + (face_number + 1));
                monsterFace.setAttribute('src', face[j]);
                monsterFace.setAttribute('alt',"face " + (face_number + 1));
                document.querySelector('.chosenFace').appendChild(monsterFace);
            }//end if statement
        
        }//end for loop
    }// end choose face


//Event Listeners
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

}); // End Fetch Response
