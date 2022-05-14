import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ActivityTags from '../../compo/common/activity/ActivityTags';
import ActivityHeader from '../../compo/common/activity/ActivityHeader';
import ActivityActions from '../../compo/common/activity/ActivityActions';
import ActivityDesc from '../../compo/common/activity/ActivityDesc';
import CardMedia from '@material-ui/core/CardMedia';
import { Link } from 'react-router-dom';
import { handleSelected } from '../../actions/activityActs'
import ActivityInfo from '../common/activity/ActivityInfo';
import { useSelector, useDispatch } from 'react-redux'
import { addInterestedUser, cancelActivityToggle, cancelUserAttendance, removeInterestedUser } from '../../api/firestoreService';
import { openModal } from '../../actions/commonActs'
import ActivityCancelConfirm from '../modal/ActivityCancelConfirm';
import BlockIcon from '@material-ui/icons/Block';
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp';
import SubjectSharpIcon from '@material-ui/icons/SubjectSharp';
import { toast } from 'react-toastify';
import { CircularProgress } from '@material-ui/core';

const active = '#eaff00';
const inactive = '#afadaa';

const menuStyle = {
    color: 'whitesmoke',
    background: 'rgba(10,10,10,0.2)',
    boxShadow: 'none',
    borderRadius: 0,
}

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            color: 'whitesmoke',
            background: '#1e1e1f',
            marginBottom: '10px',
            borderRadius: 0,
            maxWidth: 'auto',
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        overlay: {
            height: '100%',
            width: '100%',
            bottom: 0,
            position: 'absolute', /* Position the background text */
            background: 'rgba(0, 0, 0, 0.7)', /* Black background with 0.7 opacity */
            padding: '16px', /* Some padding */
        },
    }),
);

function ActivityListItem({ activity }) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const { currentUser } = useSelector(state => state.auth);
    const isHost = activity?.hostUid === currentUser?.uid;
    const isGoing = activity?.attendees.some(a => a.id === currentUser?.uid);
    const isInterested = activity?.interested?.some(i => i.id === currentUser?.uid);

    const [updating, setUpdating] = React.useState(false);

    const handleInterestedUser = async (activity) => {
        setUpdating(true);
        try {
            isInterested 
                ? await removeInterestedUser(activity) 
                : await addInterestedUser(activity);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setUpdating(false);
        }
    }

    return (
        <Card className={classes.root}>
            <ActivityHeader
                isHost={isHost}
                key={activity.id}
                menuStyle={menuStyle}
                activity={activity}
            />

            <Link onClick={() => dispatch(handleSelected(activity))} to={`/activities/${activity.id}`}>
                <div style={{ position: 'relative' }}>
                    <CardMedia
                        className={classes.media}
                        image={activity.posterURL || `/categoryImages/${activity.category}text.png`}
                        title={activity.category}
                    />
                    <div className={classes.overlay}>
                        <div style={{ position: 'absolute', bottom: 0, left: 0 }}>

                            <ActivityInfo activity={activity} />


                        </div>
                    </div>
                </div>
            </Link>
            <CardActions disableSpacing>
                {
                    isHost && 
                    <IconButton
                        style={{ color: active }}
                        onClick={() => {
                            dispatch(handleSelected(activity));
                            activity.isCancelled
                                ? cancelActivityToggle(activity)
                                : dispatch(openModal(<ActivityCancelConfirm />))

                        }}
                    >
                        { 
                            activity.isCancelled 
                                ? <BlockIcon style={{color: '#afadaa'}} /> 
                                : <CheckCircleSharpIcon style={{ fontSize: 24 }} /> 
                        }                        
                    </IconButton>
                }
                {
                    !isHost && !activity.isCancelled && isGoing &&
                    <IconButton
                        style={{ color: active }}
                        onClick={() => {
                            dispatch(handleSelected(activity));        
                            cancelUserAttendance(activity);
                        }}
                    >
                        <CheckCircleSharpIcon style={{ fontSize: 24 }} />
                    </IconButton>
                }
                {
                    !isHost && activity.isCancelled && isGoing &&
                    <IconButton
                        disabled={true}
                        style={{ color: '#eaff004f' }}
                    >
                        <CheckCircleSharpIcon style={{ fontSize: 24 }} />
                    </IconButton>
                }                
                {
                    !isHost && !isGoing &&
                    <IconButton
                        onClick={() => handleInterestedUser(activity)}
                        style={ isInterested ? { color: active } : { color: inactive } }
                    >
                        { updating ? <CircularProgress size={24} /> : <SubjectSharpIcon style={{ fontSize: 26 }} /> }                                                
                    </IconButton>
                }
                <ActivityActions
                    activity={activity}
                />
                <IconButton
                    style={{ color: '#afadaa' }}
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={() => handleExpandClick(activity.id)}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <ActivityDesc description={activity.description} />
                <ActivityTags category={activity.category} />
            </Collapse>
        </Card>
    );
}

export default ActivityListItem