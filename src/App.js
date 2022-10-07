import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useLocation } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Home from "./components/Home";
import Panel from "./components/Panel";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

const App = () => {
    const [showPanel, setShowPanel] = useState(false);
    // const [showAdminPanel, setShowAdminPanel] = useState(false);

    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    let location = useLocation();

    useEffect(() => {
        if (["/login", "/register"].includes(location.pathname)) {
            dispatch(clearMessage()); // clear message when changing location
        }
    }, [dispatch, location]);

    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    useEffect(() => {
        if (currentUser) {
            setShowPanel(currentUser.user.role.includes("USER") || currentUser.user.role.includes("ADMIN") );
            // setShowAdminPanel(currentUser.role.includes("ADMIN"));
        } else {
            setShowPanel(false);
            // setShowAdminPanel(false);
        }
    }, [currentUser]);

    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-primary">
                <Link to={"/home"} className="navbar-brand">
                    Joole
                </Link>
                <div className="navbar-nav mr-auto">
                    {/*<li className="nav-item">*/}
                    {/*    <Link to={"/home"} className="nav-link">*/}
                    {/*        Home*/}
                    {/*    </Link>*/}
                    {/*</li>*/}

                    {currentUser && (
                        <li className="nav-item">
                            <Link to={"/Project"} className="nav-link">
                                Project
                            </Link>
                        </li>
                    )}
                </div>

                {currentUser ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                                {currentUser.user.name}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={logOut}>
                                LogOut
                            </a>
                        </li>
                    </div>
                ) : (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                                Login
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/register"} className="nav-link">
                                Sign Up
                            </Link>
                        </li>
                    </div>
                )}
            </nav>

            <div className="container mt-3">
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/panel" element={<Panel />} />
                </Routes>
            </div>

        </div>
    );
};

export default App;
