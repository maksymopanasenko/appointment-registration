async function getToken(url, body) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const result = await response.text()
    
        if(response.status !== 200) {
            throw new Error(result);
        } else {
            return result;
        }
    } catch(err) {
        alert(err);
    }
}

export default getToken;