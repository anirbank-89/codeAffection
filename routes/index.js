const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();

const EMP_CONTROLLER = require('../controllers/Employee');

ROUTER.get('/', (req,res)=>{
    res.send('Express is working correctly in codeAffection code.');
});

module.exports = ROUTER;