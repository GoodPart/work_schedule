import axios from "axios";

const INCREASE_COUNT = 'calendar/INCREASE_COUNT' as const;
const DECREASE_COUNT = 'calendar/DECREASE_COUNT' as const;

const CALENDAR_STATE_LOADING = 'calendar/CALENDAR_STATE_LOADING' as const;
const CALENDAR_STATE_SUCCESS = 'calendar/CALENDAR_STATE_SUCCESS' as const;
const CALENDAR_STATE_ERROR = 'calendar/CALENDAR_STATE_ERROR' as const;

const initState = {
    month_count: 0,
    y: 0,
    m: 0,
    loading: false,
    error: null,
    success: false,

};

export function increaseMonth() {

}

export function insertData(form: any): any {
    return async (dispatch: any, getState: any) => {
        dispatch({
            type: CALENDAR_STATE_LOADING
        });

        try {
            console.log('action ->', form)
            const createData = await axios.post("http://localhost:9999/api/calendar/create", { form }, { withCredentials: true })

            if (createData.data.success) {
                dispatch({
                    type: CALENDAR_STATE_SUCCESS
                })

            }
        } catch (err) {
            console.log(err)
        }
    }
}

export function deleteData(_id: any): any {
    return async (dispatch: any, getState: any) => {

        // console.log(_id)
        dispatch({
            type: CALENDAR_STATE_LOADING
        })


        try {
            const deleteData = await axios.post("http://localhost:9999/api/calendar/deletebyid", { _id: _id }, { withCredentials: true })

            if (deleteData.data.success) {
                dispatch({
                    type: CALENDAR_STATE_SUCCESS
                })
            }

        } catch (err) {
            console.log(err)
        }
    }
}

export function calendarReducer(state = initState, action: any): any {
    switch (action.type) {
        case INCREASE_COUNT:
            return {
                ...state,
                month_count: state.month_count + 1
            }
        case DECREASE_COUNT:
            return {
                ...state,
                month_count: state.month_count - 1
            }
        case CALENDAR_STATE_LOADING:
            return {
                ...state,
                loading: true,
            }
        case CALENDAR_STATE_SUCCESS:
            return {
                ...state,
                loading: false,
            }

        default:
            return state
    }
}

export default calendarReducer;