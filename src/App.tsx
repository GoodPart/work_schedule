import React from 'react';
import Main from './page/Main';
import SignIn from './page/SignIn';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
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

      </ul>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
