import React, { useState, useEffect, useCallback } from "react";
import Index from "../present_component/Index";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../modules";
import { updateData } from "../../../modules/calendar";

export default function TimePicker({ timeProps }: any) {
    const [timeInfo, setTImeinfo] = useState('');
    const dispatch = useDispatch();
    const setTIme = () => {
        axios.post("http://localhost:9999/api/calendar/findbyid", { _id: timeProps }, { withCredentials: true })
            .then(res => {
                setTImeinfo(res.data.match)
            })
    }

    const updateSchedule = useCallback(async (_id: any, form: any) => {
        await dispatch(updateData(_id, form));
    }, [dispatch])


    useEffect(() => {
        setTIme();
    }, [])

    return <Index timeInfo={timeInfo} updateSchedule={updateSchedule} />
}