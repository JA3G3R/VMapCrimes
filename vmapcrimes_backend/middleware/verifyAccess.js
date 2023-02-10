// called after express-jwt has added auth property to the request 
const config = require("../config/defaultConfig")
const users =  require("../models/User")
const roles =  require("../models/Roles")



const verifyAccess = (perms = {"READ_PERMS":['None'] , "ACTION_PERMS" : ['None']}) => { 
    
    return async (req,res,next) => {
        if (!req.auth || !req.auth.id || !(typeof req.auth.id === "string" ) || !(/^[a-zA-Z0-9]+$/.test(req.auth.id)) ) {
            return res.status(401).json({status:"failure",message : "Not Authenticated"})
        }
        let userWithRole = await users.findOne({_id : req.auth.id});
        console.log("Access from user "+userWithRole.name)
        if(userWithRole) {
            let userRoleId = userWithRole.role;
            let userRole = await roles.findOne(({_id : userRoleId}));
            if(userRole.name !== "admin") { 
        

                if(perms.READ_PERMS.length > userRole.read_perms.length || perms.ACTION_PERMS.length > userRole.action_perms.length) {
                    return res.status(401).json({status:"failure",message:"Insufficient Permissions"})
                }
                
                if(!perms.READ_PERMS.every(perm => {userRole.read_perms.includes(perm)}) || !perms.ACTION_PERMS.every(perm => { userRole.action_perms.includes(perm) })){
                    return res.status(401).json({status:"failure",message:"Insufficient Permissions"})

                }
            }
            next();
        }else{

            return res.status(401).json({status:"failure",message : "User not found"})
        }
    
        
    }
}
module.exports = verifyAccess;
