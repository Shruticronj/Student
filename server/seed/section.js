'use strict';
let faker = require("faker");
module.exports = () => {
    let section = [], count = 17
    for (var i = 1; i <= 16; i++) {
        section.push({"id":i,"name":String.fromCharCode(64 + i),"status" : "t","curriculum_id":1})
    }
    for (var i = 3; i <= 179; i++) {
        section.push({"id":count++,"name":(i%2===0)?"B":"A","status" : "t","curriculum_id":2})
    }

	return section;
}