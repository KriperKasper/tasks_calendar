import {CalendarAction, CalendarActionTypes, CalendarState} from "../../types/calendar";


const initialState: CalendarState = {
    days: [],
    firstDay:0,
    month: '',
    error: null
}

export const calendarReducer = (state = initialState, action: CalendarAction): CalendarState => {
    switch (action.type) {
        case CalendarActionTypes.SETUP_CALENDAR:
            return {...state, month: action.payload.month, days: action.payload.days, firstDay: action.payload.firstDay, error: null}
        case CalendarActionTypes.ADD_TASK:
            return {...state, days: action.payload.days}
        case CalendarActionTypes.CHANGE_TASK_IN:
            return {...state, days: action.payload.days}
        default:
            return state
    }
}
