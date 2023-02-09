const addThought = document.querySelector('#addThought');
const listThought = document.querySelector('#list-thoughts');
const form = document.querySelector('#form');
let thoughts = []; //array for thoughts

eventListeners();
function eventListeners(){
    addThought.addEventListener('click' , addThoughts);

    document.addEventListener('DOMContentLoaded', () => {
        thoughts = JSON.parse( localStorage.getItem('thoughts')) || [];
       makeHTML();
    })
}

//functions
function addThoughts(e) {
    e.preventDefault();

    const addedText = document.querySelector('#text').value;
    if(addedText.trim() === ''){ 
        showError('you can not add an empty thought');
        return;
    }

    const objThought = {
        id: Date.now(),
        addedText
    }
    thoughts = [...thoughts, objThought]; //add message to thoughts array
    makeHTML();
    form.reset();
}

function showError(error) {
    const messageError = document.createElement('p');
    messageError.textContent = error;
    messageError.classList.add('error');

    const content = document.querySelector('#list-thoughts');
    content.appendChild(messageError);

    setTimeout(() => { //delete after 3s
        messageError.remove();
    }, 3000);
}

function makeHTML(){
    cleanHTML();

    if(thoughts.length > 0){
        thoughts.forEach( message => {
            //create delete button 
            const btnDelete = document.createElement('a');
            btnDelete.classList.add('delete-thought');
            btnDelete.innerText = 'X';

            btnDelete.onclick = () => {
                deleteTought(message.id);
            }

            //create HTML
            const li = document.createElement('li');
            li.innerText = message.addedText;
            li.appendChild(btnDelete);
            listThought.appendChild(li);

        })
    }
    synchronizeStorage();
}

function synchronizeStorage() {
    localStorage.setItem('thoughts', JSON.stringify(thoughts)); //store the thoughs
}

function deleteTought(id) {
    thoughts = thoughts.filter(message => message.id != id);
    makeHTML();
}

function cleanHTML() {
    while(listThought.firstChild){
        listThought.removeChild(listThought.firstChild);
    }
}