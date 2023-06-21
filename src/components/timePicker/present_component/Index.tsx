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

export default function Index({ timeInfo, tgc }: any) {

    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(new Date());
    const [workState, setWorkState] = useState('');

    const updateSchedule = useCallback(async (form: any) => {
        await dispatch(updateData(form));
        tgc()
    }, [dispatch])

    useEffect(() => {
        if (timeInfo) {
            let setDate = timeInfo && new Date(timeInfo.date_at[0], timeInfo.date_at[1], timeInfo.date_at[2], timeInfo.data.work_time[0], timeInfo.data.work_time[1])

            setStartDate(setDate)
            setWorkState(timeInfo.data.state)
            // console.log(timeInfo.data.state)
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
            <>
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
            <ButtonForm.SubmitBtn type='button' onClick={() => onSubmit()}>수정하기</ButtonForm.SubmitBtn>
        </UpdateWrap>
    )

}

const UpdateWrap = styled.div`
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