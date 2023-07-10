import React, { useEffect, useState } from 'react';
import writeXlsxFile from "write-excel-file";
import axios from "axios";






export default function App() {
    const [allUser, setAllUser] = useState(null);




    const readUsers = async () => {
        let getData = await axios.post('http://localhost:9999/api/calendar/read', { month: 7 }, { withCredentials: true })
        let getUser = await axios.get('http://localhost:9999/api/users/read', { withCredentials: true });

        let header_row = [
            {
                value: 'date',
            }
        ];
        let data_row_1 = [
            {
                type: Number,
                value: ''
            }
        ]

        const getMonthDays = {
            first_day: new Date(2023, 7, 1).getDate(),
            last_day: new Date(2023, 7, 0).getDate()
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


        // console.log(schema, objects)

        getMapArray.map((ele: any, index: number) => {

            // console.log(getUser.data.result[index])
            header_row = [...header_row, {
                value: getUser.data.result[index] ? getUser.data.result[index].user_name : '',
            }];
            data_row_1 = [...data_row_1, {
                type: Number,
                value: getData.data.result[index] && getData.data.result[index].date_at[2] === ele ? '여기' : ''
            }]

            console.log(getData.data.result[index] && getData.data.result[index].date_at[2], ele)


        })

        let data = [
            header_row, data_row_1
        ]

        // 컬럼당 추가 하는 함수





        //csv 파일 작성
        // writeXlsxFile(data, {
        //     fileName: 'test.xlsx'
        // })



    }



    const exportSheet = () => {

        readUsers();

        // writeXlsxFile(objects, {
        //     schema,
        //     fileName: "file.xlsx"
        // });

    };
    return (
        <div className="App">
            <button onClick={exportSheet}>Click to export</button>
        </div>
    );
}
