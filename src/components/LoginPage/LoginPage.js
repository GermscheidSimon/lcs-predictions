import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';

class LoginPage extends Component {

  state ={
    isLoginPage: true
  }

  handleSwitchToRegister = () => {
    this.setState({
      isLoginPage:  false
    })
  }
  render() {
    return (
      <>
        {
          this.state.isLoginPage ?
            <LoginForm handleSwitchToRegister={this.handleSwitchToRegister}/>
          :
            <RegisterForm />
        }
      </>
    );
  }
}

export default connect(mapStoreToProps)(LoginPage);