import { useState, useEffect } from "react";
import "./tabmap.css";
import SearchIcon from '@mui/icons-material/Search';



import {  State, City }  from 'country-state-city';


// Import Interfaces`


function Tabmap() {
  
  const [cities, setCities]= useState([{name:''}])
  const [state, setState] =useState()
  const [city, setCity] =useState()
  const [toggleState, setToggleState] = useState(1);
  const code= [[121]] 
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

  return (
    <div className="containing" style={{position:""}}>
      <div className="bloc-tabs" >
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          <span className="spanning">Reports</span>
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          <span className="spanning">Analytics</span>
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          <span className="spanning">Filters</span>
        </button>
        <button
          className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(4)}
        >
          <span className="spanning">Timeline</span>
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <h2 className="spanning">Reports</h2>
          <hr />
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            praesentium incidunt quia aspernatur quasi quidem facilis quo nihil
            vel voluptatum?
          </span>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <h2 className="spanning">Analytics</h2>
          <hr />
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            voluptatum qui adipisci.
          </span>
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <h2 className="spanning">Filters</h2>
          <hr />
          <span>
            <form >
            <select className="filter">
              <option key="1">Choose options</option>
              <option key="2">Murder</option>
              <option key="3">Kidnapping</option>
              <option key="4">Robbery</option>
              <option key="5">Harrasment</option>
            </select>
            <br/>
            <br/>
            <div className="Searchtype">
            <h2 className="spanning">Search <SearchIcon style={{fontSize:"20px"}}/><hr /></h2>
            
            <input type="search" placeholder="Search here.." className="inputsearch"/>
            </div>
            <div className="dates">
              <label style={{display: "grid", fontSize:"18px"}}>Date Before:<input type= "date" className="dd_mm"/></label>
              <label style={{display: "grid",fontSize:"18px"}}>Date After:<input type= "date" className="dd_mm"/></label>
            </div>
            <div className="codes">
              <label style={{display: "grid",fontSize:"18px"}}>Zipcode<input type="number" placeholder="zipcode" className="dd_mm"/></label>
              
            </div><br/>
            <div className="Searchtype">
              <h2>Address Search <SearchIcon style={{fontSize:"20px"}}/><hr /></h2>
              
              <input type="text" placeholder="Search here.." className="inputsearch"/>
            </div>
            <br/>
            <div className="city">
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

            </div>
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
            </span>          
        </div>

        <div
          className={toggleState === 4 ? "content  active-content" : "content"}
        >
          <span> 
          <h2 className="spanning">TimeLine<hr/></h2>
            <div className="Table"> 
          <table class="table table-striped">
            
            <tbody class="table-group-divider">
              <tr>
                <td style={{ width: '80px' }}>12 Feb 2022<br/>10:00</td>
                <td style={{ width: '200px' }}>Harrasment<br/>Robbery at the Mall.</td>
              </tr>
              <tr>
                <td style={{ width: '80px' }}>10 Feb 2023<br/>15:25</td>
                <td style={{ width: '200px' }}>Murder<br/>Young Girl shot died</td>
              </tr>
              <tr>
                <td style={{ width: '80px' }}>10 Feb 2023<br/>15:25</td>
                <td style={{ width: '200px' }}>Murder<br/>Young Girl shot died</td>
              </tr>
            </tbody>
          </table>
            </div>      
          </span>
          
          
        </div>
      </div>
    </div>
  );
}

export default Tabmap;