import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { useSelector, useDispatch } from 'react-redux'
import { openModal } from '../../actions/commonActs'
import ActivityDeleteConfirm from '../modal/ActivityDeleteConfirm';
import { toggleActivityForm, handleMenuClose } from '../../actions/activityActs'

function ActivityMenu({
    open,
    anchorEl,
    handleClose,
}) {
    const { selectedActivity } = useSelector(state => state.activity)
    const dispatch = useDispatch();

    const listItemIcon = {
        minWidth: '40px',
        color: 'whitesmoke',
    };

    return (
        <React.Fragment>
            <Menu
                PaperProps={{
                    style: {
                        color: 'whitesmoke',
                        background: 'rgba(10,10,10,0.9)',
                        boxShadow: 'none',
                        borderRadius: 0,
                    },
                }}
                elevation={0}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                id="settings "
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => handleClose()}
            >
                {
                    selectedActivity &&
                    <MenuItem>
                        <ListItemIcon style={listItemIcon}>
                            <BookmarkBorderIcon />
                        </ListItemIcon>
                        <Typography>Save</Typography>
                    </MenuItem>
                }
                {
                    selectedActivity &&
                    <MenuItem>
                        <ListItemIcon style={listItemIcon}>
                            <FlagOutlinedIcon />
                        </ListItemIcon>
                        <Typography>Report</Typography>
                    </MenuItem>
                }
                {
                    selectedActivity &&
                    <MenuItem
                        component={Link}
                        to={selectedActivity && `/edit/${selectedActivity.id}`}
                        onClick={() => handleClose()}
                    >
                        <ListItemIcon style={listItemIcon}>
                            <EditOutlinedIcon />
                        </ListItemIcon>
                        <Typography>Edit</Typography>
                    </MenuItem>
                }
                {
                    selectedActivity &&
                    <MenuItem onClick={() => dispatch(openModal(<ActivityDeleteConfirm />))}>
                        <ListItemIcon style={listItemIcon}>
                            <DeleteOutlineIcon />
                        </ListItemIcon>
                        <Typography>Delete</Typography>
                    </MenuItem>
                }
            </Menu>
        </React.Fragment>
    )
}

export default ActivityMenu