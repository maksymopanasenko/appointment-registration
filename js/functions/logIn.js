import getToken from "../api/getToken.js";

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