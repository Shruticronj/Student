'use strict';
let faker = require("faker");
module.exports = () => {
    let curriculum = [], count = 3
    curriculum.push({"id":1,"name":"1","status" : "t","department_id":1,"academic_year_id":1,"semester_id":1,"sem_start_date":"2001-01-01 00:00:00+05:30","sem_end_date":"2031-01-01 00:00:00+05:30"},
        {"id":2,"name":"2","status" : "t","department_id":31,"academic_year_id":6,"semester_id":2,"sem_start_date":"2001-01-01 00:00:00+05:30","sem_end_date":"2031-01-01 00:00:00+05:30"},)
    for (var i = 1; i <= 30; i++) {
        curriculum.push(
            {"id":count++,"name":count++,"status" : "t","department_id":i,"academic_year_id":6,"semester_id":3,"sem_start_date":"2001-01-01 00:00:00+05:30","sem_end_date":"2031-01-01 00:00:00+05:30"},
            {"id":count++,"name":count++,"status" : "t","department_id":i,"academic_year_id":6,"semester_id":4,"sem_start_date":"2001-01-01 00:00:00+05:30","sem_end_date":"2031-01-01 00:00:00+05:30"},
            {"id":count++,"name":count++,"status" : "t","department_id":i,"academic_year_id":6,"semester_id":5,"sem_start_date":"2001-01-01 00:00:00+05:30","sem_end_date":"2031-01-01 00:00:00+05:30"},
            {"id":count++,"name":count++,"status" : "t","department_id":i,"academic_year_id":6,"semester_id":6,"sem_start_date":"2001-01-01 00:00:00+05:30","sem_end_date":"2031-01-01 00:00:00+05:30"},
            {"id":count++,"name":count++,"status" : "t","department_id":i,"academic_year_id":6,"semester_id":7,"sem_start_date":"2001-01-01 00:00:00+05:30","sem_end_date":"2031-01-01 00:00:00+05:30"},
            {"id":count++,"name":count++,"status" : "t","department_id":i,"academic_year_id":6,"semester_id":8,"sem_start_date":"2001-01-01 00:00:00+05:30","sem_end_date":"2031-01-01 00:00:00+05:30"})
        }
	return curriculum;
}