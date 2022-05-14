import React from 'react'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import { Badge, withStyles } from '@material-ui/core';
import NotificationsNoneSharpIcon from '@material-ui/icons/NotificationsNoneSharp';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { Avatar } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import IdentityForm from '../popups/IdentityForm';
import { useSelector, useDispatch } from 'react-redux'
import { handleSelected } from '../../actions/activityActs'
import { toggleDrawer } from '../../actions/commonActs';
import ActivitySearch from '../popups/ActivitySearch'
import { signOutFirebase } from '../../api/firebaseService';
import PersonOutlineSharpIcon from '@material-ui/icons/PersonOutlineSharp';

const drawerWidth = 'auto';
const appBarBg = 'transparent';
const logo = { height: '17.5px' };
const tool = { fontSize: 28 };
const iconBtn = { color: '#ffff00ad' };
const closeDrawerBtn = { color: '#ffff00', fontSize: 35 };
const divider = { height: '3px' };
const drawerOpts = { color: '#ffff00' };

const StyledBadge = withStyles((theme) => ({
    badge: {
      right: 1,
      top: 4,
      border: `1px solid #323232`,
      borderRadius: 0,
      padding: '0px 6px 6px 0px',
    },
}))(Badge);

const useStyles = makeStyles((theme) =>
    ({
        root: {
            marginBottom: '76px',
            '@media (min-width: 600px)': {
                marginBottom: '84px',
            },
            display: 'flex',
        },
        appBar: {
            background: appBarBg,
            backdropFilter: 'blur(20px)',
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth})`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: drawerWidth,
        },
        title: {
            flexGrow: 1,
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            background: '#2b2c2deb',
            width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-start',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginRight: -drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: 0,
        },
        avatar: {
            width: theme.spacing(3.19),
            height: theme.spacing(3.19),
            background: '#ffff00ad',
        },

    }),
);

function TopBar() {    
    const classes = useStyles();
    const theme = useTheme();
    const { openDrawer } = useSelector(state => state.common);
    const { authenticated } = useSelector(state => state.auth);
    const { currentUserProfile } = useSelector(state => state.profile);
    const dispatch = useDispatch();
    const history = useHistory();

    const [openIdForm, setOpenIdForm] = React.useState(false);

    const handleIdFormOpen = () => {
        setOpenIdForm(true);
    }

    const handleIdFormClose = () => {
        setOpenIdForm(false);
    }

    const [openActivitySearch, setOpenActivitySearch] = React.useState(false);

    const closeActivitySearch = () => {
        setOpenActivitySearch(false);
    }
    
    const handleSignOut = async () => {
        try {
            history.push('/');
            await signOutFirebase();
            dispatch(toggleDrawer(openDrawer));
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className={classes.root}>
            <IdentityForm 
                open={openIdForm} 
                handleClose={handleIdFormClose} 
            />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: openDrawer,
                })}
            >
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        className={classes.title}
                    >
                        <IconButton
                            component={Link}
                            to='/'
                            style={{ padding: 0 }}
                        >
                            <img alt='metafries' style={logo} src='/logo.png' />
                        </IconButton>
                    </Typography>
                    <IconButton
                        onClick={() => setOpenActivitySearch(true)}
                        style={iconBtn}
                    >
                        <SearchIcon style={tool} />
                    </IconButton>
                    <ActivitySearch 
                        openActivitySearch={openActivitySearch}
                        closeActivitySearch={closeActivitySearch}
                    />
                    <IconButton
                        component={Link}
                        to='/create'                    
                        onClick={() => {
                            dispatch(handleSelected(null));
                        }}
                        style={iconBtn}
                    >
                        <PostAddIcon style={tool} />
                    </IconButton>
                    {
                        authenticated
                            ?   <IconButton
                                    style={iconBtn}
                                    edge="end"
                                    onClick={() => dispatch(toggleDrawer(openDrawer))}
                                    className={clsx(openDrawer && classes.hide)}
                                >
                                    <StyledBadge color="secondary" variant='dot'>
                                        <Avatar
                                            alt={currentUserProfile && currentUserProfile.displayName}
                                            src={currentUserProfile && currentUserProfile.photoURL}
                                            className={classes.avatar}
                                        />
                                    </StyledBadge>
                                </IconButton>
                            :   <IconButton
                                    style={iconBtn}
                                    edge="end"
                                    onClick={handleIdFormOpen}
                                >
                                    <ExitToAppIcon style={tool} />
                                </IconButton>
                    }
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="right"
                open={openDrawer}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={() => dispatch(toggleDrawer(openDrawer))}>
                        {
                            theme.direction === 'rtl'
                                ? <ChevronLeftIcon style={closeDrawerBtn} />
                                : <ChevronRightIcon style={closeDrawerBtn} />
                        }
                    </IconButton>
                </div>
                <Divider style={divider} />
                <List style={drawerOpts}>
                    <ListItem
                        button
                    >
                        <ListItemIcon>
                            <Badge color="secondary" badgeContent={10} max={9}>
                                <NotificationsNoneSharpIcon style={drawerOpts} />
                            </Badge>
                        </ListItemIcon>
                        <ListItemText primary='NOTIFICATIONS' />
                    </ListItem>
                </List>
                <Divider style={divider} />

                <List style={drawerOpts}>
                    <ListItem
                        button
                        onClick={() => dispatch(toggleDrawer(openDrawer))}
                        component={Link}
                        to={`/profile/${currentUserProfile && currentUserProfile.id}`}
                    >
                        <ListItemIcon>
                            <PersonOutlineSharpIcon style={drawerOpts} />
                        </ListItemIcon>
                        <ListItemText primary='PROFILE' />
                    </ListItem>
                </List>
                <Divider style={divider} />
                <List style={drawerOpts}>
                    <ListItem
                        button
                        onClick={() => dispatch(toggleDrawer(openDrawer))}
                        component={Link}
                        to='/activities'
                    >
                        <ListItemIcon>
                            <ThumbUpAltOutlinedIcon style={drawerOpts} />
                        </ListItemIcon>
                        <ListItemText primary='RECOMMEND' />
                    </ListItem>
                </List>
                <Divider style={divider} />
                <List style={drawerOpts}>
                    <ListItem
                        button
                    >
                        <ListItemIcon>
                            <Badge color="secondary" badgeContent={10} max={9}>
                                <ChatOutlinedIcon style={drawerOpts} />
                            </Badge>
                        </ListItemIcon>
                        <ListItemText primary='MESSAGES' />
                    </ListItem>
                </List>
                <Divider style={divider} />
                <List style={drawerOpts}>
                    <ListItem
                        to='/test/errors'
                        button
                    >
                        <ListItemIcon>
                            <ErrorOutlineIcon style={drawerOpts} />
                        </ListItemIcon>
                        <ListItemText primary='BUG REPORT' />
                    </ListItem>
                </List>
                <Divider style={divider} />
                <List style={drawerOpts}>
                    <ListItem
                        onClick={handleSignOut}
                        button
                    >
                        <ListItemIcon>
                            <ExitToAppIcon style={drawerOpts} />
                        </ListItemIcon>
                        <ListItemText primary='LOG OUT' />
                    </ListItem>
                </List>
            </Drawer>
        </div>
    )
}

export default TopBar