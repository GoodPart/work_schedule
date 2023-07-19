import React, { useEffect, useState, useCallback, useRef } from "react";
import { initColorValue } from "../components/styledComponents/CommonValue";

import styled from "styled-components";

import * as InputForm from "../components/styledComponents/InputStyled";


import { useDispatch, useSelector } from "react-redux";
import { systemUpdateSimple, systemUpdateThemeColor, systemUpdateSort, systemUpdateOtherSort } from "../modules/system";
import { RootState } from "../modules";
import { registerSignUp, collectionRead } from "../modules/register";

import ExportCsv from "./ExportCsv";




export default function Setting() {
    const selectRef = useRef();
    const dispatch = useDispatch();
    const systemData = useSelector((state: RootState) => state.systemReducer);
    const authStore = useSelector((state: RootState) => state.authCheckReducer.auth);

    const [exportState, setExrpotState] = useState(new Date().getMonth() + 1);

    let themeColor = systemData.theme_color ? 'dark' : 'light'
    const [form, setForm] = useState({
        simply: systemData.calendar_simple,
        themeColor: systemData.theme_color
    })
    const [collections, setCollections] = useState({
        collection_1: [],
    })

    const [sortOtherState, setSortOtherState] = useState('other');



    const onChangeMonth = (e: any) => {
        setExrpotState(e.target.value)
    }

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
        const { id, value, checked } = e.target;

        changeSort(value)
    };
    const onChangeOtherSelect = (e: React.ChangeEvent<HTMLInputElement>): any => {
        const { value } = e.target;
        changeOtherSort(value)

    }

    const getCollection_1 = useCallback(async () => {
        let result = await dispatch(collectionRead())

        if (result.success) {
            setCollections({
                ...collections,
                collection_1: result.find
            })
        }
    }, [dispatch])


    useEffect(() => {
        getCollection_1();
    }, [systemData.loading, systemData.sortState.state, sortOtherState])

    const changeSimply = useCallback(async () => {
        await dispatch(systemUpdateSimple())
    }, [dispatch])
    const changetheme = useCallback(async () => {
        await dispatch(systemUpdateThemeColor())
    }, [dispatch])
    const changeSort = useCallback(async (state: string) => {
        await dispatch(systemUpdateSort(state))
    }, [dispatch])
    const changeOtherSort = useCallback(async (state: string) => {
        await dispatch(systemUpdateOtherSort(state))
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
                    <div className="content--title">일정표 필터</div>
                    <div className="content--wrap" style={{ display: "flex" }}>
                        <InputForm.InputFormRowToggle width={'100%'} height={'auto'} cMode={themeColor}>
                            <div className="content content--1">
                                <input type="radio" id="all" name="setRadio" value="all" onChange={(e) => onChangeSort(e)} checked={systemData.sortState.type === "all"} />
                                <label htmlFor="all"></label>
                                <div className="icon-area"><i className="ico ico__all"></i><span>모두</span></div>
                            </div>
                            <div className="content content--2">
                                <input type="radio" id="me" name="setRadio" value="me" disabled={authStore ? false : true} onChange={(e) => onChangeSort(e)} checked={systemData.sortState.type === "me"} />
                                <label htmlFor="me"></label>
                                <div className="icon-area"><i className="ico ico__solo"></i><span>나</span></div>
                            </div>
                            <div className="content content--3">
                                <input type="radio" id="other" name="setRadio" value="other" onChange={(e) => onChangeSort(e)} checked={systemData.sortState.type === "other"} />
                                <label htmlFor="other"></label>
                                <div className="icon-area"><i className="ico ico__other"></i><span>기타 설정</span></div>
                            </div>
                        </InputForm.InputFormRowToggle>
                    </div>
                    <div className="content--wrap" style={{ marginTop: 16 }}>
                        <div className="content content--4">
                            <InputForm.InputFormWrapSelect cMode={themeColor}>
                                <select name='team_name' onChange={(e: any) => onChangeOtherSelect(e)} disabled={systemData.sortState.type === 'other' ? false : true}>
                                    <option value='' >필터를 선택하세요</option>
                                    {
                                        collections.collection_1.map((collection: any, index: number) => {
                                            // if (collection.type === 300) {
                                            return <option value={collection.name} selected={systemData.sortState.value === collection.name}>{collection.name}</option>
                                            // }
                                        })
                                    }
                                </select>
                            </InputForm.InputFormWrapSelect>

                        </div>
                    </div>
                </SettingWrapDouble>
                <SettingWrap theme={themeColor}>
                    <div className="content--title">내보내기</div>
                    <div className="content" style={{ alignItems: "center" }}>
                        <i className="ico ico__csv"></i>
                        <div>
                            <input type="text" style={{ width: 12, textAlign: "center", border: `1px solid ${themeColor === 'light' ? initColorValue.light.border : initColorValue.dark.bg}`, backgroundColor: themeColor === 'light' ? initColorValue.light.glass : initColorValue.dark.bg1, color: themeColor === 'light' ? initColorValue.light.textBlack : initColorValue.dark.textWhite, fontSize: "16px" }} value={exportState} onChange={(e: any) => onChangeMonth(e)} /><label style={{ color: themeColor === 'light' ? initColorValue.light.textBlack : initColorValue.dark.textWhite, marginLeft: "4px" }}>월</label>
                        </div>
                    </div>
                    <ExportCsv exportState={exportState} auth={authStore} />
                </SettingWrap>

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

    .content--title {
        font-weight: 700;
        color: ${props => props.cMode === 'light' ? '##48484A' : initColorValue.dark.textWhite};;
    }

    @media (max-width : 561px) {
        .setting {
            justify-content: space-between;

            > div {
                width: 119px;
                /* height : 115px; */

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

const SettingWrapDouble = styled.div<{ theme: string }>`
    padding : 24px;
    width: 240px;
    height: auto;
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
        /* display: flex;
        justify-content: space-between; */

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
        .icon-area {
            display: flex;
            flex-direction: column;
            align-items: center;
            
            span {
               color: ${props => props.theme === 'light' ? '##48484A' : initColorValue.dark.textWhite};;
            }
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
    .ico__solo {
        background-image: url('solo.png');
    }
    .ico__all {
        background-image: url('all.png');
    }
    .ico__other {
        background-image: url('other.png');
    }

`