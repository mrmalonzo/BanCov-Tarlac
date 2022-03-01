import axios from "axios";
const apiEndpoint = "http://localhost:8888";

const adminLogin = (userData) => {
    const data = {email:userData.email, password: userData.password}
    return axios.post(`${apiEndpoint}/admin/login`, data, {
        withCredentials: true,
    });
}

const successLogin = (tokenId) => {
    const data = { tokenId: tokenId };
    return axios.post(`${apiEndpoint}/user/googleLogin`, data, {
      withCredentials: true,
    });
};
  
const httpServices = {
   successLogin,
   adminLogin
  };
  
  export default httpServices;