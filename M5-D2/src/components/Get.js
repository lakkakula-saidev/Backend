
const Get = async (str1) => {

    const endpoint = `${process.env.REACT_APP_API_URL}/${str1}`;
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