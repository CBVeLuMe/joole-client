// User Panel is a project controller for user level.
// For now, it is a project component.
import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const Panel = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getUserContent().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, []);

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content}</h3>
            </header>
        </div>
    );
};

export default Panel;
