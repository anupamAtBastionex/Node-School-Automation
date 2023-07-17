const mongoose = require('mongoose');

const Staff = require('../models/StaffModel');
const { response } = require('express');

// You may also require other modules or dependencies as needed

//Create a particular staff 
exports.createStaff = async(req, res) => {
// Save the Staff to the database
try
    {
      const { name, father_name, age, mobile, email, admission_date, class_name } = req.body;

    const image           = req.file ? req.file.filename : null;

    const newStaffMember = new Staff({
                                        type: req.body.type,
                                        name: req.body.name,
                                        mobile: req.body.mobile,
                                        email: req.body.email,
                                        department: req.body.department,
                                        joining_date: req.body.joining_date,
                                        speciality: req.body.speciality,
                                        address: 'address' in req.body ? req.body.address : 'NA',
                                        image: req.file ? req.file.filename : null
                                    });
        
        var confirm =  await newStaffMember.save();
        return  res.status(200).json({error: false, message: "Record Added Successfully", data: confirm});
    }catch(err){
    // console.log(err);
    return res.status(500).json({error: true, message : "Something went wrong! "+err.message});
    }
};

//Create staff in bulk
exports.createStaffs = async(req, res) => {
  try
  {
      const data = req.body;     // To get the request array
      var confirm =  await Staff.insertMany(data); // function to insert multiple record 
      return res.status(200).json({error: false, message : "Record Added Successfully", data: confirm});// Send a success response

  }catch(err){
  // console.log(err);
  return res.status(500).json({error: true, message : "Something went wrong! " + err.message});
  }       
};

//Get Particular Staff Records
exports.getStaffById = async(req, res) => {
  try {
        let getQuery = { _id: req.params.stfId }
        //console.log(getQuery);
        let dataArr = await Staff.find(getQuery);
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

//Get all Staff Records
exports.getStaffs = async(req, res) => {
  // Fetch Staffs from the database
        try {
          let dataArr = await Staff.find();
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

//Update Particular Staff Record
exports.updateStaff = async(req, res) => {
    try {
          let StaffId = { _id: req.params.stfId }
          console.log(StaffId);
          let dataArr = await Staff.findOne({_id: StaffId});
          if (!dataArr) 
          {
            return res.status(200).json({error: true, message : "Invalid Staff ID"});
          }
          else 
          {
            let updatedValue  = await Staff.findOneAndUpdate({ _id: StaffId}, {
                                                                                $set:
                                                                                {
                                                                                    type: req.body.type,
                                                                                    name: req.body.name,
                                                                                    mobile: req.body.mobile,
                                                                                    email: req.body.email,
                                                                                    department: req.body.department,
                                                                                    joining_date: req.body.joining_date,
                                                                                    speciality: req.body.speciality,
                                                                                    address: req.body.address,
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

//Delete Particular Staff Record
exports.deleteStaff = async(req, res) => {
  try {
        let StaffId = { _id: req.params.stfId }
        let dataArr = await Staff.findOne({_id: StaffId});
        if (!dataArr) 
        {
          return res.status(200).json({error: true, message : "Invalid Staff ID"});
        }
        else 
        {
          const deletedRecord = await Staff.findByIdAndDelete(StaffId);
          //console.log('Deleted record:', deletedRecord);
          return res.status(200).json({error: false, message: "Record deleted successfully", data: deletedRecord});
        }
      } catch (err) {
          res.status(500).json({ error: true, msg: err.message });
      }
};
