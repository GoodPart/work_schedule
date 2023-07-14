import React, { useState, ChangeEvent, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Index from "../present_component/Index";


//redux
import { useDispatch, useSelector } from 'react-redux';
import { registerSignUp, collectionRead } from "../../../modules/register";

import swal from 'sweetalert';

export default function SignUp({ modeColor }: any) {


    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [collections, setCollections] = useState({
        collection_1: [],
    })

    const [form, setForm] = useState({
        user_name: '',
        user_id: '',
        user_pw: '',
        user_email: '',
        user_phn: '',
        rank_title: '',
        office_name: '',
        office_room: '',
        team_name: '',
        user_age: '',
        token: ''
    })

    useEffect(() => {
        getCollection_1();
    }, [])

    const getCollection_1 = useCallback(async () => {
        let result = await dispatch(collectionRead())

        if (result.success) {
            setCollections({
                ...collections,
                collection_1: result.find
            })
        }
    }, [dispatch])


    const onChange = (e: ChangeEvent<HTMLInputElement>): any => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })

    };
    const onChangeSelect = (e: ChangeEvent<HTMLInputElement>): any => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    }

    const submit2 = useCallback(() => {
        let result = dispatch(registerSignUp(form))
        console.log(result)
        // result.payload.success && navigate('/');

    }, [dispatch])
    const submit = () => {
        dispatch(registerSignUp(form))
            .then((res: any) => {
                // console.log(res)
                if (!res.payload) {
                    swal("실패", "회원가입 실패", "error");
                } else {
                    navigate('/signin');
                    swal("성공", "회원가입 완료되었습니다.", "success");
                }
                // res.payload && navigate('/');
            });

        setForm({
            user_name: '',
            user_id: '',
            user_pw: '',
            user_email: '',
            user_phn: '',
            rank_title: '',
            office_name: '',
            office_room: '',
            team_name: '',
            user_age: '',
            token: ''
        })

    };

    if (!collections.collection_1) return <>loading...</>

    return (
        <Index
            onChange={onChange}
            onChangeSelect={onChangeSelect}
            form={form}
            submit={submit}
            modeColor={modeColor}
            collections={collections}
        />
    )
}