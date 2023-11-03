import axios from "axios";
const apiKey = process.env.EXPO_PUBLIC_API_KEY;

const Api = axios.create({
    baseURL: "https://api.weatherapi.com/v1",
    headers: {
        key: '036fa3aa7906472191c231737232510', 
    }
})

export default Api;