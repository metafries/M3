import React from 'react'
import ActivityListItem from '../cards/ActivityListItem'
import { useDispatch, useSelector } from 'react-redux'
import LoadingIndicator from '../common/utils/LoadingIndicator'
import { listenToActivitiesFromFirestore } from '../../api/firestoreService'
import { listenToActivities } from '../../actions/activityActs'
import useFirestoreCollection from '../../hooks/useFirestoreCollection'

export default function ActivityList() {
    const { loading } = useSelector(state => state.async)

    const { activities } = useSelector(state => state.activity)
    console.log(activities)

    const dispatch = useDispatch();

    useFirestoreCollection({
        query: () => listenToActivitiesFromFirestore(),
        data: activities => dispatch(listenToActivities(activities)),
        deps: [dispatch]
    })

    if (loading) return <LoadingIndicator />

    return (
        <React.Fragment>
            {
                activities.map(activity => (
                    <ActivityListItem 
                        key={activity.id} 
                        activity={activity} 
                    />
                ))
            }
        </React.Fragment>
    )
}
