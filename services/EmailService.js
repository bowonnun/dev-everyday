import axios from 'axios'
const endpoint = "https://us-central1-karmakamet-backend.cloudfunctions.net/api/"
export const sendEmail = async (data) => {
    try {
        const response = await axios.post(endpoint + "send-email" , data)
        return response
    } catch (err) {
        return err
    }
}