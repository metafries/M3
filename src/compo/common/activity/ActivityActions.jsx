import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ChatComment from '../../popups/ChatComment'
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import { useDispatch } from 'react-redux';
import { handleScrollPosition } from '../../../actions/commonActs';
import { Link } from 'react-router-dom';

const iconbtn = '#afadaa'

function ActivityActions({
    isHost,
    activity,
}) {
    const dispatch = useDispatch();
    return (
        <React.Fragment>
            <IconButton
                component={Link}
                to={`/c/${activity.id}`}
                style={{ color: iconbtn }}
                aria-label="chat"
                onClick={() => dispatch(handleScrollPosition(window.pageYOffset))}
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