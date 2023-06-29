
export interface GlobalState {
    calendar: CalendarState;
}
export interface CalendarState {
    days: CalendarDay[];
    month: string;
    firstDay:  number;
    error: null | string;
}
export interface CalendarDay {
    day: number;
    dayId: string;
    tasks: Task[];
    holiday: string;
}
export interface Task {
    taskId: string;
    text: string;
    priority: string;
    visible: boolean;
}
export type  Holidays = Holiday[]
export interface Holiday {
    "date": "string",
    "localName": "string",
    "name": "string",
    "countryCode": "string",
    "fixed": true,
    "global": true,
    "counties": [
    "string"
],
    "launchYear": 0,
    "types": [
    "Public"
]
}
export enum CalendarActionTypes {
    SETUP_CALENDAR = 'SETUP_CALENDAR',
    ADD_TASK = 'ADD_TASK',
    CHANGE_TASK_LOCATION = 'CHANGE_TASK_LOCATION',
    ERROR_CALENDAR = 'ERROR_CALENDAR',
}
interface CalendarActionSetupCalendar {
    type: CalendarActionTypes.SETUP_CALENDAR;
    payload: CalendarState;
}
interface CalendarActionErrorCalendar {
    type: CalendarActionTypes.ERROR_CALENDAR;
    payload:any;
}
interface CalendarActionAddTask {
    type: CalendarActionTypes.ADD_TASK;
    payload: CalendarState;
}
interface CalendarActionChangeTaskLocation {
    type: CalendarActionTypes.CHANGE_TASK_LOCATION;
    payload: CalendarState;
}
export type CalendarAction = CalendarActionSetupCalendar | CalendarActionAddTask | CalendarActionChangeTaskLocation | CalendarActionErrorCalendar;
