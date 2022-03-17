import React, { useEffect} from "react";
import "../styles/UploadData.css"
import 'antd/lib/message/style/index.css';
import { message } from "antd";
import httpServices from "../services/httpServices.js";

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
var today = new Date();
var date =  monthNames[(today.getMonth())]+': '+today.getDate()+', '+today.getFullYear();

const newCasesObject = {"anao":0,"bamban":0,"camiling":0,"capas":0,"concepcion":0,"gerona":0,"lapaz":0,"mayantoc":0,"moncada":0,"paniqui":0,"pura":0,"ramos":0,"sanclemente":0, "sanjose":0,"sanmanuel":0,"santaignacia":0,"tarlac":0,"victoria":0,}

export default function UploadComponents({covidCases, setCovidCases, covidRecoveries, setCovidRecoveries, covidDeaths, setCovidDeaths, nextPage, title, proceed}){
    
    useEffect(()=>{ //set covid data to empty for the initial render of the page
        async function initialRender(){
            const reset = "";
            if(title === "NEW CASES") {
                localStorage.removeItem('cases')
                return await setCovidCases(reset);
            }
            if(title === "NEW RECOVERIES"){ 
                localStorage.removeItem('recoveries')
                return await setCovidRecoveries(reset);
            }
            if(title === "NEW DEATHS"){ 
                localStorage.removeItem('deaths')
                return await setCovidDeaths(reset);
            }
        };
        initialRender();
    },[]);

    function onInput(e){
        const name = e.target.name;
        if(isNaN(e.target.value)) return newCasesObject[name] = 0; //if the input box is empty, make it 0
        return newCasesObject[name] = parseInt(e.target.value);
    }

    async function handleSubmit(e){
        if(title === "NEW CASES"){
            localStorage.setItem("cases", JSON.stringify(newCasesObject));
            e.preventDefault();
            window.location = nextPage;
        }else if(title === "NEW RECOVERIES"){
            localStorage.setItem("recoveries", JSON.stringify(newCasesObject));
            e.preventDefault();
            window.location = nextPage;
        }else if(title === "NEW DEATHS"){
            localStorage.setItem("deaths", JSON.stringify(newCasesObject));
            e.preventDefault();
            window.location = nextPage;
        } 
        else { // if this is the final page, then get ready to send the data to the backend
            try{
                e.preventDefault();
                await httpServices.uploadCurrentData({date, covidCases, covidRecoveries, covidDeaths, newCasesObject});
                message.success("Covid Data Uploaded Successfully!")
                window.location = nextPage;
            }catch(error){
                message.error(`${error.response.data}`);
            }
        }
    }

    var color, lineColor;
    if(title === "NEW CASES"){
        color = "#84C9DB"
        lineColor = "#84C9DB"

    }
    else if(title === "NEW RECOVERIES"){
        color = "#FF6961"
        lineColor = "#65C95C"
    } 
    else if (title === "NEW DEATHS"){
        color = "#FFB347"
        lineColor = "#FF6961"
    }else{
        color = "#65C95C"
        lineColor = "#FFB347"
    }

    return(     
        <div className="uploads">
            <div className="uploads-label">
                <h2 className="uploads-title">Upload Covid-19 Data of Tarlac Province</h2>
                <p className="uploads-date"><span className="uploads-today">Today is: </span>{date}</p>
            </div>
            <div className="uploads-main">
                <div className="uploads-main-title">
                    <h2 className="up-main-h2" style={{color: lineColor}}>{title}</h2>
                    <span className="up-main-span">*leave blank if no new cases</span>
                </div>
                <form className="upload-case-form"  onSubmit={handleSubmit}>
                <div className="upload-flex">
                    <div className="section-1">
                        <div className="section-div">
                            <label className="upload-case-label">Anao</label>
                            <input type="number" name="anao" placeholder="ex. 123456789" className="upload-case-input" onChange={onInput} min={0}/>
                        </div>
                        <div className="section-div">
                            <label className="upload-case-label">Bamban</label>
                            <input type="number" name="bamban" placeholder="ex. 123456789" className="upload-case-input" onChange={onInput}  min={0}/>
                        </div>
                        <div className="section-div">
                            <label className="upload-case-label">Camiling</label>
                            <input type="number" name="camiling" placeholder="ex. 123456789" className="upload-case-input" onChange={onInput}  min={0}/>
                        </div>
                        <div className="section-div">
                            <label className="upload-case-label">Capas</label>
                            <input type="number" name="capas" placeholder="ex. 123456789" className="upload-case-input" onChange={onInput}  min={0}/>
                        </div>
                        <div className="section-div">
                            <label className="upload-case-label">Concepcion</label>
                            <input type="number" name="concepcion" placeholder="ex. 123456789" className="upload-case-input" onChange={onInput}  min={0}/>
                        </div>
                        <div className="section-div">
                            <label className="upload-case-label">Gerona</label>
                            <input type="number" name="gerona" placeholder="ex. 123456789" className="upload-case-input" onChange={onInput}  min={0}/>
                        </div>
                        <div className="section-div">
                            <label className="upload-case-label">La Paz</label>
                            <input type="number" name="lapaz" placeholder="ex. 123456789" className="upload-case-input" onChange={onInput}  min={0}/>
                        </div>
                        <div className="section-div">
                            <label className="upload-case-label">Mayantoc</label>
                            <input type="number" name="mayantoc" placeholder="ex. 123456789" className="upload-case-input" onChange={onInput}  min={0}/>
                        </div>  <div className="section-div">
                            <label className="upload-case-label">Moncada</label>
                            <input type="number" name="moncada" placeholder="ex. 123456789" className="upload-case-input" onChange={onInput}  min={0}/>
                        </div> 
                    </div>
                    <div className="section-2">
                      
                        <div className="section-div">
                            <label className="upload-case-label">Paniqui</label>
                            <input type="number" name="paniqui" placeholder="ex. 123456789" className="upload-case-input" onChange={onInput}  min={0}/>
                        </div>
                        <div className="section-div">
                            <label className="upload-case-label">Pura</label>
                            <input type="number" name="pura" placeholder="ex. 123456789" className="upload-case-input" onChange={onInput}  min={0}/>
                        </div>
                        <div className="section-div">
                            <label className="upload-case-label">Ramos</label>
                            <input type="number" name="ramos" placeholder="ex. 123456789" className="upload-case-input" onChange={onInput}  min={0}/>
                        </div>
                        <div className="section-div">
                            <label className="upload-case-label">San Clemente</label>
                            <input type="number" name="sanclemente" placeholder="ex. 123456789" className="upload-case-input" onChange={onInput}  min={0}/>
                        </div>
                        <div className="section-div">
                            <label className="upload-case-label">San Jose</label>
                            <input type="number" name="sanjose" placeholder="ex. 123456789" className="upload-case-input" onChange={onInput}  min={0}/>
                        </div>
                        <div className="section-div">
                            <label className="upload-case-label">San Manuel</label>
                            <input type="number" name="sanmanuel" placeholder="ex. 123456789" className="upload-case-input" onChange={onInput}  min={0}/>
                        </div>
                        <div className="section-div">
                            <label className="upload-case-label">Santa Ignacia</label>
                            <input type="number" name="santaignacia" placeholder="ex. 123456789" className="upload-case-input" onChange={onInput}  min={0}/>
                        </div>
                        <div className="section-div">
                            <label className="upload-case-label">Tarlac City</label>
                            <input type="number" name="tarlac" placeholder="ex. 123456789" className="upload-case-input" onChange={onInput}  min={0}/>
                        </div>  
                        <div className="section-div">
                            <label className="upload-case-label">Victoria</label>
                            <input type="number" name="victoria" placeholder="ex. 123456789" className="upload-case-input" onChange={onInput}  min={0}/>
                        </div> 
                    </div>
                    </div>
                    <button type="submit" className="upload-newcases" style={{backgroundColor:color}}>{proceed}</button>
                </form>
            </div>
        </div>
    );
}