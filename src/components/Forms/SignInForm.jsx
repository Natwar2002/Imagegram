import Input from "../Inputs/Input";
import Button from '../Button/Button'
import store from "../../store/store.js";
import { loginUser } from "../../services/loginUser.js";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../../helpers/cookieUtils.js";

function SignInForm() {

    const { email, setEmail, password, setPassword, error, setError, success, setSuccess } = store();
    const navigate = useNavigate();

    async function handleClick(e) {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        try {
            const response = await loginUser(email, password);
            console.log("Response : "+ response);
            
            if(response === null) {
                setError("Internal Server Issue");
            }
            const token = response.data.data;
            if(token) {
                setSuccess("Signed In Successfully..");
                setTimeout(()=>{
                    setAuthToken(token);
                    navigate('/feed');
                    setSuccess(null);
                }, 2000);
            }
        } catch (error) {
            console.log("Login Failed: ", error);
            setError("Login failed. Please check your credentials.");
        }      
    }

    return(
        <>
            {success && <p className="text-green-500">{success}</p>}
            <form className="flex flex-col gap-5">
                <div>
                    <Input
                        label="Enter your email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <Input 
                        label="Enter password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <Button
                        text="Sign In"
                        onClickHandler={handleClick}
                    />
                </div>

            </form>
            {error && <p className="text-red-500">{error}</p>}
        </>
    );
}

export default SignInForm;