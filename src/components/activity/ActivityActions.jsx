import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import GradeIcon from '@material-ui/icons/Grade';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ShareIcon from '@material-ui/icons/Share';
import ChatIcon from '@material-ui/icons/Chat';
import { CircularProgress } from '@material-ui/core';
import BlockIcon from '@material-ui/icons/Block';

const active = '#987000';
const inactive = '#a9a9a9';

function ActivityActions({
    activity,
    handleSelectActivity,
}) {
    const handleChatRoute = id => {
    }
    const isGoing = false;
    const isCancelled = true;

    return (
        <React.Fragment>
                <IconButton style={{ color: inactive }} aria-label="interested">
                    <GradeIcon />
                </IconButton>
            <IconButton
                onClick={() => {
                    handleSelectActivity(activity.id);
                }}
                style={{ color: isGoing }}
                aria-label="going"
            >
                <CheckCircleIcon />
            </IconButton>
            <IconButton
                onClick={(e) => {
                    handleSelectActivity(activity.id);
                    handleChatRoute(activity.id)
                }}
                style={{ color: active }}
                aria-label="chat"
            >
                <ChatIcon />
            </IconButton>
            <IconButton style={{ color: inactive }} aria-label="share">
                <ShareIcon />
            </IconButton>
        </React.Fragment>
    )
}

export default ActivityActions