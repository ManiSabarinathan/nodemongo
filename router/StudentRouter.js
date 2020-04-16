const express = require('express');

function routes(Student) {
    const studRouter = express.Router();
    studRouter.route('/createStudent')
        .post((req, res) => {
            const newStudent = new Student({
                studentname: req.body.studentname,
                studentage: req.body.studentage
            });
            newStudent.save();
            res.status(201).json({
                Status: 'Success',
                Message: 'Inserted successfully into MongoDB'
            });
        })

    studRouter.route('/getStudents')
        .get((req, res) => {
            Student.find((err, document) => {
                if (err) {
                    res.send(err)
                } else {
                    return res.json(document);
                }
            })
        });

    studRouter.route('/getAllStudents')
        .get((req, res) => {
            Student.find().then(document => {
                return res.json(document);
            }).catch((err) => {
                return res.json({ 'Respose': `$err Unable to get the response back` });
            })
        });

    //Use Params: req.params.studentname ->  http://localhost:3001/getStudentByName/newpapu
    studRouter.route('/getStudentByName/:studentname')
        .get((req, res) => {
            Student.find({ 'studentname': req.params.studentname }, (err, document) => {
                if (err) {
                    res.send(err);
                } else {
                    return res.json(document);
                }
            })
        })

    //Creating a Middleware
    studRouter.use('/byId/:id',(req, res, next) => {
            Student.findById(req.params.id, (err, student) => {
                if (err) {
                    return res.send(err);
                }
                if (student) {
                    req.student = student;
                    return next();//Sending to the downstream system
                }
                return res.sendStatus(404);
            })
        });

    studRouter.route('/byId/:id')
        .get((req, res) => {
            console.log("===> " + req.student.studentage);
            return res.json(req.student);
        })
        .put((req,res) =>  {
            const {student}= req;
            student.studentname = req.body.studentname;
            student.studentage = req.body.studentage;
            req.student.save((err)=> {
                if(err) {
                    return res.send(err);
                }
                return res.json(student);
            });
        })
       .patch((req,res)=> {
           //Get the req student object
           const {student} = req;
          
           //Delete the entry _id if we provide as an input to update the _id
           if(req.body._id){
               delete req.body._id;
           }
           //patch the attributes whichever is available in request payload, meaning update only the provide data
           Object.entries(req.body).forEach((entry)=> {
                const key = entry[0];
                const value = entry[1];
                student[key] = value;
          });
          req.student.save((err)=> {
              if(err) {
                  return res.send(err);
              }
              return res.json(student);
          });

       })
       .delete((req,res) => {
           req.student.remove((err)=> {
               if(err) {
                   return res.send(err);
               }
               return res.sendStatus(204);
           });
       });

    //Use Query Params(?=) 
    //http://localhost:3001/getStudentByQuery?studentage=100
    //http://localhost:3001/getStudentByQuery?studentname=newjuju
    //http://localhost:3001/getStudentByQuery?studentname=newjuju&studentage=8
    studRouter.route('/getStudentByQuery')
        .get((req, res) => {
            const query = req.query;
            Student.find(query, (err, document) => {
                if (err) {
                    res.send(err);
                } else {
                    return res.json(document);
                }
            })
        })
    return studRouter;
}

module.exports = routes;