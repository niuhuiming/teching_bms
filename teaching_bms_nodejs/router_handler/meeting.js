const db = require('../db/index')

exports.getMeetingList = (req, res) => {
    const sql = `select * from w_meeting`
    db.query(sql, userinfo.username, (err, results) => {
        if (err) return res.cc(err);
        console.log(results);
        // res.send({
        //     code: 1,
        //     data: {
        //         meetings
        //     }
        // })
    })
}
