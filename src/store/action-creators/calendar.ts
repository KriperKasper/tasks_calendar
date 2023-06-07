import {
    CalendarAction,
    CalendarActionTypes,
    CalendarDay,
    GlobalState,
    Holidays,
    Task
} from "../../types/calendar";
import {Dispatch} from "redux";
import axios, {AxiosResponse} from "axios";
import {fetchGeo} from "../helper";
import moment from "moment/moment";

const tasks: Task[] = [{
    taskId: '1',
    text: 'Task 1',
    priority: 'danger',
    visible: true,
}, {
    taskId: '2',
    text: 'Task 2',
    priority: 'success',
    visible: true,
},
    {
        taskId: '3',
        text: 'Task 3',
        priority: 'primary',
        visible: true,
    }]
export const calendarSetup = () => {
    return async (dispatch: Dispatch<CalendarAction>) => {
        try {
            const AvailableCountries = await axios.get('https://date.nager.at/api/v3/AvailableCountries')
            const country = await fetchGeo();
            const days = [];
            const currentCountry:
                {
                    "countryCode": "string",
                    "name": "string"
                } = {...AvailableCountries.data.find((item: { name: string }) => item.name === country)};
            if (currentCountry) {
                const calendarInfo: AxiosResponse<Holidays> = await axios.get(`https://date.nager.at/api/v3/PublicHolidays/${moment().format("YYYY")}/${currentCountry.countryCode}`)
                for (let i = 1; i <= moment().daysInMonth(); i++) {
                    const currentDay = moment(new Date(moment().year(), moment().month(), i)).format("YYYY-MM-DD");
                    let holiday = ""
                    for (let j = 0; j < calendarInfo.data.length; j++) {
                        if (calendarInfo.data[j].date === currentDay) {
                            holiday = calendarInfo.data[j].name;
                        }
                    }
                    if (i === 1){
                        days.push({day: i, dayId: "day" + i, tasks: tasks, holiday: holiday});
                    }else{
                        days.push({day: i, dayId: "day" + i, tasks: [], holiday: holiday});
                    }

                }
                dispatch({
                    type: CalendarActionTypes.SETUP_CALENDAR,
                    payload: {
                        days,
                        month: moment().format("MMM-YYYY"),
                        firstDay: moment().startOf('month').day(),
                        error: null
                    }
                });
            } else {
                for (let i = 1; i <= moment().daysInMonth(); i++) {
                    days.push({day: i, dayId: "day" + i, tasks: [], holiday: ""});
                }
                dispatch({
                    type: CalendarActionTypes.SETUP_CALENDAR,
                    payload: {
                        days,
                        month: moment().format("MMM-YYYY"),
                        firstDay: moment().startOf('month').day(),
                        error: null
                    }
                });
            }
        } catch (e) {
        }
    }
}
export const filterTask = (filter: string, value: string) => {
    return async (dispatch: Dispatch<CalendarAction>, getState: () => GlobalState) => {
        const state = getState();
        try {
            if (filter === "byName") {
                const newTasks = state.calendar.days.map((item: CalendarDay) => {
                    item.tasks = item.tasks.map((task: any) => {
                        task.visible = task.priority === value;
                        return task;
                    })
                    return item;

                });
                dispatch({type: CalendarActionTypes.ADD_TASK, payload: {...state.calendar, days: newTasks}});
            } else if (filter === "byText") {
                console.log(filter, value);
                const newTasks = state.calendar.days.map((item: CalendarDay) => {
                    item.tasks = item.tasks.map((task: any) => {

                        task.visible = !!task.text.toLowerCase().match(value.toLowerCase());
                        return task;
                    })
                    return item;

                });
                dispatch({type: CalendarActionTypes.ADD_TASK, payload: {...state.calendar, days: newTasks}});
            }

        } catch (e) {
        }
    }
}
export const addTask = (payload: { dayId: string; task: Task; }) => {
    return async (dispatch: Dispatch<CalendarAction>, getState: () => GlobalState) => {
        const state = getState();
        const {dayId, task} = payload;
        try {
            const newTasks = state.calendar.days.map((item: CalendarDay) => {
                if (item.dayId === dayId) {
                    item.tasks.push(task);
                    item.tasks = item.tasks.map((item: any) => item)
                    return item;
                }
                return item;
            });
            dispatch({type: CalendarActionTypes.ADD_TASK, payload: {...state.calendar, days: newTasks}});
        } catch (e) {
        }
    }
}
export const changeTaskIn = (payload: {
    start: number;
    draggableId: number;
    end: number;
    day: string;
    sourceDest?: string
}) => {
    return async (dispatch: Dispatch<CalendarAction>, getState: () => GlobalState) => {
        const state = getState();
        const {day, start, end, draggableId, sourceDest = null} = payload;
        try {
            if (sourceDest) {
                let element: any;
                let newTasks = state.calendar.days.map((item: CalendarDay) => {
                    if (item.dayId === day) {
                        element = item.tasks.splice(start, 1);
                        item.tasks = item.tasks.map((item: any) => item)
                        return item;
                    }
                    return item;
                });
                newTasks = newTasks.map((item: CalendarDay) => {
                    if (item.dayId === sourceDest && element) {
                        item.tasks.splice(end, 0, ...element)
                        item.tasks = item.tasks.map((item: any) => item)
                    }
                    return item;
                });
                dispatch({type: CalendarActionTypes.CHANGE_TASK_IN, payload: {...state.calendar, days: newTasks}});
            } else {
                const newTasks = state.calendar.days.map((item: CalendarDay) => {
                    if (item.dayId === day) {
                        const element = item.tasks.splice(start, 1);
                        item.tasks.splice(end, 0, ...element);
                        item.tasks = item.tasks.map((item: any) => item)
                        return item;
                    }
                    return item;
                });
                dispatch({type: CalendarActionTypes.CHANGE_TASK_IN, payload: {...state.calendar, days: newTasks}});
            }
        } catch (e) {
        }
    }
}