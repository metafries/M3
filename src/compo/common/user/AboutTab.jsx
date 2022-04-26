import { Container, Typography } from '@material-ui/core'
import React from 'react'
import { format } from 'date-fns'

export default function AboutTab({ profile }) {
    return (
        <React.Fragment>
            <Typography style={{ margin: '20px', color: '#fff' }}>
                Joined {format(profile.createdAt, 'dd MMM yyyy')}
            </Typography>
            <Typography style={{ margin: '20px', color: '#fff' }}>
                {profile.description}
            </Typography>
        </React.Fragment>
    )
}
