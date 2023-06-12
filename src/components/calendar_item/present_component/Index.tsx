import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TimePicker from "../../timePicker/container_component/TimePicker";


import { initColorValue } from "../../styledComponents/CommonValue";

import * as ButtonForm from "../../../components/styledComponents/ButtonStyled";






export default function Index({ calendarProps, memberProps, deleteSchedule, loading, mySelf, getDayFunc }: any) {
    const [toggle, setToggle] = useState(false);
    const [updateProps, setUpdateProps] = useState('');

    const mapLength = calendarProps.last_date;
    const nowDate = calendarProps.now_date;
    const getMapArray = Array.from({ length: mapLength }, (value, index) => index + 1);


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

                const newH = h

                return <><p>{state}</p><p>{newH} : {m}</p></>
            }
            return <><p>{state}</p><p>{h} : {m}</p></>
        }

    };


    const toggleClose = () => {
        setToggle(false)
    }
    useEffect(() => {

    }, [toggle])


    return (
        <ItemWrap>
            {
                getMapArray.map((ele, index1) => {
                    return (
                        <div key={ele} className={ele === nowDate ? "day__wrap now" : "day__wrap"} >
                            <div className="day-desc"
                                style={{ display: "flex", alignItems: "top", justifyContent: "center", width: "auto", minHeight: "60px", fontWeight: 700 }}>
                                <span style={{ fontSize: '36px', color: "#444" }}>{ele < 10 ? `0${ele}` : ele}</span><span className="desc-day" style={getDayFunc(new Date(calendarProps.dateY, calendarProps.dateM - 1, ele).getDay()) === '토' || getDayFunc(new Date(calendarProps.dateY, calendarProps.dateM - 1, ele).getDay()) === '일' ? { color: initColorValue.point1 } : { color: "#000" }}>
                                    {getDayFunc(new Date(calendarProps.dateY, calendarProps.dateM - 1, ele).getDay())}
                                </span>
                            </div>

                            <div className="calc-desc" >
                                {

                                    loading ? memberProps.map((m: any, index2: number) => {
                                        if (m.date_at && m.date_at[2] && m.date_at[2] === ele) {
                                            return <CardWrap key={m.user._id} id={m.user._id} delay={index2} >
                                                <div className="wrap">
                                                    <div className="card__section">
                                                        <div className="content">
                                                            <div className="name">
                                                                {m.user.user_name}
                                                            </div>
                                                            <div className="info">
                                                                <div className="info--item">
                                                                    {m.user.rank_title}
                                                                </div>
                                                                <div className="info--item">
                                                                    {m.user.office_name} / {m.user.team_name}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <WorkState state={m.data.state} className="work-state">
                                                    {offDay(m.data.state, m.data.work_time)}
                                                </WorkState>
                                                {
                                                    mySelf(m.user.user_name) ? (
                                                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
                                                            <ButtonForm.defaultBtn className="cancle-btn" type="button" disabled={mySelf(m.user.user_name) ? false : true} onClick={() => deleteSchedule(m._id)}><img src="delete.png" /></ButtonForm.defaultBtn>
                                                            <ButtonForm.defaultBtn className="update-btn" type="button" disabled={mySelf(m.user.user_name) ? false : true} onClick={() => { setUpdateProps(m._id); setToggle(!toggle) }}><img src="update.png" /></ButtonForm.defaultBtn>
                                                        </div>
                                                    ) : <></>
                                                }
                                            </CardWrap>
                                        }
                                    }) : memberProps.map((m: any, index: number) => {
                                        return <ScltonDiv />
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
            {
                toggle && (
                    <div className="timepicker__wrap" style={{ display: toggle ? "block" : "none" }}>
                        <div className="inner__wrap">
                            <button type="button" onClick={() => toggleClose()}>닫기</button>
                            <TimePicker timeProps={updateProps} toggle={toggle} setToggle={setToggle} />
                        </div>
                    </div>
                )
            }
        </ItemWrap>

    )

}
const ScltonDiv = styled.div`
    position: relative;
    overflow: hidden;
    display: flex;
    width : 100%;
    background-color: #e7e7e7;

    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 80%;
        height: 100%;
        background: linear-gradient(to right, #e7e7e7, #ccc, #e7e7e7);
        animation: loading 2s infinite linear;
    }

    @keyframes loading {
    0% {
        transform: translateX(-50vw);
    }
    50%,
    100% {
        transform: translateX(100vw);
    }
}
`
const ItemWrap = styled.div`
    width : 100%;
    background-color : #F9F9F9;
    padding-bottom: 120px;


    .day__wrap {
        position: relative;
        display: flex;
        justify-content: space-between;
        padding: 2px 0;
        border-radius: 4px;
        margin: 4px 0;

        
    }

    .now {
        .calc-desc {
            background-color: ${initColorValue.point1};
            box-sizing: border-box;
        }
    }

    .calc-desc {
        display: flex;
        flex-wrap: wrap;
        width : calc(100% - 80px);
        background-color: #e7e7e7;

    }

    .day-desc {
        position: relative;
    }
    .timepicker__wrap {
        position :  fixed;
        top: 0;
        left: 0;
        right : 0;
        bottom : 0;
        width: 100%;
        height : 100%;
        background-color: rgba(0,0,0,0.6);
        cursor: not-allowed;
    }

    .timepicker__wrap .inner__wrap {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        padding: 32px;
        border: 1px solid #ddd;
        border-radius: 4px;
        cursor : default;
        transition: margin .4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow .4s cubic-bezier(0.16, 1, 0.3, 1);

        &:hover {
            margin-top: -10px;
            box-shadow: 0px 10px 19px -12px rgba(0,0,0,0.75);
        }

        @media (max-width:741px){
            width : 80%
        }
    }
`

const CardWrap = styled.div<{ delay: Number }>`
    opacity :0;
    margin: 6px 4px;
    padding: 8px;
    display: flex;
    justify-content: space-between;
    max-width: 320px;
    min-width: 270px;
    width : 300px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: transform .2s cubic-bezier(0.16, 1, 0.3, 1);
    animation-name: showPC;
    animation-duration: 2s;
    animation-delay: ${(props) => `.${props.delay}s`};
    animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    animation-fill-mode: forwards;
    animation-direction: normal;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0px 10px 19px -12px rgba(0,0,0,0.75);
    }

    @media (max-width:741px){
        max-width: 100%;
        width : 100%;

        animation-name: showMO;
        animation-duration: 1s;
        animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        animation-fill-mode: forwards;
        animation-direction: normal;
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

        @media (max-width:741px){
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

    .card__section {
        display: flex;
    }
    .name { 
        font-weight : bold;
        font-size: 24px;
    }
    .card__section .content .info  {
        margin-top :8px
    }
    .info--item {
        font-size: 10px;
        font-weight : bold
    }

    .work-state {
        /* margin-top : 12px; */
        flex-direction: column;
        width : 40%;
        align-self: center;
    }
    .work-state p {
        text-align: center;
        margin : 0;
        padding : 0
    }
    .work-state p {
        font-size: 14px;
        font-weight: bold;
    }
    .work-state p:last-child {
        /* font-size: 12px; */
    }

    .cancle-btn,
    .update-btn {
        width : 24px;
        height: 24px;

        &:hover {
            img {
                filter : invert(1);
            }
        }

        img {
            width : 100%
        }
        
    }

    @keyframes showPC {
        0% {
            opacity : 0;
            
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes showMO {
        0% {
            opacity : 0;
            transform : scale(.8);
        }
        100% {
            opacity : 1;
            transform : scale(1);

        }
    }
`

const WorkState = styled.div<{ state: String }>`
    p:first-child {
        margin: 0 auto;
        padding: 2px 12px;
        border-radius: 4px;
        max-width: 60%;
        min-width: 30%;
        font-size : 14px;
        font-weight: bold;
        background-color: ${(props) => props.state === '출근' ? initColorValue.state.color1 : props.state === '오후 반차' ? initColorValue.state.color4 : props.state === '오전 반차' ? initColorValue.state.color3 : props.state === '월차' ? initColorValue.state.color2 : props.state === '외근' ? initColorValue.state.color5 : ''};
        color : #fff;
    }
    p + p {
        margin-top : 4px !important
    }

`