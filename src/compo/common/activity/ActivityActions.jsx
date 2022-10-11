import React, { useEffect, useLayoutEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ChatComment from '../../popups/ChatComment'
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import { useDispatch, useSelector } from 'react-redux'
import { handleScrollPosition } from '../../../actions/commonActs';
import { Link } from 'react-router-dom';
import { firebaseObjToArr, getChatRef } from '../../../api/firebaseService.js'
import { listenToChatComment } from '../../../actions/commonActs.js'
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import LocalAtmSharpIcon from '@material-ui/icons/LocalAtmSharp';
import LoadingIndicator from '../utils/LoadingIndicator';

const iconbtn = '#afadaa'

function ActivityActions({
    isHost,
    activity,
}) {
    const dispatch = useDispatch();

    const [totalComments, setTotalComments] = React.useState(0);
    useEffect(() => {
        getChatRef(activity.id).on('value', snapshot => {
            const comments = firebaseObjToArr(snapshot.val());
            console.log(comments && comments.length)
            if (comments) setTotalComments(comments.length)
        })
    }, [])

    return (
        <React.Fragment>
            <IconButton
                component={Link}
                to={`/c/${activity.id}`}
                style={{ paddingRight: 0, color: iconbtn }}
                aria-label="chat"
                onClick={() => dispatch(handleScrollPosition(window.pageYOffset))}
            >
                <ChatOutlinedIcon />
            </IconButton>
            <span style={{ marginLeft: '5px', marginRight: '10px' }}> {totalComments} </span>
            <IconButton style={{ paddingRight: 0, color: iconbtn }} aria-label="donate">
                <MonetizationOnOutlinedIcon />
            </IconButton>
            <span style={{ marginLeft: '5px', marginRight: '10px' }}>--</span>
        </React.Fragment>
    )
}

export default ActivityActions