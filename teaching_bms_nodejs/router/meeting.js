const express = require('express')
const router = express.Router()

const meeting_handler = require('../router_handler/meeting')

router.get('/getMettingInfo', meeting_handler.getMettingInfo)
router.post('/deleteMettingInfo', meeting_handler.deleteMettingInfo)
router.post('/editMettingInfo', meeting_handler.editMettingInfo)
router.post('/addMettingInfo', meeting_handler.addMettingInfo)
router.post('/getMyMeetingInfo', meeting_handler.getMyMeetingInfo)
router.post('/submitMeeting', meeting_handler.submitMeeting)

module.exports = router
