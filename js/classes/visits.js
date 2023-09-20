import deleteCards from "../api/deleteCards.js";
import updateCard from "../api/updateCard.js";
import { ModalEdit } from "./modal.js";

class Visit {
    constructor(id, doctor, purpose, description, urgency, name, status) {
        this.id = id;
        this.doctor = doctor;
        this.purpose = purpose;
        this.description = description;
        this.urgency = urgency;
        this.name = name;
        this.status = status;
        this.body = {};
        this.fields = document.querySelector('.additional-fields');
        this.column = document.createElement('li');
        this.card = document.createElement('div');
        this.visible = document.createElement('div');
        this.hidden = document.createElement('div');
        this.btnContent = document.createElement('button');
        this.btns = document.createElement('div');
        this.btnClose = document.createElement('button');
        this.btnEdit = document.createElement('button');
        this.checkHolder = document.createElement('div');
        this.checkBox = document.createElement('input');
    }

    createCard() {
        this.card.classList.add('card', 'mb-3', 'text-dark', 'd-flex');
        this.column.className = 'col-sm-6 col-xl-4';
        this.visible.className = 'card-body d-flex justify-content-between align-items-start gap-2 pb-0';
        this.hidden.className = 'card-body pt-0 d-none';

        this.visible.innerHTML = `
            <div>
                <h5 id="doctor" class="card-title">Doctor: ${this.doctor}</h5>
                <h5 id="name" class="card-title patient">Patient: <span>${this.name.length > 20 ? this.name.slice(0, 19) + '...' : this.name}</span></h5>
            </div>
        `;

        this.btns.className = 'btn-group-vertical';

        this.btnContent.className = "btn btn-secondary m-2";
        this.btnContent.innerText = 'Show more';
        this.btnEdit.className = "btn btn-primary";
        this.btnEdit.innerHTML = '<img src="icons/pencil.png" alt="edit" width="15px">';
        this.btnClose.innerText = 'x';
        this.btnClose.className = "btn btn-danger";

        this.btns.append(this.btnClose, this.btnEdit);

        this.checkBox.setAttribute('type', 'checkbox');
        this.checkBox.classList.add('check-box');
        this.status ? this.checkBox.setAttribute('checked', '') : null;

        this.checkHolder.className = 'card-body';
        this.checkHolder.innerHTML = '<label class="h5 me-3">Realized visit</label>';
        this.checkHolder.append(this.checkBox);

        this.visible.append(this.btns);
        this.hidden.innerHTML = `
            <p id="reason" class="card-text fs-5">Reason: <span class="text-secondary">${this.purpose}</span></p>
            <p id="description" class="card-text fs-5">Description: <span class="text-secondary">${this.description ? this.description : 'N/A'}</span></p>
            <p id="urgency" class="card-text fs-5">Urgency: <span class="text-secondary">${this.urgency}</span></p>
        `;

        this.card.append(this.visible, this.hidden, this.checkHolder, this.btnContent);
        this.column.append(this.card);

        this.showMore();
        this.editCard();
        this.changeStatus();
    }

    deleteCards() {
        this.btnClose.addEventListener('click', async () => {
            await deleteCards(this.id)
            this.btnClose.parentElement.offsetParent.parentElement.remove()
            if (document.querySelector('#root').children.length === 0) {
                document.getElementById('no-item').classList.remove('d-none');
            }
        })
    }

    changeStatus() {
        this.body.name = this.name;
        this.body.doctor = this.doctor;
        this.body.purpose = this.purpose;
        this.body.description = this.description;
        this.body.urgency = this.urgency;

        this.checkBox.addEventListener('change', async () => {
            this.body.status = !this.status;
            this.status = !this.status;
            await updateCard(this.id, this.body);
        });
    }

