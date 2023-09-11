import getCards from "../api/getCards.js";
import Card from "../classes/cards.js";


// В функции initialRender
async function initialRender() {
    const cards = await getCards();
    const rootContainer = document.getElementById('root');
    rootContainer.innerHTML = '';

    if (cards.length !== 0) {
        cards.forEach((cardData) => {
            const cardInstance = new Card(
                cardData.doctor,
                cardData.name
            );

            const cardElement = cardInstance.render();

            rootContainer.appendChild(cardElement);
        });
    } else {
        rootContainer.textContent = 'No items have been added';
    }
}


export default initialRender;