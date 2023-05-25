import React from "react";
import styled from "styled-components";


const ItemWrap = styled.div`
    width : 100%;
    background-color : #eee;


    .now {
        color : red;
        font-weight : bold;
    }
`


export default function Index({ calendarProps, memberProps }: any) {
    const mapLength = calendarProps.last_date;
    const nowDate = calendarProps.now_date
    const getMapArray = Array.from({ length: mapLength }, (value, index) => index + 1);



    const getDate = (memberDate: any, calendarDate: any) => {
        // let d = new Date(memberDate).getDate();
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
                return `${state} - 14:00`
            } else if (state === '오후 반차') {

                const newH = h + harf;

                return `${state} - ${newH}:${m}`
                // return result
            }
            return `${h}:${m}`
        }

    };


    return (
        <ItemWrap>
            {
                getMapArray.map((ele, index) => {

                    return (
                        <div key={ele} className={ele === nowDate ? "now" : ""} style={{ padding: '4px 0' }}>
                            <span>{ele}일</span>
                            <span>
                                {
                                    memberProps.map((m: any, index: number) => {
                                        return getDate(m.date_at[2], ele) && ` ${m.user_id} - ${offDay(m.data.state, m.data.work_time)}, `
                                    })
                                }
                            </span>
                        </div>
                    )
                })
            }
        </ItemWrap>
    )
}