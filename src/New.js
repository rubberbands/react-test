import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import * as contactAction from './actions/contactAction';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Box from '@material-ui/core/Box';
import moment from 'moment';
import DatePicker from 'react-moment-datepicker';
import "../../node_modules/react-moment-datepicker/lib/react-moment-datepicker";
class New extends React.Component {
  constructor(props){
    super(props);
    var contact;
    this.state = {name: '', age: '', birthDate: ''};
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeAge = this.handleChangeAge.bind(this);
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
        age : this.props.location.state.age,
        birthdate : this.props.location.state.birthdate
      })
    }
  }

  setData(name, age){
    this.setState({name: name, age: age});
  }

  handleChangeName(event){
    this.setState({name: event.target.value});
  }

  handleChangeAge(event){
    this.setState({age: event.target.value});
  }

  handleChangeDate(date){
    this.setState({birthdate: date});
  }

  handleSubmit(event){
    event.preventDefault();
    let currentDate = moment(new Date()).format("dd-MM-YY");
    let birthdate = this.state.birthdate
    let contact = {
      name: this.state.name,
      age: this.state.age,
      birthdate : birthdate.format('L'),
      updated: currentDate
    }
    if(!this.props.match.params.id){
      contact.created = currentDate;
    } else {
      console.log(this.props.location.state.created);
      contact.created = this.props.location.state.created
    }
    console.log(contact);
    this.setState({
      name: '',
      age: ''
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
           {
              !this.props.contacts.current ? (
                   <Input type="text" value={this.state.name} onChange={this.handleChangeName}/>
                ) : (
                  <Input type="text" value={this.state.name} onChange={this.handleChangeName}/>
                )
            }
        </label>
        <label><br />
          <Box mr={4}>
          Age:
          </Box>
          {
              !this.props.contacts.current ? (
                   <Input type="text" value={this.state.age} onChange={this.handleChangeAge}/>
                ) : (
                  <Input type="text" value={this.state.age} onChange={this.handleChangeAge}/>
                )
            }
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
              dateFormat="dd/MM/yyyy"
              onChange={this.handleChangeDate}
            />
                ) : (
                  <DatePicker
              selected={this.state.birthdate}
              name="birthDate"
              dateFormat="dd-MM-yy"
              onChange={this.handleChangeDate}
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

