import React, { useState, ChangeEvent, useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { registerSignUp, collectionRead } from "../../../modules/register";
import { RootState } from "../../../modules"
import { registeUpdate } from '../../../modules/register';

import { initColorValue } from "../../../components/styledComponents/CommonValue";

import * as InputForm from "../../../components/styledComponents/InputStyled";
import * as ButtonForm from "../../../components/styledComponents/ButtonStyled";

import Index from '../../mypage/present_component/Index';


import styled from "styled-components";

import swal from 'sweetalert';


export default function MyPage({ modeColor }: any) {
    const dispatch = useDispatch();
    const authData = useSelector((state: RootState) => state.authCheckReducer.auth);
    const registerLoading = useSelector((state: RootState) => state.registerReducer.loading)
    const [modify, setModify] = useState(true);


    const [newForm, setNewForm] = useState({
        user_name: '',
        user_id: '',
        user_email: '',
        user_phn: '',
        rank_title: '',
        office_name: '',
        team_name: '',
        user_age: '',
    })

    const onChange = (e: any): any => {
        const { name, value } = e.target;
        setNewForm({
            ...newForm,
            [name]: value
        })

    };

    const modifyToggle = (checked: boolean) => {

        setModify(!modify);
    }

    const modifySetting = useCallback(async (getForm: any) => {

        const result = await dispatch(registeUpdate(getForm));

        if (result) {
            setModify(true);
            swal("성공", "정상적으로 수정되었습니다.", "success");
        } else {
            swal("실패", "수정 할 수 없습니다..", "success");
        }
    }, [dispatch])

    useEffect(() => {
        if (authData) {
            setNewForm({
                user_name: authData.user_name,
                user_id: authData.user_id,
                user_email: authData.user_email,
                user_phn: authData.user_phn,
                rank_title: authData.rank_title,
                office_name: authData.office_name,
                team_name: authData.team_name,
                user_age: authData.user_age,

            })

        }
        // getCollection_1()

    }, [authData])

    // if (newForm.user_name == '') return <>loading...</>
    return (
        <Index
            modeColor={modeColor}
            modify={modify}
            modifyToggle={modifyToggle}
            newForm={newForm}
            onChange={onChange}
            modifySetting={modifySetting}
        />

    )
}

