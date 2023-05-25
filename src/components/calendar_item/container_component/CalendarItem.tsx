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

export default function CalendarItem() {
    const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];

    const now = new Date();


    const nowYear = now.getFullYear();
    const nowMonth = now.getMonth() + 1;
    const nowDate = now.getDate();

    const firstDate = new Date(nowYear, nowMonth, 1).getDate();
    const lastDate = new Date(nowYear, nowMonth, 0).getDate();

    const getDayFunc = (day: number) => {
        return `${WEEKDAY[day]}요일`
    }

    let form = {
        first_date: firstDate,
        now_year: nowYear,
        now_date: nowDate,
        now_day: getDayFunc(now.getDay()),
        last_date: lastDate
    }

    return (
        <Index calendarProps={form} memberProps={tempMember} />
    )
}