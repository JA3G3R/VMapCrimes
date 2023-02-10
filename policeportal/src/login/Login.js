import React, { useState } from 'react';
import "./Login.css";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
const Login = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    


    return(
        <div className='Header'>

        <div className='login'>
            <form className='login_form' >
                <h1>Admin Login <VpnKeyIcon/></h1>
                <input type="name" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required/>
                <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <button type='submit' className='submit__btn'>Login</button>
            </form>
        </div>
        </div>
    )
}

export default Login
