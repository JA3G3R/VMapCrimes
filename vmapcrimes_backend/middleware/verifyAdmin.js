// called after express-jwt has added auth property to the request 
const verifyAdmin = (req,res,next) => {
    console.log(req.auth)
    if(!req.auth || !req.auth.role || (req.auth.role !== "admin")) {
        return res.status(401).send({message:"Not authorized",status:"failure"});
    }
    next();
}


module.exports = verifyAdmin;