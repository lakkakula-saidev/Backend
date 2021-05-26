
const Get = async (str1) => {
    const apiUrl = process.env.REACT_APP_API_URL
    const endpoint = `${apiUrl}/${str1}`;
    let response
    try {
        response = await fetch(endpoint);
        if (response.ok) {
            response = await response.json();

        }
    } catch (error) {
        console.log(error)
    }

    return response
}


export default Get