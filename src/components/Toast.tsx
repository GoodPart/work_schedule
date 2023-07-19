import React, { useState, useEffect, FunctionComponent } from 'react';
import styled from 'styled-components';
import { initColorValue } from './styledComponents/CommonValue';

const Toast = ({ children, options, cMode }: any) => {
    return (
        <ToastWrap options={options} className={options.className} cMode={cMode}>
            {children}
        </ToastWrap>
    )


}

export default Toast;

const ToastWrap = styled.div<{ options: any, cMode: string }>`
    z-index : 1000;
    position: fixed;
    bottom: calc(-30px - ${props => props.options.height});
    left : 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    width: ${props => props.options.width} ;
    height : ${props => props.options.height};
    border-radius: 16px;
    transition: bottom .4s .1s cubic-bezier(0.16, 1, 0.3, 1);
    /* border: ${props => props.options.theme === 'glass' ? '1px solid #ddd' : ''}; */
    backdrop-filter: ${props => props.options.theme === 'glass' ? 'saturate(180%) blur(5px)' : ''};
    -webkit-backdrop-filter: ${props => props.options.theme === 'glass' ? 'saturate(180%) blur(5px)' : ''};
    box-shadow: 0px 4px 6px 1px rgba(0,0,0,0.38);
    background: ${props => props.options.theme === 'glass' && props.cMode === 'light' ? 'hsla(0,0%,100%,.4);' : 'hsla(0,0%,0%,.4);'}; 
    


    &.toasting {
        bottom: ${props => props.options.gap ? props.options.gap : '8px'};
    }
    
     @media (min-width: 561px) {
        width : 40%
     }
`

