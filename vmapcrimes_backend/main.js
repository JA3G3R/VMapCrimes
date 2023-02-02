const express = require('express');
const connectToDB = require('.\\db.js');
const app = express();
const port = 3000;
const adminRoutes = require('./routes/admin')

connectToDB();

app.use(express.json());

app.get('/', (req, res) => {
  
  res.send('Hello World!')
})


  
app.listen(port, () => {
  console.log("App started")
  console.log(`Example app listening on port ${port}`)
});

app.use('/api/v1/admin',adminRoutes);