import { 
    TOGGLE_DRAWER,
    CLOSE_MODAL, 
    OPEN_MODAL, 
    LISTEN_TO_CHAT_COMMENT, 
    HANDLE_SELECTED_TARGET, 
    HANDLE_SCROLL_POSITION,
} from "../constants/commonConst";

const initialState = {
    scrollPosition: 0,
    selectedTarget: null,
    comments: [],
    openDrawer: false,
    modal: {
        open: false,
        body: null,
    }
}

export default function commonRdc(state = initialState, {type, payload}) {
    switch (type) {
        case HANDLE_SCROLL_POSITION:
            return {
                ...state,
                scrollPosition: payload,
            }
        case HANDLE_SELECTED_TARGET:
            return {
                ...state,
                selectedTarget: payload,
            }
        case LISTEN_TO_CHAT_COMMENT:
            return {
                ...state,
                comments: payload,
            }
        case TOGGLE_DRAWER:
            return {
                ...state,
                openDrawer: !payload,
            }
        case OPEN_MODAL:
            return {
                ...state,
                modal: {
                    open: true,
                    body: payload
                }
            }
        case CLOSE_MODAL:
            return {
                ...state,
                modal: {
                    open: false,
                    body: null,
                }            
            }
        default:
            return state;
    }
}