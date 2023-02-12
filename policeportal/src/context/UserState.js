import React,{ useState,useEffect } from "react";
import UserContext from "./userContext"


// Used to implement conditional rendering of components...
// Will contain a user state variable, which will be populated by the user's info like permissions

const UserState = (props) => 

{
    const [authuser,setAuthUser] = useState({})
    const [isAuthenticated,setIsAuthenticated] =useState(document.cookie.indexOf("auth-token=")!==-1) //isAuthenticated relies explicitly on auth-token cookie
    const perms =   {
      ACTION_ROLES :
   [
     
      "CREATE_USER", // Ability to Create new Users
      "EDIT_USER",  // Ability to edit other user's data
      "DELETE_USER", // ability to delete user
      "ADD_NEW_ROLE",// ability to add custom roles
      "EDIT_ROLE",
      "DELETE_ROLE",
      "CREATE_FIR",
      "EDIT_FIR",
   ],
      READ_ROLES :
    [
          "READ_ALL_USERS", // Read Roles and Names of all users
          "READ_FULL_USER", // Address, Phone number and all other details of other users
          "READ_ALL_ROLES",
          "CRIME_TYPE",
          "DATE_OF_CRIME",
          "CRIME_USED_WEAPONS",
          "CRIME_EVIDENCE",
          "CRIME_SUSPECTS",
          "CRIME_VICTIMS",
          "THEFT_AMOUNT",
  
    ]
  }
    console.log("isAuthenticated is "+isAuthenticated)

    const logUserout = () => {
      setAuthUser({})
      setIsAuthenticated(false)
      document.cookie="name=auth-token; expires=Sun, 20 Aug 2000 12:00:00 UTC";
    }

    const verifyAccess = (perms = {READ_PERMS:['Blank'] , ACTION_PERMS : ['Blank']}) => {
      if(!Array.isArray(authuser.read_perms) || !Array.isArray(authuser.action_perms)){
        return false
      }
        if(!(authuser.rolename === "admin") ) {
          if((Array.isArray(perms.READ_PERMS) && authuser.read_perms && perms.READ_PERMS.length > authuser.read_perms.length) ||(Array.isArray(perms.ACTION_PERMS) && authuser.action_perms && perms.ACTION_PERMS.length > authuser.action_perms.length)) {

        }
        var permsInc;
        var firstCheck=false,secCheck=false
        if(Array.isArray(perms.READ_PERMS) ){


          permsInc = perms.READ_PERMS.every(perm => { return authuser.read_perms.includes(perm) })
          firstCheck =  !permsInc
        }
        if(Array.isArray(perms.ACTION_PERMS) ) {
          secCheck = (!perms.ACTION_PERMS.every(perm => { return authuser.action_perms.includes(perm) }) )
        }
        if( firstCheck  || secCheck ){

          return false
        }
       
      }
      return true
     }
    const data = {msg: "hello world" }
    useEffect(()=> {
      (async()=>{
          const options = {
            method: "GET",
            credentials : 'include',
            headers : {
              "Content-type": "application/json",
            }
          }
          const permRes = await fetch("http://localhost:5001/api/users/fetchAuthUser",options)
          if(permRes.status === 200) {
            setIsAuthenticated(true)
            const updatedUser = await permRes.json()
            setAuthUser(updatedUser)
            console.log("Updated User: "+JSON.stringify(updatedUser))
          }else{
            setIsAuthenticated(false)
            setAuthUser({})
          }
        
      })()
      // eslint-disable-next-line
    },[ ])
    
   
  return (
    
      <>
      <UserContext.Provider value={ {data,isAuthenticated,authuser,setAuthUser,setIsAuthenticated,logUserout, verifyAccess ,perms } }>
        {props.children}
      </UserContext.Provider>
      </>
  )
}

export default UserState
