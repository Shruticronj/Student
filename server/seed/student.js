'use strict';
let faker = require("faker");
module.exports = () => {
    let student = [];
    for (let i=1; i<=24; i++){   
        var status = 't'
        student.push({
            id:i, 
            admission_no:4017541+i,
            status,
            user_detail_id:i+10,
            department_id:((i+10)%30)+1,
            parent_id:i,
            batch_id:((i+10)%4)+1
        }); 
    }
    return student;
}