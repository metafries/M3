import { CLOSE_MODAL, OPEN_MODAL } from "../constants/commonConst";

const initialState = {
    modal: {
        open: false,
        body: null,
    }
}

export default function commonRdc(state = initialState, {type, payload}) {
    switch (type) {
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