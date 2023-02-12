import React, { useState } from 'react';
import "./Login.css";
import VpnKeyIcon from '@mui/icons-material/VpnKey';


function Login() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleFormSubmit = ( e ) => {



    }


    return(
        <div className='Header'>

        <div className='login'>
            <form className='login_form' >
                <h1>Admin Login <VpnKeyIcon/></h1>
                <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <button type='submit' onClick={handleFormSubmit} className='submit__btn'>Login</button>
            </form>
        </div>
        </div>
    )
}

export default Login
