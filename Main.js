const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Student = require('./model/Student');
const studentRouter = require('./router/StudentRouter')(Student);


mongoose.connect('mongodb://localhost:27017/studentdb',
    { useNewUrlParser: true ,
      useUnifiedTopology: true 
    } 
    )
mongoose.connection 
.then(() => {
    console.log("Connected to MongoDB with the port 27017");
})
.catch((error)=> {
    console.log(`Unable to connect to MongoDB :: ${error.message}`);  
})
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 

app.use('/api', studentRouter ); 

app.listen(3001, () => {
    console.log("Running on port 3001");
})

module.exports = app; 