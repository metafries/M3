import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import mockData from '../../api/mockData';
import { useDispatch, useSelector } from 'react-redux'
import { Field, Form, Formik } from 'formik';
import { addChatComment, firebaseObjToArr, getChatRef } from '../../api/firebaseService';
import { toast } from 'react-toastify';
import FormikTextInput from '../common/utils/FormikTextInput';
import { CircularProgress } from '@material-ui/core';
import { handleSelectedTarget, listenToChatComment } from '../../actions/commonActs';
import { formatDistance } from 'date-fns';
import { BrowserRouter, Link, useParams, useHistory } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import useFirestoreDoc from '../../hooks/useFirestoreDoc';
import { listenToActivityFromFirestore } from '../../api/firestoreService';
import { handleSelected, listenToActivities } from '../../actions/activityActs';
import FormikTextArea from '../common/utils/FormikTextArea';
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

function ChatComment({ match, target, openChat, setOpenChat }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { currentUserProfile } = useSelector(state => state.profile);

  const { selectedTarget, comments } = useSelector(state => state.common);

  useFirestoreDoc({
    query: () => listenToActivityFromFirestore(match.params.id),
    data: a => dispatch(handleSelectedTarget(a)),
    deps: [match.params.id, dispatch],
  })

  useEffect(() => {
    getChatRef(match.params.id).on('value', snapshot => {
      console.log(firebaseObjToArr(snapshot.val()));
      dispatch(listenToChatComment(firebaseObjToArr(snapshot.val()).reverse()));
    })
  }, [match.params.id, dispatch])

  const { activities } = useSelector(state => state.activity);

  return (
    <Dialog
      fullScreen
      open={true}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            component={Link}
            to={activities.length <= 1 ? `/activities/${match.params.id}` : '/activities'}
            edge="start"
            onClick={() => dispatch(handleSelectedTarget(null))}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {selectedTarget && selectedTarget.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '55px', marginBottom: '80px' }} maxWidth='sm'>
        <List className={classes.list}>
          {
            comments && comments.map(c => (
              <ListItem key={c.id} style={{ paddingLeft: 0, paddingRight: 0 }}>
                <ListItemAvatar>
                  <Avatar component={Link} to={`/profile/${c.uid}`} alt={c.displayName || ''} src={c.photoURL || '/'} />
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography>{`${c.displayName}`}<span>&nbsp;</span><Typography style={{ color: '#aaaaaaa3' }} display='inline'>{formatDistance(c.date, new Date())}</Typography></Typography>}
                  secondary={<Typography>{c.text.split('\n').map((t, i) => (<span key={i}>{t}<br/></span>))}</Typography>}
                />
                <Button><MoreVertIcon /></Button>
              </ListItem>
            ))
          }
        </List>
      </Container>
      <div style={{ position: 'fixed', left: 0, width: '100%', bottom: 0, backgroundColor: '#ffffff' }}>
        <Container style={{ marginBottom: '10px' }} maxWidth='sm'>
          <List >
            <ListItem style={{ padding: 0 }} >
              <ListItemAvatar >
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
                    await addChatComment(match.params.id, values.comment);
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
                            placeholder='Add a comment...'
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
  );
}

export default ChatComment