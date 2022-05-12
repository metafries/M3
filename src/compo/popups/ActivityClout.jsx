import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ActivityCloutItem from '../common/activity/ActivityCloutItem';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import mockData from '../../api/mockData'

const useStyles = makeStyles((theme) => ({
    appBar: {
        color: '#1e1e1f',
        background: '#ffff00',
        position: 'fixed',
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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

function ActivityClout({ 
    activity, 
    openActivityClout, 
    setOpenActivityClout 
}) {
    const [value, setValue] = React.useState(1);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const classes = useStyles();

    return (
        <React.Fragment>
            {
                activity && activity.attendees &&
                <Dialog
                    fullScreen
                    scroll='paper'
                    PaperProps={{
                        style: {
                            borderRadius: 0,
                            color: 'whitesmoke',
                            // backdropFilter: 'blur(20px)',
                            background: '#1e1e1feb',
                
                        }
                    }}
                    open={openActivityClout}
                    onClose={() => setOpenActivityClout(false)}
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                style={{ float: 'right' }}
                                edge="start"
                                color="inherit"
                                onClick={() => setOpenActivityClout(false)}
                            >
                                <CloseIcon />
                            </IconButton>
                            <Tabs
                                indicatorColor="primary"
                                style={{ padding: 0 }}
                                value={value}
                                onChange={handleChange}
                            >
                                <Tab label={activity.interested ? `${activity.interested.length} Interested` : `0 Interested`} {...a11yProps(0)} />
                                <Tab label={`${activity.attendees.length} Going`} {...a11yProps(1)} />
                            </Tabs>
                        </Toolbar>
                    </AppBar>
                    <Container style={{ marginTop: '68px' }} maxWidth='sm'>
                        <DialogContent style={{ padding: 0 }}>
                            <TabPanel value={value} index={0}>
                                <List>
                                    {activity?.interested?.map(user =>
                                        <ActivityCloutItem key={user.id} user={user} />
                                    )}
                                </List>
                            </TabPanel>
                        </DialogContent>
                        <DialogContent style={{ padding: 0 }}>
                            <TabPanel value={value} index={1}>
                                <List>
                                    {activity.attendees.map(user =>
                                        <ActivityCloutItem 
                                            key={user.id} 
                                            user={user} 
                                            hostUsername={activity.hostedBy} 
                                            
                                        />
                                    )}
                                </List>
                            </TabPanel>
                        </DialogContent>
                    </Container>
                </Dialog>
            }
        </React.Fragment>
    );
}

export default ActivityClout