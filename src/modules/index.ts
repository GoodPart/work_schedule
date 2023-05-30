import { combineReducers } from 'redux';
import registerReducer from './register';
import authCheckReducer from './auth';

const rootReducer = combineReducers({
    registerReducer,
    authCheckReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;