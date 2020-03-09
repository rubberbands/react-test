import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import * as contactAction from './actions/contactAction';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Box from '@material-ui/core/Box';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
class New extends React.Component {
  constructor(props){
    super(props);
    var contact;
    this.state = {name: '', phone: '', birthdate: null};
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setData = this.setData.bind(this);
    console.log(this.state.birthDate);
    if(this.props.match.params.id){
      console.log(this.props.location.state.name);
      
    }
  }

  componentDidMount(){
    if(this.props.match.params.id){
      this.setState({
        name : this.props.location.state.name, 
        phone : this.props.location.state.phone,
        birthdate : this.props.location.state.birthdate
      })
    }
  }

  setData(name, phone){
    this.setState({name: name, phone: phone});
  }

  handleChangeName(event){
    this.setState({name: event.target.value});
  }

  handleChangePhone(event){
    this.setState({phone: event.target.value});
  }

  handleChangeDate(date){
    this.setState({birthdate: date});
  }

  handleSubmit(event){
    event.preventDefault();
    let currentDate = moment(new Date()).format("DD-MM-YY");
    let contact = {
      name: this.state.name,
      phone: this.state.phone,
      date: this.state.birthdate,
      birthdate: moment(this.state.birthdate).format("DD-MM-YY"),
      updated: currentDate
    }
    console.log(contact)
    if(!this.props.match.params.id){
      contact.created = currentDate;
    } else {
      console.log(this.props.location.state.created);
      contact.created = this.props.location.state.created
    }
    this.setState({
      name: '',
      phone: ''
    });
    this.props.match.params.id ? 
    (this.props.updateContact(contact, this.props.match.params.id)) :
    (this.props.createContact(contact));
    this.props.history.push('/list');
  }

  render() {
      if(this.props.contacts.current){
        const name = this.props.contacts.current.name;
      }
      console.log(this.state);
      return (
      <div>
      <form>
        <Box mb={1}>
        <label>
        <Box mr={4}>
          Name:
        </Box>
          <Input type="text" value={this.state.name} onChange={this.handleChangeName}/>
        </label>
        <label><br />
          <Box mr={4}>
          Phone:
          </Box>
          <Input type="text" value={this.state.phone} onChange={this.handleChangePhone}/>
        </label>
        <label><br />
          <Box mr={4}>
          Birthdate:
          </Box>
          {
            !this.props.contacts.current ? (
              <DatePicker
              selected={this.state.birthdate}
              name="birthDate"
              dateFormat="dd-MM-yy"
              onChange={date => this.handleChangeDate(date)}
            />
                ) : (
                  <DatePicker
              selected={this.state.birthdate}
              name="birthDate"
              dateFormat="dd-MM-yy"
              onChange={date => this.handleChangeDate(date)}
                />
                )
            }
        </label>
        </Box>
        <Button variant="contained" color="primary" onClick={this.handleSubmit}>
          Submit
        </Button>
      </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    contacts: state.contacts
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getContact: id => dispatch(contactAction.getContact(id)),
    createContact: contact => dispatch(contactAction.createContact(contact)),
    updateContact: (contact, id) => dispatch(contactAction.updateContact(contact, id))

  }
};
export default connect(mapStateToProps, mapDispatchToProps)(New);

