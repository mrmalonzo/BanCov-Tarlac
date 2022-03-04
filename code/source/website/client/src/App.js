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
import ModifyData from "./pages/ModifyData";

function App() {
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    async function getUser(){
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        await setUserInfo(foundUser);
      }
    }
    getUser();
  }, []);

  function checkUser(nextState, replace, next) { //check
    const LoggedUser = localStorage.getItem("user");
    if (!LoggedUser){
      window.location = "/";
    }
    next();
  }

  //user should be logged in to have access to all the pages
  const Pages = (userInfo!==""? 

    <Routes>
      <Route path="/" element={<LandingPage userInfo = {userInfo} setUserInfo={setUserInfo}/>} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/main-page" onEnter={checkUser} element={<MainPage userInfo = {userInfo} setUserInfo={setUserInfo}/>}/>
      <Route path="/manage-admin" element={<ManageAdmin />} />
      <Route path="/upload-data" element={<UploadData />} />
      <Route path="/modify-data" element={<ModifyData />} />
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
