const express = require('express')
const router = express.Router()

const check_handler = require('../router_handler/check')

router.get('/getCheckInfo', check_handler.getCheckInfo)
router.post('/addCheckInfo', check_handler.addCheckInfo)
router.post('/addCheckFile', check_handler.addCheckFile)
router.post('/deleteCheckInfo', check_handler.deleteCheckInfo)
router.get('/downloadCheckById', check_handler.downloadCheckById)

module.exports = router
