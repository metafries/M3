/* global google */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { createActivity, updateActivity, handleMenuClose, listenToActivities } from '../../actions/activityActs'
import Container from '@material-ui/core/Container';
import { Formik, Form } from 'formik';
import FormikTextInput from '../common/utils/FormikTextInput'
import FormikTextArea from '../common/utils/FormikTextArea'
import FormikSelector from '../common/utils/FormikSelector'
import FormikDateTimePicker from '../common/utils/FormikDateTimePicker'
import { categoryOpts } from '../../constants/categoryOpts';
import cuid from 'cuid';
import * as yup from 'yup';
import FormikPlaceInput from '../common/utils/FormikPlaceInput';
import { toggleDrawer } from '../../actions/commonActs';
import useFirestoreDoc from '../../hooks/useFirestoreDoc';
import { addActivityToFirestore, listenToActivityFromFirestore, updateActivityInFirestore } from '../../api/firestoreService';
import Errors from '../common/utils/Errors';
import LoadingIndicator from '../common/utils/LoadingIndicator';
import { CircularProgress } from '@material-ui/core';

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

export default function ActivityForm({ match }) {
  const { error, loading } = useSelector(state => state.async);
  const { openDrawer } = useSelector(state => state.common);
  const selectedActivity = useSelector(state =>
    state.activity.activities.find(a => a.id === match.params.id));

  const dispatch = useDispatch();
  useFirestoreDoc({
    query: () => listenToActivityFromFirestore(match.params.id),
    data: activity => dispatch(listenToActivities([activity])),
    deps: [match.params.id, dispatch]
  })  

  const initialValues = selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    description: '',
    date: new Date(),
    city: {
      address: '',
      latLng: null
    },
    venue: {
      address: '',
      latLng: null
    },
  }

  const [activity, setActivity] = useState(initialValues);
  console.log(selectedActivity)

  const { id } = useParams();
  const history = useHistory();

  const [closeRoute, setCloseRoute] = useState('/');
  useEffect(() => {
    selectedActivity ? setCloseRoute(`/activities/${id}`) : setCloseRoute('/activities');
  }, [id, selectedActivity])

  let schema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    category: yup.string().required(),
    date: yup.date().min(new Date()),
    city: yup.object().shape({
      address: yup.string().required('city is a required field')
    }),
    venue: yup.object().shape({
      address: yup.string().required('venue is a required field')
    }),
  })

  const handleFormSubmit = async (activity) => {
    if (activity.id.length !== 0) {
      await updateActivityInFirestore(activity);
      dispatch(handleMenuClose());
      history.push(`/activities/${activity.id}`)
    } else {
      await addActivityToFirestore(activity);
      dispatch(toggleDrawer(openDrawer));
      history.push(`/activities`);
    }
  }

  useEffect(() => {
    console.log('real time change preview of activity object :', activity);
  }, [activity]);

  const classes = useStyles();

  if (match.path != '/create' && error) return <Errors error={error} />
  if (loading) return <LoadingIndicator />

  return (
    <Formik
      validationSchema={schema}
      enableReinitialize
      initialValues={initialValues}
      onSubmit={values => {
        try {
          handleFormSubmit(values);
        } catch (error) {
          console.log(error.message);
        }
      }}
    >
      {({ isSubmitting, handleSubmit, dirty, values }) => (
        <Dialog
          fullScreen
          open={true}
          onClose={() => { }}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                component={Link}
                to={closeRoute}
                edge="start"
                onClick={() => {
                  dispatch(handleMenuClose());
                }}
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                {selectedActivity ? 'EDIT' : 'CREATE'}
              </Typography>
              {
                isSubmitting
                  ? <CircularProgress size={24} />
                  : <Button
                      disabled={!dirty}
                      size='large'
                      onClick={() => handleSubmit()}
                    >
                      SUBMIT
                    </Button>
              }
            </Toolbar>
          </AppBar>
          <Container style={{ marginTop: '55px' }} maxWidth='sm'>
            <Form className={classes.root} autoComplete='off'>
              <FormikTextInput name='title' label='Title' />
              <FormikTextArea name='description' label='Description' maxRows={4} />
              <FormikSelector name='category' label='Category' opts={categoryOpts} />
              <FormikDateTimePicker name='date' label='Date' />
              <FormikPlaceInput name='city' label='City' />
              <FormikPlaceInput
                name='venue'
                label='Venue'
                disabled={!values.city.latLng}
                options={{
                  location: new google.maps.LatLng(values.city.latLng),
                  radius: 1000,
                  types: ['establishment']
                }}
              />
            </Form>
          </Container>
        </Dialog>
      )}
    </Formik>
  )
}
