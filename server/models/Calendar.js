const { timeStamp } = require("console");
const mongoose = require("mongoose");

/*
user_id : 아이디
date_at : 날짜 (달력) 
create_at : 만든시간
data : {
    state : 외근/출장, 반차, 월차 등등... 
    work_time : 출근시간
}
*/

const calendarSchema = mongoose.Schema({
    user_id: {
        type: String
    },
    user_name: {
        type: String
    },
    data_month: {
        type: Number
    },
    data_at: {
        type: Array
    },
    create_at: {
        type: String
    },
    data: {
        state: {
            type: String
        },
        work_time: {
            type: Array
        }
    }
});


const Calendar = mongoose.model('Calendar', calendarSchema);
module.exports = { Calendar };