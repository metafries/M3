import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Card, CardHeader, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SettingsMenu from '../nav/SettingsMenu';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import UserClout from '../common/user/UserClout'
import Button from '@material-ui/core/Button';
import ProfileContent from '../tabs/ProfileContent';
import useFirestoreDoc from '../../hooks/useFirestoreDoc';
import { getUserProfile } from '../../api/firestoreService';
import { listenToCurrentUserProfile, listenToSelectedUserProfile } from '../../actions/profileActs';
import LoadingIndicator from '../common/utils/LoadingIndicator'
import useFirestoreCollection from '../../hooks/useFirestoreCollection'
import { getUserPhotos } from '../../api/firestoreService';
import { listenToUserPhotos } from '../../actions/profileActs'

const content = 'textSecondary';
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

export default function UserProfile({match}) {
    const classes = useStyles();

    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.async);

    const { currentUserProfile, selectedUserProfile } = useSelector(state => state.profile);
    console.log('CURRENTUSER_PROFILE', currentUserProfile)
    console.log('SELECTEDUSER_PROFILE', selectedUserProfile)

    const { currentUser } = useSelector(state => state.auth);
    console.log('CURRENTUSER', currentUser)

    useFirestoreDoc({
        query: () => getUserProfile(match.params.id),
        data: profile => dispatch(listenToSelectedUserProfile(profile)),
        deps: [dispatch, match.params.id],
    })

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (!selectedUserProfile ) return <LoadingIndicator/>

    return (
        <React.Fragment>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar
                            src={selectedUserProfile.photoURL}
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
                    title={selectedUserProfile.displayName}
                    subheader={selectedUserProfile.username}
                >
                </CardHeader>
                <SettingsMenu 
                    isCurrentUser={currentUser.uid === selectedUserProfile.id}
                    currentUserProfile={currentUserProfile}
                    open={open} 
                    anchorEl={anchorEl} 
                    handleClose={handleClose} 
                />
                <hr style={{borderColor: '#afadaa'}} />
                <CardContent >
                    <UserClout 
                        isCurrentUser={currentUser.uid === selectedUserProfile.id} 
                    />
                </CardContent>
            </Card>
            <ProfileContent 
                profile={selectedUserProfile} 
            />
        </React.Fragment>
    )
}
