'use strict';
/*
1st ten admin
next 24000 students
 */
let faker = require("faker");
module.exports = () => {
	let userDetail = [];
	for (let i=1; i<=24; i++){   
    var randomName = faker.name.findName();
    var randomUserName = faker.name.firstName()+i;
    var randomImage = {
			small : faker.image.avatar(),
			medium : faker.image.avatar(),
			large : faker.image.avatar()
    }
    var randomGender = i % 5 ==0 ? 'MALE' : i % 219 == 0 ? 'OTHERS' : 'FEMALE';
    var date = (i % 28)+1;
		var month = (i % 12)+1;
    var date_of_birth = new Date(`1997/${month}/${date}`);
    var current = {
      address : faker.address.streetAddress(),
      street : faker.address.streetName(),
      pincode : Math.ceil(100000 + Math.random()*900000),
      city : faker.address.city(),
      state : faker.address.city(),
      country : "India"
    }
    var permanent = {
      address : faker.address.streetAddress(),
      street : faker.address.streetName(),
      pincode : Math.ceil(100000 + Math.random()*900000),
      city : faker.address.city(),
      state : faker.address.city(),
      country : "India"
    }
    var status = 't'
    userDetail.push({
      id : i, 
      username : randomUserName,     
      password : "test",
      name:randomName,
      date_of_birth ,
      profile_pic_url : JSON.stringify(randomImage),
      gender : randomGender,
      permanent_address : JSON.stringify(permanent),
      current_address : JSON.stringify(current),
      email_id : 'swati+'+i+'@cronj.com',
      contact_number : Math.ceil(9000000000 + Math.random()*1000000000),
      country_code_one : 91,
      alternate_number : Math.ceil(9000000000 + Math.random()*1000000000),
      country_code_two : 91,
      status
    }); 
    //console.log(userDetail[i-1].username)
  }

	return userDetail;
}