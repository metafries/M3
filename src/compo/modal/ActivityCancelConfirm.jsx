import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, ButtonGroup, CircularProgress, makeStyles, Typography, withStyles } from '@material-ui/core'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import WarningTwoToneIcon from '@material-ui/icons/WarningTwoTone';

import { closeModal } from '../../actions/commonActs';
import { cancelActivityToggle } from '../../api/firestoreService';

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

export default function ActivityCancelConfirm() {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.async);
    const { selectedActivity } = useSelector(state => state.activity);

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
                {`The attendees will be removed from the list automatically and cannot be undone.`}
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
                            onClick={ async () => {
                                await cancelActivityToggle(selectedActivity);
                                dispatch(closeModal());
                            }}
                            style={{ borderRadius: 0 }}
                            variant="outlined"
                            color="secondary"
                        >
                            Cancel Anyway
                        </CustomButton>
                }
            </ButtonGroup>
        </div>
    )
}
