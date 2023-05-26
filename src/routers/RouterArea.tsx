import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import Main from '../page/Main';
import SignIn from '../page/SignIn';

import Calendar from '../page/Calendar';
export default function RouterArea() {
    return (
        <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/calendar' element={<Calendar />} />

        </Routes>
    );
};

