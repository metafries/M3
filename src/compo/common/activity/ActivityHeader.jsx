import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import CardHeader from '@material-ui/core/CardHeader';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useSelector, useDispatch } from 'react-redux'
import { handleSelected, handleMenuClick } from '../../../actions/activityActs'

const actions = '#afadaa';

const useStyles = makeStyles((theme) =>
    createStyles({
        avatar: {
            width: theme.spacing(4),
            height: theme.spacing(4),
            backgroundColor: grey[700],
        },
    }),
);

export default function ActivityHeader({
    menuStyle,
    activity,
}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    
    return (
        <React.Fragment>
            <CardHeader
                avatar={
                    <AvatarGroup max={2}>
                        <Avatar 
                            alt={activity.hostedBy}                         
                            src={activity.hostPhotoURL || '/'}
                            className={classes.avatar} 
                        />
                    </AvatarGroup>
                }
                action={
                    <IconButton
                        style={{ color: actions }}
                        onClick={(e) => {
                            dispatch(handleSelected(activity.id));
                            dispatch(handleMenuClick(e));
                        }}
                        aria-label="settings"
                    >
                        <MoreVertIcon />
                    </IconButton>
                }
                title={activity.title}
                subheader={`${activity.hostedBy} · ${activity.city}`}
            />
        </React.Fragment>
    )
}
