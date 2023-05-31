
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

        default:
            return state
    }
}

export default calendarReducer;