/* global google */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { Input, List, ListItem, ListItemIcon, ListItemText, TextField } from '@material-ui/core';
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
import { addActivityToFirestore, listenToActivityFromFirestore, setActivityPoster, updateActivityInFirestore } from '../../api/firestoreService';
import Errors from '../common/utils/Errors';
import LoadingIndicator from '../common/utils/LoadingIndicator';
import { CircularProgress, FormHelperText } from '@material-ui/core';
import PosterHLStepper from '../steps/PosterHLStepper';
import DropzoneWidget from '../common/utils/DropzoneWidget';
import CropperWidget from '../common/utils/CropperWidget';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { toast } from 'react-toastify';
import { getFileExtension } from '../../util';
import { uploadPosterToStorage } from '../../api/firebaseService';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(4),
      marginBottom: '5px',
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
  const selectedActivity = useSelector(state => state.activity.activities.find(a => a.id === match.params.id));

  const [files, setFiles] = React.useState([]);
  const [image, setImage] = React.useState(selectedActivity ? selectedActivity.posterURL : null);
  const [preview, setPreview] = React.useState(selectedActivity ? selectedActivity.posterURL : null);
  const [uploading, setUploading] = React.useState(false);

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
    selectedActivity ? setActivity(selectedActivity) : setActivity(initialValues);
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

  const handleUploadImage = (auid) => {
    const filename = files[0] ? cuid() + '.' + getFileExtension(files[0].name) : '';
    const uploadTask = uploadPosterToStorage(auid, image, filename);
    uploadTask.on('state_changed', snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    }, error => {
      console.log('1st', error.message);
      setUploading(false);
    }, () => {
      uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
        setActivityPoster(auid, downloadURL, filename).then(() => {
          setFiles([]);
          setImage(null);
        }).catch(error => {
          console.log('2nd', error.messge)
        });
      })
    })
  }

  const handleFormSubmit = async (activity) => {
    setActivity(activity);
    if (activity.id.length !== 0) {
      setUploading(true);
      await updateActivityInFirestore(activity);
      if (files.length > 0) {
        await handleUploadImage(activity.id);
      }
      setUploading(false);
      history.push(`/activities/${activity.id}`)
    } else {
      if (files.length > 0) {
        setUploading(true);
        const newpost = await addActivityToFirestore(activity);
        await handleUploadImage(newpost.id);
        setUploading(false);
        history.push(`/activities/${newpost.id}`);
      } else {
        toast.error('Poster is required');
      }
    }
  }

  const classes = useStyles();

  if (match.path != '/create' && error) return <Errors error={error} />
  if (loading) return <LoadingIndicator />


  return (
    <Formik
      validationSchema={schema}
      enableReinitialize
      initialValues={activity}
      onSubmit={values => {
        try {
          handleFormSubmit(values);
        } catch (error) {
          console.log(error.message);
        }
      }}
    >
      {({ handleSubmit, dirty, values }) => (
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
                uploading
                  ? <CircularProgress size={24} />
                  : <Button
                    disabled={!dirty && files.length === 0}
                    size='large'
                    onClick={() => handleSubmit()}
                  >
                    SUBMIT
                    </Button>
              }
            </Toolbar>
          </AppBar>
          <Container style={{ marginTop: '55px', marginBottom: '55px' }} maxWidth='sm'>
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
              <TextField disabled name='poster' label="Poster" value={files.length > 0 ? files[0].name : ' '} />
            </Form>
            <img src={preview} style={{ width: '100%' }} />
            {
              files.length > 0 &&
              <CropperWidget
                aspectRatio={16 / 9}
                setImage={setImage}
                setPreview={setPreview}
                imagePreview={files.length > 0 ? files[0].preview : ''}
              />

            }
            <DropzoneWidget files={files} setFiles={setFiles} />
          </Container>
        </Dialog>
      )}
    </Formik>
  )
}
