import React from "react";
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import UploadComponents from "../components/UploadComponent";

export default function UploadDeaths({userInfo, setUserInfo, covidCases, setCovidCases, covidRecoveries, setCovidRecoveries, covidDeaths, setCovidDeaths}){
    

    return(     
        <div className="uploads">
            <NavBar userInfo={userInfo} setUserInfo={setUserInfo}/>
            <UploadComponents covidCases={covidCases} setCovidCases={setCovidCases} covidRecoveries={covidRecoveries} setCovidRecoveries={setCovidRecoveries} covidDeaths={covidDeaths} setCovidDeaths={setCovidDeaths} nextPage="/upload-active" title ="NEW DEATHS" proceed = "Proceed to Active Cases - >"/>
            <Footer />
        </div>
    );
}