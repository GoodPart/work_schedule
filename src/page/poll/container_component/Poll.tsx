import React, { useState, ChangeEvent, useCallback, useEffect } from 'react';
import Index from "../present_component/Index";


//redux
import { useDispatch, useSelector } from 'react-redux';
import { registerSignUp, collectionRead } from "../../../modules/register";

import swal from 'sweetalert';

export default function Poll({ modeColor }: any) {

    let testData = [
        {
            title: '투표해라 인간',
            id: 1,
            state: false, // 투표 종료 유무
            exp: new Date(2023, 7, 18, 14, 50),
            enter_user: ['박경수', '근손실'],
            desc: '투표좀해라 이것들아, 참여좀 해',
            select_list: [
                {
                    id: 'a',
                    topic: '1번 내용',
                    like: 0,

                },
                {
                    id: 'b',
                    topic: '2번 내용',
                    like: 1,

                },
                {
                    id: 'c',
                    topic: '3번 내용',
                    like: 1,

                }
            ],
            final_check: 'b'
        },
        {
            title: '점심좀 골라라 인간',
            id: 2,
            state: true, // 투표 종료 유무
            exp: new Date(2023, 7, 18, 13, 0),
            enter_user: ['박경수', '근손실'],
            desc: '점심 뭐먹지',
            select_list: [
                {
                    id: 'a',
                    topic: '닭찌찌',
                    like: 2,

                },
                {
                    id: 'b',
                    topic: '닭다리',
                    like: 0

                },
                {
                    id: 'c',
                    topic: '닭날개',
                    like: 0

                }
            ],
            final_check: 'a'
        }
    ]


    return (
        <Index modeColor={modeColor} pollData={testData} />
    )
}