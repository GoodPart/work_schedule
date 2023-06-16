import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import { authCheckToServer } from '../modules/auth';
const deployURL = "http://ec2-43-201-0-7.ap-northeast-2.compute.amazonaws.com"


export default function (Component: any, option: any) {

    function AuthenticationCheck(props: any) {

        const navigate = useNavigate();
        const dispatch = useDispatch();

        useEffect(() => {
            axios.get('http://myworkday.pe.kr/api/users/auth', { withCredentials: true })
                .then(res => {
                    const isAuth = res.data.user;
                    // console.log('isAuth ->', res.data)



                    if (!isAuth) {
                        //미 로그인 상태
                        // console.log('미 로그인!')
                        if (option) {
                            navigate('/signin')
                        }
                    } else {
                        // 로그인 상태
                        dispatch(authCheckToServer(isAuth))

                        // console.log('로그인!')
                        if (option === false) {
                            //로그인 유저만 출입 가능
                            navigate('/')
                        }
                    }
                })
        }, [])


        return (
            <Component />
        )
    };




    return AuthenticationCheck
}