import { MuiThemeProvider, createTheme } from '@material-ui/core/styles'
import LandingPage from './pages/LandingPage'

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

function App() {
  return (
    <MuiThemeProvider theme={custom}>
      <LandingPage/>
    </MuiThemeProvider>
  );
}

export default App;
