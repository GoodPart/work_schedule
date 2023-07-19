import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../modules';
import axios from 'axios';

import * as InputForm from '../components/styledComponents/InputStyled'



export default function SurveyDashBoard() {

    const [password, setPassword] = useState('');
    const [datas, setDatas] = useState([]);
    const [use, setUse] = useState(0);
    let count = useRef(0);

    useEffect(() => {
        axios.get("http://localhost:9999/api/survey/read", { withCredentials: true })
            .then((result) => {
                setDatas(result.data.ele)
            })
    }, [])

    if (!datas) return <>loading...</>
    return (
        <div style={{ width: "560px", margin: '0 auto' }}>
            <h3>관리자 페이지</h3>

            {
                datas.map((ele: any, index: number) => {

                    ele.used_state == true ? count.current = count.current + 1 : count.current = count.current;
                    return <div style={{ paddingBottom: 64 }}>
                        <InputForm.InputFormWrap check={'1'} cMode={'light'}>
                            <input type="text" inputMode="none" className="toasted" readOnly value={ele.user_id} />
                            <label>아이디</label>
                        </InputForm.InputFormWrap>
                        <InputForm.InputFormWrap check={'1'} cMode={'light'}>
                            <input type="text" inputMode="none" className="toasted" readOnly value={ele.desc} />
                            <label>의견</label>
                        </InputForm.InputFormWrap>
                        <InputForm.InputFormWrap check={'1'} cMode={'light'}>
                            <input type="text" inputMode="none" className="toasted" readOnly value={ele.used_state} />
                            <label>필요성</label>
                        </InputForm.InputFormWrap>
                        <br />
                        <hr />
                        {
                            datas.length == index + 1 && <div>전체 : {datas.length}개 중, 찬성 :{count.current}개</div>
                        }

                    </div>

                })
            }


        </div>
    )
}