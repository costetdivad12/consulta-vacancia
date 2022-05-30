import axios from 'axios';

const api = axios.create({
    baseURL: 'https://serviciosweb.iebem.edu.mx:7001'
});


export default api;