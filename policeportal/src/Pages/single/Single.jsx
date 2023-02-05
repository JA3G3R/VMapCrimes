import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import Datatable from "../../components/datatable/Datatable";
const Single= () => {
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
              alt="" 
              className="itemImg"/>
              <div className="details">
                <h1 className="itemTitle">Jane Doe</h1>
                <div className="detailItem">
                  <span className="itemkey">Email:</span>
                  <span className="itemValue">janedoe@gmzil.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemkey">Phone:</span>
                  <span className="itemValue">+1 2459 65 22</span>
                </div>
                <div className="detailItem">
                  <span className="itemkey">Address:</span>
                  <span className="itemValue">Elton St. 234 Garden Yd. Newyork</span>
                </div>
                <div className="detailItem">
                  <span className="itemkey">Country:</span>
                  <span className="itemValue">USA</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={2.5/1} title="User Report"/>
          </div>
        </div>
        <div className="bottom">
          <Datatable/>
        </div>
      </div>
    </div>
  )
}

export default Single
