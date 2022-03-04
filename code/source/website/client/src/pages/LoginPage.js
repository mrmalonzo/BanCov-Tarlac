import React, {useState} from "react";
import "../styles/LoginPage.css";
import { Link } from "react-router-dom";
import httpServices from "../services/httpServices.js";
import { message } from "antd";
import 'antd/lib/message/style/index.css';

function LoginPage({userInfo, setUserInfo}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleChange = (e) => {
        if(e.target.name === "email") return setEmail(e.target.value);
        return setPassword(e.target.value);
    }

    const handleSubmit = (e) =>{
        loginAdmin({email, password});
        e.preventDefault();
    }

    const loginAdmin = async (userData) =>{
        try {
            const { data } = await httpServices.adminLogin(userData);
            message.success("Logged in Successfully");
            localStorage.setItem("user", JSON.stringify(data.user));
            window.location = "/main-page";
          } catch (error) {
            message.error(`${error.response.data}`)
          }
    };

    return(
        <div className="login-page">
                <div className="login-div">
                        <h1 className="title-login"><span className="title-1">BanCov </span><span className="title-2">Tarlac</span></h1>
                        <div className="login-username">

                        </div>
                        <form className="login-form" onSubmit={handleSubmit}>
                            <div className="forms">
                                <label className="login-label">Email</label>
                                <br/>
                                <input type="text" name="email" placeholder="Type email here" className="login-input" onChange = {handleChange} value={email} required/>
                                <br/>
                            </div>
                            <div className="forms">
                                <label className="login-label">Password</label>
                                <br/>
                                <input type="password" name="password" placeholder="Type password here" className="login-input" onChange = {handleChange} value={password} required/>
                                <br/>
                            </div>
                            <button type="submit" className="login-admin">LOGIN</button>
                        </form>
                        <p className="forgot-text">Forgot your password? <Link to="/forgot-password" className="forgot-link" ><span className="forgot-password-link">Click here</span></Link></p>
                    </div>
                    <div className="login-intro-div">
                        <div className="login-msg">
                            <h1><span className="login-msg-title">WELCOME<br/>ADMINS</span></h1>
                            <p className="login-msg-p">This is the official website of BanCov Tarlac for uploading Covid-19 related data. Administrators of the application should login on the form given, to have access on the website.</p>
                        </div>
                </div>
        </div>

    );
}

export default LoginPage;