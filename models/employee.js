const MONGOOSE = require('mongoose');
const SCHEMA = MONGOOSE.Schema;

const EMPLOYEE_SCHEMA = new SCHEMA({
    _id:MONGOOSE.Schema.Types.ObjectId,
    fullname:{
        type: String,
        required: "This field is required"
    },
    email:{
        type: String
        // required: "Email is required",
    },
    mobile:{
        type: String,
        required: "Mobile number is required",
    },
    city:{
        type: String
    }
});

EMPLOYEE_SCHEMA.path('email').validate(val => {
    emailRegex = /[a-z0-9._%+]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    return emailRegex.test(val);
}, "Invalid email format");

module.exports = MONGOOSE.model('employee_details', EMPLOYEE_SCHEMA);