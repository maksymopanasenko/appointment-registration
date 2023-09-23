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