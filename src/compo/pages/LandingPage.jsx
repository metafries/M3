import React from 'react'
import Container from '@material-ui/core/Container';
import { Typography } from "@material-ui/core";
import LinearProgress from '@material-ui/core/LinearProgress';
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import { signOutFirebase } from '../../api/firebaseService';

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
            <IconButton 
                component={Link}
                to='/activities'
                style={{ padding: 0 }}
            >                
                <img alt='metaphy' style={logo} src='/metafries00.png' />
            </IconButton>            
            <Typography variant='h5' style={{ color: 'whitesmoke' }}>
                Gather up in no time!
            </Typography>
            <LinearProgress />
        </Container>
    )
}
