import React, {useState,useEffect} from 'react';
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LandingPage from "./pages/LoginPage";

function App() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUserInfo(foundUser);
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage userInfo = {userInfo} setUserInfo={setUserInfo}/>} />

        </Routes>   
      </BrowserRouter>

    </div>
  );
}

export default App;
