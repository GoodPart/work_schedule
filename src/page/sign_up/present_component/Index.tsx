import React, { ChangeEventHandler, FormEventHandler } from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';


import * as InputForm from '../../../components/styledComponents/InputStyled';
import * as ButtonForm from '../../../components/styledComponents/ButtonStyled'


export default function Index({ onChange, form, submit }: any) {
    return (

        <div className='layout-wrap'>
            <form action="submit" >
                <InputForm.InputFormWrap check={form.user_name} cMode={true}>
                    <input type="text" id='user_name' name='user_name'
                        onChange={onChange}
                        value={form.user_name}
                    />
                    <label htmlFor='userId'>이름</label>
                </InputForm.InputFormWrap>
                <br />
                <InputForm.InputFormWrap check={form.user_id} cMode={true}>
                    <input type="text" id='user_id' name='user_id'
                        onChange={onChange}
                        value={form.user_id}
                    />
                    <label htmlFor='userId'>아이디</label>
                </InputForm.InputFormWrap>
                <br />
                <InputForm.InputFormWrap check={form.user_pw} cMode={true}>
                    <input type="password" id='user_pw' name='user_pw'
                        onChange={onChange}
                        value={form.user_pw}
                    />
                    <label htmlFor='userPw'>비밀번호</label>
                </InputForm.InputFormWrap>
                <br />
                <InputForm.InputFormWrap check={form.user_email} cMode={true}>
                    <input type="email" id='user_email' name='user_email'
                        onChange={onChange}
                        value={form.user_email}
                    />
                    <label htmlFor='userPw'>이메일</label>
                </InputForm.InputFormWrap>
                <br />
                <InputForm.InputFormWrap check={form.user_phn} cMode={true}>
                    <input type="text" id='user_phn' name='user_phn'
                        onChange={onChange}
                        value={form.user_phn}
                    />
                    <label htmlFor='userPw'>전화번호</label>
                </InputForm.InputFormWrap>
                <br />
                <InputForm.InputFormWrap check={form.office_name} cMode={true}>
                    <input type="text" id='office_name' name='office_name'
                        onChange={onChange}
                        value={form.office_name}
                    />
                    <label htmlFor='office_name'>사무소</label>
                </InputForm.InputFormWrap>
                <br />
                <InputForm.InputFormWrap check={form.team_name} cMode={true}>
                    <input type="text" id='team_name' name='team_name'
                        onChange={onChange}
                        value={form.team_name}
                    />
                    <label htmlFor='userPw'>팀 명</label>
                </InputForm.InputFormWrap>
                <br />
                <InputForm.InputFormWrap check={form.rank_title} cMode={true}>
                    <input type="text" id='rank_title' name='rank_title'
                        onChange={onChange}
                        value={form.rank_title}
                    />
                    <label htmlFor='rank_title'>직책</label>
                </InputForm.InputFormWrap>
                <br />


                <br />
                <ButtonForm.SubmitBtn type='button' onClick={() => submit()} >회원가입</ButtonForm.SubmitBtn>
            </form>
            <br />
            <div>이미 회원인가요 <Link style={{ color: "#0F9485", textDecoration: "none", fontWeight: "bold" }} to={'/signin'}>로그인</Link></div>
        </div>
    )
}