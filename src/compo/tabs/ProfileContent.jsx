import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import { withStyles, makeStyles, createStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { FormHelperText, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import AboutTab from '../common/user/AboutTab';
import PhotosTab from '../popups/PhotosTab';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getUserActivities, getUserPhotos, listenToActivitiesFromFirestore } from '../../api/firestoreService';
import { listenToUserPhotos } from '../../actions/profileActs'
import useFirestoreCollection from '../../hooks/useFirestoreCollection'
import { DatePicker } from "@material-ui/pickers";
import FilterListIcon from '@material-ui/icons/FilterList';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import { handleSelectedPhoto } from '../../actions/profileActs'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PhotosMenu from '../nav/PhotosMenu';
import { handleSearchActivities, listenToActivities } from '../../actions/activityActs';
import ActivityListItem from '../cards/ActivityListItem';

const actions = '#afadaa';
const inactive = '#a9a9a9';

const CustomBtn = withStyles({
    root: {
        textAlign: 'left',
        color: '#afadaa',
        padding: 0,
    }
})(Button);

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

const ColorButton = withStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        color: '#000',
        border: '1px solid #afadaa87',
        boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
        borderRadius: 0,

    },
}))(Button);

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        height: '100%',
        width: '100%',
    },
    appBar: {
        color: '#eaff00',
        background: '#000',
        position: 'static',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}




export default function ProfileContent({
    profile
}) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const cardClasses = useCardStyles();

    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const handleDateChange = d => {
        setSelectedDate(d);
    };

    const { activities } = useSelector(state => state.activity)
    const [schedule, setSchedule] = React.useState('going');
    const handleScheduleSearch = e => {
        setSchedule(e.target.value);
    }
    useFirestoreCollection({
        query: () => getUserActivities(profile.id, { range: schedule }),
        data: activities => dispatch(listenToActivities(activities)),
        deps: [profile.id, schedule, dispatch]
    })

    const [openPhotosTab, setOpenPhotosTab] = React.useState(false);
    const [photos, setPhotos] = React.useState(0);
    const handlePhotoSearch = (event) => {
        setPhotos(event.target.value);
    }

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useFirestoreCollection({
        query: () => getUserPhotos(profile.id),
        data: (photos) => dispatch(listenToUserPhotos(photos)),
        deps: [profile.id, dispatch],
    });

    const { uploadedPhotos } = useSelector((state) => state.profile);


    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div >

            <AppBar className={classes.appBar} position="static">
                <Toolbar>
                    <Tabs
                        TabIndicatorProps={{style: {backgroundColor: '#eaff00'}}}
                        variant="scrollable"
                        indicatorColor="primary"
                        style={{ overflowY: 'scroll', padding: 0 }}
                        value={value}
                        onChange={handleChange}
                    >
                        <Tab label='Activites' {...a11yProps(0)} />
                        <Tab label='Photos' {...a11yProps(1)} />
                        <Tab label='About' {...a11yProps(2)} />
                    </Tabs>
                </Toolbar>
            </AppBar>


            <TabPanel value={value} index={0}>
                <div style={{ marginBottom: '100px' }}>
                    {
                        activities.map(a => (
                            <ActivityListItem key={a.id} activity={a} />
                        ))
                    }
                </div>
                <div style={{ zIndex: 1, position: 'fixed', left: 0, width: '100%', bottom: 0 }}>
                    <Container style={{ backgroundColor: '#eaff00', opacity: 0.9 }} maxWidth='sm'>
                        <FormControl className={classes.formControl}>
                            <Typography style={{ color: '#6d6d6d' }}>
                                {`${activities.length} activities · @${profile.username}`}
                            </Typography>
                            <Select
                                labelId="schedule-select-label"
                                id="schedule-select"
                                value={schedule}
                                onChange={handleScheduleSearch}
                            >
                                <MenuItem value={'hosting'}>Hosting</MenuItem>
                                <MenuItem value={'going'}>Going</MenuItem>
                                <MenuItem value={'interested'}>Interested</MenuItem>
                            </Select>
                        </FormControl>
                    </Container>
                </div>
            </TabPanel>

            <TabPanel value={value} index={1}>
                <PhotosMenu anchorEl={anchorEl} handleClose={handleClose} />
                <div style={{ marginBottom: '100px' }}>

                    {
                        uploadedPhotos.length > 0 && uploadedPhotos.map(ups =>
                            <Card key={ups.id} className={cardClasses.root}>
                                <CardMedia
                                    className={cardClasses.media}
                                    image={ups.url}
                                />
                                <CardActions disableSpacing>
                                    <IconButton style={{ color: inactive }} aria-label="favorite">
                                        <StarOutlineIcon />
                                    </IconButton>
                                    <CustomBtn>
                                        {`- -`}
                                    </CustomBtn>
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
                </div>
                <div style={{ position: 'fixed', left: 0, width: '100%', bottom: 0 }}>
                    <Container style={{  backgroundColor: '#eaff00', opacity: 0.9 }} maxWidth='sm'>

                        <FormControl className={classes.formControl}>
                            <Typography style={{ color: '#6d6d6d' }}>
                                {`${uploadedPhotos.length} photos · @${profile.username}`}
                            </Typography>

                            <Select
                                className={classes.select}
                                labelId="photos-select-label"
                                id="photos-select"
                                value={photos}
                                onChange={handlePhotoSearch}
                            >
                                <MenuItem value={0}>Last uploaded</MenuItem>
                                <MenuItem value={1}>Most likes</MenuItem>
                            </Select>
                        </FormControl>
                    </Container>
                </div>



                <PhotosTab
                    uploadedPhotos={uploadedPhotos}
                    profile={profile}
                    openPhotosTab={openPhotosTab}
                    setOpenPhotosTab={setOpenPhotosTab}
                />
            </TabPanel>
            <TabPanel style={{ scrollBehavior: 'auto' }} value={value} index={2}>
                <AboutTab profile={profile} />



            </TabPanel>
        </div>
    )
}
