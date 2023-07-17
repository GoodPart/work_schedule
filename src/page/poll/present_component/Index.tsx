import React, { ChangeEventHandler, FormEventHandler } from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';

import { initColorValue } from '../../../components/styledComponents/CommonValue';


import * as InputForm from '../../../components/styledComponents/InputStyled';
import * as ButtonForm from '../../../components/styledComponents/ButtonStyled'

import swal from 'sweetalert';

export default function Index({ modeColor }: any) {

    return (
        <InnerWrap cMode={modeColor}>
            <div className="device__wrap">
                <h2>투표방</h2>
                <p>작업 중입니다.</p>
                <div>
                    다수의 의견을 종합할 때 사용될 투표소 입니다. (일회성 투표)<br />
                    생성 후, 투표 종료시 5분 후 자동 삭제 됩니다.<br />
                    <br />
                    예시 : 수요일 점심, 문화 체육의 날 등...
                </div>
            </div>
        </InnerWrap>
    )
}

const InnerWrap = styled.div<{ cMode: string }>`
    /* padding-top: 24px; */
    height: 100%;
    background-color:${props => props.cMode === 'light' ? initColorValue.light.bg : initColorValue.dark.bg};
    
    h2, div {
        margin: 0;
        padding: 12px 0;
        color: ${props => props.cMode === 'light' ? '##48484A' : initColorValue.dark.textWhite};;
    }
    .device__wrap {
        margin :0 auto;
        width: 560px;
        height: 100%;
    }
    .device__wrap .header {
        display: flex;
        justify-content: space-between;
    }

    @media (max-width: 561px) {
        height: auto;
        padding-bottom: 30%;
        background-color: ${props => props.cMode === 'light' ? initColorValue.light.bg : initColorValue.dark.bg};
        .device__wrap {
            width: 100%;
        }
    }

    
`