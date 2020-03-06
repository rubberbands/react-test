import React from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import * as contactAction from './actions/contactAction';

class Edit extends React.Component {
  constructor(props){
    super(props);
    this.state = {id: this.props.id, name: this.props.name, age: this.props.age};
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeAge = this.handleChangeAge.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      id: this.state.id,
      name: this.state.name,
      age: this.state.age
    }
    console.log(contact);
    this.setState({
      id: '',
      name: '',
      age: ''
    });
    this.props.updateContact(contact);
    this.props.history.push('/list');
  }

  render() {
    const { params } = this.props.match
      return (
      <div>
      {params.id}
      <form>
        <label>
          Name:
          <input type="text" value={this.state.name} onChange={this.handleChangeName}/>
        </label>
        <label><br />
          Age:
          <input type="text" value={this.state.age} onChange={this.handleChangeAge}/>
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
    updateContact: contact => dispatch(contactAction.updateContact(contact))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Edit);