import React from 'react'
import { View } from 'react-native'
import { LoginButton } from 'react-native-fbsdk'
import { Actions } from 'react-native-router-flux'

import auth from '../auth'

var Login = React.createClass({
  render: function() {
    return (
      <View>
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                auth.propagate().then(this.props.onLoginSuccess)
              }
            }
          }
          onLogoutFinished={() => alert("logout.")}/>
      </View>
    );
  }
});

module.exports = Login
