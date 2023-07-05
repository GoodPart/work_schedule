const mongoose = require('mongoose');

/*
name : 이름 - 가산 사무소, 대전 사무소, 디자인팀, 기획팀 등등...
type : 100, 200, 300 - 100 : depth1, 200 : depth2, 300 : depth3
*/

const collectionSchema = mongoose.Schema({
    name: {
        type: String
    },
    type: {
        type: Number
    }

})

const Collection = mongoose.model('Collection', collectionSchema);
module.exports = { Collection }