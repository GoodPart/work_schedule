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

  const systemData = useSelector((state: RootState) => state.systemReducer);
  let themeColor = systemData.theme_color ? 'dark' : 'light'

  useEffect(() => {

  }, [])


  return (
    <BrowserRouter>
      <NavBar modeColor={themeColor} />

      <RouterArea modColor={themeColor} />
    </BrowserRouter>
  );
};

export default App;
