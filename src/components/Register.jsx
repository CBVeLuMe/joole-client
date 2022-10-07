// Register component dispatch register action and show response message (isSuccessful or not).
// username: not null, between 3 and 20 characters.
// email: not null, email format.
// password: not null, between 6 and 40 characters.
import {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import isEmail from "validator/es/lib/isEmail";
import { register } from "../actions/auth";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This filed is necessary!
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (<div className="alert alert-danger" role="alert">
            This is not a legal email.
        </div>);
    }
};

const validUsername = (value) => {
    if (value.length < 6 || value.length > 20) {
        return (<div className="alert alert-danger" role="alert">
            The username must be between 6 and 20 characters.
        </div>)
    }
};

const validPassword = (value) => {
    if (value.length < 6 || value.length > 20) {
        return (<div className="alert alert-danger" role="alert">
            The password must be between 6 and 20 characters.
        </div>)
    }
};

const Register = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSuccessful, setIsSuccessful] = useState(false);

    const {message} = useSelector(state => state.message);
    const dispatch = useDispatch();

    const onChangeUsername = (event) => {
        const username = event.target.value;
        setUsername(username);
    };

    const onChangeEmail = (event) => {
        const email = event.target.value;
        setEmail(email);
    };

    const onChangePassword = (event) => {
        const password = event.target.value;
        setPassword(password);
    };

    const handleRegister = (event) => {
        event.preventDefault();
        setIsSuccessful(false);
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            dispatch(register(username, email, password))
                .then(() => {
                    setIsSuccessful(true);
                })
                .catch(() => {
                    setIsSuccessful(false);
                });
        }
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-placeholder"
                    className="profile-img-card"
                />
                <Form onSubmit={handleRegister} ref={form}>
                    {!isSuccessful && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={username}
                                    onChange={onChangeUsername}
                                    validations={[required, validUsername]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={onChangeEmail}
                                    validations={[required, validEmail]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={onChangePassword}
                                    validations={[required, validPassword]}
                                />
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block">Sign Up</button>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className="form-group">
                            <div className={isSuccessful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{display: "none"}} ref={checkBtn}/>
                </Form>
            </div>
        </div>
    )
}

export default Register;