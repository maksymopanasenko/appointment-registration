class Visit {
    constructor(purpose, description, urgency, name) {
        this.purpose = purpose;
        this.description = description;
        this.urgency = urgency;
        this.name = name;
        this.fields = document.querySelector('.additional-fields');
    }
}

class CardiologistVisit extends Visit {
    constructor(purpose, description, urgency, name, bloodPressure, bmi, heartDisease, age) {
        super(purpose, description, urgency, name);
        this.bloodPressure = bloodPressure;
        this.bmi = bmi;
        this.heartDisease = heartDisease;
        this.age = age;
        this.doctor = 'Кардіолог';
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
}

class DentistVisit extends Visit {
    constructor(purpose, description, urgency, name, lastVisit) {
        super(purpose, description, urgency, name);
        this.lastVisit = lastVisit;
        this.doctor = 'Стоматолог';
    }

    createFields() {
        this.fields.innerHTML = `
            <div id="dentist-fields">
                <label for="last-visit">Дата останнього відвідування</label>
                <input type="date" id="last-visit" name="lastVisit" placeholder="Дата останнього відвідування" required>
            </div>
        `;
    }
}

class TherapistVisit extends Visit {
    constructor(purpose, description, urgency, name, age) {
        super(purpose, description, urgency, name);
        this.age = age;
        this.doctor = 'Терапевт';
    }
        
    createFields() {
        this.fields.innerHTML = `
            <div id="therapist-fields">
                <input type="text" id="age-therapist" name="age" placeholder="Вік" required>
            </div>
        `;
    }
}

export { CardiologistVisit, DentistVisit, TherapistVisit };