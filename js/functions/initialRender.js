import getCards from "../api/getCards.js";
import { CardiologistVisit, DentistVisit, TherapistVisit } from "../classes/visits.js";


async function initialRender() {
    const cards = await getCards();
    const rootContainer = document.getElementById('root');
    console.log(cards);
    rootContainer.innerHTML = '';

    if (cards.length !== 0) {
        cards.forEach(({doctor, purpose, description, urgency, name, pressure, bmi, disease, age, lastVisit}) => {
            if (doctor == 'cardiologist') {
                new CardiologistVisit(doctor, purpose, description, urgency, name, pressure, bmi, disease, age).render()
            } else if (doctor == 'dentist') {
                new DentistVisit(doctor, purpose, description, urgency, name, lastVisit).render()
            } else {
                new TherapistVisit(doctor, purpose, description, urgency, name, age).render();
            }
        });
    } else {
        rootContainer.textContent = 'No items have been added';
    }
}


export default initialRender;