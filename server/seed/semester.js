'use strict';
let faker = require("faker");
module.exports = () => {
    let semester = [
        {"id":1,"type":"odd","name":"1","status" : "t","course_id":1},
        {"id":2,"type":"even","name":"2","status" : "t","course_id":1},
        {"id":3,"type":"odd","name":"3","status" : "t","course_id":1},
        {"id":4,"type":"even","name":"4","status" : "t","course_id":1},
        {"id":5,"type":"odd","name":"5","status" : "t","course_id":1},
        {"id":6,"type":"even","name":"6","status" : "t","course_id":1},
        {"id":7,"type":"odd","name":"7","status" : "t","course_id":1},
        {"id":8,"type":"even","name":"8","status" : "t","course_id":1}]
	return semester;
}