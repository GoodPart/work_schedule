import { combineReducers } from 'redux';
import registerReducer from './register';
import authCheckReducer from './auth';
import calendarReducer from './calendar';
import systemReducer from './system';

const rootReducer = combineReducers({
    registerReducer,
    authCheckReducer,
    calendarReducer,
    systemReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;