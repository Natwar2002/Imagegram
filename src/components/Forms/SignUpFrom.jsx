import Input from "../Inputs/Input";
import Button from '../Button/Button';
import { createUser } from "../../services/createUser.js";
import { useNavigate } from "react-router-dom";
import store from '../../store/store.js'


function SignUpForm() {

    const { email, setEmail, password, setPassword, username, setUsername, error, setError, success, setSuccess } = store();
    const navigate = useNavigate();
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const digitRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const usernameRegex = /^[a-zA-Z0-9_.-]{5,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function validatePassword(password) {
        if (password.length < 8) {
            return "Password must be at least 8 characters long.";
        }
        if (!lowercaseRegex.test(password)) {
            return "Password must contain at least one lowercase letter.";
        }
        if (!uppercaseRegex.test(password)) {
            return "Password must contain at least one uppercase letter.";
        }
        if (!digitRegex.test(password)) {
            return "Password must contain at least one digit.";
        }
        if (!specialCharRegex.test(password)) {
            return "Password must contain at least one special character.";
        }
        return null; // Valid password
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError(null);
        if (!emailRegex.test(email)) {
            setError("Invalid email format.");
            return;
        }
        if (!usernameRegex.test(username)) {
            setError("Username must be at least 5 alphanumeric characters long.");
            return;
        }
        const passwordError = validatePassword(password);
        if (passwordError) {
            setError(passwordError);
            return;
        }
        try {
            const response = await createUser({ email, username, password });
            console.log(response);
            
            if(response.data.data) {
                setSuccess("Sign Up successful");
                setTimeout(()=> {
                    navigate('/');
                    setEmail('');
                    setPassword('');
                    setUsername('');
                    setError(null);
                    setSuccess(null);
                }, 1000)
            }
        } catch (e) {
            console.error("Signup Error:", e);
            setError("Signup failed. Please try again.");
        }
    }

    return(
        <>
            {success && <p className="text-green-500">{success}</p>}
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div>
                    <Input
                        label="Enter your email"
                        type="text"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>

                <div>
                    <Input 
                        label="Enter password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>

                <div>
                    <Input 
                        label="Enter a unique username"
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                    />
                </div>

                <div>
                    <Button
                        text="Sign Up"
                    />
                </div>

            </form>
            {error && <p className="text-red-500">{error}</p>}
        </>
    );
}

export default SignUpForm;