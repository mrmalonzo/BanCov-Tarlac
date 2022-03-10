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
    // return axios.get(`${apiEndpoint}/covid/uploadCurrentData`, data, {
    //     withCredentials: true,
    // });
    return console.log(data);
    //follow http rest, count all the cases, recoveries and deaths
    //figure out what to do with active cases. Subtract the recovies and deaths to the yesterday's active cases???
}


  
const httpServices = {
   adminLogin,
   getCurrentData,
   logoutAdmin,
   uploadCurrentData
  };
  
  export default httpServices;