import { useSelector } from "react-redux"
import { RootState } from "../modules"
import { initColorValue } from "../components/styledComponents/CommonValue";

import * as InputForm from "../components/styledComponents/InputStyled";
import * as ButtonForm from "../components/styledComponents/ButtonStyled";

import styled from "styled-components";


export default function MyPage({ modeColor }: any) {
    const authData = useSelector((state: RootState) => state.authCheckReducer.auth);

    if (!authData) return <>loading...</>
    return (
        <InnerWrap cMode={modeColor}>
            <h2>내정보</h2>
            <InputForm.InputFormWrap check={authData.user_name} cMode={modeColor}>
                <input type="text" id='userId' name='userId'
                    value={authData.user_name}
                    readOnly
                />
                <label htmlFor='userId'>이름</label>
            </InputForm.InputFormWrap>
            <br />
            <InputForm.InputFormWrap check={authData.user_id} cMode={modeColor}>
                <input type="text" id='userId' name='userId'
                    value={authData.user_id}
                    readOnly
                />
                <label htmlFor='userId'>아이디</label>
            </InputForm.InputFormWrap>
            <br />
            <InputForm.InputFormWrap check={authData.office_name} cMode={modeColor}>
                <input type="text" id='userId' name='userId'
                    value={authData.office_name}
                    readOnly
                />
                <label htmlFor='userId'>사무소</label>
            </InputForm.InputFormWrap>
            <br />
            <InputForm.InputFormWrap check={authData.team_name} cMode={modeColor}>
                <input type="text" id='userId' name='userId'
                    value={authData.team_name}
                    readOnly
                />
                <label htmlFor='userId'>팀명</label>
            </InputForm.InputFormWrap>
            <br />
            <InputForm.InputFormWrap check={authData.rank_title} cMode={modeColor}>
                <input type="text" id='userId' name='userId'
                    value={authData.rank_title}
                    readOnly
                />
                <label htmlFor='userId'>직급</label>
            </InputForm.InputFormWrap>
            <br />
            <InputForm.InputFormWrap check={authData.user_email} cMode={modeColor}>
                <input type="text" id='userId' name='userId'
                    value={authData.user_email}
                    readOnly
                />
                <label htmlFor='userId'>이메일</label>
            </InputForm.InputFormWrap>
            <br />
            <InputForm.InputFormWrap check={authData.user_phn} cMode={modeColor}>
                <input type="text" id='userId' name='userId'
                    value={authData.user_phn}
                    readOnly
                />
                <label htmlFor='userId'>전화번호</label>
            </InputForm.InputFormWrap>

        </InnerWrap>

    )
}

const InnerWrap = styled.div<{ cMode: string }>`
    background-color:${props => props.cMode === 'light' ? initColorValue.light.bg : initColorValue.dark.bg};
    height: 100%;
    
    h2 {
        color: ${props => props.cMode === 'light' ? '##48484A' : initColorValue.dark.textWhite};;
    }
    input[type='text'] {
        background-color:${props => props.cMode === 'light' ? initColorValue.light.bg : initColorValue.dark.bg1};
        border-color: transparent;
        color: ${props => props.cMode === 'light' ? '##48484A' : initColorValue.dark.textWhite};;
    }
`