// The Authentication Service uses Axios for HTTP requests and local storage for user information and JWT.
import axios from "axios";

const URL = "http://localhost:8081/joole/controller/"

const register = (username, email, password) => {
    // Todo: change the backend createUser to signup
    // Todo: change the backend name to username
    return axios.post(URL + "createUser", {
        name: username,
        password: password,
        emailAddress: email
    });
};

const login = (username, password) => {
    // Todo: change the backend authenticate to signin
    return axios
        .post(URL + "authenticate", {
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