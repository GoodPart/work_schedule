import React, { useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';

import { useDispatch } from 'react-redux';
import { collectionRead } from '../../../modules/register';

import * as InputForm from '../../../components/styledComponents/InputStyled'
import * as ButtonForm from '../../../components/styledComponents/ButtonStyled'
import { initColorValue } from '../../../components/styledComponents/CommonValue';


export default function Index({ modeColor, modify, modifyToggle, newForm, onChange, modifySetting }: any) {
    const dispatch = useDispatch();
    const [collections, setCollections] = useState({
        collection_1: [],
    })

    const getCollection_1 = useCallback(async () => {
        const result = await dispatch(collectionRead())

        if (result.success) {
            setCollections({
                ...collections,
                collection_1: result.find
            })
            // console.log(result.find[0].name, newForm.office_name.replace(/(\s*)/g, ""))

        }
    }, [dispatch])


    useEffect(() => {
        getCollection_1()
    }, [])
    return (
        <InnerWrap cMode={modeColor}>
            <div className="device__wrap">
                <div className="header">
                    <h2>내정보</h2>
                    <InputForm.InputFormWrapToggle width={48} height={24} cMode={modeColor}>
                        <input id="modify" type="checkbox" checked={!modify} onChange={(e: any) => modifyToggle(e.target.checked)} />
                        <label htmlFor="modify" ></label>
                    </InputForm.InputFormWrapToggle>
                </div>
                <InputForm.InputFormWrap check={newForm.user_name} cMode={modeColor}>
                    <input type="text" id='user_name' name='user_name'
                        defaultValue={newForm.user_name}
                        // value={newForm.user_name}
                        readOnly={modify}
                        onChange={(e: any) => onChange(e)}
                    />
                    <label htmlFor='user_name'>이름</label>
                </InputForm.InputFormWrap>
                <br />
                <InputForm.InputFormWrap check={newForm.user_id} cMode={modeColor}>
                    <input type="text" id='user_id' name='user_id'
                        defaultValue={newForm.user_id}
                        // value={authData.user_id}
                        readOnly
                    />
                    <label htmlFor='user_id'>아이디</label>
                </InputForm.InputFormWrap>
                <br />
                <InputForm.InputFormWrap check={newForm.user_email} cMode={modeColor}>
                    <input type="text" id='user_email' name='user_email'
                        defaultValue={newForm.user_email}
                        // value={authData.user_email}
                        readOnly={modify}
                        onChange={(e: any) => onChange(e)}
                    />
                    <label htmlFor='user_email'>이메일</label>
                </InputForm.InputFormWrap>
                <br />
                <InputForm.InputFormWrap check={newForm.user_phn} cMode={modeColor}>
                    <input type="text" id='user_phn' name='user_phn'
                        defaultValue={newForm.user_phn}
                        // value={authData.user_phn}
                        readOnly={modify}
                        onChange={(e: any) => onChange(e)}
                    />
                    <label htmlFor='user_phn'>전화번호</label>
                </InputForm.InputFormWrap>
                <br />
                <InputForm.InputFormWrapSelect cMode={modeColor}>
                    <select name='office_name' disabled={modify} onChange={(e: any) => onChange(e)}>
                        <option value="">사무소를 선택하세요.</option>
                        {
                            collections.collection_1.map((collection: any, index: number) => {
                                if (collection.type === 100) {
                                    return <option value={collection.name} selected={collection.name === newForm.office_name.replace(/(\s*)/g, "")} >{collection.name}</option>
                                }
                            })
                        }
                    </select>
                </InputForm.InputFormWrapSelect>
                <br />
                <InputForm.InputFormWrapSelect cMode={modeColor}>
                    <select name='office_room' disabled={modify} onChange={(e: any) => onChange(e)}>
                        <option value="">사업부 및 사업실을 선택하세요.</option>
                        {
                            collections.collection_1.map((collection: any, index: number) => {
                                if (collection.type === 200) {
                                    return <option value={collection.name} >{collection.name}</option>
                                }
                            })
                        }
                    </select>
                </InputForm.InputFormWrapSelect>
                <br />
                <InputForm.InputFormWrapSelect cMode={modeColor}>
                    <select name='team_name' disabled={modify} onChange={(e: any) => onChange(e)}>
                        <option value="">팀을 선택하세요.</option>
                        {
                            collections.collection_1.map((collection: any, index: number) => {
                                console.log(newForm.team_name, collection.name)
                                if (collection.type === 300) {
                                    return <option value={collection.name} selected={collection.name === newForm.team_name.replace(/(\s*)/g, "")}>{collection.name}</option>
                                }
                            })
                        }
                    </select>
                </InputForm.InputFormWrapSelect>
                <br />
                <ButtonForm.SubmitBtn disabled={modify} style={{ opacity: !modify ? 1 : 0, transition: "opacity .6s .1s cubic-bezier(0.16, 1, 0.3, 1)" }} onClick={() => modifySetting(newForm)}>수정</ButtonForm.SubmitBtn>
            </div>
        </InnerWrap>
    )
}


const InnerWrap = styled.div<{ cMode: string }>`
    background-color:${props => props.cMode === 'light' ? initColorValue.light.bg : initColorValue.dark.bg};
    height: 100%;
    
        
        h2 {
        margin: 0;
        padding: 12px 0;
        color: ${props => props.cMode === 'light' ? '##48484A' : initColorValue.dark.textWhite};;
    }
        
        .device__wrap {
        margin: 0 auto;
        width: 560px;
        height: 100%;
    }
        .device__wrap.header {
        display: flex;
        justify-content: space-between;
    }

    @media(max-width: 561px) {
        height: auto;
        padding-bottom: 30%;
        background-color: ${props => props.cMode === 'light' ? initColorValue.light.bg : initColorValue.dark.bg};
            .device__wrap {
            width: 100%;
        }
    }
`