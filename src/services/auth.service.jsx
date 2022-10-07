// The Authentication Service uses Axios for HTTP requests and local storage for user information and JWT.
import axios from "axios";
import authHeader from "./auth-header";

const URL = "http://localhost:8081/joole/api/auth"

const register = (username, email, password) => {
    // Todo: change the backend name to username
    return axios.post(URL + "/signup", {
        name: username,
        password: password,
        emailAddress: email
    });
};

const login = (username, password) => {
    return axios
        .post(URL + "/signin", {
            username,
            password
        })
        .then((response) => {
            // console.log("token---" + response.data);
            if (response.data) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeitem("user");
};

export default {
    register,
    login,
    logout
};