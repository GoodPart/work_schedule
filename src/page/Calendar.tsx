import React, { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale'; //한국어 설정

//component
import CalendarItem from "../components/calendar_item/container_component/CalendarItem";
import Toast from "../components/Toast";

//styled
import { styled } from "styled-components";
import * as InputForm from '../components/styledComponents/InputStyled'
import * as ButtonForm from "../components/styledComponents/ButtonStyled"
import { initColorValue } from "../components/styledComponents/CommonValue";


//redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules";
import { deleteData, insertData } from "../modules/calendar";
import { authCheckToServer } from '../modules/auth'

//img
import loading from '../loading.gif'
const deployURL = "http://ec2-43-201-0-7.ap-northeast-2.compute.amazonaws.com"


export default function Calendar() {

    const dispatch = useDispatch();

    //redux store
    let authData = useSelector((state: RootState) => state.authCheckReducer);
    const calendarData = useSelector((state: RootState) => state.calendarReducer)

    const [inputDate, setInputDate] = useState(new Date());
    let [nameValue, setNameValue] = useState(authData.auth.user_name);

    let todayY = new Date().getFullYear();
    let todayM = new Date().getMonth();

    let [member, setMember] = useState();
    let [stdDate, setStdDate] = useState({
        y: todayY,
        m: todayM + 1,
    });
    let [workState, setWorkState] = useState("출근");

    let [ctlToggle, setCtlToggle] = useState(true);

    let monthCount = useRef(0);


    const getSchedule = (month: any) => axios.post("https://myworkday.pe.kr:8888/api/calendar/read", {
        month: month
    }, {
        withCredentials: true
    }).then((res => {
        if (res.data.success) {
            setMember(res.data.result)
        }
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

        let form = {
            user: {
                user_id: "",
                user_name: nameValue,
                rank_title: "",
                office_name: "",
                team_name: ""
            },
            date_at: [pushY, pushM, pushD],
            data: {
                state: workState,
                // work_time: [pushHH, pushMM]
                work_time: workState === '월차' ? [0, 0] : workState === '오전 반차' ? [1, 0] : workState === '외근' ? [2, 0] : [pushHH, pushMM]
            },
            data_month: pushM
        }

        createSchedule(form)
    }
    const createSchedule = useCallback(async (form: any) => {
        await dispatch(insertData(form))
    }, [dispatch])

    const deleteSchedule = useCallback(async (_id: any) => {
        await dispatch(deleteData(_id)).then((res: any) => {
            // console.log(res)

            if (!res) {
                console.log('넘에 것 입니다.')
            } else {
                console.log("정상적으로 삭제 되었습니다.")
            }

        })
    }, [dispatch]);

    const mySelf = useCallback((item_name: any) => {

        if (nameValue === item_name) {
            return true
        } else {
            return false
        }

    }, [nameValue])


    useEffect(() => {
        getSchedule(stdDate.m);
        setNameValue(authData.auth.user_name)


    }, [stdDate, monthCount, authData, calendarData.loading])

    // if (!nameValue) return <>loading...</>

    return (
        <SettingWrap>
            <div className={ctlToggle ? 'ctl-wrap' : 'ctl-wrap hide'} >
                <Toast
                    options={{
                        className: !ctlToggle ? 'toasting' : '',
                        width: '34%',
                        height: '36px',
                        gap: '24px',
                        theme: 'glass'
                    }}
                >
                    <span style={{ opacity: ctlToggle ? 0 : 1, transition: 'opacity .6s .6s cubic-bezier(0.16, 1, 0.3, 1)', position: 'absolute', top: '-22px', left: '50%', transform: 'translateX(-50%)', letterSpacing: '-0.05em', fontSize: '14px', fontWeight: 700, width: 'max-content', textShadow: '0 0 black' }}>{stdDate.y}년 {stdDate.m}월</span>
                    <div className="setting">
                        <button onClick={() => deCrease()}>{stdDate.m - 1}월</button> <button className="today" onClick={() => todaySet()}>Today</button> <button onClick={() => inCrease()}>{stdDate.m + 1}월</button>
                    </div>
                </Toast>
                <div data-device="mo" style={{ position: "absolute", top: '-64px', right: 40, display: "flex", padding: 4, border: `2px solid ${initColorValue.point1}`, borderRadius: 100, backgroundColor: '#fff' }}>
                    <input id="check" type="checkbox" onChange={(e) => setCtlToggle(e.target.checked)} checked={ctlToggle} style={{ display: "none" }} />
                    <label htmlFor="check" style={{ display: "flex" }}><img src="update.png" width={24} style={{ objectFit: "contain" }} alt="" /></label>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignSelf: "center" }}>
                    <InputForm.InputFormWrap check={nameValue ? nameValue : '미 로그인'} className="input__form" data-device="mo">
                        <input id={nameValue} style={{ border: "none", fontWeight: "bold" }} type="text" value={!nameValue ? '미 로그인' : nameValue} readOnly onChange={(e: any) => setNameValue(e.target.value)} />
                        <label htmlFor={nameValue}>아이디</label>
                    </InputForm.InputFormWrap>
                    {/* <h2 style={{ padding: 0, margin: "8px 0 0 ", letterSpacing: '-0.05em' }}>{stdDate.y}년 {stdDate.m}월</h2> */}
                    <div data-device="pc">
                        <h2 style={{ padding: 0, margin: "8px 0 0 ", letterSpacing: '-0.05em' }}>{stdDate.y}년 {stdDate.m}월</h2>
                        <button onClick={() => deCrease()}>{stdDate.m - 1}월</button> <button onClick={() => todaySet()}>오늘</button> <button onClick={() => inCrease()}>{stdDate.m + 1}월</button><br />
                    </div>

                </div>
                <div>
                    <div className="insert__form" >
                        <InputForm.InputFormWrap check={nameValue ? nameValue : '미 로그인'} className="input__form" data-device="pc">
                            <input id={nameValue} style={{ border: "none", fontWeight: "bold" }} type="text" value={!nameValue ? '미 로그인' : nameValue} readOnly onChange={(e: any) => setNameValue(e.target.value)} />
                            <label htmlFor={nameValue}>아이디</label>
                        </InputForm.InputFormWrap>
                        <div className="form--wrap">
                            <InputForm.InputFormWrapSelect>
                                <select onChange={(e: any) => setWorkState(e.target.value)} key={workState} defaultValue={workState}>
                                    <option value="출근" >출근</option>
                                    <option value="오전 반차" >오전 반차</option>
                                    <option value="오후 반차">오후 반차</option>
                                    <option value="월차">월차</option>
                                    <option value="외근">외근</option>
                                </select>
                            </InputForm.InputFormWrapSelect>
                            <DatePicker
                                selected={inputDate}
                                onChange={(date: any) => setInputDate(date)}
                                showTimeSelect
                                timeIntervals={30}
                                timeCaption="time"
                                dateFormat="yyyy년 MMMM dd일,  hh:mm aa"
                                locale={ko}
                            />
                        </div>
                        <ButtonForm.SubmitBtn className="submit" style={{ width: "inherit" }} onClick={() => onSubmit()} disabled={nameValue ? false : true}>등록</ButtonForm.SubmitBtn>

                    </div>



                </div>
            </div>
            {
                member ? (
                    <CalendarItem
                        dateProps={{ y: stdDate.y, m: stdDate.m }}
                        memberProps={member}
                        deleteSchedule={deleteSchedule}
                        loading={!calendarData.loading}
                        nameValue={nameValue}
                        mySelf={mySelf}
                    />
                ) : <img style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} src={loading} />
            }

        </SettingWrap>
    )
}


