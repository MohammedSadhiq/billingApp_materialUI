import logo from './logo.svg';
import './App.css';
import { ThemeProvider} from '@material-ui/core/styles';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import Navbar from './components/Navbar/Navbar.js'

const theme = createTheme({
  typography :{
    fontFamily : 'Quicksand',
    fontWeightLight : '300',
    fontWeightRegular: '400',
    fontWeightMedium : '500',
    fontWeightBold : '700'
  },
  palette:{
    primary:{
      main: '#27a75c'
    },
    secondary:{
      main: '#f70074'
    }
  }
})


function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <Navbar {...props}/>      
    </ThemeProvider>
  );
}

export default App;
