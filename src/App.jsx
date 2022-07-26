import React from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles'
import LandingPage from './compo/pages/LandingPage'
import ActivityList from './compo/pages/ActivityList'
import TopBar from './compo/nav/TopBar'
import Container from '@material-ui/core/Container'
import ActivityForm from './compo/popups/ActivityForm'
import CssBaseline from '@material-ui/core/CssBaseline'
import ActivityItem from './compo/cards/ActivityItem'
import ModalContainer from './compo/modal/ModalContainer'
import UserProfile from './compo/pages/UserProfile';
import { useSelector } from 'react-redux';
import LoadingIndicator from './compo/common/utils/LoadingIndicator';
import { ToastContainer } from 'react-toastify';
import './App.css'
import ChatComment from './compo/popups/ChatComment';

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
  const { key } = useLocation();
  const { initialized } = useSelector(state => state.async)

  if (!initialized) return <LoadingIndicator/>

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <MuiThemeProvider theme={custom}>
        <CssBaseline />
        <ToastContainer position='bottom-right' closeButton={false} />
        <ModalContainer />
        <Route exact path='/' component={LandingPage} />
        <Route
          path={'/(.+)'}
          render={() => (
            <React.Fragment>
              <TopBar />
              <Container style={{ paddingLeft: 0, paddingRight: 0 }} maxWidth='sm'>
                <Switch>
                  <Route path='/c/:id' component={ChatComment} key={key} />
                  <Route exact path='/profile/:id' component={UserProfile} />
                  <Route exact path='/activities' component={ActivityList} />
                  <Route path='/activities/:id' component={ActivityItem} />
                  <Route path={['/create', '/edit/:id']} component={ActivityForm} key={key} />
                </Switch>
              </Container>
            </React.Fragment>
          )}
        />
      </MuiThemeProvider>
    </MuiPickersUtilsProvider>
  )
}
