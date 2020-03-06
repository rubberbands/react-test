import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import * as contactAction from './actions/contactAction';

class New extends React.Component {
  constructor(props){
    super(props);
    var contact;
    this.state = {name: '', age: ''};
    
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeAge = this.handleChangeAge.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setData = this.setData.bind(this);

    if(this.props.match.params.id){
      console.log(this.props.location.state.name);
      
    }
  }

  componentDidMount(){
    if(this.props.match.params.id){
      this.setState({name : this.props.location.state.name, age : this.props.location.state.age})
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

  handleSubmit(event){
    event.preventDefault();
    let contact = {
      name: this.state.name,
      age: this.state.age
    }
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
        <label>
          Name: 
           {
              !this.props.contacts.current ? (
                   <input type="text" value={this.state.name} onChange={this.handleChangeName}/>
                ) : (
                  <input type="text" value={this.state.name} onChange={this.handleChangeName}/>
                )
            }
        </label>
        <label><br />
          Age:
          {
              !this.props.contacts.current ? (
                   <input type="text" value={this.state.age} onChange={this.handleChangeAge}/>
                ) : (
                  <input type="text" value={this.state.age} onChange={this.handleChangeAge}/>
                )
            }
        </label><br />
        <input type="submit" value="Submit" onClick={this.handleSubmit}/>
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

