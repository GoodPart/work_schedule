import React, { useEffect, useState, useCallback } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale'; //한국어 설정
import styled from "styled-components";



import { updateData } from "../../../modules/calendar";

import * as InputForm from '../../../components/styledComponents/InputStyled'
import * as ButtonForm from '../../../components/styledComponents/ButtonStyled'

import { useDispatch } from "react-redux";



import Toast from "../../Toast";
import { initColorValue } from "../../styledComponents/CommonValue";

export default function Index({ timeInfo, tgc, colorMode }: any) {

    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(new Date());
    const [workState, setWorkState] = useState('');

    let [toastState, setToastState] = useState({
        state: false,
        id: 0
    });
    let [timeState, setTimeState] = useState({
        th: 8,
        tm: 0

    });

    const updateSchedule = useCallback(async (form: any) => {
        await dispatch(updateData(form));
        tgc()
    }, [dispatch])

    useEffect(() => {
        if (timeInfo) {
            let setDate = timeInfo && new Date(timeInfo.date_at[0], timeInfo.date_at[1], timeInfo.date_at[2], timeInfo.data.work_time[0], timeInfo.data.work_time[1])

            setTimeState({
                th: timeInfo.data.work_time[0],
                tm: timeInfo.data.work_time[1]
            })
            setStartDate(setDate)
            setWorkState(timeInfo.data.state)
        }
    }, [timeInfo])

    const onSubmit = () => {

        let pushHH = timeState.th;
        let pushMM = timeState.tm;
        // let pushHH = new Date(startDate).getHours();
        // let pushMM = new Date(startDate).getMinutes();

        let form = {
            _id: timeInfo._id,
            data: {
                state: workState,
                // work_time: [pushHH, pushMM]
                work_time: workState === '월차' ? [0, 0] : workState === '오전 반차' ? [1, 0] : workState === '외근' ? [2, 0] : [pushHH, pushMM]
            },
        }
        updateSchedule(form)
    }

    if (!timeInfo) return <UpdateWrap>
        <div className="loading">
            <svg width="16px" height="12px">
                <polyline id="back" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>
                <polyline id="front" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>
            </svg>
        </div>
    </UpdateWrap>


    return (
        <UpdateWrap>
            <InputForm.InputFormWrap check={'1'} cMode={colorMode}>
                <input type="text" placeholder="날짜" style={{ backgroundColor: "transparent" }} readOnly value={`${startDate.getFullYear()}년 ${startDate.getMonth() + 1}월 ${startDate.getDate()}일 `} onFocus={() => setToastState({ state: true, id: 1 })} />
                <label>날짜</label>
            </InputForm.InputFormWrap>
            <div className="insert__form">
                <ul>
                    <li>
                        <InputForm.InputFormWrap check={workState} cMode={colorMode}>
                            <input type="text" style={{ backgroundColor: "transparent" }} placeholder="상태" className="toasted" readOnly inputMode="none" value={workState} onFocus={() => setToastState({ state: true, id: 0 })}
                                onBlur={() => setToastState({ state: false, id: 0 })}
                            />
                            <label>상태</label>
                        </InputForm.InputFormWrap>
                    </li>
                    <li>
                        <InputForm.InputFormWrap check={workState} cMode={colorMode}>
                            <input type="text" style={{ backgroundColor: "transparent" }} placeholder="시간" className="toasted" readOnly inputMode="none" value={`${timeState.th} : ${timeState.tm == 0 ? '0' + timeState.tm : timeState.tm}`} onFocus={() => setToastState({ state: true, id: 2 })}
                                onBlur={() => setToastState({ state: false, id: 3 })}
                            />
                            <label>시간</label>
                        </InputForm.InputFormWrap>
                    </li>
                </ul>
            </div>
            <ButtonForm.SubmitBtn type='button' onClick={() => onSubmit()}>수정하기</ButtonForm.SubmitBtn>

            <Toast
                options={{
                    className: toastState.state && toastState.id === 0 ? 'toasting' : '',
                    width: '100%',
                    height: '100%',
                    gap: '0',
                    theme: 'glass'
                }}
                cMode={colorMode}
            >
                <div className="form__wrap" >
                    <ul>
                        <li style={{ backgroundColor: initColorValue.state.color1 }}>
                            <input type="radio" id="10" name="a0" onChange={(e: any) => setWorkState(e.target.value)} defaultValue="출근" /><label htmlFor="10">출근</label>
                        </li>
                        <li style={{ backgroundColor: initColorValue.state.color3 }}>
                            <input type="radio" id="20" name="a0" onChange={(e: any) => setWorkState(e.target.value)} defaultValue="오전 반차" /><label htmlFor="20">오전 반차</label>
                        </li>
                        <li style={{ backgroundColor: initColorValue.state.color4 }}>
                            <input type="radio" id="30" name="a0" onChange={(e: any) => setWorkState(e.target.value)} defaultValue="오후 반차" /><label htmlFor="30">오후 반차</label>
                        </li>
                        <li style={{ backgroundColor: initColorValue.state.color2 }}>
                            <input type="radio" id="40" name="a0" onChange={(e: any) => setWorkState(e.target.value)} defaultValue="월차" /><label htmlFor="40">월차</label>
                        </li>
                        <li style={{ backgroundColor: initColorValue.state.color5 }}>
                            <input type="radio" id="50" name="a0" onChange={(e: any) => setWorkState(e.target.value)} defaultValue="외근" /><label htmlFor="50">외근</label>
                        </li>
                    </ul>
                </div>
            </Toast>
            <Toast
                options={{
                    className: toastState.state && toastState.id === 2 ? 'toasting' : '',
                    width: '100%',
                    height: '100%',
                    gap: '0',
                    theme: 'glass'
                }}
                cMode={colorMode}
            >
                <div className="form__wrap" >
                    <ul>
                        <li>
                            <input type="radio" id="111" name="aaa" onChange={(e: any) => setTimeState({ th: e.target.dataset.th, tm: e.target.dataset.tm })} defaultValue="1" data-th={8} data-tm={0} defaultChecked /><label htmlFor="111">8:00</label>
                        </li>
                        <li>
                            <input type="radio" id="222" name="aaa" onChange={(e: any) => setTimeState({ th: e.target.dataset.th, tm: e.target.dataset.tm })} defaultValue="2" data-th={8} data-tm={30} /><label htmlFor="222">8:30</label>
                        </li>
                        <li>
                            <input type="radio" id="333" name="aaa" onChange={(e: any) => setTimeState({ th: e.target.dataset.th, tm: e.target.dataset.tm })} defaultValue="3" data-th={9} data-tm={0} /><label htmlFor="333">9:00</label>
                        </li>
                        <li>
                            <input type="radio" id="444" name="aaa" onChange={(e: any) => setTimeState({ th: e.target.dataset.th, tm: e.target.dataset.tm })} defaultValue="4" data-th={9} data-tm={30} /><label htmlFor="444">9:30</label>
                        </li>
                        <li>
                            <input type="radio" id="555" name="aaa" onChange={(e: any) => setTimeState({ th: e.target.dataset.th, tm: e.target.dataset.tm })} defaultValue="5" data-th={10} data-tm={0} /><label htmlFor="555">10:00</label>
                        </li>
                    </ul>
                </div>
            </Toast>

        </UpdateWrap>
    )

}

