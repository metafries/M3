import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ActivityChat from '../../popups/ActivityChat'
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';

const iconbtn = '#afadaa'

function ActivityActions({
    isHost,
    activity,
}) {
    const [openChat, setOpenChat] = React.useState(false);

    return (
        <React.Fragment>
            <ActivityChat activity={activity} openChat={openChat} setOpenChat={setOpenChat} />


            <IconButton
                onClick={(e) => setOpenChat(true)}
                style={{ color: iconbtn }}
                aria-label="chat"
            >
                <ChatOutlinedIcon />
            </IconButton>
            <IconButton style={{ color: iconbtn }} aria-label="share">
                <ShareOutlinedIcon />
            </IconButton>

        </React.Fragment>
    )
}

export default ActivityActions