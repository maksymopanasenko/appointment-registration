import { CardiologistVisit, DentistVisit, TherapistVisit } from "../classes/visits.js";

function handleCardProps({id, doctor, purpose, description, urgency, name, status, pressure, bmi, disease, age, lastVisit}) {
    if (doctor == 'cardiologist') {
        new CardiologistVisit(id, doctor, purpose, description, urgency, name, status, pressure, bmi, disease, age).render()
    } else if (doctor == 'dentist') {
        new DentistVisit(id, doctor, purpose, description, urgency, name, status, lastVisit).render()
    } else {
        new TherapistVisit(id, doctor, purpose, description, urgency, name, status, age).render();
    }
}

export {handleCardProps as handleProps};