import axios from "axios";

const SIGN_IN_URL = '/api/users/login' as const;
const SIGN_UP_URL = '/api/users/signup' as const;
const SIGN_OUT_URL = 'api/users/logout' as const;

//액션 타입
const SIGN_IN = 'sign/SIGN_IN' as const;
const SIGN_UP = 'sign/SIGN_UP' as const;
const SIGN_OUT = 'sign/SIGN_OUT' as const;

//init state
const initState = {
    login: false,
}

// 액션 함수
export function registerSignIn(form: any): any {
    let data = axios.post(`http://localhost:9999${SIGN_IN_URL}`, form);
    let result = data.then(res => res.data);
    return {
        type: SIGN_IN,
        payload: result
    }
}



export function registerReducer(state = initState, action: any): any {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                login: action.payload.success,
            }
        case SIGN_UP:
            return {

            }
        case SIGN_OUT:
            return {

            }
        default:
            return state
    }
}
export default registerReducer;