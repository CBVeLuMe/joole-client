// Home component is a placeholder for now.
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

const Home = () => {
    const {isLoggedIn} = useSelector(state => state.auth);

    if (isLoggedIn) {
        return <Navigate to="/profile"/>;
    }
    else {
        return <Navigate to="/login"/>;
    }
}

export default Home;