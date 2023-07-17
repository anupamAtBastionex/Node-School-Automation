const mongoose = require('mongoose');

const Department = require('../models/DepartmentModel');
const { response } = require('express');

// You may also require other modules or dependencies as needed

//Create a particular Department 
exports.createDepartment = async(req, res) => {
// Save the Department to the database
try
    {
        const newDepartmentMember = new Department({
                                                    name: req.body.name,
                                                    status: 1,
                                                    remarks: req.body.remarks
                                                });
        
        var confirm =  await newDepartmentMember.save();
        return  res.status(200).json({error: false, message: "Record Added Successfully", data: confirm});
    }catch(err){
    // console.log(err);
    return res.status(500).json({error: true, message : "Something went wrong! "+err.message});
    }
};

//Create Department in bulk
exports.createDepartments = async(req, res) => {
  try
  {
      const data = req.body;     // To get the request array
      var confirm =  await Department.insertMany(data); // function to insert multiple record 
      return res.status(200).json({error: false, message : "Record Added Successfully", data: confirm});// Send a success response

  }catch(err){
  // console.log(err);
  return res.status(500).json({error: true, message : "Something went wrong! " + err.message});
  }       
};

//Get Particular Department Records
exports.getDepartmentById = async(req, res) => {
  try {
        let getQuery = { _id: req.params.deptId }
        //console.log(getQuery);
        let dataArr = await Department.find(getQuery);
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

//Get all Department Records
exports.getDepartments = async(req, res) => {
  // Fetch Departments from the database
        try {
                let dataArr = await Department.find();
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

//Update Particular Department Record
exports.updateDepartment = async(req, res) => {
    try {
          let DepartmentId = { _id: req.params.deptId }
          //console.log(DepartmentId);
          let dataArr = await Department.findOne({_id: DepartmentId});
          if (!dataArr) 
          {
            return res.status(200).json({error: true, message : "Invalid Department ID"});
          }
          else 
          {
            let updatedValue  = await Department.findOneAndUpdate({ _id: DepartmentId}, {
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

//Delete Particular Department Record
exports.deleteDepartment = async(req, res) => {
  try {
        let DepartmentId = { _id: req.params.deptId }
        let dataArr = await Department.findOne({_id: DepartmentId});
        if (!dataArr) 
        {
          return res.status(200).json({error: true, message : "Invalid Department ID"});
        }
        else 
        {
          const deletedRecord = await Department.findByIdAndDelete(DepartmentId);
          //console.log('Deleted record:', deletedRecord);
          return res.status(200).json({error: false, message: "Record deleted successfully", data: deletedRecord});
        }
      } catch (err) {
          res.status(500).json({ error: true, msg: err.message });
      }
};
