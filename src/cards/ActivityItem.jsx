import React, { useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import { useParams } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import ActivityTags from '../components/activity/ActivityTags';
import ActivityHeader from '../components/activity/ActivityHeader';
import ActivityMedia from '../components/activity/ActivityMedia';
import ActivityInfo from '../components/activity/ActivityInfo';
import ActivityActions from '../components/activity/ActivityActions';
import ActivityDesc from '../components/activity/ActivityDesc';

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

function ActivityItem() {
    const { id } = useParams();
    const classes = useStyles();
    const activity = {
        title: 'Trip to Empire State building',
        date: '2018-03-21',
        category: 'sports',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
        city: 'NY, USA',
        venue: 'Empire State Building, 5th Avenue, New York, NY, USA',
        hostedBy: 'Bob',
        hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
        attendees: [
            {
                id: 'a',
                name: 'Bob',
                photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
            },
            {
                id: 'b',
                name: 'Tom',
                photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
            }
        ]
    }

    return (
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
    )
}

export default ActivityItem