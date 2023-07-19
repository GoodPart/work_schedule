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
import { deleteData, insertData, insertDataMany } from "../modules/calendar";
import { systemUpdateSort } from "../modules/system";

//img
import loading from '../loading.gif'
import swal from 'sweetalert';
import { check } from "yargs";

export default function Calendar({ modeColor }: any) {

    const dispatch = useDispatch();

    //달력 범위 값
    const [dateRange, setDateRange] = useState([new Date, new Date]);
    const [startDate, endDate] = dateRange;
    //시간 값
    const [dateTime, setDateTime] = useState(new Date());

    const [insertMode, setInsertMode] = useState(false);

    //redux store
    let authData = useSelector((state: RootState) => state.authCheckReducer);
    const calendarData = useSelector((state: RootState) => state.calendarReducer)
    const systemData = useSelector((state: RootState) => state.systemReducer);

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
    let [timeState, setTimeState] = useState({
        th: 8,
        tm: 0

    });
    let [toastState, setToastState] = useState({
        state: false,
        id: 0
    });
    let [ctlToggle, setCtlToggle] = useState(false);

    let monthCount = useRef(0);

    const [sortV, setSortV] = useState(false);

    const getSchedule = (month: any) => axios.post("http://localhost:9999/api/calendar/read", {
        month: month
    }, {
        withCredentials: true
    }).then((res => {
        // console.log('start')

        if (res.data.success) {
            // console.log('getData')
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

        // let pushHH = new Date(inputDate).getHours();
        // let pushMM = new Date(inputDate).getMinutes();
        let pushHH = timeState.th;
        let pushMM = timeState.tm;

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
                work_time: workState === '월차' ? [0, 0] : workState === '오전 반차' ? [1, 0] : workState === '외근' ? [2, 0] : [dateTime.getHours(), dateTime.getMinutes()]
            },
            data_month: pushM
        }

        createSchedule(form)
        setInputDate(new Date)// init
    }
    const onSubmitMany = () => {
        let _year = new Date(startDate).getFullYear()
        let _month = new Date(startDate).getMonth() + 1; // 월 + 1;
        let _startD = new Date(startDate).getDate();// 시작일

        const oldDate = new Date(startDate);
        const newDate = new Date(endDate);

        //날짜 사이 일수
        let diff = Math.abs(newDate.getTime() - oldDate.getTime());
        diff = Math.ceil(diff / (1000 * 60 * 60 * 24));

        let form: any = [];

        for (let i = 0; i < diff + 1; i++) {


            let innerForm = {
                user: {
                    user_id: "",
                    user_name: nameValue,
                    rank_title: "",
                    office_name: "",
                    team_name: ""
                },
                date_at: [_year, _month, _startD + i],
                data: {
                    state: workState,
                    work_time: workState === '월차' ? [0, 0] : workState === '오전 반차' ? [1, 0] : workState === '외근' ? [2, 0] : [dateTime.getHours(), dateTime.getMinutes()]
                },
                data_month: _month,
            }
            form.push(innerForm)
        }

        createScheduleMany(form)
        setDateRange([new Date, new Date]); // init
    }
    const createSchedule = useCallback(async (form: any) => {
        let result = await dispatch(insertData(form));
        if (result) {
            setCtlToggle(false)
            swal("성공", "일정 등록을 완료했습니다..", "success");

        }
    }, [dispatch])
    const createScheduleMany = useCallback(async (form: any) => {
        let result = await dispatch(insertDataMany(form));
        if (result) {
            setCtlToggle(false)
            swal("성공", "일정 등록을 완료했습니다..", "success");

        }
    }, [dispatch])

    const deleteSchedule = useCallback(async (_id: any) => {
        let result = await dispatch(deleteData(_id));

        if (result) {
            setCtlToggle(false)
            swal("성공", "일정 삭제를 완료했습니다..", "success");
        }
    }, [dispatch]);

    const mySelf = useCallback((item_name: any) => {

        if (nameValue === item_name) {
            return true
        } else {
            return false
        }

    }, [nameValue])

    const onChangeSort = (e: React.ChangeEvent<HTMLInputElement>): any => {
        const { id, value, checked } = e.target;
        console.log(checked)

        let result = checked ? 'me' : 'all';
        changeSort(result)
        setSortV(!sortV)
    };

    const changeSort = useCallback(async (state: string) => {
        await dispatch(systemUpdateSort(state))
    }, [dispatch])

    useEffect(() => {
        getSchedule(stdDate.m);
        setNameValue(authData.auth.user_name)


    }, [stdDate, monthCount, authData, calendarData.loading, systemData.loading])

    if (!member) return <SettingWrap cMode={modeColor} style={{ height: "100%" }}>
        <div className="loading">
            <svg width="16px" height="12px">
                <polyline id="back" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>
                <polyline id="front" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>
            </svg>
        </div>
    </SettingWrap>
    {/* <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "48px" }}><img src="duck.gif" width={120} /><h2 style={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold", margin: "0", color: modeColor === 'light' ? "#333" : "#fff" }}>열심히 일하는 중</h2></div> */ }
    return (
        <SettingWrap cMode={modeColor}>
            <Toast
                options={{
                    className: !ctlToggle ? 'toasting' : '',
                    width: '34%',
                    height: '36px',
                    gap: '36px',
                    theme: 'glass'
                }}
                cMode={modeColor}
            >
                <span style={{ opacity: ctlToggle ? 0 : 1, transition: 'opacity .6s .2s cubic-bezier(0.16, 1, 0.3, 1)', position: 'absolute', top: '-24px', left: '50%', transform: 'translateX(-50%)', letterSpacing: '-0.05em', fontSize: '1rem', fontWeight: 700, width: 'max-content', color: modeColor === 'light' ? '#48484A' : "#fff" }}>{stdDate.y}년 {stdDate.m}월</span>
                <div className="setting">
                    <button onClick={() => deCrease()}>{stdDate.m - 1}월</button> <button className="today" onClick={() => todaySet()}>Today</button> <button onClick={() => inCrease()}>{stdDate.m + 1}월</button>
                </div>
            </Toast>
            <Toast
                options={{
                    className: toastState.state && toastState.id === 1 ? 'toasting' : '',
                    width: 'calc(100% - 24px)',
                    height: '320px',
                    gap: '24px',
                    theme: 'glass'
                }}
                cMode={modeColor}
            >
                <ButtonForm.SubmitBtn style={{ position: "absolute", top: 4, right: 4, width: "fit-content", padding: 9, fontSize: '0.6rem', }} type="button" onClick={() => setToastState({ state: false, id: 0 })}>X</ButtonForm.SubmitBtn>

                <div>
                    <div style={{ display: !insertMode ? "flex" : "none" }}>
                        <DatePicker
                            selected={inputDate}
                            onChange={(date: any) => setInputDate(date)}
                            dateFormat="yyyy년 MMMM dd일"
                            locale={ko}
                            inline
                            disabledKeyboardNavigation
                        />
                    </div>
                    <div style={{ display: insertMode ? "flex" : "none" }}>
                        <DatePicker
                            selectsRange={true}
                            onChange={(date: any) => setDateRange(date)}
                            startDate={startDate}
                            endDate={endDate}
                            dateFormat="yyyy년 MMMM dd일"
                            locale={ko}
                            inline
                            disabledKeyboardNavigation
                        />

                    </div>
                </div>
                <ButtonForm.SubmitBtn style={{ position: 'absolute', bottom: '10px', right: '20px', width: '20%' }} disabled={endDate ? false : true} onClick={() => setToastState({ state: false, id: 0 })}>등록</ButtonForm.SubmitBtn>

            </Toast>
            <div className="add-calendar" style={{ bottom: ctlToggle ? '194px' : '36px', border: `2px solid ${initColorValue.point1}`, backgroundColor: initColorValue.point1 }}>
                <input id="check" type="checkbox" onChange={(e) => setCtlToggle(e.target.checked)} checked={ctlToggle} style={{ display: "none" }} />
                <label htmlFor="check" style={{ display: "flex" }}><img src="update.png" width={24} style={{ objectFit: "contain" }} alt="일정추가" /></label>
            </div>
            <div className="change-sort" style={{ bottom: ctlToggle ? '260px' : '96px', border: `2px solid ${initColorValue.point1}`, backgroundColor: initColorValue.point1 }}>
                <input id="sortV" type="checkbox" onChange={(e) => onChangeSort(e)} checked={systemData.sortState.type === 'me'} style={{ display: "none" }} />
                <label htmlFor="sortV" style={{ display: "flex", fontSize: '0.7rem' }}>{systemData.sortState.type}</label>
            </div>
            <div className={ctlToggle ? 'ctl-wrap' : 'ctl-wrap hide'} >


                <div style={{ display: "flex", flexDirection: "column", alignSelf: "center" }}>
                    <div data-device="pc">
                        <h2 style={{ padding: 0, margin: "8px 0 0 ", letterSpacing: '-0.05em', color: modeColor === 'light' ? initColorValue.light.textBlack : initColorValue.dark.textWhite }}>{stdDate.y}년 {stdDate.m}월</h2>
                        <button onClick={() => deCrease()}>{stdDate.m - 1}월</button> <button onClick={() => todaySet()}>오늘</button> <button onClick={() => inCrease()}>{stdDate.m + 1}월</button><br />
                    </div>

                </div>
                <div className="insert__form" >
                    <div className="form__wrap" data-device='mo'>
                        {/* 상태, 날짜, 시간, 등록 */}
                        <ul>
                            <li>
                                <InputForm.InputFormWrap check={workState} cMode={modeColor}>
                                    <input type="text" placeholder="상태" inputMode="none" className="toasted" readOnly disabled={nameValue ? false : true} value={workState} onFocus={() => setToastState({ state: true, id: 0 })} onBlur={() => setToastState({ state: false, id: 0 })} />
                                    <label>상태</label>
                                </InputForm.InputFormWrap>
                            </li>
                            <li style={{ display: "flex" }}>
                                <input style={{ display: "none" }} type="checkbox" id="setting1" checked={insertMode} onChange={(e) => setInsertMode(e.target.checked)} /><label htmlFor="setting1"><img src="multi.png" width={36} />{insertMode ? "다수" : "단일"}</label>
                                <InputForm.InputFormWrap check={'1'} cMode={modeColor}>
                                    <input type="text" placeholder="날짜" inputMode="none" className="toasted" readOnly disabled={nameValue ? false : true} value={`${inputDate.getFullYear()}년 ${inputDate.getMonth() + 1}월 ${inputDate.getDate()}일 `} onFocus={() => setToastState({ state: true, id: 1 })} />
                                    <label>날짜</label>
                                </InputForm.InputFormWrap>
                            </li>
                            <li>
                                <InputForm.InputFormWrap check={workState} cMode={modeColor}>
                                    <input type="text" placeholder="시간" inputMode="none" className="toasted" readOnly disabled={nameValue ? false : true} value={`${timeState.th} : ${timeState.tm == 0 ? '0' + timeState.tm : timeState.tm}`} onFocus={() => setToastState({ state: true, id: 2 })}
                                        onBlur={() => setToastState({ state: false, id: 0 })}
                                    />
                                    <label>시간</label>
                                </InputForm.InputFormWrap>
                            </li>
                            <li>
                                {/* () => insertMode ? onSubmitMany() : onSubmit() */}
                                <ButtonForm.SubmitBtn className="submit" style={{ width: '100%', height: '100%', margin: 0 }} onClick={() => insertMode ? onSubmitMany() : onSubmit()} disabled={nameValue ? false : true}>등록</ButtonForm.SubmitBtn>
                            </li>
                        </ul>
                        {/* 각 input에 맞는 팝업 그룹 */}
                        <div className="form__group">
                            <Toast
                                options={{
                                    className: toastState.state && toastState.id === 0 ? 'toasting' : '',
                                    width: '100%',
                                    height: '158px',
                                    gap: '0',
                                    theme: 'glass'
                                }}
                                cMode={modeColor}
                            >
                                <div className="form__wrap" >
                                    <ul>
                                        <li style={{ backgroundColor: initColorValue.state.color1 }}>
                                            <input type="radio" id="1" name="a" onChange={(e: any) => setWorkState(e.target.value)} defaultValue="출근" defaultChecked /><label htmlFor="1">출근</label>
                                        </li>
                                        <li style={{ backgroundColor: initColorValue.state.color3 }}>
                                            <input type="radio" id="2" name="a" onChange={(e: any) => setWorkState(e.target.value)} defaultValue="오전 반차" /><label htmlFor="2">오전 반차</label>
                                        </li>
                                        <li style={{ backgroundColor: initColorValue.state.color4 }}>
                                            <input type="radio" id="3" name="a" onChange={(e: any) => setWorkState(e.target.value)} defaultValue="오후 반차" /><label htmlFor="3">오후 반차</label>
                                        </li>
                                        <li style={{ backgroundColor: initColorValue.state.color2 }}>
                                            <input type="radio" id="4" name="a" onChange={(e: any) => setWorkState(e.target.value)} defaultValue="월차" /><label htmlFor="4">월차</label>
                                        </li>
                                        <li style={{ backgroundColor: initColorValue.state.color5 }}>
                                            <input type="radio" id="5" name="a" onChange={(e: any) => setWorkState(e.target.value)} defaultValue="외근" /><label htmlFor="5">외근</label>
                                        </li>
                                    </ul>
                                </div>
                            </Toast>
                            <Toast
                                options={{
                                    className: toastState.state && toastState.id === 2 ? 'toasting' : '',
                                    width: '100%',
                                    height: '158px',
                                    gap: '0',
                                    theme: 'glass'
                                }}
                                cMode={modeColor}
                            >
                                <div className="form__wrap" >
                                    <ul>
                                        <li>
                                            {/* <input type="radio" id="11" name="aa" onChange={(e: any) => setDateTime({ th: e.target.dataset.th, tm: e.target.dataset.tm })} defaultValue="1" data-th={8} data-tm={0} defaultChecked /><label htmlFor="11">8:00</label> */}
                                            <input type="radio" id="11" name="aa" onChange={(e: any) => setDateTime(new Date(0, 0, 0, e.target.dataset.th, e.target.dataset.tm))} defaultValue="1" data-th={8} data-tm={0} defaultChecked /><label htmlFor="11">8:00</label>

                                        </li>
                                        <li>
                                            <input type="radio" id="22" name="aa" onChange={(e: any) => setDateTime(new Date(0, 0, 0, e.target.dataset.th, e.target.dataset.tm))} defaultValue="2" data-th={8} data-tm={30} /><label htmlFor="22">8:30</label>
                                        </li>
                                        <li>
                                            <input type="radio" id="33" name="aa" onChange={(e: any) => setDateTime(new Date(0, 0, 0, e.target.dataset.th, e.target.dataset.tm))} defaultValue="3" data-th={9} data-tm={0} /><label htmlFor="33">9:00</label>
                                        </li>
                                        <li>
                                            <input type="radio" id="44" name="aa" onChange={(e: any) => setDateTime(new Date(0, 0, 0, e.target.dataset.th, e.target.dataset.tm))} defaultValue="4" data-th={9} data-tm={30} /><label htmlFor="44">9:30</label>
                                        </li>
                                        <li>
                                            <input type="radio" id="55" name="aa" onChange={(e: any) => setDateTime(new Date(0, 0, 0, e.target.dataset.th, e.target.dataset.tm))} defaultValue="5" data-th={10} data-tm={0} /><label htmlFor="55">10:00</label>
                                        </li>
                                    </ul>
                                </div>
                            </Toast>

                        </div>
                    </div>

                    <div className="form__wrap" data-device='pc'>
                        <InputForm.InputFormWrap check={nameValue ? nameValue : '미 로그인'} className="input__form" data-device="pc" cMode={modeColor}>
                            <input id={nameValue} style={{ border: "none", fontWeight: "bold" }} type="text" value={!nameValue ? '미 로그인' : nameValue} readOnly onChange={(e: any) => setNameValue(e.target.value)} />
                            <label htmlFor={nameValue}>아이디</label>
                        </InputForm.InputFormWrap>
                        <div className="form--wrap">
                            <InputForm.InputFormWrapSelect cMode={modeColor}>
                                <select onChange={(e: any) => setWorkState(e.target.value)} key={workState} defaultValue={workState}>
                                    <option value="출근" >출근</option>
                                    <option value="오전 반차" >오전 반차</option>
                                    <option value="오후 반차">오후 반차</option>
                                    <option value="월차">월차</option>
                                    <option value="외근">외근</option>
                                </select>
                            </InputForm.InputFormWrapSelect>
                            <div style={{ display: "flex" }}>
                                <input style={{ display: "none" }} type="checkbox" id="setting1" checked={insertMode} onChange={(e) => setInsertMode(e.target.checked)} /><label htmlFor="setting1"><img src="multi.png" width={36} /> {insertMode ? "다수" : "단일"}</label>
                                <div className="form--wrap__content" style={{ display: !insertMode ? "block" : "none" }}>
                                    <DatePicker
                                        selected={inputDate}
                                        onChange={(date: any) => setInputDate(date)}
                                        showTimeSelect
                                        timeIntervals={30}
                                        timeCaption="time"
                                        dateFormat="yyyy년 MMMM dd일,  hh:mm aa"
                                        locale={ko}
                                        disabledKeyboardNavigation
                                        popperPlacement="top-start"
                                    />
                                </div>
                                <div className="form--wrap__content" style={{ display: insertMode ? "flex" : "none" }}>
                                    <DatePicker
                                        selectsRange={true}
                                        onChange={(date: any) => setDateRange(date)}
                                        startDate={startDate}
                                        endDate={endDate}
                                        dateFormat="yyyy년 MMMM dd일"
                                        locale={ko}
                                        disabledKeyboardNavigation
                                        popperPlacement="top-start"
                                    />
                                    <DatePicker
                                        selected={dateTime}
                                        onChange={(date: any) => setDateTime(date)}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={30}
                                        timeCaption="Time"
                                        dateFormat="hh시 mm분"
                                        locale={ko}
                                        disabledKeyboardNavigation
                                        popperPlacement="top-start"
                                    />
                                </div>
                            </div>



                        </div>
                        <ButtonForm.SubmitBtn className="submit" style={{ width: "100px" }} onClick={() => insertMode ? onSubmitMany() : onSubmit()} disabled={nameValue ? false : true}>등록</ButtonForm.SubmitBtn>

                    </div>

                </div>
            </div>
            {
                member ? (
                    <CalendarItem
                        dateProps={{ y: stdDate.y, m: stdDate.m }}
                        memberProps={member}
                        deleteSchedule={deleteSchedule}
                        loading={!calendarData.loading && !systemData.loading}
                        mySelf={mySelf}
                        modeColor={modeColor}
                    />
                ) : <img style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} src={loading} />
            }

        </SettingWrap>
    )
}


