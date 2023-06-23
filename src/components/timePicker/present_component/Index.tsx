import React, { useEffect, useState, useCallback } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale'; //한국어 설정
import styled from "styled-components";

import { updateData } from "../../../modules/calendar";

import * as InputForm from '../../../components/styledComponents/InputStyled'
import * as ButtonForm from '../../../components/styledComponents/ButtonStyled'

import { useDispatch } from "react-redux";
import loadingGIF from "../../../loading.gif"


import Toast from "../../Toast";
import { initColorValue } from "../../styledComponents/CommonValue";

export default function Index({ timeInfo, tgc }: any) {

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

            setStartDate(setDate)
            setWorkState(timeInfo.data.state)
        }
    }, [timeInfo])

    const onSubmit = () => {

        let pushHH = new Date(startDate).getHours();
        let pushMM = new Date(startDate).getMinutes();

        let form = {
            _id: timeInfo._id,
            data: {
                state: workState,
                work_time: [pushHH, pushMM]
            },
        }
        updateSchedule(form)
    }

    if (!timeInfo) return <img style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} src={loadingGIF} />


    return (
        <UpdateWrap>
            <InputForm.InputFormWrap check={'1'}>
                <input type="text" placeholder="날짜" readOnly value={`${startDate.getFullYear()}년 ${startDate.getMonth() + 1}월 ${startDate.getDate()}일 `} onFocus={() => setToastState({ state: true, id: 1 })} />
                <label>날짜</label>
            </InputForm.InputFormWrap>
            <div className="insert__form">
                <ul>
                    <li>
                        <InputForm.InputFormWrap check={workState}>
                            <input type="text" placeholder="상태" className="toasted" readOnly inputMode="none" value={workState} onFocus={() => setToastState({ state: true, id: 0 })}
                                onBlur={() => setToastState({ state: false, id: 0 })}
                            />
                            <label>상태</label>
                        </InputForm.InputFormWrap>
                    </li>
                    <li>
                        <InputForm.InputFormWrap check={workState}>
                            <input type="text" placeholder="시간" className="toasted" readOnly inputMode="none" value={`${timeState.th} : ${timeState.tm == 0 ? '0' + timeState.tm : timeState.tm}`} onFocus={() => setToastState({ state: true, id: 2 })}
                                onBlur={() => setToastState({ state: false, id: 3 })}
                            />
                            <label>시간</label>
                        </InputForm.InputFormWrap>
                    </li>
                </ul>
            </div>
            {/* <ButtonForm.SubmitBtn className="submit" style={{ width: '100%', height: '100%', margin: 0 }} >등록</ButtonForm.SubmitBtn> */}
            <ButtonForm.SubmitBtn type='button' onClick={() => onSubmit()}>수정하기</ButtonForm.SubmitBtn>
            {/* <>
                <h2>{`${timeInfo.date_at[0]}년 ${timeInfo.date_at[1]}월 ${timeInfo.date_at[2]}일`}</h2>
            </>
            <InputForm.InputFormWrapSelect>
                <select onChange={(e: any) => setWorkState(e.target.value)} defaultValue={timeInfo.data.state}>
                    <option value="출근" >출근</option>
                    <option value="오전 반차" >오전 반차</option>
                    <option value="오후 반차">오후 반차</option>
                    <option value="월차">월차</option>
                    <option value="외근">외근</option>
                </select>
            </InputForm.InputFormWrapSelect>
            < DatePicker
                selected={startDate}
                onChange={(date: any) => setStartDate(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="h:mm aa"
                locale={ko}
            />
            <ButtonForm.SubmitBtn type='button' onClick={() => onSubmit()}>수정하기</ButtonForm.SubmitBtn> */}

            <Toast
                options={{
                    className: toastState.state && toastState.id === 0 ? 'toasting' : '',
                    width: '100%',
                    height: '206px',
                    gap: '0',
                    theme: 'glass'
                }}
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
                    height: '206px',
                    gap: '0',
                    theme: 'glass'
                }}
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

            /* &:after {
                content: '';
                position: absolute;
                top: 0;
                left : 0;
                width: 100%;
                height: 8px;
                background-color: #444;
            } */
            
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
