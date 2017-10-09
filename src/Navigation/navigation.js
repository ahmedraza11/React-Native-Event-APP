import { StackNavigator, DrawerItems, DrawerNavigator } from 'react-navigation';
import { ScrollView } from 'react-native';
import React from 'react';
import Signup from '../components/Auth/Signup/signup';
import Login from '../components/Auth/Login/login';
import EventList from '../components/EventList/eventList';
import AddEvent from '../components/AddEvent/addEvent';
import EventDetail from '../components/EventDetail/eventDetail';
import Settings from '../components/Settings/settings';

const drawNavigator = DrawerNavigator({
    EventList: { screen: EventList },
    AddEvent: { screen: AddEvent },
    Setting: {screen: Settings},
    Logout: {screen: Login}
}, {
contentComponent: props =>{ 
    console.log('laskdasd', props)
    return (<ScrollView><DrawerItems {...props}  key={props}/></ScrollView>)},
        contentOptions: {
            activeTintColor: '#FF69B4',
            style: {
                flex: 1,
                paddingTop: 15,
            },
        }
    });

drawNavigator.navigationOptions = {
    header: null
}
export const navigation = StackNavigator({
    signupScreen: { screen: Signup },
    loginScreen: { screen: Login },
    EventDetail: { screen: EventDetail },
    AddEvent: { screen: AddEvent },
    Setting: {screen: Settings},
    eventListScreen: { screen: drawNavigator }
}, {
        headerMode: 'screen',
        initialRouteName: 'loginScreen',
    });