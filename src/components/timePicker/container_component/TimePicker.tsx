import React, { useState, useEffect, useCallback } from "react";
import Index from "../present_component/Index";
import axios from "axios";
const deployURL = "http://ec2-43-201-0-7.ap-northeast-2.compute.amazonaws.com"


export default function TimePicker({ timeProps, tgc }: any) {
    const [timeInfo, setTImeinfo] = useState('');
    const setTIme = () => {
        axios.post("https://myworkday.pe.kr:8888/api/calendar/findbyid", { _id: timeProps }, { withCredentials: true })
            .then(res => {
                setTImeinfo(res.data.match)
            })
    }



    useEffect(() => {
        setTIme();

    }, [])

    return <Index timeInfo={timeInfo} tgc={tgc} />
}