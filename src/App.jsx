import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Feed from "./pages/Feed";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute";

function App() {
    return (
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route 
                path="/feed" 
                element={
                    <ProtectedRoute>
                        <Feed />
                    </ProtectedRoute>
                } 
            />
        </Routes>
    );
}

export default App;