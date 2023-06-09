import styled from "styled-components"

export const SubmitBtn = styled.button`
    cursor: pointer;
    width: 100%;
    padding : 16px;
    background-color: #0F9485;
    border : none;
    border-radius: 4px;
    color : #fff;
    font-size : 20px;
    font-weight: bold;

    &:disabled {
        cursor: not-allowed;
        background-color: gray
    }
`

export const defaultBtn = styled.button`
    cursor: pointer;
    width: 100%;
    border : none;
    background-color: #eee;
    border : 1px solid #ddd;
    border-radius: 4px;
    color : #fff;
    font-size : 12px;
    font-weight: bold;
    text-align: center;
    transition: background-color .3s linear;

    &:hover {
        background-color: #0F9485;

    }

    &:disabled {
        cursor: not-allowed;
        background-color: gray;
    }
`

export const defaultInputBtn = styled.input`
    & + label {

        cursor: pointer;
        width: auto;
        padding : 16px;
        background-color: #e7e7e7 !important;
        border : none;
        border-radius: 4px;
        color : #333;
        font-size : 20px;
        font-weight: bold;
    
        
    }

    &:checked + label {
            color : "#fff";
            background-color: #0F9485 !important
        }
   
`