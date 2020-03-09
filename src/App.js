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
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import ListUI from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
//import Edit from './Edit';

var id = '';
  var name = '';
  var age = '';
const drawerWidth = 140;
const useStyles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  link: {
    color: 'blue',
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
          <div className={classes.root}>
          <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Contact
          </Typography>
          </Toolbar>
          </AppBar>
          <Drawer className={classes.drawer} variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor="left"
          >
          <div className={classes.toolbar} />
          <ListUI>
            <ListItem button key="New">
              <Link to="/edit" className={classes.link}>New</Link>
            </ListItem>
            <ListItem button key="List">
              <Link to="/list" className={classes.link}>List</Link>
            </ListItem>
          </ListUI>
          </Drawer>
          <main className={classes.content}>
          <div className={classes.toolbar} />
            <Switch>
              <Route path="/list" component={List} />
              <Route path="/edit/:id" component={New} />
              <Route exact path="/edit" component ={New} />
            </Switch>
          </main>
          </div>
      </Router>
    )
  }
}

export default compose(withStyles(useStyles))(App);