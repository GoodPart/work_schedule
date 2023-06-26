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

  const [modeColor, setModeColor] = useState('dark');
  const modeChangeToggle = () => {
    setModeColor(modeColor === 'light' ? 'dark' : 'light');
  }

  // console.log(document.querySelector("#root"))



  return (
    <BrowserRouter>
      <NavBar modeColor={modeColor} modeChangeToggle={modeChangeToggle} />


      <RouterArea modColor={modeColor} />
    </BrowserRouter>
  );
};

export default App;
