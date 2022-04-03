import { 
    TOGGLE_ACTIVITY_FORM,
    HANDLE_SELECTED,
    HANDLE_MENU_CLICK,
    HANDLE_MENU_CLOSE,
    CREATE_ACTIVITY, 
    DELETE_ACTIVITY, 
    UPDATE_ACTIVITY 
} from "../constants/activityConst";

export function toggleActivityForm() {
    return {
        type: TOGGLE_ACTIVITY_FORM,
        payload: null
    }
}

export function handleSelected(activity) {
    return {
        type: HANDLE_SELECTED,
        payload: activity
    }
}

export function handleMenuClick(e) {
    return {
        type: HANDLE_MENU_CLICK,
        payload: e
    }
}

export function handleMenuClose() {
    return {
        type: HANDLE_MENU_CLOSE,
        payload: null,
    }
}

export function createActivity(activity) {
    return {
        type: CREATE_ACTIVITY,
        payload: activity
    }
}

export function updateActivity(activity) {
    return {
        type: UPDATE_ACTIVITY,
        payload: activity
    }
}

export function deleteActivity(activityId) {
    return {
        type: DELETE_ACTIVITY,
        payload: activityId
    }
}