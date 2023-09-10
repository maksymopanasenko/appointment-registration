import {ModalLogin, ModalVisits} from "../classes/modal.js";
import logIn from "./logIn.js";

function openModal(btn, filter) {
    btn.addEventListener('click', async () => {
        if (btn.classList.contains('create-btn')) {
            console.log('Cards render');
           new ModalVisits().render();
        } else {
            new ModalLogin().render();
        
            await logIn(btn, filter);
        }
    });
}

export default openModal;