const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/userController');
const postUser = require('../controllers/infoChangeController');
const signUser = require('../controllers/logController');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);

//signin/signoff
router.post('/authenticate', signUser.authenticate); 
router.post('/signin', signUser.signin);
router.post('/signoff', signUser.signoff);
router.get('/userProfile', jwtHelper.verifyJwtToken, signUser.userProfile); 

//update User Info
router.post('/changeName', postUser.changeName);
router.post('/changePassword', postUser.changePassword);
router.post('/changeAddress', postUser.changeAddress);

module.exports = router;