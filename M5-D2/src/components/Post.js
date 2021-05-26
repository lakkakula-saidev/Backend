
const Post = async (str1, Data) => {

    const endpoint = + `${process.env.REACT_API_BE_URL}/${str1}`;

    let response
    try {
        response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Data)
        }
        );
        if (response.ok) { /* response = await response.json() */ }
    } catch (error) {
        console.error(error)
        return null
    }

    return response
}



export default Post