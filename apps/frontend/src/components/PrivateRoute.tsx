// components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { ReactElement} from "react";

const PrivateRoute = ({ children }:{children:ReactElement}) => {
    // Replace this with your actual authentication check
    const isAuthenticated = localStorage.getItem('token');

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
