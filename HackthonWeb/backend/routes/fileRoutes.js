let express = require('express');
let mongodb = require('mongodb');
let connectDb = require('../services/dbService');
var http = require('http');
let multer = require('multer');
let upload = multer();
let stream = require('stream');
var ObjectId = require('mongodb').ObjectId;
var querystring = require('querystring');

app = express();
router = express.Router();
app.get('*', (req, res, next) => {
    connectDb.then(db => {
        db.collection('fs.files').find({}).toArray().then(doc => {
            doc.forEach(function (element) {
                console.log(element.filename);
            }, this);
        }).catch(err => {
            next(err);
        })
    })
})
router.get('/', (req, res, next) => {
    console.log("///")
    connectDb.then(db => {
        db.collection('fs.files').find().toArray().then(doc => {
            res.json(doc).end();
        }).catch(err => {
            next(err);
        })
    })
})
router.post('/upload', upload.any(), (req, res, next) => {
    connectDb.then(db => {
        let bucket = new mongodb.GridFSBucket(db);
        let file = req.files[0];
        var bufferStream = new stream.PassThrough();


        bufferStream.end(new Buffer(file.buffer));
        bufferStream.pipe(bucket.openUploadStream(file.originalname))
            .on('error', (error) => {
                console.log('fail to store file');
                next(error);
            })
            .on('finish', () => {
                console.log(`store file ${file.originalname} successfully`);
                res.status(200).end();
            })


    })
});

router.get('/analysis', (req, res, next) => {
    var post_data = querystring.stringify({
        message: ['ok','big_v']
    });
    var options = {
        host: '127.0.0.1',
        port: '8079',
        path: '/',
        method: 'Post'
    };
    // 处理响应的回调函数
    var callback = function (response) {
        // 不断更新数据
        var body = '';
        response.on('data', function (data) {
            body += data;
        });

        response.on('end', function () {
            // 数据接收完成
            console.log(body);
        });
        // 向服务端发送请求
    };
    var request = http.request(options, callback);
    request.write(post_data + "\n");
    request.end();
})

router.post('/process', upload.any(), (req, res, next) => {
    connectDb.then(db => {
        let id = ObjectId(req.body.id);
        db.collection('fs.files').findOne({ _id: id }).then(doc => {
            console.log("process" + doc._id);
            var buf = '';
            var json = [];
            db.collection('fs.chunks').find({ files_id: id }).toArray().then(doc => {

                doc.forEach(function (element) {
                    buf += element.data;

                }, this);

            }).then(function () {
                var csvString = buf.toString();
                var csvArray = csvString.split("\r\n");
                var keyArray = csvArray[0].split(",");
                for (var rowNum = 1; rowNum < csvArray.length - 1; rowNum++) {
                    jsonRow = new Object();
                    var rowString = csvArray[rowNum];
                    var dataArray = rowString.split(",");
                    for (var colNum = 0; colNum < keyArray.length; colNum++) {
                        jsonRow[keyArray[colNum]] = dataArray[colNum];
                    }
                    json.push(jsonRow);
                }
                //     var bodyString = JSON.stringify(json);
                //     var headers = {
                //         'Content-Type': 'application/x-www-form-urlencoded',
                //         'Content-Length': 6
                //     };
                //     var options = {
                //         // host: '163.184.133.186',
                //         // port: '8080',
                //         host: '127.0.0.1',
                //         port: '8080',
                //         path: '/submit',
                //         //method: 'POST',
                //         headers: headers
                //     };
                //     var callback = function (response) {

                //     };
                //     var request = http.request(options, callback);
                //     request.write("dddddd\n");
                //     request.end();
                res.send(json);
            })
                .catch(err => {
                    next(err)
                })



        }).catch(err => {
            next(err);
        })
    })

    router.post("/submit", (req, res, next) => {
        console.log("succeed")
        res.send(200, "sss");

    })
});


module.exports = router;
