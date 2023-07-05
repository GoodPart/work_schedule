import axios from "axios";

const SYSTEM_IU_SIMPLE = 'system/SYSTEM_IU_SIMPLE' as const;
const SYSTEM_IU_THEMECOLOR = 'system/SYSTEM_IU_THEMECOLOR' as const;
const SYSTEM_IU_SORT = 'system/SYSTEM_IU_SORT' as const;

const SYSTEM_IU_OTHERSORT = 'system/SYSTEM_IU_OTHERSORT' as const;

const LOADING = 'system/LOADING' as const;
const ERROR = 'system/ERROR' as const;
const SUCCESS = 'system/SUCCESS' as const;

const initState = {
    calendar_simple: false,
    theme_color: false,
    sortState: {
        type: 'all',
        value: '',
    },
    loading: false,
    success: false,
}


export function systemUpdateSimple(): any {
    return async (dispatch: any, getState: any) => {
        dispatch({
            type: LOADING
        })

        let getSimple = getState().systemReducer.calendar_simple;

        try {
            dispatch({
                type: SYSTEM_IU_SIMPLE,
                payload: getSimple === true ? false : true
            })
            dispatch({
                type: SUCCESS
            })


        } catch (err) {
            console.log(err)
        }
    }
}
export function systemUpdateThemeColor(): any {
    return async (dispatch: any, getState: any) => {
        dispatch({
            type: LOADING
        })

        let getTheme = getState().systemReducer.theme_color;

        try {
            dispatch({
                type: SYSTEM_IU_THEMECOLOR,
                payload: !getTheme
            })

            dispatch({
                type: SUCCESS
            })
        } catch (err) {
            console.log(err)
        }
    }
}
export function systemUpdateSort(state: string): any {
    return async (dispatch: any, getState: any) => {
        dispatch({
            type: LOADING
        })
        const _getState = getState().systemReducer.sortState;
        try {
            dispatch({
                type: SYSTEM_IU_SORT,
                payload: {
                    type: state,
                    value: _getState.value
                }
            })

            dispatch({
                type: SUCCESS
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export function systemUpdateOtherSort(value: string): any {
    return async (dispatch: any, getState: any) => {
        dispatch({
            type: LOADING
        })

        const _getState = getState().systemReducer.sortState;
        try {
            dispatch({
                type: SYSTEM_IU_OTHERSORT,
                payload: {
                    type: _getState.type,
                    value: value
                }

            })

            dispatch({
                type: SUCCESS
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export function systemReducer(state = initState, action: any): any {
    switch (action.type) {
        case SYSTEM_IU_SIMPLE:
            return {
                ...state,
                calendar_simple: action.payload
            }
        case SYSTEM_IU_THEMECOLOR:
            return {
                ...state,
                theme_color: action.payload
            }
        case SYSTEM_IU_SORT:
            return {
                ...state,
                sortState: {
                    type: action.payload.type,
                    value: action.payload.value
                }
            }
        case SYSTEM_IU_OTHERSORT:
            return {
                ...state,
                sortState: {
                    type: action.payload.type,
                    value: action.payload.value
                }
            }
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

        default:
            return state
    }
}
export default systemReducer;