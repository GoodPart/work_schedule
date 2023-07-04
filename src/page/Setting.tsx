import React, { useEffect, useState, useCallback, useRef } from "react";
import { initColorValue } from "../components/styledComponents/CommonValue";

import styled from "styled-components";

import * as InputForm from "../components/styledComponents/InputStyled";


import { useDispatch, useSelector } from "react-redux";
import { systemUpdateSimple, systemUpdateThemeColor, systemUpdateSort } from "../modules/system";
import { RootState } from "../modules";
import { registerSignUp, collectionRead } from "../modules/register";




export default function Setting() {
    const dispatch = useDispatch();
    const systemData = useSelector((state: RootState) => state.systemReducer);
    let themeColor = systemData.theme_color ? 'dark' : 'light'
    const [form, setForm] = useState({
        simply: systemData.calendar_simple,
        themeColor: systemData.theme_color
    })
    const [collections, setCollections] = useState({
        collection_1: [],
    })

    const [sortState, setSortState] = useState({
        state: 'all',
        value: false
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
    const onChangeSort = (e: React.ChangeEvent<HTMLInputElement>): any => {
        const { id } = e.target;
        setSortState({
            state: id,
            value: id === 'other' ? true : false
        })
        changeSort(id)
    };

    const getCollection_1 = useCallback(async (type: number) => {
        let result = await dispatch(collectionRead(type))

        if (result.success) {
            setCollections({
                ...collections,
                collection_1: result.find
            })
        }
    }, [dispatch])


    useEffect(() => {
        getCollection_1(100);
    }, [])

    const changeSimply = useCallback(async () => {
        await dispatch(systemUpdateSimple())
    }, [dispatch])
    const changetheme = useCallback(async () => {
        await dispatch(systemUpdateThemeColor())
    }, [dispatch])
    const changeSort = useCallback(async (state: string,) => {
        await dispatch(systemUpdateSort(state))
    }, [dispatch])

    return (
        <InnerWrap cMode={themeColor}>
            <h3>환경설정</h3>

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
                <SettingWrapDouble className="double" theme={themeColor}>
                    <div className="content--wrap" style={{ display: "flex" }}>
                        <div className="content content--1">
                            <i className="ico ico__simpley"></i>
                            <input type="radio" id="all" name="setting-radio" onChange={(e) => onChangeSort(e)} defaultChecked />
                            <label htmlFor="1">ALL</label>
                        </div>
                        <div className="content content--2">
                            <i className="ico ico__simpley"></i>
                            <input type="radio" id="me" name="setting-radio" onChange={(e) => onChangeSort(e)} />
                            <label htmlFor="2">ME</label>
                        </div>
                        <div className="content content--3">
                            <i className="ico ico__simpley"></i>
                            <input type="radio" id="other" name="setting-radio" onChange={(e) => onChangeSort(e)} />
                            <label htmlFor="3">OTHER</label>
                        </div>
                    </div>
                    <div className="content--wrap">
                        <div className="content content--4">
                            <InputForm.InputFormWrapSelect cMode={themeColor}>
                                <select name='team_name' onChange={(e: any) => console.log('change')} disabled={!sortState.value}>
                                    <option value="">팀을 선택하세요.</option>
                                    {
                                        collections.collection_1.map((collection: any, index: number) => {
                                            // if (collection.type === 300) {
                                            return <option value={collection.name}>{collection.name}</option>
                                            // }
                                        })
                                    }
                                </select>
                            </InputForm.InputFormWrapSelect>

                        </div>
                    </div>
                </SettingWrapDouble>

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
                height : 115px;

                &.double {
                    width: 85%
                }
            };
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

const SettingWrapDouble = styled.div<{ theme: string }>`
    padding : 24px;
    width: 240px;
    height: 240px;
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