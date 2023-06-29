import React, { useState } from "react";
import CalendarItem from "../components/calendar_item/container_component/CalendarItem";
import CalendarWrap from "../components/calendar_wrap/container_component/CalendarWrap";
import { initColorValue } from "../components/styledComponents/CommonValue";

import styled from "styled-components";

import * as InputForm from "../components/styledComponents/InputStyled"

export default function Setting({ modeColor }: any) {

    const [form, setForm] = useState({
        simply: false,
        modeColor: false,
    })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): any => {
        const { name, checked } = e.target;
        setForm({
            ...form,
            [name]: checked
        })

    };

    return (
        <InnerWrap cMode={modeColor}>
            <h1>셋팅</h1>

            <div className="setting">
                <SettingWrap cMode={modeColor}>
                    <div className="content content--1">
                        <i className="ico ico__simpley"></i>
                        <InputForm.InputFormWrapToggle width={40} height={20} cMode={modeColor}>
                            <input type="checkbox" id="simply" name="simply" checked={form.simply} onChange={(e: any) => onChange(e)} />
                            <label htmlFor="simply"></label>
                        </InputForm.InputFormWrapToggle>
                    </div>
                    <div className="content content--column">
                        <h3 className="title">일정 간소화</h3>
                        <p className="status">{form.simply ? 'ON' : "OFF"}</p>
                    </div>

                </SettingWrap>
                {/* <SettingWrap cMode={modeColor}>
                    <div className="content content--1">
                        <i className="ico ico__simpley"></i>
                        <InputForm.InputFormWrapToggle width={40} height={20} cMode={modeColor}>
                            <input type="checkbox" id="simply" name="simply" checked={form.simply} onChange={(e: any) => onChange(e)} />
                            <label htmlFor="simply"></label>
                        </InputForm.InputFormWrapToggle>
                    </div>
                    <div className="content content--column">
                        <h3 className="title">일정 간소화</h3>
                        <p className="status">{form.simply ? 'ON' : "OFF"}</p>
                    </div>

                </SettingWrap>
                <SettingWrap cMode={modeColor}>
                    <div className="content content--1">
                        <i className="ico ico__simpley"></i>
                        <InputForm.InputFormWrapToggle width={40} height={20} cMode={modeColor}>
                            <input type="checkbox" id="simply" name="simply" checked={form.simply} onChange={(e: any) => onChange(e)} />
                            <label htmlFor="simply"></label>
                        </InputForm.InputFormWrapToggle>
                    </div>
                    <div className="content content--column">
                        <h3 className="title">일정 간소화</h3>
                        <p className="status">{form.simply ? 'ON' : "OFF"}</p>
                    </div>

                </SettingWrap>
                <SettingWrap cMode={modeColor}>
                    <div className="content content--1">
                        <i className="ico ico__simpley"></i>
                        <InputForm.InputFormWrapToggle width={40} height={20} cMode={modeColor}>
                            <input type="checkbox" id="simply" name="simply" checked={form.simply} onChange={(e: any) => onChange(e)} />
                            <label htmlFor="simply"></label>
                        </InputForm.InputFormWrapToggle>
                    </div>
                    <div className="content content--column">
                        <h3 className="title">일정 간소화</h3>
                        <p className="status">{form.simply ? 'ON' : "OFF"}</p>
                    </div>

                </SettingWrap> */}
            </div>


        </InnerWrap>
    )
}




const InnerWrap = styled.div<{ cMode: string }>`
    background-color:${props => props.cMode === 'light' ? initColorValue.light.bg : initColorValue.dark.bg};
    height: 100%;
    
    h1, h2, h3 {
        margin: 0;
        padding: 12px 0;
        color: ${props => props.cMode === 'light' ? '##48484A' : initColorValue.dark.textWhite};;
    }
    p {
        color: ${props => props.cMode === 'light' ? '##48484A' : initColorValue.dark.textWhite};;
        
    }

    .setting {
        display: flex;
        flex-wrap: wrap;
        padding: 4px 8px; 

        div {
            margin: 4px;
        }
    }
    
`

const SettingWrap = styled.div<{ cMode: string }>`
    padding : 24px;
    width: 120px;
    height: 120px;
    background-color:${props => props.cMode === 'light' ? initColorValue.light.calcDesc : initColorValue.dark.bg1};
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
            color : ${props => props.cMode === 'light' ? initColorValue.light.setting.title : initColorValue.dark.setting.title};
            font-size : 12px
        }
        .status {
            font-weight: bold;

        }

    }
    .ico__simpley {
        display: block;
        width: 48px;
        height: 48px;
        border-radius: 4px;
        background-image: url('simply-icon.png');
        background-repeat: no-repeat;
        background-size: contain;
        filter :invert( ${props => props.cMode === 'light' ? "0" : "100%"} )
    }
`