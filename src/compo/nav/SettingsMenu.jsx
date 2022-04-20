import { ListItemIcon, Menu, MenuItem } from '@material-ui/core'
import React from 'react'
import SecurityIcon from '@material-ui/icons/Security';
import Typography from '@material-ui/core/Typography';
import ProfileForm from '../popups/ProfileForm'
import Security from '../popups/Security';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';

export default function SettingsMenu({
    isCurrentUser,
    currentUserProfile,
    open,
    anchorEl,
    handleClose,
}) {
    const [openSecurity, setOpenSecurity] = React.useState(false);
    const [openProfileForm, setOpenProfileForm] = React.useState(false);

    const listItemIcon = {
        minWidth: '40px',
        color: 'whitesmoke',
    };

    return (
        <React.Fragment>
            <ProfileForm
                currentUserProfile={currentUserProfile}
                openProfileForm={openProfileForm}
                setOpenProfileForm={setOpenProfileForm}
            />
            <Security openSecurity={openSecurity} setOpenSecurity={setOpenSecurity} />
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
                id="settings"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => handleClose()}
            >
                {
                    isCurrentUser &&
                    <MenuItem onClick={() => setOpenProfileForm(true)}>
                        <ListItemIcon style={listItemIcon}>
                            <EditOutlinedIcon />
                        </ListItemIcon>
                        <Typography>Edit</Typography>
                    </MenuItem>

                }
                {
                    isCurrentUser &&
                    <MenuItem onClick={() => setOpenSecurity(true)}>
                        <ListItemIcon style={listItemIcon}>
                            <SecurityIcon />
                        </ListItemIcon>
                        <Typography>Password</Typography>
                    </MenuItem>
                }
                {
                    !isCurrentUser &&
                    <MenuItem>
                        <ListItemIcon style={listItemIcon}>
                            <FlagOutlinedIcon />
                        </ListItemIcon>
                        <Typography>Report</Typography>
                    </MenuItem>
                }
            </Menu>
        </React.Fragment>
    )
}
