import deleteCards from "../api/deleteCards.js";
class Visit {
    constructor(id, doctor, purpose, description, urgency, name) {
        this.id = id;
        this.doctor = doctor;
        this.purpose = purpose;
        this.description = description;
        this.urgency = urgency;
        this.name = name;
        this.id = id;
        this.fields = document.querySelector('.additional-fields');
        this.column = document.createElement('div');
        this.card = document.createElement('div');
        this.visible = document.createElement('div');
        this.hidden = document.createElement('div');
        this.closeBtn = document.createElement('button');
        this.btn = document.createElement('button');
    }

    createCard() {
        this.card.classList.add('card', 'mb-3', 'text-dark', 'd-flex');
        this.column.className = 'col-sm-4';
        this.visible.className = 'card-body pb-0';
        this.hidden.className = 'card-body pt-0';
        this.closeBtn.classList.add('btn-close', 'position-absolute', 'top-0', 'end-0', 'm-2');
        this.closeBtn.style.width = '2px';
        this.closeBtn.style.height = '2px';
        this.visible.innerHTML = `
            <h5 class="card-title">Doctor: ${this.doctor}</h5>
            <h5 class="card-title patient">Patient: <span>${this.name.length > 20 ? this.name.slice(0, 19) + '...' : this.name}</span></h5>
        `;

        this.btn.className = "btn btn-secondary m-2";
        this.btn.innerText = 'Show more';

        this.hidden.classList.add('hidden');
        this.hidden.innerHTML = `
            <p class="card-text fs-5">Reason: <span class="text-secondary">${this.purpose}</span></p>
            <p class="card-text fs-5">Description: <span class="text-secondary">${this.description ? this.description : 'N/A'}</span></p>
            <p id="urgency" class="card-text fs-5">Urgency: <span class="text-secondary">${this.urgency}</span></p>
        `;
        this.visible.append(this.closeBtn);
        this.card.append(this.visible, this.hidden, this.btn);
        this.column.append(this.card);
    }
    deleteCards(){
        this.closeBtn.addEventListener('click', async() => {
            return await deleteCards(this.id)
        })
    }

    showMore(){
        this.btn.addEventListener('click', (e) => {
            const target = e.target;
            target.classList.toggle('hide');
            target.classList.toggle('btn-warning');
            this.hidden.classList.toggle('hidden');
            
            const card = target.closest('.card');
            const patientTitle = card.querySelector('.card-title.patient span');

            if (target.classList.contains('hide')) {
                this.btn.innerText = 'Hide';
                patientTitle ? patientTitle.textContent = `${this.name}` : null;
            } else {
                this.btn.innerText = 'Show more';
                patientTitle && patientTitle.textContent.length > 20 ? patientTitle.textContent = `${this.name.slice(0, 19) + '...'}` : this.name;
            }
        })
    }

    render() {
        this.deleteCards();
        this.createCard();
        this.showMore();
        document.getElementById('root').append(this.column);
    }
}

class CardiologistVisit extends Visit {
    constructor(id, doctor, purpose, description, urgency, name, pressure, bmi, disease, age) {
        super(id, doctor, purpose, description, urgency, name);
        this.pressure = pressure;
        this.bmi = bmi;
        this.disease = disease;
        this.age = age;
    }

    createFields() {
        this.fields.innerHTML = `
            <div id="cardiologist-fields">
                <input type="text" id="blood-pressure" name="pressure" placeholder="Звичайний тиск" required>
                <input type="text" id="bmi" name="bmi" placeholder="Індекс маси тіла" required>
                <input type="text" id="heart-disease" name="disease" placeholder="Перенесені захворювання серцево-судинної системи" required>
                <input type="text" id="age-cardiologist" name="age" placeholder="Вік" required>
            </div>
        `;
    }

    createCard() {
        super.createCard();
        this.hidden.insertAdjacentHTML('beforeend', `
            <p class="card-text fs-5">Blood Pressure: <span class="text-secondary">${this.pressure}</span></p>
            <p class="card-text fs-5">BMI: <span class="text-secondary">${this.bmi}</span></p>
            <p class="card-text fs-5">Heart Disease: <span class="text-secondary">${this.disease}</span></p>
            <p class="card-text fs-5">Age: <span class="text-secondary">${this.age}</span></p>
        `);
    }
}

class DentistVisit extends Visit {
    constructor(id, doctor, purpose, description, urgency, name, lastVisit) {
        super(id, doctor, purpose, description, urgency, name);
        this.lastVisit = lastVisit;
    }

    createFields() {
        this.fields.innerHTML = `
            <div id="dentist-fields">
                <label for="last-visit">Дата останнього відвідування</label>
                <input type="date" id="last-visit" name="lastVisit" placeholder="Дата останнього відвідування" required>
            </div>
        `;
    }

    createCard() {
        super.createCard();
        this.hidden.insertAdjacentHTML('beforeend', `
            <p class="card-text fs-5">Last Visit: <span class="text-secondary">${this.lastVisit}</span></p>
        `);
    }
}

class TherapistVisit extends Visit {
    constructor(id, doctor, purpose, description, urgency, name, age) {
        super(id, doctor, purpose, description, urgency, name);
        this.age = age;
    }
        
    createFields() {
        this.fields.innerHTML = `
            <div id="therapist-fields">
                <input type="text" id="age-therapist" name="age" placeholder="Вік" required>
            </div>
        `;
    }

    createCard() {
        super.createCard();
        this.hidden.insertAdjacentHTML('beforeend', `
            <p class="card-text fs-5">Age: <span class="text-secondary">${this.age}</span></p>
        `);
    }
}

export { CardiologistVisit, DentistVisit, TherapistVisit };