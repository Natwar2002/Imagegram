import Input from "../Inputs/Input";
import Button from '../Button/Button'
import store from "../../store/store.js";
import { loginUser } from "../../services/loginUser.js";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../../helpers/cookieUtils.js";

function SignInForm() {

    const { email, setEmail, password, setPassword } = store();
    const navigate = useNavigate();

    async function handleClick(e) {
        console.log(email, password);
        e.preventDefault();
        try {
            const response = await loginUser(email, password);
            const token = response.data.token;
            setAuthToken(token);
            navigate('/feed');
        } catch (error) {
            console.log("Login Failed: ", error);
        }        
    }

    return(
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
    );
}

export default SignInForm;