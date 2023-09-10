class Visit {
    constructor(purpose, description, urgency, name) {
      this.purpose = purpose;
      this.description = description;
      this.urgency = urgency;
      this.name = name;
    }
  }
  
  // Клас для кардіолога
  class CardiologistVisit extends Visit {
    constructor(purpose, description, urgency, name, bloodPressure, bmi, heartDisease, age) {
      super(purpose, description, urgency, name);
      this.bloodPressure = bloodPressure;
      this.bmi = bmi;
      this.heartDisease = heartDisease;
      this.age = age;
      this.doctor = 'Кардіолог';
    }
  }
  
  // Клас для стоматолога
  class DentistVisit extends Visit {
    constructor(purpose, description, urgency, name, lastVisit) {
      super(purpose, description, urgency, name);
      this.lastVisit = lastVisit;
      this.doctor = 'Стоматолог';
    }
  }
  
  // Клас для терапевта
  class TherapistVisit extends Visit {
    constructor(purpose, description, urgency, name, age) {
      super(purpose, description, urgency, name);
      this.age = age;
      this.doctor = 'Терапевт';
    }
  }

  export { CardiologistVisit, DentistVisit, TherapistVisit };