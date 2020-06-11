var fs = require('fs')
var student = require('./student.js')
var express = require('express')
//创建一个路由容器
var router = express.Router()
//把路由都挂载到router路由容器中
router.get('/students', function (req, res) {

    student.findAll(function (err, students) {
        if (err) {
            return res.status(500).send('Server')
        }
        res.render('index.html', {
            fruits: [
                '苹果',
                '香蕉',
                '火龙果',
                '凤梨'
            ],
            students: students
        })

    })
})
router.get('/students/new', function (req, res) {

    res.render('new.html')


})
router.post('/students/new', function (req, res) {
    student.save(req.body, function (err) {
        if (err) {
            return res.status(500).send('server error.')
        }
        res.redirect('/students')
    })



})
router.get('/students/edit', function (req, res) {
    student.findById(parseInt(req.query.id), function (err, student) {
        if (err) {
            return res.status(500).send('server error.')
        }
        res.render('edit.html', {
            student: student
        })
    })
})
router.post('/students/edit', function (req, res) {
    student.updateById(req.body, function (err, student) {
        if (err) {
            return res.status(500).send('server error.')
        }
        res.redirect('/students')
    })
})
router.get('/students/delete', function (req, res) {
    student.deleteById(parseInt(req.query.id), function (err, student) {
        if (err) {
            return res.status(500).send('server error.')
        }
        res.redirect('/students')
    })
})
//导
//导出路由容器
module.exports = router;