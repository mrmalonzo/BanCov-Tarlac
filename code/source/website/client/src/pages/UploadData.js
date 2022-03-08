import React, { useState } from "react";
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import "../styles/UploadData.css"

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

export default function UploadData({userInfo, setUserInfo}){
    const [covidData, setCovidData] = useState("");

    return(     
        <div className="uploads">
            <NavBar userInfo={userInfo} setUserInfo={setUserInfo}/>
            <div className="uploads-label">
                <h2 className="uploads-title">Upload Covid-19 Data of Tarlac Province</h2>
                <p className="uploads-date"><span className="uploads-today">Today is: </span>{date}</p>
            </div>
            <div className="uploads-main">
                <div className="uploads-main-title">
                    <h2 className="up-main-h2">NEW CASES</h2>
                    <span className="up-main-span">*leave blank if no new cases</span>
                </div>
                <form className="upload-case-form">
                <div className="upload-flex">
                    <div className="section-1">
                        <div className="section-div">
                            <label className="upload-case-label">Anao</label>
                            <input type="text" name="anao" placeholder="ex. 123456789" className="upload-case-input"/>
                        </div>
                        <div className="section-div">
                            <label className="upload-case-label">Bamban</label>
                            <input type="text" name="anao" placeholder="ex. 123456789" className="upload-case-input"/>
                        </div>
                        <div className="section-div">
                            <label className="upload-case-label">Camiling</label>
                            <input type="text" name="anao" placeholder="ex. 123456789" className="upload-case-input"/>
                        </div>
                        <div className="section-div">
                            <label className="upload-case-label">Capas</label>
                            <input type="text" name="anao" placeholder="ex. 123456789" className="upload-case-input"/>
                        </div>
                        <div className="section-div">
                            <label className="upload-case-label">Concepcion</label>
                            <input type="text" name="anao" placeholder="ex. 123456789" className="upload-case-input"/>
                        </div>
                        <div className="section-div">
                            <label className="upload-case-label">Gerona</label>
                            <input type="text" name="anao" placeholder="ex. 123456789" className="upload-case-input"/>
                        </div>
                        <div className="section-div">
                            <label className="upload-case-label">La Paz</label>
                            <input type="text" name="anao" placeholder="ex. 123456789" className="upload-case-input"/>
                        </div>
                        <div className="section-div">
                            <label className="upload-case-label">Mayantoc</label>
                            <input type="text" name="anao" placeholder="ex. 123456789" className="upload-case-input"/>
                        </div>  <div className="section-div">
                            <label className="upload-case-label">Moncada</label>
                            <input type="text" name="anao" placeholder="ex. 123456789" className="upload-case-input"/>
                        </div> 
                    </div>
                    <div className="section-2">
                      
                        <div className="section-div">
                            <label className="upload-case-label">Paniqui</label>
                            <input type="text" name="anao" placeholder="ex. 123456789" className="upload-case-input"/>
                        </div>
                        <div className="section-div">
                            <label className="upload-case-label">Pura</label>
                            <input type="text" name="anao" placeholder="ex. 123456789" className="upload-case-input"/>
                        </div>
                        <div className="section-div">
                            <label className="upload-case-label">Ramos</label>
                            <input type="text" name="anao" placeholder="ex. 123456789" className="upload-case-input"/>
                        </div>
                        <div className="section-div">
                            <label className="upload-case-label">San Clemente</label>
                            <input type="text" name="anao" placeholder="ex. 123456789" className="upload-case-input"/>
                        </div>
                        <div className="section-div">
                            <label className="upload-case-label">San Jose</label>
                            <input type="text" name="anao" placeholder="ex. 123456789" className="upload-case-input"/>
                        </div>
                        <div className="section-div">
                            <label className="upload-case-label">San Manuel</label>
                            <input type="text" name="anao" placeholder="ex. 123456789" className="upload-case-input"/>
                        </div>
                        <div className="section-div">
                            <label className="upload-case-label">Santa Ignacia</label>
                            <input type="text" name="anao" placeholder="ex. 123456789" className="upload-case-input"/>
                        </div>
                        <div className="section-div">
                            <label className="upload-case-label">Tarlac City</label>
                            <input type="text" name="anao" placeholder="ex. 123456789" className="upload-case-input"/>
                        </div>  
                        <div className="section-div">
                            <label className="upload-case-label">Victoria</label>
                            <input type="text" name="anao" placeholder="ex. 123456789" className="upload-case-input"/>
                        </div> 
                    </div>
                    </div>
                    <button type="submit" className="upload-newcases">Proceed to Recoveries - ></button>
                </form>
            </div>
            <Footer />
        </div>
    );
}