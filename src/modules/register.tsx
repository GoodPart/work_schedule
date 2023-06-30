import axios from "axios";

const SIGN_IN_URL = '/api/users/login' as const;
const SIGN_UP_URL = '/api/users/signup' as const;
const SIGN_OUT_URL = 'api/users/logout' as const;
const REGISTE_UPDATE_URL = '/api/users/modify' as const;
const REGISTE_COLLECTION_READ_URL = '/api/collection/read' as const;

//액션 타입
const SIGN_IN = 'sign/SIGN_IN' as const;
const SIGN_UP = 'sign/SIGN_UP' as const;
const SIGN_OUT = 'sign/SIGN_OUT' as const;
const REGISTE_UPDATE = 'registe/REGISTE_UPDATE' as const;

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

export function registeUpdate(newForm: any): any {

    return async (dispatch: any, getState: any) => {
        dispatch({
            type: LOADING
        })

        let getAuthData = getState().authCheckReducer.auth;
        // console.log('getAuth->', )





        let data = await axios.post(`http://localhost:9999${REGISTE_UPDATE_URL}`, newForm, { withCredentials: true });

        if (data.data.success) {
            dispatch({
                type: SUCCESS
            })
            return {
                payload: data.data.success
            }

        }

    }
}

export function registerSignUp(form: any): any {

    return async (dispatch: any, getState: any) => {

        dispatch({
            type: LOADING,
        })
        let data = await axios.post(`http://localhost:9999${SIGN_UP_URL}`, form, { withCredentials: true });

        if (data.data.success) {
            dispatch({
                type: SUCCESS
            });
            return {
                type: SIGN_UP,
                payload: data.data.success
            }
        } else {
            return {
                payload: data.data.success
            }
        }
    }
}

export function collectionRead(number: any): any {
    return async (dispatch: any) => {
        dispatch({
            type: LOADING
        })
        let getData = await axios.get(`http://localhost:9999${REGISTE_COLLECTION_READ_URL}/${number}`, { withCredentials: true });
        try {
            dispatch({
                type: SUCCESS,
                payload: getData.data
            })
            return {
                payload: getData.data
            }
        } catch (err) {
            console.log(err)
        }
    }

}
// 액션 함수
export function registerSignIn(form: any): any {
    let data = axios.post(`http://localhost:9999${SIGN_IN_URL}`, form, { withCredentials: true });
    let result = data.then(res => res.data);

    return {
        type: SIGN_IN,
        payload: result
    }

}


export function signInAction(form: any): any {
    return async (dispatch: any, getState: any) => {
        let request = await axios.post(`http://localhost:9999${SIGN_IN_URL}`, form, { withCredentials: true });

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
            const result = await axios.get("http://localhost:9999/api/users/logout", { withCredentials: true })
            if (result.data.success) {
                console.log('-0-->', result.data)
                dispatch({
                    type: SUCCESS,
                })

                return result.data.success
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
                success: true,
                payload: action.payload
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
        case REGISTE_UPDATE:
            return {
                ...state,
                payload: action.payload
            }
        case SIGN_UP:
            return {

            }
        case SIGN_OUT:
            return {
                ...state,

            }
        default:
            return state
    }
}
export default registerReducer;