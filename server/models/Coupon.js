const { timeStamp } = require("console");
const mongoose = require("mongoose");

/*
_id : 설문 id
user_name : 유저 이름 
desc : 의견
used : 필요 여부
*/

const couponSchema = mongoose.Schema({
    coupon_code: {
        type: String
    },
    used: {
        type: Boolean
    },
    user_id: {
        type: String
    }

});


const Coupon = mongoose.model('Coupon', couponSchema);
module.exports = { Coupon };