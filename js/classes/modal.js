class Modal {
    constructor() {
        this.modal = document.createElement('div');
        this.dialog = document.createElement('div');
        this.closeBtn = document.createElement('button');
    }

    createElement() {
        this.modal.classList.add('modal', 'fade', 'show', 'd-block', 'd-flex', 'justify-content-center', 'align-items-center');
        this.dialog.classList.add('modal-dialog', 'position-relative', 'p-4', 'bg-light');
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
        this.content = document.createElement('div');
    }

    createElement() {
        super.createElement();
        this.content.classList.add('modal-content', 'border-0');
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
        this.content = document.createElement('div');
    }
    createElement() {
        super.createElement();
        this.content.classList.add('modal-content', 'border-0');
        this.content.innerHTML = `
        <form id="popup" class="popup">
          
          <h2>Запис на прийом до лікаря</h2>
          <select id="doctor-select">
            <option value="" selected disabled>Выберите врача</option>
            <option value="cardiologist">Кардіолог</option>
            <option value="dentist">Стоматолог</option>
            <option value="therapist">Терапевт</option>
          </select>
          <div id="common-fields" class="visit">
            <input type="text" id="purpose" placeholder="Мета візиту">
            <textarea id="description" placeholder="Короткий опис візиту"></textarea>
            <select id="urgency">
                <option value="" selected disabled>Терміновість</option>
              <option value="звичайна">Звичайна</option>
              <option value="пріоритетна">Пріоритетна</option>
              <option value="невідкладна">Невідкладна</option>
            </select>
            <input type="text" id="name" placeholder="ПІБ">
          </div>
          <div id="cardiologist-fields" class="hidden">
            <input type="text" id="blood-pressure" placeholder="Звичайний тиск">
            <input type="text" id="bmi" placeholder="Індекс маси тіла">
            <input type="text" id="heart-disease" placeholder="Перенесені захворювання серцево-судинної системи">
            <input type="text" id="age-cardiologist" placeholder="Вік">
          </div>
          <div id="dentist-fields" class="hidden">
            <label for="last-visit">Дата останнього відвідування</label>
            <input type="date" id="last-visit" placeholder="Дата останнього відвідування">
          </div>
          <div id="therapist-fields" class="hidden">
            <input type="text" id="age-therapist" placeholder="Вік">
          </div>
          <button id="create-visit">Створити</button>
       
      </form>
      `;
      this.dialog.prepend(this.content);
    }

}



export { ModalLogin, ModalVisits };
