const db = require('../db/index')
const { nanoid } = require("nanoid");
const path=require('path');
const multiparty = require('multiparty');
const fs = require('fs')

// 获取政策列表
exports.getPolicyInfo = (req, res) => {
    const sqlStr = `select * from r_policy;`
    db.query(sqlStr, (err, response) => {
        if (err) {
            console.log('error', err.message);
            return res.send({ code: 0, data: err.message })
        }
        res.send({ code: 1, data: response })
    })
}

// 新增政策信息
exports.addPolicyInfo = (req, res) => {
    const ID = nanoid();
    const sqlStr = `insert into r_policy(id_policy, date_publish, title) values ('${ID}', '${req.body.date_publish.slice(0,10)}', '${req.body.title}');`
    db.query(sqlStr, (err, response) => {
        if (err) {
            console.log('error', err.message);
            return res.send({ code: 0, data: err.message })
        }
        res.send({ code: 1, data: 'success' })
    })
}

// 新增政策文件
exports.addPolicyFile = (req, res) => {
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

        if (!files.file) res.send({ code: 0, data: '上传失败' })
        else {
            //所有文件重命名，（因为不重名的话是随机文件名）
            files.file.forEach(file => {
                /*
                 * file.path 文件路径
                 * save_path+originalFilename   指定上传的路径 + 原来的名字
                 */
                // console.log(file.path, save_path, file.originalFilename,);
                fs.rename(uploadDir + file.path, save_path + fields.policy_title + path.extname(file.originalFilename), (err) => { 
                    if (err) {
                        console.log('[error]', err.message);
                    }
                });
            })
            if (err) {
                res.send({ code: 0, data: '上传失败' })
            } else {
                //返回所有上传的文件信息
                res.send({ code: 1, data: '上传成功' })
            }
        }
    })
}

// 删除政策
exports.deletePolicyInfo = (req, res) => {
    // 删除相关政策
    fs.unlink(`./public/policy/${req.body.title}.doc`, err => { 
        if (err) {
            console.log('[error]', err.message);
        }
        console.log('[delete]', req.body.title);
    })

    const sqlStr = `delete from r_policy where id_policy = '${req.body.id}'`
    // console.log(sqlStr);
    db.query(sqlStr, (err, response) => {
        if (err) {
            console.log('[error]', err.message);
            return res.send({ code: 0, data: err.message })
        }
        res.send({ code: 1, data: response })
    })
}

// 下载政策
exports.downloadPolicyById = (req, res) => {
    // console.log('req.query', req.query);
    // // 删除相关政策
    const sqlStr = `select title from r_policy where id_policy = '${req.query.id_policy}'`
    db.query(sqlStr, (err, response) => {
        if (err) {
            console.log('[error]', err.message);
            return res.send({ code: 0, data: err.message })
        }
        // console.log(response[0].title, path.resolve(__dirname, `../public/policy/${response[0].title}.doc`));
        // 读取PDF文件
        fs.readFile(path.resolve(__dirname, `../public/policy/${response[0].title}.doc`), (err, data) => {
            if (err) {
                console.log('[error]', err.message);
                return res.send({ code: 0, data: err.message })
            }
            res.setHeader('Content-Type', 'application/msword')
            // 设置文件名
            const fileName = encodeURI(`${response[0].title}`)
            // Content-disposition 是 MIME 协议的扩展，MIME 协议指示 MIME 用户代理如何显示附加的文件
            // attachment 以附件形式下载
            res.setHeader('Content-Disposition', `attachment; filename=${fileName}.doc`)
            // 返回数据
            res.end(data)
        })
    })
}
