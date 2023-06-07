import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale'; //한국어 설정
import styled from "styled-components";

export default function Index({ timeInfo }: any, updateSchedule: any) {

    const [startDate, setStartDate] = useState(new Date());
    const [workState, setWorkState] = useState(timeInfo.state);

    useEffect(() => {
        if (timeInfo) {
            let setDate = timeInfo && new Date(timeInfo.date_at[0], timeInfo.date_at[1], timeInfo.date_at[2], timeInfo.data.work_time[0], timeInfo.data.work_time[1])

            setStartDate(setDate)
            // console.log(timeInfo, startDate)
        }
    }, [timeInfo])

    const onSubmit = () => {

        let pushHH = new Date(startDate).getHours();
        let pushMM = new Date(startDate).getMinutes();

        let form = {
            data: {
                state: workState,
                work_time: [pushHH, pushMM]
            },
        }
        updateSchedule(timeInfo._id, form)

        // createSchedule(form)
    }

    if (!timeInfo) return <>loading...</>


    return (
        <>
            <InputGroup>
                <input type="radio" id="test11" name="test1" value="출근" onChange={(e) => setWorkState(e.target.value)} /><label htmlFor="test11">출근</label>
                <input type="radio" id="test22" name="test1" value="오전 반차" onChange={(e) => setWorkState(e.target.value)} /><label htmlFor="test22">반차(오전)</label>
                <input type="radio" id="test33" name="test1" value="오후 반차" onChange={(e) => setWorkState(e.target.value)} /><label htmlFor="test33">반차(오후)</label>
                <input type="radio" id="test44" name="test1" value="월차" onChange={(e) => setWorkState(e.target.value)} /><label htmlFor="test44">월차</label>
                <input type="radio" id="test55" name="test1" value="외근" onChange={(e) => setWorkState(e.target.value)} /><label htmlFor="test55">외근</label>
            </InputGroup>
            < DatePicker
                selected={startDate}
                onChange={(date: any) => setStartDate(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                locale={ko}
            />
            <button onClick={() => onSubmit()}>수정하기</button>
        </>
    )

}

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