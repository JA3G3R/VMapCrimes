import "./fir.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"

function Fir() {
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
                    FIR No.
                    <input type="number" placeholder="Fir Number" id="FIR_no"/>
                    Date of Reg of FIR:
                    <input type="date" placeholder="Date" id="Date"/>
                    Police Station ID:
                    <input type="text" placeholder="Enter the Id" id="ID"/>
                    Created At:
                    <input type="datetime" placeholder="Enter the Timeline" id="complain_name"/>
                    Name of accused:
                    <input type="text" placeholder="Enter the Name" id="Accused_name"/>
                    

                    <div className="Zip">
                        <label>
                            Type of Incident:
                            <select>
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
                    
                </form>
            </div>
            <div className="right">
                <h3>Applicant's Details:</h3>

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

                    Incident details:
                    <input type="text" placeholder="Enter the details.." id="Inci_det"/>
                    
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
