import { Link } from 'react-router-dom';
import { useRef } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

export default function Signup() {

    const fullNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const {setUser, setToken} = useStateContext();

    const onSubmit = (event) => {
        event.preventDefault();
        const payload = {
            name: fullNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        };
        // console.log(payload);

        axiosClient.post('/signup', payload)
        //!it will return a response from the server (JSON object)
        .then(({data}) => {
            //!from the server, return user info and token info and store it in the state
            setUser(data.user);
            setToken(data.token);
        })
        .catch(error => {
            const response = error.response;
            if (response && response.status === 422) {
                console.log(response.data.errors);
            }
        })
    }
    

    return(
        <div>
            <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">
                        Signup for free
                    </h1>
                    <input ref={fullNameRef} type="full-name" placeholder="Full Name" />
                    <input ref={emailRef} type="email" placeholder="Email Address" />
                    <input ref={passwordRef} type="password" placeholder="Password" /> 
                    <input ref={passwordConfirmationRef} type="confirm-password" placeholder="Confirm Password" /> 
                    <button className="btn btn-block">Signup</button>
                    <p className="message">
                        Already Registered? <Link to="/login">Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
        </div>
    )
}