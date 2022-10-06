import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./store";

import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<Provider store={store}>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
</Provider>);