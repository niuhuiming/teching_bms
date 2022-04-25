const db = require('../db/index')

// 管理员-获取会议信息
exports.getMettingInfo = (req, res) => {
    const sqlStr = `select * from w_meeting;`
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

// 管理员-删除会议信息
exports.deleteMettingInfo = (req, res) => {
    const sqlStr = `delete from w_meeting where id_meeting = '${req.body.id}'`
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

// 管理员-编辑会议信息
exports.editMettingInfo = (req, res) => {
    const sqlStr = `update w_meeting set date_meeting='${req.body.date_meeting}', title='${req.body.title}', place='${req.body.place}' where id_meeting='${req.body.id_meeting}'`
    // console.log(sqlStr);
    db.query(sqlStr, (err, response) => {
        if (err) {
            // console.log(err.message);
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

// 管理员-增加会议信息
exports.addMettingInfo = (req, res) => {
    const sqlStr = `insert into w_meeting(date_meeting, title, place) values ('${req.body.date_meeting}', '${req.body.title}', '${req.body.place}')`
    // console.log(sqlStr);
    db.query(sqlStr, (err, response) => {
        if (err) {
            // console.log(err.message);
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