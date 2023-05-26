import React, { useEffect, useRef, useState, } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale'; //한국어 설정
import { redirect } from "react-router-dom";

import CalendarItem from "../components/calendar_item/container_component/CalendarItem";

export default function Calendar() {

    const [inputDate, setInputDate] = useState(new Date());
    const [nameValue, setNameValue] = useState('');

    let today = new Date();
    let todayY = new Date().getFullYear();
    let todayM = new Date().getMonth();

    let [member, setMember] = useState();
    let [stdDate, setStdDate] = useState({
        y: todayY,
        m: todayM + 1,
    });
    let monthCount = useRef(0)

    const getSchedule = (month: any) => axios.post("http://localhost:9999/api/calendar/read", {
        month: month
    }, {
        withCredentials: true
    }).then((res => {
        setMember(res.data.result)
    }))

    const inCrease = () => {

        monthCount.current = monthCount.current + 1

        let result = new Date(new Date().setMonth(new Date().getMonth() + monthCount.current));
        const y = result.getFullYear();
        const m = result.getMonth() + 1;
        setStdDate({
            y: y,
            m: m
        })
    }

    const deCrease = () => {
        monthCount.current = monthCount.current - 1

        let result = new Date(new Date().setMonth(new Date().getMonth() + monthCount.current));
        const y = result.getFullYear();
        const m = result.getMonth() + 1;
        setStdDate({
            y: y,
            m: m
        })
    }

    const todaySet = () => {
        let result = new Date(new Date().setMonth(new Date().getMonth()));
        const y = result.getFullYear();
        const m = result.getMonth() + 1;
        setStdDate({
            y: y,
            m: m
        })
        monthCount.current = 0
    }

    const onSubmit = () => {
        let pushY = new Date(inputDate).getFullYear();
        let pushM = new Date(inputDate).getMonth() + 1;
        let pushD = new Date(inputDate).getDate();

        let pushHH = new Date(inputDate).getHours();
        let pushMM = new Date(inputDate).getMinutes();

        console.log(pushY, pushM, pushD, pushHH, pushMM, nameValue)

        let form = {
            user_name: nameValue,
            date_at: [pushY, pushM, pushD],
            data: {
                state: "출근",
                work_time: [pushHH, pushMM]
            },
            data_month: pushM
        }

        axios.post("http://localhost:9999/api/calendar/create", form, {
            withCredentials: true
        }).then(result => {
            console.log(result.data)

        })
        window.location.replace("/calendar")




    }

    useEffect(() => {
        getSchedule(stdDate.m);
    }, [stdDate])

    return (
        <>
            <div style={{ position: "fixed", top: 10, right: 10, backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #ccc", padding: 12 }}>
                <h2>{stdDate.y}년 {stdDate.m}월</h2>
                <button onClick={() => deCrease()}>{stdDate.m - 1}월</button> <button onClick={() => todaySet()}>오늘</button> <button onClick={() => inCrease()}>{stdDate.m + 1}월</button><br />
                <input type="text" value={nameValue} onChange={(e: any) => setNameValue(e.target.value)} />
                <DatePicker
                    selected={inputDate}
                    onChange={(date: any) => setInputDate(date)}
                    showTimeSelect
                    timeIntervals={30}
                    timeCaption="time"
                    dateFormat="yyyy년 MMMM dd일,  hh:mm aa"
                    locale={ko}
                />
                <button onClick={() => onSubmit()}>등록</button>
            </div>
            {
                member ? (
                    <CalendarItem
                        dateProps={{ y: stdDate.y, m: stdDate.m }}
                        memberProps={member}
                    />
                ) : "loading..."
            }

        </>
    )
}