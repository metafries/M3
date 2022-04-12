import { 
    TOGGLE_ACTIVITY_FORM,
    HANDLE_SELECTED,
    HANDLE_MENU_CLICK,
    HANDLE_MENU_CLOSE,
    CREATE_ACTIVITY, 
    DELETE_ACTIVITY, 
    UPDATE_ACTIVITY, 
    FETCH_ACTIVITIES
} from "../constants/activityConst";
import { asyncActionStart, asyncActionError, asyncActionFinish } from '../reducers/asyncRdc'
import { fetchSampleData } from '../api/mockApi'

export function loadActivities() {
    return async function(dispatch) {
        dispatch(asyncActionStart());
        try {
            const activities = await fetchSampleData();
            dispatch({type: FETCH_ACTIVITIES, payload: activities});
            dispatch(asyncActionFinish());
        } catch (error) {
            dispatch(asyncActionError(error));
        }
    }
}

export function listenToActivities(activities) {
    return {
        type: FETCH_ACTIVITIES,
        payload: activities
    }
}

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