const SettingWrap = styled.div<{ cMode: string }>`
    background-color: ${props => props.cMode === 'light' ? initColorValue.light.bg : initColorValue.dark.bg1};
    width: calc(100% - 24px);

    .add-calendar, .change-sort {
        z-index: 100;
        position: fixed;
        right: 40px;
        display: flex;
        border-radius: 100px;
        transition: bottom 1s .3s cubic-bezier(0.16, 1, 0.3, 1), transform .3s cubic-bezier(0.16, 1, 0.3, 1);
        box-shadow: 0px 4px 6px 1px rgba(0,0,0,0.38);

        &:hover {
            transform: scale(1.2);
        }
        
        label {
            padding: 12px;
            color: #fff;
            text-transform: uppercase;
        }
        img {
            width: 20px;
            filter : invert(100)
        }
    }

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
            color: ${props => props.cMode === 'light' ? '#48484A' : "#fff"};
            transition: all .4s .1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        button:hover {
            background-color: #0F9485;
            color: #fff;
        }

        button.today {
            color  : #fff;
            background-color: ${initColorValue.point1};
        }
    }

    .ctl-wrap {
        /* overflow: hidden; */
        z-index : 90;
        position: fixed;
        bottom: 0;
        left: 0;
        border: ${props => props.cMode === 'light' ? initColorValue.light.border : initColorValue.dark.bg};;
        display: flex;
        justify-content: space-between;
        padding: 16px 24px;
        width : calc(100% - 48px);
        /* min-width: 758px; */
        min-width: 1200px;
        transition: bottom .4s .1s cubic-bezier(0.16, 1, 0.3, 1);
        backdrop-filter: saturate(180%) blur(5px);
        -webkit-backdrop-filter: saturate(180%) blur(5px);
        background: ${props => props.cMode === 'light' ? initColorValue.light.glass : initColorValue.dark.glass};;
        box-shadow: 0px 4px 6px 1px rgba(0,0,0,0.38);
        
    }

    @media (max-width: 560px) {
        .ctl-wrap {
            overflow: hidden;
            height: 140px;
            padding: 8px;
            border-radius: 4px;
            min-width: 350px;
            left: 50%;
            bottom: 24px;
            transform: translateX(-50%);
        }
    }

    .ctl-wrap.hide {
        bottom: -200px;
    }
    .ctl-wrap.hide + div {
        padding-bottom : 96px
    }

    .react-datepicker, .react-datepicker__header, .react-datepicker__time-container, .react-datepicker__time, .react-datepicker-time__header {
        background-color: ${props => props.cMode === 'light' ? initColorValue.light.bg : initColorValue.dark.bg1};
        color : ${props => props.cMode === 'light' ? initColorValue.dark.textBlack : initColorValue.light.white}
    }

    .react-datepicker-wrapper {
        width: auto;
        height: 100%;
    }
    .react-datepicker-wrapper .react-datepicker__input-container{
        height: 64px;
    }
    .react-datepicker-wrapper input {
        padding: 0 18px;
        width: auto;
        height: 64px;
        outline: none;
        border: none;
        background-color: ${props => props.cMode === 'light' ? initColorValue.light.bg : initColorValue.dark.bg1};
        color : ${props => props.cMode === 'light' ? initColorValue.dark.textBlack : initColorValue.light.white}
    }
    .react-datepicker-wrapper + button {
        width: 20%;
    }

    .react-datepicker__day, .react-datepicker__day-name, .react-datepicker__current-month {
        color : ${props => props.cMode === 'light' ? initColorValue.dark.textBlack : initColorValue.light.white}
    }
    .react-datepicker__day:hover {
        background-color: ${initColorValue.point1};
    }
    .react-datepicker-popper {
        z-index : 1000000
    }

    .input__form {
        width:  120px;
    }
    .form__wrap {
        display: flex;
    }
    .form__wrap {
      
    }
    .form--wrap__content {
        .react-datepicker-wrapper ~ .react-datepicker-wrapper  {
            margin-left: 12px;
        }
    }
    .form__wrap input#setting1 + label {
        font-size : 0.8rem;
        text-align: center;
        color : ${props => props.cMode === 'light' ? initColorValue.dark.textBlack : initColorValue.light.white};


        img {
            filter: invert( ${props => props.cMode === 'light' ? "30%" : "70%"} );
        }
    }

    .form__wrap[data-device='pc'] .form--wrap{
        display: flex;

        > * {
            margin-left: 12px;
        }
    }

    


    .insert__form, .insert__form > ul {
        display: flex;
        justify-content: space-between;
        padding: 0;
    }
    .insert__form > ul {
        width : 100%;

    }

    .insert__form >ul li {
        list-style: none;
        width: 48%;
    }

    @media (min-width:561px) {
        *[data-device='mo'] {
            display: none !important;
        }
    }

    // only mobile
    @media (max-width:560px){
       .form__wrap, .form__wrap ul {
        width: 100%;
        height : 100%
       }
       .form__wrap ul {
            padding: 0;
            list-style: none;
       }
       .insert__form {
            display: flex;
            flex-direction: column;
            width : 100%;
            height : 100%;
        }
        .insert__form ul {
            display: flex;
            flex-wrap : wrap;
            justify-content: space-evenly;
            align-items: center;
            margin: 0;
            padding: 0;
        }
        .insert__form ul li {
            overflow: hidden;
            width: 45%;
            height : 40%;
            border-radius: 4px;
            /* border : 1px solid #0F9485; */
            box-sizing: border-box;
        }
        .insert__form ul li > div{
           height: 100%;
        }

         .insert__form ul li > div input[type='text'],
        .insert__form ul li > div input[type='text']:read-only {
           border: none;
        }
        .insert__form ul li > div input[type='text']:read-only{
           border-radius: 0;
           border: none;

           &.toasted {
            /* background-color: #fff; */
           }
        }
        .insert__form ul li > div input[type='text']:focus, .insert__form ul li > div input[type='text']:focus-within {
            text-shadow: 0 0 0 black;
            outline: none;
        }

        .form__group {
            width: 100%;
            height : 100%
        }

        // 내부 토스트 스타일
        .form__group .form__wrap ul{
            margin: 0 auto;
        }
        .form__group .form__wrap ul li{
            position: relative;
            width: 18%;
            height : 45%;
            border: none;
            
        }
        .form__group .form__wrap ul li input {
           display: none;

            &+label {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0;
                margin:  0;
                width: 100%;
                height: 100%;
                /* background-color:  transparent; */
                background-color: #444;
                color : #fff;
                font-weight: 700;
                font-size : 0.75rem;
                border: none;
            }
            &:checked + label {
                background-color: #0F9485;
            }
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

       
        .input__form[data-device='mo'] {

            input[type='text'] {
                padding-top: 20px;
                padding-bottom: 8px;
                font-size: 12px;

            }

        }
        .react-datepicker-wrapper input {
            padding: 8px 4px !important;
        }
        .react-datepicker {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-65%, -50%) scale(.9);
            background-color: transparent;
            border: none;

        }
        .react-datepicker__header {
            background-color: transparent;
        }
    }

    .submit {
        padding: 4px;
        margin-left: 12px;
        width: inherit;
        font-size : 18px
        
    }

    .loading{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%) scale(4);
        display: flex;
        flex-direction: column;
        align-items: center;

        /* &:after {
            content: '로딩중';
            margin-top: 4px;
            display: inline-block;
            font-size: 0.1rem;
            color : ${props => props.cMode === 'light' ? initColorValue.light.text : initColorValue.dark.text}


        } */
        svg{
            polyline{
                fill: none;
                stroke-width: 2;
                stroke-linecap: round;
                stroke-linejoin: round;
                &#back {
                    stroke: rgba(#6E7BF2,.3)
                }
                &#front{
                    stroke: #6E7BF2;
                    stroke-dasharray: 12, 36; //Dash 12 & Gap 36
                    stroke-dashoffset: 48;
                    animation: dash 1s linear infinite;
                }
            }
        }
    }
    @keyframes dash {
        62.5% {
            opacity: 0
        }
        100% {
            stroke-dashoffset: 0
        }

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

    @keyframes checkMotion {
        0% {
            transform: scale(1)
        }
        75% {
            transform: scale(1.3)
        }
        100% {
            transform: scale(1)

        }
    }
`
