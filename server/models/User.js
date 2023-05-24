const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')

/*
    user_name : 이름
    user_email : 이메일
    user_phn : 전화번호
    user_team : 팀 이름
    user_age : 940122
 */


// init shcema
const userSchema = mongoose.Schema({
    user_name: {
        type: String,
        max_length: 20
    },
    user_id: {
        type: String,
        max_length: 20
    },
    user_pw: {
        type: String,
        max_length: 16
    },
    user_email: {
        type: String,
    },
    user_phn: {
        type: String,
        max_length: 12
    },
    team_name: {
        type: String
    },
    user_age: {
        type: Number,
        max_length: 6
    },
    token: {
        type: String
    }
});
//비밀번호 암호화
userSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('user_pw')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) return next(err);
            bcrypt.hash(user.user_pw, salt, (err, hash) => {
                if (err) return next(err);
                user.user_pw = hash;
                next()
            })
        })
    } else {
        next();
    }
});
// 비밀번호 복호화
userSchema.methods.comparePassword = function (plainPassword, cb) {
    bcrypt.compare(plainPassword, this.user_pw, (err, isMatch) => {
        console.log('복호화 성공 여부 - ', isMatch)
        if (err) return cb(err)
        cb(null, isMatch)
    })
};
//jwt 암호화
userSchema.methods.generateToken = function (cb) {
    let user = this;

    let token = jwt.sign(user._id.toHexString(), 'screatToken');

    user.token = token;

    user.save().then((user, err) => {
        if (err) return cb(err)
        cb(user, null)
    }).catch(err => {
        console.log(err)
    })
};
//jwt 복호화
userSchema.statics.findByToken = function (token, cb) {
    var user = this;
    // 토큰 디코드
    jwt.verify(token, 'screatToken', function (err, decoded) {
        // 유저 아이디 이용해 유저 찾고
        // 클라이언트에서 가져온 토큰과  db에 포함된 토큰이 일치하는치 확인

        user.findOne({
            _id: decoded, token: token
        }).then((user, err) => {
            console.log('find One ->', user, token)
            if (err) return cb(err)
            cb(null, user)
        }).catch(err => {
            err
        })
    })
}


const User = mongoose.model('User', userSchema);
module.exports = { User }

