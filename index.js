// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js"

const publishBtn = document.getElementById("publish-btn");
const endorsementInput = document.getElementById("endorsement-input");
const endorsementsArea = document.getElementById("endorsements-area");

import { databaseAddress } from "/database.js" 
const app = initializeApp(databaseAddress);
const database = getDatabase(app);
const endorsementsInDatabase = ref(database, "endorsements");

let endorsements = ["Super ci poszło", "to jest świetne", "wszyscy wygrali"];

publishBtn.addEventListener("click", function(){
    endorsements.push(endorsementInput.value)
    push(endorsementsInDatabase, endorsementInput.value)
    //renderEndorsements(endorsements);
    clearEndorsemenInput();
});

onValue(endorsementsInDatabase, function(snapshot){
    //snapshot.val() - zwraca obiekt w postaci klucz i wartosc, 
    //Object.entries() - zamienia obiekt na array
    clearEndorsementsArea();
    let endorsementsFromDatabase = Object.entries(snapshot.val()) 
    //console.log(endorsementsFromDatabase) //do usuniecia

    for(let i=0; i<endorsementsFromDatabase.length; i++){
        addEndorsementElement(endorsementsFromDatabase[i]);
    }
    
})


function clearEndorsemenInput(){
    endorsementInput.value = ""
}

function clearEndorsementsArea(){
    endorsementsArea.innerHTML = ""
}

function addEndorsementElement(endorsemenToAdd){
    let elementToAppend = document.createElement("li");
    let keyOfEndorsement = endorsemenToAdd[0];
    let valueOfEndorsement = endorsemenToAdd[1];
    elementToAppend.textContent = valueOfEndorsement;
    
    elementToAppend.addEventListener("click",function(){
        remove(ref(database, "endorsements/"+keyOfEndorsement))
    })

    endorsementsArea.append(elementToAppend)


}
