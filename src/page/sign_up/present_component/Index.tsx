import React, { ChangeEventHandler, FormEventHandler } from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';

import { initColorValue } from '../../../components/styledComponents/CommonValue';


import * as InputForm from '../../../components/styledComponents/InputStyled';
import * as ButtonForm from '../../../components/styledComponents/ButtonStyled'

import swal from 'sweetalert';

export default function Index({ onChange, onChangeSelect, form, submit, modeColor, collections }: any) {
    const enterKeyUp = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (form.user_name === '') {
                swal('경고', "이름을 입력해주세요.", "info")
            } else if (form.user_id === '') {
                swal('경고', "아이디를 입력해주세요.", "info")
            } else if (form.user_pw === '') {
                swal('경고', "비밀번호를 입력해주세요.", "info")
            } else {
                submit()
            }
        }
    }
    return (

        <InnerWrap cMode={modeColor}>
            <div className="device__wrap">
                <h2>회원가입</h2>
                <form action="submit" >
                    <InputForm.InputFormWrap check={form.user_name} cMode={modeColor}>
                        <input type="text" id='user_name' style={{ backgroundColor: "transparent" }} name='user_name'
                            onChange={onChange}
                            value={form.user_name}
                            onKeyUp={(e) => enterKeyUp(e)}
                        />
                        <label htmlFor='userId'>이름 <em>*</em></label>
                    </InputForm.InputFormWrap>
                    <br />
                    <InputForm.InputFormWrap check={form.user_id} cMode={modeColor}>
                        <input type="text" id='user_id' style={{ backgroundColor: "transparent" }} name='user_id'
                            onChange={onChange}
                            value={form.user_id}
                            onKeyUp={(e) => enterKeyUp(e)}
                        />
                        <label htmlFor='userId'>아이디 <em>*</em></label>
                    </InputForm.InputFormWrap>
                    <br />
                    <InputForm.InputFormWrap check={form.user_pw} cMode={modeColor}>
                        <input type="password" id='user_pw' style={{ backgroundColor: "transparent" }} name='user_pw'
                            onChange={onChange}
                            value={form.user_pw}
                            onKeyUp={(e) => enterKeyUp(e)}
                        />
                        <label htmlFor='userPw'>비밀번호 <em>*</em></label>
                    </InputForm.InputFormWrap>
                    <br />
                    <InputForm.InputFormWrap check={form.user_email} cMode={modeColor}>
                        <input type="email" id='user_email' style={{ backgroundColor: "transparent" }} name='user_email'
                            onChange={onChange}
                            value={form.user_email}
                            onKeyUp={(e) => enterKeyUp(e)}
                        />
                        <label htmlFor='userPw'>이메일</label>
                    </InputForm.InputFormWrap>
                    <br />
                    <InputForm.InputFormWrap check={form.user_phn} cMode={modeColor}>
                        <input type="text" id='user_phn' style={{ backgroundColor: "transparent" }} name='user_phn'
                            onChange={onChange}
                            value={form.user_phn}
                            onKeyUp={(e) => enterKeyUp(e)}
                        />
                        <label htmlFor='userPw'>전화번호</label>
                    </InputForm.InputFormWrap>
                    <br />
                    <InputForm.InputFormWrapSelect cMode={modeColor}>
                        <select name='office_name' onChange={(e: any) => onChangeSelect(e)}>
                            <option value="">사무소를 선택하세요.</option>
                            {
                                collections.collection_1.map((collection: any, index: number) => {
                                    if (collection.type === 100) {
                                        return <option value={collection.name}>{collection.name}</option>
                                    }
                                })
                            }
                        </select>
                    </InputForm.InputFormWrapSelect>
                    <br />
                    <InputForm.InputFormWrapSelect cMode={modeColor}>
                        <select name='office_room' onChange={(e: any) => onChangeSelect(e)}>
                            <option value="">사업부 및 사업실을 선택하세요.</option>
                            {
                                collections.collection_1.map((collection: any, index: number) => {
                                    if (collection.type === 200) {
                                        return <option value={collection.name}>{collection.name}</option>
                                    }
                                })
                            }
                        </select>
                    </InputForm.InputFormWrapSelect>
                    <br />
                    <InputForm.InputFormWrapSelect cMode={modeColor}>
                        <select name='team_name' onChange={(e: any) => onChangeSelect(e)}>
                            <option value="">팀을 선택하세요.</option>
                            {
                                collections.collection_1.map((collection: any, index: number) => {
                                    if (collection.type === 300) {
                                        return <option value={collection.name}>{collection.name}</option>
                                    }
                                })
                            }
                        </select>
                    </InputForm.InputFormWrapSelect>

                    <br />
                    <InputForm.InputFormWrap check={form.rank_title} cMode={modeColor}>
                        <input type="text" id='rank_title' style={{ backgroundColor: "transparent" }} name='rank_title'
                            onChange={onChange}
                            value={form.rank_title}
                            onKeyUp={(e) => enterKeyUp(e)}
                        />
                        <label htmlFor='rank_title'>직책</label>
                    </InputForm.InputFormWrap>
                    <br />

                    {/* <InputForm.InputFormWrap check={form.company_pw} cMode={modeColor}>
                        <input type="text" id='company_pw' style={{ backgroundColor: "transparent" }} name='company_pw'
                            onChange={onChange}
                            value={form.company_pw}
                            onKeyUp={(e) => enterKeyUp(e)}
                        />
                        <label htmlFor='company_pw'>자사 확인 비밀번호</label>
                    </InputForm.InputFormWrap>
                    <br /> */}


                    <br />
                    <ButtonForm.SubmitBtn type='button' disabled={form.user_name !== '' && form.user_id !== '' && form.user_pw !== '' ? false : true} onClick={() => submit()} >회원가입</ButtonForm.SubmitBtn>
                </form>
                <br />
                <div style={{ color: modeColor === 'light' ? initColorValue.light.textBlack : initColorValue.dark.textWhite, paddingBottom: "20%" }}>이미 회원인가요 <Link style={{ color: "#0F9485", textDecoration: "none", fontWeight: "bold" }} to={'/signin'}>로그인</Link></div>
            </div>
        </InnerWrap>
    )
}

const InnerWrap = styled.div<{ cMode: string }>`
    /* padding-top: 24px; */
    background-color:${props => props.cMode === 'light' ? initColorValue.light.bg : initColorValue.dark.bg};
    
    h2 {
        margin: 0;
        padding: 12px 0;
        color: ${props => props.cMode === 'light' ? '##48484A' : initColorValue.dark.textWhite};;
    }
    .device__wrap {
        margin :0 auto;
        width: 560px;
        height: 100%;
    }
    .device__wrap .header {
        display: flex;
        justify-content: space-between;
    }

    @media (max-width: 561px) {
        height: auto;
        padding-bottom: 30%;
        background-color: ${props => props.cMode === 'light' ? initColorValue.light.bg : initColorValue.dark.bg};
        .device__wrap {
            width: 100%;
        }
    }

    
`