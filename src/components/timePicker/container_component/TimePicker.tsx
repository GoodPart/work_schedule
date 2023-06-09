import React, { useState, useEffect, useCallback } from "react";
import Index from "../present_component/Index";
import axios from "axios";


export default function TimePicker({ timeProps }: any) {
    const [timeInfo, setTImeinfo] = useState('');
    const setTIme = () => {
        axios.post("http://localhost:9999/api/calendar/findbyid", { _id: timeProps }, { withCredentials: true })
            .then(res => {
                setTImeinfo(res.data.match)
            })
    }




    useEffect(() => {
        setTIme();
    }, [])

    return <Index timeInfo={timeInfo} />
}