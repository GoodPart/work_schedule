import React, { createContext, useEffect, useCallback, useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';

import styled, { ThemeProvider } from 'styled-components';

import { RootState } from './modules';
import { useSelector, useDispatch } from 'react-redux';


import NavBar from './components/Navbar';
import RouterArea from './routers/RouterArea';

import { initColorValue } from './components/styledComponents/CommonValue';


function App() {


  const [overflowHidden, setOverflowHidden] = useState(false);
  const [scrollV, setScrollV] = useState(false);


  const [modeColor, setModeColor] = useState('dark');
  const modeChangeToggle = () => setModeColor(modeColor === 'light' ? 'dark' : 'light')


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

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   }
  // }, [])

  const logout = () => {
    axios.get("http://localhost:9999/api/users/logout", {
      withCredentials: true
    })
      .then(res => {
        console.log(res.data)
      })
  }


  return (
    <BrowserRouter>
      <NavBar onBodyChange={onBodyChange} scrollV={scrollV} modeColor={modeColor} modeChangeToggle={modeChangeToggle} />


      <RouterArea modColor={modeColor} />
    </BrowserRouter>
  );
};

export default App;
