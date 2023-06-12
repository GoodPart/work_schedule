import { useSelector } from "react-redux"
import { RootState } from "../modules"

import * as InputForm from "../components/styledComponents/InputStyled";
import * as ButtonForm from "../components/styledComponents/ButtonStyled";

export default function MyPage() {
    const authData = useSelector((state: RootState) => state.authCheckReducer.auth);

    if (!authData) return <>loading...</>
    return (
        <div>
            <h2>내정보</h2>
            <InputForm.InputFormWrap check={authData.user_name}>
                <input type="text" id='userId' name='userId'
                    value={authData.user_name}
                    readOnly
                />
                <label htmlFor='userId'>이름</label>
            </InputForm.InputFormWrap>
            <br />
            <InputForm.InputFormWrap check={authData.user_id}>
                <input type="text" id='userId' name='userId'
                    value={authData.user_id}
                    readOnly
                />
                <label htmlFor='userId'>아이디</label>
            </InputForm.InputFormWrap>
            <br />
            <InputForm.InputFormWrap check={authData.office_name}>
                <input type="text" id='userId' name='userId'
                    value={authData.office_name}
                    readOnly
                />
                <label htmlFor='userId'>사무소</label>
            </InputForm.InputFormWrap>
            <br />
            <InputForm.InputFormWrap check={authData.team_name}>
                <input type="text" id='userId' name='userId'
                    value={authData.team_name}
                    readOnly
                />
                <label htmlFor='userId'>팀명</label>
            </InputForm.InputFormWrap>
            <br />
            <InputForm.InputFormWrap check={authData.rank_title}>
                <input type="text" id='userId' name='userId'
                    value={authData.rank_title}
                    readOnly
                />
                <label htmlFor='userId'>직급</label>
            </InputForm.InputFormWrap>
            <br />
            <InputForm.InputFormWrap check={authData.user_email}>
                <input type="text" id='userId' name='userId'
                    value={authData.user_email}
                    readOnly
                />
                <label htmlFor='userId'>이메일</label>
            </InputForm.InputFormWrap>
            <br />
            <InputForm.InputFormWrap check={authData.user_phn}>
                <input type="text" id='userId' name='userId'
                    value={authData.user_phn}
                    readOnly
                />
                <label htmlFor='userId'>전화번호</label>
            </InputForm.InputFormWrap>

        </div>

    )
}