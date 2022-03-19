import React from 'react'
import Container from '@material-ui/core/Container';
import { Typography } from "@material-ui/core";
import LinearProgress from '@material-ui/core/LinearProgress';

const logo = { height: '25px', width: 'auto' };

export default function LandingPage() {
    return (
        <Container
            maxWidth='xs'
            style={{
                margin: 0,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}
        >
            <img alt='metaphy' style={logo} src='/metafries00.png' />
            <Typography variant='h5' style={{ color: 'whitesmoke' }}>
                Gather up in no time!
            </Typography>
            <LinearProgress />
        </Container>
    )
}
