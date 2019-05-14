'use strict';
module.exports = () => {
    var date = (1 % 28)+1;
    var month = (1 % 12)+1;
	let academicYear = [
        {"id" : 1,"name":"2013","start_date" : new Date(`2012/${month}/${date}`),"end_date" : new Date(`2013/${month}/${date}`),"status" : "t"},
        {"id" : 2,"name":"2014","start_date" : new Date(`2013/${month}/${date}`),"end_date" : new Date(`2014/${month}/${date}`),"status" : "t"},
        {"id" : 3,"name":"2015","start_date" : new Date(`2014/${month}/${date}`),"end_date" : new Date(`2015/${month}/${date}`),"status" : "t"},
        {"id" : 4,"name":"2016","start_date" : new Date(`2015/${month}/${date}`),"end_date" : new Date(`2016/${month}/${date}`),"status" : "t"},
        {"id" : 5,"name":"2017","start_date" : new Date(`2016/${month}/${date}`),"end_date" : new Date(`2017/${month}/${date}`),"status" : "t"},
        {"id" : 6,"name":"2018","start_date" : new Date(`2017/${month}/${date}`),"end_date" : new Date(`2018/${month}/${date}`),"status" : "t"},
        {"id" : 7,"name":"2019","start_date" : new Date(`2018/${month}/${date}`),"end_date" : new Date(`2019/${month}/${date}`),"status" : "t"}]
    return academicYear;
}