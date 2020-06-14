var fs = require('fs')
var Student = require('./student.js')
var express = require('express')
//创建一个路由容器
var router = express.Router()
//把路由都挂载到router路由容器中
router.get('/students', function (req, res) {

    Student.find(function (err, students) {
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
//新增学生
router.post('/students/new', function (req, res) {
   new Student(req.body).save(function (err) {
    if (err) {
        return res.status(500).send('server error.')
    }
    res.redirect('/students')
})



})
router.get('/students/edit', function (req, res) {
    Student.findById(req.query.id.replace(/"/g,''), function (err, student) {
        if (err) {
            return res.status(500).send('server error.')
        }
        res.render('edit.html', {
            student: student
        })
    })
})
router.post('/students/edit', function (req, res) {
    var id =req.body.id.replace(/"/g,'')
    Student.findByIdAndUpdate(id,req.body, function (err, student) {
        if (err) {
            return res.status(500).send('server error.')
        }
        res.redirect('/students')
    })
})
router.get('/students/delete', function (req, res) {
    var id = req.query.id.replace(/"/g,'')
    Student.findByIdAndRemove(id, function (err, student) {
        if (err) {
            return res.status(500).send('server error.')
        }
        res.redirect('/students')
    })
})
//导
//导出路由容器
module.exports = router;