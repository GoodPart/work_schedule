import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerSignIn } from '../modules/register';
import { authCheckToServer } from '../modules/auth';
import axios from 'axios';

export default function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');

    const handleChangeId = (e: any) => {
        let value = e.target.value;
        setUserId(value)
    }
    const handleChangePw = (e: any) => {
        let value = e.target.value;
        setUserPw(value)
    }

    const submit = () => {
        let form = {
            user_id: userId,
            user_pw: userPw
        };
        dispatch(registerSignIn(form))
            .then((res: any) => {
                // res.data.success && navigate('/')
                console.log(res)
                res.payload.success && navigate('/');
            });

        setUserId("")
        setUserPw("")
    };

    return (
        <>
            <input onChange={(e) => handleChangeId(e)} value={userId} />
            <label>아이디</label>

            <input onChange={(e) => handleChangePw(e)} value={userPw} />
            <label>비밀번호</label>

            <input type="button" onClick={() => submit()} value="로그인" />

        </>
    )
}