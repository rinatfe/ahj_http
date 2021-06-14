const xhr = new XMLHttpRequest();

let addTicket = document.querySelector('.add-ticket');
let modal = document.querySelector('.modal');
let ok = document.querySelector('.okButton');
let cancel = document.querySelector('.cancelButton');
let description = document.querySelector('.description-input');
let fulldescription = document.querySelector('.full-description-input');
let field = document.querySelector('.field');
let content = document.querySelector('.content');
let descriptionTicket = document.querySelector('.description-ticket');
let edit = document.querySelector('.edit');
let modalRemove = document.querySelector('.modal-remove');

let count = document.querySelectorAll('.field-container');
let save;
let editing;

document.addEventListener('DOMContentLoaded', () => {
    xhr.open('GET', 'http://localhost:7070/?method=allTickets');
    xhr.send();
    xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const data = JSON.parse(xhr.responseText);
            } catch (e) {
                console.error(e);
            }
        }
    });
});

addTicket.addEventListener('click', ()=> {
    modal.style.display = 'flex';
});

cancel.addEventListener('click', ()=> {
    modal.style.display = 'none';
})

ok.addEventListener('click', ()=> {
    if(editing) {
        let arr = Array.from(editing.children);
        arr.find(x=> x.classList.contains('content-container')).firstElementChild.innerText = description.value;
        arr.find(x=> x.classList.contains('content-container')).lastElementChild.innerText = fulldescription.value;
        modal.style.display = 'none';
        description.value = '';
        fulldescription.value = ''; 
        modal.querySelector('.header-modal').innerText = 'Добавить тикет';
        editing = null;
    } else {
    let time = new Date()
    field.insertAdjacentHTML('afterbegin', `<div class="ticket-container" data-id="${count.length}">
    <input type="checkbox" class="check"></input>
    <div class="content-container">
        <span class="content" data-id="${count.length}">${description.value}</span>
        <span class="description-ticket">${fulldescription.value}</span>
    </div>    
    <div class='date'>${time.getDate().toString() + '.0' + (time.getMonth() + 1) + '.' + time.getFullYear() + ' ' + time.getHours() + ' : ' + time.getMinutes()}</div>
    <div class="edit"></div>
    <div class="remove"></div>
  </div>`);
  xhr.open("POST", "http://localhost:7070/?method=createTicket");
  xhr.send(JSON.stringify({id:null, name:description.value, description:fulldescription.value, status: false, created: time }));
  modal.style.display = 'none';
  description.value = '';
  fulldescription.value = ''; 
  modal.querySelector('.header-modal').innerText = 'Добавить тикет';
  }      
});

document.addEventListener('click', (e)=> {
    if(e.target.classList.contains('content')) {
        if(e.target.nextElementSibling.style.display == 'block') {
            e.target.nextElementSibling.style.display = 'none'; 
        } else {
            e.target.nextElementSibling.style.display = 'block';
        }
    }
});

document.addEventListener('click', (e)=> {
    if(e.target.classList.contains('edit')) {
        editing = e.target.parentElement;
        let arr = Array.from(e.target.parentElement.children);
        modal.style.display = 'flex';
        modal.querySelector('.header-modal').innerText = 'Редактировать тикет';
        description.value = (arr.find(x=> x.classList.contains('content-container'))).firstElementChild.innerText;
        fulldescription.value = (arr.find(x=> x.classList.contains('content-container'))).lastElementChild.innerText;
    }
});

document.addEventListener('click', (e)=> {
    if(e.target.classList.contains('remove')) {
        modalRemove.style.display = 'flex';
        save = e.target.parentElement;
    }
});

document.addEventListener('click', (e)=> {
    if(e.target.classList.contains('okBtn')) {
        save.remove();
        save = null;
        modalRemove.style.display = 'none';
    }
})

