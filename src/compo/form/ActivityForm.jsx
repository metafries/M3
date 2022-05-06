/* global google */
import React from 'react'
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import FormikTextInput from '../common/utils/FormikTextInput'
import FormikTextArea from '../common/utils/FormikTextArea'
import FormikSelector from '../common/utils/FormikSelector'
import FormikDateTimePicker from '../common/utils/FormikDateTimePicker'
import FormikPlaceInput from '../common/utils/FormikPlaceInput'
import { categoryOpts } from '../../constants/categoryOpts';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux'
import { addActivityToFirestore, listenToActivityFromFirestore, updateActivityInFirestore } from '../../api/firestoreService';
import { createActivity, updateActivity, handleMenuClose, listenToActivities } from '../../actions/activityActs'
import { Link, useParams, useHistory } from 'react-router-dom';
import { toggleDrawer } from '../../actions/commonActs';
import { CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';

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

export default function ActivityForm({ match }) {
    const classes = useStyles();

    const selectedActivity = useSelector(state => state.activity.activities.find(a => a.id === match.params.id));

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

    const dispatch = useDispatch();
    const history = useHistory();
    const { openDrawer } = useSelector(state => state.common);

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
                </Form>
            )}
        </Formik>
    )
}
