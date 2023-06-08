import React from 'react'
import styled from 'styled-components'

export const InputFormWrap = styled.div<{check:any}>`
    position: relative;
    width : 100%;
    z-index : 0;

    input {
        width: calc(100% - 32px);
        padding: 24px 16px 16px 16px;
        border-radius: 4px;
        border-color: #eee;
        color : #48484A;
        font-size : 16px;
        border-width: 1px;
        border-style: solid;
    }
    input:focus {
        outline: 1px solid #0F9485;
    }
    input:focus + label {
        top : 4px;
        left : 16px;
        font-size : 10px;
        /* transform : scale(.7); */
        color : #0F9485;
    }
    input + label {
        cursor: text;
        position: absolute;
        display: inline-flex;
        top: ${props => props.check.length > 0 ? "4px": "16px"};
        left : ${props => props.check.length > 0 ? "16px": "16px"}; 
        color : ${props=> props.check.length > 0 ? "#0F9485" : "#969696" };
        text-align: left;
        font-weight : bold;
        font-size : ${props=> props.check.length > 0 ? "10px" : "16px" };
        transition: scale .6s cubic-bezier(0.075, 0.82, 0.165, 1), top .6s cubic-bezier(0.075, 0.82, 0.165, 1) ;
    };
    input:read-only + label {
        /* left: 0px; */
    }

    label.duplicate-check {
        position: absolute;
        top : 50%;
        right : 12px;
        transform: translateY(-50%);
    }
`

export const InputFormWrapSelect = styled.div`
    position: relative;
    width : 100%;
    z-index : 0;

    select {
        width: calc(100%);
        padding: 16px;
        border-radius: 4px;
        border-color: #eee;
        color : #48484A;
        font-size : 16px;
        border-width: 1px;
        border-style: solid;
    }
`