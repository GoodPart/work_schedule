import React from "react";
import CalendarItem from "../components/calendar_item/container_component/CalendarItem";
import CalendarWrap from "../components/calendar_wrap/container_component/CalendarWrap";
import { initColorValue } from "../components/styledComponents/CommonValue";

import styled from "styled-components";

import * as InputForm from "../components/styledComponents/InputStyled"

export default function Setting({ modeColor }: any) {
    return (
        <InnerWrap cMode={modeColor}>
            <h1>셋팅</h1>
            <p>모드</p>

        </InnerWrap>
    )
}




const InnerWrap = styled.div<{ cMode: string }>`
    /* padding-top: 24px; */
    background-color:${props => props.cMode === 'light' ? initColorValue.light.bg : initColorValue.dark.bg};
    height: 100%;
    
    h1 {
        margin: 0;
        padding: 12px 0;
        color: ${props => props.cMode === 'light' ? '##48484A' : initColorValue.dark.textWhite};;
    }
    p {
        color: ${props => props.cMode === 'light' ? '##48484A' : initColorValue.dark.textWhite};;
        
    }
    
`