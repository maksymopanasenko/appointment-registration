class Visit {
    constructor(doctor, purpose, description, urgency, name) {
        this.doctor = doctor;
        this.purpose = purpose;
        this.description = description;
        this.urgency = urgency;
        this.name = name;
        this.fields = document.querySelector('.additional-fields');
        this.card = document.createElement('div');
        this.visible = document.createElement('div');
        this.hidden = document.createElement('div');
        this.btn = document.createElement('buton');
    }

    createCard() {
        this.card.classList.add('card', 'mb-1', 'text-dark');
        this.visible.innerHTML = `
            <p class="visible">${this.doctor}</p>
            <p class="visible">${this.name}</p>
        `;
        this.btn.className = 'more-btn';
        this.btn.innerText = 'More';
        this.visible.append(this.btn);
        this.hidden.classList.add('hidden');
        this.hidden.innerHTML = `
            <p class="hidden">${this.purpose}</p>
            <p class="hidden">${this.description}</p>
            <p class="hidden">${this.urgency}</p>
        `;

        this.card.append(this.visible, this.hidden);
    }

    showMore() {
        this.btn.addEventListener('click', (e) => {
            e.target.classList.toggle('hide');
            this.hidden.classList.toggle('hidden')
            if (e.target.classList.contains('hide')) {
                this.btn.innerText = 'Hide';
            } else {
                this.btn.innerText = 'More';
            }
        })
    }

    render() {
        this.createCard();
        this.showMore();
        document.getElementById('root').append(this.card);
    }
}

class CardiologistVisit extends Visit {
    constructor(doctor, purpose, description, urgency, name, pressure, bmi, disease, age) {
        super(doctor, purpose, description, urgency, name);
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
            <p>Blood Pressure: ${this.pressure}</p>
            <p>BMI: ${this.bmi}</p>
            <p>Heart Disease: ${this.disease}</p>
            <p>Age: ${this.age}</p>
        `);
    }
}

class DentistVisit extends Visit {
    constructor(doctor, purpose, description, urgency, name, lastVisit) {
        super(doctor, purpose, description, urgency, name);
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
            <p>Last Visit: ${this.lastVisit}</p>
        `);
    }
}

class TherapistVisit extends Visit {
    constructor(doctor, purpose, description, urgency, name, age) {
        super(doctor, purpose, description, urgency, name);
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
            <p>Age: ${this.age}</p>
        `);
    }
}

export { CardiologistVisit, DentistVisit, TherapistVisit };