1.  Install nodejs


2. node —version
        npm init 
	This will create a project with default settings including package.json
 

3. Install express :: npm install express 
    1. Needed for endpoint creation
    
4. Install nodemond :: npm install nodemon
    1. Needed for auto restart of the node server for any changes in the code
	 2. To use nodemon, update package.json:
		 "start": "nodemon Main.js"


Main.js:

const express = require('express')
const app = express();

app.get("/",(req,res,next) => {
    res.json({name:'juju', age:8});
});

app.listen(3000, () => {
    console.log("Running on port 3000");
})

module.exports = app;

To run: npm start  ( This will start the server with nodemon since we defined the entry in package.jso)


To Connect with MongoDB:

5. Install Mongoose 
    1. npm install mongoose


6. Create a model: Student.js

const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    studentname:{type:String,required:true},
    studentage:{type:String,required:true}   
});

module.exports = mongoose.model(Student,studentSchema);

------------

Install body-parse and use it the application to avoid json error in postman:
npm install body-parser

Sample Error:
TypeError: Cannot read property &#39;studentname&#39; of undefined<br>

const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

-------------
Test the application:
http://localhost:3001/createStudent
{
	"studentname":"newjuju",
	"studentage": "8"
}

Sample output: 
> db.students.find()
{ "_id" : ObjectId("5e96b2c7f8ced739e41ba464"), "studentname" : "newjuju", "studentage" : "8", "__v" : 0 }
> 
