import { sampleData } from "../api/sampleData";
import { 
    TOGGLE_ACTIVITY_FORM,
    CREATE_ACTIVITY, 
    UPDATE_ACTIVITY, 
    DELETE_ACTIVITY, 
    HANDLE_MENU_CLICK, 
    HANDLE_SELECTED, 
    HANDLE_MENU_CLOSE, 
    FETCH_ACTIVITIES,
    SEARCH_ACTIVITY
} from "../constants/activityConst";

const initialState = {
    filter: {
        type: 0,
        range: 'all',
    },
    activities: [],
    anchorEl: null,
    selectedActivity: null,
    activityForm: false,
}

export default function activityRdc(state = initialState, {type, payload}) {
    switch (type) {
        case FETCH_ACTIVITIES:
            return {
                ...state,
                activities: payload
            }
        case TOGGLE_ACTIVITY_FORM:
            return {
                ...state,
                activityForm: !state.activityForm
            }
        case SEARCH_ACTIVITY:
            return {
                ...state,
                filter: payload,
            }
        case HANDLE_SELECTED:
            return {
                ...state,
                selectedActivity: payload
            }
        case HANDLE_MENU_CLICK:
            console.log(state.selectedActivity)
            return {
                ...state,
                anchorEl: payload
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