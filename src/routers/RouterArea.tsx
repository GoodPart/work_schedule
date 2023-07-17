import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import Main from '../page/Main';
import SignIn from '../page/sign_in/container_component/SignIn';
import SignUp from '../page/sign_up/container_component/Signup';
import MyPage from '../page/mypage/container_component/MyPage';
import Poll from '../page/poll/container_component/Poll';
import Setting from '../page/Setting';

import Calendar from '../page/Calendar';
import Auth from '../hoc/Auth';
export default function RouterArea(modeColor: any) {

    const _modeColor = Object.values(modeColor)[0];

    const HomePage: React.FunctionComponent = Auth(Main, null, _modeColor);
    const SignInPage: React.FunctionComponent = Auth(SignIn, false, _modeColor)
    const UserPage: React.FunctionComponent = Auth(MyPage, true, _modeColor);
    const CalendarPage: React.FunctionComponent = Auth(Calendar, null, _modeColor);
    const SettingPage: React.FunctionComponent = Auth(Setting, null);
    const SignUpPage: React.FunctionComponent = Auth(SignUp, false, _modeColor);
    const PollPage: React.FunctionComponent = Auth(Poll, null, _modeColor);

    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/signin' element={<SignInPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/calendar' element={<CalendarPage />} />
            <Route path='/my-page' element={<UserPage />} />
            <Route path='/poll' element={<PollPage />} />
            <Route path='/setting' element={<SettingPage />} />
        </Routes>
    );
};

