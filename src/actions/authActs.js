import { THIRD_PARTY, SIGN_IN_USER, SIGN_OUT_USER } from "../constants/authConst";

export function thirdParty() {
    return {
        type: THIRD_PARTY
    }
}

export function signInUser(payload) {
    return {
        type: SIGN_IN_USER,
        payload
    }
}

export function signOutUser() {
    return {
        type: SIGN_OUT_USER
    }
}