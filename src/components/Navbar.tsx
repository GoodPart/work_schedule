"use client"
import { useState, useCallback, useEffect } from "react"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../modules";
import { signOutAction } from "../modules/register"
import axios from "axios"





export default function NavBar({ onBodyChange, scrollV }: any) {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const authData = useSelector((state: RootState) => state.authCheckReducer.auth);
    const registData = useSelector((state: RootState) => state.registerReducer);
    const [toggle, setToggle] = useState(false);

    const logout = useCallback(async () => {
        await dispatch(signOutAction())

        window.location.reload();

    }, [dispatch])
    const onToggle = (e: any) => {
        setToggle(!toggle)
        onBodyChange(!toggle)
    }
    const resetToggle = () => {
        setToggle(false)
        onBodyChange(false)
    }

    useEffect(() => {
        console.log('registData', registData.loading)
    }, [registData.loading, authData])
    return (
        <Nav scroll={scrollV.toString()}>
            <div className="inner-wrap">
                <div className="title" style={{ textTransform: 'uppercase', fontSize: 22, fontWeight: 700, letterSpacing: '-0.05em', color: "rgb(68,68,68)" }}>My Work Day</div>
                <DefaultNav>
                    <NavItem>
                        <Link to='/'>Home</Link>

                        {
                            authData ? <button type="button" style={{ cursor: "pointer", display: "flex", marginLeft: "20px", fontSize: 14, color: "#666", backgroundColor: "transparent", border: "none", padding: 16 }} onClick={() => logout()}  >로그아웃</button> : <Link to='/signin'>로그인</Link>
                        }


                        {
                            authData ? <Link to='/my-page'>내 정보</Link> : ""
                        }


                        <Link to='/calendar'>calendar</Link>
                        <Link to='/setting'>설정</Link>
                    </NavItem>
                </DefaultNav>
                <Hamberger >
                    <div className={toggle ? 'wrap active' : 'wrap'}>
                        <NavItem className="ham-nav__item">
                            <Link to='/' onClick={() => resetToggle()}>Home</Link>

                            {
                                authData ? <button type="button" style={{ cursor: "pointer", display: "flex", marginLeft: "20px", fontSize: 14, color: "#666", backgroundColor: "transparent", border: "none", padding: 16 }} onClick={() => logout()}  >로그아웃</button> : <Link to='/signin' onClick={() => resetToggle()}>로그인</Link>
                            }
                            {
                                authData ? <Link to='/my-page' onClick={() => resetToggle()}>내 정보</Link> : ""
                            }

                            <Link to='/calendar' onClick={() => resetToggle()}>calendar</Link>

                            <Link to='/setting' onClick={() => resetToggle()}>설정</Link>
                        </NavItem>
                    </div>
                    <HamIcon className="toggle-icon" toggle={toggle} onClick={(e: any) => onToggle(e)} />
                </Hamberger>
            </div>

        </Nav>
    )
}

//style
const Logo = styled.div`
    cursor : pointer;
    display : flex;
    width : 100px;
    
    span {
    }
`
const Nav = styled.nav<{ scroll: Boolean }>`
    z-index : 100;
    position : ${(props) => props.scroll ? "fixed" : "inherit"};
    top : ${(props) => props.scroll ? "0px" : "inherit"};
    width : 100%;
    box-sizing : border-box;
    border-bottom-width : 1px;
    border-bottom-color  : ${(props) => props.scroll ? "rgb(234,234,234)" : "transparent"};
    border-bottom-style : solid;
    border-bottom: 1px solid rgb(234,234,234);
    backdrop-filter: saturate(180%) blur(5px);
    background: hsla(0,0%,100%,.8);
    
    & + * {
        padding-top : ${(props) => props.scroll ? "65px" : "0"};
    }
    .inner-wrap {
        display : flex;
        padding : 16px 24px;
        height: 32px;
    }
`
const NavItem = styled.div`
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
        color : #666;
        transition : color .6s cubic-bezier(0.22, 1, 0.36, 1);

        &:hover {
            color : #000;
        }
    }
`
const DefaultNav = styled.div`
@media (max-width : 767px) {
        display : none
    }
`
const Hamberger = styled.div`
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
            background-color : #333;
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
        top : 65px;
        left : 0;
        width : 100%;
        background-color : #fff;

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
        transform : ${(props) => props.toggle ? `rotate(45deg) translateY(-50%)` : 'rotate(0deg)'}
    }
    &.toggle-icon:before {
        /* bottom : 50%; */
        top : ${(props) => props.toggle ? '16px' : '10px'};
        transform : ${(props) => props.toggle ? `rotate(-45deg) translateY(-50%)` : 'rotate(0deg)'}
    }
`