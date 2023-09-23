import postCard from "../api/postCards.js";
import updateCard from "../api/updateCard.js";
import { handleProps } from "../functions/handleCardProps.js";
import { isAgeValid, isIndexValid, isPressureValid, validateDate } from "../functions/validation.js";
import { TherapistVisit, DentistVisit, CardiologistVisit } from "./visits.js";

class Modal {
    constructor() {
        this.modal = document.createElement('div');
        this.dialog = document.createElement('div');
        this.content = document.createElement('div');
        this.closeBtn = document.createElement('button');
    }

    createElement() {
        this.modal.classList.add('modal', 'fade', 'show', 'd-block', 'd-flex', 'justify-content-center', 'align-items-center');
        this.modal.style.backgroundColor = '#00000070';
        this.dialog.classList.add('modal-dialog', 'position-relative', 'bg-white', 'w-100',  'w-sm-75', 'w-md-50', 'overflow-scroll');
        this.content.classList.add('modal-content', 'text-center', 'border-0');
        this.closeBtn.classList.add('btn-close', 'position-absolute', 'top-0', 'end-0', 'm-1');
        this.content.append(this.closeBtn);
        this.modal.append(this.dialog);

        this.closeModal();
    }

    closeModal() {
        this.modal.addEventListener('click', (e) => {
            if (e.target == this.modal || e.target == this.closeBtn) {
                this.modal.remove();
            }
        });
    }

    render() {
        this.createElement();
        document.querySelector('main').append(this.modal);
    }
}

class ModalLogin extends Modal {
    constructor() {
        super();
    }

    createElement() {
        super.createElement();
        this.content.insertAdjacentHTML('beforeend', `
            <form id="formAuthorization" autocomplete="off" class="bg-light p-3">
                <h1 class="px-3 py-1">Log in to the system</h1>
                <div class="mb-3 px-3 text-start">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" name="email" id="email" placeholder="Your email" required autocomplete="off" aria-describedby="emailHelp">
                </div>
                <div class="mb-3 px-3 text-start">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" name="password" id="password" placeholder="Your password" required autocomplete="off">
                </div>
                <button type="submit" class="btn btn-primary d-grid mb-2 mx-auto">Log in</button>
            </form>
        `);
        this.dialog.prepend(this.content);
    }
}

class ModalVisits extends Modal {
    constructor() {
        super();
        this.body = {};
        this.label = document.createElement('label');
        this.select = document.createElement('select');
        this.form = document.createElement('form');
        this.title = document.createElement('h2');
        this.errorMsg = document.createElement('p');
        this.submitBtn = document.createElement('button');
    }

    createElement() {
        super.createElement();
        this.select.setAttribute('required', '');
        this.select.setAttribute('name', 'doctor');
        this.select.setAttribute('id', 'doctor');
        this.select.className = 'form-select';
        this.select.innerHTML = `
            <option value="" selected disabled>Choose a doctor</option>
            <option value="cardiologist">Cardiologist</option>
            <option value="dentist">Dentist</option>
            <option value="therapist">Therapist</option>
        `;

        this.label.className = "form-label d-block text-start fw-bold";
        this.label.innerText = 'Doctor:';
        this.submitBtn.className = 'btn btn-primary mt-2';
        this.submitBtn.innerText = 'Create';

        this.form.className = 'popup post-form p-4 p-sm-5';
        this.form.innerHTML = `
            <div id="common-fields" class="d-flex flex-column gap-1">
                <div class="additional-fields"></div>

                <label class="form-label text-start fw-bold">Reason:</label>
                <input type="text" id="purpose" class="form-control" name="purpose" placeholder="The reason of the visit" required>
                <label class="form-label text-start fw-bold">Brief description:</label>
                <textarea id="description" class="form-control" row="2" name="description" placeholder="Brief description of the visit"></textarea>
                <label class="form-label text-start fw-bold">Urgency:</label>
                <select id="urgency" class='form-select' name="urgency" required>
                    <option value="" selected disabled>Select the urgency</option>
                    <option value="regular">Regular</option>
                    <option value="priority">Priority</option>
                    <option value="urgent">Urgent</option>
                </select>
                <label class="form-label text-start fw-bold">Patient:</label>
                <input type="text" id="name" class="form-control" name="name" placeholder="Name and surname" required>
            </div>
        `;
        this.title.innerText = 'Make an appointment';
        this.title.className = 'modal-title mb-3';

        this.errorMsg.className = 'd-none text-danger my-2';

        this.form.prepend(this.title, this.label, this.select);
        this.form.append(this.errorMsg, this.submitBtn);

        this.content.append(this.form);
        this.dialog.prepend(this.content);
        this.onSelect();
        this.onPost();
    }

