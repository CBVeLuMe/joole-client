// User Service retrieves user information from server.
import axios from "axios";
import authHeader from "./auth-header";

const URL = "http://localhost:8081/joole/api/auth";

const getUserContent = () => {
    return axios.get(URL + "/helloUser", { headers: authHeader() });
};

const getAdminContent = () => {
    return axios.get(URL + "/helloAdmin", { headers: authHeader() });
};

// Todo: add this control panel to change user or project settings
// const getUserBoard = () => {
//     return axios.get(URL + "user", { headers: authHeader() });
// };
//
// const getAdminBoard = () => {
//     return axios.get(URL + "admin", { headers: authHeader() });
// };

export default {
    getUserContent,
    getAdminContent,
    // getUserBoard,
    // getAdminBoard
};