const UpdateWrap = styled.div`
    > div {
        margin-bottom: 4px;
    }
    .react-datepicker-wrapper {
        width : 100% !important;

        & + button {
            margin-top : 16px;
            width: 100% !important;
        }

        input[type='text'] {
            width : 100%
        }
    }


    .insert__form > ul {
        justify-content: space-between !important;

        > li {
          width : 49% ;
        }
    }

    // 내부 토스트 스타일
        .form__wrap ul{
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            margin: 0 auto;
            
        }
        .form__wrap ul li{
            position: relative;
            width: 18%;
            height : 35%;
            border: none;
            overflow: hidden;
            border-radius: 12px;
        }
        .form__wrap ul li input {
           display: none;

            &+label {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0;
                margin:  0;
                width: 100%;
                height: 100%;
                /* background-color:  transparent; */
                background-color: #444;
                color : #fff;
                font-weight: 700;
                font-size : 0.75rem;
                border: none;
            }
            &:checked + label {
                background-color: #0F9485;
            }
        }


        .loading{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%) scale(4);
            display: flex;
            flex-direction: column;
            align-items: center;

        &:after {
            display: none;
        }

        svg{
            polyline{
                fill: none;
                stroke-width: 2;
                stroke-linecap: round;
                stroke-linejoin: round;
                &#back {
                    stroke: rgba(#6E7BF2,.3)
                }
                &#front{
                    stroke: #6E7BF2;
                    stroke-dasharray: 12, 36; //Dash 12 & Gap 36
                    stroke-dashoffset: 48;
                    animation: dash 1s linear infinite;
                }
            }
        }
    }
@keyframes dash {
    62.5% {
        opacity: 0
    }
    100% {
        stroke-dashoffset: 0
    }

}
    
`

const InputGroup = styled.div`
    display:  flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 12px 0;

    input {
        display: none;
    }
    input + label {
        padding: 4px 8px;
        background-color: #ccc;
        box-sizing: border-box;
        border: 1px solid #aaa;
    }
    input:checked + label {
        background-color: #444;
        color: #fff;
    }
`
