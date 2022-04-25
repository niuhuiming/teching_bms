const express = require('express')
const router = express.Router()

// 导入用户路由处理函数对应的模块
const user_handler = require('../router_handler/meeting')

router.post('/api/getMeetingList', user_handler.getMeetingList)

module.exports = router
