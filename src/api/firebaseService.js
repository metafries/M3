import firebase from '../config/firebase'
import { setUserProfileData } from './firestoreService';

export function firebaseObjToArr(snapshot) {
    if (snapshot) {
        return Object.entries(snapshot).map(e => Object.assign({}, e[1], {id: e[0]}));
    }
}

export function getChatRef(id) {
    return firebase.database().ref(`chat/${id}`).orderByKey();
}

export function addChatComment(id, values) {
    const user = firebase.auth().currentUser;
    return firebase.database().ref(`chat/${id}`).push({
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
        text: values.comment,
        date: Date.now(),
        baseId: values.baseId,
    });
}

export function uploadPosterToStorage(auid, file, filename) {
    return firebase.storage().ref().child(`${auid}/posters/${filename}`).put(file);
}

export function deleteFromFirestoreStorage(filename) {
    const uuid = firebase.auth().currentUser.uid;
    return firebase.storage().ref().child(`${uuid}/user_images/${filename}`).delete();
}

export function uploadToFirebaseStorage(file, filename) {
    const uuid = firebase.auth().currentUser.uid;
    return firebase.storage().ref().child(`${uuid}/user_images/${filename}`).put(file);
}

export function updateUserPassword(creds) {
    return firebase.auth().currentUser.updatePassword(creds.newPwd);
}

export async function thirdPartyLogin(selectedProvider) {
    let provider;
    if (selectedProvider === 'facebook') {
        provider = new firebase.auth.FacebookAuthProvider();
    }
    if (selectedProvider === 'google') {
        provider = new firebase.auth.GoogleAuthProvider();
    }     
    try {
        const result = await firebase.auth().signInWithPopup(provider);
        console.log('thirdPartyLogin',result);
        if (result.additionalUserInfo.isNewUser) {
            await setUserProfileData(result.user);
        }
    } catch(error) {
        console.log(error);
    }
}

export function signInWithEmail(creds) {
    return firebase
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password);
}

export function signOutFirebase() {
    return firebase.auth().signOut();
}

export async function registerInFirebase(creds) {
    try {
        const result = await firebase
            .auth()
            .createUserWithEmailAndPassword(
                creds.email,
                creds.password,
            )
        await result.user.updateProfile({
            displayName: creds.displayName,
        })
        return await setUserProfileData(result.user);
    } catch (error) {
        throw error;
    }
}