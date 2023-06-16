import React, { createContext, useEffect, useCallback, useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';

import styled, { ThemeProvider } from 'styled-components';

import { RootState } from './modules';
import { useSelector, useDispatch } from 'react-redux';


import NavBar from './components/Navbar';
import RouterArea from './routers/RouterArea';


function App() {

  const theme = {
    colors: {
      bgColor: '#121212',
    }
  }

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

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   }
  // }, [])

  const logout = () => {
    axios.get("http://myworkday.pe.kr:9999/api/users/logout", {
      withCredentials: true
    })
      .then(res => {
        console.log(res.data)
      })
  }


  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <NavBar onBodyChange={onBodyChange} scrollV={scrollV} />


        <RouterArea />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
