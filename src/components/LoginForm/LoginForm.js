import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';


const darkTheme = createTheme({ palette: { mode: 'dark' } });

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'white',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
      color: 'white'
    },
    '&:hover fieldset': {
      borderColor: 'grey',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
});
class LoginForm extends Component {
  state = {
    username: '',
    password: '',
  };
  

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <Box sx={{
        width: 500,
        height: 400,
        justifyContent: "center",
        alignItems:"center",
        marginLeft: 'auto',
        marginRight: 'auto',
        
      }}>          
      <ThemeProvider theme={darkTheme}>
        <Paper elevation={3} sx={{paddingBottom: '20px', marginTop: '30px'}}>
          <Stack
            alignItems={'center'}
            >
              <form className="formPanel" onSubmit={this.login}>
                <h2>Login</h2>
                {this.props.store.errors.loginMessage && (
                  <h3 className="alert" role="alert">
                    {this.props.store.errors.loginMessage}
                  </h3>
                )}
                <div>
                  <Box
                    sx={{
                      width: 300,
                      height: 200,
                    }}
                      >
                    <Stack  spacing={2}>
                      <CssTextField 
                          label="Username"
                          variant="outlined" 
                          type="text"
                          required
                          value={this.state.username}
                          onChange={this.handleInputChangeFor('username')}
                          placeholder="Enter Username"
                          sx={{
                            borderColor: 'white',
                            input: { color: 'white' },
                            label:  { color: 'white' }
                          }}
                        />

                      <CssTextField
                          label="Password"
                          variant="outlined" 
                          type="password"
                          name="password"
                          placeholder="Enter Password"
                          required
                          value={this.state.password}
                          onChange={this.handleInputChangeFor('password')}
                          sx={{
                            borderColor: 'white',
                            input: { color: 'white' },
                            label:  { color: 'white' }
                          }}
                        />
                      </Stack>
                  </Box>
                </div>
                <Stack  spacing={2} direction={"row"}>
                
                  <Button 
                      className="btn" 
                      type="submit" 
                      name="submit" 
                      value="Log In"
                      sx={{
                        color: 'white',
                        text: {color: 'white'}
                      }}
                    >Login
                  </Button>
                  <Button 
                      onClick={() => this.props.handleSwitchToRegister()}
                      className="btn" 
                      variant='outlined' 
                      name="Register" 
                      sx={{
                        color: 'white',
                        text: {color: 'white'}
                      }}
                    >Register
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Paper>
        </ThemeProvider>
      </Box>
    );
  }
}

export default connect(mapStoreToProps)(LoginForm);