import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TimePicker from "../../timePicker/container_component/TimePicker";


import { initColorValue } from "../../styledComponents/CommonValue";

import * as ButtonForm from "../../../components/styledComponents/ButtonStyled";


import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../modules";






export default function Index({ calendarProps, memberProps, deleteSchedule, loading, mySelf, getDayFunc, modeColor }: any) {
    const [toggle, setToggle] = useState(false);
    const [updateProps, setUpdateProps] = useState('');
    const [simply, setSimply] = useState(false);

    const mapLength = calendarProps.last_date;
    const nowDate = calendarProps.now_date;
    const getMapArray = Array.from({ length: mapLength }, (value, index) => index + 1);

    const getSystemStore = useSelector((state: RootState) => state.systemReducer)


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
        setSimply(getSystemStore.calendar_simple)
    }, [toggle])


    return (
        <ItemWrap cMode={modeColor}>
            {
                getMapArray.map((ele, index1) => {
                    return (
                        <div key={ele} className={ele === nowDate ? "day__wrap now" : "day__wrap"} >
                            <div className="day-desc"
                                style={{ display: "flex", alignItems: "top", justifyContent: "center", width: "auto", fontWeight: 700 }}>
                                <span style={{ color: modeColor === 'light' ? '#48484A' : "#fff", letterSpacing: "-0.05em" }}>{ele < 10 ? `0${ele}` : ele}</span><span className="desc-day" style={getDayFunc(new Date(calendarProps.dateY, calendarProps.dateM - 1, ele).getDay()) === '토' || getDayFunc(new Date(calendarProps.dateY, calendarProps.dateM - 1, ele).getDay()) === '일' ? { color: initColorValue.point1 } : { color: modeColor === 'light' ? '#48484A' : "#fff", letterSpacing: "-0.05em" }}>
                                    {getDayFunc(new Date(calendarProps.dateY, calendarProps.dateM - 1, ele).getDay())}
                                </span>
                            </div>

                            <div className="calc-desc" >
                                {
                                    //정렬 기능 추가 부분
                                    loading ? memberProps.sort((a: any, b: any) => a.data.work_time[0] - b.data.work_time[0]).map((m: any, index2: number) => {
                                        // m.date_at && m.date_at[2] && m.date_at[2] === ele && m.user.team_name === '수정팀'
                                        if (m.date_at && m.date_at[2] && m.date_at[2] === ele) {
                                            return <CardWrap key={m.user._id} id={m.user._id} delay={index2} cMode={modeColor} className={mySelf(m.user.user_name) ? `${simply ? `simple-data` : ""} your-calc` : `${simply && 'simple-data'}`} >
                                                <div className="wrap">
                                                    <div className="card__section">
                                                        <div className="content">
                                                            <div className="name">
                                                                {m.user.user_name} {mySelf(m.user.user_name) ? <em>ME</em> : ""}
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
                                                        <div className="addon" >
                                                            <ButtonForm.defaultBtn className="cancle-btn" type="button" disabled={mySelf(m.user.user_name) ? false : true} onClick={() => deleteSchedule(m._id)}></ButtonForm.defaultBtn>
                                                            <ButtonForm.defaultBtn className="update-btn" type="button" disabled={mySelf(m.user.user_name) ? false : true} onClick={() => { setUpdateProps(m._id); setToggle(!toggle) }}></ButtonForm.defaultBtn>
                                                        </div>
                                                    ) : <></>
                                                }
                                            </CardWrap>
                                        }
                                    }) : memberProps.map((m: any, index: number) => {
                                        return <ScltonDiv cMode={modeColor} />
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
                        <div className="inner__wrap" style={{ backgroundColor: modeColor === 'light' ? initColorValue.light.bg : initColorValue.dark.bg, borderColor: modeColor === 'light' ? initColorValue.light.bg : initColorValue.dark.bg }}>
                            <ButtonForm.SubmitBtn style={{ position: "absolute", top: 4, right: 4, width: "fit-content", padding: 9, fontSize: '0.6rem', }} type="button" onClick={() => toggleClose()}>X</ButtonForm.SubmitBtn>
                            <TimePicker timeProps={updateProps} tgc={toggleClose} modeColor={modeColor} />
                        </div>
                    </div>
                )
            }
        </ItemWrap>

    )

}
const ScltonDiv = styled.div<{ cMode: string }>`
    position: relative;
    overflow: hidden;
    display: flex;
    width : 100%;
    background-color: #e7e7e7;
    background:  ${props => props.cMode === 'light' ? "#e7e7e7" : "#252525"};

    

    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 80%;
        height: 100%;
        background:  ${props => props.cMode === 'light' ? initColorValue.light.loadingGradient : initColorValue.dark.loadingGradient};
        /* background: linear-gradient(to right, #e7e7e7, #ccc, #e7e7e7); */
        animation: loading 2s infinite linear;
    }

    @keyframes loading {
    0% {
        transform: translateX(-100vw);
    }
    50%,
    100% {
        transform: translateX(100vw);
    }
}
`
const ItemWrap = styled.div<{ cMode: string }>`
    width : 100%;
    background-color: ${props => props.cMode === 'light' ? initColorValue.light.bg : initColorValue.dark.bg1};;
    padding-bottom: 210px;


    @media (min-width:561px) {
        padding-bottom: 96px;

        
      
    }

    .addon {
        /* display: none; */
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        transform: scale(0);
        width: 0;

        button {
            display: block;
        }
        
    }

    .day__wrap {
        position: relative;
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        border-radius: 4px;
        /* margin: 4px 0; */

        
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
        width : calc(100% - 68px);
        padding: 2px 0;
        background-color: ${props => props.cMode === 'light' ? initColorValue.light.calcDesc : initColorValue.dark.bg};;
    }

    .day-desc {
        position: relative;
        
        span {
            font-family: 'NotoSansKR_Bold';
        }
        span:first-child {
            font-size : 24px;

        }
    }
    .timepicker__wrap {
        z-index : 10000;
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
        overflow: hidden;
        position: absolute;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        width: calc(100% - 64px);
        padding: 32px;
        border: 1px solid #ddd;
        border-radius: 12px;
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

    @media (max-width : 560px) {
        .calc-desc {
            width : calc(100% - 56px);
        }
        .day-desc {
           
            span:first-child {
                font-size : 28px;

            }
        }
    }
`

const CardWrap = styled.div<{ delay: Number, cMode: string }>`
    position: relative;
    opacity :0;
    margin: 2px 4px;
    padding: 4px;
    display: flex;
    justify-content: space-between;
    max-width: 320px;
    min-width: 270px;
    width : 300px;
    min-height: 58px;
    background-color: ${props => props.cMode === 'light' ? initColorValue.light.bg : initColorValue.dark.bg1};

    /* border: 1px solid #ddd; */
    border-width: 1px;
    border-style: solid;
    border-color:${props => props.cMode === 'light' ? initColorValue.light.bg : initColorValue.dark.bg1};
    border-radius: 4px;
    transition: transform .2s cubic-bezier(0.16, 1, 0.3, 1);
    animation-name: showPC;
    animation-duration: 2s;
    animation-delay: ${(props) => `.${props.delay}s`};
    animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    animation-fill-mode: forwards;
    animation-direction: normal;

    &.your-calc {
        &:after {
            content : 'ME';
            position: absolute;
            top : 4px;
            left : 4px;
            padding : 2px 4px;
            font-size : 10px;
            font-weight:700;
            line-height : 10px;
            background-color : ${initColorValue.state.color2};
            color : #fff;
            border-radius : 2px;
        }
    }

    &:hover {
        box-shadow: 0px 10px 19px -12px rgba(0,0,0,0.75);
    }
    &.your-calc:hover {
        .addon {
            transition: transform .3s .1s cubic-bezier(0.16, 1, 0.3, 1);
            transform : scale(1);
            width : auto
            
        }
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

        /* &:after {
            content: '';
            position: absolute;
            top: 50%;
            right : 0;
            transform: translateY(-50%);
            width : 1px;
            height: 80%;
            background-color: ${props => props.cMode === 'light' ? initColorValue.light.bg : initColorValue.dark.bg};;
        } */

        @media (max-width:741px){
            width : 100% !important;
        }
    }

    .wrap, .work-state {
        display: flex;
        width : 100%
    }


    .card__section {
        display: flex;
    }
    .card__section .content {
        align-self: center;
    }

    .card__section {
        display: flex;
        width :100%;


        @media (max-width:741px){
            display : flex;
            .name {
                margin-top : 0
            }
            .content {
                display : flex;
                width: 100%;
            }
            .content .info {
                margin-left : 8px;
                margin-top : 0 !important;
                align-self : center;
            }
           
        }
    }
    .name { 
        font-family: 'NotoSansKR_Bold';
        font-weight : bold;
        font-size: 20px;
        letter-spacing : -0.05em;
        margin-top : 8px;
        color: ${props => props.cMode === 'light' ? '##48484A' : "#fff"};
    }
    &.your-calc .name em {
            display : none
        }
        &.simple-data {
            padding : 2px 8px;
            min-height : inherit;

            

            &.your-calc:hover {
                /* padding : 2px 4px 2px 8px; */
            }
            &.your-calc:hover .addon {
                padding : 0 4px;


            }

            &.your-calc .name {
                display : flex;
                align-items : center
            }

            &.your-calc .name em {
                display : inline-block;
                padding : 2px 4px;
                margin-left : 0.5rem;
                font-size : 10px;
                font-weight:700;
                font-style : normal;
                line-height : 10px;
                background-color : ${initColorValue.state.color2};
                color : #fff;
                border-radius : 2px;
            }

            &:after {
                display : none
            }

            /* .wrap {
                width : inherit !important
            } */
            .card__section {
                width : inherit !important
            }

            .card__section .content {
                width : inherit !important;
            }
            .card__section .content .name {
                margin-top : 0;
                font-size : 16px;
            }
            .card__section .content .info {
                display : none
            }

            
            .work-state {
                width : 100%;
                flex-direction : row;
                justify-content : end;
                p {
                    margin : 0;
                }
                p + p {
                    margin-left : 8px
                }
            }

            .addon {
                flex-direction : row-reverse;
                align-items : center;

                button {
                    margin : 0 2px;
                }
            }

        }
    //mobile
    @media (max-width: 560px) {
        
        
        
    .wrap {
            width : inherit !important
        }

        
    }
    .card__section .content .info  {
        margin-top :1px;
        letter-spacing : -0.05em;
        color: ${props => props.cMode === 'light' ? '##48484A' : "#ccc"};

    }
    .info--item {
        font-size: 10px;
        font-weight : bold
    }

    .work-state {
        /* margin-top : 12px; */
        flex-direction: column;
        width : 30%;
        align-self: center;
        color: ${props => props.cMode === 'light' ? '##48484A' : "#fff"};

     @media (max-width:741px){
        width : 30%
    }
    }
    .work-state p {
        text-align: center;
        margin : 0;
        padding : 0;
        font-size: 14px;
        font-weight: bold;
        text-shadow: 0 0 black

    }
   

    .cancle-btn,
    .update-btn {
        display :block;
        width : 24px;
        height: 24px;
        background-image : url('delete.png');
        background-repeat: no-repeat;
        background-size: 50%;
        background-position: center;

        &:hover {
                /* filter : invert(1); */
        }
    }
    .update-btn {
        background-image : url('update.png');
        margin-top : 4px
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
        max-width: 40%;
        min-width: 30%;
        font-size : 14px;
        font-weight: bold;
        background-color: ${(props) => props.state === '출근' ? initColorValue.state.color1 : props.state === '오후 반차' ? initColorValue.state.color4 : props.state === '오전 반차' ? initColorValue.state.color3 : props.state === '월차' ? initColorValue.state.color2 : props.state === '외근' ? initColorValue.state.color5 : ''};
        color : #fff;
        word-break: keep-all;

        
        
    }
     @media (max-width:741px){
            p:first-child {
                padding: 2px 6px;
                max-width: 60%;
                line-height: 16px;
            }
         }
    /* p + p {
        margin-top : 4px !important
    } */

`