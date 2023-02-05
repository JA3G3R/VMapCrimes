import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar"
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import GroupsIcon from '@mui/icons-material/Groups';
import "./roles.scss"
import { Link } from "react-router-dom";

function Roles() {
  return (
    <div className="Roles">
       <Sidebar/>
       <div className="rolesContainer">
        <Navbar/>
        <div className="title">
            <div className="manage">Access Control</div>
            <Link to="/newroles" style={{textdecoration:"none"}}>
              <div className="addrole">
                <p>+Add Roles</p>
              </div>
            </Link>
          
        </div>
        
        <div className="contentbox">

          <div className="content">
            
            <div className="left">
              
              <span>
                <div className="spancontent">
                 <SupervisorAccountOutlinedIcon className="icon"/>
                 Admin
                </div>
              </span>
              
              <span>
                <div className="spancontent">
                 <LocalPoliceOutlinedIcon className="icon"/>
                 Police
                </div>
              </span>
              <span>
                <div className="spancontent">
                  <GroupsIcon className="icon"/>
                  Public
              </div>
              </span>
            </div>
            <div className="right">
              <div className="rightcontent">
               <div className="delete">Delete</div>
               <div className="edit">Edit</div>
              </div>
               <div className="rightcontent">
               <div className="delete">Delete</div>
              <div className="edit">Edit</div>
              </div>
              <div className="rightcontent">
               <div className="delete">Delete</div>
               <div className="edit">Edit</div>
              </div>
            </div>
          </div>
        </div>
       </div>
    </div>
  )
}

export default Roles
