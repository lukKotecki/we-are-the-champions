// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js"

const publishBtn = document.getElementById("publish-btn");
const endorsementInput = document.getElementById("endorsement-input");
const endorsementsArea = document.getElementById("endorsements-area");
const fromInput = document.getElementById("from-input");
const toInput = document.getElementById("to-input");

import { databaseAddress } from "/database.js" 
const app = initializeApp(databaseAddress);
const database = getDatabase(app);
const endorsementsInDatabase = ref(database, "endorsements2");

let endorsementObject = {
    endorsement: "",
    from: "",
    to: "",
    likes: 0
}

publishBtn.addEventListener("click", function(){
    //push(endorsementsInDatabase, endorsementInput.value)
    endorsementObject.endorsement = endorsementInput.value;
    endorsementObject.from = fromInput.value;
    endorsementObject.to = toInput.value;
    endorsementObject.likes = 0;

    push(endorsementsInDatabase, endorsementObject)
    clearEndorsemenInput();
});

onValue(endorsementsInDatabase, function(snapshot){
    //snapshot.val() - zwraca obiekt w postaci klucz i wartosc, 
    //Object.entries() - zamienia obiekt na array

    clearEndorsementsArea();
    
    if (snapshot.exists()){
        // let endorsementsFromDatabase = Object.entries(snapshot.val()) 
        // for(let i=0; i<endorsementsFromDatabase.length; i++){
        //     addEndorsementElement(endorsementsFromDatabase[i]);
        // }
        let endorsementsFromDatabase = Object.entries(snapshot.val());

        endorsementsFromDatabase.forEach((element) => addEndorsementElement(element))
        // console.log(endorsementsFromDatabase)
        // for (let i=0; i<endorsementsFromDatabase.length; i++){
        //     console.log(endorsementsFromDatabase[i][0])
        //     console.log(endorsementsFromDatabase[i][1].likes)
        // }


    }else{
        endorsementsArea.textContent = "Nothing to show yet..."
    }
})


function clearEndorsemenInput(){
    endorsementInput.value = ""
}

function clearEndorsementsArea(){
    endorsementsArea.innerHTML = ""
}

function addEndorsementElement(endorsementToAdd){
    // let elementToAppend = document.createElement("li");
    // let keyOfEndorsement = endorsementToAdd[0];
    // let valueOfEndorsement = endorsementToAdd[1];
    // elementToAppend.textContent = valueOfEndorsement;
    // elementToAppend.addEventListener("click",function(){
    //     remove(ref(database, "endorsements/"+keyOfEndorsement))
    // })
    // endorsementsArea.append(elementToAppend)
    console.log("");
    console.log("KOLEJNY ELEMENT")
    let elementToAppend = document.createElement("li");
    let keyOfEndorsement = endorsementToAdd[0];
    let valueOfEndorsement = endorsementToAdd[1].endorsement;
    let fromEndorsement = endorsementToAdd[1].from;
    let toEndorsement = endorsementToAdd[1].to;
    let likesEndorsement = endorsementToAdd[1].likes;

    console.log("KEY: "+keyOfEndorsement);
    console.log("VALUE: "+valueOfEndorsement);
    console.log("FROM: "+fromEndorsement);
    console.log("TO: "+toEndorsement)
    console.log("LIKES: "+likesEndorsement);


    elementToAppend.innerHTML = 
    `<h4>To ${toEndorsement}</h3>
    <div class="value-of-endorsement">${valueOfEndorsement}</div> 
    <div class="last-line">
        <h5>From ${fromEndorsement}</h5> 
        <div class="likes"> ❤️ ${likesEndorsement}</div>
    </div>`

    elementToAppend.addEventListener("click",function(){
        remove(ref(database, "endorsements2/"+keyOfEndorsement));
    })
    endorsementsArea.append(elementToAppend);


}
