import {ModalLogin, ModalVisits} from "../classes/modal.js";
import logIn from "./logIn.js";
import filterCards from "./filter.js";

function openModal(btn, filter) {
    btn.addEventListener('click', async () => {
        const modal = document.querySelector('.modal');
        
        if (btn.classList.contains('create-btn')) {
            modal ? modal.remove() : null;
            new ModalVisits().render();
        } else {
            new ModalLogin().render();

            await logIn(btn, filter);
            filterCards(filter.value.toLowerCase(), document.getElementById("searchInput"), document.getElementById("statusSelect").value, document.getElementById("urgencySelect").value);
        }
    });
}

export default openModal;