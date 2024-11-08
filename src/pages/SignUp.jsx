import { Link } from "react-router-dom";
import SignUpForm from "../components/Forms/SignUpFrom";

function SignUp() {

    return (
        <div className="flex flex-col justify-center items-center gap-5 mt-10">
            <h1 className="text-2xl font-bold italic mb-6">Imagegram</h1>
            <SignUpForm />
            <span className="mt-7">
                Already have an account?
                <Link 
                    className="text-blue-600"
                    to="/"
                > 
                    Sign In
                </Link>
            </span>
        </div>
    );
}

export default SignUp;