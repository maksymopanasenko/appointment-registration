async function getCards() {
    console.log('fuck');
    try {
        const response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        return await response.json();
    } catch(err) {
        console.log(err);
    }
}

export default getCards;