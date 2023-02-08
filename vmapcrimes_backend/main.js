const express = require('express');
const { expressjwt : ejwt } = require("express-jwt");
var cookieParser = require('cookie-parser');

const connectToDB = require('.\\db.js');
const adminRoutes = require('./routes/admin');
const uploadRoute = require('./routes/upload')

require('dotenv').config();
connectToDB();

const app = express();

// useful third party middlewares 
app.use(cookieParser());
app.use(express.json());

app.get('/', (req,res)=> {
  res.send("Hello World");
})
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("App started");
  console.log(`VMapCrimes app is listening on port ${port}`);
})

// Handle generic bad request errors
app.use((err, req, res, next) => { 
  if (err.status == 400 ) {
    if(err.name == "UnauthorizedError") {
      res.status(401).json({status:"failure",message:"Invalid JWT token"});
    }
    res.status(400).send("Bad request");
  }
  next()
});

app.use(ejwt({secret: process.env.JWT_SECRET_KEY,algorithms : ['HS256'],getToken: (req) => {
  console.log(req.cookies)
  if(!req.cookies || !req.cookies['auth-token']) {
      throw "Cookie auth-token not present"
      return null;
  }
  return req.cookies['auth-token'];
},
onExpired : async (req,err)=> {
  var tse = new Date()- err.inner.expiredAt;
  console.log(err.name)
  if ( tse < 2000) {return;}
  throw "Session Token expired"
}}).unless({path: ['/api/v1/admin/adminLogin']}));

app.use('/api/v1/admin',adminRoutes);

app.use('/api/data', uploadRoute);
