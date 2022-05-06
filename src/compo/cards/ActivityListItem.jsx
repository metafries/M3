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
import Typography from '@material-ui/core/Typography';
import ActivityActions from '../../compo/common/activity/ActivityActions';
import ActivityDesc from '../../compo/common/activity/ActivityDesc';
import CardMedia from '@material-ui/core/CardMedia';
import ActivityStatus from '../../compo/common/activity/ActivityStatus';
import { Link } from 'react-router-dom';
import { format } from 'date-fns'
import { handleSelected, handleMenuClick } from '../../actions/activityActs'
import ActivityMenu from '../nav/ActivityMenu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ActivityInfo from '../common/activity/ActivityInfo';
import { useSelector, useDispatch } from 'react-redux'

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
    const dispatch = useDispatch();
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root}>
            <ActivityHeader
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
            <CardActions  disableSpacing>
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