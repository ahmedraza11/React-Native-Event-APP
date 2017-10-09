import React, { Component } from "react";
import {
  View,
  Text,
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
  Button,
  FormLabel
} from "react-native-elements";
import DateTimePicker from "react-native-modal-datetime-picker";
import MapView from "react-native-maps";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import RNGooglePlaces from "react-native-google-places";

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
      isModalOpen: false,
      latitude: 24.8729899,
      longitude: 67.0416933,
      name: null,
      Date: null,
      Time:null,
      address: null
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
    const checkDate = new Date(date);
    const selectedDate = checkDate.getDate()+"/"+checkDate.getMonth()+"/"+checkDate.getFullYear();
    const selectedTime = checkDate.getHours()+":"+checkDate.getMinutes();
    console.log("Full Date format",selectedDate);
    console.log("Full Time format",selectedTime);

    this.setState({
       Date: selectedDate,
       Time: selectedTime
    });
              
    this._hideDateTimePicker();
  };

  handleCreateEvent() {
    const eventData = AddEventService.createEvent(this.state, Events);
    console.log("Event Data", eventData);
  }

  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal({
      type: "establishment",
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      name: "",
      address: "",
      radius: 10,
      useOverlay: false
    })
      .then(place => {
        console.log("Places==========>", place);
        this.setState({
          latitude: place.latitude,
          longitude: place.longitude,
          name: place.name,
          address: place.address
        });
        let copy = Object.assign({}, place);
      })
      .catch(error => console.log(error.message));
  }

  render() {
    console.log("Google Place in State", this.state.name, this.state.address);
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
          <View style={{marginLeft:15}}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                backgroundColor: "#4DD0E1",
                width: 160,
                padding: 5,
                marginBottom: 2,
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
                backgroundColor: "#4DD0E1",
                width: 120,
                padding: 5,
                marginBottom: 19,
                marginTop: 10
              }}
              onPress={() => {
                this.handleModal();
              }}
            >
              <Icon name="add-location" color="#fff" />
              <Text style={{ color: "#fff" }}> Set Location </Text>
            </TouchableOpacity>
          </View>
          <Button
            title="Create Event"
            onPress={() => this.handleCreateEvent()}
            buttonStyle={{backgroundColor:"#009688"}}
          />
        </Card>

        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode="datetime"
        />

        <Modal
          animationType="slide"
          visible={this.state.isModalOpen}
          style={{ display: "flex" }}
          onRequestClose={() => {console.log("Modal has been closed.")}}
        >
          <View style={styles.container}>
            <MapView
              initialRegion={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 6.0922,
                longitudeDelta: 3.0421
              }}
              region={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 6.0922,
                longitudeDelta: 3.0421
              }}
              style={styles.map}
            >
              <MapView.Marker
                draggable
                coordinate={{
                  latitude: this.state.latitude,
                  longitude: this.state.longitude
                }}
                onDragEnd={e => console.log("onDragEnd", e.nativeEvent)}
              />
            </MapView>
          </View>

          <View
            style={{
              justifyContent: "flex-end",
              height: "100%",
              paddingBottom: 30,
              flexDirection: "column"
            }}
          >
            <Button
              title="Search For Places"
              buttonStyle={{ backgroundColor: "#009688", marginBottom: 3 }}
              onPress={() => this.openSearchModal()}
            />
            <Button
              raised
              title="Done"
              buttonStyle={{ backgroundColor: "#8BC34A" }}
              onPress={() => {
                this.handleModal();
              }}
            />
          </View>
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
