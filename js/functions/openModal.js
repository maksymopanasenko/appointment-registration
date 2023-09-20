import {ModalLogin, ModalVisits} from "../classes/modal.js";
import logIn from "./logIn.js";

function openModal(btn) {
    btn.addEventListener('click', async () => {
        const modal = document.querySelector('.modal');
        
        if (btn.classList.contains('create-btn')) {
            modal ? modal.remove() : null;
            new ModalVisits().render();
        } else {
            new ModalLogin().render();

            await logIn(btn);
        }
    });
}

export default openModal;