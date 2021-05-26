async function FormDataPost(Data, _id, string_1, string_2) {
    const endpoint = `${process.env.REACT_API_BE_URL}/${string_1}/${_id}/${string_2}`;

    try {
        let response = await fetch(endpoint, {
            method: "POST",
            body: Data,
        });
        if (response.ok) {
            console.log("Your File is posted");
        }
    } catch (error) {
        return alert(error);
    }
}

export default FormDataPost;
