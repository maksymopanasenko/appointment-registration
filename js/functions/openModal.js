import ModalLogin from "../classes/modal.js";
import logIn from "./logIn.js";

function openModal(btn, filter) {
    btn.addEventListener('click', async () => {
        if (btn.classList.contains('create-btn')) {
            console.log('Cards render');
            //futher code
        } else {
            new ModalLogin().render();
        
            await logIn(btn, filter);
        }
    });
}

export default openModal;