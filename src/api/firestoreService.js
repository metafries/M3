import cuid from 'cuid';
import firebase from '../config/firebase'
import { uploadPosterToStorage } from './firebaseService';

const db = firebase.firestore();

export function deletePhotoFromCollection(photoId) {
    const uuid = firebase.auth().currentUser.uid;
    return db.collection('users').doc(uuid).collection('photos').doc(photoId).delete();
}

export async function setMainPhoto(photo) {
    const user = firebase.auth().currentUser;
    try {
        await db.collection('users').doc(user.uid).update({
            photoURL: photo.url,
        })
        return user.updateProfile({
            photoURL: photo.url,
        })
    } catch (error) {
        throw error;
    }
}

export function getUserPhotos(uuid) {
    return db.collection('users').doc(uuid).collection('photos');
}     

export async function updateUserProfilePhoto(downloadURL, filename) {
    const user = firebase.auth().currentUser;
    const userDocRef = db.collection('users').doc(user.uid); 
    try {
        const userDoc = await userDocRef.get();
        if (userDoc.data().photoURL === '/') {
            await userDocRef.update({
                photoURL: downloadURL,
            });
            await user.updateProfile({
                photoURL: downloadURL,
            })
        }
        return await userDocRef.collection('photos').add({
            name: filename,
            url: downloadURL,
            uploadedAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
    } catch (error) {
        throw error;
    }
}

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

export function getUserProfile(uid) {
    return db.collection('users').doc(uid);
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
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        hostedBy: 'Gojo',
        hostPhotoURL: 'https://tva1.sinaimg.cn/large/0082tP5Hly1gl08cju854j30ir0p0di2.jpg',
        attendees: firebase.firestore.FieldValue.arrayUnion({
            id: cuid(),
            displayName: 'Gojo',
            photoURL: 'https://tva1.sinaimg.cn/large/0082tP5Hly1gl08cju854j30ir0p0di2.jpg'
        })
    })
}

export async function setActivityPoster(auid, downloadURL, filename) {
    const d_ref = db.collection('activities').doc(auid);
    try {
        await d_ref.update({
            posterURL: downloadURL,
        })
        return await d_ref.collection('posters').add({
            name: filename,
            url: downloadURL,
            uploadedAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
    } catch (error) {
        throw error
    }
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