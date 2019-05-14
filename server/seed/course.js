'use strict';
let faker = require("faker");
module.exports = () => {
	let course = [
        {'id':1,'name':'Engineering','duration':4,'status':'t'},
        {'id':2,'name':'MBBS','duration':5,'status':'t'},
        {'id':3,'name':'Commerce','duration':3,'status':'t'},
        {'id':4,'name':'MBA','duration':2,'status':'t'},
];
	return course;
}