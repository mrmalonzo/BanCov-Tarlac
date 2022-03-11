import React, {useState,useEffect} from 'react';
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LandingPage from "./pages/LoginPage";
import MainPage from './pages/MainPage';
import ForgotPassword from './pages/ForgotPassword';
import ManageAdmin from "./pages/ManageAdmin";
import UploadData from "./pages/UploadData";
import UploadRecoveries from "./pages/UploadRecoveries";
import UploadDeaths from "./pages/UploadDeaths"
import ModifyData from "./pages/ModifyData";
import UploadActive from './pages/UploadActive';

function App() {
  const [userInfo, setUserInfo] = useState("");
  const [covidCases, setCovidCases] = useState("");
  const [covidRecoveries, setCovidRecoveries] = useState("");
  const [covidDeaths, setCovidDeaths] = useState("");


  useEffect(() => {
    async function getUser(){
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        await setUserInfo(foundUser);
      }
    }

    async function setData(){
      const cases = localStorage.getItem("cases");
      const recoveries = localStorage.getItem("recoveries");
      const deaths = localStorage.getItem("deaths");

      if(cases){
        await setCovidCases(JSON.parse(cases));
      }
      if(recoveries){
        await setCovidRecoveries(JSON.parse(recoveries));
      }
      if(deaths){
        await setCovidDeaths(JSON.parse(deaths));
      }
    }
    getUser();
    setData();
  }, []);



  //user should be logged in to have access to all the pages
  const Pages = (userInfo!==""? 

    <Routes>
      <Route path="/" element={<LandingPage userInfo = {userInfo} setUserInfo={setUserInfo}/>} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/main-page" element={<MainPage userInfo = {userInfo} setUserInfo={setUserInfo}/>}/>
      
      <Route path="/manage-admin" element={<ManageAdmin userInfo = {userInfo} setUserInfo={setUserInfo} />} />
      
      <Route path="/upload-data" element={<UploadData userInfo = {userInfo} setUserInfo={setUserInfo} covidCases={covidCases} setCovidCases={setCovidCases} covidRecoveries={covidRecoveries} setCovidRecoveries={setCovidRecoveries} covidDeaths={covidDeaths} setCovidDeaths={setCovidDeaths} />} />
      <Route path="/upload-recoveries" element={<UploadRecoveries userInfo = {userInfo} setUserInfo={setUserInfo} covidCases={covidCases} setCovidCases={setCovidCases} covidRecoveries={covidRecoveries} setCovidRecoveries={setCovidRecoveries} covidDeaths={covidDeaths} setCovidDeaths={setCovidDeaths}/>} />
      <Route path="/upload-deaths" element={<UploadDeaths userInfo = {userInfo} setUserInfo={setUserInfo} covidCases={covidCases} setCovidCases={setCovidCases} covidRecoveries={covidRecoveries} setCovidRecoveries={setCovidRecoveries} covidDeaths={covidDeaths} setCovidDeaths={setCovidDeaths}/>} />
      <Route path="/upload-active" element={<UploadActive userInfo = {userInfo} setUserInfo={setUserInfo} covidCases={covidCases} setCovidCases={setCovidCases} covidRecoveries={covidRecoveries} setCovidRecoveries={setCovidRecoveries} covidDeaths={covidDeaths} setCovidDeaths={setCovidDeaths}/>} />
      
      <Route path="/modify-data" element={<ModifyData userInfo = {userInfo} setUserInfo={setUserInfo} />} />
    </Routes>   
  :

    <Routes>
      <Route path="/" element={<LandingPage userInfo = {userInfo} setUserInfo={setUserInfo}/>} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>   

)

  return (
    <div className="App">
        <BrowserRouter>
        {Pages}
        </BrowserRouter>
    </div>
  );
}

export default App;
