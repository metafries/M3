import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import ActivityTags from '../../compo/common/activity/ActivityTags';
import ActivityHeader from '../../compo/common/activity/ActivityHeader';
import ActivityMedia from '../../compo/common/activity/ActivityMedia';
import ActivityInfo from '../../compo/common/activity/ActivityInfo';
import ActivityActions from '../../compo/common/activity/ActivityActions';
import ActivityDesc from '../../compo/common/activity/ActivityDesc';
import { useDispatch, useSelector } from 'react-redux'
import useFirestoreDoc from '../../hooks/useFirestoreDoc';
import { addInterestedUser, cancelUserAttendance, listenToActivityFromFirestore, removeInterestedUser } from '../../api/firestoreService';
import { listenToActivities } from '../../actions/activityActs';
import LoadingIndicator from '../common/utils/LoadingIndicator'
import Errors from '../common/utils/Errors';
import IconButton from '@material-ui/core/IconButton';
import { handleSelected } from '../../actions/activityActs';
import { cancelActivityToggle } from '../../api/firestoreService';
import { openModal } from '../../actions/commonActs'
import ActivityCancelConfirm from '../modal/ActivityCancelConfirm';
import BlockIcon from '@material-ui/icons/Block';
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp';
import SubjectSharpIcon from '@material-ui/icons/SubjectSharp';
import { toast } from 'react-toastify';
import { addUserAttendance } from '../../api/firestoreService'
import { CircularProgress } from '@material-ui/core';

const active = '#eaff00';
const inactive = '#afadaa';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            color: 'whitesmoke',
            background: '#323232',
            borderRadius: 0,
            border: '1px solid #16161680',
            boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
            maxWidth: 'auto',
        },
    }),
);

const menuStyle = {
    color: 'whitesmoke',
    background: 'rgba(10,10,10,0.9)',
    boxShadow: 'none',
    borderRadius: 0,
}

function ActivityItem({ match }) {    
    const { error, loading } = useSelector(state => state.async);
    const activity = useSelector(state => state.activity.activities.find(a => a.id === match.params.id));
    const { currentUser } = useSelector(state => state.auth);
    const isHost = activity?.hostUid === currentUser?.uid;
    const isGoing = activity?.attendees.some(a => a.id === currentUser?.uid);
    const isInterested = activity?.interested?.some(i => i.id === currentUser?.uid);
    
    const dispatch = useDispatch();
    useFirestoreDoc({
        query: () => listenToActivityFromFirestore(match.params.id),
        data: activity => dispatch(listenToActivities([activity])),
        deps: [match.params.id, dispatch]
    })
    console.log(match.params.id)

    const [going, setGoing] = React.useState(false);
    const handleUserGoing = async (activity) => {
        setGoing(true);
        try {
            if (isGoing) {
                await cancelUserAttendance(activity)
            } else {
                await addUserAttendance(activity);
                await removeInterestedUser(activity);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setGoing(false);
        }
    }

    const [interested, setInterested] = React.useState(false);
    const handleInterestedUser = async (activity) => {
        setInterested(true);
        try {
            if (isInterested) {
                await removeInterestedUser(activity)
            } else {
                await addInterestedUser(activity);
                await cancelUserAttendance(activity);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setInterested(false);
        }
    }

    const classes = useStyles();

    if (error) return <Errors error={error} />
    if (loading) return <LoadingIndicator />

    return (
        <React.Fragment>
            {
                activity &&
                <Card className={classes.root}>
                    <ActivityHeader
                        isHost={isHost}
                        menuStyle={menuStyle}
                        activity={activity}
                    />


                    <ActivityMedia posterURL={activity.posterURL} category={activity.category} />

                    <CardActions>
                        {
                            !isHost &&
                            <IconButton
                                onClick={() => handleInterestedUser(activity)}
                                style={ isInterested ? { color: active } : { color: inactive } }
                                aria-label="interested"
                            >
                                { interested ? <CircularProgress size={24} /> : <SubjectSharpIcon style={{ fontSize: 26 }} /> }                               
                            </IconButton>
                        }
                        <ActivityActions isHost={isHost} activity={activity} />
                        {
                            isHost && !activity.isCancelled &&
                            <IconButton
                                onClick={() => {
                                    dispatch(handleSelected(activity));
                                    activity.isCancelled
                                        ? cancelActivityToggle(activity)
                                        : dispatch(openModal(<ActivityCancelConfirm />))

                                }}
                                style={{ color: active, marginLeft: 'auto' }}
                                aria-label="cancel"
                            >
                                <CheckCircleSharpIcon style={{ fontSize: 24 }} />
                            </IconButton>
                        }
                        {
                            isHost && activity.isCancelled &&
                            <IconButton
                                onClick={() => {
                                    dispatch(handleSelected(activity));
                                    activity.isCancelled
                                        ? cancelActivityToggle(activity)
                                        : dispatch(openModal(<ActivityCancelConfirm />))

                                }}
                                style={{ color: inactive, marginLeft: 'auto' }}
                                aria-label="cancel"
                            >
                                <BlockIcon />
                            </IconButton>
                        }
                        {
                            !isHost && !activity.isCancelled &&
                            <IconButton
                                onClick={() => handleUserGoing(activity)}
                                style={isGoing ? { color: active, marginLeft: 'auto' } : { color: inactive, marginLeft: 'auto' }}
                                aria-label="going"
                            >
                                { going ? <CircularProgress size={24} /> : <CheckCircleSharpIcon style={{ fontSize: 24 }} /> }                                
                            </IconButton>
                        }
                        {
                            !isHost && activity.isCancelled &&
                            <IconButton
                                disabled={true}
                                style={isGoing ? {color: '#eaff004f',  marginLeft: 'auto' } :  {color: '#afadaa4f',  marginLeft: 'auto' } }
                                aria-label="going"
                            >
                                <CheckCircleSharpIcon style={{ fontSize: 24 }} />
                            </IconButton>                            
                        }
                    </CardActions>
                    <hr style={{ margin: 0, borderColor: '#afadaa' }} />

                    <ActivityInfo activity={activity} />

                    <ActivityDesc description={activity.description} />

                    <ActivityTags category={activity.category} />




                </Card>
            }


        </React.Fragment>
    )
}

export default ActivityItem