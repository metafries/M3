import { AppBar, Dialog } from '@material-ui/core'
import React from 'react'
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Typography from '@material-ui/core/Typography';
import GoogleMapReact from 'google-map-react';
import RoomIcon from '@material-ui/icons/Room';
import { red } from '@material-ui/core/colors';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    appBar: {
        color: '#1e1e1f',
        background: '#ffff00',
        position: 'fixed',
    },
}));

const Marker = () => (
    <RoomIcon fontSize="large" style={{ color: red[500] }} />
)

export default function GoogleMap({
    activity,
    openMap,
    setOpenMap,
}) {
    const classes = useStyles();
    const center = [
        activity.venue.latLng.lat, 
        activity.venue.latLng.lng
    ];
    const zoom = 14;    

    return (
        <React.Fragment>
            {
                activity &&
                <Dialog
                    fullScreen
                    scroll='paper'
                    PaperProps={{
                        style: {
                            borderRadius: 0,
                            color: 'whitesmoke',
                            backdropFilter: 'blur(20px)',
                            background: '#0000001a',

                        }
                    }}
                    open={openMap}
                    onClose={() => setOpenMap(false)}
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                onClick={() => setOpenMap(false)}
                                edge="start"
                            >
                                <ArrowBackIosIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                {activity.venue.address}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <div style={{ height: '100vh', width: '100%' }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: 'AIzaSyCALemqdfBV5IqGCQq0cbDDZ3ttgdFTfwU' }}
                            defaultCenter={center}
                            defaultZoom={zoom}
                        >
                            <Marker lat={center[0]} lng={center[1]} />
                        </GoogleMapReact>
                    </div>
                </Dialog>
            }
        </React.Fragment>
    )
}
