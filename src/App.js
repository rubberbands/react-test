import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import{ compose } from 'recompose';
import * as contactAction from './actions/contactAction';
import List from './List';
import New from './New';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
//import Edit from './Edit';

var id = '';
  var name = '';
  var age = '';

const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: 'white',
    textDecoration: 'none'
  }
});

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {page: 'new'}
  }

  getData(contact){
    id = contact.id;
    name = contact.name;
    age = contact.age;
  }
  render() {
    const {classes} = this.props;
    return (
      <Router>
        <Grid>
          <div className={classes.root}>
          <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Contact
          </Typography>
          <Button color="inherit">
            <Link to="/edit" className={classes.link}>New</Link>
          </Button>
          <Button color="inherit">
            <Link to="/list" className={classes.link}>List</Link>
          </Button>
          </Toolbar>
          </AppBar>
          </div>
          <Switch>
            <Route path="/list" component={List} />
            <Route path="/edit/:id" component={New} />
            <Route exact path="/edit" component ={New} />
          </Switch>
        </Grid>
      </Router>
    )
  }
}

export default compose(withStyles(useStyles))(App);