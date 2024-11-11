import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate, useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    useEffect(() => {
        // console.log('useeffect');
    }, [])


    const {setToken, setUser} = useStateContext();

    function clientValidation({name, email, password}) {
        let userName = !name ? 'The name field is required' : '';
        let userEmail = !email ? 'The email field is required': '';
        let userPassword = !password ? 'The password field is required' : '';
        
        if (userName || userEmail || userPassword) {
            const error = {'name':userName, 'email':userEmail, 'password':userPassword};
            setErrors(error);
            // setErrors(prevState => {
            //     return {...prevState, error}
            // });
        }
    }

    function serverValidation({name, email, password}) {
        setErrors({'name':name, 'email':email, 'password':password});
    }

    const Submit = (e) => {
        e.preventDefault();
        
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        clientValidation(payload);        
        if (payload.name || payload.email || payload.password) {
            axiosClient.post("register", payload)
            .then((data) => {
                if (data.status === 200) {
                    navigate("/login");
                }
            })
            .catch(error => {            
                const response = error.response;
                if (response && response.status === 422) {
                    const payload = {
                        name: response.data.errors.name ? response.data.errors.name[0] : '',
                        email: response.data.errors.email ? response.data.errors.email[0] : '',
                        password: response.data.errors.password ? response.data.errors.password[0] : '',
                    }
                    serverValidation(payload);                
                }
               
            });
        }
    }
// console.log('register component')
    return (
        <div className="login-signup-form animated fadeinDown">
            <div className="form">
                <h1 className="title">
                   Create A New Account
                </h1>
                <form onSubmit={(e) => Submit(e)}>
                    <input ref={nameRef} type="text" placeholder="Name" />
                    {errors['name']}
                    <input ref={emailRef} type="email" placeholder="Email" />
                    {errors['email']}
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    {errors['password']}
                    <button className="btn btn-block">Submit</button>
                    <p className="message">
                        Already Registered? <Link to= '/login'>Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export const abc = () => {
//  console.log('loader');
 return null;
}