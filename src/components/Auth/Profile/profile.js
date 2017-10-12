import React, { Component } from "react";
import {
  View,
  AsyncStorage,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import { ProfileStyles } from "./profileStyles";
import { AuthService } from "../../../services/authService";

import {
  Header,
  Icon,
  Card,
  Avatar,
  Divider,
  Button,
  FormInput,
  FormLabel
} from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        profileImage: null
      },
      isEditMode: false,
      currentUser: Object
    };
  }
  static navigationOptions = {
    header: null
  };
  componentWillMount() {
    const { state } = this.props.navigation;
    this.setState({
      user: {
        id: state.params.id,
        firstName: state.params.firstName,
        lastName: state.params.lastName,
        email: state.params.email,
        password: state.params.password,
        profileImage: state.params.profileImage
      }
    });
    AuthService.LoadSigninUserAccounts().then(res => {
      this.setState({ currentUser: JSON.parse(res) });
      console.log(
        "checkiing response from Settings Page",
        this.state.currentUser
      );
    });
  }
  componentDidMount() {
    console.log(this.props.navigation);
  }
  updateUserData() {
    // this.setState({ isEditMode: !this.state.isEditMode })
    const { navigate } = this.props.navigation;
    AuthService.UpdateProfile(this.state, this.state.currentUser, navigate);
  }
  render() {
    const { navigate, goBack, state } = this.props.navigation;
    return (
      <KeyboardAwareScrollView>
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
          centerComponent={{ text: "Profile", style: { color: "#fff" } }}
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
        <Card containerStyle={{ marginTop: 75 }} title={state.params.id}>
          <View style={ProfileStyles.AvatarContainer}>
            <Avatar
              large
              rounded
              source={this.state.user.profileImage}
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
            />
            <Text style={ProfileStyles.AvatarName}>
              {state.params.firstName} {state.params.lastName}
            </Text>
          </View>
        </Card>
        <Card title="Details">
          <View>
            {this.state.isEditMode ? (
              <View style={ProfileStyles.Detail}>
                <FormLabel>First Name:</FormLabel>
                <FormInput
                  style={{ width: 150 }}
                  value={this.state.user.firstName}
                  onChangeText={txt => {
                    var user = { ...this.state.user };
                    user.firstName = txt;
                    this.setState({ user });
                  }}
                />
              </View>
            ) : (
              <View style={ProfileStyles.Detail}>
                <Text style={ProfileStyles.heading}>First Name: </Text>
                <Text>{this.state.user.firstName}</Text>
              </View>
            )}
          </View>

          <View>
            {this.state.isEditMode ? (
              <View style={ProfileStyles.Detail}>
                <FormLabel>Last Name:</FormLabel>
                <FormInput
                  style={{ width: 150 }}
                  value={this.state.user.lastName}
                  onChangeText={txt => {
                    var user = { ...this.state.user };
                    user.lastName = txt;
                    this.setState({ user });
                  }}
                />
              </View>
            ) : (
              <View style={ProfileStyles.Detail}>
                <Text style={ProfileStyles.heading}>Last Name: </Text>
                <Text>{this.state.user.lastName}</Text>
              </View>
            )}
          </View>

          <View>
            {this.state.isEditMode ? (
              <View style={ProfileStyles.Detail}>
                <FormLabel>Email:</FormLabel>
                <FormInput
                  style={{ width: 150 }}
                  value={this.state.user.email}
                  onChangeText={txt => {
                    var user = { ...this.state.user };
                    user.email = txt;
                    this.setState({ user });
                  }}
                />
              </View>
            ) : (
              <View style={ProfileStyles.Detail}>
                <Text style={ProfileStyles.heading}>Email: </Text>
                <Text>{this.state.user.email}</Text>
              </View>
            )}
          </View>

          <View>
            {this.state.isEditMode ? (
              <View style={ProfileStyles.Detail}>
                <FormLabel>Password:</FormLabel>
                <FormInput
                  style={{ width: 150 }}
                  value={this.state.user.password}
                  onChangeText={txt => {
                    var user = { ...this.state.user };
                    user.password = txt;
                    this.setState({ user });
                  }}
                />
              </View>
            ) : (
              <View style={ProfileStyles.Detail}>
                <Text style={ProfileStyles.heading}>Password: </Text>
                <Text>************</Text>
              </View>
            )}
          </View>

          <Button
            buttonStyle={ProfileStyles.editButton}
            raised
            icon={{ name: this.state.isEditMode ? "done" : "edit" }}
            onPress={this.state.isEditMode?() => this.updateUserData():this.setState({isEditMode:true})}

            title={this.state.isEditMode ? "Update" : "Edit Your Profile"}
          />
        </Card>
      </KeyboardAwareScrollView>
    );
  }
}

export default Profile;
