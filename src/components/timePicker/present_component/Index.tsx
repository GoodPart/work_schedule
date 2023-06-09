import React, { useEffect, useState, useCallback } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale'; //한국어 설정
import styled from "styled-components";

import { updateData } from "../../../modules/calendar";


import * as ButtonForm from '../../../components/styledComponents/ButtonStyled'

import { useDispatch } from "react-redux";
import loadingGIF from "../../../loading.gif"

export default function Index({ timeInfo }: any) {

    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(new Date());
    const [workState, setWorkState] = useState(timeInfo.state);

    const updateSchedule = useCallback(async (form: any) => {
        await dispatch(updateData(form));
    }, [dispatch])

    useEffect(() => {
        if (timeInfo) {
            let setDate = timeInfo && new Date(timeInfo.date_at[0], timeInfo.date_at[1], timeInfo.date_at[2], timeInfo.data.work_time[0], timeInfo.data.work_time[1])

            setStartDate(setDate)
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
            <InputGroup>
                <ButtonForm.defaultInputBtn type="radio" id="test11" name="test1" value="출근" onChange={(e: any) => setWorkState(e.target.value)} /><label htmlFor="test11">출근</label>
                <ButtonForm.defaultInputBtn type="radio" id="test22" name="test1" value="오전 반차" onChange={(e: any) => setWorkState(e.target.value)} /><label htmlFor="test22">반차(오전)</label>
                <ButtonForm.defaultInputBtn type="radio" id="test33" name="test1" value="오후 반차" onChange={(e: any) => setWorkState(e.target.value)} /><label htmlFor="test33">반차(오후)</label>
                <ButtonForm.defaultInputBtn type="radio" id="test44" name="test1" value="월차" onChange={(e: any) => setWorkState(e.target.value)} /><label htmlFor="test44">월차</label>
                <ButtonForm.defaultInputBtn type="radio" id="test55" name="test1" value="외근" onChange={(e: any) => setWorkState(e.target.value)} /><label htmlFor="test55">외근</label>
            </InputGroup>
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