class Card {
    constructor(doctor, name) {
        this.doctor = doctor;
        this.name = name;

    }
    render() {
        const card = document.createElement('div');
        card.innerHTML = `
            <div class="card text-dark fs-5 opacity-100 rounded border-dark my-5 text-center" style=" height: 200px; width:300px;">
                <p>${this.name}</p>
                <h3>${this.doctor}</h3>
            </div>`
        return card;
    }
}

export default Card;