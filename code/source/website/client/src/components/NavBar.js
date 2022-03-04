import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css"
import httpServices from "../services/httpServices.js";
import { message } from "antd";
import 'antd/lib/message/style/index.css';

export default function NavBar({userInfo, setUserInfo}){

    async function handleClick(e){
        try {
           await httpServices.logoutAdmin(userInfo);
           message.success("Successfully Logged Out!");
           localStorage.clear();
           setUserInfo("");
          } catch (error) {
            message.error(`${error.response.data}`)
          }
    }

    return(
        <div className="navbar">
            <Link to="/main-page" className="navbar-title"><h1 className="title-login-navbar"><span className="navbar-title-1">BanCov </span><span className="navbar-title-2">Tarlac</span></h1></Link>
           <Link to="/" className="logout-link" onClick={handleClick} ><span className="logout-1">Logout,  </span><span className="logout-2">{userInfo.name}</span></Link>
        </div>
    );
}