import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css"


export default function Footer(){

    return(
        <div className="footer">
             <Link to="/main-page" className="navbar-title"><h1 className="footer-title"><span className="footer-title-1">BanCov </span><span className="footer-title-2">Tarlac</span></h1></Link>
             <p className="footer-p">This website is designed and developed by Marlon Malonzo of BSCS UPLB for the Province of Tarlac and for the fulfilment of his Special Problem Curriculum.</p>
             <div className="footer-contact">
                <p className="footer-contact-title">Having a problem? Contact us</p>
                <p className="footer-contact-details">mrmalonzo1@up.edu.ph<br/>09569100953</p>
             </div>
        </div>
    );
}