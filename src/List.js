import React from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import * as contactAction from './actions/contactAction';

class List extends React.Component {
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
        <div className="row">
          <div className="col-md-10">
            <li className="list-group-item clearfix">
              Name : {data.name}<br/>
              Age : {data.age}
            </li>
          </div>
          <div>
             <button onClick={(e) => this.editContact(e, {
              id: index,
              name: data.name,
              age: data.age
             })}>
               Update
            </button>
          </div>
          <div className="col-md-2">
            <button onClick={(e) => this.deleteContact(e, index)} className="btn btn-danger">
              Remove
            </button>
          </div>
        </div>
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
      <div>
      { this.props.contacts.list.length === 0 ? (<p>No data</p>) : (
        <ul className="list-group">
          {this.props.contacts.list.map((contact, i) => this.listView(contact, i))}
        </ul>
        ) 
      }
      </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(List);