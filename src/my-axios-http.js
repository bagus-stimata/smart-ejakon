import axios from "axios";
import store from '@/store/index.js'

export default axios.create({
    // baseURL: "http://localhost:8080/rest",
    // baseURL: `"${this.$store.getters.getApiBaseUrl}"`,
    baseURL: `${store.getters.getApiBaseUrl}`,
    headers: {
        "Content-type": "application/json"
    }

});