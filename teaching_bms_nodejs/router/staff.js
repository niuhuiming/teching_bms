const express = require('express')
const router = express.Router()

const staff_handler = require('../router_handler/staff')

router.get('/getStaffList', staff_handler.getStaffList)
router.post('/addStaffInfo', staff_handler.addStaffInfo)
router.post('/editStaffInfo', staff_handler.editStaffInfo)
router.post('/deleteStaffInfo', staff_handler.deleteStaffInfo)

module.exports = router