    showMore() {
        this.btnContent.addEventListener('click', (e) => {
            const target = e.target;
            target.classList.toggle('hide');
            target.classList.toggle('btn-warning');
            this.hidden.classList.toggle('d-none');

            const card = target.closest('.card');
            const patientTitle = card.querySelector('.card-title.patient span');

            if (target.classList.contains('hide')) {
                this.btnContent.innerText = 'Hide';
                patientTitle ? patientTitle.textContent = `${this.name}` : null;
            } else {
                this.btnContent.innerText = 'Show more';
                patientTitle && patientTitle.textContent.length > 20 ? patientTitle.textContent = `${this.name.slice(0, 19) + '...'}` : this.name;
            }
        });
    }

    editCard() {
        this.btnEdit.addEventListener('click', () => {
            new ModalEdit(this.id, this.column, this.name, this.doctor, this.purpose, this.description, this.urgency, this.status, this.pressure, this.bmi, this.disease, this.age, this.lastVisit).render();

            document.querySelector('.popup').classList.remove('post-form');
        });
    }

    render() {
        this.createCard();
        this.deleteCards();
        document.getElementById('no-item').classList.add('d-none');
        document.getElementById('root').append(this.column);
    }
}

class CardiologistVisit extends Visit {
    constructor(id, doctor, purpose, description, urgency, name, status, pressure, bmi, disease, age) {
        super(id, doctor, purpose, description, urgency, name, status);
        this.pressure = pressure;
        this.bmi = bmi;
        this.disease = disease;
        this.age = age;
    }

    createFields() {
        this.fields.innerHTML = `
            <div id="cardiologist-fields" class="my-2">
                <div class="input-group input-group-sm mb-2">
                    <label for="blood-pressure" class="input-group-text fw-bold">Blood pressure:</label>
                    <input type="text" id="blood-pressure" class="form-control" name="pressure" required>
                    <label for="bmi" class="input-group-text fw-bold">Body mass index:</label>
                    <input type="text" id="bmi" name="bmi" class="form-control" required>
                </div>
                <div class="input-group input-group-sm">
                    <label for="heart-disease" class="input-group-text fw-bold">Cardiovascular diseases:</label>
                    <input type="text" id="heart-disease" class="form-control" name="disease" required>
                    <label for="age" class="input-group-text fw-bold">Age:</label>
                    <input type="text" id="age" class="form-control" name="age" required>
                </div>
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

    changeStatus() {
        super.changeStatus();
        this.body.pressure = this.pressure;
        this.body.bmi = this.bmi;
        this.body.disease = this.disease;
        this.body.age = this.age;
    }
}

class DentistVisit extends Visit {
    constructor(id, doctor, purpose, description, urgency, name, status, lastVisit) {
        super(id, doctor, purpose, description, urgency, name, status);
        this.lastVisit = lastVisit;
    }

    createFields() {
        this.fields.innerHTML = `
            <div id="dentist-fields" class="d-flex my-2">
                <label for="last-visit" class="form-label text-start fw-bold">Date of last visit:</label>
                <input type="date" id="last-visit" class="form-control" name="lastVisit" required>
            </div>
        `;
    }

    createCard() {
        super.createCard();
        this.hidden.insertAdjacentHTML('beforeend', `
            <p class="card-text fs-5">Last Visit: <span class="text-secondary">${this.lastVisit}</span></p>
        `);
    }

    changeStatus() {
        super.changeStatus();
        this.body.lastVisit = this.lastVisit;
    }
}

class TherapistVisit extends Visit {
    constructor(id, doctor, purpose, description, urgency, name, status, age) {
        super(id, doctor, purpose, description, urgency, name, status);
        this.age = age;
    }

    createFields() {
        this.fields.innerHTML = `
            <div id="therapist-fields" class="my-2 text-start">
                <label for="age" class="form-label fw-bold">Age:</label>
                <input type="text" id="age" class="form-control" name="age" required>
            </div>
        `;
    }

    createCard() {
        super.createCard();
        this.hidden.insertAdjacentHTML('beforeend', `
            <p class="card-text fs-5">Age: <span class="text-secondary">${this.age}</span></p>
        `);
    }

    changeStatus() {
        super.changeStatus();
        this.body.age = this.age;
    }
}

export { CardiologistVisit, DentistVisit, TherapistVisit };