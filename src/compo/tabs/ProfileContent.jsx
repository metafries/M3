import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';
import { DialogContent } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import AboutTab from '../common/user/AboutTab';
import PhotosTab from '../popups/PhotosTab';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { grey, green, purple } from '@material-ui/core/colors';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPhotos, getUserProfile } from '../../api/firestoreService';
import { listenToUserPhotos } from '../../actions/profileActs'
import UserProfile from '../pages/UserProfile';
import useFirestoreCollection from '../../hooks/useFirestoreCollection'
import { CircularProgress } from '@material-ui/core';

const ColorButton = withStyles((theme) => ({
    root: {
      marginTop: theme.spacing(2),
      color: '#00000085',
      border: '1px solid #afadaa87',
      boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
      borderRadius: 0,

    },
}))(Button);

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        width: '100%',
    },
    appBar: {
        color: '#1e1e1f',
        background: '#ffff00',
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
    const classes = useStyles();

    const [openPhotosTab, setOpenPhotosTab] = React.useState(false);
    const [photos, setPhotos] = React.useState(0);
    const handlePhotoSearch = (event) => {
        setPhotos(event.target.value);
    }

    const [value, setValue] = React.useState(2);
    const handleChange = (event, newValue) => {
        // if (newValue == 2) setOpenPhotosTab(true);
        setValue(newValue);
    };
    const dispatch = useDispatch();

    useFirestoreCollection({
        query: () => getUserPhotos(profile.id),
        data: (photos) => dispatch(listenToUserPhotos(photos)),
        deps: [profile.id, dispatch],
    });

    const { uploadedPhotos } = useSelector((state) => state.profile);

    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar} position="static">
                <Toolbar>
                    <Tabs
                        indicatorColor="primary"
                        style={{ padding: 0 }}
                        value={value}
                        onChange={handleChange}
                    >
                        <Tab label='About' {...a11yProps(0)} />
                        <Tab label='Activities' {...a11yProps(1)} />
                        <Tab label='Photos' {...a11yProps(2)} />
                    </Tabs>
                </Toolbar>
            </AppBar>
            <TabPanel value={value} index={0}>
                <AboutTab profile={profile} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <List style={{ margin: '10px', color: '#fff' }}>
                    <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <ListItemIcon style={{ padding: 0, minWidth: '36px', color: '#fff' }}>
                            <InfoOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary={`No post yet.`} />
                    </ListItem>
                </List>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Container style={{
                    marginTop: '10px', 
                    backgroundColor: '#fff'}} 
                    maxWidth='sm'
                >
                    <FormControl className={classes.formControl}>
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
                        <ColorButton
                        size='small'
                      onClick={ () => {
                          if (uploadedPhotos.length > 0) setOpenPhotosTab(true);
                        }}
                    >
                        Go
                    </ColorButton>
                    </FormControl>

                </Container>
                {
                        uploadedPhotos.length === 0 &&   
                        <List style={{ margin: '10px', color: '#aaa' }}>
                        <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                            <ListItemIcon style={{ padding: 0, minWidth: '36px', color: '#aaa' }}>
                                <InfoOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={`Total of 0 photos`} />
                        </ListItem>

                    </List>
                    }

                <PhotosTab
                    uploadedPhotos={uploadedPhotos}
                    profile={profile}
                    openPhotosTab={openPhotosTab}
                    setOpenPhotosTab={setOpenPhotosTab}
                />
            </TabPanel>

        </div>
    )
}
