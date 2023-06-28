import React, { useState, ChangeEvent, useCallback, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../modules"
import { registeUpdate } from '../modules/register';

import { initColorValue } from "../components/styledComponents/CommonValue";

import * as InputForm from "../components/styledComponents/InputStyled";
import * as ButtonForm from "../components/styledComponents/ButtonStyled";

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
    }, [authData, registerLoading])

    if (!authData) return <>loading...</>
    return (
        <InnerWrap cMode={modeColor}>
            <div className="device__wrap">
                <div className="header">
                    <h2>내정보</h2>
                    <InputForm.InputFormWrapToggle width={48} height={24} cMode={modeColor}>
                        <input id="modify" type="checkbox" onChange={(e: any) => modifyToggle(e.target.checked)} />
                        <label htmlFor="modify" ></label>
                    </InputForm.InputFormWrapToggle>
                </div>
                <InputForm.InputFormWrap check={newForm.user_name} cMode={modeColor}>
                    <input type="text" id='user_name' name='user_name'
                        defaultValue={newForm.user_name}
                        // value={newForm.user_name}
                        readOnly={modify}
                        onChange={(e: any) => onChange(e)}
                    />
                    <label htmlFor='user_name'>이름</label>
                </InputForm.InputFormWrap>
                <br />
                <InputForm.InputFormWrap check={newForm.user_id} cMode={modeColor}>
                    <input type="text" id='user_id' name='user_id'
                        defaultValue={newForm.user_id}
                        // value={authData.user_id}
                        readOnly
                    />
                    <label htmlFor='user_id'>아이디</label>
                </InputForm.InputFormWrap>
                <br />
                <InputForm.InputFormWrap check={newForm.office_name} cMode={modeColor}>
                    <input type="text" id='office_name' name='office_name'
                        defaultValue={newForm.office_name}
                        // value={authData.office_name}
                        readOnly={modify}
                        onChange={(e: any) => onChange(e)}
                    />
                    <label htmlFor='office_name'>사무소</label>
                </InputForm.InputFormWrap>
                <br />
                <InputForm.InputFormWrap check={newForm.team_name} cMode={modeColor}>
                    <input type="text" id='team_name' name='team_name'
                        defaultValue={newForm.team_name}
                        // value={authData.team_name}
                        readOnly={modify}
                        onChange={(e: any) => onChange(e)}
                    />
                    <label htmlFor='team_name'>팀명</label>
                </InputForm.InputFormWrap>
                <br />
                <InputForm.InputFormWrap check={newForm.rank_title} cMode={modeColor}>
                    <input type="text" id='rank_title' name='rank_title'
                        defaultValue={newForm.rank_title}
                        // value={authData.rank_title}
                        readOnly={modify}
                        onChange={(e: any) => onChange(e)}
                    />
                    <label htmlFor='rank_title'>직급</label>
                </InputForm.InputFormWrap>
                <br />
                <InputForm.InputFormWrap check={newForm.user_email} cMode={modeColor}>
                    <input type="text" id='user_email' name='user_email'
                        defaultValue={newForm.user_email}
                        // value={authData.user_email}
                        readOnly={modify}
                        onChange={(e: any) => onChange(e)}
                    />
                    <label htmlFor='user_email'>이메일</label>
                </InputForm.InputFormWrap>
                <br />
                <InputForm.InputFormWrap check={newForm.user_phn} cMode={modeColor}>
                    <input type="text" id='user_phn' name='user_phn'
                        defaultValue={newForm.user_phn}
                        // value={authData.user_phn}
                        readOnly={modify}
                        onChange={(e: any) => onChange(e)}
                    />
                    <label htmlFor='user_phn'>전화번호</label>
                </InputForm.InputFormWrap>
                <br />
                <ButtonForm.SubmitBtn disabled={modify} style={{ opacity: !modify ? 1 : 0, transition: "opacity .6s .1s cubic-bezier(0.16, 1, 0.3, 1)" }} onClick={() => modifySetting(newForm)}>수정</ButtonForm.SubmitBtn>
            </div>
        </InnerWrap>

    )
}

const InnerWrap = styled.div<{ cMode: string }>`
    /* padding-top: 24px; */
    background-color:${props => props.cMode === 'light' ? initColorValue.light.bg : initColorValue.dark.bg};
    height: 100%;
    
    h2 {
        margin: 0;
        padding: 12px 0;
        color: ${props => props.cMode === 'light' ? '##48484A' : initColorValue.dark.textWhite};;
    }
    
    .device__wrap {
        margin :0 auto;
        width: 560px;
    }
    .device__wrap .header {
        display: flex;
        justify-content: space-between;
    }
  
    @media (max-width: 561px) {
        .device__wrap {
            width: 100%;
        }
    }
`