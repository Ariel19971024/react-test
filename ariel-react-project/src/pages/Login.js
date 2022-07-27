import {auth} from "../api/api.js"
import axios from 'axios'
import React ,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
function Login(props){
    const{loadingHandler}=props
    const [formData, setFormData] = useState({account:"",password:""});
    const [validation, setValidation] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);
    const navigate=useNavigate();
    const changeHandler=(e)=>{
        setErrorMsg(false)
        const field=e.target.getAttribute('field');
        setFormData({...formData,...{[field]:e.target.value}});
        let allFilled=Object.keys(formData).every(key=>{
            return formData[key]
        })
        !e.target.value && setValidation(false);
        e.target.value && allFilled && setValidation(true);
    }
    const loginHandler=async()=>{
        try{
            console.log(formData)
            let body={
                email:formData.account,
                password:formData.password,
            }
            loadingHandler.open()
            let res=await auth(body);
            sessionStorage.setItem("token",`bearer ${res.data.auth.access_token}`)
            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.auth.access_token}`;
            navigate("/")
        }catch(e){
           setErrorMsg(true)
           console.log(e)
        }finally{
            loadingHandler.close()
        }
    }
    return(
        <div>
            <div className="content-registry">
                <div className="registry-area">
                    <div className="registry-form">
                        <div className="registry-header">
                            <div className="registry-header-title"><span>Login</span></div>
                        </div>
                        <div className="registry-submit">
                            <div className="form-input required-field">
                                <div className="form-input-title">Email</div>
                                <div className={`form-input-field ${errorMsg?'error-input':''}`}><input type="text" field="account" onChange={changeHandler} /></div>
                            </div>
                            <div className="form-input required-field">
                                <div className="form-input-title">Password</div>
                                <div className={`form-input-field ${errorMsg?'error-input':''}`}><input  field="password" onChange={changeHandler}/></div>
                                {errorMsg?<div className="field-error">Invalid email or password!</div>:null}
                            </div>
                            <div className="form-input">
                                <div className={
                                        validation ? "form-input-field" : "disabled-button"
                                }>
                                    <button onClick={loginHandler} disabled={!validation}>Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;