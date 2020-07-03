import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://udemy-burger-app-c9f28.firebaseio.com/'
});

export default instance