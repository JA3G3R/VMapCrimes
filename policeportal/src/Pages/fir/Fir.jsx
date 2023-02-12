import "./fir.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { useState, useRef, useMemo, useCallback, useEffect  } from 'react'
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'

import {  State, City }  from 'country-state-city';

function DraggableMarker() {
  const center = {
    lat: 51.505,
    lng: -0.09,
  }
  

  const [draggable, setDraggable] = useState(false)
  const [position, setPosition] = useState(center)
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
          console.log(marker.getLatLng())
        }
      },
    }),
    [],
  )
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d)
  }, [])

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}>
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? 'Marker is draggable'
            : 'Click here to make marker draggable'}
        </span>
      </Popup>
    </Marker>
  )
}

function Fir() {
  const [cities, setCities]= useState([{name:''}])
  const [state, setState] =useState()
  const [city, setCity] =useState()
  const [toggleState, setToggleState] = useState(1);
  const states= State.getStatesOfCountry("IN")
  const toggleTab = (index) => {
    setToggleState(index);
  };
useEffect(()=>{ console.log("state is now: "+state);  setCities(City.getCitiesOfState('IN', state));
},[state])
const stateSelected = async (e)=>{
  var stateCode = e.target.value
  setState(stateCode)
}

  
  const center = {
    lat: 51.505,
    lng: -0.09,
  }
  return (
    <div className="Fir">
      <Sidebar/>
      <div className="fircontainer">
        <Navbar/>
        <div className="header">
          <div className="container">
            <div className="left">
                <h2>FIR FORM</h2>
                
                <form>
                    
                    Date of Reg of FIR:
                    <input type="date" placeholder="Date" id="Date" />
                    Police Station ID:
                    <input type="text" placeholder="Enter the Id" id="ID"/>
                    FIR Registered Date:
                    <input type="datetime" placeholder="Enter the Timeline" id="complain_name"/>
                    Name of accused:
                    <input type="text" placeholder="Enter the Name" id="Accused_name"/>
                    

                    <div className="Zip">
                        <label>
                            Type of Incident:
                            <select style={{border: "none", borderBottom: "2px solid blue" }}>
                                <option>Choose Options</option>
                                <option>Murder</option>
                                <option>Robbery</option>
                                <option>Theft</option>
                                <option>Rape</option>
                                <option>Harrasment</option>
                                <option>Others</option>
                            </select>
                        </label>
                        <label>
                            Incident Zip:
                            <input type="number" placeholder="Enter Zip" id="Zip_code"/>
                        </label>
                    </div>

                    Weapons Used:
                    <input type="text" placeholder="weapons used.." id="weapon" /><br/>

                    <label style={{fontSize:"20px", display:"grid",fontWeight:"500" }}>State<br/>
                      <select  className="state_city" onChange={stateSelected}><option value="">Select a State</option> {states.map(stateItem => (
                        <option key={stateItem.isoCode} id={stateItem.isoCode} value={stateItem.isoCode }>{stateItem.name}</option>
                      ))}
                      </select>
                    </label><br/>
                    <label style={{fontSize:"20px", fontWeight:"500" }}>City<br/>
                      <select className="state_city" onChange={(e)=>{setCity(e.target.value)}}>{cities ?  
                      <option value="">Select a City</option>
                      :null } {cities.map(city => (
                        <option key={city.id} value={city.name}>{city.name}</option>
                      ))}
                      </select>
                    </label><br/><br/>  
                    <span>
                      <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                        Penal Code ⮟
                      </a>
                 
                     </span>
                        <div class="collapse" id="collapseExample">
                          <div class="card card-body">
                           <input type="text" placeholder="Penal Code.." style={{textDecoration:"none", border:"2px solid blue", padding:"5px", fontSize:"1rem", borderRadius:"2px"}}/>
                           121, 141, 144, 146, 147, 148, 151, 153-A, 295-A, 268, 302, 304-B, 307, 322, 324, 351, 354, 509, 498-A, 363, 364, 365, 366, 376, 379, 380, 383, 390, 391, 392,395, 396, 397,411, 420, 441, 442, 447,448,454, 457, 465, 467,468,470,471, 489-A, 504,506
                          </div>
                        </div>                
                    
                </form>
            </div>
            <div className="right">
                <h4>Applicant's Details:</h4>

                <form>
                    Name:
                    <input type="text" placeholder="Enter Your Name" id="Name"/>
                    Parent Name:
                    <input type="text" placeholder="Parent Name" id="Par_name"/>
                    Address:
                    <input type="text" placeholder="Enter Your Address" id="address"/>
                    Contact No.:
                    <input type="number" placeholder="Enter Ph No." id="cont_no"/>
                    Relation with Accused:
                    <input type="text" placeholder="Relation" id="Relation"/>
                    Incident Highlight:
                    <input type="text" placeholder="Enter the highlights.." id="Inci_high"/>
                    Incident details:
                    <input type="text" placeholder="Enter the details.." id="Inci_det"/>

                    <MapContainer center={center} zoom={13} scrollWheelZoom={true} style={{height: "20rem", width:"auto" }}>
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                     
                    </MapContainer>
                    <input type="submit" value="Submit" id="Submit"/>            
                </form>
            </div>
          </div>
      </div>
    </div>
        </div>
  )
}

export default Fir
