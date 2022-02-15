import React, {useState} from "react";
import "./Navbar.scss";
import globe from "../../resources/images/globe.svg";
import { ACTIONS } from "../../utils";

const NavBar = ({isLoggedIn, dispatch}) => {
    const [loginState, setLoginState] = useState({showLogin: false, showError: false});

    function login() {
        // note: get the value from input field instead of changing state to redue number of re-renders
        let username = document.getElementById("username-input").value
        let password = document.getElementById("password-input").value
        if (username === "name" && password==="abc123") {
            setLoginState({showError: false, showLogin: false})
            dispatch({type: ACTIONS.LOGIN})
        } else {
            setLoginState({...loginState, showError: true})
        }
    }

    function logout() {
        setLoginState({showError: false, showLogin: false})
        dispatch({type: ACTIONS.LOGOUT})
    }

    return (
        <div>
            <div className="navbar-wrapper">
                <img className="navbar-logo" alt="" src={globe}/>
                {
                    isLoggedIn? <div className="navbar-login-text"> Hello, name | <span onClick={()=> logout()}> Logout </span></div> :
                    <div onClick={()=> setLoginState({...loginState, showLogin: true})} className="navbar-login-text">
                        Login
                    </div>
                }
            </div>
            {loginState.showLogin && 
                <div className="navbar-login-wrapper"> 
                <input placeholder="Username" id="username-input" className="navbar-login-input"/>
                <input placeholder="Password" id="password-input" type={"password"} className="navbar-login-input"/>
                <div className="navbar-login-btn-wrapper">
                    <div onClick={()=> setLoginState({showError: false, showLogin: false})} className="filled-blue-btn"> Close </div>
                    <div className="filled-blue-btn" onClick={()=> login()}> Login </div>
                </div>
                {loginState.showError && <div className="navbar-error-message"> Oh no something isn't right :(
                </div>}
                </div>}
        </div>
    )
}

export default NavBar;