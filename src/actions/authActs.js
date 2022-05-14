import { SIGN_IN_USER, SIGN_OUT_USER } from "../constants/authConst";
import firebase from '../config/firebase'
import { APP_LOADED } from "../reducers/asyncRdc";
import { dataFromSnapshot, getUserProfile } from "../api/firestoreService";
import { listenToCurrentUserProfile } from "./profileActs";

export function verifyAuth() {
    return function (dispatch) {
        return firebase.auth().onAuthStateChanged(user => {
            if (user) {
                dispatch(signInUser(user))
                getUserProfile(user.uid).onSnapshot(snapshot => {
                    dispatch(listenToCurrentUserProfile(dataFromSnapshot(snapshot)));
                    dispatch({type: APP_LOADED})
                });                
            } else {
                dispatch(signOutUser())
                dispatch({type: APP_LOADED})
            }
        })
    }
}

export function signInUser(user) {
    return {
        type: SIGN_IN_USER,
        payload: user
    }
}

export function signOutUser() {
    return {
        type: SIGN_OUT_USER
    }
}