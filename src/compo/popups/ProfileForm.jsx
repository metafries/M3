import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import { AppBar, Button, Dialog } from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Formik, Form } from 'formik';
import FormikTextInput from '../common/utils/FormikTextInput';
import FormikTextArea from '../common/utils/FormikTextArea'
import * as yup from 'yup';
import { CircularProgress } from '@material-ui/core';
import {updateUserProfile} from '../../api/firestoreService'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

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
    subheader: {
        padding: 0,
    },
    list: {
        marginBottom: theme.spacing(2),
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProfileForm({
    currentUserProfile,
    openProfileForm,
    setOpenProfileForm,
}) {
    const classes = useStyles();

    return (
        <Dialog
            fullScreen
            open={openProfileForm}
            TransitionComponent={Transition}
        >
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        onClick={() => setOpenProfileForm(false)}
                        edge="start"
                    >
                        <ArrowBackIosIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {currentUserProfile.username}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container style={{ marginTop: '85px' }} maxWidth='sm'>
                <Formik
                    initialValues={{
                        displayName: currentUserProfile.displayName,
                        description: currentUserProfile.description || '',
                    }}
                    validationSchema={yup.object({
                        displayName: yup.string().required()
                    })}
                    onSubmit={async (v, { setSubmitting, setErrors }) => {
                        try {
                            await updateUserProfile(v);
                        } catch (error) {
                            setErrors({ auth: error.message });
                        } finally {
                            setSubmitting(false);
                            setOpenProfileForm(false);
                        }
                    }}
                >
                    {({ errors, isSubmitting, isValid, dirty }) => (
                        <Form className={classes.root} autoComplete='off'>
                            <FormikTextInput name='displayName' label='Display Name' />
                            <FormikTextArea name='description' label='Description' maxRows={4} />
                            {
                                errors.auth &&
                                <List style={{ margin: 0, color: 'red' }}>
                                    <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                                        <ListItemIcon style={{ color: 'red', minWidth: '36px' }}>
                                            <ErrorOutlineIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={errors.auth} />
                                    </ListItem>
                                </List>
                            }
                            <Button type='submit' style={{ borderRadius: 0 }} variant="outlined">
                                {isSubmitting ? <CircularProgress size={20} /> : 'Update profile'}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Container>
        </Dialog>
    )
}
