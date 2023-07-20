import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../modules';
import axios from 'axios';

import styled from 'styled-components';
import * as InputForm from '../components/styledComponents/InputStyled'
import { initColorValue } from '../components/styledComponents/CommonValue';



export default function SurveyDashBoard({ modeColor }: any) {
    const pw = '123';

    const [password, setPassword] = useState();
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
        <div style={{ height: '100%', margin: '0 auto', backgroundColor: modeColor === 'light' ? initColorValue.light.bg : initColorValue.dark.bg }}>
            <h3 style={{ margin: 0 }}>의견 종합</h3>

            <input type="password" value={password} onChange={(e: any) => setPassword(e.target.value)} /><span>{password == pw ? '확인' : ''}</span>
            <br />
            {
                password !== pw ? <>비밀번호를 입력해주세요.</> : (
                    <>
                        <OrderList>
                            {
                                datas.map((ele: any, index: number) => {

                                    ele.used_state == true ? count.current = count.current + 1 : count.current = count.current;
                                    return <OrderListItem count={index} cMode={modeColor}>
                                        <InputForm.InputFormWrap check={'1'} cMode={modeColor}>
                                            <input type="text" inputMode="none" className="toasted" readOnly value={ele.user_id} />
                                            <label>아이디</label>
                                        </InputForm.InputFormWrap>
                                        <InputForm.InputFormWrap check={'1'} cMode={modeColor}>
                                            <input type="text" inputMode="none" className="toasted" readOnly value={ele.desc} />
                                            <label>의견</label>
                                        </InputForm.InputFormWrap>
                                        <InputForm.InputFormWrap check={'1'} cMode={modeColor}>
                                            <input type="text" inputMode="none" className="toasted" readOnly value={ele.used_state === true ? 'O' : 'X'} />
                                            <label>필요성</label>
                                        </InputForm.InputFormWrap>
                                    </OrderListItem>

                                })

                            }

                        </OrderList>
                        <div>전체 : {datas.length}개 중, 찬성 :{count.current}개</div>
                    </>
                )
            }




        </div>
    )
}

const OrderList = styled.ol`
    padding : 0;
    li {
        position: relative;
        display: flex;
        margin-bottom: 12px;
    }
`

const OrderListItem = styled.li<{ count: number, cMode: string }>`
    &:hover {
        input {
            background-color: ${props => props.cMode === 'light' ? initColorValue.light.bgHover : initColorValue.dark.bgHover};
        }
    }
    div + div{
        margin-left: 4px;
    }
    div:first-child {
        width: 30%;
    }
    div:nth-child(2) {
        
    }
    div:last-child {
        width: 9%;

        input {
            text-align: center;
        }
    }
    input {
        padding: 16px 16px 12px 16px;
    }
    &:before {
        content: '${props => props.count + 1}.';
        display: inline-block;

    }
`