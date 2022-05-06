import { CircularProgress, Menu, MenuItem } from '@material-ui/core'
import React from 'react'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Typography from '@material-ui/core/Typography';
import AccountBoxSharpIcon from '@material-ui/icons/AccountBoxSharp';
import { useSelector, useDispatch } from 'react-redux';
import { setMainPhoto } from '../../api/firestoreService';
import PhotoDeleteConfirm from '../modal/PhotoDeleteConfirm';
import { openModal } from '../../actions/commonActs'
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';

export default function PhotosMenu({
    anchorEl,
    handleClose,
}) {
    const dispatch = useDispatch();

    const { selectedPhoto } = useSelector(state => state.profile);

    const [updating, setUpdating] = React.useState(false);
    const handleSetMainPhoto = async (photo) => {
        setUpdating(true);
        try {
            await setMainPhoto(photo);
        } catch (error) {
            console.log(error);
        } finally {
            setUpdating(false);
        }
    }

    const listItemIcon = {
        minWidth: '40px',
        color: 'whitesmoke',
    };

    return (
        <Menu
            PaperProps={{
                style: {
                    color: 'whitesmoke',
                    background: 'rgba(10,10,10,0.7)',
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
            id="photosmunu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => handleClose()}
        >
            <MenuItem onClick={() => handleSetMainPhoto(selectedPhoto)}>
                <ListItemIcon style={listItemIcon}>
                    {updating ? <CircularProgress style={{ color: '#fff' }} size={18} /> : <AccountBoxSharpIcon />}
                </ListItemIcon>
                <Typography>Main </Typography>
            </MenuItem>
            <MenuItem onClick={() => dispatch(openModal(<PhotoDeleteConfirm handleClose={handleClose} />))}>
                <ListItemIcon style={listItemIcon}>
                    <DeleteOutlineIcon />
                </ListItemIcon>
                <Typography>Delete</Typography>
            </MenuItem>
            <MenuItem>
                <ListItemIcon style={listItemIcon}>
                    <FlagOutlinedIcon />
                </ListItemIcon>
                <Typography>Report</Typography>
            </MenuItem>
        </Menu>
    )
}
