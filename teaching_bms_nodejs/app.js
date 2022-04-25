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

app.listen(3000, () => {
  console.log('服务启动在3000端口')
})
