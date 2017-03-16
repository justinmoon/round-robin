import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Scene,
  Router,
  Modal,
  Actions,
} from 'react-native-router-flux';
import TabIcon from './components/TabIcon';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  nestedTabBarStyle: {
    backgroundColor: '#eee',
    top: 0,
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
  purpleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8a3ab9',
  },
  yellowContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fccc63',
  },
  redContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e95950',
  },
  redVioletContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bc2a8d',
  },
});

const Screen = ({s, title}) => {
  return (
    <View style={s}>
      <Text style={styles.welcome}>
        {title}
      </Text>
    </View>
  );
}

const Friends = () => <Screen s={styles.purpleContainer} title='Friends'/>
const Write = () => <Screen s={styles.yellowContainer} title='Write'/>
const Private = () => <Screen s={styles.redContainer} title='Private'/>
const Published = () => <Screen s={styles.redVioletContainer} title='Published'/>

class RR extends Component {
  render() {
    SplashScreen.hide()
    return (
      <Router>
        <Scene key="modal" component={Modal} >
          <Scene key="root" hideNavBar hideTabBar>
            <Scene key="lower-tabs" initial >
              <Scene
                key="lower-tabs-main"
                tabs
                tabBarStyle={styles.tabBarStyle}
                tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
              >
                <Scene key="friends" component={Friends} hideNavBar title="Friends" icon={TabIcon} />
                <Scene 
                  key="write" 
                  direction='vertical' 
                  component={Write} 
                  title="Write" 
                  hideTabBar 
                  icon={TabIcon} 
                  leftTitle='close'
                  onLeft={() => Actions.friends()}
                />
                <Scene key="me" title="Me" hideNavBar icon={TabIcon} >
                  <Scene
                    key="me:tabs"
                    tabs
                    tabBarStyle={styles.nestedTabBarStyle}
                    tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
                  >
                    <Scene
                      key="me:private"
                      title="Private"
                      component={Private}
                      icon={TabIcon}
                    />
                    <Scene 
                      initial 
                      key="me:published" 
                      title="Published" 
                      component={Published} 
                      icon={TabIcon}
                    />
                  </Scene>
                </Scene>
              </Scene>
            </Scene>
          </Scene>
          <Scene key="error" component={Error} />
        </Scene>
      </Router>
    );
  }
}

export default RR;
