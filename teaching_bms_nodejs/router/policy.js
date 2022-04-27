const express = require('express')
const router = express.Router()

const policy_handler = require('../router_handler/policy')

router.get('/getPolicyInfo', policy_handler.getPolicyInfo)
router.post('/addPolicyInfo', policy_handler.addPolicyInfo)
router.post('/addPolicyFile', policy_handler.addPolicyFile)
router.post('/deletePolicyInfo', policy_handler.deletePolicyInfo)
// router.post('/getMyMeetingInfo', policy_handler.getMyMeetingInfo)
// router.post('/submitMeeting', policy_handler.submitMeeting)

module.exports = router
