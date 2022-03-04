import React,{useEffect, useState} from 'react';
import "../styles/MainPage.css";
import httpServices from "../services/httpServices.js";
import { message } from "antd";
import 'antd/lib/message/style/index.css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

function MainPage({userInfo, setUserInfo}) {
  const [currentDate, setCurrentDate] = useState("");

  function handleClick(e){
    if(e.target.name === "manage") return window.location = "/manage-admin";
    if(e.target.nem === "upload") return window.location = "/upload-data";
    return window.location = "/modify-data"; //if the modify button was clicked
  }

  useEffect(() => {
    async function getCurrentData(){
      try {
        const { data } = await httpServices.getCurrentData();
        await setCurrentDate(data)
      } catch (error) {
        message.error(`${error.response.data}`)
      }
    }
    getCurrentData();
  }, []);

  return (
    <div className="main-page">
      <NavBar userInfo={userInfo} setUserInfo={setUserInfo}/>
      <div className='hero-banner'>
        <h1 className="hero-banner-title"><span className="hero-banner-welcome">Welcome,  </span><span className="hero-banner-admin">Admin!</span></h1>
      </div>
      <div className='main-content'>
        <div className='main'>
          <h2 className='main-title'>Manage Admin Accounts</h2>
          <button className='manage' name='manage' onClick={handleClick}>MANAGE</button>
        </div>
        <div className='main' >
          <h2 className='main-title' id="main-upload">Upload Covid-19 Data for today</h2>
          <div className='date'>
            <button className='upload' name='upload'  onClick={handleClick}>UPLOAD</button>
            <p className='upload-date'><span className='current-date'>Current Upload Date</span><br></br><span className='current-date-det'>{currentDate.currentDateUploaded}</span></p>
          </div>
        </div>
        <div className='main'>
          <h2 className='main-title'>View/Modify Previous Saved Covid-19 Data</h2>
          <button className='modify' name='modify'  onClick={handleClick}>MODIFY</button>

        </div >
      </div>
      <Footer />
    </div>
  );
}

export default MainPage;
