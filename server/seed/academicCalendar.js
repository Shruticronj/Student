
'use strict';
module.exports = () => {
    let academicCalendar = [];
    var start_date = new Date()
    var end_date = new Date()
    var type = 'OTHERS'
    var status = true
    var count = 0
    var date = 1;
    var month = 1;
    var content = 'substantive information or creative material viewed in contrast to its actual or potential manner of presentation'
	for (let i=1; i<=4; i++){  
        month = 7
        var year = 2019 - i
        var start_date = new Date(`${year}/${month}/15`)
        end_date.setDate(start_date.getDate() + 120)
        type = 'OTHERS'
        academicCalendar.push({
            id: ++count,
            type ,
            start_date ,
            end_date ,
            content ,
            status,
            course_id : 1,
            academic_year_id : i
        });
        month = 1
        var start_date = new Date(`${year}/${month}/15`)
        end_date.setDate(start_date.getDate() + 120)
        type = 'OTHERS'
        academicCalendar.push({
            id: ++count,
            type ,
            start_date ,
            end_date ,
            content ,
            status,
            course_id : 1,
            academic_year_id : i
        }); 
        month = 4
        start_date = new Date(`${year}/${month}/${date}`)
        end_date.setDate(start_date.getDate() + 14)
        type = 'EXAM'
        academicCalendar.push({
            id: ++count,
            type ,
            start_date ,
            end_date ,
            content ,
            status,
            course_id : 1,
            academic_year_id : i
        }); 
        month = 8
        start_date = new Date(`${year}/${month}/${date}`)
        end_date.setDate(start_date.getDate() + 14)
        type = 'EXAM'
        academicCalendar.push({
            id: ++count,
            type ,
            start_date ,
            end_date ,
            content ,
            status,
            course_id : 1,
            academic_year_id : i
        }); 
        month = 5
        start_date = new Date(`${year}/${month}/28`)
        end_date.setDate(start_date.getDate() + 1)
        type = 'RESULT'
        academicCalendar.push({
            id: ++count,
            type ,
            start_date ,
            end_date ,
            content ,
            status,
            course_id : 1,
            academic_year_id : i
        });
        month = 10
        start_date = new Date(`${year}/${month}/28`)
        end_date.setDate(start_date.getDate() + 1)
        type = 'SEMESTER'
        academicCalendar.push({
            id: ++count,
            type ,
            start_date ,
            end_date ,
            content ,
            status,
            course_id : 1,
            academic_year_id : i
        });
	}
	return academicCalendar;
}