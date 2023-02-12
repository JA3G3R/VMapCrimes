import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';

import InsertChartOutlinedRoundedIcon from '@mui/icons-material/InsertChartOutlinedRounded';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";


function Sidebar() {
    const{dispatch} = useContext(DarkModeContext)
  return (
    <div className="sidebar">
        <div className="top">
            <Link to="/" style={{textDecoration:"none"}}>
              <span className="Logo">Police Portal</span>
            </Link>
            
        </div>
        <hr/>
        <div className="center">
            <ul>
                <p className="title">MAIN</p>
                <Link to="/portal" style={{textDecoration:"none"}}>
                <li>
                     <DashboardIcon className="icon" />
                    <span>Dashboard</span>
                </li>
                </Link>
                
                <p className="title">LIST</p>
                <Link to="/users" style={{textDecoration:"none"}}>
                <li>
                     <PersonOutlinedIcon className="icon" />
                    <span>Users</span>
                </li>
                </Link> 
                <Link to="/roles" style={{textDecoration:"none"}}>
                <li>
                     <AdminPanelSettingsOutlinedIcon className="icon" />
                    <span>Roles</span>
                </li>
                </Link>
                
                <li>
                     <NotificationsNoneOutlinedIcon className="icon" />
                    <span>Notifications</span>
                </li>
                <p className="title">USEFUL</p>
                <Link to="/fir" style={{textDecoration:"none"}}>
                <li>
                     <NoteAltOutlinedIcon className="icon" />
                    <span>FIR Register</span>
                </li>
                </Link>
                <Link to="/location" style={{textDecoration:"none"}}>
                
                </Link>
                
                <li>
                     <InsertChartOutlinedRoundedIcon className="icon" />
                    <span>Analytics</span>
                </li>
                <p className="title">USER</p>
                <li>
                     <AccountCircleOutlinedIcon className="icon" />
                    <span>Profile</span>
                </li>
                
                <li>
                     <ExitToAppIcon className="icon" />
                    <span>Logout</span>
                </li>
            </ul>
        </div>
        <div className="bottom">
            <div className="colorOptions" onClick={()=> dispatch({type:"LIGHT"})}></div>
            <div className="colorOptions" onClick={()=> dispatch({type:"DARK"})}></div>
            
        </div>
    </div>    
  )
}

export default Sidebar;
