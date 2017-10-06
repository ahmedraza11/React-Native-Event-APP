import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  AsyncStorage,
  Modal,
  StyleSheet
} from "react-native";
import { AddEventService } from "../../services/addEventService";
// import { addEventStyles } from './eventDetailStyles';

import {
  Icon,
  Header,
  Card,
  FormInput,
  FormLabel
} from "react-native-elements";
import DateTimePicker from "react-native-modal-datetime-picker";
import MapView from "react-native-maps";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

const Events = [];
class AddEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDateTimePickerVisible: false,
      selectedDateTime: null,
      eventDesc: null,
      eventName: null,
      createdBy: this.props.navigation.state.params.name,
      isModalOpen: false
    };
  }
  componentWillMount() {
    const data = AddEventService.loadEvents(Events);
    console.log("All Events ", Events);
  }

  _showDateTimePicker = () =>
    this.setState({
      isDateTimePickerVisible: true
    });

  _hideDateTimePicker = () =>
    this.setState({
      isDateTimePickerVisible: false
    });

  handleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  _handleDatePicked = date => {
    this.setState({
      selectedDateTime: date
    });
    this._hideDateTimePicker();
  };

  handleCreateEvent() {
    const eventData = AddEventService.createEvent(this.state, Events);
    console.log("Event Data", eventData);
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    return (
      <KeyboardAwareScrollView
        style={{
          flex: 1,
          flexDirection: "column"
        }}
      >
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
          centerComponent={{
            text: "Add Event",
            style: {
              color: "#fff"
            }
          }}
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
          outerContainerStyles={{
            backgroundColor: "#009688"
          }}
        />
        <Card
          title="Add Event"
          containerStyle={{
            marginTop: 80
          }}
        >
          <FormLabel> Event Name </FormLabel>

          <FormInput
            onChangeText={txt =>
              this.setState({
                eventName: txt
              })}
          />

          <FormLabel> Event Description </FormLabel>
          <FormInput
            onChangeText={txt =>
              this.setState({
                eventDesc: txt
              })}
          />

          <TouchableOpacity
            style={{
              flexDirection: "row",
              backgroundColor: "#009688",
              width: 160,
              padding: 5,
              marginBottom: 10,
              marginTop: 10
            }}
            onPress={this._showDateTimePicker}
          >
            <Icon name="perm-contact-calendar" color="#fff" />
            <Text style={{ color: "#fff" }}> Add Date and Time </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              backgroundColor: "#009688",
              width: 120,
              padding: 5,
              marginBottom: 10,
              marginTop: 10
            }}
            onPress={() => {
              this.handleModal();
            }}
          >
            <Icon name="add-location" color="#fff" />
            <Text style={{ color: "#fff" }}> Set Location </Text>
          </TouchableOpacity>

          <Button
            title="Create Event"
            onPress={() => this.handleCreateEvent()}
          />
        </Card>

        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode="datetime"
        />

        <Modal animationType="slide" visible={this.state.isModalOpen}>
          <View style={styles.container}>
            <MapView
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
              style={styles.map}
            >
              <MapView.Marker
                draggable
                coordinate={{
                  latitude: 37.78825,
                  longitude: -122.4324
                }}
                onDragEnd={e => console.log("onDragEnd", e.nativeEvent)}
              />
            </MapView>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.handleModal();
            }}
          >
            <Text> Done </Text>
          </TouchableOpacity>
        </Modal>
      </KeyboardAwareScrollView>
    );
  }
}
const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    display: "flex",
    height: "100%",
    width: 400,
    justifyContent: "flex-end",
    alignItems: "center"
  }
});
export default AddEvent;
