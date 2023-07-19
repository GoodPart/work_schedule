import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';

import { initColorValue } from '../../../components/styledComponents/CommonValue';

import Toast from '../../../components/Toast';
import * as InputForm from '../../../components/styledComponents/InputStyled';
import * as ButtonForm from '../../../components/styledComponents/ButtonStyled'

import swal from 'sweetalert';



function Poll({ pollData, toastToggle }: any) {


    return (
        <PollWrap onClick={(e: any) => toastToggle(true, pollData.id)}>
            <div className='head'>
                주제 : {pollData.title} - ({pollData.state ? '진행중' : '종료'})
            </div>
            <hr />
            <div className="content">
                콘텐츠
            </div>
            <hr />
            <div className="footer">
                참여 인원 : 김철수, 나영미<br />
                남은 시간 : 09:10
            </div>
        </PollWrap>
    )
}

const PollWrap = styled.div`
    /* padding-top: 24px; */

    &:hover {
        outline : 2px solid ${initColorValue.point1}
    }
    
   
    
`



export default function Index({ modeColor, pollData }: any) {

    let [toastState, setToastState] = useState({
        state: false,
        id: 0
    });

    const toastToggle = (state: boolean, id: number) => {
        setToastState({
            state: state,
            id: id
        })
    }

    useEffect(() => {
        console.log(pollData)
    }, [])

    return (
        <InnerWrap cMode={modeColor}>
            <div className="device__wrap">
                <h2>투표방 - (작업중)</h2>
                <SettingWrap theme={modeColor} style={{ width: "calc(100% - 32px)", padding: 16 }}>
                    <p>작업 이유</p>
                    <p>- 사내 의견을 종합 해야 하는 상황에 매번, 참여율이 저조함 및 선택장애</p>
                    <p>- 일정 시간 동안 투표를 받음. 시간 종료후, 5분뒤 자동 말소</p>
                </SettingWrap>

                <div className="wrap" style={{ display: "flex", justifyContent: "space-between" }}>
                    {
                        pollData.map((poll: any, index: number) => {
                            return (
                                <SettingWrap theme={modeColor} style={{ padding: 8 }}  >
                                    <Poll pollData={poll} toastToggle={toastToggle} />

                                    <Toast
                                        options={{
                                            className: toastState.state && toastState.id === poll.id ? 'toasting' : '',
                                            width: '560px',
                                            height: '300px',
                                            gap: '36px',

                                        }}
                                    >
                                        <div className='toast__wrap' >
                                            <div>{poll.desc} - ({poll.state ? '진행중' : '종료'})</div>
                                            <div className='content'>
                                                <ol>
                                                    {
                                                        poll.select_list.map((item: any, index2: number) => {
                                                            return (
                                                                <>
                                                                    <input type="radio" id={item.topic} name={`id_${index}`} />
                                                                    <label htmlFor={item.topic}>{item.topic}</label>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </ol>
                                            </div>
                                            <div>
                                                <ButtonForm.SubmitBtn onClick={() => console.log('submit')} disabled={true}>제출</ButtonForm.SubmitBtn>
                                            </div>

                                        </div>

                                    </Toast>
                                </SettingWrap>
                            )
                        })
                    }


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
        /* height: auto; */
        padding-bottom: 30%;
        background-color: ${props => props.cMode === 'light' ? initColorValue.light.bg : initColorValue.dark.bg};
        .device__wrap {
            width: 100%;
        }
    }    
`
const SettingWrap = styled.div<{ theme: string }>`
    position: relative;
    padding : 24px;
    width: 46%;
    background-color:${props => props.theme === 'light' ? initColorValue.light.calcDesc : initColorValue.dark.bg1};
    border-radius: 4px;
    
    h3 {
        padding: 0;
    }

    p {
        padding: 0;
        margin : 0;
    }
    .content {
        display: flex;
        justify-content: space-between;

        &.content--column {
            flex-direction: column;
        }

        .title {
            margin : 20px 0 4px;
            color : ${props => props.theme === 'light' ? initColorValue.light.setting.title : initColorValue.dark.setting.title};
            font-size : 12px
        }
        .status {
            font-weight: bold;

        }

    }
    .ico {
        display: block;
        width: 48px;
        height: 48px;
        border-radius: 4px;
        background-repeat: no-repeat;
        background-size: contain;
        filter :invert( ${props => props.theme === 'light' ? "30%" : "70%"} );
        
    }
    .ico__simpley {
        background-image: url('simply-icon.png');
    }
    .ico__theme:not(.ico__simpley) {
        background-image:  url(${props => props.theme === 'light' ? 'sun.png' : 'moon.png'});
        animation-name: iconShowRotate;
        animation-duration: 1s;
        animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
        animation-fill-mode: forwards;
    }

    .ico__csv {
         background-image: url('csv.png');
    }
    

    

`