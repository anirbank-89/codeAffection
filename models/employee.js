const MONGOOSE = require('mongoose');
const SCHEMA = MONGOOSE.Schema;

const EMPLOYEE_SCHEMA = new SCHEMA({
    fullname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    mobile:{
        type: String,
        unique: true
    },
    city:{
        type: String,
    }
});

module.exports = MONGOOSE.model('employee_details', EMPLOYEE_SCHEMA);