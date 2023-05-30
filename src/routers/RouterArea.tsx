import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import Main from '../page/Main';
import SignIn from '../page/SignIn';
import MyPage from '../page/MyPage';

import Calendar from '../page/Calendar';
import Auth from '../hoc/Auth';
export default function RouterArea() {

    const HomePage: React.FunctionComponent = Auth(Main, null);
    const SignInPage: React.FunctionComponent = Auth(SignIn, false)
    const UserPage: React.FunctionComponent = Auth(MyPage, true);

    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/signin' element={<SignInPage />} />
            <Route path='/calendar' element={<Calendar />} />
            <Route path='/my-page' element={<UserPage />} />

        </Routes>
    );
};
