import React, { ChangeEventHandler, FormEventHandler } from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';


import * as InputForm from '../../../components/styledComponents/InputStyled';
import * as ButtonForm from '../../../components/styledComponents/ButtonStyled'


export default function Index({ handleChangeId, handleChangePw, submit, dataProps }: any) {
    return (

        <div style={{ width: "100%" }}>
            <form action="submit" onSubmit={submit}>
                <InputForm.InputFormWrap check={dataProps.userId}>
                    <input type="text" id='userId' name='userId'
                        onChange={handleChangeId}
                        value={dataProps.userId}
                    />
                    <label htmlFor='userId'>ID</label>
                </InputForm.InputFormWrap>
                <br />

                <InputForm.InputFormWrap check={dataProps.userPw}>
                    <input type="password" id='userPw' name='userPw'
                        onChange={handleChangePw}
                        value={dataProps.userPw}
                    />
                    <label htmlFor='userPw'>Password</label>
                </InputForm.InputFormWrap>
                <br />
                <ButtonForm.SubmitBtn type='button' onClick={submit}>Sign In</ButtonForm.SubmitBtn>
            </form>
            <br />
            <div>아직 회원이 아닌가요? <Link style={{ color: "#0F9485", textDecoration: "none", fontWeight: "bold" }} to={'/signup'}>회원가입</Link></div>
        </div>
    )
}