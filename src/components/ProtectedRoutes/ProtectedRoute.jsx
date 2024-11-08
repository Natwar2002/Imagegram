import { Navigate } from "react-router-dom";
import { getAuthToken } from "../../helpers/cookieUtils";

function ProtectedRoute ({ children }) {
    const token = getAuthToken();
    return token ? children : <Navigate to='/' />
}

export default ProtectedRoute;