import React from "react";
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import UploadComponents from "../components/UploadComponent";

export default function UploadDeaths({userInfo, setUserInfo, covidCases, setCovidCases, covidRecoveries, setCovidRecoveries}){
    

    return(     
        <div className="uploads">
            <NavBar userInfo={userInfo} setUserInfo={setUserInfo}/>
            <UploadComponents covidCases={covidCases} setCovidCases={setCovidCases} covidRecoveries={covidRecoveries} setCovidRecoveries={setCovidRecoveries} nextPage="/main-page" title ="NEW DEATHS" proceed = "UPLOAD DATA"/>
            <Footer />
        </div>
    );
}