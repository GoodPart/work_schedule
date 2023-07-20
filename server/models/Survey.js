const { timeStamp } = require("console");
const mongoose = require("mongoose");

/*
_id : 설문 id
user_id : 유저 아이디 
desc : 의견
used_state : 필요 여부
*/

const surveySchema = mongoose.Schema({
    user_id: {
        type: String,
    },
    desc: {
        type: String,

    },
    used_state: {
        type: Boolean
    },
    date: {
        type: Date
    }
});


const Survey = mongoose.model('Survey', surveySchema);
module.exports = { Survey };