// Data Service retrieves project and product information from server.
import axios from "axios";
import authHeader from "./auth-header";

const URL = "http://localhost:8081/joole/controller/";

const search = (data) => {
    return axios.post(URL + "products/findByName", data);
}

const readAllName = () => {
    return axios.get(URL+"products/readAllUniqueNames");
}

// TODO: add more CRUD methods here for products

export default {
    search,
    readAllName
};