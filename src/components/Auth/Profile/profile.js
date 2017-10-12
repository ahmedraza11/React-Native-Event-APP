import React, { Component } from "react";
import {
  View,
  AsyncStorage,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import { AuthService } from "../../../services/authService";
import { ProfileStyles } from "./profileStyles";

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
import ImagePicker from "react-native-image-picker";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        profileImage: null,
        firstName: null,
        password: null,
        lastName: null,
        email: null,
        id: null
      },
      currentUser: Object,
      isEditMode: false
    };
  }

  static navigationOptions = {
    header: null
  };

  componentWillMount() {
    const { state } = this.props.navigation;

    this.setState({
      user: {
        profileImage: state.params.profileImage,
        firstName: state.params.firstName,
        lastName: state.params.lastName,
        password: state.params.password,
        email: state.params.email,
        id: state.params.id
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
    const { navigate } = this.props.navigation;
    AuthService.UpdateProfile(this.state, this.state.currentUser, navigate);
  }

  openCamera() {
    var options = {
      title: "Select Profile Picture",
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {

        let source = { uri: response.uri };

        const user = { ...this.state.user };
        user.profileImage = source;
        this.setState({
          user
        });
      }
    });
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
        <Card containerStyle={{ marginTop: 75 }}>
          <View style={ProfileStyles.AvatarContainer}>
            <Avatar
              large
              rounded
              source={this.state.user.profileImage}
              onPress={() => this.openCamera()}
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
            onPress={
              this.state.isEditMode
                ? () => this.updateUserData()
                : this.setState({ isEditMode: true })
            }
            title={this.state.isEditMode ? "Update" : "Edit Your Profile"}
          />
        </Card>
      </KeyboardAwareScrollView>
    );
  }
}

export default Profile;
