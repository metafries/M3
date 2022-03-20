import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ActivityTags from '../components/activity/ActivityTags';
import ActivityHeader from '../components/activity/ActivityHeader';
import Typography from '@material-ui/core/Typography';
import ActivityActions from '../components/activity/ActivityActions';
import ActivityDesc from '../components/activity/ActivityDesc';
import CardMedia from '@material-ui/core/CardMedia';
import ActivityStatus from '../components/activity/ActivityStatus';

const actions = '#afadaa';
const content = 'textSecondary';
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
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    return (
        <Card className={classes.root}>
            <ActivityHeader
                menuStyle={menuStyle}
                activity={activity}
            />
                <div style={{ position: 'relative' }}>
                    <CardMedia
                        className={classes.media}
                    />
                    <div className={classes.overlay}>
                        <div style={{ position: 'absolute', bottom: '16px' }}>
                        <ActivityStatus activity={activity} />
                            <Typography color={content}>
                                {`-- Interested · ${activity.attendees.length} Going`}
                            </Typography>
                            <Typography color={content}>
                                {activity.date}
                            </Typography>
                        </div>
                    </div>
                </div>
            <CardActions disableSpacing>
                <ActivityActions
                    activity={activity}
                />
                <IconButton
                    style={{ color: actions }}
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
                <ActivityTags category={activity.category} />
                <ActivityDesc description={activity.description} />
            </Collapse>
        </Card>
    );
}

export default ActivityListItem