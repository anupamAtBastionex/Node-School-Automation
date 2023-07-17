const mongoose = require('mongoose');

const Attendance = require('../models/AttendanceModel');
const { response } = require('express');

// You may also require other modules or dependencies as needed

//Create a particular Attendance 
exports.createAttendance = async(req, res) => {
// Save the Attendance to the database
try
    {
        const newAttendanceMember = new Attendance({
                                                        name: req.body.name,
                                                        status: 1,
                                                        remarks: req.body.remarks
                                                    });
        
        var confirm =  await newAttendanceMember.save();
        return  res.status(200).json({error: false, message: "Record Added Successfully", data: confirm});
    }catch(err){
    // console.log(err);
    return res.status(500).json({error: true, message : "Something went wrong! "+err.message});
    }
};

//Create Attendance in bulk
exports.createAttendances = async(req, res) => {
  try
  {
      const data = req.body;     // To get the request array
      var confirm =  await Attendance.insertMany(data); // function to insert multiple record 
      return res.status(200).json({error: false, message : "Record Added Successfully", data: confirm});// Send a success response

  }catch(err){
  // console.log(err);
  return res.status(500).json({error: true, message : "Something went wrong! " + err.message});
  }       
};

//Get Particular Attendance Records
exports.getAttendanceById = async(req, res) => {
  try {
        let getQuery = { _id: req.params.deptId }
        //console.log(getQuery);
        let dataArr = await Attendance.find(getQuery);
        if (dataArr.length > 0) 
        {
          return res.status(200).json({error: false, message : "Record listed Successfully", data: dataArr});// Send a success response
        }
        else 
        {
          return res.status(200).json({error: false, message : "No record found!", data: dataArr});
        }
      } catch (err) {
          res.status(500).json({ error: true, msg: err.message });
      }
};

//Get all Attendance Records
exports.getAttendances = async(req, res) => {
  // Fetch Attendances from the database
        try {
                let dataArr = await Attendance.find();
                if(dataArr.length > 0) 
                {
                  return res.status(200).json({error: false, message : "Records listed Successfully", data: dataArr});// Send a success response
                }
                else 
                {
                  return res.status(200).json({error: false, message : "No record found!", data: confirm});
                }
            } catch (err) {
                return res.status(500).json({ error: true, msg: err.message });
            }
  }; 

//Update Particular Attendance Record
exports.updateAttendance = async(req, res) => {
    try {
          let AttendanceId = { _id: req.params.deptId }
          //console.log(AttendanceId);
          let dataArr = await Attendance.findOne({_id: AttendanceId});
          if (!dataArr) 
          {
            return res.status(200).json({error: true, message : "Invalid Attendance ID"});
          }
          else 
          {
            let updatedValue  = await Attendance.findOneAndUpdate({ _id: AttendanceId}, {
                                                                                        $set:
                                                                                        {
                                                                                          name: req.body.name,
                                                                                          remarks: req.body.remarks,
                                                                                          updatedAt: Date.now()
                                                                                        },
                                                                                      }, { new: true });
              //console.log(req.body);                                                                              
            return res.status(200).json({error: false, message : "Record updated successfully", data: updatedValue});
          }
        } catch (err) {
            res.status(500).json({ error: true, msg: err.message });
        }
};

//Delete Particular Attendance Record
exports.deleteAttendance = async(req, res) => {
  try {
        let AttendanceId = { _id: req.params.deptId }
        let dataArr = await Attendance.findOne({_id: AttendanceId});
        if (!dataArr) 
        {
          return res.status(200).json({error: true, message : "Invalid Attendance ID"});
        }
        else 
        {
          const deletedRecord = await Attendance.findByIdAndDelete(AttendanceId);
          //console.log('Deleted record:', deletedRecord);
          return res.status(200).json({error: false, message: "Record deleted successfully", data: deletedRecord});
        }
      } catch (err) {
          res.status(500).json({ error: true, msg: err.message });
      }
};
