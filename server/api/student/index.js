let express=require('express')
let router=express.Router()
let controller=require('./student.controller')
router.post('/addStudent',controller.addStudent)
router.put('/editStudent',controller.editStudent)
router.put('/deleteStudent',controller.deleteStudent)
router.post('/getStudentList',controller.getStudent)
module.exports=router