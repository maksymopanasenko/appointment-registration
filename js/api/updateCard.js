async function updateCard(id, body) {
    try {
        const response = await axios.put(`https://ajax.test-danit.com/api/v2/cards/${id}`, body, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.status == 200) {
            return response.data;
        }
    } catch(err) {
        console.log(err);
    }
}

export default updateCard;