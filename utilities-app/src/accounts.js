import './accounts.css';
import { useEffect, useRef, createContext } from "react";
import { useState } from "react";
import 'reactjs-popup/dist/index.css';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';

 function Accounts() {

//     <script src="https://apis.google.com/js/platform.js" async defer></script>

//     const SignupForm = document.getElementById('signup');
//     const LoginForm = document.getElementById('login');

//     const SignUpEmail = document.getElementById('SignupEmail');
//     const SignUpPassword = document.getElementById('signupPassword');

//     const LoginEmail = document.getElementById('LoginEmail');
//     const LoginPassword = document.getElementById('LoginPassword');
//     const LoginInSubmit = document.getElementById('SignInSubmit');
//     const LogInSubmit = document.getElementById('LogInSubmit');


//     useEffect(() => {

//         event.preventDefault();


// }, []);



return (

    <div className="AccountsContainer">
        <div>
            <div className="AccountsPortal">

                <span> Sign Up</span>
                <form method="post" action="/Signup" id="signup">
                    <div className="Sign-up">

                        <span> Email </span>
                        <input type="text" id="SignUpEmail" />

                        <span> Password </span>
                        <input type="text" id="SignUpPassword" />

                        <button className="SignInSubmit"  > Sign up
                            <ArrowRightAltRoundedIcon sx={{ display: 'flex', justifyContent: 'flex-end', alignItem: 'flex-end', verticalAlign: 'middle' }} />
                        </button>
                    </div>
                </form>

                <span>Log In</span>

                <form method="post" action="/login" id="login">
                    <div className="Log-in">
                        <span> Email </span>
                        <input type="text" id="LogInEmail" />

                        <span> Password </span>
                        <input type="text" id="LogInPassword" />

                        <button className="LogInSubmit"  > Login
                            <ArrowRightAltRoundedIcon sx={{ display: 'flex', justifyContent: 'flex-end', alignItem: 'flex-end', verticalAlign: 'middle' }} />
                        </button>
                    </div>
                </form>

            </div>
        </div>
    </div>

);
}

export default Accounts;