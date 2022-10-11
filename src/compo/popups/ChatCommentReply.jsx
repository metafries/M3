import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { AppBar, Avatar, Button, CircularProgress, Container, IconButton, Input, List, ListItem, ListItemAvatar, ListItemText, Toolbar, Typography } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { addChatComment } from '../../api/firebaseService';
import { toast } from 'react-toastify';
import { BrowserRouter, Link, useParams, useHistory } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import { updateUserProfile } from '../../api/firestoreService';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
        paddingTop: '20px',
        paddingBottom: '20px',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    subheader: {
        padding: 0,
    },
    list: {
        alignItems: 'start',
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
        maxHeight: '100px',
        overflow: 'scroll',
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ChatCommentReply({
    comment,
    openChatCommentReply,
    setOpenChatCommentReply,
    activityId,
}) {
    const classes = useStyles();

    const { currentUserProfile } = useSelector(state => state.profile);

    const history = useHistory();

    const currentCoins = currentUserProfile.coins ? currentUserProfile.coins : 0;
    console.log(comment)

    return (
        <Dialog
            fullScreen
            open={openChatCommentReply.open && openChatCommentReply.cid === comment.id}
            onClose={() => setOpenChatCommentReply(false)}
            TransitionComponent={Transition}
        >
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        style={{ float: 'right' }}
                        edge="start"
                        color="inherit"
                        onClick={() => setOpenChatCommentReply({open: false, cid: null})}
                    >
                        <ArrowBackIosIcon />
                    </IconButton>
                    <List className={classes.list}>
                        <ListItem key={comment.id} style={{ alignItems: 'start' }}>
                            <ListItemText
                                primary={
                                    <React.Fragment>
                                        <Button
                                            onClick={() => history.push(`/profile/${comment.uid}`)}
                                            display='inline'
                                            style={{ padding: 0, fontWeight: '500' }}
                                        >
                                            {`${comment.displayName}`}
                                        </Button>
                                        <span>&nbsp;&nbsp;</span>
                                        <Typography style={{ color: '#323232a8' }} display='inline'>
                                            {` • ${comment.replies.length} ${comment.replies.length > 1 ? 'Replies' : 'Reply'}`}
                                        </Typography>
                                    </React.Fragment>
                                }
                                secondary={
                                    <Typography style={{ fontSize: '17px', color: '#000', marginBottom: '15px' }}>
                                        {comment.text.split('\n').map((t, i) => (<span key={i}>{t}<br /></span>))}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    </List>
                </Toolbar>
            </AppBar>
            <Container style={{ marginTop: '160px' }} maxWidth='sm'>
                <List>
                    {
                        comment.replies.length > 0 &&
                        comment.replies.reverse().map(r => (
                            <React.Fragment key={r.id}>
                                <ListItem style={{ alignItems: 'start', paddingLeft: 0, paddingRight: 0 }}>
                                    <ListItemAvatar style={{ paddingTop: '8px' }}>
                                        <Avatar component={Link} to={`/profile/${r.uid}`} alt={r.displayName || ''} src={r.photoURL || '/'} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography style={{ fontWeight: '500' }}>{`${r.displayName}`}
                                                <span>&nbsp;&nbsp;</span>
                                                <Typography style={{ color: '#323232a8' }} display='inline'>
                                                    {formatDistance(r.date, new Date())}
                                                </Typography>
                                            </Typography>
                                        }
                                        secondary={
                                            <React.Fragment>
                                                <Typography style={{ overflowX: 'scroll', fontSize: '17px', color: '#000', marginBottom: '15px' }}>
                                                    {r.text.split('\n').map((t, i) => (<span key={i}>{t}<br /></span>))}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                    <IconButton><MoreVertIcon /></IconButton>
                                </ListItem>
                            </React.Fragment>
                        ))
                    }
                </List>
            </Container>
            <div style={{ position: 'fixed', left: 0, width: '100%', bottom: 0, backgroundColor: '#ffffff' }}>
                <Container style={{ marginBottom: '10px' }} maxWidth='sm'>
                    <List>
                        <ListItem style={{ padding: 0 }}>
                            <ListItemAvatar>
                                <Avatar
                                    alt={(currentUserProfile && currentUserProfile.displayName) || ''}
                                    src={(currentUserProfile && currentUserProfile.photoURL) || '/'}
                                />
                            </ListItemAvatar>
                            <Formik
                                initialValues={{ comment: '' }}
                                validationSchema={yup.object({
                                    comment: yup.string().trim().required()
                                })}
                                onSubmit={async (values, { setSubmitting, resetForm }) => {
                                    try {
                                        await addChatComment(activityId, { ...values, baseId: comment.id });
                                        await updateUserProfile({ ...currentUserProfile, coins: currentCoins + 10 });
                                        resetForm();
                                    } catch (error) {
                                        toast.error(error.message);
                                    } finally {
                                        setSubmitting(false);
                                    }
                                }}
                            >
                                {({ isValid, dirty, handleSubmit, isSubmitting }) => (
                                    <React.Fragment>
                                        <Form style={{ width: '100%' }} autoComplete='off'>
                                            <Field name='comment'>
                                                {({ field }) => (
                                                    <Input
                                                        {...field}
                                                        multiline={true}
                                                        fullWidth
                                                        placeholder='Add a reply...'
                                                        onKeyPress={(e) => {
                                                            if (e.key === 'Enter' && e.shiftKey) {
                                                                console.log(e)
                                                                return;
                                                            }
                                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                                e.preventDefault();
                                                                isValid && handleSubmit();
                                                            }
                                                        }}
                                                    />
                                                )}
                                            </Field>
                                        </Form>
                                        <Button disabled={!isValid || !dirty || isSubmitting} onClick={() => handleSubmit()}>
                                            {isSubmitting ? <CircularProgress size={24} /> : 'Send'}
                                        </Button>
                                    </React.Fragment>
                                )}
                            </Formik>
                        </ListItem>
                    </List>
                </Container>
            </div>
        </Dialog>
    )
}

export default ChatCommentReply