/*
Sign up page
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { StyleSheet, AlertIOS, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';

import { signupUser, clearError, goToSignin } from '../actions';

const styles = StyleSheet.create({
  error: {
    flex: 1,
    alignSelf: 'stretch',
    marginBottom: -250,
    marginTop: 50,
  },
  errorMessage: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginRight: 15,
  },
  font: {
    fontFamily: 'Avenir Next',
  },
  label: {
    fontSize: 45,
  },
  titleContainer: {
    marginTop: '42%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pink: {
    color: '#f4424b',
    fontWeight: 'normal',
  },
  blue: {
    color: '#519bdd',
  },
  cookies: {
    width: 32,
    height: 32,

  },
  rotate1: {
    transform: [{ rotate: '72deg' }],
  },
  rotate2: {
    transform: [{ rotate: '144deg' }],
  },
  rotate3: {
    transform: [{ rotate: '216deg' }],
  },
  rotate4: {
    transform: [{ rotate: '288deg' }],
  },
  container: {
    flex: 1,
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputs: {
    flex: 1,
    alignSelf: 'stretch',
    height: 1100,
    marginBottom: 100,
  },
  TextInput: {
    alignSelf: 'center',
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5,
  },
  buttonBox: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#f4424b',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#f4424b',
    width: '80%',
    height: 45,
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 1,
    shadowColor: '#60060b',
    shadowOpacity: 1.0,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  signinBox: {
    flex: 1,
    alignSelf: 'stretch',
  },
  signin: {
    alignSelf: 'center',
  },
  signinText: {
    textDecorationLine: 'underline',
  },
  pictures: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    marginLeft: 40,
    marginRight: 40,
    marginTop: -40,
    marginBottom: -40,
  },
});

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      password: '',
      retypePassword: '',
    };
    this.updateEmail = this.updateEmail.bind(this);
    this.updateFullname = this.updateFullname.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updateRetypePassword = this.updateRetypePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignin = this.handleSignin.bind(this);
    this.renderError = this.renderError.bind(this);
  }

  updateEmail(text) {
    this.setState({
      email: text,
    });
  }

  updatePassword(text) {
    this.setState({
      password: text,
    });
  }

  updateFullname(text) {
    this.setState({
      fullname: text,
    });
  }

  updateRetypePassword(text) {
    this.setState({
      retypePassword: text,
    });
  }

  // make sure user inputs all the necessary information
  validateFields() {
    const regexpNum = /\d+/;
    const regExpChar = /@/;
    if (this.state.password !== this.state.retypePassword) {
      AlertIOS.alert('Passwords don\'t match! Try again. ');
      return false;
    }
    // checks for any occurance of a number in user's name
    // borrowed heavily from w3schools.com
    if (this.state.fullname.match(regexpNum)) {
      AlertIOS.alert('Your full name cannot contain numbers! Try again. ');
      return false;
    }
    // checks if user's email address has a @ symbol
    // borrowed heavily from w3schools.com
    if (this.state.email.match(regExpChar) === null) {
      AlertIOS.alert('You must input a valid email address. Try again!');
      return false;
    }
    return true;
  }

  // sign up
  handleSubmit(event) {
    event.preventDefault();
    if (this.validateFields()) {
      const user = {
        fullname: this.state.fullname,
        email: this.state.email.toLowerCase(),
        password: this.state.password,
      };
      this.props.signupUser(user);
    }
  }

  // go to signin page
  handleSignin(event) {
    this.props.clearError();
    this.props.goToSignin();
  }

  // render the authentication error if it exists
  renderError() {
    if (this.props.error === null) {
      return <View />;
    } else {
      return <View><Text style={styles.errorMessage}>{this.props.error}</Text></View>;
    }
  }

  render(props) {
    return (
      <View style={styles.container}>
        <View style={styles.error}>
          {this.renderError()}
        </View>
        <View style={styles.titleContainer}>
          <Text style={[styles.font, styles.label, styles.pink]}>Munch</Text>
          <Text style={[styles.font, styles.label, styles.blue]}>Buddy</Text>
        </View>
        <View style={styles.pictures}>
          <Image
            style={[styles.cookies, styles.rotate]}
            source={require('../imgs/cookie.png')}
          />
          <Image
            style={[styles.cookies, styles.rotate1]}
            source={require('../imgs/cookie.png')}
          />
          <Image
            style={[styles.cookies, styles.rotate2]}
            source={require('../imgs/cookie.png')}
          />
          <Image
            style={[styles.cookies, styles.rotate3]}
            source={require('../imgs/cookie.png')}
          />
          <Image
            style={[styles.cookies, styles.rotate4]}
            source={require('../imgs/cookie.png')}
          />
        </View>
        <View style={styles.inputs}>
          <TextInput style={[styles.font, styles.TextInput]} placeholder={'Full Name'} onChangeText={this.updateFullname} value={this.state.fullname} />
          <TextInput style={[styles.font, styles.TextInput]} placeholder={'Email'} autoCapitalize="none" onChangeText={this.updateEmail} value={this.state.email} />
          <TextInput style={[styles.font, styles.TextInput]} placeholder={'Password'} secureTextEntry onChangeText={this.updatePassword} value={this.state.password} />
          <TextInput style={[styles.font, styles.TextInput]} placeholder={'Retype Password'} secureTextEntry onChangeText={this.updateRetypePassword} value={this.state.retypePassword} />
        </View>
        <View style={styles.buttonBox}>
          <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
            <Text style={[styles.font, styles.buttonText]}> Sign Up! </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signinBox}>
          <TouchableOpacity style={styles.signin} onPress={this.handleSignin}>
            <Text style={[styles.signinText, styles.font]}> Already have an account? Sign in here </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => (
  {
    error: state.auth.message,
    auth: state.auth.authenticated,
  }
);

const mapDispatchToProps = dispatch => (
  {
    signupUser: ({ fullname, email, password }) => dispatch(signupUser({ fullname, email, password })),
    clearError: () => dispatch(clearError()),
    goToSignin: () => dispatch(goToSignin()),
  }
);

export default (connect(mapStateToProps,
  mapDispatchToProps)(SignUp));
