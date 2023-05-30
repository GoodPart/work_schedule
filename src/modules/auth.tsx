import axios from "axios";

const AUTH_URL = '/api/users/auth' as const;

const AUTH_CHECK = 'auth/AUTH_CHECK' as const;

const initState = {
    auth: '',
}

export function authCheckToServer(info: any): any {
    return {
        type: AUTH_CHECK,
        payload: info
    }
}

export function authCheckReducer(state = initState, action: any): any {
    switch (action.type) {
        case AUTH_CHECK:
            return {
                ...state,
                auth: action.payload
            }

        default:
            return state;
    }
}

export default authCheckReducer