const mongoose = require('mongoose');

const StaffType = require('../models/StaffTypeModel');
const { response } = require('express');

// You may also require other modules or dependencies as needed

//Create a particular StaffType 
exports.createStaffType = async(req, res) => {
// Save the StaffType to the database
try
    {
        const newStaffTypeMember = new StaffType({
                                                    title: req.body.title,
                                                    status: 1,
                                                    remarks: req.body.remarks
                                                });
        
        var confirm =  await newStaffTypeMember.save();
        return  res.status(200).json({error: false, message: "Record Added Successfully", data: confirm});
    }catch(err){
    // console.log(err);
    return res.status(500).json({error: true, message : "Something went wrong! "+err.message});
    }
};

//Create StaffType in bulk
exports.createStaffTypes = async(req, res) => {
  try
  {
      const data = req.body;     // To get the request array
      var confirm =  await StaffType.insertMany(data); // function to insert multiple record 
      return res.status(200).json({error: false, message : "Record Added Successfully", data: confirm});// Send a success response

  }catch(err){
  // console.log(err);
  return res.status(500).json({error: true, message : "Something went wrong! " + err.message});
  }       
};

//Get Particular StaffType Records
exports.getStaffTypeById = async(req, res) => {
  try {
        let getQuery = { _id: req.params.stfId }
        //console.log(getQuery);
        let dataArr = await StaffType.find(getQuery);
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

//Get all StaffType Records
exports.getStaffTypes = async(req, res) => {
  // Fetch StaffTypes from the database
        try {
                let dataArr = await StaffType.find();
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

//Update Particular StaffType Record
exports.updateStaffType = async(req, res) => {
    try {
          let StaffTypeId = { _id: req.params.stfId }
          //console.log(StaffTypeId);
          let dataArr = await StaffType.findOne({_id: StaffTypeId});
          if (!dataArr) 
          {
            return res.status(200).json({error: true, message : "Invalid StaffType ID"});
          }
          else 
          {
            let updatedValue  = await StaffType.findOneAndUpdate({ _id: StaffTypeId}, {
                                                                                        $set:
                                                                                        {
                                                                                          title: req.body.title,
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

//Delete Particular StaffType Record
exports.deleteStaffType = async(req, res) => {
  try {
        let StaffTypeId = { _id: req.params.stfId }
        let dataArr = await StaffType.findOne({_id: StaffTypeId});
        if (!dataArr) 
        {
          return res.status(200).json({error: true, message : "Invalid StaffType ID"});
        }
        else 
        {
          const deletedRecord = await StaffType.findByIdAndDelete(StaffTypeId);
          //console.log('Deleted record:', deletedRecord);
          return res.status(200).json({error: false, message: "Record deleted successfully", data: deletedRecord});
        }
      } catch (err) {
          res.status(500).json({ error: true, msg: err.message });
      }
};
