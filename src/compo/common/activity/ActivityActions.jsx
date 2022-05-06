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
import LocalAtmSharpIcon from '@material-ui/icons/LocalAtmSharp';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';
import ActivityCancelConfirm from '../../modal/ActivityCancelConfirm';
import { openModal } from '../../../actions/commonActs'

const active = '#987000';
const inactive = '#afadaa';

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
                disabled={activity.isCancelled}
                style={{ color: inactive }}
                aria-label="interested"
            >
                <StarOutlineIcon />
            </IconButton>
            <IconButton
                onClick={(e) => setOpenChat(true)}
                style={{ color: inactive }}
                aria-label="chat"
            >
                <ChatOutlinedIcon />
            </IconButton>
            <IconButton style={{ color: inactive }} aria-label="share">
                <ShareOutlinedIcon />
            </IconButton>

        </React.Fragment>
    )
}

export default ActivityActions