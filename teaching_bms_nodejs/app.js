const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

const loginRouter = require('./router/login')
app.use('/api', loginRouter)
const staffRouter = require('./router/staff')
app.use('/api', staffRouter)
const meetingRouter = require('./router/meeting')
app.use('/api', meetingRouter)
const policyRouter = require('./router/policy')
app.use('/api', policyRouter)
//
const finalRouter = require('./router/final')
app.use('/api', finalRouter)
const endReportRouter = require('./router/endreport')
app.use('/api', endReportRouter)

app.listen(3000, () => {
  console.log('服务启动在3000端口')
})
