import getCards from "../api/getCards.js";
            
async function initialRender() {
    const cards = await getCards();
    if(cards.length !== 0) {
        // here should be a render of instances of class
        document.getElementById('root').innerHTML = '';
    }
}

export default initialRender;