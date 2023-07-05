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
        color: ${props => props.cMode === 'light' ? '##48484A' : "#fff"};;
        font-size : 16px;
        border-width: 1px;
        border-style: solid;
        border-color:${props => props.cMode === 'light' ? initColorValue.light.bg : initColorValue.dark.bg1};
        border-radius: 4px;
        font-weight : bold;
        box-sizing: border-box;
        background-color: ${props => props.cMode === 'light' ? initColorValue.light.bg : initColorValue.dark.bg1};
    }

    input:read-only {
        /* background-color: #ddd */
        color: ${props => props.cMode === 'light' ? '#fff' : "#48484A"};;
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
    input:focus + label em {
        font-weight: bold;
        color : ${initColorValue.point1};
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
    input + label em {
        font-weight: bold;
        line-height : 1.5rem;
        font-size : 1.5rem;
        color : ${initColorValue.point1};
    }
   
    
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

export const InputFormWrapSelect = styled.div<{ cMode: string }>`
    position: relative;
    width : 100%;
    z-index : 0;

    select {
        width: calc(100%);
        padding: 8px;
        border-radius: 4px;
        border-color:${props => props.cMode === 'light' ? initColorValue.light.bg : initColorValue.dark.bg1};
        background-color: ${props => props.cMode === 'light' ? "#fff" : "#2f2f33"};
        color : ${props => props.cMode === 'light' ? "#2f2f33" : "#ddd"};
        font-size : 16px;
        border-width: 1px;
        border-style: solid;

        &:disabled {
            color : ${props => props.cMode === 'light' ? "#ddd" : "#555"};
        }
    }
`


export const InputFormWrapColorToggle = styled.div<{ width: number, height: number, cMode: string }>`
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
            left : calc(100% - ${props => props.height}px);
            background-color: #0F9485;
            
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
    }

    input[type='checkbox']:checked + label {
        &:after {
            left : calc(100% - ${props => props.height}px);
            background-color: #0F9485;
        }
        
    }
`

export const InputFormRowToggle = styled.div<{ width: any, height: any, cMode: string }>`
    position: relative;
    display: table;
    width: ${props => props.width};
    height: ${props => props.height};


    >div {
        position: relative;
        display: table-cell;
        vertical-align: middle;
    }

    input[type='radio'] {
        display: none;
    }
    input[type='radio'] + label {
        /* width  */
        z-index : 10;
        position: absolute;
        top: 0;
        left:  0;
        width : 100%;
        height: 100%;
        overflow: hidden;
        /* transition: position .6s ease-in-out; */
        
        &:after {
            content: '';
            position: absolute;
            bottom: 0;
            left : 50%;
            transform: translateX(-50%);
            width: 0;
            height: 3px;
            background-color: #0F9485;
            border-radius: 12px;
        }
    }
    input[type='radio']:checked +label{

        &:after {
            animation-name: selectSort;
            animation-duration: .6s;
            animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
            animation-fill-mode: forwards;
        }
    }
    input[type='radio']:disabled ~ .icon-area {
        opacity: .2
    }

    @keyframes selectSort {
        0% {
            width : 0
        }
        100% {
            width : 100%
        }
    }
`