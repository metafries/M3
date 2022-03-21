import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles'
import LandingPage from './pages/LandingPage'
import ActivityList from './pages/ActivityList'
import TopBar from './common/TopBar'
import Container from '@material-ui/core/Container'
import ActivityForm from './popups/ActivityForm'
import CssBaseline from '@material-ui/core/CssBaseline'
import ActivityItem from './cards/ActivityItem'
import ActivityChat from './popups/ActivityChat'

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
  return (
    <MuiThemeProvider theme={custom}>
      <CssBaseline />
      <Route exact path='/' component={LandingPage} />          
      <Route
        path={'/(.+)'}
        render={() => (
          <React.Fragment>
            <TopBar />
            <Container style={{ paddingLeft: 0, paddingRight: 0 }} maxWidth='sm'>
              <Switch>
                <Route exact path='/activities' component={ActivityList} />
                <Route path={['/create', '/edit/:id']} component={ActivityForm} />
                <Route path='/activities/:id' component={ActivityItem} />
              </Switch>
            </Container>
          </React.Fragment>
        )}
      />
    </MuiThemeProvider>  
  )
}
