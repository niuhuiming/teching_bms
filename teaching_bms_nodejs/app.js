const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

const loginRouter = require('./router/login')
app.use('/api', loginRouter)

app.listen(3000, () => {
  console.log('服务启动在3000端口')
})
