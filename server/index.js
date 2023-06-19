const express = require('express');
const cors = require('cors');
const dotEnv = require('dotenv');

const app = express();
const port = 9999;

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
// const config = require('./config/key');
const config = process.env.MONGO_URI;

const { auth } = require('./middleware/auth');

const deployURL = "https://myworkday.pe.kr"

app.use(cors({
    origin: `${deployURL}`,
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());




//스키마 불러오기.
const mongoose = require('mongoose');
// //유저 스키마
const { User } = require('./models/User');
// //dbid 스키마
const { Calendar } = require('./models/Calendar');



//몽고 DB 에러
mongoose.set('strictQuery', true);

mongoose.connect(`${config}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Conntected"))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('hi too')
})

// auth 체크
app.get('/api/users/auth', auth, (req, res) => {
    res.status(200).json({
        user: req.user
    })
})

//회원가입
app.post('/api/users/signup', async (req, res) => {
    const getUserData = req.body;

    const user = new User(getUserData);

    await user.save().then((ele, err) => {
        if (err) return res.json({
            success: false,
            err
        })
        return res.status(200).json({
            success: true,
            user: ele
        })
    })
});
// 회원가입 아이디 중복 체크
app.post('/api/users/check_duplicate_id', async (req, res) => {
    const check_id = req.body.user_id;

    await User.findOne({
        user_id: check_id,
    }).then((isMatch, err) => {
        if (!isMatch) return res.status(200).json({
            check: true,
            message: "사용 가능한 아이디입니다."
        })
        return res.status(200).json({
            check: false,
            message: "중복된 아이디입니다."
        })

    })
});

//로그인
app.post('/api/users/login', (req, res) => {
    const data = req.body;
    User.findOne({ user_id: data.user_id })
        .then((user, err) => {
            if (!user) {
                return res.json({
                    success: false,
                    message: "해당 아이디는 존재하지 않습니다.",
                    err
                })
            }
            user.comparePassword(data.user_pw, (err, isMatch) => {
                if (!isMatch) {
                    return res.json({
                        success: false,
                        message: "비밀번호가 다릅니다."
                    })
                }

                user.generateToken((_user, err) => {
                    if (err) return res.status(400).send(err);

                    // "Remember Me" for 15 minutes 
                    // res.cookie('rememberme', '1', { httpOnly: true }).status(200).json({
                    //     success: true
                    // });

                    res.cookie("x_auth", _user.token, {
                        secure: false,
                        httpOnly: true,
                    }).status(200).json({
                        success: true,
                        token: _user.token,
                        token_name: "x_auth"
                    })
                })
            })


        })
        .catch(err => {
            return res.status(400).send(err)
        })

});

//로그아웃
app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }).then((user, err) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).send({
            success: true
        })
    })
})


//캘린더 일정 추가
app.post('/api/calendar/create', auth, async (req, res) => {
    const getData = req.body.form;
    // console.log('get Data ->', getData)

    const calendar = new Calendar(getData);
    await calendar.save()
        .then((ele, err) => {
            if (err) return res.json({
                success: false,
                err
            })
            return res.status(200).json({
                success: true,
                message: "정상적으로 등록 되었습니다."
            })
        })
});
// 캘린더 월별 일정 조회
app.post('/api/calendar/read', async (req, res) => {
    const getData = req.body;
    await Calendar.find({
        data_month: getData.month
    }).then((result, err) => {

        if (err) return res.json({
            success: false,
            message: err
        })
        return res.status(200).json({
            success: true,
            message: "검색 완료.",
            result
        })
    })
})

app.post('/api/calendar/readbyme', auth, async (req, res) => {
    const getData = req.body.form; // body = {_id, user_name}
    // console.log(req.body)

    // console.log('readbyme->', getData)
    await Calendar.findById({
        _id: getData._id
    }).then((match, err) => {
        // console.log(match.user_name, getData.user_name)
        if (match.user_name === getData.user_name) return res.status(200).json({
            success: true,
        })
        return res.status(200).json({
            success: false,
        })
    })

})
app.post('/api/calendar/findbyid', async (req, res) => {
    const getData = req.body; // body = {_id}

    await Calendar.findById({
        _id: getData._id
    }).then((match, err) => {
        // console.log(match)
        if (err) return res.json({
            success: false,
            err
        })
        return res.status(200).json({
            success: true,
            match
        })
    })

})

app.post('/api/calendar/deletebyid', auth, async (req, res) => {
    const getData = req.body;

    Calendar.findByIdAndDelete({
        _id: getData._id
    }).then((match, err) => {

        if (!match) return res.json({
            success: false,
            message: "해당 데이터는 없습니다."
        })
        return res.status(200).json({
            success: true,
            message: "정상적으로 제거 되었습니다.",
        })

    })
})

app.post('/api/calendar/updatebyid', auth, async (req, res) => {
    const getData = req.body;

    Calendar.findByIdAndUpdate(getData._id, {
        data: {
            state: getData.data.state,
            work_time: getData.data.work_time
        }
    }).then((match, err) => {
        if (err) return res.json({
            success: false,
            message: "알수 없는 에러입니다.",
            err
        })
        if (!match) return res.json({
            success: false,
            message: "업데이트 할 수 없습니다.",
        })
        return res.status(200).json({
            success: true,
            message: "정상적으로 업데이트 되었습니다."
        })
    })
})



app.listen(port, () => {
    console.log(`backend server listening on port ${port}`)
})