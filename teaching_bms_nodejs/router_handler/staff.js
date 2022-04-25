const db = require('../db/index')

// 获取用户信息
exports.getStaffList = (req, res) => {
    const sqlStr = `select * from teachers;`
    db.query(sqlStr, (err, response) => {
        if (err) {
            return res.send({
                code: 0,
                data: err.message
            })
        }
        res.send({
            code: 1,
            data: response
        })
    })
}

// 新增
exports.addStaffInfo = (req, res) => {
    const sqlStr = `INSERT INTO teachers VALUES (${req.body.id}, '${req.body.name}', '${req.body.gender}', ${req.body.age}, '${req.body.phone}', '${req.body.password}')`
    db.query(sqlStr, (err, response) => {
        if (err) {
            return res.send({
                code: 0,
                data: err.message
            })
        }
        res.send({
            code: 1,
            data: 'succ'
        })
    })
}

// 删除
exports.deleteStaffInfo = (req, res) => {
    const sqlStr = `delete from teachers where id = '${req.body.id}'`
    db.query(sqlStr, (err, response) => {
        if (err) {
            return res.send({
                code: 0,
                data: err.message
            })
        }
        res.send({
            code: 1,
            data: 'succ'
        })
    })
}

// 编辑
exports.editStaffInfo = (req, res) => {
    const sqlStr = `update teachers set name='${req.body.name}', gender='${req.body.gender}', age=${req.body.age}, phone='${req.body.phone}', password='${req.body.password}' where id='${req.body.id}'`
    db.query(sqlStr, (err, response) => {
        if (err) {
            return res.send({
                code: 0,
                data: err.message
            })
        }
        res.send({
            code: 1,
            data: 'succ'
        })
    })
}