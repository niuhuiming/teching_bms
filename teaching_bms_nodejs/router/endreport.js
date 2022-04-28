const express = require('express')
const router = express.Router()

const endreport_handler = require('../router_handler/endreport')

router.get('/getEndreportInfo', endreport_handler.getEndreportInfo)
router.post('/deleteEndreportInfo', endreport_handler.deleteEndreportInfo)
router.post('/editEndreportInfo', endreport_handler.editEndreportInfo)
router.post('/addEndreportInfo', endreport_handler.addEndreportInfo)
router.post('/getMyEndreportInfo', endreport_handler.getMyEndreportInfo)
router.post('/submitEndreport', endreport_handler.submitEndreport)

module.exports = router
