import React, { Component } from "react";
import {
  View,
  AsyncStorage,
  Text,
  Image,
  TouchableOpacity
} from "react-native";

import { Header, Icon, Card, Avatar } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }
  static navigationOptions = {
    header: null
  };
  componentWillMount() {}
  componentDidMount() {
    console.log(this.props.navigation);
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
          <Avatar
            title={state.params.firstName}
            

            xlarge
            rounded
            source={state.params.profileImage}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />
        </Card>
      </KeyboardAwareScrollView>
    );
  }
}

export default Profile;
