var express = require('express');
var router = express.Router();
const userCtroller = require('../controllres/usercontroller')
const auth = require('../middleware/auth');

// router ไม่เข้ารหัส Token 
router.post('/register', userCtroller.register );
router.post('/login', userCtroller.login );
// router vertifyToken
router.put('/update',auth, userCtroller.update );
router.delete('/delete',auth, userCtroller.delete );



module.exports = router;

