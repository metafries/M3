import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { dataFromSnapshot } from "../api/firestoreService";
import { asyncActionError, asyncActionFinish, asyncActionStart } from "../reducers/asyncRdc";

export default function useFirestoreCollection({query, data, deps}) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncActionStart());
        const unsubscribe = query().onSnapshot(
            snapshot => {
                data(snapshot.docs.map(d => dataFromSnapshot(d)));
                dispatch(asyncActionFinish());
            },
            error => dispatch(asyncActionError(error))
        );
        return () => unsubscribe()
    }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}