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
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            color: 'whitesmoke',
            background: '#1e1e1f',
            borderRadius: 0,
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
    const activity = useSelector(state => state.activity.activities.find(a => a.id === match.params.id));
    console.log(match.params.id)
    const classes = useStyles();

    return (
        <React.Fragment>
        {
            activity && 
            <Card className={classes.root}>
                <ActivityMedia category={activity.category} />
                <ActivityHeader
                    menuStyle={menuStyle}
                    activity={activity}
                />
                <ActivityInfo activity={activity} />
                <CardActions>
                    <ActivityActions
                        activity={activity}
                    />
                </CardActions>
                <ActivityTags category={activity.category} />
                <ActivityDesc description={activity.description} />
            </Card>
        }
        </React.Fragment>
    )
}

export default ActivityItem