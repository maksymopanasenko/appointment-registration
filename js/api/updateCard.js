
async function updateCard(id, body) {
    const response = await axios.put(`https://ajax.test-danit.com/api/v2/cards/${id}`, body, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (response.status == 200) {
        document.querySelector('.modal').remove();
        return response.data;
    }
}

export default updateCard;