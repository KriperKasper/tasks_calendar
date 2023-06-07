
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
    CHANGE_TASK_IN = 'CHANGE_TASK_IN',
}
interface CalendarActionSetupCalendar {
    type: CalendarActionTypes.SETUP_CALENDAR;
    payload: CalendarState;
}
interface CalendarActionAddTask {
    type: CalendarActionTypes.ADD_TASK;
    payload: CalendarState;
}
interface CalendarActionChangeTaskIn {
    type: CalendarActionTypes.CHANGE_TASK_IN;
    payload: CalendarState;
}
export type CalendarAction = CalendarActionSetupCalendar | CalendarActionAddTask | CalendarActionChangeTaskIn;
