import api from "../api/setup.js";
export const auth = (body)=>{return api.post("/auth/login/email",body)}
export const getUnLoginList = (params)=>{return api.get("/post/analysis",params)}
export const getLoginList = (params)=>{return api.get("/me/user/favourite/post-analysis",params)}