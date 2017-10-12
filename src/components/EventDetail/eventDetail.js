import React, { Component } from "react";
import { eventDetailStyles } from "./eventDetailStyles";
import { AddEventService } from "../../services/addEventService";
import {
  View,
  Text,
  Image,
  AsyncStorage,
  TouchableOpacity,
  ScrollView
} from "react-native";

import { Header, Icon, Card, Divider } from "react-native-elements";

const currentEvent = {};
class EventDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: [],
      eventId: props.navigation.state.params.id
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("Events", (err, res) => {
      this.setState({ event: JSON.parse(res) });
    });
  }

  static navigationOptions = {
    header: null
  };

  render() {
    const { navigate, goBack } = this.props.navigation;
    return (
      <View>
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
          centerComponent={{ text: "Event Detail", style: { color: "#fff" } }}
          rightComponent={
            <TouchableOpacity>
              <Icon
                name="home"
                color="#fff"
                onPress={() => {
                  goBack();
                }}
              />
            </TouchableOpacity>
          }
          outerContainerStyles={{ backgroundColor: "#009688" }}
        />

        <ScrollView style={{ marginTop: 50 }}>
          <Card
            title={
              this.state.event.length !== 0
                ? this.state.event[parseInt(this.state.eventId)].eventName
                : ""
            }
            containerStyle={{ marginTop: 100 }}
          >
            <Image
              style={{ width: "auto", height: 150 }}
              resizeMode="cover"
              source={{
                uri:
                  "http://www.naijaevents.com/wp-content/uploads/2013/11/event1.png"
              }}
            />

            <Text style={{ marginTop: 5 }}>
              {this.state.event.length !== 0
                ? this.state.event[parseInt(this.state.eventId)].eventDesc
                : ""}
            </Text>

            <Divider style={{ marginTop: 15 }} />

            <Text
              style={{ textAlign: "left", fontWeight: "bold", marginTop: 10 }}
            >
              Address
            </Text>
            <Text>
              {this.state.event.length !== 0
                ? this.state.event[parseInt(this.state.eventId)].placeName
                : ""}
            </Text>
            <Text>
              {this.state.event.length !== 0
                ? this.state.event[parseInt(this.state.eventId)].placeAddress
                : ""}
            </Text>

            <Divider style={{ marginTop: 15 }} />

            <Text>
              {this.state.event.length !== 0
                ? this.state.event[parseInt(this.state.eventId)].date
                : ""}
            </Text>
            <Text>
              {this.state.event.length !== 0
                ? this.state.event[parseInt(this.state.eventId)].time
                : ""}
            </Text>
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
              Created By:
              {this.state.event.length !== 0
                ? this.state.event[parseInt(this.state.eventId)].createdBy
                : ""}
            </Text>
          </Card>
        </ScrollView>
      </View>
    );
  }
}
export default EventDetail;
