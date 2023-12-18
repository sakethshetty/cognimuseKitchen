import React, { useState, useRef } from 'react';
import '../styles/loginStyle.css';
import axios from 'axios'
import { useNavigate } from "react-router-dom"

function Login(props) {
    const [isSignupVisible, setSignupVisible] = useState(true);
    const [errMsg, setErrMsg] = useState("");
    const formRef = useRef(null);

    const navigate = useNavigate();

    // Create state variables for each input value
    const [Form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleLoginView = () => {
        setSignupVisible(false);
        console.log(isSignupVisible)
    };

    const handleSignupView = () => {
        setSignupVisible(true);
    };

    const handleLoginClick = (e) => {
        e.preventDefault();

        const data = {
            email: Form.email,
            password: Form.password,
        }
        axios.post(" http://localhost:4000/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                'email': Form.email,
                'password': Form.password
            }
        })
            .then((res) => {
                console.log(res)
                props.loggedInState.setLoggedIn(Form.email);
                localStorage.setItem("isLoggedInKey", Form.email)
                navigate("/")
            })
            .catch((err) => {
                setErrMsg("Something went wrong!");
            })
    };

    const handleSignupClick = (e) => {
        e.preventDefault();

        console.log("signup!")
        // console.log(data);
        axios.post(" http://localhost:4000/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                'username' : Form.username,
                'email': Form.email,
                'password': Form.password
            }
        })
            .then((res) => {
                console.log(res)

                props.loggedInState.setLoggedIn(Form.email);
                localStorage.setItem("isLoggedInKey", Form.email)

                navigate("/")
            })
            .catch((err) => {
                console.log(err);
                setErrMsg("Something went Wrong!");
            })
    };

    // Create a generic handleChange function
    const handleChange = (e) => {
        // Get the input name and value from the event object
        const { name, value } = e.target;
        // Update the Form variable using the setForm function
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));
    };

    return (
        <div className='login-holder'>
            <form ref={formRef} className={`form-structor`}>
                <div className={`signup ${isSignupVisible ? '' : 'slide-up'}`}>
                    <h2 className="form-title" id="signup" onClick={handleSignupView}><span>or</span>Sign up</h2>
                    <div className="form-holder">
                        {/* Add name and onChange attributes to each input element */}
                        <input type="text" className="input" placeholder="Name" name="username" value={Form.username} onChange={handleChange} required="" />
                        <input type="email" className="input" placeholder="Email" name="email" value={Form.email} onChange={handleChange} required="" />
                        <input type="password" className="input" placeholder="Password" name="password" value={Form.password} onChange={handleChange} required="" />
                    </div>
                    <button type="submit" className="submit-btn" onClick={handleSignupClick}>Sign up</button>
                    {errMsg && <p className='errmsg'>{errMsg}</p>}
                </div>
                <div className={`login ${isSignupVisible ? 'slide-up' : ''}`}>
                    <div className="center">
                        <h2 className="form-title" id="login" onClick={handleLoginView}><span>or</span>Log in</h2>
                        <div className="form-holder">
                            {/* Add name and onChange attributes to each input element */}
                            <input type="email" className="input" placeholder="Email" name="email" value={Form.email} onChange={handleChange} required />
                            <input type="password" className="input" placeholder="Password" name="password" value={Form.password} onChange={handleChange} required />
                        </div>
                        <button className="submit-btn" onClick={handleLoginClick}>Log in</button>
                        {errMsg && <p className='errmsg'>{errMsg}</p>}
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;
