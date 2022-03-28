import React, { useState } from 'react'
import ActivityListItem from '../cards/ActivityListItem'
import { sampleData } from '../../api/sampleData'
import { useSelector } from 'react-redux'
import ActivityMenu from '../nav/ActivityMenu'

export default function ActivityList() {
    const { activities } = useSelector(state => state.activity)

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
