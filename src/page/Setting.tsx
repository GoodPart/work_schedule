import React from "react";
import CalendarItem from "../components/calendar_item/container_component/CalendarItem";
import CalendarWrap from "../components/calendar_wrap/container_component/CalendarWrap";
import { initColorValue } from "../components/styledComponents/CommonValue";

import styled from "styled-components";

import * as InputForm from "../components/styledComponents/InputStyled"

export default function Setting() {
    return (
        <div className="layout-wrap">
            <h1>셋팅</h1>
            <p>모드</p>
            <InputForm.InputFormWrapToggle width={64} height={32}>
                <input id="checkbox" type="checkbox" />
                <label htmlFor="checkbox"></label>
            </InputForm.InputFormWrapToggle>

        </div>
    )
}



