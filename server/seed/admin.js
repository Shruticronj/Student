'use strict';
let faker = require("faker");
module.exports = () => {
	let admin = [];
	for (let i=1; i<=10; i++){   
        var date = (i % 28)+1;
        var month = (i % 12)+1;
        var start_date = new Date(`2016/${month}/${date}`)
        var end_date = new Date(`2020/${month}/${date}`)
        var user_detail_id = i
        var status = 't'
        admin.push({
            id : i, 
            start_date : start_date,     
            end_date : end_date,
            status,
            user_detail_id
        }); 
	}
	return admin;
}