const SettingWrap = styled.div`
    width: 100%;
    background-color: #F9F9F9;
    width: calc(100% - 24px);

    .setting {
        display: flex;
        justify-content: space-around;
        width : 100%;
        button {
            padding: 6px;
            border-radius: 12px;
            border: none;
            letter-spacing: -0.05em;
            line-height: 12px;
            font-size: 12px;
            background-color: transparent;
        }

        button.today {
            color  : #fff;
            background-color: ${initColorValue.point1};
        }
    }

    .ctl-wrap {
        z-index : 90;
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: #fff;
        border: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
        padding: 16px 24px;
        width : calc(100% - 48px);
        min-width: 350px;
        transition: bottom .3s cubic-bezier(0.16, 1, 0.3, 1);;
        
    }

    @media (max-width: 560px) {
        .ctl-wrap {
            padding: 8px 12px;
            width: calc( 100% - 24px);
        }
    }

    .ctl-wrap.hide {
        bottom: -134px;
    }
    .ctl-wrap.hide + div {
        padding-bottom : 0
    }

    .react-datepicker-wrapper {
        width: auto;
    }
    .react-datepicker-wrapper input {
        width: auto;
    }
    .react-datepicker-wrapper + button {
        width: 20%;
    }
    .insert__form {
        display: flex;
    }

    .input__form {
        width:  120px;
    }
    /* .input__form[data-device='mo'] {
        display: none;
    } */
    @media (min-width:561px) {
        *[data-device='mo'] {
            display: none !important;
        }
    }

    @media (max-width:560px){
        .insert__form {
            flex-direction: column;
        }
        .insert__form select {
            padding: 4px;
        }

        *[data-device='pc'] {
            display: none;
        }
        *[data-device='mo'] {
            display: block;
        }

        /* .input__form[data-device='pc'] {
            display: none;
        } */
        .input__form[data-device='mo'] {
            /* display: block; */

            input[type='text'] {
                padding-top: 20px;
                padding-bottom: 8px;
                font-size: 12px;

                /* &+label {
                    top: 2px;
                } */
            }

        }
        .react-datepicker-wrapper input {
            padding: 8px 4px !important;
        }
    }

    .submit {
        padding: 4px;
        width: inherit;
        font-size : 18px
    }

    @media (max-width:560px) {
        .form--wrap {
            * + * {
                margin-top: 4px;
            }
        }
        .submit {
            margin-top: 4px;
         } 
    }
`

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