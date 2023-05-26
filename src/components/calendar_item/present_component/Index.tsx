import React from "react";
import styled from "styled-components";


const ItemWrap = styled.div`
    width : 100%;
    background-color : #ddd;


    .now {
        color : red;
        font-weight : bold;
    }
`


export default function Index({ calendarProps, memberProps }: any) {
    const mapLength = calendarProps.last_date;
    const nowDate = calendarProps.now_date;
    const getMapArray = Array.from({ length: mapLength }, (value, index) => index + 1);

    const getDate = (memberDate: any, calendarDate: any) => {
        let check = memberDate === calendarDate ? true : false;

        if (check) return true
    };
    const offDay = (state: string, work_time: any) => {
        const harf = 4;


        if (state === '월차') {
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
            return `${h}:${m}`
        }

    };


    return (
        <ItemWrap>
            {
                getMapArray.map((ele, index) => {

                    return (
                        <div key={ele} className={ele === nowDate ? "now" : ""} style={{ display: "flex", justifyContent: "space-between", padding: '2px 0', borderRadius: 4, margin: "4px 0" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "10%", height: "80px", fontWeight: 700, backgroundColor: "#fff", borderRadius: "12px 0 0 12px" }}>{ele}일 </div>

                            <div style={{ display: "flex", flexWrap: "wrap", padding: "16px", width: "calc(89% - 32px)", backgroundColor: "#fff", borderRadius: "0 12px 12px 0" }}>
                                {
                                    memberProps.map((m: any, index: number) => {
                                        return getDate(m.date_at[2], ele) && <div style={{ width: '50%' }}>{`${m.user_name} | ${offDay(m.data.state, m.data.work_time)} `}</div>
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