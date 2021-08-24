const { Router } = require('express');
const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();

const EMP_CONTROLLER = require('../controllers/Employee');

// ROUTER.get('/', (req,res)=>{
//     res.send('Express is working correctly in codeAffection code.');
// });

ROUTER.get('/', (req,res)=>{
    res.render("employee/add", {
        viewTitle: "Insert employee"
    });
});

ROUTER.post("/employee-insert", EMP_CONTROLLER.insert);
ROUTER.get('/employee-list', EMP_CONTROLLER.display);
ROUTER.get('/employee-details/:id', EMP_CONTROLLER.employeeExistingRecord);
ROUTER.post('/employee-update', EMP_CONTROLLER.update);
ROUTER.get('/employee-delete/:id', EMP_CONTROLLER.Delete);

module.exports = ROUTER;