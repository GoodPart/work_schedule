import React, { useState, useEffect } from "react";
import { initColorValue } from "../components/styledComponents/CommonValue";
import styled from "styled-components";
import * as ButtonForm from '../components/styledComponents/ButtonStyled';
import * as InputForm from '../components/styledComponents/InputStyled';
import Toast from "../components/Toast";


import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../modules";


export default function Main({ modeColor }: any) {

    const authStore = useSelector((state: RootState) => state.authCheckReducer.auth);
    const [eventState, setEventState] = useState(false);
    const [couponLength, setCouponLength] = useState(0);

    let [toastState, setToastState] = useState({
        state: false,
        id: 0
    });
    const [usedForm, setUsedForm] = useState({
        desc: '',
        user_id: ''
    })
    const [usedForm2, setUsedForm2] = useState('');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): any => {
        const { value } = e.target;
        setUsedForm({
            ...usedForm,
            desc: value,
            user_id: ''
        })
    };
    const onChangeUsed = (e: React.ChangeEvent<HTMLInputElement>): any => {
        const { value } = e.target;
        setUsedForm2(value)
    };

    const onSubmitUsed = () => {
        // console.log(`필요성 : ${usedForm2}, 의견 : ${usedForm.desc}, 유저 : ${authStore.user_id}`)
        createSurveyDocs(usedForm2, usedForm.desc, authStore.user_id);
        setEventState(false)
        setToastState({ state: false, id: 0 })

    }
    //쿠폰 유무 확인
    const getCouponData = async () => {
        let _getData = await axios.get("https://myworkday.pe.kr:8888/api/coupon/read/false", { withCredentials: true });

        if (_getData.data.length === 0) {
            alert("기프티콘은 모두 소진 되었어요. 죄송해요...")
        } else {
            alert("기프티콘이 아직 남아있습니다!")
        }
    }

    // 설문 DB에 저장
    const createSurveyDocs = async (usedState: any, desc: string, user_id: string) => {
        let _postData = await axios.post("https://myworkday.pe.kr:8888/api/survey/create", { used_state: usedState, desc: desc, user_id: user_id }, { withCredentials: true });

        if (_postData.data.success) {

            //사용가능 쿠폰들 조회
            let _getCouponData = await axios.get("https://myworkday.pe.kr:8888/api/coupon/read/false", { withCredentials: true })

            if (_getCouponData.data.success) {
                // console.log(`이 쿠폰을 발급 합니다. ${_getCouponData.data.finds[0]}`)

                if (_getCouponData.data.finds[0] == undefined) {
                    alert("쿠폰을 못드려서 죄송합니다. 돈 많이 벌면 고기 사드릴게요!")
                } else {
                    let _exportCoupon = await axios.post("https://myworkday.pe.kr:8888/api/coupon/update", { _id: _getCouponData.data.finds[0]._id, user_id: user_id }, { withCredentials: true })
                    if (_exportCoupon.data.success) {
                        // console.log(`쿠폰을 사용 처리로 변경했습니다.`, _exportCoupon.data.update.coupon_code)
                        alert(`쿠폰 코드입니다. ${_exportCoupon.data.update.coupon_code}`)
                    } else {
                        console.log('error')
                    }
                }


            } else {
                console.log("없어유 ㅠㅠ")
            }


        }



    }


    useEffect(() => {

        axios.get("https://myworkday.pe.kr:8888/api/coupon/read", { withCredentials: true }).then((ele) => {
            if (ele.data.success) {
                console.log(ele.data)
                setEventState(ele.data.length == 0)
            }
        })

        axios.get("https://myworkday.pe.kr:8888/api/coupon/read/false", { withCredentials: true }).then((ele) => {
            if (ele.data.success) {
                setCouponLength(ele.data.length)
            }
        })



    }, [authStore, couponLength])
    return (
        <InnerWrap cMode={modeColor}>
            <Toast
                options={{
                    className: toastState.state && toastState.id === 1 ? 'toasting' : '',
                    width: 'calc(100% - 24px)',
                    height: '440px',
                    gap: '10%',
                    theme: 'glass'
                }}
                cMode={modeColor}
            >
                <div className="used__wrap" >
                    <ButtonForm.SubmitBtn style={{ width: '64px', display: "block", position: 'absolute', top: 12, right: 12 }} onClick={(e: any) => setToastState({ state: false, id: 0 })}>X</ButtonForm.SubmitBtn>
                    <div style={{ color: modeColor === 'light' ? '#333' : '#fff' }}>
                        <div className="content">
                            <p className="title">필요성</p>
                            <div className="desc">
                                <input type="radio" id="true" name="used" value={'true'} onChange={(e) => onChangeUsed(e)} checked={usedForm2 === 'true'} /><label htmlFor="true"><span>O</span></label>
                                <input type="radio" id="false" name="used" value={'false'} onChange={(e) => onChangeUsed(e)} checked={usedForm2 === 'false'} /><label htmlFor="false"><span>X</span></label>
                            </div>
                        </div>
                        <div className="content">
                            <p className="title">기타 의견</p>
                            <div className="desc">
                                <InputForm.InputFormWrap cMode={modeColor} check={usedForm.desc}>
                                    <input type="text" id="true" name="desc" onChange={(e) => onChange(e)} /><label htmlFor="true">의견</label>
                                </InputForm.InputFormWrap>
                            </div>
                        </div>
                        <br />
                        <div className="content">
                            <ButtonForm.SubmitBtn style={{ width: '100%', display: "block", margin: "0 auto" }} disabled={usedForm2 && authStore ? false : true} onClick={(e: any) => onSubmitUsed()}>제출</ButtonForm.SubmitBtn>
                        </div>
                    </div>

                </div>
            </Toast>
            <br />

            <SettingWrap theme={modeColor}>
                <div className="content content--1">
                    <em className="accent" style={{ fontSize: 12, padding: "8px 16px" }}>의견이 필요해요</em>
                    <i className="ico ico__simpley"></i>
                </div>
                <div className="content content--column" style={{ marginTop: 12, fontSize: 14 }}>
                    <p>이 앱(APP)의 필요성을 알려주세요.</p>
                    <br />
                    <p style={{ fontSize: 12, color: "#aaa" }}>의견 등록하시고, 아메리카노(스타벅스) 쿠폰 받아가세요. <em className="accent">({couponLength != 0 ? `${couponLength}개 남음` : '제고 소진'})</em> </p>
                    <p style={{ fontSize: 12, color: "#aaa" }}>방법 : 로그인 -&#62; 일정표/일정등록 -&#62; 의견전달 -&#62; 쿠폰 주소 접속</p>
                </div>
            </SettingWrap>


            <br />


            <ButtonForm.SubmitBtn className="survey_button" style={{ margin: '0 auto', display: "block" }} disabled={authStore !== '' && eventState ? false : true} onClick={(e: any) => { getCouponData(); setToastState({ state: true, id: 1 }) }}>의견을 주세요</ButtonForm.SubmitBtn>
            <br />
            <hr />

            <h1 style={{ margin: 0 }}>개요</h1>
            <em className="footnote--accent">(설정 : 테마를 다크모드로 설정하면 눈이 안아파요)</em>
            <p>출근 및 퇴근 캘린더입니다.</p>
            <p>편의 사항 개선 및 추가 중 입니다.</p>


            <img src="duck.gif" alt="duck" width="300" />

            <hr />
            <h3>사용자 가이드</h3>
            <p>
                <ol>
                    <li>
                        <span className="title">회원가입 및 로그인</span>
                        <hr />
                    </li>

                    <li>
                        <span className="title">알정표</span>
                        <h4 className="title-desc">
                            <SettingWrap theme={modeColor}>
                                # 출근 상태 및 시간을 확인할 수 있습니다.<br />
                                #-1. 상태 = <span style={{ color: initColorValue.state.color1 }}>출근</span>,
                                <span style={{ color: initColorValue.state.color3 }}>반차(오전)</span>,
                                <span style={{ color: initColorValue.state.color4 }}>반차(오후)</span>,
                                <span style={{ color: initColorValue.state.color2 }}>월차</span>,
                                <span style={{ color: initColorValue.state.color5 }}>외근</span><br />
                                #-2. 시간 = 8:00, 8:30, 9:00, 9:30, 10:00
                            </SettingWrap>
                        </h4>
                        <hr />
                        <div className="desc">
                            <SettingWrap theme={modeColor}>
                                2-1. 일정 추가, 수정 및 제거 가능합니다. <em className="footnote--accent">(로그인 필요)</em><br />
                                2-2. 하단 우측 버튼 <strong>(연필 아이콘)</strong>을 통해 일정 추가 가능. <em className="footnote--accent">(로그인 필요)</em><br />
                                2-3. 일정 추가란에 <strong>(다수 아이콘)</strong>을 선택하면 일정 추가 모드가 변경됩니다. <em className="footnote--accent">(범위 or 단일)</em><br />
                                2-4. 하단 우측 버튼 <strong>(ALL 아이콘)</strong>을 통해 캘린더의 필터 기능을 사용 가능합니다. <em className="footnote--accent">(ALL[모두] or ME[나])</em><br />
                                2-5. 로그인시 자신의 일정은 구분을 위해 이름 옆 <em className="accent">ME</em> 심볼이 표기됩니다. <br />
                                2-6. 자신의 일정에 마우스 호버<strong>(모바일 Click)</strong> 시 수정 및 제거 기능이 제공됩니다.<em className="footnote--accent">(버튼)</em><br />
                                <div className="footnot">(수정은 해당 날짜의 출근 상태 및 시간만 가능하며, 날짜 변경은 제거 후 일정을 재등록 해야합니다.)</div>
                            </SettingWrap>
                        </div>
                        <hr />
                    </li>
                    <li>
                        <span className="title">내정보</span>
                        <h4 className="title-desc">
                            <SettingWrap theme={modeColor}>
                                # 내정보를 수정할 수 있습니다. <em className="footnote--accent">(로그인 필요)</em><br />
                                #-1. 아이디를 제외한 모든 정보를 수정할 수 있습니다.

                            </SettingWrap>
                        </h4>
                        <hr />
                        <div className="desc">
                            <SettingWrap theme={modeColor}>
                                3-1. 타이틀 우측 토글 버튼으로 수정 기능 활성화<br />
                                3-2. 개인 정보 수정 후 하단 수정 버튼 클릭.

                            </SettingWrap>
                        </div>
                        <hr />
                    </li>
                    <li>
                        <span className="title">설정</span>
                        <h4 className="title-desc">
                            <SettingWrap theme={modeColor}>
                                # 시스템의 설정을 제어 합니다.<br />
                                #-1. 특정 기능은 로그인이 필요합니다.
                            </SettingWrap>
                        </h4>
                        <hr />
                        <div className="desc">
                            <SettingWrap theme={modeColor}>
                                4-1. <strong>일정 간소화</strong> = 일정표의 정보를 간략하게 보여주는 기능입니다.<br />
                                4-2. <strong>테마 색상</strong> = 다크모드 및 기본 모드로 변경 기능입니다.<br />
                                4-3. <strong>일정표 필터</strong> = 일정표의 필터 기능입니다. (일정표 페이지에서 간단하게 수정 할 수 있도록 기능 추가)<br />
                                <strong>모두</strong>(모든 일정), <strong>나</strong><em className="footnote--accent">(로그인 필요)</em>, <strong>기타 설정</strong>(사무소, 실 및 팀 단위 - 활성화 후 하단 셀렉트 매뉴에서 사용가능)<br />
                                4-4. <strong>내보내기</strong> - 해당 월의 일정을 <strong>엑셀 파일</strong>로 내보낼 수 있습니다.

                            </SettingWrap>
                        </div>
                        <hr />
                    </li>

                </ol>

            </p>
            <h3>버그 및 기타</h3>
            <p>
                <ol>
                    <li>
                        <span className="title" style={{ color: initColorValue.state.color2 }}>개선 진행중</span>
                        <h4 className="title-desc">
                            # 개선중인 내용 입니다.<br />
                        </h4>
                        <div className="desc">
                            <SettingWrap theme={modeColor}>

                                - 일정표의 일정 등록시 중복 등록 불가 기능.<br />
                                - 일정표의 오늘 날짜로 스크롤 이동 기능.<br />
                                - 외부유저<strong>(사내 외)</strong> 회원 가입 방지 기능. <em className="footnote--accent">(고유 비밀번호 설정)</em>
                            </SettingWrap>
                        </div>
                        <hr />
                    </li>
                    <li>
                        <span className="title" style={{ color: initColorValue.state.color2 }}>추가 기능 작업 예정</span>
                        <h4 className="title-desc">
                            # 추가 기능 예정 내용 입니다.<br />
                        </h4>
                        <div className="desc">
                            <SettingWrap theme={modeColor}>
                                - 투표소<br />
                                - 공지방 <br />

                            </SettingWrap>
                        </div>
                        <hr />
                    </li>
                    <li>
                        <span className="title">버그 및 기타</span>
                        <h4 className="title-desc">
                            # 수정 사항 및 개선 사항은 추후 업데이트 예정입니다.<br />
                        </h4>
                        <div className="desc">
                            <SettingWrap theme={modeColor}>
                                - 설명 페이지 작성 - <em>23.07.18</em> : 메인 최상단 상품 이벤트 추가,  <br />
                                - 설명 페이지 작성 - <em>23.07.18</em> : 일정표에 일정 다수 및 단일 추가 기능 및 보기 옵션 추가 업데이트<br />
                                - 설명 페이지 작성 - <em>23.07.17</em> : 일정표 UI 개선 및 버그 및 기타/추가 기능 작업 예정 업데이트<br />
                                - 설명 페이지 작성 - <em>23.07.10</em> : 일정 엑셀파일로 내보내기 기능 개발 완료.

                            </SettingWrap>
                        </div>
                        <hr />
                    </li>
                </ol>
            </p>

        </InnerWrap>

    )
}

