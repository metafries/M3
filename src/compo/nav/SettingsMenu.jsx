import { ListItemIcon, Menu, MenuItem } from '@material-ui/core'
import React from 'react'
import SecurityIcon from '@material-ui/icons/Security';
import Typography from '@material-ui/core/Typography';
import Security from '../popups/Security';

export default function SettingsMenu({
    open,
    anchorEl,
    handleClose,
}) {
    const [openSecurity, setOpenSecurity] = React.useState(false);

    const listItemIcon = {
        minWidth: '40px',
        color: 'whitesmoke',
    };

    return (
        <React.Fragment>
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
                <MenuItem onClick={() => setOpenSecurity(true)}>
                    <ListItemIcon style={listItemIcon}>
                        <SecurityIcon/>
                    </ListItemIcon>
                    <Typography>Password</Typography>
                </MenuItem>
            </Menu>
        </React.Fragment>
    )
}
