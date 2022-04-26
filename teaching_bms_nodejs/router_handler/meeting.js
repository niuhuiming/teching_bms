const db = require('../db/index')
const multiparty = require('multiparty');
const fs = require('fs')

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
    clearDir(`./public/${req.body.title}`)
    fs.rmdir(`./public/${req.body.title}`, err => { })
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
    let sqlStr = `select title from w_meeting where id_meeting='${req.body.id_meeting}' `
    db.query(sqlStr, (err, response) => {
        fs.renameSync(`./public/${response[0].title}`, `./public/${req.body.title}`);
        // console.log(response);
    })
    sqlStr = `update w_meeting set date_meeting='${req.body.date_meeting}', title='${req.body.title}', place='${req.body.place}' where id_meeting='${req.body.id_meeting}'`
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
    // 为用户提交新建文件夹
    fs.mkdirSync(`./public/${req.body.title}`)
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

// 用户-获取会议信息
exports.getMyMeetingInfo = (req, res) => {
    // console.log('getMyMeetingInfo已被请求', req.body);
    let sqlStr = `select * from task_meeting where id_teacher = '${req.body.id}';`
    db.query(sqlStr, (err, response) => {
        if (err) {
            return res.send({
                code: 0,
                data: err.message
            })
        }
        let arr = [];
        response.forEach(p => {
            arr.push(p.id_meeting)
        });
        sqlStr = `select * from w_meeting where id_meeting in (${arr.join(',')});`;
        // console.log(sqlStr);
        db.query(sqlStr, (err, response2) => {
            res.send({
                code: 1,
                data: response2
            })
        })
    })
}

// 用户-提交会议信息
exports.submitMeeting = (req, res) => {
    // console.log('submitMeeting被调用了');
    //利用multiparty中间件获取文件数据
    let uploadDir = './' //这个不用改，因为并不是保存在这个目录下，这只是作为中间目录，待会要重命名文件到指定目录的

    let form = new multiparty.Form()

    form.uploadDir = uploadDir
    form.keepExtensions = true; //是否保留后缀
    form.parse(req, function (err, fields, files) { //其中fields表示你提交的表单数据对象，files表示你提交的文件对象
        // console.log("上传文件", fields)
        // console.log("files", files)
        //这里是save_path 就是前端传回来的 path 字段，这个字段会被 multiparty 中间件解析到 fields 里面 ，这里的 fields 相当于 req.body 的意思
        let save_path = fields.path

        // console.log(fields);
        const sqlStr = `delete from task_meeting where id_teacher = '${fields.userid}' and id_meeting = '${fields.id_meeting}';`
        db.query(sqlStr, (err, res) => {
            if (err) console.log(err);
            // else console.log(res);
        })

        let file_list = []
        if (!files.file) res.send({
            code: 0,
            data: '上传失败'
        })
        else {
            //所有文件重命名，（因为不重名的话是随机文件名）
            files.file.forEach(file => {
                /*
                 * file.path 文件路径
                 * save_path+originalFilename   指定上传的路径 + 原来的名字
                 */
                // console.log(file.path, save_path, file.originalFilename,);
                fs.rename(file.path, save_path + file.originalFilename, function (err) {
                    if (err) {
                        // console.log("重命名失败")
                    } else {
                        // console.log("重命名成功")
                    }
                });
            })
            if (err) {
                console.log(err)
                res.send({
                    code: 0,
                    data: '上传失败'
                })
            } else {
                //返回所有上传的文件信息
                res.send({
                    code: 1,
                    data: '上传成功'
                })
            }
        }
    })
}


/**
 * 删除文件夹下所有问价及将文件夹下所有文件清空
 * @param {*} path 
 */
function emptyDir(path) {
    const files = fs.readdirSync(path);
    files.forEach(file => {
        const filePath = `${path}/${file}`;
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            emptyDir(filePath);
        } else {
            fs.unlinkSync(filePath);
            console.log(`删除${file}文件成功`);
        }
    });
}

/**
 * 删除指定路径下的所有空文件夹
 * @param {*} path 
 */
function rmEmptyDir(path, level = 0) {
    const files = fs.readdirSync(path);
    if (files.length > 0) {
        let tempFile = 0;
        files.forEach(file => {
            tempFile++;
            rmEmptyDir(`${path}/${file}`, 1);
        });
        if (tempFile === files.length && level !== 0) {
            fs.rmdirSync(path);
        }
    }
    else {
        level !== 0 && fs.rmdirSync(path);
    }
}

/**
 * 清空指定路径下的所有文件及文件夹
 * @param {*} path 
 */
function clearDir(path) {
    emptyDir(path);
    rmEmptyDir(path);
}