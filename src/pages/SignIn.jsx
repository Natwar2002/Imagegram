import { Link } from "react-router-dom";
import SignInForm from "../components/Forms/SignInForm";

function SignIn() {
    return (
        <div className="flex flex-col justify-center items-center gap-5 mt-10">
            <h1 className="text-2xl font-bold italic mb-6">Imagegram</h1>
            <SignInForm />
            <span className="mt-7">
                Don't have an account?
                <Link 
                    className="text-blue-600"
                    to="/signup"
                > 
                    Sign Up
                </Link>
            </span>
        </div>
    );
}

export default SignIn;