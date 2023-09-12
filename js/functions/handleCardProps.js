import { CardiologistVisit, DentistVisit, TherapistVisit } from "../classes/visits.js";

function handleCardProps({id, doctor, purpose, description, urgency, name, pressure, bmi, disease, age, lastVisit}) {
    if (doctor == 'cardiologist') {
        new CardiologistVisit(id, doctor, purpose, description, urgency, name, pressure, bmi, disease, age).render()
    } else if (doctor == 'dentist') {
        new DentistVisit(id, doctor, purpose, description, urgency, name, lastVisit).render()
    } else {
        new TherapistVisit(id, doctor, purpose, description, urgency, name, age).render();
    }
}

export {handleCardProps as handleProps};