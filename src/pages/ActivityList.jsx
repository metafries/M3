import React from 'react'
import ActivityListItem from '../cards/ActivityListItem'

export default function ActivityList({ activities }) {
    return (
        <React.Fragment>
            {
                activities.map(activity => (
                    <ActivityListItem key={activity.id} activity={activity} />
                ))
            }
        </React.Fragment>
    )
}
