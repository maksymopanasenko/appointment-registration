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
        this.dialog.classList.add('modal-dialog', 'position-relative', 'p-4', 'bg-light');
        this.content.classList.add('modal-content', 'border-0');
        this.dialog.style.pointerEvents = 'all';
        this.closeBtn.classList.add('btn-close', 'position-absolute', 'top-0', 'end-0');
        this.dialog.append(this.closeBtn);
        this.modal.append(this.dialog);

        this.closeModal();
    }

    closeModal() {
        this.modal.addEventListener('click', (e) => {
            if (e.target == this.modal || e.target == this.closeBtn) {
                this.modal.classList.add('d-none');
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
        this.select = document.createElement('select');
        this.form = document.createElement('form');
        this.title = document.createElement('h2');
        this.confirmBtn = document.createElement('button');
    }

    createElement() {
        super.createElement();
        this.select.innerHTML = `
            <option value="" selected disabled>Выберите врача</option>
            <option value="cardiologist">Кардіолог</option>
            <option value="dentist">Стоматолог</option>
            <option value="therapist">Терапевт</option>
        `;

        this.confirmBtn.innerText = 'Створити';

        this.form.className = 'popup';
        this.form.innerHTML = `
            <div id="common-fields" class="visit">
                <input type="text" id="purpose" placeholder="Мета візиту" required>
                <textarea id="description" placeholder="Короткий опис візиту"></textarea>
                <select id="urgency">
                    <option value="" selected disabled>Терміновість</option>
                    <option value="звичайна">Звичайна</option>
                    <option value="пріоритетна">Пріоритетна</option>
                    <option value="невідкладна">Невідкладна</option>
                </select>
                <input type="text" id="name" placeholder="ПІБ" required>
            </div>
            <div class="additional-fields"></div>
        `;
        this.title.innerText = 'Запис на прийом до лікаря';
        this.form.prepend(this.title, this.select);
        this.form.append(this.confirmBtn);

        this.content.append(this.form);
        this.dialog.prepend(this.content);
        this.onSelect();
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
}

export { ModalLogin, ModalVisits };
