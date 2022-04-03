import { THIRD_PARTY, SIGN_IN_USER, SIGN_OUT_USER } from "../constants/authConst";

const initialState = {
    authenticated: true,
    currentUser: null,
}

export default function authRdc(state = initialState, {type, payload}) {
    switch (type) {
        case THIRD_PARTY:
            return {
                ...state,
                authenticated: true,
                currentUser: {
                    email: '',
                    photoURL: '/',
                }
            }
        case SIGN_IN_USER:
            return {
                ...state,
                authenticated: true,
                currentUser: {
                    email: payload.email,
                    photoURL: '/',
                }
            }
        case SIGN_OUT_USER:
            return {
                ...state,
                authenticated: false,
                currentUser: null,
            }
        default:
            return state
    }
}