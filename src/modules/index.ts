import { combineReducers } from 'redux';
import registerReducer from './register';
import authCheckReducer from './auth';
import calendarReducer from './calendar';

const rootReducer = combineReducers({
    registerReducer,
    authCheckReducer,
    calendarReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;