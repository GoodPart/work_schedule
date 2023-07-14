import React, { useState, ChangeEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Index from "../present_component/Index";


//redux
import { useDispatch, useSelector } from 'react-redux';
import { registerSignIn } from "../../../modules/register";

import swal from 'sweetalert';

export default function SignIn({ modeColor }: any) {


    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [form, setForm] = useState({
        userId: '',
        userPw: ''
    })

    const onChange = (e: ChangeEvent<HTMLInputElement>): any => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })

        console.log(form)
    };

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
                // console.log(res)
                if (!res.payload.success) {
                    swal("실패", res.payload.message, "error");
                } else {

                    res.payload.success && navigate('/');
                }
            });

        setUserId("")
        setUserPw("")
        setForm({
            userId: '',
            userPw: ''
        })
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
            modeColor={modeColor}
        />
    )
}