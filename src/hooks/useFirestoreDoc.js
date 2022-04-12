import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { dataFromSnapshot } from "../api/firestoreService";
import { asyncActionError, asyncActionFinish, asyncActionStart } from "../reducers/asyncRdc";

export default function useFirestoreDoc({query, data, deps}) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncActionStart());
        const unsubscribe = query().onSnapshot(
            snapshot => {
                if (!snapshot.exists) {
                    dispatch(asyncActionError({
                        code: '404',
                        message: 'Not found.'
                    }));
                    return
                }
                data(dataFromSnapshot(snapshot));
                dispatch(asyncActionFinish());
            },
            error => dispatch(asyncActionError(error))
        );
        return () => unsubscribe()
    }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}