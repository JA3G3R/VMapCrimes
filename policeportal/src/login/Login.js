import React, { useState } from 'react';
import "./Login.css";
import VpnKeyIcon from '@mui/icons-material/VpnKey';


function Login() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Perform authentication here, and if it fails, set showError to true
        setShowError(true);
      };


    return(
        <div className='Header'>

        <div className='login'>
            <form className='login_form' onSubmit={handleSubmit}>
                <h1 style={{fontWeight:"bold"}}>Login <VpnKeyIcon style={{fontSize: "25px"}}/></h1>
                <input type="name" 
                   placeholder='Name' 
                   value={name} 
                   onChange={(e) => setName(e.target.value)} required/>
                

                <input type="email" 
                   placeholder='Email' 
                   value={email} 
                   onChange={(e) => setEmail(e.target.value)} required/>

                <input type="password" 
                   placeholder='Password' 
                   value={password} 
                   onChange={(e) => setPassword(e.target.value)} required/>

                {showError && (
                  <div role="alert" style={{color:"red"}}>
                    Invalid username or email or password, please try again.
                  </div>
                )}
                <button type='submit' className='submit__btn'>Login</button>
            </form>
        </div>
        </div>
    )
}

export default Login
