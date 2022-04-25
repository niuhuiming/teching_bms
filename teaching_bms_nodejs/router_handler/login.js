const db = require('../db/index')
const jwt = require('jsonwebtoken')

// 登录
exports.login = (req, res) => {
    // 前端请求的数据
    let reqBody = req.body
    let sqlStr = `select * from admins where username = '${reqBody.username}' and password = '${reqBody.password}'`
    db.query(sqlStr, (err, results) => {
        if (err) {
            return res.send({
                code: 1,
                data: err.message
            })
        }
        // 检查是否是管理员
        if (results.length) {
            // 生成token
            let username = results[0].username, password = results[0].password
            let token = jwt.sign({ username, password }, 'secret', { expiresIn: 3600 * 24 * 7 })
            res.send({
                code: 1,
                data: token
            })
        } else {
            // 检查是否是用户
            sqlStr = `select * from teachers where id = '${reqBody.username}' and password = '${reqBody.password}'`
            db.query(sqlStr, (err, results) => {
                if (err) {
                    return res.send({
                        code: 1,
                        data: err.message
                    })
                }
                if (results.length) {
                    let username = results[0].id, password = results[0].password
                    let token = jwt.sign({ username, password }, 'secret', { expiresIn: 3600 * 24 * 7 })
                    res.send({
                        code: 1,
                        data: token
                    })
                } else {
                    // 无此人信息
                    return res.send({
                        code: 0,
                        data: '账号或密-码错误'
                    })
                }
            })
        }
    })
}

// 获取用户信息
exports.getUserInfo = (req, res) => {
    let { token } = req.headers
    console.log('token', token);
    // 验证token
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            console.log('TOKEN ERR');
            return res.send({
                code: 0,
                data: '请重新登录'
            })
        }
        console.log('username', decoded.username);
        if (decoded.username === 'admin') {
            res.send({
                code: 1,
                data: {
                    role: 'admin'
                }
            })
        } else {
            res.send({
                code: 1,
                data: {
                    role: 'user'
                }
            })
        }
    })
}
