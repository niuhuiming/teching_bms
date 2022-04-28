const express = require('express')
const router = express.Router()

const notice_handler = require('../router_handler/notice')

router.get('/getNoticeInfo', notice_handler.getNoticeInfo)
router.post('/addNoticeInfo', notice_handler.addNoticeInfo)
router.post('/addNoticeFile', notice_handler.addNoticeFile)
router.post('/deleteNoticeInfo', notice_handler.deleteNoticeInfo)
router.get('/downloadNoticeById', notice_handler.downloadNoticeById)

module.exports = router
