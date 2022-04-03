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
import { createActivity, updateActivity, handleMenuClose } from '../../actions/activityActs'
import Container from '@material-ui/core/Container';
import { Formik, Form } from 'formik';
import FormikTextInput from '../common/utils/FormikTextInput'
import FormikTextArea from '../common/utils/FormikTextArea'
import FormikSelector from '../common/utils/FormikSelector'
import FormikDateTimePicker from '../common/utils/FormikDateTimePicker'
import { categoryOpts } from '../../constants/categoryOpts';
import cuid from 'cuid';
import * as yup from 'yup';

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
  const dispatch = useDispatch();
  const selectedActivity = useSelector(state =>
    state.activity.activities.find(a => a.id === match.params.id));

  const initialValues = selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    description: '',
    date: new Date(),
    city: '',
    venue: '',
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
    city: yup.string().required(),
    venue: yup.string().required(),
  })

  const handleFormSubmit = async (activity) => {
    if (activity.id.length !== 0) {
      await dispatch(updateActivity(activity));
      dispatch(handleMenuClose());
      history.push(`/activities/${activity.id}`)
    } else {
      const newActivity = {
        ...activity,
        id: cuid(),
        hostedBy: 'BADTZOS',
        hostPhotoURL: '/',
        attendees: [],
      }
      await dispatch(createActivity(newActivity));
      history.push(`/activities/${newActivity.id}`);
    }
  }

  useEffect(() => {
    console.log('real time change preview of activity object :', activity);
  }, [activity]);

  const classes = useStyles();

  return (
    <Formik
      validationSchema={schema}
      enableReinitialize
      initialValues={activity}
      onSubmit={values => handleFormSubmit(values)}
    >
      {({ handleSubmit, dirty }) => (
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
              <Button
                disabled={!dirty}
                size='large'
                onClick={() => handleSubmit()}
              >
                SUBMIT
            </Button>
            </Toolbar>
          </AppBar>
          <Container style={{ marginTop: '55px' }} maxWidth='sm'>
            <Form className={classes.root} autoComplete='off'>
              <FormikTextInput name='title' label='Title' />
              <FormikTextArea name='description' label='Description' maxRows={4} />
              <FormikSelector name='category' label='Category' opts={categoryOpts} />
              <FormikDateTimePicker name='date' label='Date' />
              <FormikTextInput name='city' label='City' />
              <FormikTextInput name='venue' label='Venue' />
            </Form>
          </Container>
        </Dialog>
      )}
    </Formik>
  )
}
