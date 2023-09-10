
async function createCard() {
    try {
      const response = await axios.post('https://ajax.test-danit.com/api/v2/cards', visitData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      if (response.status === 200) {
        const createdCard = response.data; 
        return createdCard;
      } else {
        console.error('Статус відповіді не 200 OK');
        return null;
      }
    } catch (error) {
      console.error('Помилка при створенні карточки:', error);
      return null;
    }
  }

  export default createCard;