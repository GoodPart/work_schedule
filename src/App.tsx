import React, { createContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';

import { RootState } from './modules';
import { useSelector, useDispatch } from 'react-redux';

import RouterArea from './routers/RouterArea';
import { authCheckToServer } from './modules/auth';

const MyContext = createContext('');

function App() {
  const dispatch = useDispatch()


  const logout = () => {
    axios.get("http://localhost:9999/api/users/logout", {
      withCredentials: true
    })
      .then(res => {
        console.log(res.data)
      })
  }

  useEffect(() => {


  }, [])

  // const requestAuto = () => {
  //   axios.get('http://localhost:9999/api/users/auth', { withCredentials: true })
  //   .then(res=> {console})
  // }


  return (
    <MyContext.Provider value="hi">
      <BrowserRouter>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/signin'>로그인</Link>
          </li>
          {/* <li>
            <Link to='/signin'>회원가입</Link>
          </li> */}
          <li>
            <Link to='/my-page'>내 정보</Link>
          </li>
          <li>
            <Link to='/calendar'>calendar</Link>
          </li>
        </ul>
        <input type="button" onClick={() => logout()} value="로그아웃" />

        <RouterArea />
      </BrowserRouter>
    </MyContext.Provider>
  );
};

export default App;
