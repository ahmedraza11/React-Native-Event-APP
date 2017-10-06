import React, { Component } from "react";
import { settingsStyles } from "./settingsStyles";
import { View, Text, TouchableOpacity } from "react-native";

import {
  Header,
  Icon,
  Card,
  List,
  ListItem,
  FormInput,
  FormLabel,
  Button
} from "react-native-elements";

class Settings extends Component {
  render() {
    const { navigate, goBack } = this.props.navigation;
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
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
          centerComponent={{ text: "Settings", style: { color: "#fff" } }}
          outerContainerStyles={{ backgroundColor: "#009688" }}
        />
        <Card containerStyle={{ marginTop: 80 }} title="Settings">
          <FormLabel>First Name</FormLabel>
          <FormInput />

          <FormLabel>Last Name</FormLabel>
          <FormInput />

          <FormLabel>Email</FormLabel>
          <FormInput />

          <FormLabel>Password</FormLabel>
          <FormInput />
          <Button
            buttonStyle={{ backgroundColor: "#009688", marginTop: 10 }}
            raised
            title="Save"
            icon={{ name: "done" }}
          />
        </Card>
      </View>
    );
  }
}
export default Settings;
