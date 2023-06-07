import {combineReducers} from "redux";
import {calendarReducer} from "./calendarReducer";


export const rootReducer = combineReducers({
    calendar: calendarReducer,
})

export type RootState = ReturnType<typeof rootReducer>
