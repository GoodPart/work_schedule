import React from "react";
import Index from "../present_component/Index";

const tempMember = [
    {
        user_id: "조용필",
        date_at: [23, 4, 3],
        data: {
            state: "출근",
            work_time: [9, 30]
        }
    },
    {
        user_id: "박경수",
        date_at: [23, 4, 23],
        data: {
            state: "월차",
            work_time: ''
        }
    },
    {
        user_id: "손흥민",
        date_at: [23, 4, 23],
        data: {
            state: "출근",
            work_time: [10, 0]
        }
    },
    {
        user_id: "박지성",
        date_at: [23, 4, 24],
        data: {
            state: "출근",
            work_time: [8, 30]
        }
    },
    {
        user_id: "김동현",
        date_at: [23, 4, 24],
        data: {
            state: "오후 반차",
            work_time: [9, 30]
        }
    },
    {
        user_id: "설경구",
        date_at: [23, 4, 25],
        data: {
            state: "오전 반차",
            work_time: [9, 30]
        }
    },
]

export default function CalendarItem({ dateProps, memberProps, deleteSchedule, loading, mySelf, modeColor }: any) {
    // console.log(dateProps)

    let members = memberProps;
    let dateY = dateProps.y;
    let dateM = dateProps.m;


    const now = new Date();


    const nowYear = now.getFullYear();
    const nowMonth = now.getMonth() + 1;
    const nowDate = now.getDate();

    const firstDate = new Date(dateY, dateM, 1).getDate();
    const lastDate = new Date(dateY, dateM, 0).getDate();

    const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
    const getDayFunc = (day: number) => {
        return `${WEEKDAY[day]}`
    }



    let form = {
        first_date: firstDate,
        now_year: nowYear,
        now_month: nowMonth,
        now_date: nowDate,
        last_date: lastDate,
        dateY: dateY,
        dateM: dateM
    }

    return (
        <Index calendarProps={form} memberProps={members} deleteSchedule={deleteSchedule} loading={loading} mySelf={mySelf} getDayFunc={getDayFunc} modeColor={modeColor} />
    )
}