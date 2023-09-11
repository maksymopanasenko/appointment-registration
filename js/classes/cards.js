class Card {
    constructor(doctor, name) {
        this.doctor = doctor;
        this.name = name;
        
    }
    render() {
        const card = document.createElement('div');
        card.innerHTML = `
            <div class="card">
                <h3>${this.doctor}</h3>
                <p>${this.name}</p>
            </div>`
        return card;
    }
}

export default Card;