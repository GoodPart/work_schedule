import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Index from "../present_component/Index";


//redux
import { useDispatch, useSelector } from 'react-redux';
import { registerSignIn } from "../../../modules/register";

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
                //     // res.data.success && navigate('/')
                console.log(res)
                res.payload.success && navigate('/');
            });

        setUserId("")
        setUserPw("")
    };

    return (
        <Index
            handleChangeId={handleChangeId}
            handleChangePw={handleChangePw}
            submit={submit}
            dataProps={{
                userId: userId,
                userPw: userPw
            }}
        />
    )
}