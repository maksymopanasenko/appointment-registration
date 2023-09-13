import getCards from "../api/getCards.js";
import { handleProps } from "./handleCardProps.js";


async function initialRender() {
    const cards = await getCards();
    const rootContainer = document.getElementById('root');
    rootContainer.innerHTML = '';

    if (cards.length !== 0) {

        cards.forEach(obj => {
            handleProps(obj);
        });
    } else {
        rootContainer.textContent = 'No items have been added';
    }
}

// Вызываем функцию initialRender после загрузки DOM
document.addEventListener("DOMContentLoaded", function () {
    initialRender();
});



export default initialRender;