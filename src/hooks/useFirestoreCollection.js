import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataFromSnapshot } from "../api/firestoreService";
import { asyncActionError, asyncActionFinish, asyncActionStart } from "../reducers/asyncRdc";

export default function useFirestoreCollection({query, data, deps}) {
    const dispatch = useDispatch();
    const { activities } = useSelector(state => state.activity)

    useEffect(() => {  
        if (activities.length <= 1) {
            dispatch(asyncActionStart());
            const unsubscribe = query().onSnapshot(
                snapshot => {
                    data(snapshot.docs.map(d => dataFromSnapshot(d)));
                    dispatch(asyncActionFinish());
                },
                error => dispatch(asyncActionError(error))
            );
            return () => unsubscribe()  
        }
    }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}