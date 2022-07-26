import axios from 'axios'
const service = axios.create({
    baseUrl: process.env.NODE_ENV === 'production' ? process.env.PORT : ""
})
service.interceptors.request.use(
    success=>{
        return success;
    },
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