import MarkerClusterGroup from 'react-leaflet-cluster'
import "./mainnavbar.scss"
import L from "leaflet"

import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { Link } from "react-router-dom";
import { useContext } from "react";
import LoginIcon from '@mui/icons-material/Login';
import { DarkModeContext } from "../../context/darkModeContext";
import "./mainwebsite.scss"
import 'leaflet/dist/leaflet.css'
import Icon  from "../../location-sign-svgrepo-com.svg";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Tabmap from './Tabmap';





function Mainwebsite() {
  const{dispatch} = useContext(DarkModeContext)

  const addressPoints = 
    [[22.713806546584923,75.90763092041017],[22.71158965395831,75.89012145996095],[22.73629014234688,75.88394165039064]]
  

  const center = {
    lat: 22.719568,
    lng: 75.857727,
  }
  const myicon = L.icon({iconUrl:Icon, iconSize: L.point(40,40) })
  console.log("icon is " + myicon.iconUrl)

  

  return (
    
    <div className='mainhome'>
      
      <div className="Navbar" style={{position:"fixed", padding:"1rem", width:"100%", zIndex:"1111"}}>
        <div className="wrapper">
          <div className="Welcome">VMapCrimes</div>
          

          
          <div className="items" style={{listStyle:"none"}}>
            <div className='item'>
              <Link to="/portal" style={{textDecoration:"none"}}>
                <li className='links' >Dashboard</li>
              </Link>
            </div>

            <div className="item">
              <li className='links'>Mapping</li>
            </div>

            <div className="item">
              <Link to="/analytics" style={{textDecoration:"none"}}>
                <li className='links'>Analytics</li>
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
      </div><br/>
      <div className="mapcontain">
      <MapContainer center={center} zoom={13} maxZoom={20} scrollWheelZoom={true} style={{height: "90vh", width:"60vw", padding: "5rem", position:"fixed",  }}>
      <MarkerClusterGroup
      chunkedLoading
      >
      {addressPoints.map((address, index) => (
        <Marker
          key={index}
          position={[address[0], address[1]]}
          icon={myicon}
          
        >
          <Popup minwidth={80} className="popup">
            <img src="data:image/png;base64,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"
            alt='avtar'
            className='avatar'/>
            <ul>
              <li>
                <p>Victim: <span>Jane</span> </p>
              </li>
              <li>
                <p>CrimeType: <span>Murder</span> </p>
              </li>
              
            </ul>
            
          </Popup>
        </Marker>
      ))}
    </MarkerClusterGroup>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
    </MapContainer>
    
      </div>
      <div className="mapright">
      <div className="right_sidebar">
      <Tabmap/>
        
      </div>
    </div>
      
    </div>
  )
}

export default Mainwebsite
