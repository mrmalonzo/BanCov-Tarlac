import axios from "axios";
const apiEndpoint = "http://localhost:8888";

const adminLogin = (userData) => {
    const data = {email:userData.email, password: userData.password}
    return axios.post(`${apiEndpoint}/admin/login`, data, {
        withCredentials: true,
    });
}

const logoutAdmin = (data) =>{
    return axios.post(`${apiEndpoint}/admin/logout`, data, {
        withCredentials: true,
    });
}

const getCurrentData = () => {
    return axios.get(`${apiEndpoint}/covid/viewCurrentData`);
}

const uploadCurrentData = (data) => {
    const covidData = {"currentDateUploaded": data.date,
     "currentNewCasesBreakdown": data.covidCases,
      "currentRecoveriesBreakdown": data.covidRecoveries, 
      "currentDeathsBreakdown": data.covidDeaths,
       "overallActiveCasesBreakdown": data.newCasesObject }
    return axios.put(`${apiEndpoint}/covid/uploadCurrentData`, covidData, {
        withCredentials: true,
    });
}


  
const httpServices = {
   adminLogin,
   getCurrentData,
   logoutAdmin,
   uploadCurrentData
  };
  
  export default httpServices;