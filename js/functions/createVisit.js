
  // Функція для створення об'єкта візиту в залежності від вибраного лікаря
  const createVisit = async (doctor) => {
    const purpose = document.getElementById('purpose').value;
    const description = document.getElementById('description').value;
    const urgency = document.getElementById('urgency').value;
    const name = document.getElementById('name').value;
  
    if (doctor === 'cardiologist') {
      const bloodPressure = document.getElementById('blood-pressure').value;
      const bmi = document.getElementById('bmi').value;
      const heartDisease = document.getElementById('heart-disease').value;
      const age = document.getElementById('age-cardiologist').value;
  
      return new CardiologistVisit(purpose, description, urgency, name, bloodPressure, bmi, heartDisease, age);
    } else if (doctor === 'dentist') {
      const lastVisit = document.getElementById('last-visit').value;
      return new DentistVisit(purpose, description, urgency, name, lastVisit);
    } else if (doctor === 'therapist') {
      const age = document.getElementById('age-therapist').value;
      return new TherapistVisit(purpose, description, urgency, name, age);
    } else {
      return null;
    }
  }


  // Create visits
document.getElementById('create-visit').addEventListener('click', async () => {
    const selectedDoctor = document.getElementById('doctor-select').value;
    const visit = createVisit(selectedDoctor);
  
    if (visit) {
      
      console.log('Створений візит:', visit);
  
      const createdCard = await createCard(visit);
      if (createdCard) {
      
        console.log('Створена карточка:', createdCard);  
      } else {
       
        console.error('Помилка при створенні карточки');
      }
    } else {
      console.error('Невідомий тип лікаря або помилка');
    }
  });