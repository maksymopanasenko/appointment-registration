
import getCards from "../api/getCards.js";
import { handleProps } from "./handleCardProps.js";


async function initialRender() {
    const cards = await getCards();
    if (cards.length !== 0) {
        document.getElementById('no-item').classList.add('d-none');

        cards.forEach(obj => {
            handleProps(obj);
        });
    }
}

export default initialRender;