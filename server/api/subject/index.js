let express=require('express')
let router=express.Router()
let controller=require('./subject.controller')
router.post('/addSubject',controller.addSubject)
router.put('/editSubject',controller.editSubject)
router.put('/deleteSubject',controller.deleteSubject)
router.post('/getSubjectList',controller.getSubject)
module.exports=router