const express = require('express')
const router = express.Router()

const final_handler = require('../router_handler/final')

router.get('/getFinalInfo', final_handler.getFinalInfo)
router.post('/deleteFinalInfo', final_handler.deleteFinalInfo)
router.post('/editFinalInfo', final_handler.editFinalInfo)
router.post('/addFinalInfo', final_handler.addFinalInfo)
router.post('/getMyFinalInfo', final_handler.getMyFinalInfo)
router.post('/submitFinal', final_handler.submitFinal)

module.exports = router
