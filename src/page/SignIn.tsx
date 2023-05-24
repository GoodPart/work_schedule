import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export default function SignIn() {

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
        // console.log(userId, userPw)
        let form = {
            user_id: userId,
            user_pw: userPw
        };

        axios.post("http://localhost:9999/api/users/login", form)
            .then(res => {
                console.log(res.data)
            })
        setUserId("")
        setUserPw("")
    };
    const logout = () => {
        axios.get("http://localhost:9999/api/users/logout")
            .then(res => {
                console.log(res.data)
            })
    }

    return (
        <>
            <input onChange={(e) => handleChangeId(e)} value={userId} />
            <label>아이디</label>

            <input onChange={(e) => handleChangePw(e)} value={userPw} />
            <label>비밀번호</label>

            <input type="button" onClick={() => submit()} value="로그인" />
            <input type="button" onClick={() => logout()} value="로그아웃" />

        </>
    )
}