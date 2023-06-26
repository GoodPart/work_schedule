import React from "react";
import { initColorValue } from "../components/styledComponents/CommonValue";
import styled from "styled-components";
export default function Main({ modeColor }: any) {
    return (
        <InnerWrap cMode={modeColor}>
            <h1 style={{ margin: 0 }}>개요</h1>
            <p>가산 사무소 출퇴근 장부입니다.</p>
            <p>회원 가입 및 로그인 후 사용 가능.</p>
            <p>로그인 후, 캘린더로 이동해 출퇴근 시간을 선택하여 등록합니다.</p>
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