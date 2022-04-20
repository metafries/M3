import cuid from 'cuid';
import firebase from '../config/firebase'

const db = firebase.firestore();

export async function updateUserProfile(profile) {
    const user = firebase.auth().currentUser;
    try {
        if (user.displayName !== profile.displayName) {
            await user.updateProfile({
                displayName: profile.displayName
            })
        }
        return await db.collection('users').doc(user.uid).update(profile);
    } catch (error) {
        throw error;
    }
}

export function getUserProfile(userId) {
    return db.collection('users').doc(userId);
}

export function setUserProfileData(user) {
    return db.collection('users').doc(user.uid).set({
        displayName: user.displayName,
        email: user.email,
        username: user.email.slice(0, user.email.indexOf('@')),
        photoURL: user.photoURL || '/',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
}

export function dataFromSnapshot(snapshot) {
    if (!snapshot.exists) return undefined;

    const data = snapshot.data();
    for (const prop in data) {
        if (data.hasOwnProperty(prop)) {
            if (data[prop] instanceof firebase.firestore.Timestamp) {
                data[prop] = data[prop].toDate();
            }
        }
    }
    
    return {
        ...data,
        id: snapshot.id
    }
}

export function addActivityToFirestore(activity) {
    return db.collection('activities').add({
        ...activity,
        hostedBy: 'Gojo',
        hostPhotoURL: 'https://tva1.sinaimg.cn/large/0082tP5Hly1gl08cju854j30ir0p0di2.jpg',
        attendees: firebase.firestore.FieldValue.arrayUnion({
            id: cuid(),
            displayName: 'Gojo',
            photoURL: 'https://tva1.sinaimg.cn/large/0082tP5Hly1gl08cju854j30ir0p0di2.jpg'
        })
    })
}

export function cancelActivityToggle(activity) {
    return db.collection('activities').doc(activity.id).update({
        isCancelled: !activity.isCancelled
    })
}

export function deleteActivityInFirestore(activityId) {
    return db.collection('activities').doc(activityId).delete();
}

export function updateActivityInFirestore(activity) {
    return db.collection('activities').doc(activity.id).update(activity);
}

export function listenToActivityFromFirestore(activityId) {
    return db.collection('activities').doc(activityId);
}

export function listenToActivitiesFromFirestore() {
    return db.collection('activities');
}