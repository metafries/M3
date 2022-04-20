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

const useStyles = makeStyles((theme) => ({
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

export default function ProfileContent({currentUserProfile}) {
    const classes = useStyles();

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                <AboutTab currentUserProfile={currentUserProfile} />
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
                Photos
            </TabPanel>
        </div>
    )
}
