'use strict';
let faker = require("faker");
module.exports = () => {
    let departmentNotice = [];
	for (let i=1; i<=1000; i++){   
        var date = (i % 28)+1;
        var month = (i % 12)+1;
        var year = 2014 + Math.floor(i/200)
        var end_date = new Date(`${year}/${month}/${date}`)
        var status = 't'
        departmentNotice.push({
            id : i, 
            heading : faker.lorem.words,     
            content : faker.lorem.paragraphs,     
            end_date : end_date,
            status
        }); 
	}
	return departmentNotice;
}