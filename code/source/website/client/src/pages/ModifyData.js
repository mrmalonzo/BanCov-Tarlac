import React, {useState, useEffect} from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import "../styles/ModifyData.css"
import httpServices from "../services/httpServices";
import 'antd/lib/message/style/index.css';
import { message } from "antd";

export default function ModifyData({userInfo, setUserInfo}){
    const [mainData, setMainData] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function viewMainData(){
            setLoading(true);
            try{
                const {data} = await httpServices.viewAllData();
                setMainData(data);
            }catch (error) {
                console.error(error.message);
              }
              setLoading(false);
        }
        viewMainData();
    }, []);

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            console.log(mainData)
            await httpServices.updateData(mainData);
            message.success("Covid Data Updated Successfully!")
            // window.location = "main-page";
        }catch(error){
            message.error(`${error.response.data}`);
        }
    } 

    const onChange = async(e) =>{ //handles the change for the non-nested attributes
        setMainData(prevState => ({
            ...prevState,
            [e.target.name]: parseInt(e.target.value)
        }));
    } 

    const onChangeActive = async(e) =>{ //handles the change for the nested attributes
        setMainData(prevState => ({
            ...prevState,
            overallActiveCasesBreakdown: {
                ...prevState.overallActiveCasesBreakdown,
                [e.target.name]:parseInt( e.target.value)
              }
        }));
    } 

    const onChangeCases = async(e) =>{ //handles the change for the nested attributes
        setMainData(prevState => ({
            ...prevState,
            currentNewCasesBreakdown: {
                ...prevState.currentNewCasesBreakdown,
                [e.target.name]: parseInt(e.target.value)
              }
        }));
    } 

    const onChangeRecov = async(e) =>{ //handles the change for the nested attributes
        setMainData(prevState => ({
            ...prevState,
            currentRecoveriesBreakdown: {
                ...prevState.currentRecoveriesBreakdown,
                [e.target.name]: parseInt(e.target.value)
              }
        }));
    } 

    const onChangeDeath = async(e) =>{ //handles the change for the nested attributes
        setMainData(prevState => ({
            ...prevState,
            currentDeathsBreakdown: {
                ...prevState.currentDeathsBreakdown,
                [e.target.name]: parseInt(e.target.value)
              }
        }));
    } 

    return(
        <div className="modify-data-main">
            <NavBar  userInfo={userInfo} setUserInfo={setUserInfo}/>
            {!loading && 
                // <h2>{mainData.overallDeaths}</h2>
                <div className="main-data">
                    <h2 className="main-data-title">View/Modify the <span className="main-data-green">Covid-19 Data</span> in the <span className="main-data-blue">Province</span></h2>
                    {/* <p className="uploads-date"><span className="uploads-today">Upload Date: </span>{()=>{var today = new Date(mainData.currentDateUploaded);var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(); return date}}</p> */}
                    <form className="main-data-form"  onSubmit={handleSubmit}>
                    <div className="form-topmost">
                    <div>
                        <div className="general-data-div">
                        <label className="general-data-label">Active Cases: </label>
                        <input type="number" name="overallActiveCases" value={mainData.overallActiveCases} className="general-data-input" min={0} onChange={onChange}/>

                        </div>
                        <div className="general-data-div">
                        <label className="general-data-label">Total Recoveries: </label>
                        <input type="number" name="overallRecoveries" value={mainData.overallRecoveries} className="general-data-input" min={0} onChange={onChange}/>

                        </div>
                        <div className="general-data-div">
                        <label className="general-data-label">Total Deaths: </label>
                        <input type="number" name="overallDeaths" value={mainData.overallDeaths} className="general-data-input" min={0} onChange={onChange}/>

                        </div>
                    </div>
                    <div>
                    <div className="general-data-div">
                        <label className="general-data-label">New Cases: </label>
                        <input type="number" name="currentTotalNewCases" value={mainData.currentTotalNewCases} className="general-data-input" min={0} onChange={onChange}/>

                        </div>
                        <div className="general-data-div">
                        <label className="general-data-label">New Recoveries: </label>
                        <input type="number" name="currentTotalRecoveries" value={mainData.currentTotalRecoveries} className="general-data-input" min={0} onChange={onChange}/>

                        </div>
                        <div className="general-data-div">
                        <label className="general-data-label">New Deaths: </label>
                        <input type="number" name="currentTotalDeaths" value={mainData.currentTotalDeaths} className="general-data-input" min={0} onChange={onChange}/>
                        </div>
                    </div>
            </div>

            <div className="form-middle">
            <div className="general-data-table-main-2">
            <label className="general-data-label-title">New Cases Breakdown: </label>
                    <div className="general-data-table">
                        <div className="general-section">
                            <div className="general-section-div">
                                <label className="general-label">Anao</label>
                                <input type="number" name="anao"  className="general-input" onChange={onChangeCases} value={mainData.currentNewCasesBreakdown.anao}min={0}/>
                            </div>
                            <div className="general-section-div">
                                <label className="general-label">Bamban</label>
                                <input type="number" name="bamban"  className="general-input" onChange={onChangeCases} value={mainData.currentNewCasesBreakdown.bamban} min={0}/>
                            </div>
                            <div className="general-section-div">
                                <label className="general-label">Camiling</label>
                                <input type="number" name="camiling"  className="general-input" onChange={onChangeCases} value={mainData.currentNewCasesBreakdown.camiling} min={0}/>
                            </div>
                            <div className="general-section-div">
                                <label className="general-label">Capas</label>
                                <input type="number" name="capas"  className="general-input" onChange={onChangeCases} value={mainData.currentNewCasesBreakdown.capas} min={0}/>
                            </div>
                            <div className="general-section-div">
                                <label className="general-label">Concepcion</label>
                                <input type="number" name="concepcion"  className="general-input" onChange={onChangeCases} value={mainData.currentNewCasesBreakdown.concepcion} min={0}/>
                            </div>
                            <div className="general-section-div">
                                <label className="general-label">Gerona</label>
                                <input type="number" name="gerona"  className="general-input" onChange={onChangeCases} value={mainData.currentNewCasesBreakdown.gerona} min={0}/>
                            </div>
                            <div className="general-section-div">
                                <label className="general-label">La Paz</label>
                                <input type="number" name="lapaz"  className="general-input" onChange={onChangeCases} value={mainData.currentNewCasesBreakdown.lapaz} min={0}/>
                            </div>
                            <div className="general-section-div">
                                <label className="general-label">Mayantoc</label>
                                <input type="number" name="mayantoc"  className="general-input" onChange={onChangeCases} value={mainData.currentNewCasesBreakdown.mayantoc} min={0}/>
                            </div>  <div className="general-section-div">
                                <label className="general-label">Moncada</label>
                                <input type="number" name="moncada"  className="general-input" onChange={onChangeCases} value={mainData.currentNewCasesBreakdown.moncada} min={0}/>
                            </div> 
                        </div>
                        <div className="general-section">
                            <div className="general-section-div">
                                <label className="general-label">Paniqui</label>
                                <input type="number" name="paniqui"  className="general-input" onChange={onChangeCases} value={mainData.currentNewCasesBreakdown.paniqui} min={0}/>
                            </div>
                            <div className="general-section-div">
                                <label className="general-label">Pura</label>
                                <input type="number" name="pura"  className="general-input" onChange={onChangeCases} value={mainData.currentNewCasesBreakdown.pura} min={0}/>
                            </div>
                            <div className="general-section-div">
                                <label className="general-label">Ramos</label>
                                <input type="number" name="ramos"  className="general-input" onChange={onChangeCases} value={mainData.currentNewCasesBreakdown.ramos} min={0}/>
                            </div>
                            <div className="general-section-div">
                                <label className="general-label">San Clemente</label>
                                <input type="number" name="sanclemente"  className="general-input" onChange={onChangeCases} value={mainData.currentNewCasesBreakdown.sanclemente} min={0}/>
                            </div>
                            <div className="general-section-div">
                                <label className="general-label">San Jose</label>
                                <input type="number" name="sanjose"  className="general-input" onChange={onChangeCases} value={mainData.currentNewCasesBreakdown.sanjose} min={0}/>
                            </div>
                            <div className="general-section-div">
                                <label className="general-label">San Manuel</label>
                                <input type="number" name="sanmanuel"  className="general-input" onChange={onChangeCases} value={mainData.currentNewCasesBreakdown.sanmanuel} min={0}/>
                            </div>
                            <div className="general-section-div">
                                <label className="general-label">Santa Ignacia</label>
                                <input type="number" name="santaignacia"  className="general-input" onChange={onChangeCases} value={mainData.currentNewCasesBreakdown.santaignacia} min={0}/>
                            </div>
                            <div className="general-section-div">
                                <label className="general-label">Tarlac City</label>
                                <input type="number" name="tarlac"  className="general-input" onChange={onChangeCases} value={mainData.currentNewCasesBreakdown.tarlac} min={0}/>
                            </div>  
                            <div className="general-section-div">
                                <label className="general-label">Victoria</label>
                                <input type="number" name="victoria"  className="general-input" onChange={onChangeCases} value={mainData.currentNewCasesBreakdown.victoria} min={0}/>
                            </div> 
                        </div>
                    </div>
                </div>
                    
                    <div className="general-data-table-main-2">
                        <label className="general-data-label-title">Active Cases Breakdown: </label>
                        <div className="general-data-table">
                            <div className="general-section">
                                <div className="general-section-div">
                                    <label className="general-label">Anao</label>
                                    <input type="number" name="anao"  className="general-input" onChange={onChangeActive} value={mainData.overallActiveCasesBreakdown.anao}min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">Bamban</label>
                                    <input type="number" name="bamban"  className="general-input" onChange={onChangeActive} value={mainData.overallActiveCasesBreakdown.bamban} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">Camiling</label>
                                    <input type="number" name="camiling"  className="general-input" onChange={onChangeActive} value={mainData.overallActiveCasesBreakdown.camiling} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">Capas</label>
                                    <input type="number" name="capas"  className="general-input" onChange={onChangeActive} value={mainData.overallActiveCasesBreakdown.capas} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">Concepcion</label>
                                    <input type="number" name="concepcion"  className="general-input" onChange={onChangeActive} value={mainData.overallActiveCasesBreakdown.concepcion} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">Gerona</label>
                                    <input type="number" name="gerona"  className="general-input" onChange={onChangeActive} value={mainData.overallActiveCasesBreakdown.gerona} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">La Paz</label>
                                    <input type="number" name="lapaz"  className="general-input" onChange={onChangeActive} value={mainData.overallActiveCasesBreakdown.lapaz} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">Mayantoc</label>
                                    <input type="number" name="mayantoc"  className="general-input" onChange={onChangeActive} value={mainData.overallActiveCasesBreakdown.mayantoc} min={0}/>
                                </div>  <div className="general-section-div">
                                    <label className="general-label">Moncada</label>
                                    <input type="number" name="moncada"  className="general-input" onChange={onChangeActive} value={mainData.overallActiveCasesBreakdown.moncada} min={0}/>
                                </div> 
                            </div>
                            <div className="general-section">
                                <div className="general-section-div">
                                    <label className="general-label">Paniqui</label>
                                    <input type="number" name="paniqui"  className="general-input" onChange={onChangeActive} value={mainData.overallActiveCasesBreakdown.paniqui} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">Pura</label>
                                    <input type="number" name="pura"  className="general-input" onChange={onChangeActive} value={mainData.overallActiveCasesBreakdown.pura} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">Ramos</label>
                                    <input type="number" name="ramos"  className="general-input" onChange={onChangeActive} value={mainData.overallActiveCasesBreakdown.ramos} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">San Clemente</label>
                                    <input type="number" name="sanclemente"  className="general-input" onChange={onChangeActive} value={mainData.overallActiveCasesBreakdown.sanclemente} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">San Jose</label>
                                    <input type="number" name="sanjose"  className="general-input" onChange={onChangeActive} value={mainData.overallActiveCasesBreakdown.sanjose} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">San Manuel</label>
                                    <input type="number" name="sanmanuel"  className="general-input" onChange={onChangeActive} value={mainData.overallActiveCasesBreakdown.sanmanuel} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">Santa Ignacia</label>
                                    <input type="number" name="santaignacia"  className="general-input" onChange={onChangeActive} value={mainData.overallActiveCasesBreakdown.santaignacia} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">Tarlac City</label>
                                    <input type="number" name="tarlac"  className="general-input" onChange={onChangeActive} value={mainData.overallActiveCasesBreakdown.tarlac} min={0}/>
                                </div>  
                                <div className="general-section-div">
                                    <label className="general-label">Victoria</label>
                                    <input type="number" name="victoria"  className="general-input" onChange={onChangeActive} value={mainData.overallActiveCasesBreakdown.victoria} min={0}/>
                                </div> 
                            </div>
                    </div>
                </div>
            </div>

            <div className="form-middle">
            <div className="general-data-table-main-2">
                        <label className="general-data-label-title">New Recoveries Breakdown: </label>
                        <div className="general-data-table">
                            <div className="general-section">
                                <div className="general-section-div">
                                    <label className="general-label">Anao</label>
                                    <input type="number" name="anao"  className="general-input" onChange={onChangeRecov} value={mainData.currentRecoveriesBreakdown.anao}min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">Bamban</label>
                                    <input type="number" name="bamban"  className="general-input" onChange={onChangeRecov} value={mainData.currentRecoveriesBreakdown.bamban} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">Camiling</label>
                                    <input type="number" name="camiling"  className="general-input" onChange={onChangeRecov} value={mainData.currentRecoveriesBreakdown.camiling} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">Capas</label>
                                    <input type="number" name="capas"  className="general-input" onChange={onChangeRecov} value={mainData.currentRecoveriesBreakdown.capas} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">Concepcion</label>
                                    <input type="number" name="concepcion"  className="general-input" onChange={onChangeRecov} value={mainData.currentRecoveriesBreakdown.concepcion} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">Gerona</label>
                                    <input type="number" name="gerona"  className="general-input" onChange={onChangeRecov} value={mainData.currentRecoveriesBreakdown.gerona} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">La Paz</label>
                                    <input type="number" name="lapaz"  className="general-input" onChange={onChangeRecov} value={mainData.currentRecoveriesBreakdown.lapaz} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">Mayantoc</label>
                                    <input type="number" name="mayantoc"  className="general-input" onChange={onChangeRecov} value={mainData.currentRecoveriesBreakdown.mayantoc} min={0}/>
                                </div>  <div className="general-section-div">
                                    <label className="general-label">Moncada</label>
                                    <input type="number" name="moncada"  className="general-input" onChange={onChangeRecov} value={mainData.currentRecoveriesBreakdown.moncada} min={0}/>
                                </div> 
                            </div>
                            <div className="general-section">
                                <div className="general-section-div">
                                    <label className="general-label">Paniqui</label>
                                    <input type="number" name="paniqui"  className="general-input" onChange={onChangeRecov} value={mainData.currentRecoveriesBreakdown.paniqui} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">Pura</label>
                                    <input type="number" name="pura"  className="general-input" onChange={onChangeRecov} value={mainData.currentRecoveriesBreakdown.pura} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">Ramos</label>
                                    <input type="number" name="ramos"  className="general-input" onChange={onChangeRecov} value={mainData.currentRecoveriesBreakdown.ramos} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">San Clemente</label>
                                    <input type="number" name="sanclemente"  className="general-input" onChange={onChangeRecov} value={mainData.currentRecoveriesBreakdown.sanclemente} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">San Jose</label>
                                    <input type="number" name="sanjose"  className="general-input" onChange={onChangeRecov} value={mainData.currentRecoveriesBreakdown.sanjose} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">San Manuel</label>
                                    <input type="number" name="sanmanuel"  className="general-input" onChange={onChangeRecov} value={mainData.currentRecoveriesBreakdown.sanmanuel} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">Santa Ignacia</label>
                                    <input type="number" name="santaignacia"  className="general-input" onChange={onChangeRecov} value={mainData.currentRecoveriesBreakdown.santaignacia} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">Tarlac City</label>
                                    <input type="number" name="tarlac"  className="general-input" onChange={onChangeRecov} value={mainData.currentRecoveriesBreakdown.tarlac} min={0}/>
                                </div>  
                                <div className="general-section-div">
                                    <label className="general-label">Victoria</label>
                                    <input type="number" name="victoria"  className="general-input" onChange={onChangeRecov} value={mainData.currentRecoveriesBreakdown.victoria} min={0}/>
                                </div> 
                            </div>
                    </div>
                </div>
                    
                    <div className="general-data-table-main-2">
                        <label className="general-data-label-title">New Deaths Breakdown: </label>
                        <div className="general-data-table">
                            <div className="general-section">
                                <div className="general-section-div">
                                    <label className="general-label">Anao</label>
                                    <input type="number" name="anao"  className="general-input" onChange={onChangeDeath} value={mainData.currentDeathsBreakdown.anao}min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">Bamban</label>
                                    <input type="number" name="bamban"  className="general-input" onChange={onChangeDeath} value={mainData.currentDeathsBreakdown.bamban} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">Camiling</label>
                                    <input type="number" name="camiling"  className="general-input" onChange={onChangeDeath} value={mainData.currentDeathsBreakdown.camiling} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">Capas</label>
                                    <input type="number" name="capas"  className="general-input" onChange={onChangeDeath} value={mainData.currentDeathsBreakdown.capas} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">Concepcion</label>
                                    <input type="number" name="concepcion"  className="general-input" onChange={onChangeDeath} value={mainData.currentDeathsBreakdown.concepcion} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">Gerona</label>
                                    <input type="number" name="gerona"  className="general-input" onChange={onChangeDeath} value={mainData.currentDeathsBreakdown.gerona} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">La Paz</label>
                                    <input type="number" name="lapaz"  className="general-input" onChange={onChangeDeath} value={mainData.currentDeathsBreakdown.lapaz} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">Mayantoc</label>
                                    <input type="number" name="mayantoc"  className="general-input" onChange={onChangeDeath} value={mainData.currentDeathsBreakdown.mayantoc} min={0}/>
                                </div>  <div className="general-section-div">
                                    <label className="general-label">Moncada</label>
                                    <input type="number" name="moncada"  className="general-input" onChange={onChangeDeath} value={mainData.currentDeathsBreakdown.moncada} min={0}/>
                                </div> 
                            </div>
                            <div className="general-section">
                                <div className="general-section-div">
                                    <label className="general-label">Paniqui</label>
                                    <input type="number" name="paniqui"  className="general-input" onChange={onChangeDeath} value={mainData.currentDeathsBreakdown.paniqui} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">Pura</label>
                                    <input type="number" name="pura"  className="general-input" onChange={onChangeDeath} value={mainData.currentDeathsBreakdown.pura} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">Ramos</label>
                                    <input type="number" name="ramos"  className="general-input" onChange={onChangeDeath} value={mainData.currentDeathsBreakdown.ramos} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">San Clemente</label>
                                    <input type="number" name="sanclemente"  className="general-input" onChange={onChangeDeath} value={mainData.currentDeathsBreakdown.sanclemente} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">San Jose</label>
                                    <input type="number" name="sanjose"  className="general-input" onChange={onChangeDeath} value={mainData.currentDeathsBreakdown.sanjose} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">San Manuel</label>
                                    <input type="number" name="sanmanuel"  className="general-input" onChange={onChangeDeath} value={mainData.currentDeathsBreakdown.sanmanuel} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">Santa Ignacia</label>
                                    <input type="number" name="santaignacia"  className="general-input" onChange={onChangeDeath} value={mainData.currentDeathsBreakdown.santaignacia} min={0}/>
                                </div>
                                <div className="general-section-div">
                                    <label className="general-label">Tarlac City</label>
                                    <input type="number" name="tarlac"  className="general-input" onChange={onChangeDeath} value={mainData.currentDeathsBreakdown.tarlac} min={0}/>
                                </div>  
                                <div className="general-section-div">
                                    <label className="general-label">Victoria</label>
                                    <input type="number" name="victoria"  className="general-input" onChange={onChangeDeath} value={mainData.currentDeathsBreakdown.victoria} min={0}/>
                                </div> 
                            </div>
                    </div>
                </div>
            </div>


                    
                    <button type="submit" className="main-data-button" >Updata Data</button>

                    </form>
                </div>
            }
            <Footer/>
        </div>
    );
}