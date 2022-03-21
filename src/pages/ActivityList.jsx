import React, { useState } from 'react'
import ActivityListItem from '../cards/ActivityListItem'
import { sampleData } from '../api/sampleData'

export default function ActivityList() {
    const [activities, setActivities] = useState(sampleData);

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
