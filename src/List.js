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
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class ContactList extends React.Component {
  constructor(props){
    super(props);

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.editContact = this.editContact.bind(this);
  }

  handleChangeName(event){
    console.log(this.state.currentName);
    this.setState({currentName: event.target.value});
  }

  handleChangePhone(event){
    this.setState({currentPhone: event.target.value});
  }

  listView(data, index){
    return (
      <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          Name : {data.name}
        </Typography>
        <Typography color="textSecondary">
          Created : {data.created}
        </Typography>
        <Typography variant="body2" component="p">
           Phone : {data.phone} <br/>
           Birthdate : {data.birthdate}
        </Typography>
      </CardContent>
      <CardActions>
        <EditIcon onClick={(e) => this.editContact(e, {
                id: index,
                name: data.name,
                phone: data.phone,
                birthdate: data.date,
                created: data.created
              })}>
               Update
            </EditIcon>
        <DeleteIcon onClick={(e) => this.deleteContact(e, index)} className="btn btn-danger">
              Remove
            </DeleteIcon>
      </CardActions>
    </Card>
    )   
  }

   editContact(e, contact){
      console.log(contact);
      this.props.history.push({
        pathname : "/edit/"+contact.id,
        state : {name : contact.name, phone : contact.phone, birthdate : contact.birthdate, created : contact.created}
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
          <Grid>
          {this.props.contacts.list.map((contact, i) => this.listView(contact, i))}
          </Grid>
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