import axios from 'axios'
const service = axios.create({
    baseURL: "https://g1api.finlogix.com/v1",  
})
const addConfigBeforeRequest = (config) => {
    config.headers = { ...config.headers, Authorization: sessionStorage.getItem("token") }
    return config;
}
service.interceptors.request.use(
    addConfigBeforeRequest,
    err=>{
        alert("Error");
        return err;
    }
)
service.interceptors.response.use(
    res=>{
        console.log(res)
        return res;
    },
    err=>{
        // alert(err.response.data.message)
        return err ;
    }
)
export default service