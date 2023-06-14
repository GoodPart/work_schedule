import axios from "axios";

const INCREASE_COUNT = 'calendar/INCREASE_COUNT' as const;
const DECREASE_COUNT = 'calendar/DECREASE_COUNT' as const;

const CALENDAR_STATE_LOADING = 'calendar/CALENDAR_STATE_LOADING' as const;
const CALENDAR_STATE_SUCCESS = 'calendar/CALENDAR_STATE_SUCCESS' as const;
const CALENDAR_STATE_ERROR = 'calendar/CALENDAR_STATE_ERROR' as const;

const deployURL = "http://ec2-43-201-0-7.ap-northeast-2.compute.amazonaws.com"


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

        let getAuthData = getState().authCheckReducer.auth;
        console.log(getAuthData)

        form.user.user_id = getAuthData.user_id;
        form.user.rank_title = getAuthData.rank_title
        form.user.office_name = getAuthData.office_name
        form.user.team_name = getAuthData.team_name


        try {
            const createData = await axios.post(`${deployURL}:9999/api/calendar/create`, { form }, { withCredentials: true })

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
            let getAuthData = await getState().authCheckReducer.auth;

            if (getAuthData) {
                const deleteData = await axios.post(`${deployURL}:9999/api/calendar/deletebyid`, { _id: _id }, { withCredentials: true })
                if (deleteData.data.success) {
                    dispatch({
                        type: CALENDAR_STATE_SUCCESS
                    })
                }

            }
        } catch (err) {
            console.log(err)
        }
    }
}

export function updateData(form: any): any {
    return async (dispatch: any, getState: any) => {
        dispatch({
            type: CALENDAR_STATE_LOADING
        })

        try {
            const updateData = await axios.post(`${deployURL}:9999/api/calendar/updatebyid`, form, { withCredentials: true });

            if (updateData.data.success) {
                dispatch({
                    type: CALENDAR_STATE_SUCCESS,

                })
                return updateData.data.success
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
                success: true
            }
        case CALENDAR_STATE_ERROR:
            return {
                ...state,
                loading: false,
                success: false
            }

        default:
            return state
    }
}

export default calendarReducer;