import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React from 'react'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

export default function Errors({error}) {
    console.log(error)
    return (
        <React.Fragment>
            <List style={{ color: 'red' }}>
                <ListItem>
                    <ListItemIcon style={{ color: 'red', minWidth: '36px' }}>
                        <ErrorOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary={`${error?.code} - ${error?.message}` || 'unknown error'} />
                </ListItem>
            </List>
        </React.Fragment>
    )
}
