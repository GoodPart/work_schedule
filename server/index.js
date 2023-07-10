const express = require('express');
const cors = require('cors');
const dotEnv = require('dotenv');

const app = express();
const port = 9999;

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const config = require('./config/key');

const { auth } = require('./middleware/auth');

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
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
// collection 스키마
const { Collection } = require('./models/Collection');



//몽고 DB 에러
mongoose.set('strictQuery', true);

mongoose.connect(config.mongoURI, {
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
        return res.status(200).json({
            success: true
        })
    })
})

// 회원 정보 수정
app.post('/api/users/modify', auth, (req, res) => {
    const getData = req.body; // {이름 : '', 사무소 : '', 팀명 : '', 직급 : '', 이메일 : '', 전화번호 : '', 아이디 : ''};

    User.findOneAndUpdate({ user_id: getData.user_id }, {
        user_name: getData.user_name,
        user_email: getData.user_email,
        office_name: getData.office_name,
        rank_title: getData.rank_title,
        team_name: getData.team_name,
        user_phn: getData.user_phn
    }).then((result, err) => {

        //회원 정보 수정 후, 캘린더 테이블의 정보 수정
        Calendar.updateMany({ "user.user_id": getData.user_id }, {
            $set: {
                "user.user_name": getData.user_name,
                "user.rank_title": getData.rank_title,
                "user.office_name": getData.office_name,
                "user.team_name": getData.team_name
            }
        }).then((result, err) => {
            if (err) res.json({
                success: false,
                err
            })
            return res.status(200).json({
                success: true,
                result
            })
        })
    })
});

// 모든 유저 검색(오름차순)
app.get('/api/users/read', (req, res) => {
    User.find({}).then((find, err) => {
        if (err) return res.json({
            success: false,
            err
        })
        let result = find.sort(function (f, s) {
            const nameF = f.user_name;
            const nameS = s.user_name;
            if (nameF < nameS) { // nameF is greater than nameS by some ordering criterion
                return -1;
            }
            if (nameF > nameS) { // nameF is less than nameS by some ordering criterion
                return 1;
            }
            return 0; // nameF must be equal to nameS
        });
        return res.status(200).json({
            success: true,
            result
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
// 캘린더 일정 찾기
app.post('/api/calendar/findbyid', async (req, res) => {
    const getData = req.body; // body = {_id}

    await Calendar.findById({
        _id: getData._id
    }).then((match, err) => {
        console.log(match)
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
// 캘린더 일정 제거
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
});

app.post('/api/calendar/deleteallbydatamonth', async (req, res) => {
    const getData = req.body;

    Calendar.find({
        data_month: getData.data_month
    }).then((match, err) => {
        console.log(match)
        match.map((item, index) => {
            item.deleteOne(item)
        })
    })
})

// 캘린더 일정 수정
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

// 콜렉션 조회 타입별
// app.get('/api/collection/read/:type', (req, res) => {
//     const getData = req.params.type;
//     Collection.find({
//         type: getData
//     }).then((match, err) => {
//         console.log(match)
//         if (err) req.json({
//             success: false,
//             err
//         })
//         return res.status(200).json({
//             success: true,
//             match
//         })
//     })
// })
// 모든 콜렉션 조회
app.get('/api/collection/read', (req, res) => {
    Collection.find({}).then((find, err) => {
        if (err) return req.json({
            success: false,
            err
        })
        return res.status(200).json({
            success: true,
            find
        })
    })
})
// 콜렉션 추가
app.post('/api/collection/create', (req, res) => {
    const getData = req.body; // {shcema_name : '', add_name : ''};

    const collection = new Collection(getData);

    collection.save().then((ele, err) => {
    })
})

// 콜렉션 제거



app.listen(port, () => {
    console.log(`backend server listening on port ${port}`)
})