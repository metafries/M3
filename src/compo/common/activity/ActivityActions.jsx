import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import GradeIcon from '@material-ui/icons/Grade';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ShareIcon from '@material-ui/icons/Share';
import ChatIcon from '@material-ui/icons/Chat';
import { CircularProgress } from '@material-ui/core';
import BlockIcon from '@material-ui/icons/Block';
import { useHistory } from 'react-router-dom';
import ActivityChat from '../../popups/ActivityChat'
import { cancelActivityToggle, deleteActivityInFirestore } from '../../../api/firestoreService';
import { useDispatch, useSelector } from 'react-redux';
import { handleSelected } from '../../../actions/activityActs';
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';

const active = '#987000';
const inactive = '#a9a9a9';

function ActivityActions({
    activity,
}) {
    const { selectedActivity } = useSelector(state => state.activity)
    const dispatch = useDispatch();

    const isGoing = activity.isGoing ? active : inactive;
    const isCancelled = activity.isCancelled ? active : inactive;
    const history = useHistory();
    const [openChat, setOpenChat] = React.useState(false);

    return (
        <React.Fragment>
            <ActivityChat activity={activity} openChat={openChat} setOpenChat={setOpenChat} />
            <IconButton
                onClick={() => {
                    dispatch(handleSelected(activity));
                    cancelActivityToggle(activity);                    
                }}
                style={{ color: isCancelled }}
                aria-label="cancel"
            >
                {
                    false && (selectedActivity.id === activity.id)
                        ? <CircularProgress size={20} />
                        : <BlockIcon />
                }
            </IconButton>
            <IconButton style={{ color: inactive }} aria-label="interested">
                <GradeIcon />
            </IconButton>
            <IconButton
                onClick={() => {
                    dispatch(handleSelected(activity));
                }}
                style={{ color: isGoing }}
                aria-label="going"
            >
                <CheckCircleIcon />
            </IconButton>
            <IconButton
                onClick={(e) => setOpenChat(true)}
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