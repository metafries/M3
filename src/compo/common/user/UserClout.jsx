import React from 'react'
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { grey, green, purple } from '@material-ui/core/colors';

const content = 'textSecondary';

const CustomBtn = withStyles({
    root: {
        color: '#afadaa',
    }
})(Button);

const ColorButton = withStyles((theme) => ({
    root: {
      color: grey[50],
      backgroundColor: grey[800],
      border: '1px solid #16161680',
      boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
      borderRadius: 0,
      float: 'right',
      '&:hover': {
        backgroundColor: '#4d4d4d',
      },
    },
}))(Button);

export default function UserClout({
    isCurrentUser
}) {
    return (
        <Typography color={content}>
            <CustomBtn onClick={() => {}}>
                12 Followers · 7 Following
            </CustomBtn>
            {
                !isCurrentUser &&
                <ColorButton variant="outlined">Follow</ColorButton>
            }
        </Typography>
    )
}
