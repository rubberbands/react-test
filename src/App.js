import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import { connect } from 'react-redux';
import * as contactAction from './actions/contactAction';
import List from './List';
import New from './New';
//import Edit from './Edit';

var id = '';
  var name = '';
  var age = '';

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
    return (
      <Router>
        <div>
          <button>
            <Link to="/edit">New</Link>
          </button>
          <button>
            <Link to="/list">List</Link>
          </button>
          <Switch>
            <Route path="/list" component={List} />
            <Route path="/edit/:id" component={New} />
            <Route exact path="/edit" component ={New} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;