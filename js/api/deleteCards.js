async function deleteCards(id){
    try{
        const response = await fetch(`http://ajax.test-danit.com/api/v2/cards/${id}`,{
            method: 'DELETE'
        })
        const result = await response.text()
    
        if(response.status !== 200) {
            throw new Error(result);
        } else {
            return result;
        }
    }catch (error) {
        console.log('Error:', error.message);
    }
}
export default deleteCards;