import api from "../api/setup.js";
export const auth = (body)=>{return api.post("https://g1api.finlogix.com/v1/auth/login/email",body)}
export const getUnLoginList = (params)=>{return api.get("https://g1api.finlogix.com/v1/post/analysis",params)}