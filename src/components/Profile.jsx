// Profile component gets current user from local storage by getting user in the state and show user information.
// If the browser does not contain the token, navigate to /login.
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const Profile = () => {
    const {user: currentUser} = useSelector((state) => state.auth);
    console.log(currentUser);
    if (!currentUser) {
        return <Navigate to="/login"/>;
    }

    return (<div className="container">
        <header className="jumbotron">
            <h1>
                <strong>{currentUser.user.name}</strong> Profile
            </h1>
        </header>
        <p>
            <strong>Token:</strong> {currentUser.token.substring(0, 20)}...
            {currentUser.token.substring(currentUser.token.length - 20)}
        </p>
        <p>
            <strong>ID:</strong> {currentUser.user.id}
        </p>
        <p>
            <strong>Email:</strong> {currentUser.user.emailAddress}
        </p>
        <strong>Authorities:</strong> {currentUser.user.role}
    </div>);
};

export default Profile;