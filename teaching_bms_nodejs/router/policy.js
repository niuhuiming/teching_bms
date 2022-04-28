const express = require('express')
const router = express.Router()

const policy_handler = require('../router_handler/policy')

router.get('/getPolicyInfo', policy_handler.getPolicyInfo)
router.post('/addPolicyInfo', policy_handler.addPolicyInfo)
router.post('/addPolicyFile', policy_handler.addPolicyFile)
router.post('/deletePolicyInfo', policy_handler.deletePolicyInfo)
router.get('/downloadPolicyById', policy_handler.downloadPolicyById)

module.exports = router
