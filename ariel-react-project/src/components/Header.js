import { NavLink,useLocation } from "react-router-dom";
function Header(){
    const location=useLocation().pathname;
    console.log(location)
    const logOutHandler=()=>{
        sessionStorage.clear();
        window.location.reload();
    }
    return(
        <div className="content-header">
            <div className="frame-logo"></div>
            <div className="frame-buttons">
                { location ==='/login'?<NavLink to="/"><button className="frame-button frame-button-custom">Homepage</button></NavLink>:null}
                {(location ==='/' && !sessionStorage.getItem('token'))?<NavLink to="/login"><button className="frame-button frame-button-entry">Login</button></NavLink>:null}
                {sessionStorage.getItem('token')?<button className="frame-button frame-button-entry" onClick={logOutHandler}>Logout</button>:null}
            </div>
        </div>
    )
}
export default Header;