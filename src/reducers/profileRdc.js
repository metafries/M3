import { 
    HANDLE_SELECTED_PHOTO,
    LISTEN_TO_CURRENT_USER_PROFILE, 
    LISTEN_TO_SELECTED_USER_PROFILE, 
    LISTEN_TO_USER_PHOTOS
} from "../constants/profileConst";

const initialState = {
    selectedPhoto: null,
    uploadedPhotos: [],
    currentUserProfile: null,
    selectedUserProfile: null,
}

export default function profileRdc(state = initialState, {type, payload}) {
    switch (type) {
        case HANDLE_SELECTED_PHOTO:
            return {
                ...state,
                selectedPhoto: payload,
            }
        case LISTEN_TO_USER_PHOTOS: 
            console.log('LISTEN_TO_USER_PHOTOS', payload)
            return {
                ...state,
                uploadedPhotos: payload,
            }
        case LISTEN_TO_CURRENT_USER_PROFILE:
            return {
                ...state,
                currentUserProfile: payload,
            }
        case LISTEN_TO_SELECTED_USER_PROFILE:
            return {
                ...state,
                selectedUserProfile: payload,
            }
        default: 
            return state
    }
}