import React from "react";
import { initColorValue } from "../components/styledComponents/CommonValue";
import styled from "styled-components";
export default function Main({ modeColor }: any) {
    return (
        <InnerWrap cMode={modeColor}>
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
                            # 출근 상태 및 시간을 확인할 수 있습니다.<br />
                            #-1. 상태 = <span style={{ color: initColorValue.state.color1 }}>출근</span>,
                            <span style={{ color: initColorValue.state.color3 }}>반차(오전)</span>,
                            <span style={{ color: initColorValue.state.color4 }}>반차(오후)</span>,
                            <span style={{ color: initColorValue.state.color2 }}>월차</span>,
                            <span style={{ color: initColorValue.state.color5 }}>외근</span><br />
                            #-2. 시간 = 8:00, 8:30, 9:00, 9:30, 10:00
                        </h4>
                        <hr />
                        <div className="desc">
                            2-1. 일정 추가, 수정 및 제거 가능합니다. <em className="footnote--accent">(로그인 필요)</em><br />
                            2-2. 하단 우측 버튼<strong>(연필 아이콘)</strong>을 통해 일정 추가 가능. <em className="footnote--accent">(로그인 필요)</em><br />
                            2-3. 로그인시 자신의 일정은 구분을 위해 이름 옆 <em className="accent">ME</em> 심볼이 표기됩니다. <br />
                            2-4. 자신의 일정에 마우스 호버<strong>(모바일 Click)</strong> 시 수정 및 제거 기능이 제공됩니다.<em className="footnote--accent">(버튼)</em><br />
                            <div className="footnot">(수정은 해당 날짜의 출근 상태 및 시간만 가능하며, 날짜 변경은 제거 후 일정을 재등록 해야합니다.)</div>
                        </div>
                        <hr />
                    </li>
                    <li>
                        <span className="title">내정보</span>
                        <h4 className="title-desc">
                            # 내정보를 수정할 수 있습니다. <em className="footnote--accent">(로그인 필요)</em><br />
                            #-1. 아이디를 제외한 모든 정보를 수정할 수 있습니다.
                        </h4>
                        <hr />
                        <div className="desc">
                            3-1. 타이틀 우측 토글 버튼으로 수정 기능 활성화<br />
                            3-2. 개인 정보 수정 후 하단 수정 버튼 클릭.
                        </div>
                        <hr />
                    </li>
                    <li>
                        <span className="title">설정</span>
                        <h4 className="title-desc">
                            # 시스템의 설정을 제어 합니다.<br />
                            #-1. 특정 기능은 로그인이 필요합니다.
                        </h4>
                        <hr />
                        <div className="desc">
                            4-1. <strong>일정 간소화</strong> = 일정표의 정보를 간략하게 보여주는 기능입니다.<br />
                            4-2. <strong>테마 색상</strong> = 다크모드 및 기본 모드로 변경 기능입니다.<br />
                            4-3. <strong>일정 편집</strong> = 일정표의 필터 기능입니다. <br />
                            <strong>모두</strong>(모든 일정), <strong>나</strong><em className="footnote--accent">(로그인 필요)</em>, <strong>기타 설정</strong>(사무소, 실 및 팀 단위 - 활성화 후 하단 셀렉트 매뉴에서 사용가능)<br />
                            4-4. <strong>내보내기</strong> - 해당 월의 일정을 <strong>엑셀 파일</strong>로 내보낼 수 있습니다.
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
                            - 일정표의 일정 등록시 중복 등록 불가 기능.<br />
                            - 일정표의 오늘 날짜로 스크롤 이동 기능.<br />
                            - 외부유저<strong>(사내 외)</strong> 회원 가입 방지 기능. <em className="footnote--accent">(고유 비밀번호 설정)</em>
                        </div>
                        <hr />
                    </li>
                    <li>
                        <span className="title" style={{ color: initColorValue.state.color2 }}>추가 기능 작업 예정</span>
                        <h4 className="title-desc">
                            # 추가 기능 예정 내용 입니다.<br />
                        </h4>
                        <div className="desc">
                            - 투표소<br />
                            - 공지방 <br />
                        </div>
                        <hr />
                    </li>
                    <li>
                        <span className="title">버그 및 기타</span>
                        <h4 className="title-desc">
                            # 수정 사항 및 개선 사항은 추후 업데이트 예정입니다.<br />
                        </h4>
                        <div className="desc">
                            - 설명 페이지 작성 - <em>23.07.17</em> : 일정표 UI 개선 및 버그 및 기타/추가 기능 작업 예정 업데이트<br />
                            - 설명 페이지 작성 - <em>23.07.10</em> : 일정 엑셀파일로 내보내기 기능 개발 완료.
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
    }
    .desc {
        line-height: 1.75em;
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
    
`