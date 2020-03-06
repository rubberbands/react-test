import React from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import * as contactAction from './actions/contactAction';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

class ContactList extends React.Component {
  constructor(props){
    super(props);

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeAge = this.handleChangeAge.bind(this);
    this.editContact = this.editContact.bind(this);
  }

  handleChangeName(event){
    console.log(this.state.currentName);
    this.setState({currentName: event.target.value});
  }

  handleChangeAge(event){
    this.setState({currentAge: event.target.value});
  }

  listView(data, index){
    return (
        <ListItem>
            <ListItemText>
              Name : {data.name}
            </ListItemText>
            <ListItemText>
              Age : {data.age}
            </ListItemText>
            <ListItemIcon>
              <EditIcon onClick={(e) => this.editContact(e, {
                id: index,
                name: data.name,
                age: data.age
              })}>
               Update
            </EditIcon>
            </ListItemIcon>
            <ListItemIcon>
            <DeleteIcon onClick={(e) => this.deleteContact(e, index)} className="btn btn-danger">
              Remove
            </DeleteIcon>
            </ListItemIcon>
        </ListItem>
    )   
  }

   editContact(e, contact){
      console.log(contact);
      this.props.history.push({
        pathname : "/edit/"+contact.id,
        state : {name : contact.name, age :  contact.age}
      });
   }

  deleteContact(e, index){
    e.preventDefault();
    this.props.deleteContact(index);
  }
  
  render() {
      return (
      <Grid>
      { this.props.contacts.list.length === 0 ? (<p>No data</p>) : (
        <List className="list-group">
          {this.props.contacts.list.map((contact, i) => this.listView(contact, i))}
        </List>
        ) 
      }
      </Grid>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("map state to props");
  return {
    contacts: state.contacts
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteContact: index => dispatch(contactAction.deleteContact(index))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(ContactList);