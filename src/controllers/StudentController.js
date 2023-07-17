const mongoose = require('mongoose');
const Student = require('../models/StudentModel');
const { response } = require('express');

// You may also require other modules or dependencies as needed

// GET /Students
exports.getStudents = async(req, res) => {
  // Fetch Students from the database
        try {
          let dataArr = await Student.find();
          if(dataArr.length > 0) 
          {
            return res.status(200).json({error: false, message : "Record listed Successfully", data: dataArr});// Send a success response
          }
          else 
          {
            return res.status(200).json({error: false, message : "No records found!", data: confirm});
          }
      } catch (err) {
          return res.status(500).json({ error: true, msg: err.message });
      }
  };
  
 exports.getStudentById = async(req, res) => {
    try {
          let getQuery = { _id: req.params.stId }
          let dataArr = await Student.find(getQuery);
          if (dataArr.length > 0) 
          {
            return res.status(200).json({error: false, message : "Record listed Successfully", data: dataArr});// Send a success response
          }
          else 
          {
            return res.status(200).json({error: false, message : "No records found!", data: dataArr});
          }
        } catch (err) {
            res.status(500).json({ error: true, msg: err.message });
        }
};

  // POST /Students
exports.createStudents = async(req, res) => {
      try
      {
          const data = req.body;     // To get the request array
          var confirm =  await Student.insertMany(data); // function to insert multiple record 
          return res.status(200).json({error: false, message : "Record Added Successfully", data: confirm});// Send a success response

      }catch(err){
       // console.log(err);
        return res.status(500).json({error: true, message : "Some went wrong! " + err.message});
      }       
  };

exports.createStudent = async(req, res) => {
    // Save the Student to the database
    try
     {
      //var image = req.file.filename;
     //Extract Student data from the request body
      const { name, father_name, age, mobile, email, admission_date, class_name } = req.body;

      const address         = 'address' in req.body ? req.body.address : 'NA';
      const image           = req.file ? req.file.filename : null;

      // Create a new Student instance
        const newStudent = new Student({
                                          name, 
                                          father_name, 
                                          age, 
                                          mobile, 
                                          email, 
                                          admission_date, 
                                          class_name, 
                                          address, 
                                          image
                                        });
        var confirm =  await newStudent.save(); // function to insert record 
        return  res.status(200).json({error: false, message: "Record Added Successfully", data: confirm});
      }catch(err){
       // console.log(err);
        return res.status(500).json({error: true, message : "Some went wrong! "+err.message});
      }
  };

  //Update Particular student Record
exports.updateStudent = async(req, res) => {
    try {
          let studentId = { _id: req.params.stId }
          let dataArr = await Student.findOne({_id: studentId});
          if (!dataArr) 
          {
            return res.status(200).json({error: true, message : "Invalid Student ID"});
          }
          else 
          {
            let updatedValue  = await Student.findOneAndUpdate({ _id: studentId}, {
                $set:
                {
                    name: req.body.name,
                    father_name: req.body.father_name,
                    age: req.body.age,
                    mobile: req.body.mobile,
                    email: req.body.email,
                    admission_date: req.body.admission_date,
                    class_name: req.body.class_name,
                    address: req.body.address,
                    updatedAt: Date.now()
                },
              }, { new: true });

            return res.status(200).json({error: false, message : "Record updated successfully", data: updatedValue});
          }
        } catch (err) {
            res.status(500).json({ error: true, msg: err.message });
        }
};

//Update Particular student Record
exports.deleteStudent = async(req, res) => {
  try {
        let studentId = { _id: req.params.stId }
        let dataArr = await Student.findOne({_id: studentId});
        if (!dataArr) 
        {
          return res.status(200).json({error: true, message : "Invalid Student ID"});
        }
        else 
        {
          const deletedRecord = await Student.findByIdAndDelete(studentId);
          //console.log('Deleted record:', deletedRecord);
          return res.status(200).json({error: false, message: "Record deleted successfully", data: deletedRecord});
        }
      } catch (err) {
          res.status(500).json({ error: true, msg: err.message });
      }
};
