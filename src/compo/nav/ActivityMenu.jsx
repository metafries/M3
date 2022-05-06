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
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import BookmarkBorderSharpIcon from '@material-ui/icons/BookmarkBorderSharp';

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
                        background: '#1e1e1feb',
                        boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',            
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
                            <BookmarkBorderSharpIcon />
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