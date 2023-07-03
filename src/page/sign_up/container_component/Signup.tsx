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
        collection_2: [],
        collection_3: []
    })

    const [form, setForm] = useState({
        user_name: '',
        user_id: '',
        user_pw: '',
        user_email: '',
        user_phn: '',
        rank_title: '',
        office_name: '',
        team_name: '',
        user_age: '',
        token: ''
    })

    useEffect(() => {
        getCollection_1(100);
        getCollection_2(200);
        getCollection_3(300);
    }, [])

    const getCollection_1 = useCallback(async (type: number) => {
        let result = await dispatch(collectionRead(type))

        if (result.success) {
            setCollections({
                ...collections,
                collection_1: result.match
            })
        }
    }, [dispatch])
    const getCollection_2 = useCallback(async (type: number) => {
        let result = await dispatch(collectionRead(type))

        if (result.success) {
            setCollections({
                ...collections,
                collection_2: result.match
            })
        }
    }, [dispatch])
    const getCollection_3 = useCallback(async (type: number) => {
        let result = await dispatch(collectionRead(type))

        if (result.success) {
            setCollections({
                ...collections,
                collection_3: result.match
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

    const submit2 = useCallback(() => {
        let result = dispatch(registerSignUp(form))
        console.log(result)
        // result.payload.success && navigate('/');

    }, [dispatch])
    const submit = () => {
        dispatch(registerSignUp(form))
            .then((res: any) => {
                console.log(res)
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
            team_name: '',
            user_age: '',
            token: ''
        })

    };

    if (!collections.collection_1 && !collections.collection_2 && !collections.collection_3) return <>loading...</>

    return (
        <Index
            onChange={onChange}
            form={form}
            submit={submit}
            modeColor={modeColor}
            collections={collections}
        />
    )
}