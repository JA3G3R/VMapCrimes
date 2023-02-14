import React from 'react'

import "./analytics.scss"
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { Link } from "react-router-dom";
import { useContext } from "react";
import LoginIcon from '@mui/icons-material/Login';
import { DarkModeContext } from "../../context/darkModeContext";
import "./mainwebsite.scss"
import 'leaflet/dist/leaflet.css'
import Chart from '../Chart'




const Analytics = () => {
    const{dispatch} = useContext(DarkModeContext)
  return (
    <div className='mainhome'>
      
      <div className="Navbar" style={{position:"fixed", padding:"1rem", width:"100%", zIndex:"1111"}}>
        <div className="wrapper">
        <Link to="/" style={{textDecoration:"none"}}>
          <div className="Welcome">VMapCrimes</div>
        </Link>
          
          

          
          <div className="items" style={{listStyle:"none"}}>
            <div className='item'>
              <Link to="/" style={{textDecoration:"none"}}>
                <li style={{textDecoration:"none",color:"white"}} className='links' >Dashboard</li>
              </Link>
            </div>

            

            <div className="item">
              <Link to="/analytics" style={{textDecoration:"none"}}>
                <li className='anal_'>Analytics</li>
              </Link> 
            </div>

            <link to="/"></link>
            <div className="item">
              <DarkModeOutlinedIcon className="icon" onClick={()=>dispatch({type:"TOGGLE"})} />
            </div>
            
            
            <Link to="/login">
              <div className="item">
                <LoginIcon className='icon'/>
              </div>
            </Link> 
            
            
          </div>
        </div>
      </div><br/><br/>
      <h4 style={{padding:".5rem 40rem", fontWeight:"550", 
      justifyContent:"center", alignContent:"center", color: "white"}}>Analytics<hr style={{width:"6.5rem", height:"5%",borderColor:"white"}}/></h4>
      <div className="all_chrts">
        <div className="chartitem">
          <Chart  height={'400px'} width={'620px'} chartId={'63e88c9a-6907-4e92-86dc-39d699f7fe67'}/> 
          <Chart  height={'400px'} width={'620px'} chartId={'63e88c9a-6907-4e92-86dc-39d699f7fe67'}/>
        </div>
        <div className="chartitem">
          <Chart  height={'400px'} width={'620px'} chartId={'63e88c9a-6907-4e92-86dc-39d699f7fe67'}/>
          <Chart  height={'400px'} width={'620px'} chartId={'63e88c9a-6907-4e92-86dc-39d699f7fe67'}/>
        </div>
        
      </div>
      
    </div>
      
    
  )
}

export default Analytics
