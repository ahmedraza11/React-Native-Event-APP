import React, { Component } from "react";
import { signupStyles } from "./signupStyles";
import {
  View,
  Text,
  Image,
  Modal,
  AsyncStorage,
  TouchableOpacity
} from "react-native";

import {
  Button,
  Header,
  FormInput,
  FormLabel,
  Icon,
  Avatar
} from "react-native-elements";
import { AuthService } from "../../../services/authService";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import ImagePicker from "react-native-image-picker";

const Accounts = [];
class Signup extends Component {
  constructor() {
    super();
    // this.camera = null;
    this.state = {
      modalOpen: false,
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      profileImage: null,
      avatarSource: null,
      defaultAvatar:{
          uri: "https://image.flaticon.com/icons/png/512/206/206853.png"
      },
      Accounts: []
    };
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
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let source = { uri: response.uri };
        this.setState({
          avatarSource: source
        });
      }
    });
  }
  componentWillMount() {
    const data = AuthService.LoadSignupUserAccounts(Accounts);
    console.log("sign up data ", data);
  }
  static navigationOptions = {
    header: null
  };
  _handleSignup() {
    const data = AuthService.HandleSignup(
      this.state,
      this.props.navigation,
      Accounts
    );
    console.log("Accounts from Signup", data);
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAwareScrollView style={signupStyles.container}>
        <Header
          statusBarProps={{ barStyle: "light-content" }}
          leftComponent={
            <Image
              source={{
                uri:
                  "https://lh3.googleusercontent.com/8Oy0WcjlP8p-m2oUAwuKVLCjKggkILPxmyPfqTB6IBLoe2abC83vq5NtoLC2kXL64Ro=w300"
              }}
              style={{ width: 35, height: 35 }}
            />
          }
          centerComponent={{
            text: "StackInnovations Feed App",
            style: { color: "#fff" }
          }}
          outerContainerStyles={{ backgroundColor: "#0288D1" }}
        />

        <View style={signupStyles.form}>
          <Text style={signupStyles.formHeading}>Signup Form</Text>
          <View style={signupStyles.formFields}>
            <View>
              <FormLabel>First Name</FormLabel>
              <FormInput
                onChangeText={txt => this.setState({ firstName: txt })}
                value={this.state.firstName}
              />

              <FormLabel>Last Name</FormLabel>
              <FormInput
                onChangeText={txt => this.setState({ lastName: txt })}
                value={this.state.lastName}
              />

              <FormLabel>Email</FormLabel>
              <FormInput
                keyboardType="email-address"
                value={this.state.email}
                onChangeText={txt => this.setState({ email: txt })}
              />

              <FormLabel>Password</FormLabel>
              <FormInput
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={txt => this.setState({ password: txt })}
              />
            </View>
            
            <View style={{flexDirection:"row",justifyContent:"space-between",width:200,marginLeft:60,marginTop:10}}>
              <Avatar
                medium
                rounded
                source={
                 
                    this.state.avatarSource == null
                      ? this.state.defaultAvatar
                      :this.state.avatarSource
                }
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
              />
              <TouchableOpacity onPress={() => this.openCamera()}>
                <Icon size={50} color="seagreen" name="camera" />
              </TouchableOpacity>
            </View>
            
            <Button
              title="Sign up"
              buttonStyle={signupStyles.SignupButton}
              onPress={() => this._handleSignup()}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
export default Signup;
