// loading screen that says "Finding your match..." when user presses Match me!
// maybe include a spinny loady thing

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import MatchPage from '../containers/matchPage';

import { getMatchResult, clearMatchResult } from '../actions';
import BeenMatched from './beenMatched';

const styles = StyleSheet.create({
  container: {
    marginTop: 75,
    alignItems: 'center',
  },
  image: {
    width: 107,
    height: 165,
    padding: 10,
  },
  description: {
    padding: 10,
    fontSize: 20,
    color: '#854af2',
  },
});

class MatchLoading extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }


  render() {
    console.log('state of this.props.match:');
    console.log(this.props.match);
    if (this.props.match !== null) {
      return <BeenMatched />;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.description}>Finding your match... Check back shortly!</Text>
        <TouchableHighlight onPress={() => {
          this.props.navigator.pop();
          // remove match request action
        }}
        >
          <Text style={styles.topicLabel}>Cancel</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const mapStateToProps = state => (
  {
    match: state.match.receivedMatch,
  }
);

const mapDispatchToProps = dispatch => (
  {
    getMatchResult: () => dispatch(getMatchResult()),
    clearMatchResult: () => dispatch(clearMatchResult()),
  }
);

export default (connect(mapStateToProps, mapDispatchToProps)(MatchLoading));