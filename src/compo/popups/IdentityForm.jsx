import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { Link, useParams, useHistory } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import DialogContent from '@material-ui/core/DialogContent';
import FacebookIcon from '@material-ui/icons/Facebook';
import { CircularProgress, LinearProgress, withStyles } from '@material-ui/core';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import FormikTextInput from '../common/utils/FormikTextInput';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { thirdParty, signInUser, signOutUser } from '../../actions/authActs'
import { useSelector, useDispatch } from 'react-redux'

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

export default function IdentityForm({ open, handleClose, setAuthenticated }) {
  const dispatch = useDispatch();

  const classes = useStyles();
  const [closeRoute, setCloseRoute] = useState('/activities');

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const progressClasses = makeStyles((theme) => ({
    root: {
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2),
    },
  }));

  let loginSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required(),
  })

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={() => handleClose(false)}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            style={{ float: 'right' }}
            edge="start"
            color="inherit"
            onClick={() => handleClose(false)}
          >
            <CloseIcon />
          </IconButton>
          <Tabs
            indicatorColor="primary"
            style={{ padding: 0 }}
            value={value}
            onChange={handleChange}
          >
            <Tab label='Login' {...a11yProps(0)} />
            <Tab label='Register' {...a11yProps(1)} />
          </Tabs>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '68px' }} maxWidth='sm'>
        <DialogContent style={{ padding: 0 }}>
          <TabPanel value={value} index={0}>
            <Button
              startIcon={<FacebookIcon />}
              type='submit'
              style={{ marginTop: '32px', width: '100%', borderRadius: 0 }}
              variant="outlined"
              onClick={() => {
                dispatch(thirdParty());
                handleClose(true);
              }}
            >
              Log in with facebook
            </Button>
            <LinearProgress className={progressClasses.root} />
            <hr className="hr-text" data-content="OR" />
            <Formik
              initialValues={{ email: '', password: '', error: null }}
              validationSchema={loginSchema}
              onSubmit={(values, { setSubmitting }) => {
                console.log(values);
                dispatch(signInUser(values));
                setSubmitting(false);
                handleClose(true);
              }}
            >
              {({ handleSubmit, isSubmitting, errors }) => (
                <Form className={classes.root} autoComplete='off'>
                  <FormikTextInput name='email' label='Email' />
                  <FormikTextInput name='password' label='Password' type='password' />
                  {
                    errors.error &&
                    <List style={{ margin: 0, color: 'red' }}>
                      <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <ListItemIcon style={{ color: 'red', minWidth: '36px' }}>
                          <ErrorOutlineIcon />
                        </ListItemIcon>
                        <ListItemText primary={errors.error} />
                      </ListItem>
                    </List>
                  }
                  <Button type='submit' style={{ borderRadius: 0 }} variant="outlined">
                    {isSubmitting ? <CircularProgress size={20} /> : 'Log In'}
                  </Button>
                </Form>
              )}
            </Formik>
          </TabPanel>
        </DialogContent>
        <DialogContent style={{ padding: 0 }}>
          <TabPanel value={value} index={1}>
          </TabPanel>
        </DialogContent>
      </Container>
    </Dialog>
  )
}
