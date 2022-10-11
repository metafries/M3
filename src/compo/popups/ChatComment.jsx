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
import { CircularProgress, ListItemSecondaryAction } from '@material-ui/core';
import { handleSelectedTarget, listenToChatComment } from '../../actions/commonActs';
import { formatDistance } from 'date-fns';
import { BrowserRouter, Link, useParams, useHistory } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import useFirestoreDoc from '../../hooks/useFirestoreDoc';
import { listenToActivityFromFirestore, updateUserProfile } from '../../api/firestoreService';
import { handleSelected, listenToActivities } from '../../actions/activityActs';
import FormikTextArea from '../common/utils/FormikTextArea';
import * as yup from 'yup';
import ThumbUpAltSharpIcon from '@material-ui/icons/ThumbUpAltSharp';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import ChatCommentReply from '../popups/ChatCommentReply';
import ChatBubbleOutlineSharpIcon from '@material-ui/icons/ChatBubbleOutlineSharp';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import { formatChatData } from '../../util';

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
    alignItems: 'start',
    marginBottom: theme.spacing(2),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ChatComment({ match }) {
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
      dispatch(listenToChatComment(firebaseObjToArr(snapshot.val())));
    })
  }, [match.params.id, dispatch])

  const { activities } = useSelector(state => state.activity);

  const [openChatCommentReply, setOpenChatCommentReply] = React.useState({ open: false, cid: null });
  const [selectedComment, setSelectedComment] = React.useState();

  const currentCoins = currentUserProfile.coins ? currentUserProfile.coins : 0;

  console.log(comments)
  console.log(formatChatData(comments))

  return (
    <React.Fragment>
      {/*       {
        selectedComment &&
        <ChatCommentReply
          openChatCommentReply={openChatCommentReply}
          setOpenChatCommentReply={setOpenChatCommentReply}
          activityId={match.params.id}
          selectedComment={selectedComment}
        />
      } */}
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
              {`${selectedTarget && selectedTarget.title}`}
              <Typography style={{ display: 'inline' }}>
                {` • ${comments && comments.length} Comments`}
              </Typography>
            </Typography>
          </Toolbar>
        </AppBar>
      <Container style={{ marginTop: '55px', marginBottom: '80px' }} maxWidth='sm'>
          <List className={classes.list}>
            {
              comments && formatChatData(comments).reverse().map(c => (
                <React.Fragment key={c.id}>
                  <ListItem style={{ alignItems: 'start', paddingLeft: 0, paddingRight: 0 }}>
                    <ListItemAvatar style={{ paddingTop: '8px' }}>
                      <Avatar component={Link} to={`/profile/${c.uid}`} alt={c.displayName || ''} src={c.photoURL || '/'} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography style={{ fontWeight: '500' }}>{`${c.displayName}`}
                          <span>&nbsp;&nbsp;</span>
                          <Typography style={{ color: '#323232a8' }} display='inline'>
                            {formatDistance(c.date, new Date())}
                          </Typography>
                        </Typography>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography style={{ overflowX: 'scroll', fontSize: '17px', color: '#000', marginBottom: '15px' }}>
                            {c.text.split('\n').map((t, i) => (<span key={i}>{t}<br /></span>))}
                          </Typography>
                          <IconButton style={{ padding: 0 }}><ThumbUpAltOutlinedIcon style={{ fontSize: '18px' }} /></IconButton>
                          <span style={{ marginLeft: '5px', marginRight: '25px' }}>--</span>
                          <IconButton
                            style={{ padding: 0 }}
                            onClick={() => {
                              setSelectedComment(c);
                              setOpenChatCommentReply({ open: true, cid: c.id });
                            }}
                          >
                            <ChatOutlinedIcon style={{ fontSize: '18px' }} />
                          </IconButton>
                          <span style={{ marginLeft: '5px', marginRight: '25px' }}>
                            {c.replies.length}
                          </span>
                          <IconButton style={{ padding: 0 }}><MonetizationOnOutlinedIcon style={{ fontSize: '18px' }} /></IconButton>
                          <span style={{ marginLeft: '5px', marginRight: '25px' }}>--</span>
                          {/* <Button style={{ padding: 0, borderRadius: 0, color: '#323232a8' }}>REPLY</Button> */}
                        </React.Fragment>
                      }
                    />
                    <IconButton><MoreVertIcon /></IconButton>
                  </ListItem>
                  <ChatCommentReply
                    comment={c}
                    openChatCommentReply={openChatCommentReply}
                    setOpenChatCommentReply={setOpenChatCommentReply}
                    activityId={match.params.id}
                  />
                </React.Fragment>
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
                      await addChatComment(match.params.id, { ...values, baseId: 0 });
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
    </React.Fragment>
  );
}

export default ChatComment