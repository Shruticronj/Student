var db = require('../sqldb')();
let { academic_calendar,academic_year,admin,attendance,
batch,club,club_members, course,curriculum,curriculum_subject,
department,department_notice,department_seat,director,
educational_detail,elective,event,event_comment,eventLike,exam, elective_subject, exam_type,
feedback,grade,hod,parent,personal_calendar,post,post_comment,post_followed,post_like,public_event,
public_notice,rating,relative_grading,resign,result,role,
section,semester, skill,student,student_elective,subject,
teacher, teacher_subject_allocation,timetable,
upload_attendance,upload_result,user_detail} = db;
console.log("seeding ------------->")
module.exports.seed = () => {
    return user_detail.bulkCreate(require('./userDetail')()).then(users =>{
        console.log(0,"user_detail");
    })
    .then(() => {
        return admin.bulkCreate(require('./admin.js')()).then(admin =>{
            console.log(1,"admin");
        });
    })
    .then(() => {
        return course.bulkCreate(require('./course.js')()).then(course =>{
            console.log(2,"course")
        });
    })
    .then(() => {
        return department.bulkCreate(require('./department.js')()).then(department =>{
            console.log(3,"department")

        });
    })
    .then(() => {
        return academic_year.bulkCreate(require('./academicYear.js')()).then(acedemicYear =>{
            console.log(4, "acedemicYear");

        });
    })
    .then(() => {
        return academic_calendar.bulkCreate(require('./academicCalendar.js')()).then(academicCalaneder =>{
            console.log(5,"academicCalaneder");

        });
    })
    .then(() => {
        return batch.bulkCreate(require('./batch.js')()).then(batch =>{
            console.log(6,"batch");

        });
    })
    .then(() => {
        return semester.bulkCreate(require('./semester.js')()).then(semester =>{
            console.log(7,"semester");

        });
    })
    .then(() => {
        return curriculum.bulkCreate(require('./curriculum.js')()).then(curriculum=>{
            console.log(8,"curriculum");

        })
    })
    .then(() => {
        return section.bulkCreate(require('./section.js')()).then(section =>{
            console.log(9,"section");

        });
    })
    .then(() => {
        return parent.bulkCreate(require('./parent.js')()).then(parent =>{
            console.log(10,"parent");

        });
    })
    .then(() => {
        return student.bulkCreate(require('./student.js')()).then(student =>{
            console.log(11,"student");

        });
    })
    .then(()=>{
        return teacher.bulkCreate(require('./teacher.js')()).then(teacher =>{
            console.log(12,"teacher");

        })
    })
    .catch(err => {
        console.log("err.stack")
        console.log(err.stack)
    })
 }