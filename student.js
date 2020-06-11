var express = require('express')
var fs = require('fs')
var dbPath = './db.json'
//查询所有学生
exports.findAll = function (callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        callback(null, JSON.parse(data).students)
    })
}
//查询单条数据
exports.findById = function (id, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        //find（）从数组中找出指定项，并根据选择条件返回结果
        var ret = students.find(function (item) {
            return item.id === parseInt(id)
        })
        callback(null, ret)
    })
}

//增加保存所有学生
exports.save = function (student, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        student.id = students[students.length - 1].id + 1
        students.push(student)
        var fileData = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}
//更新所有学生
exports.updateById = function (student, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        //JSON.parse() 方法用于将一个 JSON 字符串转换为对象。


        var students = JSON.parse(data).students
        //新增的时候，将数字转为了字符串，所以需要重新转换成数字
       
        student.id = parseInt(student.id)
       
        var stu = students.find(function (item) {
            return item.id == student.id
        })
        //循环遍历拷贝对象
        for (var key in student) {
            stu[key] = student[key]
        }
        //把对象数据转换为字符串
        var fileData = JSON.stringify({
            students: students
        })
        //把字符串保存到文件中
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                return callback(errr)
            }
            callback(null)
        })
    })
}
//删除学生
exports.deleteById = function (id,callback) {
fs.readFile(dbPath,'utf8',function(err,data){
    if(err){
        return callback(err)
    }
    var students =JSON.parse(data).students
    //findIndex 方法专门用来根据条件找元素下标
    var deleteId = students.findIndex(function(item){
        return item.id === parseInt(id)
    })
    //根据下标从数组中删除对应的学生对象
    students.splice(deleteId,1)
     //把对象数据转换为字符串
     var fileData = JSON.stringify({
        students: students
    })
    //把字符串保存到文件中
    fs.writeFile(dbPath, fileData, function (err) {
        if (err) {
            return callback(errr)
        }
        callback(null)
    })
})
}