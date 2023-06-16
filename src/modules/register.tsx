import axios from "axios";

const SIGN_IN_URL = '/api/users/login' as const;
const SIGN_UP_URL = '/api/users/signup' as const;
const SIGN_OUT_URL = 'api/users/logout' as const;

//액션 타입
const SIGN_IN = 'sign/SIGN_IN' as const;
const SIGN_UP = 'sign/SIGN_UP' as const;
const SIGN_OUT = 'sign/SIGN_OUT' as const;

const LOADING = 'process/LOADING' as const;
const ERROR = 'process/ERROR' as const;
const SUCCESS = 'process/SUCCESS' as const;


//init state
const initState = {
    login: false,
    loading: false,
    error: null,
    success: false,
    auth: ''
}

export function registerSignUp(form: any): any {

    return async (dispatch: any, getState: any) => {

        dispatch({
            type: LOADING,
        })
        let data = await axios.post(`http://43.201.147.161:9999${SIGN_UP_URL}`, form, { withCredentials: true });

        if (data.data.success) {
            dispatch({
                type: SUCCESS
            });
            return {
                type: SIGN_UP,
                payload: data.data.success
            }
        }
    }
}

// 액션 함수
export function registerSignIn(form: any): any {
    let data = axios.post(`http://43.201.147.161:9999${SIGN_IN_URL}`, form, { withCredentials: true });
    let result = data.then(res => res.data);

    return {
        type: SIGN_IN,
        payload: result
    }

}


export function signInAction(form: any): any {
    return async (dispatch: any, getState: any) => {
        let request = await axios.post(`http://43.201.147.161:9999${SIGN_IN_URL}`, form, { withCredentials: true });

        dispatch({
            type: LOADING
        })
        try {

            if (request.data.success) {
                dispatch({
                    type: SIGN_IN
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
}

export function signOutAction(): any {
    return async (dispatch: any, getState: any) => {
        dispatch({
            type: LOADING
        })
        try {
            const result = await axios.get("http://43.201.147.161:9999/api/users/logout", { withCredentials: true })
            if (result.data.success) {
                dispatch({
                    type: SUCCESS
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
}


export function registerReducer(state = initState, action: any): any {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: true,
                error: null,
                success: false
            }
        case SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                success: true
            }
        case ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: true
            }
        case SIGN_IN:
            return {
                ...state,
                login: action.payload.success,
                loading: false
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