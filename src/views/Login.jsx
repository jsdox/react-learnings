import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState('');
    const [formErrors, setFormErrors] = useState([]);
    const {setToken, setUser} = useStateContext();
    
    function _setEmail(value) {
        setEmail(value);
        setFormErrors([]);
    }

    function _setPassword(value) {
        setPassword(value);
        setFormErrors([]);
    }

    const emailValidate = (value) => {
        const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        if (!emailRegex.test(value)) return 'Wrong email';
        return undefined;
     }
  
     const passwordValidate = (value) => {
        if (!value || value.length < 6) return 'Passwords must be more than 6 characters';
        return undefined;
     }

    const registrationSubmitHandler = (e) => {
        e.preventDefault();

        let errors = [];
        if (!email || !password) {
            let emailCheck = emailValidate(email);
            if (emailCheck) errors.push(emailCheck);
    
            let passwordCheck = passwordValidate(password);
            if (passwordCheck) errors.push(passwordCheck);
            setFormErrors(errors);
        }
        
        
        if (!errors.length) setResponse('Registation done, check you email :)');

        if (email || password) {
            const payload = {
                email: email,
                password: password,
            }
            axiosClient.post('/login', payload)
            .then((response) => {
                if (response.status === 200) {
                    setToken(response.data.token)
                    navigate("/users");
                }
            })
            .catch(error => {            
                const response = error.response;
                if (response && response.status === 422) {
                    if (response.data.errors.email) {
                        errors.push(response.data.errors.email[0]);
                    } 
                    if (response.data.errors.password) {
                        errors.push(response.data.errors.password[0]);
                    }    
                    setFormErrors(errors);       
                } 
                if (response && response.status === 401) {
                    errors.push('Something went wrong, please try again!');
                    setFormErrors(errors);       
                }           
            });
        }
    }

    return (
        <div className="login-signup-form animated fadeinDown">
            
            <div className="form">
                <h1 className="title">
                    Login To Your Account                    
                </h1>
                <form onSubmit={(e) => registrationSubmitHandler(e)}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => _setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => _setPassword(e.target.value)}/>
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        {formErrors.length ? 
                            formErrors.map((err, index) => <span className="error" key={index}>{err}</span>) 
                        : ''}
                    </p>
                    <p className="message">
                        Not Registered? <Link to= '/register'>Create a new account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}