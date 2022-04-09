import React, { useState } from 'react'
import ActivityListItem from '../cards/ActivityListItem'
import { sampleData } from '../../api/sampleData'
import { useSelector } from 'react-redux'
import ActivityMenu from '../nav/ActivityMenu'
import LoadingIndicator from '../common/utils/LoadingIndicator'

export default function ActivityList() {
    const { loading } = useSelector(state => state.async)

    const { activities } = useSelector(state => state.activity)
    console.log(activities)

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
