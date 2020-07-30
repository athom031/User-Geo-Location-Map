const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/userController');
//import register function from user controller

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
//router will call ctrlUser on /api/register
router.post('/authenticate', ctrlUser.authenticate); 
//login authentication
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile); //defines route function
//function will be passed before ctrlUser.userProfile
    //verify jwt token defined in config jwtHelper



module.exports = router;