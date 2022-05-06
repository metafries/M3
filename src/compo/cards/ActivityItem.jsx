import React, { useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import { useParams } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import ActivityTags from '../../compo/common/activity/ActivityTags';
import ActivityHeader from '../../compo/common/activity/ActivityHeader';
import ActivityMedia from '../../compo/common/activity/ActivityMedia';
import ActivityInfo from '../../compo/common/activity/ActivityInfo';
import ActivityActions from '../../compo/common/activity/ActivityActions';
import ActivityDesc from '../../compo/common/activity/ActivityDesc';
import { useDispatch, useSelector } from 'react-redux'
import useFirestoreDoc from '../../hooks/useFirestoreDoc';
import { listenToActivityFromFirestore } from '../../api/firestoreService';
import { listenToActivities } from '../../actions/activityActs';
import LoadingIndicator from '../common/utils/LoadingIndicator'
import Errors from '../common/utils/Errors';
import ActivityMenu from '../nav/ActivityMenu';
import IconButton from '@material-ui/core/IconButton';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';
import PosterUploader from '../popups/PosterUploader';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import { useHistory } from 'react-router';
import BookmarkBorderSharpIcon from '@material-ui/icons/BookmarkBorderSharp';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { handleSelected } from '../../actions/activityActs';
import { cancelActivityToggle, deleteActivityInFirestore } from '../../api/firestoreService';
import { openModal } from '../../actions/commonActs'
import ActivityCancelConfirm from '../modal/ActivityCancelConfirm';
import BlockIcon from '@material-ui/icons/Block';

const active = '#987000';
const inactive = '#a9a9a9';

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
    const history = useHistory();
    const [openPosterUploader, setOpenPosterUploader] = React.useState(false);

    const { error, loading } = useSelector(state => state.async);
    const activity = useSelector(state => state.activity.activities.find(a => a.id === match.params.id));

    const dispatch = useDispatch();
    useFirestoreDoc({
        query: () => listenToActivityFromFirestore(match.params.id),
        data: activity => dispatch(listenToActivities([activity])),
        deps: [match.params.id, dispatch]
    })
    console.log(match.params.id)

    const classes = useStyles();

    if (error) return <Errors error={error} />
    if (loading) return <LoadingIndicator />

    return (
        <React.Fragment>
            {
                activity &&
                <Card className={classes.root}>

                    <ActivityMenu />



                    <ActivityHeader
                        menuStyle={menuStyle}
                        activity={activity}
                    />


                    <ActivityMedia posterURL={activity.posterURL} category={activity.category} />

                    <CardActions>
                        <ActivityActions

                            activity={activity}
                        />
                        <IconButton
                            onClick={() => {
                                dispatch(handleSelected(activity));
                                activity.isCancelled
                                    ? cancelActivityToggle(activity)
                                    : dispatch(openModal(<ActivityCancelConfirm />))

                            }}
                            style={activity.isCancelled ? { color: active, marginLeft: 'auto' } : { color: inactive, marginLeft: 'auto' }}
                            aria-label="cancel"
                        >
                            <BlockIcon />
                        </IconButton>
                        {/* <IconButton
                            onClick={() => { }}
                            style={activity.isCancelled ? { color: '#afadaa55', marginLeft: 'auto' } : { color: '#afadaa', marginLeft: 'auto' }}
                            aria-label="going"
                        >
                            <CheckCircleOutlineIcon />
                        </IconButton> */}
                        <PosterUploader
                            auid={activity.id}
                            openPosterUploader={openPosterUploader}
                            setOpenPosterUploader={setOpenPosterUploader}
                        />
                    </CardActions>
                    <hr style={{ borderColor: '#afadaa' }} />

                    <ActivityInfo activity={activity} />

                    <ActivityDesc description={activity.description} />

                    <ActivityTags category={activity.category} />




                </Card>
            }


        </React.Fragment>
    )
}

export default ActivityItem