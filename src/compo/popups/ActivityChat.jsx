import React, { useEffect, useState } from 'react';
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
import { Link, useParams } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { LinearProgress } from '@material-ui/core';
import mockData from '../../api/mockData';

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

function ActivityChat({ activity, openChat, setOpenChat }) {
  const { id } = useParams();
  const classes = useStyles();

  return (
    <Dialog
      fullScreen
      open={openChat}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton 
            onClick={() => setOpenChat(false)}
            edge="start"
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {activity.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '55px', marginBottom: '80px' }} maxWidth='sm'>
        <List className={classes.list}>
          {mockData.messages.map(({ id, primary, secondary, person }) => (
            <React.Fragment key={id}>
              {id === 1 && <ListSubheader className={classes.subheader}>Today</ListSubheader>}
              {id === 3 && <ListSubheader className={classes.subheader}>Yesterday</ListSubheader>}
              <ListItem style={{padding:0}} button>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" src={person} />
                </ListItemAvatar>
                <ListItemText primary={primary} secondary={secondary} />
                <Button><MoreVertIcon /></Button>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Container>
      <div style={{ position: 'fixed', left: 0, width: '100%', bottom: 0, backgroundColor: '#ffffff' }}>
          <Container maxWidth='sm'>
            <List >
              <ListItem style={{ padding: 0 }} >
                <ListItemAvatar >
                  <Avatar alt={''} src={'' || '/'} />
                </ListItemAvatar>
                <FormControl fullWidth>
                  <FormHelperText>{''}</FormHelperText>
                  <Input autoFocus />
                </FormControl>
                <Button onClick={() => {}}>Send</Button>
              </ListItem>
            </List>
          </Container>
        </div>

    </Dialog>
  );
}

export default ActivityChat