import axios from 'axios'

const instanceAxios = axios.create({
  baseURL: 'http://110.227.208.185/api/practical_1',
})

instanceAxios.interceptors.request.use((req) => {
  const token = localStorage.getItem('Token')
  if (!req.headers.Authorization && token && !req.headers.noAuth) {
    req.headers.Authorization = 'Bearer ' + token
    return req
  }
  return req
}, (err) => Promise.reject(err))


export default instanceAxios
