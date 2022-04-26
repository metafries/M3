import { 
    HANDLE_SELECTED_PHOTO,
    LISTEN_TO_CURRENT_USER_PROFILE, 
    LISTEN_TO_SELECTED_USER_PROFILE, 
    LISTEN_TO_USER_PHOTOS
} from "../constants/profileConst";

export function handleSelectedPhoto(photo) {
    return {
        type: HANDLE_SELECTED_PHOTO,
        payload: photo,
    }
}

export function listenToUserPhotos(photos) {
    return {
        type: LISTEN_TO_USER_PHOTOS,
        payload: photos,
    }
}

export function listenToCurrentUserProfile(profile) {
    return {
        type: LISTEN_TO_CURRENT_USER_PROFILE,
        payload: profile,
    }
}

export function listenToSelectedUserProfile(profile) {
    return {
        type: LISTEN_TO_SELECTED_USER_PROFILE,
        payload: profile,
    }
}