import { CardiologistVisit, DentistVisit, TherapistVisit } from "../classes/visits.js";
import { handleProps } from "../functions/handleCardProps.js";

async function postCard(body) {
    try {
        const response = await axios.post('https://ajax.test-danit.com/api/v2/cards', body, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.status === 200) {
            document.querySelector('.modal').remove();
            
            handleProps(response.data);
        } else {
            throw new Error('Статус відповіді не 200 OK');
        }
    } catch (error) {
        console.log('Помилка при створенні карточки:', error.message);
    }
}

export default postCard;


// const arr = [
//     {doctor: 'therapist', purpose: 'nose', visit: 'extra', descr: 'Lorem ipsum', some: 'Lorem ipsum'},
//     {doctor: 'dentist', purpose: 'teeth', visit: 'normal'}
// ];

// class Doctor {
//     constructor({ doctor, purpose, visit, ...rest }) {
//         this.doctor = doctor;
//         this.purpose = purpose;
//         this.visit = visit;
//         // You can access additional properties through the 'rest' object
//         this.additionalProps = rest;
//     }

//     render() {
//         let html = `
//             <p>${this.doctor}</p>
//             <p>${this.purpose}</p>
//             <p>${this.visit}</p>
//         `;

//         if (Object.values(this.additionalProps).length > 0) {
//             Object.values(this.additionalProps).forEach(item => {
//                 html = html + `<p>${item}</p>`;
//             })
//         }

//         return html;
//     }
// }

// arr.forEach(({ doctor, purpose, visit, ...rest }) => {
//     console.log(new Doctor({ doctor, purpose, visit, ...rest }).render());
// });