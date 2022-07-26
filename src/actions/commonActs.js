import { 
    TOGGLE_DRAWER,
    CLOSE_MODAL, OPEN_MODAL, LISTEN_TO_CHAT_COMMENT, HANDLE_SELECTED_TARGET, HANDLE_SCROLL_POSITION 
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

export function listenToChatComment(comments) {
    return {
        type: LISTEN_TO_CHAT_COMMENT,
        payload: comments,
    }
}

export function handleSelectedTarget(target) {
    return {
        type: HANDLE_SELECTED_TARGET,
        payload: target,
    }
}

export function handleScrollPosition(pageYOffset) {
    return {
        type: HANDLE_SCROLL_POSITION,
        payload: pageYOffset,
    }
}