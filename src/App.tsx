import React from 'react';
import Main from './page/Main';
import SignIn from './page/SignIn';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import RouterArea from './routers/RouterArea';
function App() {
  return (
    <BrowserRouter>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/signin'>signin</Link>
        </li>
        <li>
          <Link to='/calendar'>calendar</Link>
        </li>
      </ul>
      <RouterArea />
    </BrowserRouter>
  );
};

export default App;
