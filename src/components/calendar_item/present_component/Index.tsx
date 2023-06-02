import React from "react";
import styled from "styled-components";


const ItemWrap = styled.div`
    width : 100%;
    background-color : #ddd;
    padding-bottom: 120px;


    .now {
        color : red;
        font-weight : bold;
    }
`


export default function Index({ calendarProps, memberProps, deleteSchedule, loading, mySchFunc }: any) {
    const mapLength = calendarProps.last_date;
    const nowDate = calendarProps.now_date;
    console.log(calendarProps)
    const getMapArray = Array.from({ length: mapLength }, (value, index) => index + 1);



    const getDate = (memberDate: any, calendarDate: any) => {
        let check = memberDate === calendarDate ? true : false;

        if (check) return true
    };
    const offDay = (state: string, work_time: any) => {
        const harf = 4;


        if (state === '월차' || state === '외근') {
            return state
        } else {
            const h = work_time[0];
            const m = work_time[1] == 0 ? `0${work_time[1]}` : work_time[1];

            if (state === '오전 반차') {
                return `${state} | 14:00`
            } else if (state === '오후 반차') {

                const newH = h + harf;

                return `${state} | ${newH}:${m}`
            }
            return `${state} | ${h}:${m}`
        }

    };


    return (
        <ItemWrap>
            {
                getMapArray.map((ele, index) => {

                    return (
                        <div key={ele} className={ele === nowDate ? "now" : ""} style={{ display: "flex", justifyContent: "space-between", padding: '2px 0', borderRadius: 4, margin: "4px 0" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "60px", height: "60px", fontWeight: 700, backgroundColor: "#fff", borderRadius: 100 }}>{ele}일 </div>

                            <div style={{ display: "flex", flexWrap: "wrap", padding: "16px", width: "calc(100% - 100px)", backgroundColor: "#fff", borderRadius: "3px" }}>
                                {
                                    loading && memberProps.map((m: any, index: number) => {
                                        // mySchFunc(m._id)
                                        return getDate(m.date_at[2], ele) && <div key={m._index} id={m._id} style={{ width: '33.33333%' }}>{`${m.user_name} | ${offDay(m.data.state, m.data.work_time)} `} <button type="button" onClick={() => deleteSchedule(m._id)}>X </button></div>
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </ItemWrap>
    )
}