    onSelect() {
        this.select.addEventListener('change', (e) => {
            const value = e.target.value;

            if (value == 'cardiologist') {
                new CardiologistVisit().createFields();
            } else if (value == 'dentist') {
                new DentistVisit().createFields();
            } else {
                new TherapistVisit().createFields();
            }
        });
    }

    onPost() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const target = e.target;
            let error = false;

            target.querySelectorAll('input').forEach(input => {

                if (input.id == "blood-pressure") {
                    error = isPressureValid(input, this.errorMsg);
                };

                if (input.id == "bmi") {
                    !error ? error = isIndexValid(input, this.errorMsg) : null;
                };

                if (input.id == "age") {
                    !error ? error = isAgeValid(input, this.errorMsg) : null;
                }

                if (input.id == "last-visit") {
                    !error ? error = validateDate(input, this.errorMsg) : null;
                }

                this.body[input.name] = input.value;
            });

            target.querySelectorAll('select').forEach(select => {
                this.body[select.name] = select.value;
            });

            const textarea = target.querySelector('textarea');

            this.body[textarea.name] = textarea.value;

            this.body.status = this.status;

            if (this.form.classList.contains('post-form')) {
                
                this.body.status = false;
                if (!error) {
                    target.reset();
                    await postCard(this.body);
                }
            } else {
                if (!error) {
                    target.reset();                 
                    const data = await updateCard(this.id, this.body);
                    this.form.classList.add('post-form');
                    document.querySelector('.modal').remove();
                    this.column.remove();
                    handleProps(data);
                }
            }
        });
    }
}

class ModalEdit extends ModalVisits {
    constructor(id, column, name, doctor, purpose, description, urgency, status, ...rest) {
        super();
        this.id = id;
        this.status = status;
        this.column = column;
        this.name = name;
        this.doctor = doctor;
        this.purpose = purpose;
        this.description = description;
        this.urgency = urgency;
        this.rest = rest;
    }

    completeData() {
        this.title.innerText = 'Редагування запису';
        this.submitBtn.innerText = 'Зберегти зміни';
        this.form.querySelector('#name').value = this.name;
        this.form.querySelector('#doctor').value = this.doctor;
        this.form.querySelector('#purpose').value = this.purpose;
        this.form.querySelector('#description').value = this.description;
        this.form.querySelector('#urgency').value = this.urgency;

        if (this.doctor == 'cardiologist') {
            new CardiologistVisit().createFields();
            
            this.form.querySelectorAll('#cardiologist-fields input').forEach((item, i) => {
                item.value = this.rest[i];
            });
        } else if (this.doctor == 'dentist') {
            new DentistVisit().createFields();

            this.rest.forEach(item => {
                if (item) {
                    this.form.querySelector('#last-visit').value = item;
                }
            });
        } else {
            new TherapistVisit().createFields();

            this.rest.forEach(item => {
                if (item) {
                    this.form.querySelector('#age').value = item;
                }
            });
        }
    }

    onChange() {
        this.form.addEventListener('change', async (e) => {
            const target = e.target;

            this.body[target.name] = target.value;
        });
    }

    render() {
        super.render();
        this.completeData();
        this.onChange();
    }
}

export { ModalLogin, ModalVisits, ModalEdit };