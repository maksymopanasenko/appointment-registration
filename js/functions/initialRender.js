import getCards from "../api/getCards.js";
            
async function initialRender() {
    const cards = await getCards();
    if(cards.length !== 0) {
        //render instances of class
        document.getElementById('root').innerHTML = '';
    }
}

export default initialRender;