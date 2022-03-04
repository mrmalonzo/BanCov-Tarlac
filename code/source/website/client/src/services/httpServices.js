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


  
const httpServices = {
   adminLogin,
   getCurrentData,
   logoutAdmin,
  };
  
  export default httpServices;