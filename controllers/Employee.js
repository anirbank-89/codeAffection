var mongoose = require('mongoose')
const EMPLOYEE_DETAILS = require('../models/employee');

var insert = async (req,res)=>{
    // console.log(req.body);
    let saveData = {
        _id: mongoose.Types.ObjectId(),
        fullname: req.body.fullName,
        email: req.body.email,
        mobile: req.body.mobile,
        city: req.body.city
    }

    var employee = new EMPLOYEE_DETAILS(saveData);
    employee.save((err,docs)=>{
        if(!err) {
            res.redirect('/employee-list');
        }
        else {
            // to check whether err is due to empty 'fullName' input
            if (err.name == 'ValidationError') {      // 'name' attribute of err object
                handleValidationError(err, req.body);
                res.render("employee/add", {
                    viewTitle: "Insert employee",
                    employee: req.body
                });
            }
            console.log("Couldn't insert data due to error: "+err);
        }
    });
}

var display = async (req,res)=>{
    // res.json('from list');
    EMPLOYEE_DETAILS.find({}).lean()
      // execute query
      .exec((err,docs)=>{
        if(!err) {
            res.render('employee/employee-list', {
                list: docs
            });
        }
        else {
            console.log('Failed to fetch data due to'+err);
        }
      });
}

var employeeExistingRecord = async (req,res)=>{
    EMPLOYEE_DETAILS.findById(req.params.id).lean()
      // execute query
      .exec((err, docs)=>{
        if (!err) {
            res.render('employee/edit', {
                viewTitle: "Update employee",
                employee: docs
            });
        }
        else {
            console.log(err);
        }
      })
}

var update = async (req,res)=>{
    EMPLOYEE_DETAILS.findOneAndUpdate(
        {_id: {$in: [mongoose.Types.ObjectId(req.body.id)]}}, 
        req.body, 
        { new: true}, 
        (err,docs)=>{
            if(!err) {
                res.redirect('/employee-list');
            }
            else {
                if (err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render("employee/edit", {
                        viewTitle: "Update employee",
                        employee: req.body
                    });
                }
                else{
                    console.log("Couldn't update data due to: "+err);
                }
            }
        });
}

var Delete = async (req,res)=>{
    EMPLOYEE_DETAILS.deleteOne({_id: {$in: [mongoose.Types.ObjectId(req.params.id)]}})
      .then(data=>{
          res.redirect('/employee-list')
      })
      .catch(err=>{
          console.log("Couldn't delete data due to: "+err);
      })
}

function handleValidationError(err, obj) {
    for(field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullname': 
                obj['fullNameError'] = err.errors[field].message;
                break;
            case 'email': 
                obj['emailError'] = err.errors[field].message;
                break;
            case 'mobile':
                obj['mobileNumberError'] = err.errors[field].message;
                break;
            default: 
                break;
        }
    }
}

module.exports = {
    insert,
    display,
    employeeExistingRecord,
    update,
    Delete
}