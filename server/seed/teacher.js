'use strict';
let faker = require("faker");
module.exports = () => {
    let teacher = [];
    for (let i=1; i<=2000; i++){   
        var status = 't'
        var designation = ["Professor","Assistant Professor","Associate Professor","Junior Professor","Lab Assistant"]
        teacher.push({
            id: i,
            joining_date: "2001-01-01 00:00:00+05:30",
            designation: designation[i%5],
            experience_years: faker.random.number()%20,
            experience_description: 'Good',
            status: "t",
            user_detail_id: 1,
            department_id: 1
        }); 
    }
    return teacher;
}