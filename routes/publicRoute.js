const express = require('express')
const { getAllUsers } = require('../controllers/getContollers')
const router = express.Router(); 
router.get('/list',getAllUsers)

module.exports = router