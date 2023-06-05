import React from "react";
import styled from "styled-components";
import axios from "axios";


const ItemWrap = styled.div`
    width : 100%;
    background-color : #eee;
    padding-bottom: 120px;


    .now {
        /* color : red; */
        font-weight : bold;
    }

/* style={{ display: "flex", flexWrap: "wrap", padding: "16px", width: "calc(100% - 100px)", backgroundColor: "#fff", borderRadius: "3px" }} */
    .calc-desc {
        display: flex;
        flex-wrap: wrap;
        width : calc(100% - 60px);
        background-color: skyblue;

    }
`

const CardWrap = styled.div`
    margin: 4px;
    padding: 12px;
    display: flex;
    justify-content: space-between;
    max-width: 230px;
    min-width: 210px;
    width : 32%;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: all.2s ease-in-out;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0px 10px 19px -12px rgba(0,0,0,0.75);
    }

    @media (max-width:605px){
        max-width: 100%;
        width : 100%;
    }

    .wrap {
        position: relative;

        &:after {
            content: '';
            position: absolute;
            top: 50%;
            right : 0;
            transform: translateY(-50%);
            width : 1px;
            height: 80%;
            background-color: #ddd;
        }

        @media (max-width:605px){
        width : 100% !important;
    }
    }

    .wrap, .work-state {
        display: flex;
        width : 60%
    }


    .card__section {
        display: flex;
    }
    .card__section .content {
        align-self: center;
    }

    .card__section:first-child {
        display: flex;
    }
    .name { 
        font-size: 24px
    }
    .info--item {
        font-size: 10px;
    }

    .work-state {
        margin-top : 12px;
        flex-direction: column;
        width : 40%;
        align-self: center;
    }
    .work-state p {
        text-align: center;
        margin : 0;
        padding : 0
    }
    .work-state p:first-child {
        font-size: 14px;
        font-weight: bold;
    }
    .work-state p:last-child {
        font-size: 12px;
    }

    .cancle-btn {
        height: 24px;
    }
`

const WorkState = styled.div<{ state: String }>`
    position: relative;
    &:after {
        content: '';
        position: absolute;
        top: -12px;
        left : 50%;
        transform: translateX(-50%);
        width : 8px;
        height: 8px;
        background-color: ${(props) => props.state === '출근' ? 'red' : props.state === '오후 반차' ? 'blue' : props.state === '오전 반차' ? 'green' : props.state === '월차' ? 'gray' : props.state === '외근' ? 'orange' : ''};
        border-radius: 12px;
    }
`


export default function Index({ calendarProps, memberProps, deleteSchedule, loading, mySchFunc, nameValue }: any) {
    const mapLength = calendarProps.last_date;
    const nowDate = calendarProps.now_date;
    const getMapArray = Array.from({ length: mapLength }, (value, index) => index + 1);



    const getDate = (memberDate: any, calendarDate: any) => {
        let check = memberDate === calendarDate ? true : false;

        if (check) return true
    };
    const offDay = (state: string, work_time: any) => {
        const harf = 4;


        if (state === '월차' || state === '외근') {
            return <p>{state}</p>
        } else {
            const h = work_time[0];
            const m = work_time[1] == 0 ? `0${work_time[1]}` : work_time[1];

            if (state === '오전 반차') {
                return <><p>{state}</p> <p>14:00</p></>
            } else if (state === '오후 반차') {

                const newH = h + harf;

                return <><p>{state}</p><p>{newH} : {m}</p></>
            }
            return <><p>{state}</p><p>{h} : {m}</p></>
        }

    };

    const lastCheck = (mapEle: any, mapLength: any) => {
        if (Number(mapEle) <= mapLength) {
            return true
        } else {

            return false
        }
    }

    return (
        <ItemWrap>
            {
                getMapArray.map((ele, index) => {
                    console.log('ele ->', ele, 'getMap ->', getMapArray.length)
                    return (
                        <div key={ele} className={ele === nowDate ? "now" : ""} style={{ display: "flex", justifyContent: "space-between", padding: '2px 0', borderRadius: 4, margin: "4px 0" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "60px", height: "60px", fontWeight: 700 }}>{ele}일 </div>

                            <div className="calc-desc" >
                                {

                                    loading && memberProps.map((m: any, index: number) => {
                                        if (m.date_at && m.date_at[2] && m.date_at[2] === ele && mySchFunc(m._id, lastCheck(ele, getMapArray.length))) {


                                            return <CardWrap key={m._id} id={m._id} >
                                                <div className="wrap">
                                                    <div className="card__section">
                                                        <div className="content">
                                                            <div className="name">
                                                                {m.user_name}
                                                            </div>
                                                            <div className="info">
                                                                <div className="info--item">
                                                                    주임 연구원
                                                                </div>
                                                                <div className="info--item">
                                                                    가산 사무소 / 디자인팀
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <WorkState state={m.data.state} className="work-state">
                                                    {offDay(m.data.state, m.data.work_time)}
                                                </WorkState>
                                                <button className="cancle-btn" type="button" disabled={nameValue ? false : true} onClick={() => deleteSchedule(m._id)}>X </button>
                                            </CardWrap>
                                        }
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