import firebase from '../config/firebase'

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

export async function removeInterestedUser(activity) {
    const user = firebase.auth().currentUser;
    const d_ref = db.collection('activities').doc(activity.id);
    try {
        return d_ref.update({
            interestedIds: firebase.firestore.FieldValue.arrayRemove(user.uid),
            interested: (await d_ref.get()).data().interested.filter(a => a.id !== user.uid),
        })
    } catch (error) {
        throw error;
    }
}

export function addInterestedUser(activity) {
    const user = firebase.auth().currentUser;
    const username = user.email.slice(0, user.email.indexOf('@'));
    return db.collection('activities').doc(activity.id).update({
        interested: firebase.firestore.FieldValue.arrayUnion({
            id: user.uid,
            username: username,
            displayName: user.displayName,
            photoURL: user.photoURL,
        }),
        interestedIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
    })
}

export async function cancelUserAttendance(activity) {
    const user = firebase.auth().currentUser;
    const d_ref = db.collection('activities').doc(activity.id);
    try {
        return d_ref.update({
            attendeeIds: firebase.firestore.FieldValue.arrayRemove(user.uid),
            attendees: (await d_ref.get()).data().attendees.filter(a => a.id !== user.uid),
        })
    } catch (error) {
        throw error;
    }
}

export function addUserAttendance(activity) {
    const user = firebase.auth().currentUser;
    const username = user.email.slice(0, user.email.indexOf('@'));
    return db.collection('activities').doc(activity.id).update({
        attendees: firebase.firestore.FieldValue.arrayUnion({
            id: user.uid,
            username: username,
            displayName: user.displayName,
            photoURL: user.photoURL,
        }),
        attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
    })
}

export function addActivityToFirestore(activity) {
    const user = firebase.auth().currentUser;
    const username = user.email.slice(0, user.email.indexOf('@'));
    return db.collection('activities').add({
        ...activity,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        hostUid: user.uid,
        hostedBy: username,
        hostPhotoURL: user.photoURL,
        attendees: firebase.firestore.FieldValue.arrayUnion({
            id: user.uid,
            username: username,
            displayName: user.displayName,
            photoURL: user.photoURL,
        }),
        attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
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

export function getUserActivities(uuid, filter) {
    const ref = db.collection('activities');
    switch (filter.range) {
        case 'hosting':
            return ref.where('hostUid', '==', uuid);
        case 'going':
            return ref.where('attendeeIds', 'array-contains', uuid);
        case 'interested':
            return ref.where('interestedIds', 'array-contains', uuid);
        default:
            return ref;
    }    
}

export function listenToActivitiesFromFirestore(filter) {
    console.log('SEARCHENGINE', filter);
    switch (filter.type) {
        case 0:
            return db.collection('activities');
        default:
            return db.collection('activities');
    }    
}