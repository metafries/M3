import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { makeStyles } from '@material-ui/core/styles';

const avatar = { height: '35px', width: '35px' }
const zeroPaddingTop = { paddingTop: 0 }

const useStyles = makeStyles((theme) => ({
    root: zeroPaddingTop
}));

function ListItemLink(props) {
    return <ListItem style={zeroPaddingTop} button component="a" {...props} />;
}

export default function ActivityCloutItem({ user, hostUsername }) {
    const { username, displayName, photoURL: image } = user;
    const isHost = username ? username === hostUsername : false; //
    const classes = useStyles();

    return (
        <ListItem className={classes.root} button>
            <ListItemLink href={`/profile/${user.id}`}>
                <ListItemAvatar>
                    {
                        isHost
                            ? <Badge color="secondary" badgeContent='Host' showZero>
                                <Avatar style={avatar} alt={username} src={image || '/'} />
                            </Badge>
                            : <Avatar style={avatar} alt={username} src={image || '/'} />
                    }
                </ListItemAvatar>
                <ListItemText
                    style={{ display: 'inline' }}
                    primary={username}
                    secondary={displayName}
                />
            </ListItemLink>
            {
                <ListItemSecondaryAction style={{ color: '#a9a9a9' }}>
                    <PersonAddIcon />
                </ListItemSecondaryAction>
            }
        </ListItem>
    )
}
