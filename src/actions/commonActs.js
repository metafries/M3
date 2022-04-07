import { 
    TOGGLE_DRAWER,
    CLOSE_MODAL, OPEN_MODAL 
} from "../constants/commonConst";

export function toggleDrawer(payload) {
    return {
        type: TOGGLE_DRAWER,
        payload: payload,
    }
}

export function openModal(content) {
    return {
        type: OPEN_MODAL,
        payload: content
    }
}

export function closeModal() {
    return {
        type: CLOSE_MODAL,
        payload: null,
    }
}