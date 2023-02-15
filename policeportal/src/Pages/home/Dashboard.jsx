import Chart from "../../components/chart/Chart"
import Featured from "../../components/featured/Featured"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Table from "../../components/table/Table"
import Widget from "../../components/widget/Widget"
import UserContext from "../../context/userContext"
import { useContext,useEffect,useState } from "react"
import { useNavigate } from "react-router-dom"
import "./dashboard.scss"

const Dashboard = () => {
 
  const { isAuthenticated,verifyAuth } = useContext(UserContext)
  const [firCount,setFirCount ] = useState(0)
  const [userCount,setUserCount ] = useState(0)

  const nav = useNavigate()
  const fetchCount = async () => {
    var firs = await fetch("http://localhost:5001/api/data/fetchFirCount");
    var firsJSON = await firs.json()
    setFirCount(firsJSON.count)
    const options = {credentials: 'include'}
    var users = await fetch("http://localhost:5001/api/users/fetchUserCount",options);
    console.log(users)
    var usersJSON = await users.json()
    verifyAuth(users,usersJSON)
    setUserCount(usersJSON.count)

  }
  useEffect(()=>{if(!isAuthenticated) {
    console.log("User not authenticated, redirecting to login page")
    nav('/login',{replace:true})
  }
  else {
    fetchCount()

  }
})
  return (
    <>
      {
        isAuthenticated ?
          <div className="home">
            <Sidebar />
            <div className="homeContainer">
              <Navbar />

              <div className="widgets">

                <Widget type="user" users={userCount} />
                <Widget type="fir" firs={firCount}/>
              </div>
              <div className="charts">
                <Featured />
                <Chart title="Last 6 Months Report" aspect={2 / 1} />
              </div>
             

            </div>
          </div > : <h3> Redirecting to login page ...</h3>
      }
    </>

  )
}

export default Dashboard
