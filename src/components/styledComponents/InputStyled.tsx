import React from 'react'
import styled from 'styled-components'
import { initColorValue } from './CommonValue'

export const InputFormWrap = styled.div<{ check: any, cMode: any }>`
    position: relative;
    width : 100%;
    z-index : 0;

    input {
        width: 100%;
        padding: 24px 16px 16px 16px;
        /* color : #48484A; */
        color: ${props => props.cMode === 'light' ? '##fff' : "#48484A"};;
        font-size : 16px;
        border-width: 1px;
        border-style: solid;
        border-color:${props => props.cMode === 'light' ? initColorValue.light.bg : initColorValue.dark.bg1};
        border-radius: 4px;
        font-weight : bold;
        box-sizing: border-box;
        /* background-color: ${props => props.cMode === 'light' ? initColorValue.light.bg : initColorValue.dark.bg1}; */
    }

    input:read-only {
        /* background-color: #ddd */
        background-color: ${props => props.cMode === 'light' ? "#ddd" : "#2f2f33"};
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
        top: ${props => props.check.length > 0 ? "4px" : "16px"};
        left : ${props => props.check.length > 0 ? "16px" : "16px"}; 
        color : ${props => props.check.length > 0 ? "#0F9485" : "#969696"};
        text-align: left;
        font-weight : bold;
        font-family: 'NotoSansKR_Bold';
        font-size : ${props => props.check.length > 0 ? "10px" : "16px"};
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
        padding: 8px;
        border-radius: 4px;
        border-color: #eee;
        color : #48484A;
        font-size : 16px;
        border-width: 1px;
        border-style: solid;
    }
`


export const InputFormWrapToggle = styled.div<{ width: number, height: number, cMode: string }>`
    position: relative;
    display: flex;
    align-self: center;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    background-color: #c2c2c2;
    border-radius:  24px;

    input[type='checkbox'] {
        display: none;

        & + label {
            display: block;
            width : 100%;
            height : 100%;
        }
    }

    input[type='checkbox'] + label {
        &:after {
            content: '';
            position: absolute;
            top: 0;
            left : 0;
            width: ${props => props.height}px;
            height: ${props => props.height}px;
            background-color: #444;
            border-radius: ${props => props.height}px;
            transition: left .5s cubic-bezier(0.075, 0.82, 0.165, 1);
            
        }

        &:before {
            content: '';
            position: absolute;
            top: 50%;
            left : calc(100% - 20px - 3px);
            transform: translate(0, -50%);
            width : 20px;
            height: 20px;
            /* background-color: ; */
            background-image: url('moon.png');
            background-size: cover;
            transition: left .5s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
    }

    input[type='checkbox']:checked + label {
        &:after {
            left : inherit;
            left : calc(100% - ${props => props.height}px) 
        }
        &:before {
            content: '';
            position: absolute;
            top: 50%;
            left : 3px;
            transform: translate(0, -50%);
            width : 20px;
            height: 20px;
            background-image: url('sun.png');
            background-size: cover;
        }
    }
`