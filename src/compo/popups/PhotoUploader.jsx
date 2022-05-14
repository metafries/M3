import React from 'react'
import { AppBar, Dialog } from '@material-ui/core'
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PhotoHLStepper from '../steps/PhotoHLStepper';

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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function PhotoUploader({
    openPhotoUploader,
    setOpenPhotoUploader,
}) {
    const classes = useStyles();
    
    const handleUploadCompleted = () => {
        setOpenPhotoUploader(false);
    }

    return (
        <Dialog
            fullScreen
            open={openPhotoUploader}
            TransitionComponent={Transition}
        >
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        onClick={() => setOpenPhotoUploader(false)}
                        edge="start"
                    >
                        <ArrowBackIosIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        ADD PHOTO
                    </Typography>
                </Toolbar>
            </AppBar>   
            <Container style={{ marginTop: '85px' }} maxWidth='sm'>
                <PhotoHLStepper handleUploadCompleted={handleUploadCompleted} />
            </Container>    
        </Dialog>
    )
}
