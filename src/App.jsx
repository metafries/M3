import React, { useState } from 'react'
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles'
import LandingPage from './pages/LandingPage'
import ActivityList from './pages/ActivityList'
import TopBar from './common/TopBar'
import { sampleData } from './api/sampleData'
import Container from '@material-ui/core/Container'

const custom = createTheme({
    palette: {
      primary: {
        main: '#2b2c2d',
      },
      text: {
        secondary: "#afadaa"
      }
    },
    typography: {
      h6: {
        fontSize: '1rem',
      },
      fontFamily: 'Oswald, sans-serif'
    },
});  

export default function App() {
    const [activities, setActivities] = useState(sampleData);

    return (
        <MuiThemeProvider theme={custom}>
            <TopBar />
            <Container style={{ paddingLeft: 0, paddingRight: 0 }} maxWidth='sm'>
                <ActivityList activities={activities} />
            </Container>
        </MuiThemeProvider>  
    )
}
