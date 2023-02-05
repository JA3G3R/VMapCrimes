import "./navbar.scss"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";

function Navbar() {
  const{dispatch} = useContext(DarkModeContext)
  return (
    
      <div className="Navbar">
        <div className="wrapper">
        <div className="Welcome">Welcome.. Admin</div>
          <div className="search">
            
            <input type="text" placeholder="Search..." style={{color: "gray"}}/>
            <SearchOutlinedIcon className="icon"/>
          </div>
          <div className="items">
            <div className="item">
              <LanguageOutlinedIcon className="icon"/>
              English
            </div>
            <div className="item">
              <DarkModeOutlinedIcon className="icon" onClick={()=>dispatch({type:"TOGGLE"})}/>
            </div>
            <div className="item">
              <FullscreenOutlinedIcon className="icon"/>
            </div>
            <div className="item">
              <NotificationsActiveOutlinedIcon className="icon"/>
              <div className="counter">1</div>
            </div>
            <div className="item">
              <ChatBubbleOutlineRoundedIcon className="icon"/>
              <div className="counter">2</div>
            </div>
            <div className="item">
              <FormatListBulletedRoundedIcon className="icon"/>
            </div>
            <div className="item">
              <img src="https://static.thenounproject.com/png/2643367-200.png"
              alt="admin"
              className="avatar"/>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Navbar
