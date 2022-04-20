import { Container, Typography } from '@material-ui/core'
import React from 'react'
import { format } from 'date-fns'

export default function AboutTab({ currentUserProfile }) {
    return (
        <React.Fragment>
            <Typography style={{ margin: '20px', color: '#fff' }}>
                Joined {format(currentUserProfile.createdAt, 'dd MMM yyyy')}
            </Typography>
            <Typography style={{ margin: '20px', color: '#fff' }}>
                {currentUserProfile.description}
            </Typography>
        </React.Fragment>
    )
}
