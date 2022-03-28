import { sampleData } from "../api/sampleData";
import { CREATE_ACTIVITY, UPDATE_ACTIVITY, DELETE_ACTIVITY, HANDLE_MENU_CLICK, HANDLE_SELECTED, HANDLE_MENU_CLOSE } from "../constants/activityConst";

const initialState = {
    activities: sampleData,
    anchorEl: null,
    selectedActivity: null,
}

export default function activityRdc(state = initialState, {type, payload}) {
    switch (type) {
        case HANDLE_SELECTED:
            return {
                ...state,
                selectedActivity: payload
            }
        case HANDLE_MENU_CLICK:
            console.log(state.selectedActivity)
            return {
                ...state,
                anchorEl: payload.currentTarget
            }
        case HANDLE_MENU_CLOSE:
            return {
                ...state,
                anchorEl: null,
            }
        case CREATE_ACTIVITY:
            return {
                ...state,
                activities: [...state.activities, payload]
            };
        case UPDATE_ACTIVITY:
            return {
                ...state,
                activities: [...state.activities.filter(a => a.id !== payload.id), payload]
            }
        case DELETE_ACTIVITY:
            return {
                ...state,
                activities: [...state.activities.filter(a => a.id !== payload)]
            }
        default:
            return state;
    }
}