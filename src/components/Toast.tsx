import React, { useState, useEffect, FunctionComponent } from 'react';
import styled from 'styled-components';

const Toast = ({ children, options }: any) => {
    return (
        <ToastWrap options={options} className={options.className}>
            {children}
        </ToastWrap>
    )


}

export default Toast;

const ToastWrap = styled.div<{ options: any }>`
    z-index : 1000;
    position: fixed;
    bottom: -${props => props.options.height};
    left : 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    width: ${props => props.options.width} ;
    height : ${props => props.options.height};
    border-radius: 16px  ;
    transition: bottom .6s .3s cubic-bezier(0.16, 1, 0.3, 1);
    border: ${props => props.options.theme === 'glass' ? '1px solid #ddd' : ''};
    backdrop-filter: ${props => props.options.theme === 'glass' ? 'saturate(180%) blur(5px)' : ''};
    -webkit-backdrop-filter: ${props => props.options.theme === 'glass' ? 'saturate(180%) blur(5px)' : ''};
    box-shadow: 0px 4px 6px 1px rgba(0,0,0,0.38);
    background: ${props => props.options.theme === 'glass' ? 'hsla(0,0%,100%,.4);' : '#fff'}; 


    &.toasting {
        bottom: ${props => props.options.gap ? props.options.gap : '8px'};
    }
    
`

