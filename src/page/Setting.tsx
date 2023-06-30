import React, { useEffect, useState, useCallback, useRef } from "react";
import { initColorValue } from "../components/styledComponents/CommonValue";

import styled from "styled-components";

import * as InputForm from "../components/styledComponents/InputStyled";


import { useDispatch, useSelector } from "react-redux";
import { systemUpdateSimple, systemUpdateThemeColor } from "../modules/system";
import { RootState } from "../modules";



export default function Setting() {
    const dispatch = useDispatch();
    const systemData = useSelector((state: RootState) => state.systemReducer);
    let themeColor = systemData.theme_color ? 'dark' : 'light'
    const [form, setForm] = useState({
        simply: systemData.calendar_simple,
        themeColor: systemData.theme_color

    })




    const onChangeSimple = (e: React.ChangeEvent<HTMLInputElement>): any => {
        const { name, checked } = e.target;
        setForm({
            ...form,
            [name]: checked
        })
        changeSimply()
    };

    const onChangeTheme = (e: React.ChangeEvent<HTMLInputElement>): any => {
        const { name, checked } = e.target;
        setForm({
            ...form,
            [name]: checked ? 'dark' : 'light'

        })
        changetheme()
    };

    useEffect(() => {
        console.log('s')
    }, [])

    const changeSimply = useCallback(async () => {
        await dispatch(systemUpdateSimple())
    }, [dispatch])
    const changetheme = useCallback(async () => {
        await dispatch(systemUpdateThemeColor())
    }, [dispatch])

    return (
        <InnerWrap cMode={themeColor}>
            <h1>환경설정</h1>

            <div className="setting">
                <SettingWrap theme={themeColor}>
                    <div className="content content--1">
                        <i className="ico ico__simpley"></i>
                        <InputForm.InputFormWrapToggle width={40} height={20} cMode={themeColor}>
                            <input type="checkbox" id="simply" name="simply" checked={form.simply} onChange={(e: any) => onChangeSimple(e)} />
                            <label htmlFor="simply"></label>
                        </InputForm.InputFormWrapToggle>
                    </div>
                    <div className="content content--column">
                        <h3 className="title">일정 간소화</h3>
                        <p className="status">{form.simply ? 'ON' : "OFF"}</p>
                    </div>

                </SettingWrap>
                <SettingWrap theme={themeColor} >
                    <div className="content content--1">
                        <i className="ico ico__theme" style={!systemData.theme_color ? { backgroundImage: `url('sun.png')`, transition: '.6s ease' } : { backgroundImage: `url('moon.png')` }}></i>
                        <InputForm.InputFormWrapToggle width={40} height={20} cMode={themeColor}>
                            <input type="checkbox" id="themeColor" name="themeColor" checked={systemData.theme_color} onChange={(e: any) => onChangeTheme(e)} />
                            <label htmlFor="themeColor"></label>
                        </InputForm.InputFormWrapToggle>
                    </div>
                    <div className="content content--column">
                        <h3 className="title">테마 색상</h3>
                        <p className="status">{systemData.theme_color ? '다크 모드' : '기본 모드'}</p>
                    </div>

                </SettingWrap>
                <SettingWrap theme={themeColor}></SettingWrap>
                <SettingWrap theme={themeColor} ></SettingWrap>

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

    @media (max-width : 561px) {
        .setting {
            justify-content: space-evenly;

            > div {
                width: 115px;
                height : 115px
            }
        }
    }
    
`

const SettingWrap = styled.div<{ theme: string }>`
    padding : 24px;
    width: 120px;
    height: 120px;
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
        background-image: url('simply-icon.png');
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

  
`