import postCard from "../api/postCards.js";
import updateCard from "../api/updateCard.js";
import { handleProps } from "../functions/handleCardProps.js";
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
        this.dialog.classList.add('modal-dialog', 'position-relative', 'p-4', 'bg-light', 'w-50');
        this.content.classList.add('modal-content', 'text-center', 'border-0');
        this.dialog.style.pointerEvents = 'all';
        this.closeBtn.classList.add('btn-close', 'position-absolute', 'top-0', 'end-0', 'm-2');
        this.dialog.append(this.closeBtn);
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
        this.content.innerHTML = `
            <form id="formAuthorization" autocomplete="off" class="bg-light">
                <h1 class="px-3 py-1">Вхід в систему</h1>
                <div class="mb-3 px-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" name="email" id="email" placeholder="Your email" required autocomplete="off" aria-describedby="emailHelp">
                </div>
                <div class="mb-3 px-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" name="password" id="password" placeholder="Your password" required autocomplete="off">
                </div>
                <button type="submit" class="btn btn-primary d-grid mb-2 mx-auto">Ввійти</button>
            </form>
        `;
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
        this.submitBtn = document.createElement('button');
    }

    createElement() {
        super.createElement();
        this.select.setAttribute('required', '');
        this.select.setAttribute('name', 'doctor');
        this.select.setAttribute('id', 'doctor');
        this.select.className = 'form-select';
        this.select.innerHTML = `
            <option value="" selected disabled>Оберіть лікаря</option>
            <option value="cardiologist">Кардіолог</option>
            <option value="dentist">Стоматолог</option>
            <option value="therapist">Терапевт</option>
        `;

        this.label.className = "form-label d-block text-start fw-bold";
        this.label.innerText = 'Лікар:';
        this.submitBtn.className = 'btn btn-primary mt-2';
        this.submitBtn.innerText = 'Створити';

        this.form.className = 'popup post-form';
        this.form.innerHTML = `
            <div id="common-fields" class="d-flex flex-column gap-1">
                <div class="additional-fields"></div>

                <label class="form-label text-start fw-bold">Мета візиту:</label>
                <input type="text" id="purpose" class="form-control" name="purpose" placeholder="Мета візиту" required>
                <label class="form-label text-start fw-bold">Короткий опис візиту:</label>
                <textarea id="description" class="form-control" row="2" name="description" placeholder="Короткий опис візиту"></textarea>
                <label class="form-label text-start fw-bold">Терміновість:</label>
                <select id="urgency" class='form-select' name="urgency" required>
                    <option value="" selected disabled>Оберіть терміновість</option>
                    <option value="regular">Звичайна</option>
                    <option value="priority">Пріоритетна</option>
                    <option value="urgent">Невідкладна</option>
                </select>
                <label class="form-label text-start fw-bold">Name, surname:</label>
                <input type="text" id="name" class="form-control" name="name" placeholder="ПІБ" required>
            </div>
        `;
        this.title.innerText = 'Запис на прийом до лікаря';
        this.title.className = 'modal-title mb-3';

        this.form.prepend(this.title, this.label, this.select);
        this.form.append(this.submitBtn);

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

            target.querySelectorAll('input').forEach(input => {
                this.body[input.name] = input.value;
            });
            target.querySelectorAll('select').forEach(select => {
                this.body[select.name] = select.value;
            });
            const textarea = target.querySelector('textarea');

            this.body[textarea.name] = textarea.value;
            target.reset();

            if (this.form.classList.contains('post-form')) {
                await postCard(this.body);
            } else {
                const data = await updateCard(this.id, this.body);
                this.form.classList.add('post-form');
                this.column.remove();
                handleProps(data);
            }
        });
    }
}

class ModalEdit extends ModalVisits {
    constructor(id, column, name, doctor, purpose, description, urgency, ...rest) {
        super();
        this.id = id;
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
                    this.form.querySelector('#age-therapist').value = item;
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