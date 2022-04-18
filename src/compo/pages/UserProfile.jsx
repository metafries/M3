import React from 'react'
import { useSelector } from 'react-redux';
import { Avatar, Card, CardHeader, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SettingsMenu from '../nav/SettingsMenu';

const actions = '#afadaa';

const useStyles = makeStyles((theme) => ({
    root: {
        color: 'whitesmoke',
        background: '#323232',
        marginBottom: '10px',
        borderRadius: 0,
        border: '1px solid #16161680',
        boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
        maxWidth: 'auto',
    },
    avatar: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
}));

export default function UserProfile() {
    const classes = useStyles();
    const { currentUser } = useSelector(state => state.auth);
    console.log('CURRENTUSER', currentUser)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar
                        src={currentUser.photoURL || '/'}
                        className={classes.avatar}
                    />
                }
                action={
                    <IconButton
                        style={{ color: actions }}
                        onClick={handleClick}
                        aria-label="settings"
                    >
                        <MoreVertIcon />
                    </IconButton>
                }
                title={currentUser.displayName}
                subheader={currentUser.email}
            >
            </CardHeader>
            <SettingsMenu open={open} anchorEl={anchorEl} handleClose={handleClose} />
        </Card>
    )
}
