import React, { ChangeEventHandler, FormEventHandler } from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { initColorValue } from '../../../components/styledComponents/CommonValue';

import * as InputForm from '../../../components/styledComponents/InputStyled';
import * as ButtonForm from '../../../components/styledComponents/ButtonStyled'

import swal from 'sweetalert';

export default function Index({ handleChangeId, handleChangePw, submit, dataProps, modeColor }: any) {
    const enterKeyUp = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (dataProps.userPw === '') {
                swal('경고', "비밀번호를 입력해주세요.", "info")
            } else if (dataProps.userId === '') {
                swal('경고', "아이디를 입력해주세요.", "info")
            } else {
                submit()
            }
        }
    }
    return (
        <InnerWrap cMode={modeColor}>
            <div className="device__wrap">
                <h2>로그인</h2>
                <form action="submit" onSubmit={submit}>
                    <InputForm.InputFormWrap check={dataProps.userId} cMode={modeColor} >
                        <input type="text" style={{ backgroundColor: "transparent" }} id='userId' name='userId'
                            onChange={handleChangeId}
                            value={dataProps.userId}
                            onKeyUp={(e) => enterKeyUp(e)}
                        />
                        <label htmlFor='userId'>ID</label>
                    </InputForm.InputFormWrap>
                    <br />

                    <InputForm.InputFormWrap check={dataProps.userPw} cMode={modeColor}>
                        <input type="password" style={{ backgroundColor: "transparent" }} id='userPw' name='userPw'
                            onChange={handleChangePw}
                            value={dataProps.userPw}
                            onKeyUp={(e) => enterKeyUp(e)}
                        />
                        <label htmlFor='userPw'>Password</label>
                    </InputForm.InputFormWrap>
                    <br />
                    <ButtonForm.SubmitBtn type='button' onClick={submit}>로그인</ButtonForm.SubmitBtn>
                </form>
                <br />
                <div style={{ color: modeColor === 'light' ? initColorValue.light.textBlack : initColorValue.dark.textWhite }}>아직 회원이 아닌가요? <Link style={{ color: "#0F9485", textDecoration: "none", fontWeight: "bold" }} to={'/signup'}>회원가입</Link></div>
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