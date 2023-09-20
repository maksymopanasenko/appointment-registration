import draggAndDropp from "./functions/draggable.js";
import initialRender from "./functions/initialRender.js";
import openModal from "./functions/openModal.js";
import filterCards from "./functions/filter.js";


const btnlogIn = document.querySelector('#logIn');

document.getElementById("filterForm").addEventListener("submit", function (e) {
    e.preventDefault();

    filterCards();
});
if (localStorage.getItem('token')) {
    btnlogIn.innerText = 'Create a visit';
    btnlogIn.classList.add('create-btn');

    await initialRender();
}

draggAndDropp('#root');

openModal(btnlogIn);