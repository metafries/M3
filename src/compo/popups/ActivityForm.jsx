import React, { useState } from 'react';
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
  
export default function ActivityForm({ open, handleClose }) {
      const classes = useStyles();
      const [closeRoute, setCloseRoute] = useState('/activities');

    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton 
                component={Link}
                to={closeRoute}              
                edge="start" 
                onClick={handleClose} 
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                CREATE ACTIVITY
              </Typography>
              <Button autoFocus color="inherit" onClick={handleClose}>
                SUBMIT
              </Button>
            </Toolbar>
          </AppBar>
        </Dialog>
    )
}
