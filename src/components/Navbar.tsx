"use client"
import { useState, useCallback, useEffect } from "react"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../modules";
import { signOutAction } from "../modules/register"
import axios from "axios"


import { initColorValue } from "./styledComponents/CommonValue"

import * as InputForm from '../components/styledComponents/InputStyled'




export default function NavBar({ modeColor }: any) {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const authData = useSelector((state: RootState) => state.authCheckReducer.auth);
    const registData = useSelector((state: RootState) => state.registerReducer);
    const [toggle, setToggle] = useState(false);


    const [overflowHidden, setOverflowHidden] = useState(false);
    const [scrollV, setScrollV] = useState(false);
    const onBodyChange = () => {
        setOverflowHidden(!overflowHidden);
    }
    const handleScroll = useCallback((e: any) => {
        const { scrollY } = window

        if (scrollY > 0) {
            //스크롤 시작
            setScrollV(true)
        } else {
            //원위치
            setScrollV(false)
        }
    }, [])

    useEffect(() => {
        // console.log(modeColor)
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [modeColor, registData.loading, authData, toggle])


    const logout = useCallback(async () => {
        await dispatch(signOutAction())

        window.location.reload();

    }, [dispatch])
    const onToggle = (e: any) => {
        setToggle(!toggle)
        // onBodyChange(!toggle)
    }
    const resetToggle = () => {
        setToggle(false)
        // onBodyChange(false)
    }

    return (
        <Nav scroll={scrollV} cMode={modeColor}>

            <div className="inner-wrap">
                <div className="title" style={{ textTransform: 'uppercase', fontSize: 22, fontWeight: 700, letterSpacing: '-0.05em', color: modeColor === 'light' ? initColorValue.light.text : initColorValue.dark.text }}>My Work Day</div>
                <DefaultNav>
                    <NavItem cMode={modeColor}>
                        <Link to='/'>메인</Link>

                        {
                            authData ? <button type="button" style={{ cursor: "pointer", display: "flex", marginLeft: "20px", fontSize: 14, color: "#666", backgroundColor: "transparent", border: "none", padding: 16 }} onClick={() => logout()}  >로그아웃</button> : <Link to='/signin'>로그인</Link>
                        }


                        {
                            authData ? <Link to='/my-page'>내 정보</Link> : ""
                        }


                        <Link to='/calendar'>일정표</Link>
                        <Link to='/setting'>설정</Link>
                    </NavItem>
                </DefaultNav>
                <Hamberger cMode={modeColor}>
                    <div className={toggle ? 'wrap active' : 'wrap'}>
                        <NavItem className="ham-nav__item" cMode={modeColor}>
                            <Link to='/' onClick={() => resetToggle()}>메인</Link>

                            {
                                authData ? <button type="button" style={{ cursor: "pointer", display: "flex", marginLeft: "20px", fontSize: 14, color: "#666", backgroundColor: "transparent", border: "none", padding: 16 }} onClick={() => logout()}  >로그아웃</button> : <Link to='/signin' onClick={() => resetToggle()}>로그인</Link>
                            }
                            {
                                authData ? <Link to='/my-page' onClick={() => resetToggle()}>내 정보</Link> : ""
                            }

                            <Link to='/calendar' onClick={() => resetToggle()}>일정표</Link>

                            <Link to='/setting' onClick={() => resetToggle()}>설정</Link>
                        </NavItem>
                    </div>
                    <HamIcon className="toggle-icon" toggle={toggle} onClick={(e: any) => { e.preventDefault(); onToggle(e) }} />
                </Hamberger>
            </div>
            {/* <button type="button" onClick={(e) => { e.preventDefault(); modeChangeToggle() }}>{modeColor}</button> */}
            {/* <InputForm.InputFormWrapColorToggle width={48} height={24} cMode={modeColor}>
                <input id="checkbox" type="checkbox" onChange={e => modeChangeToggle()} />
                <label htmlFor="checkbox" ></label>
            </InputForm.InputFormWrapColorToggle> */}
        </Nav>
    )
}

//style
const Nav = styled.nav<{ scroll: any, cMode: String }>`
    z-index : 100;
    position : ${(props) => props.scroll ? "fixed" : "relative"};
    top : ${(props) => props.scroll ? "0px" : "inherit"};
    display: flex;
    width : 100%;
    box-sizing : border-box;
    backdrop-filter: saturate(180%) blur(5px);
    -webkit-backdrop-filter: saturate(180%) blur(5px);
    background: ${props => props.cMode === 'light' ? initColorValue.light.glass : initColorValue.dark.bg} ;
    
    & + * {
        padding : 0 12px;
        padding-top : ${(props) => props.scroll ? "49px" : "0"};
    }
    .inner-wrap {
        display : flex;
        padding : 8px 24px;
        height: 32px;
    }
`
const NavItem = styled.div<{ cMode: String }>`
    display : flex;
    gap : 1.5rem;
    height : 100%;
    align-items : center;

    a {
        display : flex;
        align-self : center;
        margin-left : 20px;
        font-size : 14px;
        text-decoration : none;
        color : ${props => props.cMode === 'light' ? initColorValue.light.text : initColorValue.dark.text};
        /* color : #666; */
        transition : color .6s cubic-bezier(0.22, 1, 0.36, 1);

    }
`
const DefaultNav = styled.div`
@media (max-width : 767px) {
        display : none
    }
`
const Hamberger = styled.div<{ cMode: string }>`
    background-color : green;

    .toggle-icon {
        cursor : pointer;
        position : absolute;
        right : 32px;

        &:after, &:before {
            content : '';
            top : 20px;
            position : absolute;
            width : 100%;
            height : 1px;
            background-color : ${props => props.cMode === 'light' ? initColorValue.light.text : initColorValue.dark.text};
            transition : top .3s cubic-bezier(0.22, 1, 0.36, 1), transform .3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        &:before {
            top : 10px;
        }
    }
    .wrap {
        overflow : hidden;
        height : 0;
        position : absolute;
        top : 48px;
        left : 0;
        width : 100%;
        background-color : ${props => props.cMode === 'light' ? initColorValue.light.bg : initColorValue.dark.bg};

        &.active {
            height : 100vh;
        }
        &.active .ham-nav__item {
            align-items : inherit;
            gap : 0;
        }
        &.active .ham-nav__item a {
            padding : 16px;
            align-self : inherit;
        }
    }
    .ham-nav__item {
        display : flex;
        flex-direction: column;
        width : 100%;
        height : 100%;
    }
    @media (min-width : 768px) {
        display : none
    }
`

const HamIcon = styled.div<{ toggle: Boolean }>`
    width : 32px;
    height : 32px;

    &.toggle-icon:after{
        /* top : 50%; */
        top : ${(props) => props.toggle ? '16px' : '20px'};
        transform : ${(props) => props.toggle ? `rotate(45deg) translateY(-50%)` : 'rotate(0deg)'};
    }
    &.toggle-icon:before {
        /* bottom : 50%; */
        top : ${(props) => props.toggle ? '16px' : '10px'};
        transform : ${(props) => props.toggle ? `rotate(-45deg) translateY(-50%)` : 'rotate(0deg)'};

    }
`

const modeToggle = styled.button<{ cMode: string }>`
    
`