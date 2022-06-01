import React from 'react'
import ActivityListItem from '../cards/ActivityListItem'
import { useDispatch, useSelector } from 'react-redux'
import LoadingIndicator from '../common/utils/LoadingIndicator'
import { listenToActivitiesFromFirestore } from '../../api/firestoreService'
import { listenToActivities } from '../../actions/activityActs'
import useFirestoreCollection from '../../hooks/useFirestoreCollection'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import { withStyles, makeStyles, createStyles } from '@material-ui/core/styles';
import { MenuItem, Select } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        height: '100%',
        width: '100%',
    },
    appBar: {
        color: '#eaff00',
        background: '#000',
        position: 'static',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const useCardStyles = makeStyles((theme) =>
    createStyles({
        root: {
            color: 'whitesmoke',
            background: '#1e1e1f',
            borderRadius: 0,
            maxWidth: 'auto',
            backdropFilter: 'blur(20px)',
            marginBottom: '10px',

        },
        media: {
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            paddingTop: '100%',
        },
    }),
);

export default function ActivityList() {
    const classes = useStyles();
    const cardClasses = useCardStyles();

    const [order, setOrder] = React.useState(0);
    const handleOrder = (event) => {
        setOrder(event.target.value);
    }

    const { loading } = useSelector(state => state.async)

    const { filter, activities } = useSelector(state => state.activity)
    console.log(activities)

    const dispatch = useDispatch();

    useFirestoreCollection({
        query: () => listenToActivitiesFromFirestore(filter),
        data: activities => dispatch(listenToActivities(activities)),
        deps: [dispatch]
    })

    if (loading) return <LoadingIndicator />

    return (
        <React.Fragment>
            <div style={{ marginBottom: '100px' }}>
                {
                    activities.map(activity => (
                        <ActivityListItem
                            key={activity.id}
                            activity={activity}
                        />
                    ))
                }
            </div>
            <div style={{ zIndex: 1, position: 'fixed', left: 0, width: '100%', bottom: 0 }}>
                <Container style={{ backgroundColor: '#eaff00', opacity: 0.9 }} maxWidth='sm'>

                    <FormControl className={classes.formControl}>
                        <Typography style={{ color: '#6d6d6d' }}>
                            {`${activities.length} activities · Recommend`}
                        </Typography>

                        <Select
                            labelId="photos-select-label"
                            id="photos-select"
                            value={order}
                            onChange={handleOrder}
                        >
                            <MenuItem value={0}>Last uploaded</MenuItem>
                            <MenuItem value={1}>Most going</MenuItem>
                            <MenuItem value={2}>Most interested</MenuItem>
                        </Select>
                    </FormControl>
                </Container>
            </div>
        </React.Fragment>
    )
}
