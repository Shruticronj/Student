'use strict';
let faker = require("faker");
module.exports = () => {
    let parent = [];
	for (let i=1; i<=24000; i++){   
        var mother_name = faker.name.findName(); 
        var father_name = faker.name.findName(); 
        var email_id = faker.name.firstName()+i+"@gmail.com";
        var contact_no = faker.phone.phoneNumber();
        var country_code = 91;
        var status = 't'
        parent.push({
            id:i, 
            mother_name,     
            father_name,     
            email_id,
            contact_no,
            email_id,
            country_code,
            status
        }); 
	}
	return parent;
}