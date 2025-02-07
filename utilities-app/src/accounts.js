import './accounts.css';
import { useEffect, useRef, createContext } from "react";
import { useState } from "react";
import 'reactjs-popup/dist/index.css';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


function Accounts() {

    <script src="https://apis.google.com/js/platform.js" async defer></script>


    return (

        <div className="AccountsContainer">
            <div>
                <div className="AccountsPortal">

                    <div className="Sign-up">
                        <span> Sign Up</span>
                        <Box>
                            <TextField label="standard" varient="standard" color="primary" />
                        </Box>

                        <Box>
                            <TextField label="" varient="standard" color="primary" />
                        </Box>

                    </div>

                    <div className="SignInSubmit">
                        <button>hi </button>
                    </div>

                    <div className="Log-in">
                        <span> Log In</span>
                        <br></br>

                        <Box>
                            <TextField label="" varient="standard" color="primary" />
                        </Box>

                        <Box>
                            <TextField label="" varient="standard" color="primary" />
                        </Box>
                    </div>

                    <div className="LogInSubmit">
                        <button> hu</button>

                    </div>
                </div>

                <div class="g-signin2" data-onsuccess="onSignIn"></div>

            </div>
        </div>

    );
}

export default Accounts;