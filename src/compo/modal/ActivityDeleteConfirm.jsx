import { Button, ButtonGroup, CircularProgress, makeStyles, Typography, withStyles } from '@material-ui/core'
import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import WarningTwoToneIcon from '@material-ui/icons/WarningTwoTone';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux'
import { deleteActivity, handleMenuClose } from '../../actions/activityActs'
import { closeModal } from '../../actions/commonActs'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const DeleteButton = withStyles((theme) => ({
  root: {
    border: '1px solid #fc4000',
    color: '#fc4000',
    backgroundColor: 'transparent',
    '&:hover': {
      border: '1px solid #ff0000',
      color: '#ff0000',
      backgroundColor: 'transparent',
    },
  },
}))(Button);

function ActivityDeleteConfirm() {
  const history = useHistory();
  const { selectedActivity } = useSelector(state => state.activity);
  const dispatch = useDispatch();

  const handleDeleteActivity = async id => {
    dispatch(handleMenuClose());
    await dispatch(deleteActivity(id));
    dispatch(closeModal());
    history.push('/activities');
  }

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List style={{ color: '#fff', padding: 0 }}>
        <ListItem style={{ padding: 0 }}>
          <ListItemIcon style={{ color: '#fff', minWidth: '36px' }}>
            <WarningTwoToneIcon />
          </ListItemIcon>
          <ListItemText style={{ margin: 0, padding: 0 }} primary='Are you sure?' />
        </ListItem>
      </List>
      <Typography style={{ color: '#fff' }}>
        {`It will be deleted and cannot be undone.`}
      </Typography>
      <ButtonGroup style={{ marginBottom: 0 }} variant="text" size="small">
        <Button
          onClick={() => dispatch(closeModal())}
          style={{ marginRight: '10px', border: '1px solid #a9a9a9', color: '#a9a9a9', borderRadius: 0 }}
          variant="outlined"
        >
          Cancel
      </Button>
        {
          false
            ? <Button><CircularProgress style={{ color: '#fc4000' }} size={20} /></Button>
            : <DeleteButton
              onClick={() => handleDeleteActivity(selectedActivity)}
              style={{ borderRadius: 0 }}
              variant="outlined"
              color="secondary"
            >
              Delete Anyway
            </DeleteButton>
        }
      </ButtonGroup>
    </div>
  )
}

export default ActivityDeleteConfirm