const InnerWrap = styled.div<{ cMode: string }>`
    background-color:${props => props.cMode === 'light' ? initColorValue.light.bg : initColorValue.dark.bg};
    
    
    h1,h3 {
        margin: 0;
        padding: 12px 0;
        color: ${props => props.cMode === 'light' ? '##48484A' : initColorValue.dark.textWhite};;
    }
    p {
        color: ${props => props.cMode === 'light' ? '##48484A' : initColorValue.dark.textWhite};;

        &:last-child {
            padding-bottom : 24px
        }
        
    }

    ol {

    }
    .title {
        font-weight : bold;
    }
    .title-desc {
        margin : 8px 0;
        font-size : 16px;
        font-weight: bold;

        >div {
            margin: 0;
            width: auto;
        }
    }
    .desc {
        line-height: 1.75em;
        >div {
            margin: 0;
            width : auto
        }
    }
    .accent {
        padding: 2px 4px;
        font-size: 10px;
        font-weight: 700;
        line-height: 10px;
        background-color: #FD1F4A;
        color: #fff;
        border-radius: 2px;
        font-style: inherit;
    }
    .footnote--accent {
        color : ${initColorValue.point1};
        font-weight:   bold;
    }
    .footnot {
        font-style : italic;
        font-weight : bold;
        font-size : 14px;
    }

    .used__wrap {
        display: flex;
        flex-direction: column;
        width:  100%;

        >button + div {
            width: calc(100% - 64px);
            padding: 32px;
        }

        .content {
            margin-top: 8px;
            //필요성
            .title {
                margin: 0;
            }
            .desc {
                margin-top: 8px;
            }
           
            &:first-child {
                height: 100px;
                input {
                    display: none;
                }    
                input + label {
                    position: relative;
                    display: inline-block;
                    width: 50%;
                    height: 64px;
                    text-align: center;
                };
                input:checked + label {
                    border-radius: 8px;
                    outline: 2px solid ${initColorValue.point1};
                }
                input + label span {
                    position: absolute;
                    top: 50%;
                    left : 50%;
                    transform: translate(-50%, -50%);
                    font-size : 3rem;
                    font-weight: bold;
                }
              
            }
        }
    }

    .survey_button {
        width: 54%;
    }
    @media (max-width : 561px) {
        .survey_button {
            width: 100%;
        }
    }
    
`

const SettingWrap = styled.div<{ theme: string }>`
    position: relative;
    margin:  0 auto;
    padding : 24px;
    width: 50%;
    height: auto;
    background-color:${props => props.theme === 'light' ? initColorValue.light.calcDesc : initColorValue.dark.bg1};
    border-radius: 4px;

    h3 {
        padding: 0;
    }

    p {
        padding: 0 !important;
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
        width: 144px;
        height: 144px;
        border-radius: 4px;
        background-repeat: no-repeat;
        background-size: contain;
        filter :invert( ${props => props.theme === 'light' ? "30%" : "70%"} );
        
    }
    .ico__simpley {
        position: absolute;
        top: 12px;
        right: 12px;
        background-image: url('question.png');
    }
    

    @media (max-width : 561px) {
        padding: 12px;
        width: calc(100% - 24px);

        

        .ico {
            top: 4px;
            right : 4px;
            width: 20%;
        }
    }
    

`