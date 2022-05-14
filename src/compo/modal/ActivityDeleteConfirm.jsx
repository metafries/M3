import { Button, ButtonGroup, CircularProgress, makeStyles, Typography, withStyles } from '@material-ui/core'
import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import WarningTwoToneIcon from '@material-ui/icons/WarningTwoTone';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux'
import { handleMenuClose } from '../../actions/activityActs'
import { closeModal } from '../../actions/commonActs'
import { deleteActivityInFirestore } from '../../api/firestoreService';
import { asyncActionFinish, asyncActionStart } from '../../reducers/asyncRdc';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const CustomButton = withStyles((theme) => ({
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
  const { loading } = useSelector(state => state.async);
  const { selectedActivity } = useSelector(state => state.activity);
  const dispatch = useDispatch();

  const handleDeleteActivity = async id => {
    dispatch(asyncActionStart());
    dispatch(handleMenuClose());
    await deleteActivityInFirestore(id);
    dispatch(closeModal());
    dispatch(asyncActionFinish());
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
          loading
            ? <Button><CircularProgress style={{ color: '#fc4000' }} size={20} /></Button>
            : <CustomButton
              onClick={() => handleDeleteActivity(selectedActivity.id)}
              style={{ borderRadius: 0 }}
              variant="outlined"
              color="secondary"
            >
              Delete Anyway
            </CustomButton>
        }
      </ButtonGroup>
    </div>
  )
}

export default ActivityDeleteConfirm