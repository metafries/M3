import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import SearchIcon from '@material-ui/icons/Search';
import Container from '@material-ui/core/Container';
import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import ListItem from '@material-ui/core/ListItem';
import { List } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import InputAdornment from '@material-ui/core/InputAdornment';
import FilterListIcon from '@material-ui/icons/FilterList';
import { categoryOpts } from '../../constants/categoryOpts';

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: '#ffff00',
    position: 'fixed',
  },
  title: {
    color: '#1e1e1f',
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ActivitySearch({ openActivitySearch, closeActivitySearch }) {
  const [filter, setFilter] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [state, setState] = useState({
    drinks: false,
    foods: false,
    film: false,
    games: false,
    music: false,
    networking: false,
    sports: false,
    shopping: false,
    tech: false,
    others: false,
  });

  const noChecked = () => {
    categoryOpts.map(opt => {
      if (state[opt.val]) return false;
    })
    return true;
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      setFilter(true);
    } else if (noChecked()) {
      setFilter(false);
    }
  }; 

  const handleChange = (event) => {
    console.log(event.target.checked)
    const checked = event.target.checked;
    setState({ ...state, [event.target.name]: checked });
    if (checked) {
      setFilter(true);
    } else if (noChecked() && !selectedDate) {
      console.log(noChecked())
      setFilter(false);
    }
  };

  const classes = useStyles();

  return (
    <Dialog
      fullScreen
      open={openActivitySearch}
      onClose={(() => closeActivitySearch())}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            onClick={() => closeActivitySearch()}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            SEARCH
            </Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '85px' }} maxWidth='sm'>
        <Typography variant="h6">
          Start Date
      </Typography>
        <DatePicker
          clearable
          style={{ padding: 0, marginBottom: '30px', width: '100%' }}
          value={selectedDate}
          onChange={handleDateChange}
          animateYearScrolling
          format="yyyy-MM-dd"
        />
        <Typography variant="h6">
          Categories
      </Typography>
        {
          categoryOpts.map(opt => (
            <FormControlLabel
              key={opt.val}
              control={
                <Checkbox
                  checked={state[opt.val]}
                  onChange={handleChange}
                  name={opt.val}
                  color="primary"
                />
              }
              label={opt.txt}
            />
          ))
        }
      </Container>
      <div style={{ position: 'fixed', left: 0, width: '100%', bottom: 0, backgroundColor: '#afadaa' }}>
        <Container maxWidth='sm'>
          <List>
            <ListItem style={{ padding: 0 }} >
              <FormControl fullWidth>
                <Input
                  style={{ overflow: 'scroll' }}
                  startAdornment={
                    categoryOpts.map(opt => {
                      if (state[opt.val])
                        return <InputAdornment position="start">
                          <Chip
                            icon={<FilterListIcon />}
                            size="small"
                            label={opt.txt}
                          />
                        </InputAdornment>
                    })
                  }
                />
              </FormControl>
              <IconButton
                edge="start"
                onClick={() => closeActivitySearch()}
                aria-label="close"
              >
                <SearchIcon style={{ color: '#000000', fontSize: 30 }} />
              </IconButton>
            </ListItem>
          </List>
        </Container>
      </div>
    </Dialog>
  );
}

export default ActivitySearch