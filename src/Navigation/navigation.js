import { ScrollView } from "react-native";
import EventDetail from "../components/EventDetail/eventDetail";
import EventList from "../components/EventList/eventList";
import AddEvent from "../components/AddEvent/addEvent";
import Profile from "../components/Auth/Profile/profile";
import Signup from "../components/Auth/Signup/signup";
import Login from "../components/Auth/Login/login";
import React from "react";

import { StackNavigator, DrawerItems, DrawerNavigator } from "react-navigation";

const drawNavigator = DrawerNavigator(
  {
    EventList: { screen: EventList },
    AddEvent: { screen: AddEvent },
    MyProfile: { screen: Profile },
    Logout: { screen: Login }
  },
  {
    contentComponent: props => {
      return (
        <ScrollView>
          <DrawerItems {...props} key={props} />
        </ScrollView>
      );
    },
    contentOptions: {
      activeTintColor: "#FF69B4",
      style: {
        flex: 1,
        paddingTop: 15
      }
    }
  }
);

drawNavigator.navigationOptions = {
  header: null
};

export const navigation = StackNavigator(
  {
    signupScreen: { screen: Signup },
    loginScreen: { screen: Login },
    EventDetail: { screen: EventDetail },
    AddEvent: { screen: AddEvent },
    Profile: { screen: Profile },
    eventListScreen: { screen: drawNavigator }
  },
  {
    headerMode: "screen",
    initialRouteName: "loginScreen"
  }
);
