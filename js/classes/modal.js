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

export default ModalLogin;