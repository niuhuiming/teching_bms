const db = require('../db/index')
const multiparty = require('multiparty');
const fs = require('fs')
var path=require('path');
var { nanoid } = require("nanoid");

// 管理员-获取会议列表
exports.getEndreportInfo = (req, res) => {
    const sqlStr = `select * from w_endreport;`
    db.query(sqlStr, (err, response) => {
        if (err) {
            console.log('[error]', err.message);
            return res.send({ code: 0, data: err.message })
        }
        res.send({ code: 1, data: response })
    })
}

// 管理员-删除会议
exports.deleteEndreportInfo = (req, res) => {
    // 删除相关会议文件夹下的所有内容
    try {
        clearDir(`./public/endreport/${req.body.title}`)
        fs.rmdir(`./public/endreport/${req.body.title}`, err => { })
    } catch (error) {
        console.log('[error]', error.message);
    }

    const sqlStr = `delete from w_endreport where id_endreport = '${req.body.id}'`
    db.query(sqlStr, (err, response) => {
        if (err) {
            console.log('[error]', err.message);
            return res.send({ code: 0, data: err.message })
        }
        res.send({ code: 1, data: response })
    })
}

// 管理员-编辑会议
exports.editEndreportInfo = (req, res) => {
    let sqlStr = `select title from w_endreport where id_endreport='${req.body.id_endreport}' `
    // 需要将文件夹名字和表单信息保持一致
    db.query(sqlStr, (err, response) => {
        if (err) {
            console.log('[error]', err.message);
            return res.send({ code: 0, data: err.message })
        }
        fs.renameSync(`./public/endreport/${response[0].title}`, `./public/endreport/${req.body.title}`);
    })

    sqlStr = `update w_endreport set date_meeting='${req.body.date_meeting}', title='${req.body.title}', place='${req.body.place}' where id_endreport='${req.body.id_endreport}'`
    db.query(sqlStr, (err, response) => {
        if (err) {
            console.log('[error]', err.message);
            return res.send({ code: 0, data: err.message })
        }
        res.send({ code: 1, data: 'success' })
    })
}

// 管理员-添加会议并下发任务
exports.addEndreportInfo = (req, res) => {
    // 异步获取用户id列表
    const teachers = () => {
        let sql = `select id from teachers;`
        return new Promise((resolve, reject) => {
            db.query(sql, (err, result) => {
                if (err) {
                    console.log('[error]', err.message);
                } else {
                    resolve(result);
                }
            })
        });
    }

    // 为会议产生id
    const id_meeting = nanoid();
    // 为每个用户添加任务
    teachers(1).then(myData => {
        // 这里的myData是上面异步的执行结果
        // console.log(myData);
        myData.forEach((p) => {
            let sqlStr = `insert into task_endreport(id_teacher, id_endreport) values ('${p.id}', '${id_meeting}');`
            db.query(sqlStr, (err, response) => {
                if (err) {
                    console.log('[error]', err.message);
                    return res.send({ code: 0, data: err.message })
                }
            })
        })
    });

    // 为新会议新建文件夹
    fs.mkdirSync(`./public/endreport/${req.body.title}`)
    // 在会议表中保存会议信息
    sqlStr = `insert into w_endreport(id_endreport, date_meeting, title, place) values ('${id_meeting}', '${req.body.date_meeting}', '${req.body.title}', '${req.body.place}');`
    db.query(sqlStr, (err, response) => {
        if (err) {
            console.log('[error]', err.message);
            return res.send({ code: 0, data: err.message })
        }
        res.send({ code: 1, data: 'success' })
    })
}

// 用户-获取会议列表-可优化
exports.getMyEndreportInfo = (req, res) => {
    // 获取到用户未完成的任务
    let sqlStr = `select * from task_endreport where id_teacher = '${req.body.id}';`
    db.query(sqlStr, (err, response) => {
        if (err) {
            console.log('[error]', err.message);
            return res.send({ code: 0, data: err.message })
        }
        let arr = [];
        response.forEach(p => { arr.push('"' + p.id_endreport + '"')});

        // 返回未完成任务的信息
        sqlStr = `select * from w_endreport where id_endreport in (${arr.join(',')});`;
        db.query(sqlStr, (err, response2) => {
            if (err) {
                console.log('[error]', err.message);
            }
            res.send({ code: 1, data: response2 })
        })
    })
}

// 用户-提交会议任务
exports.submitEndreport = (req, res) => {
    //利用 multiparty 中间件获取文件数据
    let uploadDir = './' // 这个不用改，因为并不是保存在这个目录下，这只是作为中间目录，待会要重命名文件到指定目录的

    let form = new multiparty.Form()

    form.uploadDir = uploadDir
    form.keepExtensions = true; // 是否保留后缀
    form.parse(req, function (err, fields, files) { //其中fields表示你提交的表单数据对象，files表示你提交的文件对象
        // 这里是save_path 就是前端传回来的 path 字段，这个字段会被 multiparty 中间件解析到 fields 里面 ，这里的 fields 相当于 req.body 的意思
        let save_path = fields.path
        
        // console.log("上传文件", fields)
        // console.log("files", files)
        // console.log("fields", fields);
        const sqlStr = `delete from task_endreport where id_teacher = '${fields.userid}' and id_endreport = '${fields.id_meeting}';`
        db.query(sqlStr, (err, res) => {
            if (err) {
                console.log('[error]', err.message);
                return res.send({ code: 0, data: err.message })
            }
        })

        if (!files.file) res.send({ code: 0, data: '上传失败' })
        else {
            //所有文件重命名，（因为不重名的话是随机文件名）
            files.file.forEach(file => {
                /*
                 * file.path 文件路径
                 * save_path+originalFilename   指定上传的路径 + 原来的名字
                 */
                // console.log(file.path, save_path, file.originalFilename,);
                fs.rename(uploadDir + file.path, save_path + fields.userid + path.extname(file.originalFilename), (err) => { 
                    if (err) {
                        console.log('[error]', err.message);
                    }
                });
            })
            if (err) {
                console.log('[error]', err.message);
                res.send({ code: 0, data: '上传失败' })
            } else {
                //返回所有上传的文件信息
                res.send({ code: 1, data: '上传成功' })
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
            console.log('[delete]', file);
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