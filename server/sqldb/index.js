let path = require('path');
let models = ['academicCalendar','academicYear','admin','attendance',
'batch','club','clubMembers', 'course','curriculum','curriculumSubject',
'department','departmentNotice','departmentSeat','director',
'educationalDetail','elective','event','eventComment','eventLike','exam','examType',
'feedback','grade','hod','parent','personalCalendar','post','postComment','postFollowed','postLike','publicEvent',
'publicNotice','rating','relativeGrading','resign','result','role',
'section','skill','student','studentElective','subject','semester',
'teacher', 'teacherSubjectAllocation','timetable',
'uploadAttendance','uploadResult','userDetail'];

let db ={};
let format = path.join(__dirname ,'../api/{0}/{0}.model.js');
for(let i in models){
   var model = require(format.replace(/\{0\}/g,models[i]))();
   db[model.name]=model;
}
Object.keys(db).forEach(function(modelName){
   if('associate' in db[modelName]){
       db[modelName].associate(db);
   }
});

let sql = function(){
	return db;
}
module.exports =sql;

