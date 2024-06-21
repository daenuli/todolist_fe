import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL
const API_PORT = process.env.REACT_APP_API_PORT

const api = axios.create({
    baseURL: `${API_URL}:${API_PORT}/api`,
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.reload('/signin')
        }
        return Promise.reject(error)
    }
)
export default api