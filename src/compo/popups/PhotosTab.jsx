import React from 'react'
import { AppBar, Button, Dialog } from '@material-ui/core'
import { withStyles, makeStyles, createStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { handleSelectedPhoto } from '../../actions/profileActs'
import { useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import PhotosMenu from '../nav/PhotosMenu';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';

const actions = '#afadaa';
const inactive = '#a9a9a9';

const CustomBtn = withStyles({
    root: {
        textAlign: 'left',
        color: '#afadaa',
        padding: 0,
    }
})(Button);

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(4),
            width: '100%',
        },

    },
    appBar: {
        color: '#1e1e1f',
        background: '#ffff00',
        position: 'fixed',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    subheader: {
        padding: 0,
    },
    list: {
        marginBottom: theme.spacing(2),
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function PhotosTab({
    uploadedPhotos,
    profile,
    openPhotosTab,
    setOpenPhotosTab,
}) {
    const classes = useStyles();
    const cardClasses = useCardStyles();
    const dispatch = useDispatch();



    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Dialog
            fullScreen
            scroll='paper'
            PaperProps={{
                style: {
                    borderRadius: 0,
                    color: 'whitesmoke',
                    background: '#ffff001a',
                },


            }}
            open={openPhotosTab}
            TransitionComponent={Transition}
        >
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        onClick={() => setOpenPhotosTab(false)}
                        edge="start"
                    >
                        <ArrowBackIosIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {`${profile.username}`}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container style={{ marginTop: '55px' }} maxWidth='sm'>

                <PhotosMenu anchorEl={anchorEl} handleClose={handleClose} />
                <List style={{ backdropFilter: 'blur(20px)' }} >
                    <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <ListItemIcon style={{ padding: 0, minWidth: '36px', color: '#aaa' }}>
                            <InfoOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary={`Total of ${uploadedPhotos.length} photos`} />
                    </ListItem>

                </List>
                {
                    uploadedPhotos.length > 0 && uploadedPhotos.map(ups =>
                        <Card key={ups.id} className={cardClasses.root}>
                            <CardMedia
                                className={cardClasses.media}
                                image={ups.url}
                            />
                            <CardActions disableSpacing>
                                <IconButton style={{ color: inactive, padding: 0 }}>
                                    <ThumbUpAltOutlinedIcon />
                                </IconButton>
                                <span style={{ marginLeft: '5px', marginRight: '25px' }}>--</span>
                                <IconButton style={{ color: inactive }} aria-label="chat">
                                    <ChatOutlinedIcon />
                                </IconButton>
                                <IconButton style={{ color: inactive }} aria-label="share">
                                    <ShareOutlinedIcon />
                                </IconButton>
                                <IconButton
                                    style={{ marginLeft: 'auto', color: actions }}
                                    onClick={(e) => {
                                        handleClick(e);
                                        dispatch(handleSelectedPhoto(ups));
                                    }}
                                    aria-label="settings"
                                >
                                    <MoreVertIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    )
                }
            </Container>
        </Dialog>
    )
}
