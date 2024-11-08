import Input from "../Inputs/Input";
import Button from '../Button/Button'
import { useState } from "react";
import { createUser } from "../../services/createUser.js";
import { useNavigate } from "react-router-dom";
import store from '../../store/store.js'


function SignUpForm() {

    const { email, setEmail, password, setPassword, username, setUsername } = store();
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    async function handleSubmit(event) {
        console.log("submitted");
        
        event.preventDefault();
        try {
            const response = await createUser({ email, username, password });
            console.log(response);
            
            navigate('/');

            setEmail('');
            setPassword('');
            setUsername('');
            setError(null);
        } catch (e) {
            console.error("Signup Error:", e);
            setError("Sign Up failed. Please try again.");
        }
    }

    return(
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
    );
}

export default SignUpForm;