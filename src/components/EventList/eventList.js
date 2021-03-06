import React, { Component } from "react";
import { eventListStyles } from "./eventListStyles";
import {
  View,
  Text,
  DrawerLayoutAndroid,
  AsyncStorage,
  TouchableOpacity,
  ScrollView
} from "react-native";

import { Header, Icon, SideMenu, List, ListItem } from "react-native-elements";
import { AddEventService } from "../../services/addEventService";
import RNGooglePlaces from "react-native-google-places";
import ActionButton from "react-native-action-button";

const Events = [];
class EventList extends Component {
  constructor() {
    super();
    this.state = {
      DrawerOpen: true,
      events: []
    };
  }

  static navigationOptions = {
    header: null
  };
 
  componentDidMount() {
    AsyncStorage.getItem("Events", (err, res) => {
      this.setState({ events: JSON.parse(res) });
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1 }}>
        <Header
          leftComponent={
            <Icon
              name="menu"
              color="white"
              onPress={() => {
                navigate("DrawerOpen");
              }}
            />
          }
          centerComponent={{ text: "Event List", style: { color: "#fff" } }}
          outerContainerStyles={{ backgroundColor: "#009688" }}
        />

        <ScrollView style={{ marginTop: 50 }}>
          <List containerStyle={{ marginBottom: 20 }}>
            {this.state.events !== null
              ? this.state.events.map((l, i) => (
                  <TouchableOpacity
                    onPress={() => navigate("EventDetail", { id: i })}
                  >
                    <ListItem roundAvatar key={i} title={l.eventName} />
                  </TouchableOpacity>
                ))
              : null}
          </List>
        </ScrollView>

        <ActionButton
          buttonColor="#009688"
          onPress={() => navigate("AddEvent")}
        />
        
      </View>
    );
  }
}

export default EventList;
