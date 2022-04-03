import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import ActivityStatus from './ActivityStatus';
import ActivityClout from '../../popups/ActivityClout'
import { format } from 'date-fns'

const content = 'textSecondary';
const CustomBtn = withStyles({
    root: {
        color: '#afadaa',
        padding: 0,
    }
})(Button);

function ActivityInfo({ activity }) {
    const [openClout, setOpenClout] = React.useState(false);

    return (
        <CardContent style={{ paddingTop: 0 }}>
            <ActivityClout activity={activity} openActivityClout={openClout} setOpenActivityClout={setOpenClout} />
            <ActivityStatus activity={activity} />
            <Typography color={content}>
                <CustomBtn onClick={() => setOpenClout(true)}>
                    {`-- Interested · ${activity.attendees.length} Going`}
                </CustomBtn>
            </Typography>
            <Typography color={content}>
                {format(activity.date, 'dd MMM yyyy h:mm aa')}
            </Typography>
            <Typography color={content}>
                {activity.venue}
            </Typography>
        </CardContent>
    )
}

export default ActivityInfo