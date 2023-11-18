import axios from "axios";
const apiKey = process.env.EXPO_PUBLIC_API_KEY;

const Api = axios.create({
    baseURL: "https://api.weatherapi.com/v1",
    headers: {
        key: 'eaea2de251e24f7ea1f232650230911', 
    }
})

export default Api;