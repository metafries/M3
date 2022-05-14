import { AppBar, Button, Dialog } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import FormikTextInput from '../common/utils/FormikTextInput';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { updateUserPassword } from '../../api/firebaseService';

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

export default function Security({
    openSecurity,
    setOpenSecurity,
}) {
    const { currentUser } = useSelector(state => state.auth);
    const classes = useStyles();

    return (
        <Dialog
            fullScreen
            open={openSecurity}
            TransitionComponent={Transition}
        >
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton 
                        onClick={() => setOpenSecurity(false)}
                        edge="start"
                    >
                        <ArrowBackIosIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Change password
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container style={{ marginTop: '85px' }} maxWidth='sm'>

            {
                currentUser.providerId !== 'password' &&
                <List style={{ margin: 0, color: '#323232' }}>
                    <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                            <ListItemIcon style={{ minWidth: '36px', color: '#323232' }}>
                                <InfoOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={`You are currently logged in with ${currentUser.providerId}，the new password will set to the password of email/password Sign-in method.`}                 />
                    </ListItem>
                </List>                    
            }
            <Formik
                initialValues={{newPwd: '', confirmNewPwd: ''}}
                validationSchema={yup.object({
                    newPwd: yup.string().trim().required('Password is required'),
                    confirmNewPwd: yup.string().oneOf(
                        [yup.ref('newPwd'), null], 
                        'Passwords do not match'
                    )
                })}
                onSubmit={ async (v, { setSubmitting, setErrors }) => {
                    try {
                        await updateUserPassword(v);
                    } catch (error) {
                        setErrors({auth: error.message});
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, isSubmitting, isValid, dirty }) => (
                    <Form className={classes.root} autoComplete='off'>
                        <FormikTextInput name='newPwd' label='New password' type='password' />
                        <FormikTextInput name='confirmNewPwd' label='Confirm new password' type='password' />
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
                            { isSubmitting ? <CircularProgress size={20} /> : 'Update password' }
                        </Button>
                    </Form>
                )}
            </Formik>
            </Container>
        </Dialog>
    )
}
