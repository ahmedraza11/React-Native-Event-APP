import { AsyncStorage, ToastAndroid } from "react-native";

export class AuthService {
  static LoadSignupUserAccounts(Accounts) {
    AsyncStorage.getItem("FeedAccount", (err, result) => {
      if (!result == null) {
        Accounts.push(JSON.parse(result));
      }
    });
    return Accounts;
  }
  static LoadSigninUserAccounts(Accounts) {
    const res = AsyncStorage.getItem("FeedAccount", result => result);
    return res;
  }
  static HandleSignup(state, navigation, Accounts) {
    const { navigate } = navigation;

    const user = {
      id: new Date(),
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      password: state.password,
      profileImage: state.avatarSource
    };

    if (
      user.firstName !== null &&
      state.lastName !== null &&
      state.email !== null &&
      state.password
    ) {
      Accounts.push(user);
      AsyncStorage.setItem("FeedAccount", JSON.stringify(Accounts)).then(() => {
        ToastAndroid.show("Registered Successfull ", ToastAndroid.SHORT);
        navigate("loginScreen");
        this.setState({
          firstName: "",
          lastName: "",
          email: "",
          password: ""
        });
      });
    } else {
      ToastAndroid.show("Please Fill up the Form", ToastAndroid.SHORT);
    }

    return Accounts;
  }

  static HandleLogin(state, Accounts, navigation) {
    const { navigate } = navigation;
    let Authenticated = false;
    let firstName, lastName, email, password, profileImage, id;

    if (state.email !== null && state.password !== null) {
      userFilteredData = Accounts.some(v => {
        if (state.email == v.email && state.password == v.password) {
          id = v.id;
          firstName = v.firstName;
          lastName = v.lastName;
          email = v.email;
          password = v.password;
          profileImage = v.profileImage;
          Authenticated = true;
        }
      });

      if (Authenticated) {
        ToastAndroid.show("Logged in Successfull ", ToastAndroid.SHORT);
        navigate("eventListScreen", {
          id: id,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          profileImage: profileImage
        });
      } else {
        ToastAndroid.show("Invalid Username or Password ", ToastAndroid.SHORT);
      }

      return userFilteredData;
    } else {
      ToastAndroid.show("Please fill up the Form ", ToastAndroid.SHORT);
    }
  }

  static UpdateProfile(state,users,navigate){
    if(users!==null){
      users.filter((ele,i)=>{
          if(ele.id==state.user.id){
            users.splice(i,1);
            users.push({
              id: state.user.id,
              firstName: state.user.firstName,
              lastName: state.user.lastName,
              email: state.user.email,
              password: state.user.password,
              profileImage: state.user.profileImage
            });
            AsyncStorage.setItem('FeedAccount',JSON.stringify(users)).then(()=>{
              ToastAndroid.show("Update Successfull ", ToastAndroid.SHORT);
              navigate('eventListScreen',{
                id: state.user.id,
                firstName: state.user.firstName,
                lastName: state.user.lastName,
                email: state.user.email,
                password: state.user.password,
              });
            })
          }
      });
    }
  }
}
