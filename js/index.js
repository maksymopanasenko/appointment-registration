import draggAndDropp from "./functions/draggable.js";
import initialRender from "./functions/initialRender.js";
import openModal from "./functions/openModal.js";
import filterCards from "./functions/filter.js";


const filter = document.querySelector('#filter'),
      btnlogIn = document.querySelector('#logIn');


if (localStorage.getItem('token')) {
    btnlogIn.innerText = 'Створити візит';
    btnlogIn.classList.add('create-btn');
    
    await initialRender();
    
    document.getElementById("filterForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const searchInput = document.getElementById("searchInput").value.toLowerCase();
        const urgencySelect = document.getElementById("urgencySelect").value;

        filterCards(searchInput, urgencySelect);
    });
}

draggAndDropp('#root');

openModal(btnlogIn, filter);