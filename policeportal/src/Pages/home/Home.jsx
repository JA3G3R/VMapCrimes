import Chart from "../../components/chart/Chart"
import Featured from "../../components/featured/Featured"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Table from "../../components/table/Table"
import Widget from "../../components/widget/Widget"


import "./home.scss"

const Home = () => {
  return (
    <div className="home">
      <Sidebar/>
      <div className="homeContainer">
        <Navbar/>
        
        <div className="widgets">
         
          <Widget type="user"/>
          <Widget type="cases"/>
          <Widget type="fir"/>
          <Widget type="area"/>
        </div>
        <div className="charts">
          <Featured/>
          <Chart title="Last 6 Months Report" aspect={2/1}/>
        </div>
        <div className="listcontainer">
          <div className="listTitle">Latest Criminals</div>
          <Table/>
        </div>
        
      </div>
    </div>
  )
}

export default Home
