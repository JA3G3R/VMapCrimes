import "./widget.scss"
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CrisisAlertRoundedIcon from '@mui/icons-material/CrisisAlertRounded';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import PersonPinCircleOutlinedIcon from '@mui/icons-material/PersonPinCircleOutlined';

function Widget({type="user"}) {
  let data;


  switch (type) {
    case "user":
      data ={
        title: "USERS",
        isMoney: false,
        link: "See all users",
        counter:"28167",
        icon: <PersonRoundedIcon className="icon" 
        style={{color:"green", backgroundColor: "lightgreen",
       }}
        />,
      };
      break;
      case "cases":
      data ={
        title: "Cases",
        isMoney: false,
        link: "View all cases",
        counter:"406",
        icon: <CrisisAlertRoundedIcon className="icon"
        style={{color:"crimson", backgroundColor: "rgba(255, 0, 0, .2)",
       }}/>,
      };
      break;
      case "fir":
      data ={
        title: "FIR Registered",
        isMoney: false,
        link: "View all Fir",
        counter:"201",
        icon: <NoteAltOutlinedIcon className="icon"
        style={{color:"darkgoldenrod", backgroundColor: "rgba(218, 165,32, .2)",
       }}
        />,
      };
      break;
      case "area":
      data ={
        title: "Location",
        isMoney: false,
        link: "See near Location",
        counter:"Delhi",
        icon: <PersonPinCircleOutlinedIcon className="icon"
        style={{color:"green", backgroundColor: "lightgreen",
       }}/>,
      };
      break;
    default:
      break;
  }


  return (
    
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.counter}</span>
        <span className="link">{data.link}</span>       
      </div>
      <div className="right">
        <div className="percentage positive">
            <KeyboardArrowUpRoundedIcon/>
             25 %
        </div>
        {data.icon}      
      </div>
    </div>
  )
}

export default Widget
