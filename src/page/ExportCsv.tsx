import React, { useEffect, useState } from 'react';
import writeXlsxFile from "write-excel-file";
import axios from "axios";
import * as ButtonForm from "../components/styledComponents/ButtonStyled";
import { initColorValue } from '../components/styledComponents/CommonValue';

export default function ExportCsv({ exportState, auth }: any) {
    let rows_wrap: any[] = [];

    const readUsers = async (exState: number) => {
        let getData = await axios.post('https://myworkday.pe.kr:8888/api/calendar/read', { month: exState }, { withCredentials: true })
        let getUser = await axios.get('https://myworkday.pe.kr:8888/api/users/read', { withCredentials: true });


        const getMonthDays = {
            first_day: new Date(2023, exState, 1).getDate(),
            last_day: new Date(2023, exState, 0).getDate()
        }
        const getMapArray = Array.from({ length: getMonthDays.last_day }, (value, index) => index + 1);

        //sort 용 function
        // let rest = getData.data.result.sort(function (f: any, s: any) {
        //     const nameF = f.user.user_name;
        //     const nameS = s.user.user_name;
        //     if (nameF < nameS) {
        //         return -1;
        //     }
        //     if (nameF > nameS) {
        //         return 1;
        //     }
        //     return 0;
        // });

        const mkDataRow = (dayLength: any, calendarData: any, usersData: any) => {
            const scheduleData = calendarData.data.result;


            function schduleChec(user: any, day: number) {
                const userName = user.user_name;
                let result = '';
                result = scheduleData.map((sch: any) => {
                    if (userName === sch.user.user_name && day - 1 === sch.date_at[2]) {
                        let h = Number(sch.data.work_time[0]);
                        let m = Number(sch.data.work_time[1]);
                        let newH = h > 10 ? '0' + h : h;
                        let newM = m == 0 ? '0' + m : m;
                        return sch.data.state == '출근' ? `${newH}:${newM}` : sch.data.state == '오전 반차' ? `14:00` : sch.data.state == '오후 반차' ? `${newH}:${newM}` : sch.data.state == '월차' ? sch.data.state : sch.data.state == '외근' ? sch.data.state : ''
                    } else {
                    }
                }).filter((x: any) => x !== undefined ? '-' : x)
                return result[0]
            }



            //월의 일 갯수 만큼 31
            dayLength.map((day: number) => {
                let data_rows = [{}];

                // 인원수 만큼 loop - 8
                usersData.data.result.map((user: any, index2: number) => {
                    //첫번째 행에는 무조건 날짜
                    if (index2 % usersData.data.result.length === 0) {
                        data_rows = [{
                            value: new Date(2023, exState - 1, day + 1),
                            format: 'yyyy년mm월dd일',
                            align: 'center',
                            rightBorderStyle: "thick",
                            leftBorderStyle: "thick",
                            bottomBorderStyle: "thick",
                            bottomBorderColor: "#aaaaaa",
                            rightBorderColor: "#aaaaaa",
                            leftBorderColor: "#aaaaaa"
                        }]
                    } else {
                        //나머지 각 인원의 출근 시간 영역
                        data_rows = [...data_rows, {
                            value: schduleChec(user, day + 1),
                            align: 'center',
                            rightBorderStyle: "thick",
                            leftBorderStyle: "thick",
                            bottomBorderStyle: "thick",
                            bottomBorderColor: "#aaaaaa",
                            rightBorderColor: "#aaaaaa",
                            leftBorderColor: "#aaaaaa"
                        }]

                    }
                })
                rows_wrap.push(data_rows)
            })


            //해더 추가
            let header_row: any[] = [];
            usersData.data.result.map((user: any, index2: number) => {
                if (index2 === 0) {
                    //Date
                    header_row = [{
                        value: 'Date',
                        fontWeight: 'bold',
                        fontSize: 14,
                        backgroundColor: "#DADADA",
                        align: 'center',
                        rightBorderStyle: "thick",
                        leftBorderStyle: "thick",
                        bottomBorderStyle: "thick",
                        bottomBorderColor: "#aaaaaa",
                        rightBorderColor: "#aaaaaa",
                        leftBorderColor: "#aaaaaa"
                    }]
                } else {
                    if (index2 < usersData.data.result.length) {
                        header_row = [...header_row, {
                            value: user.user_name,
                            fontWeight: 'bold',
                            fontSize: 14,
                            backgroundColor: "#DADADA",
                            align: 'center',
                            rightBorderStyle: "thick",
                            leftBorderStyle: "thick",
                            bottomBorderStyle: "thick",
                            bottomBorderColor: "#aaaaaa",
                            rightBorderColor: "#aaaaaa",
                            leftBorderColor: "#aaaaaa"
                        }]
                    }
                }
            })

            rows_wrap.unshift(header_row);
        }

        mkDataRow(getMapArray, getData, getUser)
    }



    const exportSheet = (exState: number) => {

        readUsers(exState);
        const columns = [
            { width: 18 },
        ]

        setTimeout(() => {
            writeXlsxFile(rows_wrap, {
                sheet: `${exState}월`,
                columns,
                fileName: `${exState}월_가산_사무실_출결표.xlsx`
            })
        }, 1000)



    };
    return (
        <div className="ExportCsv">
            <ButtonForm.defaultBtn style={{ width: "100%", padding: 8, backgroundColor: initColorValue.point1, borderColor: "transparent", verticalAlign: "middle" }} disabled={auth ? false : true} onClick={() => exportSheet(exportState)}>다운로드</ButtonForm.defaultBtn>
        </div>
    );
}
