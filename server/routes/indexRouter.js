const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/userController');
//import register function from user controller

router.post('/register', ctrlUser.register);
//router will call ctrlUser on /api/register

module.exports = router;
