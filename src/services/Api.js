import axios from "axios";
const apiKey = process.env.EXPO_PUBLIC_API_KEY;

const Api = axios.create({
    baseURL: "https://api.weatherapi.com/v1",
    headers: {
        key: apiKey
    }
})

export default Api;