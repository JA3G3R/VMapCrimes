import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./newroles.scss"
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

function Newroles() {
  return (
    <div className="newroles">
      <Sidebar/>
      <div className="newrolescontainer">
        <Navbar/>
        <div className="top">
          <h1>Add New Roles</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKEAAAB5CAMAAABm4rHGAAAAXVBMVEXy8vJmZmbz8/NjY2P29vb9/f3l5eXu7u5gYGBbW1vMzMxxcXH5+fmJiYmNjY3b29t5eXmpqam+vr6CgoKjo6OTk5PExMSbm5uvr6+4uLhra2vV1dVSUlI/Pz9HR0dIprnbAAAFGklEQVR4nO2bgXKrKhCGERYQBUVRo8m59/0f86KmiSamISJm7hn/6UzbROHLv8uyVovQob9e+NsAb3UQ+usg9NdB6K+D0F8Hob8OQn8dhP46CP11EPrrIPTXQeivg9BfnxHirRSEECMAvpUkOE/8ASEkWmwlncjtCSGJ43QrCZLA5oRUiYKjjaJcCUW3J4xjBhutE8lIHICQELZVbcKMEOo42EH4Ytae0PVY51EPD18e6zzqAuGH+9fkxJ08lCjPuetE81l3IcSoTaPoXDPXzWF67h6EGGWCRFEkzvnniLsQypOIBpHz503mHoSYXwGti+WyiRjAfi3OsMdahuRGGJ8WBwFeaF0n8iVhYA+hvBNmS4MAO8eExKJb6lV393AhyhireEzTy0Kvukse4viWh0vNKK1+FlKEnt/eZU+R7RUh1guDQH63uHpBGLxiQ/UnjggReqFkY65JdPO4fIrzTnsKJCpNdbsQxHuxHOP89Bn22pcBM4aWqom96IomitWjift1X8u9DXARzSTah8/x7f4Q1/GckESXeZy/3GPT9sFCG+d0Xre/66EtNOSR8LHkfNVDjM0zYEREMiX6qoezQjNBPE9Lzjc9lMmCg0Ocs0nJ+WK1AR69IJxtLXsRYuDsYUd5KjRT3S8XdiIE2ZrUtNOZaLOYhNc4m1vd3iUPMTAtiO0cDMc/QwH7BdDG+VZydvEQuImvS+AnGQGpX2LcI/5sLbv02Ej/0IgMjxPL581kLpJe/d7BQ2DmbpfIhonhVaGZpGIt74SO864jxGCmdgllDcHy/JYw+jNeMQQntC30POGE4gD1mxiPLg4lJ3SUMc8eV0Sfi79VmjuhuhE6zruCEMA8L1mhgJa/r+Trga0M7SHwbMksUXNHRFtyghLiV/lmWwNZOgSaGB40yhirVxR2uTi5KGoazkPbyy+3f9epkXRZLiKBYB6CXMzBu4tuy+XMgnmI3tQ8x+USZywK5OEvIb4iui0X0oYhjN60LqM9yMnFMFF+2eDPXKyxk4thPHSSyIB2748N46ErIs/fHxWCMHVFjI1+eyhJt4+yW+8yTv8eUDTbP+eAcEvirURa54k/IZQs2Ups8TaLL+Fwl2kjfWLMJ4Rf0UHor9WEeKhns4SCFffCHSZaex472ct46GY3I52f5fpoppXnAfunk0hmkz/yy6qD24jbZc96Qm36qypLKOFa3KhFlrIvJhJjPLw81Cd7+Wl/Wevv6ijnddFAT8hP6jTEGicXWjSZunRZbV9oVZYD5EqVLUCSZWtTYD1hxoy0hLRueWP6ZQNVSaMTT/6UqKhpqVCjKdIXlGmaa85SvjuhTUJpPUw5gO5NhKKhmgFPqXWOJjlwi2Y/RW6oZbf2rjPRh/CSyTpnxi7pYcGMhJinNraZxBKXEW1OgJmidZfnVef8YOlWhGB56tx+R7JOZoQ9Pip0pWlZDYRZXRTFiudyPAkxNNUpzw08eWjfpMWpj3IzEtYXSVc/I+ZBiJExOdK2pEzycCRU1Ix5qOwvNg8bkO3OeWgXA0ay/DenpoFED2t5Rlh3shOA0hxOml4MZunKZwPX73qVPZXbtcsypYYUk11CTwzx2ga2krkxRd3Ri1aVktAZ8+LJpmCEtuPuT7YXbHbruLYMtjHttxHZ3wzqv+wGwxNqWe2PsLqtCNh9DUOb7rLavckw4YR5W3l2PME72PXhveov7rF300Hor4PQXwehvw5Cfx2E/vo/EG7zD24B9R/MW0weQ1XoGgAAAABJRU5ErkJggg==" 
            alt="profile"
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Role Icon: <DriveFolderUploadIcon className="icon"/>
                </label>
                <input type="file" id="file" style={{display:"none"}}/>
              </div>
              <div className="formInput">
                <label>Name:</label>
                <input type="text" placeholder="Constable"/>
              </div> 
              <div className="formInput">
                <label>Permission Access:</label>
                
                <label for=""><input type="checkbox" name="add Users"/>Can add Users</label> 
                <label for=""><input type="checkbox" name="add FIR"/>Can add FIR</label> 
                

              </div>
              <div className="formInput">
                <label>Give Access:</label>
                
                <label for=""><input type="checkbox" name="type of crime"/>Can view type of crime</label>
                <label for=""><input type="checkbox" name="date of crime"/>Can view date of crime</label>
                <label for=""><input type="checkbox" name="weapons used"/>Can view weapons used</label>
                <label for=""><input type="checkbox" name="evidence"/>Can view evidence</label>
                <label for=""><input type="checkbox" name="name of suspects"/>Can view name of suspects</label>
                 
                
              </div>
              
              
              
              <button>ADD</button>
              
            </form>
          </div>
          </div>
      </div>
    </div>
  )
}

export default Newroles
