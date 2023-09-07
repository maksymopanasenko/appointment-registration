import getToken from "../api/getToken.js";
const btnlogIn = document.querySelector('#logIn');
const createCard = document.querySelector('#createCard');
const logInForm = document.querySelector('form');
btnlogIn.addEventListener('click', () =>{
    createCard.classList.remove('d-none')
    btnlogIn.classList.add("d-none");
    createCard.classList.add('d-block')
    logInForm.classList.remove('d-none');
    logInForm.classList.add('d-block')
})
function logIn(url, form) {

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const body = {};
        
        e.target.querySelectorAll('input').forEach(input => {
            body[input.name] = input.value; 
        });
        
        try {
            const token = await getToken(url, body);

            localStorage.setItem('token', token);
        } catch(err) {
            console.log(err);
        }
    });
}

export default logIn;